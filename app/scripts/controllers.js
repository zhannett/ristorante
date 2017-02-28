'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory',
        function($scope, menuFactory) {
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = true;
            $scope.message = "Loading ...";
            $scope.dishes = {};

            menuFactory.getDishes()
                .then(
                    function(response) {
                        $scope.dishes = response.data;
                    },
                    function(response) {
                        $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };
            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
    }])

    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
        $scope.channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', function($scope) {
        $scope.sendFeedback = function() {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.mychannel="";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading...";

        menuFactory.getDish(parseInt($stateParams.id, 10))
            .then(
                function(response) {
                    $scope.dish = response.data;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );

    }])

    .controller('DishCommentController', ['$scope', function($scope) {
        $scope.mycomment = {rating:5, comment:"", author:"", date:""};
        $scope.submitComment = function () {
            $scope.mycomment.date = new Date().toISOString();
            console.log($scope.mycomment);
            $scope.dish.comments.push($scope.mycomment);
            $scope.commentForm.$setPristine();
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
        };
    }])

    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {




        $scope.dish = {};
        $scope.showDish = true;
        $scope.message = "Loading...";

        menuFactory.getPromotion(0)
            .then(
                function(response) {
                    $scope.promotion = response.data;
                    $scope.promonName = $scope.promotion.name;
                    $scope.promoImage = $scope.promotion.image;
                    $scope.promoLabel = $scope.promotion.label;
                    $scope.promoPrice = $scope.promotion.price;
                    $scope.promoDescription = $scope.promotion.description;
                },
                function(response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );

        menuFactory.getDish(0)
            .then(
                function(response) {
                    $scope.dish = response.data;
                    $scope.showDish = true;
                    $scope.featuredName = $scope.dish.name;
                    $scope.featuredImage = $scope.dish.image;
                    $scope.featuredLabel = $scope.dish.label;
                    $scope.featuredPrice = $scope.dish.price;
                    $scope.featuredDescription = $scope.dish.description;
                },
                function(response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        corporateFactory.getLeader(3)
            .then(
                function(response) {
                    $scope.leader = response.data;
                },
                function(response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
        $scope.leadership = corporateFactory.getLeaders()
            .then(
                function(response) {
                    $scope.leaders = response.data;
                    //$scope.chiefImage = $scope.chief.image;
                    //$scope.chiefName = $scope.chief.name;
                    //$scope.chiefDesignation = $scope.chief.designation;
                    //$scope.chiefDescription = $scope.chief.description;
                },
                function(response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
    }]);
