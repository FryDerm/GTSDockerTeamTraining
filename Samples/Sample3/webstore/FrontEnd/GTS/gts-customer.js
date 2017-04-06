GTS.accountButton.controller('accountButtonCustomer', 
           ['$scope','classify','AccountButtonController',
    function($scope,  classify,  AccountButtonController){

        var AccountButtonCustomer = classify(AccountButtonController, {
            // Javascript overrides go here

    });

return new AccountButtonCustomer($scope); }]);

GTS.accountLogon.controller('accountCreateCustomer', 
           ['$scope','classify','AccountCreateController',
    function($scope,  classify,  AccountCreateController){

        var AccountCreateCustomer = classify(AccountCreateController, {
            // Javascript overrides go here

    });

return new AccountCreateCustomer($scope); }]);

GTS.accountLogon.controller('accountLogonCustomer', 
           ['$scope','classify','AccountLogonController',
    function($scope,  classify,  AccountLogonController){

        var AccountLogonCustomer = classify(AccountLogonController, {
            // Javascript overrides go here

    });

return new AccountLogonCustomer($scope); }]);

GTS.accountLogonForm.controller('accountLogonFormCustomer', 
           ['$scope','classify','AccountLogonFormController',
    function($scope,  classify,  AccountLogonFormController){

        var AccountLogonFormCustomer = classify(AccountLogonFormController, {
            // Javascript overrides go here

    });

return new AccountLogonFormCustomer($scope); }]);

GTS.addOnModal.controller('addOnModalCustomer', 
           ['$scope','classify','AddOnModalController',
    function($scope,  classify,  AddOnModalController){

        var AddOnModalCustomer = classify(AddOnModalController, {
            // Javascript overrides go here

    });

return new AddOnModalCustomer($scope); }]);

GTS.associatedTickets.controller('associatedTicketsCustomer', 
           ['$scope','classify','AssociatedTicketsController',
    function($scope,  classify,  AssociatedTicketsController){

        var AssociatedTicketsCustomer = classify(AssociatedTicketsController, {
            // Javascript overrides go here

    });

return new AssociatedTicketsCustomer($scope); }]);

GTS.calendarModal.controller('CalendarModal_Customer', ['CalendarModal_Controller', '$scope',function(CalendarModal_Customer, $scope){

	return new CalendarModal_Customer($scope);

}]);

GTS.cart.controller('CartController', ['$scope','classify','Cart_Controller', function($scope,classify,Cart_Controller){

	// init
	var CartController = classify(Cart_Controller, {});

	return new CartController($scope);

}]);

GTS.changePassword.controller('changePasswordCustomer', [
	
	'classify','ChangePasswordController','$scope',function(
	 classify,  ChangePasswordController,  $scope){
	
		var ChangePasswordCustomer = classify(ChangePasswordController, {

			
		});
		
		return new ChangePasswordCustomer($scope);
		
	}
]);

GTS.checkoutForm.controller('checkoutFormCustomer', 
           ['$scope','classify','CheckoutFormController',
    function($scope,  classify,  CheckoutFormController){

        var CheckoutFormCustomer = classify(CheckoutFormController, {
            // Javascript overrides go here

    });

return new CheckoutFormCustomer($scope); }]);

GTS.confirmationPrompt.controller('confirmationPromptCustomer', 
           ['$scope','classify','ConfirmationPromptController',
    function($scope,  classify,  ConfirmationPromptController){

        var ConfirmationPromptCustomer = classify(ConfirmationPromptController, {
            // Javascript overrides go here

    });

return new ConfirmationPromptCustomer($scope); }]);

GTS.cvvHelp.controller('cvvHelpCustomer', 
           ['$scope','classify','CvvHelpController',
    function($scope,  classify,  CvvHelpController){

        var CvvHelpCustomer = classify(CvvHelpController, {
            // Javascript overrides go here

    });

return new CvvHelpCustomer($scope); }]);

