(function() {
  'use strict';

  angular.module('enterprise-portal.models.messages', [
  ])
  	.service('MessageDetailModel', [
      '$http', '$q',
      function($http, $q) {
    		var model = this,
    			URLS = {
    				FETCH: 'assets/data/message-detail.json'
    			},
    			message,
          currentMessage;

    		function extract(result) {
    			return result.data;
    		}

    		function cacheMessage(result) {
    			message = extract(result);
    			return message;
    		}

        // model.setCurrentMessage = function() {

        // }

    		model.getMessageDetail = function() {
    			return (message) ? $q.when(message) : $http.get(URLS.FETCH).then(cacheMessage);
    		};

       

      }])
    .service('MessageListModel', [
      '$http', '$q',
      function ($http, $q) {
        var model = this,
          URLS = {
            FETCH: 'assets/data/message-list.json'
          },
          messageList;

          function extract(result) {
            return result.data;
          }

          function cacheMessageList(result) {
            messageList = extract(result);
            return messageList;
          }


          model.getMessageList = function() {
            return (messageList) ? $q.when(messageList) : $http.get(URLS.FETCH).then(cacheMessageList);
          };

          model.createNewMessage = function(newMessage) {
            newMessage._id = "<temp-id>";
            messageList.messages.push(newMessage);
          };

      
    }]);
  	
})();