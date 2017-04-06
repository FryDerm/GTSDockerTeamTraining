var gtsApp = angular.module('gts', []);

gtsApp.controller('ContentController', ['gtsClass', 'ContentService', '$scope', '$element', function(gtsClass, ContentService, $scope, $element, ContentRawData){

	var ContentController = gtsClass({

		constructor : function(s){

			this.scope = s;
			ContentService.getData(angular.bind(this, this.gotIt), angular.bind(this, this.error));
			this.doStuff();
		},

		gotIt : ['private', function(data){
			this.scope.categories = data;
		}],

		error : ['private', function(message){
			this.scope.errorMessage = message;
		}],

		doStuff : ['private', function(){

		}]
	});

	return new ContentController($scope);

}]);

gtsApp.service('ContentService', ['BaseAjaxService', 'gtsClass', 'api', function(BaseAjaxService, gtsClass, api){

	var ContentService = gtsClass(BaseAjaxService, {

		// source for the request
		source : ['private', function(){
			return api.getEventDates();
		}],

		processData : ['private', function(response){
			var nameArray = [];
			angular.forEach(response.ProductCategories, angular.bind(this, function(cat){
				nameArray.push(cat.Value);
			}));
			this.resolve(nameArray);
		}],

		// overwrite some basic error handling
		processError : ['private', function(message){
			this.error(message.message);
		}]

	});

	return new ContentService();

}]);

gtsApp.controller('HeaderController', ['gtsClass', '$scope', function(gtsClass, $scope){

	var HeaderController = gtsClass({


	});

	return new HeaderController($scope);

}]);

gtsApp.controller('NavigationController', ['gtsClass', '$scope', 'NavigationDomData',function(gtsClass, $scope, NavigationDomData){

	var NavigationController = gtsClass({

		constructor : function(scope){
			this.scope = scope;

			console.log('l', NavigationDomData);

			this.scope.links = NavigationDomData.links;
		}
	});

	return new NavigationController($scope);

}]);

gtsApp.controller('ViewItemsController', ['gtsClass', 'ViewItemsService', '$scope', '$sce',function(gtsClass, ViewItemsService, $scope, $sce){

	var ViewItemsController = gtsClass({

		constructor : function(s){
			this.scope = s;
			this.getItems();

			this.scope.increment = angular.bind(this, function(dir, item){

				if(dir){
					item.product.quantityValue = item.product.quantityValue + 1;
				}else{
					item.product.quantityValue = item.product.quantityValue - 1;
					if(item.product.quantityValue == -1){
						item.product.quantityValue = 0;
					}
				}

			});

			this.scope.submit = angular.bind(this, function(item){
				var t = 0;
				angular.forEach(item.plu, function(product){
					product.quantityError = false;
					if(product.quantityValue){
						t = t + parseFloat(product.quantityValue);
					}
				});

				if(t <= 0){
					angular.forEach(item.plu, function(product){
						product.quantityError = true;
					});
					return false;
				}
			})

		},

		getItems : ['private', function(){

			var items = ViewItemsService.getData()['plu-category'];
			items.splice(0,1);

			angular.forEach(items, function(item){
				angular.forEach(item.plu, function(plu){
					plu.quantityValue = 0;
				});
			});

			this.scope.items = items;
		}]
	});

	return new ViewItemsController($scope);

}]);

gtsApp.service('ViewItemsService', ['gtsClass', 'BaseDomDataService', 'ViewItemsDomData', function(gtsClass, BaseDomDataService, ViewItemsDomData){

	var ViewItemsService = gtsClass(BaseDomDataService, {

		domData : ['private', ViewItemsDomData],

		processData : ['private', function(){
			this.data = angular.copy(this.domData);
			delete this.data.controller;
		}]

	});

	return new ViewItemsService();

}]);

gtsApp.factory('BaseAjaxService', ['gtsClass', function(gtsClass){
	
	var BaseAjaxService = gtsClass({

		// trigger when we want to go get the data
		getData : ['public', function(success, error){
			if(this.source && typeof this.source === 'function'){
				var def = this.source();
				// make sure its a deferred
				if(def.then){
					if(success && typeof success === 'function'){
						this.success = success;
					}
					if(error && typeof error === 'function'){
						this.error = error;
					}
					def.success(angular.bind(this, this.processData));
					def.error(angular.bind(this, function(message){
						this.processError(message);
					}));
				}	
			}
		}],

		// intended to be a function
		source : ['private', function(){
			return {
				then : function(){}
			};
		}],

		success : ['private', function(){
			// do nothing - overwrite
		}],

		error : ['private', function(){
			// do nothing now
		}],

		processData : ['private', function(response){
			// process the data the way you want
			this.resolve(response);
		}],

		processError : ['private', function(message){
			this.error('system');
		}],

		resolve : ['private', function(data){
			if(this.success && typeof this.success === 'function'){
				this.success(data);
			}
		}]
	});

	return BaseAjaxService;

}]);

gtsApp.factory('BaseDomDataService', ['gtsClass', function(gtsClass){

	var BaseDomDataService = gtsClass({

		constructor : function(){
			this.processData();
		},

		domData : ['private', {}],

		data : ['private', {}],

		//
		processData : ['private', function(){

			console.log('ran?');

			return this.data;
		}],

		getData : ['public', function(){

			return this.data;
		}]

	});

	return BaseDomDataService;

}]);	

