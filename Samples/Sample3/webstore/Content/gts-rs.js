/*
* Model is an angular object like service/controller/factory, but it accepts only a static object.
*/
R.model = function(name, object){
	if(angular.isObject(object)){
		this.provider(name, function(){
			this.$get = [function(){
				return object;
			}];
		});
		return object;
	}else{
		return false;
	}
};

var app2 = angular.module('disney', []);

app2.controller('selectionsController', ['$scope', function($scope){

	var ele = angular.element($('[data-gts-reserved-seat]')),
		inj = ele.injector();

	var SelectionsService = inj.get('SelectionsService');

	SelectionsService.bindToSelections(angular.bind(this, function(selections){
		
		$scope.seats = selections.seats;
		$scope.$apply();

	}));

}]);


// bootstrap
$(document).ready(function(){

	var app = document.querySelectorAll('[data-gts-reserved-seat]')[0],
		pages = document.querySelectorAll('[data-page]'),
		list = [],
		$http = angular.bootstrap().get('$http');

	angular.forEach(pages, function(page){
		var pageName = page.getAttribute('data-page');
		if(pageName){
			(function(el, name){
				list.push(name);
				$http({
					method : 'POST',
					url : 'http://shdr-rs:5100/api/merchants/GTSCON/pages/'+name+'/localize',
					data : {
						html : el.innerHTML
					},
					headers : {
						authorization : localize.token,
						"Accept-Language" : localize.langCode
					}
				}).then(function(response){
					list.splice(0,1);
					el.innerHTML = response.data;
					if(list.length === 0){
						app.classList.remove('raw');
						angular.bootstrap(app, ['gtsReservedSeat']);
						angular.bootstrap(angular.element($('[data-selections]')), ['disney']);
					}
				});
			})(page, pageName);
		}
	});
});


R.factory('BaseController', ['gtsClass', '$window', 'ApplicationSettings', function(gtsClass, $window, ApplicationSettings){

	var BaseControllerState = {
		disabled : true, // if disabled, module is inactive
		error : null, // set to an error key, when the module is in an error state - see error.view.jade
		loading : false, // set to true when the module is in a loading state
		warning : false
	};

	/**
	* @class BaseController
	* @classdesc This is the base controller, all controllers should extend this
	*/
	var BaseController = gtsClass({

		/**
		* @memberof BaseController
		* @function constructor
		* @param {object} scope - the controller's scope 
		* @desc The BaseController constructor is reponsible for setting this.scope to scope. It creates scope.state, calls {@link BaseController.setDefaults|this.setDefaults},
				{@link BaseController.register|this.register}, and {@link BaseController.bind|this.bind}
		*/
		constructor : function(scope){
			this.scope = scope;
			this.scope.state = angular.copy(BaseControllerState);
			this.setDefaults();
			this.register();
			this.bind();
		},

		/**
		* @memberof BaseController
		* @access private
		* @function setDefaults
		* @desc	this function exists to set default properties
		*/
		setDefaults : ['private', function(){
			// do nothing here yet... it is intended to be overriden
		}],

		/**
		* @memberof BaseController
		* @name registrations
		* @type {array}
		* @desc an array of properties on the scope that the controller will automatically try to map to its own method with the same name
		*/
		registrations : ['private', []],

		debounce : ['private', null],

		/**
		* @memberof BaseController
		* @access private
		* @function register
		* @desc	the register function exists to map properties on the scope, declared in the view, to their properties in the controller
		*/
		register : ['private', function(){
			var r = this.registrations,
				s = this;
			if(r.length){
				if(angular.isArray(r)){
					angular.forEach(r, function(prop){
						s.scope[prop] = angular.bind(s, s[prop]);
					});
				}else if(typeof r === 'object'){
					for(var prop in r){
						s.scope[prop] = angular.bind(s, r[prop]);
					}
				}
			}
		}],

		/**
		* @memberof BaseController
		* @access private
		* @function bind
		* @desc	The bind function will be called in the constructor. It is expected that all controllers extending BaseController will override the bind function with their own. Inside the bind function, listen for changes outside the controller 
		*/
		bind : ['private', function(){
			//
		}],

		/**
		* @memberof BaseController
		* @access private
		* @function enable
		* @param {function} c - a callback function
		* @desc	the enable function adjusts the proper values on the state object to enable the module
		*/
		enable : ['private', function(c){
			clearTimeout(this.timer);
			this.scope.state = angular.copy(BaseControllerState);
			this.scope.state.disabled = false;
			this.scope.errorMessage = null;
			if(c && typeof c === 'function'){
				c();
			}
		}],

		/**
		* @memberof BaseController
		* @access private
		* @function
		* @param {function} c - a callback function
		* @desc	the disable function adjusts the proper values on the state object to edisable the module
		*/
		disable : ['private', function(c){
			clearTimeout(this.timer);
			this.scope.state = angular.copy(BaseControllerState);
			if(c && typeof c === 'function'){
				c();
			}
		}],

		/**
		* @memberof BaseController
		* @access private
		* @function
		* @param {function} c - a callback function
		* @desc	the error function adjusts the proper values on the state object to show the module in an error state
		*/
		error : ['private', function(c){
			// intentionally leave disabled out
			clearTimeout(this.timer);
			this.scope.state.loading = false;
			this.scope.state.warning = false;
			this.scope.state.error = true;
			if(c && typeof c === 'function'){
				c();
			}
		}],

		/**
		* @memberof BaseController
		* @access private
		* @function
		* @param {function} c - a callback function
		* @desc	the loading function adjusts the proper values on the state object to show the module in a loading state
		*/
		loading : ['private', function(c){

			this.scope.state = angular.copy(BaseControllerState);
			this.scope.state.disabled = false;
			if(c && typeof c === 'function'){
				c();
			}
			clearTimeout(this.timer);
			this.timer = setTimeout(angular.bind(this, function(){
				this.scope.state.loading = true;
				this.scope.$apply();
			}), ApplicationSettings.loadingDebouncer);
		}],

		/**
		* @memberof BaseController
		* @access private
		* @function
		* @param {function} c - a callback function
		* @desc	the warning function adjusts the proper values on the state object to show the module in a warning state
		*/
		warning : ['private', function(c){
			clearTimeout(this.timer);
			this.scope.state.disabled = false;
			this.scope.state.warning = true;
			if(c && typeof c === 'function'){
				c();
			}
		}],

		/**
		* @memberof BaseController
		* @access private
		* @function
		* @param {object} element - a dom node
		* @desc	The scroll function scrolls the browser to the location of element
		*/
		scroll : ['private', function(element){
			if(ApplicationSettings.autoScroll){
				// push to the end of the stack
				setTimeout(function(){
					var top = element.offsetTop;

					element = element.offsetParent;
					while(element){
						top += element.offsetTop;
						element = element.offsetParent;
					}
					$window.scrollTo(0, top);
				}, 0);
			}
		}],
	});

	return BaseController;

}]);

R.controller('DatePickerController', [

	'gtsClass','BaseController','$scope','ResponderService','DatePickerService','$element', function(
	 gtsClass,  BaseController,  $scope,  ResponderService,  DatePickerService,  $element){

	/**
	* @Class DatePickerController
	* @classdesc The DatePickerController controls all interaction with the calendar. It sends/receives numerous pieces of information with the {@link DatePickerService}
 	*/
 	var DatePickerController = gtsClass(BaseController, {

 		setDefaults : ['private', function(){
 			DatePickerService.loadFirstThreeMonths(angular.bind(this, function(){
 				this.scope.errorMessage = 'api';
 				this.error();
 			}));
 			this.getDates();
 		}],

		/**
		* @memberof DatePickerController
		* @access private
		* @type array
		* @desc An array of keys to map properties on the scope to their properties on the controller - see {@link BaseController.register}
		*/
		registrations : ['private', ['changeMonth', 'selectDate']],

		/**
		* @memberof DatePickerController
		* @access private
		* @function bind
		* @desc bind listens for the changes to singleColumn from {@link ResponderService}, then calls {@link DatePickerController.checkDevice|this.checkDevice}.
			It also listens for {@link Communicator} to send a ticketQuantity. Once it gets a quantity it calls {@link DatePickerController.getDates|this.getDates}
		*/
		bind : ['private', function(){
			this.scope.mobile = ResponderService.getBreakerStatus('singleColumn');
			ResponderService.bind('singleColumn', angular.bind(this, this.checkDevice));
		}],

		/**
		* @memberof DatePickerController
		* @access private
		* @function checkDevice
		* @param {object} evt : the event
		* @param {boolean} bool : whether the breaker was true or not
		* @desc set scope.mobile to bool, run $apply()
		*/
		checkDevice : ['private', function(bool){
			this.scope.mobile = bool;
			this.scope.$apply();
		}],

		/**
		* @memberof DatePickerController
		* @access private
		* @function getDates
		* @param {number} q - ticket quantity
		* @desc	if there is a quantity, run {@link QuantityPickerController.getUnmarkedCalendar}.
		*		Otherwise, {@link BaseController.disabe|disable} the module
		*/
		getDates : ['private', function(q){
			if(!this.scope.errorMessage){
				this.getUnmarkedCalendar();
			}
		}],

		/**
		* @memberof DatePickerController
		* @access private
		* @function getUnmarkedCalendar
		* @desc getUnmarkedCalendar calls {@link DatePickerService.getUnmarkedCalendar|} to get a blank calendar - see {@link CalendarModel}.
		* 		Then it passes the calendar to {@link DatePickerController.calendarChanged|this.calendarChanged}.
		*/
		getUnmarkedCalendar : ['private', function(){
			var cal = DatePickerService.getUnmarkedCalendar();
			this.calendarChanged(cal);
		}],

		/**
		* @memberof DatePickerController
		* @access private
		* @function calendarChanged
		* @desc calendarChanged runs whenever the calendar changes. It triggers {@link BaseController.loading|loading}, calls {@link BaseController.scroll|scroll},
		*		sets the calendar on the scope, sets the year to {@link DatePickerController.getYear|this.getYear}, sets the month to {@link DatePickerController.getMonthName|this.getMonthName}.
		*		Then finally call {@link DatePickerService.markCalendar} to mark the calendar dates. We pass in the calendar, and a callback function to run on completion.
		*/
		calendarChanged : ['private', function(calendar){
			this.loading();
			this.scroll($element[0]);
			this.scope.calendar = calendar;
			this.scope.year = DatePickerService.getYear();
			this.scope.monthName = DatePickerService.getMonthName();
			DatePickerService.markCalendar(calendar, angular.bind(this, this.calendarMarked));
		}],

		/**
		* @memberof DatePickerController
		* @access private
		* @function calendarMarked
		* @param {array} calendar - a marked {@link CalendarModel}
		* @desc	this funciton is called when {@link DatePickerService.markCalendar} has finished. Validate the calendar, and trigger the appropriate state changes
		*/
		calendarMarked : ['private', function(calendar, hasDates){
			if(calendar){
				if(hasDates){
					this.enable();
					this.scope.calendar = calendar;
				}else{
					this.error(angular.bind(this, this.enable));
					this.scope.errorMessage = 'noDates';
				}
			}else{
				this.error();
				this.scope.errorMessage = 'api';
			}
		}],

		/**
		* @memberof DatePickerController
		* @access private
		* @function changeMonth
		* @param {boolean} forward - whether to move the calendar forward or backward
		* @desc changeMonth is called when a user clicks the arrows to move the calendar. It sends forward to {@link DatePickerService.changeMonth}, calls {@link BaseController.loading|loading}.
		* 		Then calls {@link DatePickerController.changeMonth|this.changeMonth}
		*/
		changeMonth : ['private', function(forward){

			var calendar = DatePickerService.changeMonth(forward);

			if(calendar){
				this.loading();
				this.calendarChanged(calendar);
			}
		}],

		/**
		* @memberof DatePickerController
		* @access private
		* @function selectDate
		* @param {object} day - date object - see {@link DateModel}
		* @desc selectDate runs when a date is clicked. Send the calendar to {@link DatePickerService.clearPreviousSelection} to clear it, select the day.
		* 		Then send it to {@link DatePickerService.selectDate}.
		*/
		selectDate : ['private', function(day){

			if(day.available){
				this.scope.calendar = DatePickerService.clearPreviousSelection(this.scope.calendar);
				day.selected = true;
				DatePickerService.selectDate(day.date);
			}
		}]

	});

	return new DatePickerController($scope);

}]);


R.controller('EventTypePickerController', [

	// dependencies
	'gtsClass','BaseController','$scope','EventTypePickerService','Communicator','$element',function(
	 gtsClass,  BaseController,  $scope,  EventTypePickerService,  Communicator,  $element){

	/**
	* @class EventTypePickerController
	* @classdesc EventTypePickerController controls all interaction with the event time module. It sends/receives numerous pieces of information with the {@link EventTypePickerService}
	* @extends BaseController
	*/
	var EventTypePickerController = gtsClass(BaseController, {

		/**
		* @memberof EventTypePickerController
		* @access private
		* @function setDefaults
		* @desc	set default controller values
		*/
		setDefaults : ['private', function(){
			this.selectedEvent = null;
			var eDate = EventTypePickerService.getEventDate();
			if(angular.isEmpty(eDate)) this.getEvents(eDate);
		}],

		/**
		* @memberof EventTypePickerController
		* @access private
		* @function bind
		* @desc bind checks for the eventDate, then listens for new changes from {@link Communicator}
		*/
		bind : ['private', function(){
			var eventDate, quantity;
			Communicator.receive('eventDate', angular.bind(this, function(ed){
				this.getEvents(ed);
			}));
		}],

		/**
		* @memberof EventTypePickerController
		* @type {array}
		* @desc registrations - see {@link BaseController.registrations}
		*/
		registrations : ['private', ['selectEvent']],

		/**
		* @memberof EventTypePickerController
		* @access private
		* @function getEvents
		* getEvents asks the service for the events, passes updateDisplay as callback
		*/
		getEvents : ['private', function(eventDate){
			this.scope.events = [];
			if(eventDate.year && eventDate.month !== null && eventDate.day){
				this.loading();
				this.scroll($element[0]);
				EventTypePickerService.getEvents(eventDate, angular.bind(this, this.updateDisplay));
			}else{
				this.disable();
			}
		}],

		/**
		* @memberof EventTypePickerController
		* @access public
		* @function updateDisplay
		* @param {object} response : the ajax response
		* updateDisplay sets the hasEvents and events values on the scope, also turns loading off
		*/
		updateDisplay : ['private', function(events){

			this.enable();
			this.scope.dateString = EventTypePickerService.getDateString();	
			this.scope.events = events;
			if(events.length){
				this.selectEvent(events[0]);
			}
		}],

		/**
		* @memberof EventTypePickerController
		* @access private
		* @function selectEvent
		* @ng called via directive, mapped here via register
		*/
		selectEvent : ['private', function(eventObject){
			this.scope.selectedEvent = eventObject.id;
			EventTypePickerService.setEvent(eventObject);
		}]

	});

	return new EventTypePickerController($scope);
}]);

