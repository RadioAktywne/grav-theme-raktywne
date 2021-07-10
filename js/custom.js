var mainloaded = false;
$(document).ready(function() {
	if ($(location).attr('href') === 'https://radioaktywne.pl/'){	// DO ZMIANY
	mainloaded = true;
	//console.log('mainloaded='+mainloaded);
	}
	liveplayer();
	//checkForPlayer();
	setTabs( $('.selected').attr('id').substring(8, 10));
	
	$(".nav-tab").click( function() {
		switchTab($(this).attr('id').substring(8, 10));	
	});
	$(".dupa").click( function() {
		switchTab($('.nav-tab[dest="' + $(this).attr('dest') + '"]').attr('id').substring(8,10));
	});

	window.onpopstate = function(event){
		var htmlstring = String(document.location);
		var htmlarray = htmlstring.split('/');
		//for ( a in htmlarray) { console.log(htmlarray[a]); }
		//console.log('htmlstring: '+htmlstring);
		if (htmlstring === 'https://radioaktywne.pl/' || (htmlarray.length < 5 && htmlarray[3]=='')){ 	// DO ZMIANY
			//console.log('/'+htmlarray[2]);
			linkTo('/',null,false);
			loadTitle('/');
		}
		else if (htmlarray.length < 5){
			//console.log('5+'+'/'+htmlarray[3]);
			var tab ='/'+htmlarray[3];
			linkTo(tab,null, false);
			loadTitle(tab);
		}
		else {	
			var tab ='/'+htmlarray[3];
			var site='';
			for (i = 4; i < htmlarray.length; i++){
				var site = site+htmlarray[i]+'/';
			}
			//console.log(site);
			linkTo(tab,site,false);
			loadTitle(tab+'/'+site);
		}
	};
	if($(window).height() >= $(document).height()) {
		pageLoad();
	}
		
});

var pages = 1;

function scrollTT(){
	document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function linkTo(url, sub=null, push=true){
	var id = $('.nav-tab[dest="' + url + '"]').attr('id').substring(8,10);
	if (sub != null) {
		switchTab(id, false);
		loadContent('#tab-' + id, url + '/' + sub, ' .content', push);
	} else {
		switchTab(id, true, false);
		disCurrentPlayer();
	}
	$('.mobile-menu').removeClass('aktiv-mobile');
	pages = 1;	

	scrollTT();
}

function onBackFor(){
	var html = window.location.href;
	//console.log(html);
}

function toggleMobile(){
	if ($('.header .mobile-menu').hasClass('aktiv-mobile')){
		$('.header .mobile-menu').removeClass('aktiv-mobile');
	} else {
		$('.header .mobile-menu').addClass('aktiv-mobile');
	}
}

function setTabs(currentnum){
	for(x=1;x<=$('.tab').length;x++){
		if (x != currentnum){
			var tabid = '#tab-' + x;
			$(tabid).removeClass('totheleft');
			$(tabid).removeClass('totheright');
			if (x > currentnum){
				$(tabid).addClass('totheright');
			} else {
				$(tabid).addClass('totheleft');
			}
		}
	}
}	

function switchTab(dest, load = true, push = true){
	// prep variables
	
	var tabid = '#tab-' + dest;
	if (!$(tabid).length) { return 1; }
	var navid = '#nav-tab-' + dest;	
	var side = 1;
	var from = $('.selected').attr('id').substring(8, 10);
	var fromid = '#tab-' + from;

	$('.selected').removeClass('selected');
	
	// load content
	$(tabid).addClass('invisible');
	if(load === true) {
		loadContent(
			tabid,
			$(navid).attr('dest'),
			' .content',
			push
	);
	}
	
	
	$(navid).addClass('selected');

	// movement - można to przerobić na klasy
	
	if (from < dest) side = 0;	
	
	$(tabid).removeClass('totheleft');
	$(tabid).removeClass('totheright');
	
	setTabs(dest);	
	
	// sprzątanie

	$('.selected-tab').removeClass('selected-tab');
	$(tabid).addClass('selected-tab');
	$('.mobile-menu').removeClass('aktiv-mobile');
	scrollTT();
}

function loadContent(target,url,from, push=true){
	if (url != '/' || mainloaded === false){		
		$(target).load(url+' '+target+from, function() {
			
		if ( url === '/'){
			mainloaded = true;
			linkliveselectors();
			rds();
		}	
		linklive2selectors();
		checkForPlayer(target);		
		$(target).removeClass('invisible');
		if($(window).height() >= $(document).height()) {
			pageLoad();
		}
		});
	} else {
		$('#nagrania-box').load('https://radioaktywne.pl/ #nagrania-box .grid-box-content', function() { //DO ZMIANY 
			$(target).removeClass('invisible');
		});
	}
	if (url === '/') {
		disCurrentPlayer();
	}
	if (push === true){
		loadTitle(url);
		window.history.pushState(null, null, url);
	}
	
}

function loadTitle(url){
	$('title').load(url+' title', function(){
		if($(this).children('title').length) {
			$(this).contents().unwrap();
		}
	});
}

function checkForPlayer(selector='.selected-tab'){
	var playeraudio = $('#player_w_stanie_posrednim audio').attr('src');
	//console.log(selector);
	var rec = $(selector+' .rec-player').attr('rec');
	if (rec){
		//console.log(rec);
		if (playeraudio) {
			var recfn = rec.substring(rec.lastIndexOf('/')+1, rec.length); 
			var playerfn = playeraudio.substring(playeraudio.lastIndexOf('/')+1, playeraudio.length);
			if (recfn === playerfn) {
				linkselectors('def');
				linkselectors('def');
			} else {
				disCurrentPlayer();
				//console.log('staph inne pliki');
				readyRec(selector);
			}
		} else {
				readyRec();
		}
	} else {
		disCurrentPlayer();
		//console.log('staph - nimoreca');
	}
}

function limiterRunow(fnc, wait, immediate){
	var timeout;
	return function(){
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) fnc.apply(context, args);
		};
		var callNow = immediate && !timeaout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) fnc.apply(context, args);
	};
};

var pageLoad = limiterRunow(function() {
	var allthepages = $('.pagination-page').get();
	for (a in allthepages){
		if ($('#page-'+(Number(a)+1)+' .pagination-content').children().length === 0) {	
			//console.log(String(document.location)+'/page:'+(Number(a)+1));
			loadContent('#page-'+(Number(a)+1), String(document.location)+'/page:'+(Number(a)+1), ' .pagination-content.grid', false);
			break;
		}
	}
}, 250);

$(window).scroll(function(){
	if($(document).height() - ($(window).scrollTop() + $(window).height()) < ($(document).height()/2)) {
		pageLoad();
	}
});

$(window).hammer().bind('panup', function() {
	if($(document).height() - ($(window).scrollTop() + $(window).height()) < ($(document).height()/2)) {
		pageLoad();
	}
});	