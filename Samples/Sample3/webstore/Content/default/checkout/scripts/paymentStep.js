/*
/webstore/checkout/index#step-payment
This code handles the payment payment and donations section of the checkout page
*/

gts.paymentStep = (function ($) {
    var model = {};    
    var settings = {
        selector: "#step-payment",
        template: "#payment-step-template",
        stepsElement: "#steps",
        name: "Payment Information",
        cart: {},
        cartTotalsTemplate: "#cart-totals-template",
        cartTotalsSelector: "#Cart",
        donationInfoSelector: "#donation-info",
        donationAutoRoundUpTemplate: "#auto-donation-template",
        donationRoundUpTemplate: "#roundup-donation-template",
        donationFixedTemplate: "#fixed-donation-template",
        donationEditableTemplate: "#editable-donation-template",
        donationAutoRoundUpRemoveButton: "#donation-auto input",
        donationRoundUpButton: "#donation-roundup input",
        donationFixedButton: "#donation-fixed input",
        donationEditableButton: "#donation-editable-button",
        donationAmountSelector: "#donation-editable-amount",
        contactAddressSelector: "#contact-address ul",
        contactAddressTemplate: "#contact-address-template",
        currentContactSelector: "ul.existing-contacts",
        contactLinkButtonSelector: "ul.existing-contacts li .link",
        contactUnlinkButtonSelector: "ul.existing-contacts li .unlink"
    };
    var loaded;
    
    /*
    Supported events:

    on.load()  // Called when this step is navigated to.
    */
    var on = {
        load: onLoad
    };

    model.add = function (options) {
        $.extend(settings, options.settings);
        $.extend(on, options.on);

        renderStep();

        var newStep = {
            selector: settings.selector,
            name: settings.name,
            data: model,
            on: {
                beforeNext: on.beforeNext,
                load: on.load
            }
        };

        gts.checkoutSteps.AddStep(newStep);

        return $.when();
    };

    model.isGiftedPurchase = function () {
        return settings.cart.CheckoutOptions.GiftedPurchase;
    };

    function onLoad() {
        if (!loaded) {
            gts.checkoutUI.init({
                checkoutForm: $("#checkout-form"),
                cart: settings.cart,
                on: {
                    updateCartTotals: updateCartTotals
                }
            });
            showDonationOptions();
            initNavigation();
        }

        showContactAddress();
        //gts.checkoutBillingContact.get();
        //gts.checkoutShippingContact.get();

        loaded = true;
    }

    function initNavigation() {
        $(settings.selector).off("click", settings.donationAutoRoundUpRemoveButton, removeAutoDonation);
        $(settings.selector).on("click", settings.donationAutoRoundUpRemoveButton, removeAutoDonation);
        $(settings.selector).off("click", settings.donationRoundUpButton, addRoundUpDonation);
        $(settings.selector).on("click", settings.donationRoundUpButton, addRoundUpDonation);
        $(settings.selector).off("click", settings.donationFixedButton, addFixedDonation);
        $(settings.selector).on("click", settings.donationFixedButton, addFixedDonation);
        $(settings.selector).off("click", settings.donationEditableButton, addEditableDonation);
        $(settings.selector).on("click", settings.donationEditableButton, addEditableDonation);
        $(settings.selector).off("click", settings.contactLinkButtonSelector, handleLinkCurrentContact);
        $(settings.selector).on("click", settings.contactLinkButtonSelector, handleLinkCurrentContact);
        $(settings.selector).off("click", settings.contactUnlinkButtonSelector, handleUnlinkCurrentContact);
        $(settings.selector).on("click", settings.contactUnlinkButtonSelector, handleUnlinkCurrentContact);
    }

    function addDonation(donation) {
    	var previousTotal = settings.cart.Totals.Total;

        return gts.eGalaxyWebAPI.donation.post(donation)
            .done(function() {
            	hideDonationOptions();

            	// If the previous total was zero, then save the contact and notes,
            	// and then reload the page to get the endorsement fields.
		        if (!previousTotal) {
			        $.blockUI();

			        var firstCalls = new DeferredList();

			        if (gts.orderNotes.HasNote())
				        firstCalls.add(gts.orderNotes.Post());

			        firstCalls.add(gts.checkoutBillingContact.save());
			        firstCalls.add(gts.checkoutShippingContact.save());

			        firstCalls.done(function() {
				        window.location.reload();
			        });

			        firstCalls.fail(gts.checkoutUI.failure);
		        }
	        })

            .fail(function() {

            });
    }

    function deleteDonation() {
        gts.eGalaxyWebAPI.donation.Delete()
            .done(function() {
                hideDonationOptions();
            })
            .fail(function() {

            });
    }

    function addEditableDonation(e) {
        e.preventDefault();
        var amount = $(settings.selector).find(settings.donationAmountSelector).spinner("value");
        if (!amount)
            return;
        
        var donation = { DonationType: gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptInEditable, Amount: amount };
        addDonation(donation);
    }

    function addFixedDonation(e) {
        e.preventDefault();
        var donation = { DonationType: gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptInFixed };
        addDonation(donation);
    }

    function addRoundUpDonation(e) {
        e.preventDefault();
        var donation = { DonationType: gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptInRoundUp };
        addDonation(donation);
    }
    
    function removeAutoDonation(e) {
        e.preventDefault();
        deleteDonation();
    }
    
    function hideDonationOptions() {
        $(settings.selector).find(settings.donationInfoSelector).slideUp();
        refreshCartTotals();
    }

    function showOptOutDonation() {
        var donation = gts.donationService.currentDonation(settings.cart.Items);
        if (donation) {
            var markup = $.trim($(settings.donationAutoRoundUpTemplate).render(donation));
            $(settings.selector).find(settings.donationInfoSelector).html(markup);
        }
    }

    function showOptInDonation() {
        var markup = $.trim($(settings.donationRoundUpTemplate).render({}));
        $(settings.selector).find(settings.donationInfoSelector).html(markup);
    }

    function showOptInFixedDonation() {
        var markup = $.trim($(settings.donationFixedTemplate).render({}));
        $(settings.selector).find(settings.donationInfoSelector).html(markup);
    }

    function showOptInEditableDonation() {
        gts.eGalaxyWebAPI.donation.get()
            .done(function(donation) {
                var markup = $.trim($(settings.donationEditableTemplate).render({}));
                $(settings.selector).find(settings.donationInfoSelector).html(markup);

                $(settings.selector).find(settings.donationAmountSelector).spinner({
                    min: donation.MinimumAmount,
                    max: donation.MaximumAmount,
                    step: 1.00,
                    start: donation.StartingAmount,
                    numberFormat: "C"
                }).spinner("value", donation.StartingAmount);
            });
    }
    
    function showDonationOptions() {
        var donationPromptType = settings.cart.CheckoutOptions.DonationPromptType;
        if (!donationPromptType || donationPromptType === gts.eGalaxyWebAPI.Cart.DonationPromptTypes.None)
            return;

        if (donationPromptType === gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptOut) {
            showOptOutDonation();
        } else if (donationPromptType === gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptInRoundUp) {
            showOptInDonation();
        } else if (donationPromptType === gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptInFixed) {
            showOptInFixedDonation();
        } else if (donationPromptType === gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptInEditable) {
            showOptInEditableDonation();
        }
    }

    function showContactAddress() {
	    var showLinkTo = true;
		//  Check if link to account is disabled for renewals
    	if (settings.cart.CheckoutOptions.RemoveLinkToAccount) {
		    for (var a = 0; a < settings.cart.Items.length; a++) {
		    	if (settings.cart.Items[a].IsRenewal) {
				    showLinkTo = false;
			    }
		    }
	    }

        gts.eGalaxyWebAPI.contacts.get()
            .done(function (data) {
                if (data === null) {
                    return;
                }

                var billToId = 0;
                var contact;
                var contacts = [];

                for (var i = 0; i < data.length; i++) {
                    contact = data[i];
                    var displayContact = {};

                    displayContact.Id = contact.Id;
                    displayContact.ContactGuid = contact.ContactGuid;
                    displayContact.Linked = contact.IsBillTo;

                    if (displayContact.Linked) {
                        billToId = displayContact.Id;
                    }
                    
                    displayContact.FirstName = contact.FirstName;
                    displayContact.LastName = contact.LastName;
                    displayContact.Name = displayContact.FirstName + " " + displayContact.LastName;

                    if (contact.NameTitle !== null)
                        displayContact.Name = contact.NameTitle + " " + displayContact.Name;

                    displayContact.Address1 = contact.StreetAddress1;
                    displayContact.Address2 = contact.StreetAddress2;

                    contacts.push(displayContact);
                }

		        if (showLinkTo) {
			        var markup = $.trim($(settings.contactAddressTemplate).render(contacts));
			        $(settings.selector).find(settings.contactAddressSelector).html(markup);

			        $(settings.selector).find(settings.contactUnlinkButtonSelector).hide();

			        if (billToId > 0) {
				        $(settings.selector).find(settings.contactAddressSelector).find("li[data-id=" + billToId + "]").find(".unlink").show();
				        $(settings.selector).find(settings.contactAddressSelector).find("li[data-id=" + billToId + "]").find(".link").hide();
			        }
		        }
            });
    }

    function renderStep() {
        $(settings.stepsElement).append($.trim($(settings.template).render(settings.cart)));
        updateCartTotals(settings.cart);
        addPlaceholderSupport();
    }

    function redirectToError() {
        window.location = "../error.aspx";
    }

    function refreshCartTotals() {
        gts.eGalaxyWebAPI.Cart.Get()
            .done(function (cart) {
                updateCartTotals(cart);
            })
            .fail(redirectToError);
    }

    model.refreshCartTotals = refreshCartTotals;
    
    function updateCartTotals(cartData) {
        settings.cart = cartData;
        var cartTotals = {
            Subtotal: Globalize.format(settings.cart.Totals.Subtotal, "c"),
            Fees: Globalize.format(settings.cart.Totals.Fees, "c"),
            Tax: Globalize.format(settings.cart.Totals.Tax, "c"),
            Shipping: Globalize.format(settings.cart.Totals.Shipping, "c"),
            Total: Globalize.format(settings.cart.Totals.Total, "c"),
            Discount: Globalize.format(settings.cart.Totals.Discount, "c"),
            AccrualPoints: settings.cart.Totals.AccrualPoints,
            BonusAccrualPoints: settings.cart.Totals.BonusAccrualPoints,
            RedemptionMode: settings.cart.Totals.RedemptionMode,
            RedemptionPoints: settings.cart.Totals.RedemptionPoints,
            HasLoyaltyAccount: settings.cart.HasLoyaltyAccount,
            LoyaltyMode: settings.cart.LoyaltyMode
        };
        
        $(settings.cartTotalsSelector).html($.trim($(settings.cartTotalsTemplate).render(cartTotals)));
    }

    function handleLinkCurrentContact(e) {
        e.preventDefault();
        var contactId = $(this).closest(settings.currentContactSelector + " li").data("id");
        gts.checkoutBillingContact.select(settings, contactId);
        showContactAddress();
    }

    function handleUnlinkCurrentContact(e) {
        e.preventDefault();
        gts.checkoutBillingContact.New(settings);
        showContactAddress();
    }

    return model;
})(jQuery);

