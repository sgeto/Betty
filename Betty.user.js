// ==UserScript==
// @name            Betty
// @namespace       autostart.ini@gmail.com
// @author          Ali Abdulkadir (sgeto)
// @version         0.5
// @license         GPL version 3 or any later version; http://www.gnu.org/licenses/gpl-3.0.txt
// @description     A user script that assists in finding open directories with Google.
// @copyright       Jorge Frisancho (teocci), Ali Abdulkadir (sgeto)
// @icon            https://raw.githubusercontent.com/sgeto/Betty/master/betty-space%20invader%20emoji.png
// @homepage        Diarium
// @homepageURL     https://goo.gl/DrRSGH
// @updateURL       https://raw.githubusercontent.com/sgeto/Betty/master/Betty.user.js
// @downloadURL     https://raw.githubusercontent.com/sgeto/Betty/master/Betty.user.js
// @contributionURL https://github.com/sgeto/Betty
// @match           https://*.google.*
// @include         https://*.google.*
// @exclude         https://*.images.google.*
// @exclude         https://*.video.google.*
// @run-at          document-end
// @grant           GM_xmlhttpRequest
// ==/UserScript==
//this will allow normal web queries
var oldSubmit = document.getElementById('tsf').onsubmit;
document.getElementById('tsf').onsubmit = function() {
	oldSubmit();
};
function newradio(nametext, dorkvalue) {
  var search = document.getElementsByName('f') [0];
  var sometext = document.createTextNode(nametext);
  var someradio = document.createElement('input');
  var breakup = document.createElement('br');
  someradio.setAttribute('type', 'radio');
  someradio.setAttribute('name', 'q');
  someradio.setAttribute('value', dorkvalue);
  // This statement is to automatically set the radio button to to "Web" at launch. It unfortunately breaks the Google Search button.
  if (nametext === 'Web') {
    someradio.setAttribute('checked', 'checked');
  }
  search.appendChild(breakup);
  search.appendChild(someradio);
  search.appendChild(sometext);
}// I have no idea what this is doing.

function newselect(nametext, dork) {
  var newoption = document.createElement('option');
  newoption.setAttribute('value', dork);
  newoption.innerHTML = nametext;
  s.appendChild(newoption);
}//If I add more options, I'll eventually need to find a way to add a column break. There's also a max character limit for google searches that need to be taken care of for long queries

if ((document.title === 'Google')) {
  document.getElementsByName('q') [0].focus();
  newradio('Web', '');
  newradio('Music', '+(mp3|wav|ac3|ogg|flac|wma|m4a) -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:index.of "last modified" -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)');
  newradio('Movie/TV', '+(mkv|mp4|avi|mov|mpg|wmv) -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:index.of "last modified" -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)');
  newradio('Undefined', 'intitle:"index of" -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)');
  newradio('Archive', '+(.rar|.tar|.zip|.sit) intitle:"index of" -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)');
  newradio('Software/Game', '+(exe|iso|tar|msi|rar|deb|zip|apk) -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:index.of "last modified" -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)');
  newradio('Torrent', '+(.torrent) -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis|trailer)');
  newradio('Book', '+(MOBI|CBZ|CBR|CBC|CHM|EPUB|FB2|LIT|LRF|ODT|PDF|PRC|PDB|PML|RB|RTF|TCR|DOC|DOCX) -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:index.of "last modified" -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)');
//  uncomment the folling line to use the experimental Google Drive search  
//  newradio('Google Drive (experimental)', 'site:drive.google.com -"Whoops!"');

} else {
  
  var s = document.createElement('select');
  s.setAttribute('name', 'q');
  s.setAttribute('onchange', 'window.location.href=window.location.href.split("&q=")[0]+"&q="+window.location.href.split("&q=")[1].split("&")[0]+"&q="+this.value');
  document.getElementById('prs').appendChild(s);
  // The contents in both of these (newradio and newselect) have to be identical?!
  newselect('Web', '');
  newselect('Music', '+(mp3|wav|ac3|ogg|flac|wma|m4a) -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:index.of "last modified" -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)');
  newselect('Movies/TV', '+(mkv|mp4|avi|mov|mpg|wmv) -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:index.of "last modified" -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)');
  newselect('FTP Folder', '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -xxx -shtml -opendivx -md5 -md5sums -asp');
  newselect('Torrents', '+torrent -trailer -blogspot -proxy');
  newselect('EBooks/Comics', '(chm|pdf|cbr|nfo|epub) -torrents -torrent -md5 -md5sums -idpdf');
  newselect('Archives', '(rar|zip|tar|iso|cso|gz|7z|bz2|gz|gzip|img) -torrent +intitle:"index.of"');
  newselect('(Mobile) Apps', '(exe|msi|msu|apk|deb) -torrent +intitle:"index.of"');
  // the next few statements seem to discard certain results based on keywords in their URL's. Which we already told Google to do for us...
  var i = 1;
  while (i < s.options.length) {
    if (s.options[i].defaultSelected === true) {
      document.evaluate('//input[contains(@title, "Search")]', document, null, 0, null).iterateNext().value = window.location.href.split('&q=') [1].split('&') [0];
    }
    i++;
  }
  var p = 0;
  var qs = document.evaluate('//input[contains(@title, "Search")]', document, null, 0, null).iterateNext();
  var newqs = '';
  while (p < qs.value.split('+').length) {
    if (p == qs.value.split('+').length - 1) {
      newqs = newqs + qs.value.split('+') [p];
    } else {
      newqs = newqs + qs.value.split('+') [p] + ' ';
    }
    p++;
  }
  qs.value = newqs;
  var ni = document.createElement('input');
  ni.setAttribute('type', 'hidden');
  ni.setAttribute('name', 'q');
  ni.setAttribute('value', s.value);
  document.forms[0].appendChild(ni);
}