'use strict';

TABLEAPP.main = (function () {
    var render, sort, addNew, closeBtn, addModalDiv, deleteModalDiv, searchBtn,
        searchInput, dataTable, tableTr, yesBtn, noBtn, table, validation;

    addNew = $('#add-new-btn');
    closeBtn = $('#close');
    addModalDiv = $('#modal-div');
    deleteModalDiv = $('#delete-modal-div');
    searchBtn = $('#search-btn');
    searchInput = $('#search-input');
    table = $('table');
    tableTr = $('#table-content').find('tr');
    yesBtn = $('#yes-btn');
    noBtn = $('#no-btn');
    dataTable = TABLEAPP.data.goods;
    render = TABLEAPP.rendering;
    sort = TABLEAPP.sorting;
    validation = TABLEAPP.validation;

    function modalToggle(id) {
        id.toggleClass('modal-visibility');
    }

    searchBtn.click(function () {
        var filter, td;
        filter = searchInput.val().toUpperCase();
        for (var i = 0; i < tableTr.length; i++) {
            td = tableTr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tableTr[i].style.display = "";
                } else {
                    tableTr[i].style.display = "none";
                }
            }
        }
    });

    addNew.click(function () {
        var item, nameInputId, priceInputId, countInputId,
            emailInputId, addUpdateBtn, optionFieldId;
        nameInputId = $('#name-add-field');
        emailInputId = $('#email-add-field');
        countInputId = $('#count-add-field');
        priceInputId = $('#price-add-field');
        addUpdateBtn = $('#add-update-btn');
        optionFieldId = $('#select');

        addUpdateBtn.text('Add');
        nameInputId.val('');
        emailInputId.val('');
        countInputId.val('');
        priceInputId.val('');
        optionFieldId.val('');

        modalToggle(addModalDiv);

        addUpdateBtn.off('click').click(function () {
            item = {
                id: dataTable.length + 1,
                name: nameInputId.val(),
                email: emailInputId.val(),
                count: countInputId.val(),
                price: priceInputId.val(),
                option: optionFieldId.val()
            };
            if (validation.nameFieldValidation(nameInputId) && validation.emailFieldValidation(emailInputId)) {
                dataTable.push(item);
                modalToggle(addModalDiv);
                render.renderTable(dataTable);
            }
        });
    });

    table.click(function (e) {
        var target = e.target,
            action = $(target).data('action');

        switch (action) {

            case 'delete':
                deleteItem(target);
                break;

            case 'edit':
                editItem(target);
                break;

            case 'sorting':
                sorting(target);
                break;

            case 'show-item':
                editItem(target);
                break;
        }
    });

    function sorting(target) {
        var type, sortName, sortPrice, sortNameArrowId, sortPriceArrowId;
        type = $(target).attr('id');
        sortNameArrowId = $('#sort-name-arrow');
        sortPriceArrowId = $('#sort-price-arrow');
        sortName = 'sort-name-arrow';
        sortPrice = 'sort-price-arrow';

        if (type === sortName) {
            if (!sortNameArrowId.hasClass('sort-arrow-div-clicked')) {
                sortNameArrowId.addClass(('sort-arrow-div-clicked'));
                sort.nameSorting(dataTable);
            } else {
                sortNameArrowId.removeClass(('sort-arrow-div-clicked'));
                sort.nameReverseSorting(dataTable);
            }
        }

        if (type === sortPrice) {
            if (!sortPriceArrowId.hasClass('sort-arrow-div-clicked')) {
                sortPriceArrowId.addClass(('sort-arrow-div-clicked'));
                sort.priceSorting(dataTable);
            } else {
                sortPriceArrowId.removeClass(('sort-arrow-div-clicked'));
                sort.priceReverseSorting(dataTable);
            }
        }
        render.renderTable(dataTable);
    }


    function editItem(target) {
        var nameInputId, emailInputId, countInputId, priceInputId,
            optionInputId, addUpdateBtn, id;
        addModalDiv.attr('modal-id', $(target).attr('rowId'));
        nameInputId = $('#name-add-field');
        emailInputId = $('#email-add-field');
        countInputId = $('#count-add-field');
        priceInputId = $('#price-add-field');
        optionInputId = $('#select');
        addUpdateBtn = $('#add-update-btn');
        id = addModalDiv.attr('modal-id');

        if ($(target).attr('data-action') === 'show-item') {
            addUpdateBtn.css('display', 'none');
        } else {
            addUpdateBtn.text('Edit').css('display', 'block');
        }

        modalToggle(addModalDiv);

        nameInputId.val(dataTable[id].name);
        emailInputId.val(dataTable[id].email);
        countInputId.val(dataTable[id].count);
        priceInputId.val(dataTable[id].price);
        optionInputId.val(dataTable[id].option);

        addUpdateBtn.off('click').click(function () {
            if (validation.nameFieldValidation(nameInputId) && validation.emailFieldValidation(emailInputId)) {
                dataTable[id].name = nameInputId.val();
                dataTable[id].email = emailInputId.val();
                dataTable[id].count = countInputId.val();
                dataTable[id].price = priceInputId.val();
                dataTable[id].option = optionInputId.val();
            }
            render.renderTable(dataTable);
            modalToggle(addModalDiv);
        });
    }

    function deleteItem(target) {
        modalToggle(deleteModalDiv);
        deleteModalDiv.attr('modal-id', $(target).attr('rowId'));

        yesBtn.off('click').click(function () {
            modalToggle(deleteModalDiv);
            var t = deleteModalDiv.attr('modal-id');
            dataTable.splice(t, 1);
            render.renderTable(dataTable);
        });

        noBtn.off('click').click(function () {
            modalToggle(deleteModalDiv);
        });
    }

    closeBtn.click(function () {
        modalToggle(addModalDiv);
        $('#name-add-field').removeClass('border-error');
        $('#name-add-field').next().removeClass('visible');
        $('#email-add-field').removeClass('border-error');
        $('#email-add-field').next().removeClass('visible');
    });

})();