zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_auction_order", {
        mixins: [
            model.Base
        ],
        properties: {
            orderCode: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            userId: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            merchantId: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            productId: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            sessionId: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            addressId: {
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
            releaseTime: {
                value: null,
                type: ['datetime'],
                default: null
            },
            completeTime: {
                value: null,
                type: ['datetime'],
                default: null
            },
            expressCode: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            bidId: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            bidCode: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            bidTime: {
                value: null,
                type: ['datetime'],
                default: null
            },
            earnest: {
                value: null,
                type: ['decimal', [10,2]],
                default: 0
            },
            payEarnestLink: {
                value: null,
                type: ['varchar', 500],
                default: ''
            },
            payEarnestWay: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            payEarnestTime: {
                value: null,
                type: ['datetime'],
                default: null
            },
            payOrderLink: {
                value: null,
                type: ['varchar', 500],
                default: ''
            },
            payOrderWay: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            payOrderTime: {
                value: null,
                type: ['datetime'],
                default: null
            }
        }
    });

})
