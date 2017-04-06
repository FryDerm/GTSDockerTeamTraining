gts.profileModule = (function ($) {
    var model = {};
    
    var settings = {
        profileSelector: "#account-profile",
        profileStatsSelector: ".details-stats",
        ticketLookupSelector: ".ticket-lookup",
        ticketLookupButtonSelector: ".ticket-lookup .ticket-lookup-button",
        ticketLookupResultsSelector: ".ticket-lookup-results",
        ticketInfoSelector: ".ticket-info",
        ticketLookupTemplate: "#ticket-lookup-result-template",
        loadingSelector: ".loading",
        ticketLookupErrorSelector: ".ticket-lookup-error",
        ticketLookupNotFoundSelector: ".ticket-lookup-not-found",
        ticketLookupRequiredFieldsMissing: ".ticket-lookup-required-fields-missing",
        ticketLookupErrorText: "[L:TicketLookupError]",
        activeMembershipTemplate: "#active-membership-template",
        activeMemberships: ".active-memberships",
        associatedMembershipTemplate: "#associated-membership-template",
        associatedMemberships: ".associated-memberships",
        accountStatsTemplate: "#account-stats-template",
        subHeaderTemplate: "#sub-header-template",
        ticketLookupInputTemplate: "#ticket-lookup-render-template",
        ticketLookupInputsWrap: ".lookup-input-wrap",
        ticketLookupInputSelector: "#ticket-lookup-input",
        ticketLookupAccountInput: "#lookup-account-input",
        ticketLookupBirthDateInput: "#lookup-birthdate-input",
        ticketLookupLastNameInput: "#lookup-lastname-input",
        ticketLookupOptions: {},
        hasLicenseForLoyalty: false,
        loyaltyConfig: {},
        loyaltyTemplate: "#ticket-loyalty-render-template",
        loyaltySelector: ".loyalty-account"
    };
    
    var searchedTickets = [];
    var currentAccount;
    
    model.init = function(options) {
        $.extend(settings, options);

        $(settings.profileSelector).off("click.gts", settings.ticketLookupButtonSelector, ticketLookup);
        $(settings.profileSelector).on("click.gts", settings.ticketLookupButtonSelector, ticketLookup);
        $(settings.profileSelector).off("keydown.gts", settings.ticketLookupInputSelector, ticketLookupKeyDown);
        $(settings.profileSelector).on("keydown.gts", settings.ticketLookupInputSelector, ticketLookupKeyDown);

        $("#summary-link, #edit-information-link, #order-history-link, #memberships-link, #loyalty-account-link").contentSwitcher();
        $(".main-content").fadeIn(1000);
        setTimeout(function () {
            $(".details-stats").fadeIn(500);

            $("dl dt").css("padding-left", "25px").each(function (i, e) {
                setTimeout((function (element) {
                    return function () { $(element).animate({ paddingLeft: 0 }, 750); };
                })(e), i * 200);
            });

            $("dl dd").css("padding-left", "75px").each(function (i, e) {
                setTimeout((function (element) {
                    return function () { $(element).animate({ paddingLeft: 0 }, 750); };
                })(e), i * 200);
            });
        }, 500);

        userName($("#LogInInformation").text());
        loadContact();
        renderSubHeader();
        renderLoyalty();
        renderTicketLookup();
    };

    function renderSubHeader() {
        var subHeaderMarkup = $.trim($(settings.subHeaderTemplate).render());
        if (subHeaderMarkup) {
            $("#sub-header").html(subHeaderMarkup).show();
            setTimeout(function () {
                $("#sub-header ul").fadeIn(500).css("display", "inline-block");

                $("#sub-header ul li").css("padding-left", "25px").each(function (i, e) {
                    setTimeout((function (element) {
                        return function () { $(element).animate({ paddingLeft: 0 }, 750); };
                    })(e), i * 200);
                });
            }, 500);
        }
    }
    
    function userName(newName) {
        if (!newName) {
            return $("#account-profile .details-page-name .name").text();
        }

        $("#account-profile .details-page-name .name").text(newName);
        return model;
    }
    
    function loadContact() {
        gts.eGalaxyWebAPI.account.get()
            .done(function (account) {
                currentAccount = account;
                renderAccountInfo();
                renderMembershipInfo();

                if (currentAccount.GroupSalesAutoLogon) {
                    $("#summary-link").hide();
                    $("#edit-information-link").hide();
                    $("#order-history-link").hide();
                    $("#memberships-link").hide();
                    $("#loyalty-account-link").hide();
                    $(".account-info").hide();
                }
            })
            .fail(function() {

            });
    }
    
    function renderAccountInfo() {
        if (!userName()) {
            if (currentAccount.FirstName) {
                if (currentAccount.LastName) {
                    userName(currentAccount.FirstName + " " + currentAccount.LastName);
                } else {
                    userName(currentAccount.FirstName);
                }
            } else {
                if (currentAccount.LastName) {
                    userName(currentAccount.LastName);
                } else {
                    
                }
            }
        }
        
        var accountStatsMarkup = $.trim($(settings.accountStatsTemplate).render(currentAccount));
        $(settings.profileSelector).find(settings.profileStatsSelector).html(accountStatsMarkup);
    }
    
    function addDatePicker() {
        var input;
        input = $(settings.ticketLookupBirthDateInput);
        input.datepicker({
            showAnim: "drop",
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            yearRange: '1900:c',
            minDate: new Date(1900, 1 - 1, 1),
            maxDate: '0'
        });
    }

    function renderLoyalty() {
        if (!settings.hasLicenseForLoyalty) {
            $('#loyalty-account-link').hide();
        } else {
            $('#loyalty-account-link').show();
            
            var loyaltyMarkup = $.trim($(settings.loyaltyTemplate).render(settings.loyaltyConfig));
            $(settings.profileSelector).find(settings.loyaltySelector).html(loyaltyMarkup);
        }
    }
    
    function renderTicketLookup() {
        var ticketLookupMarkup = $.trim($(settings.ticketLookupInputTemplate).render(settings.ticketLookupOptions));
        $(settings.profileSelector).find(settings.ticketLookupInputsWrap).html(ticketLookupMarkup);

        if($(settings.ticketLookupBirthDateInput).length !== 0)
            addDatePicker();
    }
    
    function renderMembershipInfo() {

        for (var activeMembershipIndex = 0; activeMembershipIndex < currentAccount.ActiveMemberships.length; activeMembershipIndex++) {
            var activeMembership = currentAccount.ActiveMemberships[activeMembershipIndex];
            var activeMembershipMarkup = $.trim($(settings.activeMembershipTemplate).render(activeMembership));
            
            $(settings.profileSelector).find(settings.activeMemberships).find("ul").append(activeMembershipMarkup);
        }
        
        for (var associatedMembershipIndex = 0; associatedMembershipIndex < currentAccount.AssociatedMemberships.length; associatedMembershipIndex++) {
            var associatedMembership = currentAccount.AssociatedMemberships[associatedMembershipIndex];
            var associatedMembershipMarkup = $.trim($(settings.associatedMembershipTemplate).render(associatedMembership));
            
            $(settings.profileSelector).find(settings.associatedMemberships).find("ul").append(associatedMembershipMarkup);
        }
        
        if (currentAccount.ActiveMemberships.length > 0) {
            $(settings.profileSelector).find(settings.activeMemberships).show();
        }
        
        if (currentAccount.AssociatedMemberships.length > 0) {
            $(settings.profileSelector).find(settings.associatedMemberships).show();
        }
    }
    
    function ticketLookupKeyDown(e) {
        var key = e.keyChar || e.which;

        if (key === 13) {
            ticketLookup();
        }
    }

    function ticketAlreadySearched(visualId) {
        for (var i = 0; i < searchedTickets.length; i++) {
            if (searchedTickets[i] === visualId) {
                return true;
            }
        }
        return false;
    }

    function ticketLookup(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        
        $(settings.profileSelector).find(settings.ticketLookupErrorSelector).hide().text("");
        $(settings.profileSelector).find(settings.ticketLookupNotFoundSelector).hide();
        $(settings.profileSelector).find(settings.ticketLookupRequiredFieldsMissing).hide();

        var visualId = $(settings.profileSelector).find(settings.ticketLookupInputSelector).val();
        var account = $(settings.profileSelector).find(settings.ticketLookupAccountInput).val();
        var birthdate =  $(settings.profileSelector).find(settings.ticketLookupBirthDateInput).val();
        var lastname = $(settings.profileSelector).find(settings.ticketLookupLastNameInput).val();
        
        if (!visualId || ticketAlreadySearched(visualId)) {
            $(settings.profileSelector).find(settings.ticketLookupRequiredFieldsMissing).slideDown();
            return;
        }
        
        $(settings.profileSelector).find(settings.ticketLookupSelector).find(settings.loadingSelector).show();
        
        var lookupinputs = { VisualId: visualId, PassAccount: account, LastName: lastname, DOB: birthdate };
        
        gts.eGalaxyWebAPI.TicketInfo.Get(lookupinputs, function (data) {
            $(settings.profileSelector).find(settings.ticketLookupResultsSelector).show();

            var ticketMarkup = $.trim($(settings.ticketLookupTemplate).render(data));
            
            $(settings.profileSelector)
                .find(settings.ticketLookupResultsSelector)
                .append(ticketMarkup)
                .find(settings.ticketInfoSelector)
                .fadeIn(500);
            
            searchedTickets.push(visualId);
        },
        function (err) {
            if (err.status === 404) {
                $(settings.profileSelector).find(settings.ticketLookupNotFoundSelector).slideDown();
            } else {
                $(settings.profileSelector).find(settings.ticketLookupErrorSelector).text(settings.ticketLookupErrorText).slideDown();
            }
        })
        .always(function() {
            $(settings.profileSelector).find(settings.ticketLookupSelector).find(settings.loadingSelector).hide();
            $(settings.profileSelector).find(settings.ticketLookupInputSelector).focus();
        });
    }

    return model;
})(jQuery);