/*jshint -W093 */

//'use strict'; this should go back in 

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

// bootstrap
$(document).ready(function(){
	var el = $('[data-gts-reserved-seat]');
	if(el.length){	
		angular.bootstrap((el), ['gtsReservedSeat']);
	}
});

R.factory('BaseController', ['gtsClass', '$window', 'ApplicationSettings', 'ResponderService', 'Communicator', function(gtsClass, $window, ApplicationSettings, ResponderService, Communicator){

	var BaseControllerState = {
		collapsed : true,
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
			this.sizing();
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

		sizing : ['private', function(){

			this.scope.screenSize = {
				large : ResponderService.getBreakerStatus('large'),
				medium : ResponderService.getBreakerStatus('medium'),
				small : ResponderService.getBreakerStatus('small'),
			};

			ResponderService.bind('large', angular.bind(this, function(bool){
				this.scope.screenSize.large = bool;
				this.scope.$apply();
			}));

			ResponderService.bind('medium', angular.bind(this, function(bool){
				this.scope.screenSize.medium = bool;
				this.scope.$apply();
			}));

			ResponderService.bind('small', angular.bind(this, function(bool){
				this.scope.screenSize.small = bool;
				this.scope.$apply();
			}));

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
			this.scope.state = angular.copy(BaseControllerState);
			this.scope.state.collapsed = false;
			this.scope.state.disabled = false;
			if(c && typeof c === 'function'){
				c();
			}
		}],

		collapse : ['private', function(ignore, c){

			if(!ignore){
				//Communicator.send('collapse', true);
			}

			this.scope.state.collapsed = true;
			if(c && typeof c === 'function'){
				c();
			}
		}],

		expand : ['private', function(c){
			Communicator.send('collapse', true);
			this.scope.state.collapsed = false;
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
			//this.scope.state = angular.copy(BaseControllerState);
			this.scope.state.collapsed = false;
			this.scope.state.error = null;
			this.scope.state.disabled = false;
			this.scope.state.loading = true;
			if(c && typeof c === 'function'){
				c();
			}
		}],

		/**
		* @memberof BaseController
		* @access private
		* @function
		* @param {function} c - a callback function
		* @desc	the warning function adjusts the proper values on the state object to show the module in a warning state
		*/
		warning : ['private', function(c){
			//this.scope.state = angular.copy(BaseControllerState);
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

R.controller('ConfirmationController', [

	// dependencies
	'$scope', 'gtsClass','Communicator','ConfirmationService', function(
	 $scope,   gtsClass,  Communicator,  ConfirmationService){

	// class
	new (gtsClass({

		constructor : function(scope){
			this.scope = scope;
			this.register();
			this.bind();
		},

		register : ['private', function(){
			
		}],

		bind : ['private', function(){
			Communicator.receive('seats', angular.bind(this, this.gotSeats));
		}],

		gotSeats : ['private', function(seats){
			ConfirmationService.calc(seats);
		}],


	}))($scope);

}]);

R.controller('DatePickerController', [

	'gtsClass','BaseController','$scope','ResponderService','DatePickerService','Communicator','$element', function(
	 gtsClass,  BaseController,  $scope,  ResponderService,  DatePickerService,  Communicator,  $element){

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
 			this.expand();
 		}],

		/**
		* @memberof DatePickerController
		* @access private
		* @type array
		* @desc An array of keys to map properties on the scope to their properties on the controller - see {@link BaseController.register}
		*/
		registrations : ['private', ['changeMonth', 'selectDate','change']],

		/**
		* @memberof DatePickerController
		* @access private
		* @function bind
		* @desc bind listens for the changes to singleColumn from {@link ResponderService}, then calls {@link DatePickerController.checkDevice|this.checkDevice}.
			It also listens for {@link Communicator} to send a ticketQuantity. Once it gets a quantity it calls {@link DatePickerController.getDates|this.getDates}
		*/
		bind : ['private', function(){

			/*
			Communicator.receive('collapse', angular.bind(this, function(){
				this.scope.collapsed = true;
			})); */
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
				this.scope.showDate = DatePickerService.getShowDate();
				this.collapse();
			}
		}],

		change : ['private', function(){
			this.expand();
		}]

	});

	return new DatePickerController($scope);

}]);


R.controller('EventTimePickerController', [

	// dependencies
	'gtsClass','BaseController','$scope','EventTypePickerService','Communicator','$element','ResponderService',function(
	 gtsClass,  BaseController,  $scope,  EventTypePickerService,  Communicator,  $element,  ResponderService){

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
			//this.scope.collapsed = true;
			this.selectedEvent = null;
			this.scope.events = [];
			this.scope.eventString = '';

			//var eDate = EventTypePickerService.getEventDate();
			//if(angular.isEmpty(eDate)) this.getEvents(eDate);
		}],

		/**
		* @memberof EventTypePickerController
		* @access private
		* @function bind
		* @desc bind checks for the eventDate, then listens for new changes from {@link Communicator}
		*/
		bind : ['private', function(){
			var eventDate, quantity;
			this.scope.mobile = ResponderService.getBreakerStatus('singleColumn');
			Communicator.receive('eventDate', angular.bind(this, function(eventDate){
				this.getEvents(eventDate);
			}));

			Communicator.receive('collapse', angular.bind(this, function(){
				this.collapse(true);
			}));
		}],

		/**
		* @memberof EventTypePickerController
		* @type {array}
		* @desc registrations - see {@link BaseController.registrations}
		*/
		registrations : ['private', ['selectEvent', 'change']],

		/**
		* @memberof EventTypePickerController
		* @access private
		* @function getEvents
		* getEvents asks the service for the events, passes updateDisplay as callback
		*/
		getEvents : ['private', function(eventDate){

			this.setDefaults();

			if(!angular.isEmpty(eventDate)){
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
		updateDisplay : ['private', function(response){
			this.enable();
			this.scope.events = [];

			angular.forEach(response.data.Events, angular.bind(this, function(event){
				var time =  event.StartDateTime.split('T')[1].split(':');
				this.scope.events.push({
					startTime : time[0]+':'+time[1],
					name : event.Name,
					date : EventTypePickerService.getDateString(),
					id : event.Id,
					resourceId : event.ResourceId,
					eventStartDate : event.StartDateTime,
					eventEndDate : event.EndDateTime,
					seatMapId : event.SeatMapId
				});
			}));
		}],

		/**
		* @memberof EventTypePickerController
		* @access private
		* @function selectEvent
		* @ng called via directive, mapped here via register
		*/
		selectEvent : ['private', function(eventObject){

			this.scope.selectedEvent = eventObject.StartDateTime;
			EventTypePickerService.setEvent(eventObject);
			this.scope.eventString = eventObject.name +': '+eventObject.startTime;
			this.collapse();
		}],

		change : ['private', function(){
			this.expand();
			//Communicator.send('collapse', true);
			//this.scope.collapsed = false;
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
		setDefaults : ['private', function(x){
			this.scope.visible = false;
			this.scope.listSection = null;
		}],

		/**
		* @memberof ListController
		* @access private
		* @function bind
		* @see BaseController
		*/
		bind : ['private', function(){

			if(this.scope.visible){
				this.scope.visible = ResponderService.getBreakerStatus('modernBrowser');
			}

			Communicator.receive({
				eventId : angular.bind(this, this.getSections),
				sections : angular.bind(this, this.gotSections),
				sectionId : angular.bind(this, this.sectionChanged),
				options : angular.bind(this, this.gotOptions),
				optionId : angular.bind(this, this.optionChanged),
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
			return eId ? this.enable() : this.disable();
		}],

		/**
		* @memberof ListController
		* @access private
		* @function gotSections
		* @param {array} sections : the array of sections
		* @desc	hear the change in sections
		*/
		gotSections : ['private', function(sections){
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
			this.scope.listSection = MapService.getSection();
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
			this.scope.selectedOption = MapService.getOption().id;
			this.enable();
		}],

		/**
		* @memberof ListController
		* @access private
		* @function optionChanged
		* @param {object} option : the selected option object
		*/
		optionChanged : ['private', function(option){
			this.enable();
			this.scope.selectedOption = option.id;
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
		selectSection : ['private', function(section){
			if(section){
				this.loading();
			}
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
			var o = MapService.setOption(optionId);
			this.loading();
			Communicator.send('optionId', o);
		}]

	});

	return new ListController($scope);

}]);

R.controller('MapController', [

	'gtsClass','BaseController','$scope','Communicator','MapService','ResponderService','ApplicationSettings','TimerService','$http','PageStateService','EventTypePickerService',function(
	 gtsClass,  BaseController,  $scope,  Communicator,  MapService,  ResponderService,  ApplicationSettings,  TimerService,  $http,  PageStateService,  EventTypePickerService){

	// we are overriding element, so create here instead of injecting it
	var $element;

	/**
	* @class MapController
	* @classdesc MapController manages interactions with the seat map
	* @extends BaseController
	*/
	var MapController = gtsClass(BaseController, {

		/**
		* @memberof MapController
		* @access private
		* @function setDefaults
		* @desc	Set defaults
		*/
		setDefaults : ['private', function(){
			$element = document.getElementById('map');
			this.scope.selectedSection = null;
			this.scope.visible = true;
			this.scope.collapsed = true;
		}],

		/**
		* @memberof MapController
		* @type {array}
		* @name registrations
		*/
		registrations : ['private', ['selectSection', 'moreTime', 'nextOption', 'back', 'confirm', 'inc', 'listView', 'openLegend','assignSeats', 'gotTickets', 'reSelectOption']],

		/**
		* @memberof MapController
		* @access private
		* @function bind
		*/
		bind : ['private', function(){

			this.scope.mobile = ResponderService.getBreakerStatus('singleColumn');
			ResponderService.bind('singleColumn', angular.bind(this, this.checkDevice));

			this.scope.visible = ResponderService.getBreakerStatus('modernBrowser');

			Communicator.receive({
				eventId : angular.bind(this, this.getSections),
				sectionId : angular.bind(this, this.sectionChanged),
				sessionInfo : angular.bind(this, this.sessionChanged),
				optionId : angular.bind(this, this.drawOption),
				selectedTab : angular.bind(this, this.tabChanged)
			});

			Communicator.receive('ticketQuantity', angular.bind(this, function(ticketQuantity){
				this.enable();
				this.selectSection(null);
				this.hasTicketQuantity = (ticketQuantity && ticketQuantity.length > 0);
			}));

			Communicator.receive('collapse', angular.bind(this, function(){
				this.collapse(true);
			}));
		}],

		/**
		* @memberof MapController
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
		* @function getSections
		* @param {number} eventId : the eventId, sent through Communicator
		*/
		getSections : ['private', function(eventId){
			if(eventId){
				MapService.getSectionData(angular.bind(this, this.dataDone));
			}else{
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
				this.enable();
				this.scope.stage = MapService.getStage();
				this.scope.sections = MapService.getSections();
				this.scope.objects = MapService.getObjects();
				this.scope.objectLegend = MapService.getObjectLegend();
				Communicator.send('sections', this.scope.sections);
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
			if(this.hasTicketQuantity){
				this.scope.seats = [];
				MapService.clearOptions();
				MapService.selectSection(section);
				//MapService.getSectionView(angular.bind(this, this.renderSectionView));

			}else{
				if(section){
					this.scope.errorMessage = 'quantity';
					this.error();
				}
			}
		}],

		/**
		* @memberof MapController
		* @access private
		* @function sectionChanged
		* @param {string} sectionId : the name of the section
		*/
		sectionChanged : ['private', function(sectionName){

			this.scope.selectedSection = MapService.getSection();
			this.scroll($element);

			if(sectionName){
				this.loading();
				this.scope.stage = MapService.getStage();
				MapService.getSeatData(angular.bind(this, this.seatsLoaded));
			}else{
				this.back();
			}
		}],
			
		/**
		* @memberof MapController
		* @access private
		* @function sessionChanged
		* @param {object} sessionInfoObject : the new session info
		* @desc	this function runs when we get new session info
		*/
		sessionChanged : ['private', function(sessionInfoObject){

			TimerService.startTimer({
				id : 'main',
				//time : sessionInfoObject.timeout * 1000 || 120,
				time : 120 * 1000,
				callback : angular.bind(this, this.timedOut),
				onChange : angular.bind(this, this.timerChanged)
			});

			TimerService.startTimer({
				id : 'warning',
				time : ApplicationSettings.warningTime*1000,
				callback : angular.bind(this, this.warn)
			});
		}],

		/**
		* @memberof MapController
		* @access private
		* @function seatsLoaded
		* @desc	set the seats object on the scope
		*/
		seatsLoaded : ['private', function(option){

			if(option.id){
				this.drawOption();
				this.enable();
			}else{
				this.scope.warningMessage = 'noSeats';
				this.enable();
				this.warning();
			}

			this.scope.seats = MapService.getSeats();
			this.scope.seatsLoaded = true;
			
			// send the options
			Communicator.send('options', MapService.getOptions());
			Communicator.send('optionId', MapService.getOption());
		}],

		/**
		* @memberof MapController
		* @access private
		* @function timedOut
		* @desc	this function runs when the timer has ran out
		*/
		timedOut : ['private', function(){
			this.scope.errorMessage = 'timeOut';
			this.selectSection(null);
			this.error();
			this.scope.$apply();
		}],

		/**
		* @memberof MapController
		* @access private
		* @function warn
		* @desc this function is ran when the warning timer times out
		*/
		warn : ['private', function(){
			this.scope.warningMessage = 'time';
			this.warning();
			this.scope.$apply();
			//TimerService.clearTimer('warning');
		}],

		timerChanged : ['private', function(value, delayed){
			this.scope.timeString = value;
			if(delayed){
				this.scope.$apply();
			}
		}],

		/**
		* @memberof MapController
		* @access private
		* @function back
		* @desc	sets the current section to null, to reset the section view
		*/
		back : ['private', function(){
			this.scope.allowOverflow = false;
			this.scope.seats = [];
			this.scope.seatsLoaded = false;
			this.scope.showTicketOptions = false;
			this.scope.option = null;
			this.scope.selectedSection = null;
			MapService.releaseSeats();
			MapService.clearOptions();
			TimerService.clearTimer('main');
		}],

		/**
		* @memberof MapController
		* @access private
		* @function nextOption
		* @param {object} option : the current option
		*/
		nextOption : ['private', function(option){
			if(option && option.id){
				this.scope.option = MapService.getNextOption(option.id);
				Communicator.send('optionId', this.scope.option);
			}
		}],

		/**
		* @memberof MapController
		* @access private
		* @function drawOption
		* @desc	draw the seat option tooltips
		*/
		drawOption : ['private', function(){
			this.scope.optionsLength = MapService.getOptionsLength();
			this.scope.option = MapService.getOption();
			this.scope.adjustments = MapService.getAdjustments();
			MapService.mark();
			this.scope.groupCoords = MapService.getCoords();
		}],

		/**
		* @memberof MapController
		* @access private
		* @function
		* @param {object} option : the selected option
		* @desc	This function runs when a user selects a seat, it sends the selected option to the service
		*/				
		confirm : ['private', function(option){
			MapService.selectSeatOption(option);
		}],

		/**
		* @memberof MapController
		* @access private
		* @function moreTime
		* @desc	request moreTime
		*/
		moreTime : ['private', function(){
			this.loading();
			MapService.getMoreTime(angular.bind(this, function(value){
				if(value){
					this.sessionChanged({timeout : value});
					this.enable();
				}
			}));
		}],

		/**
		* @memberof MapController
		* @access private
		* @function tabChanged
		*/
		tabChanged : ['private', function(tab){
			this.scope.visible = (tab === 'visual') ? true : false;
		}],

		inc : ['private', function(bool){
			MapService.inc(bool);
		}],

		renderSectionView : ['private', function(data){}],

		listView : ['private', function(val){
			Communicator.send('selectedTab', val);
		}],

		openLegend : ['private', function(){
			this.scope.legendOpen = (!this.scope.legendOpen);
		}],

		assignSeats : ['private', function(option){

			MapService.getPriceLevelData(option, angular.bind(this, this.showTicketOptions));
		}],

		showTicketOptions : ['private', function(option){

			this.scope.optionTickets = option.seats;
			this.scope.optionSection = option.section;
			this.scope.optionRow = option.row;
			this.scope.showTicketOptions= true;
		}],

		gotTickets : ['private', function(option){

			MapService.releaseOptions(option).then(function(){
				MapService.addToCart(option);
			});

		}],

		reSelectOption : ['private', function(){
			this.scope.showTicketOptions= false;
			this.scope.optionTickets = null;
			this.scope.optionSection = null;
			this.scope.optionRow = null;
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
			this.scope.quantity = 0;
			//this.loading();
			//this.getTickets();
			//this.scope.quantity = QuantityPickerService.getQuantity();
			//this.scope.isUnderlayOpen = false;
			//this.scope.displayQuantity = 0;
		}],

		/**
		* @memberof QuantityPickerController
		* @access private
		* @type {array}
		* @desc An array of keys to map properties on the scope to their properties on the controller - see {@link BaseController.register}
		*/
		registrations : ['private', ['chooseQuantity', 'selectQuantity']],

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
		}],

		selectQuantity : ['private', function(){

			QuantityPickerService.setQuantity(this.scope.quantity);
		}]

		/**
		* @memberof QuantityPickerController
		* @access private
		* @function chooseQuantity
		* @desc chooseQuantity sends the quantity to {@link QuantityPickerService.setQuantity}. If the service returns an error message, set it on the scope and trigger {@link BaseController.error|error}, otherwise {@link BaseController.enable|enable}.
		*
		chooseQuantity : ['private', function(){
			// set quantity, if returns false, throw the error
			this.scope.errorMessage = QuantityPickerService.setQuantity();
			if(this.scope.errorMessage){
				this.error();
			} else{
				this.enable();
			}
		}],

		openUnderlay : ['private', function(){
			this.scope.isUnderlayOpen = true;
		}],

		updateQuantity : ['private', function(){

			var total = 0;
			
			angular.forEach(this.scope.tickets, function(ticket){
				total = total + parseFloat(ticket.quantity);
			});

			this.scope.displayQuantity = total;
			this.scope.isUnderlayOpen = false;
			this.chooseQuantity();
		}] */

	});

	return new QuantityPickerController($scope);

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
				Communicator.receive('eventId', angular.bind(this, this.showTabs));
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
	ticketQuantityLimit : 10,
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
		currentDate : angular.merge(dateModel, {}),
		targetDate : angular.merge(dateModel, {}),
		eventDate : angular.merge(dateModel, {}),
		eventTypeId : null,
		eventId : null,
		ticketQuantity : null,
		sectionId : null,
		sessionInfo : {
			id : null,
			timeout : null
		},
		seats : [], // selected seats
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
	pointDiameter : 0
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
		[date()], [date()], [date()], [date()], [date()], [date()], [date()],
	],[
		[date()], [date()], [date()], [date()], [date()], [date()], [date()],
	],[
		[date()], [date()], [date()], [date()], [date()], [date()], [date()],
	],[
		[date()], [date()], [date()], [date()], [date()], [date()], [date()],
	],[
		[date()], [date()], [date()], [date()], [date()], [date()], [date()],
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

R.service('ConfirmationService', [

	'gtsClass','ApplicationSettings', 'MapService', function(
	 gtsClass,  ApplicationSettings,   MapService ){

	return new (gtsClass({

		calc : ['public', function(seats){

		}],

	}))();

}]);

R.service('CurrentSelectionsService', ['gtsClass', 'PageStateService', function(gtsClass, PageStateService){

	/*
	return new (gtsClass({

		/**
		* @public
		* @function
		* @param {}  : 
		* @desc	returns the ticketQuantity from the PageStateService
		*
		getTicketQuantity : ['public', function(){
			return PageStateService.getTicketQuantity();
		}],

	}))(); */

}]);

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
				inPast = DateUtilService.inPast(cd, PageStateService.getCurrentDate());
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
				inPast = DateUtilService.inPast(td, PageStateService.getCurrentDate());
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

							if(dayObject.year == date.year && dayObject.month == (date.month + 1) &&  dayObject.day == day.date){
								cal[ri][di].available = true;
								return false;
							}
						}); 
					});
				});
			}
			callback(cal, response.data.EventDates.length);
		}],

		getShowDate : ['public', function(){

			var date = PageStateService.getEventDate();
			return [(date.month+1), date.day, date.year].join('/');
		}]
	});

	return new DatePickerService();

}]);

