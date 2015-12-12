/*globals _,angular*/
(function(){
	var app = angular.module('TodoApp');

	app.factory('Aside', Aside);

	function Aside(ModalService){
		var service = {};


		service.showSendToList = function(prob){
			var sendToList = ModalService.showModal({
				controller: 'SendToListController',
				templateUrl: 'modals/sendToList/sendToList.html',
				inputs: {
					problem: prob
				}
			});
			sendToList.then(
				function(modal){
					// modal.element.modal();
					modal.close.then(function(result) {
						// $scope.message = result ? "You said Yes" : "You said No";
					});
				}
			);
		}

		return service;
	}

})();