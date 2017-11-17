'use strict';

TABLEAPP.sorting = (function () {
    var sorting = {

        nameSorting: function (json) {
            json.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                } else {
                    return 1;
                }

            });
        },

        nameReverseSorting: function (json) {
            json.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                } else {
                    return 1
                }
            });
        },

        priceSorting: function (json) {
            json.sort(function (a, b) {
                return a.price - b.price;
            });
        },

        priceReverseSorting: function (json) {
            json.sort(function (a, b) {
                return b.price - a.price;
            });
        }

    };

    return sorting;

})();