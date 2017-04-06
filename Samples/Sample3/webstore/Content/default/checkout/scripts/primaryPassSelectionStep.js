/*
/webstore/checkout/index#primary-pass-selection-step
This code handles the primary pass selection step of single page checkout.  This page will 
appear if more than one pass is purchased and associated passes are turned on.
*/

gts.PrimaryPassSelectionStep = function () {
    var model = {};
    var selectedPassId;
    var savedMasterId;
    var masterIdChanged;
    
    var settings = {
        selector: "#primary-pass-selection-step",
        checkoutOptions: { },
        stepsElement: "#steps",
        stepTemplate: "#primary-pass-selection-template",
        id: "primary-pass-selection-step",
        name: "Primary Membership Selection",
        primaryPassOptionsSelector: "ul.primary-pass-options",
        primaryPassOptionSelector: "ul.primary-pass-options li",
        primaryPassButtonSelector: "ul.primary-pass-options li input[type=button]",
        usingThisMembershipSelector: ".using-this-membership",
        useThisMembershipText: "use this membership",
        selectedPassColor: "#A2C139",
        selectedClass: "selected"
    };
    
    /*
    Supported events:

    on.beforeNext(deferred)               // Gets called before moving to the next page. Use deferred object to reject or accept the change.
    on.load()                             // Called when this step is navigated to.
    on.getExistingPassesInOrder           // A way to inject the logic to look through all steps and return a collection of passes from any pass steps that may exist.
    */
    var on = {
        beforeNext: onBeforeNext,
        load: onLoad,
        getExistingPassesInOrder: doNothing
    };

    function doNothing() {
        
    }
    
    model.Add = function(options) {
        $.extend(settings, options.settings);
        $.extend(on, options.on);
        
        if (!gts.checkoutSteps) {
            throw ("Checkout Steps module is not included.");
        }

        if (!$.render) {
            throw ("jsRender is not included.");
        }

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

        initNavigation();

        return $.when();
    };

    function initNavigation() {
        $(settings.selector).off("click.gts", settings.primaryPassButtonSelector, onSelectPrimaryPass);
        $(settings.selector).on("click.gts", settings.primaryPassButtonSelector, onSelectPrimaryPass);
    }

    function renderStep() {
        $(settings.stepsElement).append($.trim($(settings.stepTemplate).render(settings)));
    }
    
    function onLoad() {
        $(settings.selector).find(settings.primaryPassOptionsSelector).empty();
        
        // look through all the passes in this transaction and render those options in the step.
        var options = on.getExistingPassesInOrder();
        if (!options) {
            return;
        }
        
        var optionElement;
        var pass;
        var member;
        
        for (var i = 0; i < options.length; i++) {
            pass = options[i];
            member = pass.Members[0];
            
            optionElement = $("<li></li>")
                .data("passid", pass.Id)
                .append($("<div></div>").addClass("pass-info")
                    .append($("<div></div>").addClass("pass-name").text(pass.name))
                    .append($("<div></div>").addClass("member-name").text(member.Fields.First + " " + member.Fields.Last))
                    .append($("<input type=button />").val(settings.useThisMembershipText)));
            
            $(settings.selector).find(settings.primaryPassOptionsSelector).append(optionElement);
        }
        
        if (selectedPassId) {
            var selectedOption = getSelectedOption();
            if (selectedOption) {
                markOptionAsSelected(selectedOption);
            }
        }
    }
  
    function getSelectedOption() {
        var options = $(settings.selector).find(settings.primaryPassOptionSelector);
        var option;
        for (var i = 0; i < options.length; i++) {
            option = $(options[i]);
            if (option.data("passid") === selectedPassId) {
                return option;
            }
        }

        return undefined;
    }
    
    function onSelectPrimaryPass(e) {
        e.preventDefault();

        var passOption = $(this).closest(settings.primaryPassOptionSelector);
        if (!passOption) {
            return;
        }

        var passId = passOption.data("passid");
        if (!passId) {
            return;
        }

        selectedPassId = passId;
        masterIdChanged = (savedMasterId !== selectedPassId);

        // Reset the options
        $(settings.selector).find(settings.primaryPassOptionSelector)
            .removeClass(settings.selectedClass)
            .css({ backgroundColor: "transparent" })
            .find("input[type=button]").show();

        markOptionAsSelected(passOption);
    }

    function markOptionAsSelected(optionElement) {
        // Hide the button so they don't think they need to click it again.
        optionElement.find("input[type=button]").hide();
        // Now indicate the selected option
        optionElement.addClass(settings.selectedClass).animate({ backgroundColor: settings.selectedPassColor }, 250);
    }
    
    function updatePassesWithMasterId(passId) {
        var allPasses = on.getExistingPassesInOrder();
        if (!allPasses) {
            return $.when();
        }

        var puts = [];
        var pass;
        for (var i = 0; i < allPasses.length; i++) {
            pass = allPasses[i];
            pass.Master = passId;
            
            puts.push(gts.eGalaxyWebAPI.Pass.Put(pass));
        }

        return $.when.apply(null, puts);
    }

    function onBeforeNext(deferred) {
        // It is not valid to not have a master pass under this configuration so don't allow going to the next step without it.
        if (!selectedPassId) {
            deferred.reject();
            return;
        }
        
        // We also don't want to continue to update every pass if the user is just navigating through steps.
        if (!masterIdChanged) {
            deferred.resolve();
            return;
        }
  
        $(settings.selector).find(".navigation img").show();
        updatePassesWithMasterId(selectedPassId)
            .done(function () {
                masterIdChanged = false;
                savedMasterId = selectedPassId;
                
                if (settings.checkoutOptions.UsePassAsBilling) {
                    var member = getPrimaryMemberForPrimaryPass(savedMasterId);
                    if (!member) {
                        deferred.reject("Primary Member for Primary Pass was not found.");
                    }
                    
                    $.when(setBillingContact(member.ContactId), setShippingContact(member.ContactId))
                        .done(function() {
                            deferred.resolve();
                        })
                        .fail(function(data) {
                            deferred.reject(data);
                        });
                } else {
                    deferred.resolve();
                }
            })
            .fail(function(data) {
                deferred.reject(data);
            })
            .always(function() {
                $(settings.selector).find(".navigation img").hide();
            });
    }
    
    function setBillingContact(id) {
        var data = { Id: id };
        return gts.eGalaxyWebAPI.BillingContact.post(data);
    }
    
    function setShippingContact(id) {
        var data = { Id: id };
        return gts.eGalaxyWebAPI.ShippingContact.post(data);
    }

    function getPrimaryMemberForPrimaryPass(primaryPassId) {
        var allPasses = on.getExistingPassesInOrder();
        if (!allPasses) {
            return undefined;
        }

        var pass;
        var member;
        for (var i = 0; i < allPasses.length; i++) {
            pass = allPasses[i];
            if (pass.Id === primaryPassId) {
                for (var j = 0; j < pass.Members.length; j++) {
                    member = pass.Members[j];
                    if (member.PrimaryMember) {
                        return member;
                    }
                }

                return undefined;
            }
        }
    }
    
    return model;
};