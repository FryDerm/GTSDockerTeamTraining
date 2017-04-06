//-----------------------------------------------------------------------------
// NAME: PopupCalendar
//-----------------------------------------------------------------------------
// DESCRIPTION:
//		Displays a popup calendar for events
//-----------------------------------------------------------------------------
function DisplayPopUpCalendar(resourceID, eventTypeID, controlID) {
	window.open('CalendarPopup.aspx?EventTypeID=' + eventTypeID + '&ResourceID=' + resourceID + '&CtrlID=' + controlID, 'Calendar', 'width=310,height=275');
}

//-----------------------------------------------------------------------------
// NAME: ToggleVisibility
//-----------------------------------------------------------------------------
// DESCRIPTION:
//		Toggles the visibility of an element.
//-----------------------------------------------------------------------------
function ToggleVisibility(elementName) {
	var element;
	var elementStyle;

	if (document.getElementById) {
		element = document.getElementById(elementName);
	}
	else if (document.all) {
		element = document.all[elementName];
	}
	else if (document.layers) {
		element = document.layers[elementName];
	}

	elementStyle = element.style;

	if (elementStyle.display == '' && element.offsetWidth != undefined && element.offsetHeight != undefined) {
		elementStyle.display = (element.offsetWidth != 0 && element.offsetHeight != 0) ? 'block' : 'none';
	}

	elementStyle.display = (elementStyle.display == '' || elementStyle.display == 'block') ? 'none' : 'block';
}

//-----------------------------------------------------------------------------
// NAME: ShowHide 
//-----------------------------------------------------------------------------
// DESCRIPTION:
//		Toggles the visibility of x element (uses jquery)
//-----------------------------------------------------------------------------
function ShowHide(x) {
	$(x).toggle();
}

//-----------------------------------------------------------------------------
// NAME: toggle
//-----------------------------------------------------------------------------
// DESCRIPTION:
//		Toggles the visibility of an element.
//-----------------------------------------------------------------------------
function toggle(elementName) {
	var element;
	var elementStyle;

	if (document.getElementById) {
		element = document.getElementById(elementName);
	}
	else if (document.all) {
		element = document.all[elementName];
	}
	else if (document.layers) {
		element = document.layers[elementName];
	}

	elementStyle = element.style;

	if (elementStyle.display == '' && element.offsetWidth != undefined && element.offsetHeight != undefined) {
		elementStyle.display = (element.offsetWidth != 0 && element.offsetHeight != 0) ? 'block' : 'none';
	}

	elementStyle.display = (elementStyle.display == '' || elementStyle.display == 'block') ? 'none' : 'block';
}

//-----------------------------------------------------------------------------
// NAME: SetCreateAccountControls
//-----------------------------------------------------------------------------
// DESCRIPTION:
//		Sets the controls used for create account based on the state of
//		the CreateAccountCheckBox checked value.
//-----------------------------------------------------------------------------
// NOTES:
//		The global vars (prefixed with an underscore) are set by the
//		BillingInfo.
//-----------------------------------------------------------------------------
function SetCreateAccountControls() {
	var createAccoutCtrl = document.getElementById(_createAccountCheckBoxClientID);
	var checked = createAccoutCtrl.checked;

	var userNameEl = document.getElementById(_userNameTextBoxClientID);
	var passwordEl = document.getElementById(_passwordTextBoxClientID);
	var confirmPasswordEl = document.getElementById(_confirmPasswordTextBoxClientID);

	userNameEl.disabled = !checked;
	passwordEl.disabled = !checked;
	confirmPasswordEl.disabled = !checked;

	if (!checked) {
		userNameEl.value = "";
		passwordEl.value = "";
		confirmPasswordEl.value = "";

		userNameEl.className = "fieldDisabled";
		passwordEl.className = "fieldDisabled";
		confirmPasswordEl.className = "fieldDisabled";
	}
	else {
		userNameEl.className = "";
		passwordEl.className = "";
		confirmPasswordEl.className = "";
	}
}

