// ==UserScript==
// @name            Betty
// @namespace       autostart.ini@gmail.com
// @author          Ali Abdulkadir (sgeto)
// @version         0.4
// @license         GPL version 3 or any later version; http://www.gnu.org/licenses/gpl-3.0.txt
// @description     A user script that assists in finding open directories with Google.
// @copyright       Jorge Frisancho (teocci), Ali Abdulkadir (sgeto)
// @icon            https://1.bp.blogspot.com/-VCFxO5wbOYw/V9optetVKcI/AAAAAAAABmE/g4ruvAETn8gxNbXoHZA21rYUogj45nzcwCLcB/s320/betty-space%2Binvader%2Bemoji.png
// @homepage        Diarium
// @homepageURL     https://goo.gl/DrRSGH
// @updateURL       https://raw.githubusercontent.com/sgeto/Betty/master/Betty.user.js
// @downloadURL     https://raw.githubusercontent.com/sgeto/Betty/master/Betty.user.js
// @contributionURL https://github.com/sgeto/Betty
// @match           https://*.google.com/*
// @include         https://*.google.com/*
// @exclude         https://*.images.google.com/*
// @exclude         https://*.video.google.com/*
// @run-at          document-end
// @grant           GM_xmlhttpRequest
// ==/UserScript==
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
  newradio('Music', 'intitle:"music" (mp3|flac|wav|m4a|ogg|wma) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3');
  newradio('Movies/TV', '(avi|mpg|wmv|mpeg|mp4|mkv|m4v|mov|flv|ogv|wmv|webm) "Parent Directory" -"Trailer" -cdkey -asp -torrent -html -web-shelf -zoozle -jsp -htm -listen77 -idmovies -shexy -eucontest -0x7');
  newradio('FTP Folder', '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -xxx -shtml -opendivx -md5 -md5sums -asp');
  newradio('Torrents', '+torrent -trailer -blogspot -proxy');
  newradio('EBooks/Comics', '(chm|pdf|cbr|nfo|epub) -torrents -torrent -md5 -md5sums -idpdf');
  newradio('Archives', '(rar|zip|tar|iso|cso|gz|7z|bz2|gz|gzip|img) -torrent +intitle:"index.of"');
  newradio('(Mobile) Apps', '(exe|msi|msu|apk|deb) -torrent +intitle:"index.of"');
} else {
  
  var s = document.createElement('select');
  s.setAttribute('name', 'q');
  s.setAttribute('onchange', 'window.location.href=window.location.href.split("&q=")[0]+"&q="+window.location.href.split("&q=")[1].split("&")[0]+"&q="+this.value');
  document.getElementById('prs').appendChild(s);
  // The contents in both of these (newradio and newselect) have to be identical?!
  newselect('Web', '');
  newselect('Music', 'intitle:"music" (mp3|flac|wav|m4a|ogg|wma) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3');
  newselect('Movies/TV', '(avi|mpg|wmv|mpeg|mp4|mkv|m4v|mov|flv|ogv|wmv|webm) "Parent Directory" -"Trailer" -cdkey -asp -torrent -html -web-shelf -zoozle -jsp -htm -listen77 -idmovies -shexy -eucontest -0x7');
  newselect('FTP Folder', '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -xxx -shtml -opendivx -md5 -md5sums -asp');
  newselect('Torrents', '+torrent -trailer -blogspot -proxy');
  newselect('EBooks/Comics', '(chm|pdf|cbr|nfo|epub) -torrents -torrent -md5 -md5sums -idpdf');
  newselect('Archives', '(rar|zip|tar|iso|cso|gz|7z|bz2|gz|gzip|img) -torrent +intitle:"index.of"');
  newselect('(Mobile) Apps', '(exe|msi|msu|apk|deb) -torrent +intitle:"index.of"');
  // the next few statements seem to discard certain results based on keywords in their URL's. Which we already told Google to do for us...
  if (window.location.href.search('idmusic') > 0) {
    s.options[1].defaultSelected = 'true';
  }
  if (window.location.href.search('idmovies') > 0) {
    s.options[2].defaultSelected = 'true';
  }
  if (window.location.href.search('idftp') > 0) {
    s.options[3].defaultSelected = 'true';
  }
  if (window.location.href.search('torrent') > 0) {
    s.options[4].defaultSelected = 'true';
  }
  if (window.location.href.search('idpdf') > 0) {
    s.options[5].defaultSelected = 'true';
  }
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
inurl: youtube;
