function liveplayer(){
	

	rds();
	setInterval(function() {rds();}, 10000);

	var	stream = {
			mp3: "https://listen.radioaktywne.pl:8443/ramp3",
			oga: "https://listen.radioaktywne.pl:8443/raogg" },
		ready = false;

	var	stream2 = {
			mp3: "https://listen.radioaktywne.pl:8443/ramp3koncert"},
		ready = false;

	var volume = 0.8

	$('#live_player').jPlayer({
		ready: function(event){ ready = true; $(this).jPlayer("setMedia", stream); },
		pause: function(){ $(this).jPlayer("clearMedia"); },
		error: function(event){
			if(ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET){
				$(this).jPlayer("setMedia", stream).jPlayer("play");
			}
		},
		play: function(){ $(this).jPlayer('pauseOthers');},
		solution: 'html',
		supplied: 'oga, mp3',
		preload: 'none',
		volume: volume,
		muted: false,
		cssSelectorAncestor: '#jp_live_container',
		cssSelector: {
			play: '#jp-live-play',
			pause: '#jp-live-pause',
			mute: '#jp-live-mute',
			unmute: '#jp-live-unmute'
		},
	});

	$('#volume-slider').slider({
		value : volume * 100,
		range: 'min',
		orientation: "vertical",
	
		slide: function(event, ui) {
			var volume = ui.value / 100;
			$("#live_player").jPlayer("volume", volume);
		}
	});

	$('#live2_player').jPlayer({
		ready: function(event){ ready = true; $(this).jPlayer("setMedia", stream2); },
		pause: function(){ $(this).jPlayer("clearMedia"); },
		error: function(event){
			if(ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET){
				$(this).jPlayer("setMedia", stream2).jPlayer("play");
			}
		},
		play: function(){ $(this).jPlayer('pauseOthers');},
		solution: 'html',
		supplied: 'mp3',
		preload: 'none',
		volume: volume,
		muted: false,
		cssSelectorAncestor: '#jp_live2_container',
		cssSelector: {
			play: '#jp-live2-play',
			pause: '#jp-live2-pause',
			mute: '#jp-live2-mute',
			unmute: '#jp-live2-unmute'
		},
	});

	$('#volume-slider2').slider({
		value : volume * 100,
		range: 'min',
		orientation: "vertical",
	
		slide: function(event, ui) {
			var volume = ui.value / 100;
			$("#live_player2").jPlayer("volume", volume);
		}
	});

}
function rds(){
		var url = 'https://listen.radioaktywne.pl:8443/status-json.xsl';
		
		$.get(url, function(data){
			var title = data.icestats.source[1].title;
			if( title != 'Unknown' && !title.endsWith("- Unknown")){	
				$('.jp-live-title').html(title);
			}
			
		});
}
function linkliveselectors(){
	$('#live_player').jPlayer({
		cssSelectorAncestor: '#jp_live_container',
		cssSelector: {
			play: '#jp-live-play',
			pause: '#jp-live-pause',
			mute: '#jp-live-mute',
			unmute: '#jp-live-unmute'
		},
	});
	$('#volume-slider').slider({
		value: ($("#live_player")[0]?.lastChild.volume ?? 0) * 100,
		range: 'min',
		orientation: "vertical",
	
		slide: function(event, ui) {
			var volume = ui.value / 100;
			$("#live_player").jPlayer("volume", volume);
		}
	});
}

function linklive2selectors(){
	$('#live2_player').jPlayer({
		cssSelectorAncestor: '#jp_live2_container',
		cssSelector: {
			play: '#jp-live2-play',
			pause: '#jp-live2-pause',
			mute: '#jp-live2-mute',
			unmute: '#jp-live2-unmute'
		},
	});
	$('#volume-slider2').slider({
		value: ($("#live_player2")[0]?.lastChild.volume ?? 0) * 100,
		range: 'min',
		orientation: "vertical",
	
		slide: function(event, ui) {
			var volume = ui.value / 100;
			$("#live_player2").jPlayer("volume", volume);
		}
	});
}	
