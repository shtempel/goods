'use strict';

TABLEAPP.main = (function () {
    var render, addNew, closeBtn, addModalWindow, searchBtn, searchInput, dataTable, tableTr, input;

    addNew = $('#add-new-btn');
    closeBtn = $('#close');
    addModalWindow = $('#modal-div');
    searchBtn = $('#search-btn');
    searchInput = $('#search-input');
    tableTr = $('#table-content tr');
    searchInput = $('#search-input');
    dataTable = TABLEAPP.data.goods;
    render = TABLEAPP.rendering;


    function modalToggle(id) {
        id.toggleClass('modal-visibility');
    }

    searchBtn.click(function () {
        var filter, tr, td;
        filter = searchInput.val().toUpperCase();
        tr = tableTr;
        for (var i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    });

    addNew.click(function () {
        modalToggle(addModalWindow);
    });

    closeBtn.click(function () {
        modalToggle(addModalWindow);
    })

})();

function search(input, table) {

}