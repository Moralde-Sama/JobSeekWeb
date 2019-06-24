module.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/Worker/WorkerProfile", {
            templateUrl: "../PartialViews/WWorkerProfile",
            controller: "WorkerProfileCtrl"
        })
    $locationProvider.html5Mode(true);
})