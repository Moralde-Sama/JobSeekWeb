module.controller("CompaniesCtrl", ["$scope", "$http", function(s, h) {
    s.list = [0, 1, 2, 3, 4];
}])
module.controller("WorkerProfileCtrl", ["$scope", "$http", function (s, h) {
    s.list = [0, 1, 2, 3, 4];

    s.data = {};

    s.saveDetails = (data) => {
        console.log(data);
        data.country = "Philippines";
        data.header = "TEST";
        data.birthdate = new Date(Date.parse(data.birthdate));
        //svProfDetails
        setDataHttp("../Worker/svProfDetails", {
            worker: s.data,
            skills: getChipsValue()
        }, (result) => {
                console.log(result);
        })
    }

    //getDataHttp("https://restcountries.eu/rest/v2/all", (data) => {
    //    s.countries = data;
    //    console.log(s.countries);
    //    var interval = setInterval(function () {
    //        $('select').formSelect();
    //        clearInterval(interval);
    //    }, 2000);
    //});

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
    function setDataHttp(URL, parameter, callback) {
        h.post(URL, parameter).then((r) => {
            if (r.status == 200) {
                callback(r.data);
            } else {
                console.log(`Error: ${r.status}`);
            }
        })
    }

    $(document).ready(function () {
        $('.datepicker').datepicker({ format: 'mmmm dd, yyyy' });
        $('input#number').characterCounter();
        $('.scrollspy').scrollSpy();
        $('select').formSelect();
        $('.chips-autocomplete').chips({
            placeholder: 'Type your skills',
            autocompleteOptions: {
                data: {
                    'Apple': null,
                    'Microsoft': null,
                    'Google': null
                },
                limit: Infinity,
                minLength: 1
            }
        });
    })
}])