gts.donationService = (function() {
    var model = {};

    model.currentDonation = function (cartItems) {
        if (!cartItems) return undefined;
        var cartItem;
        for (var i = 0; i < cartItems.length; i++) {
            cartItem = cartItems[i];
            if (cartItem.ProductType === gts.eGalaxyWebAPI.Cart.ProductTypes.Donation) {
                return cartItem;
            }
        }
        return undefined;
    };

    return model;
})();

// Legacy modules that need to be rewritten into the payment step.
gts.checkoutUI = (function ($) {
    var model = {};
    var doUpdateCartTotals = function(cartTotals) {
        gts.paymentStep.refreshCartTotals(cartTotals);
    };
    var settings = {
        cart: {}
    };
    var on = {
        updateCartTotals: doUpdateCartTotals
    };

    model.init = function(options) {
        $.extend(settings, options);

        if (!options.checkoutForm) {
            throw ("A jQuery wrapped form must be provided to gts.checkoutUI.init");
        }

        if (!$.blockUI) {
            throw ("jQuery BlockUI is not inculded.");
        }

        if (!gts.eGalaxyWebAPI) {
            throw ("eGalaxyWebAPI is not included.");
        }

        settings.checkoutForm = options.checkoutForm;

        initBlockUI();
        gts.checkoutExpiration.init();
        gts.checkoutDeliveryOption.init({ on: { updateCartTotals: on.updateCartTotals } });

        $.blockUI({ message: "<h3>[L:LoadingText]</h3>" });

        // all sync
        gts.orderNotes.init();
        gts.personalMessage.init();

        gts.checkoutTermsAndConditions.init();
        gts.checkoutNewsletterSurvey.init();
        gts.checkoutConfirmOrder.init({
            on: {
                submitOrder: submitOrder
            }
        });
        gts.checkoutCVV.init();
        gts.checkoutGuestNames.init();

        // this runs on form submit
        options.checkoutForm.submit(function (e) {
            try {
                e.preventDefault();


                if (!options.checkoutForm.validate) {
                    throw "missing validation plugin";
                }

                gts.checkoutValidation.validate();

                var valid = options.checkoutForm.valid();
                if (!valid) {
                    return false;
                }

                orderConfirmation();
            } catch (error) {
                gts.checkoutUI.JSError(error);
            }

            return true;
        });

        gts.checkoutValidation.init();
        activateAddress2Link();
        activateShippingAddress2Link();

        var giftedPurchase = gts.paymentStep.isGiftedPurchase();
        var list = new DeferredList();

        // all async
        list.add(gts.eGalaxyWebAPI.Config.Init());
        list.add(gts.eGalaxyWebAPI.Config.ShoppingCheckout.Init());
        list.add(getCountries());

        if (giftedPurchase) {
            list.add(getShippingCountries());
        }

        list.done(function () {
        	var secondList = new DeferredList();
	        secondList.add(gts.checkoutBillingContact.get());
	        secondList.add(gts.checkoutShippingContact.get());

	        secondList.done(function () {
		        // sync
		        getDefaultCountry();
		        if (giftedPurchase) {
			        // also sync
			        getShippingDefaultCountry();
		        }

		        var nextList = new DeferredList();

		        // async
		        nextList.add(getStates());
		        if (giftedPurchase) {
			        // async
			        nextList.add(getShippingStates());
		        }
		        // all async
		        nextList.add(gts.checkoutDeliveryOption.Get());

		        nextList.done($.unblockUI);
		        nextList.fail(redirectToError);
	        });
        });
    };

    function orderConfirmation() {
        if (gts.eGalaxyWebAPI.Config.ShoppingCheckout.DisplayOrderConfirmationPrompt) {
            $.unblockUI();
            gts.checkoutConfirmOrder.Prompt();
        } else {
            submitOrder();
        }
    }

    function isZeroDollarTransaction() {
        return (settings.cart.CheckoutOptions.AllowZeroDollarTransactions && settings.cart.Totals.Total <= 0);
    }

    function verifyPayment() {
        // Don't send a payment if one isn't required. If one isn't sent and it is required, it will error.
        if (settings.cart.CheckoutOptions.IsIndirectPaymentProvider || isZeroDollarTransaction()) {
            return $.when();
        }
        return gts.checkoutPayment.Post();
    }

    function submitOrder() {

        $.blockUI();

        var firstCalls = new DeferredList();

        // these 6 ajax requests can be in any order, but must be finsihed before moving on.
        if (gts.orderNotes.HasNote())
            firstCalls.add(gts.orderNotes.Post());

        if (gts.personalMessage.hasMessage())
            firstCalls.add(gts.personalMessage.Post());

        firstCalls.add(gts.checkoutBillingContact.save());
        firstCalls.add(gts.checkoutShippingContact.save());
        firstCalls.add(gts.DualRelationshipStep.process());

        var newsletterSurveyCalls = gts.checkoutNewsletterSurvey.Post();
		for (var i = 0; i < newsletterSurveyCalls.length; i++) {
			firstCalls.add(newsletterSurveyCalls[i]);
		}

        if (!gts.checkoutGuestNames.Processed()) {
            firstCalls.add(gts.checkoutGuestNames.Process());
        }

        // once those 6 finish
        firstCalls.done(function () {

            var secondCalls = new DeferredList();

            // do this other one, but only if posted
            if (!gts.checkoutPayment.Posted()) {
                secondCalls.add(verifyPayment());
            }

            // then, FINALLY, after all that, make the request to finalize the order
            secondCalls.done(function () {

                // if NOT indirect, or zero dollar - most cases
                var thirdCalls = new DeferredList();

                // if NOT indirect, or zero dollar - most cases
                if (isZeroDollarTransaction() || !settings.cart.CheckoutOptions.IsIndirectPaymentProvider)
                    thirdCalls.add(gts.eGalaxyWebAPI.finalizeOrder.post());

                thirdCalls.done(function() {
                    if (!isZeroDollarTransaction() && settings.cart.CheckoutOptions.IsIndirectPaymentProvider) {
                        window.location = "PaymentPOST.ashx";
                    } else {
                        window.location = "OrderConfirmation.aspx";
                    }
                });

                thirdCalls.fail(failure);
            });

            secondCalls.fail(failure);
        });

        firstCalls.fail(failure);
    }

    function failure(e) {
        $.unblockUI();
        var jsXhr = e[0];
        var textStatus = e[1];
        var error = e[2];

        if ((jsXhr.status && jsXhr.status === 403) || (error && error === 403)) { //  Response == forbidden
            $("#ErrorMessage").html($.parseJSON(jsXhr.responseText));
        } else {
            $("#ErrorMessage").html("[L:UnexpectedError]");
        }
    }

	model.failure = failure;

    function getCountries() {
        return gts.countries.Get($("#Countries"));
    }

    function getShippingCountries() {
        return gts.countries.Get($("#ShippingCountries"));
    }

    function getDefaultCountry() {
    	var defaultCountry = gts.countries.DefaultCountry();

    	$('#Countries option[value="' + defaultCountry + '"]').prop('selected', 'selected');

        $('#Countries').trigger('change');
    }

    function getShippingDefaultCountry() {
        var defaultCountry = gts.countries.DefaultCountry();

        $('#ShippingCountries option[value="' + defaultCountry + '"]').prop('selected', 'selected');

        $("#ShippingCountries").change(function () {
            getShippingStates();
        });
    }
    
    function getStates() {
        var countryCode = $("#Countries").val();
        return gts.states.Get(countryCode, $("#States"), $("#State"));
    }

    function getShippingStates() {
        var countryCode = $("#ShippingCountries option:selected").val();
        return gts.states.Get(countryCode, $("#ShippingStates"), $("#ShippingState"));
    }

    function initBlockUI() {
        $.blockUI.defaults.fadeIn = 0;
        $.blockUI.defaults.fadeOut = 100;
        $.blockUI.defaults.message = "<h3>[L:ProcessingText]</h3>";
    }

    function activateAddress2Link() {
        settings.checkoutForm.on("click", ".additional-address", function (e) {
            e.preventDefault();
            $(".address2-form-field").slideDown().find('input').focus();
            $(this).hide();
        });
    }

    function activateShippingAddress2Link() {
        settings.checkoutForm.on("click", ".shipping-additional-address", function (e) {
            e.preventDefault();

            var fieldAttributes = {
                ShippingAddress2 : {
                     display : true
                }
            };

            gts.checkoutStateManager.processNewFields(fieldAttributes);
        });
    }

    function redirectToError() {
        window.location = "../error.aspx";
    }

    model.JSError = function (error) {
        $("#ErrorMessage").html("[L:UnexpectedError]");
        $("#ErrorMessage").addClass("error-message");
        throw new Error(error.message); // throw new error so that js execution stops
    };

    model.DisplayError = function (data) {
        if (!data || !data.responseText) {
            model.JSError(data);
        }
        var message = $.parseJSON(data.responseText);
        $("#ErrorMessage").html(message);
        $("#ErrorMessage").addClass("error-message");
    };

    return model;

}(jQuery));

