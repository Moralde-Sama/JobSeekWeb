var module = angular.module("Job", []);
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
module.controller("LogoutCtrl", ["$scope", "$http", function (s, h) {
    s.logout = () => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        h({
            method: 'POST',
            url: '/Account/LogOff',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }

        }).then((r) => {
            window.location = "../Account/Login";
        }, (er) => {
            console.log(er);
        })
    }
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
    s.validateLabel = (state) => {
        return { 'red': !state };
    }
    s.validateInput = (state) => {
        return { 'form-control': state, 'form-control invalid': !state };
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
                sendDataHttp("../Account/svProfDetails", {
                    worker: s.data,
                    skillIds: skillIds,
                    newskills: skillsNew
                }, (result) => {
                    console.log(result);
                    if (result == "Success") {
                        Swal.fire({
                            title: 'Saved Successfully!',
                            text: "You will be redirected to login page.",
                            type: 'success',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            window.location = "../Account/Login";
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
        q.all([
            service.getRegion(),
            service.getProvince(),
            service.getCity(),
            service.getBrgy(),
            service.getCategoriesandSkills()
        ]).then((result) => {
            s.regions = result[0].data;
            s.provincesHolder = result[1].data;
            s.citiesHolder = result[2].data;
            s.brgysHolder = result[3].data;
            s.categories = result[4].data.categories;
            s.skillsHolder = result[4].data.skills;
            var SRegionData = [];
            angular.forEach(result[0].data, (value) => {
                SRegionData.push({ id: value.regCode, text: value.regDesc });
            });
            $('#region').select2({ data: SRegionData });
        });
    }
    function init() {

        $(document).ready(function () {
            $('#gender').select2();
            $('#region').select2();
            $('#region').on('select2:selecting', (e) => {
                var data = e.params.args.data;
                $("#province").empty();
                var filteredProvince = s.provincesHolder.filter((f) => f.regCode == data.id);
                $('#province').append('<option value="0" disabled selected>Select a province</option>').trigger('change');
                angular.forEach(filteredProvince, (value) => {
                    $('#province').append(new Option(value.provDesc, value.provCode, false, false)).trigger('change');
                });
            });
            $('#province').select2();
            $('#province').on('select2:selecting', (e) => {
                var data = e.params.args.data;
                $("#city").empty();
                var filteredCity = s.citiesHolder.filter((f) => f.provCode == data.id);
                $('#city').append('<option value="0" disabled selected>Select a city/municipality</option>').trigger('change');
                angular.forEach(filteredCity, (value) => {
                    $('#city').append(new Option(value.citymunDesc, value.citymunCode, false, false)).trigger('change');
                });
            });
            $('#city').select2();
            $('#city').on('select2:selecting', (e) => {
                var data = e.params.args.data;
                $("#brgy").empty();
                var filteredBrgy = s.brgysHolder.filter((f) => f.citymunCode == data.id);
                $('#brgy').append('<option value="0" disabled selected>Select a brgy</option>').trigger('change');
                angular.forEach(filteredBrgy, (value) => {
                    $('#brgy').append(new Option(value.brgyDesc, value.brgyCode, false, false)).trigger('change');
                });
            });
            $('#brgy').select2();
            $("#skills").select2({
                tags: true,
                maximumSelectionLength: 5,
                placeholder: "Select or add your skills",
                minimumInputLength: 3,
                minimumResultsForSearch: 20
            })
        })
    }
}])