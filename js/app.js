angular.module('SeriesApp', [])

    /*
        Create the Google Feed API service
    */

    .factory('FeedService',['$http',function($http){
        return {
            parseFeed : function(url){
                return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=3&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
            }
        }
    }])

    .controller("FeedCtrl", ['$scope','FeedService', '$http', function ($scope, Feed, $http) {    

        /* My Series Object */


        $http.get('/feeds.json').success(function(data) {
            $scope.myFeeds = data;
        });
        

        /* Loop through the Series Object */

         angular.forEach($scope.myFeeds, function(myFeed) {

            // Call the service

            //console.log(myFeed.feed);
            
            Feed.parseFeed(myFeed.feed).then(function(response){
                
                myFeed.content = response.data.responseData.feed.entries;

            });  

        });         

    }]);