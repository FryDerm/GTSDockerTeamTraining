var contentSwitcherCallbacks = (function () {
    var callbacks = {},
        model = {};

    model.add = function (key, fn) {
        if (this.callbacks[key]) {
            throw {
                error: "BindingsAlreadyExist",
                message: "A binding already exists for [" + key + "]",
                toString: function () { return this.error + ": " + this.message; }
            };
        }

        var events = createDefaultEvents();
        if (fn) {
            fn(events);
        }
        this.callbacks[key] = events;
    };

    model.remove = function (key) {
        delete this[key];
    };

    model.invoke = function (key, event) {
        var callback = this.callbacks[key];

        if (callback && event) {
            callback[event]();
        }
    };

    model.configure = function (key, fn) {
        var callback = this.callbacks[key];
        if (!callback) {
            throw {
                error: "ContentSwitcherNotInitialized",
                message: "Call contentSwitcher() before passing configure.",
                toString: function () { return this.error + ": " + this.message; }
            };
        }

        if (callback && fn) {
            fn(callback);
        }
    };

    model.callbacks = callbacks;

    function createDefaultEvents() {
        return {
            show: function () { },
            hide: function () { },
            cancel: function () { }
        };
    }

    return model;
})();

(function ($, callbacks) {
    var animating = false;
    $.fn.contentSwitcher = function (options) {
        var jQueryArguments = arguments;
        return this.each(function (i, e) {
            var element = $(e),
                id = $(e).attr("id"),
                target = $(e).data("target");

            if (!target) {
                throw {
                    error: "MissingTargetLink",
                    message: "A data-target must be defined for " + id,
                    toString: function () { return this.error + ": " + this.message; }
                };
            }

            if ($(target).length == 0) {
                throw {
                    error: "TargetElementInvalid",
                    message: "Unable to find the data-target element for '" + id + "'",
                    toString: function () { return this.error + ": " + this.message; }
                };
            }

            if (!jQueryArguments || jQueryArguments.length == 0) {

                callbacks.add(id, function (on) { });

                $(target).data("handle", id);
                $(target).find(".cancel").click(function () {
                    callbacks.invoke($(target).data("handle"), "cancel");
                    $("#" + $(".main-content > div:first").data("handle")).trigger("click");
                });

                element.click(function () {
                    var currentView = $(".main-content > div:visible");

                    if (element.is(".selected") || animating) {
                        return;
                    }

                    element.addClass("selected");

                    callbacks.invoke(currentView.data("handle"), "hide");
                    $("#" + currentView.data("handle")).removeClass("selected");
                    callbacks.invoke(id, "show");
                    animating = true;
                    currentView.fadeOut(function () {
                        $(target).fadeIn(500);
                        $(target).children().first().css({ marginLeft: 100 }).animate({ marginLeft: 0 }, 500);
                        animating = false;
                    });
                    currentView.children().first().animate({ marginLeft: 100 }, 500);
                });

                return;
            }

            if (jQueryArguments[0] && typeof (jQueryArguments[0]) == "string" && jQueryArguments[0] == "configure") {
                if (jQueryArguments[1] instanceof Function) {
                    callbacks.configure(id, jQueryArguments[1]);
                }
            }
        });
    };

})(jQuery, contentSwitcherCallbacks);