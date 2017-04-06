gts.viewCartModule = (function($) {
	var model = { };
	var settings = {
	    storeExternalId: "",
	    categoryExternalId: "",
        continueCheckoutLink: "",
        continueShoppingLink: "",
        loyaltyLink: "",
        LoyaltyRedemptionInsufficientPointsMessage: "#LoyaltyRedemptionInsufficientPointsMessage",
        LoyaltyRedemptionMixedCostMessage: "#LoyaltyRedemptionMixedCostMessage"
	};
	var cartItems;
	var itemToConfirm;
	
	model.init = function (options) {
	    $.extend(settings, options);

	    $("#cart-items").off("click", ".cart-item-remove",removeCartItemClick);
	    $("#cart-items").on("click",  ".cart-item-remove",removeCartItemClick);

		$("#cart-addons").off("click", "a.add-addon", memberAddonClick);
		$("#cart-addons").on("click", "a.add-addon", memberAddonClick);

		$(".remove-modal").off("click", ".navigation .ok", removeFromCartOkClick);
		$(".remove-modal").on("click", ".navigation .ok", removeFromCartOkClick);

		$(".remove-modal").off("click", ".navigation .cancel", removeFromCartCancelClick);
		$(".remove-modal").on("click", ".navigation .cancel", removeFromCartCancelClick);

		$('.cart-update').off("click", ".update-cart", updateCartQuantityClick);
		$('.cart-update').on("click", ".update-cart", updateCartQuantityClick);

		$('#cart-items').off("change", ".qty-textbox", higlightEditQtyMode);
		$('#cart-items').on("change", ".qty-textbox", higlightEditQtyMode);

	    setContinueCheckoutLink();
	    setContinueShoppingLink();
	    addLoyalty();
	    refresh();
	};

	function onCartValidateSuccess() {
	    window.location.href = settings.continueCheckoutLink;
	}

	function validateDiscountRequirement(e) {
	    e.preventDefault();
	    gts.eGalaxyWebAPI.CartValidate.Get(onCartValidateSuccess, onError);
	}

	function setContinueCheckoutLink() {
	    $(".cart-links .continue-checkout").attr("href", settings.continueCheckoutLink);
	    $(".cart-links").off("click", ".continue-checkout", validateDiscountRequirement);
	    $(".cart-links").on("click", ".continue-checkout", validateDiscountRequirement);

	}

	function setContinueShoppingLink() {
	    $(".cart-links .continue-shopping").attr("href", settings.continueShoppingLink);
	}

    function higlightEditQtyMode() {
       $(this).closest('.cart-item').addClass('editmode');
    }

    function updateCartQuantityClick() {
        var dataToSend = [];

        $('.cart-item').each(function () {
            var qtyInput = $(this).find('.quantity-field input');
            if (qtyInput.length > 0) {
                var orderlineId = $(this).data("id");
                var qty = qtyInput.val();
                var oldQty = $(this).data("qty");
                if (qty !== undefined) {
                    if (parseInt(qty) != oldQty) {
                        var cartItem = { Quantity: qty, CategoryExternalId: settings.categoryExternalId, Id: orderlineId };
                        dataToSend.push(cartItem);
                    }
                }
            }
        });
        
        if (dataToSend.length === 0) {
            return;
        }
        var loading = $(this).closest(".cart-update").find(".loading");
        loading.show();

        gts.eGalaxyWebAPI.Cart.Put(dataToSend, onCartPutSuccess, onError);
                           
    }

    function onCartPutSuccess() {
        var loading = $(this).closest(".cart-update").find(".loading");
        loading.hide();

        $('.editmode').each(function () {
            $(this).removeClass("editmode");
        });
        
        refresh();
    }

    function postDiscountCode(e) {
        e.preventDefault();
        var discountCode = $("#discounts #discount-code").val();
        if (!discountCode)
            return;

        $("#discounts .error").hide();
        $("#discounts .loading").show();
        gts.eGalaxyWebAPI.discounts.post(discountCode)
            .done(function () {
                $("#discounts #discount-code").val("");
                refresh();
            })
            .fail(function() {
                $("#discounts .error").show();
                $("#discounts #discount-code").focus();
            })
            .always(function() {
                $("#discounts .loading").hide();
            });
    }

	function removeCartItemClick(e) {
		e.preventDefault();
		var item = $(this).closest(".cart-item");

		// Store the item we are confirming so that when the user makes a decision 
		// in the dialog, we know what item it was referencing.
		itemToConfirm = item;
		$("html, body").animate({ scrollTop: 0 }, 250);
		$(".remove-modal").fadeIn();
	}

	function addLoyalty() {
	    settings.loyaltyLink = settings.loyaltyLink;

	    if (gts.loyalty) {
	        gts.loyalty.add({
	            loyaltyLink: settings.loyaltyLink, onRefreshTotals: function (redeemPoints) {
	                refresh();
	            }
	        });
	    }
	}

	function removeFromCart(id, item) {
		return gts.eGalaxyWebAPI.Cart.Delete(id, function () {
			item.slideUp();
			refresh();
		}, onError);
	}

	function removeFromCartCancelClick() {
		itemToConfirm = null;
		$(".remove-modal").fadeOut(500);
	}

	function removeFromCartOkClick() {
		if (!itemToConfirm) {
			$(".remove-modal").fadeOut(500);
			return;
		}

		var loading = $(this).closest(".navigation").find(".loading");
		var id = itemToConfirm.data("id");

		loading.show();
		removeFromCart(id, itemToConfirm)
			.always(function() {
				loading.hide();
				$(".remove-modal").hide();
				itemToConfirm = null;
			});
	}

	function memberAddonClick(e) {
		e.preventDefault();
		var loadingImage = $(this).closest(".addon").find(".loading");
		loadingImage.show();
		var plu = $(this).closest(".addon").data("plu");
		var data = { Quantity: 1, CategoryExternalId: settings.categoryExternalId, Plu: plu };

		var dataArray = [data];

		gts.eGalaxyWebAPI.Cart.Post(dataArray, onCartPostSuccess, onError)
			.always(function() {
				loadingImage.hide();
			});
	}

	function onCartPostSuccess() {
		refresh();
	}

	function refresh() {
		gts.eGalaxyWebAPI.Cart.Get(onGet, onError);
	}

	function showPassSpecificInfo(cartItem) {
	    var deferred = $.Deferred();
	    // Get Product so that we can get the PassKind.
		gts.eGalaxyWebAPI.Product.Get({ plu: cartItem.Plu }, function(product) {
			if (!product || !product.PassKindId) {
			    deferred.resolve();
			    return;
			}
			// Get PassKind to determine the max number of member addons allowed.
			gts.eGalaxyWebAPI.PassKind.Get(product.PassKindId, function (passKind) {
			    var maxAddons = passKind.MaxAddons;
			    if (!passKind.JointMembership && !maxAddons) {
			        deferred.resolve();
			        return;
                }

                // Add a property to the cartItem to make it easier to determine if this is a joint membership.
			    cartItem.JointMembership = true;
			    gts.eGalaxyWebAPI.MemberAddons.Get({ passKindId: passKind.Id }, function (addons) {
			        if (!addons || addons.length === 0 || !canAddMoreMemberAddons(maxAddons, addons)) {
			            deferred.resolve();
			            return;
			        }

			        var addon;
			        for (var i = 0; i < addons.length; i++) {
			            addon = addons[i];
			            addon.PriceDisplay = Globalize.format(addon.Price, "c");
			        }
			        
			        cartItem.Addons = addons;
			        deferred.resolve();
			    }, function (data) {
			        onError(data);
			        deferred.reject();
			    });
			}, function (data) {
			    onError(data);
			    deferred.reject();
			});
		}, function (data) {
		    onError(data);
		    deferred.reject();
		});

	    return deferred.promise();
	}

    function renderMemberAddons() {
        var cartItem;
        var showAvailableAddons = false;
        for (var i = 0; i < cartItems.length; i++) {
            cartItem = cartItems[i];
            
            // Access that extra property we added the first time we loaded this cart item to see if we should bother trying to render addons.
            if (!cartItem.JointMembership || !cartItem.Addons) { continue; }
            showAvailableAddons = true;

            // Create a containing object so that the template only renders once.
            var addonsResult = { Items: cartItem.Addons };
            
            // Render The MemberAddons template
            $("#cart-addons").html($.trim($("#cart-addons-template").render(addonsResult))).fadeIn();
        }

        if (!showAvailableAddons) {
            $("#cart-addons").hide();
        }
    }
        
	function canAddMoreMemberAddons(maxAddons, addons) {
		var cartItem;
		var addon;
		var count = 0;
		for (var i = 0; i < cartItems.length; i++) {
			cartItem = cartItems[i];

			if (cartItem.ProductType === gts.eGalaxyWebAPI.Cart.ProductTypes.MemberAddon) {
				for (var j = 0; j < addons.length; j++) {
					addon = addons[j];
					if (addon && $.trim(addon.Plu) === $.trim(cartItem.Plu)) {
						count++;
					}
				}
			}
		}
		
                                                                                                        		return maxAddons === -1 || count < maxAddons;
	}
	
	function onGet(data) {
	    renderDiscount(data.CheckoutOptions);

		if (data.ValidationMessage !== "") {
			onError({ responseText: "\"" + data.ValidationMessage + "\"" });
			$("#cart-addons").hide();
			$(".cart-links .continue-checkout").hide();
		}

		var hasLoyalty = data.HasLoyaltyAccount;
		var loyaltyMode = data.LoyaltyMode;
        
		cartItems = data.Items;
		var loadingCartItemsDeferreds = [];
	    
		if (!data || !data.Items || data.Items.length === 0) {
		    $("#cart-addons").hide();
		    $(".cart-links .continue-checkout").hide();
		} else {		
			var cartItem;
			for (var i = 0; i < data.Items.length; i++) {
			    cartItem = data.Items[i];
				cartItem.TotalDisplay = Globalize.format(cartItem.Total, "c");
				cartItem.DiscountAmount = Globalize.format(cartItem.DiscountAmount, "c");
				cartItem.hasLoyalty = hasLoyalty;
			    cartItem.loyaltyMode = loyaltyMode;

				if (cartItem.ProductType === gts.eGalaxyWebAPI.Cart.ProductTypes.PassDetail) {
					loadingCartItemsDeferreds.push(showPassSpecificInfo(cartItem));
				}
			}
		    
			$.when.apply(null, loadingCartItemsDeferreds)
                .done(function () {
                    renderMemberAddons();
                });
		}

		$("#cart-items").html($.trim($("#cart-item-template").render(data.Items))).fadeIn();
		$("#cart-items .cart-item input[type=number]").spinner();
		
		renderTotals(data.Totals);
    }

	function renderDiscount(checkoutOptions) {
	    $("#cart-discounts").html($.trim($("#cart-checkoutoptions-template").render(checkoutOptions)));
	    $("#discounts").off("click.gts", "input[type=submit]", postDiscountCode);
	    $("#discounts").on("click.gts", "input[type=submit]", postDiscountCode);
    }

	function renderTotals(totals) {
	    totals.SubtotalDisplay = Globalize.format(totals.Subtotal, "c");
	    totals.FeesDisplay = Globalize.format(totals.Fees, "c");
	    totals.ShippingDisplay = Globalize.format(totals.Shipping, "c");
	    totals.TaxDisplay = Globalize.format(totals.Tax, "c");
	    totals.TotalDisplay = totals.RedemptionMode ? totals.RedemptionPoints : Globalize.format(totals.Total, "c");
	    totals.BonusAccrualPoints = totals.BonusAccrualPoints;
	    totals.TotalAccrualPoints = totals.AccrualPoints;
	    totals.IsRedemptionMode = totals.RedemptionMode;
	    totals.HasLoyaltyAccount = totals.HasLoyaltyAccount;
	    totals.HasEditableItems = totals.HasEditableItems;
		$("#cart-totals").html($.trim($("#cart-totals-template").render(totals)));

	    $(".cart-update").off("click", ".update-cart", updateCartQuantityClick);
	    $(".cart-update").on("click", ".update-cart", updateCartQuantityClick);
	}

    function onError(data) {
        var message = $.parseJSON(data.responseText);

        if (message === "LoyaltyRedemptionInsufficientPointsError") {
            $(settings.LoyaltyRedemptionInsufficientPointsMessage).show();
            $("html, body").animate({ scrollTop: 0 }, 500);
            alert('test');
        } else if (message === "LoyaltyRedemptionMixedCostError") {
            $(settings.LoyaltyRedemptionMixedCostMessage).show();
            $("html, body").animate({ scrollTop: 0 }, 500);
        } else {
            $("#ErrorMessage").text(message);
            $("#ErrorMessage").addClass("error-message");
            $("html, body").animate({ scrollTop: 0 }, 500);

            $.each($(".cart-item"), function(index, el) {
                el = $(el);
                var storedQuantity = cartItems[index].Quantity;
                el.find('.qty-textbox').val(storedQuantity);
            });

            var loading = $(".cart-update").find(".loading");
            loading.hide();
        }
	}

	return model;
})(jQuery);