R.controller('ListController', [

	//dependencies
	'gtsClass','BaseController','Communicator','SectionsService','MapService','ResponderService','$scope',function(
	 gtsClass,  BaseController,  Communicator,  SectionsService,  MapService,  ResponderService,  $scope){

	/**
	* @class ListController
	* @classdesc ListController manages the interactions with the section select box and seat option radio buttons. It also sends/receives changes to the seat map,
	*			so that the seat map and the list view are always in sync
	*/
	var ListController = gtsClass(BaseController, {

		/**
		* @memberof ListController
		* @type {array}
		* @name registrations
		* @see BaseController
		*/
		registrations : ['private', ['selectSection', 'selectOption']],

		/**
		* @memberof ListController
		* @access private
		* @function setDefaults
		* @desc	set the default to invisible
		*/
		setDefaults : ['private', function(){
			this.scope.visible = ResponderService.getBreakerStatus('modernBrowser') ? false : true;
			this.scope.listSection = '';
		}],

		/**
		* @memberof ListController
		* @access private
		* @function bind
		* @see BaseController
		*/
		bind : ['private', function(){
			Communicator.receive({
				seatPickerEnabled : angular.bind(this, this.getSections),
				sections : angular.bind(this, this.gotSections),
				section : angular.bind(this, this.sectionChanged),
				options : angular.bind(this, this.gotOptions),
				option : angular.bind(this, this.optionChanged),
				selectedTab : angular.bind(this, this.tabChanged)
			});
		}],

		/**
		* @memberof ListController
		* @access private
		* @function getSections
		* @param {number} eId : the eventId
		* @desc	enable/disable the module
		*/
		getSections : ['private', function(eId){
			if(eId){
				this.enable();
			}else{
				this.scope.sections = [];
				this.disable();
			}
		}],

		/**
		* @memberof ListController
		* @access private
		* @function gotSections
		* @param {array} sections : the array of sections
		* @desc	hear the change in sections
		*/
		gotSections : ['private', function(sections){

			sections.sort(function(a,b){

				if(a.name > b.name){
					return 1;
				}else if(a.name < b.name){
					return -1;
				}else{
					return 0;
				}
			});
			this.scope.sections = sections;
		}],

		/**
		* @memberof ListController
		* @access private
		* @function sectionChanged
		* @desc	when the section changes, update the view
		*/
		sectionChanged : ['private', function(section){
			MapService.clearOptions();
			this.scope.options = null;
			this.scope.listSection = (section && section.name) ? section.name :  '';
		}],

		/**
		* @memberof ListController
		* @access private
		* @function gotOptions
		* @param {array} options : the array of options
		* @desc	hear the change in options
		*/
		gotOptions : ['private', function(options){
			this.scope.options = options;
			if(options.length){
				this.enable();
				//this.scope.selectedOption = MapService.getOption().id;
				
			}
		}],

		/**
		* @memberof ListController
		* @access private
		* @function optionChanged
		* @param {object} option : the selected option object
		*/
		optionChanged : ['private', function(option){
			if(option){
				this.enable();
				this.scope.selectedOption = option.id;
			}
		}],

		/**
		* @memberof ListController
		* @access private
		* @function tabChanged
		* @param {object} tab : the selected tab
		* @desc	hear a tab change, choose whether the module should be visible
		*/
		tabChanged : ['private', function(tab){
			this.scope.visible = (tab === 'list') ? true : false;
		}],

		/**
		* @memberof ListController
		* @access private
		* @function selectSection
		* @param {object} section : the target section
		*/
		selectSection : ['private', function(sectionName){

			if(sectionName){
				this.loading();
			}

			var section;
			angular.forEach(this.scope.sections, function(sectionObject, index){
				if(sectionObject.name === sectionName){
					section = sectionObject;
					return false;
				}
			});

			MapService.selectSection(section);
		}],

		/**
		* @memberof ListController
		* @access private
		* @function selectOption
		* @param {number} optionId : the option Id
		* @desc	select the option
		*/
		selectOption : ['private', function(optionId){
			MapService.setOption(optionId);
		}]

	});

	return new ListController($scope);

}]);

R.controller('MapController', [

	'gtsClass','BaseController','$scope','Communicator','MapService','ApplicationSettings','ResponderService',function(
	 gtsClass,  BaseController,  $scope,  Communicator,  MapService,  ApplicationSettings,  ResponderService){

	// we are overriding element, so create here instead of injecting it
	var $element;

	/**
	* @class MapController
	* @classdesc MapController manages interactions with the seat map
	* @extends BaseController
	*/
	var MapController = gtsClass(BaseController, {

		setDefaults : ['private', function(){
			this.scope.visible = ResponderService.getBreakerStatus('modernBrowser');
		}],

		registrations : ['private', ['selectSection', 'closeSectionView']],

		bind : ['private', function(){
			Communicator.receive({
				seatPickerEnabled : angular.bind(this, this.getSections),
				section : angular.bind(this, this.sectionChanged),
				nextOption : angular.bind(this, MapService.getNextOption),
				sectionUrl : angular.bind(this, this.sectionUrl),
				ticketQuantity : angular.bind(this, this.resetMap),
				mainTimerEnded : angular.bind(this, function(){
					this.selectSection(null);
				}),
				option : angular.bind(this, this.drawOption)
			});

			this.scope.mobile = ResponderService.getBreakerStatus('singleColumn');
			ResponderService.bind('singleColumn', angular.bind(this, function(bool){
				this.scope.mobile = bool;
				this.scope.$apply();
			}));
		}],

		getSections : ['private', function(eventId){
			this.loading();
			if(eventId){
				MapService.getPriceLevelData();
				MapService.getSectionData(angular.bind(this, this.dataDone));
			}else{
				this.resetMap();
				this.disable();
			}
		}],

		/**
		* @memberof MapController
		* @access private
		* @function dataDone
		* @desc	get the stage and the sections
		*/
		dataDone : ['private', function(success){
			if(success){
				this.scope.stage = MapService.getStage();
				this.scope.sections = MapService.getSections();
				this.scope.objects = MapService.getObjects();
				this.scope.objectLegend = MapService.getObjectLegend();
				this.scroll($element);
			}else{
				this.errorMessage = 'system';
				this.error();
			}
		}],

		/**
		* @memberof MapController
		* @access private
		* @function selectSection
		* @param {object} section : a section object
		*/
		selectSection : ['private', function(section){
			MapService.selectSection(section);
		}],

		/**
		* @memberof MapController
		* @access private
		* @function sectionChanged
		* @param {string} sectionId : the name of the section
		*/
		sectionChanged : ['private', function(section){
			this.resetMap();
			this.scope.selectedSection = section;
			if(section && section.id){
				this.loading();
				MapService.getSeatData(angular.bind(this, this.seatsLoaded));
			}
		}], 

		/**
		* @memberof MapController
		* @access private
		* @function seatsLoaded
		* @desc	set the seats object on the scope
		*/
		seatsLoaded : ['private', function(option){

			this.drawOption();
			this.enable();
			this.scope.seats = MapService.getSeats();
			this.scope.seatsLoaded = true;

			if(!option || !option.id){
				MapService.markSectionAsUnavailable();
			}
		}],

		/**
		* @memberof MapController
		* @access private
		* @function drawOption
		* @desc	draw the seat option tooltips
		*/
		drawOption : ['private', function(){
			var option = MapService.getOption();
			this.scope.option = option;
			if(option && option.id){
				this.scope.adjustments = MapService.getAdjustments();
				MapService.mark();
				this.scope.groupCoords = MapService.getCoords();
			}
		}],

		resetMap : ['private', function(){
			this.scope.seats = [];
			this.scope.stage = MapService.getStage();
			this.scope.selectedSection = null;
			this.scope.seatsLoaded = false;
			this.scope.options = [];
			this.closeSectionView();
			MapService.clearOptions();
		}],

		sectionUrl : ['private', function(sectionUrl){
			if(sectionUrl){
				this.loading();
				var backgroundProcess = new Image();
				backgroundProcess.src = sectionUrl;
				backgroundProcess.onload = angular.bind(this, function(){
					this.scope.sectionImgUrl = sectionUrl;
					this.enable();
					this.scope.$apply();
				});
			}
		}],

		closeSectionView : ['private', function(){
			this.scope.sectionImgUrl = null;
		}]

	});

	return new MapController($scope);
}]);

R.directive('vbox', [function(){
	return {
		link : function(scope, element, attrs){
			attrs.$observe('vbox', function(value){
				element.get(0).setAttribute("viewBox", value);
			});
		}
	};
}]);

R.controller('QuantityPickerController', [

	// dependencies
	'gtsClass','BaseController','$scope','ResponderService','QuantityPickerService','Communicator', function(
	 gtsClass,  BaseController,  $scope,  ResponderService,  QuantityPickerService,  Communicator){

	/**
	* @class QuantityPickerController
	* @extends BaseController
	* @classdesc QuantityPickerController is the controller which handles the interaction with the quantity module. It gets/sets numerous pieces of information from {@link QuantityPickerService}
	*/
	var QuantityPickerController = gtsClass(BaseController, {

		/**
		* @memberof QuantityPickerController
		* @function
		* @desc SetDefaults calls {@link QuantityPickerController.getTickets|getTickets} to get the ticketTypes from the {@link ApplicationSettings|Application Settings}. Then it calls {@link BaseController.enable|enable} to enable the module. Then it calls {@link QuantityPickerService.getQuantity} to get the starting quantity and set it on the scope
		*/
		setDefaults : ['private', function(){
			this.loading();
			this.getTickets();
			this.scope.quantity = QuantityPickerService.getQuantity();
		}],

		/**
		* @memberof QuantityPickerController
		* @access private
		* @type {array}
		* @desc An array of keys to map properties on the scope to their properties on the controller - see {@link BaseController.register}
		*/
		registrations : ['private', ['chooseQuantity', 'changeQuantity']],

		/**
		* @memberof QuantityPickerController
		* @access private
		* @function bind
		* @desc	The bind function is called by {@link BaseController.constructor}. Here we are listening for changes of the singleColumn property from {@link ResponderService}. Once a change happens, run {@link QuantityPickerController.checkDevice|}
		*/
		bind : ['private', function(){
			this.scope.mobile = ResponderService.getBreakerStatus('singleColumn');
			ResponderService.bind('singleColumn', angular.bind(this, this.checkDevice));
		}],

		/**
		* @memberof QuantityPickerController
		* @access private
		* @function checkDevice
		* @param {object} evt - the event
		* @param {boolean} bool - whether the breaker was true or not
		* @desc checkDevice sets the scope.mobile property to bool, then runs $apply();
		*/
		checkDevice : ['private', function(bool){
			this.scope.mobile = bool;
			this.scope.$apply();
		}],

		/**
		* @memberof QuantityPickerController
		* @access private
		* @function getTickets
		* @desc set the tickets object on the scope to the result of {@link QuantityPickerService.getTickets}.
		*/
		getTickets : ['private', function(){
			QuantityPickerService.setTicketTypes(angular.bind(this, function(tickets){
				this.scope.tickets = tickets;
				this.enable();
			}));
		}],

		/**
		* @memberof QuantityPickerController
		* @access private
		* @function chooseQuantity
		* @desc chooseQuantity sends the quantity to {@link QuantityPickerService.setQuantity}. If the service returns an error message, set it on the scope and trigger {@link BaseController.error|error}, otherwise {@link BaseController.enable|enable}.
		*/
		chooseQuantity : ['private', function(){
			// set quantity, if returns false, throw the error
			this.scope.errorMessage = QuantityPickerService.setQuantity();
			if(this.scope.errorMessage){
				this.error();
			} else{
				this.enable();
			}
		}]

	});

	return new QuantityPickerController($scope);

}]);

R.controller('SeatControlsController', [

	'$scope','gtsClass','BaseController','MapService','Communicator',function(
	 $scope,  gtsClass,  BaseController,  MapService,  Communicator){

	var SeatControlsController = gtsClass(BaseController, {

		setDefaults : ['private', function(){
			this.scope.showChangeSection = false;
			this.scope.showSearchAgain = false;
		}],

		registrations : ['private', ['clearSection', 'nextOption','showViewFromSection','closeSectionView']],

		bind : ['private', function(){
			Communicator.receive({
				section : angular.bind(this, this.sectionChanged),
				options : angular.bind(this, this.optionsChanged),
				optionId : angular.bind(this, this.getOption)
			});
		}],

		clearSection : ['private', function(){
			MapService.clearSection();
		}],

		optionsChanged : ['private', function(options){
			this.scope.showSearchAgain = (options.length > 1);
		}],

		getOption : ['private', function(option){
			this.scope.row = option.row;
			this.scope.seats = option.seatString;
		}],

		sectionChanged : ['private', function(section){
			this.scope.showChangeSection = section ? section.id : null;
			if(section && section.id){
				this.scope.showSectionView = section.hasSectionImg;
			}
		}],

		/**
		* @memberof SeatControlsController
		* @access private
		* @function nextOption
		* @param {object} option : the current option
		*/
		nextOption : ['private', function(){
			MapService.getNextOption();
		}],

		showViewFromSection : ['private', function(){
			MapService.setSectionView();
		}],
 
		closeSectionView : ['private', function(){
			MapService.setSectionView(null);
		}]

	});

	return new SeatControlsController($scope);

}]);

R.controller('SeatPickerController', [

	'$scope','gtsClass','BaseController','Communicator','PageStateService','ResponderService','TimerService','ApplicationSettings','OptionsService',function(
	 $scope,  gtsClass,  BaseController,  Communicator,  PageStateService,  ResponderService,  TimerService,  ApplicationSettings,  OptionsService){

	/**
		* @desc SeatPickerController
	* This class exists to be a wrapper for the controllers that make up the smaller pieces of the final step
	*/
	var SeatPickerController = gtsClass(BaseController, {

		setDefaults : ['private', function(){
			this.scope.selectedTab = ResponderService.getBreakerStatus('modernBrowser') ? 'visual' : 'list';
		}],

		registrations : ['private', ['requestMoreTime','match']],

		bind : ['private', function(){
			var q, eId;
			Communicator.receive({
				eventId : this.clearTimers,
				ticketQuantity : this.clearTimers,
				selectedTab : angular.bind(this, this.tabChanged),
				sessionInfo : angular.bind(this, this.sessionChanged),
				options : angular.bind(this, this.noSeats),
				option : angular.bind(this, this.needToMatch),
				section : this.clearTimers,
				moreTime : angular.bind(this, this.moreTime)
			});
		}],

		clearTimers : ['private', function(){
			TimerService.clearTimer('main');
			TimerService.clearTimer('warning');
		}],

		tabChanged : ['private', function(tab){
			this.scope.selectedTab = tab;
		}],

		noSeats : ['private', function(){

			var section = PageStateService.getSection(),
				options = PageStateService.getOptions();

			if(section && section.availability === 'none'){
				this.scope.errorMessage = 'noSeats';
				this.error();
			}else{
				this.scope.errorMessage = null;
				this.enable();
			}
		}],

		/**
		* @memberof
		* @access private
		* @name checkDevice
		*/
		checkDevice : ['private', function(bool){
			this.scope.mobile = bool;
			this.scope.$apply();
		}],

		/**
		* @memberof MapController
		* @access private
		* @function sessionChanged
		* @param {object} sessionInfoObject : the new session info
		* @desc	this function runs when we get new session info
		*/
		sessionChanged : ['private', function(sessionInfoObject){
			if(sessionInfoObject.timeout){

				TimerService.startTimer({
					id : 'main',
					time : sessionInfoObject.timeout * 1000,
					onChange : angular.bind(this, this.timerChanged)
				});

				TimerService.startTimer({
					id : 'warning',
					time : ApplicationSettings.warningTime*1000
				});
			}
		}],

		needToMatch : ['private', function(option){
			if(option && !option.samePriceLevel && !option.sameAttrs){
				this.option = option;
				this.scope.seatMatches = option.seatDetails;		
			}else{
				this.scope.seatMatches = null;
			}
		}],

		timerChanged : ['private', function(value, delayed){
			this.scope.timeString = value;
			if(delayed){
				this.scope.$apply();
			}
		}],

		/**
		* @memberof
		* @access private
		* @function moreTime
		* @desc	request moreTime
		*/
		moreTime : ['private', function(sessionObject){
			var value = sessionObject && sessionObject.Session && sessionObject.Session.Timeout ? sessionObject.Session.Timeout : null;
			if(value){
				this.sessionChanged({timeout : value});
			}
		}],

		match : ['private', function(seat){
			angular.forEach(seat.possPlus, function(plu){
				if(plu.plu == seat.plu){
					seat.cat = plu.cat;
					seat.price = plu.price;
				}
			});
			OptionsService.setOption(this.option);
		}]
	});

	return new SeatPickerController($scope);
}]);