GTS.dateSpecificModalApi.controller('dateSpecificModalApiCustomer', ['classify', 'DateSpecificModalApiController', '$scope', 
	function(classify, DateSpecificModalApiController, $scope){
	
	var DateSpecificModalApiCustomer = classify(DateSpecificModalApiController, {
	

	});
	
	return new DateSpecificModalApiCustomer($scope);
	
}]);

GTS.dateSpecificModal.controller('dateSpecificModalCustomer', [
	
	'$scope','classify','DateSpecificModalController',function(
	 $scope,  classify,  DateSpecificModalController){
	
		var DateSpecificModalCustomer = classify(DateSpecificModalController, {
			
			
		});
		
		return new DateSpecificModalCustomer($scope);
	}
]);

GTS.donation.controller('donationCustomer', 
           ['$scope','classify','DonationController',
    function($scope,  classify,  DonationController){

        var DonationCustomer = classify(DonationController, {
            // Javascript overrides go here

    });

return new DonationCustomer($scope); }]);

GTS.error.controller('errorCustomer', 
           ['$scope','classify','ErrorController',
    function($scope,  classify,  ErrorController){

        var ErrorCustomer = classify(ErrorController, {
            // Javascript overrides go here

    });

return new ErrorCustomer($scope); }]);

GTS.eventTimeModalApi.controller('eventTimeModalApiCustomer', ['classify', 'EventTimeModalApiController', '$scope', 
	function(classify, EventTimeModalApiController, $scope){
		var EventTimeModalApiCustomer = classify(EventTimeModalApiController, {});
	
		return new EventTimeModalApiCustomer($scope);  
}]);

GTS.eventTimeModal.controller('eventTimeModalCustomer', ['classify','$scope','EventTimeModalController', function(classify, $scope, EventTimeModalController){
	
	var EventTimeModalCustomer = classify(EventTimeModalController, {
		
		
		
	});
	
	return new EventTimeModalCustomer($scope, true);
	
}]);

GTS.feePopup.controller('feePopupCustomer', 
           ['$scope','classify','FeePopupController',
    function($scope,  classify,  FeePopupController){

        var FeePopupCustomer = classify(FeePopupController, {
            // Javascript overrides go here

    });

return new FeePopupCustomer($scope); }]);

GTS.forgotPasswordModal.controller('forgotPasswordModalCustomer', 
           ['$scope','classify','ForgotPasswordModalController',
    function($scope,  classify,  ForgotPasswordModalController){

        var ForgotPasswordModalCustomer = classify(ForgotPasswordModalController, {
            // Javascript overrides go here

    });

return new ForgotPasswordModalCustomer($scope); }]);

GTS.groupSalesLogin.controller('groupSalesLoginCustomer', ['classify','GroupSalesLoginController','$scope', function(classify, GroupSalesLoginController, $scope){
	
	var GroupSalesLoginCustomer = classify(GroupSalesLoginController, {});

	return new GroupSalesLoginCustomer($scope);
		
}]);

GTS.groupSalesQuestionnaire.controller('groupSalesQuestionnaireCustomer', ['classify','GroupSalesQuestionnaireController', '$scope', function(classify, GroupSalesQuestionnaireController, $scope){
	
	var GroupSalesQuestionnaireCustomer = classify(GroupSalesQuestionnaireController, {
		
	});
	
	return new GroupSalesQuestionnaireCustomer($scope);
	
}]);

GTS.guestNamesPrompt.controller('guestNamesPromptCustomer', 
           ['$scope','classify','GuestNamesPromptController',
    function($scope,  classify,  GuestNamesPromptController){

        var GuestNamesPromptCustomer = classify(GuestNamesPromptController, {
            // Javascript overrides go here

    });

return new GuestNamesPromptCustomer($scope); }]);

GTS.header.controller('headerCustomer', 
           ['$scope','classify','HeaderController',
    function($scope,  classify,  HeaderController){

        var HeaderCustomer = classify(HeaderController, {
            // Javascript overrides go here

    });

return new HeaderCustomer($scope); }]);

