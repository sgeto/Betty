// ==UserScript==
// @name            Betty
// @namespace       autostart.ini@gmail.com
// @author          Ali Abdulkadir (sgeto)
// @version         0.6
// @license         GPL version 3 or any later version; http://www.gnu.org/licenses/gpl-3.0.txt
// @description     A user script that assists in finding open directories with Google.
// @copyright       Jorge Frisancho (teocci), Ali Abdulkadir (sgeto), jO9GEc
// @icon            https://raw.githubusercontent.com/sgeto/Betty/master/betty-space%20invader%20emoji.png
// @homepage        Diarium
// @homepageURL     https://goo.gl/DrRSGH
// @updateURL       https://raw.githubusercontent.com/sgeto/Betty/master/Betty.user.js
// @downloadURL     https://raw.githubusercontent.com/sgeto/Betty/master/Betty.user.js
// @contributionURL https://github.com/sgeto/Betty
// @include         https://*.google.*
// @exclude         https://*.images.google.*
// @exclude         https://*.video.google.*
// @run-at          document-end
// @require         http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js
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
//  uncomment the following line to use the experimental Google Drive search  
//newradio('Google Drive (experimental)', 'site:drive.google.com -"Whoops!"');
}

// add cached links to results. Huge thanks to jO9GEc's "Direct Google"
var href = location.href;

function modifyGoogle() {
	//expose cached links
	$('div[role="menu"] ol li').find('a[href^="http://webcache.googleusercontent."]' + 
		', a[href^="https://webcache.googleusercontent."]').each(
		function() {
			this.style.display = 'inline';
			$(this).closest('div.action-menu.ab_ctl, div._nBb')
			.after(' <a href="' + this.href.replace(/^http\:/, 'https:') + 
				'">(https)</a> ')
			.after($(this));
		}
	);
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
if(MutationObserver) {
	var observer = new MutationObserver(function(mutations) {
		modifyGoogle();
	});
	//tiny delay needed for firefox
	setTimeout(function() {
		observer.observe(document.body, {
			childList: true, 
			subtree: true
		});
		modifyGoogle();
	}, 100);
}
//for chrome v18-, firefox v14-, internet explorer v11-, opera v15- and safari v6-
else {
	setInterval(function() {
		modifyGoogle();
	}, 500);
}