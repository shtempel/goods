function search(input, table) {
    var filter, tr, td, i;
    filter = input.value.toUpperCase();
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function deleteElement(element) {
    $(element).remove();
}

function addDiv(divId, toAppend) {
    $('<div/>', {
        id: divId
    }).appendTo(toAppend);
}

function addSpan(spanId, spanText, toAppend) {
    $('<span/>', {
        id: spanId,
        text: spanText
    }).appendTo(toAppend);
}

function addLabel(labelText, forId, toAppend) {
    $('<label>', {
        text: labelText,
        for : forId
    }).appendTo(toAppend);
}

function addInput(inputId, inputType, placeholder, toAppend) {
    $('<input/>', {
        id: inputId,
        type: inputType,
        placeholder: placeholder
    }).appendTo(toAppend);
}

function addButton(buttonId, text, toAppend) {
    $('<button/>', {
        id: buttonId,
        text: text
    }).appendTo(toAppend);
}

function addSelect(options, select, val, append) {
    $.each(options, function () {
        $('<option/>', {
            val: this,
            text: this
        }).appendTo(select);
    });
    select.val(val);
    $(append).append(select);
}

function hideElement(elementId, elementClass) {
    $(elementId).removeClass(elementClass);
}

function resetAllFields(select, name, email, count, price) {
    $(select).val('');
    $(name).val('');
    $(email).val('');
    $(count).val('');
    $(price).val('');
}

function deleteRow(element) {
    deleteElement($(element).parent().parent());
}

function getName(nameFieldId) {
    return $(nameFieldId).val();
}
function getEmail(emailFieldId) {
    return $(emailFieldId).val();
}
function getPrice(priceFieldId) {
    return $(priceFieldId).val();
}

function getCount(countFieldId) {
    return $(countFieldId).val();
}
function getOption(optionFieldId) {
    return $(optionFieldId).val();
}

function error(fieldId, className, errorLabelId, errorLabelClass) {
    $(fieldId).addClass(className);
    $(errorLabelId).addClass(errorLabelClass);
}

function addButtonToTable(buttonId, text, className, rowId) {
    return $('<button/>', {
        'rowId': rowId,
        id: buttonId,
        text: text,
        class: className
    });
}

function nameFieldValidation(nameFieldId) {
    if ($(nameFieldId).val() === '') {
        return error(nameFieldId, 'validation-error', $(nameFieldId).next(), 'visible');
    } else {
        return true;
    }
}

function emailFieldValidation(emailFieldId) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test($(emailFieldId).val())) {
        return error(emailFieldId, 'validation-error', $(emailFieldId).next(), 'visible');
    } else {
        return true;
    }
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function renderTable(element, json, tableId) {
    element.remove();
    addFromJson(json, tableId);
    $('td.name').click(function () {
        document.getElementById('modal-div').style.display = "block";
        $('#modal-div').attr('modal-id', $(this).attr('rowId'));
        var id = $('#modal-div').attr('modal-id');
        $('#update-btn').hide();
        $('#add-btn').hide();
        fillFieldsForEditModal(data, id, '#name-add-field', '#email-add-field', '#count-add-field', '#price-add-field', '#select');
        $('#name-add-field').val(data[id].name);
        $('#email-add-field').val(data[id].email);
        $('#count-add-field').val(data[id].count);
        $('#price-add-field').val(data[id].price);
        $('#select').val(data[id].option);

    });
}

function sort(json, comparator) {
    json.sort(comparator);
}

function nameComparator(a, b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
}

function nameComparatorReverse(a, b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    if (x > y) {
        return -1;
    }
    if (x < y) {
        return 1;
    }
    return 0;
}

function priceComparator(a, b) {
    var x = a.price;
    var y = b.price;
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
}

function priceComparatorReverse(a, b) {
    var x = a.price;
    var y = b.price;
    if (x > y) {
        return -1;
    }
    if (x < y) {
        return 1;
    }
    return 0;
}


function addItemToJson(json, nameFieldId, emailFieldId, countFieldId, priceFieldId, optionFieldId) {
    json.push({
        id: json.length + 1,
        name: getName(nameFieldId),
        email: getEmail(emailFieldId),
        count: getCount(countFieldId),
        price: getPrice(priceFieldId),
        option: getOption(optionFieldId)
    });
}

function editItem(json, id, nameFieldId, emailFieldId, countFieldId, priceFieldId, optionFieldId) {
    json[id].name = getName(nameFieldId);
    json[id].email = getEmail(emailFieldId);
    json[id].count = getCount(countFieldId);
    json[id].price = getPrice(priceFieldId);
    json[id].option = getOption(optionFieldId);
}

function deleteItemFromJson(json, divId, attrName) {
    var t = $(divId).attr(attrName);
    json.splice(t, 1);
}

function addFromJson(json, table) {
    for (var i = 0; i < json.length; i++) {
        var dataCell = $('<tr/>').attr('rowid', i + 1);
        dataCell.append(
                $('<td/>', {
                    class: 'name',
                    text: json[i].name,
                    'rowId': i
                }).append($('<label/>', {
            text: json[i].count,
            class: 'countLabel'
        })
                ));
        dataCell.append(
                $('<td/>', {
                    class: 'price',
                    text: (json[i].price + ' $').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
                })
                );
        dataCell.append(
                $('<td/>', {id: 'btns-cell'}).append(addButtonToTable('edit-btn', 'Edit', 'edit-btn', i),
                addButtonToTable('delete-btn', 'Delete', 'delete-btn', i)
                ));
        $("tbody", table).append(dataCell);
    }

    $('* #delete-btn').click(function () {
        document.getElementById('delete-modal-div').style.display = "block";
        $('#delete-modal-div').attr('modal-id', $(this).attr('rowId'));
    });

    $('* #edit-btn').click(function () {
        document.getElementById('modal-div').style.display = "block";
        $('#modal-div').attr('modal-id', $(this).attr('rowId'));
        var id = $('#modal-div').attr('modal-id');
        $('#update-btn').show();
        $('#add-btn').hide();
        fillFieldsForEditModal(data, id, '#name-add-field', '#email-add-field', '#count-add-field', '#price-add-field', '#select');
        $('#name-add-field').val(data[id].name);
        $('#email-add-field').val(data[id].email);
        $('#count-add-field').val(data[id].count);
        $('#price-add-field').val(data[id].price);
        $('#select').val(data[id].option);

    });
}

function fillFieldsForEditModal(json, id, nameField, emailField, countField, priceField, optionField) {
    $(nameField).val(json[id].name);
    $(emailField).val(json[id].email);
    $(countField).val(json[id].count);
    $(priceField).val(json[id].price);
    $(optionField).val(json[id].option);
}