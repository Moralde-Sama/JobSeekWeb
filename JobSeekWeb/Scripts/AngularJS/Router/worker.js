module.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "../PartialViews/WWorkerProfile",
            controller: "WorkerProfileCtrl"
        })
    $locationProvider.html5Mode(true);
})