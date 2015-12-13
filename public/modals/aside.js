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

		return service;


		/////////////////////////////		
		function wrapWithPromise(modalPromise){
			var promise = $q.defer();
			modalPromise.then(
				function(modal){
					modal.close.then(
						function(result){
							promise.resolve(result);
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