gts.checkoutStateManager = (function() {

    var defaults = {
        FirstName: {
            container: '',
            display: true,
            rules: { required: true, onfocusout: false, notPlaceholder: true },
            messages: { required: "[LG:Payment-FirstNameNull]", notPlaceholder: "[LG:Payment-FirstNameNull]" }
        },

        LastName: {
            container: '',
            display: true,
            rules: { required: true, onfocusout: false, notPlaceholder: true },
            messages: { required: "[LG:Payment-LastNameNull]", notPlaceholder: "[LG:Payment-LastNameNull]" },
        },

        Endorsement: {
            container: '',
            display: true,
            rules: { required: true, creditcard: true },
            messages: { required: "[LG:Payment-EndorsementNull]" }
        },

        ExpirationMonth: {
            container: '',
            display: true,
            rules: { required: true, valueNotEqual: "label" },
            messages: { required: "[LG:Payment-InvalidExpirationDate]", valueNotEqual: "[LG:Payment-MonthNotSelected]" }
        },
        ExpirationYear: {
            container: '',
            display: true,
            rules: { required: true, valueNotEqual: "label" },
            messages: { required: "[LG:Payment-InvalidExpirationDate]", valueNotEqual: "[LG:Payment-YearNotSelected]" }
        },
        CVV: {
            container: '',
            display: true,
            rules: { required: true, onfocusout: false, checkValidInputFormat: /^[a-z0-9]+$/i },
            messages: { required: "[LG:Payment-CVVNull]", checkValidInputFormat: "CVV input format not valid" }
        },
        DeliveryOption: {
            container: '',
            display: true,
            rules: { required: true, valueNotEqual: "label" },
            messages: { required: "[LG:Payment-InvalidExpirationDate]", valueNotEqual: "[LG:Payment-YearNotSelected]" }
        },

        TermsConditions: {
            container: '',
            display: true,
            rules: { requireChecked: true },
            messages: { requireChecked: "[L:TermsAndConditionsRequirement]" }
        },

        Address: {
            container: '',
            display: true,
            rules: { required: true },
            messages: { required: "[LG:Payment-AddressNull]" },

        },
        City: {
            container: '',
            display: true,
            rules: { required: true },
            messages: { required: "[LG:Payment-CityNull]" }
        },
        Countries: {
            container: '',
            display: true,
            rules: { required: true }
            // intentionally no messages I guess
        },

        States: {
            container: '',
            display: true,
            rules: { required: "#States:visible" }
            // no messages
        },

        State: {
            container: '',
            display: true,
            rules: { required: "#State:visible" }
            // no messages
        },

        Zip: {
            container: '',
            display: true,
            rules: { required: true, checkValidInputFormat: /^[A-Za-z0-9\- _]*[A-Za-z0-9][A-Za-z0-9\- _]*$/i },
            messages: { required: "[LG:Payment-ZipNull]", checkValidInputFormat: "Invalid input format for Zip" }
        },
        
        Email: {
            container: '',
            display: true,
            rules: { required: true, email: true },
            messages: { required: "[LG:Payment-EmailNull]" }
        },

        ShippingFirstName: {
            container: '[name="ShippingFirstName"]',
            display: true,
            rules: { required: true, onfocusout: false, notPlaceholder: true },
            messages: { required: "[LG:Payment-ShippingFirstNameNull]", notPlaceHolder: "[LG:Payment-ShippingFirstNameNull]" }
        },

        ShippingMiddleName : {
            container: 'input[name="ShippingMiddleName"]',
            display: true,
            rules : {required : false}
        },

        ShippingLastName: {
            container: '[name="ShippingLastName"]',
            display: true,
            rules: { required: true, onfocusout: false, notPlaceholder: true },
            messages: { required: "[LG:Payment-ShippingLastNameNull]", notPlaceHolder: "[LG:Payment-ShippingLastNameNull]" }
        },

        ShippingAddress: {
            container: '.shippingaddress-form-field',
            display: true,
            rules: { required: true },
            messages: { required: "[LG:Payment-ShippingAddressNull]" }
        },

        ShippingAddress2: {
            container: '.shipping-address2-form-field',
            display: false,
            rules: { required: false },
            messages: { required: "[LG:Payment-ShippingAddressNull]" }
        },

        ShippingCity: {
            container: '.shipping-city-form-field',
            display: true,
            rules: { required: true },
            messages: { required: "[LG:Payment-ShippingCityNull]" }
        },

        ShippingStates: {
            container: '.shipping-state-form-field',
            display: true,
            rules: { required: true }
        },

        ShippingState: {
            container: '.shipping-state-form-field',
            display: true,
            rules: { required: true }
        },

        ShippingZip: {
            container: '.shipping-zip-form-field',
            display: true,
            rules: { required: true },
            messages: { required: "[LG:Payment-ShippingZipNull]" }
        },

        ShippingCountries : {
            container: '.shipping-country-form-field',
            display: true,
            rules: { required: true }
        },

        ShippingPhoneNumber : {
            container: '.shipping-phone-form-field',
            display: true,
            rules : {required : false}
        },

        ShippingEmail: {
            container: '.shipping-email-form-field',
            display: true,
            rules: { required: true },
            messages: { required: "[LG:Payment-ShippingEmailNull]" }
        }
    };

    // Deep copy defaults to fields
    var fields = {};
    $.extend(true, fields, defaults);

    var self = {};

    function processStates (prop) {
        // if the property is a state
        if (prop === 'ShippingState') {
            if (!fields.ShippingState.display) {
                fields.ShippingStates.display = false;
            } else {
                fields.ShippingStates.display = true;
            }
        }
    }

    self.showHideElements = function(){
        $.each(fields, function (prop, field) {
            processStates(prop);
            var target = $(field.container);
            var display = field.display ? target.show() : target.hide();
        });

        var showLink = !fields.ShippingAddress2.display;

        if (showLink) {
            $('.shipping-additional-address').show();
        } else {
            $('.shipping-additional-address').hide();
        }
    };

    self.clearErrors = function() {
        $('div.input-validation-error').remove();
        $('.input-validation-error').removeClass('input-validation-error');
    };

    self.processNewFields = function (attrs) {
        $.extend(true, fields, defaults);

        if (!$.isEmptyObject(attrs)) {
            $.each(attrs, function(prop, attr) {
                if (fields[prop]) {
                    fields[prop].rules.required = attr.required;
                    fields[prop].display = attr.display;
                }
            });
        }

        self.clearErrors();
        self.showHideElements();
    };

    self.getRules = function() {

        var rules = {};
        $.each(fields, function(prop, field){
            rules[prop] = field.rules;
        });

        return rules;
    };

    self.getMessages = function(){

        var messages = {};
        $.each(fields, function(prop, field){
            messages[prop] = messages.rules;
        });

        return messages;
    };

    self.getDefaults = function () {
        return defaults;
    };

    return self;
})();

gts.checkoutValidation = (function () {
    var model = {};

    model.init = function () {
        $.validator.addMethod("requireChecked", function (value, element) {
            return $(element).is(":checked");
        }, "");

        $.validator.addMethod("valueNotEqual", function (value, element, notEqualValue) {
            return notEqualValue !== value;
        }, "");
        
        $.validator.addMethod("checkValidInputFormat", function (value, element, regexExpression) {
            return this.optional(element) || regexExpression.test(value);
        }, "[LG:Payment-InvalidInputFormat]");
        
        model.validate();
    };

    model.validate = function () {

        // Remove the previous validator information, otherwise this validate call does nothing.
        $.removeData($("#checkout-form")[0], "validator");

        $("#checkout-form").validate({
            rules: gts.checkoutStateManager.getRules(),
            messages : gts.checkoutStateManager.getMessages(),
            errorClass: "input-validation-error",
            errorPlacement: function (error, element) {
                var name = element.attr("name");

                switch (name) {
                    case "FirstName":
                    case "LastName":
                        error.insertAfter("#lastNameClear");
                        break;
                    case "TermsConditions":
                        error.insertAfter(".terms-conditions-form-field");
                        break;
                    case "Endorsement":
                        error.insertAfter("#Endorsement");
                        break;
                    case "ExpirationMonth":
                    case "ExpirationYear":
                    case "CVV":
                        error.insertAfter("#cvvAdditional");
                        break;
                    case "Address":
                        error.insertAfter("#addressAdditional");
                        break;
                    case "City":
                        error.insertAfter("#City");
                        break;
                    case "Zip":
                        error.insertAfter("#Zip");
                        break;
                    case "Email":
                        error.insertAfter("#Email");
                        break;
                    case "ShippingFirstName":
                    case "ShippingLastName":
                        error.insertAfter("#shippingLastNameClear");
                        break;
                    case "ShippingAddress":
                        error.insertAfter("#ShippingAddress");
                        break;
                    case "ShippingCity":
                        error.insertAfter("#ShippingCity");
                        break;
                    case "ShippingZip":
                        error.insertAfter("#ShippingZip");
                        break;
                    case "ShippingEmail":
                        error.insertAfter("#ShippingEmail");
                        break;
                    case "ShippingPhoneNumber":
                        error.insertAfter("#ShippingPhoneNumber");
                        break;
                }
            },
            errorElement: "div",
            onfocusin: false,
            onfocusout: false
        });
    };

    return model;
})();

