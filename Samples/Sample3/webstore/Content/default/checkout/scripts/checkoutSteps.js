gts.checkoutSteps = (function($) {
	var model = { };

	/*
	A step supports:

	selector                     // The DOM selector text for the step element
    name                         // A logical, user friendly name for this step
    data                         // Any step specific data that could potentially be used when reading through the list of steps.
	on.load()                    // Gets called as the step is displayed
	on.beforeNext(deferred)      // Gets called before moving to the next page. Use deferred object to reject or accept the change.
	on.beforePrevious(deferred)  // Gets called before moving to the previous page. Use deferred object to reject or accept the change.
	*/
	var genericStep = {
	    selector: "",
	    name: "",
	    data: undefined,
	    previousElement: $('<input type="button" class="large-button dark previous" value="[L:PreviousButton]" />'),
		previousClass: ".previous",
		nextElement: $('<input type="button" class="large-button next" value="[L:NextButton]"/>'),
		nextClass: ".next",
		stepNavigationClass: ".step-navigation",
		FirstStepPreviousElement: $('<a href="../Cart">[L:Back]</a>'),
		LastStepNextElement: $('<input type="button" id="submit-payment" class="large-button next" value="[L:SubmitButton]"/>'),
		paymentSubmit: "#submit-payment",
		on: { }
	};

	/*
	on.hashBlank    // Allows the caller to handle what to do when no hash is in the URL. This typically happens when you use the back button on the first step.
	*/
	var on = {
		hashBlank: function () { }
	};
	
	var steps = [];

	model.init = function(options) {
		$.extend(on, options.on);		

		if (!$(window).hashchange) {
			throw ("hashchange is not included");
		}

		$(window).hashchange(function () {
			var hash = location.hash;

			if (!hash) {
				if (on.hashBlank) {
					on.hashBlank();
				}
				return;
			}

			gotoStep(hash);
		});

		genericStep.FirstStepPreviousElement.attr("href", options.backToCartLink);
	};
	
	model.Start = function() {	    
	    if (steps.length === 0) {
			return model;
		}

		if (steps[0].on.load) {
			steps[0].on.load();
		}

		initNavigation();


		if (location.hash) {
            // If we already have a hash let's try to start at that step if it exists.
		    gotoStep(location.hash);
		} else {
		    // Start by adding a history entry for this step in case the back button is used in any other step.
		    $(steps[0].selector).fadeIn(500);
		    location.hash = steps[0].selector;
		}
		
		return model;
	};

	function initNavigation() {
		for (var i = 0; i < steps.length; i++) {
			var step = steps[i];

			if (i === 0) {
				$(step.selector).find(step.stepNavigationClass).prepend(step.FirstStepPreviousElement.clone());
			} else {
				$(step.selector).find(step.stepNavigationClass).prepend(step.previousElement.clone());
			}

			if (i === steps.length - 1) {
				$(step.selector).find(step.stepNavigationClass).prepend(step.LastStepNextElement.clone());
			} else {
				$(step.selector).find(step.stepNavigationClass).prepend(step.nextElement.clone());
			}

			$(step.selector).off("click", step.paymentSubmit);
			$(step.selector).on("click", step.paymentSubmit, submit);

			$(step.selector).off("click", step.stepNavigationClass + " " + step.nextClass);
			$(step.selector).on("click", step.stepNavigationClass + " " + step.nextClass, nextClick);

			$(step.selector).off("click", step.stepNavigationClass + " " + step.previousClass);
			$(step.selector).on("click", step.stepNavigationClass + " " + step.previousClass, previousClick);
		}
	}

	function findStepBySelector(selector) {
		for (var i = 0; i < steps.length; i++) {
			var step = steps[i];
			if (step.selector === selector) {
				return step;
			}
		}
		return undefined;
	}

	function nextClick() {
		var id = $(this).closest(".step").attr("id");
		var step = findStepBySelector("#" + id);
		
		if (!step)
		    return;
	        
		defer(step.on.beforeNext)
			.done(function(data) {
				var nextStep = getNextStep(step);
				if (!nextStep) {
					return;
				}

				$(step.selector).fadeOut(function() {
					location.hash = nextStep.selector;
					if (nextStep.on.load) {
						nextStep.on.load(data);
					}
					$(nextStep.selector).fadeIn(500);
					$(nextStep.selector).children().first().css({ marginLeft: 100 }).animate({ marginLeft: 0 }, 500);
				});
				$(step.selector).children().first().animate({ marginLeft: 100 }, 500);
			});
	}

	function previousClick() {
		var id = $(this).closest(".step").attr("id");
		var step = findStepBySelector("#" + id);

		if (!step) {
			return;
		}

		defer(step.on.beforePrevious)
			.done(function(data) {
				var previousStep = getPreviousStep(step);
				if (!previousStep) {
					return;
				}

				$(step.selector).fadeOut(function() {
					location.hash = previousStep.selector;
					if (previousStep.on.load) {
						previousStep.on.load(data);
					}
					$(previousStep.selector).fadeIn(500);
					$(previousStep.selector).children().first().css({ marginLeft: 100 }).animate({ marginLeft: 0 }, 500);
				});
				$(step.selector).children().first().animate({ marginLeft: 100 }, 500);
			});
	}

	model.AddStep = function(step) {
		var newStep = { };
		$.extend(true, newStep, genericStep);
		$.extend(true, newStep, step);

		$.extend(true, newStep.on, step.on);

		steps.push(newStep);
		return model;
	};

	model.InsertStep = function (index, step) {
	    var newStep = {};
	    $.extend(true, newStep, genericStep);
	    $.extend(true, newStep, step);
	    $.extend(true, newStep.on, step.on);

        // Insert the step at the desired index. The zero is saying don't delete any of the steps at the index.
	    steps.splice(index, 0, newStep);
	    return model;
	};

    // Expose the collection of steps
    model.Steps = function() {
        return steps;
    };

    model.GoToSteps = function(selector) {
        gotoStep(selector);
    };

    /*
    * fix the step to display PrimaryContact before Joint Contact 
    * for Dual membership.
    */
    model.DisplayPrimaryContactFirst = function () {
        
        for (var i = steps.length-1; i >= 0; i--) {
            
            var selector = '#pass-step-' + i;
            var step = findStepBySelector(selector);
            if (step) {
                var index = steps.indexOf(step);
                // Remove the element from the array
                var removedElement = steps.splice(index, 1)[0];
                steps.unshift(removedElement);
            }
        }
    };
    
	function getNextStep(step) {
		var i = $.inArray(step, steps);
		if (i === -1 || i === steps.length - 1) {
			return undefined;
		}
		return steps[i + 1];
	}

	function getPreviousStep(step) {
		var i = $.inArray(step, steps);
		if (i <= 0) {
			return undefined;
		}
		return steps[i - 1];
	}

	function defer(event) {
		var deferred = $.Deferred();

		if (event) {
			event(deferred);
		} else {
			deferred.resolve();
		}

		return deferred.promise();
	}

	// Find the step selector. Hide any other steps and animate in the step requested.
	function gotoStep(id) {
		var step = findStepBySelector(id);

		// Ignore this step change if it is an invalid step or it is already visible.
		if (!step || $(step.selector).find(":visible").length > 0) {
			return;
		}

		var allVisibleSteps = $(".step:visible");

		if (allVisibleSteps.length === 0) {
		    fadeInNextStep(step);
		} else {
		    $(allVisibleSteps).fadeOut(500, function () { fadeInNextStep(step); });
		}
		
		$(allVisibleSteps).children().first().animate({ marginLeft: 100 }, 500);
	}

    function fadeInNextStep(step) {
        if (step.on.load) {
            step.on.load();
        }

        $(step.selector).fadeIn(500);
        $(step.selector).children().first().css({ marginLeft: 100 }).animate({ marginLeft: 0 }, 500);
    }

    function submit(e) {
	    e.preventDefault();
	    var form = $(this).closest(".step").find("form:first");
	    
	    if (!form.valid())
	        return;	    
	    
        $(form).submit();
    }

	return model;
})(jQuery);