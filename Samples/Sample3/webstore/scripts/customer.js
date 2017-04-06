$(document).ready(function(){

	$('[data-js="mobile-menu"]').on('click', function(){
		var target = $(this).parent('.mobile');
		if(target.hasClass('open')){
			target.removeClass('open');
		}else{
			target.addClass('open')
		}
	});
});