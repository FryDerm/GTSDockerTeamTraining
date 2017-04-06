/* global GTS: {} */
/* global angular: {} */
/* global $: function */

/*jshint -W079 */
var GTS = {};
/*jshint +W079 */

GTS.wshtml = {};
GTS.dd = angular.module('gts-dd', []);
GTS.util = angular.module('gts-utilities', ['gts-dd']);
GTS.main = angular.module('gts-frontEnd', [
    'ui.utils.masks',
	'gts-utilities',
	'gts-dd',
	'webForms',
	'viewItems',
	'smallCart',
	'pageStateService',
	'storage',
	'steps',
	'paymentPlan',
	'communicator',
	'base',
	'loyaltyLogin',
	'quantityControl',
	'editablePrice',
	'numbersOnly',
	'packagePlu',
	'infoModal',
	'CalendarModal',
	'Cart',
	'checkout',
	'CheckoutForm',
	'responder',
	'loyaltyLogin',
	'api',
	'orderConfirmation',
	'confirmationPrompt',
	'modal',
	'formatter',
	'hero',
	'accountLogonForm',
	'profile',
	'tabs',
	'accountButton',
	'accountLogon',
	'accountCreate',
	'viewOrder',
	'membership',
	'viewTickets',
	'mixins',
	'guestNamesPrompt',
	'passLookup',
	'salesChannelNav',
	'renewalCart',
	'passConfirmationModule',
	'languageSelector',
	'error',
	'feePopup',
	'logout',
	'survey',
	'rosterInfo',
	'paymentPlansAgreement',
	'postUsageSurvey',
	'pager',
	'numericFormField',
	'ticketLookup',
	'promotionCode',
	'promotionHelpModal',
	'orderError',
	'upsell',
	'viewEvents',
	'webSettings',
	'upsellUpgrade',
	'paymentPlanLogin',
	'donation',
	'groupSalesLogin',
	'householding',
	'requestCorporateAccount',
	'verifyLimits',
	'associatedTickets',
	'groupSalesQuestionnaire',
	'membershipUpdate',
	'changePassword',
	'dualMembershipPicker',
	'selectCustomer',
	'header',
	'leftNav',
	'viewModuleOutsideAccount',
	'loyaltyCreate',
	'passRenewals',
	'ticketLookupModal',
	'loyaltySelector',
	'loyaltyConfirmation',
	'loyaltyLoginModal',
	'newAccountModal',
	'renewals',
	'dateFormField'
]);

$(document).ready(function(){

	(function(){
		
		// isolate this because we want it GC immediately
		var iso = angular.bootstrap({}, ['gts-utilities']);
		var replace = iso.get('ReplacementUtility');
		
		// add comment
		//iso.get('WebFormsService');

		$('body').show();
		$('#page').show();
		
		replace.replace.call(replace);
		angular.bootstrap(angular.element($('html')), ['gts-frontEnd']);

	})();
});


GTS.mixins = angular.module('mixins', ['inputRadio', 'select', 'textFormFieldModule', 'contactFormModule','datePickerModule','calendarModule']); 

GTS.accountButton = angular.module('accountButton', []);

GTS.accountCreate = angular.module('accountCreate', []);

GTS.accountLogon = angular.module('accountLogon', ['forgotPasswordModal']);

GTS.accountLogonForm = angular.module('accountLogonForm', []);

GTS.addOnModal = angular.module('addOnModal', []);

GTS.associatedTickets = angular.module('associatedTickets', []);



GTS.calendarModal = angular.module('CalendarModal', []);

GTS.cart = angular.module('Cart', []);

GTS.changePassword = angular.module('changePassword', []);

GTS.checkout = angular.module('checkout', []);

GTS.checkoutForm = angular.module('CheckoutForm', ['cvvHelp', 'termsAndConditionsDialog']);

GTS.confirmationPrompt = angular.module('confirmationPrompt', []);

GTS.cvvHelp = angular.module('cvvHelp', []);

GTS.dateSpecificModalApi = angular.module('dateSpecificModalApi', ['dateSpecificModal']);


GTS.dateSpecificModal = angular.module('dateSpecificModal', []);

GTS.donation = angular.module('donation', []);

GTS.dualMembershipPicker = angular.module('dualMembershipPicker', []);

GTS.error = angular.module('error', []);

GTS.eventTimeModalApi = angular.module('eventTimeModalApi', []);

GTS.eventTimeModal = angular.module('eventTimeModal', []);

GTS.feePopup = angular.module('feePopup', []);

GTS.forgotPasswordModal = angular.module('forgotPasswordModal', []);

GTS.groupSalesLogin = angular.module('groupSalesLogin', ['forgotPasswordModal']);

GTS.groupSalesQuestionnaire = angular.module('groupSalesQuestionnaire', []);

GTS.guestNamesPrompt = angular.module('guestNamesPrompt', []);

GTS.header = angular.module("header", []);

GTS.hero = angular.module('hero', []);

GTS.householding = angular.module('householding', []);

GTS.infoModal = angular.module('infoModal', []);

GTS.languageSelector = angular.module('languageSelector', []);

GTS.leftNav = angular.module('leftNav', []);

GTS.logout = angular.module('logout', []);

GTS.loyaltyConfirmation = angular.module('loyaltyConfirmation', []);

GTS.loyaltyCreate = angular.module('loyaltyCreate', []);

GTS.loyaltyLogin = angular.module('loyaltyLogin', []);

GTS.loyaltyLoginModal = angular.module('loyaltyLoginModal', []);

GTS.loyaltySelector = angular.module('loyaltySelector', []);

GTS.membershipInit = angular.module('membershipInit', []);

GTS.membershipJointAddOn = angular.module('membershipJointAddOn', ['addOnModal']);

GTS.membershipJointAdult = angular.module('membershipJointAdult', []);

GTS.membershipJointChild = angular.module('membershipJointChild', []);

GTS.membershipJointMemberModal = angular.module('membershipJointMemberModal', []);

GTS.membershipPrimary = angular.module('membershipPrimary', ['ngFileUpload']);

GTS.membershipUpdate = angular.module('membershipUpdate', []);

GTS.membership = angular.module('membership', [
	'membershipInit',
	'membershipPrimary',
	'membershipJointAdult',
	'membershipJointMemberModal',
	'membershipJointChild',
	'membershipJointAddOn'
]);

GTS.membershipLookupResults = angular.module('membershipLookupResults', []);

GTS.membershipLookup = angular.module('membershipLookup', []);

GTS.multiTimeSelectorModal = angular.module('multiTimeSelectorModal', ['dateSpecificModal']);

GTS.multiTimeSelector = angular.module('multiTimeSelector', ['multiTimeSelectorModal']);

GTS.newAccountModal = angular.module('newAccountModal', []);

GTS.orderConfirmation = angular.module('orderConfirmation', []); 

GTS.orderError = angular.module('orderError', []); 

GTS.packagePlu = angular.module('packagePlu', []);

GTS.passConfirmation = angular.module('passConfirmationModule', ['membershipLookupResults']);

GTS.passLookup = angular.module('passLookup', ['membershipLookup']);

GTS.passRenewals = angular.module('passRenewals', []);

GTS.paymentPlanLogin = angular.module('paymentPlanLogin', []);

GTS.paymentPlansAgreement = angular.module('paymentPlansAgreement', []);

GTS.paymentPlan = angular.module('paymentPlan', []);

GTS.paymentRecordsError = angular.module('paymentRecordsError', []);

GTS.postUsageSurvey = angular.module('postUsageSurvey', []);

GTS.profileAccount = angular.module('profileAccount', []);

GTS.profileMemberships = angular.module('profileMemberships', ['membershipLookup', 'membershipLookupResults']);

GTS.profileOrderHistory = angular.module('profileOrderHistory', []);

GTS.profile = angular.module('profile', ['profileAccount', 'profileOrderHistory', 'profileMemberships']);

GTS.promotionCode = angular.module('promotionCode', []);

GTS.promotionHelpModal = angular.module('promotionHelpModal', []);

GTS.renewalCart = angular.module('renewalCart', []);

GTS.renewals = angular.module('renewals', []);

GTS.requestCorporateAccount = angular.module('requestCorporateAccount', []);

GTS.rosterInfo = angular.module('rosterInfo', []);

GTS.salesChannelNav = angular.module('salesChannelNav', []);

GTS.selectCustomer = angular.module('selectCustomer', []);

GTS.smallCart = angular.module('smallCart', []);

GTS.steps = angular.module('steps', []);

GTS.survey = angular.module('survey', []);

GTS.termsAndConditionsDialog = angular.module('termsAndConditionsDialog', []);

GTS.ticketLookup = angular.module('ticketLookup', []);

GTS.ticketLookupModal = angular.module('ticketLookupModal', []);

GTS.upsellCalendarModal = angular.module('upsellCalendarModal', []);

GTS.upsellModal = angular.module('upsellModal', ['dateUtil', 'dateSpecificModalApi', 'eventTimeModalApi']);

GTS.upsellUpgrade = angular.module('upsellUpgrade', ['upsellCalendarModal']);

GTS.upsell = angular.module('upsell', ['eventTimeModal']);

GTS.verifyLimits = angular.module('verifyLimits', ['viewEvents']);

GTS.viewEvents = angular.module('viewEvents', []);

GTS.viewItems = angular.module('viewItems', ['addOnModal', 'upsellModal','eventTimeModal','multiTimeSelector','dateSpecificModal']);

GTS.viewOrder = angular.module('viewOrder', []);

GTS.viewOrderOutsideAccount = angular.module('viewModuleOutsideAccount', []);

GTS.viewTickets = angular.module('viewTickets', []); 

GTS.mixins.birthdateFormField = angular.module('birthdateFormFieldModule', []);

GTS.mixins.calendar = angular.module('calendarModule', []);

GTS.mixins.contactForm = angular.module('contactFormModule', ['birthdateFormFieldModule']);

GTS.dateFormField = angular.module('dateFormField', []);



GTS.mixins.datePicker = angular.module('datePickerModule', []);

GTS.editablePrice = angular.module('editablePrice', []);

GTS.mixins.inputRadio = angular.module('inputRadio', []);

GTS.modal = angular.module('modal', []);

GTS.numbersOnly = angular.module('numbersOnly', []);

GTS.mixins.numericFormField = angular.module('numericFormField', []);

GTS.pager = angular.module('pager', []);

GTS.quantityControl = angular.module('quantityControl', []);

GTS.select = angular.module('select', []);

GTS.mixins.select = angular.module('select', []);

GTS.tabs = angular.module('tabs', []);

GTS.mixins.textFormField = angular.module('textFormFieldModule', []);

GTS.dateUtil = angular.module('dateUtil', []);

GTS.api = angular.module('api', []);

GTS.base = angular.module('base', []);

GTS.communicator = angular.module('communicator', []);

GTS.formatter = angular.module('formatter', []);

GTS.pageStateService = angular.module('pageStateService', []);

GTS.responder = angular.module('responder', []);

GTS.storage = angular.module('storage', []);

GTS.util = angular.module('gts-utilities', []);

GTS.webForms = angular.module('webForms', []);

GTS.webSettings = angular.module('webSettings', []);

GTS.dateUtil.factory('calendarModel', [function(){
	
	var date = function(){
		return {
			disabled : true,
			date : null,
			past : true,
			available : false
		};
	};
	
	var model = [
		[ date(), date(), date(), date(), date(), date(), date()],
		[ date(), date(), date(), date(), date(), date(), date()],
		[ date(), date(), date(), date(), date(), date(), date()],
		[ date(), date(), date(), date(), date(), date(), date()],
		[ date(), date(), date(), date(), date(), date(), date()],
		[ date(), date(), date(), date(), date(), date(), date()]
	];
	
	return model;
	
}]);

GTS.dateUtil.factory('dateUtilService', ['classify','calendarModel', 'webSettingsService', function(classify, calendarModel, webSettingsService){
	
	var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
		MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'],
		DAYS_IN_MONTHS = [31,28,31,30,31,30,31,31,30,31,30,31];
	
	var DateUtilService = classify({
		
		_constructor : function(){
			webSettingsService.getSettings().then(angular.bind(this, function(settings){
				this.settings = settings;
				
				this.getYears();
			}));
			
			this.setLocalMonths();
		},
		
		setLocalMonths : function(){
			
			var monthNamesNode = $('[data-monthNames]');
			if(monthNamesNode.length){
				var monthNames = monthNamesNode.attr('data-monthNames').split(',');
				angular.forEach(MONTHS, function(_month, index){
					if(monthNames[index]){
						MONTHS[index] = monthNames[index];
					}
				});
			}
		},

		getCurrentDate: function(){
			return this.getDateObject();
		},
		
		getNextPrevMonth : function(dir, _month){
			var current = _month || this.getCurrentDate(),
				month = current.month,
				year = current.year;
				
			month = dir ? month + 1 : month - 1;
			
			if(month < 0){
				month = 11;
				year = year - 1;
			}

			if(month > 11){
				month = 0;
				year = year + 1;
			}
			
			current.year = year;
			current.month = month;
			
			return current;
		},
		
		getEndDate: function(){
			var monthsOut = this.settings.ShoppingCheckout.EventMonthQueryMax;
		
			var currentDate = new Date(), 
				dateObject = {
					year: currentDate.getUTCFullYear(),
					month: currentDate.getUTCMonth() - 1 + (monthsOut),
					date: 31
				};
		
			if (dateObject.month >= 12){
				dateObject.month -= 12;
				dateObject.date = DAYS_IN_MONTHS[dateObject.month];
				dateObject.year++;
			}

			return this.format(dateObject);
		},
			
		format: function(_date){
			var year = _date.year,
				month = ("0"+(_date.month + 1)).slice(-2),
				date = ("0"+_date.date).slice(-2);
			
			return [year, month, date].join('-');
		},
		
		getMonthName : function(monthIndex){
			return MONTHS[monthIndex];
		},
		
		getUnmarkedCalendar : function(dateObject){
			var cal = [];
			angular.copy(calendarModel, cal);
			
			var	firstObject = {
					year : dateObject.year,
					month: dateObject.month,
					date : 1,
				};
				
			var	startDay = this.getStartDay(firstObject), // index
				lastDate = this.getMonthNumDays(dateObject.month, dateObject.year);
			
			var block = 0, // current calendar block
				date = 1, // current date
				nextDate = 1,
				hasDate = false;

			angular.forEach(cal, function(row, index){

				hasDate = false;
				angular.forEach(row, function(day){
					day.month = dateObject.month;
					day.year = dateObject.year;
					if(block < startDay){
						day.pre = true;
					}else if(block >= startDay && date <= lastDate){
						hasDate = true;
						day.disabled = false;
						day.date = date;
						day.past = this.inPast({
							year : dateObject.year,
							month : dateObject.month,
							date : date,
						});
						date++;
					}else if(block >= lastDate){
						day.post = true;
						day.date = nextDate;
						day.month++;
						
						if (day.month === 12){
							day.month = 1;
						}						

						nextDate++;
					}
					block++;
				}, this);

				if(index === 5 && !hasDate){
					cal.splice(5,1);
				}
			}, this);
		
			var prevMonthLast = this.getMonthNumDays(dateObject.month - 1);
			for(var i = cal.length; i--;){
				var row = cal[i];
				for(var j = row.length; j--;){
					var day = row[j];
					if(day.pre){
						day.date = prevMonthLast;
						prevMonthLast = prevMonthLast - 1;
					}
				}
			}
			return cal;
		},
		
		inPast : function(dateObject){

			var currentDate = new Date();
				currentDate.setHours(0);
				currentDate.setMinutes(0);
				currentDate.setSeconds(0);
				currentDate.setMilliseconds(0);
		
			var targetDate = new Date(dateObject.year, dateObject.month, dateObject.date);
				
			return (targetDate < currentDate);
		},
		
		getStartDay : function(targetDateObject){
			return this.reverseDateObject(targetDateObject).getDay();
		},
		
		reverseDateObject : function(dateObject){
			return new Date(dateObject.year, dateObject.month, dateObject.date);
		},
		
		getDateObject : function(dateString){
			var date = dateString ? new Date(dateString) : new Date(),
				dateObject = {
					year: date.getUTCFullYear(),
					month: date.getUTCMonth(), // index
					date: date.getUTCDate()
				};

			return dateObject;
		},
		
		getMonthNumDays : function(month, year){
			if(month < 0){
				month = 11;
				year = year - 1;
			}

			if(month > 11){
				month = 0;
				year = year + 1;
			}

			if(month === 1 && this.isLeapYear(year)){ // feb
	 			return DAYS_IN_MONTHS[month] + 1;
			}
			return DAYS_IN_MONTHS[month];
		},
		
		isLeapYear : function(year){
			return new Date(year, 1, 29).getDate() === 29;
		},
		
		getYears : function(){
			var currentDate = this.getCurrentDate(),
				endDate = this.getDateObject(this.getEndDate()),
				year = currentDate.year,
				years = [];	
			while(year <= endDate.year){
				years.push(year);
				year++;
			}
			return years;
		},
		
		isPastEndDate : function(target, flag){
			var stopDate = this.getDateObject(this.getEndDate()),
				tooFar = false;
				
			if(target.year > stopDate.year){
				tooFar = true;
			}
			else if(target.year === stopDate.year && target.month > stopDate.month){
				tooFar = true;
			}
			
			return tooFar;
		}
		
	});
	
	return new DateUtilService();

}]);

GTS.api.factory('apiService', ['$http', '$q','classify', 'pageStateService', 'ApiResponseModel','loading',function($http, $q, classify, pageStateService, ApiResponseModel,loading){
	
	var apiResponseModel = {
		success : false,
		data : null
	};
	var prefix = pageStateService.getRoot()+'api/';
	
	var get = function(url, params){
		loading.start();
		var call = $q.defer();
		$http({
			url : prefix + url.join('/'),
			method : 'GET',
			params : params
		}).then(function(){
			loading.stop();
			call.resolve.apply(call, arguments);
		}, function(){
			loading.stop();
			call.reject.apply(call, arguments);
		});
		return call.promise;
	};

	var post = function(url, params, data){
		loading.start();
		var call = $q.defer();
		$http({
			url : prefix + url.join('/'),
			method : 'POST',
			params: params,
			data : data
		}).then(function(){
			loading.stop();
			call.resolve.apply(call, arguments);
		}, function(){
			loading.stop();
			call.reject.apply(call, arguments);
		});
		return call.promise;
	};
	
	var put = function(url, params, data){
		loading.start();
		var call = $q.defer();
		$http({
			url : prefix + url.join('/'),
			method : 'PUT',
			params: params,
			data : data
		}).then(function(){
			loading.stop();
			call.resolve.apply(call, arguments);
		}, function(){
			loading.stop();
			call.reject.apply(call, arguments);
		});
		return call.promise;
	};

    var apiDelete = function(url, params, data) {
        loading.start();
        var call = $q.defer();
        $http({
            url: prefix + url.join('/'),
            method: 'DELETE',
            params: params,
            data: data
        }).then(function() {
            loading.stop();
            call.resolve.apply(call, arguments);
        }, function() {
            loading.stop();
            call.reject.apply(call, arguments);
        });
        return call.promise;
    };
	
	var wrapRequest = function(method){
		return function(){
			var request = $q.defer();
			method(request);
			return request.promise;		
		};
	};

	var API = classify({
		
		getCheckoutConfig : function(countryCode){
			return get(['checkoutconfig'], {countryCode : countryCode});		
		},
		
		getCheckoutPage : function(){
			return get(['checkoutPage']);
		},
		
		checkout : function(data){
			return post(['checkoutpage'], {}, data);		
		},
		
		getCart : function(){
			return get(['cart']);
		},
		
		getStates : function(countryCode){
			return get(['states'], {countryCode : countryCode});
		},
		
		getCountries : function(countryCode){
			return get(['countries']);
		},
		
		setShipping : function(data){
			return post(['shipping'], {}, data);
		},
		
		setLoyaltyAccount : function(accountNumber){
			return get(['loyalty','GetByAccountNumber'], {loyaltyAccountNumber : accountNumber});
        },
        
        getLogon : function(){
            return get(['logon']);
        },
        
        postLogon : function(data){
            return post(['logon'], {}, data);
        },
		
		getAccount : wrapRequest(function(request){
			get(['account']).then(function(response){
				request.resolve(angular.extend({}, apiResponseModel, {
					success : true,
					data : response.data
				}));
			}, function(response){
				request.resolve(angular.extend({}, apiResponseModel, {
					success : false,
					data : response.data
				}));
			});
		}),
		
		getAccountCreateConfig : function(){
			return get(['Account', 'GetCreateAccountConfig'], { param : '1' });
		},
		
		postAccountCreate : function(data){
			return post(['Account'], {}, data);
		},
		
		putRequestPassword : function(params){
			return put(['Logon', 'PutRequestPassword'], params, { } );
		},
		
		getProduct : function(plu){
			return get(['product'], { plu : plu });
		},
		
		getOrderProducts : function(orderId){
			return get(['OrderProducts'], {id : orderId}, { } );	
		},
		
		getPassKind : function(id){
			
			var params = {
				Id : id
			};
			return get(['PassKind'], params);
		},
		
		getPass : function(passId){
			return get(['Pass', passId]);
		},
		
		getPassByVisualId : function(visualId){
			return get(['Pass'], {visualId : visualId});
		},
		
		// the following API calls are temporary. They should be combined into API calls similar to other places in the app, but they're here for now
		getTitles : function(){
			return get(['NameTitles']);
		},
		
		getSuffixes : function() {
		    return get(['NameSuffixes']);
		},
		
		getMultipleChoices : function(){
			return get(['MultipleChoices']);
		},
		
		getGeneralConfig : function(){
			return get(['GeneralConfig']);
		},
		
		getRelationshipTypes : function(){
			return get(['RelationshipTypes']);
		},
		
		savePass : function(pass){
			return post(['pass'], {}, pass);
		},
		
		updatePass : function(pass){
			return put(['pass'], {}, pass);
		},
		
		updateNonOrderPass : function(pass){
			return put(['pass','updateNonOrderPass'], {}, pass);
		},
		
		getGuestNames : function(){
			return get(['GuestNames']);
		},
		
		putGuestNames : function(guestNames){
			return put(['GuestNames'], {}, guestNames);
		},
		
		ticketLookupOptions: function () {
			var request = $q.defer();

			get(['TicketInfo'], { ignore: 0 }).then(function(response) {
				request.resolve(response.data);
			});

			return request.promise;
		},

		ticketLookup : function(params){
			
			var request = $q.defer();

			var qs = {};
			
			if(params.visualId) qs.VisualId = params.visualId;
			if(params.dob) qs.DOB = params.dob;
			if(params.lastName) qs.LastName = params.lastName;
			if(params.passAccount) qs.PassAccount = params.passAccount;

			get(['TicketInfo'], qs).then(function(response){
				request.resolve(new ApiResponseModel({
					success : true,
					data : response.data
				}));
			}, function(response){
				request.resolve(new ApiResponseModel({
					success : false,
					data : response.data
				}));
			});

			return request.promise;
		},
		
		getCategories : function(categoryGroupId){
			return get(['CategoriesNavigation'], {sc:categoryGroupId}, {});
		},
		
		setRenewalCart : function(data){
			var request = $q.defer();
			post(['RenewalCart'], {}, data).then(function(response){
				request.resolve(new ApiResponseModel({
					success : true,
					data : response.data
				}));
			}, function(response){
				request.resolve(new ApiResponseModel({
					success : false,
					data : response.data
				}));
			});
			return request.promise;
		},

        getLanguageData : function() {
            return get(["Language", "GetLanguageData"], { ignore: "0" }, {});
        },

		putLanguage : function(languageId) {
			return put(["LanguageState"], {}, { id: languageId });
		},

		getSurvey : function(surveyId, orderId) {
			return get(["survey"], { surveyId: surveyId, orderId: orderId });
		},

		postSurvey : function(survey) {
			return post(["survey"], {}, survey);
		},
		
		getMemberAddOns : function(passKind){
			var request = $q.defer();
			get(['MemberAddons'], {passKindId : passKind}).then(function(response){
				request.resolve({
					success :true,
					data : response.data
				});
			}, function(response){
				request.resolve({
					success :false,
					data : response.data
				});
			});
			return request.promise;
		},
		
		addToCart : function(data){
			return post(['Cart'], {}, data);
		},
		
		updateCart : function(data){
			return put(['Cart'], {}, data);
		},

		getAppSettings : function() {
			return get(["webSettings"], {});
		},
		
		getUpsell : function(orderLineIdArray){
			return get(["upsell"], {orderLineIds:orderLineIdArray.join(',')});
		},
		
		getUpsellReplacements : function(orderLineIdArray){
			return get(["upsell","Replacements"], {orderLineIds:orderLineIdArray.join(',')});
		},
		
		makeReplacement : function(orderLineId, item){
			
			return post(["upsell","Replacements"], { orderLineId : orderLineId }, item);
		},
		
		declineReplacement : function(orderLineId){
			return post(["upsell", "Decline"], { orderLineId : orderLineId });
		},
		
		deletePassPhoto : function(pictureId) {
			return apiDelete(["pass"], { id: pictureId }, {});
		},

		getDonationOptions : function() {
			return get(["donation"], {});
		},

		addDonation : function(donation) {
			return post(["donation"], {}, donation);
		},

		removeDonation: function () {
			return apiDelete(["donation"], {});
		},
		
		getEventDates: function(params) {
			return get(['eventDates'], params);
		},
		
		getEvents: function(params){
			return get(['events'], params);
		},
		
		setEventTime : function(eventData){
			return post(['eventSelection'], {}, eventData);
		},
		
		setDateSpecificDay: function(formattedDay, salesChannelDetailId) {
			var data = {
				DateTime: formattedDay,
				OwnerId: salesChannelDetailId
			};
			
			return post(['DateSpecificSelection'], {}, data);	
		},
		
		getBlockoutDates: function(plu){
			return get(['blockoutdates'], {plu : plu});
		},
		
		getDualMemberships : function(){
			return get(['dualRelationship']);
		},
		
		setDualMemberships : function(relationships){
			return post(['dualRelationship'], {}, relationships);
		}
	});

	return new API();

}]);

GTS.api.factory('ApiResponseModel', ['classify', function(classify){
	
	var ApiResponseModel = classify({
		
		// typical properties
		success : false,
		data : null,
		error : null,
		
		_constructor : function(obj){
			angular.extend(this, obj);
		}
		
	});
	
	return ApiResponseModel;
	
}]);

GTS.base.factory('BaseViewModel', ['classify','pageStateService', function(classify, pageStateService){
	
	var BaseViewModel = classify({
		root : pageStateService.getRoot(),
		_constructor : function(obj){
			angular.extend(this, obj);
		}
	});
	
	return BaseViewModel;

}]);

GTS.base.factory('BaseController', ['classify','CommunicatorService', function(classify,CommunicatorService ){

	/*

	Leave this comments here for example

	// state stores values that are ONLY related to the users interactions, but aren't based on data
	var state = {
		isWhatever : false,
		clicked : false
	};

	// viewModel stores specific date related values
	var viewModel = {
		items : []
	};

	*/

	var BaseController = classify({

		state : {},

		viewModel : {},

		_constructor : function(scope, flag){
			this.scope = scope;
			this.setDefaults();
			this.register();
			this.bind(flag);

			if(this.postConstruct) this.postConstruct();
		},

		setDefaults : function(){
			this.scope.state = this.state;
			this.scope.viewModel = this.viewModel;
		},

		registrations : ['someScopeEvent'],

		listeners : {
			selectedDate : angular.bind(this, this.selectEvent)
		},

		register : function(){
			angular.forEach(this.registrations, angular.bind(this, function(reg, index){
				this.scope[reg] = angular.bind(this, this[reg]);
			}));
		},

		bind : function(flag){
			angular.forEach(this.listeners, angular.bind(this, function(func, name){		
				CommunicatorService.receive(name, angular.bind(this, this[func]));
			}));
		}

	});

	return BaseController;
}]);

GTS.base.factory('BaseFormField', ['classify', function(classify ){

	
	var BaseFormField = classify({

		value : '',
		displayName : '',
		error : false,
		visible : true,
		required : true,
		options : null,
		name : null,
		id : null,
		
		selectValue : '',	//  Key property for the select options
		selectName : '',	//  Display property for the select options
		
		_constructor : function(obj){
			angular.extend(this, obj);
		},
		
		validate : function(flag, field){
			this.error = this.required && this.visible && !this.value;
			return !this.error;
		},
		
		//  Fired by a text input change
		change : function(){
			this.error = false;
			if(this.options){ this.selectChange(); }
			if(this.onChange){ this.onChange(); }
		},
		
		//  Fired by a select box change.  Options, along with key and name, are used to lookup the displayName for the selected value.
		selectChange : function(){
			this.error= false;
			this.displayName = "";
						
			angular.forEach(this.options, function(option){
				if(this.value == option[this.selectValue]){
					this.displayName = option[this.selectName];
				}
			}, this);

			if(this.onChange){ this.onChange(); }
		}		
	});

	return BaseFormField;
}]);

GTS.base.factory('BasePostBack', ['classify', 'WebFormsService', '$q','loading',function(classify, WebFormsService, $q, loading){
	
	var BasePostBack = classify({

		request : function(updatePage){
			var request = $q.defer();
			loading.start();
			$.ajax({
				url : '',
				type : 'POST',
				data : WebFormsService.getModel()
			}).then(angular.bind(this, function(response){
				var html = this.processResponse(response, updatePage);
				loading.stop();
				request.resolve(html);
			}), function(){
				request.resolve(null);
			});
			
			return request.promise;
		},

		processResponse : function(response, updatePage){
			
			if(response.length){
				// update panel
				var html = $.parseHTML(response);
				WebFormsService.processUpdatePanel(html, updatePage);
				return {
					success : true,
					data : html
				};
			}else{
				return {
					success : false
				};
			}
		},
		
		onProcessDone : function(){
			
		}
	});

	return BasePostBack;

}]);

GTS.base.factory('baseViewModel', ['pageStateService', function(pageStateService){
	
	return {
		root : pageStateService.getRoot()
	};

}]);

GTS.base.factory('BaseForm', ['classify','BaseViewModel','BaseFormField', function(classify,BaseViewModel,BaseFormField){

	var BaseForm = classify(BaseViewModel, {	
		//  Validate the form
	    validate: function () {
			var isValid = true;
			for(var prop in this){
				if(this[prop] instanceof BaseFormField){
					var propValid = this[prop].validate();
					isValid = isValid && propValid;
				}	
			}
			return isValid;
		}
	});
	
	return BaseForm;
}]);

GTS.base.factory('BaseResponderController', [
	
	'ResponderService','BaseController','classify','CommunicatorService','device',function(
	 ResponderService,  BaseController,  classify,  CommunicatorService,  device){
	
	var BaseResponderController = classify(BaseController, {
		
		bind : function(flag){
			angular.forEach(this.listeners, angular.bind(this, function(func, name){
				CommunicatorService.receive(name, angular.bind(this, this[func]));
			}));
			
			this.initDevice();
		
			ResponderService.bind('a', angular.bind(this, this.changeDevice));
			ResponderService.bind('b', angular.bind(this, this.changeDevice));
			ResponderService.bind('c', angular.bind(this, this.changeDevice));
		},
		
		initDevice : function(){
			this.scope.device = device;
			angular.forEach(device, function(val, key){
				device[key] = ResponderService.getBreakerStatus(key);
			});
		},
		
		changeDevice : function(bool, breaker){
			device[breaker] = bool;
			this.scope.$apply();
		},
		
	});
	
	return BaseResponderController;
	
}]);

GTS.communicator.factory('CommunicatorService', ['classify',function(classify){

	/**
	* @class Communicator
	* @classdesc Communicator sends/receives events
	*/
	var CommunicatorService = classify({

		/**
		* @memberof Communicator
		* @function createEventArray
		* @param {string} key - the event
		* @desc if there isnt an event queue yet, create it
		*/
		createEventArray : function(key){
			if(!this['pass'+key]){
				this['pass'+key] = [];
			}
		},

		/**
		* @memberof Communicator
		* @function send
		* @param {string} key - the event to listen for
		* @param {*} value - the new value
		* @desc run each function in the key's event queue
		*/
		send : function(key, value){
			angular.forEach(this['pass'+key], function(func){
				func(value);
			});
		},

		/**
		* @memberof Communicator
		* @function receive
		* @param {string} key - the event to listen for
		* @param {function} callack - the callback function
		* @desc call receive, passing in a key, and a callback that MUST be bound to the proper context.
		*/
		receive : function(key, callback){
			if(typeof key === 'object'){		
				for(var objKey in key){
					this.createEventArray(objKey);
					this['pass'+objKey].push(key[objKey]);
				}
			}else{
				this.createEventArray(key);
				this['pass'+key].push(callback);
			}
		}
	});

	return new CommunicatorService();
}]);

GTS.formatter.factory('formatterService', ['classify', function(classify){
	
	var ccFormat = 'xxxx-xxxx-xxxx-{{lastFour}}';
	
	var FormatterService = classify({
			
		maskCreditCard : function(cc){
			var lastFour = cc.substring(12, 16);
			return ccFormat.replace('{{lastFour}}', lastFour);
		},
		
		formatPhoneNumber : function(){
		
		}
		
	});
	
	return new FormatterService();
	
}]);

GTS.pageStateService.factory('pageStateService', ['classify','storageService', function(classify, storageService){

	var qss = window.location.search.substring(1),
		qs = {};

	angular.forEach(qss.split('&'), function(s){
		var i = s.split('=');
		qs[i[0].toLowerCase()] = decodeURIComponent(i[1]);
	});

	var root = '';

	var urls = { 
		viewItems : 'shop/viewitems.aspx',
		cart : 'shop/viewcart.aspx',
		landing : 'content.aspx?kind=LandingPage',
		checkout : 'CheckoutPage',
		orderConfirmation : 'checkout/orderConfirmation.aspx',
		accountLogon : 'accountProfile/logon',
        accountProfile : 'accountProfile',
		accountMemberships : 'accountProfile/memberships',
		accountOrderHistory : 'Account/orderhistory.aspx',
		viewOrder : 'Account/vieworder.aspx',
		membership : 'membershipsetup',
		viewTickets : 'Order/ViewTickets',
		checkoutRouter : 'checkoutRouter',
		nextMembership : 'checkoutRouter/nextMembership',
		passLookup : 'shop/PassLookup.aspx',
		landingPage : 'landingPage', 
		renewal : 'Shopping/Renew/',
		passConfirmation: 'shop/passconfirmation',
		paymentPost: 'Checkout/PaymentPOST.ashx',
		logout: 'account/logout.aspx',
		error: 'error.aspx',
		survey: 'checkout/survey.aspx',
		rosterInfo: 'shop/rosterinfo.aspx',
		paymentPlanAgreement: 'shop/paymentPlanAgreement.aspx',
		postUsageSurvey: 'survey',
		ticketLookup: 'account/ticketLookup.aspx',
		promotion: 'shop/promotionCode.aspx',
		orderError: 'shop/orderError.aspx',
		addOns : 'Checkout/AddOns.aspx',
		upgrades : 'Checkout/Upgrades.aspx',
		viewEvents: 'shop/viewEvents.aspx',
		paymentPlansLogin: 'account/PaymentPlansLogin.aspx',
		groupSalesLogin: 'account/GroupSalesLogin.aspx',
		requestCorporateAccount : 'Account/RequestCorporateAccount.aspx',
		requestCorporateAccountConfirmation : 'Account/RequestCorporateAccountConfirmation.aspx',
		householding : 'primaryPass',
		groupSalesVerifyLimits : 'Shop/GroupSalesVerifyLimits.aspx',
		associatedTickets : 'Shop/AssociatedTickets.aspx',
		groupSalesQuestionnaire : 'Shop/GroupSalesQuestionnaire.aspx',
		updatePass : 'UpdatePass/',
		changePassword : 'Account/ChangePassword.aspx',
		selectCustomer : 'Account/SelectCustomer.aspx',
		loyaltyEnroll : 'LoyaltyPrograms/LoyaltyEnrollment.aspx',
		paymentRecordsError: 'PaymentRecordsError.aspx',
		order: 'Order?x=',
		viewPassRenewals : 'shop/ViewPassRenewals.aspx',
		loyaltyConfirmation : 'LoyaltyPrograms/LoyaltyConfirmation.aspx',
		loyaltySelector : 'LoyaltyPrograms/LoyaltySelector.aspx',
		passRenewals: 'shop/PassRenewal.aspx'
	};
	
	var PageStateModel = {
		root : '',
		page : ''
	};

	var boundMethods = {};

	var PageStateService = classify({

		_constructor : function(){
			this.determinePage();
			this.setCategoryGroups();
		},

		determinePage : function(){
		    var url = window.location.href.toLowerCase();
		    var iterate = true;

			angular.forEach(urls, function(string, key){
				if (iterate) {
				    string = string.toLowerCase();
				    var pos = url.indexOf(string);
				    if(pos > -1){
					    PageStateModel.root = url.substring(0, pos);
					    PageStateModel.page = key;
					    iterate = false;
				    }
				}
			});
		},

		setCategoryGroups : function(queryString){
			if(PageStateModel.page === 'viewItems' || queryString || (qs.cg && qs.c)){	
				if(qs.cg && qs.c){
					PageStateModel.categoryGroup = qs.cg;
					PageStateModel.category = qs.c;
					storageService.set('page', PageStateModel);	
				}
			}else{
				var page = storageService.get('page');
				if(page){
					PageStateModel = angular.extend(storageService.get('page'), PageStateModel);
				}
			}
		},

		getPageModel : function(){
			return PageStateModel;
		},

		getCurrentPage : function(){
			return PageStateModel.page;
		},

		getRoot : function(){
			return PageStateModel.root;
		},
		
		getRootPage : function(key){
			var url = PageStateModel.root+urls[key];
			return url;
		},

		go : function(key, qsObj){
			var url = PageStateModel.root + urls[key];

			//  Do not route view items with cg and c values.  (Those may be stale in the front end code)
			//  The server will route to the correct values.

			if(qsObj) {
				url += '?';
				for(var prop in qsObj){
					url += prop+"="+qsObj[prop];
				}
			}
			
			window.location = url;
		},
		
		getQueryString : function(){
			return qs;	
		},

		getEventDate : function(){
			return PageStateModel.eventDate;
		},

		setEventDate : function(date){
			PageStateModel.eventDate = date;
			this.trigger('eventDate', date);
			return this;
		},

		on : function(key, method){
			if(key && method && typeof method === 'function'){

				if(!boundMethods[key]){
					boundMethods[key] = [];
				}
				boundMethods[key].push(method);
			}
		},

		trigger : function(key, val){
			if(boundMethods[key]){
				angular.forEach(boundMethods[key], function(method){
					if(method){
						method(val);
					}
				});
			}
		}

	});

	return new PageStateService();

}]);

GTS.responder.factory('device', function(){
	return {
		a : true,
		b : false,
		c : false
	};	
});

GTS.responder.factory('ResponderService', [
	
	// dependencies
	'classify', function(
	classify){

	// polyfill older event listeners
	var addEvent = window.addEventListener || function(event, callback){
		window['on'+event] = callback;
	};

	/**
	* @class ResponderService
	* @classdesc ResponderService takes two objects, static breakers and kinetic breakers. The objects contain functions, which need to return true or false.
	*		These functions evaluate any aspect of the browser and return whether or not the browser meets some criteria. Static breakers evaluate on load only.
	* 		Kinetic Breakers get reevaluated on browser resize. This is good for detecting browser size.
	*/
	var ResponderService = classify({

		/**
		* @memberof ResponderService
		* @function constructor
		* @param {object} staticBreakers : the static breakers
		* @param {object} kineticBreakers : the kinetic breakers
		* @desc constructor calls {@link ResponderService.setStaticBreakers|this.setStaticBreakers} and {@link ResponderService.setKineticBreakers|this.setKineticBreakers}.
		*/
		_constructor : function(staticBreakers, kineticBreakers){
			this.setStaticBreakers(staticBreakers);
			this.setKineticBreakers(kineticBreakers);
		},

		/**
		* @memberof ResponderService
		* @access private
		* @name binds
		* @type {object}
		* @desc binds is used to store kinetic breaker functions that will be triggered.
		*/
		binds : {},

		/**
		* @memberof ResponderService
		* @access private
		* @function setStaticBreakers
		*/
		setStaticBreakers : function(breakers){
			var b = this.staticBreakers = {};
			for(var breaker in breakers){
				if(typeof breakers[breaker] === 'function' || typeof breakers[breaker] === 'boolean'){
					b[breaker] = breakers[breaker];
				}
			}
		},

		/**
		* @memberof ResponderService
		* @access private
		* @function getStaticBreaker
		*/
		getStaticBreaker : function(breaker){
			if(breaker){
				if(this.staticBreakers[breaker] && typeof this.staticBreakers[breaker] === 'function'){
					return this.staticBreakers[breaker]();
				}
			}else{
				return this.staticBreakers;
			}
		},

		/**
		* @memberof ResponderService
		* @access private
		* @function setKineticBreakers
		*/
		setKineticBreakers : function(breakers){
			var k = this.k = {},
				kb = this.kineticBreakers = {},
				l = false;

			for(var breaker in breakers){
				if(typeof breakers[breaker] === 'function' || typeof breakers[breaker] === 'boolean'){
					l = true;
					kb[breaker] = breakers[breaker];
					k[breaker] = breakers[breaker]();
				}
			}
			if(l){
				this.listen();
			}
		},

		/**
		* @memberof ResponderService
		* @access private
		* @function listen
		*/
		listen : function(){

			var t,
				calculcateBreakers = (function(context){
				return function(){
					context.notify.call(context);
				};
			})(this);

			var change = function(){
				clearTimeout(t);
				t = setTimeout(function(){
					calculcateBreakers();
				}, 100);
			};

			addEvent('resize', change);
		},

		/**
		* @memberof ResponderService
		* @access private
		* @function notify
		*/
		notify : function(){
			var k = this.k,
				kb = this.kineticBreakers,
				on = (function(c){ 
					return function(breaker, bool){
						c.on.call(c, breaker, bool);
					}; 
				})(this);

			for(var breaker in kb){
				var i = kb[breaker]();
				if(i !== k[breaker]){
					k[breaker] = i;
					on(breaker, i);
				}
			}
		},

		/**
		* @memberof ResponderService
		* @access private
		* @function on
		*/
		on : function(breaker, bool){
			var binds = this.binds[breaker];
			if(binds && binds.length){
				for(var b = 0; b < binds.length; b++){
					if(binds[b] && typeof binds[b] === 'function'){
						binds[b](bool, breaker);
					}
				}
			}
		},

		/**
		* @memberof ResponderService
		* @access public
		* @function bind
		*/
		bind : function(breakerKey, callback){
			if(this.binds[breakerKey]){
				this.binds[breakerKey].push(callback);
			}else{
				this.binds[breakerKey] = [callback];
			}
		},

		/**
		* @memberof ResponderService
		* @access public
		* @function getBreakerStatus
		*/
		getBreakerStatus : function(prop){
			var f = this.staticBreakers[prop] || this.kineticBreakers[prop];
			return f ? f() : false;
		},

	});

	// static breakers
	var s= {
		// degraded experience - right now just check for SVG support
		modernBrowser : function(){
			return (!! document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg',"svg").createSVGRect);
		}
	},

	// dynamic breakers 	
	k = {
		// define as single column if the container is under 600 px
		a : function(){
			return $(window).innerWidth() > 900;
		},

		b : function(){
			var w = $(window).innerWidth();			
			return w <= 900 && w > 600;
		},

		c : function() {
		    return $(window).innerWidth() <= 600;
		}
	};

	return new ResponderService(s, k);
}]);


GTS.storage.factory('storageService', ['classify', function(classify){

	var ls = true;
	var Storage = classify({
			
		_constructor : function(){
			this.supportsLS();
		},

		supportsLS : function(){
			try{
				localStorage.setItem('ls',true);
				localStorage.removeItem('ls');
				ls = true;
			}catch(e){
				ls = false;
			}
		},

		set : function(key, value){
			var val = JSON.stringify(value);
			if(ls){
				this.setLocalStorage(key, val);
			}else{
				this.setCookie();
			}
		},

		get : function(key){
			var val;
			if(ls){
				val = this.getLocalStorage(key);
			}else{
				val = this.getCookie(key);
			}

			if(val){
				return JSON.parse(val);
			}else{
				return null;
			}
		},

		setLocalStorage : function(key, value){
			localStorage.setItem(key, value);
		},

		getLocalStorage : function(key){
			return localStorage.getItem(key);
		},

		setCookie : function(){
			alert('need to set cookie');
		},

		getCookie : function(){
			alert('need to get cookie');
			return null;
		}

	});

	return new Storage();

}]);

GTS.util.factory('classify', function(){

	var secret = 'xT3nD';

	return function(){
		
		var _base = null;
	
		var addMethods = function(src, target){
			angular.forEach(src, function(method, methodName){
				if(method && typeof method === 'function'){
					target.prototype[methodName] = (function() {
					    return function() {
					        var res = method.apply(this, arguments);
					        if (this._post && methodName !== '_post') {
					            this._post.apply(this);
					        }
					        return res;
					    };
					})();
				}else{
					target.prototype[methodName] = method;
				}
			});
		};

		var classes = arguments,
			ClassObject = function(){
				if(this._constructor && typeof this._constructor === 'function' && arguments[0] !== secret){
					this._constructor.apply(this, arguments);
				}
			},
			last = classes[classes.length - 1];

		if(angular.isArray(last)){
			var res = last[last.length - 1];
			angular.forEach(last, function(clss){
				if(typeof clss === 'function'){
					angular.extend(res, clss.prototype);
				}else{
					angular.extend(res, clss);
				}
			});
			last = res;
		}

		if(classes.length > 1){
			_base = classes[0];
			ClassObject.prototype = new classes[0](secret);
			
			ClassObject.prototype._super = function(name){
			};
		}

		addMethods(last, ClassObject);

		return ClassObject;
	};
});


GTS.util.factory('Debounce', ['classify', '$timeout', function(classify, $timeout){

	var timer = {},
		time = 0;

	var Debounce = classify({
		_constructor : function(t){
			time = t;
		},
		wait : function(fn){
			clearTimeout(timer);
			$timeout(fn, time);
		}
	});

	return Debounce;

}]);

GTS.util.factory('DomDataParser', ['classify', function(classify){

	var html,
		data; // gets set to a domnode

	var DomDataParser = classify({

		_constructor : function(content){
			html = content;
			this.buildData();
		},

		buildData : function(){
			data = this.recurse({}, html);
		},

		getData : function(){
			return data;
		},

		recurse : function(data, el){
			
			var key = this.checkForObjectKey(data, el),
				target = key ? {} : data;

			this.grabDataFromAttrs(target, el);

			if(key){
				data[key].push(target);
				target = data[key][data[key].length - 1];
			}

			angular.forEach(angular.element(el).children(), angular.bind(this, function(child, childIndex){
				this.recurse(target, child);
			}));

			return data;

		},

		tableForce : function(element){
			$(element).find('[data-table-shift]').each(function(){
				var parent = $(this).parent('td, th').parent('tr'),
					key = $(this).attr('data-table-shift');
				if(parent.length === 1){
					parent.attr('data-object-key', key);
					$(this).removeAttr('data-table-shift');
				}
			});
		},

		checkForObjectKey : function(structure, element){

			this.tableForce(element);
			var name = false;
			angular.forEach(element.attributes, function(attr, index){

				if(attr.name === 'data-object-key'){
					name = attr.value.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
					if(!angular.isArray(structure[name])){
						structure[name] = [];
					}
					return false;
				}
			});
			return name;
		},

		grabDataFromAttrs : function(structure, el){
			angular.forEach(el.attributes, function(attr){
				if(attr.name.indexOf('data-') === 0 && attr.name !== 'data-object-key'){
					var string = attr.name.substring(5).replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }),
						val = attr.value.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

					// find the inner el
					if(string.indexOf('el') === 0 || string.indexOf('sel') === 0){

						var targetEl,
							node;
						var isSel = string.indexOf('sel') === 0;

						// if theres a non text child
						if(el.firstElementChild){
							structure[val+'El'] = node = {};
							targetEl = el.firstElementChild;

							if (!isSel) {
								node.text = $.trim($(targetEl).text());
							}

							angular.forEach(targetEl.attributes, function(attr, index){
								node[attr.name] = attr.value.trim();
							});
							
							var options = $(targetEl).find('option');
							if(options.length){
								node.options = [];
								angular.forEach(options, function(option){
									node.options.push({
										value : $(option).val(),
										text : $(option).text()
									});
								});
							}
							
							if(targetEl.disabled) node.disabled = true;

						// if the only child is a text node
						}else if(el.firstChild && el.firstChild.nodeType === 3){
							structure[val+'El'] = node = {};
							targetEl = el.firstChild;

							if (!isSel) {
								node.text = $.trim($(targetEl).text());
							}
						}

						if (isSel) {
							var options2 = [];
							$(el).find('option').each(function () {
								var opt = $(this);

								var optDom = {
									text: opt.text(),
									value: opt.val()
								};

								if (opt.attr("selected")) {
									structure[val + 'El'].value = optDom.value;
								}

								options2.push(optDom);
							});

							structure[val + 'El'].options = options2;
						}
					}else if(string.indexOf('text') === 0){

						structure[val] = $.trim($(el).text());

					}else if(string.indexOf('list') === 0){

						structure[val] = [];
						$.each($(el).find('li'), function(index, li){
							structure[val].push($(li).text());
						});

					}else if(string.indexOf('html') === 0){

						structure[val] = $(el).html();

					} else {
						structure[string] = attr.value.trim();
					}
				}
			});
			return false;
		}

	});

	return DomDataParser;

}]);

GTS.util.factory('loading', ['classify', function(classify){
	
	$('body').attr('status','init');
	var loads = [];
	var Loading = classify({
		
		start : function(){
			loads.push({});
			this.modifyBody();
		},
		
		stop : function(){
			if(loads.length){
				loads.splice(0,1);
				this.modifyBody();
			}
		},
		
		modifyBody : function(){
			setTimeout(function(){
				if(loads.length){
					$('body').attr('status','loading');
				}else{
					$('body').attr('status','done');
				}
			}, 0);
		}
	});
	
	return new Loading();
	
}]);

GTS.util.factory('ReplacementUtility', ['classify', 'DomDataParser', 'PaymentPlanParser', function(classify, DomDataParser, PaymentPlanParser){
	
	var modules = [];

	var ReplacementUtility = classify({

		_constructor : function(){
			this.getModules();
		},

		getModules : function(){

			modules = $('[data-replace]');

			angular.forEach(modules, angular.bind(this,function(module){

				var mod = $(module),
					parser = mod.attr('data-parser'),
					name = mod.attr('data-replace');

				if(parser){
					
					if(parser === 'PaymentPlanParser'){
						var ppp = new PaymentPlanParser(mod);
						this.createFactory(name, ppp.getData());
					}
					if(parser === 'wshtml'){
						GTS.wshtml[name] = $(mod).html();
					}

				}else{
					var ddp = new DomDataParser($(mod));
				    this.createFactory(name, ddp.getData());
				}

			}));
		},

		createFactory : function(name, data){

			GTS.dd.factory(name+'DomData', function(){
				return data;
			});
		},

		replace : function(){
			angular.forEach(modules, function(module){

				module = $(module);

				// requery
				module = $('[data-replace="'+module.attr('data-replace')+'"]');

				var moduleName = module.attr('data-replace'),
					replacement = $('[data-module="'+moduleName+'"]');

				if(module.length && replacement.length){
					var mod = replacement[0].outerHTML;
					module.after(mod);
					module.remove();
					replacement.remove();
					$('[data-module="'+moduleName+'"]').removeClass('replacement').find('.replacement').removeClass('replacement');	
				}
			});
			
			angular.forEach(GTS.wshtml, function(html, moduleName){
				
				var replacement = $('[data-module="'+moduleName+'"]');
				
				html = this.removeScripts(html);
				
				replacement.html(html);
			
			}, this);

			$('[data-module="Page"]').removeClass('replacement');
		},
		
		removeScripts : function(string){
			var div = document.createElement('div');
			div.innerHTML = string;
			var scripts = div.getElementsByTagName('script');
			var i = scripts.length;
			while (i--) {
				scripts[i].parentNode.removeChild(scripts[i]);
			}
			return div.innerHTML;
		}

	});

	return new ReplacementUtility();

}]);

GTS.webForms.factory('WebFormsModel', ['classify', function(classify){

	var WebFormsModel = classify({
		__EVENTTARGET : '',
		__EVENTARGUMENT : '',
		__VIEWSTATE : ''
	});

	return WebFormsModel;
	
}]);

GTS.webForms.factory('WebFormsService', ['classify', function(classify){

	var formEl = $('#aspnetForm'),
		submitMethods = [];

	var prefix = 'ctl00$ContentPlaceHolder$ScriptManager1';

	var eventTargetNode = document.getElementById('__EVENTTARGET'),
		eventArgumentNode = document.getElementById('__EVENTARGUMENT'),
		viewStateNode = document.getElementById('__VIEWSTATE'),
		eventValidationNode = document.getElementById('__EVENTVALIDATION'),
		viewStateGeneratorNode = document.getElementById('__VIEWSTATEGENERATOR'),
		lastFocusNode = document.getElementById('__LASTFOCUS');

	var defaultModel ={
		__EVENTTARGET : '',
		__EVENTARGUMENT : '',
		__VIEWSTATE : '',
		__EVENTVALIDATION : '',
		__ASYNCPOST : '',
		__VIEWSTATEGENERATOR : '',
		__LASTFOCUS : ''
	};

	var WebFormsModel = classify(defaultModel);

	var WebFormsService = classify({

		_constructor : function(){	

			this.clean();

			formEl.submit(angular.bind(this, this.processSubmit));
		},

		setModelFromPage : function(){
			if(eventTargetNode) this.model.__EVENTTARGET = eventTargetNode.value;
			if(eventArgumentNode) this.model.__EVENTARGUMENT = eventArgumentNode.value;
			if(viewStateNode) this.model.__VIEWSTATE = viewStateNode.value;
			if(eventValidationNode) this.model.__EVENTVALIDATION = eventValidationNode.value;
			if(viewStateGeneratorNode) this.model.__VIEWSTATEGENERATOR = viewStateGeneratorNode.value;
			if(lastFocusNode) this.model.__LASTFOCUS = lastFocusNode.value;
		},

		getModel : function(){
			return this.model;
		},

		setModel : function(changeObject){

			angular.forEach(changeObject, angular.bind(this, function(value, prop){
				this.model[prop] = value;
			}));
		},

		updatePage : function(){
			for(var prop in this.model){
				$('[name="'+prop+'"]').val(this.model[prop]);
			}
		},

		processUpdatePanel : function(htmlArray, updatePage){
			
			this.clean();

			var aspNodes = [];

			for (var i = htmlArray.length - 1; i >= 0; i--) {
				if(htmlArray[i].nodeType === 3){
					aspNodes.unshift(htmlArray[i].textContent);
				}else{
					break;
				}
			}

			aspNodes.unshift(htmlArray[0].textContent);

			var details = aspNodes.join('').split('|'),
				state = this.model;

			angular.forEach(details, function(o, i){
				if(o === '__VIEWSTATE'){
					state.__VIEWSTATE = details[i + 1];
				}
				if(o === '__EVENTVALIDATION'){
					state.__EVENTVALIDATION = details[i+1];
				}
				if(o === '__EVENTTARGET'){
					state.__EVENTTARGET = details[i+1];
				}
				if(o === '__EVENTARGUMENT'){
					state.__EVENTARGUMENT = details[i+1];
				}
			});
			
			if(updatePage){
				this.updatePage();
			}
			
		},

		onSubmit : function(controllerMethod){
			submitMethods.push(controllerMethod);
		},
		submit : function(){
			
			formEl.submit();
		},

		processSubmit : function(evt){

			var fail = false;

			angular.forEach(submitMethods, function(func){
				fail = !func(evt);
				if(fail) return false;
			});

			if(fail) return false;
		},

		clean : function(){
		
			this.model = new WebFormsModel();
			this.setModelFromPage();

		},
		
		base : function(){
			angular.forEach(this.model, function(val, prop){
				if(!defaultModel.hasOwnProperty(prop)){
					delete this.model[prop];
				}
			}, this);	
		}

	});

	return new WebFormsService();

}]);

GTS.webSettings.factory('webSettingsService', ['$q', 'apiService', 'classify', function ($q, apiService, classify) {

	var WebSettingsService = classify({

		settings: $q.defer(),

		_constructor: function() {
			this.loadSettings();
		},

		loadSettings: function() {
			apiService.getAppSettings().then(angular.bind(this, function(response) {
				this.settings.resolve(response.data);
			}));
		},

		getSettings : function() {
			return this.settings.promise;
		}

	});

	return new WebSettingsService();
}]);

GTS.accountButton.controller('accountButtonController', [
	
	'$scope','classify','profileService','BaseController','baseViewModel', 'webSettingsService',function(
	 $scope,  classify,  profileService,  BaseController,  baseViewModel,   webSettingsService){
		
	var viewModel = angular.extend(baseViewModel, {
		name : '',
	});

		var AccountButtonController = classify(BaseController, {
			viewModel: viewModel,
			listeners: {
				'accountLoaded': 'setName'
			},
			state: { isVisible: false, showUserName: false, displayLogOffLink: false },

			postConstruct: function() {
				webSettingsService.getSettings().then(angular.bind(this, this.onWebSettingsLoad));
			},

			onWebSettingsLoad: function(settings) {
				this.state.isVisible = settings.Account.AllowAccountUse;
				this.state.showUserName = settings.Account.DisplayLogInInfo;
				this.viewModel.name = settings.User.AccountUserName;
				this.state.displayLogOffLink = settings.User.AccountUserName && settings.Account.DisplayLogOffLink;
			},

			setName: function() {
				viewModel.name = profileService.getAccountName();
			}

		});
	
	return new AccountButtonController($scope);
	
}]);

GTS.accountLogon.controller('AccountCreateController',
                                ['baseViewModel', 'pageStateService', '$scope', '$sce', 'classify', 'BaseController', 'AccountCreateViewModel', 'AccountCreateService', 'CommunicatorService', 'ContactForm',
                        function (baseViewModel,   pageStateService,   $scope,   $sce,   classify,   BaseController,   AccountCreateViewModel,   AccountCreateService,   communicatorService,   ContactForm) {

        var state = { loading : false };

        var accountContact = new ContactForm();

        var AccountCreateController = classify(BaseController, [{
            
            _constructor : function(){
                BaseController.prototype._constructor.apply(this, arguments);
                
                this.scope.root = pageStateService.getRoot();
	            this.viewModel.accountContact = accountContact;
                
                AccountCreateService.getWebSettings().then(angular.bind(this, function(response){
                    if(response.data.GroupSales.IsGroupSales){
                         this.viewModel.accountContact.companyCode.visible = true;
                    }
                }));
                
				this.state.loading = true;
				AccountCreateService.loadAccountCreateConfig().then(angular.bind(this, this.onLoadAccountCreateConfig));
                
            },

            state : state,

            viewModel : AccountCreateViewModel,

            listeners : { "membershipLookupResults" : "onMembershipLookupComplete"},

            registrations : ['createAccount'],
			
            onLoadAccountCreateConfig: function (config) {
            	//  Hide non-applicable fields
            	this.viewModel.accountContact.birthday.visible = false;

            	//  Set the lists
            	this.viewModel.accountContact.title.setOptions(config.NameTitleOptions, "Id", "Name", config.NameTitle);
            	this.viewModel.accountContact.suffix.setOptions(config.NameSuffixOptions, "Id", "Name", config.NameSuffix);
            	this.viewModel.accountContact.country.setOptions(config.CountryOptions, "CountryCode", "OfficialName", config.CountryCode);
            	this.viewModel.accountContact.state.setOptions(config.StateRegionOptions, "Abbreviation", "Name", config.RegionTextValue);
				this.viewModel.accountCreateConfig = config;
				this.state.loading = false;
			},
			
            createAccount : function(){
            	if (this.viewModel.accountContact.validate()) {
					this.state.loading = true;
					AccountCreateService.saveCreateAccount(this.viewModel.accountContact).then(angular.bind(this, this.onSaveComplete));
				}
			},
			
			onSaveComplete : function(result) {
		        if (!result.success) {
			        this.state.loading = false;
			        this.viewModel.errors = result.errors;
		        } else {
		        	var queryString = pageStateService.getQueryString();

			        if (queryString && queryString.returnurl && queryString.returnurl.toLowerCase().indexOf('checkoutpage/index') > -1) {
				        //  Don't reset the loading state here.  That will keep the spinner open until the page redirects, which is desired
				        pageStateService.go('checkoutRouter');

			        } else if (queryString && queryString.returnurl && queryString.returnurl.toLowerCase().indexOf('groupsalesverifylimits') > -1) {
                        pageStateService.go('groupSalesVerifyLimits');
                    }else {
				        pageStateService.go('accountProfile');
			        }
		        }
			},

        	onMembershipLookupComplete : function(member) {

        		this.viewModel.accountContact.firstName.value = member.Pass.FirstName;
        		this.viewModel.accountContact.lastName.value = member.Pass.LastName;
        		this.viewModel.accountContact.street1.value = member.Pass.Street1;
        		this.viewModel.accountContact.street2.value = member.Pass.Street2;
        		this.viewModel.accountContact.city.value = member.Pass.City;
        		this.viewModel.accountContact.country.value = member.Pass.CountryCode;
        		this.viewModel.accountContact.state.value = member.Pass.State;
        		this.viewModel.accountContact.zipCode.value = member.Pass.Zip;
        		this.viewModel.accountContact.phone.value = member.Pass.Phone;
        		this.viewModel.accountContact.email.value = member.Pass.Email;
        		this.viewModel.accountContact.confirmEmail.value = member.Pass.Email;
		        this.viewModel.accountContact.ContactGuid = member.Pass.ContactGuid;
	        }
        }]);

        return new AccountCreateController($scope);
    }]);

GTS.accountLogon.service('AccountCreateService', [
	'classify','$http', '$q', '$sce','CommunicatorService', 'apiService', 'BaseFormField',function(
	 classify,  $http,   $q,    $sce,  CommunicatorService,  apiService,   BaseFormField){

	var AccountCreateService = classify({
        accountContact : {
			username : new BaseFormField(), 
			password : new BaseFormField(),
			confirmPassword : new BaseFormField(),
			title : new BaseFormField(),
			firstName : new BaseFormField(),
			middleName : new BaseFormField(),
			lastName : new BaseFormField(),
			suffix : new BaseFormField(),
			street1 : new BaseFormField(),
			street2 : new BaseFormField(),
			city : new BaseFormField(),
			country : new BaseFormField(),
			state : new BaseFormField(),
			zipCode : new BaseFormField(),
			phone : new BaseFormField(),
			mobile : new BaseFormField(),
			email : new BaseFormField(),
			confirmEmail : new BaseFormField(),
			companyContact : new BaseFormField()
		},
        
		getAccountContact : function(){
			return this.accountContact;
		},
		
		loadAccountCreateConfig : function(){
			var request = $q.defer();
			apiService.getAccountCreateConfig().then(angular.bind(this, this.onLoadAccountCreateConfig, request));
			return request.promise;
		},
		
		onLoadAccountCreateConfig : function(request, response){
			this.accountCreateConfig = response.data;
			
			this.accountContact.middleName.required = false;
			this.accountContact.title.required = false;
			this.accountContact.suffix.required = false;
			this.accountContact.street2.required = false;
			this.accountContact.mobile.required = false;
			
			this.accountContact.confirmEmail.visible = this.accountCreateConfig.AccountOptions.ShowBillingEmailConfirmation;
			this.accountContact.confirmEmail.required = this.accountCreateConfig.AccountOptions.ShowBillingEmailConfirmation;
			
			this.accountContact.title.options = this.accountCreateConfig.NameTitleOptions;
			this.accountContact.title.value = this.accountCreateConfig.NameTitle;
			this.accountContact.title.selectValue = "Id";
			this.accountContact.title.selectName = "Name";
			this.accountContact.title.selectChange();
			
			this.accountContact.suffix.options = this.accountCreateConfig.NameSuffixOptions;
			this.accountContact.suffix.value = this.accountCreateConfig.NameSuffix;
			this.accountContact.suffix.selectValue = "Id";
			this.accountContact.suffix.selectName = "Name";
			this.accountContact.suffix.selectChange();
			
			this.accountContact.state.options = this.accountCreateConfig.StateRegionOptions;
			this.accountContact.state.allOptions = this.accountCreateConfig.StateRegionOptions;
			this.accountContact.state.value = this.accountCreateConfig.RegionDropDownValue;
			this.accountContact.state.selectValue = "Abbreviation";
			this.accountContact.state.selectName = "Name";
			this.accountContact.state.selectChange();
			
			this.accountContact.country.options = this.accountCreateConfig.CountryOptions;
			this.accountContact.country.value = this.accountCreateConfig.CountryCode;
			this.accountContact.country.selectValue = "CountryCode";
			this.accountContact.country.selectName = "OfficialName";
			this.accountContact.country.selectChange();
						
			this.updateStates();
			
			request.resolve(response.data);
		},
		
		getWebSettings : function(){
			return apiService.getAppSettings();
		},
		
		updateStates : function(){
			var countryCode = this.accountContact.country.value;
			
			//  Filter down the list of states/regions based on country
			this.accountContact.state.options = this.accountContact.state.allOptions.filter(function(val){
				if(val.CountryCode === countryCode){
					return true;
				}
				return false;
			});
			
			//  Find the default state/region if it exists
			if(this.accountContact.state.options.length > 1){
				angular.forEach(this.accountContact.state.options, function(val){
					if(val.DefaultLocale){
						this.accountContact.state.value = val.Abbreviation;
						this.accountContact.state.selectChange();
					}
				}, this);
			}else{
				this.accountContact.state.value = "";
			}
		},
				
		validateCreateAccount : function(){
			var isValid = true;
			
			
			angular.forEach(this.accountContact, function(formField){
				if(formField.validate){
					var fieldValid = formField.validate();
					isValid = isValid && fieldValid;
				}
			});
			
			return isValid;
		},
		
		saveCreateAccount : function(accountContact){
			var request = $q.defer();

			var account = {
				Username: accountContact.username.value,
				Password: accountContact.password.value,
				ConfirmPassword: accountContact.confirmPassword.value,
				NameTitle: accountContact.title.value,
				FirstName: accountContact.firstName.value,
				MiddleName: accountContact.middleName.value,
				LastName: accountContact.lastName.value,
				NameSuffix: accountContact.suffix.value,
				Street1: accountContact.street1.value,
				Street2: accountContact.street2.value,
				City: accountContact.city.value,
				CountryCode: accountContact.country.value,
				RegionTextValue: accountContact.state.value,
				Postal: accountContact.zipCode.value,
				Phone: accountContact.phone.value,
				Cell: accountContact.mobile.value,
				Email: accountContact.email.value,
				ConfirmEmail: accountContact.confirmEmail.value,
				ContactGuid: accountContact.ContactGuid,
				CompanyCode : accountContact.companyCode.value
			};
			
			apiService.postAccountCreate(account).then(angular.bind(this, this.onSaveSuccessful, request), angular.bind(this, this.onSaveFailed, request));
			
			return request.promise;
		},
		
		onSaveSuccessful : function(request, response){
			return request.resolve({ success : true, error : [] });
		},
		
		onSaveFailed : function(request, response){
			return request.resolve({ success : false, errors : response.data });
		}
	});

	return new AccountCreateService();
}]);

GTS.accountCreate.factory('AccountCreateViewModel', ['baseViewModel', function(baseViewModel){
	
	return angular.extend({
		accountContact : { },
		errors : []
	}, baseViewModel);

}]);

GTS.accountLogon.controller('AccountLogonController',
                                ['baseViewModel', 'pageStateService', '$scope', '$sce', 'classify', 'BaseController', 'AccountLogonViewModel', 'CommunicatorService', 'AccountLogonService', 
                        function (baseViewModel,   pageStateService,   $scope,   $sce,   classify,   BaseController,   AccountLogonViewModel,   CommunicatorService,   AccountLogonService) {

        var state = { loading : false };
            
        var AccountLogonController = classify(BaseController, [{

            state : state,

            viewModel : AccountLogonViewModel,

            listeners : { },

            registrations : ['logon', 'forgotPassword'],

            postConstruct : function () {
                this.scope.root = pageStateService.getRoot();
				this.viewModel.logonInfo = AccountLogonService.getLogonInfo();
            },
			
            logon : function(event){
				if(AccountLogonService.validateLogon()){
					this.state.loading = true;
                    AccountLogonService.doLogon(this.viewModel.username, this.viewModel.password).then(angular.bind(this, this.onLogonComplete));
                }
            },
            
            onLogonComplete : function(result){
                
                if(result.success){
                    
                    var queryString = pageStateService.getQueryString();

                    if(queryString && queryString.returnurl && queryString.returnurl.toLowerCase().indexOf('checkout/index') > -1){
                        
                        //  Don't reset the loading state here.  That will keep the spinner open until the page redirects, which is desired
                        pageStateService.go('checkoutRouter');
                        
                    }else{
                        //  Don't reset the loading state here.  That will keep the spinner open until the page redirects, which is desired
                        pageStateService.go('accountProfile');   
                    }
                    
                }else{
					this.state.loading = false;
                    this.viewModel.logonError = result.errorMessage;
                }
            },
			
			forgotPassword : function(){
				CommunicatorService.send('forgotPasswordModal');
			}
        }]);

        return new AccountLogonController($scope);

    }]);

GTS.accountLogon.service('AccountLogonService', [
	'classify','$http', '$q', '$sce','CommunicatorService', 'apiService', 'BaseFormField',function(
	 classify,  $http,   $q,    $sce,  CommunicatorService,  apiService,   BaseFormField){

	var AccountLogonService = classify({
        logonInfo : {username : new BaseFormField(), password : new BaseFormField()},
        
		_constructor : function(){
			
		},
        
        getLogonInfo : function(){
            return this.logonInfo;
        },
        
        validateLogon : function(){
			this.logonInfo.username.validate();
			this.logonInfo.password.validate();
            return !this.logonInfo.username.error && !this.logonInfo.password.error;
        },
        
        doLogon : function(){
            var model = { username: this.logonInfo.username.value, password : this.logonInfo.password.value };
            
            var request = $q.defer();
            apiService.postLogon(model).then(angular.bind(this, this.logonSuccess, request), angular.bind(this, this.logonFailure, request));
	    return request.promise;
        },
        
        logonSuccess : function(request, response){
            request.resolve({ success: true, errorType: 'none', errorMessage: '' });
        },
        
        logonFailure : function(request, response){
            request.resolve({ success: false, errorType: 'logonFailure', errorMessage: response.data });
        }
	});

	return new AccountLogonService();
}]);

GTS.accountLogon.factory('AccountLogonViewModel', ['baseViewModel', function(baseViewModel){
	
	return angular.extend({
		logonInfo : { }
	}, baseViewModel);

}]);

GTS.accountLogonForm.controller('AccountLogonFormController',
                                ['baseViewModel', 'pageStateService', '$scope', '$sce', 'classify', 'BaseController', 'AccountLogonFormViewModel', 'AccountLogonFormService', 
                        function (baseViewModel,   pageStateService,   $scope,   $sce,   classify,   BaseController,   AccountLogonFormViewModel,   AccountLogonFormService) {

        var state = { 
			returningCustomerOpen : false, 
			createAnAccountOpen: false, 
			continueAsGuestOpen: false, 
			showContinueAsGuest: false, 
			showCreateAccount: false,
			logonConfigLoading: false
		};
            
        var AccountLogonFormController = classify(BaseController, [{

            state : state,

            viewModel : AccountLogonFormViewModel,

            listeners : { },

            registrations : ['expand', 'forgotPassword', 'continueAsGuest'],

            postConstruct : function () {
                this.scope.root = pageStateService.getRoot();

				this.state.logonConfigLoading = true;
                AccountLogonFormService.loadLogonConfig().then(angular.bind(this, this.updateLogonConfig));
            },
            
            updateLogonConfig : function(){
                 
				this.state.logonConfigLoading = false;
                var logonConfig = AccountLogonFormService.getLogonConfig();
                
                state.showContinueAsGuest = logonConfig.ShowContinueAsGuest;
                state.showCreateAccount = logonConfig.ShowCreateAccount;
                state.showReturningCustomer = logonConfig.ShowReturningCustomer;
                
                this.showSingular();
                
            },
            
            showSingular : function() {

                var map = {
                    showContinueAsGuest: 'continueAsGuestOpen',
                    showReturningCustomer: 'returningCustomerOpen',
                    showCreateAccount: 'createAnAccountOpen'
                };
                
                var one;
                angular.forEach(map, function(val, prop){
                    if(this.state[prop]){
                        if(one === undefined){
                            one = prop;
                        }else{
                            one = false;
                        }
                    }
                }, this);
                
                if(one){
                    this.state[map[one]] = true;
                }             
            },

            expand : function (prop) {
                var isOpen = this.state[prop];
                this.state[prop] = !isOpen;
            },
            
            forgotPassword : function() {
                
            },
                        
            continueAsGuest : function() {
				pageStateService.go('checkoutRouter');
            }
			
        }]);

        return new AccountLogonFormController($scope);

    }]);

GTS.accountLogonForm.service('AccountLogonFormService', [
	'classify','$http', '$q', '$sce','CommunicatorService', 'apiService', 'BaseFormField','webSettingsService',function(
	 classify,  $http,   $q,    $sce,  CommunicatorService,  apiService,   BaseFormField,  webSettingsService){

	var AccountLogonFormService = classify({
        
		logonConfig : {},
        
		_constructor : function(){
			
		},
        
        loadLogonConfig : function (){
            var request = $q.defer();
			apiService.getLogon().then(angular.bind(this, this.processLogon, request));
			
			return request.promise;
        },
        
        processLogon : function(request, response){
            this.logonConfig = response.data;
			this.logonConfig.ShowReturningCustomer = true;
			webSettingsService.getSettings().then(angular.bind(this, function(_response){
				if(_response.GroupSales.IsGroupSales){
					this.logonConfig.ShowReturningCustomer = false;
				}
				 request.resolve();
			}));
        },
        
        getLogonConfig : function(){
            return this.logonConfig;
        }
		
	});

	return new AccountLogonFormService();
}]);

GTS.accountLogonForm.factory('AccountLogonFormViewModel', ['baseViewModel', function(baseViewModel){
	
	return angular.extend({	}, baseViewModel);

}]);

GTS.addOnModal.factory('AddOnModalController', [
	
	'pageStateService','AddOnModalViewModel','CommunicatorService','classify','BaseController','ModalController','addOnService', function(
	 pageStateService,  AddOnModalViewModel,  CommunicatorService,  classify,  BaseController,  ModalController,  addOnService ){
	
	var AddOnModalController = classify(BaseController, [ModalController, {
		
		registrations : ['add', 'goToCart'],
		viewModel : new AddOnModalViewModel(),
		listeners : {
			'openAddOnModal' : 'openModal',
		},
		state : {
			loading : true,
			added : false
		},

		onModalOpen : function(data){
			
			this.viewModel.added = [];
			
			this.maxAddOns = data.passKind.MaxAddons;
			this.viewModel.maxAddOns = data.passKind.MaxAddons;
			this.viewModel.maxAdults = data.passKind.MaxAdults;
			this.viewModel.maxChildren = data.passKind.MaxChildren;
					
			if(data.added){
				angular.copy(this.viewModel.added, data.added);	
			}
			
			this.viewModel.goToCheckout = data.goToCheckout;

			this.showItems(data.addOns);
			
			this.calcTotals();
		},
		
		loadData : function(passKind){
			addOnService.getMemberAddOns(passKind).then(angular.bind(this, this.showItems));
		},
		
		showItems : function(addOns){
			this.state.loading = false;
			this.viewModel.items = addOns;
			this.viewModel.currentAddOns = addOnService.getAddOnCount();
			angular.forEach(addOns, function(addOn){
				if(addOn.Price !== undefined) addOn.Price = addOn.Price.toFixed(2);
			}, this);
		},
		
		add : function(item){
			
			this.state.loading = true;	
			if(this.viewModel.maxAddOns === -1 || this.viewModel.added.length < this.viewModel.maxAddOns){
				this.viewModel.added.push(item);
				addOnService.addToCart(item).then(angular.bind(this, this.updateDisplay));
			}
		},
		
		updateDisplay : function(response){

			CommunicatorService.send('updateSmallCart', response.data);
			this.state.added = true;
			this.state.loading = false;
			this.viewModel.cartTotal = response.data.Totals.TotalDisplay;
			this.calcTotals();
		},
		
		goToCart : function(){
			pageStateService.go('cart');
		},
		
		calcTotals : function(){
						
			this.viewModel.currentAddOns = addOnService.getAddOnCount() + this.viewModel.added.length;
			
			this.viewModel.remainingAddOns = this.viewModel.maxAddOns - this.viewModel.currentAddOns;
			if(this.viewModel.remainingAddOns < 0){
				this.viewModel.remainingAddOns = 0;
			}
			
			this.viewModel.canAddMore = (this.viewModel.maxAddOns === -1) || (this.viewModel.maxAddOns > this.viewModel.currentAddOns);
		}
		
	}]);
	
	return AddOnModalController;
	
}]);

GTS.addOnModal.controller('addOnModalInstance', [
	
	'classify','AddOnModalController','$scope',function(
	 classify,  AddOnModalController,  $scope){
	
	var AddOnModalControllerInstance = classify(AddOnModalController, {
		
		
		
		
	});
	
	return new AddOnModalControllerInstance($scope);
	
}]);

GTS.addOnModal.factory('addOnService', [
	'$q','classify','apiService','pageStateService','membershipService',function(
	 $q,  classify,  api,         pageStateService,  membershipService){
		
		var AddOnModalService = classify({
			
			cart : {},
			
			getCart : function(){
				return this.cart;
			},
			
			getMemberAddOns : function(passKind){
				return api.getMemberAddOns(passKind);
			},
			
			addToCart : function(item){
				
				var request = $q.defer(),
					self = this;
				
				var target = [{
					CategoryExternalId: pageStateService.getPageModel().category,
					Plu: item.Plu,
					Quantity: 1
				}];
				
				api.addToCart(target).then(function(){	
					membershipService.setAddOnNames(item.Plu, item.Name);
					api.getCart().then(function(response){
						self.cart = response.data;
						request.resolve({
							success : true,
							data : response.data
						});
					}, function(){
						request.resolve({
							success : false
						});
					});
					
				}, function(){
					request.resolve({
						success : false
					});
				});
				
				return request.promise;
			},
			
			getAddOnCount : function(){
				var addons = membershipService._getPassAddOns();
				
				return addons.length;
			}
			
		});
		
		return new AddOnModalService();
	}
]);

GTS.addOnModal.factory('AddOnModalViewModel', [
	
	'BaseViewModel','classify',function(
	 BaseViewModel,  classify){
	
	var AddOnModalViewModel = classify(BaseViewModel, {
		
		items : [],
		added : [],
		maxAdults : 0,
		maxChildren: 0,
		maxAddOns : 0
		
	});
	
	return AddOnModalViewModel;
	
}]);

GTS.associatedTickets.factory('AssociatedTicketsController', [
	
	'classify','BaseResponderController','AssociatedTicketsViewModel','WebFormsService', 'CommunicatorService', 'DomDataParser', function(
	 classify,  BaseResponderController,  AssociatedTicketsViewModel,  WebFormsService,   CommunicatorService,   DomDataParser){
	
	var AssociatedTicketsController = classify(BaseResponderController, {
		registrations: ['selectEvent'],

		listeners: { 'eventTimeModal.set': 'updateSelected'},

		_constructor : function(){
			BaseResponderController.prototype._constructor.apply(this, arguments);
			this.viewModel = this.scope.viewModel = new AssociatedTicketsViewModel();	
			
			WebFormsService.onSubmit(angular.bind(this, this.submit));
		},
		
		submit : function(){
			var error = false;
			angular.forEach(this.viewModel.items, function(item){
				if(item.isEvent && parseFloat(item.quantity) > 0 && item.selectedEventDateTime === ""){
					error = true;
				}
			});
			return !error;
		},

		selectEvent: function (cat, item, catIndex) {
			item.parentSCDAutoSelectEvents = 'false';
			CommunicatorService.send('eventTimeModal.start', item);
		},

		updateSelected: function(response) {
			var ddp = new DomDataParser(response.data),
				data = ddp.getData();

			angular.forEach(this.viewModel.items, function(item, index) {
				var newItem = data.tickets[index];
				item.selectedDateEl = { text: newItem.selectedEventDateTime };
			});
		}
		
	});
	
	return AssociatedTicketsController;
	
}]);

GTS.associatedTickets.controller('associatedTicketsInstance', ['classify','AssociatedTicketsController', '$scope',function(classify, AssociatedTicketsController, $scope){
	
	var AssociatedTicketsInstance = classify(AssociatedTicketsController, {
	
		
	});
	
	return new AssociatedTicketsInstance($scope);
	
}]);

GTS.associatedTickets.factory('AssociatedTicketsViewModel', [
	'classify', 'BaseViewModel', 'AssociatedTicketsDomData', '$sce', function(
	 classify,   BaseViewModel,   AssociatedTicketsDomData,   $sce){
	
	var AssociatedTicketsViewModel = classify(BaseViewModel, {
		
		_constructor : function() {
			angular.forEach(AssociatedTicketsDomData.tickets, function (ticket, _i) {
				
				if(ticket.selectDateTimeButtonEl){
					ticket.isEvent = true;	
				}
				
				ticket.quantityInputEl = {
					value : ticket.quantityEl.text,
					disabled : true
				};
				
				ticket.pluName = $sce.trustAsHtml(ticket.pluName);
				ticket.pluShortName = $sce.trustAsHtml(ticket.pluShortName);
				ticket.pluDesc = $sce.trustAsHtml(ticket.pluDesc);

				var oldItem = AssociatedTicketsDomData.tickets[_i],
					expandPackage = oldItem.expandPackage,
					quantity = oldItem.quantityInputEl ? oldItem.quantityInputEl.value : 0;
				angular.extend(oldItem, ticket);
				ticket.expandPackage = expandPackage;
				if (ticket.quantityInputEl) {
					ticket.quantityInputEl.value = quantity;
				}
				if (ticket.priceError) {
					if (!ticket.errorList) ticket.errorList = [];
					ticket.errorList.push(ticket.priceError);
				}

				if (ticket.selectDateTimeButtonEl) {
					ticket.selectedDateEl = { text: ticket.selectDateTimeButtonEl.value };
				}
			});
			
			this.cancel = AssociatedTicketsDomData.cancelButtonEl;
			this.addToCart = AssociatedTicketsDomData.addToCartButtonEl;
			
			this.items = AssociatedTicketsDomData.tickets;
		}
		
	});
	
	return AssociatedTicketsViewModel;
	
}]);



GTS.calendarModal.factory('CalendarModal_Controller', [

	'classify','BaseController','CalendarModal_Service','baseViewModel','ModalController', function(
	 classify,  BaseController,  CalendarModal_Service,  baseViewModel,  ModalController){

	var viewModel = baseViewModel;
	var state = {
		showModal : false,
		loading : false,
		enableDays : true,
		hasDates : false
	};

	var CalendarModalController = classify(BaseController, [ModalController, {

		state : state,
		viewModel : viewModel,
		registrations : ['selectDay', 'closeModal', 'nextMonth', 'prevMonth', 'changeMonth', 'changeYear', 'selectTime'],
		listeners : {
			'openModal' : 'showModal',
			'dateSelected' : 'showDates',
			'timeSelected' : 'closeModal'
		},

		showModal : function(item){
			state.showModal = true;
			state.loading = true;
		},

		showDates : function(data){
	
			state.loading = false;
			if(data.days.length){
				state.hasDates = true;
				viewModel.calendar = data;
			}else{
				state.hasDates = false;
			}

			this.scope.$apply();
		},

		selectDay : function(day){
			if((day.available || day.selected) && day.target){
				state.loading = true;
				CalendarModal_Service.selectDate(day, viewModel.calendar.calendarSelector);
			}
		},
		
		onModalClose : function(async){
			CalendarModal_Service.revert();
			viewModel.days = null;
			state.hasDates = null;
			if(async) this.scope.$apply();
		},

		nextMonth : function(){
			state.loading = true;
			CalendarModal_Service.nextMonth(angular.bind(this, this.showDates), viewModel.calendar.next);
		},

		prevMonth : function(){
			state.loading = true;
			CalendarModal_Service.prevMonth(angular.bind(this, this.showDates), viewModel.calendar.prev);
		},

		changeMonth : function(){

			state.loading = true;

			var data = this.getMonthYear();
			data.monthSelect = viewModel.calendar.monthSelect.name;
			data.yearSelect = viewModel.calendar.yearSelect.name;

			CalendarModal_Service.changeMonth(data, angular.bind(this, this.showDates));
		},

		changeYear : function(){

			state.loading = true;

			var data = this.getMonthYear();
			data.monthSelect = viewModel.calendar.monthSelect.name;
			data.yearSelect = viewModel.calendar.yearSelect.name;
			
			CalendarModal_Service.changeYear(data, angular.bind(this, this.showDates));
		},

		selectTime : function(event){

			state.loading = true;

			var data = {};
			data[event.selectButton.name] = event.selectButton.value;

			CalendarModal_Service.selectTime(data);
		},

		getMonthYear : function(){

			var month = viewModel.calendar.month || '',
				year = viewModel.calendar.year || '';

			if(!month){
				angular.forEach(viewModel.calendar.months, function(m){
					if(m.selected){
						month = m.value;
					}
				});
			}

			if(!year){
				angular.forEach(viewModel.calendar.years, function(y){
					if(y.selected){
						year = y.value;
					}
				});
			}
			return {
				month : month,
				year : year
			};
		}

	}]);

	return CalendarModalController;

}]);

GTS.calendarModal.controller('CalendarModal_Customer', ['CalendarModal_Controller', '$scope',function(CalendarModal_Customer, $scope){

	return new CalendarModal_Customer($scope);

}]);

GTS.calendarModal.factory('CalendarModal_Parser', ['classify',function(classify){

	var CalendarModalParser = classify({

		parseCalendar : function(htmlArray, selector){

			var modalHTML = $(htmlArray),
				model = {};
				
			var calendarHTML;
			
			if(selector === 'eventTime'){
				calendarHTML = modalHTML.find('#EventsDateTimeSelector #CalendarSelector');
			}else if(selector === 'multi'){
				calendarHTML = modalHTML.find('#MultiTimeEventsSelector #CalendarSelector');
			}else{
				calendarHTML = modalHTML.find('#Calendar #CalendarSelector');
			}

			this.getCalendarSelector(calendarHTML, model);
			this.getControls(calendarHTML, model);
			this.getYears(calendarHTML, model);
			this.getMonths(calendarHTML, model);
			this.getDays(calendarHTML, model);
			this.getControls(calendarHTML, model);

			var timesHTML = modalHTML.find('#EventTimeRow');
		    
			this.getTimes(timesHTML, model);
			
			return model;
		},

		getCalendarSelector : function(html, model){
			var content = $(html),
				cal = content.find('table[title="Calendar"]'),
				selector = $(cal).attr('id');

			if(selector){
				model.calendarSelector = selector ? selector.replace(new RegExp('_', 'g'), '$') : null;
			}
		},

		getTimes : function(timeNodes, model){

			var times = [];

			angular.forEach(timeNodes, function (time) {
				var el = $(time);

				time = {
					time: el.find('.event-time-cell span').text(),
					availability: el.find('.availability-cell span').text(),
					name: el.find('.event-name-cell').text(),
					quantity: el.find('.qty-cell').text(),
				};

				var selectEl = el.find('.select-cell input')[0];

				if (selectEl) {
				    time.selectButton = {
				        value: el.find('.select-cell input')[0].value,
				        name: el.find('.select-cell input')[0].name
				    };
				}

				times.push(time);

			});

			model.eventTimes = times;
		},

		parseCallback : function(htmlArray){

			var content = $(htmlArray);

			var model = [];

			angular.forEach(content.find('.SelectedDateLabel'), function(date){

				var o = {
					selectedDateTime : $(date).text()
				};
				model.push(o);
			});

			return model;
		},

		getMonths : function(modalHTML, CalendarModel){

			var months = [],
				monthSelect = $(modalHTML.find('select')[0]);

			if(monthSelect.length){

				CalendarModel.monthSelect = {
					name : monthSelect.attr('name'),
					id : monthSelect.attr('id')
				};

				angular.forEach(monthSelect.find('option'), function(option){
					months.push({
						value : option.value,
						text : $(option).text(),
						selected : option.selected
					});
				});

				CalendarModel.months = months;
			}
		},

		// get the years from the html
		getYears : function(modalHTML, CalendarModel){

			var years = [],
				yearSelect = $(modalHTML.find('select')[1]);

			if(yearSelect.length) {
			    CalendarModel.yearSelect = {
			        name: yearSelect.attr('name'),
			        id: yearSelect.attr('id')
			    };
				angular.forEach(yearSelect.find('option'), function(option){
					years.push({
						value : option.value,
						text : $(option).text(),
						selected : option.selected
					});
				});
				CalendarModel.years = years;
			}
		},

		// grab the days from the html
		getDays : function(modalHTML, CalendarModel){

			var days = modalHTML.find('.Calendar').find('td'),
				targetDays = [],
				dayHeaders = modalHTML.find('.Calendar').find('th'),
				targetDayHeaders = [];

			angular.forEach(dayHeaders, function(dayHeader) {
				targetDayHeaders.push(dayHeader.innerText);
			});

			angular.forEach(days, function(day, ind){
				day = $(day);

				ind = {};

				ind.date = day.text();
				ind.other = day.hasClass('OtherMonthDay');
				ind.available = day.hasClass('DayAvailable');
				ind.selected = day.hasClass('SelectedDay');

				if($(day).hasClass('OtherMonthDay')){
					ind.other = true;
				}else{

					ind.date = day.text();
					if(day.hasClass('DayAvailable')){
						ind.available = true;
						ind.target = day.find('a').attr('href').split(',')[1].split('\'')[1];

					}else if(day.hasClass('SelectedDay')){

					}
				}
				targetDays.push(ind);
			});

			CalendarModel.days = targetDays;
			CalendarModel.dayHeaders = targetDayHeaders;
		},

		getControls : function(modalHTML, CalendarModel){

			var controls = modalHTML.find('input[type="image"]');

			if(controls.length === 2){
				CalendarModel.prev = {
					name : controls[0].name,
					id : controls[0].id
				};

				CalendarModel.next = {
					name : controls[1].name,
					id : controls[1].id
				};
			}
		}

	});

	return new CalendarModalParser();

}]);

GTS.calendarModal.service('CalendarModal_PostBack', [

	'classify','BasePostBack','CalendarModal_Parser','DomDataParser','WebFormsService',function(
	 classify,  BasePostBack,  CalendarModal_Parser,  DomDataParser,  WebFormsService){

	var CalendarModal_PostBack = classify(BasePostBack, {

		getEvents : function(item){
			var request = $.Deferred();
			this.updateASPPreEvents(item);
			this.request(angular.bind(this, function(html){
				var dateSpecific = (item.isDateSpecificEl && item.isDateSpecificEl.value === 'True');
				// get new data
				var data = CalendarModal_Parser.parseCalendar(html, dateSpecific);
				request.resolve(data);
			}));
			return request;
		},

		selectDate : function(day, selector){
			var request = $.Deferred();
			this.updateASPAfterDateSelection(day, selector);
			this.request(angular.bind(this, function(html){
				var model = {};
				var data = CalendarModal_Parser.parseCalendar(html);
				request.resolve(data, html);
			}));
			return request;	
		},

		updateASPPreEvents : function(item){
			
			WebFormsService.clean();
			var change = {
				'ctl00$ContentPlaceHolder$ScriptManager1':'ctl00$ContentPlaceHolder$UpdatePanel|'+item.selectDateTimeButtonEl.name,
				'__ASYNCPOST': true
			};
			change[item.selectDateTimeButtonEl.name+'.x'] = 0;
			change[item.selectDateTimeButtonEl.name+'.y'] = 0;
			
			if(item.salesChannelDetailIdHiddenEl){
				change[item.salesChannelDetailIdHiddenEl.name] = item.salesChannelDetailIdHiddenEl.value;
			}
			
			WebFormsService.setModel(change);
		},

		updateASPAfterDateSelection : function(day, selector){

			var data = {
				'__EVENTARGUMENT':day.target,
				'__ASYNCPOST':true,
				'__EVENTTARGET' : selector
			};
			WebFormsService.setModel(data);
		},

		nextMonth : function(next){

			var request = $.Deferred();
			var currentModel = WebFormsService.getModel(),
				data = {
					'__ASYNCPOST':true
				};

			data[next.name+'.x'] = 0;
			data[next.name+'.y'] = 0;

			WebFormsService.setModel(data);

			this.request(function(html){
				// get new data
				var data = CalendarModal_Parser.parseCalendar(html);
				request.resolve(data);
			});

			return request;

		},

		prevMonth : function(prev){

			var request = $.Deferred(),
				currentModel = WebFormsService.getModel(),
				data = {
					'__ASYNCPOST':true
				};

			data[prev.name+'.x'] = 0;
			data[prev.name+'.y'] = 0;

			WebFormsService.setModel(data);
			
			this.request(function(html){
				// get new data
				var data = CalendarModal_Parser.parseCalendar(html);
				request.resolve(data);
			});
			return request;
		},

		changeMonth : function(my){

			var request = $.Deferred(),
				currentModel = WebFormsService.getModel(),
				target = {
					'__ASYNCPOST':true,
					'__EVENTTARGET' : my.monthSelect
				};

			target[my.monthSelect] = my.month;
			target[my.yearSelect] = my.year;

			WebFormsService.setModel(target);

			this.request(function(html){
				// get new data
				var data = CalendarModal_Parser.parseCalendar(html);
				request.resolve(data);
			});
			return request;
		},

		changeYear : function(my){

			var request = $.Deferred(),
				data = {
					'__ASYNCPOST':true,
					'__EVENTTARGET' : my.yearSelect
				};

			data[my.monthSelect] = my.month;
			data[my.yearSelect] = my.year;

			WebFormsService.setModel(data);
			
			this.request(function(html){
				// get new data
				var data = CalendarModal_Parser.parseCalendar(html);
				request.resolve(data);
			});

			return request;
		},

		selectTime : function(data){

			var request = $.Deferred();

			data.__ASYNCPOST = true;
			WebFormsService.setModel(data);

			this.request(angular.bind(this, function(html){
				request.resolve(html);
			}));

			return request;
		}

	});

	return new CalendarModal_PostBack();

}]);

GTS.calendarModal.service('CalendarModal_Service', [

	'classify','CommunicatorService','CalendarModal_PostBack','WebFormsService',function(
	 classify,  CommunicatorService,  CalendarModal_PostBack,  WebFormsService){

	var selectedItem = null;

	var CalendarModalService = classify({

		_constructor : function(){},

		getEvents : function(item){
			selectedItem = item;
			return CalendarModal_PostBack.getEvents(item);
		},

		selectDate : function(day, selector){
			CalendarModal_PostBack.selectDate(day, selector).then(function(data, html){
				if(data.eventTimes.length < 1){
					CommunicatorService.send('timeSelected', html);
				}else{
					CommunicatorService.send('dateSelected', data);
				}
			});
		},

		nextMonth : function(cb, next){
			CalendarModal_PostBack.nextMonth(next).then(cb);
		},

		prevMonth : function(cb, prev){
			CalendarModal_PostBack.prevMonth(prev).then(cb);
		},

		changeMonth : function(my, cb){
			CalendarModal_PostBack.changeMonth(my).then(cb);
		},

		changeYear : function(my, cb){
			CalendarModal_PostBack.changeYear(my).then(cb);
		},

		updateButtons : function(html){
			CommunicatorService.send('timeSelected', html);
		},

		selectTime : function(data, cb){
			CalendarModal_PostBack.selectTime(data).then(function(html){
				CommunicatorService.send('timeSelected', html);
			});
		},

		revert : function(){
			WebFormsService.clean();
		}

	});

	return new CalendarModalService();

}]);

/*property
    $apply, a, apply, b, bind, c, cart, changeDevice, device, errorMessage,
    factory, forEach, getBreakerStatus, getCart, getContinueShoppingLink,
    hidePackageInput, href, initDevice, loading, openInfo, postConstruct,
    promoCode, promoError, registrations, removeDonation, scope, send, state,
    then, viewModel, whatThisClick, whatsThisFeeEl
*/
GTS.cart.factory('Cart_Controller', [

	'classify', 'BaseController', 'ResponderService', 'Cart_Service', 'quantityControlController', 'EditablePriceControl', 'PageDataDomData', 'CommunicatorService', 'PackageControl', '$sce', function (
	 classify, BaseController, ResponderService, Cart_Service, quantityControlController, EditablePriceControl, PageDataDomData, CommunicatorService, PackageControl, $sce) {

	var viewModel = {},
		state = { hidePackageInput : true },
		device = {
			a : true,
			b : false,
			c : false
		};

	var Cart_Controller = classify(BaseController, [quantityControlController, EditablePriceControl, PackageControl, {

		device : device,
		viewModel : viewModel,
		registrations : ['apply', 'inc', 'onKeyDown', 'openInfo', 'whatThisClick','expandPackage', 'removeDonation'],
		state: state,

		initDevice : function(){
			this.scope.device = device;
			angular.forEach(device, function(val, key){
				device[key] = ResponderService.getBreakerStatus(key);
			});
		},

		postConstruct : function(){
			
			this.state.loading = true;
			
			Cart_Service.getCart().then(angular.bind(this, function (response) {
				viewModel = this.scope.viewModel = response;


				angular.forEach(viewModel.items, angular.bind(this, function(item) {
					if (item.packageDescription) {
						item.hasPackageDescription = true;
						
						item.packageDescription = $sce.trustAsHtml(item.packageDescription);

						item.showDetails = false;

						angular.forEach(item.packageItems, function(packageItem) {
							if (packageItem.isEvent || packageItem.passInfoLinkEl || packageItem.packageEventDate || packageItem.rosterLinks) {
								item.showDetails = true;
							}
						});
					} else {
						item.hasPackageDescription = false;
						item.showDetails = true;
					}
				}));


			    this.state.loading = false;
			}));
		    
			this.initDevice();
			ResponderService.bind('a', angular.bind(this, this.changeDevice));
			ResponderService.bind('b', angular.bind(this, this.changeDevice));
			ResponderService.bind('c', angular.bind(this, this.changeDevice));
			viewModel.promoError = PageDataDomData.errorMessage;
			Cart_Service.getContinueShoppingLink();
		},

		changeDevice : function(bool, breaker){
			device[breaker] = bool;
			this.scope.$apply();
		},

		apply : function(){
			var promo = viewModel.promoCode;
		},
		
		openInfo : function(item){
			CommunicatorService.send('infoOpen', item);
		},
		
		whatThisClick: function () {
		    /*jshint -W061 */
		    eval(viewModel.whatsThisFeeEl.href);
		    /*jshint +W061 */
		},
		
		removeDonation : function(){
			CommunicatorService.send('donation.remove', {});
		}
	}]);

	return Cart_Controller;

}]);

GTS.cart.controller('CartController', ['$scope','classify','Cart_Controller', function($scope,classify,Cart_Controller){

	// init
	var CartController = classify(Cart_Controller, {});

	return new CartController($scope);

}]);

GTS.cart.service('Cart_PostBack', ['classify', 'BasePostBack', function(classify, BasePostBack){

	var Cart_PostBack = classify(BasePostBack, {

		_constructor : function(){},

		

	});

}]);

GTS.cart.service('Cart_Service', [
	
	'classify','CartDomData','Cart_PostBack','PageDataDomData','pageStateService','SmallCartService','$q',function(
	 classify,  CartDomData,  Cart_PostBack,  PageDataDomData,  PageStateService,  SmallCartService,  $q){
		 
	Array.prototype.move = function (old_index, new_index) {
		if (new_index >= this.length) {
			var k = new_index - this.length;
			while ((k--) + 1) {
				this.push(undefined);
			}
		}
		this.splice(new_index, 0, this.splice(old_index, 1)[0]);
		return this; // for testing purposes
	};

	var CartService = classify({

		_constructor : function(){
			
			CartDomData.promoError = PageDataDomData.errorMessage;
			angular.forEach(CartDomData.items, function(item){
				var input = $(item.remove).find('input[type="checkbox"]')[0];
				
				if(input){
					item.removeEl = {};
					angular.forEach(input.attributes, function(attr){
						delete item.remove;
						item.removeEl[attr.name] = attr.value;
					});		
				}
			
			});

			this.getContinueShoppingLink();
		},
		
		fixPrice : function(){
			
			angular.forEach();	
			
		},

		getCart : function(){
			
			var request = $q.defer(),
				moveOldIndex = null,
				moveNewIndex = null;
			
			SmallCartService.getCart().then(function(response){
				var cartItems = response.data.Items;
				angular.forEach(cartItems, function(item, itemIndex){
					
					if(item.ProductType === 14){
						angular.forEach(CartDomData.items, function(cI){
							if(cI.orderLineHiddenEl.value == item.Id){
								delete cI.removeEl;
								cI.isDonation = true;
							}
						});
					}
					
					
					if(item.PackageInPass && item.PackageInPass.Id){
						var passOrderLineId = item.Id,
							packageOrderLineId = item.PackageInPass.Id;
						
						angular.forEach(CartDomData.items, function(cI, cIIndex){
							if(passOrderLineId == cI.orderLineHiddenEl.value){
								moveNewIndex = cIIndex + 1;
								var cur = cI.price.substring(0,1);
								//I.total = 
								cI.total = cur + Number(item.Total).toFixed(2);
								cI.price = cur + Number(item.Price).toFixed(2);
							}
							
							if(packageOrderLineId == cI.orderLineHiddenEl.value){
								moveOldIndex = cIIndex;
								cI.isInPass = true;
								cI.parentPassOrderLineId = passOrderLineId;
							}
						}, this);
					}
				}, this);
				
				if(moveNewIndex){
					CartDomData.items.move(moveOldIndex, moveNewIndex);
				}
				
				CartDomData.allowDiscounts = response.data.CheckoutOptions.AllowDiscounts;
					
				request.resolve(CartDomData);
			
			});
			
			return request.promise;
		},

		getContinueShoppingLink : function() {
		    var m = PageStateService.getPageModel();
			CartDomData.continueShoppingLink = m.root+'shop/ViewItems.aspx?C='+m.category+'&CG='+m.categoryGroup;
		}

	});

	return new CartService();

}]);	

GTS.changePassword.factory('ChangePasswordController', [
	
	'classify','BaseController','ChangePasswordViewModel','WebFormsService',function(
	 classify,  BaseController,  ChangePasswordViewModel,  WebFormsService){
	
		var ChangePasswordController = classify(BaseController, {
			
			_constructor : function(){
				BaseController.prototype._constructor.apply(this, arguments);
				this.viewModel =this.scope.viewModel = new ChangePasswordViewModel();
				
				WebFormsService.onSubmit(angular.bind(this, this.submit));
			},
			
			submit : function(){
				var valid = this.viewModel.validate();
				
				setTimeout(angular.bind(this, function(){
					this.scope.$apply();
				}));
				
				return valid;
			}
			
		});
		
		return ChangePasswordController;
		
	}
]);

GTS.changePassword.controller('changePasswordInstance', [
	
	'classify','ChangePasswordController','$scope',function(
	 classify,  ChangePasswordController,  $scope){
	
		var ChangePasswordInstance = classify(ChangePasswordController, {

			
		});
		
		return new ChangePasswordInstance($scope);
		
	}
]);

GTS.changePassword.factory('ChangePasswordViewModel', [
	
	'classify','BaseForm','ChangePasswordDomData','PageDataDomData','TextFormField',function(
	 classify,  BaseForm,  ChangePasswordDomData,  PageDataDomData,  TextFormField){
	
		var ChangePasswordViewModel = classify(BaseForm, {
			
			newPassword : new TextFormField(angular.extend({required : true}, ChangePasswordDomData.newPasswordEl)),
			confirmPassword : new TextFormField(angular.extend({required : true}, ChangePasswordDomData.confirmPasswordEl)),
			submit : ChangePasswordDomData.submitEl,
			
			validate : function(){
				var valid = BaseForm.prototype.validate.apply(this, arguments);
				if(valid && (this.newPassword.value !== this.confirmPassword.value)){
					valid = false;
					this.confirmPassword.error = true;
				}
				return valid;
			}
			
		});
		
		return ChangePasswordViewModel;
		
	}
]);

GTS.checkout.factory('checkoutService', [
	
	'$http','$q','classify','Debounce','pageStateService','apiService', 'storageService',function(
	 $http,  $q,  classify,  Debounce,  PageStateService,  api, storageService){

	var debouncer = new Debounce(100);	
	var root = PageStateService.getRoot();
	
	var checkoutConfig = {},
		billingContact = {},
		shippingContact = {},
		payment = { Cvv: '', ExpirationMonth: 0, ExpirationYear: 0, Endorsement: '', StorePaymentInformation: false },
		endorsementEnabled = true,
		cart = {},
		deliveryOption = {},
		orderContacts = [],
		termsandconditionChecked = false,
		orderNote = "",
		personalMessage = '',
		allowStorePaymentInformation = false,
		shippingFields = [];



	var CheckoutFormService = classify({

		loadCheckoutConfig : function(){
			var request = $q.defer();
			api.getCheckoutConfig('US').then(angular.bind(this, this.processCheckoutConfig, request));
			return request.promise;
		},

		processCheckoutConfig : function(request, response){
			checkoutConfig = response.data;
			request.resolve(response.data);
		},

		loadCheckoutPage : function(){
			var request = $q.defer();
			api.getCheckoutPage().then(angular.bind(this, this.processCheckoutPage, request));
			return request.promise;
		},

		processCheckoutPage : function(request, response){
			billingContact = response.data.BillingContact;
			shippingContact = response.data.ShippingContact;
			orderContacts = response.data.OrderContacts;
			payment.Cvv = response.data.Payment.Cvv;
			payment.ExpirationMonth = response.data.Payment.ExpirationMonth;
			payment.ExpirationYear = response.data.Payment.ExpirationYear;
			payment.Endorsement = response.data.Payment.Endorsement;
			payment.StorePaymentInformation = false;
			allowStorePaymentInformation = response.data.AllowStorePaymentInformation;

			if (billingContact.Endorsement && billingContact.Endorsement.Value) {
				payment.Endorsement = billingContact.Endorsement.Value;
			}
			if (billingContact.ExpirationMonth && billingContact.ExpirationMonth.Value && billingContact.ExpirationMonth.Value > 0) {
				payment.ExpirationMonth = billingContact.ExpirationMonth.Value;
			}
			if (billingContact.ExpirationYear && billingContact.ExpirationYear.Value && billingContact.ExpirationYear.Value > 0) {
				payment.ExpirationYear = billingContact.ExpirationYear.Value;
			}

			orderNote = response.data.OrderNote;
			personalMessage = response.data.PersonalMessage;
			deliveryOption.Id = response.data.DeliveryMethodId;
			deliveryOption.deliveryMethodId = response.data.DeliveryMethodId;
			var delOption = this.getDeliveryMethod();
			if (delOption) {
				deliveryOption.Name = delOption.Name;
			}

			cart = response.data.Cart;
			
			// reset this
			billingContact.StreetAddress2.Display = false;

			request.resolve(response.data);
		},

		getAllowStorePaymentInformation : function() {
			return allowStorePaymentInformation;
		},
		
        onUpdateShippingComplete : function(res) {
            shippingFields = res.data;
            return this.loadCart();
        },

		loadCart: function (res) {
		    var request = $q.defer();
			api.getCart().then(angular.bind(this, this.processCart, request));
			return request.promise;
		},

		processCart : function(request, response) {
			cart = response.data;
			request.resolve();
		},
		
		getCart : function(){
			return cart;
		},
		
		getBillingContact : function(){
			return billingContact;
		},

		getShippingContact : function(){
			return shippingContact;
		},
		
		getBillingContactModel : function(){
			return this.billingContactModel;
		},

		getShippingContactModel : function(){
			return this.shippingContactModel;
		},
		
		getOrderContacts : function(){
			return orderContacts;
		},
		
		getPayment : function(){
			return payment;
		},

		getDeliveryOption : function(){
			return deliveryOption;
		},

		getOrderNote : function() {
			return orderNote;
		},

        getShippingFieldAttributes : function() {
            return shippingFields;
        },
		
		getDeliveryMethod : function(){
			var deliveryMethod = null;
			angular.forEach(checkoutConfig.ShippingOptions, function(option){
				if(option.Id == deliveryOption.deliveryMethodId){
					deliveryMethod = option;
					return false;
				}
			});
			return deliveryMethod;
		}, 
		
		processDeliveryMethod: function(data){

			var request = $q.defer();
			var d = {
				id : data.Id
			};

			deliveryOption.deliveryMethodId = data.Id;
			
			//  Derman - Andy, why were we debouncing this?
			// debouncer.wait(angular.bind(this, function(){
			api.setShipping(d).then(angular.bind(this, this.onUpdateShippingComplete)).then(function () {
				request.resolve();
			});

			return request.promise;
		},

		submit : function(viewModel){
			return this.processPayment(viewModel);
		},
		
		//  Copy information from conactSource to contactDestination
		copyContactInformation : function(contactSource, contactDestination){
			var destinationId = contactDestination.Id;	//  Don't copy the id.
			angular.copy(contactSource, contactDestination);
			contactDestination.Id = destinationId;
		},
		
		//  Convert a contact display model ojbect to plain o'l contact model
		convertContactDisplayModel : function(contactDisplayModel, vmContactDisplayModel){

			if(contactDisplayModel) {
			    return {
			        Id: contactDisplayModel.Id,
			        ShippingSameAsBilling: vmContactDisplayModel.ShippingSameAsBilling,
			        FirstName: vmContactDisplayModel.firstName.value,
					MiddleName : vmContactDisplayModel.middleName.value,
			        LastName: vmContactDisplayModel.lastName.value,
			        StreetAddress1: vmContactDisplayModel.street1.value,
			        StreetAddress2: vmContactDisplayModel.street2.value,
			        City: vmContactDisplayModel.city.value,
			        State: vmContactDisplayModel.state.value,
			        PostalCode: vmContactDisplayModel.zipCode.value,
			        CountryCode: vmContactDisplayModel.country.value,
			        PhoneNumber: vmContactDisplayModel.phone.value,
			        MobileNumber: vmContactDisplayModel.mobile.value,
			        EmailAddress: vmContactDisplayModel.email.value,
			        DOB: vmContactDisplayModel.birthday.value,
					NameTitleID : vmContactDisplayModel.title.value,
					NameSuffixID : vmContactDisplayModel.suffix.value
			    };
			} else {
				return null;
			}
		},
		
		isGiftedPurchase : function(){
			return shippingContact.GiftedPurchase;
		},
		
		getPersonalMessage : function(){
			return personalMessage;
		},		

		validate : function(){
			var isValid = true;

			if (endorsementEnabled) {
				angular.forEach(['Cvv', 'ExpirationMonth', 'ExpirationYear', 'Endorsement'], function(fieldName) {
					if (!payment[fieldName]) {
						payment[fieldName + 'Error'] = true;
						isValid = false;
					} else {
						delete payment[fieldName + 'Error'];
					}
				});
			}

			if(!deliveryOption.Id) {
				deliveryOption.deliveryMethodIdError = true;
			}else{
				deliveryOption.deliveryMethodIdError = false;
			}

			return isValid;
		},

		disableEndorsement : function() {
			endorsementEnabled = false;
		},
		
		showOrderConfirmationPrompt : function(){
			return checkoutConfig.ShoppingCheckoutConfig.DisplayOrderConfirmationPrompt;
		},
		
		isTermsandconditionChecked : function(){
			return storageService.get('termsandconditonChecked');
		},

		setTermsandconditionChecked : function(isChecked){
			storageService.set('termsandconditonChecked', isChecked);
		},

		processPayment : function(viewModel){
						
			
			var orderNotes = {
				OrderNote: viewModel.orderNotes.value
			};

			var vmBillingContactDisplayModel = viewModel.billingContact;
			this.billingContactModel = this.convertContactDisplayModel(billingContact, vmBillingContactDisplayModel);
			
			var vmShippingContactDisplayModel = viewModel.shippingContact;
			this.shippingContactModel = this.convertContactDisplayModel(shippingContact, vmShippingContactDisplayModel);

			var checkoutModel = {
				Payment: payment,
				BillingContact: this.billingContactModel,
				ShippingContact: this.shippingContactModel,
				OrderNotes: orderNotes,
				Survey: viewModel.newsletterAndSurvey.value || viewModel.survey.value,
				Newsletter: viewModel.newsletterAndSurvey.value || viewModel.newsletter.value,
				IsIndirectPaymentProvider: viewModel.cart.CheckoutOptions.IsIndirectPaymentProvider,
				NeedPaymentPlanContractReview: viewModel.showReviewPaymentPlan,
				UseCreditAccount : viewModel.useCreditAccount == "1" ? true : false,
				UsePassAsBilling : viewModel.usePassAsBilling,
				PersonalMessage : {
					PersonalMessage : viewModel.personalMessage.value
				}
			};
			if(viewModel.poNumber){
				checkoutModel.PONumber = viewModel.poNumber.value;
			}
			
			if(viewModel.forceShippingSameAsBilling){
				checkoutModel.BillingContact.ShippingSameAsBilling = true;
				checkoutModel.ShippingContact.ShippingSameAsBilling = true;
			}
		
			var request = $q.defer();
			api.checkout(checkoutModel).then(angular.bind(this, this.checkoutSuccess, request), angular.bind(this, this.checkoutFailure, request));
			return request.promise;
		},
		
		checkoutSuccess: function (request, response) {
			request.resolve({ success: true, errorType: 'none', errorMessage: '' });	
		},
		
		checkoutFailure : function(request, response){
			
			var message = '';
			if(response.data){
				message = response.data.Message || response.data;
			}
			
			if(response.status === 403){
				request.resolve({ success: false, errorType: 'forbidden', errorMessage: response.data.replace('PaymentController.Post() ', '') });
			}
			else if(response.status === 400){
				request.resolve({ success: false, errorType: 'unexpected', errorMessage: response.data });
			}
			else if(response.data && response.status === 500){                				
				if(response.data.indexOf("oid") > -1){
					request.resolve({ success: false, errorType: 'paymentrecordserror', errorMessage: response.data || '' });
				}else{
					request.resolve({ success: false, errorType: 'unexpected', errorMessage: response.data || '' });
				}               
            }
			else{
				request.resolve({ success: false, errorType: 'unexpected', errorMessage: message || '' });
			}
		},
		
		defaultToPassAsBilling : function(){
			return cart.CheckoutOptions.UsePassAsBilling;
		},
		
		setContactIds : function(contactId){
			billingContact.Id = contactId;
			shippingContact.Id = contactId;
		},

		loadTitles : function(){
			return api.getTitles().then(function(response){
				return response.data;
			});
		},

		loadSuffixes : function(){
			return api.getSuffixes().then(function(response){
				return response.data;
			});
		},
	});


	return new CheckoutFormService();

}]);

/* global GTS */
/* global angular */
GTS.checkoutForm.controller('checkoutFormController', [
	'$scope', 'BaseResponderController', 'classify', 'checkoutService', 'checkoutFormViewModel', 'pageStateService','CommunicatorService', 'TextFormField','ContactForm', 'BaseFormField','InputRadioField','dateUtilService',function(
	 $scope,   BaseResponderController,   classify,   checkoutService,   checkoutFormViewModel,   pageStateService,  CommunicatorService,  TextFormField,  ContactForm,    BaseFormField,  InputRadioField, dateUtilService) {

	var state = { loading: true, stateLoading: false, accountLinked : false, shippingSameAsBilling: true, forceShippingSameAsBilling: true, showReviewPaymentPlan: false,
				  showTermsAndConditions: false, showTermsAndConditionsInline: false, newsletter : false, survey : false, isIndirectPaymentProvider : false, showTotalDueNow : false, termsandconditionChecked: false};
	
	var backupContact;
	
	var checkForNgNull = function(val){
		return val.indexOf('?') === -1;
	};
	
	
	var billingContact = new ContactForm(),
		shippingContact = new ContactForm();
		
	billingContact.toggleShow(['username', 'password', 'confirmPassword', 'title', 'suffix', 'confirmEmail'], false);
	shippingContact.toggleShow(['username', 'password', 'confirmPassword', 'title', 'suffix', 'confirmEmail'], false);

	var CheckoutFormController = classify(BaseResponderController, {

		viewModel : checkoutFormViewModel,
		state : state,

		registrations : ['link','changeDeliveryOption', 'fieldChange', 'submit', 'keyevent', 'showCVVHelp', 'onShippingSameAsBillingChange', 'showTermsAndConditions','changeCreditAccount', 'onTermsandconditionChanged'],
		
		_constructor : function(){
			BaseResponderController.prototype._constructor.apply(this, arguments);
			this.viewModel.billingContact = billingContact;
			
			this.viewModel.shippingContact = shippingContact;
			this.viewModel.shippingContact.storeDefaults();


			billingContact.setDependentContact(shippingContact, this.state.shippingSameAsBilling);

			var qs = pageStateService.getQueryString();
            if (qs.errormessage) {
                this.viewModel.errorType = 'unexpected';
                this.viewModel.errorMessage = qs.errormessage;
            }

			// billing contact
			this.viewModel.termsAndConditions = new BaseFormField();
			checkoutService.loadCheckoutConfig().then(angular.bind(this, this.updateCheckoutConfig));

			this.viewModel.payment = checkoutService.getPayment();
			this.setExpirationYears();
			
			this.bindCheckoutCalls();
		},

		setExpirationYears: function() {
			var currentDate = dateUtilService.getCurrentDate();
			var startingYear = currentDate.year;
			var years = [];
			
			for (var x = 0; x < 17; x++){
				years.push( { id: startingYear + x } );
			}
				
			this.viewModel.expirationYears = years;			
				
			this.viewModel.expirationYears = years;			
		},

		updateCheckoutConfig : function(config) {
			this.viewModel.checkoutConfig = config;
			this.state.enableCreditAccount = config.EnableCreditAccount;
			this.state.enableCreditCard = config.EnableCreditCard;

			if (this.state.enableCreditAccount) {
				if (this.state.enableCreditCard) {
					this.viewModel.useCreditAccount = "0";
				} else {
					this.viewModel.useCreditAccount = "1";
				}
				this.viewModel.poNumber = new TextFormField({});
			}
			
			this.state.shippingSameAsBilling = config.BillingShippingConfig.DefaultShippingSameAsBilling;
			this.state.forceShippingSameAsBilling = config.BillingShippingConfig.ForceShippingSameAsBilling;
			this.state.showTermsAndConditions = config.TermsConditionsDisplay.Enabled;
			this.state.showTermsAndConditionsInline = config.TermsConditionsDisplay.InLine;
			this.state.showReviewPaymentPlan = config.ShowReviewPaymentPlan;
			this.viewModel.showReviewPaymentPlan = config.ShowReviewPaymentPlan;

			this.viewModel.survey = new BaseFormField({required : false, value : config.NewsletterOptInDisplay.OptedIn, visible : config.SurveyOptIn.Enabled && ! config.NewsletterOptInDisplay.Enabled});
			this.viewModel.newsletter = new BaseFormField({required : false, value : config.SurveyOptIn.OptedIn, visible : !config.SurveyOptIn.Enabled && config.NewsletterOptInDisplay.Enabled});
			this.viewModel.newsletterAndSurvey = new BaseFormField({required : false, value : config.SurveyOptIn.OptedIn, visible : config.SurveyOptIn.Enabled && config.NewsletterOptInDisplay.Enabled});
			this.viewModel.orderNotes = new BaseFormField({ required: false, value: "", visible: config.ShoppingCheckoutConfig.DisplayOrderNotesField});

			if(this.state.forceShippingSameAsBilling){
				this.state.shippingSameAsBilling = true;
				//delete this.viewModel.shippingContact;
			}

			state.allowZeroDollarTransactions = config.ShoppingCheckoutConfig.AllowZeroDollarTransactions;
            
			// update billing
			billingContact.country.setOptions(config.Countries, "Code", "Name", config.GeneralConfig.DefaultCountryCode);
			billingContact.state.setOptions(config.States, "Abbreviation", "Name");
			
			// update shipping
			shippingContact.country.setOptions(config.Countries, "Code", "Name", config.GeneralConfig.DefaultCountryCode);
			shippingContact.state.setOptions(config.States, "Abbreviation", "Name");

			//  Disable or enable various fields based on admin panel settings
			billingContact.middleName.visible = config.BillingShippingConfig.DisplayMiddleNameField;
			billingContact.middleName.required = false;
			shippingContact.middleName.visible = config.BillingShippingConfig.DisplayMiddleNameField;
			shippingContact.middleName.required = false;
			shippingContact.email.visible = shippingContact.email.required = config.BillingShippingConfig.DisplayShippingEmailField;
			billingContact.confirmEmail.visible = billingContact.confirmEmail.required = config.BillingShippingConfig.DisplayBillingEmailConfirmationField;
			billingContact.birthday.visible = billingContact.birthday.required = config.BillingShippingConfig.BillingDateOfBirthRequired;

			var load = checkoutService.loadCheckoutPage();

			if(this.viewModel.showTitles) {
				load.then(angular.bind(this, this.loadTitles));
			}
			if(this.viewModel.showSuffixes) {
				load.then(angular.bind(this, this.loadSuffixes));
			}

			load.then(angular.bind(this, this.updateCheckoutPage));
		},

		updateCheckoutPage : function(data) {
			this.updateCart();
			this.viewModel.deliveryOption = checkoutService.getDeliveryOption();
			
			this.viewModel.orderContacts = this.formatContacts(checkoutService.getOrderContacts());
			this.state.isIndirectPaymentProvider = this.viewModel.cart.CheckoutOptions.IsIndirectPaymentProvider;
			this.state.allowStorePaymentInformation = checkoutService.getAllowStorePaymentInformation();			

			var billingContact = checkoutService.getBillingContact();
			this.viewModel.billingContact.firstName.value = billingContact.FirstName.Value;
			this.viewModel.billingContact.lastName.value = billingContact.LastName.Value;
			this.viewModel.billingContact.street1.value = billingContact.StreetAddress1.Value;
			this.viewModel.billingContact.street2.value = billingContact.StreetAddress2.Value;
			this.viewModel.billingContact.city.value = billingContact.City.Value;
			this.viewModel.billingContact.state.value = billingContact.State.Value;
			this.viewModel.billingContact.zipCode.value = billingContact.PostalCode.Value;
		    if (billingContact.Country.Value) { //  Keep default value if this one isn't set
		    	this.viewModel.billingContact.country.value = billingContact.Country.Value;
			    this.viewModel.billingContact.country.change(true);
		    }
		    this.viewModel.billingContact.phone.value = billingContact.PhoneNumber.Value;
			this.viewModel.billingContact.mobile.value = billingContact.MobileNumber.Value;
			this.viewModel.billingContact.email.value = billingContact.EmailAddress.Value;
			if(this.viewModel.billingContact.confirmEmail.visible ){
				this.viewModel.billingContact.confirmEmail.value = billingContact.EmailAddress.Value;
			}

			if(billingContact.State.Value){
				this.viewModel.billingContact.state.value = billingContact.State.Value;
				this.viewModel.billingContact.state.change(true);
			}else{
				this.viewModel.billingContact.selectDefaultState();
			}

			this.viewModel.billingContact.state.onStateChange = angular.bind(this, function(){
				if(billingContact.State.Value){
					this.viewModel.billingContact.state.value = billingContact.State.Value;
					this.viewModel.billingContact.state.change();
				}
			});
			
			if(!this.state.forceShippingSameAsBilling && billingContact.FirstName.Value !== ''){
				this.state.shippingSameAsBilling = billingContact.ShippingSameAsBilling;
			}		
		    
		    // get teh shipping contact
            var shippingContact = checkoutService.getShippingContact();
			this.viewModel.shippingContact.firstName.value = shippingContact.FirstName.Value;
			this.viewModel.shippingContact.lastName.value = shippingContact.LastName.Value;
			this.viewModel.shippingContact.street1.value = shippingContact.StreetAddress1.Value;
			this.viewModel.shippingContact.street2.value = shippingContact.StreetAddress2.Value;
			this.viewModel.shippingContact.city.value = shippingContact.City.Value;
			this.viewModel.shippingContact.state.value = shippingContact.State.Value;
			this.viewModel.shippingContact.zipCode.value = shippingContact.PostalCode.Value;
			
			if (shippingContact.Country.Value) { //  Keep default value if this one isn't set
				this.viewModel.shippingContact.country.value = shippingContact.Country.Value;
				this.viewModel.shippingContact.country.change(true);
		    }
		    this.viewModel.shippingContact.phone.value = shippingContact.PhoneNumber.Value;
			this.viewModel.shippingContact.mobile.value = shippingContact.MobileNumber.Value;
			this.viewModel.shippingContact.email.value = shippingContact.EmailAddress.Value;
			if(this.viewModel.shippingContact.confirmEmail.visible ){
				this.viewModel.shippingContact.confirmEmail.value = shippingContact.EmailAddress.Value;
			}

			this.onShippingSameAsBillingChange();
			
			if(shippingContact.State.Value){
				this.viewModel.shippingContact.state.value = shippingContact.State.Value;
				this.viewModel.shippingContact.state.change();
			}else{
				this.viewModel.shippingContact.selectDefaultState();
			}

		    this.viewModel.shippingContact.state.onStateChange = angular.bind(this, function() {
		        if (shippingContact.State.Value) {
		            this.viewModel.shippingContact.state.value = shippingContact.State.Value;
		            this.viewModel.shippingContact.state.change();
		        }
		    });

            this.viewModel.shippingContact.toggleFields(data.ShippingFieldAttributes);
            
			this.viewModel.orderNotes.value = checkoutService.getOrderNote();

			this.state.showTotalDueNow = this.viewModel.cart.Totals.TotalAmountDueDisplay != this.viewModel.cart.Totals.TotalDisplay;
			
			this.viewModel.showUsePass = checkoutService.defaultToPassAsBilling();

			if (this.viewModel.cart.Totals.Total <= 0 && this.state.allowZeroDollarTransactions) {
				checkoutService.disableEndorsement();
			}
			
			if(this.viewModel.checkoutConfig.ShippingOptions && this.viewModel.checkoutConfig.ShippingOptions.length === 1){
				
				// Id
				this.viewModel.deliveryOption = this.viewModel.checkoutConfig.ShippingOptions[0];
				this.changeDeliveryOption();
			}	

			if(this.state.showTermsAndConditions){								
				this.viewModel.termsAndConditions.value	= checkoutService.isTermsandconditionChecked();
			}		

			state.loading = false;
			
			if(checkoutService.isGiftedPurchase()){
				this.viewModel.personalMessage.visible = true;
				this.viewModel.personalMessage.value = checkoutService.getPersonalMessage();
			}
		},

		loadTitles : function(){
			return checkoutService.loadTitles().then(angular.bind(this, function(titles){
				if(titles && titles.length)
				{
					this.viewModel.billingContact.title.visible = true;
					this.viewModel.billingContact.title.setOptions(titles, 'Id','Name');

					this.viewModel.shippingContact.title.visible = true;
					this.viewModel.shippingContact.title.setOptions(titles, 'Id','Name');
				}
			}));
		},

		loadSuffixes : function(){
			return checkoutService.loadSuffixes().then(angular.bind(this, function(suffixes){
				if(suffixes && suffixes.length)
				{
					this.viewModel.billingContact.suffix.visible = true;
					this.viewModel.billingContact.suffix.setOptions(suffixes, 'Id','Name');

					this.viewModel.shippingContact.suffix.visible = true;
					this.viewModel.shippingContact.suffix.setOptions(suffixes, 'Id','Name');
				}
			}));
		},
		
		updateCart : function() {
			this.viewModel.cart = checkoutService.getCart();
			state.loading = false;
		},
 
        keyevent : function(data) {
			return;
			
            //var event = data.event;
            //var code = data.code.toLowerCase();
		
            //if(event.keyCode === 38 || event.keyCode === 40) {
            //    switch(code) {
            //        case "expirationmonth":
			//			if(checkForNgNull(event.target.value)){
	        //                checkoutFormViewModel.payment.ExpirationMonth = event.target.value;
			//				checkoutFormViewModel.payment.ExpirationMonthError = false;
			//			}
            //            break;
            //        case "expirationyear":
			//			if(checkForNgNull(event.target.value)){
	        //                checkoutFormViewModel.payment.ExpirationYear = event.target.value;
			//				checkoutFormViewModel.payment.ExpirationYearError = false;
			//			}
            //            break;
            //        case "deliverymethod":
			//			if(checkForNgNull(event.target.value)){
	        //                checkoutFormViewModel.deliveryOption.Id = event.target.value;
	        //                this.changeDeliveryOption();
			//			}
            //            break;
            //    }
            //}
        },
        
		matchDeliveryOptions : function() {
			angular.forEach(this.viewModel.checkoutConfig.ShippingOptions, function(option) {
				if(checkoutFormViewModel.deliveryOption.Id == option.Id) {
					checkoutFormViewModel.deliveryOption.Name = option.Name;
				}
			});
		},

		changeDeliveryOption : function() {
			state.loading = true;
			checkoutFormViewModel.deliveryOption.deliveryMethodIdError = false;
			this.matchDeliveryOptions();
			checkoutService.processDeliveryMethod(this.viewModel.deliveryOption).then(angular.bind(this, this.onUpdateDeliveryMethodComplete));
		},

		onUpdateDeliveryMethodComplete: function (res) {
		    var shippingFields = checkoutService.getShippingFieldAttributes();
		    this.viewModel.shippingContact.toggleFields(shippingFields);
            this.updateCart();
        },

		submit : function() {
			state.loading = true;

			if(this.state.forceShippingSameAsBilling){
				this.viewModel.forceShippingSameAsBilling = true;				
			}else{			
				this.viewModel.billingContact.ShippingSameAsBilling = this.state.shippingSameAsBilling;
				this.viewModel.shippingContact.ShippingSameAsBilling = this.state.shippingSameAsBilling;
			}

			var vm = this.viewModel;
		
			//  Do all validations regardless of whether one is false or no
			var valid1 = state.isIndirectPaymentProvider || checkoutService.validate();
			var valid2 = billingContact.validate(true);
			var valid3 = this.state.forceShippingSameAsBilling || this.state.shippingSameAsBilling || shippingContact.validate(); 
			var valid4 = !state.showTermsAndConditions || this.viewModel.termsAndConditions.validate();
			var valid5 = !(billingContact.confirmEmail.error = billingContact.confirmEmail.required && billingContact.confirmEmail.value !== billingContact.email.value);
			var valid = valid1 && valid2 && valid3 && valid4 && valid5;		
			
			if (!this.viewModel.deliveryOption.deliveryMethodId) {
				valid = false;
				this.viewModel.deliveryOption.deliveryMethodIdError = true;
			} else {
				this.viewModel.deliveryOption.deliveryMethodIdError = false;
			}

			if (valid) {
				if (this.state.showReviewPaymentPlan) {
					state.loading = true;
					checkoutService.submit(vm).then(angular.bind(this, this.processSubmitResults));
				} else {
					CommunicatorService.send('guestNamePrompt');
				}
			}else{
				state.loading = false;
			}
		},
		
		processSubmitResults : function(result) {
			if (result.success) {
				if (!this.state.showReviewPaymentPlan) {

					this.viewModel.errorMessage = '';
					// clear the Terms&Condition from StorageService
					checkoutService.setTermsandconditionChecked(false);

					if (state.isIndirectPaymentProvider && this.viewModel.useCreditAccount == "0"){
						pageStateService.go('paymentPost');
					} else if (state.isIndirectPaymentProvider && this.viewModel.useCreditAccount == "1"){
						pageStateService.go("orderConfirmation");	
					} else if (!state.isIndirectPaymentProvider) {
						pageStateService.go('orderConfirmation');
					} else {
						pageStateService.go('paymentPost');
					}
				} else {
					pageStateService.go("paymentPlanAgreement");
				}
			} else {
				state.loading = false;
				this.viewModel.errorType = result.errorType;
				this.viewModel.errorMessage =  result.errorMessage;
								
				if(result.errorType == 'paymentrecordserror'){
					var  msg = result.errorMessage.split('=');
					var qs = {'oid': msg[1] };
					pageStateService.go('paymentRecordsError', qs);
				}else{
					CommunicatorService.send('confirmCancel');
				}
			}
		},
		
		fieldChange : function(field) {
			delete field.error;
		},
		
		formatContacts : function(orderContacts){
			angular.forEach(orderContacts, function(contact){
				contact.Postal = contact.PostalCode;
				contact.Street1 = contact.StreetAddress1;
				contact.Street2 = contact.StreetAddress2;
				delete contact.PostalCode;
				delete contact.StreetAddress1;
				delete contact.StreetAddress2;
			});
			return orderContacts;
		},
		
		link : function(contact){
			
			if(state.linkedContact && state.linkedContact.Id === contact.Id){
				billingContact.firstName.value = "";
				billingContact.lastName.value = "";
				billingContact.street1.value = "";
				billingContact.street2.value = "";
				billingContact.city.value = "";
				billingContact.country.value = "";
				billingContact.state.value = "";
				billingContact.zipCode.value = "";
				billingContact.email.value = "";
				billingContact.phone.value = "";
				billingContact.mobile.value = "";
				
				shippingContact.firstName.value = "";
				shippingContact.lastName.value = "";
				shippingContact.street1.value = "";
				shippingContact.street2.value = "";
				shippingContact.city.value = "";
				shippingContact.country.value = "";
				shippingContact.state.value = "";
				shippingContact.zipCode.value = "";
				shippingContact.email.value = "";
				shippingContact.phone.value = "";
				shippingContact.mobile.value = "";
				
				state.linkedContact = null;
				
				checkoutService.setContactIds(null);
				this.viewModel.usePassAsBilling = false;

			}else{
				state.linkedContact = contact;
				billingContact.firstName.value = contact.FirstName;
				billingContact.firstName.change();
				billingContact.lastName.value = contact.LastName;
				billingContact.street1.value = contact.Street1;
				billingContact.street2.value = contact.Street2;
				billingContact.city.value = contact.City;
				billingContact.country.value = contact.CountryCode;
				billingContact.state.value = contact.State;
				billingContact.zipCode.value = contact.Postal;
				billingContact.email.value = contact.EmailAddress;
				billingContact.phone.value = contact.PhoneNumber;
				billingContact.mobile.value = contact.MobileNumber;
				
				shippingContact.firstName.value = contact.FirstName;
				shippingContact.firstName.change();
				shippingContact.lastName.value = contact.LastName;
				shippingContact.street1.value = contact.Street1;
				shippingContact.street2.value = contact.Street2;
				shippingContact.city.value = contact.City;
				shippingContact.country.value = contact.CountryCode;
				shippingContact.state.value = contact.State;
				shippingContact.zipCode.value = contact.Postal;
				shippingContact.email.value = contact.Email;
				shippingContact.phone.value = contact.PhoneNumber;
				shippingContact.mobile.value = contact.MobileNumber;
				
				checkoutService.setContactIds(contact.Id);
				this.viewModel.usePassAsBilling = true;
			}

			billingContact.country.change(true);
			billingContact.state.change(true);
			shippingContact.country.change(true);
			shippingContact.state.change(true);
			
			billingContact.clearErrors();
			shippingContact.clearErrors();
		},
		
		onShippingSameAsBillingChange : function(){
			billingContact.doBind = this.state.shippingSameAsBilling;
			if(this.state.shippingSameAsBilling){
				billingContact.updateDependency();
			}
		},
		
		onTermsandconditionChanged : function(){			
			checkoutService.setTermsandconditionChecked(this.viewModel.termsAndConditions.value);
		},

		showTermsAndConditions : function() {
		    CommunicatorService.send("termsAndConditions");
		},
		
		showCVVHelp : function(){
			CommunicatorService.send("cvvHelp");
		},
		
		changeCreditAccount : function(){

			if(this.viewModel.useCreditAccount == "1"){
				checkoutService.disableEndorsement();	
			}	
		},
		
		bindCheckoutCalls : function(){
			
			var vm = this.viewModel;
			
			//  The guest names controller will inform us when it is loaded so we can hide the spinners
			CommunicatorService.receive('guestNamePromptIsLoaded', angular.bind(this, function() {
				state.loading = false;
			}));
			
			CommunicatorService.receive('guestNamePromptAction', angular.bind(this, function(guestNamesValid) {
				if (guestNamesValid) {
					if (checkoutService.showOrderConfirmationPrompt()) {
						state.loading = false;
						CommunicatorService.send('confirmationPrompt', { billingContact: billingContact, shippingContact: shippingContact });
					} else {
						state.loading = true;
						checkoutService.submit(vm).then(angular.bind(this, this.processSubmitResults));
					}
				} else {
					state.loading = false;
				}
			}));
			
			CommunicatorService.receive('confirmationPromptAction', angular.bind(this, function(success){
				
				if (success) {
					state.loading = true;
					checkoutService.submit(vm).then(angular.bind(this, this.processSubmitResults));
				}
			}));
		}
	});

	return new CheckoutFormController($scope);

}]);

GTS.checkoutForm.factory('checkoutFormViewModel', ['baseViewModel', 'TextFormField',function(baseViewModel, TextFormField){
	var viewModel = angular.extend({
		expirationMonths : [{ id : 1, name : 'January' },{id : 2,name : 'February'},{ id : 3, name : 'March' },{ id : 4, name : 'April' },{id : 5,name : 'May'},{id : 6,name : 'June'},{id : 7,name : 'July'},{ id : 8,name : 'August'},{ id : 9, name : 'September'}, { id : 10, name : 'October'},{ id : 11,name : 'November' },{ id : 12, name : 'December' }],
		expirationYears : [{id : 2015}, {id : 2016}, {id : 2017}, {id : 2018}, {id : 2019}, {id : 2020},{id : 2021}, {id : 2022}, {id : 2023}, {id : 2024}],
		billingContact : {},
		shippingContact : {},
		endorsement : {},
		deliveryOption : {},
		cart : { total : 0, subTotal: 0, tax: 0, shipping: 0 },
		errorMessage : '',
		errorType : 'none',
		usePassAsBilling : false,
		personalMessage : new TextFormField({visible : false}),
		termsandconditionChecked: false,

		showTitles : true,
		showSuffixes : true

	}, baseViewModel);
	
	return viewModel;
}]);

GTS.confirmationPrompt.controller('confirmationPromptController', [
	
	'BaseController','baseViewModel','$scope','classify','ModalController','checkoutService','formatterService','CommunicatorService', function(
	 BaseController,      viewModel,  $scope,  classify,  ModalController,  checkoutService,  formatterService,  CommunicatorService){
		 
	var state = {
		showModal : false,
		loading : false
	};
	
	var ConfirmationPromptController = classify(BaseController, [ModalController, {
		
		state: state,
		viewModel : viewModel,
		registrations : ['closeModal', 'confirm', 'cancel'],
		listeners : {
			'confirmationPrompt' : 'openModal',
			'confirmCancel' : 'closeModal'
		},
		
		onModalOpen : function(contacts){
			var payment = checkoutService.getPayment(),
				cart = checkoutService.getCart();
			
			viewModel.billingContact = contacts.billingContact;
			viewModel.shippingContact = contacts.shippingContact;
			
			if(payment.Endorsement){
				viewModel.maskedEndorsement = formatterService.maskCreditCard(payment.Endorsement);
			}			
			
			viewModel.deliveryMethod = checkoutService.getDeliveryMethod();
			viewModel.total = cart.Totals.TotalDisplay;
			viewModel.isZero = cart.Totals.Total <= 0;
			state.loading = false;
		},
		
		onModalClose : function(){	
			CommunicatorService.send('confirmationPromptAction', false);
		},
		
		confirm : function(){
			state.loading = true;
			CommunicatorService.send('confirmationPromptAction', true);
		},
		
		cancel : function(){
			this.closeModal();
		}
		
	}]);
	
	return new ConfirmationPromptController($scope);

}]);

GTS.confirmationPrompt.factory('confirmationPromptViewModel', ['baseViewModel', function(baseViewModel){
	return angular.extend({
		
		billingContact : {},
		shippingContact : {}
		
	}, baseViewModel);
}]);

GTS.cvvHelp.controller('cvvHelpController', [
	
	'BaseController','$scope','classify','ModalController', 'baseViewModel', function(
	 BaseController,  $scope,  classify,  ModalController,   baseViewModel){

	var state = { loading: false };
		 
	var CvvHelpController = classify(BaseController, [ModalController, {
		
		viewModel : baseViewModel,
		
		registrations : ['closeModal', 'ok'],

		state : state,	//  Always false
		
		onModalOpen : function(){
			state.loading = false;
		},
		
		listeners : {
			'cvvHelp' : 'openModal'
		},
		
		ok : function(){ 
			
			this.closeModal();
		}
		
	}]);
	
	return new CvvHelpController($scope);

}]);

GTS.dateSpecificModalApi.factory('DateSpecificModalApiController',  ['CommunicatorService','dateUtilService','classify', 'DateSpecificModalController', 'dateSpecificModalApiService', 
	function(CommunicatorService, dateUtilService, classify, DateSpecificModalController, dateSpecificModalApiService){
	
	var DateSpecificModalApiController = classify(DateSpecificModalController, {
		
		dates : [],
		inverse  : true,
		currentDateObject : {},
		
		salesChannelDetailId : null,
		registrations : ['closeModal','selectDay','back','nextMonth','prevMonth','changeMonth','changeYear','back','selectTime','disableMonth', 'getMonthName'],
		
		listeners : {
			'dateSpecificModalApi.get' : 'openModal'
		},
		
		state : {
				loading :true,
				showModal : false
			},
		
		onModalOpen : function(params){
			dateSpecificModalApiService.getBlockoutDates(params.plu).then(angular.bind(this, function(blockoutDates){
				// covert block out dates to dateObject
				this.dates = blockoutDates;
				this.salesChannelDetailId = params.salesChannelDetailId;
				this.loadCurrentMonth();
			}));	
		},
		
		getMonthName : function(monthIndex){
			return dateUtilService.getMonthName(monthIndex);
		},
		
		changeMonth : function(oldMonth){
			var dateObject = {
				year : this.viewModel.calendar.year,
				month : this.viewModel.calendar.month,
				date : 1,
			},
				skip = false;
			
			if(dateSpecificModalApiService.inPast(dateObject, true)){				
				this.viewModel.calendar.month = parseFloat(oldMonth);
				skip = true;
			}
			
			if(dateSpecificModalApiService.isPastEndDate(dateObject)){
				this.viewModel.calendar.month = parseFloat(oldMonth);
				skip = true;
			}
			
			if(!skip){
				dateSpecificModalApiService.getCalendar(dateObject).then(angular.bind(this, function(response){
					this.updateDisplay(response, dateObject);
				}));	
			}
		},
		
		changeYear : function(){
			var dateObject = {
				year : this.viewModel.calendar.year,
				month : this.viewModel.calendar.month,
				date : 1,
			};
			dateSpecificModalApiService.getCalendar(dateObject).then(angular.bind(this, function(response){
				this.updateDisplay(response, dateObject);
			}));
		},
		
		nextMonth : function(){
			this.getNextPrevMonth(true);
		},
		
		prevMonth : function(){
			this.getNextPrevMonth(false);
		},
		
		getNextPrevMonth : function(dir){
			
			var current = null;
			if(this.viewModel.calendar) {
			    current = {
			        year: this.viewModel.calendar.year,
			        month: this.viewModel.calendar.month,
			        date: 1
			    };
			}

			var dateObject = dateSpecificModalApiService.getNextPrevMonth(dir, current);
			dateSpecificModalApiService.getCalendar(dateObject).then(angular.bind(this, function(response){
				this.updateDisplay(response, dateObject);
			}));
		},
		
		loadCurrentMonth : function(startDate){
			var dateObject = {};
			
			if (startDate){
				dateObject = startDate;
			}else{
				dateObject = dateSpecificModalApiService.getCurrentDate();				
			}

			dateSpecificModalApiService.getCalendar(dateObject).then(angular.bind(this, function(response){
				this.updateDisplay(response, dateObject);
			}));
		},
		
		updateDisplay : function(response, dateObject){
			var days = dateSpecificModalApiService.formatDays(response.calendar);

			dateSpecificModalApiService.mark(this.dates, days, this.inverse);
			
			this.viewModel.calendar = {
				days : days,
				month : response.month,
				year : response.year,
				years : response.years
			};
			
			this.viewModel.disabledPrev = dateSpecificModalApiService.disablePrev(dateObject);
			this.viewModel.disabledNext = dateSpecificModalApiService.disableNext(dateObject);
			this.state.loading = false;
		},
		
		selectDay : function(day){		
			if (day.available && !day.pre && ! day.post){
				dateSpecificModalApiService.setDay(day, this.salesChannelDetailId).then(angular.bind(this, function(response){
					day.formattedEventInfo = response.formattedEventInfo;
					this.closeModal(day);
				}));
			}	
		},
		
		// Shared by event and date specific calendars
		closeModal : function(day){
			this.state.dateSelected = false;
			var event = null;
			if(day){
				if (day.dateTime)
				{
					event = day;
				}else{
					event = {
						dateTime : day + "T",
						formattedEventInfo : day.formattedEventInfo		
					};
				}
			}
			DateSpecificModalController.prototype.closeModal.apply(this, arguments);
			CommunicatorService.send('upsellModal.resume', event);
		},
		
		disableMonth : function(month){
			if(this.viewModel.calendar){
				var dateObject = {
					year : parseFloat(this.viewModel.calendar.year),
					month : month,
					date : 1
				};
							
				return dateSpecificModalApiService.inPast(dateObject, true) || dateSpecificModalApiService.isPastEndDate(dateObject);
			}else{return true;}
		},
		
		disableYear : function(year){
			var dateObject = {
				year : year,
				month : parseFloat(this.viewModel.calendar.month),
				date : 1
			};
			return dateSpecificModalApiService.inPast(dateObject, true) || dateSpecificModalApiService.isPastEndDate(dateObject);
		}
		

	});
	
	return DateSpecificModalApiController;
	
}]);

GTS.dateSpecificModalApi.controller('dateSpecificModalApiInstance', ['classify', 'DateSpecificModalApiController', '$scope', 
	function(classify, DateSpecificModalApiController, $scope){
	
	var DateSpecificModalApiInstance = classify(DateSpecificModalApiController, {
	

	});
	
	return new DateSpecificModalApiInstance($scope);
	
}]);

GTS.dateSpecificModalApi.factory('dateSpecificModalApiService', ['classify', 'apiService', '$q','dateUtilService',function(classify, apiService, $q, dateUtilService){
	var dateSpecificModalApiService = classify({
		
		targetDateObject : null,
	
		
		getCurrentDate : function(){
			
			return dateUtilService.getCurrentDate();
		},
		
		getNextPrevMonth : function(dir, object){
			
			if(object) this.targetDateObject = object;			
			
			this.targetDateObject = dateUtilService.getNextPrevMonth(dir, this.targetDateObject);
			return this.targetDateObject;
		},
		
		getCalendar : function(date){
			
			date.year = parseFloat(date.year);
			date.month = parseFloat(date.month);
			
			var request = $q.defer(),
				calendar = dateUtilService.getUnmarkedCalendar(date);
				
			var data = {
				calendar : calendar,
				month : date.month,
				year : date.year,
				years : dateUtilService.getYears()
			};
				
			request.resolve(data);
			
			return request.promise;
		},
		
		formatDays : function(cal){
			
			var days = [];
			
			angular.forEach(cal, function(row){
				angular.forEach(row, function(day){
					if(!day.disabled && !day.past){
						day.available = true;
					}
					days.push(day);
				});
			});
			
			return days;
		},
		
		setDay : function(day, salesChannelDetailId){
			var formattedDay = dateUtilService.format(day);
			
			var request = $q.defer();
				
			 apiService.setDateSpecificDay(formattedDay, salesChannelDetailId).then(function(data){
				var response = {
					formattedEventInfo : data.data	
				};
				
				request.resolve(response);
			 });

			 return request.promise;
			 
		},
		
		formatDay : function(day){
			return dateUtilService.format(day);
		},
		
		getBlockoutDates: function(plu){
			var request = $q.defer();
		
			var blockoutDates = apiService.getBlockoutDates(plu).then(function(response){
				var dates = [];
				
				angular.forEach(response.data.BlockoutDates, function(blockoutDate){
					dates.push(dateUtilService.getDateObject(blockoutDate));								
				});
				request.resolve(dates);
			});
			
			return request.promise;			
		},
		
		mark : function(targetDays, calendarDays, inverse){
			angular.forEach(calendarDays, function(day){
				var marked = false;
				angular.forEach(targetDays, function(blockoutDate){
					if(marked){
						return false;
					}
					if(day.pre){
						marked = true;
						day.available = false;
						return false;
					}
					// if inverse, we are marking days as unavailable
					if(inverse){		
						if (blockoutDate.year === day.year && blockoutDate.month === day.month && blockoutDate.date === day.date){
							day.available = false;
							marked = true;
						}
						// otherwise mark days as available	
					}else{
						day.available = (blockoutDate.year === day.year && blockoutDate.month === day.month && blockoutDate.date === day.date);
						if(day.available){
							marked = true;
						}
					}				
				});
			}, this);
		},
		
		inPast : function(date, endOfMonth){
			if(endOfMonth){
				date.date = dateUtilService.getMonthNumDays(date.month, date.year);
			}
			
			return dateUtilService.inPast(date);
		},
		
		isPastEndDate: function(date, flag){
			return dateUtilService.isPastEndDate(date, flag);
		},
		
		disablePrev : function(current){
			var prev = dateUtilService.getNextPrevMonth(false, angular.extend({}, current));
			return this.inPast(prev, true);
		},
		
		disableNext : function(current){
			var next = dateUtilService.getNextPrevMonth(true, angular.extend({}, current));
			return this.isPastEndDate(next, true);
		}
	});	
	
	return new dateSpecificModalApiService();
}]);

GTS.dateSpecificModal.factory('DateSpecificModalController', [	
	'classify','ResponderModalController','BaseViewModel','DateSpecificModalService','CommunicatorService',function(
	 classify,  ResponderModalController,  BaseViewModel,  DateSpecificModalService,  CommunicatorService){
		
		var DateSpecificModalController = classify(ResponderModalController, {
			
			state : {
				dateSelected : false,
				showModal : false
			},
			
			registrations : ['closeModal','selectDay','back','nextMonth','prevMonth','changeMonth','changeYear','back','selectTime'],
			
			_constructor : function(){
				this.service = new DateSpecificModalService();
				this.viewModel = new BaseViewModel();
				ResponderModalController.prototype._constructor.apply(this, arguments);
			},
			id : 'date',
			
			listeners : {
				'dateSpecificModal.get' : 'openModal',
				'dateSpecificModal.clear' : 'clearEvent'
			},
			
			onModalOpen : function(item){
				
				console.log('open!', this);
							
				this.service.getData(item).then(angular.bind(this, this.updateDisplay, null));
			},
			
			clearEvent : function(item){
				this.service.clearEvent(item).then(angular.bind(this, function(viewItemsData){
					CommunicatorService.send('dateSpecificModal.clearDone', viewItemsData);
				}));
			},
			
			updateDisplay : function(item, calendar){
				// successful response
				if(calendar){
					if(calendar.success !== false){
						this.viewModel.noEvents = false;
						this.viewModel.calendar = calendar;
					}else{
						this.closeModal();
						CommunicatorService.send('egalaxyError');
					}
				}else{
					this.viewModel.noEvents = true;	
				}
					
				this.state.loading = false;
			},
			
			selectDay : function(day){
				if((day.available || day.selected) && day.target){
					this.state.loading = true;
					this.service.selectDay(day, this.viewModel.calendar.calendarSelector).then(angular.bind(this, function(viewItemsData){
						CommunicatorService.send('dateSpecificModal.done', viewItemsData);
						this.closeModal();
					}));
				}
			},
			
			nextMonth : function(){
				this.state.loading = true;
				this.service.nextMonth(this.viewModel.calendar.next).then(angular.bind(this, this.updateDisplay, null));
			},
	
			prevMonth : function(){
				this.state.loading = true;
				this.service.prevMonth(this.viewModel.calendar.prev).then(angular.bind(this, this.updateDisplay, null));
			},
			
			changeMonth : function(){
				this.state.loading = true;
				var data = this.getMonthYear();
				data.monthSelect = this.viewModel.calendar.monthSelect.name;
				data.yearSelect = this.viewModel.calendar.yearSelect.name;
				this.service.changeMonth(data).then(angular.bind(this, this.updateDisplay, null));	
			},
			
			changeYear : function(){
				this.state.loading = true;
				var data = this.getMonthYear();
				data.monthSelect = this.viewModel.calendar.monthSelect.name;
				data.yearSelect = this.viewModel.calendar.yearSelect.name;
				this.service.changeYear(data).then(angular.bind(this, this.updateDisplay, null));
			},
			
			getMonthYear : function(){
				var month = this.viewModel.calendar.month || '',
					year = this.viewModel.calendar.year || '';
				if(!month){
					angular.forEach(this.viewModel.calendar.months, function(m){
						if(m.selected){
							month = m.value;
						}
					});
				}
				if(!year){
					angular.forEach(this.viewModel.calendar.years, function(y){
						if(y.selected){
							year = y.value;
						}
					});
				}
				return {
					month : month,
					year : year
				};
			}
			
			
		});
		
		return DateSpecificModalController;
	}
]);

GTS.dateSpecificModal.controller('dateSpecificModalInstance', [
	
	'$scope','classify','DateSpecificModalController',function(
	 $scope,  classify,  DateSpecificModalController){
	
		var DateSpecificModalInstance = classify(DateSpecificModalController, {
			
			
		});
		
		return new DateSpecificModalInstance($scope);
	}
]);

GTS.dateSpecificModal.factory('DateSpecificModalParser', [
	'classify',function(classify){
		
		var DateSpecificModalParser = classify({
			
			selector : '#Calendar',
			model : {},
			
			parse : function(htmlArray){
				
				var html = $(htmlArray).find(this.selector+" #CalendarSelector");
				if(!html){
					return null;
				}
				
				this.getCalendarSelector(html, this.model);
				this.getControls(html, this.model);
				this.getYears(html, this.model);
				this.getMonths(html, this.model);
				this.getDays(html, this.model);
				this.getControls(html, this.model);
				return this.model;
			},
			
			getCalendarSelector : function(html, model){
				var content = $(html),
					cal = content.find('table[title="Calendar"]'),
					selector = $(cal).attr('id');
					
				if(selector){
					model.calendarSelector = selector ? selector.replace(new RegExp('_', 'g'), '$') : null;
				}
			},
	
			getMonths : function(modalHTML, CalendarModel){
				var months = [],
					monthSelect = $(modalHTML.find('select')[0]);
				if(monthSelect.length){
					CalendarModel.monthSelect = {
						name : monthSelect.attr('name'),
						id : monthSelect.attr('id')
					};
					angular.forEach(monthSelect.find('option'), function(option){
						months.push({
							value : option.value,
							text : $(option).text(),
							selected : option.selected
						});
					});
					CalendarModel.months = months;
				}
			},
	
			// get the years from the html
			getYears : function(modalHTML, CalendarModel){
				var years = [],
					yearSelect = $(modalHTML.find('select')[1]);
				if(yearSelect.length) {
				    CalendarModel.yearSelect = {
				        name: yearSelect.attr('name'),
				        id: yearSelect.attr('id')
				    };
					angular.forEach(yearSelect.find('option'), function(option){
						years.push({
							value : option.value,
							text : $(option).text(),
							selected : option.selected
						});
					});
					CalendarModel.years = years;
				}
			},
	
			// grab the days from the html
			getDays : function(modalHTML, CalendarModel){
	
				var days = modalHTML.find('.Calendar').find('td'),
					targetDays = [],
					dayHeaders = modalHTML.find('.Calendar').find('th'),
					targetDayHeaders = [];
				angular.forEach(dayHeaders, function(dayHeader) {
					targetDayHeaders.push($(dayHeader).text());
				});
				angular.forEach(days, function(day, ind){
					day = $(day);
					ind = {};
					ind.date = day.text();
					ind.other = day.hasClass('OtherMonthDay');
					ind.available = (day.hasClass('DayAvailable') || day.hasClass("SelectedDay")) && day.find('a').length > 0;
					ind.selected = day.hasClass('SelectedDay');

					if($(day).hasClass('OtherMonthDay')){
						ind.other = true;
					}else{
						ind.date = day.text();
						if ((day.hasClass('DayAvailable') || day.hasClass("SelectedDay")) && day.find('a').length > 0) {
							ind.available = true;
							ind.target = day.find('a').attr('href').split(',')[1].split('\'')[1];
						}else if(day.hasClass('SelectedDay')){
						}
					}
					targetDays.push(ind);
				});
				CalendarModel.days = targetDays;
				CalendarModel.dayHeaders = targetDayHeaders;
			},
	
			getControls : function(modalHTML, CalendarModel){
				
				var prev = modalHTML.find('input[type="image"][alt="PreviousMonth"]')[0],
					next = modalHTML.find('input[type="image"][alt="NextMonth"]')[0];
					
				CalendarModel.prev = {
					name : prev.name,
					id : prev.id
				};
				CalendarModel.next = {
					name : next.name,
					id : next.id
				};
			}
			
		});
		
		return DateSpecificModalParser;
	
	}
]);

GTS.dateSpecificModal.factory('DateSpecificModalService', ['classify','ViewItemsPostBackService','DateSpecificModalParser','$q',function(classify,ViewItemsPostBackService,DateSpecificModalParser,$q){
	
	var DateSpecificModalService = classify({
		
		postBackService : new ViewItemsPostBackService(new DateSpecificModalParser()),

		getData : function(item){			
			return this.postBackService.getData(item);
		},
		
		selectDay : function(day, selector){
			return this.postBackService.selectDay(day, selector);
		},
		
		nextMonth : function(next){
			return this.postBackService.nextMonth(next);
		},

		prevMonth : function(prev){
			return this.postBackService.prevMonth(prev);
		},
		
		changeMonth : function(month){
			return this.postBackService.changeMonth(month);
		},
		
		changeYear : function(my){
			return this.postBackService.changeYear(my);
		},
		
		clearEvent : function(data){
			return this.postBackService.clearEvent(data);
		}
		
	});
	
	return DateSpecificModalService;
	
}]);

/*
	
	DonationType
	
	0 = None
	1 = OptInRoundUp = User can add the donation, and it is the amount needed to round the donation to the nearest whole dollar amount.
					   For instance, if the order amount is 21.36, then the donation is .64, because that brings the transaction up to $22.00 (whole number)
	2 = OptInEditable = User can enter a donation amount between the minimum and maximum amount and add it to their cart
	3 = OptInFixed = User can add a non-editable, predefined donation amount to their cart.
	4 = OptOut = The donation is automatically added to the cart, and the user must click a button to remove it
	
*/

GTS.donation.controller('DonationController',
			['$scope', 'classify', 'BaseController', 'BaseViewModel', 'DonationService', 'BaseFormField',
	function ($scope,   classify,   BaseController,   baseViewModel,   donationService,   BaseFormField) {

		var DonationController = classify(BaseController, {

			viewModel: angular.extend({
				donation: { DonationType: 0, Amount : new BaseFormField({ required: false, value: "" }) }
			}, baseViewModel),
			
			listeners : {
				'donation.remove' : 'removeDonation'
			},

			registrations: ['donate', 'removeDonation'],

			_constructor: function () {
				BaseController.prototype._constructor.apply(this, arguments);

				donationService.getDonationOptions().then(angular.bind(this, function(donation) {
					this.viewModel.donation = donation;
					this.viewModel.donation.Amount = new BaseFormField({ required: false, value: donation.Amount });
				}));
			},

			donate: function () {
				var don = this.viewModel.donation;

				donationService.addDonation({
					Amount: don.Amount.value,
					DonationType: don.DonationType
				}).then(angular.bind(this, function () {
					window.location = window.location;
				}));
			},

			removeDonation : function() {
				donationService.removeDonation().then(angular.bind(this, function() {
					window.location = window.location;
				}));
			}
		});

		return new DonationController($scope);
	}]);

GTS.donation.factory('DonationService', [

	'classify', 'apiService', '$q', function (
	 classify,   apiService,   $q) {

		var DonationService = classify({

			getDonationOptions : function() {
				var request = $q.defer();

				apiService.getDonationOptions().then(function (res) {
					request.resolve(res.data);
				});

				return request.promise;
			},

			addDonation : function(donation) {
				var request = $q.defer();

				apiService.addDonation(donation).then(function() {
					request.resolve();
				});

				return request.promise;
			},

			removeDonation: function () {
				var request = $q.defer();

				apiService.removeDonation().then(function () {
					request.resolve();
				});

				return request.promise;
			}

		});

		return new DonationService();
	}]);

GTS.dualMembershipPicker.factory('DualMembershipPickerController', [
	
	'classify','BaseResponderController','dualMembershipPickerService','pageStateService','BaseViewModel', function(classify, BaseResponderController,dualMembershipPickerService,pageStateService, BaseViewModel){
		
		var DualMembershipPickerController = classify(BaseResponderController, {
			
			viewModel : new BaseViewModel({
				members : [],
				activePair : [],
				activeMem : null,
				pairs : []
			}),
			
			state : {
				loading : false
			},
			
			registrations : ['selectMember','group','ungroup','selectPair','clearPair','save'],
			
			_constructor : function(){
				BaseResponderController.prototype._constructor.apply(this, arguments);
				this.state.loading = true;
				dualMembershipPickerService.getDualMemberships().then(angular.bind(this, this.updateDisplay));
			},
			
			updateDisplay : function(dualMemberships){
				this.origMembers = dualMemberships.Items;
				this.viewModel.members = dualMemberships.Items;
				this.state.loading = false;
			},
			
			selectMember : function(member, index){
				
				if(member.disabled){
					return;
				}
				
				var actives = this.getPair();
				if(actives.length >= 2 && !member.active){
					return;
				}
				this.mark(member);
				actives = this.getPair();
				
				this.checkControls();
				
				switch (actives.length) {
					case 0:
						this.viewModel.enableGroup = false;
						this.reset();
						break;
					case 1:
						this.viewModel.enableGroup = false;
						this.disableByDualType();
						break;
					default:
						this.viewModel.enableGroup = true;
						this.disableInactive();
						break;
				}
			},
			
			getPair : function(){
				var activeMems = [];
				angular.forEach(this.viewModel.members, function(mem){
					if(mem.active){
						activeMems.push(mem);
					}
				}, this);
				return activeMems;	
			},
			
			mark : function(member){
				member.active = !member.active;
			},
			
			reset : function(unhide){
				angular.forEach(this.viewModel.members, function(member){
					delete member.active;
					delete member.disabled;
					//delete member.hide;
					if(unhide) delete member.hide;	
				}, this);
			},
			
			disableByDualType : function(){
				var activeMember = this.getActiveMember();
				angular.forEach(this.viewModel.members, function(mem){

					if(activeMember.ExternalPassKindID  !== mem.ExternalPassKindID ){
						mem.disabled = true;
					}else if(mem.IsDualJoint === activeMember.IsDualJoint){
						mem.disabled = true;
					}else{
						delete mem.disabled;
					}

				}, this);
			},
			
			disableInactive : function(){
				angular.forEach(this.viewModel.members, function(member){
					if(!member.active){
						member.disabled = true;
					}else{
						delete member.disabled;
					}
				});
			},
			
			getActiveMember : function(){
				var mem = null;
				angular.forEach(this.viewModel.members, function(member){
					if(member.active){
						mem = member;
					}
				});
				return mem;
			},
			
			group : function(){
				var current = this.getPair();
				if(current.length === 2){
					this.addPair();
					this.checkControls();
					this.checkRemaining();
				}
			},
			
			ungroup : function(){
				var leftPairs = [];
				angular.forEach(this.viewModel.pairs, function(pair, index){
					if(pair.active){
						angular.forEach(pair.members, function(mem){
							delete mem.hide;
						});
					}else{
						leftPairs.push(pair);
					}
				}, this);
				this.viewModel.pairs = leftPairs;
				this.checkControls();
				this.checkRemaining();
			},
			
			addPair : function(){
				var pair = [];
				angular.forEach(this.viewModel.members, function(mem){
					if(mem.active){
						mem.hide = true;
						pair.push(mem);
					}
				}, this);
				this.viewModel.pairs.push({
					members : pair
				});
				this.reset();
			},
			
			selectPair : function(pair){
				pair.active = true;
				this.checkControls();
			},
			
			checkControls : function(){
				var actives = [];
				angular.forEach(this.viewModel.members, function(mem){
					if(mem.active && !mem.hide){
						actives.push(mem);
					}
				});
				var enableUngroup = false;
				angular.forEach(this.viewModel.pairs, function(_pair){
					if(_pair.active && !enableUngroup){
						enableUngroup = true;
					}
				});
				this.viewModel.enableGroup = (actives.length === 2);
				this.viewModel.enableUngroup = enableUngroup;
			},
			
			checkRemaining : function(){
				var done = true;
				angular.forEach(this.viewModel.members, function(mem){
					if(!mem.hide && done){
						done = false;
					}
				}, this);
				this.viewModel.done = done;
			},
			
			save : function(){
				dualMembershipPickerService.save(this.viewModel.pairs).then(angular.bind(this, function(response){
					if(response.success){	
						pageStateService.go('checkout');
					}else{
						this.viewModel.errorSaving = true;
					}
				}));
			}
			
		});
		
		return DualMembershipPickerController;
	
	}
]);

GTS.dualMembershipPicker.controller('dualMembershipPickerInstance', [
	
	'classify','DualMembershipPickerController','$scope',function(classify, DualMembershipPickerController,$scope){
		
		var DualMembershipPickerInstance = classify(DualMembershipPickerController, {
			
			
		});
		
		return new DualMembershipPickerInstance($scope);
	
	}
]);

GTS.dualMembershipPicker.factory('dualMembershipPickerService', [
	
	'classify','$q', 'apiService',function(classify, $q, apiService){
		
		var DualMembershipPickerService = classify({
			
			getDualMemberships : function(){
				var request = $q.defer();
				apiService.getDualMemberships().then(function(response){
					request.resolve(response.data);
				});
				return request.promise;
				
			},
			
			save : function(pairs){
				
				var request = $q.defer();
				var relationships = [];
				
				angular.forEach(pairs, function(pair){
					
					var one = pair.members[0],
						two = pair.members[1];

				    var formattedOne = {
				        FromContactId: one.FromContactID,
				        FromCustContactGuid: one.FromCustContactGuid,
				        ToContactId: two.FromContactID,
				        ToCustContactGuid: two.FromCustContactGuid,
				        IsDualJoint: one.IsDualJoint,
						ExternalPassKindID:one.ExternalPassKindID
				    };

					relationships.push(formattedOne);

				    var formattedTwo = {
				        FromContactId: two.FromContactID,
				        FromCustContactGuid: two.FromCustContactGuid,
				        ToContactId: one.FromContactID,
				        ToCustContactGuid: one.FromCustContactGuid,
				        IsDualJoint: two.IsDualJoint,
						ExternalPassKindID:two.ExternalPassKindID
				    };
					
					relationships.push(formattedTwo);

										
				});
				
				apiService.setDualMemberships(relationships).then(function(response){			
						request.resolve({
							success : true,
							data:response.data
						});
					}, function(response){
						request.resolve({
							success : false,
							error : response.data
						});
					});

				return request.promise;
			}
			
		});
		
		return new DualMembershipPickerService();
	
	}
]);

GTS.error.controller('errorController',
            ['baseViewModel', 'pageStateService', '$scope', 'classify', 'BaseController', 'PageDomData',
    function (baseViewModel,   pageStateService,   $scope,   classify,   BaseController,   pageDomData) {

        var errorController = classify(BaseController, {

            postConstruct: function () {
            	this.scope.root = pageStateService.getRoot();
            },
        });

        return new errorController($scope);

    }]);

GTS.eventTimeModalApi.controller('eventTimeModalApiInstance', ['classify', 'EventTimeModalApiController', '$scope', 
	function(classify, EventTimeModalApiController, $scope){
		var EventTimeModalApiInstance = classify(EventTimeModalApiController, {});
	
		return new EventTimeModalApiInstance($scope);  
}]);

GTS.eventTimeModalApi.factory('EventTimeModalApiController', ['classify', 'DateSpecificModalApiController', 'eventTimeModalApiService', 'dateSpecificModalApiService', 'device', 
	function(classify, DateSpecificModalApiController, eventTimeModalApiService, dateSpecificModalApiService, device){
		var EventTimeApiController = classify(DateSpecificModalApiController, {
			
			listeners : {
				'eventTimeModalApi.get' : 'openModal' 
			},
			
			dates : [],
			inverse : false,
			
			state : {
				loading :true,
				showModal : false,
				dateSelected : false
			},
			
			onModalOpen : function(params){
				
				console.log('open');
				
				this.state.dateSelected = false;
				this.eventTypeId = params.eventTypeId;
				this.resourceId = params.resourceId;
				this.plu = params.plu;
				this.quantity = params.quantity;
				this.salesChannelDetailId = params.salesChannelDetailId;
								
				eventTimeModalApiService.getEventDates(params).then(angular.bind(this, function(eventDates){
					this.dates = eventDates;
					
					if (this.dates){
						this.loadCurrentMonth(this.dates[0]);						
					}else{
						this.loadCurrentMonth();						
					}
				}));
			},
			
			back : function(){
				this.state.dateSelected = false;
			},

			selectDay : function(day, ignore){
				if (day.available && !day.pre && ! day.post){

					this.selectedDate = day.date;
					
					this.state.loading = true;
				    var data = {
				        eventTypeId: this.eventTypeId,
				        resourceId: this.resourceId,
				        plu: this.plu,
				        quantity: this.quantity,
				        selectedDay: day,
				        salesChannelDetailId: this.salesChannelDetailId
				    };
						
					eventTimeModalApiService.getEvents(data).then(angular.bind(this, this.showTimes, ignore));
				}
			},
			
			updateDisplay : function(){
				DateSpecificModalApiController.prototype.updateDisplay.apply(this, arguments);
				this.selectFirstAvailable();
				this.formatDateString();
			},
			
			showTimes : function(ignore, times){
				
				this.viewModel.calendar.eventTimes = times;
				this.state.loading = false;
				if(!ignore) this.state.dateSelected = true;
				this.formatDateString();
			},
			
			selectFirstAvailable : function(){
				for(var i = 0; i < this.viewModel.calendar.days.length; i++){
					var day = this.viewModel.calendar.days[i];
					if(day.available){
						this.selectDay(day, device.c);
						return false;	
					}
				}
			},
			
			selectTime : function(event){
				
				if(!event.disabled){
					var eventData = {
						name: event.name,
						dateTime: event.dateTime,
						endDateTime: event.endDateTime,
						eventId: event.eventId,
						eventTypeId: event.eventTypeId,
						resourceId: event.resourceId,
						ownerId: event.salesChannelDetailId
					};
					
					eventTimeModalApiService.selectTime(eventData).then(angular.bind(this, function(response){
						event.formattedEventInfo = response.formattedEventInfo;
						this.closeModal(event);
					}));
				}
			},
			
			formatDateString : function(){
				if(this.viewModel.calendar){
					var formatted = this.scope.format.replace('monthName', eventTimeModalApiService.getMonthName(this.viewModel.calendar.month));
					
					if (this.selectedDate){
						formatted = formatted.replace('date', this.selectedDate);
					}else{
						formatted = formatted.replace('date', "");
					}
					
					formatted = formatted.replace('year', this.viewModel.calendar.year);
					this.viewModel.formattedDateString = formatted;
				}
			}
			
		});
		
		return EventTimeApiController;
}]);

GTS.eventTimeModalApi.factory('eventTimeModalApiService', ['classify', 'apiService', '$q', 'dateUtilService', 
	function(classify, apiService, $q, dateUtilService){
	var EventTimeModalApiService = classify({
		
		getEventDates: function(eventData){
			var request = $q.defer();
			
			eventData.startDate = dateUtilService.format(eventData.startDate);
			
			apiService.getEventDates(eventData).then(function(response){
				var dates = [];				

				angular.forEach(response.data.EventDates.Dates, function(date){
					dates.push(dateUtilService.getDateObject(date));
				});

				request.resolve(dates);
			});
			
			return request.promise;	
		},
		
		getEvents: function(data){
			var request = $q.defer();
			
			data.startDate = dateUtilService.format(data.selectedDay);
			data.endDate = dateUtilService.format(data.selectedDay);	//+'T23:59:59';
			delete data.selectedDay;
	
			var events = [];
			apiService.getEvents(data).then(function(response){
				angular.forEach(response.data.EventTimes, function(event){
					events.push({
						time : event.FormattedTime,
						name: event.Name,
						dateTime : event.DateTime,
						endDateTime : event.EndDateTime,
						eventId : event.EventID,
						eventTypeId : event.EventTypeID,
						resourceId : event.ResourceID,
						salesChannelDetailId: data.salesChannelDetailId,
						disabled: event.Availability === 0 
					});
				});
				request.resolve(events);
			});

			return request.promise;
		},
		
		selectTime : function(eventData){
			var request = $q.defer();
			
			apiService.setEventTime(eventData).then(function(data){
				var responose = {
					formattedEventInfo : data.data	
				};
				
				request.resolve(responose);
			});
			
			return request.promise;
			
		},
		
		getMonthName : function(month){
			return dateUtilService.getMonthName(month);
		}
		
	});
	
	return new EventTimeModalApiService();
	
}]);

GTS.eventTimeModal.factory('EventTimeModalController', [
	
	'classify','DateSpecificModalController','BaseViewModel','CommunicatorService','EventTimeModalService',function(
	 classify,  DateSpecificModalController,  BaseViewModel,  CommunicatorService,  EventTimeModalService){
	
	var EventTimeModalController = classify(DateSpecificModalController, {
		
		_constructor : function(){	
			this.viewModel = new BaseViewModel();
			DateSpecificModalController.prototype._constructor.apply(this, arguments);
			this.service = new EventTimeModalService();
		},
		id : 'event',
		
		state : {
			showModal : false,
		},
		listeners : {
				'eventTimeModal.start' : 'openModal'
		},
		registrations : ['closeModal','selectDay','back','selectTime','nextMonth','prevMonth','changeMonth','changeYear'],
		
		back : function(){
			this.state.dateSelected = false;
		},
		
		selectDay : function(day){
			if((day.available || day.selected)){
				if(day.target){
					this.state.loading = true;
					this.service.selectDay(day, this.viewModel.calendar.calendarSelector).then(angular.bind(this, function(_response){			
						if(this.viewModel.autoSelect){
							CommunicatorService.send('eventTimeModal.set', _response);
							this.closeModal();
						}else{
							this.state.dateSelected = true;
							this.updateDisplay(null, this.service.postBackService.parseCalendar(_response.data));
						}
					}));	
				}else{
					this.state.dateSelected = true;	
				}
			}
		},
		
		onModalOpen: function (item) {
			this.service.getData(item).then(angular.bind(this, this.updateDisplay, item));
		},
		
		selectTime : function(event){
			if(!event.disabled){
				this.state.loading = true;
				this.service.selectEvent(event).then(angular.bind(this, function(response){
					CommunicatorService.send('eventTimeModal.set', response);
					this.closeModal();
				}));	
			}
		},
		
		closeModal : function(){
			this.state.dateSelected = false;
			DateSpecificModalController.prototype.closeModal.apply(this, arguments);
		},
		
		updateDisplay : function(item, calendar) {
			if(item && item.autoSelectEventsEl && item.autoSelectEventsEl.value === 'True'){
				this.viewModel.autoSelect = true;
			}

			if (item && item.parentSCDAutoSelectEvents === 'True') {
			    this.viewModel.autoSelect = true;
			}
			
			if(calendar){
				if(calendar.success !== false){
					this.viewModel.noEvents = false;
					this.viewModel.calendar = calendar;
					
				}else{
					this.closeModal();
					CommunicatorService.send('egalaxyError');
				}
			}else{
				this.viewModel.noEvents = true;	
			}
			
			this.state.loading = false;
		},
		
	});
	
	return EventTimeModalController;
	
}]);

GTS.eventTimeModal.controller('eventTimeModalInstance', ['classify','$scope','EventTimeModalController', function(classify, $scope, EventTimeModalController){
	
	var EventTimeModalInstance = classify(EventTimeModalController, {
		
		
		
	});
	
	return new EventTimeModalInstance($scope, true);
	
}]);

GTS.eventTimeModal.factory('EventTimeModalParser', [
	'classify','DateSpecificModalParser',function(
	 classify,  DateSpecificModalParser){
			
		var EventTimeModalParser = classify(DateSpecificModalParser, {
			
			selector : '#EventsDateTimeSelector',
			
			parse : function(htmlArray){
					
				var html = $(htmlArray),
					cal = html.find(this.selector+" #CalendarSelector");
				
				if(!cal.length){
					return null;
				}
				
				this.getCalendarSelector(cal, this.model);
				this.getControls(cal, this.model);
				this.getYears(cal, this.model);
				this.getMonths(cal, this.model);
				this.getDays(cal, this.model);
				this.getControls(cal, this.model);
			    
				//this.getAttributes(cal, this.model);
				
				// event only
				this.getTimes(html, this.model);
				this.getSelectedDate(html, this.model); // get event selected date
				
				return this.model;
			},
			
			getTimes : function(html, model){	
				
				var timeNodes = html.find('#EventTimeRow');
				var times = [];
				angular.forEach(timeNodes, function (time) {
					var el = $(time);
					time = {
						time: el.find('.event-time-cell span').text(),
						availability: el.find('.availability-cell').text(),
						name: el.find('.event-name-cell').text(),
						quantity: el.find('.qty-cell').text(),
					};
					
					var selectEl = el.find('.select-cell input')[0];
					if (selectEl) {
					    time.selectButton = {
					        value: el.find('.select-cell input')[0].value,
					        name: el.find('.select-cell input')[0].name
					    };
					}else{
						time.disabled = true;
					}
					
					var attrList = el.next('.EventAttributesRow').find('.EventAttributesList li');
					
					if(attrList.length){
						var attrs = [];
						angular.forEach(attrList, function(attr){
							attrs.push($(attr).text());
						});
						time.attrs = attrs;
					}
					
					times.push(time);
				});
				model.eventTimes = times;
			}, 
			
			getSelectedDate: function (html, model) {

			    var selectedEventDate = html.find('#selected-eventdate').text();
			    model.selectedEventDate = selectedEventDate;
			},
			
		});
		
		return EventTimeModalParser;
	}
]);

GTS.eventTimeModal.factory('EventTimeModalService', ['classify','DateSpecificModalService','ViewItemsPostBackService','EventTimeModalParser','$q',function(classify,DateSpecificModalService, ViewItemsPostBackService,EventTimeModalParser,$q){
	
	var EventTimeModalService = classify(DateSpecificModalService, {
		
		postBackService : new ViewItemsPostBackService(new EventTimeModalParser()),
		
		selectDay : function(day, selector){
			return this.postBackService.selectDay(day, selector);
		},
		
		selectEvent : function(event){
			return this.postBackService.selectEvent(event);			
		}
		
	});
	
	return EventTimeModalService;
	
}]);

GTS.feePopup.controller('feePopupController', [
	'$scope', 'BaseController', 'classify', 'feePopupDomData', function(
	 $scope,   BaseController,   classify, feePopupDomData){

	var FeePopupController = classify(BaseController, {
		viewModel: {},

		registrations: ['closePage'],

		postConstruct : function(){
			//'feePopupDomData',
			this.viewModel.feePopupHeader = feePopupDomData.feePopupHeader;
			this.viewModel.closeButtonText = feePopupDomData.closeButtonEl.value;
			this.viewModel.feeInfoHtml = feePopupDomData.feeInfoHtml;
		},

		closePage: function () {
			window.close();
		}
	});

	return new FeePopupController($scope);

}]); 

GTS.forgotPasswordModal.controller('forgotPasswordModalController',
                                ['baseViewModel', 'pageStateService', '$scope', 'ModalController', 'classify', 'CommunicatorService', 'BaseController', 'ForgotPasswordModalViewModel', 'ForgotPasswordModalService', 'webSettingsService', 
                        function (baseViewModel,   pageStateService,   $scope,   ModalController,   classify,   CommunicatorService,   BaseController,   ForgotPasswordModalViewModel,   ForgotPasswordModalService,   webSettingsService) {

        var state = { loading : false, showModal: false };
            
        var ForgotPasswordModalController = classify(BaseController, [ModalController, {

            state : state,

            viewModel : ForgotPasswordModalViewModel,

            listeners : { 'forgotPasswordModal' : 'openModal' },

            registrations : ['requestPassword', 'closeModal', 'cancel'],

            postConstruct : function () {
				this.scope.root = pageStateService.getRoot();
				this.viewModel.logonInfo = ForgotPasswordModalService.getLogonInfo();
				webSettingsService.getSettings().then(angular.bind(this, this.onWebSettingsLoad));
            },

			onWebSettingsLoad: function(settings) {
				this.state.showUserName = !settings.Account.UseEmailForLoginName;
				if (!this.state.showUserName) {
					this.viewModel.logonInfo.username.value = "";
					this.viewModel.logonInfo.username.required = false;
				}
			},
			
			onModalOpen : function(){
				this.state.loading = false;
			},
			
            requestPassword : function(){
               
				if(ForgotPasswordModalService.validate()){
                    
        
					this.state.loading = true;
					
					this.viewModel.requestFailed = '';
					this.viewModel.requestGood = '';
					
                    ForgotPasswordModalService.requestPassword().then(angular.bind(this, this.onRequestPasswordComplete));
                }
            },
            
            onRequestPasswordComplete : function(result){
                this.state.loading = false;
				
                if(result.success){
                    this.viewModel.requestGood = result.message;
                }else{
					this.viewModel.requestFailed = result.message;
                }  
            },
			
			cancel : function(){
				this.closeModal();
			}
        }]);

        return new ForgotPasswordModalController($scope);

    }]);

GTS.forgotPasswordModal.service('ForgotPasswordModalService', [
	'classify','$http', '$q', '$sce','CommunicatorService', 'apiService', 'BaseFormField',function(
	 classify,  $http,   $q,    $sce,  CommunicatorService,  apiService,   BaseFormField){

	var ForgotPasswordService = classify({
        logonInfo : {username : new BaseFormField(), email : new BaseFormField()},
        
		_constructor : function(){
			
		},
        
        getLogonInfo : function(){
            return this.logonInfo;
        },
        
        validate : function(){
			this.logonInfo.username.validate();
			this.logonInfo.email.validate();
            return !this.logonInfo.username.error && !this.logonInfo.email.error;
        },
        
        requestPassword : function(){
            var model = { username: this.logonInfo.username.value, email : this.logonInfo.email.value };
            var request = $q.defer();
            apiService.putRequestPassword(model).then(angular.bind(this, this.forgotPasswordSuccess, request), angular.bind(this, this.forgotPasswordFailure, request));
			return request.promise;
        },
        
        forgotPasswordSuccess : function(request, response){
            request.resolve({ success: true, errorType: 'none', message: response.data });
        },
        
        forgotPasswordFailure : function(request, response){
            request.resolve({ success: false, errorType: 'forgotPasswordFailure', message: response.data });
        }
	});

	return new ForgotPasswordService();
}]);

GTS.forgotPasswordModal.factory('ForgotPasswordModalViewModel', ['baseViewModel', function(baseViewModel){
	
	return angular.extend({
		logonInfo : { },
		requestGood : '',
		requestFailed : ''
	}, baseViewModel);
}]);

GTS.groupSalesLogin.factory('GroupSalesLoginController', [
	
	'classify','BaseController','CommunicatorService','GroupSalesLoginViewModel','WebFormsService',function(
	 classify, BaseController, CommunicatorService, GroupSalesLoginViewModel,  WebFormsService){
	
	var GroupSalesLoginController = classify(BaseController, {
		
		registrations : ['forgotPassword'],
	
		_constructor : function($scope){
			BaseController.prototype._constructor.apply(this, arguments);
			this.viewModel = this.scope.viewModel = new GroupSalesLoginViewModel();
			WebFormsService.onSubmit(angular.bind(this, this.submit));
			
		},
		
		forgotPassword : function(){
			CommunicatorService.send('forgotPasswordModal');
		},
		
		submit : function(){
			if(this.viewModel.validate()){
				return true;
			}else{
				setTimeout(angular.bind(this, function(){
					this.scope.$apply();	
				}));
				return false;
			}
		}
		
	});
	
	return GroupSalesLoginController;
	
}]);

GTS.groupSalesLogin.controller('groupSalesLoginInstance', ['classify','GroupSalesLoginController','$scope', function(classify, GroupSalesLoginController, $scope){
	
	var GroupSalesLoginInstance = classify(GroupSalesLoginController, {});

	return new GroupSalesLoginInstance($scope);
		
}]);

GTS.groupSalesLogin.factory('GroupSalesLoginViewModel', [
	'BaseViewModel','classify','LoginDomData','TextFormField','PageDataDomData', 'LoginCompanyCodeOnlyDomData',function(
	 BaseViewModel,  classify,  LoginDomData,  TextFormField, PageDataDomData,    LoginCompanyCodeOnlyDomData){
	
		var GroupSalesLoginViewModel = classify(BaseViewModel, {
			
			_constructor : function() {
			    console.log(LoginCompanyCodeOnlyDomData);
				if(PageDataDomData.errorMessage){
					this.generalError = PageDataDomData.errorMessage;
				}
			},
			
			logonInfo : {
			    username: new TextFormField(angular.extend({ required: !LoginCompanyCodeOnlyDomData.CompanyCodeOnlyTextboxEl }, LoginDomData.UsernameTextboxEl)),
			    password: new TextFormField(angular.extend({ required: !LoginCompanyCodeOnlyDomData.CompanyCodeOnlyTextboxEl }, LoginDomData.PasswordTextboxEl)),
				companyCode: new TextFormField(angular.extend({ required: false }, LoginDomData.companyCodeTextboxEl)),
				companyCodeOnly: LoginCompanyCodeOnlyDomData.CompanyCodeOnlyTextboxEl ? new TextFormField(angular.extend({ required: false }, LoginCompanyCodeOnlyDomData.CompanyCodeOnlyTextboxEl)) : null,
				companyCodeOnlyText: LoginCompanyCodeOnlyDomData.CompanyCodeOnlyLabel ? LoginCompanyCodeOnlyDomData.CompanyCodeOnlyLabel : "",
				submitButton : LoginDomData.LoginButtonEl,
				submitButtonCompanyCodeOnly: LoginCompanyCodeOnlyDomData.ContinueAsGuestButtonEl,
			},
			
			validate : function(){
				var validForm = true;
				angular.forEach(this.logonInfo, function(field){
					if(field instanceof TextFormField){
						var validField = field.validate();					
						if(validForm && !validField){
							validForm = false;
						}	
					}
				});
				return validForm;
			}
			
		});
		
		return GroupSalesLoginViewModel;
	}
]);

GTS.groupSalesQuestionnaire.factory('GroupSalesQuestionnaireController', [
	
	'classify','BaseController','GroupSalesQuestionnaireViewModel','WebFormsService',function(
	 classify,  BaseController,  GroupSalesQuestionnaireViewModel,  WebFormsService){
	
	var GroupSalesQuestionnaireController = classify(BaseController, {
		
		_constructor : function(scope){
			BaseController.prototype._constructor.apply(this, arguments);
			this.viewModel = this.scope.viewModel = new GroupSalesQuestionnaireViewModel();
			
			WebFormsService.onSubmit(angular.bind(this, this.onSubmit));
		},
		
		onSubmit : function(){
			
			if(this.viewModel.validate()){
				this.viewModel.updatePage();
				return true;
			}else{
				return false;
			}	
		}
		
	});
	
	return GroupSalesQuestionnaireController;
	
}]);

GTS.groupSalesQuestionnaire.controller('groupSalesQuestionnaireInstance', ['classify','GroupSalesQuestionnaireController', '$scope', function(classify, GroupSalesQuestionnaireController, $scope){
	
	var GroupSalesQuestionnaireInstance = classify(GroupSalesQuestionnaireController, {
		
	});
	
	return new GroupSalesQuestionnaireInstance($scope);
	
}]);

GTS.groupSalesQuestionnaire.factory('GroupSalesQuestionnaireViewModel', [
	
	'classify','BaseForm','GroupSalesQuestionnaireDomData','TextFormField','SelectFormField','PageDataDomData',function(
	 classify,  BaseForm,  GroupSalesQuestionnaireDomData,  TextFormField,  SelectFormField,  PageDataDomData){
		 
	var GroupSalesQuestionnaireViewModel = classify(BaseForm, {
		
		_constructor : function(){
			this._setQuestions();
			this.continue = GroupSalesQuestionnaireDomData.continueEl;
		},
		
		_setQuestions : function(){
			var questions = [];
			angular.forEach(GroupSalesQuestionnaireDomData.questions, function(q, q_i){
				
				if(q.inputEl){
					q.inputEl.required = false;
					var input = null;
					if(q.inputEl.options){
						angular.forEach(q.inputEl.options, function(o, i){
							if(o.value === "0"){
								q.inputEl.options.splice(i, 1);
							}
						});
						input = new SelectFormField(q.inputEl);
					}
					else{
						input = new TextFormField(q.inputEl);
					}
					
					if(q.errorEl && q.errorEl.text){
						input.required = true;
						input.validate();
					}
					
					input.display = $.trim(q.fieldNameEl.value.replace('*', ''));
					this['question_'+q_i] = input;
					
					
					questions.push(input);	
				}
			}, this);
			this.questions = questions;
		},
		
		updatePage : function(){
			angular.forEach(this.questions, function(q){
				if(q.options && q.options.length){
					if(!q.value){
						q.value = 0;
					}
					var el = $('#page').find('select[name="'+q.name+'"]'),
						parent = el.parent();
					el.remove();
					parent.append('<input name="'+q.name+'" value="'+q.value+'">');
					
					
				}
			});
		}
		
	});
	
	return GroupSalesQuestionnaireViewModel;
	
}]);

GTS.guestNamesPrompt.controller('GuestNamesPromptController', [
	
	'BaseController','GuestNamesPromptViewModel','$scope','classify','ModalController','GuestNamesPromptService','CommunicatorService', 'TextFormField', 'webSettingsService', '$sce', function(
	 BaseController,      viewModel,              $scope,  classify,  modalController,  guestNamesPromptService,  communicatorService,   TextFormField,   webSettingsService,   $sce){

	
	var GuestNamePromptController = classify(BaseController, [modalController, {
        
        postConstruct : function(){
            console.log('load?');
        },
		
		state: {
			showModal : false,
			loading : false
		},
		viewModel : viewModel,
		registrations : ['cancel', 'saveGuestNames', 'closeModal'],
		listeners : {
			'guestNamePrompt' : 'onLoad'
		},
		
		onLoad : function() {
            
			guestNamesPromptService.getGuestNames().then(angular.bind(this, this.onGetGuestNamesComplete));
		},
		
		onGetGuestNamesComplete : function(guests){
			communicatorService.send('guestNamePromptIsLoaded');
			
			if(guests && guests.length > 0){
				this.openModal();
				this.state.loading = false;
				
				viewModel.guestNames = [];

				angular.forEach(guests, function(guest) {
					this.viewModel.guestNames.push({
						firstName: new TextFormField({ value: guest.FirstName }),
						lastName: new TextFormField({ value: guest.LastName }),
						id: guest.Id,
						productName: guest.ProductName,
						productNameHtml: $sce.trustAsHtml(guest.ProductName)
				});
				}, this);

				//  If turned on, take the first guest last name and apply it to the other guests
				webSettingsService.getSettings().then(angular.bind(this, function (settings) {
					if (this.viewModel.guestNames.length > 0 && !settings.General.DisableAutoPopulateLastName) {
						this.viewModel.guestNames[0].lastName.onChange = angular.bind(this, function() {
							for (var i = 1; i < this.viewModel.guestNames.length; i++) {
								var guestName = this.viewModel.guestNames[i];

								guestName.lastName.value = this.viewModel.guestNames[0].lastName.value;
							}
						});
					}
				}));
			} else {
				this.viewModel.isValid = true;
				this.onModalClose();
			}
		},
		
		onModalOpen : function() {
			//  Do nothing here.  Modal only opens AFTER we have loaded data.
		},
		
		onModalClose : function(){
			communicatorService.send('guestNamePromptAction', viewModel.isValid);
		},
		
		saveGuestNames : function(){
			var allValid = true;
			
			var guestNames = [];
			
			//  Validate
			angular.forEach(viewModel.guestNames, function(guestName){
				var valid = guestName.firstName.validate();
				valid = guestName.lastName.validate() && valid;
				allValid = valid && allValid;
				
				guestNames.push({
					Id : guestName.id,
					ProductName : guestName.productName,
					FirstName : guestName.firstName.value,
					LastName : guestName.lastName.value
				});
			});
			
			//  Once valid, submit to server
			if(allValid){
				this.viewModel.isValid = true;
				
				guestNamesPromptService.saveGuestNames(guestNames).then(angular.bind(this, function(result){
					if(result.success){
						this.closeModal();
					}else{
						viewModel.error = result.message;	
					}
				}));
			}
		},
		
		cancel : function(){
			this.viewModel.isValid = false;
			this.closeModal();
		}
	}]);
	
	return new GuestNamePromptController($scope);

}]);

GTS.guestNamesPrompt.service('GuestNamesPromptService', [
	'classify','$http', '$q', '$sce','CommunicatorService', 'apiService', 'BaseFormField',function(
	 classify,  $http,   $q,    $sce,  CommunicatorService,  apiService,   BaseFormField){

	var GuestNamesPromptService = classify({
		getGuestNames : function(){
			var request = $q.defer();
            apiService.getGuestNames().then(angular.bind(this, this.getGuestNamesSuccess, request), angular.bind(this, this.getGuestNamesFailed, request));
			return request.promise;
		},
		
        getGuestNamesSuccess : function(request, response){
            request.resolve(response.data);
        },
        
        getGuestNamesFailed : function(request, response){
            request.resolve([]);
        },
		
		saveGuestNames : function(guestNames){
			var request = $q.defer();
            apiService.putGuestNames(guestNames).then(angular.bind(this, this.putGuestNamesSuccess, request), angular.bind(this, this.putGuestNamesFailed, request));
			return request.promise;
		},
		
		
        putGuestNamesSuccess : function(request, response){
            request.resolve({success : true, message : ''});
        },
        
        putGuestNamesFailed : function(request, response){
            request.resolve({success : false, message : response.data});
        },
		
	});

	return new GuestNamesPromptService();
}]);

GTS.guestNamesPrompt.factory('GuestNamesPromptViewModel', ['baseViewModel', function(baseViewModel){
	return angular.extend({
		guestNames : [],
		isValid : false
	}, baseViewModel);
}]);

GTS.header.controller("headerController", [
             '$scope', 'BaseController', 'pageStateService', 'classify', function (
              $scope,   BaseController,   pageStateService,   classify) {

    var state = {
        showNav: false
    };

    var HeaderController = classify(BaseController, {
        state: state,

        registrations: ['toggleNavbar'],

        postConstruct: function() {
            this.scope.root = pageStateService.getRoot();
        },

        toggleNavbar: function () {
            this.state.showNav = !state.showNav;
        }
    });

    return new HeaderController($scope);
}]);

GTS.hero.controller('heroController', ['classify','baseViewModel', 'BaseController', '$scope',function(classify, baseViewModel, BaseController, $scope){
	
	var HeroController = classify(BaseController, {
		
		viewModel : baseViewModel
		
	});
	
	return new HeroController($scope);
	
}]);

GTS.householding.factory('HouseholdingController', ['classify','BaseController', 'householdingService','BaseViewModel','pageStateService',function(classify, BaseController,householdingService, BaseViewModel, PageStateService){
	
	var HouseholdingController = classify(BaseController, {
		
		registrations : ['choose'],
		state : {loading : true},
		
		_constructor : function(){
			BaseController.prototype._constructor.apply(this, arguments);
			this.viewModel = this.scope.viewModel = new BaseViewModel();
			this.loadCart();
		},
		
		loadCart : function(){
			householdingService.loadPasses().then(angular.bind(this, this.showPasses));
		},
		
		showPasses : function(passes){
			this.viewModel.passes = passes;
			
			angular.forEach(this.viewModel.passes, function(pass){
				pass.primaryMember = this.getPrimaryMember(pass);
			},this);
			
			this.state.loading = false;
		},
		
		getPrimaryMember : function(pass){
			var member = null;
			angular.forEach(pass.Members, function(_member){
				if(_member.PrimaryMember){
					member = _member;
				}
			});
			return member;
		},
		
		choose : function(pass){
			this.state.loading = true;
			householdingService.updatePasses(pass, this.viewModel.passes).then(function(){
				window.location.href = PageStateService.getRoot()+'checkoutrouter/primarypassdone';
			});
		}
		
	});
	
	return HouseholdingController;
	
}]);

GTS.householding.controller('householdingInstance', ['classify','HouseholdingController', '$scope',function(classify, HouseholdingController, $scope){
	
	var HouseholdingInstance = classify(HouseholdingController, {
		
		
	});
	
	return new HouseholdingInstance($scope);
	
}]);

GTS.householding.factory('householdingService', ['classify','apiService','SmallCartService','$q',function(classify, api, SmallCartService,$q){
	
	var HouseholdingService = classify({
		
		products : [],
		cartItems : [],
		
		loadPasses : function(){
			
			var request = $q.defer();
			
			SmallCartService.getCart().then(angular.bind(this, function(response){
				var passes = [];
				this.cartItems = response.data.Items;
				angular.forEach(this.cartItems, function(item){
					if(item.ProductType === 8){
						passes.push(this.loadPass(item));	
					}
				}, this);
				
				$q.all(passes).then(angular.bind(this, function(passes){
					request.resolve(passes);
				}));
			}));	
			
			return request.promise;
		},
		
		loadPass : function(item){
			
			var request = $q.defer(),
				pass;
				
			api.getPass(item.PassId).then(function(response){
				pass = response.data;
				pass.itemName = item.Name;
				request.resolve(pass);
			});
			
			return request.promise; 
		},
		
		updatePasses : function(pass, otherPasses){
			var calls = [];
			angular.forEach(otherPasses, function(_pass){
				_pass.Master = pass.Id;
				if(_pass.Id === pass.Id){
					_pass.IsPrimary = true;
				}
				calls.push(api.updatePass(_pass));
			});
			return $q.all(calls);
		}
		
	});
	
	return new HouseholdingService();

}]);

GTS.infoModal.controller('InfoModalController', [
	
	'BaseController','baseViewModel','ModalController','$scope','InfoModalService','classify','CommunicatorService', '$sce',function(
	 BaseController,  baseViewModel,  ModalController,  $scope,  infoModalService,  classify,  CommunicatorService,   $sce){
		 
	var viewModel = angular.extend({
		category : {}
	}, baseViewModel);
	
	var state = {
		loading : true
	};

	var InfoModalController = classify(BaseController, [ModalController, {
		
		registrations : ['closeModal'],
		viewModel : viewModel,
		state : state,
		listeners : {
			'infoOpen' : 'getModalContent'
		},

		closeModal : function(){
			this.scope.showModal = false;
		},
		
		getModalContent : function(link){
			
			this.openModal();
			
			infoModalService.getPage(link).then(function(data){
				viewModel.category = data.subCategory[0];
				viewModel.category.parentSCDDescriptionHtml = $sce.trustAsHtml(viewModel.category.parentSCDDescription);
				state.loading = false;
				
				angular.forEach(viewModel.category.items, function(item){
					
					if(item.isPackage && link.text === item.packageName){
						
						angular.forEach(item.packageItems, function(pI, ind){
							angular.copy(passedItem.packageItems[ind], pI);
						});
						
						viewModel.category.items = [item];
						return false;
					}
					if(item.pluName === link.text){
						viewModel.category.items = [item];
						return false;
					}
					if (item.pluDesc) {
						item.pluDescHtml = $sce.trustAsHtml(item.pluDesc);
					}

					if (item.packageDescription) {
						item.hasPackageDescription = true;
						item.packageDescriptionHtml = $sce.trustAsHtml(item.packageDescription);
					} else {
						item.hasPackageDescription = false;
					}

					return true;
				});
			});
		}

	}]);

	return new InfoModalController($scope);

}]);	

GTS.infoModal.factory('InfoModalService', ['classify', '$http', 'DomDataParser', '$q',function(classify, $http, DomDataParser, $q){

	var InfoModalService = classify({

		registerController : function(cb){


		},

		openLink : function(link){
			this.getPage(link);
		},

		getPage : function(link){
			
			var request = $q.defer();

			var target = link.onclick.substring(link.onclick.indexOf('(') + 1).split(',')[0];
			target = target.replace('\'', '').replace('\'','');
			
			var def = $http({
				method : 'get',
				url : target
			}).then(angular.bind(this, function(content){
				var data = this.getDataFromHtml(content);
				request.resolve(data);
			}));
			
			return request.promise;
		},
		
		getDataFromHtml : function(content){
		
			var html = $.parseHTML(content.data),
				dpp = new DomDataParser(html);
				
			return dpp.getData();
		}

	});

	return new InfoModalService();

}]);

GTS.languageSelector.controller('languageSelectorController', [
	
	"$scope", "classify", "languageSelectorService", "BaseController", "pageStateService", function (
	 $scope,   classify,   languageSelectorService,   baseController,   pageStateService) {

	var state = { showLanguages: false };
	var viewModel = { languages: [] , selectedLanguage: {}, selectedLanguageId : 0 };

    var languageSelectorController = classify(baseController, {

	    state: state,

	    viewModel: viewModel,

	    registrations: ["toggleLanguages", "selectLanguage", 'close'],

		postConstruct: function () {
			this.scope.root = pageStateService.getRoot();
		    languageSelectorService.getLanguageData().then(angular.bind(this, this.onLanguagesLoaded));
		},

        onLanguagesLoaded : function(languageData) {
            viewModel.selectedLanguageId = languageData.LanguageId;
	        viewModel.languages = [];

			for (var i = 0; i < languageData.Languages.length; i++) {
				var language = languageData.Languages[i];
				if (language.Id === viewModel.selectedLanguageId) {
					viewModel.selectedLanguage = language;
				} else {
					viewModel.languages.push(language);
				}
			}
        },

        toggleLanguages: function () {
    		state.showLanguages = !state.showLanguages;
        },

    	selectLanguage : function(language) {
		    languageSelectorService.setLanguageId(language.Id).then(angular.bind(this, function() {
                 this.reload();
                  } ));
	    },
		
		close : function(){
			state.showLanguages = false;
		},
        
        reload : function(){
            var orginalUrl = window.location.href;
            var newUrl = removeParam("language", orginalUrl);
            /* we need to remove the language param so that it would not
                load again even after the user selection of language */
            window.location.href = newUrl;
        }

       
	});
    
     /* removes the specified querystring param */
        function removeParam(key, sourceURL) {
            var rtn = sourceURL.split("?")[0],
                param,
                params_arr = [],
                queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
            if (queryString !== "") {
                params_arr = queryString.split("&");
                for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                    param = params_arr[i].split("=")[0];
                    if (param === key) {
                        params_arr.splice(i, 1);
                    }
                }
                rtn = rtn + "?" + params_arr.join("&");
            }
            return rtn;
        }

	return new languageSelectorController($scope);

}]);

GTS.languageSelector.factory('languageSelectorService', [
	
	'classify','apiService','$q',function(
	 classify,  api,         $q){

	    var languageSelectorService = classify({

		_constructor : function(){
			
		},

		getLanguageData : function(){
		    var request = $q.defer();

		    api.getLanguageData().then(function(response) {
		        request.resolve(response.data);
		    });

		    return request.promise;
		},

		setLanguageId : function(languageId) {
			var request = $q.defer();

			api.putLanguage(languageId).then(function(response) {
				request.resolve();
			}, function (response) {
				request.resolve();
			});

			return request.promise;
		}
	});

	return new languageSelectorService();

}]);

GTS.leftNav.controller('leftNavInstance', ['classify', 'SalesChannelNavController','$scope',
	function(classify, SalesChannelNavController, $scope){
		
		var LeftNavInstance = classify(SalesChannelNavController, {
			
		});
		
		return new LeftNavInstance($scope);	
	}
]);

GTS.logout.controller('logoutController',
            ['baseViewModel', 'pageStateService', '$scope', 'classify', 'BaseController', 'PageDomData',
    function (baseViewModel,   pageStateService,   $scope,   classify,   BaseController,   pageDomData) {

        var logoutController = classify(BaseController, {

            postConstruct: function () {
            	this.scope.root = pageStateService.getRoot();
            },
        });

        return new logoutController($scope);

    }]);

GTS.loyaltyConfirmation.factory('LoyaltyConfirmationController', ['classify','BaseController','CommunicatorService','LoyaltyConfirmationViewModel','pageStateService',
	function(classify, BaseController, CommunicatorService, LoyaltyConfirmationViewModel, pageStateService
	){

		var LoyaltyConfirmationBaseController = classify(BaseController, {
			_constructor : function(){
				BaseController.prototype._constructor.apply(this, arguments);
		
				this.scope.viewModel = this.viewModel = new LoyaltyConfirmationViewModel();
			},
			
			registrations : ['continue'],
			
			continue : function(){
				pageStateService.go('viewItems');
			}
		});

		return LoyaltyConfirmationBaseController;
	}
]);

GTS.loyaltyConfirmation.controller('loyaltyConfirmationInstance', ['classify','LoyaltyConfirmationController','$scope',
	function(classify, LoyaltyConfirmationController, $scope
	){

		var LoyaltyConfirmationInstance = classify(LoyaltyConfirmationController, {
			
			// add methods here

		});

		return new LoyaltyConfirmationInstance($scope);
	}
]);

GTS.loyaltyConfirmation.factory('LoyaltyConfirmationViewModel', ['classify','BaseViewModel','LoyaltyConfirmationDomData',
	function(classify, BaseViewModel,LoyaltyConfirmationDomData
	){

		var LoyaltyConfirmationViewModel = classify(BaseViewModel, {
			
			_constructor : function(){
				BaseViewModel.prototype._constructor.apply(this, arguments);
				
				angular.extend(this, LoyaltyConfirmationDomData);
			}
			
		});

		return LoyaltyConfirmationViewModel;
	}
]);

GTS.loyaltyCreate.factory('LoyaltyCreateController', ['classify','BaseController','LoyaltyCreateViewModel','CommunicatorService','loyaltyCreateService','pageStateService',
	function(classify, BaseController, LoyaltyCreateViewModel, CommunicatorService,loyaltyCreateService,pageStateService
	){
	
	var LoyaltyCreateController = classify(BaseController, {
		
		_constructor : function(){
		
			BaseController.prototype._constructor.apply(this, arguments);
		
			this.viewModel = this.scope.viewModel = new LoyaltyCreateViewModel();
		},
		
		listeners : {
			'ticketLookupModal.set' : 'redirect'
		},

		registrations : ['existingPass','existingAccount','newAccount','newContact'],
		
		existingPass : function(){
			loyaltyCreateService.getPassLookupData(this.viewModel.existingPassButtonEl).then(angular.bind(this, function(newDomData){
				this.scope.loading = false;
				CommunicatorService.send('ticketLookupModel.get', newDomData);
			}));
		},
		
		existingAccount : function(){
			this.scope.loading = true;
			loyaltyCreateService.getPassLookupData(this.viewModel.existingAccountButtonEl).then(angular.bind(this, function(newDomData){
				this.scope.loading = false;
				CommunicatorService.send('loyaltyLoginModal.get', newDomData);
			}));
		},
		
		newAccount : function(){
			this.scope.loading = true;
			loyaltyCreateService.getPassLookupData(this.viewModel.newAccountButtonEl).then(angular.bind(this, function(newDomData){
				this.scope.loading = false;
				CommunicatorService.send('newAccountModal.get', newDomData);
			}));
		},
		
		newContact : function(){
			
		},
		
		update : function(method, newDomData){
			this.scope.loading = false;
			this.viewModel._reset(newDomData);
		},
		
		redirect : function(data){
		}
		
	});
	
	return LoyaltyCreateController;
	
}]);

GTS.loyaltyCreate.controller('loyaltyCreateInstance', ['classify','LoyaltyCreateController','$scope',
	function(classify, LoyaltyCreateController, $scope){
	
	var LoyaltyCreateInstance = classify(LoyaltyCreateController, {
		
	});
	
	return new LoyaltyCreateInstance($scope);
	
}]);

GTS.loyaltyCreate.factory('loyaltyCreateService', ['classify','WebFormsService','BasePostBack','DomDataParser','$q',
	function(classify,WebFormsService,BasePostBack,DomDataParser,$q
	){
		
		var LoyaltyCreateService = classify(BasePostBack, {
			
			getPassLookupData : function(button){
				
				WebFormsService.clean();
				var data = {
					'ctl00$ContentPlaceHolder$ScriptManager1':'ctl00$ContentPlaceHolder$UpdatePanel|'+button.name,
					'__ASYNCPOST': true
				};
				data[button.name] = button.value;
				WebFormsService.setModel(data);
				
				return this.request().then(function(response){
					var request = $q.defer();
					var ddp = new DomDataParser(response.data);
					request.resolve(ddp.getData());
					return request.promise;
				});
			}
			
		});
		
		return new LoyaltyCreateService();
		
	}
]);

GTS.loyaltyCreate.factory('LoyaltyCreateViewModel', ['classify','BaseViewModel','LoyaltyEnrollDomData',
	function(classify, BaseViewModel, LoyaltyEnrollDomData){
		
		var LoyaltyCreateViewModel = classify(BaseViewModel, {
			
			_constructor : function(){
				BaseViewModel.prototype._constructor.apply(this, arguments);
				
				// attach dom data to vm
				this._reset(LoyaltyEnrollDomData);		
			},
			
			_reset : function(dd){
				angular.extend(this, dd);	
			}
			
		});
		
		return LoyaltyCreateViewModel;
		
	}
]);

GTS.loyaltyLogin.controller('loyaltyLoginController', [
	
	'$scope','classify','loyaltyService','BaseController','baseViewModel', function(
	 $scope,  classify,  loyaltyService,  BaseController,  baseViewModel){

	var viewModel = angular.extend(loyaltyService.getData(), baseViewModel);

	var state = {
		loading : false,
		enabled : loyaltyService.isEnabled()
	};

	var LoyaltyLoginController = classify(BaseController, {

		state : state,
		viewModel : viewModel,

		registrations : ['logout', 'change', 'lookup'],

		logout : function(){
			loyaltyService.logout();
		},

		change : function(){
			loyaltyService.change();
		},
		
		lookup : function(){
			if(viewModel.accountNumberInputEl.value){
				state.loading = true;
				loyaltyService.lookup(viewModel.accountNumberInputEl.value).then(angular.bind(this, this.processLookup));
			}else{
				viewModel.error = 'noNumber';
			}
		},
		
		processLookup: function(result){
			if(result.success){
				window.location.href = "";
			}else{
				state.loading = false;
				viewModel.error = result.errorType;
			}
		}

	});

	return new LoyaltyLoginController($scope);

}]);

GTS.loyaltyLogin.factory('loyaltyService', [
	
	'classify','LoyaltyLoginDomData','WebFormsService','apiService','$q',function(
	 classify,  LoyaltyLoginDomData,  WebFormsService,  api,         $q){

	var LoginService = classify({

		_constructor : function(){
			if(LoyaltyLoginDomData.isAccount){
				angular.forEach([LoyaltyLoginDomData.earnRadioEl, LoyaltyLoginDomData.redeemRadioEl], function(el, index){
					if(el.checked){
						LoyaltyLoginDomData.earnRedeem = el.value;
						return false;
					}
				});
			}
		},

		isEnabled : function(){			
			return LoyaltyLoginDomData.isAccount || LoyaltyLoginDomData.isLogin || false;
		},
		
		isLoggedIn : function(){
			return LoyaltyLoginDomData.isAccount;
		},
		
		getData : function(){
			return LoyaltyLoginDomData;
		},
		
		lookup : function(accountNumber){
			
			var request = $q.defer();
		
			api.setLoyaltyAccount(accountNumber).then(function(){
				request.resolve({success : true});
			}, function(){
				request.resolve({success: false, errorType: 'notFound', errorMessage: 'No loyalty account found'});
			});
			
			return request.promise;
		},

		logout : function(){
			WebFormsService.setModel({
				__EVENTTARGET:'ctl00$ContentPlaceHolder$LoyaltyAccountControl$ChangeLoyaltyAccountLinkButton'
			});
			WebFormsService.updatePage();
			WebFormsService.submit();
		},

		change : function(){
			angular.forEach([LoyaltyLoginDomData.earnRadioEl, LoyaltyLoginDomData.redeemRadioEl], function(el){
				if(el.value === LoyaltyLoginDomData.earnRedeem){
					WebFormsService.setModel({
						__EVENTTARGET:el.id.replace(new RegExp('_', 'g'), '$')
					});
					WebFormsService.updatePage();
					WebFormsService.submit();
					return false;
				}
			});
		}
	});

	return new LoginService();

}]);

GTS.loyaltyLoginModal.factory('LoyaltyLoginModalController', ['classify','BaseController','CommunicatorService','ModalController','LoyaltyLoginModalViewModel','WebFormsService','loyaltyLoginModalService','pageStateService',
	function(classify, BaseController, CommunicatorService, ModalController, LoyaltyLoginModalViewModel, WebFormsService, loyaltyLoginModalService, pageStateService
	){

		var LoyaltyLoginModalBaseController = classify(BaseController, [ModalController, {

			state : {},
			scope : {},

			_constructor : function(){
				BaseController.prototype._constructor.apply(this, arguments);
				
				WebFormsService.onSubmit(angular.bind(this, this.submit));

				this.scope.state.showModal = false;
			},
			
			registrations : ['closeModal'],
			
			listeners : {
				'loyaltyLoginModal.get' : 'openModal'
			},
			
			onModalOpen : function(data){
				this.viewModel = this.scope.viewModel = new LoyaltyLoginModalViewModel(data);
				this.state.loading = false;
			},

			submit : function(){

				if(this.state.showModal){
					if(this.viewModel.validate()){
						loyaltyLoginModalService.send(this.viewModel).then(function(response){
							pageStateService.go('loyaltySelector');
						}, angular.bind(this, this.showError));
					}else{
						this.scope.$apply();
					}
				}
				return false;
			},

			showError : function(err){
				this.scope.error = err;
				this.scope.$applyAsync();
			}

		}]);

		return LoyaltyLoginModalBaseController;
	}
]);

GTS.loyaltyLoginModal.controller('loyaltyLoginModalInstance', ['classify','LoyaltyLoginModalController','$scope',
	function(classify, LoyaltyLoginModalController, $scope
	){

		var LoyaltyLoginModalInstance = classify(LoyaltyLoginModalController, {
			
			// add methods here

		});

		return new LoyaltyLoginModalInstance($scope);
	}
]);

GTS.loyaltyLoginModal.factory('loyaltyLoginModalService', ['classify','$q','BasePostBack','WebFormsService','DomDataParser',
	function(classify, $q, BasePostBack, WebFormsService,DomDataParser
	){

		var LoyaltyLoginModalService = classify(BasePostBack, {

			send : function(viewModel){

				var req = $q.defer();

				var data = {
					'ctl00$ContentPlaceHolder$ScriptManager1':'ctl00$ContentPlaceHolder$UpdatePanel|'+viewModel.submit.name,
					'__asyncpost' : true
				};

				data[viewModel.submit.name] = viewModel.submit.value;
				data[viewModel.username.name] = viewModel.username.value;
				data[viewModel.password.name] = viewModel.password.value;

				WebFormsService.setModel(data);
				WebFormsService.updatePage();

				this.request().then(function(response){
					var dpp = new DomDataParser(response.data);
					var _data = dpp.getData();

					if(_data.error){
						req.reject(_data.error);
					}else{
						req.resolve(_data);
					}
				});
				
				return req.promise;
			}

				
		});

		return new LoyaltyLoginModalService();
	}
]);

GTS.loyaltyLoginModal.factory('LoyaltyLoginModalViewModel', ['classify','BaseForm','TextFormField',
	function(classify, BaseForm, TextFormField
	){

		var LoyaltyLoginModalViewModel = classify(BaseForm, {
			
			_constructor : function(data){
				
				BaseForm.prototype._constructor.apply(this, arguments);
				
				this.password = new TextFormField(data.PasswordTextboxEl);
				this.passwordLabel = data.PasswordLabel;
				this.username = new TextFormField(data.UsernameTextboxEl);
				this.usernameLabel = data.UsernameLabel;
				
				this.submit = data.LoginButtonEl;
			}
			
		});

		return LoyaltyLoginModalViewModel;
	}
]);

GTS.loyaltySelector.factory('LoyaltySelectorController', ['classify','BaseController','CommunicatorService','LoyaltySelectorViewModel','PageDataDomData',
	function(classify, BaseController, CommunicatorService, LoyaltySelectorViewModel, PageDataDomData
	){

		var LoyaltySelectorBaseController = classify(BaseController, {
			_constructor : function(){
				BaseController.prototype._constructor.apply(this, arguments);
				
				this.viewModel = this.scope.viewModel = new LoyaltySelectorViewModel();
			},
			
			registrations : ['selectAccount'],
			
			selectAccount : function(account){
				this.viewModel.selectAccount = account.inputEl.value;
			}
		});

		return LoyaltySelectorBaseController;
	}
]);

GTS.loyaltySelector.controller('loyaltySelectorInstance', ['classify','LoyaltySelectorController','$scope',
	function(classify, LoyaltySelectorController, $scope
	){

		var LoyaltySelectorInstance = classify(LoyaltySelectorController, {
			
			// add methods here

		});

		return new LoyaltySelectorInstance($scope);
	}
]);

GTS.loyaltySelector.factory('LoyaltySelectorViewModel', ['classify','BaseViewModel','$injector',
	function(classify, BaseViewModel, $injector
	){

		var LoyaltySelectorViewModel = classify(BaseViewModel, {
			
			_constructor : function(){
				BaseViewModel.prototype._constructor.apply(this, arguments);
				
				var dd = $injector.get('LoyaltySelectorDomData');
				var page = $injector.get('PageDataDomData');
				
				if(dd){
					angular.extend(this, dd);
					angular.forEach(dd.accounts, function(account){
						if(account.inputEl.checked === 'checked'){
							this.selectedAccount = account.inputEl.value;
						}
					}, this);
				}
				
				if(page.errorMessage){
					this.error = page.errorMessage;
				}
			}
			
		});

		return LoyaltySelectorViewModel;
	}
]);

GTS.membershipInit.controller('membershipInitController', [
	
	'SelectFormField','InputRadioField','$scope','BaseController','classify','CommunicatorService', function(
	 SelectFormField,  InputRadioField,  $scope,  BaseController,  classify,  CommunicatorService){
	
	var viewModel = {
		isGift : "true",
		giftYesRadio : new InputRadioField({
			value : "true",
			name : 'isGift'
		}),
		giftNoRadio : new InputRadioField({
			value : "false",
			name : 'isGift'
		}),
		mailSelect : new SelectFormField({
			options : [{
				value : "0",
				text : "Mr"
			},{
				value : "1",
				text : "Mrs"
			}]
		})
	};
	
	var data = {};

	var MembershipInitController = classify(BaseController, {
		
		viewModel : viewModel,
		registrations : ['next'],
		listeners : {
			'membershipSetupStart': 'init'
		},
		
		init : function(_data){
			data = _data;
			viewModel.giftYesRadio.change = angular.bind(this, this.change);
			viewModel.giftNoRadio.change = angular.bind(this, this.change);
		},
		
		next : function() {

		    data.isGift = viewModel.isGift;
		    data.mailTo = viewModel.mailSelect.value;
			CommunicatorService.send('membershipSetupDone', data);
		}
	
	});
	
	return new MembershipInitController($scope);

}]);

GTS.membershipJointAddOn.controller('jointAddOnModalInstance', [
	
	'classify','AddOnModalController','$scope','CommunicatorService',function(
	 classify, AddOnModalController, $scope,  CommunicatorService){
		 
		var jointAddOnModaInstance = classify(AddOnModalController, {
			
			registrations : ['closeModal', 'add', 'goToCart','confirm'],
			
			confirm : function(){
				this.closeModal();
			},
			
			goToCart : function(){
				this.closeModal();
				CommunicatorService.send('JointAddOnDone', this.viewModel.added);
			},
			
			closeModal : function(){
				CommunicatorService.send('JointAddOnDone', this.viewModel.added);
				AddOnModalController.prototype.closeModal.apply(this, arguments);
			}
			
		});
		
		return new jointAddOnModaInstance($scope); 
	 }
]);

GTS.membershipJointAddOn.factory('MembershipJointAddOnController', [
	
	'MembershipJointAdultController','classify','membershipService','CommunicatorService','memberTypesModel','addOnService',function(
	 MembershipJointAdultController,  classify,  membershipService,  CommunicatorService,  memberTypesModel,  addOnService){
	
	return classify(MembershipJointAdultController, {
		
		listeners : {
			'jointStart' : 'init',
			'addMember' : 'add',
			'removeMember':'remove',
			'JointAddOnDone' : 'doneAdding'
		},
		registrations : ['addAddOn','addMember', 'editMember'],
		memberType : memberTypesModel.addon,
		
		init : function(){
			this.memberDemographicType = 2;
			this.state.loading = true;
			this.setup();
			membershipService.getAddOnFieldRules().then(angular.bind(this, function(response){
				this.fieldRules = response;
				this.updateMembers();
				this.state.loading = false;	
			}));
		},
		
		setup : function(){
			this.viewModel.members = [];
			membershipService._formatAddOns();
			this.viewModel.members = membershipService._getPassAddOns();
			this.showAddAddOnButton();
			this.state.hasMemberAddOns = membershipService.getHasMemberAddOns();
		},
		
		showAddAddOnButton : function(){
			this.viewModel.maxAddOns = membershipService.getMaxAddOns();
		},
		
		updateMembers : function(){
			// update view
			this.viewModel.members = [];
			angular.forEach(membershipService._getPassAddOns(), function(member){				
				this.viewModel.members.push(member);
			}, this);
		},
		
		remove : function(data){
			if(data.memberType === this.memberType){
				membershipService.removeMember(data.member);
				this.updateMembers();
			}
		},
		
		addAddOn : function(){
			var currentAddOns = this.viewModel.members;
			this.state.loading = true;
			membershipService.getAddOnPlus().then(function(response){
				CommunicatorService.send('openAddOnModal',{
					passKind : membershipService.getPassKind(),
					addOns : response.data,
					added : currentAddOns,
					justContinue : true
				});
			});
		},
		
		doneAdding : function(added){
			var cart = addOnService.getCart();
				
			membershipService.updateCart(cart);
			this.setup();
			this.state.loading = false;
		}
	
	});

}]);

GTS.membershipJointAddOn.controller('membershipJointAddOnInstance', [
	
	'classify','MembershipJointAddOnController','$scope',function(
	 classify,  MembershipJointAddOnController,  $scope){
		
	var MembershipJointAddOnInstance = classify(MembershipJointAddOnController, {
		
		
		
	});
	
	return new MembershipJointAddOnInstance($scope);
		
}]);

GTS.membershipJointAdult.factory('MembershipJointAdultController', [
	
	'CommunicatorService','BaseController','classify','membershipService','MembershipJointAdultViewModel','FieldRulesMapModel','memberTypesModel',function(
	 CommunicatorService,  BaseController,  classify,  membershipService,  MembershipJointAdultViewModel,  FieldRulesMapModel,  memberTypesModel){
	
	return classify(BaseController, {
		
		viewModel : {},
		listeners : {
			'jointStart' : 'init',
			'addMember' : 'add',
			'removeMember' : 'remove'
		},
		registrations : ['addMember', 'editMember'],
		
		_constructor : function(){
			BaseController.prototype._constructor.apply(this, arguments);
			this.scope.viewModel = this.viewModel = new MembershipJointAdultViewModel();
		},
		
		init : function(){
			
			this.memberDemographicType = 0;
			this.viewModel.maxMembers = membershipService.getMaxNonPrimaryAdults();
			this.viewModel.members = membershipService.getPassNonPrimaryAdults();
		},
		
		addMember : function(){
			var data = {
				memberDemographicType : this.memberDemographicType,
				isEdit : false
			};
			CommunicatorService.send('openMemberModal', data);
		},
		
		add : function(data){
			if(data.memberDemographicType === this.memberDemographicType){				
				if(!data.isEdit){
					var newMem = membershipService.addNonPrimaryAdult(data.contact);	
				}else{
					membershipService.editMember(data.member, data.contact);
				}
				this.updateMembers();
			}
		},
		
		remove : function(data){	
			if(data.memberType === this.memberType){
				membershipService.removeMember(data.member);
				this.updateMembers();
			}
		},
		
		editMember : function(member,index){			
			var data = {
				memberDemographicType :this.memberDemographicType,
				isEdit : true,
				member : member
			};
			CommunicatorService.send('openMemberModal', data);
		},
		
		updateMembers : function(){
			this.viewModel.members = [];
			angular.forEach(membershipService.getPassNonPrimaryAdults(), function(member){
				this.viewModel.members.push(member);
			}, this);
		}

	});
}]);


GTS.membershipJointAdult.controller('membershipJointAdultInstance', [
	
	'MembershipJointAdultController','classify','$scope', function(
	 MembershipJointAdultController,  classify,  $scope){
	
	var MembershipJointAdultInstance = classify(MembershipJointAdultController, {
		
	});
	
	return new MembershipJointAdultInstance($scope);
}]);

GTS.membershipJointAdult.factory('MembershipJointAdultViewModel', [
	
	'classify','BaseViewModel', function(
	 classify,  BaseViewModel){
	
	return classify(BaseViewModel, {
		maxMembers : 0,
		members : []
	});
	
}]);

GTS.membershipJointChild.factory('MembershipJointChildController', [
	
	'MembershipJointAdultController','classify','membershipService','CommunicatorService','memberTypesModel',function(
	 MembershipJointAdultController,  classify,  membershipService,  CommunicatorService,  memberTypesModel){
	
	return classify(MembershipJointAdultController, {
		
		memberType : memberTypesModel.child,
		
		listeners : {
			'jointStart' : 'init',
			'addMember' : 'add',
			'removeMember':'remove'
		},
		
		registrations : ['addMember', 'editMember'],
		
		init : function(){
			this.memberDemographicType = 1;
			this.viewModel.maxMembers = membershipService.getMaxChildren();
			this.viewModel.members = membershipService.getPassChildren();
		},	
		
		updateMembers : function(){	
			// update view
			this.viewModel.members = [];
			angular.forEach(membershipService.getPassChildren(), function(member){
				
				this.viewModel.members.push(member);
			}, this);
		},
		
		remove : function(data){
			if(data.memberType === this.memberType){
				membershipService.removeMember(data.member);
				this.updateMembers();
			}
		},
		
		add : function(data){
			if(data.memberDemographicType === this.memberDemographicType){		
				if(!data.isEdit){
					var newMem = membershipService.addChild(data.contact);	
				}else{
					membershipService.editMember(data.member, data.contact);
				}
				this.updateMembers();
			}
		}
		
	});

}]);

GTS.membershipJointChild.controller('membershipJointChildInstance', [
	
	'MembershipJointChildController','classify','$scope', function(
	 MembershipJointChildController,  classify,  $scope){
		 
	var MembershipJointChildInstance = classify(MembershipJointChildController, {
		
	});
	
	return new MembershipJointChildInstance($scope);
}]);

GTS.membershipJointMemberModal.factory('MembershipJointMemberModalController', [
	
	'classify','BaseController','ModalController','MembershipJointMemberModalViewModel','membershipService','CommunicatorService','FieldRulesMapModel',function(
	 classify,  BaseController,  ModalController,  MembershipJointMemberModalViewModel,  membershipService,  CommunicatorService,  FieldRulesMapModel){
	
	return classify(BaseController, [ModalController, {
		
		registrations : ['closeModal','submit','remove','name','canSkipName'],
		listeners : {
			'openMemberModal' : 'openModal',
		},
		
		onModalOpen : function(data){
					
			this.memberDemographicType = data.memberDemographicType;
			this.isEdit = data.isEdit;
			this.fieldRules = [];
			
			var plu = data.member ? data.member.Plu : null;
			
			membershipService.getFieldRulesByDemographicType(this.memberDemographicType, plu).then(angular.bind(this, function(rules){
				
				this.fieldRules = rules;
				
				var model = data.member ? data.member.Fields : {};
				this.origMember = data.member;
			
				this.viewModel = this.scope.viewModel = new MembershipJointMemberModalViewModel();
				this.viewModel.memberDemographicType = this.memberDemographicType;
				
				this.setRelationshipTypes();
				this.setGender();
				this.setTitles();
				this.setSuffixes();
				
				this.viewModel.contact.setFields(rules, model);

				this.viewModel.editMember = this.isEdit;
				
				this.setupNaming(data);
				
				this.state.loading = false;

			}));
		},
		
		submit : function(){
			var valid = this.viewModel.contact.validate();
			if(!valid) return false;
			var data = {
				contact : this.viewModel.contact.toContact(this.fieldRules),
				memberDemographicType : this.memberDemographicType,
				isEdit :this.isEdit,
				member:this.origMember
			};
			
			if(data.Member){
				data.member.Named = this.viewModel.nameChild;	
			}
				
			CommunicatorService.send('addMember', data);
			this.closeModal();
		},
		
		setTitles : function(){
			this.viewModel.contact.title.setOptions(membershipService.getTitles(), 'Id', 'Name', '');
			this.viewModel.contact.title.change();
		},
		
		setSuffixes : function(){
			this.viewModel.contact.suffix.setOptions(membershipService.getTitles(), 'Id', 'Name', '');
			this.viewModel.contact.suffix.change();
		},
		
		setRelationshipTypes : function(){
			this.viewModel.contact.relationshipType.setOptions(membershipService.getRelationshipTypes(), 'Id','Description','');
			this.viewModel.contact.relationshipType.change();
		},
		
		setGender: function(){
			var genders = [{
				value : 1,
				text : 'Male'
			}, {
				value : 2,
				text : 'Female'
			}];
			this.viewModel.contact.gender.options = genders;
			this.viewModel.contact.gender.change();
		},
		
		setupNaming : function(data){
			
			// add ons - always edit
			if(data.memberDemographicType === 2){
				//data.member.Named = true;
			}
			// first enter
			if(!data.isEdit || data.member.Named){
				this.viewModel.nameChild = true;
			}
		},
		
		name : function(){
			this.origMember.Named = this.viewModel.nameChild;	
			angular.forEach(this.viewModel.contact, function(field, name){
				if(name !== 'relationshipType'){
					field.value = "";
				}
			}, this);
		},
		
		canSkipName : function(){
			if(this.viewModel.contact){
				return !(this.viewModel.contact.firstName.required && this.viewModel.contact.lastName.required);
			}else{
				return false;
			}
		}
		
	}]); 
}]);

GTS.membershipJointMemberModal.controller('membershipJointMemberModalInstance', [
	
	'MembershipJointMemberModalController','classify','$scope',function(
	 MembershipJointMemberModalController,  classify,  $scope){
	
	var MembershipJointMemberModal = classify(MembershipJointMemberModalController, {

	}); 
	
	return new MembershipJointMemberModal($scope);
	
}]);

GTS.membershipJointMemberModal.factory('MembershipJointMemberModalViewModel', [
	
	'BaseViewModel','classify','MembershipBaseContactForm','membershipService',function(
	 BaseViewModel,  classify,  MembershipBaseContactForm,  membershipService){
	
	var MembershipJointMemberModalViewModel = classify({
		
		_constructor : function(existingContact){
			this.contact = new MembershipBaseContactForm();
			if(existingContact) angular.extend(this.contact, existingContact);
		},
		
		contact : {}
	
	});
	
	return MembershipJointMemberModalViewModel;
	
}]);

GTS.membershipPrimary.controller('membershipPrimaryController', [
	
	'FieldRulesMapModel','$scope','BaseResponderController','classify','membershipService','CommunicatorService','MembershipPrimaryViewModel','memberTypesModel', 'Upload', 'pageStateService', 'webSettingsService',function(
	 FieldRulesMapModel,  $scope,  BaseResponderController,  classify,  membershipService,  CommunicatorService,  MembershipPrimaryViewModel,  memberTypesModel,   Upload,   pageStateService,   webSettingsService){
		 
	var state = {
		accountLinked : false,
		isJointMembership : false
	};
	
	var device = {
		a : true,
		b : false,
		c : false
	};
	
	var MembershipPrimaryController = classify(BaseResponderController, {
		
		viewModel : {},
		state : state,
		registrations : ['link', 'sub', 'upload','removePhoto'],
		listeners : {
			'membershipPrimaryStart' : 'init'
		},
		
		_constructor : function(){
			BaseResponderController.prototype._constructor.apply(this, arguments);
			webSettingsService.getSettings().then(angular.bind(this, function (settings) {
				this.state.PassAllowPhotoUpload = settings.Pass.PassAllowPhotoUpload;
				this.state.PassPhotoMaxHeight = settings.Pass.PassPhotoMaxHeight;
				this.state.PassPhotoMaxMb = settings.Pass.PassPhotoMaxMb + "mb";
				this.state.PassPhotoMaxWidth = settings.Pass.PassPhotoMaxWidth;
			}));
		},
		
		init : function(){
			
			var primary = null;
			
			this.viewModel = this.scope.viewModel = new MembershipPrimaryViewModel();
			
			if(membershipService.isExistingPass()){
				primary = membershipService.getPrimaryMember();

				this.viewModel.primary.setFields(membershipService.getPrimaryFieldRules(), primary.Fields);
				this.viewModel.primary.onStatesLoaded = angular.bind(this, function(){
					this.viewModel.primary.state.value = primary.Fields.State;
					this.viewModel.primary.state.change();
				});
				
				var pass = membershipService.getPass();		
				// get pass first
				this.viewModel.pictureId = pass.Photo.PictureId;
				this.viewModel.imageUrl = pass.Photo.ImageUrl;
			}else{
				this.viewModel.primary.setFields(membershipService.getPrimaryFieldRules());
			}
			
			var defaultTitle = primary ? primary.Fields.NameTitleID : undefined,
				defaultSuffix = primary ? primary.Fields.NameSuffixID : undefined;
			
			this.viewModel.primary.title.setOptions(membershipService.getTitles(), 'Id', 'Name', defaultTitle);
			this.viewModel.primary.title.change();
			this.viewModel.primary.suffix.setOptions(membershipService.getSuffixes(), 'Id', 'Name', defaultSuffix);
			this.viewModel.primary.suffix.change();
			
			this.viewModel.account = membershipService.getAccount();
			this.viewModel.maxGuests =  membershipService.getMaxGuests();
			this.viewModel.showAddOns = membershipService.getMaxAddOns() !== 0;
			this.viewModel.showChildren = membershipService.getMaxChildren() !== 0;
			this.viewModel.showAdults = membershipService.getMaxNonPrimaryAdults() !== 0;
            
		    var currentPassId = membershipService.getPass().Id;
		    var cartItems = membershipService.getCart().Items;
		    var account = this.viewModel.account;
		    var orderLineId = membershipService.getOrderLineId();

		    var alreadyLinked = false;
		    var linkedToCurrent = false;
		    if (account) {
		        for (var m = 0; m < account.OrderMemberships.length; m++) {
		            var orderMembership = account.OrderMemberships[m];
		            for (var n = 0; n < orderMembership.Members.length; n++) {
		                var member = orderMembership.Members[n];

		                if (member.OrderLineId !== orderLineId) {
		                    alreadyLinked = true;
		                } else {
		                    linkedToCurrent = true;
		                }
		            }
		        }
		    }

		    state.accountLinked = linkedToCurrent;
		    state.accountLinkedToOther = alreadyLinked;
            
			state.isJointMembership = membershipService.isJointMembership();
			this.setImageUrl();

			var isDualJoint = membershipService.isDualJoint();
			if(isDualJoint){
				var dualsPrimary = membershipService.getDualPrimaryMember(isDualJoint.primaryDual.Id);
				var copy = angular.extend({}, dualsPrimary);

                // only address should be copied over and disabled.
				delete copy.Fields.First;
				delete copy.Fields.Last;
				delete copy.Fields.DOB;
				delete copy.Fields.Phone;
			    delete copy.Fields.Email;

				this.viewModel.primary.setFields(membershipService.getPrimaryFieldRules(), copy.Fields);
				this.viewModel.primary.onStatesLoaded = angular.bind(this, function(){
					this.viewModel.primary.state.value = copy.Fields.State;
					this.viewModel.primary.state.change();
					this.viewModel.primary.street1.visible = false;
					this.viewModel.primary.street2.visible = false;
					this.viewModel.primary.city.visible = false;
					this.viewModel.primary.country.visible = false;
					this.viewModel.primary.state.visible = false;
					this.viewModel.primary.zipCode.visible = false;
				});
			}

		},
		
		link : function(){
			state.accountLinked = !state.accountLinked;
			
			if(state.accountLinked){
				this.viewModel.primary.firstName.value = this.viewModel.account.FirstName;
				this.viewModel.primary.lastName.value = this.viewModel.account.LastName;
				this.viewModel.primary.street1.value = this.viewModel.account.Street1;
				this.viewModel.primary.street2.value = this.viewModel.account.Street2;
				this.viewModel.primary.city.value = this.viewModel.account.City;
				this.viewModel.primary.country.value = this.viewModel.account.CountryCode;
				this.viewModel.primary.country.change(true);
				this.viewModel.primary.state.value = this.viewModel.account.State;
				this.viewModel.primary.state.change();
				this.viewModel.primary.zipCode.value = this.viewModel.account.Postal;
				this.viewModel.primary.phone.value = this.viewModel.account.Phone;
				
				if(this.viewModel.account.ContactGuid){
					var contactGuid = this.viewModel.account.ContactGuid.toString();
					this.viewModel.linkedContactGuid = contactGuid;
					

					//membershipService.UsePassAsBilling(contactGuid);
				}
				
			}else{
				this.viewModel.primary.firstName.value = "";
				this.viewModel.primary.lastName.value = "";
				this.viewModel.primary.street1.value = "";
				this.viewModel.primary.street2.value = "";
				this.viewModel.primary.city.value = "";
				this.viewModel.primary.country.value = "";
				this.viewModel.primary.country.change(true);
				this.viewModel.primary.state.value = "";
				this.viewModel.primary.state.change();
				this.viewModel.primary.zipCode.value = "";
				this.viewModel.primary.phone.value = "";
			    
			    //  We need to know that this contact had previously been linked.
				var primary = membershipService.getPrimaryMember();
				this.viewModel.linkedContactGuid = "";
			    if (primary.ContactGuid === this.viewModel.account.ContactGuid.toString()) {
			        this.viewModel.forceUnlink = true;
			    }
			}
		},
		
		sub: function(){
			if(this.viewModel.primary.validate()){
				if(!membershipService.isExistingPass() && membershipService.getPrimaryMember() === null){
					membershipService.addPrimaryMember(this.viewModel.primary.toContact(membershipService.getPrimaryFieldRules()));
				}else{
					membershipService.editPrimaryMember(this.viewModel.primary.toContact(membershipService.getPrimaryFieldRules()));
				}

				if (state.accountLinked && this.viewModel.linkedContactGuid) {
				    membershipService.UsePassAsBilling(this.viewModel.linkedContactGuid);
				} else if(this.viewModel.forceUnlink) {
				    membershipService.unlinkPassAsBilling();
				}
				CommunicatorService.send('membershipPrimaryDone');
			}
		},

		upload : function(file) {
			if (!file) {
				return;
			}

			this.viewModel.file = file;

			if (file.$errorParam) {
				this.state.passPhotoError = file.$error;
				this.viewModel.file.sizeMb = (this.viewModel.file.size / 1024.0 / 1024.0).toFixed(2);
				return;
			}

			Upload.upload({
				url:  pageStateService.getRoot() + 'api/pass/UploadPhoto',
				data: { file: file }
			}).progress(function (evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			}).success(angular.bind(this, function (data, status, headers, config) {
				this.viewModel.pictureId = data.PictureId;
				this.viewModel.imageUrl = data.ImageUrl;
				this.setImageUrl();
				
				membershipService.savePicture(this.viewModel.pictureId);
				
			})).error(function(data, status) {
			});
		},

		setImageUrl: function () {
		    this.viewModel.passImage = !state.passPhotoError && this.viewModel.imageUrl ? this.viewModel.imageUrl : (this.viewModel.root + '/FrontEnd/GTS/img/noImage.jpg');
		},

		removePhoto : function() {
			membershipService.deletePhoto(this.viewModel.pictureId);

			this.viewModel.pictureId = null;
			this.viewModel.imageUrl = null;
			this.setImageUrl();
		}
	
	});
	
	return new MembershipPrimaryController($scope);

}]);

GTS.base.factory('MembershipPrimaryViewModel', [
	
	'classify','MembershipPrimaryContactForm', 'BaseViewModel', function(
	 classify,  MembershipPrimaryContactForm,   baseViewModel){
	
	var ViewModel = classify(baseViewModel, {
		
		_constructor : function(){
			this.primary = new MembershipPrimaryContactForm();
		},
		
		account : {},
		primary : {},
		pictureId : 0,
		imageUrl : '',
		passImage : '',
		linkedContactGuid: ''
		
	});
	
	return ViewModel;

}]);

GTS.base.factory('MembershipPrimaryContactForm', [
	
	'classify','ContactForm','TextFormField', 'SelectFormField','BirthdateFormField', 'FieldRulesMapModel','membershipService',function(
	 classify,  ContactForm,  TextFormField,   SelectFormField,  BirthdateFormField,   FieldRulesMapModel,  membershipService){
		 
	var MembershipPrimaryContactForm = classify(ContactForm, {
		
		userFields : [],
		
		_constructor : function(){
			ContactForm.prototype._constructor.apply(this, arguments);
		},
		
		setFields : function(fieldRules){
			
			angular.forEach(this, function(field){
				field.visible = false;
			});
			
			angular.forEach(fieldRules, function(rule){
				
				var ruleName = rule.ColumnName,
					contactField = this[FieldRulesMapModel[ruleName]];
					
				if(FieldRulesMapModel[ruleName]){	
					contactField.required = rule.Required;
					contactField.visible = true;
				
					if(rule.MaximumValue){
						contactField.maxValue = rule.MaximumValue;
					}
					if(rule.MinimumValue){
						contactField.maxValue = rule.MinimumValue;
					}
				}else if(ruleName.indexOf('User') !== -1){
					
					this.userFields.push(ruleName);
					
					if(rule.FieldKindId === 0 || rule.FieldKindId === 1){
						this[ruleName] = new TextFormField();
					}else if(rule.FieldKindId === 3){ // multiple choice fieldkind
						this[ruleName] = new SelectFormField();
						
						var options = membershipService.getMultipleChoices(rule.MChoiceID);
	
						this[ruleName].setOptions(options, 'ResponseNo', 'ResponseText', rule.Label);
					}
					
					this[ruleName].required = rule.Required;
					this[ruleName].display = rule.Label;
				}
			}, this);
		}
		
	});
	
	return MembershipPrimaryContactForm;

}]);

GTS.base.factory('MembershipPrimaryContactForm', [
	
	'classify','ContactForm','TextFormField', 'SelectFormField','BirthdateFormField', 'FieldRulesMapModel','membershipService','MembershipBaseContactForm',function(
	 classify,  ContactForm,  TextFormField,   SelectFormField,  BirthdateFormField,   FieldRulesMapModel,  membershipService, MembershipBaseContactForm){
		 
	var MembershipPrimaryContactForm = classify(MembershipBaseContactForm, {
		
		_constructor : function(){
			MembershipBaseContactForm.prototype._constructor.apply(this, arguments);
			this.country.setOptions(membershipService.getCountries(), "Code", "Name", membershipService.getDefaultCountryCode());
		}
		
	});
	
	return MembershipPrimaryContactForm;

}]);

GTS.membershipUpdate.factory('MembershipUpdateController', ['classify','BaseController','membershipId',function(classify,BaseController,membershipId){
	
	var MembershipUpdateController = classify(BaseController, {
	
	});
	
	return MembershipUpdateController;
	
}]);

GTS.membershipUpdate.controller('membershipUpdateInstance', ['classify','MembershipUpdateController','$scope',function(classify,MembershipUpdateController,$scope){
	
	var MembershipUpdateInstance = classify(MembershipUpdateController, {
		
	});
	
	return new MembershipUpdateInstance($scope);
	
}]);

GTS.membership.factory('cartModel', function(){
	
	// all we care abo0ut right now is items
	return {
		Items : [{		
			CategoryExternalId: "MEMRE",
			HasImage: false,
			Id: 1843,
			ImagePath: "",
			IsQuantityEditable: false,
			IsRenewal: false,
			ItemAccrualPoints: 0,
			ItemRedemptionPoints: 0,
			Name: "Memberships (RE) Individual Membership",
			PackageDetails: null,
			PackageInPass: {},
			PassId: 0,
			PaymentPlanOptions: [],
			Plu: "3GZ00601JMRX",
			PreviousPassId: null,
			Price: 80,
			ProductType: 8,
			Quantity: 1,
			Total: 80,
			TotalAccrualPoints: 0,
			TotalRedemptionPoints: 0
		}]
	};
});

GTS.membership.factory('currentAccountModel', function(){
	
	return {
		ActiveMemberships:[],
		AssociatedMemberships: [],
		Cell: "",
		City: "",
		ContactGuid: "00000000-0000-0000-0000-000000000000",
		CountryCode: "",
		DateOfBirth: null,
		Email: "",
		ExternalId: "",
		FirstName: "",
		LastName: "",
		MiddleName: "",
		NameSuffixId: 0,
		NameTitleId: 0,
		Phone: "",
		Postal: "",
		State: "",
		Street1: "",
		Street2: ""	
	};

});

GTS.membership.factory('FieldRulesMapModel', ['classify', function(classify){
	
	var Map = classify({
		
		'NameTitleID' : 'title',
		'First':'firstName',
		'Middle':'middleName',
		'Last':'lastName',
		'NameSuffixID':'suffix',
		'DOB':'birthday',
		'RelationshipTypeID':'relationshipType',
		'Gender':'gender',
		'Street1':'street1',
		'Street2' : 'street2',
		'City':'city',
		'State':'state',
		'Phone':'phone',
		'Zip' : 'zipCode',
		'CountryCode' : 'country',
		'Email':'email',
		
		toFields : function(rules, contact, fields){
			var map = this;
			angular.forEach(rules, function(rule){	
				if(map[rule.ColumnName]){	
					contact[map[rule.ColumnName]].required = rule.Required;
					contact[map[rule.ColumnName]].visible = true;
					if(fields && fields[rule.ColumnName]){
						contact[map[rule.ColumnName]].value = fields[rule.ColumnName];
					}
				}
			}, this);
		},
		
		toRules : function(contact){
			var map = this,
				rules = {};
			angular.forEach(contact, function(field, name){
				for(var prop in map){
					if(map[prop] === name){
						rules[prop] = field.value;
					}
				}
			});
			return rules;
		},
		
	});
	
	return new Map();
}]);

GTS.membership.factory('MemberModel', ['classify', function(classify){
	
	var Member = classify({
		
		_constructor : function(existingMember){
			if(existingMember){
				angular.extend(this, existingMember);
			}
		},
		
		ContactGuid: "00000000-0000-0000-0000-000000000000", //- this comes from the pass, if there is one entered already
		ContactId: 0, //- this comes from the pass, if there is one entered already
		Fields : {		
			City: "",
			CountryCode: "",
			DOB: "",
			Email: "",
			First: "",
			Last: "",
			Phone: "",
			State: "",
			Street1: "",
			Street2: "",
			Zip: ""
		},
		Id: 0, 
		MemberDemographicType: 0, // from an existing pass
		MemberType: 0, // from an existing pass
		OrderLineId: 0, // the item ID, from the product
		PassId: 0, // from an existing pass
		Plu: null, // from the cart item
		PrimaryMember: false, // from an existing pass
		UsePassAsBilling: false, // from an existing pass
		Named : true,
		RelationshipTypeID : null,
		
		_flatten : function(){
			
			var ar = ['ContactId','ContactGuid','PassId','Plu','Fields','Id','MemberDemographicType','MemberType','OrderLineId','MemberDemographicType','PrimaryMember','UsePassAsBilling','Named'],
				o = {};
			angular.forEach(ar, function(method){
				o[method] = this[method];
			}, this);
			
			o.MemberType = 0;
			
			if(this.MemberType === 2){
				o.MemberDemographicType = 1;
			}
			
			if(this.MemberType === 4){
				o.MemberType = 1;
				o.MemberDemographicType = 2;
			}
			
			return o;
		}
		
	});
	
	return Member;

}]);

GTS.membership.factory('memberTypesModel', function(){
	return {
		primary : 0,
		adult : 1,
		child : 2,
		guest : 3,
		addon : 4
	};
});

GTS.membership.factory('MembershipModel', [
	
	'classify', function(
	 classify){
		
	var Membership = classify({
		
		_constructor : function(existingMembership){
			if(existingMembership){
				angular.extend(this, existingMembership);
			}
		},
		
		AdultQty: 0, // this comes from the pass - overwritten if joint
		ChildQty: 0, // this comes from the pass - overwritten if joint
		Id: 0, // this comes from the product in the cart - passId
		IsPrimary: false, // - this comes from the pass, 
		JointMembership: false, // - this comes from the pass
		Master: 0, // - this comes from the pass
		Members : [], // becomes new member model
		Message: "", // - this comes from the pass
		PassKindId: 0, // - this comes from the pass,
		
		_flatten: function () {
		    var ar = ['AdultQty', 'ChildQty', 'Members', 'PassKindId', 'Id', 'ForceNewGuid'],
				o = {};
			angular.forEach(ar, function(method){
				o[method] = this[method];
			}, this);
			if(this.PictureID){
				o.PictureID = this.PictureID || 0;
			}
			
			if(this.JointMembership){
				o.IsPrimary = true;
			}
			
			return o;
		}
	});
	
	return Membership;
	
}]);

GTS.membership.factory('membershipConfigModel', function(){
	
	return {
		relationshipTypes : [],
		countries : {},
		titles: {},
		suffixes : {},
		choices: {},
		general : {},
		states : [],
		cart : {}
	};
	
});

GTS.membership.controller('membershipController', [
	
	'pageStateService','baseViewModel','$location','$scope','classify','BaseController','membershipService','CommunicatorService',function(
	 pageStateService,  baseViewModel,  $location,  $scope,  classify,  BaseController,  membershipService,  CommunicatorService){
		
	var viewModel = $.extend({
		steps : {
			setup : {
				active : false,
				data : {}
			},
			primary : {
				active : true,
				data : {}
			}
		}
	}, baseViewModel);
	
	var state = {
		loading : true
	};
		
	var MembershipController = classify(BaseController, {
		viewModel : viewModel,
		state : state,
		listeners : {
			//'membershipSetupDone' : 'setupDone',
			'membershipPrimaryDone' : 'primaryDone'
		},
		
		_constructor : function(){
			BaseController.prototype._constructor.apply(this, arguments);	
			membershipService.getData().then(angular.bind(this, function(membership){
			    viewModel.membershipName = membershipService.getPassKind().Name;
			    viewModel.indexDescription = membershipService.getIndexDescription();

				state.loading = false;
				CommunicatorService.send('membershipPrimaryStart');
				if(membershipService.isJointMembership()){
					CommunicatorService.send('jointStart');
				}
				this.viewModel.productName = membershipService.getProductName();
			}));
		},
		
		setupDone : function(data){
			
		},
		
		primaryDone : function(){
			
			this.state.adultError = false;
			this.state.addOnError = false;

		    if(membershipService.isJointMembership()){
				if(!membershipService.validateAdults()){
					this.state.adultError = true;
					return false;
				}
				if(!membershipService.validateAddOns()){
					this.state.addOnError = true;
					return false;
				}
			}
			
			this.state.loading = true;
			membershipService.saveMembership().then(angular.bind(this, function(response){
			    if (response.success) {
			        var qs = pageStateService.getQueryString();
			        if (qs.returntocart === "true") {
			            pageStateService.go('cart');
			        }
					else if(membershipService.isUpdateOnly()){
						pageStateService.go('viewItems');
					}else{
						var target = pageStateService.getRoot()+'CheckoutRouter/nextMembership/'+membershipService.getOrderLineId();
						window.location = target;
					}
					
				}else{	
					this.saveError(response);
				}
			}));
		},
		
		saveError : function(response) {
		    this.state.saveError = response.error;
			this.state.loading = false;
		}
	});
	
	return new MembershipController($scope);
	
}]);

GTS.membership.factory('membershipService', [
	
	'$q','$injector','apiService', 'pageStateService','classify','membershipConfigModel','currentAccountModel','cartModel','MembershipModel','MemberModel','memberTypesModel','storageService', function(
	 $q,  $injector,  api,          pageStateService,  classify,  membershipConfigModel,  currentAccountModel,  cartModel,  Membership,       Member,       memberTypesModel, storageService){
			
	var membershipItem = null;
	
	var addOnNames = {};
	
	var product = {},
		passKind = {},
		cartItem = {},
		pass = null,
		cart = null;
		
	var MEMBER_TYPES = {
		standard : 0,
		addOn : 1
	};
	
	var MEMBER_DEMOGRAPHIC_TYPES = {
		adult : 0,
		child : 1,
		addOn : 2
	};
	
	var addOnFieldRules = {};
	
	var MembershipService = classify({
		
		getData : function(){
				
			var request = $q.defer(),
				self = this;
				
			membershipItem = $injector.get('membershipItem');
			
			$q.all([ this.getConfig(), this.getUserData()]).then(function(){
			    self.getPassDetails().then(function () {
					//self.setupMembership();
					request.resolve(pass);
				});
			});
			
			return request.promise;	
		},
		
		// this call gets config data like relationship types and titles
		getConfig : function(){
			return $q.all([
				api.getRelationshipTypes().then(function(response){
					membershipConfigModel.relationshipTypes = response.data;
				}),
				api.getTitles().then(function(response){
					membershipConfigModel.titles = response.data;
				}),
				api.getSuffixes().then(function(response){
					membershipConfigModel.suffixes = response.data;
				}),
				api.getMultipleChoices().then(function(response){
					membershipConfigModel.choices = response.data;
				}),
				api.getGeneralConfig().then(function(response){
					membershipConfigModel.general = response.data;
				}),
				api.getCountries().then(function(response){
					membershipConfigModel.countries = response.data;
				}),
				api.getCart().then(function(response){
				    cart = response.data;
				    membershipConfigModel.cart = cart;

					var mems = [];
					angular.forEach(cart.Items, function(item, index){
						if(item.ProductType === 8){
							mems.push(item);
						}
					}, this);

					var dualJointIndex = 0;
					var lastPrimaryIndex = 0;
					angular.forEach(mems, function(_mem, index){

						if(_mem.IsDualJoint){
							dualJointIndex = index;
							var dualPrimary = mems[lastPrimaryIndex];
							if(dualPrimary){
								_mem.primaryDual = dualPrimary;
							}
						}else{
							lastPrimaryIndex = index;
						}

					}, this);
										
				}),
				api.getMultipleChoices().then(function(response){
					membershipConfigModel.multipleChoices = response.data;
				})
			]);
		},
		
		getCart : function(){
			return membershipConfigModel.cart;	
		},
		
		// this call gets user specific data like cart contents
		getUserData : function(){
			return api.getAccount().then(function(response){
				if(response.success){
					$.extend(currentAccountModel, response.data);
				}else{
					currentAccountModel = null;
				}
			});
		},
		
		getPassDetails : function(){
			var d = $injector.get('membershipItem');
			return this.getProductDetails(d);
		},
		
		// this function sets up new Membership classes for each membership
		setupMembership : function(){
		
		},
		
		// make a call to get details for the membership, and create a new membership
		getProductDetails : function(item){
			cartItem = item;
			//
			var hasDetails = $q.defer(),
				self = this;
			
			// async
			api.getProduct(item.plu).then(function(response){				
				product = response.data;
				// async
				api.getPassKind(product.PassKindId).then(function(response){
					passKind = response.data;
					// async
					self.loadPass(item).then(function(){
						// sync
						//self.setMembership(details);
						hasDetails.resolve();
					});
				});
			});
			return hasDetails.promise;
		},
		
		loadPass : function(item){

			angular.forEach(cart.Items, function(_item){
				if(_item.Id === item.id){
					cartItem.passId = _item.PassId;
				}
			}, this);
			
			var request = $q.defer();
			if(cartItem.passId || item.visualId){
				
				var getPassCall = (item.visualId) ? api.getPassByVisualId(item.visualId) : api.getPass(cartItem.passId);
			
				getPassCall.then(function(response){
				    pass = new Membership(response.data);
				    
					angular.forEach(pass.Members, function(member, i){
						var m = pass.Members[i] = new Member(member);
					});
					request.resolve();
				});
			}
			else{
				pass = new Membership({
					JointMembership: passKind.JointMembership, // - this comes from the pass
					Master: 0, // - this comes from the pass
					PassKindId: passKind.Id, // - this comes from the pass,
				});
				request.resolve();
			}
			return request.promise;
		},
		
		isExistingPass : function(){
			return pass.Id !== 0;
		},
		
		getProductName : function(){
			return product.Name;	
		},
		
		setMembership : function(d){
			var mem = {
				PassKindId : details.passKind.Id,
				JointMembership : details.passKind.JointMembership,
			};
			
			if(d.pass && d.pass.Members.length) {
			    mem.Members = d.pass.Members;
			}
			
			membership = new Membership(mem);
			
			this.translateMembers();
		},
		
		isJointMembership : function(){
			return passKind.JointMembership && !this.isUpdateOnly();
		},
		
		getMembership : function(){
			return pass;
		},
		
		addAddOn : function(data){
			
			var mem = new Member({
				Fields : {},
				OrderLineId : data.OrderLineId,
				Plu : data.Plu,
				MemberType : MEMBER_TYPES.addOn,
				MemberDemographicType : MEMBER_DEMOGRAPHIC_TYPES.addOn,
				display : data.display
			});
			pass.Members.push(mem);
			
			this.updateQtys();
			return mem;
		},
		
		addPrimaryMember : function(fields){
			
			var member = new Member({
				Fields : fields,
				OrderLineId : cartItem.id,
				MemberType : MEMBER_TYPES.standard,
				MemberDemographicType : MEMBER_DEMOGRAPHIC_TYPES.adult,
				PrimaryMember : true
			});
			
			pass.Members.push(member);
			pass.AdultQty++;	
		},
		
		addNonPrimaryAdult : function(fields){
			
			if(cartItem.updateOnly && !cartItem.id){
				var primary = this.getPrimaryMember();
				cartItem.id = primary.OrderLineId;	
			}

			var member = new Member({
				Fields : fields,
				OrderLineId : cartItem.id,
				MemberType : MEMBER_TYPES.standard,
				MemberDemographicType : MEMBER_DEMOGRAPHIC_TYPES.adult,
			});
			
			pass.Members.push(member);
			pass.AdultQty++;
		},
		
		addChild : function(fields){
			
			if(cartItem.updateOnly && !cartItem.id){
				var primary = this.getPrimaryMember();
				cartItem.id = primary.OrderLineId;	
			}

			var member = new Member({
				Fields : fields,
				OrderLineId : cartItem.id,
				MemberType : MEMBER_TYPES.standard,
				MemberDemographicType : MEMBER_DEMOGRAPHIC_TYPES.child,
				Named : (fields.First && fields.Last ? true : false)
			});
			pass.Members.push(member);
			pass.ChildQty++;
			
		},
		
		editPrimaryMember : function(fields){
			var primary = this.getPrimaryMember();
			primary.Fields = fields;			
		},
		
		removeMember : function(mem){
			angular.forEach(membership.Members, function(member, index){
				if(member === mem){
					membership.Members.splice(index, 1);
				}
			});
			this.updateQtys();			
			return membership;
		},
		
		editMember : function(mem, newFields){		
				
			angular.forEach(pass.Members, function(member, index){
				if(member === mem){
					if(!member.OrderLineId){
					}
					member.Fields = newFields;
				}
			});				
			return mem;
		},
		
		saveMembership : function(){
			
			var request = $q.defer();
			
			var formattedMembership = pass._flatten();
			
			if(pass.Id){
				
				var updateCall;
				if(cartItem.updateOnly){
				    var primary = this.getPrimaryMember();
				    
					if(primary.Fields.DOB){
						//var date = new Date(primary.Fields.DOB);
						angular.forEach(formattedMembership.Members, function(member){
							if(member.ContactId === primary.ContactId){
								
								//todo bday
							}
						});	
					}
					this.storeMem(formattedMembership);
					updateCall = api.updateNonOrderPass(formattedMembership);
				}else{
					this.storeMem(formattedMembership);
					updateCall = api.updatePass(formattedMembership);
				}
				
				updateCall.then(function(){
					request.resolve({
						success : true
					});
				}, function(response){
					request.resolve({
						success : false,
						error : response.data
					});
				});
				
			}else{
				
				if(formattedMembership.Members[0].UsePassAsBilling === undefined){
					formattedMembership.Members[0].UsePassAsBilling = false;
				}

				this.storeMem(formattedMembership);
				api.savePass(formattedMembership).then(function(){
					request.resolve({
						success : true
					});
				}, function(response){
					request.resolve({
						success : false,
						error : response.data
					});
				});
			}
				
			return request.promise;
		},
		
		getAccount : function(){
			return currentAccountModel;
		},
		
		getPass : function(){
			return pass;
		},
		
		getMaxNonPrimaryAdults : function(){
			return passKind.MaxAdults - 1; // -1 for primary
		},
		
		getMaxChildren : function(){
			return passKind.MaxChildren;
		},
		
		getPassKind : function(){
			return passKind;
		},
		
		getMembershipId : function(){
			return details.orderLineId;
		},

		getHasMemberAddOns : function() {
			return passKind.HasMemberAddOns;
		},
		
		getDefaultCountryCode : function(){
			return membershipConfigModel.general.DefaultCountryCode;
		},
		
		getCountries : function(){
			return membershipConfigModel.countries;	
		},
		
		getPrimaryMember : function(){
			var member = null;
			angular.forEach(pass.Members, function(mem){
				if(mem.PrimaryMember){
					member = mem;
				}
			});	
			return member;
		},
		
		UsePassAsBilling: function (ContactGuid) {
			var pm = this.getPrimaryMember();
			pm.ContactGuid = ContactGuid;
		    pass.ForceNewGuid = false;
			pm.UsePassAsBilling = true;
		},

		unlinkPassAsBilling: function () {
            var pm = this.getPrimaryMember();
            pm.ContactGuid = "";
            pass.ForceNewGuid = true;
            pm.UsePassAsBilling = false;
        },
		
		getPrimaryFieldRules : function(){
			var rules = [];
			angular.forEach(passKind.FieldRules, function(rule){
				if(rule.MemberType === memberTypesModel.primary){
					rules.push(rule);
				}
			});
			return rules;
		},
		
		getAdultFieldRules : function(){
			var rules = [];
			angular.forEach(passKind.FieldRules, function(rule){
				if(rule.MemberType === memberTypesModel.adult){
					rules.push(rule);
				}
			});
			return rules;
		},
		
		getChildFieldRules : function(){
			var rules = [];
			angular.forEach(passKind.FieldRules, function(rule){
				if(rule.MemberType === memberTypesModel.child){
					rules.push(rule);
				}
			});
			return rules;
		},
		
		
		getFieldRulesByDemographicType : function(demoType, plu){
				
			var request = $q.defer();
			
			switch(demoType){
				case 0:
					request.resolve(this.getAdultFieldRules());
					break;
				case 1:
					request.resolve(this.getChildFieldRules());
					break;
				case 2:
					this.getAddOnFieldRules(plu).then(function(rules){
						request.resolve(rules);
					});
					break;
			}
			return request.promise;
		},
		
		getAddOnFieldRules : function(plu){
			
			var calls = [],
				request = $q.defer();
				
			if(plu){
				if(addOnFieldRules[plu] && addOnFieldRules[plu].length){
					request.resolve(addOnFieldRules[plu]);
					return request.promise;
				}else{
					calls.push(api.getProduct(plu));
				}				
			}else{
				var addOns = this._getCartAddOns();
				angular.forEach(addOns, function(item){
					if(!addOnFieldRules[item.Plu]){
						addOnFieldRules[item.Plu] = [];
						calls.push(api.getProduct(item.Plu));
					}
				});
			}
			
			$q.all(calls).then(function(responses){
				angular.forEach(responses, function(res){
										
					var plu = res.data.Plu,
						rules = [];
					angular.forEach(res.data.FieldRules, function(rule){
						if(rule.MemberType === 4){
							rules.push(rule);	
						}
					});
					
					addOnFieldRules[plu] = rules;
					addOnNames[plu] = res.data.Name;
				});
				request.resolve(addOnFieldRules[plu]);				
			});	
			
			return request.promise;

		},
		
		getAddOnCount : function(){
			return membershipItem.addOnPlus.length;
		},

        getIndexDescription : function() {
            return membershipItem.indexDescription;
        },
		
		setAddOnNames : function(plu, name){
			addOnNames[plu] = name;
		},
		
		getMaxAddOns : function(){
			if(cartItem.updateOnly){
				return 0;
			}
			return passKind.MaxAddons;
		},
		
		getPassAdults : function(){
			var adults = [];
			if(pass.Members){
				angular.forEach(pass.Members, function(member){
					if(member.MemberDemographicType === MEMBER_DEMOGRAPHIC_TYPES.adult){
						adults.push(member);
					}
				});	
			}
			return adults;
		},
		
		getPassNonPrimaryAdults : function(){
			var adults = [];
			if(pass.Members){
				angular.forEach(pass.Members, function(member){
					if(member.MemberDemographicType === MEMBER_DEMOGRAPHIC_TYPES.adult && !member.PrimaryMember){
						adults.push(member);
					}
				});	
			}
			return adults;	
		},
		
		getPassPrimary : function(){
			var primaries = [];
			angular.forEach(membership.Members, function(member){
				if(member.MemberType === memberTypesModel.primary){
					primaries.push(member);
				}
			});
			return primaries;
		},
		
		getPassChildren : function(){
			var children = [];
			if(pass.Members){
				angular.forEach(pass.Members, function(member){
									
					if(member.MemberDemographicType === MEMBER_DEMOGRAPHIC_TYPES.child){
						children.push(member);
					}
				});	
			}
			return children;	
		},
		
		savePicture : function(pictureId){
			pass.PictureID = pictureId;
		},
		
		isUpdateOnly : function(){
			return 	cartItem.updateOnly;
		},
		
		getAdults : function(){
				
		},
		
		getRelationshipTypes : function(){
			return membershipConfigModel.relationshipTypes;
		},
		
		getTitles : function(){
			return membershipConfigModel.titles;
		},
		
		getSuffixes : function(){
			return membershipConfigModel.suffixes;
		},
		
		updateQtys : function(){
			
			var adults = this.getPassAdults().length,
				children = this.getPassChildren().length;
			
			pass.AdultQty = adults;
			pass.ChildQty = children;
		},
		
		getOrderLineId : function(){
			return cartItem.id;
		},
		
		translateMembers : function(){	
			
			angular.forEach(membership.Members, function(member, index){
				
				// adult or primary
				if(member.MemberDemographicType === 0){
					if(member.PrimaryMember){
						member.MemberType = 0;
					}else{
						member.MemberType = 1;
					}
				}else if(member.MemberDemographicType === 2 && member.MemberType === 1){
					member.MemberType = 4;
				}else{
					member.MemberType = 2;	
				}
				membership.Members[index] = new Member(member);
			});		
			this.updateQtys();	
		},
		
		getAddOnPlus : function(){
			return api.getMemberAddOns(this.getPassKind().Id);
		},
		
		getMaxGuests : function(){
			return passKind.MaxGuests || 0;
		},
		
		updateCart : function(_cart){
			cart = _cart;
		},
		
		validateAdults : function(){
			
			var adultCount = this.getPassAdults().length;
				valid = true;
				
			if(passKind.MinQtyNamedAdults){
				valid = (adultCount >= passKind.MinQtyNamedAdults);
			}
			
			return valid;
		},
		
		validateAddOns : function(){
			var valid = true,
				addOns = this._getPassAddOns();
			angular.forEach(addOns, function(addOn){				
				if(addOn.Named){
					if(!addOn.Fields.First || !addOn.Fields.Last){
					valid = false;
					}	
				}
			});
			return valid;
		},
		
		_getPassAddOns : function(){
			var addOns = [];
			if(pass && pass.Members){
				angular.forEach(pass.Members, function(member){					
					if(member.MemberType === MEMBER_TYPES.addOn){
						member.display = addOnNames[member.Plu];
						
						if(!member.Fields.First && !member.Fields.Last){
							member.Named = false;
						}
											
						addOns.push(member);
					}
				});	
			}	
			return addOns;
		},
	
		_getCartAddOns : function(){
			var items = [];
			angular.forEach(cart.Items, function(item){
				// add on product type
				if(item.ProductType === 15){
					items.push(item);
				}
			});
			return items;
		},
		
		_formatAddOns : function(){
			
			var cartAddOns = this._getCartAddOns(),
				passAddOns = this._getPassAddOns();
				
			angular.forEach(passAddOns, function(addOn, index){
				cartAddOns[index] = addOn;
			});
	
			angular.forEach(cartAddOns, function(addOn){
				if(!addOn.Fields){					
					this.addAddOn({
						OrderLineId : addOn.Id,
						Plu : addOn.Plu,
						display : addOn.Name
					}, 4);
				}else{
				}
			}, this);
		},
		
		_getAddOnsNew : function(){
			var addons = [];
			if(pass.Members){
				angular.forEach(pass.Members, function(member){
					if(member.MemberType === memberTypesModel.addon){
						addons.push(member);
					}
				});
			}
			return addons;
		},
		
		getMultipleChoices : function(id){
			if(id){
				var choices = [];
				angular.forEach(membershipConfigModel.multipleChoices, function(choice){
					if(choice.MultipleChoiceID == id){
						choices.push(choice);
					}
				});
				return choices;
			}else {
			    return membershipConfigModel.multipleChoices;
			}
		},

		deletePhoto : function(pictureId) {
			var request = $q.defer();
			api.deletePassPhoto(pictureId).then(function() {
				request.resolve();
			});
			return request.promise;
		},

		isDualJoint : function(){
			var mem = false;
			angular.forEach(cart.Items, function(item, index){
				if(item.Id === cartItem.id && item.IsDualJoint){
					mem = item;
				}
			}, this);
			return mem;
		},

		getDualPrimaryMember : function(passId){

			var mems = storageService.get('gts.memberships'),
				target = mems[passId],
				mem = null;

			if(target){
				angular.forEach(target.Members, function(_member){
					if(_member.PrimaryMember){
						mem = _member;
					}
				});
			}
			return mem;
		},

		storeMem : function(mem){
			var stored = storageService.get('gts.memberships') || {};
			stored[cartItem.id] = mem;
			storageService.set('gts.memberships', stored);
		}

	});
	
	return new MembershipService();
	
}]);

GTS.base.factory('MembershipBaseContactForm', [
	
	'classify','ContactForm','TextFormField', 'SelectFormField','BirthdateFormField', 'FieldRulesMapModel','membershipService',function(
	 classify,  ContactForm,  TextFormField,   SelectFormField,  BirthdateFormField,   FieldRulesMapModel,  membershipService){
		 
	var MAP = {
		
	}; 
		 
	var MembershipBaseContactForm = classify(ContactForm, {
		
		userFields : [],
		memberDemographicType :0,
		
		fieldKinds : { numeric: 0, text: 1, checkbox: 2, dropdown: 3, raisersEdge: 4, date: 5},
		
		_constructor : function(model){
			ContactForm.prototype._constructor.apply(this, arguments);
		},
		
		setFields : function(fieldRules, model){

			angular.forEach(this, function(field){
				field.visible = false;
			});
			
			this.userFields = [];
			this.hideAddStreetButton = true;
			
			angular.forEach(fieldRules, function(rule){

				var ruleName = rule.ColumnName,
					contactField = this[FieldRulesMapModel[ruleName]];

				if(ruleName === 'Street2'){
					this.hideAddStreetButton = false; 
				}

				if (ruleName.toLowerCase() === 'gender') {
					//  Gender options is defined in the back end code at ~/views/membershipSetup/index.cshtml
					contactField.setOptions(genderOptions, "ResponseNo", "ResponseText", rule.Label);
					contactField.value = "0";
				}
						
				if(FieldRulesMapModel[ruleName]){	
					contactField.required = rule.Required;
					contactField.visible = true;
					
					if(rule.MChoiceID){
						var options = membershipService.getMultipleChoices(rule.MChoiceID);
						contactField.setOptions(options, 'ResponseNo', 'ResponseText', rule.Label);
						contactField.value = "";		
					}
				
					if(rule.MaximumValue){
						contactField.maxValue = rule.MaximumValue;
					}
					if(rule.MinimumValue){
						contactField.minValue = rule.MinimumValue;
					}
					
					if(model && model[ruleName]){
						contactField.value = model[ruleName];
						if(contactField.options){
							contactField.change();
						}
					}
					
				}else if(ruleName.indexOf('User') !== -1){
					this.userFields.push(ruleName);
					
					if(rule.FieldKindId === this.fieldKinds.numeric || rule.FieldKindId === this.fieldKinds.text || rule.FieldKindId === this.fieldKinds.raisersEdge){
						this[ruleName] = new TextFormField();
					}else if(rule.FieldKindId === this.fieldKinds.dropdown){
						this[ruleName] = new SelectFormField();
						
						var options2 = membershipService.getMultipleChoices(rule.MChoiceID);
						this[ruleName].setOptions(options2, 'ResponseNo', 'ResponseText', rule.Label);
						this[ruleName].value = "";	
					}
					
					this[ruleName].required = rule.Required;
					this[ruleName].display = rule.Label;
				}
			}, this);
		},
		
		toContact : function(fieldRules){
			var contact = {};
			angular.forEach(fieldRules, function(field){
				var name = field.ColumnName,
					contactField = this[FieldRulesMapModel[name]];
					
				if(contactField && contactField.value){
					contact[name] = contactField.value;
				}else if(name.indexOf('User') !== -1){
					contact[name] = this[name].value;
				}
			}, this);
			
			return contact;
		}
	});
	
	return MembershipBaseContactForm;

}]);

GTS.membershipLookupResults.factory('MembershipLookupResultsViewModel', [
	
	'classify','BaseViewModel', function(
	 classify,  BaseViewModel){
	
	return classify(BaseViewModel, {
		
		_constructor : function(obj){
			this.result = obj;
		},
			
		result : null
		
	});
	
}]);

GTS.membershipLookupResults.factory('MembershipLookupResultsController', [
	
	'BaseController','classify','MembershipLookupResultsViewModel',function(
	 BaseController,  classify,  MembershipLookupResultsViewModel){
	
	var MembershipLookupController = classify(BaseController, {
		viewModel : {},
		listeners : {
			'membershipLookupResults' : 'init'
		},
		
		init : function(data){
			this.scope.viewModel = new MembershipLookupResultsViewModel(data);
		}
		
	});
	
	return MembershipLookupController;
	
}]);

GTS.membershipLookupResults.controller('membershipLookupResultsInstance', ['$scope','MembershipLookupResultsController', 'classify', function($scope, MemberLookupResultsController, classify){
	
	return new MemberLookupResultsController($scope);
	
}]);



GTS.membershipLookup.factory('MembershipLookupController', [
	
	'CommunicatorService','BaseController','MembershipLookupState','MembershipLookupViewModel','membershipLookupService','classify', function(
	 CommunicatorService,  BaseController,  MembershipLookupState,  MembershipLookupViewModel,  membershipLookupService,  classify){
		 
	var MembershipLookupController = classify(BaseController, {
		
		registrations : ['submit'],
		viewModel : new MembershipLookupViewModel(),
		state : new MembershipLookupState(),

		postConstruct : function() {
			membershipLookupService.getLookupOptions().then(angular.bind(this, this.onLoadLookupOptions));
		},

		onLoadLookupOptions : function(options) {
			this.viewModel.visualId.visible = options.UseVisualId;
			if(this.viewModel.visualId.visible) this.viewModel.visualId.required = true;
			this.viewModel.passAccount.visible = options.UsePassAccount;
			if(this.viewModel.passAccount.visible) this.viewModel.passAccount.required = true;
			this.viewModel.dob.visible = options.UseBirthDate;
			if(this.viewModel.dob.visible) this.viewModel.dob.required = true;
			this.viewModel.lastName.visible = options.UseLastName;
			if(this.viewModel.lastName.visible) this.viewModel.lastName.required = true;
			this.state.loading = false;		
		},

		submit: function () {
			if(this.viewModel.validate()){
				this.state.loading = true;
				var data = {
					visualId: this.viewModel.visualId.value,
					passAccount: this.viewModel.passAccount.value,
					lastName: this.viewModel.lastName.value,
					dob: this.viewModel.dob.value
				};
				return this.lookup(data);
			}
			else{
				return false;
			}
		},
		
		lookup : function(data){
			membershipLookupService.lookup(data).then(angular.bind(this, this.done));
		},

		done : function(response){
			delete this.viewModel.errorCode;
			this.state.loading = false;
			if(response.success){
				this.go(response.data);
			}else{
				this.error();
			}
		},
		error : function(){
			this.viewModel.errorCode = 'failure';
		},
		
		go : function(data){
			
			CommunicatorService.send('membershipLookupResults', data);
			
		}
	});
	
	return MembershipLookupController;

}]);

GTS.membershipLookup.controller('membershipLookupInstance', [
	
	'$scope','MembershipLookupController','classify',function($scope, MembershipLookupController, classify){
	
	return new MembershipLookupController($scope);
	
}]);

GTS.membershipLookup.factory('membershipLookupService', ['classify', 'apiService', function(classify, api){
	
	var MembershipLookupService = classify({
		getLookupOptions : function() {
			return api.ticketLookupOptions();
		},

		lookup : function(data){
			
			if(data.dob){
				var date = new Date(data.dob);
				data.dob = [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');	
			}
			

			return api.ticketLookup(data);
		}
	});
	
	return new MembershipLookupService();
	
}]);

GTS.membershipLookup.factory('MembershipLookupState', ['classify', function(classify){

	var MembershipLookupState = classify({
		loading : false
	});
	
	return MembershipLookupState;

}]);

GTS.membershipLookup.factory('MembershipLookupViewModel', [
	
	'baseViewModel','classify','TextFormField','BaseForm','BirthdateFormField',function(
	 baseViewModel,  classify,  TextFormField,  BaseForm,  BirthdateFormField){
	
	var MembershipViewModel = classify(BaseForm, {
		visualId : new TextFormField({
			required: true,
			visible: false
		}),
		passAccount : new TextFormField({
			required : false,
			visible : false
		}),
		dob : new BirthdateFormField({
			required : false,
			visible : false
		}),
		lastName : new TextFormField({
			required: true,
			visible: false
		})
	});
	
	return MembershipViewModel;
	
}]);

GTS.multiTimeSelectorModal.factory('MultiTimeSelectorModalService', [	
	'classify','ViewItemsPostBackService','MultiTimeSelectorModalParser','EventTimeModalService',function(
	 classify,  ViewItemsPostBackService,  MultiTimeSelectorModalParser,  EventTimeModalService){
		
		var MultiTimeSelectorModalService = classify(EventTimeModalService, {
			
			postBackService : new ViewItemsPostBackService(new MultiTimeSelectorModalParser()),
			
			selectMultiTime : function(qtys, button){
				return this.postBackService.selectMultiTime(qtys, button);
			}
			
		});
		
		return MultiTimeSelectorModalService;	
	}
]);

GTS.multiTimeSelectorModal.factory('MultiTimeSelectoModalController', [
	
	'classify','BaseViewModel','EventTimeModalController','MultiTimeSelectorModalService','NumericFormField','CommunicatorService',function(
	 classify,  BaseViewModel,  EventTimeModalController,  MultiTimeSelectorModalService,  NumericFormField,  CommunicatorService){
	
		var MultiTimeSelectoModalController = classify(EventTimeModalController, {
			
			listeners : {
				'multiTimeSelectorModal.get' : 'openModal',
			},
			state : {
			    showModal: false,
			    selectOneError: false
			},
			registrations : ['closeModal','select','selectDay','back','changeYear','changeMonth','nextMonth','prevMonth'],
			viewModel : new BaseViewModel(),
			
			_constructor : function(){
				EventTimeModalController.prototype._constructor.apply(this, arguments);
				this.service = new MultiTimeSelectorModalService();
			},
			
			onModalOpen: function (item) {
				this.service.getData(item).then(angular.bind(this, this.updateDisplay, item));
			},
			
			updateDisplay: function (item, calendar) {
				this.viewModel.calendar = calendar;
				this.state.loading = false;
			    this.state.selectOneError = false;
				angular.forEach(calendar.times, function(time){
					time.quantity = new NumericFormField(time.quantity);
					time.quantity.maxValue = parseInt(time.availability);
				});	
			},
			
			select : function(){
				
				this.state.loading = true;
			
				var qtys = [];
				angular.forEach(this.viewModel.calendar.times, function(time){
					if(parseInt(time.quantity.value) > 0){
						qtys.push(time.quantity);
					}
				});

				if (qtys.length === 0) {
				    this.state.selectOneError = true;
                    this.state.loading = false;
                    return;
                }
				
				this.service.selectMultiTime(qtys, this.viewModel.calendar.continueButton).then(angular.bind(this, function(response){
					
					window.location.reload();
				}));
			}
			
		});
		
		return MultiTimeSelectoModalController;
	
	}

]);

GTS.multiTimeSelectorModal.controller('multiTimeSelectorModalInstance', ['classify','MultiTimeSelectoModalController', '$scope',function(classify, MultiTimeSelectoModalController, $scope){
	
	var MultiTimeSelectoModalInstance = classify(MultiTimeSelectoModalController, {
		
	});
	
	return new MultiTimeSelectoModalInstance($scope);
	
}]);

GTS.multiTimeSelectorModal.factory('MultiTimeSelectorModalParser', [
	
	'classify','EventTimeModalParser',function(
	 classify,  EventTimeModalParser){
		
		var MultiTimeSelectorModalParser = classify(EventTimeModalParser, {
			
			selector : '#MultiTimeEventsSelector',
			
			getTimes : function(html, model){
				
				model.timeHeader = $.trim(html.find('.MultiTimeEventTopHeader').text());
				
				var headerEl = html.find('#MultiTimeEventHeaderRow');
			
				model.header = {
					time : 	headerEl.find('.displayTime').text() || headerEl.find('.displayWithEndTime').text(),
					name : headerEl.find('#MultiTimeEventNameCell').text(),
					status : headerEl.find('#MultiTimeEventStatus').text(),
					available : headerEl.find('#MultiTimeEventAvailability').text(),
					quantity : headerEl.find('#MultiTimeQuantityCell').text()
				};
				
				model.times = [];
				var rows = html.find('#MultiTimeEventBody').find('tr');
				
				angular.forEach(rows, function(row){
					row = $(row);
					var o = {
						time : row.find('.displayTime').text() || row.find('.displayWithEndTime').text(),
						name : row.find('.MultiTimeEventNameCell').text(),
						status : row.find('.MultiTimeEventStatus').text(),
						availability : row.find('.MultiTimeEventAvailability').text()
					};
					
					var quantityEl = row.find('#numeric-box input');
		
					o.quantity = {
						name : quantityEl.attr('name'),
						value : quantityEl.val() || 0
					};
					
					if(parseFloat(o.availability) === 0){
						o.quantity.disabled = true;
					}
					
					model.times.push(o);
				});

			    var button = html.find('.MultiTimeEventContinueButton');
				
				model.continueButton = {
					name : button.attr('name'),
					text : button.val()
				};
			}
		});	
		
		return MultiTimeSelectorModalParser;
	}
]);

GTS.multiTimeSelector.factory('MultiTimeSelectorViewModel', ['classify','BaseViewModel',function(classify, BaseViewModel){
	
	var MultiTimeSelectorViewModel = classify(BaseViewModel, {
		
		_constructor : function(){
			
			
		},
		
	});
	
	return MultiTimeSelectorViewModel;
	
}]);

GTS.multiTimeSelector.factory('MultiTimeSelectorController', [
	
	'classify','BaseController','MultiTimeSelectorViewModel','CommunicatorService','DomDataParser',function(
	 classify,  BaseController,  MultiTimeSelectorViewModel,  CommunicatorService,  DomDataParser){
	
	var MultiTimeSelectorController = classify(BaseController, {
	
		viewModel : {},
		registrations : ['selectEvent'],
		listeners : {
			'multiTimePluSelector.get' : 'update'
		},
	
		_constructor : function(){
			BaseController.prototype._constructor.apply(this, arguments);
			setTimeout(angular.bind(this, function(){
				
				this.viewModel = this.scope.viewModel = this.scope.data;
				this.scope.$apply();
			}), 0);
		},
		
		selectEvent : function(){
			CommunicatorService.send('multiTimeSelectorModal.get', this.viewModel);
		},
		
		update : function(newData){
			
			this.viewModel = this.scope.viewModel = newData;
			
		}
		
	});
	
	return MultiTimeSelectorController;
	
}]);

GTS.multiTimeSelector.controller('multiTimeSelectorInstance', [
	
	'classify','MultiTimeSelectorController','$scope',function(classify, MultiTimeSelectorController, $scope){
	
	var MultiTimeSelectorInstance = classify(MultiTimeSelectorController, {
		
		
	});
	
	return new MultiTimeSelectorInstance($scope);
	
}]);

GTS.newAccountModal.factory('NewAccountModalController', ['classify','BaseController','CommunicatorService','ModalController','NewAccountModalViewModel','WebFormsService','newAccountModalService','pageStateService',
	function(classify, BaseController, CommunicatorService, ModalController,NewAccountModalViewModel,WebFormsService,newAccountModalService,pageStateService
	){

		var NewAccountModalBaseController = classify(BaseController, [ModalController, {

			state : {},
			scope : {},

			_constructor : function(){
				BaseController.prototype._constructor.apply(this, arguments);
				WebFormsService.onSubmit(angular.bind(this, this.submit));
			},

			listeners : {
				'newAccountModal.get' : 'openModal'
			},

			registrations : ['closeModal'],

			onModalOpen : function(viewModel){
				this.viewModel = this.scope.viewModel = new NewAccountModalViewModel(viewModel);
				this.state.loading = false;
			},

			submit : function(){
				if(this.state.showModal){
					if(this.viewModel.contact.validate()){
						newAccountModalService.send(this.viewModel).then(function(data){
							pageStateService.go('loyaltySelector');
						}, angular.bind(this, function(data){

							if(typeof data === 'string')
							{
								this.scope.generalError = data;
							}else{
								var hasErrors = this.viewModel.checkErrors(data);
								if(!hasErrors){
									pageStateService.go('loyaltySelector');
								}
							}

						}));
						return false;
					}else{
						this.scope.$apply();
						return false;	
					}
				}
			}

		}]);

		return NewAccountModalBaseController;
	}
]);

GTS.newAccountModal.controller('newAccountModalInstance', ['classify','NewAccountModalController','$scope',
	function(classify, NewAccountModalController, $scope
	){

		var NewAccountModalInstance = classify(NewAccountModalController, {
			
			// add methods here

		});

		return new NewAccountModalInstance($scope);
	}
]);

GTS.newAccountModal.factory('newAccountModalService', ['classify','$q','BasePostBack','WebFormsService','DomDataParser',
	function(classify, $q, BasePostBack, WebFormsService,DomDataParser
	){

		var NewAccountModalService = classify(BasePostBack, {

			send : function(viewModel){

				var req = $q.defer();
				var data = {
					'ctl00$ContentPlaceHolder$ScriptManager1':'ctl00$ContentPlaceHolder$UpdatePanel|'+viewModel.continue.name,
					'__ASYNCPOST' : true
				};

				data[viewModel.contact.username.name] = viewModel.contact.username.value;
				data[viewModel.contact.password.name] = viewModel.contact.password.value;
				data[viewModel.contact.confirmPassword.name] = viewModel.contact.confirmPassword.value;
				data[viewModel.contact.firstName.name] = viewModel.contact.firstName.value;
				data[viewModel.contact.middleName.name] = viewModel.contact.middleName.value;
				data[viewModel.contact.lastName.name] = viewModel.contact.lastName.value;
				data[viewModel.contact.street1.name] = viewModel.contact.street1.value;
				data[viewModel.contact.country.name] = viewModel.contact.country.value;
				data[viewModel.contact.city.name] = viewModel.contact.city.value;
				data[viewModel.contact.state.name] = viewModel.contact.state.value;
				data[viewModel.contact.zipCode.name] = viewModel.contact.zipCode.value;
				data[viewModel.contact.phone.name] = viewModel.contact.phone.value;
				data[viewModel.contact.email.name] = viewModel.contact.email.value;
				data[viewModel.contact.confirmEmail.name] = viewModel.contact.confirmEmail.value;				
				data[viewModel.continue.name]= viewModel.continue.value;

				WebFormsService.setModel(data);
				WebFormsService.updatePage();

				this.request().then(function(response){
					var dpp = new DomDataParser(response.data);
					var _data = dpp.getData();
	
					if(_data.error){
						req.reject(_data.error);
					}else{
						var er = false;
						for(var prop in _data){
							var val = _data[prop];
							if(prop.indexOf('Validator') > -1 && val){
								er = true;
							}
						}
						if(er){
							req.reject(_data);
						}else{
							req.resolve(_data);
						}
					}
				});
				
				return req.promise;
			}

				
		});

		return new NewAccountModalService();
	}
]);

GTS.newAccountModal.factory('NewAccountModalViewModel', ['classify','BaseForm','ContactForm','TextFormField','SelectFormField',
	function(classify, BaseForm,ContactForm, TextFormField, SelectFormField
	){

		var NewAccountModalViewModel = classify(BaseForm, {

			_constructor : function(model){

				this.contact.username = new TextFormField(model.usernameEl);
				this.contact.password = new TextFormField(model.passwordEl);
				this.contact.confirmPassword = new TextFormField(model.confirmPasswordEl);
				if(model.NameTitleTextBoxEl){
					this.contact.title = new TextFormField(model.NameTitleTextBoxEl);
					this.contact.title.errorProp = 'NameTitleFieldValidator';

					this.contact.title.onChange = function(){
						angular.forEach(this.contact.title.options, function(title){
							if(title.value == this.contact.title.value){
								this.contact.title.displayName = title.text;
							}
						}, this);
					}.bind(this);
				}
				if(model.companyCodeEl){
					this.contact.companyCode = new TextFormField(model.companyCodeEl);
				}
				if(model.FirstNameTextBoxEl){
					this.contact.firstName = new TextFormField(model.FirstNameTextBoxEl);
					this.contact.firstName.errorProp = 'FirstNameFieldValidator';
				}
				if(model.MiddleNameTextBoxEl){
					this.contact.middleName = new TextFormField(model.MiddleNameTextBoxEl);
				}
				if(model.LastNameTextBoxEl){
					this.contact.lastName = new TextFormField(model.LastNameTextBoxEl);
					this.contact.lastName.errorProp = 'LastNameFieldValidator';
				}
				if(model.Street1TextBoxEl){
					this.contact.street1 = new TextFormField(model.Street1TextBoxEl);
					this.contact.street1.errorProp = 'Street1FieldValidator';
				}
				if(model.Street2TextBoxEl){
					this.contact.street2 = new TextFormField(angular.extend(model.Street2TextBoxEl, {required : false}));
					this.contact.street2.errorProp = 'Street2TextFieldValidator';
				}
				if(model.CityTextBoxEl){
					this.contact.city = new TextFormField(model.CityTextBoxEl);
					this.contact.city.errorProp = 'CityFieldValidator';
				}
				if(model.CountryDropDownListEl){
					this.contact.country = new SelectFormField(model.CountryDropDownListEl);
					this.contact.country.errorProp = 'CountryFieldValidator';
					this.contact.country.change();
				}
				if(model.RegionDropDownListEl){
					this.contact.state = new SelectFormField(model.RegionDropDownListEl);
					this.contact.state.errorProp = 'RegionFieldValidator';
					this.contact.state.change();
				}
				if(model.PostalTextBoxEl){
					this.contact.zipCode = new TextFormField(model.PostalTextBoxEl);
					this.contact.zipCode.errorProp = 'PostalFieldValidator';
				}
				if(model.PhoneTextBoxEl){
					this.contact.phone = new TextFormField(model.PhoneTextBoxEl);
					this.contact.phone.errorProp = 'PhoneFieldValidator';
				}
				if(model.cellEl){
					this.contact.mobile = new TextFormField(model.cellEl);
					this.contact.mobile.errorProp = 'CellFieldValidator';
				}
				if(model.EmailTextBoxEl){
					this.contact.email = new TextFormField(model.EmailTextBoxEl);
				    this.contact.email.errorProp = 'EmailFieldValidator';
				}
				if(model.EmailConfirmTextBoxEl){



					this.contact.confirmEmail = new TextFormField(model.EmailConfirmTextBoxEl);
				    this.contact.confirmEmail.errorProp = 'EmailConfirmFieldValidator';
				}
				this.continue = model.continueButtonEl;
			},

			checkErrors : function(otherModel){
				otherModel = otherModel || this.contact;
				var err = false;
				for(var prop in this.contact){
					var field = this.contact[prop];
					if(field.errorProp && otherModel[field.errorProp]){
						field.error = true;
						err = true;
					}
				}

				// if there is a username error
				if(otherModel.usernameFieldValidator){
					this.contact.username.error = true;
					this.contact.username.errorMessage = otherModel.usernameFieldValidator;
					err = true;
				}
				return err;
			},
			
			contact : new ContactForm()

		});

		return NewAccountModalViewModel;
	}
]);

GTS.orderConfirmation.controller('OrderConfirmationController', [
	'$scope', 'BaseController', 'classify', 'ResponderService', 'OrderConfirmationService', 'OrderConfirmationViewModel', 'pageStateService', 'PackageControl', '$sce', function (
	 $scope,   BaseController,   classify,   ResponderService,   OrderConfirmationService,   OrderConfirmationViewModel,   pageStateService, PackageControl,    $sce){

		var state = { showViewTickets: false, hidePackageInput: true },
		device = {
			a : true,
			b : false,
			c : false
		};
		
	var OrderConfirmationController = classify(BaseController, [PackageControl, {

		viewModel : OrderConfirmationViewModel,
		state : state,
		device : device,
		
		registrations: ['viewTickets', 'printTickets', 'expandPackage'],

		initDevice : function(){
			this.scope.device = device;
			angular.forEach(device, function(val, key){
				device[key] = ResponderService.getBreakerStatus(key);
			});
		},
		
		postConstruct : function(){
			this.initDevice();
			
			this.viewModel.orderConfirmationData = OrderConfirmationService.getOrderConfirmationData();
			this.viewModel.pageData = OrderConfirmationService.getPageData();
			this.viewModel.pageData.pageTitle = $sce.trustAsHtml(this.viewModel.pageData.pageTitle);
			this.viewModel.items = OrderConfirmationService.getCartData().items;
			this.viewModel.header = OrderConfirmationService.getCartData().header;
	
			this.state.showViewTickets = this.viewModel.orderConfirmationData.PrintTicketsButton !== undefined && this.viewModel.orderConfirmationData.PrintTicketsButton !== null;
			
			ResponderService.bind('a', angular.bind(this, this.changeDevice));
			ResponderService.bind('b', angular.bind(this, this.changeDevice));
			ResponderService.bind('c', angular.bind(this, this.changeDevice));
			
			this.viewModel.cart = {};
			this.viewModel.cart.Totals = 
			{
				SubtotalDisplay : this.viewModel.pageData.footerSubtotalValue,
				TaxDisplay : this.viewModel.pageData.footerTaxValue,
				ShippingDisplay : this.viewModel.pageData.footerShippingValue,
				TotalDisplay : this.viewModel.pageData.footerTotalValue	
			};

			angular.forEach(this.viewModel.items, angular.bind(this, function (item) {
				if (item.packageDescription) {
					item.hasPackageDescription = true;

					item.packageDescription = $sce.trustAsHtml(item.packageDescription);

					item.showDetails = false;

					angular.forEach(item.packageItems, function (packageItem) {
						if (packageItem.isEvent || packageItem.passInfoLinkEl || packageItem.packageEventDate || packageItem.rosterLinks) {
							item.showDetails = true;
						}
					});
				} else {
					item.hasPackageDescription = false;
					item.showDetails = true;
				}
			}));
			
			this.viewModel.readOnlyCart = true;	
		},
		
		changeDevice : function(bool, breaker){
			device[breaker] = bool;
			this.scope.$apply();
		},
		
		viewTickets : function(){
			var url = pageStateService.getRootPage('viewTickets');
			window.open(url, "", "width=400, height=800");  
		},

        printTickets : function() {
            window.open('ViewTickets.aspx', 'ShowTickets', 'menubar=yes,scrollbars=yes,resizable=yes,width=600,height=560,top=0,left=0');
        }
	}]);

	return new OrderConfirmationController($scope);

}]); 

GTS.orderConfirmation.service('OrderConfirmationService', [
	
	'classify', '$sce', 'OrderConfirmationDomData', 'PageDomData', 'CartDomData', function(
	 classify,   $sce,   OrderConfirmationDomData,   PageDomData,   CartDomData){
	
	var orderConfirmationData = {};
	var pageData = {};
	
	var OrderConfirmationService = classify({
		_constructor : function(){
			orderConfirmationData = OrderConfirmationDomData;
			orderConfirmationData.PrinterFriendlyLinkSafe = $sce.trustAsHtml(orderConfirmationData.PrinterFriendlyLink);
			orderConfirmationData.HeaderHtmlSafe = $sce.trustAsHtml(orderConfirmationData.HeaderHtml);
			orderConfirmationData.BillingInfoSafe = $sce.trustAsHtml(orderConfirmationData.BillingInfo);
			orderConfirmationData.ShippingInfoSafe = $sce.trustAsHtml(orderConfirmationData.ShippingInfo);
			orderConfirmationData.DeliveryInfoSafe = $sce.trustAsHtml(orderConfirmationData.DeliveryInfo);
			orderConfirmationData.SurveyHtmlSafe = $sce.trustAsHtml(orderConfirmationData.SurveyHtml);
			orderConfirmationData.MarketingHtmlSafe = $sce.trustAsHtml(orderConfirmationData.MarketingHtml);
			orderConfirmationData.PrintTicketsHtmlSafe = $sce.trustAsHtml(orderConfirmationData.PrintTicketsHtml);
			orderConfirmationData.PrintTicketsButton = OrderConfirmationDomData.PrintTicketsButtonEl;

			pageData = PageDomData;
		},
		
		getOrderConfirmationData : function(){
			return orderConfirmationData;
		},
		
		getPageData : function(){
			return pageData;
		},
		
		getCartData : function(){
			return CartDomData;
		}
	});
	

	return new OrderConfirmationService();

}]);

GTS.orderConfirmation.factory('OrderConfirmationViewModel', ['baseViewModel', function(baseViewModel){
	return angular.extend({
		
		foo : 'bar'
		
	}, baseViewModel);
}]);

GTS.orderError.controller('OrderErrorController', [
	'$scope', 'BaseController', 'classify', 'BaseViewModel', 'pageStateService', function (
	 $scope,   BaseController,   classify,   baseViewModel,   pageStateService) {
		
	var OrderConfirmationController = classify(BaseController, {
		viewModel: angular.extend({}, baseViewModel),

		postConstruct : function(){
			this.scope.root = pageStateService.getRoot();
		}
	});

	return new OrderConfirmationController($scope);

}]); 

GTS.packagePlu.factory('PackageControl', ['classify', function(classify){


	return classify({

		expandPackage: function (item) {
			if(this.preExp && typeof this.preExp === 'function') this.preExp(item);
			item.expandPackage = !item.expandPackage;
			if(this.postExp && typeof this.postExp === 'function') this.postExp(item);
		}

	});

}]);

GTS.passConfirmation.controller('passConfirmationInstance', [
	
	'$scope','classify','MembershipLookupResultsController','PassConfirmationViewModel',function(
	 $scope,  classify,  MembershipLookupResultsController,  PassConfirmationViewModel
	){
		
		var PassConfirmationControllerInstance = classify(MembershipLookupResultsController, {
			
			viewModel : new PassConfirmationViewModel(),
			init : function(){}
			
		});
		
		return new PassConfirmationControllerInstance($scope);
		
	}]);

GTS.passConfirmation.factory('PassConfirmationViewModel', [
	
	'classify', 'BaseViewModel', 'PassConfirmationDomData', function(classify, BaseViewModel, PassConfirmationDomData){
	
	var PassConfirmationViewModel = classify(BaseViewModel, {
		
		result : {
			Description : PassConfirmationDomData.passKindValue,
			Name : PassConfirmationDomData.nameValue,
			DOB : '',
			ExpirationDate : PassConfirmationDomData.expDateValue,
			Status : '',
			IsRenewable : true
		},
		
		continueButton : PassConfirmationDomData.continueButtonEl
	
		
	});
	
	return PassConfirmationViewModel;
	
}]);

GTS.passLookup.controller('passLookupController', [
	
	'$scope','classify','MembershipLookupController','PassLookupViewModel','WebFormsService',function(
	 $scope,  classify,  MembershipLookupController,  PassLookupViewModel,  WebFormsService){
		 
	var PassLookupController = classify(MembershipLookupController, {
		
		viewModel : new PassLookupViewModel(),
		postConstruct : function(){
			WebFormsService.onSubmit(angular.bind(this, this.childSubmit));
		},
		
		childSubmit : function(){
			this.viewModel.error = false;
			var valid = this.submit();
			this.scope.$apply();
			return valid;
		},
		
		lookup : function(){
			return true;
		}
		
	});
	
	return new PassLookupController($scope);
	
}]);

GTS.passLookup.factory('PassLookupViewModel', [
	
	'classify','BaseForm','PassLookupDomData','PageDataDomData','TextFormField','BirthdateFormField', '$sce',function(
	 classify,  BaseForm,  PassLookupDomData,  PageDataDomData,  TextFormField,  BirthdateFormField,   $sce){
	
	return classify(BaseForm, {
		
		_constructor : function(){
			this.setVisualId();
			this.setLastName();
			this.setAccountNumber();
			this.setBirthDate();
		
			
			this.error = PageDataDomData.errorMessage;
			this.pageTitle = $sce.trustAsHtml(PageDataDomData.pageTitle);
			
			this.submitButton = PassLookupDomData.submitButtonEl;
		},
		
		setVisualId : function(){
			if(PassLookupDomData.visualIdInputEl){
				this.visualId = new TextFormField(PassLookupDomData.visualIdInputEl);
				this.visualId.visible = true;
				this.visualId.required = true;
			}
		},
		
		setLastName : function(){
			if(PassLookupDomData.lastNameInputEl){
				this.lastName = new TextFormField(PassLookupDomData.lastNameInputEl);
				this.lastName.visible = true;
				this.lastName.required = true;
			}
		},
		
		setAccountNumber : function(){
			if (PassLookupDomData.accountNumberInputEl) {
				this.accountNumber = new TextFormField(PassLookupDomData.accountNumberInputEl);
				this.accountNumber.visible = true;
				this.accountNumber.required = true;
			}
		},
		
		setBirthDate : function(){
			if(PassLookupDomData.birthDateInputEl){
				this.birthDate = new BirthdateFormField(PassLookupDomData.birthDateInputEl);
				this.birthDate.visible = true;
				this.birthDate.required = true;
			}
		}
		
	});

}]);

GTS.passRenewals.factory('PassRenewalsController', ['classify','BaseController','CommunicatorService','PassRenewalsViewModel','passRenewalsService','WebFormsService','pageStateService',
	function(classify, BaseController, CommunicatorService, PassRenewalsViewModel, passRenewalsService, WebFormsService, pageStateService
	){

		var PassRenewalsBaseController = classify(BaseController, {
			
			registrations : ['addToCart', 'expand'],
			
			listeners : {
				'paymentPlanSelected' : 'updateDisplay',
			},
			
			_constructor : function(){
				BaseController.prototype._constructor.apply(this, arguments);
				
				this.viewModel = this.scope.viewModel = new PassRenewalsViewModel();
				this.scope.root = this.viewModel.root;
			},
			
			addToCart : function(item){
				this.scope.loading = true;
				passRenewalsService.addToCart(this.viewModel.addToCartEl, item).then(function(){
					pageStateService.go('cart');
				});
			},
			
			updateDisplay : function(data){
				this.viewModel._update(data.data);
				setTimeout(angular.bind(this, this.scope.$apply()), 0);
			},

			expand : function(cat){
				cat.isExpanded = !cat.isExpanded;
				this.clearErrors(true);
			}
		});

		return PassRenewalsBaseController;
	}
]);

GTS.passRenewals.controller('passRenewalsInstance', ['classify','PassRenewalsController','$scope',
	function(classify, PassRenewalsController, $scope
	){

		var PassRenewalsInstance = classify(PassRenewalsController, {
			
			// add methods here

		});

		return new PassRenewalsInstance($scope);
	}
]);

GTS.passRenewals.factory('passRenewalsService', ['classify','WebFormsService','BasePostBack',
	function(classify, WebFormsService, BasePostBack
	){

		var PassRenewalsService = classify(BasePostBack, {
			
			addToCart : function(button, item){
				
				var data = {
					'ctl00$ContentPlaceHolder$ScriptManager1' : 'ctl00$ContentPlaceHolder$UpdatePanel'+button.name
				};
				data[item.pluRadioEl.name] = item.pluRadioEl.value;
				data[button.name] = button.value;
				
				WebFormsService.setModel(data);
				
				return this.request();
			}
			
		});

		return new PassRenewalsService();
	}
]);

//'__doPostBack(\'ctl00$ContentPlaceHolder$SalesChannelDetailControl$SalesChannelDetailRepeater$ctl01$1219$PLURepeater$ctl01$PLUSelectionRadioButton\',\'\')'

GTS.passRenewals.factory('PassRenewalsViewModel', ['classify','BaseViewModel','$injector','$sce',
	function(classify, BaseViewModel, $injector, $sce
	){

		var PassRenewalsViewModel = classify(BaseViewModel, {
			
			_constructor : function(){
			
				var ViewPassRenewalsDomData = $injector.get('ViewItemsDomData');
				var PageDataDomData = $injector.get('PageDataDomData');

				this.pageTitle = $sce.trustAsHtml(PageDataDomData.pageTitle);
							
				this.process(ViewPassRenewalsDomData);
			},
			
			process : function(data){
				angular.forEach(data.subCategory, function (subCategory) {
					angular.forEach(subCategory.items, function(item){
						this.parseInput(item);
						this.parseHtml(item);
					}, this);
				}, this);
				
				angular.extend(this, data);
			},
			
			parseInput : function(item){
				
				var html = $(item.pluInput),
					input = html.find('input')[0],
					label = html.find('label');
					
				item.pluName = label.text();
				item.pluRadioEl = {};
				
				angular.forEach(input.attributes, function(attr){
					item.pluRadioEl[attr.name] = attr.value;
				}, this);
				
				delete item.pluInput;			
			},
			
			parseHtml : function(item){
				if (item.pluName) {
					item.pluName = $sce.trustAsHtml(item.pluName);
				}
				if (item.pluDesc) {
					item.pluDesc = $sce.trustAsHtml(item.pluDesc);
				}
				if(item.paymentPlanDesc){
					item.paymentPlanDesc = $sce.trustAsHtml(item.paymentPlanDesc);
				}
			},
			
			_update : function(data){
				
				this.process(data);
			}
			
		});

		return PassRenewalsViewModel;
	}
]);

GTS.paymentPlanLogin.controller('PaymentPlanLoginController',
			['$scope', 'classify', 'BaseController', 'BaseViewModel', 'LoginDomData', 'PageDataDomData', '$sce',
	function ($scope,   classify,   BaseController,   baseViewModel,   loginDomData,   pageDataDomData,  $sce) {

	var PaymentPlanLoginController = classify(BaseController, {

		viewModel: angular.extend({}, baseViewModel),

		registrations: [''],

		_constructor: function () {
			BaseController.prototype._constructor.apply(this, arguments);

			this.viewModel.title = $sce.trustAsHtml(pageDataDomData.pageTitle);
			this.viewModel.error = pageDataDomData.errorMessage;

			this.viewModel.userName = loginDomData.UsernameTextboxEl;
			this.viewModel.password = loginDomData.PasswordTextboxEl;
			this.viewModel.userNameLabel = loginDomData.UsernameLabel;
			this.viewModel.passwordLabel = loginDomData.PasswordLabel;
			this.viewModel.loginButton = loginDomData.LoginButtonEl;
		}
	});

	return new PaymentPlanLoginController($scope);
}]);

GTS.paymentPlansAgreement.controller('paymentPlansAgreementController', [

	'pageStateService', '$scope', 'classify', 'BaseController', 'PageDomData', '$sce', function (
	 pageStateService,   $scope,   classify,   baseController,   pageDomData,   $sce) {

		var PaymentPlansAgreementController = classify(baseController, {

			viewModel: { },

			state: {},

			registrations: [],

			postConstruct : function () {
				this.viewModel.pageTitle = pageDomData.pageTitle.text;
				this.viewModel.userSelectMessageHtml = $sce.trustAsHtml(pageDomData.userSelectMessageHtml);
				this.viewModel.paymentPlanAgreementHtml = $sce.trustAsHtml(pageDomData.paymentPlanAgreementHtml);
				this.viewModel.cancelButtonEl = pageDomData.cancelButtonEl;
				this.viewModel.continueButtonEl = pageDomData.continueButtonEl;
			}
		});

		return new PaymentPlansAgreementController($scope);

	}]);

GTS.paymentPlan.factory('PaymentPlanController', ['classify', 'PaymentPlansService', 'BaseController',function(classify, PaymentPlansService, BaseController){

	var state = {},
		viewModel = {};

	var PaymentPlanController = classify(BaseController, {

		viewModel : PaymentPlansService.getData(),

		registrations : ['clickOption'],

		clickOption : function(plan){
			if(!plan.disabled){
				this.viewModel.selectedPlan = plan.inputVal;
				PaymentPlansService.processSelection(plan);
			}
		}

	});

	return PaymentPlanController;
}]);

GTS.paymentPlan.controller('PaymentPlanInstance', ['PaymentPlanController', '$scope', function(PaymentPlanController, $scope){
	
	return new PaymentPlanController($scope);

}]);

// these need to be attached to util
GTS.util.factory('PaymentPlanParser', ['classify', function(classify){

	var html,
		data = {},
		selector = '.SelectedOption, .UnselectedOption';

	return classify({

		_constructor : function(mod){
			html = mod;
		    this.find();
		},

		find : function(){

			data.title = $(html.find('span')[0]).text();
			var plans = data.plans = [];
			angular.forEach($(selector), function(plan){

				var el = $(plan),
					input = el.find('input');

				var p = {
					inputName : input.attr('name'),
					inputId : input.attr('id'),
					planName : el.find('label').text(),
					inputVal : input.val(),
					desc : $(el.find('.PaymentPlanSelectorControl')[1]).text(),
					selected : el.hasClass('SelectedOption')	
				};

				if(input.attr('disabled') === 'disabled'){
					p.disabled = true;
				}

				plans.push(p);
			});
		},

		getData : function(){
			return data;
		}

	});

}]);

GTS.paymentPlan.factory('PaymentPlansService', [

	'classify','WebFormsService','DomDataParser','CommunicatorService', '$injector', function(
	 classify,  WebFormsService,  DomDataParser,  CommunicatorService, $injector){

	var plans = {
		plans : [],
		title : '',
		selectedPlan : {}
	};

	var PaymentPlansService = classify({

		_constructor : function(){
			try{
				var PaymentPlansDomData = $injector.get('PaymentPlansDomData');

				if(PaymentPlansDomData.plans.length){
					plans.plans = PaymentPlansDomData.plans;
					plans.title = PaymentPlansDomData.title;

					angular.forEach(plans.plans, function(p){
						if(p.selected){
							plans.selectedPlan = p.inputVal;
							this.processSelection(p);
							return false;
						}
					}, this);
				}
			}catch(err){}
		},

		getData : function(){
			return plans;
		},

		processSelection : function(item){
		
			WebFormsService.clean();

			var change = {
				'ctl00$ContentPlaceHolder$ScriptManager1':'ctl00$ContentPlaceHolder$UpdatePanel|'+item.inputName+'$'+item.inputVal,
				'__EVENTTARGET':item.inputName+'$'+item.inputVal,
				'__ASYNCPOST': true
			};

			change[item.inputName] = item.inputVal;

			WebFormsService.setModel(change);

			$.ajax({
				url : '',
				type : 'POST',
				data : WebFormsService.getModel()
			}).then(function(response){
				var ddp = new DomDataParser($.parseHTML(response));

			    var data = {
			        selected: item,
			        data: ddp.getData()
			    };
				
				CommunicatorService.send('paymentPlanSelected', data);
			});
		}

	});

	return new PaymentPlansService();

}]);

GTS.paymentRecordsError.controller('paymentRecordsErrorController',
            ['baseViewModel', 'pageStateService', '$scope', 'classify', 'BaseController', 'PageDomData',
    function (baseViewModel,   pageStateService,   $scope,   classify,   BaseController,   pageDomData) {

        var paymentRecordsErrorController = classify(BaseController, {

            postConstruct: function () {
            	this.scope.root = pageStateService.getRoot();
            },
        });

        return new paymentRecordsErrorController($scope);

    }]);

GTS.postUsageSurvey.controller('postUsageSurveyController', [

	'pageStateService', 'postUsageSurveyService', '$scope', 'classify', 'BaseController', '$sce', 'PagerController', 'TextFormField', 'SelectFormField', 'BaseFormField', 'NumericFormField', 'PostUsageSurveyViewModel', 'InputRadioField', function (
	 pageStateService,   postUsageSurveyService,   $scope,   classify,   baseController,   $sce,   PagerController,   TextFormField,   SelectFormField,   BaseFormField,   NumericFormField,   PostUsageSurveyViewModel,   InputRadioField) {

	var PostUsageSurvey = classify(baseController, {

		viewModel: PostUsageSurveyViewModel,

		state: { loading: false, showLandingPage: true, showSurvey: false, showCompleted: false },

		registrations: ['submitSurvey', 'startSurvey'],

		postConstruct: function () {
			this.scope.root = pageStateService.getRoot();

			this.state.loading = true;

			var qs = pageStateService.getQueryString();
			var orderId = qs.orderid;
			var surveyId = qs.surveyid;

			postUsageSurveyService.getSurvey(surveyId, orderId).then(angular.bind(this, this.onLoadSurvey));
		},

		onLoadSurvey: function (survey) {
			this.state.loading = false;

			this.viewModel.survey = survey;

			this.viewModel.pager.setPageCount(this.viewModel.survey.Pages.length);

			this.viewModel.survey.landingPageHtml = $sce.trustAsHtml(this.viewModel.survey.LandingPage);

			angular.forEach(this.viewModel.survey.Pages, function (page) {
				angular.forEach(page.Questions, function (question) {
					switch(question.Type) {

						case 1:		//  Text
							question.formField = new TextFormField(question);
							break;

						case 2:		//  Numeric
							question.formField = new NumericFormField(question);
							break;

						case 3:		//  Yes/no
							question.formField = new BaseFormField(question);
							question.yesRadio = new InputRadioField({ value: "Yes" });
							question.noRadio = new InputRadioField({ value: "No" });
							break;

						case 4:		//  Multiple choice
							question.formField = new SelectFormField(question);
							var options = [];
							angular.forEach(question.Values, function(value) {
								options.push({ value: value, text: value });	//  Value and text are same for surveys.
							});
							question.formField.options = options;
							break;
					}

					if (question.formField) {
						question.formField.displayName = question.Text;
						question.formField.required = question.Required;
						question.formField.value = question.Answer;
						question.formField.change();
					}

				}, this);
			}, this);

			this.state.showLandingPage = !this.viewModel.survey.IsCompleted && this.viewModel.survey.LandingPage;
			this.state.showSurvey = !this.viewModel.survey.IsCompleted && !this.viewModel.survey.LandingPage;
			this.state.showCompleted = this.viewModel.survey.IsCompleted;
		},

		submitSurvey: function() {
			var isValid = true;
			
			//  Validate each question
			angular.forEach(this.viewModel.survey.Pages, function(page) {
				angular.forEach(page.Questions, function (question) {

					if (!question.formField.validate()) {
						isValid = false;
						this.viewModel.pager.setCurrentPage(page.PageNumber);
					} else {
						question.Answer = question.formField.value;
					}

				}, this);
			}, this);

			if (!isValid) return;

			this.viewModel.survey.IsCompleted = true;

			this.state.loading = true;
			
			postUsageSurveyService.saveSurvey(this.viewModel.survey).then(angular.bind(this, this.onSaveSurveyComplete));
		},

		onSaveSurveyComplete : function(response) {
			this.state.loading = false;
			this.state.showSurvey = false;
			this.state.showCompleted = true;
		},

		startSurvey: function() {
			this.state.showLandingPage = false;
			this.state.showSurvey = true;
		}
	});

	return new PostUsageSurvey($scope);

}]);

GTS.postUsageSurvey.factory('postUsageSurveyService', ['classify', 'apiService', '$q', 'BaseFormField',
	                          function (classify,   apiService,   $q,   BaseFormField) {

	var PostUsageSurveyService = classify({

		getSurvey: function (surveyId, orderId) {
			var request = $q.defer();
			apiService.getSurvey(surveyId, orderId).then(angular.bind(this, this.onGetSurvey, request));
			return request.promise;
		},

		onGetSurvey: function(req, res) {
			req.resolve(res.data);
		},

		saveSurvey: function(survey) {
			var request = $q.defer();
			apiService.postSurvey(survey).then(angular.bind(this, this.onSaveSurvey, request));
			return request.promise;
		},

		onSaveSurvey : function(req, res) {
			req.resolve(res.data);
		}

	});

	return new PostUsageSurveyService();

}]);

GTS.postUsageSurvey.factory('PostUsageSurveyViewModel', ['baseViewModel', 'PagerController', function (baseViewModel, PagerController) {

	return angular.extend({

		pager: new PagerController()

	}, baseViewModel);

}]);

GTS.profileAccount.controller('profileAccountController', [
	
	'classify', 'BaseController', '$scope', 'profileService', 'CommunicatorService', 'ContactForm', 'pageStateService', function (
	 classify, BaseController, $scope, profileService, CommunicatorService, ContactForm, pageStateService) {
	
	var viewModel = {
		accountContact : {}
	};

    var state = {
        showEditContact: false,
		doneLoading: false
	};

	var accountContact = new ContactForm();
	
	var ProfileAccountController = classify(BaseController, {
		
		viewModel : viewModel,
		state : state,
		registrations : ['editAccountInformation', 'updateAccount', 'logout'],
		
		postConstruct: function () {
			this.viewModel.accountContact = accountContact;
			profileService.loadAccount().then(angular.bind(this, this.showAccount));
		},
		
		showAccount : function(accountContact){
			CommunicatorService.send('accountLoaded', {});

			//  Hide non-applicable fields
			viewModel.accountContact.birthday.visible = false;
			viewModel.accountContact.username.visible = false;
			viewModel.accountContact.password.visible = false;
			viewModel.accountContact.confirmPassword.visible = false;

			//  Set the lists
			viewModel.accountContact.title.setOptions(accountContact.title.options, "Id", "Name", accountContact.title.value);
			viewModel.accountContact.suffix.setOptions(accountContact.suffix.options, "Id", "Name", accountContact.suffix.value);
			viewModel.accountContact.country.setOptions(accountContact.country.options, "CountryCode", "OfficialName", accountContact.country.value);
			viewModel.accountContact.state.setOptions(accountContact.state.options, "Abbreviation", "Name", accountContact.state.value);

			//  Copy the values over
			viewModel.accountContact.title.value = accountContact.title.value;
			viewModel.accountContact.title.display = accountContact.title.displayName;
			viewModel.accountContact.firstName.value = accountContact.firstName.value;
			viewModel.accountContact.middleName.value = accountContact.middleName.value;
			viewModel.accountContact.lastName.value = accountContact.lastName.value;
			viewModel.accountContact.suffix.value = accountContact.suffix.value;
			viewModel.accountContact.suffix.display = accountContact.suffix.displayName;
			viewModel.accountContact.street1.value = accountContact.street1.value;
			viewModel.accountContact.street2.value = accountContact.street2.value;
			viewModel.accountContact.city.value = accountContact.city.value;
			viewModel.accountContact.country.value = accountContact.country.value;
			viewModel.accountContact.country.display = accountContact.country.displayName;
			viewModel.accountContact.state.value = accountContact.state.value;
			viewModel.accountContact.state.display = accountContact.state.displayName;
			viewModel.accountContact.zipCode.value = accountContact.zipCode.value;
			viewModel.accountContact.phone.value = accountContact.phone.value;
			viewModel.accountContact.mobile.value = accountContact.mobile.value;
			viewModel.accountContact.email.value = accountContact.email.value;
			viewModel.accountContact.confirmEmail.value = accountContact.confirmEmail.value;
			
			this.scope.$parent.state.loading = false;
			state.doneLoading = true;
			console.log(state);
		},
		
		editAccountInformation : function(){
			state.showEditContact = true;
		},
		
		updateAccount : function(){
			if (viewModel.accountContact.validate()) {
				this.scope.$parent.state.loading = true;
				profileService.saveAccount(viewModel.accountContact).then(angular.bind(this, this.onSaveComplete));
			}
		},
	
		onSaveComplete : function(result){
			if(!result.success){
				this.scope.$parent.state.loading = false;
				viewModel.errors = result.errors;
			}else{
				state.showEditContact = false;
				this.postConstruct();
			}
		},

		logout : function() {
			pageStateService.go('logout');
		}
		
	});
	
	return new ProfileAccountController($scope);
	
}]);

GTS.profileMemberships.controller('profileMembershipsController', [
	
	'apiService','$scope','BaseController','classify','profileMembershipsService','pageStateService','BaseViewModel',function(
	 api,         $scope,  BaseController,  classify,  profileMembershipsService,  pageStateService,  BaseViewModel){
		
	var ProfileMembershipController = classify(BaseController, {
		
		listeners : {
			'renewPass' : 'renew'
		},
		
		registrations : ['renew'],
		
		viewModel : new BaseViewModel(),
		
		postConstruct : function(){
			this.scope.$parent.viewModel.activeTabId = 2;
			this.scope.$parent.state.loading = false;
			this.getMemberships();
		},
		
		getMemberships : function(){
			this.scope.loading = true;
			profileMembershipsService.getAccount().then(angular.bind(this, this.showMemberships));
		},
		
		renew : function(pass){
			window.location.href = this.viewModel.root+'shopping/renew/'+pass.VisualId;	
		},
		
		showMemberships : function(response){
			this.scope.loading = false;
			if(response.success && response.data.ActiveMemberships && response.data.ActiveMemberships.length){
				this.viewModel.memberships = response.data.ActiveMemberships;				
			}
			if(response.success && response.data.AssociatedMemberships && response.data.AssociatedMemberships.length){
				this.viewModel.associatedMemberships = response.data.AssociatedMemberships;
			}
		}
	
	});
	
	return new ProfileMembershipController($scope);

}]);

GTS.profileMemberships.factory('profileMembershipsService', ['apiService', 'classify', function(api, classify){
	
	var ProfileMembershipsService = classify({
		
		account : {},
		
		getAccount : function(){	
			return api.getAccount();
		}
		
	});
	
	return new ProfileMembershipsService();
	
}]);



GTS.profileOrderHistory.controller('profileOrderHistoryController', [
	
	'BaseController','$scope','classify','orderHistoryDomData','pageStateService',function(
	 BaseController,  $scope,  classify,  orderHistoryDomData,  pageStateService ){
		
	var viewModel = {
		activeTabId : 1,
		title : orderHistoryDomData.title,
		info : orderHistoryDomData.historyInfo,
		orders: orderHistoryDomData.orders,
		header : (orderHistoryDomData.header && orderHistoryDomData.header.length) ? orderHistoryDomData.header[0] : null,
		noOrders : orderHistoryDomData.noOrdersMessage
	};
	
	var device = {
		a : true,
		b : false,
		c : false
	};
	
	var OrderHistoryController = classify(BaseController, {
		
		viewModel : viewModel,
		//state : state,
		
		postConstruct : function(){
			this.scope.$parent.state.loading = false;
			this.scope.$parent.viewModel.activeTabId = 1;
		},
		
	});
	
	return new OrderHistoryController($scope);


}]);

GTS.profile.controller('profileController', [
	
	'pageStateService','$scope','CommunicatorService','classify','BaseResponderController','profileService','baseViewModel',function(
	 pageStateService,  $scope,  CommunicatorService,  classify,  BaseResponderController,  profileService,  baseViewModel){
	
	var device = {
		a : true,
		b : false,
		c : false
	};
	
	var viewModel = $.extend({
		activeTabId : 0
	}, baseViewModel);
	
	var state = {
		loading : true
	};
	
	var ProfileController = classify(BaseResponderController, {
			
		viewModel : viewModel,
		state : state,
		registrations : ['clickTab'],
		clickTab : function(tabId){
			if(viewModel.activeTabId !== tabId){
				state.loading = true;
				viewModel.activeTabId = tabId;
				switch(tabId) {
				    case 0:
				        pageStateService.go('accountProfile');
				        break;
				    case 1:
				       	pageStateService.go('accountOrderHistory');
				        break;
					case 2:
						pageStateService.go('accountMemberships');
						break;
				}
			}
		}
	}); 
	
	return new ProfileController($scope);
	
}]);

GTS.profile.factory('profileService', ['classify', 'apiService', '$q', 'BaseFormField', function(classify, apiService, $q, BaseFormField){
	
	var ProfileService = classify({
		accountContact : {
			username : new BaseFormField(), 
			password : new BaseFormField(),
			confirmPassword : new BaseFormField(),
			title : new BaseFormField(),
			firstName : new BaseFormField(),
			middleName : new BaseFormField(),
			lastName : new BaseFormField(),
			suffix : new BaseFormField(),
			street1 : new BaseFormField(),
			street2 : new BaseFormField(),
			city : new BaseFormField(),
			country : new BaseFormField(),
			state : new BaseFormField(),
			zipCode : new BaseFormField(),
			phone : new BaseFormField(),
			mobile : new BaseFormField(),
			email : new BaseFormField(),
			confirmEmail : new BaseFormField(),
			externalId : 0,
			guid : ''
		},
		
		//  The account config not only has the configuration, but it also has the account itself.
		loadAccount : function(){
			var request = $q.defer();
			apiService.getAccountCreateConfig().then(angular.bind(this, this.onLoadAccountConfig, request));
			return request.promise;
		},
		
		onLoadAccountConfig : function(request, response){
			this.accountCreateConfig = response.data;
			
			this.accountContact.username.value = this.accountContact.password.value = this.accountContact.confirmPassword.value = "NA";
			
			this.accountContact.middleName.required = false;
			this.accountContact.title.required = false;
			this.accountContact.suffix.required = false;
			this.accountContact.street2.required = false;
			this.accountContact.mobile.required = false;
			
			this.accountContact.confirmEmail.visible = this.accountCreateConfig.AccountOptions.ShowBillingEmailConfirmation;
			this.accountContact.confirmEmail.required = this.accountCreateConfig.AccountOptions.ShowBillingEmailConfirmation;
			
			this.accountContact.title.options = this.accountCreateConfig.NameTitleOptions;
			this.accountContact.title.value = this.accountCreateConfig.NameTitle;
			this.accountContact.title.selectValue = "Id";
			this.accountContact.title.selectName = "Name";
			
			this.accountContact.suffix.options = this.accountCreateConfig.NameSuffixOptions;
			this.accountContact.suffix.value = this.accountCreateConfig.NameSuffix;
			this.accountContact.suffix.selectValue = "Id";
			this.accountContact.suffix.selectName = "Name";
			
			this.accountContact.state.options = this.accountCreateConfig.StateRegionOptions;
			this.accountContact.state.allOptions = this.accountCreateConfig.StateRegionOptions;
			this.accountContact.state.value = this.accountCreateConfig.RegionDropDownValue;
			this.accountContact.state.selectValue = "Abbreviation";
			this.accountContact.state.selectName = "Name";
			
			this.accountContact.country.options = this.accountCreateConfig.CountryOptions;
			this.accountContact.country.value = this.accountCreateConfig.CountryCode;
			this.accountContact.country.selectValue = "CountryCode";
			this.accountContact.country.selectName = "OfficialName";
			
			this.accountContact.username.visible = false;
			this.accountContact.password.visible = false;
			this.accountContact.confirmPassword.visible = false;
			
			if(this.accountCreateConfig.CurrentUser){
				this.accountContact.title.value = this.accountCreateConfig.CurrentUser.NameTitleID;
				this.accountContact.firstName.value = this.accountCreateConfig.CurrentUser.FirstName;
				this.accountContact.middleName.value = this.accountCreateConfig.CurrentUser.MiddleName;
				this.accountContact.lastName.value = this.accountCreateConfig.CurrentUser.LastName;
				this.accountContact.suffix.value = this.accountCreateConfig.CurrentUser.NameSuffixID;
				this.accountContact.street1.value = this.accountCreateConfig.CurrentUser.Street1;
				this.accountContact.street2.value = this.accountCreateConfig.CurrentUser.Street2;
				this.accountContact.country.value = this.accountCreateConfig.CurrentUser.CountryCode;
				this.accountContact.city.value = this.accountCreateConfig.CurrentUser.City;
				this.accountContact.state.value = this.accountCreateConfig.CurrentUser.State;
				this.accountContact.zipCode.value = this.accountCreateConfig.CurrentUser.Postal;
				this.accountContact.phone.value = this.accountCreateConfig.CurrentUser.Phone;
				this.accountContact.mobile.value = this.accountCreateConfig.CurrentUser.Cell;
				this.accountContact.email.value = this.accountCreateConfig.CurrentUser.Email;
				this.accountContact.confirmEmail.value = this.accountCreateConfig.CurrentUser.Email;
				this.accountContact.externalId = this.accountCreateConfig.CurrentUser.ExternalID;
				this.accountContact.guid = this.accountCreateConfig.CurrentUser.Guid;
			}
			
			this.accountContact.title.selectChange();
			this.accountContact.suffix.selectChange();
			this.accountContact.state.selectChange();
			this.accountContact.country.selectChange(); 
						
			this.updateStates();
			
			request.resolve(this.accountContact);
		},
		
		getAccountName : function(){
			if(this.accountContact.firstName.value && this.accountContact.lastName.value){
				return this.accountContact.firstName.value + ' ' + this.accountContact.lastName.value;
			}else{
				return '';
			}
		},
		
		validateAccount : function(){
			var isValid = true;
			angular.forEach(this.accountContact, function(formField){
				if(formField.validate){
					var fieldValid = formField.validate();
					isValid = isValid && fieldValid;
				}
			});
			
			return isValid;
		},
		
		saveAccount : function(accountContact){
			var request = $q.defer();
			
			var account = { 
				Username : this.accountContact.username.value,
				Password: this.accountContact.password.value,
				ConfirmPassword: this.accountContact.confirmPassword.value,
				NameTitle : accountContact.title.value,
				FirstName : accountContact.firstName.value,
				MiddleName : accountContact.middleName.value,
				LastName : accountContact.lastName.value,
				NameSuffix : accountContact.suffix.value,
				Street1 : accountContact.street1.value,
				Street2 : accountContact.street2.value,
				City : accountContact.city.value,
				CountryCode : accountContact.country.value,
				RegionTextValue : accountContact.state.value,
				Postal : accountContact.zipCode.value,
				Phone : accountContact.phone.value,
				Cell : accountContact.mobile.value,
				Email : accountContact.email.value,
				ConfirmEmail : accountContact.confirmEmail.value,
				ExternalId: this.accountContact.externalId,
				ContactGuid: this.accountContact.guid
			};
			
			apiService.postAccountCreate(account).then(angular.bind(this, this.onSaveSuccessful, request), angular.bind(this, this.onSaveFailed, request));
			
			return request.promise;
		},
		
		onSaveSuccessful : function(request, response){
			return request.resolve({ success : true, error : [] });
		},
		
		onSaveFailed : function(request, response){
			return request.resolve({ success : false, errors : response.data });
		},
		
		
		updateStates : function(){
			var countryCode = this.accountContact.country.value;
			
			//  Filter down the list of states/regions based on country
			this.accountContact.state.options = this.accountContact.state.allOptions.filter(function(val){
				if(val.CountryCode === countryCode){
					return true;
				}
				return false;
			});
			
			//  Find the default state/region if it exists
			if(this.accountContact.state.options.length > 1){
				angular.forEach(this.accountContact.state.options, function(val){
					if(val.DefaultLocale){
						this.accountContact.state.value = val.Abbreviation;
						this.accountContact.state.selectChange();
					}
				}, this);
			}else{
				this.accountContact.state.value = "";
			}
		},
				
	
	});
	
	return new ProfileService();
	
}]);

GTS.profile.factory('profileViewModel', ['baseViewModel', function(baseViewModel){
	
	return angular.extend(baseViewModel, {
		activeTabId : 0,
		accountContact : {}
	});


}]);

GTS.promotionCode.controller('PromotionCodeController', [

	'pageStateService', 'ResponderService', 'CommunicatorService', 'PromotionCodeService', '$scope', 'classify', 'BaseController', '$sce', 'PromotionCodeViewModel', 'PromotionCodeDomData', 'PageDataDomData', 'TextFormField', function (
	 pageStateService,   responderService,   CommunicatorService,   PromotionCodeService,   $scope,   classify,   baseController,   $sce,   PromotionCodeViewModel,   PromotionCodeDomData,   PageDataDomData,   TextFormField) {

		var device = {
			a: true,
			b: false,
			c: false
		};

		var PromotionCodeController = classify(baseController, {

			viewModel: PromotionCodeViewModel,

			state: { },

			registrations: ['showHelp'],

			device: device,

			initDevice: function () {
				this.scope.device = device;
				angular.forEach(device, function (val, key) {
					device[key] = responderService.getBreakerStatus(key);
				});
			},

			postConstruct: function () {
				this.initDevice();
				responderService.bind('a', angular.bind(this, this.changeDevice));
				responderService.bind('b', angular.bind(this, this.changeDevice));
				responderService.bind('c', angular.bind(this, this.changeDevice));


				this.scope.root = pageStateService.getRoot();

				this.viewModel.data = PromotionCodeDomData;

				this.viewModel.data.DescriptionHtml = $sce.trustAsHtml(this.viewModel.data.Description);

				if (this.viewModel.data.CouponCodeTextEl) {
					this.viewModel.couponCode = new TextFormField(this.viewModel.data.CouponCodeTextEl);
					this.viewModel.couponCode.displayName = this.viewModel.data.CouponCodeLabel;
				}

				if (this.viewModel.data.ValidationTextEl) {
					this.viewModel.validationText = new TextFormField(this.viewModel.data.ValidationTextEl);
					this.viewModel.validationText.displayName = this.viewModel.data.ValidationLabel;
				}
				
				this.viewModel.errorMessage = PageDataDomData.errorMessage;
			},

			changeDevice: function (bool, breaker) {
				device[breaker] = bool;
				this.scope.$apply();
			},

			showHelp : function() {
				CommunicatorService.send('promoHelp');
			}
		});

		return new PromotionCodeController($scope);

	}]);

GTS.promotionCode.factory('PromotionCodeService', ['classify',
	function (classify) {

		var PromotionCodeService = classify({

		});

		return new PromotionCodeService();
	}]
);

GTS.promotionCode.factory('PromotionCodeViewModel', ['baseViewModel', function (baseViewModel) {

	return angular.extend({

		couponCode: { },

		validationText : { }

	}, baseViewModel);

}]);

GTS.promotionHelpModal.controller('PromotionHelpModalController', [

	'pageStateService', 'ResponderService', 'PromotionHelpModalService', '$scope', 'classify', 'BaseController', '$sce', '$q', 'ModalController', 'baseViewModel', function (
	 pageStateService,   responderService,   PromotionHelpModalService,   $scope,   classify,   baseController,   $sce,   $q,   ModalController,   baseViewModel) {

		var PromotionHelpModalController = classify(baseController, [ModalController,{

			viewModel: angular.extend({ title: "Title", description : "Description"}, baseViewModel),

			state: { loading : true },

			registrations: ['closeModal'],

			listeners: {
				'promoHelp': 'showDialog'
			},

			showDialog : function() {
				this.openModal();
				this.state.loading = false;
			},

			//  Intentionally using post construct here.  This data won't change, so only load it once.
			postConstruct: function () {
				this.scope.root = pageStateService.getRoot();
				this.loadData();
			},

			loadData : function() {
				var qs = pageStateService.getQueryString();
				var promotionId = qs.promotionid;

				var url = this.scope.root + "shop/promotionpopup.aspx?PromotionId=" + promotionId;

				PromotionHelpModalService.getPage(url).then(angular.bind(this, this.onGetData));
			},

			onGetData: function (data) {
				this.state.loading = false;
				this.viewModel.title = data.NameLabel;
				this.viewModel.description = data.DescriptionLabel;
				this.viewModel.image = data.ImageEl;
			}
		}]);

		return new PromotionHelpModalController($scope);

	}]);

GTS.promotionHelpModal.factory('PromotionHelpModalService', ['classify', '$q', 'DomDataParser', '$http',
	function (classify, $q, DomDataParser, $http) {

		var PromotionHelpModalService = classify({
			getPage : function(link) {
				var request = $q.defer();

				$http({
					method: 'get',
					url: link
				}).then(angular.bind(this, function (content) {
					var html = $.parseHTML(content.data),
					dpp = new DomDataParser(html);
					var data = dpp.getData();
					request.resolve(data);
				}));

				return request.promise;
			}
		});

		return new PromotionHelpModalService();
	}]
);

GTS.renewalCart.factory('RenewalCartController', [
	
	'classify','BaseController','apiService','pageStateService','baseViewModel', '$sce',function(
	 classify,  BaseController,  apiService,  pageStateService,  baseViewModel,   $sce
	){
	
	var RenewalCartController = classify(BaseController, {
		
		registrations :['addToCart'],
		viewModel : angular.extend(this, baseViewModel),
		
		postConstruct : function(){
			this.viewModel.items = this.translate(data);
		},
		
		translate : function(raw){
			var items = [];
			angular.forEach(raw, function(item){
				items.push({
					plu : item.plu,
					pluName : $sce.trustAsHtml(item.name),
					pluShortName : $sce.trustAsHtml(item.desc),
					price : item.price,
					pluDesc : $sce.trustAsHtml(item.longDesc),
					quantityInputEl : {
						value : 1
					}
				});
			});
			return items;
		},
		
		addToCart : function(item){
			this.scope.state.loading = true;
			
			var url =  window.location.href,
				visualId = url.substr(url.lastIndexOf("/")+1),
				data = {
					Plu : item.plu,
					VisualId : visualId
				};
				
			apiService.setRenewalCart(data).then(angular.bind(this, function(response){
				if(response.success){
					pageStateService.go('cart');
				}else{
				        this.scope.error = true;
					this.scope.errorMessage = response.data.Message;
					this.scope.addErrors = response.data.Errors;

					this.scope.state.loading = false;
				}
			}));
		}
	});
	
	return RenewalCartController;
	
}]);

GTS.renewalCart.controller('renewalCartInstance', [
	
	'classify','RenewalCartController','$scope',function(
	 classify,  RenewalCartController,  $scope
	){
		
	return new RenewalCartController($scope);
	
}]);

GTS.renewals.factory('RenewalsController', ['classify','BaseController','RenewalsViewModel',
	function(classify, BaseController, RenewalsViewModel
	){

		var RenewalsBaseController = classify(BaseController, {
			
			_constructor : function(){
				BaseController.prototype._constructor.apply(this, arguments);				
				this.viewModel = this.scope.viewModel = new RenewalsViewModel();				
			}
						
		});

		return RenewalsBaseController;
	}
]);

GTS.renewals.controller('renewalsInstance', ['classify','RenewalsController','$scope',
	function(classify, RenewalsController, $scope
	){

		var RenewalsInstance = classify(RenewalsController, {			

		});

		return new RenewalsInstance($scope);
	}
]);

GTS.renewals.factory('RenewalsViewModel', ['classify','BaseViewModel','$injector','$sce',
	function(classify, BaseViewModel, $injector, $sce
	){

		var RenewalsViewModel = classify(BaseViewModel, {
			
			_constructor : function(){
			
				var PassRenewalsDomData = $injector.get('PassRenewalsDomData');
				var PageDataDomData = $injector.get('PageDataDomData');			

				this.error = PageDataDomData.errorMessage;
				this.pageTitle = $sce.trustAsHtml(PageDataDomData.pageTitle);

				this.process(PassRenewalsDomData);
			},
			
			process : function(data){
				
				angular.forEach(data.renewalItems, function(item){					
				    this.parseHtml(item);
				}, this);				
				
				angular.extend(this, data);
			},			
					
			parseHtml : function(item){
				if(item.renewablePLUName){
					item.renewablePLUName = $sce.trustAsHtml(item.renewablePLUName);
				}
			}	
				
			
		});

		return RenewalsViewModel;
	}
]);

GTS.requestCorporateAccount.factory('RequestCorporateAccountController', [
	
	'BaseResponderController', 'classify','RequestCorporateAccountViewModel', 'WebFormsService',function(BaseResponderController, classify, RequestCorporateAccountViewModel,WebFormsService){
		
		var RequestCorporateAccountController = classify(BaseResponderController, {
			
			registrations : ['useBusiness', 'submit'],
			
			_constructor : function(){
				BaseResponderController.prototype._constructor.apply(this, arguments);
				this.viewModel = this.scope.viewModel = new RequestCorporateAccountViewModel();
				
				this.viewModel.businessCountry.onChange = angular.bind(this, this.onCountryChange);
				this.viewModel.contactCountry.onChange = angular.bind(this, this.onCountryChange);
				
				WebFormsService.onSubmit(angular.bind(this, this.submit));
			},
			
			// this is tying into a JS event, so its outside of angulars digest - need $apply
			submit : function(){
				
				if(this.bypass){
					this.viewModel.update();
					return true;
				}
				
				//this.viewModel.update();
				//return true;
				
				if(this.viewModel.validate()){
					this.copy();
					// this sets updates the select boxes correctly
					this.viewModel.update();
					
					//return false;
					return true;
				}
				
				this.scope.$apply();
				return false;
			},
			
			copy : function(){
				angular.forEach(['Street1','Street2','City','Country','States','State','Zipcode'], function(key){
					var source = this.viewModel['business'+key],
						target = this.viewModel['contact'+key];	
					if(source && target){
						target.value = source.value;
						if(source.options && target.options){
							target.change();
						}
					}
				}, this);
			},
			
			useBusiness : function(){
				angular.forEach(['contactStreet1','contactCity','contactCountry','contactStates','contactState','contactZipcode'], function(name){
					var field = this.viewModel[name];	
					if(field){
						field.required = false;
						field.error = false;
					}
					
				}, this);
			},
			
			onCountryChange : function(){
				this.bypass = true;
				WebFormsService.submit();
			}
			
		});
		
		return RequestCorporateAccountController;
	}
]);

GTS.requestCorporateAccount.controller('RequestCorporateAccountInstance', [
	
	'RequestCorporateAccountController', 'classify','$scope', function(RequestCorporateAccountController, classify, $scope){
		
		var RequestCorporateAccountInstance = classify(RequestCorporateAccountController, {
			
			
		});
		
		return new RequestCorporateAccountInstance($scope);
	}
]);

GTS.requestCorporateAccount.factory('RequestCorporateAccountViewModel', [
	
	'classify','BaseViewModel','requestCorporateAccountDomData','TextFormField','SelectFormField','BaseFormField','apiService',function(classify, BaseViewModel, requestCorporateAccountDomData, TextFormField,SelectFormField,BaseFormField, apiService) {

		var RequestCorporateAccountViewModel = classify(BaseViewModel, {
			_constructor: function() {
				angular.extend(this, requestCorporateAccountDomData);

				this.parseDropDown('businessCountry');
				this.parseDropDown('contactCountry');
				this.parseDropDown('contactStates');
				this.parseDropDown('contactCity');

				var required;

				if (requestCorporateAccountDomData.businessNameEl && requestCorporateAccountDomData.businessNameEl.name) {
					required = this.determineIfRequired(requestCorporateAccountDomData.businessNameRequiredEl);
					this.businessName = new TextFormField(angular.extend(requestCorporateAccountDomData.businessNameEl, { required: required }));
				}

				if (requestCorporateAccountDomData.businessReferenceEl && requestCorporateAccountDomData.businessReferenceEl.name) {
					required = this.determineIfRequired(requestCorporateAccountDomData.businessReferenceRequiredEl);
					this.businessReference = new TextFormField(angular.extend(requestCorporateAccountDomData.businessReferenceEl, { required: required }));
				}

				if (requestCorporateAccountDomData.externalAccountEl && requestCorporateAccountDomData.externalAccountEl.name) {
					required = this.determineIfRequired(requestCorporateAccountDomData.externalAccountRequiredEl);
					this.externalAccount = new TextFormField(angular.extend(requestCorporateAccountDomData.externalAccountEl, { required: required }));
				}

				if (requestCorporateAccountDomData.businessPhoneEl && requestCorporateAccountDomData.businessPhoneEl.name) {
					required = this.determineIfRequired(requestCorporateAccountDomData.businessPhoneRequiredEl);
					this.businessPhone = new TextFormField(angular.extend(requestCorporateAccountDomData.businessPhoneEl, { required: required }));
				}

				if (requestCorporateAccountDomData.businessMobileEl && requestCorporateAccountDomData.businessMobileEl.name) {
					required = this.determineIfRequired(requestCorporateAccountDomData.businessMobileRequiredEl);
					this.businessMobile = new TextFormField(angular.extend(requestCorporateAccountDomData.businessMobileEl, { required: required }));
				}

				if (requestCorporateAccountDomData.salespersonEl && requestCorporateAccountDomData.salespersonEl.name) {
					required = this.determineIfRequired(requestCorporateAccountDomData.salespersonRequiredEl);
					this.salesperson = new TextFormField(angular.extend(requestCorporateAccountDomData.salespersonEl, { required: required }));
				}

				if (requestCorporateAccountDomData.businessFaxEl && requestCorporateAccountDomData.businessFaxEl.name) {
					required = this.determineIfRequired(requestCorporateAccountDomData.businessFaxRequiredEl);
					this.businessFax = new TextFormField(angular.extend(requestCorporateAccountDomData.businessFaxEl, { required: required }));
				}

				if (requestCorporateAccountDomData.businessStreet1El && requestCorporateAccountDomData.businessStreet1El.name) {
					required = this.determineIfRequired(requestCorporateAccountDomData.businessStreet1RequiredEl);
					this.businessStreet1 = new TextFormField(angular.extend(requestCorporateAccountDomData.businessStreet1El, { required: required }));
				}

				if (requestCorporateAccountDomData.businessStreet2El && requestCorporateAccountDomData.businessStreet2El) {
					required = this.determineIfRequired(requestCorporateAccountDomData.businessStreet2RequiredEl);
					this.businessStreet2 = new TextFormField(angular.extend(requestCorporateAccountDomData.businessStreet2El, { required: required }));
				}

				if (requestCorporateAccountDomData.businessCityEl && requestCorporateAccountDomData.businessCityEl.name) {
					required = this.determineIfRequired(requestCorporateAccountDomData.businessCityRequiredEl);
					this.businessCity = new TextFormField(angular.extend(requestCorporateAccountDomData.businessCityEl, { required: required }));
				}

				if (requestCorporateAccountDomData.businessZipcodeEl && requestCorporateAccountDomData.businessZipcodeEl.name) {
					required = this.determineIfRequired(requestCorporateAccountDomData.businessPostalRequiredEl);
					this.businessZipcode = new TextFormField(angular.extend(requestCorporateAccountDomData.businessZipcodeEl, { required: required }));
				}

				if (requestCorporateAccountDomData.businessUrlEl && requestCorporateAccountDomData.businessUrlEl.name) {
					required = this.determineIfRequired(requestCorporateAccountDomData.businessUrlRequiredEl);
					this.businessUrl = new TextFormField(angular.extend(requestCorporateAccountDomData.businessUrlEl, { required: required }));
				}

				if (requestCorporateAccountDomData.businessStateEl) {
					required = this.determineIfRequired(requestCorporateAccountDomData.businessStateRequiredEl);
					this.businessState = new TextFormField(angular.extend(requestCorporateAccountDomData.businessStateEl, { required: required }));
					this.businessState.required = required;
					delete this.businessStates;
				} else {
					required = this.determineIfRequired(requestCorporateAccountDomData.businessStateRequiredEl);
					this.parseDropDown('businessStates');
					this.businessStates.required = required;
				}

				if (requestCorporateAccountDomData.contactStateEl) {
					this.contactState = new TextFormField(requestCorporateAccountDomData.contactStateEl);
					delete this.contactStates;
				}

				// contact info
				this.firstName = new TextFormField(angular.extend(requestCorporateAccountDomData.firstNameEl, { required: true }));
				this.lastName = new TextFormField(angular.extend(requestCorporateAccountDomData.lastNameEl, { required: true }));
				this.middleName = new TextFormField(angular.extend(requestCorporateAccountDomData.middleNameEl, { required: false }));
				this.contactPhone = new TextFormField(angular.extend(requestCorporateAccountDomData.contactPhoneEl, { required: false }));
				this.contactEmail = new TextFormField(angular.extend(requestCorporateAccountDomData.contactEmailEl, { required: true }));
				this.contactConfirmEmail = new TextFormField(angular.extend(requestCorporateAccountDomData.contactConfirmEmailEl, { required: true }));

				// contact address
				this.contactStreet1 = new TextFormField(angular.extend(requestCorporateAccountDomData.contactStreet1El, { required: false }));
				this.contactStreet2 = new TextFormField(angular.extend(requestCorporateAccountDomData.contactStreet2El, { required: false }));
				this.contactCity = new TextFormField(angular.extend(requestCorporateAccountDomData.contactCityEl, { required: false }));
				this.contactZipcode = new TextFormField(angular.extend(requestCorporateAccountDomData.contactZipcodeEl, { required: false }));

				this.processServerErrors();

			},

			determineIfRequired: function(hiddenField) {
				var required = false;
				if (hiddenField) {
					required = hiddenField.value === "True";
				}
				return required;
			},
			
			//businessCountry : {},
			
			parseDropDown : function(name){
				
				var select = $(this[name]),
					data = {
						name : select.attr('name'),
						display : this[name+'Label']
					},	
					options = [];
					
				if(name === 'businessStates') {
				    data.display = this.businessStateLabel;
				}
					
				if(select.length){
					angular.forEach(select.find('option'), function(option){
						option = $(option);
						options.push({
							text : option.text(),
							value : option.val()
						});
						if(option.attr('selected') === 'selected') {
						    data.value = option.val();
						}
					});

					data.required = false;

					this[name] = new SelectFormField(data);
					this[name].options = options;
					
					if(this[name].value){
						this[name].change();
					}	
				}				
			},
			
			validate : function(){
				
				var normalFields = [];
				
				var errors = false;
				angular.forEach(this, function(prop, name){
					if(prop instanceof BaseFormField){
						var validField = prop.validate();
						if(!errors && !validField) errors = true;	
					}
				}, this);
				
				return !errors;
			},
			
			update : function(){
				angular.forEach(this, function(prop, name){
					if(prop instanceof BaseFormField && prop.options){
							
						var el = $('[name="'+prop.name+'"]'),
							parent = el.parent();
							
						el.remove();
					    parent.append('<input name="' + prop.name + '" value="' + prop.value + '">');
					}
				}, this);
			},
			
			processServerErrors : function(){
				angular.forEach(this, function(prop, name){
					if(prop instanceof BaseFormField){
						var error = this[name+'Error'];
						if(error){
							prop.error = true;
						}else{
							delete this[name+'Error'];
						}
					}
				}, this);
			}
			
		});
		
		return RequestCorporateAccountViewModel;
	}
]);

GTS.rosterInfo.factory('RosterInfoContactForm', [

	'classify', 'ContactForm', 'TextFormField', 'SelectFormField', function (
	 classify,   ContactForm,   TextFormField,   SelectFormField) {

		var RosterInfoContactForm = classify(ContactForm, {
			_constructor: function(firstNameEl, lastNameEl, street1El, street2El, countryEl, cityEl, stateDropDownEl, stateTextEl, postalEl, emailEl) {
				this.username = new TextFormField({ visible: false, required: false });
				this.password = new TextFormField({ visible: false, required: false });
				this.confirmPassword = new TextFormField({ visible: false, required: false });
				this.birthday = new TextFormField({ visible: false, required: false });
				this.title = new SelectFormField({ visible: false, required: false });
				this.suffix = new SelectFormField({ visible: false, required: false });
				this.confirmEmail = new TextFormField({ visible: false, required: false });
				this.phone = new TextFormField({ visible: false, required: false });
				this.mobile = new TextFormField({ visible: false, required: false });
				this.middleName = new TextFormField({ visible: false, required: false });
				
				this.firstName = new TextFormField(firstNameEl);
				this.lastName = new TextFormField(lastNameEl);
				this.street1 = new TextFormField(street1El);
				this.street2 = new TextFormField(street2El);
				this.city = new TextFormField(cityEl);
				this.country = new SelectFormField(countryEl);
				this.country.change();

				if (stateDropDownEl.id) {
					this.state = new SelectFormField(stateDropDownEl);
				} else {
					this.state = new SelectFormField(stateTextEl);
				}
				this.state.change();

				this.zipCode = new TextFormField(postalEl);
				this.email = new TextFormField(emailEl);
				
				this.country.onChange = angular.bind(this, this.onCountryChangedNew);
			},

			onCountryChangedNew: function () {
				this.updatePage();
				setTimeout('__doPostBack(\'' + this.country.name + '\',\'\')', 0);
			},
			
			updatePage : function(){
				angular.forEach([this.country, this.state], function (q) {
					if(q.options && q.options.length){
					
					
						if(!q.value){
							q.value = 0;
						}
						
						var el = $('#page').find('select[name="'+q.name+'"]'),
							parent = el.parent();
						el.remove();
					}
				});
			},

		});

		return RosterInfoContactForm;

	}]);

GTS.rosterInfo.controller('rosterInfoController',
            ['baseViewModel', '$sce', 'pageStateService', '$scope', 'classify', 'BaseController', 'PageDataDomData', 'RosterInfoDomData', 'WebFormsService', 'RosterInfoContactForm', 'Debounce',
    function (baseViewModel,   $sce,   pageStateService,   $scope,   classify,   baseController,   PageDataDomData,   rosterInfoDomData,   webFormsService,   RosterInfoContactForm,   Debounce) {

	    var rosterInfoController = classify(baseController, {
		    viewModel: { rosterContact: {} },

		    registrations: ["onUseContactLogonCheckBoxClick", "cancel"],

		    debounce : new Debounce(1000),

        	postConstruct: function () {
        		this.viewModel.rosterDescriptionLiteral = rosterInfoDomData.RosterDescriptionLiteral;
        		this.viewModel.rosterIndexDescriptionLiteral = rosterInfoDomData.RosterIndexDescriptionLiteral;
        		this.viewModel.useCustContactLogonCheckBoxEl = rosterInfoDomData.UseCustContactLogonCheckBoxEl;
        		this.viewModel.errorMessage = PageDataDomData.errorMessage;
		        
        		this.viewModel.rosterContact = new RosterInfoContactForm(
					rosterInfoDomData.FirstNameTextBoxEl,
					rosterInfoDomData.LastNameTextBoxEl,
					rosterInfoDomData.Street1TextBoxEl,
					rosterInfoDomData.Street2TextBoxEl,
					rosterInfoDomData.CountryDropDownListEl,
					rosterInfoDomData.CityTextBoxEl,
					rosterInfoDomData.RegionDropDownListEl,
					rosterInfoDomData.RegionTextBoxEl,
					rosterInfoDomData.PostalTextBoxEl,
					rosterInfoDomData.EmailTextBoxEl
				);

        		//  Clear the id and name from all select boxes.  Their values get bound to hidden fields, 
        		//  since angular doesn't use the actual values in a drop down list.
		        this.debounce.wait(angular.bind(this, function() {
			        var countrySel = $("select#" + rosterInfoDomData.CountryDropDownListEl.id);
			        countrySel.removeAttr("name");
			        countrySel.removeAttr("id");

			        var stateSel = $("select#" + rosterInfoDomData.RegionDropDownListEl.id);
			        stateSel.removeAttr("name");
			        stateSel.removeAttr("id");

			        var stateText = $("input[type=text]#" + rosterInfoDomData.RegionTextBoxEl.id);
			        stateText.removeAttr("name");
			        stateText.removeAttr("id");
		        }));

		        this.viewModel.rosterQuestions = rosterInfoDomData.rosterQuestions;

		        this.viewModel.rosterInfoCancelButtonEl = rosterInfoDomData.rosterInfoCancelButtonEl;
		        this.viewModel.rosterInfoContinueButtonEl = rosterInfoDomData.rosterInfoContinueButtonEl;

				//  Convert questions html to safe html
				if (this.viewModel.rosterQuestions){
					for (var i = 0; i < this.viewModel.rosterQuestions.length; i++) {
						var question = this.viewModel.rosterQuestions[i];
						
						if (question.required === "") {
							question.required = true;
						}
						question.rosterResponseHtml = $sce.trustAsHtml(question.rosterResponse);
						question.surveyResponseValidatorHtml = $sce.trustAsHtml(question.surveyResponseValidator);
					}
				}
				
				//  Process errors returned from the server
		        if (rosterInfoDomData.FirstNameFieldValidator) {
		        	this.viewModel.rosterContact.firstName.error = true;
		        	this.viewModel.rosterContact.firstName.errorMessage = rosterInfoDomData.FirstNameFieldValidator;
		        }
		        if (rosterInfoDomData.LastNameFieldValidator) {
		        	this.viewModel.rosterContact.lastName.error = true;
		        	this.viewModel.rosterContact.lastName.errorMessage = rosterInfoDomData.LastNameFieldValidator;
		        }
		        if (rosterInfoDomData.Street1FieldValidator) {
		        	this.viewModel.rosterContact.street1.error = true;
			        this.viewModel.rosterContact.street1.errorMessage = rosterInfoDomData.Street1FieldValidator;
		        }
		        if (rosterInfoDomData.Street2FieldValidator) {
		        	this.viewModel.rosterContact.street2.error = true;
		        	this.viewModel.rosterContact.street2.errorMessage = rosterInfoDomData.Street2FieldValidator;
		        }
		        if (rosterInfoDomData.CountryFieldValidator) {
		        	this.viewModel.rosterContact.country.error = true;
		        	this.viewModel.rosterContact.country.errorMessage = rosterInfoDomData.CountryFieldValidator;
		        }
		        if (rosterInfoDomData.CityFieldValidator) {
		        	this.viewModel.rosterContact.city.error = true;
		        	this.viewModel.rosterContact.city.errorMessage = rosterInfoDomData.CityFieldValidator;
		        }
		        if (rosterInfoDomData.RegionFieldValidator) {
		        	this.viewModel.rosterContact.state.error = true;
		        	this.viewModel.rosterContact.state.errorMessage = rosterInfoDomData.RegionFieldValidator;
		        }
		        if (rosterInfoDomData.CountryFieldValidator) {
		        	this.viewModel.rosterContact.country.error = true;
		        	this.viewModel.rosterContact.country.errorMessage = rosterInfoDomData.CountryFieldValidator;
		        }
		        if (rosterInfoDomData.PostalFieldValidator) {
		        	this.viewModel.rosterContact.zipCode.error = true;
		        	this.viewModel.rosterContact.zipCode.errorMessage = rosterInfoDomData.PostalFieldValidator;
		        }
		        if (rosterInfoDomData.EmailFieldValidator) {
		        	this.viewModel.rosterContact.email.error = true;
		        	this.viewModel.rosterContact.email.errorMessage = rosterInfoDomData.EmailFieldValidator;
		        }

		        this.viewModel.rosterContact.street1.required = false;
		        this.viewModel.rosterContact.street2.required = false;
		        this.viewModel.rosterContact.city.required = false;
		        this.viewModel.rosterContact.state.required = false;
		        this.viewModel.rosterContact.country.required = false;
		        this.viewModel.rosterContact.zipCode.required = false;
		        this.viewModel.rosterContact.email.required = false;
		        webFormsService.onSubmit(angular.bind(this, this.onSubmit));
        	},
		
        	onSubmit : function() {
		        this.viewModel.rosterContact.updatePage();
		        return true;
	        },
			
        	onUseContactLogonCheckBoxClick: function () {
        		

				setTimeout('__doPostBack(\'' + this.viewModel.useCustContactLogonCheckBoxEl.name + '\',\'\')', 0);
        	},

        	cancel: function () {
        		setTimeout('__doPostBack(\'' + this.viewModel.rosterInfoCancelButtonEl.name + '\',\'\')', 0);
	    	}
        });

        return new rosterInfoController($scope);
    }]);

GTS.salesChannelNav.factory('SalesChannelNavController', [
	'pageStateService', 'BaseResponderController','classify', 'SalesChannelNavService', 'SalesChannelNavViewModel', '$sce', function(
	  pageStateService,  BaseResponderController,  classify,   salesChannelNavService,   salesChannelNavViewModel,   $sce){

    var device = {
		a : true,
		b : false,
		c : false
	};
	
	var SalesChannelNavController = classify(BaseResponderController, {
		viewModel : salesChannelNavViewModel,
		state : { loading : false, ShowPassLinksUnorderedList : false, ShowRenewalPassHyperlink : false},
		
		postConstruct : function(scope){	
			this.scope.root = pageStateService.getRoot();
			this.loadCategories();
		},

		loadCategories : function(){
			this.state.loading = true;
			var queryString = pageStateService.getQueryString();
			salesChannelNavService.loadCategories(queryString.cg).then(angular.bind(this, this.processCategories, queryString));
		},
		
		processCategories : function(queryString, categories){
			this.state.loading = false;
			this.viewModel.categories = categories;
			
			if(categories.length > 0){
				// we can get to the landing page without running JS on view items, so we need to set the cg and set c to the first one
				if(!queryString.c){
					queryString.c = categories[0].ExternalId;
					pageStateService.setCategoryGroups(queryString);
				}
				
				this.state.ShowPassLinksUnorderedList = categories[0].ShowPassLinksUnorderedList;
				this.state.ShowRenewalPassHyperlink = categories[0].ShowRenewalPassHyperlink;
			}
			
			angular.forEach(this.viewModel.categories, function (cat) {
				cat.Name = $sce.trustAsHtml(cat.Name);
				var img = new Image();
				img.src = this.viewModel.root+'ImageHandler.ashx?SalesChannelDetailID='+cat.Id;
				img.onload = angular.bind(this, function(evt){

					if(img.height && img.width){
						cat.imgSrc = img.src;
					}

					this.scope.$apply();
				});
			}, this);
		}
	});

	return SalesChannelNavController;

}]);

GTS.salesChannelNav.controller('salesChannelNavInstance', ['classify','SalesChannelNavController','$scope',
	function(classify, SalesChannelNavController, $scope){
	
		var SalesChannelNavInstance = classify(SalesChannelNavController, {
			
		});
		
		return new SalesChannelNavInstance($scope);
	
	}
]);

GTS.salesChannelNav.service('SalesChannelNavService', [
	'classify','$http', '$q', '$sce','CommunicatorService', 'apiService', 'BaseFormField',function(
	 classify,  $http,   $q,    $sce,  CommunicatorService,  api,          BaseFormField){

	var SalesChannelNavService = classify({
            loadCategories : function(categoryGroupId){
				var request = $q.defer();
				
				if(!categoryGroupId){
					categoryGroupId = "0";
				}
		
				api.getCategories(categoryGroupId).then(angular.bind(this, this.processCategories, request));
				
				return request.promise;
			},
			
			processCategories : function(request, response){
				this.categories = response.data;
				
				for (var i = 0; i < this.categories.length; i++) {
					var category = this.categories[i];
					category.descriptionSafe = $sce.trustAsHtml(category.Description);
				}
				
				request.resolve(this.categories);
			}
	});

	return new SalesChannelNavService();
}]);

GTS.salesChannelNav.factory('SalesChannelNavViewModel', ['baseViewModel', function(baseViewModel){
	
	return angular.extend({	categories: [] }, baseViewModel);

}]);

GTS.selectCustomer.factory('SelectCustomerController', [
	'classify','BaseController','SelectCustomerViewModel','WebFormsService',function(classify, BaseController, SelectCustomerViewModel, WebFormsService){
	
		var SelectCustomerController = classify(BaseController, {
			
			_constructor : function(){
				BaseController.prototype._constructor.apply(this, arguments);
				this.viewModel = this.scope.viewModel = new SelectCustomerViewModel();
				
				WebFormsService.onSubmit(angular.bind(this, this.submit));
			},
			
			submit : function(){
				if(this.viewModel.validate()){
					this.viewModel.updateSelects();
					return true;
				}else{
					setTimeout(angular.bind(this, function(){
						this.scope.$apply();
					}), 0);
					return false;
				}
				return false;
			}
			
		});
		
		return SelectCustomerController;
	}
]);

GTS.selectCustomer.controller('selectCustomerInstance', [
	'classify','SelectCustomerController','$scope',function(classify,SelectCustomerController,$scope){
	
		var SelectCustomerInstance = classify(SelectCustomerController, {
			
			
			
		});
		
		return new SelectCustomerInstance($scope);
	}
]);

GTS.selectCustomer.factory('SelectCustomerViewModel', [
	'classify','BaseForm','selectCustomerDomData','SelectFormField', function(classify, BaseForm, selectCustomerDomData, SelectFormField){
	
		var SelectCustomerViewModel = classify(BaseForm, {
			
			_constructor : function(){
				BaseForm.prototype._constructor.apply(this, arguments);	
			},
			
			customerSelect : new SelectFormField(selectCustomerDomData.customersSelectEl),
			continue : selectCustomerDomData.continueEl,
			
			updateSelects : function(){
				angular.forEach([this.customerSelect], function(q){	
					
					if(q.options && q.options.length){
						if(!q.value){
							q.value = 0;
						}
						var el = $('#page').find('select[name="'+q.name+'"]'),
							parent = el.parent();
						el.remove();
						parent.append('<input name="'+q.name+'" value="'+q.value+'">');
					}
				});
			}
			
		});
		
		return SelectCustomerViewModel;
	}
]);

GTS.smallCart.controller('SmallCartController', [
	
	'BaseController','CommunicatorService','classify', '$scope','$sce', 'SmallCartService', 'pageStateService',function(
	 BaseController,  CommunicatorService,  classify, $scope, $sce, SmallCartService, PageStateService){
		 
	var SmallCartController = classify(BaseController, {
		
		registrations : ['cartClick', 'goToCart'],
		
		viewModel : {
			showCart : false,
			count : null,
			items : []
		},
		
		postConstruct : function(){
			
			SmallCartService.getProcessedCart().then(angular.bind(this, this.updateDisplay));
			
			CommunicatorService.receive('updateSmallCart', angular.bind(this, function(cart){
				SmallCartService.setCart(cart);
				this.updateDisplay(cart);
			}));
			
		},
		
		updateDisplay : function(cart){
			
			var total = 0;
			angular.forEach(cart.Items, function(item){
				item.Name = $sce.trustAsHtml(item.Name);
				total += (item.Quantity);
			});
			
			this.viewModel.count = total;
		},
		
		cartClick : function(){
			this.viewModel.showCart = !this.viewModel.showCart;
			if(this.viewModel.showCart){
				this.viewModel.cartItems = SmallCartService.getItems();
				this.viewModel.footer = SmallCartService.getFooter();
			}							
		},
		
		goToCart : function(){
			var root = PageStateService.getRoot();
			window.location.href = root+'Shop/ViewCart.aspx';
		}
		
	});

	return new SmallCartController($scope);

}]);

GTS.smallCart.service('SmallCartService', ['classify', 'apiService','$q', function(classify, api, $q){

	var quantity = 0;

	var SmallCartService = classify({
		
		cart : $q.defer(),
		
		_constructor : function(){
			api.getCart().then(angular.bind(this, function(response){
				this.cart.resolve(response);
			}));
		},
		
		getCart : function(){
			return this.cart.promise;
		},
		
		getProcessedCart : function(){
			var request = $q.defer(),
				self = this;
			this.getCart().then(function(response){
				self.items = response.data.Items;
				self.totals = response.data.Totals;
				request.resolve(response.data);	
			});
			return request.promise;
		},
		
		setCart : function(cart){
			self.items = cart.Items;
			self.totals = cart.Totals;
		},

		getTotalCount : function(){
			return quantity;
		},

		getItems : function(){
			return this.items;
		},

		getFooter : function() {
		    return {
		        total: this.totals.SubtotalDisplay
		    };
		}


	});

	return new SmallCartService();


}]);

GTS.steps.controller('StepsController', [
	
	'$scope','classify','pageStateService','BaseResponderController','Debounce',function(
	 $scope,  classify,  PageStateService,  BaseResponderController,  Debounce){

	var page = PageStateService.getPageModel();
	
	var device = {
		a : true,
		b : false,
		c : false
	};

	var StepsController = classify(BaseResponderController, {
		
		postConstruct : function(){
			this.scope.page = page;
			this.scope.go = PageStateService.go;
		}
	
	});

	return new StepsController($scope);

}]);

GTS.survey.controller('surveyController',
            ['baseViewModel', '$sce', 'pageStateService', '$scope', 'classify', 'BaseController', 'PageDomData', 'SurveyDomData', 'WebFormsService',
    function (baseViewModel,   $sce,   pageStateService,   $scope,   classify,   BaseController,   pageDomData,   surveyDomData,   WebFormsService) {

        var surveyController = classify(BaseController, {
        	viewModel: angular.extend({}, baseViewModel),

        	registrations : ['submitSurvey'],

	        postConstruct: function () {
				this.viewModel.surveyQuestions = surveyDomData.surveyQuestions;
            	this.viewModel.saveButtonEl = surveyDomData.saveButtonEl;
		        this.viewModel.surveyConfirmationLabelEl = surveyDomData.surveyConfirmationLabelEl;

            	angular.forEach(this.viewModel.surveyQuestions, function (question) {
					question.surveyResponseHtml = $sce.trustAsHtml(question.surveyResponsePh);
				}, this);
        	},
        });

        return new surveyController($scope);

    }]);

GTS.termsAndConditionsDialog.controller('termsAndConditionsDialogController', [
	
	'BaseController','baseViewModel','$scope','classify','ModalController','formatterService','CommunicatorService', function(
	 BaseController,      viewModel,  $scope,  classify,  ModalController,  formatterService,  CommunicatorService){
		 
	var state = {
		showModal : false,
		loading : false
	};
	
	var ConfirmationPromptController = classify(BaseController, [ModalController, {
		
		state: state,
		registrations : ['closeModal', 'confirm'],
		listeners : {
			'termsAndConditions' : 'openModal'
		},
		
		onModalOpen : function(contacts){
			this.state.loading = false;
		}
	}]);
	
	return new ConfirmationPromptController($scope);

}]);

GTS.ticketLookup.controller('TicketLookupController', [

	'pageStateService', 'ResponderService', 'TicketLookupService', '$scope', 'classify', 'BaseController', '$sce', 'TicketLookupViewModel', 'TicketLooupDomData', 'PageDomData', function (
	 pageStateService,   responderService,   ticketLookupService,   $scope,   classify,   baseController,   $sce,   ticketLookupViewModel,   ticketLookupDomData,  pageDomData) {

		var device = {
			a: true,
			b: false,
			c: false
		};

		var TicketLookupController = classify(baseController, {

			viewModel: ticketLookupViewModel,

			state: { },

			registrations: [],

			device: device,

			initDevice: function () {
				this.scope.device = device;
				angular.forEach(device, function (val, key) {
					device[key] = responderService.getBreakerStatus(key);
				});
			},

			postConstruct: function () {
				this.initDevice();
				responderService.bind('a', angular.bind(this, this.changeDevice));
				responderService.bind('b', angular.bind(this, this.changeDevice));
				responderService.bind('c', angular.bind(this, this.changeDevice));
				this.scope.root = pageStateService.getRoot();
				this.viewModel.data = ticketLookupDomData;
				this.viewModel.errorMessage = pageDomData.errorMessage;
			},

			changeDevice: function (bool, breaker) {
				device[breaker] = bool;
				this.scope.$apply();
			}
		});

		return new TicketLookupController($scope);

	}]);

GTS.ticketLookup.factory('TicketLookupService', ['classify',
	function (classify) {

		var TicketLookupService = classify({

		});

		return new TicketLookupService();
	}]
);

GTS.ticketLookup.factory('TicketLookupViewModel', ['baseViewModel', function (baseViewModel) {

	return angular.extend({

		

	}, baseViewModel);

}]);

GTS.ticketLookupModal.factory('TicketLookupModalController', ['classify','BaseController','ModalController','CommunicatorService','ticketLookupModalService','TicketLookupModalViewModel','WebFormsService','pageStateService',
	function(classify, BaseController, ModalController, CommunicatorService, ticketLookupModalService,TicketLookupModalViewModel,WebFormsService, pageStateService
	){

		var TicketLookupModalBaseController = classify(BaseController, [ModalController, {

			state : {},
			scope : {},
			
			_constructor : function(scope){

				BaseController.prototype._constructor.apply(this, arguments);
				WebFormsService.onSubmit(angular.bind(this, this.submit));
			},

			registrations : ['closeModal'],

			listeners : {
				'ticketLookupModel.get':'openModal'
			},
			
			onModalOpen : function(data){
				this.state.loading = false;
				this.scope.viewModel = this.viewModel = new TicketLookupModalViewModel(data);
				this.scope.error = false;
			},
			
			submit : function(){
				if(this.state.showModal){
					if(this.viewModel.validate()){
						ticketLookupModalService.send(this.viewModel).then(function(response){
							pageStateService.go('loyaltySelector');
						}, angular.bind(this, this.showError));
						return false;
					}else{
						this.scope.$apply();
						return false;	
					}
				}
			},
			
			showError : function(err){
				this.scope.error = err;
				this.scope.$applyAsync();
			}
			
		}]);

		return TicketLookupModalBaseController;
	}
]);

GTS.ticketLookupModal.controller('ticketLookupModalInstance', ['classify','TicketLookupModalController','$scope',
	function(classify, TicketLookupModalController, $scope
	){

		var TicketLookupModalInstance = classify(TicketLookupModalController, {
			
			// add methods here

		});

		return new TicketLookupModalInstance($scope);
	}
]);

GTS.ticketLookupModal.factory('ticketLookupModalService', ['classify','BasePostBack','DomDataParser','WebFormsService','$q',
	function(classify, BasePostBack,DomDataParser,WebFormsService,$q
	){

		var TicketLookupModalService = classify(BasePostBack, {
			
			send : function(viewModel){
				
				var req = $q.defer();
				var data = {
					'ctl00$ContentPlaceHolder$ScriptManager1':'ctl00$ContentPlaceHolder$UpdatePanel|'+viewModel.submitButton.name,
					'__asyncpost' : true
				};
				data[viewModel.submitButton.name] = viewModel.submitButton.value;
				if(viewModel.visualId){
					data[viewModel.visualId.name] = viewModel.visualId.value;
				}
				
				if(viewModel.lastName){
					data[viewModel.lastName.name] = viewModel.lastName.value;
				}
				
				if(viewModel.accountNumber){
					data[viewModel.accountNumber.name] = viewModel.accountNumber.value;
				}
				
				if(viewModel.birthDate){
					data[viewModel.birthDate.name] = viewModel.birthDate.value;
				}
				
				WebFormsService.setModel(data);
				WebFormsService.updatePage();
				
				this.request().then(function(response){
					var dpp = new DomDataParser(response.data);
					var _data = dpp.getData();
					if(_data.error){
						req.reject(_data.error);
					}else{
						req.resolve(_data);
					}
				});
				
				return req.promise;
			}
			
		});

		return new TicketLookupModalService();
	}
]);

GTS.ticketLookupModal.factory('TicketLookupModalViewModel', ['classify','BaseForm','TextFormField','BirthdateFormField',
	function(classify, BaseForm,TextFormField,BirthdateFormField
	){

		var TicketLookupModalViewModel = classify(BaseForm, {
			
			_constructor : function(data){
				
				this.submitButton = data.submitButtonEl;
							
				if(data.visualIdInputEl){
					this.visualId = new TextFormField(data.visualIdInputEl);
				}
				
				if(data.accountNumberInputEl){
					this.accountNumber = new TextFormField(data.accountNumberInputEl);
				}
				
				if(data.lastNameInputEl){
					this.lastName = new TextFormField(data.lastNameInputEl);
				}
				
				if(data.birthDateInputEl){
					this.birthDate = new BirthdateFormField(data.birthDateInputEl);
				}
			}
			
		});

		return TicketLookupModalViewModel;
	}
]);

GTS.upsellCalendarModal.controller('upsellCalendarModalController', [
	
	'classify','BaseController','ModalController','$scope','upsellCalendarModalService',function(classify, BaseController, ModalController, $scope, upsellCalendarModalService){
	
	var UpsellCalendarModalController = classify(BaseController, [ModalController, {
		
		listeners : {
			'openUpsellModal' : 'openModal',
		},
		registrations : ['selectDay'],
		
		onModalOpen : function(data){
			upsellCalendarModalService.loadCalendarData(data).then(angular.bind(this, this.update));
		},
		
		update : function(calData){
			
			this.state.loading = false;
			this.state.hasDates = calData.days.length;
			this.viewModel.calendar = calData;
			
		},
		
		selectDay : function(day){
			upsellCalendarModalService.selectDay(this.viewModel.calendar, day);
		}
		
	}]);
	
	return new UpsellCalendarModalController($scope);
	
}]);

GTS.upsellCalendarModal.factory('upsellCalendarModalService', [
	
	'classify', '$q','WebFormsService','CalendarModal_Parser',function(classify, $q, WebFormsService,CalendarModal_Parser){
	
	var UpsellCalendarModalService = classify({
		
		loadCalendarData : function(data){
			
			var request = $q.defer();
			
			this.updatePre(data);
			
			this.load().then(function(calData){
				request.resolve(calData);
			});
			
			return request.promise;
		},
		
		updatePre : function(data){
			
			WebFormsService.clean();
			var change = {
				'ctl00$ContentPlaceHolder$ScriptManager1':'ctl00$ContentPlaceHolder$UpdatePanel|'+data.item.selectDateTimeButtonEl.name,
				'__ASYNCPOST': true
			};
			change[data.item.selectDateTimeButtonEl.name+'.x'] = 0;
			change[data.item.selectDateTimeButtonEl.name+'.y'] = 0;
			change[data.option.orderLineEl.name] = data.option.orderLineEl.value;
			
			WebFormsService.setModel(change);
		},
		
		load : function(){
			
			var request = $q.defer();
			
			$.ajax({
				url : '',
				method : 'POST',
				data : WebFormsService.getModel()
			}).then(angular.bind(this, function(response){
				request.resolve(this.parse(response));
			}));
			
			return request.promise;
		},
		
		parse : function(html){
			return CalendarModal_Parser.parseCalendar($.parseHTML(html));			
		},
		
		selectDay : function(cal, day){
			
			var data = {
				'__EVENTARGUMENT':day.target,
				'__ASYNCPOST':true,
				'__EVENTTARGET' : cal.calendarSelector
			};
			WebFormsService.setModel(data);
			
			this.load().then(function(d){
			
				
			});
		}
		
	});
	
	return new UpsellCalendarModalService();
	
}]);

GTS.upsellModal.factory('UpsellModalController', [
	'classify', 'BaseResponderController', 'UpsellModalViewModel', 'CommunicatorService', 'apiService', 'ModalController',
		'upsellModalService', 'pageStateService', 'PackageControl','dateUtilService', function(
	 classify,   BaseController,   UpsellModalViewModel, CommunicatorService,   apiService,   ModalController,  
	 	upsellModalService, pageStateService,  PackageControl, dateUtilService){
	
	var UpsellModalController = classify(BaseController, [ModalController, {
		
		scrollIndex : 0,
	
		viewModel : new UpsellModalViewModel(),
		
		registrations : ['selectActive', 'decline', 'add', 'expandPackage', 'selectEvent', 'showMore', 'showDetail', 'back', 'next', 'previous'],
		listeners : {
			'checkUpsell' : 'start',
			'upsellModal.resume' : 'resume'
		},
		
		start : function(){
			upsellModalService.getUpsell().then(angular.bind(this, this.checkUpsell));
		},
		
		onModalOpen : function(replacements){
			this.state.loading = false;
			this.viewModel.replacements = replacements;
			
			if(this.viewModel.replacements[0].Replacements.length === 1){
				this.showDetail(this.viewModel.replacements[0].Replacements[0]);
			}
		},
		
		expandPackage : function(item){
			this.viewModel.errorMessage = "";
			this.viewModel.packageExpanded = !this.viewModel.packageExpanded;
			//console.dir(PackageControl.);
			PackageControl.prototype.expandPackage.apply(this, arguments);
		},
				
		selectActive : function(item, orderLine){
			this.viewModel.errorMessage = "";

		    angular.forEach(this.viewModel.replacements, function(replacement) {
		        angular.forEach(replacement.Replacements, function(_item) {
		            delete _item.active;
		            delete item.expandPackage;
		        });
		    });	
			item.active = true;
			this.viewModel.itemSelected = item;
		},
		
		selectEvent: function(item){
			var eventTypeId,
				resourceId,
				eventId,
				quantity,
				isDateSpecific;
			
			if (item.Item){
				eventTypeId = item.Item.Event.EventType;
				resourceId = item.Item.Event.Section;
				eventId = item.Item.Event.EventId; 
				quantity = item.quantityInput.value;
				isDateSpecific = item.Item.Event.IsDateSpecific;
			}else{ // package detail
				eventTypeId = item.EventType;
				resourceId = item.Section;
				eventId = item.EventId; 
				quantity = item.Quantity;
				isDateSpecific = item.IsDateSpecific;
			
				item.isPackageItem = true;		
			}

		    var data = {
		        startDate: dateUtilService.getCurrentDate(),
		        endDate: dateUtilService.getEndDate(),
		        eventTypeId: eventTypeId,
		        quantity: quantity,
		        resourceId: resourceId,
		        salesChannelDetailId: item.SalesChannelDetailID,
		        plu: item.PLU,
		        eventId: eventId
		    };

			this.state.showModal = false;
			this.eventTarget = item;
			
			if (isDateSpecific){
				CommunicatorService.send('dateSpecificModalApi.get', data);
			} else {
				CommunicatorService.send('eventTimeModalApi.get', data);
			}

			this.viewModel.errorMessage = '';
		},
		
		add : function(){
			upsellModalService.makeReplacement(this.viewModel.itemSelected).then(angular.bind(this, this.nextUpsell));
		},
		
		decline : function(){
			this.state.loading = true;
			var orderLineId = this.viewModel.replacement.OrderLineId;
			upsellModalService.declineReplacement(orderLineId).then(angular.bind(this, this.nextUpsell));
		},
		
		nextUpsell : function(response){
			this.viewModel.error = false;
			
			if (response && !response.success){
				this.viewModel.error = true;
				this.viewModel.errorMessage = response.errorMessage;
				return false;	
			}
			
			this.viewModel.currentIndex++;
			
			if (this.allReplacements[this.viewModel.currentIndex]){
				this.viewModel.replacement = this.allReplacements[this.viewModel.currentIndex];
				this.viewModel.createQuantityInputs();
				this.viewModel.itemSelected = false;
				this.viewModel.showMore = false;
				this.state.loading = false;

				if (this.allReplacements[this.viewModel.currentIndex].Replacements.length === 1)
					this.showDetail(this.allReplacements[this.viewModel.currentIndex].Replacements[0]);
			}else {
			    CommunicatorService.send('checkUpsell.done');
			}	
			
		},
		
		checkUpsell : function(replacements){
			if (replacements.length) {
				this.allReplacements = replacements;
				this.nextUpsell();
				this.openModal(replacements);
			}else {
			    CommunicatorService.send('checkUpsell.done');
			}
		},
		
		resume : function(event){
			if (event){
				event.formattedDate = event.dateTime.split('T')[0];
				this.eventTarget.event = event;
				if(this.eventTarget.isPackageItem){
					this.expandPackage(this.viewModel.itemSelected);
				}	
			}

			this.state.showModal = true;
		},
		
		showMore : function(){
			++this.scrollIndex;
			
			if (this.scrollIndex > (this.viewModel.replacement.Replacements.length-3)){
				this.scrollIndex = 0;
			}
			var scroll = $(this.element).find('[data-scroll]');
			var item = $($(this.element).find('[data-item]')[this.scrollIndex]);
			
			scroll.scrollTop(item.position().top);
		},
		
		showDetail : function(item){
			this.viewModel.errorMessage = "";
			this.viewModel.itemSelected = item;
		},
		
		back : function(){
			this.viewModel.itemSelected = undefined;
		},
		
		next : function(){
			this.viewModel.errorMessage = "";

			var nextIndex = this.getItemSelectedIndex() + 1;
			
			if (nextIndex > this.viewModel.replacement.Replacements.length-1)
				nextIndex = 0;
				
			this.viewModel.itemSelected = this.viewModel.replacement.Replacements[nextIndex];
		},
		
		previous : function(){
			this.viewModel.errorMessage = "";

			var nextIndex = this.getItemSelectedIndex() - 1;

			if (nextIndex < 0)
				nextIndex = this.viewModel.replacement.Replacements.length-1;
				
			this.viewModel.itemSelected = this.viewModel.replacement.Replacements[nextIndex];
		},
		
		getItemSelectedIndex : function(){
			var selectedIndex = -1;
			
			for (var i = 0; i < this.viewModel.replacement.Replacements.length; i++){
				if (this.viewModel.replacement.Replacements[i] === this.viewModel.itemSelected){
					selectedIndex = i;
					break;
				}
			}
			
			return selectedIndex;
		}
		
	}]);
	
	return UpsellModalController;
}]);

GTS.upsellModal.factory('upsellModalService', [
	'apiService','classify','$q', 'SmallCartService', 'webSettingsService', function(
		api, classify, $q, smallCartService, webSettingsService){
	
	var UpsellService = classify({
		
		cartSnapshot : {}, 
		
		_constructor : function(){
			smallCartService.getCart().then(angular.bind(this, function(response){
				
				angular.forEach(response.data.Items, function(item){
					this.cartSnapshot[item.Id] = item.Quantity;
				}, this);
			}));
			
		},
		
		prevOrderLines : {},
		
		getUpsell : function(){
			var request = $q.defer();
			
			this.loadCart().then(angular.bind(this, function(response){
				var orderLines = this.processCart(response.data);
				api.getUpsellReplacements(orderLines).then(function(response){
					request.resolve(response.data.Replacements);
				});
			}));
			
			return request.promise;
		},
		
		loadCart : function(){
			return api.getCart();
		},
		
		processCart : function(cart){
			
			var orderLines = [];
			
			angular.forEach(cart.Items, function(item){
				
				if (!this.cartSnapshot[item.Id]){
					orderLines.push(item.Id);
				}else{
					if (this.cartSnapshot[item.Id] !== item.Quantity){
						orderLines.push(item.Id);
					}
				}

			}, this);
			
			return orderLines;
					
		},
		
		makeReplacement : function(item){
			var request = $q.defer();

		    var data = {
		        PLU: item.PLU,
		        Quantity: item.quantityInput.value
		    };

			api.makeReplacement(item.OriginalOrderLineID, data).then(function(data){
				var response = {
					success : true
				};
				request.resolve(response);
				
			}, function(data){
				var response = {
					success : false,
					errorMessage : data.data
				};
				request.resolve(response);
			});
			
			return request.promise;
		},
		
		declineReplacement : function(orderLineId){
			var request = $q.defer();
			
			api.declineReplacement(orderLineId).then(function(data){
				var response = {
					success : true	
				};
				request.resolve(response);

			}, function(){
				var response = {
					success : false	
				};
				request.resolve(response);
			});
			
			return request.promise;
		}
	});
	
	return new UpsellService();
	
}]);

GTS.upsellModal.factory('UpsellModalViewModel', ['classify', 'BaseViewModel', 'NumericFormField', function(classify, BaseViewModel, NumericFormField){
	var UpsellModalViewModel = classify(BaseViewModel,  {
		replacement : {},
		currentIndex : -1,
		errorMessage : "",
		showMore : false,
		
		createQuantityInputs : function() {
		    angular.forEach(this.replacement.Replacements, function(replacement) {
		        replacement.quantityInput = new NumericFormField({
		            minValue: 1,
		            value: replacement.Quantity,
		            maxValue: replacement.Quantity
		        });


		    });
		}
	});
	
	return UpsellModalViewModel;
}]);

GTS.upsellModal.controller('upsellModalInstance', [
	'classify', 'UpsellModalController', '$scope', '$element', function(
	 classify,   UpsellModalController,   $scope, $element){
	
	var UpsellModalInstance = classify(UpsellModalController, {
		element : $element
		
		
	});
	
	return new UpsellModalInstance($scope);
}]);

GTS.upsellUpgrade.controller('upsellUpgradeController', [
	
	'$scope','classify','BaseController','UpsellUpgradeViewModel','WebFormsService','UpsellController','upsellService','CommunicatorService','UpsellUpgradePostBackService','EventTimeModalService','DateSpecificModalService','EventTimeModalParser','DateSpecificModalParser',function(
	 $scope,  classify,  BaseController,  UpsellUpgradeViewModel,  WebFormsService,  UpsellController,  upsellService,  CommunicatorService,  UpsellUpgradePostBackService,  EventTimeModalService,  DateSpecificModalService,  EventTimeModalParser,  DateSpecificModalParser){
	
	var UpsellUpgradeController = classify(UpsellController, {
		
		registrations : ['add','selectEvent','expandPackage','noThanks'],

		_constructor : function(){
			BaseController.prototype._constructor.apply(this, arguments);
			this.viewModel = this.scope.viewModel = new UpsellUpgradeViewModel();
			
			WebFormsService.onSubmit(angular.bind(this, this.submit));
			
			EventTimeModalService.prototype.postBackService = new UpsellUpgradePostBackService(new EventTimeModalParser());
			DateSpecificModalService.prototype.postBackService = new UpsellUpgradePostBackService(new DateSpecificModalParser());
		},
		
		noThanks : function(){
			setTimeout(angular.bind(this, function(){
				this.noThanksClicked = true;
				angular.forEach(this.viewModel.options, function(option){					
					option.targetPlu = option.noThanksRadioEl;
					angular.forEach(option.addOns, function(addOn){
						addOn.quantity.hasVal(false);
					}, this);
				}, this);
				
				this.scope.$apply();
				$('button[type="submit"]').trigger('click');
			}), 0);
		},
		
		submit : function(){
			
			if(this.noThanksClicked){
				this.scope.$apply();
				return true;
			}
			if(this.viewModel.validate()){
				angular.forEach(this.viewModel.options, function(option){
					angular.forEach(option.addOns, function(addOn){
						addOn.quantityEl.value = addOn.quantity.value;
						if(addOn.checkbox.value){
							option.targetPlu.value = addOn.pluEl.value;
						}
					}, this);
				}, this);
				this.scope.$apply();
				
				return true;
			}else{
				this.scope.$apply();
				return false;
			}
		},
		
		selectEvent : function(option, item){
			item.RadioButtonGroup = item.pluEl.value;
			
			if(item.isDateSpecificEl.value === "False"){
				CommunicatorService.send('eventTimeModal.start', item);
			}else{
				CommunicatorService.send('dateSpecificModal.get', item);
			}
		}
		
	});
	
	return new UpsellUpgradeController($scope);
	
}]);

GTS.upsellUpgrade.factory('UpsellUpgradeViewModel', [
	
	'classify','AddOnViewModel','PageDataDomData','$injector','$sce','UpsellNumberField','DomDataParser',function(
	 classify,  AddOnViewModel,  pageDataDomData,  $injector,  $sce,  UpsellNumberField,  DomDataParser){
		
		var UpsellUpgradeViewModel = classify(AddOnViewModel, {
			
			_constructor : function(){
				this.parse($injector.get('upgradesDomData'));
			},
			
			parse : function(data){
				this.options = data.upsellOption;
				this.continue = data.continueEl;
				
				angular.forEach(this.options, function(option){
					
					if(option.header) option.header = $sce.trustAsHtml(option.header);
					option.targetPlu = option.noThanksRadioEl;
					
					angular.forEach(option.addOns, function(addOn){
						var val = parseFloat(addOn.quantityEl.text);
						addOn.quantity = new UpsellNumberField();
						addOn.quantity.maxValue = val;
						addOn.quantity.value = val;
						addOn.quantity.hasVal = angular.bind(this, this.hasVal, addOn);
						this.processCheckbox(addOn);	
					}, this);
				}, this);
			},
			
			processNoThanks : function(option){
				if(option.noThanksRadio){
					var input = $(option.noThanksRadio);
				    option.noThanksEl = {
				        name: input.attr('name'),
				        value: input.val()
				    };
				}
			},
			
			processCheckbox : function(addOn){	
				if(addOn.checkbox){
					var input = $(addOn.checkbox);
				    addOn.checkbox = {
				        name: input.attr('name'),
				        value: input.val()
				    };
				}
			}
			
		});
		
		return UpsellUpgradeViewModel;
	}
]);


GTS.upsellUpgrade.factory('UpsellUpgradePostBackService', [
	
	'classify','ViewItemsPostBackService','WebFormsService','$q','EventTimeModalParser',function(
	 classify,  ViewItemsPostBackService,  WebFormsService,  $q,  EventTimeModalParser){
	
		var UpsellUpgradePostBackService = classify(ViewItemsPostBackService, {
			
			getData : function(item){
				angular.extend(this.persist, {RadioButtonGroup : item.RadioButtonGroup});
				return ViewItemsPostBackService.prototype.getData.apply(this, arguments);
			}
			
			
		});
		
		return UpsellUpgradePostBackService;
	}
]);



GTS.upsell.factory('UpsellController', [
	
	'$timeout','PackageControl','upsellService','classify','BaseController','AddOnViewModel','WebFormsService','CommunicatorService','DomDataParser',function(
	 $timeout,  PackageControl,  upsellService,  classify,  BaseController,  AddOnViewModel,  WebFormsService,  CommunicatorService,  DomDataParser){
	
	var UpsellController = classify(BaseController, [PackageControl, {
		
		registrations : ['add','selectEvent','expandPackage','noThanks'],
		state : {
			loading : false
		},
		listeners : {
			'dateSpecificModal.done' : 'update',
			'eventTimeModal.set': 'update'
		},

		_constructor : function(){
			
			BaseController.prototype._constructor.apply(this, arguments);
			this.viewModel = this.scope.viewModel = new AddOnViewModel();
			
			WebFormsService.onSubmit(angular.bind(this, this.submit));
		},
		
		add : function(item){
			this.state.loading = true;
		},
		
		submit : function(){
			if(this.viewModel.validate()){
				this.scope.$apply();
				return true;
			}else{
				this.scope.$apply();
				return false;
			}
		},
		
		noThanks : function(){
			angular.forEach(this.viewModel.options, function(option){
				angular.forEach(option.addOns, function(addOn){
					addOn.quantity.hasVal(false);
				}, this);
			}, this);
			setTimeout(angular.bind(this, function(){
				this.scope.$apply();	
				$('button[type="submit"]').trigger('click');
			}, 0));
		},
		
		update : function(html) {

		    var ddp = new DomDataParser(html.data);
		    html = ddp.getData();
			
		    var options = [];

			//  Refresh the page to force the view state to get updated.
			window.location = window.location;
		},
		
		selectEvent : function(option, item){
		
			if(item.isDateSpecificEl.value === "False"){
				CommunicatorService.send('eventTimeModal.start', item);
			}else{
				CommunicatorService.send('dateSpecificModal.get', item);
			}
		}	
	}]);
	
	return UpsellController;
	
}]);

GTS.upsell.controller('upsellControllerInstance', [
	
	'$scope','classify','UpsellController',function(
	 $scope,  classify,  UpsellController){
	
	var UpsellControllerInstance = classify(UpsellController, {});
	
	return new UpsellControllerInstance($scope);
	
}]);

GTS.upsell.factory('upsellService', [
	
	'classify', 'CalendarModal_PostBack','WebFormsService',function(classify, CalendarModal_PostBack, WebFormsService){
		
		var changes = {};
		
		var UpsellService = classify({
			
			_constructor : function(){
				CalendarModal_PostBack.updateASPPreEvents = angular.bind(CalendarModal_PostBack, this.updateASPPreEvents);
				CalendarModal_PostBack.selectTime = angular.bind(CalendarModal_PostBack, this.selectTime);	
			},
			
			addChanges : function(_changes){
				changes = _changes;
			},
			
			updateASPPreEvents : function(item){
			
				WebFormsService.clean();
				var change = {
					'ctl00$ContentPlaceHolder$ScriptManager1':'ctl00$ContentPlaceHolder$UpdatePanel|'+item.selectDateTimeButtonEl.name,
					'__ASYNCPOST': true
				};
				change[item.selectDateTimeButtonEl.name+'.x'] = 0;
				change[item.selectDateTimeButtonEl.name+'.y'] = 0;
				
				angular.extend(change, changes);
				
				if(item.salesChannelDetailIdHiddenEl){
					change[item.salesChannelDetailIdHiddenEl.name] = item.salesChannelDetailIdHiddenEl.value;
				}
				
				WebFormsService.setModel(change);
			},
			
			selectTime : function(data){

				var request = $.Deferred();
	
				data.__ASYNCPOST = true;
				
				angular.extend(data, changes);
				
				WebFormsService.setModel(data);
	
				this.request(angular.bind(this, function(html){
					request.resolve(html);
				}));
	
				return request;
			}
			
		});
		
		return new UpsellService();
	}
]);

GTS.upsell.factory('AddOnViewModel', [
	
	'classify','BaseViewModel','PageDataDomData','$sce','NumericFormField','DomDataParser','UpsellNumberField','$injector',function(
	 classify,  BaseViewModel,  pageDataDomData,  $sce,  NumericFormField,  DomDataParser,  UpsellNumberField,  $injector){
	
		var UpsellViewModel = classify(BaseViewModel, {
			
			_constructor : function(){
				var addOnsDomData = $injector.get('addOnsDomData');
				this.parse(addOnsDomData);
			},
			
			parse : function(data){
				this.options = data.upsellOption;
				this.continue = data.continueEl;
				angular.forEach(this.options, function(option){
					if(option.header && !option.header.$$unwrapTrustedValue) option.header = $sce.trustAsHtml(option.header);
					angular.forEach(option.addOns, function(addOn){
						var val = parseFloat(addOn.quantityEl.text);
						addOn.quantity = new UpsellNumberField();
						addOn.quantity.value = val;
						addOn.quantity.hasVal = angular.bind(this, this.hasVal, addOn);
						addOn.quantity.hasVal(addOn, true);
						this.processCheckbox(addOn);
					}, this);
				}, this);	
			},
			
			hasVal : function(addOn, b){
				addOn.checkbox.value = b ? 'on' : '';
				addOn.quantityEl.value = 1;
			},
			
			options : [],
			
			update : function(addOnsDomData){
				var options = [];
				angular.forEach(this.options, function(o){
					options.push(o);					
				});
				this.parse(addOnsDomData);
				angular.forEach(this.options, function(o, i){				
					o.orderLineEl = options[i].orderLineEl;
					angular.forEach(o.addOns, function(addOn, j){
						addOn.scdidEl = options[i].addOns[j].scdidEl;
						addOn.pluEl = options[i].addOns[j].pluEl;
					});
				});	
			},
			
			validate : function(){
				var errors = false;
				angular.forEach(this.options, function(o){
					angular.forEach(o.addOns, function(addOn){
						if(addOn.quantity.value){
							if(addOn.isPackage){
								angular.forEach(addOn.packageItems, function(item){
									if(item.isEvent && (new Date(item.eventDateTime) == 'Invalid Date')){
										addOn.packageError = true;
										errors = true;
									}
								});
							}
						}						
					});
				});
				return !errors;
			},
			
			processCheckbox : function(addOn){
				if(addOn.checkbox){
					var input = $(addOn.checkbox).find('input');
				    addOn.checkbox = {
				        name: input.attr('name'),
				        value: input.val()
				    };
				}
			}
			
		});
		
		return UpsellViewModel;
	}
]);

GTS.upsell.factory('UpsellNumberField', ['classify','NumericFormField', function(classify, NumericFormField){
	
	var UpsellNumber = classify(NumericFormField, {
		
		increment : function(){
			NumericFormField.prototype.increment.apply(this);
			if(this.value > 0){
				this.hasVal(true);
			}
		},
		
		decrement : function() {
			NumericFormField.prototype.decrement.apply(this);
			if(this.value === 0){
				this.hasVal(false);
			}
		}
	});
	
	return UpsellNumber;
	
}]);




GTS.verifyLimits.factory('VerifyLimitsController', ['classify','BaseResponderController', 'VerifyLimitsViewModel','WebFormsService',function(classify, BaseResponderController, VerifyLimitsViewModel, WebFormsService){
	
	var VerifyLimitsController = classify(BaseResponderController, {
		
		
		_constructor : function(){
			BaseResponderController.prototype._constructor.apply(this, arguments);
			this.viewModel = this.scope.viewModel = new VerifyLimitsViewModel();	
			WebFormsService.onSubmit(angular.bind(this, this.submit));
		},
		
		registrations: ['selectDay', 'nextMonth', 'prevMonth', 'changeMonth', 'changeYear'],

		selectDay: function (day) {
			if ((day.available || day.selected) && day.target) {
				__doPostBack(this.viewModel.calendar.calendarSelector, day.target);
			}
		},

		prevMonth: function() {
			__doPostBack(this.viewModel.calendar.prev.name, '');
		},

		nextMonth: function() {
			__doPostBack(this.viewModel.calendar.next.name, '');
		},

		changeMonth: function() {
			__doPostBack(this.viewModel.calendar.monthSelect.name, '');
		},

		changeYear: function () {
			__doPostBack(this.viewModel.calendar.yearSelect.name, '');
		},
		
		submit : function(){
			if(this.viewModel.validate()){
				return true;
			}else{
				setTimeout(angular.bind(this, function(){
					this.scope.$apply();
				}), 0);
				
				return false;
			}
		}

	});
	
	return VerifyLimitsController;
	
}]);


GTS.verifyLimits.controller('verifyLimitsInstance', ['classify','VerifyLimitsController', '$scope',function(classify, VerifyLimitsController, $scope){
	
	var VerifyLimitsInstance = classify(VerifyLimitsController, {
		
	
	});
	
	return new VerifyLimitsInstance($scope);
	
}]);

GTS.verifyLimits.factory('VerifyLimitsViewModel', [
	
	'classify','BaseForm', 'GroupSalesLimitsDomData','PageDataDomData','VerifyLimitsCalendarParser','$sce', 'NumericFormField', 'TextFormField',function(
	 classify,  BaseForm, GroupSalesLimitsDomData, PageDataDomData, VerifyLimitsCalendarParser, $sce, NumericFormField, TextFormField){
	
	var VerifyLimitsViewModel = classify(BaseForm, {
		
		_constructor : function(){	
			this.parser = new VerifyLimitsCalendarParser();
			this.calendar = this.getCalendar();
			this.timeSelector = $sce.trustAsHtml(GroupSalesLimitsDomData.timeSelector);	
			this.expectedGuests = new NumericFormField(GroupSalesLimitsDomData.expectedGuestsEl);
			GroupSalesLimitsDomData.groupDescEl.required = false;
			this.groupDesc = new TextFormField(GroupSalesLimitsDomData.groupDescEl);
			this.continue = GroupSalesLimitsDomData.continueButtonEl;
		
			if (GroupSalesLimitsDomData.expectedGuestsError){
				this.expectedGuests.required = true;
			}
			
			if(PageDataDomData.errorMessage){
				this.globalError = PageDataDomData.errorMessage;
			}
		},
		
		getCalendar : function(){
			var html = $("<div>" + GroupSalesLimitsDomData.calendarHtml + "</div>");
			return this.parser.parse(html);
		}
		
	});
	
	return VerifyLimitsViewModel;
	
}]);

GTS.verifyLimits.factory('VerifyLimitsCalendarParser', ['classify', 'DateSpecificModalParser', function(classify, DateSpecificModalParser){
	
	var VerifyLimitsCalendarParser = classify(DateSpecificModalParser, {
		selector : '',
		
		// grab the days from the html
		getDays : function(modalHTML, CalendarModel){

			var days = modalHTML.find('.Calendar').find('td'),
				targetDays = [],
				dayHeaders = modalHTML.find('.Calendar').find('th'),
				targetDayHeaders = [];
			angular.forEach(dayHeaders, function(dayHeader) {
				targetDayHeaders.push(dayHeader.innerText);
			});
			angular.forEach(days, function(day, ind){
				day = $(day);
				ind = {};
				ind.date = day.text();
				var link = day.find('a').attr('href');
				
				if(link){
					ind.target = link.split(',')[1].split('\'')[1];
					if(day.attr('style').indexOf('background') > -1){
						ind.selected = true;
					}else{
						ind.available = true;
					}
				}
				
				targetDays.push(ind);
			});
			CalendarModel.days = targetDays;
			CalendarModel.dayHeaders = targetDayHeaders;
		},
		
	});
	
	return VerifyLimitsCalendarParser;
	
}]);

GTS.viewEvents.controller('ViewEventsController', [
	'$scope', 'BaseController', 'classify', 'CommunicatorService', 'pageStateService', 'baseViewModel', 'PageDataDomData', 'viewEventsCalendarDomData', 'CalendarModal_Parser', 'CalendarModal_PostBack', '$sce', function (
	 $scope,   BaseController,   classify,   CommunicatorService,   pageStateService,   baseViewModel,   PageDataDomData,   viewEventsCalendarDomData,   CalendarModal_Parser,   CalendarModal_PostBack,   $sce) {

		var ViewEventsController = classify(BaseController, {

			viewModel: angular.extend(baseViewModel, { }),

			state: { },
			
			registrations: ['selectDay', 'nextMonth', 'prevMonth', 'changeMonth', 'changeYear'],
			
			_constructor: function () {
				BaseController.prototype._constructor.apply(this, arguments);

				this.viewModel.header = $sce.trustAsHtml(PageDataDomData.pageTitle);

				this.viewModel.calendar = CalendarModal_Parser.parseCalendar("<div>" + viewEventsCalendarDomData.calendarHtml + "</div>");

			},

			selectDay: function (day) {
				if ((day.available || day.selected) && day.target) {
					__doPostBack(this.viewModel.calendar.calendarSelector, day.target);
				}
			},

			prevMonth: function() {
				__doPostBack(this.viewModel.calendar.prev.name, '');
			},

			nextMonth: function() {
				__doPostBack(this.viewModel.calendar.next.name, '');
			},

			changeMonth: function() {
				__doPostBack(this.viewModel.calendar.monthSelect.name, '');
			},

			changeYear: function () {
				__doPostBack(this.viewModel.calendar.yearSelect.name, '');
			}
		});

		return new ViewEventsController($scope);

	}]);

GTS.viewItems.factory('ViewItemsAddOneViewModel', [
	
	'classify','BaseViewModel',function(
	 classify,  BaseViewModel) {
	
	var ViewModel = classify(BaseViewModel, {
		
	    /*
            Please add cg/c pairs for the pages that you want to use the add single item button to.
            Here is an example of the sytax.
            
                addOneCategories: [{ cg: "11", c: "113" }, { cg: "11", c: "111" }]


        */
	    addOneCategories: []
		
	});
	
	return ViewModel;

}]);

GTS.viewItems.controller('ViewItemsController', [

	'SmallCartService','CommunicatorService','pageStateService','$scope','$sce','classify','WebFormsService','BaseController','quantityControlController','EditablePriceControl','PackageControl','ViewItemsService','ViewItemsViewModel', function(
	 SmallCartService,  CommunicatorService,  pageStateService,  $scope,  $sce,  classify,  WebFormsService,  BaseController,  quantityControlController,  EditablePriceControl,  PackageControl,  ViewItemsService,  ViewItemsViewModel){

	var ViewItemsController = classify(BaseController, [quantityControlController, EditablePriceControl, PackageControl, {
		
	    viewModel: new ViewItemsViewModel(),

		state: {
			loading : false,
		},
		listeners : {
			'dateSpecificModal.done':'updateSelected',
			'eventTimeModal.set' : 'updateSelected',
			'dateSpecificModal.clearDone' : 'updateSelected',
			'dateSelected': 'updateDates',
			'timeSelected' : 'updateSelected',
			'paymentPlanSelected' : 'updateDisplay',
			'multiTimeSelectorModal.set':'updateSelected',
			'egalaxyError':'error'
		},
		registrations: ['addToCart', 'getMoreInformation', 'expand', 'inc', 'selectEvent', 'onKeydown', 'expandPackage', 'testtest', 'clearEvent', 'addOneToCart'],
		
		_constructor: function () {
		    BaseController.prototype._constructor.apply(this, arguments);
			this.scope.root = this.viewModel.root;
		},

		updateSelected : function(response){
			if(response.success){
				this.viewModel.updateSubCategories(response.data, true);
				this.state.loading = false;
			}else{
				this.viewModel.connectionError = true;
			}
		},

		expand : function(cat){
			cat.isExpanded = !cat.isExpanded;
			this.clearErrors(true);
		},
		
		error : function(){
			this.viewModel.connectionError = true;
		},

		selectEvent : function(cat, item, catIndex) {
			if(cat.sharedCalendars && cat.sharedCalendars.length){
				var sharedQuantities = [];
				angular.forEach(cat.items, function(item){
					if(item.requiresDateEl && item.requiresDateEl.value === "True" && item.quantityInputEl && item.quantityInputEl.value){
						sharedQuantities.push(item.quantityInputEl);
					}
				}, this);
				item.sharedQuantities = sharedQuantities;
			}
			this.clearErrors();

			if (cat && cat.parentSCDAutoSelectEvents) {
				item.parentSCDAutoSelectEvents = cat.parentSCDAutoSelectEvents;
			}


			if(item.isDateSpecificEl && item.isDateSpecificEl.value === "True"){
				CommunicatorService.send('dateSpecificModal.get', item);
			}else{
				CommunicatorService.send('eventTimeModal.start', item);		
			}
		},
		
		clearEvent : function(subCategory, item, index){
			this.state.loading = true;
			CommunicatorService.send('dateSpecificModal.clear', item);
		},
		
		updateDates : function(){},

		addToCart : function(subCategory, $index){
			var valid = ViewItemsService.validate(subCategory);
			if(valid){
				
				this.state.loading = true;
				
				ViewItemsService.addToCart(this.viewModel).then(angular.bind(this, function(html){
					if(!html){
						this.scope.$apply();
						this.postAddToCart(subCategory);
					}else{
						var newData = this.viewModel.updateSubCategories(html);
						if(newData){
							this.state.loading = false;
							var subCat = this.viewModel.subCategories[$index];
							subCat.isExpanded = true;
							setTimeout(angular.bind(this, function(){
								this.scope.$apply();	
							}), 0);
						}else{
							this.scope.$apply();
							this.postAddToCart(subCategory);
						}	
					}
				}));
				
			}else{
				this.state.loading = false;
				setTimeout(angular.bind(this, function(){
					this.scope.$apply();	
				}), 0);
			}
			return false;
		},
		
		postAddToCart : function(subCategory){
			
			var state = this.state, 
				passKind = null;
			
			angular.forEach(subCategory.items, function(item){
				if(item.quantityInputEl && item.quantityInputEl.value >= 1){
					if(item.IsJointMembershipEl.value === "True"){
						passKind = item.PassKindIdEl.value;
					}
				}
			}, this);

			if (ViewItemsService.isUpsellEnabled()){
				CommunicatorService.send('checkUpsell', {});
				CommunicatorService.receive('checkUpsell.done', function(){
					if (passKind){
						ViewItemsService.loadAddOnData(passKind).then(function (response) {
							if (response.passKind && response.passKind.MaxAddons !== 0 && response.addOns.length) {
								state.loading = false;
								CommunicatorService.send('openAddOnModal', response);
							} else {
								pageStateService.go('cart');
							}
						});
					}else{
						pageStateService.go('cart');
					}							
				});
			}else {

				if (passKind){
					ViewItemsService.loadAddOnData(passKind).then(function(response){
						if (response.passKind && response.passKind.MaxAddons !== 0 && response.addOns.length) {
							state.loading = false;
							CommunicatorService.send('openAddOnModal', response);
						} else {
							pageStateService.go('cart');
						}
					});
				}else{
					pageStateService.go('cart');
				}
			}
		},

		clearErrors : function(clearQuantity){
			delete this.viewModel.connectionError;
			angular.forEach(this.viewModel.subCategories, function(cat){
				cat.quantityError = null;
				angular.forEach(cat.items, function(item){
					item.dateError = null;
					if(clearQuantity && item.quantityInput){
						item.quantityInputEl.value = 0;
					}
				});
			});
		},

        clearQuantities : function() {
            angular.forEach(this.viewModel.subCategories, function (cat) {
                angular.forEach(cat.items, function (item) {
                    if (item.quantityInputEl) {
                        item.quantityInputEl.value = 0;
                    }
                });
            });
        },

		updateDisplay : function(response){
			setTimeout(angular.bind(this, function(){
				var data = response.data;
				ViewItemsService.setPaymentPlan(response.selected);
				angular.forEach(this.viewModel.subCategories, function(cat, index){
				    angular.forEach(cat.items, function (item, ii) {
						if(item.quantityInputEl){
							item.quantityInputEl.value = 0;
							item.quantityInputEl.disabled = data.subCategory[index].items[ii].quantityInputEl.disabled;	
						}
				        angular.forEach(item.pluItemPaymentPlans, function(itemPaymentPlan, index2) {
				            itemPaymentPlan.pluItemPaymentPlanEl.class = data.subCategory[index].items[ii].pluItemPaymentPlans[index2].pluItemPaymentPlanEl.class;
				        });
				    });
				});
				this.scope.$apply();
				
			}), 0);
		},
		
		updateDisplayMulti : function(){			
			this.updateDisplay.apply(this, arguments);
		},
		
		getMoreInformation : function(link){
			CommunicatorService.send('infoOpen', link);
		},

		addOneToCart: function (item, subCategory) {
		    this.clearQuantities();

		    item.quantityInputEl.value = 1;
		    var index = -1;
		    angular.forEach(this.viewModel.subCategories, function(subCategoryIter, ix) {
                if (subCategory === subCategoryIter) {
                    index = ix;
                }
		    });
		    this.addToCart(subCategory, index);
		    return false;
		}

	}]);

	return new ViewItemsController($scope);

}]);

GTS.viewItems.factory('ViewItemsPostBackService', ['classify', 'WebFormsService','BasePostBack','CalendarModal_Parser','$q','DomDataParser',function(classify, WebFormsService, BasePostBack,CalendarModal_Parser,$q,DomDataParser){
		
	var ViewItemsPostBackService = classify(BasePostBack, {
		
		_constructor : function(parser){		
			this.parser = parser;
		},
		
		persist : {},
		
		getData : function(item){
			var request = $q.defer();
			
			WebFormsService.clean();
			var data = {
				'ctl00$ContentPlaceHolder$ScriptManager':'ctl00$ContentPlaceHolder$UpdatePanel|'+item.selectDateTimeButtonEl.name,
				'__ASYNCPOST': true,
				//'ctl00$ContentPlaceHolder$EventsDateTimeSelectorModal$EventsDateTimeSelector$CalendarSelector$MonthDropDownList': 11,
				//'ctl00$ContentPlaceHolder$EventsDateTimeSelectorModal$EventsDateTimeSelector$CalendarSelector$YearDropDownList': 2016,
				//'ctl00$ContentPlaceHolder$AssociatedEventTicketsRepeater$ctl01$SelectDateTimeButton': 'Select Date/Time'
			};
			data[item.selectDateTimeButtonEl.name+'.x'] = 0;
			data[item.selectDateTimeButtonEl.name + '.y'] = 0;
			data[item.selectDateTimeButtonEl.name] = item.selectDateTimeButtonEl.value;
						
			if(item.quantityInputEl){
				data[item.quantityInputEl.name] = item.quantityInputEl.value;
			}
						
			if(item.quantityInputEl){
				data[item.quantityInputEl.name] = item.quantityInputEl.value;
			}
			
			if(item.sharedQuantities && item.sharedQuantities.length){
				angular.forEach(item.sharedQuantities, function(_q){
					data[_q.name] = _q.value;
				});
			}
			
			angular.extend(data, this.persist);
			WebFormsService.setModel(data);
			
			this.request().then(angular.bind(this, function(response){
				var data = {};
				if(response.success){
					data = this.parser.parse(response.data, this.selector);
				}else{
					data = response;
				}
				request.resolve(data);
			}));			
			return request.promise;
		},
		
		clearEvent : function(item){
			
			WebFormsService.clean();
			var data = {
				'ctl00$ContentPlaceHolder$ScriptManager1':'ctl00$ContentPlaceHolder$UpdatePanel|'+item.clearDateTimeButtonEl.name,
				'__ASYNCPOST': true
			};
			data[item.clearDateTimeButtonEl.name+'.x'] = 0;
			data[item.clearDateTimeButtonEl.name+'.y'] = 0;
			
			angular.extend(data, this.persist);
			WebFormsService.setModel(data);
			
			return this.request(true);
		},
		
		selectDay : function(day, selector){
			var data = {
				'__EVENTARGUMENT':day.target,
				'__ASYNCPOST':true,
				'__EVENTTARGET' : selector
			};
			angular.extend(data, this.persist);
			WebFormsService.setModel(data);	
			return this.request();
		},
		
		selectEvent : function(event){
			
			var data = {
				'__ASYNCPOST':true
			};
			data[event.selectButton.name] = event.selectButton.value;
			
			angular.extend(data, this.persist);
			WebFormsService.setModel(data);
		
			return this.request();
		},
		
		nextMonth : function(next){
			var request = $q.defer();
			var currentModel = WebFormsService.getModel(),
				data = {
					'__ASYNCPOST':true
				};
			data[next.name+'.x'] = 0;
			data[next.name+'.y'] = 0;
			angular.extend(data, this.persist);
			
			console.log(this.persist);
			WebFormsService.setModel(data);
			this.request().then(angular.bind(this, function(response){
				if(response.success){
					var data = this.parser.parse(response.data);
					request.resolve(data);
				}else{
					request.resolve(response);
				}
			}));
			return request.promise;
		},

		prevMonth : function(prev){

			var request = $q.defer(),
				currentModel = WebFormsService.getModel(),
				data = {
					'__ASYNCPOST':true
				};

			data[prev.name+'.x'] = 0;
			data[prev.name+'.y'] = 0;

			angular.extend(data, this.persist);
			WebFormsService.setModel(data);
	
			this.request().then(angular.bind(this, function(response){
				if(response.success){
					var data = this.parser.parse(response.data);
					request.resolve(data);
				}else{
					request.resolve(response);
				}
			}));
			return request.promise;
		},
		
		changeMonth : function(my){

			var request = $q.defer(),
				currentModel = WebFormsService.getModel(),
				target = {
					'__ASYNCPOST':true,
					'__EVENTTARGET' : my.monthSelect
				};

			target[my.monthSelect] = my.month;
			target[my.yearSelect] = my.year;

			angular.extend(target, this.persist);
			WebFormsService.setModel(target);

			this.request().then(angular.bind(this, function(response){
				if(response.success){
					var data = this.parser.parse(response.data);
					request.resolve(data);
				}else{
					request.resolve(response);
				}
			}));
			return request.promise;
		},
		
		changeYear : function(my){

			var request = $q.defer();
				data = {
					'__ASYNCPOST':true,
					'__EVENTTARGET' : my.yearSelect
				};

			data[my.monthSelect] = my.month;
			data[my.yearSelect] = my.year;

			angular.extend(data, this.persist);
			WebFormsService.setModel(data);
			
			this.request().then(angular.bind(this, function(response){
				if(response.success){
					var data = this.parser.parse(response.data);
					request.resolve(data);
				}else{
					request.resolve(response);
				}
			}));

			return request.promise;
		},
		
		selectMultiTime : function(qtys, buttonSelector){
			
			var data = {
				'ctl00$ContentPlaceHolder$ScriptManager1':'ctl00$ContentPlaceHolder$UpdatePanel|'+buttonSelector.name,
				'__ASYNCPOST':true,
			};
			
			angular.forEach(qtys, function(qty){
				data[qty.name] = qty.value;
			});
			
			data[buttonSelector.name] = buttonSelector.text;
			
			WebFormsService.setModel(data);
			
			return this.request();
		},
		
		parseItems : function(html){
			var ddp = new DomDataParser(html);
			return ddp.getData();
		},
		
		parseCalendar : function(html){
			return this.parser.parse(html);
		},
		
	});
	
	return ViewItemsPostBackService;
	
}]);

GTS.viewItems.service('ViewItemsService', [

	'apiService','$q','WebFormsService','pageStateService','classify','$http','$sce','CommunicatorService','loyaltyService','ViewItemsDomData', 'DomDataParser','ViewItemsErrorDomData','webSettingsService','loading',function(
	 api,         $q,  WebFormsService,  pageStateService,  classify,  $http,  $sce,  CommunicatorService,  loyaltyService,  ViewItemsDomData,   DomDataParser, ViewItemsError, webSettingsService, loading){

	function isValidDate(d) {
	  if ( Object.prototype.toString.call(d) !== "[object Date]" )
	    return false;
	  return !isNaN(d.getTime());
	}

	var subCategories,
		buttons = {},
		defaultButtonText = '',
		selected = {};

	var ViewItemsService = classify({
		
		_constructor : function(){
			webSettingsService.getSettings().then(angular.bind(this, function(settings){
				this.settings = settings;
			}));
		},


		findButtons: function(item){	
			if(!buttons[item.selectedDateEl.text]) buttons[item.selectedDateEl.text] = 0;
			buttons[item.selectedDateEl.text]++;
		},

		setDefaultButtonText : function(){
			var total = 0;
			angular.forEach(buttons, function(button, key){
				if(button > total){
					total = button;
					defaultButtonText = key;
				}
			});
		},

		getDefaultButton : function(){
			return defaultButtonText;
		},

		getSubCategories : function(){
			return subCategories;
		},

		getErrors : function(){
			return ViewItemsError;
		},

		selectEvent : function(cat, item){
			selected.category = cat;
			selected.item = item;
			CommunicatorService.send('openModal', item);
		},

		updateSubCategory : function(html){
			
			if(typeof html !== 'string'){
				return html;	
			}

			var dpp = new DomDataParser(html),
				data = dpp.getData();

			angular.forEach(data.subCategory, function(cat, i){
				if(cat.parentSCDName === selected.category.parentSCDName){
					angular.forEach(cat.items, function(item, index){
						selected.category.items[index].selectedDateEl = item.selectedDateEl;
						subCategories[i].sharedCalendars = cat.sharedCalendars;
						if(item.isPackage){
							subCategories[i].items[index].packageItems = item.packageItems;
						}
					});
				}
			});
		},

		validate : function(subCategory){
			
			var q = 0,
				error = false;
				
			delete subCategory.quantityError;
			
			angular.forEach(subCategory.items, function(item){
				if(item.isMultiTime){
					angular.forEach(item.selectedTimes, function(time){
						q += parseFloat(time.quantityEl.value);
					});
				}else{
					q += parseFloat(item.quantityInputEl.value);
				}
			});
			
			if(q === 0){
				error = true;
				subCategory.quantityError = true;
			}
			
			return !error;
		},
		isLoyaltyEnabled : function(){
			return loyaltyService.isEnabled().toString().toLowerCase() === true.toString();
		},
		
		isLoyaltyLoggedIn : function(){
			return loyaltyService.isLoggedIn();
		},
		
		addToCart : function(viewModel){
			
			var request = $q.defer(),
				target = {
					__ASYNCPOST:true
				},
				data = [],
				paymentPlan = this.selectedPaymentPlan;

			angular.forEach(viewModel.subCategories, function(cat){
				angular.forEach(cat.items, function(item){
					
					var q = 0;
					
					if(item.isMultiTime){
						angular.forEach(item.selectedTimes, function(time){
							q += parseFloat(time.quantityEl.value);
							target[time.quantityEl.name] = time.quantityEl.value;
						});
					    /*jshint -W069 */
						target["ctl00$ContentPlaceHolder$ScriptManager1"] = 'ctl00$ContentPlaceHolder$UpdatePanel|' + cat.addToCartEl.name;
					    /*jshint +W069 */
					}else{
						target[item.quantityInputEl.name] = item.quantityInputEl.value;
						q += parseFloat(item.quantityInputEl.value);
					    /*jshint -W069 */
						target["ctl00$ContentPlaceHolder$ScriptManager1"] = cat.addToCartEl.name;
					    /*jshint +W069 */
					}

					if (item.editablePriceEl) {
						target[item.editablePriceEl.name] = item.editablePriceEl.value;
					}

					target[cat.addToCartEl.name] = cat.addToCartEl.value;
					if(paymentPlan){
						target[paymentPlan.inputName] = paymentPlan.inputVal;	
					}
				});
			});
	
			WebFormsService.clean();
			WebFormsService.setModel(target);
			
			return this.makeRequest();
		},
		
		loadAddOnData : function(passKind){
			var request = $q.defer();
			$q.all([api.getMemberAddOns(passKind), api.getPassKind(passKind)]).then(function(response){
				request.resolve({
					success : true,
					passKind : response[1].data,
					addOns : response[0].data
				});
			});
			return request.promise;
		},
		
		makeRequest : function(){
			loading.start();
			return $.ajax({
				url : '',
				type : 'POST',
				data : WebFormsService.getModel()
			}).then(function(html){
				var request = $q.defer();
				request.resolve(html);
				loading.stop();
				return html;
			});
		},
		
		setPaymentPlan : function(item){
			this.selectedPaymentPlan = item;
		},
		
		isUpsellEnabled : function(){
			return (this.settings.WebModules.UpsellEnabled);
		}
	});

	return new ViewItemsService();
}]);

GTS.viewItems.factory('ViewItemsViewModel', [
	
	'classify','BaseViewModel','ViewItemsDomData','ViewItemsService','ViewItemsErrorDomData','DomDataParser','$sce','PageDataDomData', 'ViewItemsAddOneViewModel', 'pageStateService',function(
	 classify,  BaseViewModel,  ViewItemsDomData,  ViewItemsService,  ViewItemsErrorDomData,  DomDataParser,  $sce,  PageDataDomData,   ViewItemsAddOneViewModel,   pageStateService) {
	
	var ViewModel = classify(BaseViewModel, {
	    addOneCategories: new ViewItemsAddOneViewModel(),

	    _constructor: function () {
			
	        angular.forEach(ViewItemsDomData.subCategory, function(subCat) {
				angular.forEach(subCat.items, function(item){
					if(item.quantityInputEl){
						item.plu = item.quantityInputEl.plu;
					}

					
				});
				subCat.promotions = [];
				var catId = subCat.parentSCDIDEl.value;
				angular.forEach(ViewItemsDomData.promoList, function(promoGroup) {
					angular.forEach(promoGroup.promotionOffer, function(promo) {
						var promoCatId = promo.parentSalesChannelDetailIdEl.value;
						if (catId === promoCatId) {
							subCat.promotions.push(promo);
						}
					});
				});
			});

			this.subCategories = ViewItemsDomData.subCategory;
			this.prep();

		    this.pageTitle = $sce.trustAsHtml(PageDataDomData.pageTitle);
	    },
		
		subCategories : [],
		
		isLoyaltyEnabled : ViewItemsService.isLoyaltyEnabled(),
		isLoyaltyLoggedIn : ViewItemsService.isLoyaltyLoggedIn(),
		
		updateSubCategories : function(html, skipParse){

			//console.log(html);
			
			var selected = null;
			angular.forEach(this.subCategories, function(cat, index){
				if(cat.isExpanded){
					selected = index;
				}
			});
		
			var h;
			if(skipParse){	
				h = html;
			}else{
				h = $.parseHTML(html);
			}

			var ddp = new DomDataParser(h),
				data = ddp.getData(),
				newData = true;

			this.error = data.error;
				
			if(data.subCategory){
				angular.forEach(data.subCategory, function(cat, index){
					var oldCat = this.subCategories[index],
						isExpanded = oldCat.isExpanded;

					angular.forEach(cat.items, function(item, _i){
						var oldItem = this.subCategories[index].items[_i],
							expandPackage = oldItem.expandPackage,
							quantity = oldItem.quantityInputEl ? oldItem.quantityInputEl.value : 0;
						angular.extend(oldItem, item);
						item.expandPackage = expandPackage;
						if(item.quantityInputEl){
							item.quantityInputEl.value = quantity;	
						}
						if(item.priceError){
							if(!item.errorList) item.errorList = [];
							item.errorList.push(item.priceError);
						}
					}, this);	

					angular.extend(oldCat, cat);				
					oldCat.isExpanded = isExpanded;
					
				}, this);
				
				this.prep();
			}else{
				newData = false;
			}
			
			return newData;
		},
		
		prep: function () {
		    var qs = pageStateService.getQueryString();
		    
		    var isAddOne = false;
		    angular.forEach(this.addOneCategories.addOneCategories, function(category) {
                if (category.c === qs.c && category.cg === qs.cg) {
                    isAddOne = true;
                }
		    });

		    this.isAddOne = isAddOne;
		    angular.forEach(this.subCategories, angular.bind(this, function (cat) {

				if (cat.parentSCDDescription) {
		            cat.parentSCDDescription = $sce.trustAsHtml(cat.parentSCDDescription);
				}
				if (cat.parentSCDName) {
					cat.parentSCDName = $sce.trustAsHtml(cat.parentSCDName);
				}
				
				angular.forEach(cat.items, angular.bind(this, function(item){
					
				    if (item.quantityInputEl && (!item.quantityInputEl.value || item.quantityInputEl.value <= 0)) {
						item.quantityInputEl.value = 0;	
					}
					
					if(item.pluDesc){
						item.pluDesc = $sce.trustAsHtml(item.pluDesc);
					}

					if (item.pluName) {
						item.pluName = $sce.trustAsHtml(item.pluName);
					}
					if (item.pluShortName) {
						item.pluShortName = $sce.trustAsHtml(item.pluShortName);
					}
					if (item.packageName) {
						item.packageName = $sce.trustAsHtml(item.packageName);
					}
					if (item.packageDescription) {
						item.hasPackageDescription = true;
						item.packageDescription = $sce.trustAsHtml(item.packageDescription);

						item.showDetails = false;

						//  Must show details if shared calendars turned off and a detail item is an event
						if (!(cat.sharedCalendars && cat.sharedCalendars.length)) {
							angular.forEach(item.packageItems, function(packageItem) {
								if (packageItem.isEvent) {
									item.showDetails = true;
								}
							});
						}
					} else {
						item.hasPackageDescription = false;
						item.showDetails = true;
					}

					if(item.paymentPlanDesc){
						item.paymentPlanDesc = $sce.trustAsHtml(item.paymentPlanDesc);
					}
					
					if(item.requiresIndividualDateEl && item.requiresIndividualDateEl.value === 'False' && item.selectedDateEl){
						item.assignedEvent = true;
					}					


					// expand te the category/subcategory if the user has already selected multitime events
					if(item.isMultiTime){
						angular.forEach(item.selectedTimes, function(time){
							if( time.quantityEl.value)
							{
								cat.isExpanded = true;
							}
						});					  
					}
				}));
				
			}));
			
		},
		
		findButtons: function(item){	
			if(!buttons[item.selectedDateEl.text]) buttons[item.selectedDateEl.text] = 0;
			buttons[item.selectedDateEl.text]++;
		},
		
		validate : function(){
		},
		
		hasErrors : function(subCategory){
			
			return false;
			
			//angular.for
			
		}
		
	});
	
	return ViewModel;

}]);

GTS.viewOrder.controller('viewOrderController', [
	
	'WebFormsService','ResponderService','BaseResponderController','classify','$scope','viewOrderDomData', 'pageStateService', function(
	 WebFormsService,  ResponderService,  BaseResponderController,  classify,  $scope,  viewOrderDomData,   pageStateService){
		 
	var backClicked = false;
		
	var viewModel = {
		activeTabId : 1,
		orderInfo : viewOrderDomData.orderInfo,
		emptyLabel : viewOrderDomData.emptyLabel,
		tickets : viewOrderDomData.tickets,
		selectButtonLabel : viewOrderDomData.selectAllButtonEl.value,
		viewTicketsButton: viewOrderDomData.viewTicketsButton,
		header : (viewOrderDomData.header && viewOrderDomData.header.length) ? viewOrderDomData.header[0] : null,
		externalId : {
			label : viewOrderDomData.externalIdLabel,
			id : viewOrderDomData.externalId
		},
		printButton : viewOrderDomData.printButtonEl,
		backButtonEl : viewOrderDomData.backButtonEl,
		noSelectionsError : viewOrderDomData.noSelectionsError
	};
	
	var selected = false;
	
	var device = {
		a : true,
		b : false,
		c : false
	};
	
	var ViewOrderController = classify(BaseResponderController, {
			
		viewModel : viewModel,
		registrations : ['selectAll', 'print', 'back', 'selectTicket', 'viewTickets'],
		
		postConstruct : function(){
			WebFormsService.onSubmit(angular.bind(this, this.validate));
			
			var all = true;
			angular.forEach(viewModel.tickets, function(ticket){
				if(all && ticket.printCheckboxEl.checked !== 'checked'){
					all = false;
				}
			});
			selected = all;
			//window.showTickets = this.print;
		},
		
		selectAll : function(){
			selected = (selected === 'checked') ? false : 'checked';
			angular.forEach(viewModel.tickets, function(ticket){
				ticket.printCheckboxEl.checked = selected;
			});
		},
		
		back : function(){
			 backClicked = true;
		},
		
		validate : function(evt){
			
			if(backClicked) return true;
			
			delete viewModel.error;
			var hasTickets = false;
			angular.forEach(viewModel.tickets, function(ticket){
				if(!hasTickets && ticket.printCheckboxEl.checked) hasTickets = true;
			});
			
			if(!hasTickets){
				viewModel.error = 'noSelections';
			}
			
			this.scope.$apply();
			return hasTickets;
		},
		
		selectTicket : function(ticket){
			
		},
		
		viewTickets : function(){
			var url = pageStateService.getRootPage('viewTickets');
			window.open(url, "", "width=400, height=800");  
		}
	});
	
	return new ViewOrderController($scope);
	
}]);

GTS.viewOrderOutsideAccount.controller('viewOrderOutsideAccountController', ['classify','OrderData','BaseResponderController','$scope','$sce','$http','pageStateService',
	function(classify, OrderData, BaseResponderController, $scope, $sce, $http, pageStateService
	){
	
		var ViewOrderOutsideController = classify(BaseResponderController, {
			
			_constructor : function(){
				BaseResponderController.prototype._constructor.apply(this, arguments);
				
				this.scope.viewModel = this.viewModel = OrderData;

				angular.forEach(OrderData.orderItems, function(ticket){
					ticket.itemName = $sce.trustAsHtml(ticket.itemName);
					ticket.guestName = $sce.trustAsHtml(ticket.guestName);
					ticket.checked = false;
				}, this);
			},
			
			registrations : ['submit', 'selectTicket', 'viewTickets', 'selectAll'],
			
			selectTicket : function(ticket){
				
				//ticket.checked === 'true'
			},
			
			selectAll : function(){
				this.selectedAll = !this.selectedAll;
				angular.forEach(this.viewModel.orderItems, function(_ticket){
					_ticket.checked = this.selectedAll ? 'true' : 'false';
				}, this);
			},
			
			submit : function(){
				var data = {},	
					makeCall = false;
				angular.forEach(this.viewModel.orderItems, function(ticket, index){					
					if(ticket.checked === "true"){
						makeCall = true;
						data['OrderProductViewModels['+index+'].OrderProduct.VisualId'] = ticket.visualId;
						data['OrderProductViewModels['+index+'].IsSelectedForTicketPrint'] = true;
					}					
				}, this);
				
				if(makeCall){
					$http({
						method : 'POST',
						url : '',
						data : data
					}).then(function(response){
						
						var target = response.data.url;
						window.location.href=target;
					});
				}
			},
			
			viewTickets : function(){
				var url = pageStateService.getRootPage('viewTickets');
				window.open(url, "", "width=400, height=800");  
			}
			
		});
		
		return new ViewOrderOutsideController($scope);
	}
]);

GTS.viewTickets.controller('ViewTicketsController', [
	'$scope', 'BaseController', 'classify', 'ViewTicketsService', 'ViewTicketsViewModel', 'pageStateService', 'ResponderService', function(
	 $scope,   BaseController,   classify,   viewTicketsService,   viewTicketsViewModel,   pageStateService,   responderService){

		 var selected = 0,
		 	 ticketHeight = 166;

	var ViewTicketsController = classify(BaseController, {

		viewModel : viewTicketsViewModel,
		state : { loading : false },
		selectedTicket : 0,
		
		registrations : ['closePage', 'changeTicket', 'nextTicket'],

		postConstruct : function(){
			this.state.loading = true;
			var orderId = pageStateService.getQueryString("orderId");
			viewTicketsService.loadOrderProducts(orderId.orderid).then(angular.bind(this, this.onLoadOrderProductsComplete));
		},
		
		onLoadOrderProductsComplete : function(data){
			this.state.loading = false;
			this.viewModel.products = data.message;
			this.changeTicket(this.viewModel.products[0]);
		},
		
		calcTicketHeight : function(){
			setTimeout(function(){
				ticketHeight = $('.view').outerHeight();
			}, 400);
		},
		
		changeDevice : function(bool, breaker){
			device[breaker] = bool;
			this.scope.$apply();
		},
		
		closePage : function(){
			window.close();
		},
		
		nextTicket : function(dir){
			var selected;
			angular.forEach(this.viewModel.products, function(t, i){
				if(t.show){
					selected = i;	
				}
			});
			
			selected = (dir) ? selected + 1 : selected - 1;
			
			if(selected < 0) selected = 0;
			if(selected >= this.viewModel.products.length) selected = this.viewModel.products.length - 1;
	
			this.changeTicket(this.viewModel.products[selected]);
		},
		
		changeTicket : function(ticket){
			var selected;
			angular.forEach(this.viewModel.products, function(t, i){
				delete t.show;
				if(t.VisualId == ticket.VisualId){
					selected = i;
				}
			});
			ticket.show = true;
			setTimeout(angular.bind(this, this.calcScroll), 300);
		},
		
		calcScroll : function(el, w){
			
			this.calcTicketHeight();

		    el = $('.view');
		    w = window.innerHeight / 2;
		    var top = el.offset().top,
		        target = top + (ticketHeight / 2);
			target = target - w;
				
			$('body, html').animate({scrollTop : target}, 200);		
		}
		
	});

	return new ViewTicketsController($scope);

}]); 

GTS.orderConfirmation.service('ViewTicketsService', [
	
	'classify', '$sce', '$q', 'apiService', function(
	 classify,   $sce,   $q,   apiService){
	
	var orderConfirmationData = {};
	var pageData = {};
	
	var ViewTicketsService = classify({
		_constructor : function(){
			
		},
		
		loadOrderProducts : function(orderId) {
			var request = $q.defer();
            apiService.getOrderProducts(orderId).then(angular.bind(this, this.getProductsSuccess, request), angular.bind(this, this.getProductsFailure, request));
			return request.promise;
		},
		
        getProductsSuccess : function(request, response){
            request.resolve({ success: true, errorType: 'none', message: response.data });
        },
        
        getProductsFailure : function(request, response){
            request.resolve({ success: false, errorType: 'getProductsFailure', message: response.data });
        }
	});
	

	return new ViewTicketsService();

}]);

GTS.viewTickets.factory('ViewTicketsViewModel', ['baseViewModel', function(baseViewModel){
	return angular.extend({
		
	}, baseViewModel);
}]);

GTS.mixins.birthdateFormField.factory('BirthdateFormField', ['classify', 'BaseFormField', 'CommunicatorService',function(classify, BaseFormField,CommunicatorService){
	
	var BirthdateFormField = classify(BaseFormField, {
		
		_constructor : function(){
			BaseFormField.prototype._constructor.apply(this, arguments);	
			
			setTimeout(angular.bind(this, function(){
				var node = $('[data-formatdatestring]');
				this.format = node.attr('data-formatdatestring') || 'MM/DD/YYYY';
                // Check for no localization string defined
                if (this.format === '[DateFormat]'){
                    this.format = 'MM/DD/YYYY';
                }
				
				this.setDefault();			
			}, 0));
		},
		
		setDefault : function(){
			var dateAr = [];
			
			if(this.format && this.value){
				var formatArray = this.format.split('/'),
					valueArray = this.value.split('/');
					
				var month = valueArray[0],
					day = valueArray[1],
					year = valueArray[2];
					
				// make sure there are three specifc string sections
				angular.forEach(formatArray, function(formatItem, index){
					if(formatItem === 'MM'){
						dateAr.push(month);
					}
					if(formatItem === 'DD'){
						dateAr.push(day);
					}
					if(formatItem === 'YYYY'){
						dateAr.push(year);
					}
				}, this);
			}
			this.value = dateAr.join('/');
		},
		
		maxValue : null,
		minValue : null,
		
		checkMin : function(){	
			var valid = (new Date(this.value) > new Date(this.minValue));
			return !valid;
		},
		
		checkMax : function(){
			var valid = (new Date(this.value) < new Date(this.maxValue));
			return !valid;
		},
		
		validate : function(flag, field){	
			this.error = this.required && this.visible && !this.value;

			// Required but No value entered 
			if (this.error){
				return false;
			}

			// Verify proper date format
			if(this.value && this.checkFormat()){
				this.error = true;
				return false;
			}

			// Check min and max values if required
			if(this.required){
				if(this.maxValue){
					this.error = this.checkMax();
				}
				if(!this.error && this.minValue){
					this.error = this.checkMin();
				}
			}
				
			return !this.error;
		},
		
		checkFormat : function(){
			var error = false;
			
			if(this.format && this.value) {
			    var formatArray = this.format.split('/'),
			        valueArray = this.value.split('/');
					
				// make sure there are three specifc string sections
				if(valueArray.length === 3){
					angular.forEach(formatArray, function(formatItem, index){
						var val = Number(valueArray[index]);
						if(formatItem === 'MM'){
							error = (!error) ? !(val > 0 && val <= 12) : error;
						}
						if(formatItem === 'DD'){
							error = (!error) ? !(val > 0 && val <= 31) : error;
						}
						if(formatItem === 'YYYY'){
							error = (!error) ? (!val || val <= 1900) : error;
						}
					}, this);
				}else{
					error = true;
				}
			}
			return error;
		},
		
		getSystemDate : function(dateString){
			var dateAr = ['','',''];
			if(this.format && this.value){
				var formatArray = this.format.split('/'),
					valueArray = this.value.split('/');					
				// make sure there are three specifc string sections
				angular.forEach(formatArray, function(formatItem, index){
					if(formatItem === 'MM'){
						dateAr[1] = valueArray[index];
					}
					if(formatItem === 'DD'){
						dateAr[2] = valueArray[index];
					}
					if(formatItem === 'YYYY'){
						dateAr[0] = valueArray[index];
					}
				}, this);
			}
			return dateAr.join('-');
		}
		
	});
	
	return BirthdateFormField;
	
}]);

GTS.mixins.calendar.factory('Calendar', ['classify', function(classify){
	
	var Calendar = classify({
		
		_constructor : function(){	
		},
		
		prevMonth : function(){
			
		},
		
		nextMonth : function(){
			
		}
		
	});
	
	return Calendar;
	
}]);

GTS.mixins.contactForm.factory('ContactForm', [

	'classify', 'BaseForm','TextFormField', 'SelectFormField','BirthdateFormField','apiService', '$q', function(
	 classify,   BaseForm,  TextFormField,   SelectFormField,  BirthdateFormField, api,          $q){

	var ContactForm = classify(BaseForm, {
		
		username : { },
		password : { },
		confirmPassword : { },
		title : { },
		firstName : { },
		middleName : { },
		lastName : { },
		suffix : { },
		street1 : { },
		street2 : { },
		city : { },
		country : { },
		state : { },
		zipCode : { },
		birthday : {},
		phone : { },
		mobile : { },
		email : { },
		confirmEmail : { },
		gender : {},
		
		_constructor : function(){
			this.username = new TextFormField({});
			this.password = new TextFormField({});
			this.confirmPassword = new TextFormField({});
			this.companyCode = new TextFormField({visible : false});
			this.title = new SelectFormField({ required : false });
			this.firstName = new TextFormField({});
			this.middleName = new TextFormField({ required : false });
		    this.lastName = new TextFormField({});
			this.suffix = new SelectFormField({ required : false });
			this.street1 = new TextFormField({});
			this.street2 = new TextFormField({ required : false });
			this.city = new TextFormField({});
			this.country = new SelectFormField({});
			this.state = new SelectFormField({});
			this.zipCode = new TextFormField({});
			this.phone = new TextFormField({});
			this.mobile = new TextFormField({required : false});
			this.email = new TextFormField({});
			this.confirmEmail = new TextFormField({});
			this.birthday = new BirthdateFormField({ visible: false, required : false});
			this.gender = new SelectFormField({ visible: false, required : false });
			this.relationshipType = new SelectFormField({ visible: false, required : false });

			this.country.onChange = angular.bind(this, this.onCountryChanged);
		},
		
		toggleShow: function (fields, show) {
		    console.log("toggleShow");
			angular.forEach(fields, function(field, i){
				if(this[field]){
					this[field].visible = show;
				}
			}, this);
		},

        //  Store what the visible and required values are originally as we may need to revert back to them later (for gifted purchases)
        storeDefaults : function() {
            angular.forEach(this, function (prop) {
                if (prop.visible !== null && prop.visible !== undefined) {
                    prop.visibleOriginal = prop.visible;
                }
                if (prop.required !== null && prop.required !== undefined) {
                    prop.requiredOriginal = prop.required;
                }
            });
        },

        toggleFields : function(fieldAttributes) {
            console.log(fieldAttributes);
            //  Reset the properties back to their defaults
            angular.forEach(this, function (prop) {
                if (prop.visibleOriginal !== null && prop.visibleOriginal !== undefined) {
                    prop.visible = prop.visibleOriginal;
                }
                if (prop.requiredOriginal !== null && prop.requiredOriginal !== undefined) {
                    prop.required = prop.requiredOriginal;
                }
            });

            for (var i = 0; i < fieldAttributes.length; i++) {
                var fieldAttribute = fieldAttributes[i];

                var field = null;

                switch (fieldAttribute.FieldName) {
                    case "Title":
                        field = "title";
                        break;
                    case "First Name":
                        field = "firstName";
                        break;
                    case "Middle Name":
                        field = "middleName";
                        break;
                    case "Last Name":
                        field = "lastName";
                        break;
                    case "Suffix":
                        field = "suffix";
                        break;
                    case "Birthday":
                        field = "birthday";
                        break;
                    case "Gender":
                        field = "gender";
                        break;
                    case "Phone":
                        field = "phone";
                        break;
                    case "Mobile":
                        field = "mobile";
                        break;
                    case "E-mail":
                        field = "email";
                        break;
                    case "Street 1":
                        field = "street1";
                        break;
                    case "Street 2":
                        field = "street2";
                        break;
                    case "City":
                        field = "city";
                        break;
                    case "State":
                        field = "state";
                        break;
                    case "Postal":
                        field = "zipCode";
                        break;
                    case "Country Code":
                        field = "country";
                        break;
                }

                if (field) {
                    this[field].visible = fieldAttribute.Display;
                    this[field].required = fieldAttribute.Required;
                }
            }
        },
		
		onCountryChanged : function(force){
			var countryCode = this.country.value;
			this.getStates(countryCode, force);

			if(this.contactFormController){
				this.contactFormController.country.value = this.country.value; 
				this.contactFormController.country.display = this.country.display; 
				this.contactFormController.onCountryChanged(); 
			}
		},
		
		//  Get the states based on the country
		getStates : function(countryCode, force){
			api.getStates(countryCode).then(angular.bind(this, function(response){
				this.state.setOptions(response.data, "Abbreviation", "Name");
				this.selectDefaultState(force);

				if(this.onStatesLoaded && typeof this.onStatesLoaded === 'function'){
					this.onStatesLoaded();
				}
			}));
		},
		
		//  Set current value to the default state if it exists
		selectDefaultState : function(force){
			var foundDefault = false;
			
			angular.forEach(this.state.options, function(st, i){
				if(!foundDefault && st.DefaultLocale){
					foundDefault = true;
					this.state.value = st.value;
					this.state.change();
				}
			}, this);
			
			//  DD - 10/8/2015 - Keep this around for now.   I have a feeling the required state/zip debate isn't over.
			//this.state.required = this.state.options.length > 0;
			//this.zipCode.required = this.state.options.length > 0;
			
			if(!foundDefault && !force){
				this.state.value = "";	//  Don't show the previously selected state if they switch countries.
			}

			if(this.state.onStateChange){
				this.state.onStateChange();
			}
		},
		
		setDependentContact : function(contactFormController, doBind){
			this.contactFormController = contactFormController;
			this.doBind = doBind;
			
			this.username.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.username.value = this.username.value; });
			this.password.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.password.value = this.password.value; });
			this.confirmPassword.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.confirmPassword.value = this.confirmPassword.value; });
			this.title.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.title.value = this.title.value; contactFormController.title.display = this.title.display; });
			this.firstName.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.firstName.value = this.firstName.value; });
			this.middleName.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.middleName.value = this.middleName.value; });
			this.lastName.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.lastName.value = this.lastName.value; });
			this.suffix.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.suffix.value = this.suffix.value; contactFormController.suffix.display = this.suffix.display; });
			this.street1.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.street1.value = this.street1.value; });
			this.street2.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.street2.value = this.street2.value; });
			this.city.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.city.value = this.city.value; });
			this.state.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.state.value = this.state.value; contactFormController.state.display = this.state.display; });
			this.zipCode.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.zipCode.value = this.zipCode.value; });
			this.phone.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.phone.value = this.phone.value; });
			this.mobile.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.mobile.value = this.mobile.value; });
			this.email.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.email.value = this.email.value; });
			this.confirmEmail.onChange = angular.bind(this, function(){ if(!this.doBind) return; contactFormController.confirmEmail.value = this.confirmEmail.value; });
		},

		updateDependency : function(){
			angular.forEach(this, function(prop){
				if(prop.onChange){
					prop.onChange(true);
				}
			});
		},
		
		addStreet : function(){
			this.state.showStreet2 = true;
		},
		
		clearErrors : function(){
			angular.forEach(this, function(field){
				if(field.error) delete field.error;
			});
		},
		
		reset : function(){
			this._constructor();
		}
	});

	return ContactForm;

}]);

GTS.dateFormField.directive('dateFormField', function () {
    return {
        link: function (scope, elm, attrs) {
            elm.datepicker({
                changeMonth: true,
                changeYear: true,
                yearRange: "-100:+0",
                //showMonthAfterYear: true  --  Uncomment this for customers that want to show year first.
            });

            if (attrs.maxvalue) { elm.datepicker("option", "maxDate", new Date(attrs.maxvalue)); }
            if (attrs.minvalue) { elm.datepicker("option", "minDate", new Date(attrs.minvalue)); }
            if (attrs.format) { elm.datepicker("option", "dateFormat", new Date(attrs.format)); }

	        elm.inputmask("mm/dd/yyyy");
        }
    };
});


GTS.mixins.datePicker.factory('DatePickerModalController', ['classify','ResponderModalController', 'Calendar', function(classify,ResponderModalController, Calendar){
	
	var DatePickerModalController = classify(ResponderModalController, {
		
		listeners : {
			'datePickerModal.get' : 'openModal'
		},
		
		registrations : ['closeModal'],
		
		_constructor : function(){
			ResponderModalController.prototype._constructor.apply(this, arguments);	
			this.viewModel.calendar = new Calendar();
			this.state.loading = false;
		}
		
	});
	
	return DatePickerModalController;
	
}]);

GTS.mixins.datePicker.controller('datePickerModalInstance', ['classify','DatePickerModalController', '$scope',function(classify,DatePickerModalController,$scope){
	
	var DatePickerModalInstance = classify(DatePickerModalController, {
		
	});
	
	return new DatePickerModalInstance($scope);
	
}]);

GTS.editablePrice.factory('EditablePriceControl', [

	//util     //inheritance
	'classify','NumbersOnlyController',function(
	 classify,  NumbersOnlyController){

	return NumbersOnlyController;

}]);

GTS.mixins.inputRadio.factory('InputRadioField', ['BaseFormField', 'classify', function(BaseFormField, classify){
	
	var InputRadio = classify(BaseFormField, {
		checked : false,
	});
	
	return InputRadio;
	
}]);

GTS.modal.factory('ModalController', ['classify', function(classify){
	
	var ModalController = classify({
		
		openModal : function(){
			this.scope.state.showModal = true;
			this.scope.state.loading = true;
			if(this.onModalOpen) this.onModalOpen.apply(this, arguments);
		},
		
		closeModal : function(){
			this.scope.state.showModal = false;
			this.scope.state.loading = false;
			if(this.onModalClose) this.onModalClose.apply(this, arguments);
		}
	});
	
	return ModalController;
	
}]);
		


GTS.modal.factory('NModalController', ['classify','BaseResponderController',function(classify,BaseResponderController){
	
	var ModalController = classify(BaseResponderController, {
		
		openModal : function(){
			this.scope.state.showModal = true;
			this.scope.state.loading = true;
			if(this.onModalOpen) this.onModalOpen.apply(this, arguments);
		},
		
		closeModal : function(){
			this.scope.state.showModal = false;
			this.scope.state.loading = false;
			if(this.onModalClose) this.onModalClose.apply(this, arguments);
		}
	});
	
	return ModalController;
	
}]);
		


GTS.modal.factory('ResponderModalController', [
	
	'classify','BaseResponderController',function(
	 classify,  BaseResponderController){
		
	var ResponderModalController = classify(BaseResponderController, {
		
		openModal : function(){
			this.scope.state.showModal = true;
			this.scope.state.loading = true;
			if(this.onModalOpen) this.onModalOpen.apply(this, arguments);
		},
		
		closeModal : function(){
			this.scope.state.showModal = false;
			this.scope.state.loading = false;
			if(this.onModalClose) this.onModalClose.apply(this, arguments);
		}
		
	});
	
	return ResponderModalController;
	
}]);
		


GTS.numbersOnly.factory('NumbersOnlyController', [

	//util
	'classify',function(
	 classify){

    var inArray = function(val, arr){
        var t = -1;
        angular.forEach(arr, function(item, index){
            if(val == item){
                t = index;
                return false;
            }
        });
        return t;
    };
	
	return classify({

		isValidKeyCode : function(keyCode, ctrlKey){
            if (keyCode === 67 && ctrlKey) {
                return true;
            }
            if (keyCode >= 48 && keyCode <= 57) {
                return true;
            }
            if (keyCode >= 96 && keyCode <= 105) {
                return true;
            }
            if (inArray(keyCode, [8, 9, 37, 38, 39, 40, 46, 190, 110]) !== -1) {
                return true;
            }
            return false;
        },

        numbersOnly : function(evt){
            if (evt.keyCode === 86 && evt.ctrlKey === true){
            } else if (!this.isValidKeyCode(evt.keyCode, evt.ctrlKey)) {
                evt.preventDefault();
            }
        },

        onKeydown : function(event){
        	this.numbersOnly(event);
        }
		
	});

}]);

GTS.mixins.numericFormField.factory('NumericFormField', ['classify', 'BaseFormField', function(classify, BaseFormField){
	
	var NumericFormField = classify(BaseFormField, {
		
		value : 0,
		
		minValue: 0,

		maxValue: Number.MAX_VALUE,

		increment : function() {
			if(!this.disabled){
				var value = parseFloat(this.value);
				this.value = Math.min(value + 1, this.maxValue);
			}
		},

		decrement : function() {
			if(!this.disabled){
				var value = parseFloat(this.value);
				this.value = Math.max(value - 1, this.minValue);
			}
		},

		onChange: function () {
			//  Check the boundaries
			var value = parseFloat(this.value);
			var newValue = Math.min(value, this.maxValue);
			newValue = Math.max(newValue, this.minValue);
			if (newValue !== value) {
				this.value = newValue;
			}
		}
	});
	
	return NumericFormField;
	
}]);

GTS.pager.factory('PagerController', ['classify',function(classify) {

	return classify({
		currentPage: 0,
		pageCount: 0,
		atStart: false,
		atEnd: false,
		
		registrations : ['previousPage', 'nextPage'],

		_constructor: function (pageCount) {
			angular.extend(this, pageCount);

			this.processPageChange();
		},

		setCurrentPage : function(page) {
			this.currentPage = page;
			this.processPageChange();
		},

		setPageCount : function(pageCount) {
			this.pageCount = pageCount;
			this.currentPage = 1;
			this.processPageChange();
		},

		previousPage : function() {
			if (this.currentPage > 1) {
				this.currentPage--;
			}

			this.processPageChange();
		},

		nextPage : function() {
			if (this.currentPage <= this.pageCount) {
				this.currentPage++;
			}

			this.processPageChange();
		},

		processPageChange : function() {
			this.atStart = this.pageCount !== 0 && this.currentPage === 1;
			this.atEnd = this.pageCount !== 0 && this.currentPage === this.pageCount;
		}
	});
}]);

GTS.quantityControl.factory('quantityControlController', ['classify', function(classify){

	var QuantityControl = classify([{

		inc : function(dir, item) {
			if(this.preInc && typeof this.preInc === 'function') this.preInc(dir, item);
			
			if(item.quantityInputEl){
				if(dir){
					item.quantityInputEl.value = parseFloat(item.quantityInputEl.value) + 1;
				}else{
					item.quantityInputEl.value = parseFloat(item.quantityInputEl.value) - 1;
					if(item.quantityInputEl.value < 0){
						item.quantityInputEl.value = 0;
					}
				}
			}else{
				item.quantityChangeDisabledError = true;
			}

			if(this.postInc && typeof this.postInc === 'function') this.postInc(dir, item);
		}

	}]);

	return QuantityControl;

}]);

GTS.mixins.select.factory('SelectFormField', ['BaseFormField','classify', function(BaseFormField, classify){
	
	var SelectFormField = classify(BaseFormField, {
		value : "",
		options : [],
		display: "",
		
		match : function($event){
			var self = this;
			setTimeout(function(){
				$($event.target).trigger('change');
			}, 0);
		},
		
		change : function(skipOnChange){
			
			var display = null,
				val = this.value,
				continu = true;

			angular.forEach(this.options, function(option){
				if(continu && option.value == val){
					display = option.text;
					continu = false;
				}
			});
			this.display = display;
			
			if(this.onChange && !skipOnChange) this.onChange();
		},
		
		mapOptions : function(valueKey, textKey){
			angular.forEach(this.options, function(option, i){
				option.value = option[valueKey];
				option.text = option[textKey];
			});
		},
		
		setOptions : function(arr, selectVal, selectName, defaultValue){
			angular.forEach(arr, function(opt, i){
				opt.value = opt[selectVal];
				opt.text = opt[selectName];
			});
			
			this.options = arr;
			
			if(defaultValue !== null && defaultValue !== undefined && this.value !== defaultValue){
				this.value = defaultValue;
				this.change();
			}
		}
	});
	
	return SelectFormField;
	
}]);

GTS.tabs.factory('TabsController', ['classify', function(classify){
	
	var TabsController = classify({
		
		clickTab : function(tab){
			this.viewModel.activeTabId = tab;
			if(this.onTabClick) this.onTabClick(tab); 
		}
		
	});
	
	return TabsController;
	
}]);

GTS.mixins.textFormField.factory('TextFormField', ['classify', 'BaseFormField', function(classify, BaseFormField){
	
	var TextFormField = classify(BaseFormField, {
		
		
	});
	
	return TextFormField;
	
}]);