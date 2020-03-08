
// Too lazy at this hour of the night for Vanilla
$(document).ready(function(){
	
	$('body').on( 'click', '.playMusicAction', function() {
		$('.artist-follow').removeClass('showTab');
		$('.artist-discography').addClass('showTab');
		$('.actionButton').removeClass('currentButton');
		$(this).addClass('currentButton');
	});
	
	$('body').on( 'click', '.showFollowAction', function() {
		$('.artist-discography').removeClass('showTab');
		$('.artist-follow').addClass('showTab');
		$('.actionButton').removeClass('currentButton');
		$(this).addClass('currentButton');
	});
	
	$('body').on( 'click', '.actionButton', function() {
		$([document.documentElement, document.body]).delay(300).animate({
			scrollTop: $('.artist-body').offset().top
		}, 500);
	});
	
	
	// Music Handlers
	
	$('.playSong').click(function(){
		var $this = $(this);
		var id = $this.attr('id').replace(/btn/, '');
		$this.toggleClass('active');
		if($this.hasClass('active')){
			$this.text('pause'); 
			$('audio[id^="sound"]')[id-1].play();        
		} else {
			$this.text('play_arrow');
			$('audio[id^="sound"]')[id-1].pause();
		}
	});
	
	$('#sound1').on('ended', function() {
		$('.playSong').text('play_arrow');
		$('.playSong').removeClass('active');
	});

});