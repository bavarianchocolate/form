$(document).ready(function () {

    let Validation = (function () {
        let emailReg = /^\w+@\w+\.\w+/;
        let digitReg = /\+380\d{6,9}$/;
        let nameReg = /[A-Z, А-Я][a-z, а-я]{1,} [A-Z, А-Я][a-z, а-я]{1,}/;

        let isName = function (name) {
            return nameReg.test(name);
        };
        let isEmail = function (email) {
            return emailReg.test(email);
        };
        let isNumber = function (value) {
            return digitReg.test(value);
        };
        let isRequire = function (value) {
            return value == "";
        };
        let isChecked = function (el) {
            let hasCheck = false;
            el.each(function () {
                if ($(this).prop('checked')) {
                    hasCheck = true;
                }
            });
            return hasCheck;
        };
        return {
            isName: isName,
            isEmail: isEmail,
            isNumber: isNumber,
            isRequire: isRequire,
            isChecked: isChecked
        };
    })();

    let names = $('form').find('[data-name]');
    let required = $('form').find('[data-required]');
    let numbers = $('form').find('[data-number]');
    let emails = $('form').find('[data-email]');
    let once = $('form').find('[data-once]');
    let radios = $('.form-item-triple');
    let groups = [];
    radios.each(function () {
        groups.push($(this).find('[data-once]'));
    });

    $('#submit').on('click', function () {
        required.each(function () {
            if (Validation.isRequire($(this).val())) {
                $(this).siblings('small.errorReq').show();
            }
        });
        names.each(function () {
            if (!Validation.isName($(this).val())) {
                $(this).siblings('small.errorReq').show();
            }
        });
        emails.each(function () {
            if (!Validation.isEmail($(this).val())) {
                $(this).siblings('small.errorEmail').show();
            }
        });
        $.each(groups, function () {
            if (!Validation.isChecked($(this))) {
                $(this).parents('.form-item').find('small.errorOnce').show();
            }
        });
        numbers.each(function () {
            if (!Validation.isNumber($(this).val())) {
                $(this).siblings('small.errorNum').show();
            }
        });
    });

    required.on('keyup blur', function () {
        if (!Validation.isRequire($(this).val())) {
            $(this).siblings('small.errorReq').hide();
        }
    });
    names.on('keyup blur', function () {
        if (Validation.isName($(this).val())) {
            $(this).siblings('small.errorReq').hide();
        }
    });
    emails.on('keyup blur', function () {
        if (Validation.isEmail($(this).val())) {
            $(this).siblings('small.errorEmail').hide();
        }
    });
    once.on('change', function () {
        $.each(groups, function (i) {
            if (Validation.isChecked(groups[i])) {
                groups[i].parents('.form-item').find('small.errorOnce').hide();
            }
        });
    });
    numbers.on('keyup blur', function () {
        if (Validation.isNumber($(this).val())) {
            $(this).siblings('small.errorNum').hide();
        }
    });

});