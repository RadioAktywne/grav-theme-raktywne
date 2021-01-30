$(document).ready(function() {
	$('#player_w_stanie_posrednim').jPlayer({
		ready: function(event){checkForPlayer();},
		play: function(){ $(this).jPlayer('pauseOthers');},
		solution: 'html',
		preload: 'none',
		supplied: 'oga',
		volume: 0.8,
		muted: false,
	});
});


function playrec(obj,urloga){
	$('#player_w_stanie_posrednim').jPlayer("pause");
	$('#player_w_stanie_posrednim').jPlayer("clearMedia");

	var 	id = obj.id.substring(8, obj.id.length);
	var 	prev = $('.active-rec').attr('id');
	//console.log(id);
	var	stream = {
			oga: urloga
			}

	$('#player_w_stanie_posrednim').jPlayer("setMedia", stream);

	$('#'+prev+' .seekbar-wrap').css('width', '0%');
	$('#'+prev+' .player-container').css('opacity', 0);
	$('#rec_'+id+' .nagranie-title').css('opacity', 0);
	setTimeout( function() {
		$('#'+prev).removeClass('active-rec');
		$('#rec_'+id).addClass('active-rec');
		$('#'+prev+' .nagranie-title').css('opacity', 1);
		$('#rec_'+id+' .player-container').css('opacity', 1);
		$('#rec_'+id+' .seekbar-wrap').css('width', '100%');
	}, 200);
	
	linkselectors(id);
	$('#player_w_stanie_posrednim').jPlayer("load");
}

function readyRec(selector=' .selected-tab') {
	var rec = $(selector+' .rec-player').attr('rec');
	//console.log(rec);
	var stream = {
			oga: rec
		}
	$('#player_w_stanie_posrednim').jPlayer('setMedia', stream);
	$('#player_w_stanie_posrednim').jPlayer('load');
	linkselectors('def');
	linkselectors('def');
	
}

function disCurrentPlayer(){
	$('#player_w_stanie_posrednim').jPlayer('pause');
	$('#player_w_stanie_posrednim').jPlayer('clearMedia');
	
	var current = $('.active-rec').attr('id');
	$('#'+current+' .seekbar-wrap').css('width', '0%');
	$('#'+current+' .player-container').css('opacity', 0);
	setTimeout( function() {
		$('#'+current).removeClass('active-rec');
		$('#'+current+' .nagranie-title').css('opacity',1);
	}, 200);
}

function linkselectors(id){
	$('#player_w_stanie_posrednim').jPlayer({
		cssSelectorAncestor: '#jp_container_'+id,
			cssSelector: {
				play: '#jp-play_'+id,
				pause: '#jp-pause_'+id,
				mute: '#jp-mute_'+id,
				unmute: '#jp-unmute_'+id,
				seekBar: '#jp-seek-bar_'+id,
				playBar: '#jp-play-bar_'+id,
				currentTime: "#jp-current-time_"+id,
				duration: "#jp-duration_"+id
			},
	});
}	

