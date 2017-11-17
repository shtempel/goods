'use strict';

TABLEAPP.main = (function () {
    var item,
        dataTable = TABLEAPP.data.goods,
        render = TABLEAPP.rendering,
        sort = TABLEAPP.sorting,
        validation = TABLEAPP.validation,
        addNew = $('#add-new-btn'),
        closeBtn = $('#close'),
        addModalDiv = $('#modal-div'),

        deleteModalDiv = $('#delete-modal-div'),
        searchBtn = $('#search-btn'),
        searchInput = $('#search-input'),
        table = $('table'),
        yesBtn = $('#yes-btn'),
        noBtn = $('#no-btn'),
        nameInputId = $('#name-add-field'),
        emailInputId = $('#email-add-field'),
        countInputId = $('#count-add-field'),
        priceInputId = $('#price-add-field'),
        addUpdateBtn = $('#add-update-btn'),
        optionInputId = $('#select'),

        sortNameArrowId = $('#sort-name-arrow'),
        sortPriceArrowId = $('#sort-price-arrow'),
        sortName = 'sort-name-arrow',
        sortPrice = 'sort-price-arrow',

        clickingCases = {
            delete: 'delete',
            edit: 'edit',
            sorting: 'sorting',
            show: 'show-item'
        };

    function modalToggle(id) {
        id.toggleClass('modal-visibility');
    }

    searchBtn.click(function () {
        var filter, td, tableTr;
        tableTr = $('#table-content').find('tr');
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

        addUpdateBtn.text('Add').css('display', 'block');
        nameInputId.val('');
        emailInputId.val('');
        countInputId.val('');
        priceInputId.val('');
        optionInputId.val('');

        modalToggle(addModalDiv);

        addUpdateBtn.click(function () {
            item = {
                id: dataTable.length + 1,
                name: nameInputId.val(),
                email: emailInputId.val(),
                count: countInputId.val(),
                price: priceInputId.val(),
                option: optionInputId.val()
            };

            if (validation.nameFieldValidation(nameInputId) && validation.emailFieldValidation(emailInputId)) {
                dataTable.push(item);
                modalToggle(addModalDiv);
                jsonInit();
                render.renderTable(dataTable);
            }
        });
    });

    table.click(function (e) {
        var target = e.target,
            action = $(target).data('action');

        switch (action) {

            case clickingCases.delete:
                deleteItem(target);
                break;

            case clickingCases.edit:
                editItem(target);
                break;

            case clickingCases.sorting:
                sorting(target);
                break;

            case clickingCases.show:
                editItem(target);
                break;
        }
    });

    function sorting(target) {
        var type = $(target).attr('id');

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

        addModalDiv.attr('modal-id', $(target).attr('row-id'));
        var id = addModalDiv.attr('modal-id');

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

        addUpdateBtn.click(function () {
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
        deleteModalDiv.attr('modal-id', $(target).attr('row-id'));

        yesBtn.click(function () {
            modalToggle(deleteModalDiv);
            var t = deleteModalDiv.attr('modal-id');
            dataTable.splice(t, 1);
            jsonInit();
            render.renderTable(dataTable);
        });

        noBtn.click(function () {
            modalToggle(deleteModalDiv);
        });
    }

    closeBtn.click(function () {
        modalToggle(addModalDiv);
        nameInputId.removeClass('border-error').next().removeClass('visible');
        emailInputId.removeClass('border-error').next().removeClass('visible');
    });

    function jsonInit() {
        for (var i = 0; i < dataTable.length; i++) {
            dataTable[i].id = i;
        }
    };


})();