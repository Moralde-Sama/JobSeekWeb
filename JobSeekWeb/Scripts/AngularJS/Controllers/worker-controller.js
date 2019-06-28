var module = angular.module("Job", ["ngRoute"]);

//Controllers
module.controller("NavigationCtrl", ["$scope", "$location", function (s, l) {
    var fullname = angular.element(".logo")[0].innerText;
    $.notify({
        icon: "fa fa-heart",
        message: `Welcome ${fullname}, have a nice day!`

    }, {
            type: "info",
            timer: 2000,
            placement: {
                from: "top",
                align: "right"
            }
    });

    var routepaths = ["/Worker/Dashboard", "/Worker/Profile", "/Worker/Company"];
    var currentIndex = 0;
    s.changeView = (liIndex) => {
        var childrens = angular.element("#navItem")[0].children;
        angular.element(childrens[currentIndex]).removeClass();
        angular.element(childrens[liIndex]).addClass("active");
        currentIndex = liIndex;
    }
    s.changeView(routepaths.indexOf(l.path()));
}])
module.controller("DashboardCtrl", ["$scope", "$http", function (s, h) {

}])
module.controller("ProfileCtrl", ["$scope", "$http", function (s, h) {
    $(document).ready(function () {
        $('#gender, #region, #province, #city, #brgy').select2();
    });
}])
module.controller("CompanyCtrl", ["$scope", "$http", function (s, h) {
    s.lists = [0, 1, 2, 3, 4]

    $("#category").select2();
    $("#skills").select2({
        placeholder: "Select skills"
    });
}])
