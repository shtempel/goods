'use strict'

TABLEAPP.sorting = (function () {
    var sorting = {

        nameSorting: function (json) {
            json.sort(function (a, b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            });
        },
        nameReverseSorting: function (json) {
            json.sort(function (a, b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                if (x < y) {
                    return 1;
                }
                if (x > y) {
                    return -1;
                }
                return 0;
            });
        },
        priceSorting: function (json) {
            json.sort(function (a, b) {
                var x = a.price;
                var y = b.price;
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            });
        },
        priceReverseSorting: function (json) {
            json.sort(function (a, b) {
                var x = a.price;
                var y = b.price;
                if (x < y) {
                    return 1;
                }
                if (x > y) {
                    return -1;
                }
                return 0;
            });
        }

    };

    return sorting;
})();