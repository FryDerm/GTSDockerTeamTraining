gts.renewModule = (function($) {
    var model = {};
    var settings = {
        renewSelector: "#renew-items",
        itemsContainerSelector: ".plu-items",
        itemSelector: ".plu-item",
        cartUrl: "/shop/ViewCart.aspx",
        renewErrorSelector: ".renew-error",
        renewErrorText: "[L:GeneralAddRenewalToCartError]",
        addToCartLoading: ".loading"
    };
    
    model.init = function(options) {
        $.extend(settings, options);
    
        $("#plu-items").off("click.gts", ".plu-item .plu-more-info-link", moreInfoClick);
        $("#plu-items").on("click.gts", ".plu-item .plu-more-info-link", moreInfoClick);

        $("#plu-items").off("click.gts", ".plu-item .add-to-cart", addToCartClick);
        $("#plu-items").on("click.gts", ".plu-item .add-to-cart", addToCartClick);
    };

    function moreInfoClick(e) {
        e.preventDefault();
        var link = $(this);
        var moreElement = $(this).parent().next();

        moreElement.slideToggle(function () {
            if (moreElement.is(":visible")) {
                link.text("hide details");
            } else {
                link.text("more details");
            }
        });
    }

    function addToCartClick(e) {
        e.preventDefault();
        var item = $(this).closest(settings.itemSelector);
        var plu = item.data("plu");
        var visualId = $(this).closest(".plu-item-wrap").data("visualid"); //$(settings.renewSelector).data("visualid");
        var data = { Plu: plu, VisualId: visualId };
        
        $(settings.renewSelector).find(settings.renewErrorSelector).hide().text("");
        item.find(settings.addToCartLoading).show();

        gts.eGalaxyWebAPI.RenewalCart.Post(data, onCartPostSuccess, onCartPostError)
            .always(function() {
                item.find(settings.addToCartLoading).hide();
            });
    }

    function onCartPostSuccess() {
        window.location = settings.cartUrl;
    }
    
    function onCartPostError(data) {
        var errorMessage = settings.renewErrorText;
        $(settings.renewSelector).find(settings.renewErrorSelector).html("").append($("<p></p>"));
        
        try {
            var response = JSON.parse(data.responseText);

            if (response && response.Message) {
                if (response.Errors && response.Errors.length > 0) {
                    $(settings.renewSelector).find(settings.renewErrorSelector).append($("<ul></ul>"));
                    for (var i = 0; i < response.Errors.length; i++) {
                        $(settings.renewSelector).find(settings.renewErrorSelector).find("ul").append($("<li></li>").text(response.Errors[i]));
                    }
                }
                
                errorMessage = response.Message;
            }
        } catch(e) {
        } 

        $(settings.renewSelector).find(settings.renewErrorSelector).slideDown().find("p").text(errorMessage);
    }

    return model;
})(jQuery);