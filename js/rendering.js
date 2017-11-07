'use strict';

TABLEAPP.rendering = (function () {
    var dataTable, table, render;
    dataTable = TABLEAPP.data.goods;
    table = $('#table-content');


    function addButtonToTable(buttonId, text, className, rowId) {
        return $('<button/>', {
            'rowId': rowId,
            id: buttonId,
            text: text,
            class: className
        });
    }

    render = {
        renderTable: function (dataTable) {
            $('tbody tr').remove();
            for (var i = 0; i < dataTable.length; i++) {
                var dataCell = $('<tr/>').attr('rowid', i + 1);
                dataCell.append(
                    $('<td/>', {
                        class: 'name',
                        text: dataTable[i].name,
                        'rowId': i
                    }).append($('<label/>', {
                        text: dataTable[i].count,
                        class: 'countLabel'
                    })));
                dataCell.append(
                    $('<td/>', {
                        class: 'price',
                        text: (dataTable[i].price + ' $').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
                    })
                );
                dataCell.append(
                    $('<td/>', {id: 'btns-cell'}).append(addButtonToTable('edit-btn', 'Edit', 'edit-btn', i),
                        addButtonToTable('delete-btn', 'Delete', 'delete-btn', i)));
                table.append(dataCell);
            }
        }
    };

    render.renderTable(dataTable);

    return render;
})();