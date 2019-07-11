var module = angular.module('Job', []);

module.service('CompanyService', function ($http) {
    this.getRegions = () => {
        return $http.get("../Content/PH/json/region.json");
    }
    this.getProvinces = () => {
        return $http.get("../Content/PH/json/province.json");
    }
    this.getCities = () => {
        return $http.get("../Content/PH/json/city.json");
    }
    this.getBrgys = () => {
        return $http.get("../Content/PH/json/refbrgy.json");
    }
    this.getCategories = () => {
        return $http.get('../Company/GetCategories');
    }
    this.updateDetails = (company_data) => {
        let formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        angular.forEach(company_data, (value, key) => {
            if (angular.isArray(value)) {
                angular.forEach(value, (array_value) => {
                    formdata.append(key, array_value);
                });
            } else {
                formdata.append(key, value);
            }
        });
        return $http({
            method: 'POST',
            url: '/Account/UpdateCompanyDetails',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }

        });
    }
});
module.service('LogoutService', function ($http) {
    this.logout = () => {
        let formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        return $http({
            method: 'POST',
            url: '/Account/LogOff',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }

        });
    }
});

module.controller('LogoutCtrl', ['$scope', 'LogoutService', function (scope, logout_service) {
    scope.logout = () => {
        swalConfirmation({
            title: 'Are you sure you want to logout?',
            text: '',
            type: 'warning',
            precallback: () => {
                logout_service.logout().then((result) => {
                    return result.statusText === 'OK' ? true : result.data;
                }, () => {
                    swalError();
                });
            },
            callback: (result) => {
                if (result) {
                    swalSuccess({
                        title: 'Updated',
                        text: 'You will be redirected to login page',
                        callback: () => {
                            window.location = "../Account/Login";
                        }
                    });
                } else {
                    swalError(result);
                }
            }
        });
    }
}]);