//-----------------------------------------------------------------------------
// NAME: SetPaymentControls
//-----------------------------------------------------------------------------
// DESCRIPTION:
//		Sets the controls used for payment information based on the
//		state of the StorePaymentCheckBox checked value.
//-----------------------------------------------------------------------------
// NOTES:
//		The global vars (prefixed with an underscore) are set by the
//		FOPsForm.
//-----------------------------------------------------------------------------
function SetPaymentControls() {
	var storePaymentEl = document.getElementById(_storePaymentCheckBoxClientID);
	var checked = storePaymentEl.checked;

	var endorsementEl = document.getElementById(_endorsementTextBoxClientID);
	var cardExpMonthEl = document.getElementById(_cardExpirationMonthDropDownListClientID);
	var cardExpYearEl = document.getElementById(_cardExpirationYearDropDownListClientID);

	endorsementEl.disabled = !checked;
	cardExpMonthEl.disabled = !checked;
	cardExpYearEl.disabled = !checked;

	if (!checked) {
		endorsementEl.value = "";
		cardExpMonthEl.selectedIndex = 0;
		cardExpYearEl.selectedIndex = 0;

		endorsementEl.className = "fieldDisabled";
		cardExpMonthEl.className = "fieldDisabled";
		cardExpYearEl.className = "fieldDisabled";
	}
	else {
		endorsementEl.className = "";
		cardExpMonthEl.className = "";
		cardExpYearEl.className = "";
	}
}

//-----------------------------------------------------------------------------
// NAME: ExtractNumber
//-----------------------------------------------------------------------------
// DESCRIPTION:
//		Used by NumericTextBox control to allow only numeric input.
//-----------------------------------------------------------------------------
function ExtractNumber(obj, decimalPlaces, allowNegative) {
	var temp = obj.value;

	//-------------------------------------------------------------------------
	// Avoid changing things if already formatted correctly 
	//-------------------------------------------------------------------------
	var reg0Str = '[0-9]*';
	if (decimalPlaces > 0) { reg0Str += '\\.?[0-9]{0,' + decimalPlaces + '}'; }
	else if (decimalPlaces < 0) { reg0Str += '\\.?[0-9]*'; }

	reg0Str = allowNegative ? '^-?' + reg0Str : '^' + reg0Str;
	reg0Str = reg0Str + '$';

	var reg0 = new RegExp(reg0Str);

	if (reg0.test(temp)) return true;

	//-------------------------------------------------------------------------
	// Replace all non-numeric characters
	//-------------------------------------------------------------------------
	var reg1Str = '[^0-9' + (decimalPlaces != 0 ? '.' : '') + (allowNegative ? '-' : '') + ']';
	var reg1 = new RegExp(reg1Str, 'g');
	temp = temp.replace(reg1, '');

	if (allowNegative) {
		//---------------------------------------------------------------------
		// Replace extra negative
		//---------------------------------------------------------------------
		var hasNegative = temp.length > 0 && temp.charAt(0) == '-';
		var reg2 = /-/g;
		temp = temp.replace(reg2, '');
		if (hasNegative) temp = '-' + temp;
	}

	if (decimalPlaces != 0) {
		var reg3 = /\./g;
		var reg3Array = reg3.exec(temp);

		if (reg3Array != null) {
			//-----------------------------------------------------------------
			// Keep only first occurrence of .  
			// and the number of places specified by decimalPlaces
			//-----------------------------------------------------------------
			var reg3Right = temp.substring(reg3Array.index + reg3Array[0].length);
			reg3Right = reg3Right.replace(reg3, '');
			reg3Right = decimalPlaces > 0 ? reg3Right.substring(0, decimalPlaces) : reg3Right;
			temp = temp.substring(0, reg3Array.index) + '.' + reg3Right;
		}
	}

	obj.value = temp;
}

//-----------------------------------------------------------------------------
// NAME: BlockNonNumbers
//-----------------------------------------------------------------------------
// DESCRIPTION:
//		Used by NumericTextBox control to allow only numeric input.
//-----------------------------------------------------------------------------
function BlockNonNumbers(obj, e, allowDecimal, allowNegative) {
	var key;
	var isCtrl = false;
	var keychar;
	var reg;

	if (window.event) {
		key = e.keyCode;
		isCtrl = window.event.ctrlKey
	}
	else if (e.which) {
		key = e.which;
		isCtrl = e.ctrlKey;
	}

	if (isNaN(key)) return true;

	keychar = String.fromCharCode(key);

	//-------------------------------------------------------------------------
	// Check for backspace or delete, or if Ctrl was pressed
	//-------------------------------------------------------------------------
	if (key == 8 || isCtrl || key == 13) {
		return true;
	}
	reg = /\d/;
	var isFirstN = allowNegative ? keychar == '-' && obj.value.indexOf('-') == -1 : false;
	var isFirstD = allowDecimal ? keychar == '.' && obj.value.indexOf('.') == -1 : false;

	return isFirstN || isFirstD || reg.test(keychar);
}

