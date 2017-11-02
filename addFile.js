


addDiv('modal-div', '#table-div');
$('#modal-div').addClass('modal-div-class');

addDiv('modal-content', '#modal-div');
$('#modal-content').addClass('modal-content');

addSpan('close', '\u02DF', '#modal-content');
$('#close').addClass('close');

addDiv('name-div', '#modal-content');
addLabel('Name:', 'name-add-field', '#name-div');
addInput('name-add-field', 'text', '', '#name-div');

$('#name-add-field').keyup(function () {
    var str = $('#name-add-field').val();
    if (str.length > 15) {
        $('#name-add-field').val(str.substr(0, str.length - 1));
    }
});

$('#name-add-field').keypress(function () {
    $(this).removeClass('validation-error');
    $('.error-msg').removeClass('visible');
});

$('#name-add-field').blur(function () {
    nameFieldValidation('#name-add-field');
});

addLabel('Required field', '#name-add-field', '#name-div');
$('#name-add-field').next().addClass('error-msg');

addDiv('email-div', '#modal-content');
addLabel('Supplier email', 'email-add-field', '#email-div');
addInput('email-add-field', 'text', '', '#email-div');
$('#email-add-field').keypress(function () {
    $(this).removeClass('validation-error');
    $('.error-msg').removeClass('visible');
});
$('#email-add-field').blur(function () {
    emailFieldValidation('#email-add-field');
});
addLabel('Incorrect email', '#email-add-field', '#email-div');
$('#email-add-field').next().addClass('error-msg');

addDiv('count-div', '#modal-content');
addLabel('Count', 'count-add-field', '#count-div');
addInput('count-add-field', 'number', 'digits only', '#count-div');

addDiv('price-div', '#modal-content');
addLabel('Price', 'price-add-field', '#price-div');
addInput('price-add-field', 'number', 'digits only', '#price-div');


addDiv('select-div', '#modal-content');

addLabel('Options:', 'select', '#select-div');
var select = $('<select/>', {id: 'select'}).addClass('normalField');
var options = ['', '1', '2', '3'];
addSelect(options, select, '', '#select-div');

addButton('add-btn', 'Add', '#modal-content');
$('#add-update-btn').addClass('add-update-btn');

addButton('update-btn', 'Update', '#modal-content');

$('#modal-content div').addClass('div-class');

document.getElementById('close').onclick = function () {
    hideElement($('#name-add-field').next(), 'visible');
    hideElement($('#email-add-field').next(), 'visible');
    $('#email-add-field').removeClass('validation-error');
    $('#name-add-field').removeClass('validation-error');
    resetAllFields('#select', '#name-add-field', '#email-add-field', '#count-add-field', '#price-add-field', '#select');
    closeModal('modal-div');
};

$('#update-btn').click(function () {
    if (nameFieldValidation('#name-add-field') && emailFieldValidation('#email-add-field')) {
        editItem(data, $('#modal-div').attr('modal-id'), '#name-add-field', '#email-add-field', '#count-add-field', '#price-add-field', '#select');
        renderTable($('tbody tr'), data, '#table-div');
        resetAllFields('#select', '#name-add-field', '#email-add-field', '#count-add-field', '#price-add-field', '#select');
        closeModal('modal-div');
    }
});

$('#add-btn').click(function () {
    if (nameFieldValidation('#name-add-field') && emailFieldValidation('#email-add-field')) {
        addItemToJson(data, '#name-add-field', '#email-add-field', '#count-add-field', '#price-add-field', '#select');
        $('tbody tr').remove();
        renderTable($('tbody tr'), data, '#table-div');
        resetAllFields('#select', '#name-add-field', '#email-add-field', '#count-add-field', '#price-add-field', '#select');
        closeModal('modal-div');
    }
});