'use strict';

TABLEAPP.rendering = (function () {
    var items = TABLEAPP.data.goods,
        render,
        tableBody = $('#table-content'),
        tableBodyRows = $('tbody tr'),
        rowHtml = $('#itemRowTemplate').html(),
        compiled = _.template(rowHtml);

    render = {

        newItem: function (item) {
            return compiled({item: item});
        },

        renderTable: function (items) {
            tableBodyRows.remove();
            var newArr = [];
            _.each(items, function (item) {
                var itemHtml = render.newItem(item);
                newArr.push(itemHtml);
            });

            tableBody.html(newArr.join(''));
        }

    };

    render.renderTable(items);

    return render;

})();