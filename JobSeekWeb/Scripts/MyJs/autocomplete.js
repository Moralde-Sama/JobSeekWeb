(function ($) {
    $.fn.myautocomplete = function () {
        this.each(function () {
            var input;
            var divItem;
            var main = $(this);
            var children = Array.from($(this)[0].children);
            children.forEach((element) => {
                if (element.localName === 'input') {
                    input = $(element);
                } else if (element.localName === 'div') {
                    divItem = $(element);
                }
            })

            main.click(() => {
                input.focus();
            })
            input.keydown(function (e) {
                if (e.originalEvent.key == 'Backspace') {
                    console.log(input[0].value.length);
                    if (input[0].value.length === 1) {
                        console.log("Here");
                        divItem.css("display", "none");
                    }
                    value = input.width() - 8;
                    input.css('width', `${value}px`);
                } else {
                    value = input.width() + 8;
                    input.css('width', `${value}px`);
                    if (input[0].value.length === 1) {
                        divItem.css("display", "block");
                    }
                }
                if (input[0].value.length > 0) {
                    divItem.css("display", "block");
                    if (e.originalEvent.key == 'Enter') {
                        main.prepend(`<span>${input[0].value}<i class="pe-7s-close"></i></span>`);
                        input.val("");
                        input.css('width', '2px');
                    }
                }
            });
        });
    }
    $(".autocomplete-container").myautocomplete();
}(jQuery));