R.service('DateUtilService', ['gtsClass', 'DateModel', function(gtsClass, dateModel){

	/**
	* @constant
	*/
	var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
		MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'],
		DAYS_IN_MONTHS = [31,28,31,30,31,30,31,31,30,31,30,31];

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
		inPast : [function(targetDateObject, currentDateObject){

			if(targetDateObject.year < currentDateObject.year) return true;
			if(targetDateObject.month < currentDateObject.month) return true;
			if(targetDateObject.day < currentDateObject.day) return true;
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
					//console.log(date);
					date.year = this.getPrevNextYear(forward, date).year;
					date.month = 0;
					//console.log(date);
				}
			}else{
				if(date.month > 0){
					date.month--;
				}else{
					//console.log(date);
					date.year = this.getPrevNextYear(forward, date).year;
					date.month = 11;
					//console.log(date);
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
			return this.getTargetMonthName(dateObject.month) + ' ' + dateObject.day + this.getDateSuffix(dateObject.day) + ', ' + dateObject.year;
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
			return ReservedSeatService.getEventsForDay(eventDate).then(callback);
		}],

		/**
		* @memberof EventTypePickerService
		* @access public
		* @function getDateString
		* @desc get the date from {@link PageStateService.getEventDate} and send it to {@link DateUtilService.getDateString}. Return the result
		* @returns {string} the date string
		*
		getDateString : ['public', function(){
			var date = PageStateService.getEventDate();
			return DateUtilService.getDateString(date);
		}], */

		/**
		* @memberof EventTypePickerService
		* @access public
		* @function setEvent
		* @param {number} id : the eventId
		* @desc setEvent sends the eventId to {@link PageStateService.setEventId}
		* @returns {number} The eventId
		*/
		setEvent : ['public', function(eventObject){	

			this.event = eventObject;
			return PageStateService.setEventId(eventObject.id);
		}],

		getEvent : ['public', function(){
			return this.event;
		}],

		getDateString : ['public', function(){

			var date = PageStateService.getEventDate(),
				string = '';
			string += DateUtilService.getTargetMonthName(date.month)+' ';
			string += date.day+', ';
			string += date.year;
			return string;
		}]

	});

	return new EventTypePickerService();

}]);

