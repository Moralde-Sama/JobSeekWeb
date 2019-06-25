module.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/Worker/Profile", {
            templateUrl: "../PartialViews/WWorkerProfile",
            controller: "WorkerProfileCtrl"
        })
        .when("/Worker/Dashboard", {
            templateUrl: "../PartialViews/WWorkerDashboard",
            controller: "DashboardCtrl"
        })
    $locationProvider.html5Mode(true);
})