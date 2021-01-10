zn.define(['node:fs','node:path'], function (node_fs, node_path) {

    return zn.Controller('my', {
        methods: {
            initJSON: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    var _values = request.getValue();
                    var _tran = this.beginTransaction();
                    var _data = JSON.parse(node_fs.readFileSync(node_path.resolve('./src/json/zn_plugin_admin_var.json'), 'utf8'));

                    console.log(_data);
                    response.success(_data);
                }
            },
            pagingOrder: {
                method: 'GET/POST',
                argv: {
                    userId: null,
                    status: 0
                },
                value: function (request, response, chain){
                    var _values = request.getValue();
                    var _where = 'zn_auction_order.userId={0}'.format(_values.userId);
                    if(+_values.status){
                        _where += ' and zn_auction_order.status={0}'.format(_values.status);
                    }
                    this.query(zn.sql.paging(zn.extend({
                        table: 'zn_auction_order left join zn_auction_product on zn_auction_order.productId=zn_auction_product.id',
                        fields: [
                            'zn_auction_order.*',
                            'zn_auction_product.id as productId',
                            'zn_auction_product.zn_title as productTitle',
                            'zn_auction_product.logo as productLogo',
                            'zn_auction_product.earnestMoney as productEarnestMoney'
                        ],
                        where: _where
                    }, request.getValue()))).then(function(data){
                        response.success(data);
                    }, function (data){
                        response.error(data);
                    });
                }
            },
            pagingRemind: {
                method: 'GET/POST',
                argv: {
                    userId: null
                },
                value: function (request, response, chain){
                    this.query(zn.sql.paging(zn.extend({
                        table: 'zn_auction_user_remind left join zn_auction_product on zn_auction_user_remind.productId=zn_auction_product.id',
                        fields: [
                            'zn_auction_user_remind.*',
                            'zn_auction_product.id as productId',
                            'zn_auction_product.zn_title as productTitle',
                            'zn_auction_product.logo as productLogo',
                            'zn_auction_product.earnestMoney as productEarnestMoney',
                            'zn_auction_product.beginTime as beginTime',
                            'zn_auction_product.endTime as endTime'
                        ],
                        where: 'zn_auction_user_remind.userId={0}'.format(request.getInt('userId'))
                    }, request.getValue()))).then(function(data){
                        response.success(data);
                    }, function (data){
                        response.error(data);
                    });
                }
            },
            pagingProductNotify: {
                method: 'GET/POST',
                argv: {
                    userId: null
                },
                value: function (request, response, chain){
                    this.query(zn.sql.paging(zn.extend({
                        table: 'zn_auction_product',
                        fields: '*',
                        where: "locate(',{0},', notifyUsers)<>0".format(request.getInt('userId'))
                    }, request.getValue()))).then(function(data){
                        response.success(data);
                    }, function (data){
                        response.error(data);
                    });
                }
            },
            pagingSessionNotify: {
                method: 'GET/POST',
                argv: {
                    userId: null
                },
                value: function (request, response, chain){
                    this.query(zn.sql.paging(zn.extend({
                        table: 'zn_auction_session',
                        fields: '*',
                        where: "locate(',{0},', notifyUsers)<>0".format(request.getInt('userId'))
                    }, request.getValue()))).then(function(data){
                        response.success(data);
                    }, function (data){
                        response.error(data);
                    });
                }
            },
            pagingCollection: {
                method: 'GET/POST',
                argv: {
                    userId: null
                },
                value: function (request, response, chain){
                    this.query(zn.sql.paging(zn.extend({
                        table: 'zn_auction_product',
                        fields: '*',
                        where: "locate(',{0},', notifyUsers)<>0".format(request.getInt('userId'))
                    }, request.getValue()))).then(function(data){
                        response.success(data);
                    }, function (data){
                        response.error(data);
                    });
                }
            },
            pagingDeposit: {
                method: 'GET/POST',
                argv: {
                    userId: null
                },
                value: function (request, response, chain){
                    this.query(zn.sql.paging(zn.extend({
                        table: 'zn_auction_order left join zn_auction_product on zn_auction_order.productId=zn_auction_product.id',
                        fields: [
                            'zn_auction_order.*',
                            'zn_auction_product.id as productId',
                            'zn_auction_product.zn_title as productTitle',
                            'zn_auction_product.logo as productLogo',
                            'zn_auction_product.earnestMoney as productEarnestMoney',
                            'zn_auction_product.beginTime as beginTime',
                            'zn_auction_product.endTime as endTime'
                        ],
                        where: 'zn_auction_order.userId={0} and zn_auction_order.status>16'.format(request.getInt('userId'))
                    }, request.getValue()))).then(function(data){
                        response.success(data);
                    }, function (data){
                        response.error(data);
                    });
                }
            },
            orders: {
                method: 'GET/POST',
                argv: {
                    userId: null,
                    status: null
                },
                value: function (request, response, chain){
                    this.query(zn.sql.paging(zn.extend({
                        table: 'zn_auction_order left join zn_auction_product on zn_auction_order.productId=zn_auction_product.id',
                        fields: 'zn_auction_order.*',
                        where: 'zn_auction_order.userId={0} and zn_auction_order.status={1}'.format(request.getValue('userId'), request.getValue('status'))
                    }, request.getValue()))).then(function (data){
                        response.success(data);
                    }.bind(this), function (error){
                        response.error(error.message);
                    });
                }
            },
            getMyBooking: {
                method: 'GET/POST',
                argv: {
                    userId: null
                },
                value: function (request, response, chain){
                    this.query(zn.sql.paging(zn.extend({
                        table: 'zn_auction_order left join zn_auction_product on zn_auction_order.productId=zn_auction_product.id',
                        fields: [
                            'zn_auction_order.*',
                            'zn_auction_product.zn_title as product_title',
                            'zn_auction_product.earnestMoney as product_earnestMoney',
                            'zn_auction_product.logo as product_logo',
                            'zn_auction_product.currentPrice as product_currentPrice',
                            'zn_auction_product.beginTime as product_beginTime',
                            'zn_auction_product.endTime as endTime'
                        ],
                        where: 'zn_auction_order.userId={0}'.format(request.getValue('userId'))
                    }, request.getValue()))).then(function(data){
                        response.success(data);
                    }, function (data){
                        response.error(data);
                    });
                }
            }
        }
    });
});
