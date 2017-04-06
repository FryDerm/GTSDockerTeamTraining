/*
/webstore/checkout/index
This is the starting point for the  single page checkout pages.  
This files loads other checkout modules and handles workflow.
*/

gts.checkout = (function ($) {
    var model = {};
    var settings = {
        checkoutFormSelector: "#checkout-form",
        cartTotalsTemplate: "#cart-totals-template",
        cartTotalsSelector: "#cart-totals",
        backToCartLink: ""
    };
    var cart;
    var cartItems;
    var checkoutOptions;

    var haveMultiplePasses = false;
    var promptForPrimaryPass = true;

    model.init = function (options) {
        $.extend(settings, options);

        if (!gts.checkoutSteps) {
            throw ("Checkout Steps module is not included.");
        }

        if (!gts.eGalaxyWebAPI) {
            throw ("eGalaxyWebAPI is not included.");
        }

        gts.checkoutSteps.init({
            on: { hashBlank: onHashBlank },
            backToCartLink: settings.backToCartLink
        });

        addSteps()
			.done(function () {
                addLocalizedValidationMessages();
                gts.checkoutSteps.Start();

        });
    };

    // add the localized jQuery validation messages
    function addLocalizedValidationMessages() {

        $.extend($.validator.messages, {
            required: "[LG:Checkout-required]",
            remote: "[LG:Checkout-remote]",
            email: "[LG:Checkout-email]",
            url: "[LG:Checkout-url]",
            date: "[LG:Checkout-date]",
            dateISO: "[LG:Checkout-dateISO]",
            number: "[LG:Checkout-number]",
            digits: "[LG:Checkout-digits]",
            creditcard: "[LG:Checkout-creditcard].",
            equalTo: "[LG:Checkout-equalTo]",
            accept: "[LG:Checkout-accept]",
            maxlength: $.validator.format("[LG:Checkout-maxlength]"),
            minlength: $.validator.format("[LG:Checkout-minlength]"),
            rangelength: $.validator.format("[LG:Checkout-rangelength]"),
            range: $.validator.format("[LG:Checkout-range]"),
            max: $.validator.format("[LG:Checkout-max]"),
            min: $.validator.format("[LG:Checkout-min]"),
            maxDate: $.validator.format("[LG:Checkout-maxDate]"),
            minDate: $.validator.format("[LG:Checkout-minDate]")
        });
    }

    // If there is no hash the user must have hit the back button on the first step.
    function onHashBlank() {
        history.go(-1);
    }

    function addSteps() {
        var deferred = $.Deferred();
        var stepDeferreds = [];

        gts.eGalaxyWebAPI.Cart.Get(function (data) {
            if (!data || !data.Items || data.Items.length === 0) {
                // TODO: No cart items. For now just return, but eventually this should redirect to error.
                deferred.resolve(data);
                return;
            }

            cart = data;
            checkoutOptions = data.CheckoutOptions;
            cartItems = data.Items;
            var numberOfPasses = 0;

            for (var i = 0; i < data.Items.length; i++) {
                var cartItem = data.Items[i];
                var passPackageDetail = null;

                //  Find pass in a package
                if (cartItem.PackageDetails) {
                    for (var p = 0; p < cartItem.PackageDetails.length; p++) {
                        var packageDetailItem = cartItem.PackageDetails[p];
                        if (packageDetailItem.ItemKind === gts.eGalaxyWebAPI.Cart.ProductKinds.Pass) {
                            passPackageDetail = packageDetailItem;
                        }
                    }
                }

                if (cartItem.ProductType === gts.eGalaxyWebAPI.Cart.ProductTypes.PassDetail || passPackageDetail !== null) {
                    numberOfPasses = numberOfPasses + 1;
                    stepDeferreds.push(addPassStep(cartItem, i));
                }
            }

            haveMultiplePasses = numberOfPasses > 1;
            
            // when all steps have been added
            $.when.apply(null, stepDeferreds)
				.done(function () {
				    if (haveMultiplePasses && checkoutOptions.AssignPrimaryPass && promptForPrimaryPass) {
				        stepDeferreds.push(addPrimaryPassSelectionStep());
				    }

				    stepDeferreds.push(addDualMembershipPromptStep());
				    
				    // The payment step always goes last, just add it after all the other steps were added. We don't care about waiting for it to complete before returning the page.
				    stepDeferreds.push(addPaymentStep());
				    addLoyaltyStep();

                    if (checkoutOptions.HasDualMembership) {
                        forcePrimaryContactDisplayFirst();
                    }

                    deferred.resolve();
				})
				.fail(function (error) {
				    deferred.reject(error);
				});

        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise();
    }

    function forcePrimaryContactDisplayFirst() {
        // bring to correct order
        gts.checkoutSteps.DisplayPrimaryContactFirst();
    }
    function addPassStep(cartItem, index) {
        var step = new gts.PassStep();
        return step.Add({
            settings: {
                cartItem: cartItem,
                checkoutOptions: checkoutOptions,
                addons: getMemberAddonsFromCart(),
                id: "pass-step-" + index,
                name: cartItem.Name,
                disableAddress: cartItem.IsDualJoint,
                selector: "#pass-step-" + index,
                primaryFieldInputPrefix: "Primary" + index,
                adultFieldInputPrefix: "Additional" + index,
                childFieldInputPrefix: "Child" + index,
                addonFieldInputPrefix: "Addon" + index,
                defaultPassSameAsBilling: false  //!haveMultiplePasses
            },
            on: {
                addRule: onAddPassRule,
                addInputValues: onAddPassInput,
                setMemberFields: onSetMemberFields,
                getExistingMembersInOrder: onGetExistingMembers,
                preventPrimaryPassSelectionStep: onPreventPrimaryPassSelectionStep,
                getPrimaryPassId: onGetPrimaryPassId
            }
        });
    }

    function onPreventPrimaryPassSelectionStep() {
        promptForPrimaryPass = false;
    }

    function onGetPrimaryPassId() {
        var existingPasses = onGetExistingPassesInOrder();
        if (!existingPasses || existingPasses.length === 0) {
            return 0;
        }

        var existingPass;
        for (var i = 0; i < existingPasses.length; i++) {
            existingPass = existingPasses[i];
            if (existingPass.Master > 0) {
                return existingPass.Master;
            }
        }
        return 0;
    }

    function addPaymentStep() {
        return gts.paymentStep.add({
            settings: {
                cart: cart,
                checkoutOptions: checkoutOptions,
                name: "[L:PaymentHeader]"
            }
        });
    }

    function addDualMembershipPromptStep() {
        return gts.DualRelationshipStep.add({
            settings: {
                checkoutOptions: checkoutOptions,
                name: "Dual Relationship Selection"
            }
        });
    }

	model.addPaymentStep = addPaymentStep;

    function addLoyaltyStep() {
        settings.loyaltyLink = settings.loyaltyLink;

        if (gts.loyalty) {
            gts.loyalty.add({
                loyaltyLink: settings.loyaltyLink, onRefreshTotals: function (redeemPoints) {
                    gts.paymentStep.refreshCartTotals();

                    if (redeemPoints) {
                        $(".endorsement-form-field").hide();
                        $(".expiration-cvv-form-field").hide();
                        $("#ConfirmOrderMaskedCardNumber").hide();
                    } else {
                        $(".endorsement-form-field").show();
                        $(".expiration-cvv-form-field").show();
                        $("#ConfirmOrderMaskedCardNumber").show();
                    }
                }
            });
        }
    }

    function addPrimaryPassSelectionStep() {
        var step = new gts.PrimaryPassSelectionStep();
        return step.Add({
            settings: {
                checkoutOptions: checkoutOptions
            },
            on: {
                getExistingPassesInOrder: onGetExistingPassesInOrder
            }
        });
    }

    // Find other members in any other steps and return them to any step that requests it.
    function onGetExistingMembers() {
        var deferred = $.Deferred();
        
        var existingMembers = getExistingMembersInOrder();

        gts.eGalaxyWebAPI.account.get()
            .done(function(currentUser) {
                // Look for existing connections to a Current User and indicate that on the member object.
                var existingMember;
                var foundCurrentUser = false;
                for (var i = 0; i < existingMembers.length; i++) {
                    existingMember = existingMembers[i];
                    if (existingMember.ContactGuid === currentUser.ContactGuid) {
                        foundCurrentUser = true;
                        existingMember.CurrentUser = true;
                        existingMember.Linked = true;
                    }
                }
                
                // Make sure the contact option is not added more than once.
                if (!foundCurrentUser) {
                    var currentMember = convertAccountToMember(currentUser);
                    existingMembers.push(currentMember);
                }
                
                deferred.resolve(existingMembers);
            })
            .fail(function() {
                // There is no current user.
                deferred.resolve(existingMembers);
            });

        return deferred.promise();
    }

    function convertAccountToMember(currentUser) {
        return {
            PrimaryMember: true,
            CurrentUser: true,
            ContactGuid: currentUser.ContactGuid,
            Fields: {
                First: currentUser.FirstName,
                Middle: currentUser.MiddleName,
                Last: currentUser.LastName,
                Street1: currentUser.Street1,
                Street2: currentUser.Street2,
                City: currentUser.City,
                State: currentUser.State,
                Zip: currentUser.Postal,
                CountryCode: currentUser.CountryCode,
                Phone: currentUser.Phone,
                Email: currentUser.Email,
                NameTitleID: currentUser.NameTitleId,
                NameSuffixID: currentUser.NameSuffixId,
                DOB: currentUser.DateOfBirth
            }
        };
    }
    
    function getExistingMembersInOrder()
    {
        var existingSteps = gts.checkoutSteps.Steps();
        var existingMembers = [];
        
        for (var i = 0; i < existingSteps.length; i++) {
            var step = existingSteps[i];
            if (!step || !step.data || !step.data.currentPass) {
                continue;
            }

            var pass = step.data.currentPass();
            if (!pass || $.isEmptyObject(pass) || !pass.Members) {
                continue;
            }

            for (var j = 0; j < pass.Members.length; j++) {
                existingMembers.push(pass.Members[j]);
            }
        }
        return existingMembers;
    }
    // Find other passes in any other steps and return them to any step that requests it.
    function onGetExistingPassesInOrder() {
        var existingSteps = gts.checkoutSteps.Steps();
        var existingPasses = [];
        for (var i = 0; i < existingSteps.length; i++) {
            var step = existingSteps[i];
            if (!step || !step.data || !step.data.currentPass) {
                continue;
            }

            var pass = step.data.currentPass();
            if (!pass || $.isEmptyObject(pass) || !pass.Members) {
                continue;
            }

            // Try to give the pass a logical name since we don't really keep that on the pass object.
            pass.name = step.name;

            existingPasses.push(pass);
        }
        return existingPasses;
    }

    function getMemberAddonsFromCart() {
        var item;
        var memberAddons = [];
        for (var i = 0; i < cartItems.length; i++) {
            item = cartItems[i];
            if (item.ProductType === gts.eGalaxyWebAPI.Cart.ProductTypes.MemberAddon)
                memberAddons.push(item);
        }

        return memberAddons;
    }

    function onSetMemberFields(inputPrefix, rules, fields) {
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            var id = "#" + inputPrefix + rule.ColumnName;

            if (rule.FieldKindId === gts.formGenerator.fieldKinds.checkbox) {
                // Checkboxes can't just check val()
                fields[rule.ColumnName] = $(id).is(":checked");
            } else if (rule.FieldNumber === gts.eGalaxyWebAPI.Pass.Fields.State) {
                // State has two inputs. Only check the visible one.
                var value;
                if ($(id).is(":visible")) {
                    value = $(id).val();
                } else {
                    value = $(id + "s").val();
                }
                fields[rule.ColumnName] = value;
            } else {
                fields[rule.ColumnName] = $(id).val();
            }
        }
    }

    function onAddPassRule(fieldRule, formRule) {
        if (fieldRule.FieldNumber === gts.eGalaxyWebAPI.Pass.Fields.Email) {
            formRule.email = true;
        }
    }

    // Need to return a promise object for any input that requires async loading.
    // Change the input parameter directly if you need to change the type of input.
    function onAddPassInput(rule, input) {
        var id = input.attr("id");
        var deferred = $.Deferred();
        var changedInput;

        if (rule.FieldNumber === gts.eGalaxyWebAPI.Pass.Fields.Title) {
            var titleInput = input;
            gts.checkoutNameTitles.Get(function (data) {
                titleInput.empty();

                if (!rule.Required) {
                    titleInput.append($("<option></option>"));
                }

                for (var i = 0; i < data.length; i++) {
                    var title = data[i];
                    var option = $("<option></option>").text(title.Name).val(title.Id);
                    titleInput.append(option);
                }
                deferred.resolve(titleInput);
            }, function (error) {
                deferred.reject(error);
            });
        } else if (rule.FieldNumber === gts.eGalaxyWebAPI.Pass.Fields.Suffix) {
            var suffixInput = input;
            gts.checkoutNameSuffixes.Get(function (data) {
                suffixInput.empty();

                if (!rule.Required) {
                    suffixInput.append($("<option></option>"));
                }

                for (var i = 0; i < data.length; i++) {
                    var suffix = data[i];
                    var option = $("<option></option>").text(suffix.Name).val(suffix.Id);
                    suffixInput.append(option);
                }
                deferred.resolve(suffixInput);
            }, function (error) {
                deferred.reject(error);
            });
        } else if (rule.FieldNumber === gts.eGalaxyWebAPI.Pass.Fields.Gender) {
            input.append($("<option></option>").text("[L:GenderUnspecified]").val(""));
            input.append($("<option></option>").text("[L:GenderMale]").val("1"));
            input.append($("<option></option>").text("[L:GenderFemale]").val("2"));
            deferred.resolve();
        } else if (rule.FieldNumber === gts.eGalaxyWebAPI.Pass.Fields.CountryCode) {
            // CountryCode is actually a drop down.
            changedInput = $("<select></select>").attr("id", id).attr("name", id);
            deferred.resolve(changedInput);
        } else if (rule.FieldNumber === gts.eGalaxyWebAPI.Pass.Fields.State) {
            changedInput = $("<div></div>")
				.append($("<select><select/>").attr("id", id + "s").attr("name", id + "s").addClass("states"))
				.append(input);
            deferred.resolve(changedInput);
        } else if (rule.FieldNumber === gts.eGalaxyWebAPI.Pass.Fields.Birthday) {

            // Set datepicker language.
            var culture = $('#UICulture').val();
            var dateFormat = "m/d/yyyy";

            if (Globalize) {
                Globalize.culture(culture);
                dateFormat = Globalize.culture().calendar.patterns.d.toLowerCase();
                input.datepicker("option", "dateFormat", dateFormat.replace(/[.-]/g, '/').replace('yyyy', 'yy'));
            }
            
            input.attr("placeholder", dateFormat).datepicker({
                showAnim: "drop",
                changeMonth: true,
                changeYear: true,
                yearRange: "-100:c"
            });
           
            deferred.resolve();

        } else {
            deferred.resolve();
        }

        return deferred.promise();
    }


    function onUpdateCartTotals() {
        gts.eGalaxyWebAPI.Cart.Get(function (data) {
            var cartTotals = {
                Subtotal: Globalize.format(data.Totals.Subtotal, "c"),
                Fees: Globalize.format(data.Totals.Fees, "c"),
                Tax: Globalize.format(data.Totals.Tax, "c"),
                Shipping: Globalize.format(data.Totals.Shipping, "c"),
                Total: Globalize.format(data.Totals.Total, "c"),
                Discount: Globalize.format(data.Totals.Discount, "c")
            };

            $.trim($(settings.cartTotalsTemplate).render(cartTotals));

        });
    }
    
    return model;
})(jQuery);