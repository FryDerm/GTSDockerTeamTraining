gts.membershipDetailsModule = (function ($) {
    var model = {};
    var settings = {
        visualId: "",
        selector: "#membership-details",
        statsSelector: ".details-stats",
        subHeaderTemplate: "#sub-header-template",
        membershipStatsTemplate: "#membership-stats-template",
        membershipStatsSelector: ".info-column .details-stats",
        membershipSummaryTemplate: "#membership-summary-template",
        membershipSummarySelector: "#membership-summary",
        associatedLinkSelector: "#associated-link",
        associatedMembershipsTemplate: "#associated-memberships-template",
        associatedMembershipsSelector: "#associated-memberships",
        renewalOptionsLinkSelector: "#renewal-link",
        renewalOptionsTemplate: "#renewal-options-template",
        renewalOptionsSelector: "#renew-items #plu-items",
        renewalOptionsProgress: '#renew-options-wait'
    };

    var currentMembership;

    model.init = function(options) {
        $.extend(settings, options);

        $("#summary-link, #renewal-link, #associated-link").contentSwitcher();
        $(".main-content").fadeIn(1000);

        if (!settings.visualId)
            return;

        $("#renew-items").data("visualid", settings.visualId);
        
        gts.eGalaxyWebAPI.membership.get(settings.visualId)
            .done(function(data) {
                currentMembership = data;
                renderMembership();

                var ids = [];
                ids.push(settings.visualId);

                // check if dual membership 
                if (currentMembership.IsDualMembership === true && currentMembership.AssociatedMemberships.length > 0) {
                    $.each(currentMembership.AssociatedMemberships, function (key, value) {
                        var _self = value;
                        ids.push(_self.VisualId);
                    });
                }

                $(settings.renewalOptionsProgress).show();
                
                gts.eGalaxyWebAPI.renewalOptions.get(ids)
                    .done(function (renewalOptions) {
                        if (renewalOptions.length > 0) {
                            $(settings.renewalOptionsLinkSelector).fadeIn();
                        }
                        renderRenewalOptions(renewalOptions);
                        $(settings.renewalOptionsProgress).hide();
                });

                setTimeout(function() {
                    $(".details-stats").fadeIn(500);

                    $("dl dt").css("padding-left", "25px").each(function(i, e) {
                        setTimeout((function(element) {
                            return function() { $(element).animate({ paddingLeft: 0 }, 750); };
                        })(e), i * 200);
                    });

                    $("dl dd").css("padding-left", "75px").each(function(i, e) {
                        setTimeout((function(element) {
                            return function() { $(element).animate({ paddingLeft: 0 }, 750); };
                        })(e), i * 200);
                    });
                }, 500);

                renderSubHeader();
                pageTitle(currentMembership.Name);
            });

       
    };

    function renderRenewalOptions(renewalOptions) {

        var renewalMarkup;
        $.each(renewalOptions, function (key, value) {

            if (key === 0) {
                renewalMarkup = $.trim($(settings.renewalOptionsTemplate).render(value));
            } else {
                renewalMarkup += $.trim($(settings.renewalOptionsTemplate).render(value));
            }
            
        });

        $(settings.selector).find(settings.renewalOptionsSelector).html(renewalMarkup);
    }
    
    function renderMembership() {
        var statsMarkup = $.trim($(settings.membershipStatsTemplate).render(currentMembership));
        $(settings.selector).find(settings.membershipStatsSelector).html(statsMarkup);
        
        var summaryMarkup = $.trim($(settings.membershipSummaryTemplate).render(currentMembership));
        $(settings.selector).find(settings.membershipSummarySelector).html(summaryMarkup);

        if (currentMembership.AssociatedMemberships.length > 0) {
            $(settings.associatedLinkSelector).fadeIn();
            var associatedMarkup = $.trim($(settings.associatedMembershipsTemplate).render(currentMembership));
            $(settings.selector).find(settings.associatedMembershipsSelector).html(associatedMarkup);
        }
    }
    
    function renderSubHeader() {
        var subHeaderMarkup = $.trim($(settings.subHeaderTemplate).render());
        if (subHeaderMarkup) {
            $("#sub-header").html(subHeaderMarkup).show();
            setTimeout(function () {
                $("#sub-header ul").fadeIn(500).css("display", "inline-block");

                $("#sub-header ul li").css("padding-left", "25px").each(function (i, e) {
                    setTimeout((function (element) {
                        return function () { $(element).animate({ paddingLeft: 0 }, 750); };
                    })(e), i * 200);
                });
            }, 500);
        }
    }

    function pageTitle(newTitle) {
        if (!newTitle) {
            return $(settings.selector).find(".details-page-name .name").text();
        }

        $(settings.selector).find(".details-page-name .name").text(newTitle);
        return model;
    }
    
    return model;
})(jQuery);