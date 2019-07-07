var holders = {
    regionHolder: null,
    provinceHolder: null,
    cityHolder: null,
    brgyHolder: null,
    categoryAndSkillsHolder: null,
    userInfoHolder: null
}
var holderObjects = Object.keys(holders);
var selectedElem = null;

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
    this.getCategoriesandSkills = () => {
        return $http.get("../Home/GetCategoriesAndSkills");
    }
    this.updateSettings = (data) => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        angular.forEach(data, (value, keys) => {
            formdata.append(keys, value);
        })
        return $http({
            method: 'POST',
            url: '/Manage/UpdateSettings',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }
    this.updatePersonalInfo = (data) => {
        var formdata = new FormData();
        data.birthdate = moment(data.birthdate).format("MM-DD-YYYY");
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        angular.forEach(data, (value, keys) => {
            formdata.append(keys, value);
        })
        data.birthdate = new Date(moment(data.birthdate));
        return $http({
            method: 'POST',
            url: '/Account/UpdatePersonalInfo',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }
    this.updateAddress = (data) => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        angular.forEach(data, (value) => {
            formdata.append('address', value);
        })
        return $http({
            method: 'POST',
            url: '/Account/UpdateAddress',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }
    this.updateSkills = (data) => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        angular.forEach(data, (value, key) => {
            if (angular.isArray(value)) {
                angular.forEach(value, (value) => {
                    formdata.append(key, value);
                })
            } else {
                formdata.append(key, value);
            }
        })
        return $http({
            method: 'POST',
            url: '/Account/UpdateSkills',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }
    this.updateProfilePic = (data) => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        formdata.append("base64", data);
        return $http({
            method: 'POST',
            url: '/Account/UploadProfileImage',
            data: formdata,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }
    this.updateCoverPhoto = (data) => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        formdata.append("coverphoto", data);
        return $http({
            method: 'POST',
            url: '/Account/UpdateCoverPhoto',
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
module.service("projectService", function ($http) {
    this.addNewPersonalProj = (data) => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        angular.forEach(data, (value, key) => {
            if (key !== 'files') {
                if (angular.isArray(value)) {
                    angular.forEach(value, (arVal) => {
                        formdata.append(key, arVal);
                    })
                } else {
                    formdata.append(key, value);
                }
            } else {
                for (var i = 0; i < value.length; i++) {
                    formdata.append(key, value[i]);
                }
            }
        })
        
        console.log(formdata.values());
        return $http({
            method: 'POST',
            data: formdata,
            url: '/Worker/AddNewPersonalProj',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }
    this.updatePersonalProj = (data) => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        angular.forEach(data, (value, key) => {
            if (key !== 'files') {
                if (angular.isArray(value)) {
                    angular.forEach(value, (arVal) => {
                        formdata.append(key, arVal);
                    })
                } else {
                    formdata.append(key, value);
                }
            } else {
                for (var i = 0; i < value.length; i++) {
                    formdata.append(key, value[i]);
                }
            }
        })
        return $http({
            method: 'POST',
            data: formdata,
            url: '/Worker/UpdatePersonalProj',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }
    this.removeProject = (id) => {
        var formdata = new FormData();
        formdata.append("__RequestVerificationToken",
            $('input:hidden[name=__RequestVerificationToken]').val());
        formdata.append('perprojectId', id);
        return $http({
            method: 'POST',
            data: formdata,
            url: '/Worker/RemoveProject',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
    }
    this.getPersonalProjects = () => {
        return $http.get("../Worker/GetWorkerPersonalProj");
    }
})

module.factory("modalFactory", function () {
    return {
        screenshots: null,
        skills: null,
        isEdit: false,
        projectHolder: null,
        skillList: null
    }
})

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

//Controllers
module.controller("NavigationCtrl", ["$scope", "$location", "$http", "profileService", function (s, l, h, service) {

    s.fullname = () => {
        if (s.user != undefined) {
            return `${s.user.fname} ${s.user.mname.substring(0, 1)}. ${s.user.lname}`;
        } else {
            return "";
        }

    }

    service.getUserInfo(holders.userInfoHolder).then((result) => {
        holders.userInfoHolder = result.data;
        s.user = result.data.userInfo;
        $.notify({
            icon: "fa fa-heart",
            message: `Welcome ${s.fullname()}, have a nice day!`

        }, {
                type: "info",
                timer: 2000,
                placement: {
                    from: "top",
                    align: "right"
                }
            });
    })

    var routepaths = ["/Worker/Dashboard", "/Worker/Profile", "/Worker/Company", "/Worker/Projects",
        "/Worker/Messages"];
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
            title: 'Are you sure that you want to Logout?',
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
module.controller("ModalCtrl", ["$scope", "$q", "profileService", "projectService", "$rootScope", "modalFactory",
    function (s, q, service, pService, r, modalFactory) {

    var projSkills = $("#skillsproj");
    var privacy = $("#privacyP");
    var newSkills = [];
    var addSkills = [];
    var removeSkill = [];
    var filelist = [];
    var screenshots = null;
    var removeScreenShots = [];
    var viewSSCount = 0;
    r.d = null;

    s.saveUpdate = (data) => {
        data.privacy = privacy.select2("data")[0].id;
        data.created = moment(data.pcreated).format("MM-DD-YYYY");
        data.completed = moment(data.pcompleted).format("MM-DD-YYYY");
        data.files = filelist;
        data.isWorkerProj = true;
        angular.forEach(projSkills.select2("data"), (value) => {
            if (isNaN(value.id)) {
                newSkills.push(value.id);
            } else {
                if (modalFactory.isEdit) {
                    if (removeSkill.length > 0) {
                        if (removeSkill.filter((f) => f.skillId == value.id).length == 0) {
                            if (modalFactory.skills.filter((f) => f.skillId != value.id)) {
                                addSkills.push(parseInt(value.id));
                            }
                        }
                    } else {
                        if (modalFactory.skills.filter((f) => f.skillId == value.id).length == 0) {
                            addSkills.push(parseInt(value.id));
                        }
                    }
                } else {
                    addSkills.push(parseInt(value.id));
                }
                
            }
        })
        data.newSkills = newSkills;
        data.addSkills = addSkills;

        if (modalFactory.isEdit) {
            data.removeScreenShots = [];
            data.removeSkill = [];
            angular.forEach(removeScreenShots, (value) => {
                data.removeScreenShots.push(value.ssId);
            })
            angular.forEach(removeSkill, (value) => {
                data.removeSkill.push(value.pprojectSkillId);
            })
            console.log(data.removeScreenShots);
            swalConfirmation("Are you sure that you want to update this project?", '', 'warning', () => {
                return pService.updatePersonalProj(data);
            }, (result) => {
                if (result) {
                    if (result.data == "Success") {
                        swalSuccess("Update", '', () => {
                            $('#myModal1').modal('toggle');
                            r.clearModal();
                            pService.getPersonalProjects().then((result) => {
                                modalFactory.projectHolder = result.data;
                                r.updatepersonalProjs(result.data.personalProj);
                            });
                        });
                    }
                    else {
                        swalError(result.data);
                    }
                }
            });
        } else {
            
            swalConfirmation("Are you sure that want to save this project?", '', 'warning', () => {
                return pService.addNewPersonalProj(data);
            }, (result) => {
                    if (result) {
                        if (result.data == "Success") {
                            swalSuccess("Saved", '', () => {
                                r.clearModal();
                                $('#myModal1').modal('toggle');
                                pService.getPersonalProjects().then((result) => {
                                    modalFactory.projectHolder = result.data;
                                    r.updatepersonalProjs(result.data.personalProj);
                                });
                            });
                        } else {
                            swalError(result.data);
                        }
                    }
                });
        }
    }
    s.validateLabel = (state) => {
        return { 'red': !state };
    }
    s.validateInput = (state) => {
        return { 'form-control': state, 'form-control invalid': !state };
    }
    s.getImageFile = (file) => {
        var count = 0;
        if (file && file[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                angular.element('#sscontainer').append(`<div class="row">
                    <div class="col-md-12 center_content">
                        <a class="close_screenshot" onClick="angular.element(this).scope().removeSS(this, '${filelist[count].name}')"><i class="pe-7s-close"></i></a>
                        <img src="${e.target.result}" style="max-width: 100%; margin: 5px 0; border: 2px solid #dbccee; border-radius: 5px;" />` +
                    "</div></div>");
                count++;
                if (file[count]) {
                    reader.readAsDataURL(file[count]);
                }
            };

            angular.forEach(file, (value) => {
                filelist.push(value);
                if (file.length == 1) {
                    reader.readAsDataURL(value);
                }
            });

            if (file.length > 1) {
                reader.readAsDataURL(filelist[count]);
            }
        }
        }
    s.closeModal = () => {
        swalConfirmation('Are you sure?', 'closing this will clear all your data you input.', 'warning', () => { }, (result) => {
            if (result) {
                $('#myModal1').modal('toggle');
                r.clearModal();
                r.projBtns = true;
                r.$apply();
            }
        })
     }
    s.removeSS = (element, id) => {
        if (modalFactory.isEdit) {
            if (screenshots == null) {
                screenshots = modalFactory.screenshots;
            }
            var remove = screenshots[screenshots.indexOf(screenshots.filter((f) => f.ssId == id)[0])];
            removeScreenShots.push(remove);
            console.log(removeScreenShots);
        } else {
            var filFile = filelist.filter((f) => f.name === id);
            filelist.splice(filelist.indexOf(filFile));
            console.log(filelist);
        }
         $($($(element)[0].parentElement)[0].parentElement).remove();
    }
    s.submitLabel = () => {
        return modalFactory.isEdit ? 'Update' : "Save";
        }
    s.closeModalV = () => {
        if (selectedElem != null) {
            selectedElem.removeClass('tr_active');
            selectedElem = null;
        }
        r.projBtns = true;
        viewSSCount = 0;
        r.d.viewSS = [];
        setTimeout(() => {
            r.viewProj = false;
        }, 500);
    }
    s.nextSS = () => {
        var element = angular.element('.screenshots')[0].children;
        $($($(element[viewSSCount])[0])[0]).css('display', 'none');
        console.log((element.length - 1) == viewSSCount);
        viewSSCount = (element.length - 1) == viewSSCount ? -1 : viewSSCount;
        viewSSCount++;
        $($($(element[viewSSCount])[0])[0]).css('display', 'block');
    }
    s.prevSS = () => {
        console.log("clicked");
        var element = angular.element('.screenshots')[0].children;
        $($($(element[viewSSCount])[0])[0]).css('display', 'none');
        viewSSCount = 0 == viewSSCount ? (element.length) : viewSSCount;
        viewSSCount--;
        $($($(element[viewSSCount])[0])[0]).css('display', 'block');
        }
    s.getCreatedDate = () => {
        try {
            return moment(r.d.pcreated).format('MMMM DD, YYYY');
        } catch (e) {
            return '';
        }
    }
    s.getCompletedDate = () => {
        try {
            return moment(r.d.pcompleted).format('MMMM DD, YYYY');
        } catch (e) {
            return '';
        }
        }
    s.getSkillName = (id) => {
        try {
            return holders.categoryAndSkillsHolder.skills.filter((f) => f.id == id)[0].text;
        } catch (e) {
            return '';
        }
        }
    s.imgClass = (index) => {
        if (index != null) {
            var result = index == 0 ? true : false;
            return { 'img-single': result, 'img-multiple': !result }
        }
    }
    r.clearModal = () => {
        r.d = null;
        r.d = {
            projTitle: null,
            projDesc: null,
            pcreated: null,
            pcompleted: null
        };
        filelist = [];
        screenshots = null;
        removeScreenShots = [];
        modalFactory.isEdit = false;
        $("#projscreenshots").val('');
        $("#sscontainer").empty();
        projSkills.val(null).trigger('change');
        privacy.val('Public').trigger('change');
        var children = angular.element('#skillsContainerP')[0].children;
        if (!angular.element(children[0]).hasClass("red")) {
            angular.element(children[2].children[0].children[0]).addClass("invalid");
            angular.element(children[0]).addClass("red");
        }
        r.projBtns = true;
        if (selectedElem !== null) {
            selectedElem.removeClass('tr_active');
            selectedElem = null;
        }
    }

    $(document).ready(() => {

        privacy.select2();

        q.all([
            service.getCategoriesandSkills()
        ]).then((result) => {
            holders.categoryAndSkillsHolder = result[0].data;
            projSkills.select2({
                data: result[0].data.skills,
                minimumInputLength: 3,
                minimumResultsForSearch: 20,
                tags: true
            });

            var children = angular.element('#skillsContainerP')[0].children;
            if (!angular.element(children[0]).hasClass("red")) {
                angular.element(children[2].children[0].children[0]).addClass("invalid");
                angular.element(children[0]).addClass("red");
            }

            projSkills.on("select2:select", (e) => {
                var val = e.params.data;
                if (projSkills.select2("data").length > 0) {
                    if (angular.element(children[0]).hasClass("red")) {
                        angular.element(children[2].children[0].children[0]).removeClass("invalid");
                        angular.element(children[0]).removeClass("red");
                    }
                }
                if (modalFactory.isEdit) {
                    var remove = removeSkill.filter((f) => f.skillId == val.id)[0];
                    if (!angular.isUndefined(remove)) {
                        removeSkill.splice(remove);
                    }
                }
            })
            projSkills.on("select2:unselect", (e) => {
                var val = e.params.data;
                if (projSkills.select2("data").length == 0) {
                    if (!angular.element(children[0]).hasClass("red")) {
                        angular.element(children[2].children[0].children[0]).addClass("invalid");
                        angular.element(children[0]).addClass("red");
                    }
                }
                if (modalFactory.isEdit) {
                    var remove = modalFactory.skills.filter((f) => f.skillId == val.id)[0];
                    removeSkill.push(remove);
                }
            })
        })
    })

}])
module.controller("DashboardCtrl", ["$scope", "$http", function (s, h) {

}])
module.controller("ProfileCtrl", ["$scope", "$rootScope", "$q", "profileService", "projectService", "modalFactory", function (s, r, q, service, pService, modalFactory) {

    s.settings = true;
    s.personal = true;
    s.address = true;
    s.skills = true;
    s.navCardsVisibility = [true, false, false];
    s.addrssBtnDsbled = false;
    var skillsRemoved = [];
    var selectedMultipleVal = []; 
    var addressValue = {region: null, province: null, city: null, brgy: null};
    var address = ["region", "province", "city", "brgy"];
    var navSelected = {
        a: $('#profileNav > div > div > .card.content_center.active')[0],
        div: $('#profileNav > div > div >  div > div > .list-btn.active')[0]
    }

    s.fullname = () => {
        if (s.userInfo != undefined) {
            return `${s.userInfo.fname} ${s.userInfo.mname.substring(0, 1)}. ${s.userInfo.lname}`;
        } else {
            return "";
        }

    }
    s.navigateMainCards = (index, element) => {
        console.log(navSelected);
        s.navCardsVisibility[s.navCardsVisibility.indexOf(true)] = false;
        s.navCardsVisibility[index] = true;
        $(navSelected.a).removeClass('active');
        $(navSelected.div).removeClass('active');
        navSelected.a = $(element.currentTarget);
        navSelected.div = $($(element.currentTarget)[0].parentElement.parentElement);
        $(element.currentTarget).addClass('active');
        $($(element.currentTarget)[0].parentElement.parentElement).addClass('active');
    }

    //Profile
    s.getImageFileC = (file) => {
        if (file && file[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#coverPhoto')
                    .attr('src', e.target.result);
            };
            reader.readAsDataURL(file[0]);

            setTimeout(() => {
                swalUpdate("Do you want to update your cover photo?", '', 'warning', (result) => {
                    if (result) {
                        service.updateCoverPhoto(file[0]).then((result) => {
                            if (result.data == "Success") {
                                swalSuccess("Update");
                            } else {
                                swalError(result.data);
                            }
                        }, () => {
                            swalError();
                        })
                    } else {
                        $("#coverPhoto").attr("src", s.userInfo.cover_path);
                    }
                })
            }, 1500);
        }
    }
    s.getImageFile = (file) => {
        s.imagefile = file[0];
        
        var cropper
        var img;
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
                var base64string = cropper.getCroppedCanvas().toDataURL();
                service.updateProfilePic(base64string.substring(22, base64string.length))
                    .then((result) => {
                        if (result.data == "Success") {
                            swalSuccess("Updated", '', () => {
                                $("#sideProf").attr("src", cropper.getCroppedCanvas().toDataURL());
                                $("#prof").attr("src", cropper.getCroppedCanvas().toDataURL());
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
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.swal2-image')
                    .attr('src', e.target.result);
            };


            reader.readAsDataURL(file[0]);

            img = $(".swal2-image");
            img.on("load", () => {
                var image = document.querySelector('.swal2-image');
                cropper = new Cropper(image, {
                    aspectRatio: 1 / 1,
                    minContainerWidth: 300,
                    minContainerHeight: 250,
                    ready: function (event) {
                        // Zoom the image to its natural size
                        cropper.zoomTo(1);
                    }
                });
            })
        }
        //readURL2(file, "file", 350, 250);
    }
    s.profilePic = () => {
        document.getElementById("getFileProf").click();
    }
    s.coverPhotoClick = () => {
        document.getElementById("getFileCover").click();
    }
    s.update = (section) => {
        if (section === "settings") {
            var isPassEmpty = angular.isUndefined(s.userInfo.newpassword == undefined) ||
                !s.userInfo.newpassword;
            var Valid = isPassEmpty ? true : s.userInfo.newpassword == s.userInfo.repassword;
            if (Valid) {
                swalConfirmWithPassword('Are you sure that you want to update your account settings?',
                    'warning',
                    (password) => {
                        s.userInfo.oldpassword = password != "" ? password : "asdfjkjl";
                        return service.updateSettings(s.userInfo);
                    },
                    (result) => {
                        if (result.value) {
                            if (result.value.data === "Success") {
                                swalSuccess("Updated", "", () => {
                                    s.settings = true;
                                    delete s.userInfo.newpassword;
                                    delete s.userInfo.oldpassword;
                                    delete s.userInfo.repassword;
                                    s.$apply();
                                })
                            } else {
                                swalError(result.value.data);
                            }
                        }
                    });
            } else {
                swalError(`New password doesnt match with confirmation password.`);
            }
        } else if (section === "personal") {
            swalUpdate('Are you sure that you want to update your personal information?', '', 'warning',
                (result) => {
                    if (result) {
                        service.updatePersonalInfo(s.userInfo).then((result) => {
                            if (result.data == "Success") {
                                swalSuccess("Update", '', () => {
                                    s.personal = true;
                                    s.$apply();
                                    angular.element("#userfullname")[0].innerText = s.fullname();
                                });
                            } else {
                                swalError(result.data);
                            }
                        })
                    }
                });
        } else if (section === "address") {
            swalUpdate('Are you sure that you want to update your address?', '', 'warning',
                (result) => {
                    if (result) {
                        var addressArray = [];
                        angular.forEach(addressValue, (value, key) => {
                            if (value == null) {
                                addressArray.push(s.userInfo[key]);
                            } else {
                                addressArray.push(value);
                            }
                        })
                        service.updateAddress(addressArray).then((result) => {
                            if (result.data == "Success") {
                                swalSuccess("Update", '', () => {
                                    s.address = true;
                                    s.$apply();
                                })
                            } else {
                                swalError(result.data);
                            }
                        }, () => {
                            swalError();
                        })
                    }
                });
        } else if (section === "skills") {
            swalUpdate('Are you sure that you want to update your skills?', '', 'warning',
                (result) => {
                    if (result) {
                        var addSkills = [];
                        var removeSkill = [];
                        angular.forEach($("#skills").select2("data"), (value) => {
                            if (!selectedMultipleVal.includes(parseInt(value.id))) {
                                addSkills.push(parseInt(value.id));
                            }
                        })
                        angular.forEach(skillsRemoved, (value) => {
                            var filteredValue = holders.userInfoHolder.skills.filter((f) => f.skillId == value);
                            console.log(filteredValue);
                            if (filteredValue.length == 1) {
                                removeSkill.push(filteredValue[0].workerSkillId);
                            }
                        })
                        var data = {
                            workerId: s.userInfo.workerId,
                            addSkills: addSkills,
                            removeSkill: removeSkill
                        }
                        console.log(data);
                        service.updateSkills(data).then((result) => {
                            if (result.data == "Success") {
                                swalSuccess("Update", '', () => {
                                    s.skills = true;
                                    s.$apply();
                                    $("#category").val(0).trigger('change');
                                })
                            } else {
                                swalError(result.data);
                            }
                        }, () => {
                                swalError();
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
        service.getUserInfo(null).then((result) => {
            holders.userInfoHolder = result.data;
            s.userInfo = result.data.userInfo;
            s.userInfo.cellnum = parseInt(s.userInfo.cellnum);
            s.userInfo.birthdate = new Date(moment(s.userInfo.birthdate));
        })
        if (section === "settings") { s.disabled(section); }
        if (section === "personal") { s.disabled(section); }
        if (section === "address") { s.disabled(section); }
        if (section === "skills") {
            var select2 = $("#skills");
            s.disabled(section);
            var initialMultipleVal = [];
            angular.forEach(holders.userInfoHolder.skills, (value) => {
                selectedMultipleVal.push(value.skillId);
                initialMultipleVal.push(
                    holders.categoryAndSkillsHolder.skills.filter((f) => f.id == value.skillId)[0]);
            })
            select2.empty();
            angular.forEach(initialMultipleVal, (value) => {
                select2.append(new Option(value.text, value.id, false, false));
            })
            select2.val(selectedMultipleVal).trigger('change');
            $("#category").val(0).trigger('change');
        }
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
    s.validateLabel = (state) => {
        return { 'red': !state };
    }
    s.validateInput = (state) => {
        return { 'form-control': state, 'form-control invalid': !state };
    }

    //Projects
    s.showProjDetails = (project) => {
        project.projTitle = project.title;
        r.d = project;
        console.log(modalFactory.projectHolder.screenshots.filter((f) => f.projectId == project.perprojectId));
        r.d.viewSS = modalFactory.projectHolder.screenshots.filter((f) => f.projectId == project.perprojectId);
        var projSkillsIds = [];
        angular.forEach(modalFactory.projectHolder.projSkills.filter((f) => f.perprojectId == project.perprojectId), (value) => {
            projSkillsIds.push(value.skillId);
        });
        r.d.viewSkills = projSkillsIds;
        $("#myModal1").modal('toggle');
        r.viewProj = true;
        
    }
    s.getDate = (date) => {
        if (date != null) {
            return moment(date).format("MMMM DD, YYYY");
        }
    }

    //Profile Functions
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
    function swalConfirmWithPassword(title, type, passwordCallback, callback) {
        Swal.fire({
            title: title,
            text: "Input your password for verification",
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            type: type,
            showCancelButton: true,
            confirmButtonColor: '#8553C6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                return passwordCallback(password);
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            callback(result);
        })
    }
    function select2Object(addressCode, addressText, userCode, additionalCode ) {
        if (addressCode == userCode) {
            return {
                id: addressCode,
                text: addressText,
                selected: true,
                additional: additionalCode
            }
        } else {
            return {
                id: addressCode,
                text: addressText,
                additional: additionalCode
            }
        }
    }
    function convertValueToSelect2(addressType, data) {
        return q(function (resolve, reject) {
            var select2Data = [];
            if (addressType == "region") {
                for (var i = 0; i < data.length; i++) {
                    if (!angular.isUndefined(data[i].regCode)) {
                        select2Data.push(select2Object(data[i].regCode, data[i].regDesc, s.userInfo.region,
                            data[i].regCode));
                    } else {
                        select2Data = holders.regionHolder;
                        break;
                    }
                }
                holders.regionHolder = select2Data;
            }
            else if (addressType == "province") {
                for (var i = 0; i < data.length; i++) {
                    if (!angular.isUndefined(data[i].provCode)) {
                        select2Data.push(select2Object(data[i].provCode, data[i].provDesc, s.userInfo.province,
                            data[i].regCode));
                    } else {
                        select2Data = holders.provinceHolder;
                        break;
                    }
                }
                holders.provinceHolder = select2Data;
            }
            else if (addressType == "city") {
                for (var i = 0; i < data.length; i++) {
                    if (!angular.isUndefined(data[i].citymunCode)) {
                        select2Data.push(select2Object(data[i].citymunCode, data[i].citymunDesc,
                            s.userInfo.city, data[i].provCode));
                    } else {
                        select2Data = holders.cityHolder;
                        break;
                    }
                }
                holders.cityHolder = select2Data;
            }
            else if (addressType == "brgy") {
                angular.forEach(data, (value) => {
                    select2Data.push(select2Object(value.brgyCode, value.brgyDesc,
                        s.userInfo.brgy, value.citymunCode));
                })
            }
            resolve({ data: select2Data, selectId: addressType });
        })
    }
    function select2AddItem(data, selectId) {
        $(`#${selectId}`).append(new Option(`Select a ${selectId}`, 0, false, false)).trigger('change');
        angular.forEach(data, (value) => {
            $(`#${selectId}`).append(new Option(value.text, value.id, false, false)).trigger('change');
        })
    }
    function initSelect2(value, index, data) {
        var select = $(`#${value.selectId}`);
        select.select2({
            data: data
        })
        select.on('select2:select', function (e) {
            var result = e.params.data;
            addressValue[value.selectId] = parseInt(result.id);
            var filteredData;
            if (holderObjects[index + 1] == "brgyHolder") {
                convertValueToSelect2("brgy",
                    holders[holderObjects[index + 1]].filter((f) => f.citymunCode == result.id))
                    .then((result) => {
                        select2AddItem(result.data, address[index + 1]);
                    })
            }
            else {
                if (index < 3)
                    filteredData = holders[holderObjects[index + 1]].filter((f) => f.additional == result.id);
            }
            if (address[index] == "region") {
                s.addrssBtnDsbled = true;
                angular.forEach(address, (value, index) => {
                    if (value != "region") {
                        $(`#${value}`).empty().trigger('change');
                        if (index > 0) {
                            var children = angular.element(`#${value}Container`)[0].children;
                            if (!angular.element(children[2].children[0].children[0]).hasClass("invalid")) {
                                angular.element(children[2].children[0].children[0]).addClass("invalid");
                                angular.element(children[0]).addClass("red");
                            }
                        }
                    }
                })
            } else {
                if (index < 4) {
                    var children = angular.element(`#${address[index]}Container`)[0].children;
                    if (angular.element(children[2].children[0].children[0]).hasClass("invalid")) {
                        angular.element(children[2].children[0].children[0]).removeClass("invalid");
                        angular.element(children[0]).removeClass("red");
                    }
                }
            }
            if (angular.element(".select-valid.red").length == 0) {
                s.addrssBtnDsbled = false;
            }
            s.$apply();
            console.log(addressValue);
            if (holderObjects[index + 1] != "brgyHolder")
                select2AddItem(filteredData, address[index + 1]);
        });
    }
    function initSelect2Skills() {
        var select = $("#category");
        var select2 = $("#skills");
        var initialMultipleVal = [];
        angular.forEach(holders.userInfoHolder.skills, (value) => {
            selectedMultipleVal.push(value.skillId);
            initialMultipleVal.push(
                holders.categoryAndSkillsHolder.skills.filter((f) => f.id == value.skillId)[0]);
        })

        select.select2({
            data: holders.categoryAndSkillsHolder.categories
        })
        select2.select2({
            data: initialMultipleVal
        })
        select2.val(selectedMultipleVal).trigger('change');
        select.on('select2:select', function (e) {
            var selected = e.params.data;
            var filteredSkills = holders.categoryAndSkillsHolder.skills.filter((f) => f.categoryId == selected.id);
            angular.forEach(initialMultipleVal, (value) => {
                if (filteredSkills.filter((f) => f.id != value.id).length == 0) {
                    filteredSkills.push(value);
                }
            })
            select2.empty();
            angular.forEach(filteredSkills, (value) => {
                select2.append(new Option(value.text, value.id, false, false));
            })
            select2.val(selectedMultipleVal).trigger('change');
        })
        select2.on('select2:select', function (e) {
            var selected = e.params.data;
            if (skillsRemoved.includes(selected.id)) {
                skillsRemoved.splice(skillsRemoved.indexOf(parseInt(selected.id)));
                selectedMultipleVal.push(parseInt(selected.id));
            }
            if (select2.select2("data").length > 0) {
                var children = angular.element('#skillsContainer')[0].children;
                if (angular.element(children[2].children[0].children[0]).hasClass("invalid")) {
                    angular.element(children[2].children[0].children[0]).removeClass("invalid");
                    angular.element(children[0]).removeClass("red");
                }
            }
        })
        select2.on('select2:unselect', function (e) {
            var remove = e.params.data.id;
            console.log(selectedMultipleVal.includes(parseInt(remove)));
            if (selectedMultipleVal.includes(parseInt(remove))) {
                skillsRemoved.push(parseInt(remove));
                selectedMultipleVal.splice(selectedMultipleVal.indexOf(parseInt(remove)));
                initialMultipleVal.splice(initialMultipleVal.indexOf(parseInt(remove)));
                console.log(skillsRemoved);
            }
            if (select2.select2("data").length == 0) {
                var children = angular.element('#skillsContainer')[0].children;
                if (!angular.element(children[2].children[0].children[0]).hasClass("invalid")) {
                    angular.element(children[2].children[0].children[0]).addClass("invalid");
                    angular.element(children[0]).addClass("red");
                }
            }
        })
    }
    //Project Functions

    $(document).ready(function () {
        q.all([
            service.getRegion(holders.regionHolder),
            service.getProvince(holders.provinceHolder),
            service.getCity(holders.cityHolder),
            service.getBrgy(holders.brgyHolder),
            service.getCategoriesandSkills(),
            service.getUserInfo(holders.userInfoHolder)
        ]).then((result) => {
            angular.forEach(result, (value, key) => {
                holders[holderObjects[key]] = value.data;
            });
            s.userInfo = holders.userInfoHolder.userInfo;
            s.userInfo.cellnum = parseInt(s.userInfo.cellnum);
            s.userInfo.birthdate = new Date(moment(s.userInfo.birthdate));
            var filterbrgy = result[3].data.filter((f) => f.citymunCode == s.userInfo.city);
            q.all([
                convertValueToSelect2("region", result[0].data),
                convertValueToSelect2("province", result[1].data),
                convertValueToSelect2("city", result[2].data),
                convertValueToSelect2("brgy", filterbrgy)
            ]).then((results) => {
                angular.forEach(results, (value, index) => {
                    var data;
                    if ((index - 1) != -1) {
                        var selected = results[index - 1].data.filter((f) => f.selected == true);
                        data = value.data.filter((f) => f.additional == selected[0].id);
                    } else {
                        data = value.data;
                    }
                    initSelect2(value, index, data);
                })
                initSelect2Skills();
            })
        })
        if (modalFactory.projectHolder != null) {
            s.perProjList = modalFactory.projectHolder.personalProj;
        } else {
            pService.getPersonalProjects().then((result) => {
                modalFactory.projectHolder = result.data;
                s.perProjList = result.data.personalProj;
                console.log(modalFactory.projectHolder);
            })
        }
        $('#gender').select2();
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
module.controller("ProjectCtrl", ["$scope", "$http", "projectService", "$rootScope", "modalFactory", function (s, h, pservice, r, modalFactory) {
    s.lists = [0, 1, 2, 3, 4]
    s.myprojects = false;
    r.projBtns = true;
    r.viewProj = false;
    s.selectMyProjects = (isProject) => {
        s.myprojects = !isProject;
    }

    s.navClass = (elementName) => {
        if (elementName == 'my') {
            return { 'list-btn active': !s.myprojects, 'list-btn': s.myprojects }
        } else {
            return { 'list-btn active': s.myprojects, 'list-btn': !s.myprojects }
        }
    }
    s.navCard = (elementName) => {
        if (elementName == 'my') {
            return { 'card content_center active': !s.myprojects, 'card content_center': s.myprojects }
        } else {
            return { 'card content_center active': s.myprojects, 'card content_center': !s.myprojects }
        }
    }
    s.getDate = (date) => {
        return moment(date).format("MMMM DD, YYYY");
    }
    s.clickProject = (event, data) => {
        if (selectedElem == null) {
            selectedElem = angular.element(event.currentTarget);
            selectedElem.addClass('tr_active');
        } else {
            selectedElem.removeClass('tr_active');
            selectedElem = angular.element(event.currentTarget);
            selectedElem.addClass('tr_active');
        }
        r.projBtns = false
        r.viewProj = false;
        data.projTitle = data.title;
        data.pcreated = new Date(moment(data.created));
        data.pcompleted = new Date(moment(data.completed));
        r.d = data; 

        var projSkills = [];
        var filterskills = modalFactory.projectHolder.projSkills.filter((f) => f.perprojectId == data.perprojectId);
        angular.forEach(filterskills, (value) => {
            projSkills.push(value.skillId);
        });
        $("#privacyP").val(data.privacy).trigger('change');
        $("#skillsproj").val(projSkills).trigger('change');
        modalFactory.skills = filterskills;
        r.d.viewSkills = projSkills;
        var children = angular.element('#skillsContainerP')[0].children;
        if (angular.element(children[0]).hasClass("red")) {
            angular.element(children[2].children[0].children[0]).removeClass("invalid");
            angular.element(children[0]).removeClass("red");
        }
        var screenshots = modalFactory.projectHolder.screenshots.filter((f) => f.projectId == data.perprojectId);
        r.d.viewSS = screenshots;
        modalFactory.screenshots = screenshots;
        modalFactory.isEdit = true;
        $("#sscontainer").empty();
        angular.forEach(screenshots, (value) => {
            $("#sscontainer").append(`<div class="row"><div class="col-md-12 center_content">
                <a class="close_screenshot" onClick="angular.element(this).scope().removeSS(this, ${value.ssId})"><i class="pe-7s-close"></i></a>
                <img src="${value.path}" style="max-width: 100%; margin: 5px 0; border: 2px solid #dbccee; border-radius: 5px;" />` +
                "</div></div>");
        })
    }
    s.clickAdd = () => {
        r.clearModal();
        if (selectedElem !== null) {
            selectedElem.css('background-color', '#FFFFFF');
            selectedElem = null;
        }
        r.viewProj = false;
    }
    s.removeProject = () => {
        swalConfirmation('Are you sure that you want to delete this project?', 'This project will be permanently removed.', 'warning', () => {
            return pservice.removeProject(r.d.perprojectId);
        }, (result) => {
                if (result) {
                    if (result.data == 'Success') {
                        swalSuccess('Deleted', '', () => {
                            r.projBtns = true;
                            pservice.getPersonalProjects().then((result) => {
                                modalFactory.projectHolder = result.data;
                                s.personalProjs = result.data.personalProj;
                            });
                        });
                    } else {
                        swalError(result.data);
                    }
                }
            })
    }
    s.viewProject = () => {
        r.viewProj = true;
    }

    r.updatepersonalProjs = (data) => {
        s.personalProjs = data;
    }

    pservice.getPersonalProjects(holders.personalProjHolder).then((result) => {
        modalFactory.projectHolder = result.data;
        s.personalProjs = result.data.personalProj;
    })
}])
module.controller("MessageCtrl", ["$scope", "$http", function (s, h) {
    s.lists = [0, 1, 2, 3, 4]

    $("#messageCard").height(window.innerHeight - 310);
    $("#contacts").height(window.innerHeight - 199);
}])

function swalConfirmation(title, text, type, precallback, callback) {
    Swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#8553C6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return precallback();
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        callback(result.value)
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