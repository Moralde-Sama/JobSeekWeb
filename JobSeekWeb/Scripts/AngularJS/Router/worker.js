module.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/Worker/Profile", {
            templateUrl: "../PartialViews/WWorkerProfile",
            controller: "WorkerProfileCtrl"
        })
        .when("/Worker/DashboardNo", {
            templateUrl: "../PartialViews/WWorkerDashboard",
            controller: "DashboardCtrl"
        })
    $locationProvider.html5Mode(true);
})