gts.checkoutExpiration = (function ($) {
    var model = {};

    model.init = function () {
        initMonth();
        initYear();
    };

    function initMonth() {
        $("#ExpirationMonth").empty();
        $("#ExpirationMonth").append("<option value='label'>[L:Month]</option>");

        for (var month = 1; month < 13; month++) {
            $("#ExpirationMonth").append("<option value=" + month + ">" + month + "</option>");
        }
    }

    function initYear() {
        $("#ExpirationYear").empty();
        $("#ExpirationYear").append("<option value='label'>[L:Year]</option>");

        var currentYear = new Date().getFullYear();
        for (var year = currentYear; year < currentYear + 17; year++) {
            $("#ExpirationYear").append("<option value=" + year + ">" + year + "</option>");
        }
    }

    return model;
})(jQuery);

gts.countries = (function ($) {
    var model = {};
    var countriesCache = {};
    var loaded = false;

    model.DefaultCountry = function () {
        return gts.eGalaxyWebAPI.Config.General.DefaultCountryCode;
    };

    model.Get = function (countriesInput) {

        if (loaded) {
            populateCountries(countriesCache, countriesInput);
            return $.when();
        }

        return gts.eGalaxyWebAPI.Countries.Get(function (data) {

            countriesCache = data;
            loaded = true;

            populateCountries(data, countriesInput);
        }, onError);
    };

    function populateCountries(countries, countriesInput) {
        countriesInput.empty();
        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];
            var option = $("<option></option>").text(country.Name).val(country.Code);
            countriesInput.append(option);
        }
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;

})(jQuery);

gts.states = (function ($) {
    var model = {current: 1};
    var statesCache = {};

    model.SelectedValue = function (selectInput, textInput) {
        return (selectInput.is(":visible")) ? selectInput.find("option:selected").val() : textInput.val();
    };

    model.Get = function (countryCode, selectInput, textInput) {
        var data = {};
        data.CountryCode = countryCode;
        
        if (statesCache[data.CountryCode] && statesCache[data.CountryCode].length > 0) {
	        model.current++;
        	var i = model.current;
            populateStates(statesCache[data.CountryCode], selectInput, textInput, i);
            return $.Deferred().resolve().promise();
        }

        return gts.eGalaxyWebAPI.States.Get(data, function (result) {
        	model.current++;
        	var i = model.current;
            statesCache[data.CountryCode] = result;
            populateStates(result, selectInput, textInput, i);
        }, onError);
    };

    function populateStates(states, selectInput, textInput, callIndex) {
    	if (callIndex !== model.current) return;

        selectInput.empty();
        textInput.val("");

        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            var option = $("<option></option>").text(state.Name).val(state.Abbreviation);

            if (state.DefaultLocale) {
                option.attr("selected", "selected");
            }
            selectInput.append(option);
        }

        toggleVisibility(selectInput, textInput);
    }

    function toggleVisibility(selectInput, textInput) {
        var count = selectInput.find("option").length;

        if (count === 0) {
            selectInput.hide();
            textInput.show();
        } else {
            selectInput.show();
            textInput.hide();
        }
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
})(jQuery);

gts.checkoutConfirmOrder = (function ($) {
    var model = {};

    var on = {
        submitOrder: function () { }
    };
    
    model.init = function (options) {
        $.extend(on, options.on);

        $("#ConfirmOrderDialog").dialog({
            autoOpen: false,
            modal: true,
            dialogClass: "dialogButtons",
            resizable: false,
            width: 450,
            title: "[L:ConfirmOrderDialogTitle]",
            buttons: [
				{
				    text: "[L:ConfirmOrderDialogCancel]",
				    click: function () {
				        $(this).dialog("close");
				    }
				},
				{
				    text: "[L:ConfirmOrderDialogOk]",
				    click: function () {
				        $(this).dialog("close");
				        on.submitOrder();
				    }
				}
            ],
            open: function () {
                $("div.dialogButtons div button:nth-child(2)").focus();
            }

        });

        $("div.dialogButtons div button:nth-child(1)").addClass("cancelButton");
        $("div.dialogButtons div button:nth-child(2)").addClass("okButton");
    };


    // display billing and or shipping dialog if configured
    model.Prompt = function () {
        try {
            var billing = getBilling();
            $("#ConfirmOrderBilling .text").html(billing);

            if (gts.paymentStep.isGiftedPurchase()) {
                var shipping = getShipping();
                $("#ConfirmOrderShipping .text").html(shipping);
            } else {
                $("#ConfirmOrderShipping").hide();
            }

            if (isCardNeeded()) {
                var maskedCreditCard = getMaskedCreditCard();
                $("#ConfirmOrderMaskedCardNumber .text").html(maskedCreditCard);
            }

            var deliveryMethod = getDeliveryMethod();
            $("#ConfirmOrderDeliveryMethod .text").html(deliveryMethod);

            var orderTotal = getOrderTotal();
            $('#ConfirmOrderTotal .text').html(orderTotal);

            $("#ConfirmOrderDialog").dialog("open");
            $(".ui-dialog-titlebar").show();
        }
        catch (error) {
            gts.checkoutUI.JSError(error);
        }
    };

    function getBilling() {
        var billing;
        billing = $("#FirstName").val() + " " + $("#LastName").val() + "<br />";
        billing += $("#Address").val() + "<br />";

        if ($("#Address2").val() !== "") {
            billing += $("#Address2").val() + "<br />";
        }

        billing += $("#City").val() + " " + gts.states.SelectedValue($("#States"), $("#State")) + ", " + $("#Zip").val() + "<br />";
        billing += "<br />[L:ConfirmOrderEmail]: " + $("#Email").val() + "<br />";

        if ($("#PhoneNumber").val() !== "") {
            billing += "[L:ConfirmOrderPhone]: " + $("#PhoneNumber").val() + "<br />";
        }
        return billing;
    }

    function getShipping() {
        var shipping;

        shipping = $("#ShippingFirstName").val() + " " + $("#ShippingLastName").val() + "<br />";
        shipping += $("#ShippingAddress").val() + "<br />";

        if ($("#ShippingAddress2").val() !== "") {
            shipping += $("#ShippingAddress2").val() + "<br />";
        }

        shipping += $("#ShippingCity").val() + " " + gts.states.SelectedValue($("#ShippingStates"), $("#ShippingState")) + ", " + $("#ShippingZip").val() + "<br />";
        shipping += "<br />[L:ConfirmOrderEmail]: " + $("#ShippingEmail").val() + "<br />";

        if ($("#ShippingPhoneNumber").val() !== "") {
            shipping += "[L:ConfirmOrderPhone]: " + $("#ShippingPhoneNumber").val() + "<br />";
        }

        return shipping;
    }
    
    function getMaskedCreditCard() {
        var startPos = $("#Endorsement").val().length - 4;
        var lastFour = $("#Endorsement").val().substr(startPos, 4);
        return "xxxx-xxxx-xxxx-" + lastFour;
    }

    function getDeliveryMethod() {
        return $('#DeliveryOption option:selected').text();
    }

    function getOrderTotal(){
        return $('#TotalValue').text();
    }

    function isCardNeeded(){
        var ccEl = $('#Endorsement');
        return ccEl.length;
    }

    return model;
}(jQuery));

