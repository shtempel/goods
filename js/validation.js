'use strict';

TABLEAPP.validation = (function () {
    var nameFieldId = $('#name-add-field'),
        emailFieldId = $('#email-add-field'),
        valTemplate = /(?:^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]{2,}$)/g;

    var validation = {

        showErrors: function (type) {
            switch (type) {
                case 'name':
                    nameFieldId.addClass('border-error');
                    nameFieldId.next().addClass('visible');
                    break;
                case 'email':
                    emailFieldId.addClass('border-error');
                    emailFieldId.next().addClass('visible');
                    break;
            }
        },

        nameFieldValidation: function (nameFieldId) {
            if (nameFieldId.val() === '') {
                return validation.showErrors('name');
            } else {
                return true;
            }
        },

        emailFieldValidation: function (emailFieldId) {
            if (!valTemplate.test(emailFieldId.val())) {
                return validation.showErrors('email');
            } else {
                return true;
            }
        }
    };

    (function () {
        $('#name-add-field').keypress(function () {
            if (validation.nameFieldValidation('#name-add-field')) {
                nameFieldId.removeClass('border-error');
                nameFieldId.next().removeClass('visible');
            }
        }).blur(function () {
            validation.nameFieldValidation('#name-add-field');
        }).keyup(function () {
            var str = nameFieldId.val();
            if (str.length > 15) {
                nameFieldId.val(str.substr(0, str.length - 1));
            }
        });

        emailFieldId.keyup(function () {
            if (validation.emailFieldValidation('#email-add-field')) {
                emailFieldId.removeClass('border-error');
                emailFieldId.next().removeClass('visible');
            }
        }).blur(function () {
            validation.emailFieldValidation('#email-add-field');
        });
    })();

    return validation;

})();