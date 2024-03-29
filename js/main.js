
$(document).ready(function(){
	var description = '';

	$('#beatPlaylist').ttwMusicPlayer(myPlaylist, {
		autoPlay:false,
		duration:true,
		currencySymbol:'€',
		description:description,
		jPlayer:{
			swfPath:'js/jquery-jplayer' //You need to override the default swf path any time the directory structure changes
		}
	});

	$('.togglePlaylist').on('click', function() {
        $('.tracklist').toggleClass('show-playlist');
		$('#tracklistDarkPane').addClass('show-darkPane');
    });
	
	$('body,document').on('click', '#fireLisences, .buy', function() {
		
		// Fix when pressed next song
		$('.track.playing').each(function(i) {
			
			if($(this).find('.buy.display-none').length !== 0){
				$('.error-purchase').addClass('show-buy-error');
				$('body').addClass('noScroll');
				$('#darkPane').addClass('show-darkPane');
			} else {
				$('.license-container').addClass('show-licenses');
				$('body').addClass('noScroll');
				$('#darkPane').addClass('show-darkPane');
			}
			
			var BuyCode = $(this).find('.buy:first').attr('href');
			var BuyTitle = $(this).find('.title:first').text();
			$('#paypal-hosted-button').val(BuyCode);
			$('#buyTitle').html('<span class="material-icons noSelect">music_note</span>'+BuyTitle+'<span class="material-icons noSelect">music_note</span>');
		});
    });
	
	// Automatically sets Buy Button Code for the first track
	setTimeout(function(){
		$('#paypal-hosted-button').val($('.tracks .track:first').find('.buy:first').attr('href'));
		$('#buyTitle').text($('.tracks .track:first').find('.title:first').text());
		
		$('.tracks .track:first').addClass('playing'); // Fix for new verification for item availability
	},1000);
	
	// Copies Buy Button values to final Buy Button
	$('body,document').on('click', '.track', function() {
		var BuyCode = $(this).find('.buy:first').attr('href');
		var BuyTitle = $(this).find('.title:first').text();
		$('#paypal-hosted-button').val(BuyCode);
		$('#buyTitle').html('<span class="material-icons noSelect">music_note</span>'+BuyTitle+'<span class="material-icons noSelect">music_note</span>');
    });
	
	
	// Scroll to finalBuy Button
	$('.licenseBuy').click(function() {
		$('.License-container').animate({
			scrollTop: $('#buyScrollPoint').offset().top
		}, 1000);
		
		$('#buyContainer').addClass('highlight-activated');
		setTimeout(function(){
			$('#buyContainer').removeClass('highlight-activated');
		},3000);
	});
	
	// Dark Pane
	$('#darkPane, #close-buyContainer, .closeErrorBox').on('click', function() {
		$('body').removeClass('noScroll');
		$('.site-menu').removeClass('site-menu-open');
		$('.license-container').removeClass('show-licenses');
		$('.error-purchase').removeClass('show-buy-error');
		$('.tracklist').removeClass('show-playlist');
		$('#darkPane').removeClass('show-darkPane');
    });
	
	// Tracklist Dark Pane
	$('body,document').on('click', '#tracklistDarkPane, .tracklist-header', function() {
		$('.tracklist').removeClass('show-playlist');
		$('#tracklistDarkPane').removeClass('show-darkPane');
    });
	
	
	// Roll Text
	var dictionary = "0123456789qwertyuiopasdfghjklzxcvbnm!?></\a`~+*=@#$%".split('');

	var el = document.querySelector('.rollText');

	var ran = function() {
		return Math.floor(Math.random() * dictionary.length)
	}

	var ranString = function(amt) {
		var string = '';
		for (var i = 0; i < amt; i++) {
			string += dictionary[ran()];
		}
		return string;
	}

	var rollText = function(str) {
		var count = str.length;
		var delay = 50;

		el.innerHTML = '';

		var gen = setInterval(function() {
			el.setAttribute('data-before', ranString(count));
			el.setAttribute('data-after', ranString(count));
			if (delay > 0) {
				delay--;
			} else {
				if (count < str.length) {
					el.innerHTML += str[str.length - count - 1];
				}
				count--;
				if (count === -1) {
					clearInterval(gen);
				}
			}
		}, 8);
	}

	$('.rollText').one( "click", function() {
		rollText('azelchun@gmail.com');
		setTimeout(function(){
			$('.contactMe').removeClass('rollText');
		},1000);
	});
	
	// Menu
	$('#menu-trigger').on('click', function() {
		$('body').addClass('noScroll');
		$('.site-menu').addClass('site-menu-open');
		$('.license-container').removeClass('show-licenses');
		$('#darkPane').addClass('show-darkPane');
    });
	
	// Detect if list item has no price
	setTimeout(function(){
		var matches = $('li.track .buy').filter(function() {
			if( !/[0-9]/.test( $(this).text() )){
			
				$(this).addClass('display-none');
			}
		});
		matches();
	},500);
	
	
});

