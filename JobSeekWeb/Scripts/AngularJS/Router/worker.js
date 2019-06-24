module.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/Worker/Profile", {
            templateUrl: "../PartialViews/WWorkerProfile",
            controller: "WorkerProfileCtrl"
        })
    $locationProvider.html5Mode(true);
})