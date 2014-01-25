angular.module('SeriesApp', [])

    .factory('FeedService',['$http',function($http){
        return {
            parseFeed : function(url){
                return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=3&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
            }
        }
    }])

    .controller("FeedCtrl", ['$scope','FeedService', function ($scope,Feed) {    
        
        var myFeeds = [
           'http://ezrss.it/search/index.php?simple&show_name=White+Collar&mode=rss'
           //'http://www.quicoto.com/feed/'

        ];


        var seriesLength = myFeeds.length;

        for (var i = 0; i < seriesLength; i++) {                               
          
            Feed.parseFeed(myFeeds[i]).then(function(res){
                
                $scope.feeds=res.data.responseData.feed.entries;

            });  

        }           

    }]);