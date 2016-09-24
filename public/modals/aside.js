/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');

	app.factory('Aside', Aside);

	function Aside(ModalService, $q){
		var service = {};


		service.showSendToList = function(prob){
			return wrapWithPromise(ModalService.showModal({
				controller: 'SendToListController',
				templateUrl: 'modals/sendToList/sendToList.html',
				inputs: {
					problem: prob
				}
			}));
		}
		service.confirm = function(title, message){
			return wrapWithPromise(ModalService.showModal({
				controller: 'ConfirmController',
				templateUrl: 'modals/confirm/confirm.html',
				inputs: {
					title: title,
					message: message
				}
			}));
		}
		service.showSetDifficulty = function(prob, userProblem){
			return wrapWithPromise(ModalService.showModal({
				controller: 'SetDifficultyController',
				templateUrl: 'modals/setDifficulty/setDifficulty.html',
				inputs: {
					problem: prob,
					userProblem: userProblem
				}
			}));
		}
		service.showInputText = function(options){ // {text, title, label, message}
			return wrapWithPromise(ModalService.showModal({
				controller: 'InputTextDialogController',
				templateUrl: 'modals/generic/inputText.html',
				inputs: {
					options : _.defaults(options, {title:'Input Text'})
				}
			}));
		}

		return service;


		/////////////////////////////		
		function wrapWithPromise(modalPromise){
			var promise = $q.defer();
			modalPromise.then(
				function(modal){
					modal.close.then(
						function(result){
							if(result && result.code){
								if( _.includes(['$closeButton','$document'], result.code) ){
									promise.reject(result.err);	
								}else{
									promise.resolve(result.body);
								}
							}else{
								promise.resolve(result);
							}
						}
					);
				},
				function(err){
					promise.reject(err);
				}
			);
			return promise.promise;
		}
	}


})();