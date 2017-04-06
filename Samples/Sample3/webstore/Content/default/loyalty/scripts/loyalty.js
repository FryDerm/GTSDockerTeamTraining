gts.loyalty = (function($) {
	var model = {};

	var settings = {
		loyaltyProgramTemplate: "#loyalty-program-template",
		expandLoyaltyButton: "#ExpandLoyaltyLookup",
		cancelLoyaltyLookupButton: "#LoyaltyLookupCancel",
		submitLoyaltyLookupButton: "#LoyaltyLookupSubmit",
		loyaltyLookupContainer: "#LoyaltyLookup",
		loyaltyContainer: "#Loyalty",
		loyaltyLookupAccountNumberText: "#LoyaltyLookupAccountNumber",
		LoyaltyLookupFailedLabel: "#LoyaltyLookupFailed",
		LoyaltyProgramValue: "#LoyaltyProgram",
		LoyaltyAccountNumberValue: "#LoyaltyAccountNumber",
		LoyaltyAccrualBalanceValue: "#LoyaltyAccrualBalance",
		LoyaltyJoinDateValue: "#LoyaltyJoinDate",
		LoyaltyPromptContainer: "#LoyaltyPrompt",
		LoyaltyInformationContainer: "#LoyaltyInformation",
		ChangeLoyaltyAccountButton: "#ChangeLoyaltyAccount",
		LoyaltyModeAccrualRadio: "#LoyaltyModeAccrual",
		LoyaltyModeRedeptionRadio: "#LoyaltyModeRedeption",
		LoyaltyExpirationMessage: "#LoyaltyExpirationMessage",
		LoyaltyExpirationAccrualMessage: "#LoyaltyExpirationAccrualMessage",
		LoyaltyExpirationNoRedemption: "#LoyaltyExpirationNoRedemption",
		LoyaltyExpirationYesRedemption: "#LoyaltyExpirationYesRedemption",
		LoyaltyRedemptionInsufficientPointsMessage: "#LoyaltyRedemptionInsufficientPointsMessage",
		LoyaltyRedemptionMixedCostMessage: "#LoyaltyRedemptionMixedCostMessage"
	};

	//  Render the loyalty account information
	function renderLookupProgram(result) {
		if (result === "NotSet") {
		    changeLoyaltyAccount();
		    return;
		}

		var loyaltyAccount = result.LoyaltyAccount;

		$(settings.LoyaltyLookupFailedLabel).hide();
		$(settings.loyaltyLookupContainer).hide();
		$(settings.LoyaltyInformationContainer).slideToggle();
		$(settings.LoyaltyPromptContainer).hide();

		$(settings.LoyaltyProgramValue).text(loyaltyAccount.LoyaltyProgramName);
		$(settings.LoyaltyAccountNumberValue).text(loyaltyAccount.LoyaltyAccountNo);
		$(settings.LoyaltyAccrualBalanceValue).text(loyaltyAccount.LoyaltyAccrualBalance);
		$(settings.LoyaltyJoinDateValue).text(new Date(loyaltyAccount.JoinDate).toLocaleDateString());

		if (loyaltyAccount.LoyaltyMode === 1) {
			refreshTotals(false);
			$(settings.LoyaltyModeAccrualRadio).prop("checked", true);
		} else if (loyaltyAccount.LoyaltyMode === 2) {
			refreshTotals(true);
			$(settings.LoyaltyModeRedeptionRadio).prop("checked", true);
		}

		//  Display expiration messages if the loyalty program has expired.
		if (result.ValidForAccrual === false) {
			$(settings.LoyaltyExpirationMessage).show();
			$(settings.LoyaltyExpirationAccrualMessage).show();


			if (result.ValidForRedemption === false) {
				$(settings.LoyaltyExpirationNoRedemption).show();
			} else {
				$(settings.LoyaltyExpirationYesRedemption).show();
			}
		}
	}

	//  Call an event handler to refresh the totals.  This event gets passed in.
	function refreshTotals(redeemPoints) {
		settings.onRefreshTotals(redeemPoints);
	}

	//  Call the web api to get or lookup a loyalty account
	function getLoyaltyAccount(loyaltyNumber) {
		var data = null;

		if (loyaltyNumber !== "") {
		    data = { loyaltyAccountNumber: loyaltyNumber };
		}

		//  Hide the expiration messages
		$(settings.LoyaltyExpirationMessage).hide();
		$(settings.LoyaltyExpirationAccrualMessage).hide();
		$(settings.LoyaltyExpirationNoRedemption).hide();
		$(settings.LoyaltyExpirationYesRedemption).hide();
		$(settings.LoyaltyRedemptionInsufficientPointsMessage).hide();

		//  Query the server for the loyalty account
		gts.eGalaxyWebAPI.Loyalty.Get(data)
			.done(renderLookupProgram)
			.error(
				function() {
					$(settings.LoyaltyLookupFailedLabel).show("slow");
				});
	}

	//  Lookup a loyalty account
	function lookupLoyaltyAccount(e) {
		var lookupAccountNumber = $(settings.loyaltyLookupAccountNumberText).val();
		if (lookupAccountNumber === "") return;

		getLoyaltyAccount(lookupAccountNumber);
	}

	//  Toggle the view to show the lookup container
	function changeLoyaltyAccount() {
        //  First clear the loyalty account on the server.
        gts.eGalaxyWebAPI.Loyalty.Get({ clear: true })
            .done(function() {
                $(settings.loyaltyLookupAccountNumberText).val("");

                $(settings.LoyaltyPromptContainer).show("slow");
                $(settings.loyaltyLookupContainer).show("slow");
                $(settings.LoyaltyLookupFailedLabel).hide("slow");
                $(settings.LoyaltyInformationContainer).hide("slow");
            });
    }

    function updateLoyaltyMode(loyaltyMode) {
		$(settings.LoyaltyRedemptionInsufficientPointsMessage).hide();
		$(settings.LoyaltyRedemptionMixedCostMessage).hide();

		gts.eGalaxyWebAPI.Loyalty.PutLoyalty(loyaltyMode)
			.done(function() { refreshTotals(loyaltyMode === 2); })
			.error(function (data) {
				if (data.responseText === "\"LoyaltyRedemptionInsufficientPointsException\"") {
					$(LoyaltyRedemptionInsufficientPointsMessage).show();
				} else if (data.responseText === "\"LoyaltyRedemptionMixedCostException\"") {
					$(LoyaltyRedemptionMixedCostMessage).show();
				}

				$(settings.LoyaltyModeAccrualRadio).prop("checked", true);
			});
	}

	//  Adds loyalty to the page
	model.add = function(options) {
		$.extend(settings, options);

		//  An event needs to be passed in to update the totals when the loyalty mode changes
		settings.onRefreshTotals = options.onRefreshTotals;
        
		//  Add loyalty to the page
		$(settings.loyaltyContainer).html($.trim($(settings.loyaltyProgramTemplate).render()));

		//  Setup the expand button to show the loyalty lookup section
		$(settings.expandLoyaltyButton).click(function() {
			$(settings.loyaltyLookupContainer).show("slow");
		});

		//  Setup the cancel button to hide the loyalty lookup section
		$(settings.cancelLoyaltyLookupButton).click(function() {
			$(settings.loyaltyLookupContainer).hide("slow");
		});

		//  Setup the loyalty lookup button click event
		$(settings.submitLoyaltyLookupButton).click(lookupLoyaltyAccount);

		//  Setup the change loyalty account button click event
		$(settings.ChangeLoyaltyAccountButton).click(changeLoyaltyAccount);

		//  Setup an event to trigger when the radio buttons are clicked.
		$(settings.LoyaltyModeAccrualRadio).click(function () { updateLoyaltyMode(1); });
		$(settings.LoyaltyModeRedeptionRadio).click(function () { updateLoyaltyMode(2); });

		$("#LoyaltyEnrollmentLink").prop("href", options.loyaltyLink);

        //  Do an account lookup if a user presses the enter key
	    $(settings.loyaltyLookupAccountNumberText).keypress(function(e) {
            if (e.which === 13) {
                lookupLoyaltyAccount();
                e.preventDefault();
            }
	    });

		//  See if the current session has a loyalty account configured from one of the other pages
		getLoyaltyAccount("");
	};

	return model;
})(jQuery);