gts.themeEditorDisplay = (function ($) {
	var model = {};
	var settings = {
		editor: {},
		editorSelector: "#editor",
		editorName: "editor",
		editorTheme: "ace/theme/textmate",
		aceModePath: "ace/mode/",
		messageSelector: "#message",
		messageSuccessClass: "message-success",
		messageFailureClass: "message-failure",
		navigationSelector: "#site-editor-nav",
		activeFileClass: "active",
		loadingIndicatorSelector: ".loading",
		saveButtonSelector: "#CheckoutFileSave"
	};
	var editorMode;

	model.init = function (options) {
		$.extend(settings, options);
		
		settings.editor = ace.edit(settings.editorName);
		settings.editor.setTheme(settings.editorTheme);

		$(settings.navigationSelector).off("click", "section .title", onSectionSelected);
		$(settings.navigationSelector).on("click", "section .title", onSectionSelected);
		$(settings.navigationSelector).off("click", "section ul li", onFileSelected);
		$(settings.navigationSelector).on("click", "section ul li", onFileSelected);
		$("body").off("click", settings.saveButtonSelector, onSave);
		$("body").on("click", settings.saveButtonSelector, onSave);

		// default display of first file selection.
		$(settings.navigationSelector).find("section .title:first").trigger("click");
	};

	function onSave(e) {
		e.preventDefault();

		var selectedFile = $(settings.navigationSelector).find("ul li.active");
		var section = selectedFile.closest("section").data("id");
		var mode = selectedFile.data("mode");
		var nameOverride = selectedFile.data("fileName");
		
		post(section, mode, nameOverride);
	}
	
	function onFileSelected(e) {
		e.preventDefault();
		
		$(settings.navigationSelector).find("ul li").removeClass(settings.activeFileClass);
		$(this).addClass(settings.activeFileClass);
		
		var section = $(this).closest("section").data("id");
		var mode = $(this).data("mode");
		var nameOverride = $(this).data("fileName");
		get(section, mode, nameOverride);
	}

	function onSectionSelected(e) {
	    var that = $(this);
	    var fileOptions = that.closest("section").find("ul");

        // if this section is already visible, don't do anything.
	    if (fileOptions.find(":visible").length > 0) {
	        return;
	    }
	    
        // collapse other visible sections if they exist and expand the clicked section.
	    var visibleSections = $(settings.navigationSelector).find("section ul:visible");
        if (visibleSections.length > 0) {
            visibleSections.slideUp(200, function() {
                that.closest("section").find("ul").slideDown(200, function() {
                    $(this).find("li:first").trigger("click");
                });
            });
        } else {
            that.closest("section").find("ul").slideDown(200, function () {
                $(this).find("li:first").trigger("click");
            });
        }
	}
    
	function get(section, mode, nameOverride) {
		editorMode = settings.aceModePath + mode;
		var fileType = getFileType(mode);
		return gts.themeEditorFile.get((nameOverride || section) + "." + fileType, section, displayFile);
	};

	function getFileType(mode) {
		if (mode == "javascript") {
			return "js";
		} else {
			return mode;
		}
	}
	
	function post(section, mode, nameOverride) {
		var fileData = settings.editor.getSession().getValue();
		var fileType = getFileType(mode);

		$(settings.loadingIndicatorSelector).show();
		
		return gts.themeEditorFile.post((nameOverride || section) + "." + fileType, section, fileData)
			.always(function() {
				$(settings.loadingIndicatorSelector).hide();
			});
	};

	model.successMessage = function (text) {
		$(settings.messageSelector).clearQueue().addClass(settings.messageSuccessClass);
		displayText(text);
	};

	model.failureMessage = function (text) {
		$(settings.messageSelector).clearQueue().addClass(settings.messageFailureClass);
		displayText(text);
	};

	function displayText(text) {
		$(settings.messageSelector).html(text).slideDown(500); // Show the message
		$(settings.messageSelector).delay(3200).slideUp(500); // Fade the message out
	};

	function displayFile(data) {
		// Set data to editor
		settings.editor.getSession().setValue(data);

		// Set mode for color coding
		var mode = require(editorMode).Mode;
		settings.editor.getSession().setMode(new mode());

		// after changing the editor, fade in so the text position shows correctly.
		$(settings.editorSelector).hide().delay(100).fadeIn(500);
	}

	return model;
}(jQuery));

gts.themeEditorFile = (function ($) {
	var model = {};
	var urls = {
	    root: location.href + "/",
		getFile: "GetFile/",
		postFile: "PostFile/"
	};

	model.get = function (fileName, folderName, onGet) {
		var file = { FileName: fileName, FolderName: folderName };
		var url = urls.root + urls.getFile;
		return $.getJSON(url, file, onGet);
	};

	model.post = function (fileName, folderName, fileData) {
		var url = urls.root + urls.postFile;
		return $.ajax({
			type: "POST",
			url: url,
			cache: false,
			data: { fileName: fileName, folderName: folderName, fileData: fileData },
			success: onSuccess,
			error: onError
		});
	};

	function onSuccess() {
	    gts.themeEditorDisplay.successMessage("File saved.");
	};

	function onError() {
	    gts.themeEditorDisplay.failureMessage("File save failed.");
	};

	return model;
}(jQuery));