module.controller('CompanyCtrl', ['$scope', '$q', 'CompanyService', function (scope, q, company_service) {
    
    scope.company = {};
    scope.isValid = false;

    initServices();

    scope.validateLabel = (state) => {
        return { 'red': !state };
    }
    scope.validateInput = (state) => {
        return { 'form-control': state, 'form-control invalid': !state };
    }
    scope.saveDetails = () => {
        swalConfirmation({
            title: 'Are you sure you want to save this details?',
            text: 'It can be edited on your profile',
            type: 'warning',
            precallback: () => {
                return company_service.updateDetails(scope.company);
            },
            callback: (result) => {
                console.log(result);
                if (result.data) {
                    if (result.data == 'Success') {
                        swalSuccess({
                            title: 'Saved',
                            text: 'You will be redirected to login page',
                            callback: () => {
                                window.location = '../Home/PageByRole'
                            }
                        });
                    } else {
                        swalError(result.data);
                    }
                }
            }
        });
    }
    

    function Select2Manager(container_id) {
        this.container_id = container_id;
        this.container_children = $(container_id);
        this.select = $(this.container_children[0].children[1]);
        this.label = $(this.container_children[0].children[0]);
        this.items = null;
    }
    Select2Manager.prototype.initSelect2 = function (options) {
        this.select.select2(options);
        this.select2_border = $($($($(this.container_id)[0].children[2])[0].children[0])[0].children[0]);
        this.invalid();
    }
    Select2Manager.prototype.Selecting = function (callback) {
        this.select.on('select2:selecting', (selected) => {
            callback(selected);
        });
    }
    Select2Manager.prototype.invalid = function () {
        if (!this.label.hasClass('red')) {
            this.label.addClass('red');
            this.select2_border.addClass('invalid');
        }
    }
    Select2Manager.prototype.valid = function () {
        if (this.label.hasClass('red')) {
            this.label.removeClass('red');
            this.select2_border.removeClass('invalid');
        }
    }
    Select2Manager.prototype.getSelectedItems = function () {
        return this.select.select2('data');
    }
    Select2Manager.prototype.clearItems = function () {
        this.select.empty();
    }
    Select2Manager.prototype.addItem = function (id, text, isSelected) {
        this.select.append(new Option(text, id, isSelected, isSelected)).trigger('change');
    }
    Select2Manager.prototype.addCustomOptionItem = function (option_element) {
        this.select.append(option_element).trigger('change');
    }
    Select2Manager.prototype.addItems = function (array_selected_id) {
        this.items.forEach((item) => {
            const isSelected = array_selected_id === undefined ? false : array_selected_id.includes(item.id);
            this.addItem(item.id, item.text, isSelected);
        });
    }
    function ConvertDataToSelect2Data(data, address_index) {
        this.keys = ['reg', 'prov', 'citymun', 'brgy'];
        this.values = [];
        this.data = data;
        this.address_index = address_index;
    }
    ConvertDataToSelect2Data.prototype.filter = function(key, key_value) {
        this.data = this.data.filter((f) => f[key] == key_value);
        this.noFilter();
        return this.values;
    }
    ConvertDataToSelect2Data.prototype.noFilter = function() {
        angular.forEach(this.data, (value) => {
            this.values.push({
                id: value[`${this.keys[this.address_index]}Code`],
                text: value[`${this.keys[this.address_index]}Desc`],
                filter_key: this.address_index > 0 ? `${this.keys[this.address_index - 1]}Code` : ''
            });
        });
        return this.values;
    }
    
    function initServices() {
        q.all([
            company_service.getRegions(),
            company_service.getProvinces(),
            company_service.getCities(),
            company_service.getBrgys(),
            company_service.getCategories()
        ]).then((results) => {
            scope.holders = {};
            scope.holders.regions = results[0].data;
            scope.holders.provinces = results[1].data;
            scope.holders.cities = results[2].data;
            scope.holders.brgys = results[3].data;
            scope.holders.categories = results[4].data;
            scope.holders.isConverted = false;

            initializeSelect2();
        });
    }

    const category_manager = new Select2Manager('#CategoryContainer');
    const region_manager = new Select2Manager('#RegionContainer');
    const province_manager = new Select2Manager('#ProvinceContainer');
    const city_manager = new Select2Manager('#CityContainer');
    const brgy_manager = new Select2Manager('#BrgyContainer');
    function initializeSelect2() {
        category_manager.initSelect2({
            tags: true,
            data: scope.holders.categories,
            minimumInputLength: 2,
            minimumResultsForSearch: -1
        });
        category_manager.Selecting((selected_item) => {
            const selected_value = selected_item.params.args.data;
            if (isNaN(selected_value.id)) {
                scope.company.title = selected_value.id;
                delete scope.company.type;
            } else {
                scope.company.categoryId = parseInt(selected_value.id);
                delete scope.company.newCategory;
            }
            category_manager.valid();
        });
        region_manager.initSelect2({
            data: new ConvertDataToSelect2Data(scope.holders.regions, 0).noFilter()
        });
        region_manager.Selecting((selected_item) => {
            const selected_value = selected_item.params.args.data;
            scope.company.region = parseInt(selected_value.id);
            province_manager.items = new ConvertDataToSelect2Data(scope.holders.provinces, 1).filter('regCode', selected_value.id);
            province_manager.clearItems();
            province_manager.addCustomOptionItem('<option disabled selected>Select a province</option>')
            province_manager.addItems();
            region_manager.valid();
        });
        province_manager.initSelect2();
        province_manager.Selecting((selected_item) => {
            const selected_value = selected_item.params.args.data;
            scope.company.province = parseInt(selected_value.id);
            city_manager.items = new ConvertDataToSelect2Data(scope.holders.cities, 2).filter('provCode', selected_value.id);
            city_manager.clearItems();
            city_manager.addCustomOptionItem('<option disabled selected>Select a province</option>')
            city_manager.addItems();
            province_manager.valid();
        });
        city_manager.initSelect2();
        city_manager.Selecting((selected_item) => {
            const selected_value = selected_item.params.args.data;
            scope.company.city = parseInt(selected_value.id);
            brgy_manager.items = new ConvertDataToSelect2Data(scope.holders.brgys, 3).filter('citymunCode', selected_value.id);
            brgy_manager.clearItems();
            brgy_manager.addCustomOptionItem('<option disabled selected>Select a province</option>')
            brgy_manager.addItems();
            city_manager.valid();
        });
        brgy_manager.initSelect2();
        brgy_manager.Selecting((selected_item) => {
            const selected_value = selected_item.params.args.data;
            scope.company.brgy = parseInt(selected_value.id);
            brgy_manager.valid();
            scope.isValid = true;
            scope.$apply();
        });
    }
}]);


function swalConfirmation(option) {
    Swal.fire({
        title: option.title,
        text: option.text,
        type: option.type,
        showCancelButton: true,
        confirmButtonColor: '#8553C6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return option.precallback();
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        option.callback(result.value)
    }, () => {
        swalError();
    });
}
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
function swalSuccess(option) {
    Swal.fire({
        title: `${option.title} Successfully!`,
        text: option.text,
        type: 'success',
        confirmButtonColor: '#8553C6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then(() => {
        option.callback();
    })
}   