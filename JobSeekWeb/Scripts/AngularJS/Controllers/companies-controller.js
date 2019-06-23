module.controller("CompaniesCtrl", ["$scope", "$http", function(s, h) {
    s.list = [0, 1, 2, 3, 4];
}])
module.controller("WorkerProfileCtrl", ["$scope", "$http", function (s, h) {
    s.list = [0, 1, 2, 3, 4];


    $(document).ready(function () {
        $('select').formSelect();
        $('.datepicker').datepicker();
        $('input#number').characterCounter();
        $('.scrollspy').scrollSpy();
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