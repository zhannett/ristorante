'use strict';

angular.module('confusionApp')
    .constant("baseUrl", "http://localhost:3000/")
    .service('menuFactory', ['$http', 'baseUrl',
        function($http, baseUrl) {
           /*var promotions = [
                {
                    _id:0,
                    name:'Weekend Grand Buffet',
                    image: 'images/buffet.png',
                    label:'New',
                    price:'19.99',
                    description:'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person ',
                }
            ];*/
            this.getDishes = function() {
                console.log('controller ', $http.get(baseUrl + 'dishes'));
                return $http.get(baseUrl + 'dishes');
            };
            this.getDish = function(index) {
                return $http.get(baseUrl + 'dishes/' + index);
            };
            this.getPromotion = function (index) {
                console.log('promo ', $http.get(baseUrl + 'promotions/' + index));
                return $http.get(baseUrl + 'promotions/' + index);
            };
        }
    ])

    .factory('corporateFactory', ['$http', 'baseUrl', function($http, baseUrl) {
        var corpfac = {};
        corpfac.getLeaders = function () {
            return $http.get(baseUrl + 'leadership');
        };
        corpfac.getLeader = function(index) {
            return $http.get(baseUrl + 'leadership/' + index);
        };
        return corpfac;
    }])

;