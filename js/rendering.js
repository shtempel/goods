'use strict';

TABLEAPP.rendering = (function () {
    var items = TABLEAPP.data.goods,
        render,
        tableBody = $('#table-content'),
        rowHtml = $('#itemRowTemplate').html();


    window.itemRowTempFunc = _.template(rowHtml);

    render = {

        newItem: function (item) {
            return itemRowTempFunc({item: item});
        },

        renderTable: function (items) {
            $('tbody tr').remove();
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