GTS.hero.controller('heroCustomer', 
           ['$scope','classify','HeroController',
    function($scope,  classify,  HeroController){

        var HeroCustomer = classify(HeroController, {
            // Javascript overrides go here

    });

return new HeroCustomer($scope); }]);

GTS.householding.controller('householdingCustomer', ['classify','HouseholdingController', '$scope',function(classify, HouseholdingController, $scope){
	
	var HouseholdingCustomer = classify(HouseholdingController, {
		
		
	});
	
	return new HouseholdingCustomer($scope);
	
}]);

GTS.infoModal.controller('infoModalCustomer', 

    ['$scope','classify','InfoModalController', function(
      $scope,  classify,  InfoModalController){

    var InfoModalCustomer = classify(InfoModalController, {
            // Javascript overrides go here
    });

    return new InfoModalCustomer($scope); 

}]);

GTS.languageSelector.controller('languageSelectorCustomer', 
           ['$scope','classify','LanguageSelectorController',
    function($scope,  classify,  LanguageSelectorController){

        var LanguageSelectorCustomer = classify(LanguageSelectorController, {
            // Javascript overrides go here

    });

return new LanguageSelectorCustomer($scope); }]);

GTS.leftNav.controller('leftNavCustomer', ['classify', 'SalesChannelNavController','$scope',
	function(classify, SalesChannelNavController, $scope){
		
		var LeftNavCustomer = classify(SalesChannelNavController, {
			
		});
		
		return new LeftNavCustomer($scope);	
	}
]);

GTS.logout.controller('logoutCustomer', 
           ['$scope','classify','LogoutController',
    function($scope,  classify,  LogoutController){

        var LogoutCustomer = classify(LogoutController, {
            // Javascript overrides go here

    });

return new LogoutCustomer($scope); }]);

GTS.loyaltyConfirmation.controller('loyaltyConfirmationCustomer', ['classify','LoyaltyConfirmationController','$scope',
	function(classify, LoyaltyConfirmationController, $scope
	){

		var LoyaltyConfirmationCustomer = classify(LoyaltyConfirmationController, {
			
			// add methods here

		});

		return new LoyaltyConfirmationCustomer($scope);
	}
]);

GTS.loyaltyCreate.controller('loyaltyCreateCustomer', ['classify','LoyaltyCreateController','$scope',
	function(classify, LoyaltyCreateController, $scope){
	
	var LoyaltyCreateCustomer = classify(LoyaltyCreateController, {
		
	});
	
	return new LoyaltyCreateCustomer($scope);
	
}]);

GTS.loyaltyLogin.controller('loyaltyLoginCustomer', 
           ['$scope','classify','LoyaltyLoginController',
    function($scope,  classify,  LoyaltyLoginController){

        var LoyaltyLoginCustomer = classify(LoyaltyLoginController, {
            // Javascript overrides go here

    });

return new LoyaltyLoginCustomer($scope); }]);

GTS.loyaltyLoginModal.controller('loyaltyLoginModalCustomer', ['classify','LoyaltyLoginModalController','$scope',
	function(classify, LoyaltyLoginModalController, $scope
	){

		var LoyaltyLoginModalCustomer = classify(LoyaltyLoginModalController, {
			
			// add methods here

		});

		return new LoyaltyLoginModalCustomer($scope);
	}
]);

GTS.loyaltySelector.controller('loyaltySelectorCustomer', ['classify','LoyaltySelectorController','$scope',
	function(classify, LoyaltySelectorController, $scope
	){

		var LoyaltySelectorCustomer = classify(LoyaltySelectorController, {
			
			// add methods here

		});

		return new LoyaltySelectorCustomer($scope);
	}
]);

GTS.membershipInit.controller('membershipInitCustomer', 
           ['$scope','classify','MembershipInitController',
    function($scope,  classify,  MembershipInitController){

    	var MembershipInitCustomer = classify(MembershipInitController, {
    		// Javascript overrides go here

    	});

    	return new MembershipInitCustomer($scope); }]);