R.controller('TabsController', [

	// dependencies
	'gtsClass','BaseController','$scope','Communicator','ResponderService',function(
	 gtsClass,  BaseController,  $scope,  Communicator,  ResponderService){
		
	/**
	* @class TabsController
	* @classdesc TabsController manages the tabs interactions. It changes the tabs, along with {@link Communicator|communicating} out the changes to the other modules
	* @extends BaseController
	*/
	var TabsController = gtsClass(BaseController, {

		/**
		* @memberof TabsController
		* @access private
		* @function setDefaults
		* @desc	setDefaults - see {@link BaseController.setDefaults}
		*/
		setDefaults : ['private', function(){
			this.scope.tab = 'visual';
		}],

		/**
		* @memberof TabsController
		* @type {array}
		* @name registrations
		* @desc registrations - see {@link BaseController.registrations}
		*/
		registrations : ['private', ['clickTab']],

		/**
		* @memberof TabsController
		* @access private
		* @function bind
		* @desc	listen for changes from {@link ResponderService} and {@link Communicator|}
		*/
		bind : ['private', function(){

			this.scope.mobile = ResponderService.getBreakerStatus('singleColumn');
			ResponderService.bind('singleColumn', angular.bind(this, function(bool){
				this.scope.mobile = bool;
				this.scope.$apply();
			}));

			if(ResponderService.getBreakerStatus('modernBrowser')){
				this.scope.visible = true;
				Communicator.receive('seatPickerEnabled', angular.bind(this, this.showTabs));
			}else{
				this.scope.visible = false;
			}
		}],

		/**
		* @memberof TabsController
		* @access private
		* @function showTabs
		*/
		showTabs : ['private', function(eventId){
			if(eventId){
				this.enable();
			}else{
				this.disable();
			}
		}],

		/**
		* @memberof TabsController
		* @access private
		* @function clickTab
		* @param {object} targetTab 
		* @desc	this function runs when the tab changes
		*/
		clickTab : ['private', function(targetTab){
			this.scope.tab = targetTab;
			this.scroll(document.getElementById('map'));
			Communicator.send('selectedTab', targetTab);
		}]

	});

	return new TabsController($scope);

}]);

R.controller('TimeoutModalController', ['gtsClass','$scope', 'Communicator', function(gtsClass, $scope, Communicator){
	
	var TimeoutModalController = gtsClass({

		constructor : function(scope){
			this.scope = scope;
			this.scope.close = angular.bind(this, this.close);
			Communicator.receive('mainTimerEnded', angular.bind(this, this.showModal));
			Communicator.receive('moreTime', angular.bind(this, this.tooManyTimes));
		},

		showModal : ['private', function(){
			this.scope.showTimeout = true;
		}],

		close: ['private', function(){
			this.scope.showTimeout = false;
			this.scope.moreTimeMaxed = false;
		}],

		tooManyTimes : ['private', function(value){
			if(value === null){
				this.scope.moreTimeMaxed = true;
			}
		}]

	});

	return new TimeoutModalController($scope);

}]);

R.controller('WarningModalController', ['$scope', 'gtsClass', 'Communicator', 'MapService', function($scope, gtsClass, Communicator, MapService){
	
	var warningModalController = gtsClass({

		constructor : function(scope){
			this.scope = scope;
			this.scope.moreTime = angular.bind(this, this.moreTime);
			this.scope.closeModal = angular.bind(this, this.closeModal);
			Communicator.receive('warningTimerEnded', angular.bind(this, this.showModal));
			Communicator.receive('mainTimerEnded', angular.bind(this, this.closeModal));
		},

		showModal : ['private', function(){
			this.scope.showWarning = true;
			this.scope.moreTimeMaxed = false;
		}],

		moreTime : ['private', function(){
			this.scope.showWarning = false;
			MapService.getMoreTime();
		}],

		closeModal : ['private', function(){
			this.scope.showWarning = false;
		}],

		tooManyTimes : ['private', function(){
			this.scope.showWarning = true;
		}]
	});

	return new warningModalController($scope);

}]);

/**
* @name AdjustmentsModel
* @desc the adjustments are used to create a wrapper around the seats. This sets the seat circle width.
		Also, since everything is sized around the upper left corner of the seat, we need to shrink the wrapper so the points all fit. These are those values
*/R.model('AdjustmentsModel', {
	pointDiameter : 0,
	width : 0,
	height : 0
});

R.model('DefaultSettingsModel', {
	// the number of coordinates per seat
	predefinedPointRadiusInCoords : 20,
	warningTime : 60,
	//
	salesProgramId : null,
	/**
	* @memberof ApplicationSettings
	* @type array
	* @desc map externalIds to their PLUs
	*/
	ticketTypes : [],
	eventTypeId : null,
	ticketQuantityLimit : 100,
	confirmationUrl : '',
	apiUrl : '',
	autoScroll : true
});

/**
* @name LabelModel
* @type {object}
*/
R.model('LabelModel', {
	name : '',
	top : 0,
	left : 0,
	height : 0,
	width : 0
});

/**
* @name OptionModel
* @type {object}
* @desc OptionModel is an object container the necessary information for seat options
*/
R.model('OptionModel', {
	id: null,
	section : null,
	row : null,
	seats : [
		{
			id : null,
			name : null
		}
	],
	seatsSring : ''
});

/**
* PageStateModel
*/
R.factory('PageStateModel', ['DateModel', function(dateModel){
	return {
		ticketQuantities : [],
		currentDate : angular.merge(dateModel, {}),
		eventDate : angular.merge(dateModel, {}),
		priceLevels : [],
		eventTypeId : null,
		eventId : null,
		sections : [],
		section : null,
		options : [],
		option : null,
		sessionInfo : {
			id : null,
			timeout : null,
		},
		seats : []
	};
}]);


/**
* @name SeatModel
* @type {object}
* @desc SeatModel is an object that represents an individual seat
*/
R.model('SeatModel', {
	x : 0,
	y : 0,
	id : '',
	name : ''
});

/**
* @name SectionModel
* @type {object}
* @desc SectionModel is the model for each section
*/
R.model('SectionModel', {
	id : null,
	left : 0,
	top : 0,
	height :0,
	width : 0,
	name : '',
	label : '',
	viewBox : '',
	points : '',
	aspectRatio : 0,
	pointDiameter : 0,
	availability : 0,
	hasSectionImg : false
});

/**
* @name StageModel
* @type {object}
* @desc These are the stage values the view needs
*/
R.model('StageModel', {
	aspectRatio : 0,
	zoom : 100,
	marginLeft : 0,
	marginTop : 0,
	limits : {
		minX : 10000,
		minY : 10000,
		maxX : 0,
		maxY : 0
	}
});

R.model('TicketModel', {
	externalId : '',
	plu : '',
	name : '',
	label : '',
	quantity : 0
});

R.model('TimerModel', {
	id : '',
	time : null,
	callback : null,
	timer : {},
	change : null,
	interval : {}
});

/**
* @name CalendarModel
* @desc a blank calendar
* @type {array}
*/
var date = function(){
	return {
		disabled : true,
		date : null,
		past : true,
		available : false
	};
};

R.model('CalendarModel', [
	[
		[date()], [date()], [date()], [date()], [date()], [date()], [date()]
	],[
		[date()], [date()], [date()], [date()], [date()], [date()], [date()]
	],[
		[date()], [date()], [date()], [date()], [date()], [date()], [date()]
	],[
		[date()], [date()], [date()], [date()], [date()], [date()], [date()]
	],[
		[date()], [date()], [date()], [date()], [date()], [date()], [date()]
	],[
		[date()], [date()], [date()], [date()], [date()], [date()], [date()]
	]
]);

/**
* @class DateModel
* @classdesc a standard date object
* @type {object}
*/
R.model('DateModel', {

	/**
	* @memberof DateModel
	* @name year
	* @type {number}
	*/
	year : null,
	/**
	* @memberof DateModel
	* @name month
	* @type {number}
	*/
	month : null,
	/**
	* @memberof DateModel
	* @name day
	* @type {number}
	*/
	day : null
});

R.service('DatePickerService', [

	// dependencies
	'gtsClass','PageStateService','DateUtilService','ReservedSeatService','DateModel','CalendarModel',function(
	 gtsClass,  PageStateService,  DateUtilService,  ReservedSeatService,  dateModel,  CalendarModel){

	/**
	* @Class DatePickerService
	* @classdesc The DatePickerService takes data from {@link DatePickerController} and sends it to other services
 	*/
	var DatePickerService = gtsClass({

		/**
		* @memberof DatePickerService
		* @function constructor
		* @unitTested
		* @desc The constructor function checks for an eventDate, falling back to current date, then sets that date as the target for the cal
		*/
		constructor : function(){
			var eventDate = PageStateService.getEventDate();
			if(!eventDate.year && !eventDate.month && !eventDate.day){
				eventDate = PageStateService.getCurrentDate();
			}
			this.setTargetDate(DateUtilService.getFirstOfMonth(eventDate));
		},

		loadFirstThreeMonths : ['public', function(callback){
			ReservedSeatService.loadFirstThreeMonths(callback);
		}],

		/**
		* @memberof DatePickerService
		* @access private
		* @desc The targetDate object represents the current date set in the calendar - see {@link DateModel}
		*/
		targetDate : ['private', angular.merge(dateModel, {})],

		/**
		* @memberof DatePickerService
		* @function changeMonth
		* @unitTested 
		* @param {boolean} forward  - defines whether or not we're moving forward or backward
		* @returns {array} {@link DatePickerService.getUnmarkedCalendar|this.getUnmarkedCalendar}.
		* @desc changeMonth gets the {@link DateUtilService.getPrevNextMonth|next month}. Then sends it to {@link DateUtilService.getPrevNextMonth} to determine if its in the past.
		* 		if its not in the past, {@link DatePickerService.setTargetDate|this.setTargetDate}, and return the calendar
		*/
		changeMonth : ['public', function(forward){
			var cd = DateUtilService.getPrevNextMonth(forward, this.getTargetDate()),
				inPast = DateUtilService.inPast(cd, PageStateService.getCurrentDate(), true);

			if(!inPast){
				this.setTargetDate(cd);
				return this.getUnmarkedCalendar();
			}else{
				return false;
			}
		}],

		/**
		* @memberof DatePickerService
		* @function getUnmarkedCalendar
		* @unitTested 
		* @desc getUnmarkedCalendar fills a blank calendar array with the dates for the month - not the events, just dates.
				It validates whether the day is in the past or not.
		* @returns {array} - returns a calendar array - see {@link CalendarModel|}
		*/
		getUnmarkedCalendar : ['public', function(){

			var cal = [];
			angular.copy(CalendarModel, cal);

			var	targetDate = this.getTargetDate(),
				startDay = DateUtilService.getStartDay(targetDate),
				lastDate = DateUtilService.getMonthNumDays(targetDate.month),
				block = 0,
				date = 1,
				hasDate;

			angular.forEach(cal, function(row, index){
				hasDate = false;
				angular.forEach(row, function(day, dayIndex){
					if(block >= startDay && date <= (lastDate)){
						hasDate = true;
						cal[index][dayIndex].disabled = false;
						cal[index][dayIndex].date = date;
						cal[index][dayIndex].past = DateUtilService.inPast({
							year : targetDate.year,
							month : targetDate.month,
							day : date,
						}, PageStateService.getCurrentDate());
						date++;
					}
					block++;
					if(index === 5 && !hasDate){
						//cal.splice(5,1);
					}
				});
			});
			return cal;
		}],

		/**
		* @memberof DatePickerService
		* @access public
		* @function getYear
		* @unitTested
		* @desc getYear gets the {@link DatePickerService.getTargetDate|targetDate}, and returns the year.
		* @returns {number} the target date's year
		*/
		getYear : ['public', function(){
			return this.getTargetDate().year;
		}],

		/**
		* @memberof DatePickerService
		* @access public
		* @function getMonthName
		* @unitTested
		* @returns {string} the name of the month in the targetDate object 
		* @desc getMonthName returns the name of the month in the targetDate object
		*/
		getMonthName : ['public', function(){
			return DateUtilService.getTargetMonthName(this.getTargetDate().month);
		}],

		/**
		* @memberof DatePickerService
		* @access public
		* @param {array} calendar - a calendar - see {@link CalendarModel}
		* @param {function} callback - the callback function
		* @function markCalendar
		* @unitTested
		* @desc markCalendar gets the targetDate, calls {@link ReservedSeatService.getEventDaysForMonth} to get the events.
				It passes in {@link DatePickerService.processDates|this.processDates} as a callback.
		*/
		markCalendar : ['public', function(calendar, callback){
			var td = this.getTargetDate();
			return ReservedSeatService.getEventDaysForMonth(td).then(angular.bind(this, this.processDates, calendar, callback)); 
		}],

		/**
		* @memberof DatePickerService
		* @access public
		* @function selectDate
		* @param {object} date - a date object - see {@link DateModel}
		* @unitTested
		* selectDate is run when a calendar date is selected. It gets the {@link DatePickerService.getTargetDate|targetDate}, sets the new date. Verifies its not {@link DateUtilService.inPast|in the past},
		* 		Then {@link PageStateService.setEventDate|sets the eventDate}.
		*/
		selectDate : ['public', function(date){

			var td = this.getTargetDate(),
				dateObject = {
					year : td.year,
					month : td.month,
					day : date
				},
				inPast = DateUtilService.inPast(dateObject, PageStateService.getCurrentDate(), true);

			if(!inPast){
				PageStateService.setEventDate(dateObject);
			}
		}],

		/**
		* @memberof DatePickerService
		* @access public
		* @function clearPreviousSelection
		* @param {array} cal : a calendar array, see {@link CalendarModel}
		* @returns {array} a calendar array, see {@link CalendarModel}
		* @desc	goes through the calendar and clears all selected days
		*/
		clearPreviousSelection : ['public', function(cal){
			angular.forEach(cal, function(calRow){
				angular.forEach(calRow, function(calItem){
					if(calItem.selected){
						calItem.selected = false;
					}
				});
			});
			return cal;
		}],

		/**
		* @memberof DatePickerService
		* @access private
		* @function setTargetDate
		* @unitTested
		* @param {object} date - a object containing a date - see {@link dateModel}
		* setTargetDate updates {@link DatePickerService.targetDate|this.targetDate}.
		*/
		setTargetDate : ['private', function(date){
			this.targetDate = angular.merge(dateModel, date);
		}],

		/**
		* @memberof DatePickerService
		* @access private
		* @function getTargetDate
		* @desc gets the current target date
		* @returns {object} Returns the {@link DatePickerService.targetDate|this.targetDate}
		* @unitTested
		*/
		getTargetDate : ['private', function(){
			return this.targetDate;
		}],

		/**
		* @memberof DatePickerService
		* @access private
		* @function processDates
		* @param {array} cal - a dated, but not marked, calendar - see {@link CalendarModel}
		* @param {function} callback - a callback function
		* @param {object} response - a response from the API - not deferred
		* @desc takes an array of dates, loops through calendar and selects the dates, then runs the callback
		* @returns {array} cal - returns the marked calendar
		*/
		processDates : ['private', function(cal, callback, response){

			if(cal && response.data.EventDates.length){
				var date = this.getTargetDate();
				angular.forEach(cal, function(row, ri){
					angular.forEach(row, function(day, di){
						angular.forEach(response.data.EventDates, function(rDate){

							var dayString = rDate.Date.split('T')[0],
								dayObject = {
									year : parseFloat(dayString.split('-')[0]),
									month : parseFloat(dayString.split('-')[1]),
									day : parseFloat(dayString.split('-')[2])
								};
						
							if(!day.past){
								if(dayObject.year == date.year && dayObject.month == (date.month + 1) &&  dayObject.day == day.date){
									cal[ri][di].available = true;
									return false;
								}
							}
						}); 
					});
				});
			}
			callback(cal, response.data.EventDates.length);
		}]
	});

	return new DatePickerService();

}]);