//-----------------------------------------------------------------------------
// NAME: SetUniqueRadioButtons
//-----------------------------------------------------------------------------
// SOURCE:
//      http://www.developer.com/net/asp/article.php/3623096
//-----------------------------------------------------------------------------
// DESCRIPTION:
//      Used by RadioButtons in the MutualExclusive PLUPresenter descendant
//-----------------------------------------------------------------------------
function SetUniqueRadioButton(nameregex, current) {
	re = new RegExp(nameregex);
	for (i = 0; i < document.forms["aspnetForm"].elements.length; i++) {
		elm = document.forms["aspnetForm"].elements[i];
		if (elm.type == 'radio') {
			if (re.test(elm.name)) {
				elm.checked = false;
			}
		}
	}
	current.checked = true;
}

//-----------------------------------------------------------------------------
// NAME: CapitalizeText
//-----------------------------------------------------------------------------
// DESCRIPTION:
//		Capitalizes text in a control ONLY once (if the user overrides the
//		auto-cap, it doesn't cap again. (Uses jquery.)
//-----------------------------------------------------------------------------
function CapitalizeText(obj) {
	var value = jQuery(obj).data('capitalized');

	if (value === true) {
		return;
	}

	var txt = jQuery(obj).val().toLowerCase();
	var split_txt = txt.split(' ');
	var result = '';
	var secondPart = ''; // if O'Brian... second part is 'Brian, so we can cap the B if it ain't capped

	for (var i = 0; i < split_txt.length; i++) {
		secondPart = split_txt[i].substring(1, split_txt[i].length);

		if (secondPart.substring(0, 1) == '\'') // checks for second part being 'Brian if O'Brian was entered, to check the cap on the B
		{
			secondPart = secondPart.substring(0, 1) + secondPart.substring(1, 2).toUpperCase() + secondPart.substring(2, secondPart.length)
		}

		result = result.concat(' ' + split_txt[i].substring(0, 1).toUpperCase() + secondPart);
	}

	jQuery(obj).val(result.substring(1, result.length));
	jQuery(obj).data('capitalized', true);
}

//-----------------------------------------------------------------------------
// NAME: FlipColorExclusive
//-----------------------------------------------------------------------------
// DESCRIPTION:
//		Assigns a CSS style to an HTML element, to highlight the given HTML 
//		element. Also, if a previous HTML element was assigned, the css style
//		of that previous element will be cleared.
//-----------------------------------------------------------------------------
// PARAMETERS:
//		HtmlElementId - The id of the table, td, div, etc... to be highlighted
//		CssClassName - The CSS style to apply to the given HtmlElementId
//-----------------------------------------------------------------------------
function FlipColorExclusive(HtmlElementId, CssClassName) {
	// Get the target table
	var HtmlElement = document.getElementById(HtmlElementId);

	HtmlElement.className = CssClassName;

	// Clear the CSS style of the previous HTML element, if it exists.
	if (previousHtmlElementId != null) {
		// Don't clear the CSS style, if the user clicked on the current selection
		if (previousHtmlElementId != HtmlElementId) {
			var previousHtmlElement = document.getElementById(previousHtmlElementId);
			previousHtmlElement.className = "";
		}
	}

	previousHtmlElementId = HtmlElementId;
}

//-----------------------------------------------------------------------------
// NAME: FlipColor
//-----------------------------------------------------------------------------
// DESCRIPTION:
//		Assigns a CSS style to an HTML element, if the given checkbox is 
//		checked. If the given checkbox is not checked, then clear the CSS from 
//		the given HTML element.
//-----------------------------------------------------------------------------
// PARAMETERS:
//		HtmlElementId - The id of the table, td, div, etc... to be highlighted
//		CssClassName - The CSS style to apply to the given HtmlElementId
//		inputControlName - the checkbox that needs to be inspected
//-----------------------------------------------------------------------------
function FlipColor(HtmlElementId, CssClassName, inputControlName) {
	var htmlElement = document.getElementById(HtmlElementId);
	var inputControl = document.getElementById(inputControlName);

	if (inputControl.checked == true) {
		htmlElement.className = CssClassName;
	}
	else {
		htmlElement.className = "";
	}
}

//-----------------------------------------------------------------------------
// NAME: GetRandomInt
//-----------------------------------------------------------------------------
// DESCRIPTION:
//		Get a random integer between 1 and 1000.
//-----------------------------------------------------------------------------
function GetRandomInt() {
	return Math.floor(Math.random() * 1000) + 1;
}

//-----------------------------------------------------------------------------
// NAME: GetRandomWindowName
//-----------------------------------------------------------------------------
// DESCRIPTION:
//		Creates a random window name.
//-----------------------------------------------------------------------------
function GetRandomWindowName(windowName) {
	return windowName + GetRandomInt().toString();
}