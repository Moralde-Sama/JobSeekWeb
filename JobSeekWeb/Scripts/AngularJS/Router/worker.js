module.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/Worker/Dashboard", {
            templateUrl: "../PartialViews/WWorkerDashboard",
            controller: "DashboardCtrl"
        })
        .when("/Worker/Profile", {
            templateUrl: "../PartialViews/WWorkerProfile",
            controller: "ProfileCtrl"
        })
    $locationProvider.html5Mode(true);
})