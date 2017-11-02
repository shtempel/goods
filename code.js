function include(url) {
    const script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include("./utils.js");
include("./addFile.js");
jQuery(document).ready(function () {

    var table, input, warningMsg;
    warningMsg = "Are you sure you want to delete this element";
    addDiv('top-div', '#content');
    $("#top-div").addClass('top-div');
    addInput('search-input', 'textarea', 'Filter..', '#top-div');
    addButton('search-btn', 'Search', '#top-div');
    $('#search-btn').click(function () {
        search(input, table);
    });
    $("#search-btn").addClass('search-btn');
    addButton('add-new-btn', 'Add new', '#top-div');
    $("#add-new-btn").addClass('add-new-btn');
    $('#add-new-btn').click(function () {
        $('#add-btn').show();
        document.getElementById('modal-div').style.display = "block";
        $('#update-btn').hide();
    });
    addDiv('table-div', '#content');
    $("#table-div").addClass('table-div');
    table = $('<table/>', {
        class: 'table'
    }).append(
            $('<thead/>'),
            $('<tfoot/>'),
            $('<tbody/>'));
    var titleCell = $('<tr/>');
    titleCell.append(
            $('<th/>').append($('<div/>', {text: 'Name'}),
            ($('<div/>', {class: 'sort-arrow-div', id: 'sort-name-arrow'}))
            ));
    titleCell.append(
            $('<th/>').append($('<div/>', {text: 'Price'}),
            ($('<div/>', {class: 'sort-arrow-div', id: 'sort-price-arrow'}))
            ));
    titleCell.append(
            $('<th/>', {
                text: 'Actions'
            }));
    $("thead", table).append(titleCell);
    $('#table-div').append(table);
    input = document.getElementById("search-input");
    table = document.getElementById("table-div");
    renderTable($('tbody tr'), data, '#table-div');

    $('#sort-name-arrow').click(function () {
        if (!$('#sort-name-arrow').hasClass('sort-arrow-div-clicked')) {
            sort(data, nameComparator);
            renderTable($('tbody tr'), data, '#table-div');
            $('#sort-name-arrow').addClass(('sort-arrow-div-clicked'));
        } else {
            sort(data, nameComparatorReverse);
            renderTable($('tbody tr'), data, '#table-div');
            $('#sort-name-arrow').removeClass(('sort-arrow-div-clicked'));

        }
    });

    $('#sort-price-arrow').click(function () {
        if (!$('#sort-price-arrow').hasClass('sort-arrow-div-clicked')) {
            sort(data, priceComparator);
            renderTable($('tbody tr'), data, '#table-div');
            $('#sort-price-arrow').addClass(('sort-arrow-div-clicked'));
        } else {
            sort(data, priceComparatorReverse);
            renderTable($('tbody tr'), data, '#table-div');
            $('#sort-price-arrow').removeClass(('sort-arrow-div-clicked'));
        }
    });

    addDiv('delete-modal-div', '#content');
    addDiv('delete-modal-content', '#delete-modal-div');
    addLabel(warningMsg, '', '#delete-modal-content');
    $('#delete-modal-div').addClass('delete-modal-div');
    addButton('yes-btn', 'Yes', '#delete-modal-content');
    addButton('no-btn', 'No', '#delete-modal-content');
    $('#delete-modal-content').addClass('delete-modal-content');
    $('#yes-btn').click(function () {
        deleteItemFromJson(data, '#delete-modal-div', 'modal-id');
        $('tbody tr').remove();
        addFromJson(data, '#table-div');
        document.getElementById('delete-modal-div').style.display = 'none';
    });
    $('#no-btn').click(function () {
        document.getElementById('delete-modal-div').style.display = 'none';
    });
});