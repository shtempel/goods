'use strict';

TABLEAPP.rendering = (function () {
    var dataTable = TABLEAPP.data.goods,
        render,
        tbody = $('<tbody>', {id: 'table-content'});

    function addButtonToTable(buttonId, text, className, rowId, dataAction) {
        return $('<button/>', {
            'rowId': rowId,
            'data-action': dataAction,
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
                        'data-action': 'show-item',
                        text: dataTable[i].name,
                        'rowId': i
                    }).append($('<label/>', {
                        text: dataTable[i].count,
                        class: 'count-label'
                    })));

                dataCell.append(
                    $('<td/>', {
                        class: 'price',
                        text: (dataTable[i].price + ' $').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
                    })
                );

                dataCell.append(
                    $('<td/>', {id: 'btns-cell'}).append(addButtonToTable('edit-btn', 'Edit', 'edit-btn', i, 'edit'),
                        addButtonToTable('delete-btn', 'Delete', 'delete-btn', i, 'delete')));
                tbody.append(dataCell);
            }
            $('.table').append(tbody);
        }
    };

    render.renderTable(dataTable);

    return render;

})();