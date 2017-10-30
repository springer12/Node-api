/**
 * Created by   on 3/27/2017.
 */
(function () {
    angular
        .module("app")
        .controller("selectionWarningsController", selectionWarningsController);

    selectionWarningsController.$inject = ['$scope', 'warningService', 'warningType', 'toastr'];

    function selectionWarningsController($scope, warningService, warningType, toastr) {
        var type = warningType.selection;
        $scope.warnings = warningService.warnings[type];

        $scope.maxPages = 10000;
        $scope.perPage = 200;
        $scope.currentPage = 1;
        if($scope.warnings[0])$scope.totalItems = $scope.warnings[0].full_count;

        $scope.onPageChange = function () {
            $scope.loading = true;
            warningService.getWarningsByType(type, ($scope.currentPage - 1) * $scope.perPage, $scope.perPage)
                .then(function () {
                    if($scope.warnings[0])$scope.totalItems = $scope.warnings[0].full_count;
                    $scope.loading = false;
                }, function (error) {
                    $scope.loading = false;
                    toastr.error(error.data, $translate.instant('toast.error'))
                });
        };
    }
})();