gts.checkoutOrder = (function ($) {
    var model = {};
    var orderData;

    model.Data = function () {
        return orderData;
    };

    model.Get = function () {
        return gts.eGalaxyWebAPI.Order.Get(onGet, onError);
    };

    function onGet(data) {
        orderData = data;
        var total = Globalize.format(data.Totals.Total, "c");

        $("#TotalValue").html(total);
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));


gts.checkoutBillingContact = (function ($) {
    var model = {};
    var billingContactId;

    model.get = function () {
        return gts.eGalaxyWebAPI.BillingContact.get(onGet, onError);
    };

    model.New = function (settings) {
        billingContactId = 0;
        var data = {};

        return gts.eGalaxyWebAPI.BillingContact.post(data)
            .done(function (returnData) {
                billingContactId = returnData.Id;
                clearDisplay();

                $(settings.selector).find(settings.contactUnlinkButtonSelector).hide();
                $(settings.selector).find(settings.contactLinkButtonSelector).show();
            })
            .fail(function() {
                gts.checkoutUI.DisplayError(data);
            });
    };

    model.save = function () {
        var data = {};
        
        data.Id = billingContactId;
        data.FirstName = $("#FirstName").val();
        data.MiddleName = $("#MiddleName").val();
        // ie 9 fix
        if (data.MiddleName.toLowerCase() === 'middle')
            data.MiddleName = '';
        data.LastName = $("#LastName").val();
        data.StreetAddress1 = $("#Address").val();
        data.StreetAddress2 = $("#Address2").val();
        data.City = $("#City").val();
        data.State = gts.states.SelectedValue($("#States"), $("#State"));
        data.PostalCode = $("#Zip").val();
        data.CountryCode = $('#Countries option:selected').val();
        data.EmailAddress = $("#Email").val();
        data.PhoneNumber = $("#PhoneNumber").val();

        if (data.Id) {
            return gts.eGalaxyWebAPI.BillingContact.put(data, onPost, onError);
        } else {
            return gts.eGalaxyWebAPI.BillingContact.post(data, onPost, onError);
        }
    };

    model.select = function (settings, contactId) {
        var data = {};
        data.Id = contactId;

        return gts.eGalaxyWebAPI.BillingContact.put(data)
            .done(function (contactData) {
                $(settings.selector).find(settings.contactAddressSelector).find("li[data-id=" + data.Id + "]").find(".unlink").show();
                $(settings.selector).find(settings.contactAddressSelector).find("li[data-id=" + data.Id + "]").find(".link").hide();

                if (billingContactId === data.Id) return;

                billingContactId = data.Id;

                $("#FirstName").val(contactData.FirstName);
                $("#LastName").val(contactData.LastName);
                $("#Address").val(contactData.StreetAddress1);
                $("#Address2").val(contactData.StreetAddress2);
                $("#City").val(contactData.City);

                // Don't change the default values if we just don't have a billing contact.
                if (data.Country) {
                	$("#Countries").val(contactData.Country);
                	$("#Countries").trigger("change");
                }
                if (contactData.State) {
                    $("#States, #State").val(contactData.State);
                }

                $("#Zip").val(contactData.PostalCode);
                $("#Email").val(contactData.EmailAddress);
                $("#PhoneNumber").val(contactData.PhoneNumber);
            })
            .fail(function () {
                gts.checkoutUI.DisplayError(contactData);
            });
    };

    function clearDisplay() {
        $("#FirstName").val("").trigger('blur');
        $("#LastName").val("").trigger('blur');
        $("#Address").val("");
        $("#Address2").val("");
        $("#City").val("");

        // TODO: set the defaults if we do not have values

        $("#Zip").val("");
        $("#Email").val("");
        $("#PhoneNumber").val("");
    }

    function onGet(data) {
        billingContactId = data.Id;

        if(data.FirstName.Value){
            $("#FirstName").val(data.FirstName.Value);   
        }
        if(data.LastName.Value){
            $("#LastName").val(data.LastName.Value);
        }

        $("#Address").val(data.StreetAddress1.Value);
        $("#Address2").val(data.StreetAddress2.Value);
        $("#City").val(data.City.Value);

        // Don't change the default values if we just don't have a billing contact.
	    if (data.Country.Value) {
		    $("#Countries").val(data.Country.Value);
		    gts.states.Get(data.Country.Value, $("#States"), $("#State"))
			    .pipe(function() {
				    if (data.State.Value) {
					    $("#States, #State").val(data.State.Value);
				    }
			    });
	    }

	    $("#Zip").val(data.PostalCode.Value);
        $("#Email").val(data.EmailAddress.Value);
        $("#PhoneNumber").val(data.PhoneNumber.Value);

        $("#Endorsement").val(data.Endorsement.Value);
        $("#ExpirationMonth").val(data.ExpirationMonth.Value);
        $("#ExpirationYear").val(data.ExpirationYear.Value);
    }

    function onPost() {
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));


gts.checkoutShippingContact = (function ($) {
    var model = {};
    var shippingContactId;
    var giftedPurchase;

    model.get = function () {
        return gts.eGalaxyWebAPI.ShippingContact.get(onGet, onError);
    };

    model.save = function () {
        var data = {};

        var prefix = gts.paymentStep.isGiftedPurchase() ? '#Shipping' : '#';

        data.Id = shippingContactId;
        data.FirstName = $(prefix + "FirstName").val();
        data.MiddleName = $(prefix + "MiddleName").val();
        // ie 9 fix
        if (data.MiddleName.toLowerCase() === 'middle')
            data.MiddleName = '';
        data.LastName = $(prefix + "LastName").val();
        data.StreetAddress1 = $(prefix + "Address").val();
        data.StreetAddress2 = $(prefix + "Address2").val();
        data.City = $(prefix + "City").val();
        data.State = gts.states.SelectedValue($(prefix + "States"), $(prefix + "State"));
        data.PostalCode = $(prefix + "Zip").val();
        data.CountryCode = $(prefix + 'Countries option:selected').val();
        data.EmailAddress = $(prefix + "Email").val();
        data.PhoneNumber = $(prefix + "PhoneNumber").val();

        if (data.Id) {
            return gts.eGalaxyWebAPI.ShippingContact.put(data, onPost, onError);
        } else {
            return gts.eGalaxyWebAPI.ShippingContact.post(data, onPost, onError);
        }
    };

    function onGet(data) {
        giftedPurchase = data.GiftedPurchase;

        if (!giftedPurchase) {
            return;
        }

        shippingContactId = data.Id;

        if (data.FirstName.Value) {
            $("#ShippingFirstName").val(data.FirstName.Value);
        }
        if (data.LastName.Value) {
            $("#ShippingLastName").val(data.LastName.Value);
        }

        $("#ShippingAddress").val(data.StreetAddress1.Value);
        $("#ShippingAddress2").val(data.StreetAddress2.Value);
        $("#ShippingCity").val(data.City.Value);

        // Don't change the default values if we just don't have a billing contact.
        if (data.Country.Value) {
            $("#ShippingCountries").val(data.Country.Value);
        }
        if (data.State.Value) {
            $("#ShippingStates, #ShippingState").val(data.State.Value);
        }

        $("#ShippingZip").val(data.PostalCode.Value);
        $("#ShippingEmail").val(data.EmailAddress.Value);
        $("#ShippingPhoneNumber").val(data.PhoneNumber.Value);
    }

    function onPost() {
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));

gts.checkoutDeliveryOption = (function ($) {
    var model = {};
    var doNothing = function () { };
    /*
        Supported Events:
        updateCartTotals: Injected logic to do the actual DOM updating given the totals object.
    */
    var on = {
        updateCartTotals: gts.paymentStep.refreshCartTotals
    };
    
    // defaults
    var fieldAttributes = null;
    var shippingOptions = {};

    function getFormData() {
        var form = {};
        form.id = $('#DeliveryOption option:selected').val();
        return form;
    }

    function processDeliveryMethod() {
        var deliveryOptionValue = $('#DeliveryOption option:selected').val();
        if (!deliveryOptionValue || deliveryOptionValue === "label") {
            return;
        }

        $("#delivery-update-indicator").show();

        gts.checkoutDeliveryOption.Post()
            .done(function () {

                gts.eGalaxyWebAPI.Cart.Get(function(cartData) {
                    on.updateCartTotals(cartData);
                });
         
                if (gts.paymentStep.isGiftedPurchase()) {
                    getFieldsAttributes(getFormData());
                }
            })
            .always(function () {
                /* 
                Let getFieldsAttributes() clear the indicator 
                since it has more processing to do
                */
                if (!gts.paymentStep.isGiftedPurchase())
                    $("#delivery-update-indicator").hide();
            });
    }

    // Get FieldAttributeGroupId for the selected shipping option
    function getFieldAttribteGroupId(shippingOptionId) {
        var groupId = 0;

        $.each(shippingOptions, function (id, object) {
            if (object.Id == shippingOptionId) {
                groupId = object.FieldAttributeGroupId;
            }
        }
        );

        return groupId;
    }

    function getFieldsAttributes(data) {
        // map Field Attribute namd to control name
        var map = {
            'First Name': 'ShippingFirstName',
            'Last Name': 'ShippingLastName',
            'Middle Name': 'ShippingMiddleName',
            'Street 1': 'ShippingAddress',
//            'Street 2': 'ShippingAddress2',
            'City': 'ShippingCity',
            'State': 'ShippingState',
            'Postal': 'ShippingZip',
            'E-mail': 'ShippingEmail',
            'Country Code': 'ShippingCountries',
            'Phone': 'ShippingPhoneNumber'
        };

        var fieldAttribteGroupId = getFieldAttribteGroupId(data.id);
        var request = gts.eGalaxyWebAPI.FieldAttribute.Get(fieldAttribteGroupId);

        request.done(function (response) {
            fieldAttributes = {};

            // map each field attribute
            $.each(response, function (index, attr) {
                if (map[attr.FieldName]) {
                    fieldAttributes[map[attr.FieldName]] = {
                        required: attr.Required,
                        display: attr.Display
                    };
                }
            });

            gts.checkoutStateManager.processNewFields(fieldAttributes);
            gts.checkoutValidation.validate();

            $("#delivery-update-indicator").hide();
        });

        return request;
    }

    model.getFieldAttributes = function() {
        return fieldAttributes;
    };

    model.init = function (options) {
        $.extend(on, options.on);
        
        $("#DeliveryOption").change(function () {
            processDeliveryMethod();
        });
    };

    model.Get = function () {
        return gts.eGalaxyWebAPI.Shipping.Get(onGet, onError);
    };

    model.Post = function () {
        var data = getFormData();
        return gts.eGalaxyWebAPI.Shipping.Post(data, onPost, onError);
    };

    function onGet(data) {
        shippingOptions = data;

        $("#DeliveryOption").empty();
        $("#DeliveryOption").append("<option value='label'>[L:DeliveryMethodSelect]</option>");

        for (var i = 0, len = data.length; i < len; i++) {

            var shippingOption = data[i];
            var formattedPrice = shippingOption.Price > 0 ? Globalize.format(shippingOption.Price, "c") : '[L:Free]';

            if (data.length === 1) {
                // disable control, select option, process change.
                $('#DeliveryOption').prop('disabled', true);
                $("#DeliveryOption").append("<option selected value='" + shippingOption.Id + "'>" + shippingOption.Name + " (" + formattedPrice + ")</option>");
                processDeliveryMethod();
            } else {
                // display all available options.
                $('#DeliveryOption').prop('disabled', false);
                $("#DeliveryOption").append("<option value='" + shippingOption.Id + "'>" + shippingOption.Name + " (" + formattedPrice + ")</option>");
            }
        }
        
        return $('#DeliveryOption option:selected').text();
    }

    function onPost() {
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));

gts.checkoutNewsletter = (function ($) {
    var model = {};
    model.Enabled = false;

    model.OptedIn = function () {
        if ($('#NewsletterSurveyOption').length > 0) {
            return $('#NewsletterSurveyOption').is(':checked') ? true : false;
        } else {
            return $('#NewsletterOption').is(':checked') ? true : false;
        }
    };

    model.IsVisible = function() {
        return $('#NewsletterOption').length > 0 ? true : false;
    };

    model.GetDisplay = function () {
        return gts.eGalaxyWebAPI.NewsletterOptInDisplay.Get(onGet);
    };

    model.Show = function () {
        $('#Newsletter').show();
    };

    model.Hide = function () {
        $('#Newsletter').hide();
    };

    model.Post = function () {
        var data = {Enabled: model.Enabled, OptedIn: model.OptedIn()};
        return gts.eGalaxyWebAPI.NewsletterOptIn.Post(data, onPost, onError);
    };

    function onGet(data) {
        model.Enabled = data.Enabled;
    }

    function onPost() {
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));


gts.checkoutSurvey = (function ($) {
    var model = {};
    model.Enabled = false;

    model.OptedIn = function () {
        return $('#SurveyOption').is(':checked') ? true : false;
    };

    model.IsVisible = function() {
        return $('#SurveyOption').length > 0 ? true : false;
    };

    model.GetDisplay = function () {
        return gts.eGalaxyWebAPI.SurveyOptInDisplay.Get(onGet);
    };

    model.Show = function () {
        $('#Survey').show();
    };

    model.Hide = function () {
        $('#Survey').hide();
    };

    model.Post = function () {
        return gts.eGalaxyWebAPI.SurveyOptIn.Post(onPost, onError);
    };

    function onGet(data) {
        model.Enabled = data.Enabled;
    }

    function onPost() {
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));

gts.checkoutNewsletterSurvey = (function ($) {
    var model = {};

    model.init = function () {
        gts.checkoutNewsletter.GetDisplay()
            .pipe(gts.checkoutSurvey.GetDisplay)
            .pipe(gts.checkoutNewsletterSurvey.SetDisplay);
    };

    model.IsVisible = function() {
        return $('#NewsletterSurveyOption').length > 0 ? true : false;
    };

    model.OptedIn = function () {
        return $('#NewsletterSurveyOption').is(':checked') ? true : false;
    };

    model.SetDisplay = function () {
        gts.checkoutNewsletterSurvey.Hide();
        if (gts.checkoutNewsletter.Enabled && gts.checkoutSurvey.Enabled) {
            gts.checkoutNewsletterSurvey.Show();
        } else if (gts.checkoutNewsletter.Enabled) {
            gts.checkoutNewsletter.Show();
            gts.checkoutSurvey.Hide();
        } else if (gts.checkoutSurvey.Enabled) {
            gts.checkoutSurvey.Show();
            gts.checkoutNewsletter.Hide();
        } else {
            gts.checkoutSurvey.Hide();
            gts.checkoutNewsletter.Hide();
        }
    };

    model.Show = function () {
        $('#NewsletterSurvey').show();
        gts.checkoutSurvey.Hide();
        gts.checkoutNewsletter.Hide();
    };

    model.Hide = function () {
        $('#NewsletterSurvey').hide();
    };

    model.Post = function () {
    	if (gts.checkoutNewsletterSurvey.IsVisible()) {
			return [
				gts.checkoutNewsletter.Post(),
				gts.checkoutSurvey.Post()];
        }
        else if (gts.checkoutNewsletter.IsVisible()) {
		    return [gts.checkoutNewsletter.Post()];
	    }
        else if (gts.checkoutSurvey.IsVisible()) {
		    return [gts.checkoutSurvey.Post()];
	    }
    };

    
    return model;
}(jQuery));

gts.checkoutGuestNames = (function ($) {
    var model = {};
    var processed = false;
    var deferred;

    model.init = function () {
        $("#GuestNamesDialog").dialog({
            autoOpen: false,
            modal: true,
            resizable: true,
            width: 550,
            title: "[L:GuestNamesDialogTitle]",
            buttons: [
			    {
			        text: "[L:GuestNamesDialogOk]",
			        click: function () {
			            post();
			        }
			    },
				{
				    text: "[L:GuestNamesDialogCancel]",
				    click: function () {
				        $(this).dialog("close");
				        processed = false;
				        deferred.reject("Cancelled Guest Name Dialog");
				    }
				}
            ]
        });
    };

    model.Process = function () {
        processed = false;

        // Remove error msg if it has previously been set
        $("#GuestNamesDialog #GuestNamesError").text("");
        $("#GuestNamesDialog #GuestNamesError").removeClass("error-message");

        deferred = $.Deferred();
        getGuestNamesToPrompt();

        return deferred.promise();
    };

    model.Processed = function () { return processed; };

    function getGuestNamesToPrompt() {
        return gts.eGalaxyWebAPI.GuestNames.Get(onGet, onError);
    }

    function post() {
        $.blockUI();
        var postDeferreds = [];

        $(".guest-name").each(function () {
            var id = $(this).find(".guest-id").val();
            var firstName = $(this).find(".guest-first-name").val();
            var lastName = $(this).find(".guest-last-name").val();
            var guestName = { Id: id, FirstName: firstName, LastName: lastName };

            postDeferreds.push(gts.eGalaxyWebAPI.GuestNames.Post(guestName, null, null));
        });

        // when all ajax posts are finished
        $.when.apply(null, postDeferreds)
            .done(function (data) {
                processed = true;
                deferred.resolve(data);
                $("#GuestNamesDialog").dialog("close");
            })
            .fail(onPostError);
    }

    function onGet(data) {

        if ($.isEmptyObject(data)) {
            processed = true;
            deferred.resolve(data);
            return;
        }

        // use jsrender to bind the guest name data to a template
        var guestNamesHtml = $.trim($("#GuestNamesTemplate").render(data));
        $("#GuestNamesForm").html(guestNamesHtml);
        $.unblockUI();

        // copies the last name entered in the first "last name" text box
        // to other "last name" text boxes
        $("#GuestNamesDialog .guest-last-name:first").blur(function () {
            $(".guest-last-name").val($(this).val());
        });

        // display the dialog
        $("#GuestNamesDialog").dialog("open");
    }

    function onError(data) {
        processed = false;
        deferred.reject(data);
    }

    function onPostError(data) {
        if (data && data.responseText) {
            var error = $.parseJSON(data.responseText);
            $("#GuestNamesDialog #GuestNamesError").addClass("error-message").text(error);
        }
        $.unblockUI();
    }

    return model;
}(jQuery));

gts.checkoutTermsAndConditions = (function ($) {
    var model = {};

    model.init = function () {
        $("#TermsConditionsDialog").dialog({
            autoOpen: false,
            modal: true,
            title: "[L:TermsAndConditionsDialogTitle]",
            height: 300,
            width: 350,
            buttons: [
			{
			    text: "[L:TermsAndConditionsDialogOk]",
			    click: function () { $(this).dialog("close"); }
			}]
        });

        $("#TermsConditionsLink").click(model.Get);

        model.GetDisplay()
            .pipe(model.SetDisplay);
    };

    function onGetModel(data) {
        model.Enabled = data.Enabled;
    }

    model.GetDisplay = function () {
        return gts.eGalaxyWebAPI.TermsConditionsDisplay.Get(onGetModel);
    };

    model.SetDisplay = function() {
        if (!model.Enabled)
            model.Hide();
    };

    model.Hide = function () {
        $("#TermsAndConditionsSelection").hide();
    };

    model.Get = function () {
        return gts.eGalaxyWebAPI.Html.Get(gts.eGalaxyWebAPI.Html.Types.TermsAndConditions, onGet, onError);
    };


    function onGet(data) {
        $("#TermsConditionsDialog").html(data);
        $("#TermsConditionsDialog").dialog("open");
        $(".ui-dialog-titlebar").show();
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));

gts.checkoutCVV = (function ($) {
    var model = {};

    model.init = function () {
        $("#CVVDialog").dialog({
            autoOpen: false,
            resizable: false,
            modal: true,
            height: 550,
            width: 550,
            buttons: [
			{
			    text: "[L:CVVDialogOk]",
			    click: function () { $(this).dialog("close"); }
			}]
        });

        $("#CVVHelp").on("click", gts.checkoutCVV.Get);
    };

    model.Get = function () {
        $("#CVVDialog").load("CVVPopUp.aspx #CVVPopUp", onGet); // load only the #CVVPopUp div portion of the page
    };

    function onGet() {
        $("#CVVDialog").dialog("open");
        $(".ui-dialog-titlebar").hide();
        $("#CloseButton").hide(); // CVVPopUp.aspx has a close button on it we don't want
    }

    return model;
}(jQuery));

gts.checkoutPayment = (function ($) {
    var model = {};
    var posted = false;

    function getFormData() {
        try {
            var form = {};

            form.Endorsement = $("#Endorsement").val();
            form.ExpirationMonth = $("#ExpirationMonth").val();
            form.ExpirationYear = $("#ExpirationYear").val();
            form.Cvv = $("#CVV").val();
            form.StorePaymentInformation = $("#StorePaymentInformation").is(":checked");

            return form;
        }
        catch (error) {
            gts.checkoutUI.JSError(error);
        }

        return null;
    }

    function onPost() {
        posted = true;
    }

    function onError(data) {
        if (data.getResponseHeader('Location')) {
            window.location = data.getResponseHeader('Location');
        } else {
            posted = false;
            gts.checkoutUI.DisplayError(data);
        }
    }

    model.Post = function () {
        posted = false;
        var data = getFormData();
        return gts.eGalaxyWebAPI.Payment.Post(data, onPost, onError);
    };

    model.Posted = function () {
        return posted;
    };

    return model;
}(jQuery));

gts.personalMessage = (function($) {

    var model = {};
    var posted;
    var settings = {
        selector: "#step-payment",
        template: "#payment-step-template",
        personalMessageText: "#PersonalMessageTextArea",
        personalMessageWrap: "#PersonalMessageWrap"
    };

    function getPersonalMessageText() {
        try {
            var personalMessage = $(settings.selector).find(settings.personalMessageText).val();
            personalMessage = removeBad(personalMessage);
            return personalMessage;
        } catch (error) {
            return gts.checkoutUI.JSError(error);
        }
    }

    model.init = function() {
        var request = model.DisplayPersonalMessage();
        request.then(model.checkConfig);
    };

    model.DisplayPersonalMessage = function() {
        return gts.eGalaxyWebAPI.PersonalMessageConfig.Get();
    };

    model.checkConfig = function (response) {

        model.displayMessage = response.DisplayPersonalMessage;

        if (model.displayMessage) {
            model.Get();
            model.Show();
        } else {
            model.Hide();
        }
    };
    
    model.Show = function () {
        $(settings.selector).find(settings.personalMessageWrap).show();
    };

    model.Hide = function () {
        $(settings.selector).find(settings.personalMessageWrap).hide();
    };

    model.Get = function () {
        return gts.eGalaxyWebAPI.PersonalMessage.Get(onGet, onError);
    };

    model.hasMessage = function () {
        var message = getPersonalMessageText();
        
        return message.length ? message : false;
    };

    model.Post = function () {
        var data = {
            PersonalMessage: model.hasMessage()
        };

        return gts.eGalaxyWebAPI.PersonalMessage.Post(data, onPost, onError);
    };

    function onGet(response) {
        if (response.PersonalMessage) {
            $(settings.selector).find(settings.personalMessageText).val(response.PersonalMessage);
        }
       
        $(settings.selector).find(settings.personalMessageText).show();
    }

    function onPost() {
        posted = true;
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    function removeBad(strTemp) {
        strTemp = strTemp.replace(/(<([^>]+)>)/ig, "");
        return strTemp;
    }

    return model;
}(jQuery));

gts.orderNotes = (function ($) {
    var model = {};
    var posted;
    var settings = {
        selector: "#step-payment",
        template: "#payment-step-template",
        orderNotesText: "#OrderNotesTextArea",
        orderNotesWrap: "#OrderNotesWrap"
    };

    function getNoteText() {
        try {
            var note = $(settings.selector).find(settings.orderNotesText).val();
            note = removeBad(note);
            return note;
        }
        catch (error) {
            return gts.checkoutUI.JSError(error);
        }
    }

    model.init = function() {
        if (model.DisplayNotes()) {
            model.Get();
            model.Show();
        } else {
            model.Hide();
        }
    };

    model.HasNote = function () {
        return $(settings.selector).find(settings.orderNotesText).val().length > 0 ? true : false;
    };

    model.DisplayNotes = function () {
        return gts.eGalaxyWebAPI.Config.ShoppingCheckout.DisplayOrderNotesField;
    };

    model.Show = function () {
        $(settings.selector).find(settings.orderNotesWrap).show();
    };

    model.Hide = function () {
        $(settings.selector).find(settings.orderNotesWrap).hide();
    };

    model.Get = function() {
        return gts.eGalaxyWebAPI.OrderNotes.Get(onGet, onError);
    };

    model.Post = function () {
        var data = {};
        if (model.HasNote) {
            data.OrderNote = getNoteText();
            return gts.eGalaxyWebAPI.OrderNotes.Post(data, onPost, onError);
        } else {
            return data;
        }
    };

    function onGet(data) {
        if ($.isEmptyObject(data)) {
            
        } else {
            $(settings.selector).find(settings.orderNotesText).text(data.OrderNote);
        }
        $(settings.selector).find(settings.orderNotesText).show();
    }

    function onPost() {
        posted = true;
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    function removeBad(strTemp) {
        strTemp = strTemp.replace(/(<([^>]+)>)/ig, "");
        return strTemp;
    }
    return model;
}(jQuery));

gts.checkoutNameTitles = (function () {
    var model = {};
    var nameTitlesCache = {};
    var loaded = false;

    model.Get = function (onGet, onError) {
        if (loaded) {
            if (onGet) {
                onGet(nameTitlesCache);
            }
            return $.when();
        }

        return gts.eGalaxyWebAPI.NameTitles.Get(function (data) {
            nameTitlesCache = data;
            loaded = true;
            if (onGet) {
                onGet(data);
            }
        }, function (data) {
            displayError(data);
            if (onError) {
                onError(data);
            }
        });
    };

    function displayError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
})();

gts.checkoutNameSuffixes = (function () {
    var model = {};
    var nameSuffixesCache = {};
    var loaded = false;
   
    model.Get = function (onGet, onError) {
        if (loaded) {
            if (onGet) {
                onGet(nameSuffixesCache);
            }
            return $.when();
        }

        return gts.eGalaxyWebAPI.NameSuffixes.Get(function (data) {
            nameSuffixesCache = data;
            loaded = true;
            if (onGet) {
                onGet(data);
            }
        }, function (data) {
            displayError(data);
            if (onError) {
                onError(data);
            }
        });
    };

    function displayError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
})();

gts.DualRelationshipStep = (function ($) {
    var model = {};
    var settings = {
        selector: "#step-dual",
        template: "#DualRelationshipsTemplate",
        itemTemplate: "#DualRelationshipsItemTemplate",
        stepsElement: "#steps",
        name: "Dual Membership Information",
        paymentSelector: "#step-payment"
    };
    var loaded;
    var selectedContacts = [];
    var contactItems;
    var relationships = [];

    var processed = false;
    var deferred;
    var tempScrollPosition;

    /*
    Supported events:

    on.load()  // Called when this step is navigated to.
    */
    var on = {
        load: onLoad,
        beforeNext: processDualRelationships
    };

    model.process = function () {

        if (relationships === undefined || relationships.length === 0) {
            return $.when();
        }

        deferred = $.Deferred();

        gts.eGalaxyWebAPI.DualRelationship.Put(relationships, null, null)
            .done(function(data) {
                processed = true;
                return $.when();
            })
            .fail(onPostError);

        return $.when();
    };

    model.add = function (options) {
        $.extend(settings, options.settings);
        $.extend(on, options.on);

        renderStep();

       var newStep = {
            selector: settings.selector,
            name: settings.name,
            data: model,
            on: {
                beforeNext: on.beforeNext,
                load: on.load
            }
        };
        
        gts.checkoutSteps.AddStep(newStep);
        return $.when();
    };

    function onLoad() {
        loadRelationships();
        loaded = true;
    }
  
    function renderStep() {
        // use jsrender to bind the dual relationship data to a template
       $(settings.stepsElement).append($.trim($(settings.template).render()));
    }

    function loadRelationships() {
        $(settings.selector).hide();
        return gts.eGalaxyWebAPI.DualRelationship.Get(onGet, onError);
    }

    function skipToPaymentPage() {
        var locationHash = settings.paymentSelector;
        return gts.checkoutSteps.GoToSteps(locationHash);
    }

    function removeDualRelationshipStep() {
        var existingSteps = gts.checkoutSteps.Steps();
        for (var i = existingSteps.length - 1; i >= 0; i--) {
            var step = existingSteps[i];
            if (step.selector === settings.selector) {
                var index = existingSteps.indexOf(step);
                var removedElement = existingSteps.splice(index, 1)[0];
                return $.when();
            }
        }

        return $.when();
    }

    function onGet(data) {
        tempScrollPosition = $('#ErrorMessage').position();

        //no dual relationship membership/pass found
        if ($.isEmptyObject(data) || $.isEmptyObject(data.Items)) {
            skipToPaymentPage();
            return $.when();
        }

        selectedContacts.length = 0;
        contactItems = data.Items;

        if (data.AutoSelect) {

            var contact1 = contactItems[0].FromContactID;
            var isDualJoint1 = contactItems[0].IsDualJoint;
            var contactguid1 = contactItems[0].FromCustContactGuid;

            var contact2 = contactItems[1].FromContactID;
            var contactguid2 = contactItems[1].FromCustContactGuid;
            var isDualJoint2 = contactItems[1].IsDualJoint;

            var relationship1 = { FromContactId: contact1, FromCustContactGuid: contactguid1, ToContactId: contact2, ToCustContactGuid: contactguid2, IsDualJoint: isDualJoint1 };
            relationships.push(relationship1);
            var relationship2 = { FromContactId: contact2, FromCustContactGuid: contactguid2, ToContactId: contact1, ToCustContactGuid: contactguid1, IsDualJoint: isDualJoint2 };
            relationships.push(relationship2);
            
            $.when(gts.eGalaxyWebAPI.DualRelationship.Post(relationships, null, null))
                .done(removeDualRelationshipStep)
                .done(skipToPaymentPage)
                .fail(onPostError);

            return $.when();
        }

        // use jsrender to bind the dual relationship data to a template
        var dualRelationshipHtml = $.trim($(settings.itemTemplate).render(data));
        $("#DualRelationshipsForm").html(dualRelationshipHtml);

        // JS for selection --------------------------------------------------------------

        $('#dual-relationship-list').off("click", ".dual-relationship-item", selectContact);
        $('#dual-relationship-list').on("click", ".dual-relationship-item", selectContact);

        $('#create-relationship-button').off("click", createDualRelationship);
        $('#create-relationship-button').on("click", createDualRelationship);

        $('#dual-contact-list').off("click", ".unlink-relationship-link", unlinkRelationship);
        $('#dual-contact-list').on("click", ".unlink-relationship-link", unlinkRelationship);

        $('#clear-relationship-button').off("click", clearAllDualRelationships);
        $('#clear-relationship-button').on("click", clearAllDualRelationships);

        // END JS for selection --------------------------------------------------------------

        $(settings.selector).show();
        $("html, body").animate({ scrollTop: 0 }, 500);

    }

    /* select the contact */
    function selectContact(e) {
        e.preventDefault();
        var _self = $(this);
        var contactId = _self.data("contact-id");
        var isDualJoint = _self.hasClass("dual-joint");
        var passKindId = _self.data("pk-id");
        var added = false;

        $.map(selectedContacts, function (elementOfArray) {
            if (elementOfArray.id === contactId) {
                added = true;
            }
        });

        var contact = $('#contact_' + contactId);
        var selectedContactListItem = $('#dual-relationship-list li a.selected');

        if (selectedContactListItem.length < 2 && !added) {
            // compare and return if product type are of same type
            if (selectedContactListItem.length > 0 &&
                isDualJoint === selectedContactListItem.hasClass("dual-joint")) {
                displayMessage(" <i class='fa fa-warning'></i> Cannot create relationship between contacts with similar product type !", "error-message");
                return;
            }else if (selectedContactListItem.length > 0 &&
                passKindId !== selectedContactListItem.data("pk-id")) {
                displayMessage(" <i class='fa fa-warning'></i> Cannot create relationship between contacts with different membership level !", "error-message");
                return;
            }
            contact.addClass("selected fa-check-square-o").removeClass("fa-square-o");
            selectedContacts.push({ id: contactId, isJoint: isDualJoint });
        } else if (added) {
            // if already selected. unselect the constact list item
            contact.removeClass("fa-check-square-o selected").addClass("fa-square-o");
            removeFromSelectedContacts(contactId);
        } else {
            displayMessage(" <i class='fa fa-warning'></i> [L:DualRelationshipCreateWarning] !", "error-message");
            return;
        }

        disableSimilarPassKindAndProductType();
    }

    /* disable the remaining listItem from selection of item with similar pass kind or productType */
    function disableSimilarPassKindAndProductType() {
        // disable the other selection
        var disableAll = false;
        var contactId = 0;
        var isDualJoint = false;
        var passKindId = 0;
        var enableAll = false;

        var selectedContactList = $('#dual-relationship-list li a.selected');
        if (selectedContactList.length === 2) {
            disableAll = true;
        } else if (selectedContactList.length === 1) {
            contactId = selectedContactList.data("contact-id");
            isDualJoint = selectedContactList.hasClass("dual-joint");
            passKindId = selectedContactList.data("pk-id");
        } else {
            enableAll = true;
        }

        $('#dual-relationship-list li a').each(function () {
           
            var isSelected = $(this).hasClass("selected");
            var isDisabled = $(this).hasClass("disabled");
            
            if (disableAll && !isSelected) {
                $(this).addClass("disabled");
            } else if(enableAll){
                    $(this).removeClass("disabled");
            } else if (!isSelected &&
                ($(this).hasClass("dual-joint") === isDualJoint ||
                    $(this).data("pk-id") !== passKindId) &&
                $(this).data("contact-id") !== contactId) {
                $(this).addClass("disabled");
            } else {
                if (isDisabled) {
                    $(this).removeClass("disabled");
                }
            }
        });
    }

    /* unlink the relationship created between two contacts */
    function unlinkRelationship(e) {
        e.preventDefault();
        var selector = $(this).parent();
        removeDualRelationship(selector);

        disableSimilarPassKindAndProductType();
        displayMessage("<i class='fa fa-info-circle'></i> [L:DualRelationshipRemovalMessage] ", "success-message");
    }

    function removeDualRelationship(selector) {
        selector.find('a.btn').each(function () {
            var self = $(this);
            var contactId = self.data("cid");
            $('#contact_' + contactId).removeClass("disabled fa-user").addClass("fa-square-o").unbind("click", selectContact);
            $('#contact_' + contactId).unbind("click", false);
            $('#contact_' + contactId).show(800);
            
            removeFromSelectedContacts(contactId);
        });

        selector.remove();
    }

    /* removes all the dual relationship created between the contacts */
    function clearAllDualRelationships(e) {
        e.preventDefault();
        $('#dual-contact-list li').each(function () {
            var selector = $(this);
            removeDualRelationship(selector);
        });

        disableSimilarPassKindAndProductType();
        displayMessage("<i class='fa fa-info-circle'></i> [L:DualRelationshipClearMessage]", "success-message");
    }

    function removeFromSelectedContacts(cid) {
        selectedContacts = $.grep(selectedContacts, function (value) {
            return value.id !== cid;
        });
    }

    function createDualRelationship(e) {
        e.preventDefault();
        var selectedList = '<li class="contact-listitem" >';
        var i = 0;

        if ($('#dual-relationship-list li a.selected').length < 2) {
            displayMessage("<i class='fa fa-info-circle'></i>[L:DualRelationshipSelectMessage] ", "warning-message");
            return;
        }

        $('#dual-relationship-list li a.selected').each(function () {
            var _self = $(this);
            var isDualJoint = _self.hasClass("dual-joint");
            selectedList += '<a class="contact' + i + ' btn fa-users ';
            if (isDualJoint)
                selectedList += 'dual-joint ';
            selectedList +=   '" data-cguid="' + _self.data("fromcustcontact-guid") + '" data-pk-id="' + _self.data("pk-id") + '" data-cid="' + _self.data("contact-id") + '" > ' + _self.html() + '</a>';

            // disable the selected list item for further click
            _self.removeClass("selected fa-check-square-o").addClass("fa-user disabled").bind('click', false);
            _self.hide(600);
            i++;
        });

        selectedList += '<a class="unlink-relationship-link" href="#" ><i class="fa fa-times-circle"></i></a></li>';
        $('.relationship-container #dual-contact-list').append(selectedList);

        $('#dual-relationship-list li a.disabled:not(.fa-user)').each(function () {
            $(this).removeClass("disabled");
        });

        displayMessage("<i class='fa fa-check-circle'></i> [L:DualRelationshipCreatedMessage]", "success-message");
    }

    function onError(data) {
        processed = false;
        deferred.reject(data);
        return $.when();
    }

    function onPostError(data) {
        if (data && data.responseText) {
            var error = $.parseJSON(data.responseText);
            $("#DualRelationshipsError").addClass("error-message").text(error);
        }
        deferred.reject(data);
        return $.when();
    }

    function displayMessage(message, className) {
        $("#DualRelationshipsError").attr("class", className).slideDown().html(message).delay(1000).slideUp();
        $(window).scrollTop(tempScrollPosition.top);
    }
    
    function postDualMembers() {
        //clear any pre-loaded relationships
        relationships.length = 0;
        var contactinlist = selectedContacts.length;
        
       $(".contact-listitem").each(function () {
            var contact1 = $(this).find('a.contact0').data("cid");
            var contactguid1 = $(this).find('a.contact0').data("cguid");
            var isDualJoint1 = $(this).find('a.contact0').hasClass("dual-joint");
            var pkid1 = $(this).find('a.contact0').data("pk-id");
            var contact2 = $(this).find('a.contact1').data("cid");
            var contactguid2 = $(this).find('a.contact1').data("cguid");
            var isDualJoint2 = $(this).find('a.contact1').hasClass("dual-joint");
            var pkid2 = $(this).find('a.contact1').data("pk-id");
           
            var relationship1 = {
                FromContactId: contact1,
                FromCustContactGuid: contactguid1,
                ExternalPassKindID:pkid1,
                ToContactId: contact2,
                ToCustContactGuid: contactguid2,
                IsDualJoint: isDualJoint1
            };
            relationships.push(relationship1);

            var relationship2 = {
                FromContactId: contact2,
                FromCustContactGuid: contactguid2,
                ExternalPassKindID:pkid2,
                ToContactId: contact1,
                ToCustContactGuid: contactguid1,
                IsDualJoint: isDualJoint2
            };
            relationships.push(relationship2);
        });

        // when all ajax posts are finished
        gts.eGalaxyWebAPI.DualRelationship.Post(relationships, null, null)
            .done(function() {
                processed = true;
                return $.when();
            })
            .fail(onPostError);
    }

    function validate() {
        var contacts = $('#dual-relationship-list li').length;
        var createdRelationships = $('#dual-contact-list li').length;
        var remainingRelationships = Math.ceil(contacts / 2) - createdRelationships;

        if (remainingRelationships >= 1) {
            displayMessage(" <i class='fa fa-warning'></i> " + remainingRelationships + " [L:DualRelationshipRemainingMessage]", "error-message");
            return false;
        }

        return true;
    }

    function processDualRelationships(promise) {
        $("#ErrorMessage").html("");
        var valid = validate();
        if (!valid) {
            promise.reject();
            return;
        }

        $(settings.selector).find(".navigation img").show();

        var processSteps;
        if (!settings.pass || !settings.pass.Id) {
            processSteps = postDualMembers();
        }
        else {
            processSteps = postDualMembers();
        }

        $.when(processSteps)
			.done(function () {
			    promise.resolve();
			})
			.fail(function () {
			    promise.reject();
			})
			.always(function () {
			    $(settings.selector).find(".navigation img").hide();
			});
    }
    return model;

})(jQuery);