gtsApp.service('api', ['$http', 'gtsClass', function($http, gtsClass){

	var api = gtsClass({

		token : ['private', 'Bearer AQAAANCMnd8BFdERjHoAwE_Cl-sBAAAA9qXcRsZol0WA4vUfJOQjQAAAAAACAAAAAAAQZgAAAAEAACAAAADuumnbbuV-XiWcRs6ZYuUrNXCXf0Veu6hJh2OljgjvhwAAAAAOgAAAAAIAACAAAACST1CrHmPqZ2wBxUHLwwbIW9wjUdvV7SUtlDUDOZieJRABAADPzLfTTsVygxlDUwd08xeSRw6AUmio4VV7cxeUO697LrS5lbx7bHiGHLzEX4l19vkzAeYBD0XCFwXPsEdj8qhknLUUb2Kgn_cvl3-JWmgYk8c2-eAk-gADN0F21q4-1IfO_NTp936vP0MJp8LrdSzAYPdybm8YZz4bhbXeZG7-TMN0sSnw9kurbM_z13zne8PwXPdZHWogvfkaDhw5EEW6ia5koyqXTB6DGa7x-MKrBUIO48tVxZQk3ZHZBhVnNB9OVXJwtJtt8pYP7IytP9dYaO3H-bTo9CmNAn7cxaTkVmNlv8WC6uwGsxLqfM5la_Mqemajl1ENcPfduPUZeLAMy2dzNRazd93YMxp1PEDSvEAAAAAzCcsJiLiNIDOERbAjW1vcPj0dh43WyZzzcQHVodvq1N8pH7ASVCj3cQTcBOxOsd-zhJS3S-guUP8TV0jRXwXn'],

		getEventDates : ['public', function(){

			var t = this.token;

			return $http({
				method : 'GET',
				url : 'http://shdr-rs:5000/api/productcategories/0',
				headers : {
					Authorization : t
				}
			});
		}]
	});

	return new api();

}])

gtsApp.factory('gtsClass', function(){

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

gtsApp.factory('parser', function(){
		
	var checkForObjectKey = function(structure, element){
		var name = false;
		angular.forEach(element.attributes, function(attr, index){
			if(attr.name === 'data-object-key'){
				if(!angular.isArray(structure[attr.value])){
					structure[attr.value] = [];
				}
				name = attr.value;
				return false;
			}
		});
		return name;
	};

	var grabDataFromAttrs = function(structure, attrs){
		angular.forEach(attrs, function(attr){
			if(attr.name.indexOf('data-') === 0 && attr.name !== 'data-object-key'){
				var string = attr.name.substring(5).replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
				structure[string] = attr.value;
				return true;
			}
		});
		return false;
	};

	return function rec(data, el){

		var key = checkForObjectKey(data, el),
			target = key ? {} : data;

		grabDataFromAttrs(target, el.attributes);

		if(key){
			data[key].push(target);
			target = data[key][data[key].length - 1];
		}

		angular.forEach(angular.element(el).children(), function(child, childIndex){
			rec(target, child);
		});

		return data;
	};

});

$(document).ready(function(){

	console.time('pageLoad');

	var checkForObjectKey = function(structure, element){
		var name = false;
		angular.forEach(element.attributes, function(attr, index){
			if(attr.name === 'data-object-key'){
				if(!angular.isArray(structure[attr.value])){
					structure[attr.value] = [];
				}
				name = attr.value;
				return false;
			}
		});
		return name;
	};

	var grabDataFromAttrs = function(structure, attrs){
		angular.forEach(attrs, function(attr){
			if(attr.name.indexOf('data-') === 0 && attr.name !== 'data-object-key'){
				var string = attr.name.substring(5).replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }),
					domNode = $.parseHTML(attr.value);

				if(domNode && domNode.length && domNode[0].nodeType !== 3){
					structure[string] = {};
					angular.forEach(domNode[0].attributes, function(attr, index){
						structure[string][attr.name] = attr.value.trim();
					});
					structure[string].text = domNode[0].innerText;
				}else{
					structure[string] = attr.value.trim();
				}

				return true;
			}
		});
		return false;
	};

	var rec = function(data, el){

		var key = checkForObjectKey(data, el),
			target = key ? {} : data;

		grabDataFromAttrs(target, el.attributes);

		if(key){
			data[key].push(target);
			target = data[key][data[key].length - 1];
		}

		angular.forEach(angular.element(el).children(), function(child, childIndex){
			rec(target, child);
		});

		return data;
	};

	var el = $('html');
	var targetControllers = document.querySelectorAll('[data-controller]');

	angular.forEach(targetControllers, function(el){
		var cName = angular.element(el)[0].dataset.controller,
			data = rec({}, el);

		(function(data){

			gtsApp.factory(cName+'DomData', function(){
				return data;
			});

		})(data);

		console.log(data);

		var parent = el.parentNode;
		parent.insertBefore(document.querySelectorAll('[ng-controller="'+cName+'Controller"]')[0], el);
		parent.removeChild(el);
	});

	console.timeEnd('pageLoad');

	angular.bootstrap(el, ['gts']);
});