zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_auction_order_bid", {
        mixins: [
            model.Base
        ],
        properties: {
            userId: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            productId: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            status: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            price: {
                value: null,
                type: ['decimal', [10,2]],
                default: 0
            },
            increasePrice: {
                value: null,
                type: ['decimal', [10,2]],
                default: 0
            },
            brokerage: {
                value: null,
                type: ['decimal', [10,2]],
                default: 0
            },
            bidCode: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            orderCode: {
                value: null,
                type: ['varchar', 100],
                default: ''
            }
        }
    });

})
