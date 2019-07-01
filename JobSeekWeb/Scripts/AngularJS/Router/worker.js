module.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/Worker/Dashboard", {
            templateUrl: "../PartialViews/WDashboard",
            controller: "DashboardCtrl"
        })
        .when("/Worker/Profile", {
            templateUrl: "../PartialViews/WProfile",
            controller: "ProfileCtrl"
        })
        .when("/Worker/Company", {
            templateUrl: "../PartialViews/WCompany",
            controller: "CompanyCtrl"
        })
    $locationProvider.html5Mode(true);
})