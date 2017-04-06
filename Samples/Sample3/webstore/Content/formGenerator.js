gts.formGenerator = (function($) {
	var model = { };

	function doNothing() { }

    var settings = {
        rules: {},
        form: {},
        fieldInputPrefix: "",
        fieldWrapper: $("<div></div>").addClass("form-field"),
        fieldLabelWrapper: $("<div></div>").addClass("form-field-label"),
        fieldInputWrapper: $("<div></div>").addClass("form-field-input"),
        fieldLabel: $("<label></label>"),
        fieldClear: $("<div></div>").addClass("form-field-clear"),
        on: {},
        messages: {}
    };

    /*
    on.addRule(rule)                  // Caller gets a chance to make any custom requirements on the rule as it is being added.
    on.addInputValues(rule, input)    // Allows caller to change the state of the input. You can also return a new input. Handler needs to return promise object.
    on.afterInputAdded(rule, input)   // Last chance to change or read values from the input.
    */
    var on = {
        addRule: doNothing,
        addInputValues: doNothing,
        afterInputAdded: doNothing
    };

    model.fieldKinds = {
		numeric: 0,
		text: 1,
		checkbox: 2,
		dropDown: 3,
		raisersEdge: 4,
		date: 5
	};

	model.generate = function (options) {
	    $.extend(settings, options);
	    $.extend(on, options.on);

	    settings.form.html("");

		var inputDeferreds = [];
		var formRules = { };
		var isPrimary = options.fieldInputPrefix.indexOf("Primary") === 0;
	    var disableAddress = options.disableAddress;

	    for (var i = 0; i < settings.rules.length; i++) {
	        var rule = settings.rules[i];
	        inputDeferreds.push(createInput(formRules, rule, isPrimary, disableAddress));
	    }

	    // when all inputs have been added
	    return $.when.apply(null, inputDeferreds)
	        .done(function() {
	            addInputValidation(formRules);
	        });
	};

    function addInputValidation(formRules) {
        if (settings.form.data("validator")) {
            settings.form.removeData("validator");
        }

        $.validator.addMethod("minDate", function (value, element, minDate) {
            if (value === "") {
                return true;
            }
            return getJavaScriptDate(minDate) <= getJavaScriptDate(value);
        });


        $.validator.addMethod("maxDate", function (value, element, maxDate) {
            if (value === "") {
                return true;
            }
            return getJavaScriptDate(value) <= getJavaScriptDate(maxDate);
        });

        settings.form.validate({
            rules: formRules,
            errorClass: "input-validation-error",
            errorPlacement: function(error, element) {
                var name = element.attr("name");
                error.insertAfter("#" + name);
                   
            },
            errorElement: "div",
            onfocusout: false
        });
    }
    
    function createInput(formRules, rule, isPrimary, disableAddress) {
        // Create an Id property so that other sections do not need to generate the Id.
        var id = settings.fieldInputPrefix + rule.ColumnName;

        var fieldWrapper = settings.fieldWrapper.clone();
        var labelWrapper = settings.fieldLabelWrapper.clone();
        var label = settings.fieldLabel.clone().attr("for", id).text(rule.Label);
        var inputWrapper = settings.fieldInputWrapper.clone();
        var input;
        var clear = settings.fieldClear.clone();

        if (rule.FieldKindId === model.fieldKinds.numeric || rule.FieldKindId === model.fieldKinds.text || rule.FieldKindId === model.fieldKinds.raisersEdge){
            input = $("<input/>")
                .attr("type", "text")
                .attr("id", id)
                .attr("name", id)
                .val(rule.DefaultValue);
        } else if (rule.FieldKindId === model.fieldKinds.checkbox) {
            input = $("<input/>")
                .attr("type", "checkbox")
                .attr("id", id)
                .attr("name", id)
                .val(id);

            if (rule.DefaultValue) {
                input.attr("checked", true);
            }
        } else if (rule.FieldKindId === model.fieldKinds.dropDown) {
            input = $("<select></select>")
                .attr("id", id)
                .attr("name", id)
                .val(rule.DefaultValue);
        } else if (rule.FieldKindId === model.fieldKinds.date) {
            if (!isPrimary && !rule.Required)
                return $.when();

            input = $("<input/>")
                .attr("type", "text")
                .attr("id", id)
                .attr("name", id)
                .val(rule.DefaultValue);

            var jsMinDate = getJavaScriptDate(rule.MinimumValue);
            var jsMaxDate = getJavaScriptDate(rule.MaximumValue);

            var minYear;
            
            if (jsMinDate) {
                minYear = jsMinDate.getUTCFullYear(); 
            } else {
                minYear = new Date().getUTCFullYear() - 100;
            }
            
            input.datepicker({
                showAnim: "drop",
                changeMonth: true,
                changeYear: true,
                yearRange: minYear + ":c",
                minDate: jsMinDate,
                //maxDate: jsMaxDate,
                onSelect: function (dateText, inst) {
                    settings.form.validate().element("#" + id);
                }
            });

        } else {
            return $.when();
        }
            
        return on.addInputValues(rule, input)
            .done(function (changedInput) {
                if (changedInput) {
                    input = changedInput;
                }
                labelWrapper.append(label);
                inputWrapper.append(input);
                fieldWrapper.append(labelWrapper);
                fieldWrapper.append(inputWrapper);
                fieldWrapper.append(clear);
                settings.form.append(fieldWrapper);

                on.afterInputAdded(rule, input, disableAddress);

                addFormRules(rule, formRules);
            });
    }

	function getJavaScriptDate(date) {
		if (!date) {
			return;
		}

		//  Be able to support global date formats
		var jsDate = Globalize.parseDate(date);
		if (!jsDate) {
			jsDate = new Date(date);
		}

        //date = date.split(/\D/);
	    //var jsDate = new Date(Date.UTC(date[0], --date[1] || '', date[2] || '', date[3] || '', date[4] || '', date[5] || '', date[6] || ''));
  
		var utcDifference = jsDate.getTimezoneOffset();

		// Because the time does not matter here, just set it the the UTC time so that 
		// it is still referring to the same date. If the UTC time is greater than the
		// time used it will not be interpreted as the same date.
		jsDate.setUTCHours(0);
		jsDate.setUTCSeconds(0);
		jsDate.setUTCMilliseconds(0);
		jsDate.setUTCMinutes(utcDifference);
		
		return jsDate;
	}

	
	function addFormRules(fieldRule, formRules) {
		var formRule = { };
		formRule.required = fieldRule.Required;

		if (fieldRule.MinimumValue) {
		    formRule.minDate = fieldRule.MinimumValue;
		}

		if (fieldRule.MaximumValue) {
		    formRule.maxDate = fieldRule.MaximumValue;
		}

	    if (fieldRule.Length) {
			formRule.maxlength = fieldRule.Length;
		}

		on.addRule(fieldRule, formRule);

		formRules[settings.fieldInputPrefix + fieldRule.ColumnName] = formRule;	   
	}

	return model;
})(jQuery);