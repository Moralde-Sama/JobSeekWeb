module.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/Company/Profile', {
            templateUrl: "../PartialViews/CProfile",
            controller: "ProfileCtrl"
        })
    $locationProvider.html5Mode(true);
});