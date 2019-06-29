var holders = {
    regionHolder: null,
    provinceHolder: null,
    cityHolder: null,
    brgyHolder: null,
    categoryAndSkillsHolder: null,
    userInfoHolder: null
}
var holderObjects = Object.keys(holders);

var module = angular.module("Job", ["ngRoute", "ngAnimate"]);

module.service("profileService", function ($http, $q) {
    this.getUserInfo = (holder) => {
        if (holder == null) {
            return $http.get("../Worker/GetUserInfo");
        } else {
            return returnValueIfNotNull(holders.userInfoHolder);
        }
    }
    this.getRegion = (holder) => {
        if (holder == null) {
            return $http.get("../Content/PH/json/region.json");
        } else {
            return returnValueIfNotNull(holders.regionHolder);
        }
    }
    this.getProvince = (holder) => {
        if (holder == null) {
            return $http.get("../Content/PH/json/province.json");
        } else {
            return returnValueIfNotNull(holders.provinceHolder);
        }
    }
    this.getCity = (holder) => {
        if (holder == null) {
            return $http.get("../Content/PH/json/city.json");
        } else {
            return returnValueIfNotNull(holders.cityHolder);
        }
    }
    this.getBrgy = (holder) => {
        if (holder == null) {
            return $http.get("../Content/PH/json/refbrgy.json");
        } else {
            return returnValueIfNotNull(holders.brgyHolder);
        }
    }
    this.getCategoriesandSkills = (holder) => {
        if (holder == null) {
            return $http.get("../Home/GetCategoriesAndSkills");
        } else {
            return returnValueIfNotNull(holders.categoryAndSkillsHolder);
        }
    }
    this.updateSettings = (data) => {
        var formdata = new FormData();
        var dataKeys = Object.keys(data);
        console.log(dataKeys);
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        angular.forEach(data, (value, keys) => {
            formdata.append(keys, value);
        })
        console.log(formdata);
        return $http({
            method: 'POST',
            url: '/Manage/UpdateSettings',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }
    function returnValueIfNotNull(holder) {
        return $q(function (resolve, reject) {
            if (holder != null) {
                var data = { data: holder };
                resolve(data);
            } else {
                reject(null);
            }
        });
    }
})

//Controllers
module.controller("NavigationCtrl", ["$scope", "$location", "$http", function (s, l, h) {
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
        var children = angular.element("#navItem")[0].children;
        angular.element(children[currentIndex]).removeClass();
        angular.element(children[liIndex]).addClass("active");
        currentIndex = liIndex;
    }
    s.changeView(routepaths.indexOf(l.path()));

    s.logout = () => {
        Swal.fire({
            title: 'Are you sure you want to Logout?',
            text: '',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8553C6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                var formdata = new FormData();
                formdata.append("__RequestVerificationToken",
                    $('input:hidden[name=__RequestVerificationToken]').val());
                h({
                    method: 'POST',
                    url: '/Account/LogOff',
                    data: formdata,
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                }).then((result) => {
                    Swal.fire({
                        title: 'Logout Successfully!',
                        text: 'Redirecting to Login page.',
                        type: 'success',
                        confirmButtonColor: '#8553C6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        window.location = "../Account/Login";
                    })
                }, (error) => {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: error
                    })
                })
            }
        })
    }
}])
module.controller("DashboardCtrl", ["$scope", "$http", function (s, h) {

}])
module.controller("ProfileCtrl", ["$scope", "$http", "$q", "profileService", function (s, h, q, service) {

    s.settings = true;
    s.personal = true;
    s.address = true;
    s.skills = true;
    q.all([
        service.getRegion(holders.regionHolder),
        service.getProvince(holders.provinceHolder),
        service.getCity(holders.cityHolder),
        service.getBrgy(holders.brgyHolder),
        service.getCategoriesandSkills(holders.categoryAndSkillsHolder),
        service.getUserInfo(holders.userInfoHolder)
    ]).then((result) => {
        angular.forEach(result, (value, key) => {
            holders[holderObjects[key]] = value.data;
        });
        s.userInfo = holders.userInfoHolder.userInfo;
        s.userInfo.cellnum = parseInt(s.userInfo.cellnum);
        s.regions = holders.regionHolder;
        s.provinces = holders.provinceHolder.filter((f) => f.regCode == s.userInfo.region);
        s.cities = holders.cityHolder.filter((f) => f.provCode == s.userInfo.province);
        s.brgys = holders.brgyHolder.filter((f) => f.citymunCode == s.userInfo.city);
    })

    var forms = {
        settings: {
            textbox: ["username", "password", "repassword", "header"]
        }
    }

    s.fullname = () => {
        if (s.userInfo != undefined) {
            return `${s.userInfo.fname} ${s.userInfo.mname.substring(0, 1)}. ${s.userInfo.lname}`;
        } else {
            return "";
        }

    }

    s.update = (section, data) => {
        if (section === "settings") {
            console.log(data);
            swalUpdate('Are you sure you want to update the settings?', '', 'warning', (result) => {
                if (result) {
                    data.oldpassword = "moralde";
                    service.updateSettings(data).then((result) => {
                        swalSuccess("Updated", "", () => {
                            s.settings = true;
                            s.$apply();
                        })
                    }, (error) => {
                            Swal.fire({
                                type: 'error',
                                title: 'Oops...',
                                text: error.message
                            })
                    })
                }
            });
        }
    }

    s.disabled = (section) => {
        if (section === "settings") { s.settings = s.settings ? false : true }
        else if (section === "personal") { s.personal = s.personal ? false : true }
        else if (section === "address") { s.address = s.address ? false : true }
        else if (section === "skills") { s.skills = s.skills ? false : true }
    }
    s.cancel = (section) => {
        if (section === "settings") { s.disabled(section); }
        if (section === "personal") { s.disabled(section); }
        if (section === "address") { s.disabled(section); }
        if (section === "skills") { s.disabled(section); }
    }
    s.regionSelected = (regCode) => {
        return regCode == s.userInfo.region ? true : false;
    }
    s.provinceSelected = (provCode) => {
        return provCode == s.userInfo.province ? true : false;
    }
    s.citySelected = (cityCode) => {
        return cityCode == s.userInfo.city ? true : false;
    }
    s.brgySelected = (brgycode) => {
        return brgycode == s.userInfo.brgy ? true : false;
    }

    function swalUpdate(title, text, type, callback) {
        Swal.fire({
            title: title,
            text: text,
            type: type,
            showCancelButton: true,
            confirmButtonColor: '#8553C6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            callback(result.value)
        })
    }
    function swalSuccess(title, text, callback) {
        Swal.fire({
            title: `${title} Successfully!`,
            text: text,
            type: 'success',
            confirmButtonColor: '#8553C6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            callback()
        })
    }

    $(document).ready(function () {
        $('#gender, #region, #province, #city, #brgy, #skills').select2();
    });
}])
module.controller("CompanyCtrl", ["$scope", "$http", function (s, h) {
    s.lists = [0, 1, 2, 3, 4]

    $(document).ready(function () {
        $("#category").select2();
        $("#skills").select2({
            placeholder: "Select skills"
        });
    })
}])