R.service('MapService', [

	// dependencies
	'$http','gtsClass','SeatsService','StageService','SectionsService','ZoomService','PageStateService','ReservedSeatService','OptionsService','ObjectsService','ApplicationSettings','EventTypePickerService', function(
	 $http,  gtsClass,  SeatsService,  StageService,  SectionsService,  ZoomService,  PageStateService,  ReservedSeatService,  OptionsService,  ObjectsService,  ApplicationSettings, EventTypePickerService){

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
			SectionsService.setSection(section);
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
		setOption : ['public', function(optionId){
			return OptionsService.setCurrentOption(optionId);
		}],

		/**
		* @memberof MapService
		* @function clearOptions
		* @returns the result of {@link OptionsService.clearOptions}
		*/ 
		clearOptions : ['public', function(){

			return OptionsService.clearOptions();
		}],

		/**
		* @memberof MapService
		* @function getNextOption
		* @param {number} currentOptionId - the id of the current option
		* @desc send currentOptionId to {@link OptionsService.getNextOption} to get the next option. Call {@link OptionsService.mark}, sending it the {@link SeatsService.getSeats | seats} and the section {@link SectionsService.getSection}
		* @returns the next option - see {@link OptionModel}
		*/			
		getNextOption : ['public', function(currentOptionId){
			var op = OptionsService.getNextOption(currentOptionId);
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
			var call = ReservedSeatService.releaseSeats(OptionsService.getHolds());

		}],

		releaseOptions : ['public', function(option){

			var options = OptionsService.getOptions(),
				holds = [];

			angular.forEach(options, function(o, index){
				var hold = {};
				if(o.id !== option.id){
					angular.forEach(o.seats, function(seat){
						holds.push({
							SeatId : [o.section,o.row, seat.name].join('-')
						});
					});
				}
			});

			return ReservedSeatService.releaseSeats(holds);
		}],

		/**
		* @memberof MapServive
		* @function getSections
		* @returns the {@link SectionsService.getSections|sections}
		*/
		getSections : ['public', function(){
			return SectionsService.getSections();
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
		getPriceLevelData : ['public', function(option, callback){

			var priceLevels = {};

			angular.forEach(option.seats, function(seat){
				if(!priceLevels[seat.priceLevelId]){
					priceLevels[seat.priceLevelId] = {};
				}
			});

			ReservedSeatService.getPriceLevels().then(function(response){
				if(response.data.PriceLevels.length){
					angular.forEach(response.data.PriceLevels, function(pl){
						angular.forEach(option.seats, function(seat){
							if(pl.Id === seat.priceLevelId){
								seat.ticketOptions = pl.Details;
							}
						});
					});
				}
			});

			if(callback && typeof callback === 'function'){
				callback(option);
			}
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
		getMoreTime : ['public', function(callback){
			ReservedSeatService.requestMoreTime().then(function(response){
				callback(response.data);
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

			ZoomService.reZoom(option);

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

		inc : ['public', function(bool){
			ZoomService.inc(bool);
		}],

		getSectionView : ['public', function(cb){
			ReservedSeatService.getSectionView().then(cb);
		}],

		getEventId : ['public', function(){
			return PageStateService.getEventId();
		}],

		getOptionsLength : ['public', function(){
			return OptionsService.getOptions().length;
		}],

		addToCart : ['public', function(option){

			var session = PageStateService.getSessionInfo(),
				inter = {},
				event = EventTypePickerService.getEvent();
			var qsAr = window.location.search.substring(1).split('&'),
				qsObect = {};

			angular.forEach(qsAr, function(val){
				var i = val.split('=');
				qsObect[i[0]] = i[1];
			});

			angular.forEach(option.seats, function(seat){

				// fill in price
				angular.forEach(seat.ticketOptions, function(option){
					if(seat.plu === option.Plu){
						seat.price = option.Price;
					}
				});

				if(!inter[seat.plu]){
					inter[seat.plu] = {
						SeatMapId : event.seatMapId,
						EventId : event.id,
						EventName : event.name,
						EventStart : event.eventStartDate,
						EventEnd : event.eventEndDate,
						ResourceId : event.resourceId,
						Plu : seat.plu,
						CategoryExternalId : qsObect.C || '',
						Quantity : 1,
						Price : seat.price,
						ReservedSeats : [{
							EventSeatId : seat.rsSeatId,
							SessionId : session.id,
							Section : option.section,
							Row : option.row,
							Seat : seat.name
						}]
					};
				}else{
					inter[seat.plu].Quantity++;
					inter[seat.plu].ReservedSeats.push({
						EventSeatId : seat.rsSeatId,
						SessionId : session.id,
						Section : option.section,
						Row : option.row,
						Seat : seat.name
					});
				}
			});

			var arr = [];
			for (var plu in inter){
				arr.push(inter[plu]);
			}

			$http({
				method : 'POST',
				url : gts.eGalaxyWebAPI.getRoot() + 'API/Cart',
				data : arr
			}).then(function(response){
				window.location.href=gts.eGalaxyWebAPI.getRoot() + "Shop/ViewCart.aspx";
			}); 
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
				if(add){
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

	'gtsClass','OptionModel','PageStateService', function(
	 gtsClass,  OptionModel,  PageStateService){
		
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
		setCurrentOption : ['public', function(optionId){
			var targetOption = {};
			angular.forEach(this.options, function(option){
				if(optionId == option.id){
					targetOption = option;
					return false;
				}
			});
			this.currentOption = targetOption;
			return this.currentOption;
		}],

		/**
		* @memberof OptionsService
		* @access public
		* @function
		* @param {array} seats : the array of seats 
		* @desc	create options takes an array of best available seats and creates an array of the seat options
		*/
		createOptions : ['public', function(options, priceLevels){

			var optionObject,
				holds = this.holds = [];

			angular.forEach(options, angular.bind(this, function(option){
				optionObject = angular.copy(OptionModel);
				optionObject.id = option.Id;
				optionObject.section = option.Seats[0].Section;
				optionObject.row = option.Seats[0].Row;
				optionObject.seats = [];
				optionObject.seatString = '';
				angular.forEach(option.Seats, function(seat, seatIndex){

					optionObject.seatString += seat.Seat;
					if(seatIndex !== option.Seats.length - 1){
						optionObject.seatString += ',';
					}

					optionObject.seats.push({
						id : seat.Id,
						name : seat.Seat,
						priceLevelId : seat.EventPriceId,
						rsSeatId : seat.RsSeatId,
						coords : {
							x : seat.CoordinateX,
							y : seat.CoordinateY
						}
					});
				});

				optionObject.plus = this.getPlus(option, priceLevels);
				this.addOption(optionObject);
			}));

			return this.setCurrentOption(this.options.length ? this.options[0].id : null);
		}],

		getPlus : ['private', function(option, priceLevels){

			/*

			var priceLevel, priceLevelId = option.Seats[0].PriceLevelId;

			angular.forEach(priceLevels, function(indPriceLevel){
				if(indPriceLevel.Id === priceLevelId){
					priceLevel = indPriceLevel;
					return false;
				}
			});

			var quantities = PageStateService.getTicketQuantity();

			var plus = [];

			angular.forEach(quantities, function(q){
				angular.forEach(priceLevel.Details, function(d){
					if(d.ProductCategory === q.name){
						q.plu = d.Plu;
						q.price = d.Price;
						return false;
					}
				});
				plus.push({
					plu : q.plu,
					price : q.price,
					name : q.name
				});
			});
			return plus; */
		}],

		/**
		* @memberof OptionsService
		* @access public
		* @function
		* @param {array} seat : the seats
		* @param {object} section : the section
		*/
		mark : ['public', function(seats, section){

			var fullOptionsArray = [];

			angular.forEach(this.options, function(option){
				angular.forEach(option.seats, function(seat){
					fullOptionsArray.push(seat.id);
				});
			});

			var optionSet = this.getCurrentOption(),
				oLimits = {
					minX : 100,
					minY : 100,
					maxX : 0,
					maxY : 0
				};

			angular.forEach(seats, function(seat){
				seat.selected = false;
				angular.forEach(optionSet.seats, function(optionSeat){
					if(optionSeat.id === seat.id){
						oLimits.minX = (seat.x < oLimits.minX) ? seat.x : oLimits.minX;
						oLimits.minY = (seat.y < oLimits.minY) ? seat.y : oLimits.minY;
						oLimits.maxX = (seat.x > oLimits.maxX) ? seat.x : oLimits.maxX;
						oLimits.maxY = (seat.y > oLimits.maxY) ? seat.y : oLimits.maxY;
						seat.selected = true;
						return false;
					}
				});

				seat.available = (angular.inArray(seat.id, fullOptionsArray) > -1);

			});

			//console.log(oLimits);

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
		* @access private
		* @function
		* @param {array} priceLevels : an array of price levels
		* @desc	return the correct price level;
		*/
		addPriceLevels : ['private', function(seat, priceLevels){

			var pls;
			angular.forEach(priceLevels, function(pl){
				if(pl.Id === seat.PriceLevelId){
					pls = pl;
					return false;
				}
			});
			return pls;
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
	'gtsClass','PageStateModel','DateUtilService','Communicator','ApplicationSettings',function(
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
		* @access public
		* @function
		* @returns {}
		* unitTested
		*/
		getToken : [function(){
			return this.state.token;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @desc setToken sets the token on the state object
		*/
		setToken : ['public', function(token){
			this.state.token = token;
		}],

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
			if(eId !== this.state.eventId){
				this.state.eventId = eId;
				this.setSectionId(null);
			}
			Communicator.send('eventId', this.state.eventId);
			return this.state.eventId;
		}],

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
			}
			Communicator.send('ticketQuantity', this.state.ticketQuantity);
			return this.state.ticketQuantity;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @unitTested
		* @desc getSectionId returns the sectionId from the state object
		*/
		getSectionId : [function(){
			return this.state.sectionId;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @unitTested
		* @desc setSectionId sets the sectionId on the state object. It then communicates the event
		*/
		setSectionId : [function(sectionId){
			if(this.state.sectionId !== sectionId){
				this.state.sectionId = sectionId;
			}
			Communicator.send('sectionId', this.state.sectionId);
			return this.state.sectionId;
		}],

		/**
		* @memberof PageStateService
		* @access public	
		* @function
		* @param {array} seats : an array of seat objects
		* @desc	set the seats array on the sttate object
		*/
		selectSeats : ['public', function(seatOption){
			this.state.seats = seatOption;
			Communicator.send('seats', this.state.seats);
			return this.state.seats;
		}],

		/**
		* @memberof PageStateService
		* @access public
		* @function
		* @desc	returns the seats from the state object
		*/
		getSeats : ['public', function(){
			return this.state.seats;
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

		requestPayload : ['public', function(){
			return this.state;
		}],

		seatSeatMapId : ['public', function(seatMapId){
			this.state.seatMapId = seatMapId;
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
			if(quantity){
				if(quantity <= this.ticketQuantityLimit){
					PageStateService.setTicketQuantity(quantity);
					return false;
				}else{
					PageStateService.setTicketQuantity(null);
					return 'tooMany';
				}
			}else{
				PageStateService.setTicketQuantity(null);
				return 'zero';
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
					console.log('fail');
				});
			}
		}],

		getTicketTotal : ['public', function(){

			var total = 0;
			angular.forEach(this.tickets, function(ticket){
				if(ticket.quantity !== 0){
					total += parseFloat(ticket.quantity);
				}
			});

			return total;
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
					endDateTime : endString
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
				section : PageStateService.getSectionId()
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

			var data = {
					Quantity : PageStateService.getTicketQuantity(),
					Section : PageStateService.getSectionId()
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
		    if (holds.length) {
		        var data = {
		            SessionId: PageStateService.getSessionInfo().id,
		            Reservations: holds
		        };

		        return x['delete'](['Events', PageStateService.getEventId(), 'reservations'], {}, data);
		    } else {
		        return x.blank();
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
		getPriceLevels : ['public', function(){
			return x.get(['events',PageStateService.getEventId(),'pricelevels']);
		}],

		getSectionView : ['public', function(){

			var section = encodeURIComponent(PageStateService.getSectionId());

			return x.get(['events', PageStateService.getEventId(), 'sections', section, 'view']);
		}],

		getTicketTypes : ['public', function(){

			var etid = PageStateService.getEventTypeId();

			etid = 0;

			return x.get(['productcategories', etid]);
		}]

	});

	return new ReservedSeatService();

}]);

R.service('ResponderService', [
	
	// dependencies
	'gtsClass', function(
	 gtsClass){

	// polyfill older event listeners
	var addEvent = window.addEventListener || window.attachEvent;

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

			var t;

			var calculcateBreakers = (function(context){
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

		large : function(){
			var w = $('[data-gts-reserved-seat]').innerWidth();
			return (w >= 800);
		},

		medium : function(){
			var w = $('[data-gts-reserved-seat]').innerWidth();
			return (w >= 550 && w < 800 );
		},

		small : function(){
			var w = $('[data-gts-reserved-seat]').innerWidth();
			return (w < 550 );
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
					name : seat.Seat
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

			// reset
			var sections = this.sections = [],
				stageLimits = StageService.getStage().limits;

			// loop through the sections
			angular.forEach(data.Sections, function(section){
				
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
					pointDiameter : (pr / sectionLimits.width) * 100
				});

				var string = '';
				angular.forEach(section.Boundaries, function(boundary){
					string += ' '+(boundary.X)+','+(boundary.Y);
				});

				sectionObject.points = string;
				sections.push(sectionObject);
			});
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
		* @desc	sends the section to {@link PageStateService.setSectionId}
		* @returns {object} the section
		*/
		setSection : ['public', function(section){
			this.section = section;
			var id = (section && section.id) ? section.id : null;
			return PageStateService.setSectionId(id);
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
		}]

	});
	return new SectionsService();
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
	'gtsClass','TimerModel',function(
	 gtsClass, TimerModel){
	
	/**
	* @class ZoomService
	* @classdesc ZoomService is responsible for zooming in on the stage so a section takes up the full viewport
	*/
	var TimerService = gtsClass({

		timers : ['private', []],

		clearTimer : ['public', function(timerId, index){

			//console.log(timerId);
			//debugger;

			var timers = this.timers;
			angular.forEach(timers, function(timer){

				//console.log('loop', timer, timerId, timers);
				//debugger;

				if(timer.id === timerId){
					clearTimeout(timer.timer);

					//console.log('timerCleared', timer);
					//debugger;

					if(timer.interval){
						clearInterval(timer.interval);
						//console.log('intervalCleared', timer);
						//debugger;
					}
					if(timer.onChange && typeof timer.onChange === 'function'){
						timer.onChange(null);
						//console.log('timer change killed', timer);
					}
					timers.splice(index, 1);
				}
			});
		}],

		startTimer : ['public', function(timerObject){
			this.clearTimer(timerObject.id);
			this.timers.push(timerObject);
			timerObject.timer = setTimeout(function(){
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

		reZoom : ['public', function(){

			var stage = StageService.getStage(),
				option = OptionsService.getCurrentOption(),
				section = SectionsService.getSection(),
				seat = {
					coords : {
						y : 0
					}
				};

			if(option){
				seat = option.seats[0];
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

		inc : ['public', function(bool){

			if(bool){

				if(this.zoomScale < 1){
					this.zoomScale = this.zoomScale * 1.25;
				}

			}else{
				if(this.zoomScale > 0.4){

					this.zoomScale = this.zoomScale / 1.25;
				}
			}

			this.reZoom();
		}],

	});

	return new ZoomService();

}]);

var EVENTDATES = {data : {"Dates":["2014-10-01T00:00:00","2014-10-02T00:00:00","2014-10-04T00:00:00","2014-10-31T00:00:00"]}},
	EVENTS = {data : {"Events":[{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1660"},{"Rel":"bestavailable","Href":"http://shdr-rs/EventManagementServer/api/events/1660/bestavailable"},{"Rel":"holds","Href":"http://shdr-rs/EventManagementServer/api/events/1660/holds"},{"Rel":"pricelevels","Href":"http://shdr-rs/EventManagementServer/api/events/1660/pricelevels"},{"Rel":"reservations","Href":"http://shdr-rs/EventManagementServer/api/events/1660/reservations"},{"Rel":"seats","Href":"http://shdr-rs/EventManagementServer/api/events/1660/seats"},{"Rel":"sections","Href":"http://shdr-rs/EventManagementServer/api/events/1660/sections"}],"Id":1660,"EventTypeId":11,"Availability":0,"ResourceId":32,"SeatMapId":683,"Name":"MOVIE","StartDateTime":"2014-10-04T12:00:00","EndDateTime":"2014-10-04T13:00:00","OnSaleDateTime":"2014-09-30T08:00:00","OffSaleDateTime":"2014-10-04T12:00:00"}]}},
	SECTIONS = {data : {"Sections":[{"Name":"Section 1","Boundaries":[{"X":52,"Y":74},{"X":52,"Y":434},{"X":316,"Y":434},{"X":316,"Y":74}]},{"Name":"Section 3","Boundaries":[{"X":837,"Y":76},{"X":837,"Y":436},{"X":1077,"Y":436},{"X":1077,"Y":76}]},{"Name":"Section 2","Boundaries":[{"X":381,"Y":74},{"X":381,"Y":434},{"X":765,"Y":434},{"X":765,"Y":74}]},{"Name":"Section 4","Boundaries":[{"X":50,"Y":499},{"X":50,"Y":731},{"X":314,"Y":731},{"X":314,"Y":499}]},{"Name":"Section 6","Boundaries":[{"X":403,"Y":582},{"X":403,"Y":763},{"X":739,"Y":763},{"X":739,"Y":582}]},{"Name":"Section 5","Boundaries":[{"X":829,"Y":497},{"X":829,"Y":729},{"X":1093,"Y":729},{"X":1093,"Y":497}]}]}},
	SEATS = {data : {"SessionId":null,"SessionTimeout":null,"Seats":[{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-E-6"}],"Id":119532,"EventId":1661,"Section":"Section 2","Row":"E","Seat":"6","Adjacency":232,"CoordinateX":571,"CoordinateY":170,"Rank":38,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-E-7"}],"Id":119533,"EventId":1661,"Section":"Section 2","Row":"E","Seat":"7","Adjacency":233,"CoordinateX":595,"CoordinateY":170,"Rank":39,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-E-8"}],"Id":119534,"EventId":1661,"Section":"Section 2","Row":"E","Seat":"8","Adjacency":234,"CoordinateX":619,"CoordinateY":170,"Rank":41,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-E-9"}],"Id":119535,"EventId":1661,"Section":"Section 2","Row":"E","Seat":"9","Adjacency":235,"CoordinateX":643,"CoordinateY":170,"Rank":45,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-E-10"}],"Id":119536,"EventId":1661,"Section":"Section 2","Row":"E","Seat":"10","Adjacency":236,"CoordinateX":667,"CoordinateY":170,"Rank":49,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-E-11"}],"Id":119537,"EventId":1661,"Section":"Section 2","Row":"E","Seat":"11","Adjacency":237,"CoordinateX":691,"CoordinateY":170,"Rank":57,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-D-12"}],"Id":119526,"EventId":1661,"Section":"Section 2","Row":"D","Seat":"12","Adjacency":225,"CoordinateX":703,"CoordinateY":146,"Rank":51,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-E-1"}],"Id":119527,"EventId":1661,"Section":"Section 2","Row":"E","Seat":"1","Adjacency":227,"CoordinateX":451,"CoordinateY":170,"Rank":58,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-E-2"}],"Id":119528,"EventId":1661,"Section":"Section 2","Row":"E","Seat":"2","Adjacency":228,"CoordinateX":475,"CoordinateY":170,"Rank":50,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-E-3"}],"Id":119529,"EventId":1661,"Section":"Section 2","Row":"E","Seat":"3","Adjacency":229,"CoordinateX":499,"CoordinateY":170,"Rank":46,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-E-4"}],"Id":119530,"EventId":1661,"Section":"Section 2","Row":"E","Seat":"4","Adjacency":230,"CoordinateX":523,"CoordinateY":170,"Rank":42,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-E-5"}],"Id":119531,"EventId":1661,"Section":"Section 2","Row":"E","Seat":"5","Adjacency":231,"CoordinateX":547,"CoordinateY":170,"Rank":40,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-D-6"}],"Id":119520,"EventId":1661,"Section":"Section 2","Row":"D","Seat":"6","Adjacency":219,"CoordinateX":559,"CoordinateY":146,"Rank":26,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-D-7"}],"Id":119521,"EventId":1661,"Section":"Section 2","Row":"D","Seat":"7","Adjacency":220,"CoordinateX":583,"CoordinateY":146,"Rank":27,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-D-8"}],"Id":119522,"EventId":1661,"Section":"Section 2","Row":"D","Seat":"8","Adjacency":221,"CoordinateX":607,"CoordinateY":146,"Rank":30,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-D-9"}],"Id":119523,"EventId":1661,"Section":"Section 2","Row":"D","Seat":"9","Adjacency":222,"CoordinateX":631,"CoordinateY":146,"Rank":32,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-D-10"}],"Id":119524,"EventId":1661,"Section":"Section 2","Row":"D","Seat":"10","Adjacency":223,"CoordinateX":655,"CoordinateY":146,"Rank":36,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-D-11"}],"Id":119525,"EventId":1661,"Section":"Section 2","Row":"D","Seat":"11","Adjacency":224,"CoordinateX":679,"CoordinateY":146,"Rank":43,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-C-10"}],"Id":119514,"EventId":1661,"Section":"Section 2","Row":"C","Seat":"10","Adjacency":212,"CoordinateX":680,"CoordinateY":122,"Rank":35,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-D-1"}],"Id":119515,"EventId":1661,"Section":"Section 2","Row":"D","Seat":"1","Adjacency":214,"CoordinateX":439,"CoordinateY":146,"Rank":54,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-D-2"}],"Id":119516,"EventId":1661,"Section":"Section 2","Row":"D","Seat":"2","Adjacency":215,"CoordinateX":463,"CoordinateY":146,"Rank":44,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-D-3"}],"Id":119517,"EventId":1661,"Section":"Section 2","Row":"D","Seat":"3","Adjacency":216,"CoordinateX":487,"CoordinateY":146,"Rank":37,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-D-4"}],"Id":119518,"EventId":1661,"Section":"Section 2","Row":"D","Seat":"4","Adjacency":217,"CoordinateX":511,"CoordinateY":146,"Rank":33,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-D-5"}],"Id":119519,"EventId":1661,"Section":"Section 2","Row":"D","Seat":"5","Adjacency":218,"CoordinateX":535,"CoordinateY":146,"Rank":31,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-C-4"}],"Id":119508,"EventId":1661,"Section":"Section 2","Row":"C","Seat":"4","Adjacency":206,"CoordinateX":536,"CoordinateY":122,"Rank":19,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-C-5"}],"Id":119509,"EventId":1661,"Section":"Section 2","Row":"C","Seat":"5","Adjacency":207,"CoordinateX":560,"CoordinateY":122,"Rank":15,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-C-6"}],"Id":119510,"EventId":1661,"Section":"Section 2","Row":"C","Seat":"6","Adjacency":208,"CoordinateX":584,"CoordinateY":122,"Rank":17,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-C-7"}],"Id":119511,"EventId":1661,"Section":"Section 2","Row":"C","Seat":"7","Adjacency":209,"CoordinateX":608,"CoordinateY":122,"Rank":18,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-C-8"}],"Id":119512,"EventId":1661,"Section":"Section 2","Row":"C","Seat":"8","Adjacency":210,"CoordinateX":632,"CoordinateY":122,"Rank":23,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-C-9"}],"Id":119513,"EventId":1661,"Section":"Section 2","Row":"C","Seat":"9","Adjacency":211,"CoordinateX":656,"CoordinateY":122,"Rank":29,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-8"}],"Id":119502,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"8","Adjacency":199,"CoordinateX":632,"CoordinateY":97,"Rank":13,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-9"}],"Id":119503,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"9","Adjacency":200,"CoordinateX":656,"CoordinateY":97,"Rank":21,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-10"}],"Id":119504,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"10","Adjacency":201,"CoordinateX":680,"CoordinateY":97,"Rank":25,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-C-1"}],"Id":119505,"EventId":1661,"Section":"Section 2","Row":"C","Seat":"1","Adjacency":203,"CoordinateX":464,"CoordinateY":122,"Rank":34,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-C-2"}],"Id":119506,"EventId":1661,"Section":"Section 2","Row":"C","Seat":"2","Adjacency":204,"CoordinateX":488,"CoordinateY":122,"Rank":28,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-C-3"}],"Id":119507,"EventId":1661,"Section":"Section 2","Row":"C","Seat":"3","Adjacency":205,"CoordinateX":512,"CoordinateY":122,"Rank":22,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-2"}],"Id":119496,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"2","Adjacency":193,"CoordinateX":488,"CoordinateY":97,"Rank":20,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-3"}],"Id":119497,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"3","Adjacency":194,"CoordinateX":512,"CoordinateY":97,"Rank":12,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-4"}],"Id":119498,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"4","Adjacency":195,"CoordinateX":536,"CoordinateY":97,"Rank":9,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-5"}],"Id":119499,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"5","Adjacency":196,"CoordinateX":560,"CoordinateY":97,"Rank":7,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-6"}],"Id":119500,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"6","Adjacency":197,"CoordinateX":584,"CoordinateY":97,"Rank":6,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-7"}],"Id":119501,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"7","Adjacency":198,"CoordinateX":608,"CoordinateY":97,"Rank":10,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-9"}],"Id":119490,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"9","Adjacency":186,"CoordinateX":573,"CoordinateY":74,"Rank":1,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-10"}],"Id":119491,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"10","Adjacency":187,"CoordinateX":597,"CoordinateY":74,"Rank":3,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-11"}],"Id":119492,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"11","Adjacency":188,"CoordinateX":621,"CoordinateY":74,"Rank":5,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-12"}],"Id":119493,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"12","Adjacency":189,"CoordinateX":645,"CoordinateY":74,"Rank":11,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-13"}],"Id":119494,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"13","Adjacency":190,"CoordinateX":669,"CoordinateY":74,"Rank":16,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-1"}],"Id":119495,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"1","Adjacency":192,"CoordinateX":464,"CoordinateY":97,"Rank":24,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-5"}],"Id":119486,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"5","Adjacency":182,"CoordinateX":477,"CoordinateY":74,"Rank":14,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-6"}],"Id":119487,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"6","Adjacency":183,"CoordinateX":501,"CoordinateY":74,"Rank":8,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-7"}],"Id":119488,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"7","Adjacency":184,"CoordinateX":525,"CoordinateY":74,"Rank":4,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-8"}],"Id":119489,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"8","Adjacency":185,"CoordinateX":549,"CoordinateY":74,"Rank":2,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-5"}],"Id":119674,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"5","Adjacency":384,"CoordinateX":477,"CoordinateY":410,"Rank":290,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-6"}],"Id":119675,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"6","Adjacency":385,"CoordinateX":501,"CoordinateY":410,"Rank":282,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-7"}],"Id":119676,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"7","Adjacency":386,"CoordinateX":525,"CoordinateY":410,"Rank":276,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-8"}],"Id":119677,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"8","Adjacency":387,"CoordinateX":549,"CoordinateY":410,"Rank":271,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-9"}],"Id":119678,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"9","Adjacency":388,"CoordinateX":573,"CoordinateY":410,"Rank":267,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-10"}],"Id":119679,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"10","Adjacency":389,"CoordinateX":597,"CoordinateY":410,"Rank":270,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-11"}],"Id":119680,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"11","Adjacency":390,"CoordinateX":621,"CoordinateY":410,"Rank":277,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-12"}],"Id":119681,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"12","Adjacency":391,"CoordinateX":645,"CoordinateY":410,"Rank":287,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-13"}],"Id":119682,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"13","Adjacency":392,"CoordinateX":669,"CoordinateY":410,"Rank":292,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-14"}],"Id":119683,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"14","Adjacency":393,"CoordinateX":693,"CoordinateY":410,"Rank":304,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-15"}],"Id":119684,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"15","Adjacency":394,"CoordinateX":717,"CoordinateY":410,"Rank":316,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-16"}],"Id":119685,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"16","Adjacency":395,"CoordinateX":741,"CoordinateY":410,"Rank":335,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-17"}],"Id":119686,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"17","Adjacency":396,"CoordinateX":765,"CoordinateY":410,"Rank":350,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-P-1"}],"Id":119687,"EventId":1661,"Section":"Section 2","Row":"P","Seat":"1","Adjacency":398,"CoordinateX":381,"CoordinateY":434,"Rank":378,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-P-4"}],"Id":119688,"EventId":1661,"Section":"Section 2","Row":"P","Seat":"4","Adjacency":399,"CoordinateX":453,"CoordinateY":434,"Rank":343,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-P-6"}],"Id":119689,"EventId":1661,"Section":"Section 2","Row":"P","Seat":"6","Adjacency":400,"CoordinateX":501,"CoordinateY":434,"Rank":326,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-P-7"}],"Id":119690,"EventId":1661,"Section":"Section 2","Row":"P","Seat":"7","Adjacency":401,"CoordinateX":525,"CoordinateY":434,"Rank":320,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-P-8"}],"Id":119691,"EventId":1661,"Section":"Section 2","Row":"P","Seat":"8","Adjacency":402,"CoordinateX":549,"CoordinateY":434,"Rank":318,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-P-9"}],"Id":119692,"EventId":1661,"Section":"Section 2","Row":"P","Seat":"9","Adjacency":403,"CoordinateX":573,"CoordinateY":434,"Rank":312,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-P-10"}],"Id":119693,"EventId":1661,"Section":"Section 2","Row":"P","Seat":"10","Adjacency":404,"CoordinateX":597,"CoordinateY":434,"Rank":317,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-P-11"}],"Id":119694,"EventId":1661,"Section":"Section 2","Row":"P","Seat":"11","Adjacency":405,"CoordinateX":621,"CoordinateY":434,"Rank":322,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-P-12"}],"Id":119695,"EventId":1661,"Section":"Section 2","Row":"P","Seat":"12","Adjacency":406,"CoordinateX":645,"CoordinateY":434,"Rank":327,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-P-14"}],"Id":119696,"EventId":1661,"Section":"Section 2","Row":"P","Seat":"14","Adjacency":407,"CoordinateX":693,"CoordinateY":434,"Rank":345,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-P-17"}],"Id":119697,"EventId":1661,"Section":"Section 2","Row":"P","Seat":"17","Adjacency":408,"CoordinateX":765,"CoordinateY":434,"Rank":379,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-1"}],"Id":119654,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"1","Adjacency":363,"CoordinateX":394,"CoordinateY":386,"Rank":298,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-2"}],"Id":119655,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"2","Adjacency":364,"CoordinateX":418,"CoordinateY":386,"Rank":281,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-3"}],"Id":119656,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"3","Adjacency":365,"CoordinateX":442,"CoordinateY":386,"Rank":264,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-4"}],"Id":119657,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"4","Adjacency":366,"CoordinateX":466,"CoordinateY":386,"Rank":252,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-5"}],"Id":119658,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"5","Adjacency":367,"CoordinateX":490,"CoordinateY":386,"Rank":244,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-6"}],"Id":119659,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"6","Adjacency":368,"CoordinateX":514,"CoordinateY":386,"Rank":237,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-7"}],"Id":119660,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"7","Adjacency":369,"CoordinateX":538,"CoordinateY":386,"Rank":231,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-8"}],"Id":119661,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"8","Adjacency":370,"CoordinateX":562,"CoordinateY":386,"Rank":230,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-9"}],"Id":119662,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"9","Adjacency":371,"CoordinateX":586,"CoordinateY":386,"Rank":229,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-10"}],"Id":119663,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"10","Adjacency":372,"CoordinateX":610,"CoordinateY":386,"Rank":232,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-11"}],"Id":119664,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"11","Adjacency":373,"CoordinateX":634,"CoordinateY":386,"Rank":240,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-12"}],"Id":119665,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"12","Adjacency":374,"CoordinateX":658,"CoordinateY":386,"Rank":247,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-13"}],"Id":119666,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"13","Adjacency":375,"CoordinateX":682,"CoordinateY":386,"Rank":255,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-14"}],"Id":119667,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"14","Adjacency":376,"CoordinateX":706,"CoordinateY":386,"Rank":266,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-15"}],"Id":119668,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"15","Adjacency":377,"CoordinateX":730,"CoordinateY":386,"Rank":286,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-N-16"}],"Id":119669,"EventId":1661,"Section":"Section 2","Row":"N","Seat":"16","Adjacency":378,"CoordinateX":754,"CoordinateY":386,"Rank":301,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-1"}],"Id":119670,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"1","Adjacency":380,"CoordinateX":381,"CoordinateY":410,"Rank":348,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-2"}],"Id":119671,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"2","Adjacency":381,"CoordinateX":405,"CoordinateY":410,"Rank":331,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-3"}],"Id":119672,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"3","Adjacency":382,"CoordinateX":429,"CoordinateY":410,"Rank":311,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-O-4"}],"Id":119673,"EventId":1661,"Section":"Section 2","Row":"O","Seat":"4","Adjacency":383,"CoordinateX":453,"CoordinateY":410,"Rank":302,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1939,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-3"}],"Id":119565,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"3","Adjacency":268,"CoordinateX":463,"CoordinateY":242,"Rank":86,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-4"}],"Id":119566,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"4","Adjacency":269,"CoordinateX":487,"CoordinateY":242,"Rank":82,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-5"}],"Id":119567,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"5","Adjacency":270,"CoordinateX":511,"CoordinateY":242,"Rank":79,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-6"}],"Id":119568,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"6","Adjacency":271,"CoordinateX":535,"CoordinateY":242,"Rank":77,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-7"}],"Id":119569,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"7","Adjacency":272,"CoordinateX":559,"CoordinateY":242,"Rank":74,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-8"}],"Id":119570,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"8","Adjacency":273,"CoordinateX":583,"CoordinateY":242,"Rank":75,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-9"}],"Id":119571,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"9","Adjacency":274,"CoordinateX":607,"CoordinateY":242,"Rank":76,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-10"}],"Id":119572,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"10","Adjacency":275,"CoordinateX":631,"CoordinateY":242,"Rank":81,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-11"}],"Id":119573,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"11","Adjacency":276,"CoordinateX":655,"CoordinateY":242,"Rank":83,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-12"}],"Id":119574,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"12","Adjacency":277,"CoordinateX":679,"CoordinateY":242,"Rank":87,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-13"}],"Id":119575,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"13","Adjacency":278,"CoordinateX":703,"CoordinateY":242,"Rank":98,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-14"}],"Id":119576,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"14","Adjacency":279,"CoordinateX":727,"CoordinateY":242,"Rank":104,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-1"}],"Id":119577,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"1","Adjacency":281,"CoordinateX":403,"CoordinateY":266,"Rank":134,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-2"}],"Id":119578,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"2","Adjacency":282,"CoordinateX":427,"CoordinateY":266,"Rank":122,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-3"}],"Id":119579,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"3","Adjacency":283,"CoordinateX":451,"CoordinateY":266,"Rank":111,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-4"}],"Id":119580,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"4","Adjacency":284,"CoordinateX":475,"CoordinateY":266,"Rank":101,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-5"}],"Id":119581,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"5","Adjacency":285,"CoordinateX":499,"CoordinateY":266,"Rank":97,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-6"}],"Id":119582,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"6","Adjacency":286,"CoordinateX":523,"CoordinateY":266,"Rank":92,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-7"}],"Id":119583,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"7","Adjacency":287,"CoordinateX":547,"CoordinateY":266,"Rank":90,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-8"}],"Id":119584,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"8","Adjacency":288,"CoordinateX":571,"CoordinateY":266,"Rank":89,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-9"}],"Id":119585,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"9","Adjacency":289,"CoordinateX":595,"CoordinateY":266,"Rank":91,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-10"}],"Id":119586,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"10","Adjacency":290,"CoordinateX":619,"CoordinateY":266,"Rank":93,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-11"}],"Id":119587,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"11","Adjacency":291,"CoordinateX":643,"CoordinateY":266,"Rank":96,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-12"}],"Id":119588,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"12","Adjacency":292,"CoordinateX":667,"CoordinateY":266,"Rank":100,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-13"}],"Id":119589,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"13","Adjacency":293,"CoordinateX":691,"CoordinateY":266,"Rank":112,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-14"}],"Id":119590,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"14","Adjacency":294,"CoordinateX":715,"CoordinateY":266,"Rank":121,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-I-15"}],"Id":119591,"EventId":1661,"Section":"Section 2","Row":"I","Seat":"15","Adjacency":295,"CoordinateX":739,"CoordinateY":266,"Rank":133,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-1"}],"Id":119592,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"1","Adjacency":297,"CoordinateX":416,"CoordinateY":290,"Rank":152,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-2"}],"Id":119593,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"2","Adjacency":298,"CoordinateX":440,"CoordinateY":290,"Rank":141,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-3"}],"Id":119594,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"3","Adjacency":299,"CoordinateX":464,"CoordinateY":290,"Rank":127,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-4"}],"Id":119595,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"4","Adjacency":300,"CoordinateX":488,"CoordinateY":290,"Rank":119,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-5"}],"Id":119596,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"5","Adjacency":301,"CoordinateX":512,"CoordinateY":290,"Rank":115,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-6"}],"Id":119597,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"6","Adjacency":302,"CoordinateX":536,"CoordinateY":290,"Rank":110,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-7"}],"Id":119598,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"7","Adjacency":303,"CoordinateX":560,"CoordinateY":290,"Rank":108,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-8"}],"Id":119599,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"8","Adjacency":304,"CoordinateX":584,"CoordinateY":290,"Rank":107,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-9"}],"Id":119600,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"9","Adjacency":305,"CoordinateX":608,"CoordinateY":290,"Rank":109,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-10"}],"Id":119601,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"10","Adjacency":306,"CoordinateX":632,"CoordinateY":290,"Rank":117,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-11"}],"Id":119602,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"11","Adjacency":307,"CoordinateX":656,"CoordinateY":290,"Rank":120,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-12"}],"Id":119603,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"12","Adjacency":308,"CoordinateX":680,"CoordinateY":290,"Rank":128,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-13"}],"Id":119604,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"13","Adjacency":309,"CoordinateX":704,"CoordinateY":290,"Rank":142,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-J-14"}],"Id":119605,"EventId":1661,"Section":"Section 2","Row":"J","Seat":"14","Adjacency":310,"CoordinateX":728,"CoordinateY":290,"Rank":154,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-1"}],"Id":119606,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"1","Adjacency":312,"CoordinateX":403,"CoordinateY":314,"Rank":187,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-2"}],"Id":119607,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"2","Adjacency":313,"CoordinateX":427,"CoordinateY":314,"Rank":172,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-3"}],"Id":119608,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"3","Adjacency":314,"CoordinateX":451,"CoordinateY":314,"Rank":159,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-4"}],"Id":119609,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"4","Adjacency":315,"CoordinateX":475,"CoordinateY":314,"Rank":150,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-5"}],"Id":119610,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"5","Adjacency":316,"CoordinateX":499,"CoordinateY":314,"Rank":145,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-6"}],"Id":119611,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"6","Adjacency":317,"CoordinateX":523,"CoordinateY":314,"Rank":140,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-7"}],"Id":119612,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"7","Adjacency":318,"CoordinateX":547,"CoordinateY":314,"Rank":132,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-8"}],"Id":119613,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"8","Adjacency":319,"CoordinateX":571,"CoordinateY":314,"Rank":130,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-9"}],"Id":119614,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"9","Adjacency":320,"CoordinateX":595,"CoordinateY":314,"Rank":131,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-10"}],"Id":119615,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"10","Adjacency":321,"CoordinateX":619,"CoordinateY":314,"Rank":139,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-11"}],"Id":119616,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"11","Adjacency":322,"CoordinateX":643,"CoordinateY":314,"Rank":144,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-12"}],"Id":119617,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"12","Adjacency":323,"CoordinateX":667,"CoordinateY":314,"Rank":151,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-13"}],"Id":119618,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"13","Adjacency":324,"CoordinateX":691,"CoordinateY":314,"Rank":158,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-14"}],"Id":119619,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"14","Adjacency":325,"CoordinateX":715,"CoordinateY":314,"Rank":171,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-K-15"}],"Id":119620,"EventId":1661,"Section":"Section 2","Row":"K","Seat":"15","Adjacency":326,"CoordinateX":739,"CoordinateY":314,"Rank":186,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-1"}],"Id":119621,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"1","Adjacency":328,"CoordinateX":390,"CoordinateY":337,"Rank":224,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-2"}],"Id":119622,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"2","Adjacency":329,"CoordinateX":414,"CoordinateY":337,"Rank":211,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-3"}],"Id":119623,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"3","Adjacency":330,"CoordinateX":438,"CoordinateY":337,"Rank":194,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-4"}],"Id":119624,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"4","Adjacency":331,"CoordinateX":462,"CoordinateY":337,"Rank":185,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-5"}],"Id":119625,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"5","Adjacency":332,"CoordinateX":486,"CoordinateY":337,"Rank":178,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-6"}],"Id":119626,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"6","Adjacency":333,"CoordinateX":510,"CoordinateY":337,"Rank":170,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-7"}],"Id":119627,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"7","Adjacency":334,"CoordinateX":534,"CoordinateY":337,"Rank":165,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-8"}],"Id":119628,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"8","Adjacency":335,"CoordinateX":558,"CoordinateY":337,"Rank":162,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-9"}],"Id":119629,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"9","Adjacency":336,"CoordinateX":582,"CoordinateY":337,"Rank":161,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-10"}],"Id":119630,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"10","Adjacency":337,"CoordinateX":606,"CoordinateY":337,"Rank":166,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-11"}],"Id":119631,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"11","Adjacency":338,"CoordinateX":630,"CoordinateY":337,"Rank":169,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-12"}],"Id":119632,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"12","Adjacency":339,"CoordinateX":654,"CoordinateY":337,"Rank":176,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-13"}],"Id":119633,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"13","Adjacency":340,"CoordinateX":678,"CoordinateY":337,"Rank":183,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-14"}],"Id":119634,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"14","Adjacency":341,"CoordinateX":702,"CoordinateY":337,"Rank":195,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-15"}],"Id":119635,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"15","Adjacency":342,"CoordinateX":726,"CoordinateY":337,"Rank":209,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-L-16"}],"Id":119636,"EventId":1661,"Section":"Section 2","Row":"L","Seat":"16","Adjacency":343,"CoordinateX":750,"CoordinateY":337,"Rank":223,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-1"}],"Id":119637,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"1","Adjacency":345,"CoordinateX":381,"CoordinateY":362,"Rank":265,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-2"}],"Id":119638,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"2","Adjacency":346,"CoordinateX":405,"CoordinateY":362,"Rank":248,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-3"}],"Id":119639,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"3","Adjacency":347,"CoordinateX":429,"CoordinateY":362,"Rank":235,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-4"}],"Id":119640,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"4","Adjacency":348,"CoordinateX":453,"CoordinateY":362,"Rank":221,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-5"}],"Id":119641,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"5","Adjacency":349,"CoordinateX":477,"CoordinateY":362,"Rank":213,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-6"}],"Id":119642,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"6","Adjacency":350,"CoordinateX":501,"CoordinateY":362,"Rank":204,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-7"}],"Id":119643,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"7","Adjacency":351,"CoordinateX":525,"CoordinateY":362,"Rank":200,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-8"}],"Id":119644,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"8","Adjacency":352,"CoordinateX":549,"CoordinateY":362,"Rank":197,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-9"}],"Id":119645,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"9","Adjacency":353,"CoordinateX":573,"CoordinateY":362,"Rank":193,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-10"}],"Id":119646,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"10","Adjacency":354,"CoordinateX":597,"CoordinateY":362,"Rank":196,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-11"}],"Id":119647,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"11","Adjacency":355,"CoordinateX":621,"CoordinateY":362,"Rank":201,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-12"}],"Id":119648,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"12","Adjacency":356,"CoordinateX":645,"CoordinateY":362,"Rank":203,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-13"}],"Id":119649,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"13","Adjacency":357,"CoordinateX":669,"CoordinateY":362,"Rank":214,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-14"}],"Id":119650,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"14","Adjacency":358,"CoordinateX":693,"CoordinateY":362,"Rank":222,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-15"}],"Id":119651,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"15","Adjacency":359,"CoordinateX":717,"CoordinateY":362,"Rank":238,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-16"}],"Id":119652,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"16","Adjacency":360,"CoordinateX":741,"CoordinateY":362,"Rank":251,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-M-17"}],"Id":119653,"EventId":1661,"Section":"Section 2","Row":"M","Seat":"17","Adjacency":361,"CoordinateX":765,"CoordinateY":362,"Rank":268,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-F-1"}],"Id":119538,"EventId":1661,"Section":"Section 2","Row":"F","Seat":"1","Adjacency":239,"CoordinateX":439,"CoordinateY":194,"Rank":71,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-F-2"}],"Id":119539,"EventId":1661,"Section":"Section 2","Row":"F","Seat":"2","Adjacency":240,"CoordinateX":463,"CoordinateY":194,"Rank":65,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-F-3"}],"Id":119540,"EventId":1661,"Section":"Section 2","Row":"F","Seat":"3","Adjacency":241,"CoordinateX":487,"CoordinateY":194,"Rank":60,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-F-4"}],"Id":119541,"EventId":1661,"Section":"Section 2","Row":"F","Seat":"4","Adjacency":242,"CoordinateX":511,"CoordinateY":194,"Rank":56,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-F-5"}],"Id":119542,"EventId":1661,"Section":"Section 2","Row":"F","Seat":"5","Adjacency":243,"CoordinateX":535,"CoordinateY":194,"Rank":52,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-F-6"}],"Id":119543,"EventId":1661,"Section":"Section 2","Row":"F","Seat":"6","Adjacency":244,"CoordinateX":559,"CoordinateY":194,"Rank":48,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-F-7"}],"Id":119544,"EventId":1661,"Section":"Section 2","Row":"F","Seat":"7","Adjacency":245,"CoordinateX":583,"CoordinateY":194,"Rank":47,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-F-8"}],"Id":119545,"EventId":1661,"Section":"Section 2","Row":"F","Seat":"8","Adjacency":246,"CoordinateX":607,"CoordinateY":194,"Rank":53,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-F-9"}],"Id":119546,"EventId":1661,"Section":"Section 2","Row":"F","Seat":"9","Adjacency":247,"CoordinateX":631,"CoordinateY":194,"Rank":55,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-F-10"}],"Id":119547,"EventId":1661,"Section":"Section 2","Row":"F","Seat":"10","Adjacency":248,"CoordinateX":655,"CoordinateY":194,"Rank":59,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-F-11"}],"Id":119548,"EventId":1661,"Section":"Section 2","Row":"F","Seat":"11","Adjacency":249,"CoordinateX":679,"CoordinateY":194,"Rank":64,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-F-12"}],"Id":119549,"EventId":1661,"Section":"Section 2","Row":"F","Seat":"12","Adjacency":250,"CoordinateX":703,"CoordinateY":194,"Rank":70,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-G-1"}],"Id":119550,"EventId":1661,"Section":"Section 2","Row":"G","Seat":"1","Adjacency":252,"CoordinateX":427,"CoordinateY":218,"Rank":84,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-G-2"}],"Id":119551,"EventId":1661,"Section":"Section 2","Row":"G","Seat":"2","Adjacency":253,"CoordinateX":451,"CoordinateY":218,"Rank":80,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-G-3"}],"Id":119552,"EventId":1661,"Section":"Section 2","Row":"G","Seat":"3","Adjacency":254,"CoordinateX":475,"CoordinateY":218,"Rank":72,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-G-4"}],"Id":119553,"EventId":1661,"Section":"Section 2","Row":"G","Seat":"4","Adjacency":255,"CoordinateX":499,"CoordinateY":218,"Rank":68,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-G-5"}],"Id":119554,"EventId":1661,"Section":"Section 2","Row":"G","Seat":"5","Adjacency":256,"CoordinateX":523,"CoordinateY":218,"Rank":66,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-G-6"}],"Id":119555,"EventId":1661,"Section":"Section 2","Row":"G","Seat":"6","Adjacency":257,"CoordinateX":547,"CoordinateY":218,"Rank":62,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-G-7"}],"Id":119556,"EventId":1661,"Section":"Section 2","Row":"G","Seat":"7","Adjacency":258,"CoordinateX":571,"CoordinateY":218,"Rank":61,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-G-8"}],"Id":119557,"EventId":1661,"Section":"Section 2","Row":"G","Seat":"8","Adjacency":259,"CoordinateX":595,"CoordinateY":218,"Rank":63,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-G-9"}],"Id":119558,"EventId":1661,"Section":"Section 2","Row":"G","Seat":"9","Adjacency":260,"CoordinateX":619,"CoordinateY":218,"Rank":67,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-G-10"}],"Id":119559,"EventId":1661,"Section":"Section 2","Row":"G","Seat":"10","Adjacency":261,"CoordinateX":643,"CoordinateY":218,"Rank":69,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-G-11"}],"Id":119560,"EventId":1661,"Section":"Section 2","Row":"G","Seat":"11","Adjacency":262,"CoordinateX":667,"CoordinateY":218,"Rank":73,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-G-12"}],"Id":119561,"EventId":1661,"Section":"Section 2","Row":"G","Seat":"12","Adjacency":263,"CoordinateX":691,"CoordinateY":218,"Rank":78,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-G-13"}],"Id":119562,"EventId":1661,"Section":"Section 2","Row":"G","Seat":"13","Adjacency":264,"CoordinateX":715,"CoordinateY":218,"Rank":85,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-1"}],"Id":119563,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"1","Adjacency":266,"CoordinateX":415,"CoordinateY":242,"Rank":105,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-H-2"}],"Id":119564,"EventId":1661,"Section":"Section 2","Row":"H","Seat":"2","Adjacency":267,"CoordinateX":439,"CoordinateY":242,"Rank":95,"Status":0,"DateTimeHeld":"0001-01-01T00:00:00","HoldCodeId":0,"PriceLevelId":1938,"GroupId":null}]}},
	BESTAVAILABLE = {data : {"SessionId":"a91f23b6-14f5-45b6-8b0c-3478509c6788","SessionTimeout":120,"Seats":[{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-8"}],"Id":119489,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"8","Adjacency":185,"CoordinateX":549,"CoordinateY":74,"Rank":2,"Status":1,"DateTimeHeld":"2014-10-01T20:01:15.8033275Z","HoldCodeId":0,"PriceLevelId":1937,"GroupId":1},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-9"}],"Id":119490,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"9","Adjacency":186,"CoordinateX":573,"CoordinateY":74,"Rank":1,"Status":1,"DateTimeHeld":"2014-10-01T20:01:15.8033275Z","HoldCodeId":0,"PriceLevelId":1937,"GroupId":1},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-10"}],"Id":119491,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"10","Adjacency":187,"CoordinateX":597,"CoordinateY":74,"Rank":3,"Status":1,"DateTimeHeld":"2014-10-01T20:01:15.8033275Z","HoldCodeId":0,"PriceLevelId":1937,"GroupId":2},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-11"}],"Id":119492,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"11","Adjacency":188,"CoordinateX":621,"CoordinateY":74,"Rank":5,"Status":1,"DateTimeHeld":"2014-10-01T20:01:15.8033275Z","HoldCodeId":0,"PriceLevelId":1937,"GroupId":2},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-6"}],"Id":119487,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"6","Adjacency":183,"CoordinateX":501,"CoordinateY":74,"Rank":8,"Status":1,"DateTimeHeld":"2014-10-01T20:01:15.8189131Z","HoldCodeId":0,"PriceLevelId":1937,"GroupId":3},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-7"}],"Id":119488,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"7","Adjacency":184,"CoordinateX":525,"CoordinateY":74,"Rank":4,"Status":1,"DateTimeHeld":"2014-10-01T20:01:15.8189131Z","HoldCodeId":0,"PriceLevelId":1937,"GroupId":3},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-5"}],"Id":119499,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"5","Adjacency":196,"CoordinateX":560,"CoordinateY":97,"Rank":7,"Status":1,"DateTimeHeld":"2014-10-01T20:01:15.8189131Z","HoldCodeId":0,"PriceLevelId":1937,"GroupId":4},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-6"}],"Id":119500,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"6","Adjacency":197,"CoordinateX":584,"CoordinateY":97,"Rank":6,"Status":1,"DateTimeHeld":"2014-10-01T20:01:15.8189131Z","HoldCodeId":0,"PriceLevelId":1937,"GroupId":4}]}},
	MORETIME = {data : 120},
	RELEASE = {data : {"SessionId":"a91f23b6-14f5-45b6-8b0c-3478509c6788","SessionTimeout":null,"Seats":[{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-8"}],"Id":119489,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"8","Adjacency":185,"CoordinateX":549,"CoordinateY":74,"Rank":2,"Status":0,"DateTimeHeld":null,"HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-9"}],"Id":119490,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"9","Adjacency":186,"CoordinateX":573,"CoordinateY":74,"Rank":1,"Status":0,"DateTimeHeld":null,"HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-10"}],"Id":119491,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"10","Adjacency":187,"CoordinateX":597,"CoordinateY":74,"Rank":3,"Status":0,"DateTimeHeld":null,"HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-11"}],"Id":119492,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"11","Adjacency":188,"CoordinateX":621,"CoordinateY":74,"Rank":5,"Status":0,"DateTimeHeld":null,"HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-6"}],"Id":119487,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"6","Adjacency":183,"CoordinateX":501,"CoordinateY":74,"Rank":8,"Status":0,"DateTimeHeld":null,"HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-A-7"}],"Id":119488,"EventId":1661,"Section":"Section 2","Row":"A","Seat":"7","Adjacency":184,"CoordinateX":525,"CoordinateY":74,"Rank":4,"Status":0,"DateTimeHeld":null,"HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-5"}],"Id":119499,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"5","Adjacency":196,"CoordinateX":560,"CoordinateY":97,"Rank":7,"Status":0,"DateTimeHeld":null,"HoldCodeId":0,"PriceLevelId":1937,"GroupId":null},{"Links":[{"Rel":"self","Href":"http://shdr-rs/EventManagementServer/api/events/1661/seats/Section%202-B-6"}],"Id":119500,"EventId":1661,"Section":"Section 2","Row":"B","Seat":"6","Adjacency":197,"CoordinateX":584,"CoordinateY":97,"Rank":6,"Status":0,"DateTimeHeld":null,"HoldCodeId":0,"PriceLevelId":1937,"GroupId":null}]}};

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
	    prefix: ['private', ApplicationSettings.apiUrl],

        blank : ['public', function(){
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        }],

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
					Authorization : ApplicationSettings.emsToken
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
					Authorization : ApplicationSettings.emsToken
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
					Authorization : ApplicationSettings.emsToken
				}
			});
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
	return !contents;
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
						//console.log(privateContext);
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