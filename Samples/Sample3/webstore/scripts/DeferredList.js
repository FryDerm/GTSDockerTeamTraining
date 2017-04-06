var DeferredList = (function() {

    var failure = null;

    function DeferredList() {

        this.list = [];
        this.add($.Deferred().resolve());
    };

    DeferredList.prototype.add = function (singleDeferred) {

        if (typeof singleDeferred === 'undefined') {
            throw ('index ' + this.list.length + 'was not really a deferred');
        }

		this.list.push(singleDeferred);
		return this.list;
	};

	DeferredList.prototype.status = function(){
		var status = 'resolved';
		$.each(this.list, function (key, singleDeferred) {
		    if(singleDeferred.state){
		        if(singleDeferred.state() !== 'resolved'){
		            status = 'pending';
		            return false;
		        }
		    }
		});
		return status;
	};

	DeferredList.prototype.done = function(callback){

    	var self = this;
    	if(this.status() === 'resolved'){
        	callback();
        	return self;
    	}

    	$.each(this.list, function (key, singleDeferred) {


        	if(singleDeferred.state){
            	singleDeferred.done(function(){
                	if(self.status() === 'resolved'){
                    	callback();
                    	return false;
                	}
            	});
	            singleDeferred.fail(function() {
	                if (failure) {
	                    failure(arguments);
	                }
	            });
	        }
    	});
	};

	DeferredList.prototype.fail = function(callback) {
        if (callback && typeof callback === "function") {
            failure = callback;
        }
	}

    return DeferredList;

})();