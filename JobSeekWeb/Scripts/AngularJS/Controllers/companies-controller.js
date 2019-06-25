
module.service('workerService', function ($http) {
    this.getRegion = () => {
        return $http.get("../Content/PH/json/region.json");
    }
    this.getProvince = () => {
        return $http.get("../Content/PH/json/province.json");
    }
    this.getCity = () => {
        return $http.get("../Content/PH/json/city.json");
    }
    this.getBrgy = () => {
        return $http.get("../Content/PH/json/refbrgy.json");
    }
    this.getCategoriesandSkills = () => {
        return $http.get("../Home/GetCategoriesAndSkills");
    }
})
module.controller("CompaniesCtrl", ["$scope", "$http", function (s, h) {
    s.list = [0, 1, 2, 3, 4];
}])
module.controller("DashboardCtrl", ["$scope", "$http", function (s, h) {
    //console.log("Wala");
    //var interval = setInterval(function () {
    //    clearInterval(interval);
    //    window.location = "../";
    //    console.log("Wala");
    //}, 2000);
}])
module.controller("WorkerProfileCtrl", ["$scope", "$http", "$q", "workerService", function (s, h, q, service) {

    s.data = {};
    s.addressHolder = [];
    init();
    initServices();

    //scope methods
    s.finishedSelect = (selectId, placeholder) => {
        $(document).ready(function () {
            if (placeholder == null) {
                $(`#${selectId}`).select2();
            } else {
                $(`#${selectId}`).select2({
                    placeholder: placeholder,
                    tags: true,
                    maximumSelectionLength: 5
                });
            }
        });
    }
    s.optionChanged = (data, addresstype) => {
        if (data != null) {
            if (addresstype === "Region") {
                destroySelect2('province');
                s.provinces = s.provincesHolder.filter((f) => f.regCode == data);
            } else if (addresstype === "Province") {
                destroySelect2('city');
                s.cities = s.citiesHolder.filter((f) => f.provCode == data);
            } else if (addresstype === "City") {
                destroySelect2('brgy');
                s.brgys = s.brgysHolder.filter((f) => f.citymunCode == data);
            }
        }
    }
    s.optchangedCategory = (data) => {
        if (data != null) {
            destroySelect2("skills");
            s.skills = s.skillsHolder.filter((f) => f.categoryId == data);
        }
    }

    s.saveDetails = (data) => {
        Swal.fire({
            title: 'Are you sure you want save this information?',
            text: "You can modify this information on your profile",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                data.birthdate = new Date(Date.parse(data.birthdate));
                var skillIds = [];
                var skillsNew = [];
                $('#skills').select2('data').forEach((value, index) => {
                    if (isNaN(value.id)) {
                        skillsNew.push(value.text);
                    } else {
                        //data.skills.push(value.text.replace(/\n/ig, '').replace(/ /g, ''));
                        skillIds.push(parseInt(value.id));
                    }
                });
                sendDataHttp("../Worker/svProfDetails", {
                    worker: s.data,
                    skillIds: skillIds,
                    newskills: skillsNew
                }, (result) => {
                    console.log(result);
                    if (result == "Success") {
                        Swal.fire({
                            title: 'Saved Successfully!',
                            text: "",
                            type: 'success',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            window.location = "../Worker/Dashboard";
                        })
                    } else {
                        Swal.fire(
                            'Error!',
                            'Please check your internet connection',
                            'error'
                        )
                        console.log(result);
                    }
                })
            }
        })
    }

    //Methods
    function destroySelect2(selectId) {
        var select = $(`#${selectId}`);
        select.removeAttr('disabled');
        select.select2('destroy');
    }
    function getChipsValue() {
        var skills = [];
        var chips = document.querySelectorAll('.chip');
        chips.forEach((item, index) => {
            skills.push(item.childNodes[0].nodeValue);
        });
        return skills;
    }

    //http
    function getDataHttp(URL, callback) {
        h.get(URL).then((r) => {
            if (r.status == 200) {
                callback(r.data);
            } else {
                console.log(`Error: ${r.status}`);
            }
        })
    }
    function sendDataHttp(URL, parameter, callback) {
        h.post(URL, parameter).then((r) => {
            if (r.status == 200) {
                callback(r.data);
            } else {
                console.log(`Error: ${r.status}`);
            }
        })
    }

    function initServices() {
        service.getRegion().then((r) => {
            s.regions = r.data;
            service.getProvince().then((r) => {
                s.provincesHolder = r.data;
                service.getCity().then((r) => {
                    s.citiesHolder = r.data;
                    service.getBrgy().then((r) => {
                        s.brgysHolder = r.data;
                    });
                })
            })
        });
        service.getCategoriesandSkills().then((r) => {
            s.categories = r.data.categories;
            s.skillsHolder = r.data.skills;
        });
    }
    function init() {

        $(document).ready(function () {
            $('#gender').select2();
            $('#province').select2();
            $('#city').select2();
            $('#brgy').select2();
            $("#skills").select2({
                tags: true,
                maximumSelectionLength: 5,
                placeholder: "Select or add your skills"
            })
        })
    }
}])