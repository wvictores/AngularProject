(function () {
    "use strict";

    angular.module ("storeProducts", []);
   
    angular.module("storeProducts").directive("storePanels", function () {
        return {
            templateUrl: "store-panels.html",
            restrict: "A",
            controller: function ($scope) {
                $scope.tab = 1;
                $scope.selectTab = function (newTab) {
                    $scope.tab = newTab;
                };
            }
        };
    });

    angular.module("storeProducts").directive("storeReviews", function () {
        return {
            templateUrl: "store-reviews.html",
            restrict: "A",
            controller: function ($scope) {
                $scope.newReview = {};
                $scope.addReview = function (product) {
                    $scope.reviewForm.body.$setDirty();
                    $scope.reviewForm.author.$setDirty();
                    $scope.reviewForm.stars.$setDirty();
                    if ($scope.reviewForm.$valid) {
                        if (!product.reviews) {
                            product.reviews = [];
                        }
                        product.reviews.push($scope.newReview);

                        //TODO: Come back to this later and send the new review to an API so it can be saved.
                        $scope.newReview = {};

                        //Reset the form state
                        $scope.reviewForm.body.$setPristine();
                        $scope.reviewForm.author.$setPristine();
                        $scope.reviewForm.stars.$setPristine();
                    }
                };
            }
        };
    });
}())