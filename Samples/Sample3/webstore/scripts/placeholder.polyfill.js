jQuery.validator.addMethod("notPlaceholder", function(value, element) {
	return (value !== $(element).attr('placeholder'));
}, "This field is required");

jQuery.support.placeholder = (function(){
    var el = document.createElement('input');
    return 'placeholder' in el;
})();

var blur = function(el){
	var ph = el.attr('placeholder'),
		val = el.val(); 
	if(ph && !val){
		el.val(ph);
		el.css('color', '#999');
	}
}
var focus = function(el){
	var ph = el.attr('placeholder'),
		val = el.val();

	if(ph && val === ph){
		el.val('');
		el.css('color', '');
	}
}

var addPlaceholderSupport = function(){
	if(!$.support.placeholder){
		$.each($('input[placeholder]'), function(index, element){
			blur($(element));
			$(element).focus(function(evt){
				var t = $(this);
				focus(t);
				t.blur(function(){
					blur(t);	
				});
			});
		}); 
	}
};