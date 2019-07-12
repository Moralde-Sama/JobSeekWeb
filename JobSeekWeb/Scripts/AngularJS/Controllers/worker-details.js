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
    this.updateProfileDetails = (data) => {
        var formdata = new FormData();
        formdata.append('__RequestVerificationToken',
            $('input:hidden[name=__RequestVerificationToken]').val());
        angular.forEach(data, (value, key) => {
            if (angular.isArray(value)) {
                angular.forEach(value, (arrayVal) => {
                    formdata.append(key, arrayVal);
                });
            } else {
                formdata.append(key, value);
            }
        });
        return $http({
            method: 'POST',
            url: '../Account/svProfDetails',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }

        });
    }
})
module.controller("LogoutCtrl", ["$scope", "$http", function (s, h) {
    s.logout = () => {
        Swal.fire({
            title: 'Are you sure you to log out?',
            text: "",
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

                }).then((r) => {
                    swalSuccess("Logged Out", '', () => {
                        window.location = "../Account/Login";
                    })
                }, (er) => {
                        swalError();
                })
            }
        });
    }
}])
module.controller("WorkerProfileCtrl", ["$scope", "$http", "$q", "workerService", function (s, h, q, service) {

    s.data = {};
    s.addressHolder = [];
    s.isValid = false;
    //Region, Province, City, Brgy, Skills, Gender
    s.validateSelect2 = [false, false, false, false, false, false];

    init();

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
        return { 'form-control captalize': state, 'form-control captalize invalid': !state };
    }
    s.saveDetails = () => {
        Swal.fire({
            title: 'Are you sure you want save this information?',
            text: "You can modify this information on your profile",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8553C6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                s.data.birthdate = moment(s.data.birthdate).format("MM-DD-YYYY");
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
                s.data.addSkills = skillIds;
                s.data.newSkills = skillsNew;
                service.updateProfileDetails(s.data).then((result) => {
                    if (result.data == "Success") {
                        swalSuccess('Updated', 'You will be redirected to login page.', () => {
                            window.location = "../Account/Login";
                        })
                    } else {
                        swalError(result.data);
                    }
                }, () => {
                        swalError();
                    });
            }
        });
    }

    //Methods
    function destroySelect2(selectId) {
        var select = $(`#${selectId}`);
        select.removeAttr('disabled');
        select.select2('destroy');
    }
    function checkIsValid() {
        console.log(!s.validateSelect2.includes(false));
        if (!s.validateSelect2.includes(false)) {
            console.log(s.isValid);
            s.isValid = true;
            s.$apply();
        } else {
            s.isValid = false;
        }
    }

    //http
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
            console.log(result[4].data);
            var SRegionData = [];
            angular.forEach(result[0].data, (value) => {
                SRegionData.push({ id: value.regCode, text: value.regDesc });
            });
            $('#region').select2({ data: SRegionData });
            $("#skills").select2({
                tags: true,
                data: s.skillsHolder,
                maximumSelectionLength: 5,
                placeholder: "Select or add your skills",
                minimumInputLength: 2,
                minimumResultsForSearch: 20
            });
            console.log($("#regionContainer, #provinceContainer"));
            $("#regionContainer, #provinceContainer, #cityContainer, #brgyContainer," +
                "#genderContainer, #skillsContainer").each(function(index) {
                    addClassSelect2(this);
                    if (index == 5) {
                        $(this).on('select2:selecting', (e) => {
                            removeClassSelect2(this);
                            s.validateSelect2[4] = true;
                            checkIsValid();
                        });
                        $(this).on('select2:unselect', () => {
                            console.log($('#skills').select2('data'));
                            if ($('#skills').select2('data').length == 0) {
                                addClassSelect2(this);
                                s.validateSelect2[4] = false;
                                checkIsValid();
                            }
                        });
                    }
            });
        });
    }
    function init() {
        $(document).ready(function () {
            $('#gender').select2();
            $("#gender").on('select2:selecting', (e) => {
                s.data.gender = e.params.args.data.id;
                s.validateSelect2[5] = true;
                checkIsValid();
                removeClassSelect2('#genderContainer');
            })
            $('#region').select2();
            $('#region').on('select2:selecting', (e) => {
                var data = e.params.args.data;
                s.data.region = data.id;
                s.validateSelect2[0] = true;
                checkIsValid();
                $("#province").empty();
                var filteredProvince = s.provincesHolder.filter((f) => f.regCode == data.id);
                $('#province').append('<option value="0" disabled selected>Select a province</option>').trigger('change');
                angular.forEach(filteredProvince, (value) => {
                    $('#province').append(new Option(value.provDesc, value.provCode, false, false)).trigger('change');
                });
                removeClassSelect2('#regionContainer');
            });
            $('#province').select2();
            $('#province').on('select2:selecting', (e) => {
                var data = e.params.args.data;
                s.data.province = data.id;
                s.validateSelect2[1] = true;
                checkIsValid();
                $("#city").empty();
                var filteredCity = s.citiesHolder.filter((f) => f.provCode == data.id);
                $('#city').append('<option value="0" disabled selected>Select a city/municipality</option>').trigger('change');
                angular.forEach(filteredCity, (value) => {
                    $('#city').append(new Option(value.citymunDesc, value.citymunCode, false, false)).trigger('change');
                });
                removeClassSelect2('#provinceContainer');
            });
            $('#city').select2();
            $('#city').on('select2:selecting', (e) => {
                var data = e.params.args.data;
                s.data.city = data.id;
                s.validateSelect2[2] = true;
                checkIsValid();
                $("#brgy").empty();
                var filteredBrgy = s.brgysHolder.filter((f) => f.citymunCode == data.id);
                $('#brgy').append('<option value="0" disabled selected>Select a brgy</option>').trigger('change');
                angular.forEach(filteredBrgy, (value) => {
                    $('#brgy').append(new Option(value.brgyDesc, value.brgyCode, false, false)).trigger('change');
                });
                removeClassSelect2('#cityContainer');
            });
            $('#brgy').select2();
            $("#brgy").on('select2:selecting', (e) => {
                var data = e.params.args.data;
                s.data.brgy = data.id;
                s.validateSelect2[3] = true;
                checkIsValid();
                removeClassSelect2('#brgyContainer');
            });

            initServices();
        })
    }
}]);

function swalError(text) {
    if (text == undefined) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: "Try to resubmit or try to check your internet connection."
        })
    } else {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: text
        })
    }
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
function addClassSelect2(element) {
    var children = angular.element(element)[0].children;
    angular.element(children[2].children[0].children[0]).addClass("invalid");
    angular.element(children[0]).addClass("red");
}
function removeClassSelect2(element) {
    var children = angular.element(element)[0].children;
    if (angular.element(children[0]).hasClass("red")) {
        angular.element(children[2].children[0].children[0]).removeClass("invalid");
        angular.element(children[0]).removeClass("red");
    }
}