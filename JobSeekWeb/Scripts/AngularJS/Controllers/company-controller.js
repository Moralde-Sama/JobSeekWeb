let module = angular.module("Job", ["ngRoute", "ngAnimate"]);

module.service('NavigationService', function ($http, $q) {
    this.logout = () => {
        var formdata = new FormData();
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
    this.getCompanyInfo = (holder) => {
        if (holder === null) {
            return $http.get('../Company/GetCompanyInfo');
        } else {
            return returnValueIfNotNull(holder);
        }
    }

    function returnValueIfNotNull(holder) {
        return $q(function (resolve, reject) {
            if (holder != null) {
                resolve({ data: holder });
            } else {
                reject();
            }
        });
    }
});
module.service('ProfileService', function ($http, $q) {
    this.getRegions = (holder) => {
        if (holder == null) {
            return $http.get("../Content/PH/json/region.json");
        } else {
            return returnHolderIfNotNull(holder);
        }
    }
    this.getProvinces = (holder) => {
        if (holder == null) {
            return $http.get("../Content/PH/json/province.json");
        } else {
            return returnHolderIfNotNull(holder);
        }
    }
    this.getCities = (holder) => {
        if (holder == null) {
            return $http.get("../Content/PH/json/city.json");
        } else {
            return returnHolderIfNotNull(holder);
        }
    }
    this.getBrgys = (holder) => {
        if (holder == null) {
            return $http.get("../Content/PH/json/refbrgy.json");
        } else {
            return returnHolderIfNotNull(holder);
        }
    }
    this.getCategories = () => {
        return $http.get('../Company/GetCategories');
    }
    this.updateProfilePic = (base64_string) => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        formdata.append('base64_string', base64_string)
        return $http({
            method: 'POST',
            url: '/Account/UpdateCompanyProfile',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
    this.updateCoverPhoto = (file) => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        formdata.append('coverphoto', file)
        return $http({
            method: 'POST',
            url: '/Account/UpdateCompanyCoverPhoto',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
    this.updateSettings = (settings_value) => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        angular.forEach(settings_value, (value, key) => {
            formdata.append(key, value);
        });
        return $http({
            method: 'POST',
            url: '/Manage/UpdateSettings',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
    this.updateCompanyInfo = (company_details) => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        angular.forEach(company_details, (value, key) => {
            formdata.append(key, value);
        });
        return $http({
            method: 'POST',
            url: '/Account/UpdateCompanyInformation',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
    this.updateAddress = (address) => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        angular.forEach(address, (value, key) => {
            formdata.append(key, value);
        });
        return $http({
            method: 'POST',
            url: '/Account/UpdateCompanyAddress',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }

    function returnHolderIfNotNull(holder) {
        return $q(function (resolve) {
            resolve({ data: holder })
        });
    }
});

module.factory('HoldersFactory', function () {
    return {
        companyInfo: null,
        categories: null,
        regions: null,
        provinces: null,
        cities: null,
        brgys: null
    }
});
module.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                var height = element[0].height;
                var width = element[0].width;
                if (height > width) {
                    element.css('width', 'unset');
                }
            });
            element.bind('error', function () {
                alert('image could not be loaded');
            });
        }
    };
});

module.controller('NavigationCtrl', ['$scope', '$location', 'NavigationService', 'HoldersFactory',
    function (scope, location, navigation_service, holders_factory) {

        navigation_service.getCompanyInfo(holders_factory.companyInfo).then((result) => {
            console.log(result);
            holders_factory.companyInfo = result.data;
            scope.company = result.data;
            $.notify({
                icon: "fa fa-heart",
                message: `Welcome ${scope.company.name}, have a nice day!`

            }, {
                    type: "info",
                    timer: 2000,
                    placement: {
                        from: "top",
                        align: "right"
                    }
                });
        })

        var routepaths = ["/Company/Dashboard", "/Company/Profile", "/Company/Job", "/Company/Projects",
            "/Company/Messages"];
        var currentIndex = 0;
        scope.changeView = (liIndex) => {
            var children = angular.element("#navItem")[0].children;
            angular.element(children[currentIndex]).removeClass();
            angular.element(children[liIndex]).addClass("active");
            currentIndex = liIndex;
        }
        console.log(location.path());
        scope.changeView(routepaths.indexOf(location.path()));

        scope.logout = () => {
            swalConfirmation({
                title: 'Are you sure that you want to logout',
                text: '',
                type: 'warning',
                precallback: () => {
                    return navigation_service.logout();
                },
                callback: () => {
                    swalSuccess({
                        title: 'Logout',
                        text: '',
                        callback: () => {
                            window.location = "../Account/Login";
                        }
                    });
                }
            });
        }
    }]);
module.controller('ProfileCtrl', ['$scope', '$q', 'NavigationService', 'ProfileService', 'HoldersFactory',
    function (scope, q, navigation_service, profile_service, holders_factory) {

        //company details, jobs and projects
        scope.navCardsVisibility = [true, false, false];
        scope.settings = true;
        scope.personal = true;
        scope.address = true;
        let selectAddressValue = [];

        const type_manager = new Select2Manager("#TypeContainer");
        const region_manager = new Select2Manager("#RegionContainer");
        const province_manager = new Select2Manager("#ProvinceContainer");
        const city_manager = new Select2Manager("#CityContainer");
        const brgy_manager = new Select2Manager("#BrgyContainer");

        initServices();

        scope.profilePic = () => {
            document.getElementById("getFileProf").click();
        }
        scope.getImageFileC = (file) => {
            if (file && file[0]) {
                let reader = new FileReader();

                reader.onload = function (e) {
                    $('#coverPhoto')
                        .attr('src', e.target.result);
                };
                reader.readAsDataURL(file[0]);

                setTimeout(() => {
                    swalConfirmation({
                        title: 'Do you want to update your cover photo?',
                        text: '',
                        type: 'warning',
                        precallback: () => {
                            return profile_service.updateCoverPhoto(file[0]);
                        },
                        callback: (result) => {
                            if (result.data) {
                                if (result.data == "Success") {
                                    swalSuccess({ title: 'Updated' });
                                } else {
                                    swalError(result.data);
                                }
                            } else {
                                $("#coverPhoto").attr("src", scope.company.cover_path);
                            }
                        }
                    });
                }, 1000);
            }
        }
        scope.getImageFile = (file) => {
            scope.imagefile = file[0];

            let cropper
            let img;
            Swal.fire({
                title: 'Crop image.',
                text: 'Are you sure that you want to update your profile picture?',
                imageUrl: '',
                imageAlt: 'Profile Picture',
                showCancelButton: true,
                confirmButtonColor: '#8553C6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.value) {
                    const base64string = cropper.getCroppedCanvas().toDataURL();
                    profile_service.updateProfilePic(base64string.substring(22, base64string.length))
                        .then((result) => {
                            if (result.data == "Success") {
                                swalSuccess({
                                    title: 'Updated',
                                    text: '',
                                    callback: () => {
                                        $("#sideProf").attr("src", cropper.getCroppedCanvas().toDataURL());
                                        $("#prof").attr("src", cropper.getCroppedCanvas().toDataURL());
                                    }
                                });
                            } else {
                                swalError(result.data);
                            }
                        }, () => {
                            swalError();
                        })
                }
            })

            if (file && file[0]) {
                let reader = new FileReader();

                reader.onload = function (e) {
                    $('.swal2-image')
                        .attr('src', e.target.result);
                };


                reader.readAsDataURL(file[0]);

                img = $(".swal2-image");
                img.on("load", () => {
                    const image = document.querySelector('.swal2-image');
                    cropper = new Cropper(image, {
                        aspectRatio: 1 / 1,
                        minContainerWidth: 300,
                        minContainerHeight: 250,
                        ready: function (event) {
                            cropper.zoomTo(1);
                        }
                    });
                })
            }
        }
        scope.coverPhotoClick = () => {
            document.getElementById("getFileCover").click();
        }
        scope.validateLabel = (state) => {
            return { 'red': !state };
        }
        scope.validateInput = (state) => {
            return { 'form-control': state, 'form-control invalid': !state };
        }
        scope.disabled = (section) => {
            if (section === "settings") { scope.settings = !scope.settings }
            else if (section === "personal") { scope.personal = !scope.personal }
            else if (section === "address") { scope.address = !scope.address }
        }
        scope.cancel = (section) => {
            if (section === "settings") { scope.disabled(section); }
            if (section === "personal") { scope.disabled(section); }
            if (section === "address") { scope.disabled(section); }
               
        }
        scope.update = (section) => {
            if (section === 'settings') {
                if (scope.company.newpassword === scope.company.repassword) {
                    swalConfirmWithPassword({
                        title: 'Are you sure you want to update your account settings?',
                        passwordCallback: (password) => {
                            scope.company.oldpassword = password != "" ? password : "asdfjkjl";
                            return profile_service.updateSettings(scope.company);
                        },
                        callback: (result) => {
                            console.log(result);
                            if (result.value) {
                                if (result.value.data === 'Success') {
                                    swalSuccess({
                                        title: 'Updated',
                                        text: '',
                                        callback: () => {
                                            scope.disabled('settings');
                                            delete scope.company.oldpassword;
                                            delete scope.company.newpassword;
                                            delete scope.company.repassword;
                                            scope.$apply();
                                        }
                                    });
                                } else {
                                    swalError(result.value.data);
                                }
                            }
                        }
                    });
                } else {
                    swalError('New password and confirm password doesnt match.');
                }
            } else if (section === 'personal') {
                const type_value = type_manager.getSelectedItems()[0];
                if (isNaN(type_value.id)) {
                    scope.company.title = type_value.id;
                } else {
                    scope.company.categoryId = type_value.id;
                }
                swalConfirmation({
                    title: 'Are you sure you want to update company information?',
                    text: '',
                    type: 'warning',
                    precallback: () => {
                        return profile_service.updateCompanyInfo(scope.company);
                    },
                    callback: (result) => {
                        if (result) {
                            if (result.data === 'Success') {
                                swalSuccess({
                                    title: 'Updated',
                                    text: '',
                                    callback: () => {
                                        scope.disabled('personal');
                                        scope.$apply();
                                    }
                                });
                            } else {
                                swalError(result.data);
                            }
                        }
                    }
                });
            } else if (section === 'address') {
                swalConfirmation({
                    title: 'Are you sure you want to update your address?',
                    text: '',
                    type: 'warning',
                    precallback: () => {
                        angular.forEach(selectAddressValue, (address_value) => {
                            const address_key = Object.keys(address_value); 
                            scope.company[address_key[0]] = address_value[address_key[0]];
                        });
                        return profile_service.updateAddress(scope.company);
                    },
                    callback: (result) => {
                        if (result) {
                            if (result.data == 'Success') {
                                swalSuccess({
                                    title: 'Updated',
                                    text: '',
                                    callback: () => {
                                        scope.address = true;
                                        scope.$apply();
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }

        function initServices() {
            q.all([
                navigation_service.getCompanyInfo(holders_factory.companyInfo),
                profile_service.getCategories(),
                profile_service.getRegions(holders_factory.regions),
                profile_service.getProvinces(holders_factory.provinces),
                profile_service.getCities(holders_factory.cities),
                profile_service.getBrgys(holders_factory.brgys)

            ]).then((results) => {
                const holders_keys = Object.keys(holders_factory);
                angular.forEach(results, (result, index) => {
                    holders_factory[holders_keys[index]] = result.data;
                });
                scope.company = holders_factory.companyInfo;
                scope.company.cellnumber = parseInt(scope.company.cellnumber);

                initSelect2();
            });
        }

        function clearAndAddItems(manager_array, options) {
            angular.forEach(manager_array, (manager) => {
                manager.manager.clearItems();
                manager.manager.addCustomOptionItem(`<option disabled selected>${manager.option_text}</option`);
                manager.manager.invalid();
            });

            options.manager.items = new ConvertDataToSelect2Data(options.holder, options.address_index)
                .filter(options.key, options.selected_value);
            options.manager.addItems();
        }
        function initSelect2() {
            type_manager.initSelect2({
                tags: true,
                data: holders_factory.categories,
                minimumInputLength: 2,
                minimumResultsForSearch: -1
            });
            type_manager.setSelectedItems([scope.company.categoryId]);
            region_manager.initSelect2({
                data: new ConvertDataToSelect2Data(holders_factory.regions, 0).noFilter()
            });
            region_manager.setSelectedItems([('0' + scope.company.region).slice(-2)]);
            const if_region_single_digit = `${scope.company.region}`.length === 1 ? '0' : '';
            province_manager.initSelect2({
                data: new ConvertDataToSelect2Data(holders_factory.provinces, 1)
                    .filter('regCode', scope.company.region)
            });
            province_manager.setSelectedItems([`${if_region_single_digit}${scope.company.province}`]);
            city_manager.initSelect2({
                data: new ConvertDataToSelect2Data(holders_factory.cities, 2)
                    .filter('provCode', scope.company.province)
            });
            city_manager.setSelectedItems([`${if_region_single_digit}${scope.company.city}`]);
            brgy_manager.initSelect2({
                data: new ConvertDataToSelect2Data(holders_factory.brgys, 3)
                    .filter('citymunCode', scope.company.city)
            });
            brgy_manager.setSelectedItems([`${if_region_single_digit}${scope.company.brgy}`]);

            region_manager.Selecting((selected_item) => {
                let selected_value = selected_item.params.args.data;
                selectAddressValue[0] = { region: parseInt(selected_value.id) };
                const managers = [{
                        manager: province_manager,
                        option_text: 'Select a province'
                    },
                    {
                        manager: city_manager,
                        option_text: 'Select a province first'
                    },
                    {
                        manager: brgy_manager,
                        option_text: 'Select a city/municipality first'
                    }];
                clearAndAddItems(managers, {
                    manager: province_manager,
                    holder: holders_factory.provinces,
                    address_index: 1,
                    key: 'regCode',
                    selected_value: selected_value.id
                });
            });
            province_manager.Selecting((selected_item) => {
                let selected_value = selected_item.params.args.data;
                selectAddressValue[1] = { province: parseInt(selected_value.id) };
                province_manager.valid();
                const managers = [{
                    manager: city_manager,
                    option_text: 'Select a city'
                },
                {
                    manager: brgy_manager,
                    option_text: 'Select a city/municipality first'
                    }];
                clearAndAddItems(managers, {
                    manager: city_manager,
                    holder: holders_factory.cities,
                    address_index: 2,
                    key: 'provCode',
                    selected_value: selected_value.id
                });
            });
            city_manager.Selecting((selected_item) => {
                let selected_value = selected_item.params.args.data;
                selectAddressValue[2] = { city: parseInt(selected_value.id) };
                city_manager.valid();
                const managers = [{
                    manager: brgy_manager,
                    option_text: 'Select a city/municipality first'
                }];
                clearAndAddItems(managers, {
                    manager: brgy_manager,
                    holder: holders_factory.brgys,
                    address_index: 3,
                    key: 'citymunCode',
                    selected_value: selected_value.id
                });
            });
            brgy_manager.Selecting((selected_item) => {
                let selected_value = selected_item.params.args.data;
                selectAddressValue[3] = { brgy: parseInt(selected_value.id) };
                brgy_manager.valid();
            });
        }
}]);
function swalConfirmWithPassword(options) {
    Swal.fire({
        title: options.title,
        text: 'Input your password for verification',
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8553C6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        showLoaderOnConfirm: true,
        preConfirm: (password) => {
            return options.passwordCallback(password);
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        options.callback(result);
    }, () => {
        swalError();
    });
}
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
Select2Manager.prototype.setSelectedItems = function (array_selected_id) {
    this.select.select2('val', array_selected_id);
}
function ConvertDataToSelect2Data(data, address_index) {
    this.keys = ['reg', 'prov', 'citymun', 'brgy'];
    this.values = [];
    this.data = data;
    this.address_index = address_index;
}
ConvertDataToSelect2Data.prototype.filter = function (key, key_value) {
    this.data = this.data.filter((f) => f[key] == key_value);
    this.noFilter();
    return this.values;
}
ConvertDataToSelect2Data.prototype.noFilter = function () {
    $.each(this.data, (index, value) => {
        this.values.push({
            id: value[`${this.keys[this.address_index]}Code`],
            text: value[`${this.keys[this.address_index]}Desc`],
            filter_key: this.address_index > 0 ? `${this.keys[this.address_index - 1]}Code` : ''
        });
    });
    return this.values;
}