GTS.membershipJointAddOn.controller('membershipJointAddOnCustomer', [
	
	'classify','MembershipJointAddOnController','$scope',function(
	 classify,  MembershipJointAddOnController,  $scope){
		
	var MembershipJointAddOnCustomer = classify(MembershipJointAddOnController, {
		
		
		
	});
	
	return new MembershipJointAddOnCustomer($scope);
		
}]);

GTS.membershipJointAdult.controller('membershipJointAdultCustomer', [
	
	'MembershipJointAdultController','classify','$scope', function(
	 MembershipJointAdultController,  classify,  $scope){
	
	var MembershipJointAdultCustomer = classify(MembershipJointAdultController, {
		
	});
	
	return new MembershipJointAdultCustomer($scope);
}]);

GTS.membershipJointChild.controller('membershipJointChildCustomer', [
	
	'MembershipJointChildController','classify','$scope', function(
	 MembershipJointChildController,  classify,  $scope){
		 
	var MembershipJointChildCustomer = classify(MembershipJointChildController, {
		
	});
	
	return new MembershipJointChildCustomer($scope);
}]);

GTS.membershipJointMemberModal.controller('membershipJointMemberModalCustomer', [
	
	'MembershipJointMemberModalController','classify','$scope',function(
	 MembershipJointMemberModalController,  classify,  $scope){
	
	var MembershipJointMemberModal = classify(MembershipJointMemberModalController, {

	}); 
	
	return new MembershipJointMemberModal($scope);
	
}]);

GTS.membershipPrimary.controller('membershipPrimaryCustomer', [
	
	'$scope','MembershipPrimaryController','classify',function(
	 $scope,  MembershipPrimaryController,  classify){
	
	var MembershipPrimaryCustomer = classify(MembershipPrimaryController, {
		
	});
	
	return new MembershipPrimaryCustomer($scope);

}]);

GTS.membershipUpdate.controller('membershipUpdateCustomer', ['classify','MembershipUpdateController','$scope',function(classify,MembershipUpdateController,$scope){
	
	var MembershipUpdateCustomer = classify(MembershipUpdateController, {
		
	});
	
	return new MembershipUpdateCustomer($scope);
	
}]);

GTS.membership.controller('membershipCustomer', 
           ['$scope','classify','MembershipController',
    function($scope,  classify,  MembershipController){

        var MembershipCustomer = classify(MembershipController, {
            // Javascript overrides go here

    });

return new MembershipCustomer($scope); }]);

GTS.membershipLookup.controller('membershipLookupCustomer', [
	
	'$scope','MembershipLookupController','classify',function($scope, MembershipLookupController, classify){
	
	return new MembershipLookupController($scope);
	
}]);

GTS.multiTimeSelectorModal.controller('multiTimeSelectorModalCustomer', ['classify','MultiTimeSelectoModalController', '$scope',function(classify, MultiTimeSelectoModalController, $scope){
	
	var MultiTimeSelectoModalCustomer = classify(MultiTimeSelectoModalController, {
		
	});
	
	return new MultiTimeSelectoModalCustomer($scope);
	
}]);

GTS.multiTimeSelector.controller('multiTimeSelectorCustomer', [
	
	'classify','MultiTimeSelectorController','$scope',function(classify, MultiTimeSelectorController, $scope){
	
	var MultiTimeSelectorCustomer = classify(MultiTimeSelectorController, {
		
		
	});
	
	return new MultiTimeSelectorCustomer($scope);
	
}]);

GTS.newAccountModal.controller('newAccountModalCustomer', ['classify','NewAccountModalController','$scope',
	function(classify, NewAccountModalController, $scope
	){

		var NewAccountModalCustomer = classify(NewAccountModalController, {
			
			// add methods here

		});

		return new NewAccountModalCustomer($scope);
	}
]);

