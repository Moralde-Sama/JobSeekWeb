var module = angular.module("Job", ["ngRoute", "ngAnimate"]);

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
});

module.factory('HoldersFactory', function () {
    return {
        companyInfo: null
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
            }
        }

        function initServices() {
            q.all([
                navigation_service.getCompanyInfo(holders_factory.companyInfo)
            ]).then((results) => {
                console.log(results);
                holders_factory.companyInfo = results[0].data;
                scope.company = results[0].data;
                console.log(scope.company);
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