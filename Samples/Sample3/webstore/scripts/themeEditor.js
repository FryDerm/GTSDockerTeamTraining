(function(){
	
	var app = angular.module('themeEditor', []);

	app.factory('Communicator', function(){

		var Communicator = function(){};

		Communicator.prototype.createEventArray = function(key){
			if(!this['pass'+key]){
				this['pass'+key] = [];
			}
		};
		Communicator.prototype.send = function(key, value){
			angular.forEach(this['pass'+key], function(func){
				func(value);
			});
		};
		Communicator.prototype.receive = function(key, callback){
			if(typeof key === 'object'){		
				for(var objKey in key){
					this.createEventArray(objKey);
					this['pass'+objKey].push(key[objKey]);
				}
			}else{
				this.createEventArray(key);
				this['pass'+key].push(callback);
			}
		};

		return new Communicator();
	});

	app.controller('LoginController', ['$scope', function($scope){

		var LoginController = function(scope){
			this.scope = scope;

			this.scope.loading = false;

			this.scope.login = angular.bind(this, this.login);
		};

		LoginController.prototype.login = function(){
			this.scope.loading = true;
		};

		return new LoginController($scope);

	}]);

	app.controller('NavController', ['$scope', 'themeEditorService','Communicator','$timeout',function($scope, themeEditorService,Communicator,$timeout){

		var NavController = function(scope){

			this.scope = scope;
			this.scope.click = angular.bind(this, this.click);
			this.scope.clickFile = angular.bind(this, this.clickFile);
			this.scope.changeTheme = angular.bind(this, this.changeTheme);
			this.scope.directories = [
				{ name: 'pages',      path: 'pages'      }, 
				{ name: 'components', path: 'components' },
				{ name: 'core',       path: 'core'       }];
			this.getThemes().then(angular.bind(this, this.updateThemes));
			Communicator.receive('updateFileModificationStatus', angular.bind(this, this.updateFileModificationStatus));
			this.updateFileModificationStatus();

			this.keepAliveInterval = 60000;

			$timeout(angular.bind(this, this.keepAlive), this.keepAliveInterval);
		};

		NavController.prototype.getThemes = function(){
			return themeEditorService.getThemes();
		};

		NavController.prototype.click = function(path, dir){
			if(dir.open){
				delete dir.open;
			}else{
				dir.path = path;
				themeEditorService.getDirectories(path).then(angular.bind(this, this.update, dir));
			}
		};

		NavController.prototype.updateThemes = function(response){
			this.scope.themes = [];
			angular.forEach(response.data, function(themeObj){
				this.scope.themes.push(themeObj.theme);
				if(themeObj.active){
					this.scope.webTheme = themeObj.theme;
				}
			}, this);
		}

		NavController.prototype.clickFile = function(file){
			Communicator.send('locationChange', angular.bind(this, function (cancel) {
				if (cancel) return;
				var data = {
					name: file.name,
					path: file.path,
					modified: file.modified
				}
				Communicator.send('getFile', data);
			}));
		};

		NavController.prototype.update = function(dir, response){
			dir.open = true;
			var ar = [],
				files = [];
			angular.forEach(response.data.directories, function(d){
				ar.push({
					name : d.fileName,
					path : d.path
				});
			});

			angular.forEach(response.data.files, function(f){
				files.push({
					name : f.fileName,
					path : f.path
				});
			});

			dir.subdirs = ar;
			dir.files = files;

			this.updateFileModificationStatus();
		};

		NavController.prototype.updateFileModificationStatus = function(refresh) {
			if (!this.scope.modifiedFiles || refresh) {
				themeEditorService.getFileModificationStatus().then(angular.bind(this, function (response) {
					this.scope.modifiedFiles = response.data;
					angular.forEach(this.scope.directories, function (dir) {
						this.updateFileModificationStatusForDir(dir, this.scope.modifiedFiles);
					}, this);
				}));
			}
			else {
				angular.forEach(this.scope.directories, function (dir) {
						this.updateFileModificationStatusForDir(dir, this.scope.modifiedFiles);
					}, this);
			}
		};

		NavController.prototype.updateFileModificationStatusForDir = function(dir, modifiedFiles) {
			if (this.hasModifications(dir.path + '/', modifiedFiles)) 
				dir.modified = true;
			else
				dir.modified = false;

			if (!dir.open) return;
			
			if (dir.files && dir.files.length > 0) {
				angular.forEach(dir.files, function (file) {
					if (this.hasModifications(file.path, modifiedFiles))
						file.modified = true;
					else
						file.modified = false;
					Communicator.send('updateEditorFileModificationStatus', file);
				}, this);
			}

			if (dir.subdirs && dir.subdirs.length > 0) {
				angular.forEach(dir.subdirs, function (subdir) {
					this.updateFileModificationStatusForDir(subdir, modifiedFiles);
				}, this);
			}
		};

		NavController.prototype.hasModifications = function(path, modifiedFiles) {
			for (var index = 0; index < modifiedFiles.length; index++) {
				if (modifiedFiles[index].indexOf(path) === 0)
					return true;
			}
			return false;
		}

		NavController.prototype.changeTheme = function(){
			themeEditorService.changeTheme(this.scope.webTheme).then(angular.bind(this, NavController.prototype.constructor));
		}
		
		NavController.prototype.keepAlive = function() {
			themeEditorService.keepAlive().then(angular.bind(this, function() {
				$timeout(angular.bind(this, this.keepAlive), this.keepAliveInterval);
			}));
		}

		return new NavController($scope);

	}]);

	app.factory('themeEditorService', ['$http', function($http){

		var ThemeEditorService = function(){};

		ThemeEditorService.prototype.getDirectories = function(folder){
			return $http({
				method : 'GET',
				url : 'themeEditor/GetDirectories',
				params : {
					subdirectory : folder
				}
			});
		};

		ThemeEditorService.prototype.getFileModificationStatus = function (folder) {
			return $http({
				method: 'GET',
				url: 'themeEditor/GetFileModificationStatus',
				params: {
					subdirectory: folder
				}
			});
		};

		ThemeEditorService.prototype.getFile = function(file){
			return $http({
				method : 'GET',
				url : 'themeEditor/GetFile',
				params : {
					fileName : file
				}
			});
		};

		ThemeEditorService.prototype.saveFile = function(filePath, fileContents){
			return $http({
				method : 'POST',
				url : 'themeEditor/PostFile',
				params: {
					fileName : filePath
				},
				data : {
					"fileData" : fileContents
				}
			});
		};

		ThemeEditorService.prototype.build = function(){
			return $http({
				method : 'POST',
				url : 'themeEditor/build'
			});
		};

		ThemeEditorService.prototype.getOutput = function() {
			return $http({
				method: 'GET',
				url: 'themeEditor/GetOutput'
			});
		};

		ThemeEditorService.prototype.getThemes = function(){
			return $http({
				method : 'GET',
				url : 'themeEditor/getThemes'
			});
		};

		ThemeEditorService.prototype.changeTheme = function(themeName){
			return $http({
				method : 'POST',
				url : 'themeEditor/changeTheme',
				params : {
					theme : themeName
				}
			});
		};

		ThemeEditorService.prototype.revert = function(filePath) {
			return $http({
				method: 'POST',
				url:    'themeEditor/revert',
				params: {
					path: filePath
				}
			});
		};

		ThemeEditorService.prototype.getOriginalFile = function(filePath) {
			return $http({
				method: 'GET',
				url:    'themeEditor/getOriginalFile',
				params: {
					path: filePath
				}
			});
		};

		ThemeEditorService.prototype.keepAlive = function() {
			return $http({
				method: 'POST',
				url:    'themeEditor/keepAlive'
			});
		};

		return new ThemeEditorService();

	}]);

	app.controller('EditorController', ['$scope', 'Communicator', '$element', 'themeEditorService', '$window', function($scope, Communicator, $element, themeEditorService, $window){

		var EditorController = function(scope){
			this.scope = scope;
			this.scope.save = angular.bind(this, this.save);
			this.scope.build = angular.bind(this, this.build);
			this.scope.close = angular.bind(this, this.closeModal);
			this.scope.goToStore = angular.bind(this, this.goToStore);
			this.scope.showOutput = angular.bind(this, this.showOutput);
			this.scope.revert = angular.bind(this, this.revert);
			this.scope.closeRevertModal = angular.bind(this, this.closeRevertModal);
			this.scope.doRevert = angular.bind(this, this.doRevert);
			this.scope.showDiff = angular.bind(this, this.showDiff);
			this.scope.closeDiffModal = angular.bind(this, this.closeDiffModal);
			this.scope.confirmLeaveCancel = angular.bind(this, this.confirmLeaveCancel);
			this.scope.confirmLeaveDoNotSave = angular.bind(this, this.confirmLeaveDoNotSave);
			this.scope.confirmLeaveSave = angular.bind(this, this.confirmLeaveSave);
			this.scope.isDirty = false;
			Communicator.receive('getFile', angular.bind(this, this.getFile));
			Communicator.receive('updateEditorFileModificationStatus', angular.bind(this, this.updateEditorFileModificationStatus));
			Communicator.receive('changeUpdate', angular.bind(this, this.changeUpdate));
			Communicator.receive('locationChange', angular.bind(this, this.locationChange));

			this.scope.showModal = false;

			$window.onbeforeunload = angular.bind(this, function() {
				if (this.code && this.scope.isDirty) {
					return "Are you sure you want to leave? The code in the editor has unsaved changes.";
				}
			});
		};

		EditorController.prototype.locationChange = function(callback) {
			if (this.code && this.scope.isDirty) {
				this.confirmLeaveCallback = callback;
				this.scope.showConfirmLeave = true;
			} else {
				callback(false);
			}
		};

		EditorController.prototype.confirmLeaveCancel = function() {
			this.scope.showConfirmLeave = false;
			this.confirmLeaveCallback(true);
		};

		EditorController.prototype.confirmLeaveDoNotSave = function() {
			this.scope.showConfirmLeave = false;
			this.confirmLeaveCallback(false);
		};

		EditorController.prototype.confirmLeaveSave = function() {
			this.save();
			this.scope.showConfirmLeave = false;
			this.confirmLeaveCallback(false);
		};

		EditorController.prototype.isCustomerEditableFile = function (fileName) {
			return (fileName.indexOf('.instance.') !== -1 || 
				fileName.indexOf('.customer.') !== -1 ||
				fileName.indexOf('.viewModel.') !== -1 ||
				fileName.indexOf('.service.') !== -1);
		};

		EditorController.prototype.getFile = function (data) {

			if ((data.name.indexOf('.js') > -1 || data.name.indexOf('.styl') > 1) && !this.isCustomerEditableFile(data.name)) {
		        this.scope.readOnly = true;
		    } else {
		        this.scope.readOnly = false;
		    }

			this.scope.modified = data.modified;

		    window.scrollTo(0, 0);
			this.scope.show = true;
			this.scope.loading = true;
			this.file = data;
			themeEditorService.getFile(this.file.path).then(angular.bind(this, function(response){
				this.file.content = response.data;
				this.showFile();
			}));
		};

		EditorController.prototype.showFile = function(fileData){

			$element[0].querySelectorAll('[data-js="file-contents"]')[0].innerHTML = "";

			this.scope.fileName = this.file.name;
			this.scope.isDirty = false;
			var type = this.getFileType(this.file.name);
			if(type){
				CodeMirror.commands.save = this.scope.save;
				this.code = CodeMirror($element[0].querySelectorAll('[data-js="file-contents"]')[0], {
		  			value: this.file.content,
					mode:  type,
					lineNumbers: true,
					viewportMargin: Infinity,
					indentWithTabs : true,
					tabSize : 4,
					readOnly: this.scope.readOnly
				});
				this.scope.changeGeneration = this.code.getDoc().changeGeneration();
				this.code.on('change', angular.bind(this, this.onChange));
				this.scope.loading = false;

			}else{
				alert('error parsing file');
			}
			//this.scope.fileContents = fileData.content;
		};

		EditorController.prototype.onChange = function() {
			this.scope.isDirty = !this.code.getDoc().isClean(this.scope.changeGeneration);
			this.scope.$apply();
		};

		EditorController.prototype.getFileType = function(fileName){

			var types = {
				'js' : 'javascript',
				'jade' : 'jade',
				'styl' : 'stylus'
			};

			var t = fileName.substring(fileName.lastIndexOf('.') + 1);
			return types[t];
		};

		EditorController.prototype.save = function(){

			this.scope.loading = true;
			this.file.content = this.code.getValue();
			themeEditorService.saveFile(this.file.path, this.file.content).then(angular.bind(this, function(){
				this.scope.loading = false;
				this.scope.isDirty = false;
				this.scope.changeGeneration = this.code.getDoc().changeGeneration(true);
				Communicator.send('updateFileModificationStatus', true);
			}));
		};

		EditorController.prototype.build = function(){
			this.scope.modalLoading = true;
			this.scope.showModal = true;
			
			themeEditorService.build().then(angular.bind(this, function(response){
				this.scope.modalLoading = false;
				this.scope.error = false;
				this.scope.outputShown = false;
				this.scope.showPreviewLink = response.data.showPreviewLink;
				this.scope.previewLink = response.data.previewLink;

				themeEditorService.getOutput().then(angular.bind(this, function(response) {
					$element[0].querySelectorAll('[data-js="gruntOutput"]')[0].innerHTML = response.data;
				}));

			}), angular.bind(this, function(){
				this.scope.modalLoading = false;
				this.scope.error = true;
				this.scope.outputShown = true;

				themeEditorService.getOutput().then(angular.bind(this, function(response) {
					$element[0].querySelectorAll('[data-js="gruntError"]')[0].innerHTML = response.data;
				}));
			}));
		};

		EditorController.prototype.updateEditorFileModificationStatus = function(file) {
			if (!this.file) return;

			if (this.file.path === file.path)
				this.scope.modified = file.modified;
		}

		EditorController.prototype.showOutput = function() {
			this.scope.outputShown = !this.scope.outputShown;
		};

		EditorController.prototype.closeModal = function(){
			this.scope.showModal = false;
		};

		EditorController.prototype.revert = function() {
			this.scope.showRevertModal = true;
		};

		EditorController.prototype.closeRevertModal = function() {
			this.scope.showRevertModal = false;
		}

		EditorController.prototype.doRevert = function() {
			themeEditorService.revert(this.file.path).then(angular.bind(this, function(response) {
				Communicator.send('updateFileModificationStatus', true);
				this.closeRevertModal();
				this.getFile(this.file);
			}));
		};

		EditorController.prototype.showDiff = function() {
			$element[0].querySelectorAll('[data-js="diff-contents"]')[0].innerHTML = '';
			this.scope.modalLoading = true;
			this.scope.showDiffModal = true;

			themeEditorService.getOriginalFile(this.file.path).then(angular.bind(this, function(response) {
				this.diff = CodeMirror.MergeView($element[0].querySelectorAll('[data-js="diff-contents"]')[0], {
					origLeft: response.data.replace(/\r\n/g, '\n'),
					revertButtons: false,
					value: this.code.getValue(),
					lineNumbers: true,
					viewportMargin: Infinity,
					indentWithTabs : true,
					tabSize : 4,
					readOnly: true
				});
				this.scope.modalLoading = false;
			}));
		};

		EditorController.prototype.closeDiffModal = function() {
			this.scope.showDiffModal = false;
		}

		return new EditorController($scope);

	}]);

	angular.bootstrap(angular.element(document.getElementsByTagName('html')[0]), ['themeEditor']);

})();