R.service('DateUtilService', ['gtsClass', 'DateModel', function(gtsClass, dateModel){

	var el = document.querySelectorAll('[data-months]')[0];
	var m = el.attributes['data-months'].value;

	/**
	* @constant
	*/
	var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
		MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'],
		DAYS_IN_MONTHS = [31,28,31,30,31,30,31,31,30,31,30,31];

	m = m.split(',');

	if(m.length === 12){
		MONTHS = m;
	}

	/**
	* @class DateUtilService
	* @classdesc something interesting
	*/
	var DateUtilService = gtsClass({

		/**
		* @memberof DateUtilService
		* @access private
		* @function getDate
		* @param {string|number} year : the year
		* @param {string|number} day : the month
		* @param {string|number} month : the day
		* @desc The getDate function takes year, month, and day and turns them into a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date|native Date object}, which is then send to {@link DateUtilService.buildDateObject|buildDateObject}
		*/
		getDate : [function(year, day, month){
			var date;
			if(year !== undefined){
				if(month !== undefined){
					if(day !== undefined){
						date = new Date(year,month,day);
					}else{
						date = new Date(year,month, 1);
					}
				}else{
					date = new Date(year, 0, 1);
				}
			}else{
				date = new Date();
			}

			return this.buildDateObject(date);
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @function getFirstOfMonth
		* @memberof DateUtilService
		* @desc takes a date object and sets the day to 1
		*/
		getFirstOfMonth : [function(date){
			date.day = 1;
			return date;
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @memberof DateUtilService
		* @function getMonthNumDays
		* @desc getMonthNumDays takes the month (the month key) and the year, and returns the number of days in that month. year is required to check for leap year. see DAYS_IN_MONTHS above
		*/
		getMonthNumDays : [function(month, year){
			if(month === 1 && this.isLeapYear(year)){ // feb
	 			return DAYS_IN_MONTHS[month] + 1;
			}
			return DAYS_IN_MONTHS[month];
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @function getStartDay
		* @param {object} targetDateObject is a js object that looks like: {year : 2014, month : 7, day : 28}
		* @desc getStartDay takes a date object and returns the array key for the day of the week that the month starts on
		*/
		getStartDay : [function(targetDateObject){
			return this.reverseDateObject(targetDateObject).getDay();
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @function inPast
		* @param {object} targetDateObject is a js object that looks like: {year : 2014, month : 7, day : 28}
		* @param {object} currentDateObject is a js object that looks like: {year : 2014, month : 7, day : 28}
		*/
		inPast : [function(targetDateObject, currentDateObject, sc){

			if(targetDateObject.year !== currentDateObject.year){
				return (targetDateObject.year < currentDateObject.year);
			}
			if(targetDateObject.month !== currentDateObject.month){
				return (targetDateObject.month < currentDateObject.month);
			}
			if(targetDateObject.day !== currentDateObject.day){
				return (targetDateObject.day <= currentDateObject.day);
			}
			return false;
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @function getTargetMonthName
		* @param {num} month : the MONTHS array key - see MONTHS above
		* @desc getTargetMonthName returns the name of the month
		*/
		getTargetMonthName : [function(month){
			return MONTHS[month];
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @function getFirstDayOfNextMonth
		* @param {object} targetDateObject is a js object that looks like: {year : 2014, month : 7, day : 28}
		* @desc getFirstDayOfNextMonth returns the a similar date object, but with the day set to the first day of the next month
		*/ 
		getFirstDayOfNextMonth : [function(targetDateObject){
			return angular.merge(dateModel, this.getPrevNextMonth(true, targetDateObject));
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @function getPrevNextMonth
		* @param {boolean} forward : whether to move forward and backward
		* @param {object} td : a date object - see dateModel
		* @desc : take the date passes in and the direction and return the next/prev month
		*/
		getPrevNextMonth : [function(forward, td){
			var date = {
				year : td.year,
				month : td.month,
				day : 1
			};

			if(forward){
				if(date.month < 11){
					date.month++;
				}else{
					date.year = this.getPrevNextYear(forward, date).year;
					date.month = 0;
				}
			}else{
				if(date.month > 0){
					date.month--;
				}else{
					date.year = this.getPrevNextYear(forward, date).year;
					date.month = 11;
				}
			}
			return date;
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @function getEndOfDay
		* @param {object} date : date object - see dateModel
		* @desc : takes a date object, and returns the beginning of the next day
		*/
		getEndOfDay : [function(date){
			return this.getPrevNextDay(true, date);
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @function getDateString
		* @param {object} dateObject : dateObject - see dateModel
		*/
		getDateString : [function(dateObject){
			return this.getTargetMonthName(dateObject.month) + ' ' + dateObject.day + ', ' + dateObject.year;
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @memberof DateUtilService
		* @function isLeapYear
		* @desc isLeapYear takes the year param, and determines if its a leap year
		*/
		isLeapYear : ['private', function(year){
			if(year % 4 === 0){
				if(year % 100 === 0){
					if(year % 400 === 0){
						return true;
					}
					return false;
				}
				return true;
			}
			return false;
		}],

		/**
 		* @memberof DateUtilService
 		* @access public
 		* @function getPrevNextDay
 		* @param {boolean} forward : whether to move forward and backward
 		* @param {object} td : a date object - see dateModel
 		* @desc : take the date passed in and the direction and return the next/prev day's date object
 		*/
 		getPrevNextDay : ['private', function(forward, td){
			var date = {
					year : td.year,
					month : td.month,
					day : td.day
				},
				next;
			if(forward){
				if(date.day < this.getMonthNumDays(date.month, date.year)){
					date.day++;
				}else{
					date.day = 1;
					next = this.getPrevNextMonth(forward, date);
					date.month = next.month;
					date.year = next.year;
				}
			}else{
				if(date.day === 1){
					date.day = this.getMonthNumDays(date.month, date.year);
					next = this.getPrevNextMonth(forward, date);
					date.month = next.month;
					date.year = next.year;
				}else{
					date.day--;
				}
			}
			return date;
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @function getFollowingMonth
		* @param {object}
		* @desc  takes a date object and returns the next month
		*/
		getFollowingMonth : ['private', function(date){
			var year = date.year,
				month = date.month;
			if(month === 11){
				year = year + 1;
				month = 0;
			}else{
				month = month + 1;
			}
			return {
				year : year,
				month : month,
				day : 1
			};
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @function getPrevNextYear
		* @param {boolean} forward : whether to move forward and backward
		* @param {object} td : a date object - see dateModel
		* @desc : take the date passes in and the direction and return the next/prev year
		*/
		getPrevNextYear : ['private', function(forward, date){
			var td = {
				year : date.year,
				month : 1,
				day : 1
			};
			if(forward){
				td.year++;
			}else{
				td.year--;
			}
			return td;
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @memberof DateUtilService
		* @function buildDateObject
		* @param {object} object - native javascript Date object
		* @desc this function takes a native JS Date object, and returns a standard object
		*/
		buildDateObject : ['private', function(object){
			var o = {
				year : object.getFullYear(),
				month : object.getMonth(),
				day : object.getDate()
			};

			return angular.merge(dateModel, o);
		}],

		/**
		* @memberof DateUtilService
		* @access public
		* @memberof DateUtilService
		* @function
		* @param {object} dateObject - a dateModel DateModel
		* @desc takes a JS object and returns the native JS Date object for it. 
		*/
		reverseDateObject : ['private', function(dateObject){
			return new Date(dateObject.year, dateObject.month, dateObject.day);
		}],
 
		/**
		* @memberof DateUtilService
		* @access private
		* @function getDateSuffix
		* @param {number} date : the date number
		*/
		getDateSuffix : ['private', function(date){
				
			var suffix;

			switch(date){
				case 1:
				case 21:
				case 31:
					suffix = 'st';
					break;

				case 2:
				case 22:
					suffix = 'nd';
					break;

				case 3:
				case 23:
					suffix = 'rd';
					break;
				default:
					suffix = 'th';
					break;
			}

			return suffix;
		}],

	});

	return new DateUtilService();
}]);

R.service('EventTypePickerService', [

	// dependencies
	'gtsClass','PageStateService','ReservedSeatService','DateUtilService',function(
	 gtsClass,  PageStateService,  ReservedSeatService,  DateUtilService){

	/**
	* @Class EventTypePickerService
	* @classdesc The EventTypePickerServices takes data from {@link EventTypePickerController} and sends it to other services
 	*/
	var EventTypePickerService = gtsClass({

		/**
		* @memberof EventTypePickerService
		* @access public
		* @function getEventDate
		* @returns {object} the eventDate
		* @desc getEventDate returns the selected eventDate from {@link PageStateService.getEventDate}
		*/
		getEventDate : ['public', function(){
			return PageStateService.getEventDate();
		}],

		/**
		* @memberof EventTypePickerService
		* @access public
		* @param {object} eventDate - a date object - see {@link DateModel}
		* @param {function} callback - a callback function
		* @function  getEvents
		* @returns {object} The deferred request
		* @desc getEvents calls {@link ReservedSeatService.getEventsForDay}, and passes callback as the callback function
		*/
		getEvents : ['public', function(eventDate, callback){			
			ReservedSeatService.getEventsForDay(eventDate).then(angular.bind(this, this.formatEvents, callback));
		}],

		formatEvents : ['private', function(callback, response){

			var events = [];

			angular.forEach(response.data.Events, function(event, i){
				events.push({
					id : event.Id,
					time : event.StartDateTime.split('T')[1]
				});

				ReservedSeatService.getPriceLevels(event.Id).then(function(plResponse){

					// store the info
					events[i].priceLevels = plResponse.data.PriceLevels;

					var min, max, flag = true;

					angular.forEach(plResponse.data.PriceLevels, function(priceLevel){
						angular.forEach(priceLevel.Details, function(plu){
							if(!min || plu.Price < min){
								min = plu.Price;
							}
							if(!max || plu.Price > max){
								max = plu.Price;
							}
						});
					});

					events[i].priceRange = {
						min : min,
						max : max
					};

					angular.forEach(events, function(iEvent){
						if(angular.isEmpty(iEvent.priceRange)){
							flag = false;
							return false;
						}
					});
					if(flag){
						callback(events);
					}
				});
			});
		}],

		/**
		* @memberof EventTypePickerService
		* @access public
		* @function getDateString
		* @desc get the date from {@link PageStateService.getEventDate} and send it to {@link DateUtilService.getDateString}. Return the result
		* @returns {string} the date string
		*/
		getDateString : ['public', function(){
			var date = PageStateService.getEventDate();
			return DateUtilService.getDateString(date);
		}],

		/**
		* @memberof EventTypePickerService
		* @access public
		* @function setEvent
		* @param {number} id : the eventId
		* @desc setEvent sends the eventId to {@link PageStateService.setEvent}
		* @returns {number} The eventId
		*/
		setEvent : ['public', function(event){
			PageStateService.setPriceLevels(event.priceLevels);
			this.event = event;
			return PageStateService.setEventId(event.id);
		}],

		getEvent : ['public', function(){
			return this.event;
		}]

	});

	return new EventTypePickerService();

}]);

R.service('MapService', [

	// dependencies
	'gtsClass','Communicator','SeatsService','StageService','SectionsService','ZoomService','PageStateService','ReservedSeatService','OptionsService','ObjectsService','ApplicationSettings', function(
	 gtsClass,  Communicator,  SeatsService,  StageService,  SectionsService,  ZoomService,  PageStateService,  ReservedSeatService,  OptionsService,  ObjectsService,  ApplicationSettings){

	/**
	* @class MapService
	* @classdesc MapService is responsible for calling many services, which coordinate getting section and seat data, and then parsing that data to create the stage, sections, and seats.
	*/
	var MapService = gtsClass({

		/**
		* @memberof MapService
		* @access private
		* @type {array}
		* @name priceLevels
		* @desc the array of price levels
		*/
		priceLevels : ['private', []],

		/**
		* @memberof MapService
		* @function getSectionData
		* @param {function} callback - the callback function
		* @desc getSectionData calls {@link ReservedSeatService.getSectionMap}. It assigns {@link MapService.calculate} to run on success (passes callback), and on error runs callback(false)
		*/
		getSectionData : ['public', function(callback){
			ReservedSeatService.getSectionMap().then(angular.bind(this, this.calculate, callback), callback(false));
		}],

		/**
		* @memberof MapService
		* @function selectSection
		* @param {object} section - a section object - see {@link SectionModel}
		* @desc this function called by a controller, who passes in a section object. Send the section to {@link SectionsService.setSection}. Send the section, along with the {@link StageService.getStage|stage} to {@link ZoomService.zoom}
		*/
		selectSection : ['public', function(section){
			if(section && section.availability === 'none'){
				// do nothing
			}else{
				this.clearOptions();
				SectionsService.setSection(section);
				ZoomService.resetZoom();
			}
		}],

		clearSection : ['public', function(){
			this.clearOptions();
			SectionsService.setSection(null);
			ZoomService.resetZoom();
		}],

		/**
		* @memberof MapService
		* @function getSeatData
		* @param {function} callback - a callback function
		* @desc call {@ReservedSeatService.getSeats}, and {@link ReservedSeatService.getBestAvailable}. Once any of these is done, check to see if the other is done too, then call {@link MapService.dataDone}
		*/
		getSeatData : ['public', function(callback){
			var one, two, self = this;
			ReservedSeatService.getSeats().then(function(seatData){
				one = seatData.data;
				if(two){
					self.dataDone(callback, one, two);
				}
			});
			ReservedSeatService.getBestAvailable().then(function(bestAvailData){
				two = bestAvailData.data;
				if(one){
					self.dataDone(callback, one, two);
				}
			});
		}],

		/**
		* @memberof MapService
		* @function setOption
		* @param {number} optionId - the selected option Id
		* @returns the result of {@link OptionsService.setCurrentOption}
		* @desc setOption gets the currently selected option from {@link OptionsService}
		*/
		setOption : ['public', function(option){
			return OptionsService.setCurrentOption(option);
		}],

		/**
		* @memberof MapService
		* @function clearOptions
		* @returns the result of {@link OptionsService.clearOptions}
		*/ 
		clearOptions : ['public', function(){

			var options = OptionsService.clearOptions();
			this.releaseSeats();
			return options;
		}],

		/**
		* @memberof MapService
		* @function getNextOption
		* @param {number} currentOptionId - the id of the current option
		* @desc send currentOptionId to {@link OptionsService.getNextOption} to get the next option. Call {@link OptionsService.mark}, sending it the {@link SeatsService.getSeats | seats} and the section {@link SectionsService.getSection}
		* @returns the next option - see {@link OptionModel}
		*/			
		getNextOption : ['public', function(){
			var op = OptionsService.getNextOption(this.getOption().id);
			OptionsService.mark(SeatsService.getSeats(), SectionsService.getSection());
			return op;
		}],

		/**
		* @memberof MapService
		* @function getAdjustments
		* @returns the result of {@link SectionsService.getAdjustments}
		*/
		getAdjustments : ['public', function(){
			return SectionsService.getAdjustments();
		}],

		/**
		* @memberof MapService
		* @function releaseSeats
		* @desc send the {@link OptionsService.getHolds|holds} to {@link ReservedSeatService.releaseSeats} to release the seats. 
		*/
		releaseSeats : ['public', function(){

			var holds = OptionsService.getHolds();
			if(holds && holds.length){
				ReservedSeatService.releaseSeats(OptionsService.getHolds()).then();
				OptionsService.clearHolds();
			}
		}],

		/**
		* @memberof MapServive
		* @function getSections
		* @returns the {@link SectionsService.getSections|sections}
		*/
		getSections : ['public', function(){
			var sections = SectionsService.getSections();
			PageStateService.setSections(sections);
			return sections;
		}],

		/**
		* @memberof MapService
		* @function getSection
		* @returns the {@link SectionsService.getSection|current section}.
		*/
		getSection : ['public', function(){
			return SectionsService.getSection();
		}],

		/**
		* @memberof MapService
		* @function getStage
		* @returns the {@link StageService.getStage|stage};
		*/
		getStage : ['public', function(){
			return StageService.getStage();
		}],

		/**
		* @memberof MapService
		* @function getSeats
		* @returns the {@link SeatsService.getSeats|seats}.
		*/
		getSeats : ['public', function(){
			return SeatsService.getSeats();
		}],

		/**
		* @memberof MapService
		* @function getCoords
		* @returns {@link OptionsService.getCoords|option coordinates}
		*/
		getCoords : ['public', function(){
			return OptionsService.getCoords();
		}],

		/**
		* @memberof MapService
		* @function getOption
		* @returns the {@link OptionsService.getCurrentOption|current option}
		*/
		getOption : ['public', function(){
			var option = OptionsService.getCurrentOption();
			return option;
		}],

		/**
		* @memberof MapService
		* @function getOptions
		* @returns the {@link OptionsService.getOptions|array of options}
		*/
		getOptions : ['public', function(){
			return OptionsService.getOptions();
		}],

		getObjects : ['public', function(){
			return ObjectsService.getObjects();
		}],

		getObjectLegend : ['public', function(){
			return ObjectsService.getObjectLegend();
		}],

		/**
		* @memberof MapService
		* @function getPriceLevelData
		* @demo
		* @desc	make a call to {@Link ReservedSeatService.getPriceLevels}, then store them in {@link MapService.priceLevels}
		*/
		getPriceLevelData : ['public', function(){
			ReservedSeatService.getPriceLevels().then(angular.bind(this, function(response){
				this.priceLevels = response.data.PriceLevels;
			}));
		}],

		/**
		* @memberof MapService
		* @function getPriceLevels
		* @desc	return {@MapService.priceLevels|price levels}
		*/
		getPriceLevels : ['public', function(){
			return this.priceLevels;
		}],

		/**
		* @memberof MapService
		* @function getMoreTime
		* @param {function} callback - the callback function
		* @desc	make a call to {@ReservedSeatService.requestMoreTime}, then run the callback with the time
		*/
		getMoreTime : ['public', function(){
			ReservedSeatService.requestMoreTime().then(function(response){
				Communicator.send('moreTime', response.data);
			}, function(){
				Communicator.send('moreTime', null);
			});
		}],

		/**
		* @memberof MapService
		* @access private
		* @function calculate
		* @param {function} callback - a callback function
		* @param {object} data - an object of data, which is the response from an ajax reqest
		* @desc send data to {@link StageService.build}, which calculates the stage. send data to {@link SectionsService.build}, which calculates the sections. then run callback(true), true meaning success.
		*/
		calculate : ['private', function(callback, data){

			StageService.build(data.data);
			SectionsService.build(data.data);
			ObjectsService.build(data.data);
			callback(true);
		}],

		/**
		* @memberof MapService
		* @access private
		* @function dataDone
		* @param {function} callack - the callback function
		* @param {object} seatData - the response from the seat call
		* @param {object} bestAvailData - the response from the best available call
		* @desc	Take the sessionId and timeout from bestAvailData, and send it to {@link PageStateService.setSessionInfo}. Then send the seats, {@link SectionsService.getSection|section}, and the {@link StageService.getStage|stage} to {@link SeatsService.translate}. Then send bestAvailData to {@link MapServie.createOptions}. Finally, run the callback, passing the result of creating the options
		*/
		dataDone : ['private', function(callback, seatData, bestAvailData){

			PageStateService.setSessionInfo({
				id : bestAvailData.SessionId,
				timeout : bestAvailData.SessionTimeout
			});

			SeatsService.translate(seatData, SectionsService.getSection(), StageService.getStage());

			var option = this.createOptions(bestAvailData);
			ZoomService.zoom(option);
			callback(option);
		}],

		/**
		* @memberof MapService
		* @function mark
		* @desc mark asks {@link SeatsService.getSeats} for seats, and {@link SectionService.getSection} for the section, and sends them to {@link OptionsService.mark}.
		*/
		mark : ['public', function(){
			var seats = SeatsService.getSeats();
			var section = SectionsService.getSection();
			OptionsService.mark(seats, section);
		}],

		/**
		* @memberof MapService
		* @access private
		* @function createOptions
		* @param {object} response - the ajax response for best available
		* @returns the result of {@link OptionsService.createOptions}, passing in the seat data, and the price level data
		*/
		createOptions : ['private', function(response){
			return OptionsService.createOptions(response.Options, this.priceLevels);
		}],

		setSectionView : ['public', function(override){
			var sectionUrl = (typeof override !== 'undefined') ? override : ReservedSeatService.getSectionImgUrl();
			PageStateService.setSectionUrl(sectionUrl);
			return sectionUrl;
		}],

		getEventId : ['public', function(){
			return PageStateService.getEventId();
		}],

		haveQuantity : ['public', function(){
			return (PageStateService.getTicketQuantity() === null);
		}],

		markSectionAsUnavailable : ['public', function(){
			var section = SectionsService.getSection();
			section.availability = 'none';
		}]
	});

	return new MapService();
}]);

R.model('ObjectModel', {
	top : 0,
	left : 0,
	height : 0,
	width : 0,
	name : 0,
	kind : 0,
	color: ''
});

R.service('ObjectsService', [

	'gtsClass','ObjectModel','StageService',function(
	 gtsClass,  ObjectModel,  StageService  ){

	var ObjectsService = gtsClass({

		objects : ['private', []],

		objectsLegend : ['private', []],

		build : ['public', function(data){

			this.objects = [];
			this.objectsLegend = [];

			var stage = StageService.getStage();

			angular.forEach(data.Objects, angular.bind(this, function(object){

				var formattedObject = angular.merge(ObjectModel, {
					left : ((object.CoordinateX - stage.limits.minX) / stage.limits.width) * 100,
					top : ((object.CoordinateY - stage.limits.minY) / stage.limits.height) * 100,
					height : (object.Height / stage.limits.height) * 100,
					width : (object.Width / stage.limits.width) * 100,
					color : object.Color,
					name : object.Description,
					kind : object.Kind
				});

				this.objects.push(formattedObject);

				var add = true;
				angular.forEach(this.objectsLegend, angular.bind(this, function(legendObject){
					if(formattedObject.name === legendObject.name && formattedObject.color === legendObject.color){
						add = false;
						return false;
					}
				}));
				if(add && formattedObject.name){
					this.objectsLegend.push({
						name : formattedObject.name,
						color : formattedObject.color
					});
				}
			}));
		}],

		getObjectLegend : ['public', function(){
			return this.objectsLegend;
		}],

		getObjects : ['public', function(){
			return this.objects;
		}],

	});

	return new ObjectsService();

}]);

R.service('OptionsService', [

	'gtsClass','OptionModel','PageStateService',function(
	 gtsClass,  OptionModel,  PageStateService ){
		
	/**
	* @class OptionsService
	* @classdesc The OptionsService exists to create/update seat options. You send seats and it will split them into their options.
				It will also calculate where the options tooltip should be located in relation to the seat locations. This service is mostly called by {@link MapService}
	*/
	var OptionsService = gtsClass({

		/**
		* @memberof OptionsService
		* @type array
		* @desc the seats currently held
		*/
		holds : ['private', []],

		/**
		* @memberof OptionsService
		* @access private
		* @array
		* @desc	the list of stages
		*/
		options : ['private', []],

		/**
		* @memberof OptionsService
		* @access private
		* @type object
		* @desc the coordinates for the group tooltip
		*/
		coords : ['private', {
			left :  0,
			top : 0,
			childTop : '',
			childBottom : '',
			childLeft : '',
			childRgith : ''
		}],

		/**
		* @memberof OptionsService
		* @access private
		* @object
		* @desc the current option
		*/
		currentOption : ['private', angular.merge(OptionModel, {})],

		/**
		* @memberof OptionsService
		* @access public
		* @function
		* @param {number} groupId : the target group Id
		* @desc	getGroup returns either a single group if supplied a groupId and all the groups if not
		*/
		getOption : ['public', function(optionId){
			if(optionId){
				angular.forEach(this.options, angular.bind(this, function(option){
					if(optionId === option.Id){
						this.currentOption = option;
						return false;
					}
				}));
				return this.currentOption;
			}else{
				return this.options;
			}
		}],

		/**
		* @memberof OptionsService
		* @access public
		* @function
		* @param {object} a group object - see groupModel
		*/
		addOption : ['public', function(option){
			this.options.push(option);
		}],

		/**
		* @memberof OptionsService
			* @access public
		* @function
		* @desc	clearGroups removes the groups
		*/
		clearOptions : ['public', function(){
			this.currentOption = null;
			this.options = [];
			PageStateService.setOptions([]);
			return this.options;
		}],

		/**
		* @memberof OptionsService
		* @access public
		* @function
		* @desc	returns the current group
		*/
		getCurrentOption : ['public', function(){
			return this.currentOption;
		}],

		/**
		* @memberof OptionsService
		* @access public
		* @function
		* @param {object} group: a group object - see groupModel
		* @desc	set currentGroup to the passed in group
		*/
		setCurrentOption : ['public', function(option){

			var targetOption = {};
			angular.forEach(this.options, function(optionObj){
				if(option == optionObj.id){
					targetOption = optionObj;
					return false;
				}
			});

			this.addDetails(targetOption);
			this.matchPreselectedTicketTypes(targetOption);

			this.setOption(targetOption);

			return this.currentOption;
		}],

		setOption : ['public', function(option){
			this.currentOption = option;
			PageStateService.setOption(this.currentOption);
		}],

		addDetails : ['private', function(option){
			var seatDetails = option.seatDetails = [],
				priceLevels = PageStateService.getPriceLevels(),
				priceLevelIds = [],
				quantities = PageStateService.getTicketQuantity(),
				attrs = [];

			angular.forEach(quantities, angular.bind(this, function(q){
				attrs.push(q.name);
			}));			

			angular.forEach(option.seats, angular.bind(this, function(seat){
				if(angular.inArray(seat.priceLevel, priceLevelIds) === -1){
					priceLevelIds.push(seat.priceLevel);
				}

				var seatObject = {
					id : seat.id,
					name : seat.name,
					string : option.section+'-'+option.row+'-'+seat.name,
				};

				var possiblePlus = [];

				angular.forEach(priceLevels, angular.bind(this, function(pl){
					if(seat.priceLevel === pl.Id){
						angular.forEach(pl.Details, angular.bind(this, function(type){
							if(angular.inArray(type.ProductCategory, attrs) > -1){
								possiblePlus.push({
									plu : type.Plu,
									price : type.Price,
									cat : type.ProductCategory
								});

								seatObject.possiblePlus = possiblePlus;
							}
						}));
					}
				}));

				seatDetails.push(seatObject);
			}));

			option.samePriceLevel = (priceLevelIds.length === 1);
			option.sameAttrs = (attrs.length === 1);
		}],

		matchPreselectedTicketTypes : ['private', function(option){

			var attrs = [],
				quantities = PageStateService.getTicketQuantity();

			angular.forEach(quantities, angular.bind(this, function(q){
				for (var i = 1; i <= parseFloat(q.quantity); i++) {
					attrs.push(q.name);
				}
			}));

			if(option.samePriceLevel){
				angular.forEach(option.seatDetails, angular.bind(this, function(seat, seatIndex){
					angular.forEach(seat.possiblePlus, angular.bind(this, function(ticketType){
						if(ticketType.cat === attrs[seatIndex]){
							seat.plu = ticketType.plu;
							seat.price = ticketType.price;
							seat.cat = attrs[seatIndex];
							return false;
						}
					}));
				}));
			}else if(option.sameAttrs){
				angular.forEach(option.seatDetails, angular.bind(this, function(seat, seatIndex){
					seat.plu = seat.possiblePlus[0].plu;
					seat.price = seat.possiblePlus[0].price;
					seat.cat = attrs[0];
				}));
			}else{
				angular.forEach(option.seatDetails, angular.bind(this, function(seat, seatIndex){
					var match = false;

					angular.forEach(seat.possiblePlus, angular.bind(this, function(pp){
						if(pp.cat === attrs[seatIndex]){
							seat.cat = pp.cat;
							seat.plu = pp.plu;
							seat.price = pp.price;
							return false;
						}
					}));
				}));
			}
		}],

		/**
		* @memberof OptionsService
		* @access public
		* @function
		* @param {array} seats : the array of seats 
		* @desc	create options takes an array of best available seats and creates an array of the seat options
		*/
		createOptions : ['public', function(options){

			var priceLevels = PageStateService.getPriceLevels(),
				optionObject,
				holds = this.holds = [];

			angular.forEach(options, angular.bind(this, function(option){
				optionObject = angular.copy(OptionModel);
				optionObject.id = option.Id;
				optionObject.section = option.Seats[0].Section;
				optionObject.row = option.Seats[0].Row;
				optionObject.seats = [];
				optionObject.seatString = '';
				angular.forEach(option.Seats, function(seat, seatIndex){
					holds.push({SeatId : [seat.Section, seat.Row, seat.Seat].join('-')});
					optionObject.seatString += seat.Seat;
					if(seatIndex !== option.Seats.length - 1){
						optionObject.seatString += ',';
					}

					optionObject.seats.push({
						priceLevel : seat.EventPriceId,
						id : seat.Id,
						name : seat.Seat,
						coords : {
							x : seat.CoordinateX,
							y : seat.CoordinateY
						}
					});
				});

				this.addOption(optionObject);
			}));

			PageStateService.setOptions(this.options);
			return this.setCurrentOption(this.options.length ? this.options[0].id : null);
		}],

		/**
		* @memberof OptionsService
		* @access public
		* @function
		* @param {array} seat : the seats
		* @param {object} section : the section
		*/
		mark : ['public', function(seats, section){

			var optionSet = this.getCurrentOption(),
				oLimits = {
					minX : 100,
					minY : 100,
					maxX : 0,
					maxY : 0
				};

			angular.forEach(seats, function(seat){
				seat.available = false;
				angular.forEach(optionSet.seats, function(optionSeat){
					if(optionSeat.id === seat.id){

						oLimits.minX = (seat.x < oLimits.minX) ? seat.x : oLimits.minX;
						oLimits.minY = (seat.y < oLimits.minY) ? seat.y : oLimits.minY;
						oLimits.maxX = (seat.x > oLimits.maxX) ? seat.x : oLimits.maxX;
						oLimits.maxY = (seat.y > oLimits.maxY) ? seat.y : oLimits.maxY;
						seat.available = true;
						return false;
					}
				});
			});

			var details = {
				left :  oLimits.minX,
				top : oLimits.minY,
				childTop : '0',
				childBottom : null,
				childLeft : '0',
				childRight : null
			};

			if(oLimits.minX < (100 - oLimits.maxX)){
				details.left = oLimits.maxX + section.pointDiameter;
			}else{
				details.childLeft = null;
				details.childRight = '0';
			}
			if(oLimits.minY < (100 - oLimits.maxY)){
				details.top = oLimits.maxY + (section.pointDiameter / (section.aspectRatio / 100));
			}else{
				details.childTop = null;
				details.childBottom = '0';
			}

			this.coords = details;
		}],

		/**
		* @memberof OptionsService
		* @access public
		* @function
		* @param {}  : 
		*/
		getNextOption : ['public', function(id){

			var options = this.options,
				tIndex;

			angular.forEach(options, function(option, index){
				if(option.id === id){
					tIndex = index;
					return false;
				}
			});

			if(tIndex >= options.length - 1){
				tIndex = 0;
			}else{
				tIndex = tIndex + 1;
			}
			return this.setCurrentOption(options[tIndex].id);
		}],

		/**
		* @memberof OptionsService
		* @access public
		* @function
		* @desc	returns the options array
		*/
		getOptions : ['public', function(){
			return this.options;
		}],

		/**
		* @memberof OptionsService
		* @access public
		* @function
		* @desc	returns the current holds
		*/
		getHolds : ['public', function(){
			return this.holds;
		}],

		clearHolds : ['public', function(){
			this.holds = [];
			return this.holds;
		}],

		/**
		* @memberof OptionsService
		* @access public
		* @function
		* @desc	return the optiuon coordinates
		*/
		getCoords : ['public', function(){
			return this.coords;
		}],

	});

	return new OptionsService();

}]);

/*jshint -W084 */

R.service('PageStateService', [

	// dependencies
	'gtsClass','PageStateModel','DateUtilService','Communicator','ApplicationSettings', function(
	 gtsClass,  PageStateModel,  DateUtilService,  Communicator,  ApplicationSettings){

	/**
	* @class PageStateService
	* @classdesc PageStateService exists to manage the current user selections. Each module manages its own state, like total seats, stage data, etc,
			but PageStateService exists to manage the final selections. This service also {@link Communicator|Communicates} out all state changes
	*/
	var PageStateService = gtsClass({

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* starts by setting the current date
		*/
		constructor : function(){
			this.setEventTypeId();
			this.setCurrentDate();
		},

		/**
		* @memberof PageStateService
		* @access private
		* @object
		* @see PageStateModel
		* state is an object that stores the current page state, 
		*/
		state : ['private', angular.copy(PageStateModel)],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @unitTested
		* @returns {number} ticketQuantity
		*/
		getTicketQuantity : [function(){
			return this.state.ticketQuantity;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @unitTested
		* @param {number} tQuantity : ticketQuantity
		* @returns {number} ticketQuantity
		*/
		setTicketQuantity : [function(tQuantity){
			if(this.state.ticketQuantity !== tQuantity){
				this.state.ticketQuantity = tQuantity;
				Communicator.send('ticketQuantity', this.state.ticketQuantity);
			}
			Communicator.send('seatPickerEnabled', (this.state.eventId && tQuantity && tQuantity.length) ? this.state.eventId : null);
			return this.state.ticketQuantity;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @unitTested
		* getCurrentDate retrieves state.currentDate
		*/
		getCurrentDate : ['public', function(){
			return this.state.currentDate;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @unitTested
		* setCurrentDate uses the DateUtilService to set state.currentDate
		*/
		setCurrentDate : ['public', function(){
			this.state.currentDate = DateUtilService.getDate();
			return this.state.currentDate;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @unitTested
		* @desc returns the eventDate from the state object
		*/
		getEventDate : [function(){
			return this.state.eventDate;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @unitTested
		* @desc setEventDate takes the evDate, and if its different than whats in the state object, it sets it, communicates the event, then resets the eventId
		*/
		setEventDate : [function(evDate){
			if((evDate) && (evDate.year !== this.state.eventDate.year || evDate.month !== this.state.eventDate.month || evDate.day !== this.state.eventDate.day)){
				this.state.eventDate = evDate;
			}
			Communicator.send('eventDate', this.state.eventDate);
			this.setEventId(null);
			return evDate;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @unitTested
		* @desc getEventId returns the eventId from the state object
		*/
		getEventId : [function(){
			return this.state.eventId;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @unitTested
		* @desc setEvent sets the eventId on the state object, if its different. Then it sends the eventId signal. It also resets the quantity
		*/
		setEventId : [function(eId){
			this.state.eventId = eId;
			Communicator.send('eventId', this.state.eventId);
			Communicator.send('seatPickerEnabled', (this.state.ticketQuantity && this.state.ticketQuantity.length && eId) ? this.state.eventId : null);
			this.setSection(null);
			return this.state.eventId;
		}],

		setSections : [function(sections){
			this.state.sections = [];
			if(sections && sections.length){
				this.state.sections = sections;
			}
			this.setSection(null);
			Communicator.send('sections', sections);
		}],

		getSections : [function(){
			return this.state.sections;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @unitTested
		* @desc getSection returns the sectionId from the state object
		*/
		getSection : [function(){
			return this.state.section;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @unitTested
		* @desc setSection sets the sectionId on the state object. It then communicates the event
		*/
		setSection : [function(section){
			this.state.section = section;
			Communicator.send('section', section);
			return this.state.section;
		}],

		setOptions : [function(options){
			this.state.options = options;
			Communicator.send('options', options);
			this.setOption(null);
		}],

		getOptions : [function(){
			return this.state.options;
		}],

		setOption : [function(option){
			this.state.option = option;
			Communicator.send('option', option);
		}],

		getOption : [function(){
			return this.state.option;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @param {object} sessionInfoObject : the session info
		* @desc	this function sets the session info property on the page state
		*/
		setSessionInfo : ['public', function(sessionInfoObject){
			Communicator.send('sessionInfo', sessionInfoObject);
			this.state.sessionInfo = sessionInfoObject;
			return this.state.sessionInfo;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @desc	returns sessionInfo
		*/
		getSessionInfo : ['public', function(){
			return this.state.sessionInfo;
		}],

		setEventTypeId : ['private', function(){
			this.state.eventTypeId = ApplicationSettings.eventTypeId;
			return this.state.eventTypeId;
		}],

		getEventTypeId : ['public', function(){
			return this.state.eventTypeId;
		}],

		setPriceLevels : ['public', function(priceLevels){
			this.state.priceLevels = priceLevels;
			return priceLevels;
		}],

		getPriceLevels : ['public', function(){
			return this.state.priceLevels;
		}],

		setSectionUrl : [function(url){
			this.state.sectionUrl = url;
			Communicator.send('sectionUrl', url);
		}]
	});

	return new PageStateService();

}]);

R.service('QuantityPickerService', ['gtsClass', 'PageStateService','TicketModel','ApplicationSettings', 'ReservedSeatService', function(gtsClass, PageStateService, TicketModel, appSettings, ReservedSeatService){

	/**
	* @class QuantityPickerService
	* @classdesc QuantityPickerService is a service which interacts with {@link QuantityPickerController}. The service creates the proper ticket types, validates the quantities, and sends the resulting values to the {@link PageStateService}
	*/
	var QuantityPickerService = gtsClass({

		/**
		* @memberof QuantityPickerService
		* @constructor
		* @function
		* @desc	constructor calls {@link QuantityPickerService.setTicketQuantityLimit|setTicketQuantityLimit} and {@link QuantityPickerService.setTickets|setTickets}
		* @unitTested
		*/
		constructor : function(){
			this.setTicketQuantityLimit();
			//this.setTickets();
		},

		/**
		* @memberof QuantityPickerService
		* @function getTickets
		* @returns {@link QuantityPickerService.tickets|tickets}
		*/
		getTickets : ['public', function(){
			return this.tickets;
		}],

		/**
		* @memberof QuantityPickerService
		* @access public
		* @function setQuantity
		* @desc	returns the ticketQuantity
		* @returns {@link PageStateService.getTicketQuantity}
		* @unitTested
		*/
		getQuantity : ['public', function(){
			return PageStateService.getTicketQuantity();
		}],

		/**
		* @memberof QuantityPickerService
		* @access public
		* @function getEventId
		* @desc hasEventId
		* @returns the result of {@link PageStateService.getEventId}
		* @unitTested
		*/
		getEventId : ['public', function(){
			return PageStateService.getEventId();
		}],

		/**
		* @memberof QuantityPickerService
		* @access public
		* @function setQuantity
		* @desc setQuantity : sets the ticketQuantity
		* @returns {boolean|string} returns false if no errors, otherwise returns the error key string 
		* @unitTested
		*/
		setQuantity : ['public', function(quantity){
			var totals = [],
				total = 0;

			angular.forEach(this.tickets, function(ticket){
				if(parseFloat(ticket.quantity)){
					total = total + parseFloat(ticket.quantity);
					totals.push(ticket);
				}
			});

			if(total <= this.ticketQuantityLimit){
				PageStateService.setTicketQuantity(totals);
				return false;
			}else{
				PageStateService.setTicketQuantity(null);
				return 'tooMany';
			}
		}],

		/**
		* @memberof QuantityPickerService
		* @access private
		* @function getTicketQuantityLimit
		* @returns {@link QuantityPickerService.ticketQuantityLimit|ticketQuantityLimit} 
		*/
		getTicketQuantityLimit : ['private', function(){
			return this.ticketQuantityLimit;
		}],

		/**
		* @memberof QuantityPickerService
		* @access private
		* @type {number}
		* @name ticketQuantityLimit
		* @desc	- ticketQuantityLimit is a number which stores the maximum number of tickets that can be sold through the webstore
		* @unitTested
		*/
		ticketQuantityLimit: ['private', null],

		/**
		* @memberof QuantityPickerService
		* @access private
		* @type {array}
		* @name tickets
		* @desc	tickets stores the different ticket types and their quantities
		*/
		tickets : ['private', []],

		/**
		* @memberof QuantityPickerService
		* @access private
		* @function setTicketQuantityLimit
		* @desc	set {@link QuantityPickerService.ticketQuantityLimit|ticketQuantityLimit} to {@link ApplicationSettings.ticketQuantityLimit}
		*/
		setTicketQuantityLimit : ['private', function(){
			this.ticketQuantityLimit = appSettings.ticketQuantityLimit;
		}],

		/**
		* @memberof QuantityPickerService
		* @access private
		* @function setTickets
		* @desc	loops through {@link ApplicationSettings.ticketTypes} and pushes the ticket type into {@link QuantityPickerService.tickets|tickets}.
		*/
		setTicketTypes : ['public', function(cb){
			var tickets = this.tickets = [];

			if(appSettings.ticketTypes.length > 0){
				angular.forEach(appSettings.ticketTypes, angular.bind(this, function(ticketType){
					tickets.push(angular.merge(TicketModel, ticketType));
				}));
				cb(tickets);
			}else{
				var call = ReservedSeatService.getTicketTypes();

				call.then(angular.bind(this, function(data){
					var returnedTickets = data.data.ProductCategories;
					if(returnedTickets.length > 0){
						angular.forEach(data.data.ProductCategories, angular.bind(this, function(ticketType){
							var ticket = {
								name : ticketType.Value,
								label : ticketType.Description
							};

							var inArray = false;
							angular.forEach(tickets, function(currentTicket){
								if(currentTicket.name === ticket.name && ticket.label === currentTicket.label){
									inArray = true;
									return false;
								}
							});

							if(!inArray){
								tickets.push(angular.merge(TicketModel, ticket));
							}
						}));
					}else{
						tickets.push(angular.merge(TicketModel, {
							name : 'General Admission',
							label : 'General'
						}));
					}
					cb(tickets);
				}));

				call.error(function(){
				});
			}
		}]
	});

	return new QuantityPickerService();

}]);

R.service('ReservedSeatService', [

	'gtsClass','PageStateService','DateUtilService','x','ApplicationSettings',function(
	 gtsClass,  PageStateService,  DateUtilService,  x,  ApplicationSettings){

	/**
	* @class ReservedSeatService
	* @classdesc ReservedSeatService processes all ajax requests to the server. Each call has a method, which gets the proper data from the {@link PageStateService},
			and it uses {@link X|X} to actually send/receive the data
	*/
	var ReservedSeatService = gtsClass({

		/**
		* @memberof ReservedSeatService
		* @access private
		* @function loadFirstThreeMonths
		* @desc gets the {@link PageStateService.getCurrentDate|current date} and for this month, plus the next two, it calls {@link ReservedSeatService.getEventDaysForMonth|this.getEventDaysForMonth}.
		*/
		loadFirstThreeMonths : ['public', function(callback){
			var cd = PageStateService.getCurrentDate();

			var date = {
					year : cd.year,
					month : cd.month,
					day : 1
				};
			this.getEventDaysForMonth(date).error(callback);
			date = DateUtilService.getPrevNextMonth(true, date);
			this.getEventDaysForMonth(date).error(callback);
			date = DateUtilService.getPrevNextMonth(true, date);
			this.getEventDaysForMonth(date).error(callback);
		}],

		/**
		* @memberof ReservedSeatService
		* @access public
		* @function getEventsForDay
		* @param {object} date - see {@link DateModel}
		* @desc calls {@link x.get} to get the events and returns the call
		* @returns {object} a promise object
		*/
		getEventsForDay : ['public', function(date){
			var startString = this.formatDateTime(date),
				endString = this.formatDateTime(DateUtilService.getEndOfDay(date)),
				params = {
					startDateTime : startString,
					endDateTime : endString
				};
			return x.get(['Events'], params);
		}],

		/**
		* @memberof ReservedSeatService
		* @access public
		* @function getSectionMap
		* @desc calls {@link x.get} to get the Sections and returns the call
		* @returns {object} a promise object
		*/
		getSectionMap : ['public', function(){

			var params = {
				excludeseats : true
			};

			return x.get(['Events', PageStateService.getEventId(), 'seatmap'], params);
		}],

		/**
		* @memberof ReservedSeatService
		* @access public
		* @function getEventDaysForMonth
		* @param {object} date - see {@link DateModel}
		* @desc calls {@link x.get} to get EventDates and returns the call
		* @returns {object} a promise object
		*/
		getEventDaysForMonth : ['public', function(date){
			var startString = this.formatDateTime(date),
				endString = this.formatDateTime(DateUtilService.getFirstDayOfNextMonth(date)),
				params = {
					startDateTime : startString,
					endDateTime : endString,
					eventType : PageStateService.getEventTypeId()
				};

			return x.get(['EventDates'], params);
		}],

		/**
		* @memberof ReservedSeatService
		* @access public
		* @function formatDateTime
		* @param {object} date - a date object - see {@link DateModel}
		* @desc - format date and time in the way that the service expects it to be
		* @returns {string} the date
		*/
		formatDateTime : ['public', function(date){
			return date.year+'-'+(date.month+1)+'-'+date.day;
		}],

		/**
		* @memberof ReservedSeatService
		* @access public
		* @function getSeats
		* @desc getSeats gets the necessary vals from pageState and hits the api
		* @returns {object} a promise object
		*/
		getSeats : ['public', function(){
			var params = {
				section : PageStateService.getSection().id
			};
			return x.get(['Events', PageStateService.getEventId(), 'Seats'], params);
		}],

		/**
		* @memberof ReservedSeatService
		* @access private
		* @function getBestAvailable
		* @desc	calls {@link x.post} for BestAvailable, and returns the call
		* @returns {object} a promise object
		*/
		getBestAvailable : ['public', function(){

			var total = 0;

			angular.forEach(PageStateService.getTicketQuantity(), function(ticketType){
				if(ticketType.quantity){
					total = parseFloat(total) + parseFloat(ticketType.quantity);
				}
			});
			var data = {
					Quantity : total,
					Section : PageStateService.getSection().id
				};
			return x.post(['Events', PageStateService.getEventId(), 'BestAvailable'], {}, data);
		}],

		/**
		* @memberof ReservedSeatService
		* @access private
		* @function releaseSeats
		* @param {array} holds : an array of seatIds (Section-Row-Seat)
		* @desc	this function makes a call to the api and releases that seats that had been selected
		* @returns {object} a promise object
		*/
		releaseSeats : ['public', function(holds){
			if(holds){
				var data = {
						SessionId : PageStateService.getSessionInfo().id,
						Reservations : holds
					};
				return x['delete'](['Events', PageStateService.getEventId(),'reservations'], {}, data);
			}
		}],

		/**
		* @memberof ReservedSeatService
		* @access public
		* @function requestMoreTime
		* @desc	calls {@link x.post} to SessionTime, returns the call
		* @returns {object} a promise object
		*/
		requestMoreTime : ['public', function(){
			return x.post(['sessions', PageStateService.getSessionInfo().id, 'Time']);
		}],

		/**
		* @memberof ReservedSeatService
		* @access public
		* @function getPriceLevels
		* @desc calls {@link x.get} for PriceLevels and returns the call
		* @returns {object} a promise object
		*/
		getPriceLevels : ['public', function(eventId){
			if(!eventId){
				eventId = PageStateService.getEventId();
			}
			return x.get(['events', eventId,'pricelevels']);
		}],

		getSectionImgUrl : ['public', function(){

			var section = PageStateService.getSection();
			return x.getUrl(['events', PageStateService.getEventId(), 'sections', section.id, 'view']);
		}],

		getTicketTypes : ['public', function(){
			return x.get(['productcategories'], {
				eventType : PageStateService.getEventTypeId()
			});
		}]

	});

	return new ReservedSeatService();

}]);

R.service('ResponderService', [
	
	// dependencies
	'gtsClass', function(
	 gtsClass){

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
	var ResponderService = gtsClass({

		/**
		* @memberof ResponderService
		* @function constructor
		* @param {object} staticBreakers : the static breakers
		* @param {object} kineticBreakers : the kinetic breakers
		* @desc constructor calls {@link ResponderService.setStaticBreakers|this.setStaticBreakers} and {@link ResponderService.setKineticBreakers|this.setKineticBreakers}.
		*/
		constructor : function(staticBreakers, kineticBreakers){
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
		binds : ['private', {}],

		/**
		* @memberof ResponderService
		* @access private
		* @function setStaticBreakers
		*/
		setStaticBreakers : ['private', function(breakers){
			var b = this.staticBreakers = {};
			for(var breaker in breakers){
				if(typeof breakers[breaker] === 'function' || typeof breakers[breaker] === 'boolean'){
					b[breaker] = breakers[breaker];
				}
			}
		}],

		/**
		* @memberof ResponderService
		* @access private
		* @function getStaticBreaker
		*/
		getStaticBreaker : ['private', function(breaker){
			if(breaker){
				if(this.staticBreakers[breaker] && typeof this.staticBreakers[breaker] === 'function'){
					return this.staticBreakers[breaker]();
				}
			}else{
				return this.staticBreakers;
			}
		}],

		/**
		* @memberof ResponderService
		* @access private
		* @function setKineticBreakers
		*/
		setKineticBreakers : ['private', function(breakers){
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
		}],

		/**
		* @memberof ResponderService
		* @access private
		* @function listen
		*/
		listen : ['private', function(){

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
		}],

		/**
		* @memberof ResponderService
		* @access private
		* @function notify
		*/
		notify : ['private', function(){
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
		}],

		/**
		* @memberof ResponderService
		* @access private
		* @function on
		*/
		on : ['private', function(breaker, bool){
			var binds = this.binds[breaker];
			if(binds && binds.length){
				for(var b = 0; b < binds.length; b++){
					if(binds[b] && typeof binds[b] === 'function'){
						binds[b](bool, breaker);
					}
				}
			}
		}],

		/**
		* @memberof ResponderService
		* @access public
		* @function bind
		*/
		bind : ['public', function(breakerKey, callback){
			if(this.binds[breakerKey]){
				this.binds[breakerKey].push(callback);
			}else{
				this.binds[breakerKey] = [callback];
			}
		}],

		/**
		* @memberof ResponderService
		* @access public
		* @function getBreakerStatus
		*/
		getBreakerStatus : ['public', function(prop){
			var f = this.staticBreakers[prop] || this.kineticBreakers[prop];
			return f ? f() : false;
		}],

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
		singleColumn : function(){
			return $('[data-gts-reserved-seat]').innerWidth() <= 600;
		}
	};

	return new ResponderService(s, k);
}]);


R.service('SeatsService', [
	
	// dependencies
	'gtsClass','SeatModel',function(
	 gtsClass,  SeatModel){

	/**
	* @class SeatsService
	* @classdesc SeatsService is repsonsible for translating the seat coordinates into the percentages of their parent section.
	*/
	var SeatsService = gtsClass({

		/**
		* @memberof SeatsService
		* @access private
		* @type {array}
		* @desc the seats
		* @name seats
		*/
		seats : ['private', []],

		/**
		* @memberof SeatsService
		* @access public
		* @function translate
		* @param {object} section : the selected section
		* @param {object} stage : the stage
		* @desc translate takes an object of seats, determines the limits of those seats, turns the coordinates into percentages. Then it pushes an array of seats - see {@link SeatModel}
		*/
		translate : ['public', function(data, section, stage){
			// reset
			var seats = this.seats = [],
				limits = stage.limits,
				sectionLeft = section.limits.minX,
				sectionWidth = section.limits.width,
				sectionTop = section.limits.minY,
				sectionHeight = section.limits.height;

			angular.forEach(data.Seats, function(seat){
				var seatLeft = ((seat.CoordinateX - sectionLeft) / sectionWidth) * 100;
				var seatTop = ((seat.CoordinateY - sectionTop) / sectionHeight) * 100;

				seats.push(angular.merge(SeatModel, {
					x : seatLeft,
					y : seatTop,
					id : seat.Id,
					name : seat.Name
				}));
			});
		}],
		
		/**
		* @memberof getSeats
		* @access public
		* @function getSeats
		* @desc	returns the seats
		* @returns {array} the seats
		*/
		getSeats : ['public', function(){
			return this.seats;
		}]

	});

	return new SeatsService();

}]);

R.service('SectionsService', [

	'gtsClass','PageStateService','StageService','LimitCalculator','SectionModel','ApplicationSettings','AdjustmentsModel',function(
	 gtsClass,  PageStateService,  StageService,  LimitCalculator,  SectionModel,  ApplicationSettings,  AdjustmentsModel){

	// this should be dynamic
	var pr = ApplicationSettings.predefinedPointRadiusInCoords;

	/**
	* @class SectionsService
	* @classdesc SectionsService takes section data and processes them. It turns the coordinates into percentages, and calculate other internal values
	*/
	var SectionsService = gtsClass({

		/**
		* @memberof SectionsService
		* @access private
		* @type {array}
		* @desc place to store the sections
		* @name sections
		*/
		sections : ['private', []],

		/**
		* @memberof SectionsService
		* @access private
		* @type {object}
		* @desc the selected Section - see {@link SectionModel}
		* @name section
		*/
		section : ['private', {}],

		/**
		* @memberof SectionsService
		* @access private
		* @type {object}
		* @desc the seat adjustments
		* @name adjustments
		*/
		adjustments : ['private', angular.copy(AdjustmentsModel)],

		/**
		* @memberof SectionsService
		* @access public
		* @function build
		* @param {object} data : an ajax response
		* @desc	this function takes the section data and sets up sections
		*/
		build : ['public', function(data){

			var total = 0, q = PageStateService.getTicketQuantity();

			angular.forEach(q, function(iq){
				total += parseFloat(iq.quantity);
			});

			// reset
			var sections = this.sections = [],
				stageLimits = StageService.getStage().limits;

			// loop through the sections
			angular.forEach(data.Sections, angular.bind(this, function(section){
				
				var sectionLimits = {};
				LimitCalculator(sectionLimits, section.Boundaries);

				var sectionObject = angular.merge(SectionModel, {
					left : ((sectionLimits.minX - stageLimits.minX) / stageLimits.width) * 100,
					top : ((sectionLimits.minY - stageLimits.minY) / stageLimits.height) * 100,
					height : (sectionLimits.height / stageLimits.height) * 100,
					width : (sectionLimits.width / stageLimits.width) * 100,
					viewBox : sectionLimits.minX+' '+sectionLimits.minY+' '+sectionLimits.width+' '+sectionLimits.height,
					limits : sectionLimits,
					aspectRatio : (sectionLimits.height / sectionLimits.width) * 100,
					name : section.Name,
					id : section.Name,
					pointDiameter : (pr / sectionLimits.width) * 100,
					hasSectionImg : (section.PictureId ? true : false),
				});

				if(section.Available < total){
					sectionObject.availability = 'none';
				}else{
					for(var threshold in ApplicationSettings.sectionAvailabilityThresholds){
						if(section.PercentAvailable >= ApplicationSettings.sectionAvailabilityThresholds[threshold]){
							sectionObject.availability = threshold;
							break;
						}else{
							sectionObject.availability = 'none';
						}
					}
				}				

				var string = '';
				angular.forEach(section.Boundaries, function(boundary){
					string += ' '+(boundary.X)+','+(boundary.Y);
				});

				this.addPriceRange(sectionObject, section.PriceLevelIds);

				sectionObject.points = string;
				sections.push(sectionObject);
			}));
		}],

		/**
		* @memberof SectionsService
		* @access public
		* @function getAdjustments
		* @desc	return the adjustments object, this is used to calculate the inner section/seat container
		* @returns {object} the adjustments - see {@link AdjustmentsModel|}
		*/
		getAdjustments : ['public', function(){
			this.adjustments = {
				pointDiameter : this.section.pointDiameter,
				width : 100 - this.section.pointDiameter,
				height : 100 - ( this.section.pointDiameter / (this.section.aspectRatio / 100))
			};
			return this.adjustments;
		}],

		/**
		* @memberof SectionsService
		* @access public
		* @function getSections
		* @returns {array} an array of sections
		* @desc	return the sections
		*/
		getSections : ['public', function(){
			return this.sections;			
		}],

		/**
		* @memberof SectionsService
		* @access public
		* @function setSection
		* @param {object} section : the target section
		* @desc	sends the section to {@link PageStateService.setSection}
		* @returns {object} the section
		*/
		setSection : ['public', function(section){
			this.section = section;
			return PageStateService.setSection(section);
		}],

		/**
		* @memberof SectionsService
		* @access public
		* @function getSection
		* @returns {object} current section - see {@link SectionModel}
		* @desc	returns the selected section
		*/
		getSection : ['public', function(){
			return this.section;
		}],

		addPriceRange : ['private', function(section, priceLevelIds){

			var storedPriceLevels = PageStateService.getPriceLevels(),
				min = null,
				max = null;

			angular.forEach(priceLevelIds, function(priceLevelId){
				angular.forEach(storedPriceLevels, function(stored){
					if(stored.Id == priceLevelId){
						angular.forEach(stored.Details, function(detail){
							if(min === null || detail.Price < min){
								min = detail.Price;
							}
							if(max === null || detail.Price > max){
								max = detail.Price;
							}
						});
					}
				});
			});

			section.priceRange = {
				min : min,
				max : max
			};
		}]

	});
	return new SectionsService();
}]);

R.service('SelectionsService', [

	// dependencies
	'gtsClass','Communicator','EventTypePickerService',function(
	 gtsClass,  Communicator,  EventTypePickerService){

	var selectionsModel = {
 		eventDate : null,
 		eventTime : null,
 		seats : [],
 		section : null,
 		row : null
 	};

	 var SelectionsService = gtsClass({

	 	selections : ['private', angular.copy(selectionsModel)],

	 	constructor : function(){
	 		this.bind();
	 	},

	 	bind : ['private', function(){
	 		Communicator.receive('eventDate', angular.bind(this, function(eventDate){
	 			this.eventDate = eventDate;
	 		}));

	 		Communicator.receive('eventId', angular.bind(this, function(eventId){
	 			var event = EventTypePickerService.getEvent();
	 			if(event && event.time){
	 				this.eventTime = event.time;
	 			}
	 		}));
	 		Communicator.receive('option', angular.bind(this, function(option){
	 			if(option && option.id){

	 				this.selections.eventTime = this.eventTime;
	 				this.selections.eventDate = this.eventDate;
	 				this.selections.row = option.row;
	 				this.selections.section = option.section;

	 				angular.forEach(option.seatDetails, angular.bind(this, function(seat){
	 					delete seat.possPlus;
	 				}));

	 				this.selections.seats = option.seatDetails;
	 				Communicator.send('selections', this.selections);
	 			}
	 		}));

	 		Communicator.receive('section', angular.bind(this, function(){
	 			this.selections = angular.copy(selectionsModel);
	 			Communicator.send('selections', this.selections);
	 		}));

	 		Communicator.receive('mainTimerEnded', angular.bind(this, function(){
	 			this.selections = angular.copy(selectionsModel);
	 			Communicator.send('selections', this.selections);
	  		}));
	 	}],

	 	bindToSelections : ['public', function(callback){

	 		Communicator.receive('selections', callback);
	 	}]

	 });

	 return new SelectionsService();

}]);	

R.service('StageService', [

	'gtsClass','StageModel','LimitCalculator',function(
	 gtsClass,  StageModel,  LimitCalculator){

	/**
	* @class StageService
	* @classdesc StageService is responsible for calculating the limits of the stage, turning them into percentages, calculating aspect ratio
	*/

	var StageService = gtsClass({

		/**
		* @memberof StageService
		* @access private
		* @type object
		* @name stage
		* @desc the stage object - see {@link StageModel}
		*/
		stage : ['private', angular.copy(StageModel)],

		/**
		* @memberof StageService
		* @access public
		* @function build
		* @param {object} data : an ajax response
		* @desc	build the stage based on the section data
		*/
		build : ['public', function(data){
			
			// reset
			this.stage = angular.copy(StageModel);

			angular.forEach(data.Sections, angular.bind(this, function(section){
				LimitCalculator(this.stage.limits, section.Boundaries);
			}));

			angular.forEach(data.Objects, angular.bind(this, function(object){

				var boundaries = [];

				boundaries.push({
					X : object.CoordinateX,
					Y : object.CoordinateY
				});

				LimitCalculator(this.stage.limits, boundaries);
			}));

			this.stage.aspectRatio = (this.stage.limits.height / this.stage.limits.width) * 100;
		}],

		/**
		* @memberof StageService
		* @access public
		* @function getStage
		* @desc	returns the stage
		* @returns {object} the stage - see {@link StageModel}
		*/
		getStage : ['public', function(){
			return this.stage;
		}]
	});

	return new StageService();

}]);

R.service('TimerService', [

	// dependencies
	'gtsClass','TimerModel','Communicator',function(
	 gtsClass,  TimerModel,  Communicator){
	
	/**
	* @class ZoomService
	* @classdesc ZoomService is responsible for zooming in on the stage so a section takes up the full viewport
	*/
	var TimerService = gtsClass({

		timers : ['private', []],

		clearTimer : ['public', function(timerId, index){

			var timers = this.timers;
			angular.forEach(timers, function(timer){

				if(timer.id === timerId){
					clearTimeout(timer.timer);
					if(timer.interval){
						clearInterval(timer.interval);
					}
					if(timer.onChange && typeof timer.onChange === 'function'){
						timer.onChange(null);
					}
					timers.splice(index, 1);
				}
			});
		}],

		startTimer : ['public', function(timerObject){
			this.clearTimer(timerObject.id);
			this.timers.push(timerObject);
			timerObject.timer = setTimeout(function(){
				
				Communicator.send(timerObject.id+'TimerEnded', null);

				if(timerObject.callback && typeof timerObject.callback === 'function'){
					timerObject.callback();
				}
				if(timerObject.interval){
					clearInterval(timerObject.interval);
				}
				if(timerObject.onChange && typeof timerObject.onChange === 'function'){
					timerObject.onChange(null, true);
				}
			}, timerObject.time);
			this.addChange(timerObject);
		}],

		addChange : ['private', function(timerObject){
			if(timerObject.onChange && typeof timerObject.onChange === 'function'){
				var time = timerObject.time;
				timerObject.onChange(this.convertTime(time));
				timerObject.interval = setInterval(angular.bind(this, function(){
					time -= 1000;
					timerObject.onChange(this.convertTime(time), true);
				}), 1000);
			}
		}],

		convertTime : ['private', function(ms){

			//var hours = Math.floor((time % 86400000) / 3600000);
			var minutes = Math.floor((ms % 3600000) / 60000);
			var seconds = Math.floor((ms % 60000) / 1000);
			return ('0'+minutes).slice(-2)+':'+('0'+seconds).slice(-2);
		}]
	});

	return new TimerService();

}]);

	R.service('ZoomService', [

	// dependencies
	'gtsClass','StageService','SectionsService','OptionsService', function(
	 gtsClass,  StageService,  SectionsService,  OptionsService){
	
	/**
	* @class ZoomService
	* @classdesc ZoomService is responsible for zooming in on the stage so a section takes up the full viewport
	*/
	var ZoomService = gtsClass({

		zoomBase : ['private', 100],

		defaultZoomAdjustment : ['private', 0.7],

		zoomScale : ['private', 1],

		currentZoom : ['private', 100],

		/**
		* @memberof ZoomService
		* @access public
		* @function zoom
		* @param {object} section : a section object, see SectionModel
		* @param {object} stage : the stage - see stageModel
		* @desc	this function fills in the zoom/margin settings on the stage
		*/
		resetZoom : ['public', function(){
			this.currentZoom = 1;
			this.zoomScale = 1;

			var obj = {
				zoom : 100,
				marginLeft : 0,
				marginTop:0
			};

			angular.extend(StageService.getStage(), obj);
		}],

		zoom : ['public', function(){

			var stage = StageService.getStage(),
				option = OptionsService.getCurrentOption(),
				section = SectionsService.getSection(),
				/*jshint -W030 */
				seat;

			if(option && option.id){
				seat = option.seats[0];
			}else{
				seat = {
					coords : {
						y : section.limits.maxY
					}
				};
			}

			// set the base, based on section
			this.zoomBase = (100 / section.width) * 100;

			this.currentZoom = this.zoomBase * this.defaultZoomAdjustment * this.zoomScale;

			if(this.currentZoom < 100){
				this.currentZoom = 100;
			}
			var marginTop = ((((seat.coords.y - stage.limits.minY) / stage.limits.height) * this.currentZoom) - 50) * (stage.aspectRatio / 100) * -1;

			// adjust for top and bottom edges
			if(marginTop > 0){
				marginTop = 0;
			}else if(this.currentZoom + (marginTop / (stage.aspectRatio / 100)) < 100){
				marginTop = -1 * (this.currentZoom - 100) * (stage.aspectRatio / 100);
			}

			// adjust for left and right edges
			var marginLeft = ((-1 *((section.left + (section.width / 2)) / 100)) * (this.currentZoom)) + 50;
			if(marginLeft > 0){
				marginLeft = 0;
			}else if(this.currentZoom + marginLeft < 100){
				marginLeft = -1 * (this.currentZoom - 100);
			}

			stage.marginTop = marginTop;
			stage.marginLeft = marginLeft;
			stage.zoom = this.currentZoom;
		}],

		increment : ['public', function(bool){
			if(bool){
				if(this.zoomScale < 1){
					this.zoomScale = this.zoomScale * 1.25;
				}
			}else{
				if(this.zoomScale > 0.4){
					this.zoomScale = this.zoomScale / 1.25;
				}
			}
			this.zoom();
		}],

	});

	return new ZoomService();

}]);

R.service('x', [

	// dependencies
	'gtsClass','$http','PageStateService','$q','ApplicationSettings', function(
	 gtsClass,  $http,  PageStateService,  $q,  ApplicationSettings){

	/**
	* @class X
	* @classdesc X is a wrapper for all ajax calls. It handles the appropriate settings for the various request types, along with making sure the data is sent correctly
	*/
	var X = gtsClass({
		
		/**
		* @memberof X
		* @access private
		* @type {string}
		* @name prefix
		* @desc the base url for the calls
		*/   
		prefix : ['private', ApplicationSettings.apiUrl], 

		/**
		* @memberof X
		* @access public
		* @function get
		* @param {string} url - the key assoc with the urls object
		* @param {object} data - the data to send as query parameters
		* @desc A get request
		* @returns {object} a promise object
		*/
		get : ['public', function(url, params){
			return $http({
				method : 'GET',
				url : this.prefix+url.join('/'),
				params : params,
				headers : {
					Authorization : ApplicationSettings.token
				}
			});
		}],

		/**
		* @memberof X
		* @access public
		* @function post
		* @param {string} url - the key assoc with the urls object
		* @param {object} params - the data to send as query parameters
		* @param {object} data - the data to send as the body of the request
		* @desc - the public post request
		* @returns {object} a promise object
		*/
		post : ['public', function(url, params, data){
			return $http({
				method : 'POST',
				url : this.prefix+url.join('/'),
				params : params,
				data : data,
				headers : {
					Authorization : ApplicationSettings.token
				}
			});
		}],

		/**
		* @memberof X
		* @access public
		* @function
		* @param {string} url - the key assoc with the urls object
		* @param {object} params - the data to send as query parameters
		* @param {object} data - the data to send as the body of the request 
		* @desc	A delete request
		* @returns {object} a promise object
		*/
		'delete' : ['public', function(url, params, data){
			return $http({
				method : 'DELETE',
				url : this.prefix+url.join('/'),
				params : params,
				data : data,
				headers : {
					'Content-type' : 'application/json',
					Authorization : ApplicationSettings.token
				}
			});
		}],

		getUrl : ['public', function(url){
			return this.prefix+url.join('/');
		}]
	});

	return new X();

}]);

R.factory('Communicator', [

	'gtsClass', function(
	 gtsClass){


	/**
	* @class Communicator
	* @classdesc Communicator sends/receives events
	*/
	var Communicator = gtsClass({

		/**
		* @memberof Communicator
		* @function createEventArray
		* @param {string} key - the event
		* @desc if there isnt an event queue yet, create it
		*/
		createEventArray : ['private', function(key){
			if(!this['pass'+key]){
				this['pass'+key] = [];
			}
		}],

		/**
		* @memberof Communicator
		* @function send
		* @param {string} key - the event to listen for
		* @param {*} value - the new value
		* @desc run each function in the key's event queue
		*/
		send : ['public', function(key, value){
			angular.forEach(this['pass'+key], function(func){
				func(value);
			});
		}],

		/**
		* @memberof Communicator
		* @function receive
		* @param {string} key - the event to listen for
		* @param {function} callack - the callback function
		* @desc call receive, passing in a key, and a callback that MUST be bound to the proper context.
		*/
		receive : ['public', function(key, callback){
			if(typeof key === 'object'){		
				for(var objKey in key){
					this.createEventArray(objKey);
					this['pass'+objKey].push(key[objKey]);
				}
			}else{
				this.createEventArray(key);
				this['pass'+key].push(callback);
			}
		}]
	});

	return new Communicator();
}]);

/**
* Angular Helpers!
*/
angular.merge = function(a, b){
	return angular.extend(angular.copy(a, {}), b);
};

angular.inArray = function(value, array){

	var returnIndex = -1;
	angular.forEach(array, function(val, index){
		if(value === val){
			returnIndex = index;
			return returnIndex;
		}
	});
	return returnIndex;
};

angular.isEmpty = function(object){
	var contents = false;
	for(var prop in object){
		if(object[prop]){
			contents = true;
		}
	}
	return (contents === false);
};


R.factory('LimitCalculator', [function(){

	/**
	* @function
	* @param {object} modelObject : the model to store the calculations in 
	* @desc	- calculateLimits is a generic function which will take a boundary object and return the min, max, height, and width
	*/
	return function(limits, boundaries){

		angular.forEach(boundaries, function(bound){
			if(!limits.minX || bound.X < limits.minX){
				limits.minX = bound.X;
			}
			if(!limits.maxX || bound.X > limits.maxX){
				limits.maxX = bound.X;
			}
			if(!limits.minY || bound.Y < limits.minY){
				limits.minY = bound.Y;
			}
			if(!limits.maxY || bound.Y > limits.maxY){
				limits.maxY = bound.Y;
			}
		});
		limits.height = limits.maxY - limits.minY;
		limits.width = limits.maxX - limits.minX;
		return limits;
	};

}]);

R.factory('gtsClass', function(){

	// helper function
	var processMethods = function(structure){

		var constructor,
			privateMethods = {},
			publicMethods = {};

		for(var method in structure){
			if(method === 'constructor'){
				publicMethods._constructor = structure[method];
			}else{
				var type, name, value;
				// if in format- 'private methodName' : {} 
				if(method.indexOf(' ') > -1){
					type = method.split(' ')[0];
					name = method.split(' ')[1];
					value = structure[method];
				}else{
					name = method;
					// check for array format
					if(Object.prototype.toString.call(structure[method]) === '[object Array]'){
						// check for method type declaration
						if(typeof structure[method][0] === 'string' && structure[method].length === 2){
							if(structure[method][0] === 'private' || structure[method][0] === 'public'){
								type = structure[method][0];
								value =structure[method][1];
							}else{
								throw('invalid method definition');
							}
						}else{
							if(structure[method].length === 1){
								type = 'public';
								value = structure[method][0];
							}else{
								throw('invalid method definition');
							}
						}
					}else{
						type = 'public';
						value = structure[method];
					}
				}

				if(type === 'private'){
					privateMethods[name] = value;
				}else if(type === 'public'){
					publicMethods[name] = value;
				}else{
					throw('error defining methods');
				}
			}
		}

		return {
			constructor : constructor,
			privateMethods : privateMethods,
			publicMethods : publicMethods
		};
	};
		
	return function(){

		var privateContext, gtsClass, configs, bindCorrectContext;

		if(arguments.length === 1){

			configs = {};

			/**
			* Helper functions
			*/
			var createPrivateContext = function(anotherContext){
				var Context = function(){};
				Context.prototype = anotherContext;
				return new Context();
			};

			// 1. create a privateContext variable. the private context will be assigned to this variable
			privateContext = {};

			// 2. Create the gtsClass object. Ignore the contents of the constructor for now.
			gtsClass = function(X){

				// 6. The constructor function should create a private context object who's prototype is equal by reference to the this context of gtsClass 
				privateContext = createPrivateContext(this);

				// 7. Attach all private methods to the newly created privateContext
				for(var methodO in configs.privateMethods){
					if(typeof privateContext[methodO] === 'function'){
						privateContext[methodO] = angular.bind(privateContext, methodO);
					}else{
						privateContext[methodO] = configs.privateMethods[methodO];
					}
				}

				if(X !== 'FALSE'){
					// remove this
					delete gtsClass.prototype._x;
				}

				// 8. If we stored a constructor function, call it
				if(this._constructor && typeof this._constructor === 'function' && X !== 'FALSE'){
					this._constructor.apply(privateContext, arguments);
				}
			};

			gtsClass.prototype._x = (function(){

				return function(c){
					if(c){
						c.apply(privateContext, arguments);
					}
				};
			})();

			// 3. Loop through the structure and move the methods to their appropriate temporary container. We are storing the function values in these containers, to be bound later
			configs = processMethods(arguments[0]);

			// 4. Attach all public methods to the prototype of gtsClass - this must be done pre-instantiation
			bindCorrectContext = function(){
				var targetMethod = method;
				return function(){
					return configs.publicMethods[targetMethod].apply(privateContext, arguments);
				};
			};

			// IMPORTANT - this code is repeated below, this cannot be extracted out with a function, the privateContext variable will be set later, moving this code breaks that
			for(var method in configs.publicMethods){
				if(typeof configs.publicMethods[method] === 'function'){
					gtsClass.prototype[method] = bindCorrectContext();
				}else{
					gtsClass.prototype[method] = configs.publicMethods[method];
				}
			}

			// 5. Return the object - see gtsClass constructor function for more steps;
			return gtsClass;

		}else{

			configs = {};
			privateContext = {};
			gtsClass = function(X){

				this._x(function(){
					privateContext = this;
				});

				// remove this
				delete gtsClass.prototype._x;

				// 7. Attach all private methods to the newly created privateContext
				for(var method in configs.privateMethods){
					if(typeof configs.privateMethods[method] === 'function'){
						privateContext[method] = angular.bind(privateContext,  configs.privateMethods[method]);
					}else{
						privateContext[method] = configs.privateMethods[method];
					}
				}

				if(this._constructor && typeof this._constructor === 'function' && X !== 'FALSE'){
					this._constructor.apply(privateContext, arguments);
				}
			};

			gtsClass.prototype = new arguments[0]('FALSE');

			configs = processMethods(arguments[1]);

			// 4. Attach all public methods to the prototype of gtsClass - this must be done pre-instantiation
			bindCorrectContext = function(){
				var targetMethod = method;
				return function(){
					return configs.publicMethods[targetMethod].apply(privateContext, arguments);
				};
			};

			// IMPORTANT - this code is repeated above, this cannot be extracted out with a function, the privateContext variable will be set later, moving this code breaks that
			for(var methodI in configs.publicMethods){
				if(typeof configs.publicMethods[methodI] === 'function'){
					gtsClass.prototype[methodI] = bindCorrectContext();
				}else{
					gtsClass.prototype[methodI] = configs.publicMethods[methodI];
				}
			}
			return gtsClass;
		}
	};

});