GTS.orderConfirmation.controller('orderConfirmationCustomer', [
	'$scope', 'OrderConfirmationController', 'classify', function (
	 $scope,   OrderConfirmationController,   classify){

	var OrderConfirmationCustomer = classify(OrderConfirmationController, {

		
	});

	return new OrderConfirmationCustomer($scope);

}]); 

GTS.orderError.controller('orderErrorCustomer', [

	'$scope', 'OrderErrorController', 'classify',function (
	 $scope,   OrderErrorController,   classify) {
		
	var OrderErrorCustomer = classify(OrderErrorController, {


	});

	return new OrderErrorCustomer($scope);

}]); 

GTS.passConfirmation.controller('passConfirmationCustomer', [
	
	'$scope','classify','PassConfirmationController',function(
	 $scope,  classify,  PassConfirmationController
	){
		
		var PassConfirmationCustomer = classify(PassConfirmationController, {
			
		});
		
		return new PassConfirmationCustomer($scope);
		
	}]);

GTS.passLookup.controller('passLookupCustomer', [
	
	'$scope','classify','PassLookupController', function(
	 $scope,  classify,  PassLookupController){
		 
	var PassLookupCustomer = classify(PassLookupController, {
		
	});
	
	return new PassLookupCustomer($scope);
	
}]);

GTS.passRenewals.controller('passRenewalsCustomer', ['classify','PassRenewalsController','$scope',
	function(classify, PassRenewalsController, $scope
	){

		var PassRenewalsCustomer = classify(PassRenewalsController, {
			
		});

		return new PassRenewalsCustomer($scope);
	}
]);

GTS.paymentPlanLogin.controller('paymentPlanLoginCustomer',
			['$scope', 'classify', 'BaseController', 
	function ($scope,   classify,   BaseController) {

	var PaymentPlanLoginCustomer = classify(PaymentPlanLoginController, {

	});

	return new PaymentPlanLoginCustomer($scope);

}]);

GTS.paymentPlansAgreement.controller('paymentPlansAgreementCustomer', [

	'$scope', 'classify', 'PaymentPlansAgreementController', function (
   	 $scope,   classify,   PaymentPlansAgreementController) {

	var PaymentPlansAgreementCustomer = classify(PaymentPlansAgreementController, {

		
	});

	return new PaymentPlansAgreementCustomer($scope);

}]);

GTS.paymentPlan.controller('paymentPlanCustomer', ['classify','PaymentPlanController', '$scope', function(classify, PaymentPlanController, $scope){

	var PaymentPlanCustomer = classify(PaymentPlanController, {


	});
	
	return new PaymentPlanCustomer($scope);

}]);

GTS.postUsageSurvey.controller('postUsageSurveyCustomer', [

	'$scope','classify','PostUsageSurveyController', function (
	 $scope,  classify,  PostUsageSurveyController) {

	var PostUsageSurveyCustomer = classify(PostUsageSurveyController, {

		
	});

	return new PostUsageSurveyCustomer($scope);

}]);

GTS.profileAccount.controller('profileAccountCustomer', [
	
	'classify','ProfileAccountController', '$scope',  function (
	 classify,  ProfileAccountController,   $scope) {
	
	var ProfileAccountCustomer = classify(ProfileAccountController, {
		
		
	});
	
	return new ProfileAccountCustomer($scope);
	
}]);

GTS.profileMemberships.controller('profileMembershipsCustomer', [
	
	'$scope','ProfileMembershipsController','classify',function(
	 $scope,  ProfileMembershipsController,  classify){
		
	var ProfileMembershipsCustomer = classify(ProfileMembershipsController, {
	
	});
	
	return new ProfileMembershipsCustomer($scope);

}]);

GTS.profileOrderHistory.controller('profileOrderHistoryCustomer', [
	
	'ProfileOrderHistoryController','$scope','classify',function(
	 ProfileOrderHistoryController,  $scope,  classify){
	
	var ProfileOrderHistoryCustomer = classify(ProfileOrderHistoryController, {
		
		
	});
	
	return new ProfileOrderHistoryCustomer($scope);


}]);

