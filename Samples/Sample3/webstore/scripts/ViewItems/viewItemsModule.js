gts.viewItemsModule = (function($) {
	var model = { };
	var settings = { };

	model.init = function(categoryExternalId) {
		if (!Globalize) {
			throw ("jQuery Globalize is missing.");
		}

		settings.categoryExternalId = categoryExternalId;
		getProducts();
	};

	model.CategorySelected = function(categoryExternalId, event) {
		event.preventDefault();

		if (settings.categoryExternalId === categoryExternalId) {
			return;
		}

		settings.categoryExternalId = categoryExternalId;
		getProducts();
	};

	function getProducts() {
		var data = { categoryExternalId: settings.categoryExternalId };
		gts.eGalaxyWebAPI.SalesChannelProducts.Get(data, onGet);
	}

	function onGet(data) {
		$.each(data, function(i, e) {
			e.Price = Globalize.format(e.Price, "c");
		});

		$("#plu-items").fadeOut(200, function() {
		    $(this).html($.trim($("#plu-item-template").render(data))).fadeIn(500);
		});

		$("#plu-items").off("click", ".plu-item .plu-more-info-link", moreInfoClick);
		$("#plu-items").on("click", ".plu-item .plu-more-info-link", moreInfoClick);

		$("#plu-items").off("click", ".plu-item .add-to-cart", addToCartClick);
		$("#plu-items").on("click", ".plu-item .add-to-cart", addToCartClick);
	}

	function addToCartClick(e) {
		e.preventDefault();
		var plu = $(this).closest(".plu-item").data("plu");
		var data = { Quantity: 1, CategoryExternalId: settings.categoryExternalId, Plu: plu };
		gts.eGalaxyWebAPI.Cart.Post(data, onCartPostSuccess);
	}

	function moreInfoClick(e) {
		e.preventDefault();
		var link = $(this);
		var moreElement = $(this).parent().next();

		moreElement.slideToggle(function() {
			if (moreElement.is(":visible")) {
				link.text("hide details");
			} else {
				link.text("more details");
			}
		});
	}

	function onCartPostSuccess() {
		// Temporary code to just go to the current view cart page.
		window.location = "Cart";
	}

	return model;
})(jQuery);