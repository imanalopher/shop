//<![CDATA[
function doLiveSearch( ev, keywords ) {

	if( ev.keyCode == 38 || ev.keyCode == 40 ) {
		return false;
	}	

	$('#livesearch_search_results').remove();
	updown = -1;

	if( keywords == '' || keywords.length < 1 ) {
		return false;
	}

	$.ajax({
		url: Routing.generate('searchPage', {keyword : keywords}, true),
		dataType: 'json',
		content: this,
		success: function(result) {
		if( result.length > 0 ) {
			var eList = document.createElement('ul');
			eList.id = 'livesearch_search_results';
			var eListElem;
			var eListElems;
			var eLink;
			for( var i in result ) {
				eListElem = document.createElement('li');
				eLink = document.createElement('a');
				$(function ()
				{
					eListElems = document.createElement('img');
					eListElems.className='loading';
					$(eListElems).load(function () {
						$(this).show();
					});
					eListElems.src = result[i].image;
					eLink.appendChild(eListElems);
				});
				eLink.appendChild( document.createTextNode(result[i].name) );
				if( typeof(result[i].href) != 'undefined' ) {
					eLink.href = result[i].href;
				}
				eListElem.appendChild(eLink);
				eList.appendChild(eListElem);
			}
			if( $('#livesearch_search_results').length > 0 ) {
				$('#livesearch_search_results').remove();
			}
			$('#search').append(eList);
		}
	}});

	return true;
}

function upDownEvent( ev ) {
	var elem = document.getElementById('livesearch_search_results');
	var fkey = $('#search').find('[name=search]').first();

	if( elem ) {
		var length = elem.childNodes.length - 1;

		if( updown != -1 && typeof(elem.childNodes[updown]) != 'undefined' ) {
			$(elem.childNodes[updown]).removeClass('highlighted');
		}

		// Up
		if( ev.keyCode == 38 ) {
			updown = ( updown > 0 ) ? --updown : updown;
		}
		else if( ev.keyCode == 40 ) {
			updown = ( updown < length ) ? ++updown : updown;
		}

		if( updown >= 0 && updown <= length ) {
			$(elem.childNodes[updown]).addClass('highlighted');

			var text = elem.childNodes[updown].childNodes[0].text;
			if( typeof(text) == 'undefined' ) {
				text = elem.childNodes[updown].childNodes[0].innerText;
			}

			$('#search').find('[name=search]').first().val( new String(text).replace(/(\s\(.*?\))$/, '') );
		}
	}

	return false;
}

var updown = -1;

$(document).ready(function(){
	var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	};

	if(window.location.search.substring(1).split('=')[1]) {
		$('#search').find('[name=search]').first().val(getUrlParameter('search'));
	}
	$('#search').find('[name=search]').first().keyup(function(ev){
		doLiveSearch(ev, this.value);
	}).focus(function(ev){
		doLiveSearch(ev, this.value);
	}).keydown(function(ev){
		upDownEvent( ev );
	}).blur(function(){
		window.setTimeout("$('#livesearch_search_results').remove();updown=0;", 600);
	});
	$(document).bind('keydown', function(ev) {
		try {
			if( ev.keyCode == 13 && $('.highlighted').length > 0 ) {
				document.location.href = $('.highlighted').find('a').first().attr('href');
			}
		}
		catch(e) {}
	});
});
//]]>