GTS.profile.controller('profileCustomer', [
	
	'$scope','classify','ProfileController',function(
	 $scope,  classify,  ProfileController){
	
	var ProfileCustomer = classify(ProfileController, {


	}); 
	
	return new ProfileCustomer($scope);
	
}]);

GTS.promotionCode.controller('PromotionCodeCustomer', [

	'PromotionCodeController','$scope', 'classify', function (
	 PromotionCodeController,  $scope,   classify) {

		var PromotionCodeCustomer = classify(PromotionCodeController, {

		
		});

		return new PromotionCodeCustomer($scope);

	}]);

GTS.promotionHelpModal.controller('PromotionHelpModalInstance', [

	'$scope', 'classify', 'PromotionHelpModalController', function (
	 $scope,   classify,   PromotionHelpModalController) {

		var PromotionHelpModalCustomer = classify(PromotionHelpModalController, {

			
		});

		return new PromotionHelpModalCustomer($scope);

	}]);

GTS.renewalCart.controller('renewalCartCustomer', [
	
	'classify','RenewalCartController','$scope',function(
	 classify,  RenewalCartController,  $scope
	){

	var RenewalCartCustomer = classify(RenewalCartController, {



	});
			
	return new RenewalCartCustomer($scope);
	
}]);

GTS.renewals.controller('renewalsCustomer', ['classify','RenewalsController','$scope',
	function(classify, RenewalsController, $scope
	){

		var RenewalsCustomer = classify(RenewalsController, {			

		});

		return new RenewalsCustomer($scope);
	}
]);

GTS.requestCorporateAccount.controller('requestCorporateAccountCustomer', [
	
	'RequestCorporateAccountController', 'classify','$scope', function(RequestCorporateAccountController, classify, $scope){
		
		var RequestCorporateAccountCustomer = classify(RequestCorporateAccountController, {
			
			
		});
		
		return new RequestCorporateAccountCustomer($scope);
	}
]);

GTS.rosterInfo.controller('rosterInfoCustomer',
	['$scope', 'classify', 'RosterInfoController',function (
	  $scope,   classify,   RosterInfoController) {

	    var RosterInfoCustomer = classify(RosterInfoController, {
		    
        });

        return new RosterInfoCustomer($scope);
    }]);

GTS.salesChannelNav.controller('salesChannelNavCustomer', ['classify','SalesChannelNavController','$scope',
	function(classify, SalesChannelNavController, $scope){
	
		var SalesChannelNavCustomer = classify(SalesChannelNavController, {
			
		});
		
		return new SalesChannelNavCustomer($scope);
	
	}
]);

GTS.selectCustomer.controller('selectCustomerCustomer', [
	'classify','SelectCustomerController','$scope',function(classify,SelectCustomerController,$scope){
	
		var SelectCustomerCustomer = classify(SelectCustomerController, {
			
			
			
		});
		
		return new SelectCustomerCustomer($scope);
	}
]);

GTS.smallCart.controller('smallCartCustomer', [
	
	'SmallCartController','classify','$scope',function(
	 SmallCartController,  classify,  $scope){
		 
	var SmallCartCustomer = classify(SmallCartController, {
		
	});

	return new SmallCartCustomer($scope);

}]);

GTS.steps.controller('stepsCustomer', [
	
	'$scope','classify', 'StepsController', function(
	 $scope,  classify,   StepsController ){

	var StepsCustomer = classify(StepsController, {
	
	
	});

	return new StepsCustomer($scope);

}]);

GTS.survey.controller('surveyCustomer',
            ['$scope','classify','SurveyController',
    function ($scope,  classify,  SurveyController) {

        var SurveyCustomer = classify(SurveyController, {
        

        });

        return new SurveyCustomer($scope);

    }]);

GTS.termsAndConditionsDialog.controller('termsAndConditionsDialogCustomer', [
	
	'TermsAndConditionsDialogController','$scope','classify', function(
	 TermsAndConditionsDialogController,  $scope,  classify ){
	
	var TermsAndConditionsDialogCustomer = classify(TermsAndConditionsDialogController, {
		
	});
	
	return new TermsAndConditionsDialogCustomer($scope);

}]);

