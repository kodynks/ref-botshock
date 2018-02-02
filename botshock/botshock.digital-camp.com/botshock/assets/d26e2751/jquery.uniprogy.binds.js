jQuery(document).ready(function($) {
	$('.uLoad').on('click', function(e) {
		e.preventDefault();
		var worklet = $(this).attr('name');
		$('#'+worklet).uWorklet().load({url: $(this).attr('href')});
	});
	$('.uDialog').on('click', function(e) {
		e.preventDefault();
		$.uniprogy.dialog($(this).attr('href'));
	});
});