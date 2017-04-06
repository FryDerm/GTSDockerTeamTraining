gts = window.gts || {};

gts.eGalaxyWebAPI = (function($) {
    var api = {};
    var version = "1.0";

    var settings = {
        root: "",
        log: false
    };

    var urls = {
        root: "",
        GetProducts: "API/SalesChannelProducts",
        Html: "API/Html",
        GeneralConfig: "API/GeneralConfig",
        ShoppingCheckoutConfig: "API/ShoppingCheckoutConfig",
        Countries: "API/Countries",
        States: "API/States",
        Shipping: "API/Shipping",
        NewsletterOptIn: "API/NewsletterOptIn",
        NewsletterOptInDisplay: "API/NewsletterOptInDisplay",
        SurveyOptIn: "API/SurveyOptIn",
        SurveyOptInDisplay: "API/SurveyOptInDisplay",
        GuestNames: "API/GuestNames",
        Fop: "API/Fop",
        Payment: "API/Payment",
        BillingContact: "API/BillingContact",
        ShippingContact: "API/ShippingContact",
        SalesChannelProducts: "API/SalesChannelProducts",
        Cart: "API/Cart",
        Stores: "API/StoresNavigation",
        Categories: "API/CategoriesNavigation",
        Pass: "API/Pass",
        NameTitles: "API/NameTitles",
        NameSuffixes: "API/NameSuffixes",
        PassKind: "API/PassKind",
        Member: "API/Member",
        Product: "API/Product",
        MemberAddons: "API/MemberAddons",
        Language: "API/Language",
        LanguageState: "API/LanguageState",
        TicketInfo: "API/TicketInfo",
        RenewalCart: "API/RenewalCart",
        renewalOptions: "API/RenewalOptions",
        relationshipType: "API/RelationshipType",
        relationshipTypes: "API/RelationshipTypes",
        discounts: "API/Discount",
        account: "API/Account",
        membership: "API/Membership",
        stateRegions: "API/StateRegions",
        finalizeOrder: "API/FinalizeOrder",
        donation: "API/Donation",
        multipleChoices: "API/MultipleChoices",
        contacts: "API/contacts",
        TermsConditionsDisplay: "API/TermsConditionsDisplay",
        DualRelationship: "API/DualRelationship",
        CartValidate: "API/CartValidate",
        OrderNotes: "API/OrderNotes",
        loyalty: "API/Loyalty",
        PersonalMessage: "API/PersonalMessage",
        PersonalMessageConfig: "API/PersonalMessageConfig",
        FieldAttribute: "API/FieldAttribute"
    };

    api.Version = function() {
        return version;
    };

    api.Logger = function(message) {
        if (settings.log && typeof (console) !== 'undefined') {
        }
    };

    api.init = function(options) {
        $.extend(settings, options);
        urls.root = settings.root;
        api.Logger("eGalaxyWebAPI version " + api.Version());
    };

    var json = {
        Get: function(url, data, onSuccess, onError) {
            api.Logger("json.Get(" + url + ")");
            return json.Ajax(url, "GET", data, "application/x-www-form-urlencoded; charset=UTF-8", onSuccess, onError);
        },

        Post: function(url, data, onSuccess, onError) {
            api.Logger("json.Post(" + url + ")");
            return json.Ajax(url, "POST", JSON.stringify(data), "application/json", onSuccess, onError);
        },

        Put: function(url, data, onSuccess, onError) {
            api.Logger("json.Put(" + url + ")");
            return json.Ajax(url, "PUT", JSON.stringify(data), "application/json", onSuccess, onError);
        },

        Delete: function(url, data, onSuccess, onError) {
            api.Logger("json.Delete(" + url + ")");
            return json.Ajax(url, "DELETE", data, "application/x-www-form-urlencoded; charset=UTF-8", onSuccess, onError);
        },

        Ajax: function(url, actionVerb, data, contentType, onSuccess, onError) {
            api.Logger("json.Ajax(" + url + "," + actionVerb + ")");
            return $.ajax(
            {
                traditional: true,
                type: actionVerb,
                url: url,
                data: data,
                contentType: contentType,
                dataType: "json",
                success: onSuccess,
                error: onError
            });
        }
    };

    api.Html = {
        Types: {
            Header: 1,
            SubHeader: 2,
            Footer: 3,
            SubFooter: 4,
            Navigation: 5,
            Error: 6,
            LandingPage: 7,
            ReviewOrder: 8,
            OrderConfirmation: 9,
            TermsAndConditions: 10,
            PassLookup: 11,
            PassRenawal: 12,
            PaymentPlansLogin: 13,
            GroupSalesLogin: 14,
            GroupSalesVerifyLimits: 15,
            Payment: 16,
            StoreOffline: 17,
            ViewItems: 18,
            ViewCart: 19,
            BillingInfo: 20,
            ShippingInfo: 21,
            DeliveryInfo: 22,
            SurveyLandingPage: 23,
            SurveyConclusionPage: 24
        },
        Get: function(type, onSuccess, onError) {
            var url = urls.root + urls.Html + "/" + type;
            return json.Get(url, null, onSuccess, onError);
        }
    };

    var generalConfig = (function() {
        var model = {};
        var loaded = false;

        model.Get = function() {
            if (loaded) {
                return $.when();
            }

            var url = urls.root + urls.GeneralConfig;
            return json.Get(url, null, onGet, onError);
        };

        function onGet(data) {
            loaded = true;
            model.DefaultCountryCode = data.DefaultCountryCode;
        }

        function onError() {
        }

        return model;
    })();

    var shoppingCheckoutConfig = (function() {
        var model = {};

        model.Init = function() {
            var url = urls.root + urls.ShoppingCheckoutConfig;
            return json.Get(url, null, onGet, onError);
        };

        function onGet(data) {
            model.BypassGuestNames = data.BypassGuestNames;
            model.DisplayOrderConfirmationPrompt = data.DisplayOrderConfirmationPrompt;
            model.DisplayOrderNotesField = data.DisplayOrderNotesField;
        }

        function onError() {
        }

        return model;
    })();

    api.PersonalMessageConfig = {
	    Get: function (onSuccess, onError) {
	        var url = urls.root + urls.PersonalMessageConfig;
	        return json.Get(url, null, onSuccess, onError);
	    }
	};
    
	api.Config = (function () {
	    var model = {};

	    model.Init = function () {
			return model.General.Get();
	    };

	    model.General = generalConfig;
	    model.ShoppingCheckout = shoppingCheckoutConfig;
        
	    return model;
	})();

	api.States = {
		Get: function (countryCode, onSuccess, onFailure) {
			var url = urls.root + urls.States;
			return json.Get(url, countryCode, onSuccess, onFailure);
		}
	};

	api.Countries = {
		Get: function (onSuccess, onError) {
			var url = urls.root + urls.Countries;
			return json.Get(url, null, onSuccess, onError);
		}
	};

	api.Shipping = {
		Get: function (onSuccess, onError) {
			var url = urls.root + urls.Shipping;
			return json.Get(url, null, onSuccess, onError);
		},
		Post: function (data, onSuccess, onError) {
			var url = urls.root + urls.Shipping;
			return json.Post(url, data, onSuccess, onError);
		}
	};

	api.NewsletterOptIn = {
	    Post: function (data, onSuccess, onError) {
	        var url = urls.root + urls.NewsletterOptIn;
	        return json.Post(url, data, onSuccess, onError);
	    }
	};

	api.NewsletterOptInDisplay = {
	    Get: function (onSuccess, onError) {
	        var url = urls.root + urls.NewsletterOptInDisplay;
	        return json.Get(url, null, onSuccess, onError);
	    }
	};

	api.SurveyOptIn = {
	    Post: function (onSuccess, onError) {
	        var url = urls.root + urls.SurveyOptIn;
	        return json.Post(url, null, onSuccess, onError);
	    }
	};

	api.SurveyOptInDisplay = {
	    Get: function (onSuccess, onError) {
	        var url = urls.root + urls.SurveyOptInDisplay;
	        return json.Get(url, null, onSuccess, onError);
	    }
	};

    api.TermsConditionsDisplay = {
        Get: function(onSuccess, onerror) {
            var url = urls.root + urls.TermsConditionsDisplay;
            return json.Get(url, null, onSuccess, onerror);
        }
    };

    api.DualRelationship = {
        Get: function(onSuccess, onError) {
            var url = urls.root + urls.DualRelationship;
            return json.Get(url, null, onSuccess, onError);
        },
        Post: function (data, onSuccess, onError) {
            var url = urls.root + urls.DualRelationship;
            return json.Post(url, data, onSuccess, onError);
        },
        Put: function(data, onSuccess, onError) {
            var url = urls.root + urls.DualRelationship;
            return json.Put(url, data, onSuccess, onError);
        }
    };

    api.GuestNames = {
		Get: function (onSuccess, onError) {
			var url = urls.root + urls.GuestNames;
			return json.Get(url, null, onSuccess, onError);
		},
		Post: function (data, onSuccess, onError) {
			var url = urls.root + urls.GuestNames;
			return json.Post(url, data, onSuccess, onError);
		}
	};

	api.Fop = {
	    Get: function (onSuccess, onError) {
	        var url = urls.root + urls.Fop;
	        return json.Get(url, null, onSuccess, onError);
	    }
	};

	api.Payment = {
		Post: function (data, onSuccess, onError) {
			var url = urls.root + urls.Payment;
			return json.Post(url, data, onSuccess, onError);
		}
	};

	api.OrderNotes = {
	    Get: function (onSuccess, onError) {
	        var url = urls.root + urls.OrderNotes;
	        return json.Get(url, null, onSuccess, onError);
	    },
	    Post: function (data, onSuccess, onError) {
	        var url = urls.root + urls.OrderNotes;
	        return json.Post(url, data, onSuccess, onError);
	    }
	};

    api.PersonalMessage = {
        Get: function(onSuccess, onError) {
            var url = urls.root + urls.PersonalMessage;
            return json.Get(url, null, onSuccess, onError);
        },
        Post: function(data, onSuccess, onError) {
            var url = urls.root + urls.PersonalMessage;
            return json.Post(url, data, onSuccess, onError);
        }
    };

    api.FieldAttribute = {
        Get: function (id, onSuccess, onError) {
            var url = urls.root + urls.FieldAttribute + "/" + id;
            return json.Get(url, null, onSuccess, onError);
        }
    };

    api.BillingContact = {
		get: function (onSuccess, onError) {
		    var url = urls.root + urls.BillingContact;
	        return json.Get(url, null, onSuccess, onError);
	    },
		post: function (data, onSuccess, onError) {
			var url = urls.root + urls.BillingContact;
			return json.Post(url, data, onSuccess, onError);
		},
		put: function (data, onSuccess, onError) {
		    var url = urls.root + urls.BillingContact;
		    return json.Put(url, data, onSuccess, onError);
		}
	};

	api.ShippingContact = {
	    get: function (onSuccess, onError) {
	        var url = urls.root + urls.ShippingContact;
	        return json.Get(url, null, onSuccess, onError);
	    },
	    post: function (data, onSuccess, onError) {
	        var url = urls.root + urls.ShippingContact;
	        return json.Post(url, data, onSuccess, onError);
	    },
	    put: function (data, onSuccess, onError) {
	        var url = urls.root + urls.ShippingContact;
	        return json.Put(url, data, onSuccess, onError);
	    }
	};

	api.SalesChannelProducts = {
		Get: function (data, onSuccess, onError) {
			var url = urls.root + urls.SalesChannelProducts;
			return json.Get(url, data, onSuccess, onError);
		}
	};

	api.Cart = {
		Get: function (onSuccess, onError) {
			var url = urls.root + urls.Cart;
			return json.Get(url, null, onSuccess, onError);
		},
		Post: function (data, onSuccess, onError) {
			var url = urls.root + urls.Cart;
			return json.Post(url, data, onSuccess, onError);
		},
		Put: function (data, onSuccess, onError) {
		    var url = urls.root + urls.Cart;
		    return json.Put(url, data, onSuccess, onError);
		},
		Delete: function (id, onSuccess, onError) {
			var url = urls.root + urls.Cart + "/" + id;
			return json.Delete(url, null, onSuccess, onError);
		},
		ProductTypes: {
			TicketItem: 1,
			Payment: 2,
			NoteMemo: 3,
			ReturnPayment: 4,
			Reserved: 5,
			Tax: 6,
			VoidTax: 7,
			PassDetail: 8,
			TotalTax: 9,
			Package: 10,
			PackageDetail: 11,
			Fee: 12,
			Transportation: 13,
			Donation: 14,
			MemberAddon: 15
		},
		DonationPromptTypes: {
		    None: 0,
		    OptInRoundUp: 1,
		    OptInEditable: 2,
		    OptInFixed: 3,
		    OptOut: 4
		},
		ProductKinds: {
	        Plain: 1,
	        Pass: 2,
	        PaidIn: 3,
	        PaidOut: 4,
	        Group: 5,
	        ReissuePass: 6,
	        RenewPass: 7,
	        Item: 8,
	        Reserved: 9,
	        Debit: 10,
	        Recharge: 11,
	        DebitReissue: 12,
	        UpgradePass: 13,
	        Exchange: 14,
	        Package: 15,
	        Donation: 18,
	        MemberAddon: 20
	    }
	};

	api.Categories = {
		Get: function (data, onSuccess, onError) {
			var url = urls.root + urls.Categories;
			return json.Get(url, data, onSuccess, onError);
		}
	};

	api.Stores = {
	    Get: function (onSuccess, onError) {
	        var url = urls.root + urls.Stores;
	        return json.Get(url, null, onSuccess, onError);
	    }
	};
	
	api.Pass = {
		Get: function (id, onSuccess, onError) {
			var url = urls.root + urls.Pass + "/" + id;
			return json.Get(url, null, onSuccess, onError);
		},
		Post: function (data, onSuccess, onError) {
			var url = urls.root + urls.Pass;
			return json.Post(url, data, onSuccess, onError);
		},
		Put: function (data, onSuccess, onError) {
		    var url = urls.root + urls.Pass;
		    return json.Put(url, data, onSuccess, onError);
		},
		Fields: {
			FirstName: 0,
			LastName: 2,
			Street1: 3,
			Street2: 4,
            City: 5,
			State: 6,
			PostalCode: 7,
			Phone: 8,
			Birthday: 9,
			Gender: 28,
			Suffix: 27,
			Email: 25,
			Title: 26,
			CountryCode: 24,
			relationshipType: 10001
		}
	};

	api.NameTitles = {
		Get: function (onSuccess, onError) {
			var url = urls.root + urls.NameTitles;
			return json.Get(url, null, onSuccess, onError);
		}
	};

	api.NameSuffixes = {
		Get: function (onSuccess, onError) {
			var url = urls.root + urls.NameSuffixes;
			return json.Get(url, null, onSuccess, onError);
		}
	};

	api.PassKind = {
		Get: function (id, onSuccess, onError) {
			var url = urls.root + urls.PassKind;
			return json.Get(url, { Id: id }, onSuccess, onError);
		}
	};

	api.Member = {
		Get: function (onSuccess, onError) {
			var url = urls.root + urls.Member;
			return json.Get(url, null, onSuccess, onError);
		},
		Post: function (data, onSuccess, onError) {
			var url = urls.root + urls.Member;
			return json.Post(url, data, onSuccess, onError);
		},
		Put: function (data, onSuccess, onError) {
			var url = urls.root + urls.Member;
			return json.Put(url, data, onSuccess, onError);
		},
		Delete: function (id, onSuccess, onError) {
			var url = urls.root + urls.Member + "/" + id;
			return json.Delete(url, null, onSuccess, onError);
		},
		MemberTypes: {
			Standard: 0,
			Addon: 1
		},
		MemberDemographicTypes: {
			Adult: 0,
			Child: 1,
			Addon: 2
		}
	};

	api.FieldRule = {
		MemberTypes: {
			Primary: 0,
			Adult: 1,
			Child: 2,
			Guest: 3,
			Addon: 4
		}
	};

	api.Product = {
		Get: function (data, onSuccess, onError) {
			var url = urls.root + urls.Product;
			return json.Get(url, data, onSuccess, onError);
		}
	};

	api.MemberAddons = {
		Get: function (data, onSuccess, onError) {
			var url = urls.root + urls.MemberAddons;
			return json.Get(url, data, onSuccess, onError);
		}
	};
	
	api.Language = {
		Get: function(onSuccess, onError) {
			var url = urls.root + urls.Language;
			return json.Get(url, null, onSuccess, onError);
		}
	};

	api.LanguageState = {
		Get: function (onSuccess, onError) {
			var url = urls.root + urls.LanguageState;
			return json.Get(url, null, onSuccess, onError);
		},
		Put: function (data, onSuccess, onError) {
			var url = urls.root + urls.LanguageState;
			return json.Put(url, data, onSuccess, onError);
		}
	};

    api.TicketInfo = {
        Get: function(data, onSuccess, onError) {
            var url = urls.root + urls.TicketInfo;
            return json.Get(url, data, onSuccess, onError);
        }
    };

    api.RenewalCart = {
        Get: function (onSuccess, onError) {
            var url = urls.root + urls.RenewalCart;
            return json.Get(url, null, onSuccess, onError);
        },
        Post: function (data, onSuccess, onError) {
            var url = urls.root + urls.RenewalCart;
            return json.Post(url, data, onSuccess, onError);
        }
    };

    api.relationshipType = {
        get: function (relationshipTypeId, onSuccess, onFailure) {
            var url = urls.root + urls.relationshipType + "/" + relationshipTypeId;
            return json.Get(url, null, onSuccess, onFailure);
        }
    };

    api.relationshipTypes = {
        get: function (onSuccess, onFailure) {
            var url = urls.root + urls.relationshipTypes;
            return json.Get(url, null, onSuccess, onFailure);
        }
    };

    api.discounts = {
        post: function (discountCode, onSuccess, onFailure) {
            var url = urls.root + urls.discounts;
            var data = { DiscountCode: discountCode };
            return json.Post(url, data, onSuccess, onFailure);
        }
    };

    api.account = {
        get: function (onSuccess, onFailure) {
            var url = urls.root + urls.account;
            return json.Get(url, null, onSuccess, onFailure);
        }
    };

    api.membership = {
        get: function (visualId, onSuccess, onFailure) {
            var url = urls.root + urls.membership + "/" + visualId;
            return json.Get(url, null, onSuccess, onFailure);
        }
    };

    api.renewalOptions= {
        get: function (ids, onSuccess, onFailure) {
            var idString = ids.join("&ids=");
            var url = urls.root + urls.renewalOptions + "?ids=" + idString;
            return json.Get(url, null, onSuccess, onFailure);
        }
    };

    api.stateRegions = {
        get: function (countryCode, onSuccess, onFailure) {
            var url = urls.root + urls.stateRegions + "/" + countryCode;
            return json.Get(url, null, onSuccess, onFailure);
        }
    };

    api.finalizeOrder = {
        post: function (onSuccess, onFailure) {
            var url = urls.root + urls.finalizeOrder;
            return json.Post(url, null, onSuccess, onFailure);
        }
    };
    
    api.donation = {
        get: function (onSuccess, onFailure) {
	        var url = urls.root + urls.donation;
	        return json.Get(url, null, onSuccess, onFailure);
        },
        post: function (data, onSuccess, onFailure) {
            var url = urls.root + urls.donation;
            return json.Post(url, data, onSuccess, onFailure);
        },
        Delete: function (onSuccess, onError) {
            var url = urls.root + urls.donation;
            return json.Delete(url, null, onSuccess, onError);
        }
    };

    api.contacts = {
        get: function (onSuccess, onFailure) {
            var url = urls.root + urls.contacts;
            return json.Get(url, null, onSuccess, onFailure);
        }
    };

    api.multipleChoices = {
        get: function (onSuccess, onFailure) {
            var url = urls.root + urls.multipleChoices ;
            return json.Get(url, null, onSuccess, onFailure);
        }
    };

   	api.getRoot = function(){
   		return urls.root;
   	};
    
   	api.Loyalty = {
   	    Get: function (data, onSuccess, onError) {
   	        var url = urls.root + urls.loyalty;
   	        return json.Get(url, data, onSuccess, onError);
   	    },
   	    PutLoyalty: function (loyaltyMode, onSuccess, onError) {
   	        var url = urls.root + urls.loyalty + "?loyaltyMode=" + loyaltyMode;
   	        return json.Put(url, onSuccess, onError);
   	    }
   	};

    api.CartValidate = {
        Get: function(onSuccess, onError) {
            var url = urls.root + urls.CartValidate;
            return json.Get(url, null, onSuccess, onError);
        }
    };

	return api;
} (jQuery));