GTS.ticketLookup.controller('ticketLookupCustomer', [

	'$scope','classify','TicketLookupController', function (
	 $scope,  classify,  TicketLookupController) {

		var TicketLookupCustomer = classify(TicketLookupController, {

		
		});

		return new TicketLookupCustomer($scope);

}]);

GTS.ticketLookupModal.controller('ticketLookupModalCustomer', ['classify','TicketLookupModalController','$scope',
	function(classify, TicketLookupModalController, $scope
	){

		var TicketLookupModalCustomer = classify(TicketLookupModalController, {
			
			// add methods here

		});

		return new TicketLookupModalCustomer($scope);
	}
]);

GTS.upsellCalendarModal.controller('upsellCalendarModalCustomer', [
	
	'classify','UpsellCalendarModalController','$scope',function(classify, UpsellCalendarModalController, $scope){
	
	var UpsellCalendarModalCustomer = classify(UpsellCalendarModalController, {
		
	});
	
	return new UpsellCalendarModalCustomer($scope);
	
}]);

GTS.upsellModal.controller('upsellModalCustomer', [
	'classify', 'UpsellModalController', '$scope', '$element', function(
	 classify,   UpsellModalController,   $scope,   $element){
	
	var UpsellModalCustomer = classify(UpsellModalController, {
		element : $element
	});
	
	return new UpsellModalCustomer($scope);
}]);

GTS.upsell.controller('upsellControllerCustomer', [
	
	'$scope','classify','UpsellController',function(
	 $scope,  classify,  UpsellController){
	
	var UpsellControllerCustomer = classify(UpsellController, {

		
	});
	
	return new UpsellControllerCustomer($scope);
	
}]);

GTS.verifyLimits.controller('verifyLimitsCustomer', ['classify','VerifyLimitsController', '$scope',function(classify, VerifyLimitsController, $scope){
	
	var VerifyLimitsCustomer = classify(VerifyLimitsController, {
		
	
	});
	
	return new VerifyLimitsCustomer($scope);
	
}]);

GTS.viewEvents.controller('viewEventsCustomer', [

	'$scope','ViewEventsController','classify', function (
	 $scope,  ViewEventsController,  classify) {

		var ViewEventsCustomer = classify(ViewEventsController, {

			
		});

		return new ViewEventsController($scope);

	}]);

GTS.viewItems.controller('viewItemsCustomer', [

	'$scope','classify','ViewItemsController', function(
	 $scope,  classify,  ViewItemsController){

	var ViewItemsCustomer = classify(ViewItemsController, {
		
		/* 
		_constructor : function(){
			ViewItemsController.prototype._constructor.apply(this, arguments);
		}
		*/

	});

	return new ViewItemsCustomer($scope);

}]);

GTS.viewOrder.controller('viewOrderCustomer', [
	
	'ViewOrderController','classify','$scope',function(
	 ViewOrderController,  classify,  $scope){
		 
	var ViewOrderCustomer = classify(ViewOrderController, {
			
		
	});
	
	return new ViewOrderCustomer($scope);
	
}]);

GTS.viewOrderOutsideAccount.controller('viewOrderOutsideAccountCustomer', [

	'classify','ViewOrderOutsideAccountController','$scope', function(
	 classify, ViewOrderOutsideAccountController, $scope
	
	){
	
		var ViewOrderOutsideController = classify(ViewOrderOutsideAccountController, {
		
		});
		
		return new ViewOrderOutsideController($scope);
	}
]);

GTS.viewTickets.controller('viewTicketsCustomer', [

	'$scope', 'ViewTicketsController', 'classify', function(
	 $scope,   ViewTicketsController,   classify){

	var ViewTicketsCustomer = classify(ViewTicketsController, {
		
	});

	return new ViewTicketsCustomer($scope);

}]); 