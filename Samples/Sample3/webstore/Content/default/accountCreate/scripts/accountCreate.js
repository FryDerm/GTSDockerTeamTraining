gts.accountCreateModule = (function ($) {
    var model = {};
    
    var settings = {
        selector: "#account-create",
        subHeaderSelector: "#sub-header",
        subHeaderTemplate: "#sub-header-template",
        beforeContentSelector: "#before-content",
        beforeContentTemplate: "#before-content-template",
        afterContentSelector: "#after-content",
        afterContentTemplate: "#after-content-template",
        countryDropDown: "#CountryCode",
        stateRegionTextBoxContainer: ".region .region-text",
        stateRegionTextBox: "#RegionTextValue",
        stateRegionDropDownContainer: ".region .region-select",
        stateRegionDropDown: "#RegionDropDownValue",
        form: "form",
        accountContactSelector: "#account-contact",
        accountCredentialsSelector: "#account-credentials",
        accountCredentialsBorderColor: "#A2C139",
        ticketLookupSectionSelector: "#ticket-lookup-section",
        ticketLookupSelector: "#ticket-lookup",
        ticketLookupButtonSelector: ".ticket-lookup-button",
        ticketLookupErrorSelector: ".ticket-lookup-error",
        ticketLookupNotFoundSelector: ".ticket-lookup-not-found",
        ticketLookupRequiredFieldsMissing: ".ticket-lookup-required-fields-missing",
        ticketLookupExpand: "#account-credentials-section .banner .expand",
        ticketLookupInputSelector: "#ticket-lookup-input",
        ticketLookupAccountInput: "#lookup-account-input",
        ticketLookupBirthDateInput: "#lookup-birthdate-input",
        ticketLookupLastNameInput: "#lookup-lastname-input",
        ticketLookupErrorText: "[L:TicketLookupError]",
        loadingSelector: ".loading"
    };
    
    model.init = function(options) {
        $.extend(settings, options);

        initNavigation();
        
        renderTemplates();
    };

    function renderTemplates() {
        renderSubHeader();
        $(settings.selector).find(settings.beforeContentSelector).html($.trim($(settings.beforeContentTemplate).render()));
        $(settings.selector).find(settings.afterContentSelector).html($.trim($(settings.afterContentTemplate).render()));
        renderTicketLookup();
    }
    
    function initNavigation() {
        $(settings.selector).off("change.gts", settings.countryDropDown, onCountryChange);
        $(settings.selector).on("change.gts", settings.countryDropDown, onCountryChange);
        $(settings.selector).off("change.gts", settings.stateRegionDropDown, onStateRegionChange);
        $(settings.selector).on("change.gts", settings.stateRegionDropDown, onStateRegionChange);
        $(settings.selector).off("click.gts", settings.ticketLookupButtonSelector, ticketLookup);
        $(settings.selector).on("click.gts", settings.ticketLookupButtonSelector, ticketLookup);
        $(settings.selector).off("click.gts", settings.ticketLookupExpand, expandTicketLookup);
        $(settings.selector).on("click.gts", settings.ticketLookupExpand, expandTicketLookup);
    }
    
    function renderSubHeader() {
        var subHeaderMarkup = $.trim($(settings.subHeaderTemplate).render());
        if (subHeaderMarkup) {
            $(settings.selector).find(settings.subHeaderSelector).html(subHeaderMarkup).show();
            setTimeout(function () {
                $(settings.selector).find(settings.subHeaderSelector).find("ul").fadeIn(500).css("display", "inline-block");

                $(settings.selector).find(settings.subHeaderSelector).find("ul li").css("padding-left", "25px").each(function (i, e) {
                    setTimeout((function (element) {
                        return function () { $(element).animate({ paddingLeft: 0 }, 750); };
                    })(e), i * 200);
                });
            }, 500);
        }
    }
    
    function renderTicketLookup() {
        if ($(settings.ticketLookupBirthDateInput).length !== 0) {
            $(settings.ticketLookupBirthDateInput).datepicker({
                showAnim: "drop",
                changeMonth: true,
                changeYear: true,
                yearRange: "-100:c"
            });
        }
    }
    
    function expandTicketLookup(e) {
        e.preventDefault();

        $(settings.selector).find(settings.accountCredentialsSelector).animate({ "border-color": settings.accountCredentialsBorderColor });
        $(settings.selector).find(settings.ticketLookupSelector)
            .slideDown(500, function() {
                $(this).animate({ "margin-bottom": "48px" }, 500);
            });
        
        $(this).hide();
    }
    
    function onCountryChange(e) {
        e.preventDefault();
        var countryCode = $(this).val();
        if (!countryCode)
            return;

        gts.eGalaxyWebAPI.stateRegions.get(countryCode)
            .done(function(states) {
                var stateDropDownContainer = $(settings.selector).find(settings.stateRegionDropDownContainer);
                var stateTextBoxContainer = $(settings.selector).find(settings.stateRegionTextBoxContainer);
                var dropDown = stateDropDownContainer.find("select");
                
                dropDown.empty();

		        $(settings.selector).find(settings.stateRegionTextBox).val("");

                if (states.length > 0) {
                    stateDropDownContainer.show();
                    stateTextBoxContainer.hide();
                } else {
                    stateDropDownContainer.hide();
                    stateTextBoxContainer.show();
                }

                for (var i = 0; i < states.length; i++) {
                    var state = states[i];
                    var option = $("<option></option>").text(state.Name).val(state.Id);
                    if (state.DefaultLocale) {
	                    option.attr("selected", "selected");
                    }
                    dropDown.append(option);
                }
            })
            .fail(function() {
                $(settings.selector).find(settings.stateRegionDropDownContainer).hide().find("select").empty();
                $(settings.selector).find(settings.stateRegionTextBoxContainer).show();
            });
    }
    
    function onStateRegionChange(e) {
        e.preventDefault();
        // Set the textbox to the same value as the drop down when it changes.
        $(settings.selector).find(settings.stateRegionTextBox).val($(this).val());
    }
    
    function ticketLookup(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        $(settings.selector).find(settings.ticketLookupErrorSelector).hide().text("");
        $(settings.selector).find(settings.ticketLookupNotFoundSelector).hide();
        $(settings.selector).find(settings.ticketLookupRequiredFieldsMissing).hide();
        
        var visualId = $(settings.selector).find(settings.ticketLookupInputSelector).val();
        var account = $(settings.selector).find(settings.ticketLookupAccountInput).val();
        var birthdate = $(settings.selector).find(settings.ticketLookupBirthDateInput).val();
        var lastname = $(settings.selector).find(settings.ticketLookupLastNameInput).val();

        // You need at least visualid or account to make the request.
        if (!visualId && !account) {
            $(settings.selector).find(settings.ticketLookupRequiredFieldsMissing).slideDown();
            return;
        }

        $(settings.selector).find(settings.ticketLookupSelector).find(settings.loadingSelector).show();

        var lookupinputs = { VisualId: visualId, PassAccount: account, LastName: lastname, DOB: birthdate };

        gts.eGalaxyWebAPI.TicketInfo.Get(lookupinputs, function (data) {
            populateContactForm(data);
            $(settings.selector).find(settings.ticketLookupSectionSelector).slideUp(500, function() {
                $(settings.selector).find(settings.accountCredentialsSelector).find("input:first").focus();
            });
            
        },
        function (err) {
            if (err.status === 404) {
                $(settings.selector).find(settings.ticketLookupNotFoundSelector).slideDown();
            } else {
                $(settings.selector).find(settings.ticketLookupErrorSelector).text(settings.ticketLookupErrorText).slideDown();
            }
        })
        .always(function () {
            $(settings.selector).find(settings.ticketLookupSelector).find(settings.loadingSelector).hide();
            $(settings.selector).find(settings.ticketLookupInputSelector).focus();
        });
    }
    
    function populateContactForm(ticketInfo) {
        $("#FirstName").val(ticketInfo.Pass.FirstName);
        //$("#NameTitle").val(ticketInfo.Pass.NameTitleID);
        $("#FirstName").val(ticketInfo.Pass.FirstName);
        $("#MiddleName").val(ticketInfo.Pass.MiddleName);
        $("#LastName").val(ticketInfo.Pass.LastName);
        //$("#NameSuffix").val(ticketInfo.Pass.NameSuffixID);
        $("#Street1").val(ticketInfo.Pass.Street1);
        $("#Street2").val(ticketInfo.Pass.Street2);
        $("#CountryCode").val(ticketInfo.Pass.CountryCode);
        $("#City").val(ticketInfo.Pass.City);
        $("#RegionTextValue").val(ticketInfo.Pass.State);
        $("#RegionDropDownValue").val(ticketInfo.Pass.State);
        $("#Postal").val(ticketInfo.Pass.Zip);
        $("#Phone").val(ticketInfo.Pass.Phone);
        //$("#Cell").val(ticketInfo.Pass.Cell);
        $("#Email").val(ticketInfo.Pass.Email);
        $("#ConfirmEmail").val(ticketInfo.Pass.Email);
        $("#ContactGuid").val(ticketInfo.Pass.ContactGuid);
    }
    
    return model;
})(jQuery);