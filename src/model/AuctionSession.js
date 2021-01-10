zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_auction_session", {
        mixins: [
            model.Base
        ],
        properties: {
            isAdv: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            typeId: {
                value: null,
                type: ['int', 10],
                convert: 'zn_auction_convert_product_type({})',
                default: 0
            },
            alias: {
                value: null,
                type: ['varchar', 200],
                default: ''
            },
            description: {
                value: null,
                type: ['varchar', 500],
                default: ''
            },
            img: {
                value: null,
                type: ['varchar', 300],
                default: ''
            },
            imgs: {
                value: null,
                type: ['varchar', 3000],
                default: ','
            },
            videos: {
                value: null,
                type: ['varchar', 3000],
                default: ','
            },
            icon: {
                value: null,
                type: ['varchar', 300],
                default: ''
            },
            tags: {
                value: null,
                type: ['varchar', 500],
                default: ','
            },
            vars: {
                value: null,
                type: ['varchar', 500],
                default: ','
            },
            beginTime: {
                value: null,
                type: ['datetime'],
                default: null
            },
            endTime: {
                value: null,
                type: ['datetime'],
                default: null
            },
            status: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            watchCount: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            notifyUsers: {
                value: null,
                type: ['varchar', 500],
                default: ','
            },
            notifyCount: {
                value: null,
                type: ['int', 10],
                default: 0
            },
            applyCount: {
                value: null,
                type: ['int', 10],
                default: 0
            }
        }
    });

})
