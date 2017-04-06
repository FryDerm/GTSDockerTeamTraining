$(document).ready(function () {
    gts.languageState.init().pipe(gts.language.init);
});

gts.languageState = (function () {
    var model = {};

    model.init = function () {
        return gts.eGalaxyWebAPI.LanguageState.Get(onGet);
    };

    model.Put = function (languageId) {
        var putData = {};
        putData.id = languageId;
        return gts.eGalaxyWebAPI.LanguageState.Put(putData, onPut);
    };

    function onGet(activeLanguageId) {
        model.ActiveLanguageId = activeLanguageId;
    }

    function onPut() {
        var orginalUrl = window.location.href;
        var newUrl = removeParam("language", orginalUrl);
        /* we need to remove the language param so that it would not
            load again even after the user selection of language */
        window.location.href = newUrl;
    }

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
    return model;
}());

gts.language = (function ($) {
	var model = {};

	model.init = function() {
		$(".language-selection").on("click", ".current-language", function () {
			$(".language-selection .language-options").slideToggle();
		});

		$(".language-selection .language-options").on("click", ".language-option", function () {
			var newLanguageId = $(this).data("id");
			if (!newLanguageId) {
				return;
			}
			
			gts.languageState.Put(newLanguageId);
		});

		gts.eGalaxyWebAPI.Language.Get(onGet);
	};
		
	function onGet(data) {
		if (data.length < 2) {
			return;
		}
		
		var currentLanguage = getCurrentLanguage(data);
		if (!currentLanguage) {
			return;
		}

		currentLanguage.imageRoot = gts.eGalaxyWebAPI.getRoot();

		$(".language-selection").show();
		var currentLanguageList = [];
		currentLanguageList.push(currentLanguage);
		var currentlanguageHtml = $.trim($("#current-language-template").render(currentLanguageList));
		$(".language-selection .current-language-wrapper").html(currentlanguageHtml);

		var languageOptions = $.grep(data, function (language) {
			return language.Id !== gts.languageState.ActiveLanguageId;
		});

		$.each(languageOptions, function(key, lang){
			languageOptions[key].imageRoot = gts.eGalaxyWebAPI.getRoot();
		});

		var languagesHtml = $.trim($("#language-options-template").render(languageOptions));
		$(".language-selection .language-options").html(languagesHtml);
	}

	function getCurrentLanguage(languages) {
		var language;
		for (var i = 0; i < languages.length; i++) {
			language = languages[i];
			if (language.Id === gts.languageState.ActiveLanguageId) {
				return language;
			}
		}
		return null;
	}

	return model;
}(jQuery));