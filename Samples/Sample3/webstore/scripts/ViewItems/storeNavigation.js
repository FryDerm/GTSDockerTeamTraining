gts.storeNavigation = (function($) {
	var model = { };

	var settings = {
		storeExternalId: "",
		categoryExternalId: "",
		on: {
			categorySelected: doNothing
		}
	};

	function doNothing() {
	}

	model.init = function(options) {
		$.extend(settings, options);

		$(".navigation-wrapper").on("click", ".title", function(e) {
			e.preventDefault();

			$(this).fadeOut(500);
			$("#category-nav").css({ marginLeft: 0 }).animate({ marginLeft: 300 }, 500, function() {
				$(this).hide().css({ marginLeft: 0 });
				$("#store-nav").css({ marginLeft: -300 }).show().animate({ marginLeft: 0 }, 500);
			});
		});

		$("ul#store-nav").on("click", "li a", function(e) {
			e.preventDefault();
			$("ul#store-nav li").removeClass("active");
			$(this).parent().addClass("active");
			settings.storeExternalId = $(this).parent().data("externalid");
			getCategories();
		});

		$("ul#category-nav").on("click", "li a", function(e) {
			settings.categoryExternalId = $(this).parent().data("externalid");
			$("ul#category-nav li").removeClass("active");
			$(this).parent().addClass("active");

			settings.on.categorySelected(settings.categoryExternalId, e);
		});

		gts.eGalaxyWebAPI.Stores.Get(onStoreGet)
			.pipe(getCategories);
	};

	function getCategories() {
		var categoryData = { sc: settings.storeExternalId };
		gts.eGalaxyWebAPI.Categories.Get(categoryData, onCategoryGet);
	}

	function onStoreGet(data) {
		$.each(data, function(i, e) {
			e.Active = e.ExternalId === settings.storeExternalId;
			e.Link = "shopping?CG=" + e.ExternalId;
		});

		$("#store-nav").html($.trim($("#store-nav-template").render(data)));
	}

	function onCategoryGet(data) {
		$.each(data, function(i, e) {
			e.Active = e.ExternalId === settings.categoryExternalId;
			e.Link = "shopping?CG=" + settings.storeExternalId + "&C=" + e.ExternalId;
		});

		if (data.length > 0) {
			$("#store-nav").css({ marginLeft: 0 }).animate({ marginLeft: -300 }, 500, function() {
				var activeStore = $("ul#store-nav li.active").text();
				$(".navigation-wrapper .title").text(activeStore).fadeIn(500);
				$(this).hide().css({ marginLeft: 0 });
				$("#category-nav").html($.trim($("#category-nav-template").render(data)));
				$("#category-nav").hide().css({ marginLeft: 300 }).show().animate({ marginLeft: 0 }, 500);
			});
		} else {
			$("#category-nav").hide();
			$("#store-nav").show();
		}
	}

	return model;
})(jQuery);