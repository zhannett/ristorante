'use strict';

angular.module('confusionApp')
    .constant("baseUrl", "http://localhost:3000/")
    .service('menuFactory', ['$resource', 'baseUrl',
        function($resource, baseUrl) {
            this.getDishes = function() {
                return $resource(baseUrl + 'dishes/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            };
            this.getPromotions = function () {
                return $resource(baseUrl + 'promotions/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            };
        }
    ])

    .factory('corporateFactory', ['$resource', 'baseUrl',
        function($resource, baseUrl) {
            var corpfac = {};
            corpfac.getLeaders = function () {
                return $resource(baseUrl + 'leadership/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            };
            return corpfac;
        }
    ])

    .factory('feedbackFactory', ['$resource', 'baseUrl',
        function ($resource, baseUrl) {
            return $resource(baseUrl + 'feedback/:id', null, {
                'save': {
                    method: "POST"
                }
            });
        }
    ]);



