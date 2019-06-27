var module = angular.module("Job", ["ngRoute"]);

//Controllers
module.controller("NavigationCtrl", ["$scope", function (s) {
    var currentIndex = 0;
    s.changeView = (liIndex) => {
        var childrens = angular.element("#navItem")[0].children;
        angular.element(childrens[currentIndex]).removeClass();
        angular.element(childrens[liIndex]).addClass("active");
        currentIndex = liIndex;
    }
}])
module.controller("DashboardCtrl", ["$scope", "$http", function (s, h) {

}])
module.controller("ProfileCtrl", ["$scope", "$http", function (s, h) {

}])