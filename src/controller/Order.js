zn.define(function () {

    var OrderHelper = zn.Class({
        static: true,
        methods: {
            getBidPayLink: function (productId, bidCode, totalAmount, orderCode){
                return zn.alipay.getMethodURL('alipay.trade.wap.pay', {
                    subject: '拍品保证金支付',
                    product_code: 'No.' + productId,
                    out_trade_no: bidCode,
                    total_amount: totalAmount.toFixed(2),
                    //quit_url: '',
                    //return_url: 'http://0.0.0.0:8989/web/www/order_detail.html?orderCode='+orderCode,
                    return_url: 'http://app.99zjpm.com/order_detail.html?orderCode='+orderCode,
                    notify_url: 'http://alipay.99zjpm.com/order_notify/bid'
                })
            },
            getOrderPayLink: function (productId, orderCode, totalAmount){
                return zn.alipay.getMethodURL('alipay.trade.wap.pay', {
                    subject: '订单支付',
                    product_code: 'No.' + productId,
                    out_trade_no: orderCode,
                    total_amount: totalAmount.toFixed(2),
                    return_url: 'http://app.99zjpm.com/order_detail.html?orderCode='+orderCode,
                    notify_url: 'http://alipay.99zjpm.com/order_notify/order'
                })
            }
        }
    });

    return zn.Controller('order', {
        methods: {
            getCode: {
                method: 'GET/POST',
                argv: {

                },
                value: function (request, response, chain){
                    response.success(zn.plugin.admin.util.order.generateCode(2));
                    //response.success(zn.plugin.admin.util.order.getRandomChar() + zn.plugin.admin.util.order.getRandomNumbers());
                }
            },
            getBidInfo: {
                method: 'GET/POST',
                argv: {
                    userId: null,
                    productId: null
                },
                value: function (request, response, chain){
                    var _values = request.getValue();
                    var _sql = this.collection('zn_auction_user_address').selectSql({
                        where: {
                            userId: _values.userId
                        }
                    });
                    _sql += this.collection('zn_auction_product').selectSql({
                        where: 'id={0} and status=1 and UNIX_TIMESTAMP(endTime)>UNIX_TIMESTAMP(now())'.format(_values.productId)
                    });
                    _sql += this.collection('zn_auction_order').selectSql({
                        hidden: ['id','userId'],
                        where: {
                            userId: _values.userId,
                            productId: _values.productId
                        }
                    });

                    this.query(_sql)
                        .then(function (data){
                            if(!data[1].length){
                                response.error('商品已经过期，请看其他商品吧');
                            }else {
                                data[1] = data[1][0];
                                data[2] = data[2][0];
                                response.success(data);
                            }
                        }, function (error){
                            response.error(error);
                        });
                }
            },
            create: {
                method: 'GET/POST',
                argv: {
                    addressId: null,
                    userId: null,
                    productId: null,
                    sessionId: 0
                },
                value: function (request, response, chain){
                    var _value = request.getValue(),
                        _product = null,
                        _order = null;
                    this.beginTransaction()
                        .query('select * from zn_auction_order where userId={0} and productId={1};select * from zn_auction_product where id={1} and status=1;'.format(_value.userId, _value.productId))
                        .query('insert & update', function (sql, data){
                            _product = data[1][0];
                            if(!_product){
                                return response.error('提交失败, 该商品已经不存在或下架了!'), -1;
                            }
                            _order = data[0][0];
                            if(_order){
                                if(_order.status==0){
                                    return response.success(_order.orderCode), -1;
                                }else {
                                    return response.error('提交失败, 您已经报名下单, 请出价!'), -1;
                                }
                            }else {
                                _value.status = 0;
                                _value.earnest = _product.earnestMoney;
                                _value.orderCode = zn.plugin.admin.util.order.generateCode(2);
                                _value.bidCode = zn.plugin.admin.util.order.getRandomChar() + zn.plugin.admin.util.order.getRandomNumbers();
                                _value.payEarnestLink = OrderHelper.getBidPayLink(_product.id, _value.bidCode, _product.earnestMoney, _value.orderCode);
                                return zn.sql.insert({
                                    table: 'zn_auction_order',
                                    values: _value
                                });
                            }
                        }, function (err, data){
                            if(err){
                                response.error(err);
                            }else {
                                response.success({
                                    bidCode: _value.bidCode,
                                    orderCode: _value.orderCode,
                                    payEarnestLink: _value.payEarnestLink
                                });
                            }
                        })
                        .commit();
                }
            },
            getOrderByCode: {
                method: 'GET/POST',
                argv: {
                    orderCode: null
                },
                value: function (request, response, chain){
                    var _self = this;
                    this.beginTransaction()
                        .query(this.collection('zn_auction_order').selectSql({ hidden: ['id'], where: request.getValue() }))
                        .query('Select Product & Address: ', function (sql, rows) {
                            _order = rows[0];
                            if(_order){
                                return _self.collection('zn_auction_user_address').selectSql({ hidden: ['id'], where: { id: _order.addressId } }) +
                                    _self.collection('zn_auction_product').selectSql({ hidden: ['id'], where: { id: _order.productId } }) +
                                    _self.collection('zn_auction_order_bid').selectSql({ hidden: ['id'], where: { orderCode: _order.orderCode }, order: { zn_create_time: 'desc' } });
                            } else {
                                return response.error('请求失败, 没有该订单信息！'), -1;
                            }
                        }, function (err, data){
                            if(err){
                                response.error(err);
                            }else {
                                _order.address = data[0][0];
                                _order.product = data[1][0];
                                _order.bids = data[2] || [];
                                response.success(_order);
                            }
                        }).commit();
                }
            },
            getOrderPayLink: {
                method: 'GET/POST',
                argv: {
                    orderCode: null
                },
                value: function (request, response, chain){
                    this.beginTransaction()
                        .query(this.collection('zn_auction_order').selectSql({ hidden: ['id'], where: request.getValue() }), null, function (err, data){
                            if(err){
                                response.error(err);
                            }else {
                                response.success(data[0].payOrderLink);
                            }
                        }).commit();
                }
            },
            getBidPayLink: {
                method: 'GET/POST',
                argv: {
                    bidCode: null
                },
                value: function (request, response, chain){
                    this.beginTransaction()
                        .query(this.collection('zn_auction_order').selectSql({ hidden: ['id'], where: request.getValue() }), null, function (err, data){
                            if(err){
                                response.error(err);
                            }else {
                                response.success(data[0].payEarnestLink);
                            }
                        }).commit();
                }
            },
            bid: {
                method: 'GET/POST',
                argv: {
                    orderCode: null,
                    price: null,
                    increasePrice: null
                },
                value: function (request, response, chain){
                    var _orderCode = request.getValue('orderCode'),
                        _price = request.getValue('price'),
                        _increasePrice = request.getValue('increasePrice'),
                        _order = null,
                        _bid = null;

                    this.beginTransaction()
                        .query("select * from zn_auction_order where orderCode='{0}';".format(_orderCode))
                        .query('update bid', function (sql, data){
                            _order = data[0];
                            if(!_order){
                                return response.error('该订单不存在'), -1;
                            }

                            return "update zn_auction_order_bid set status=-1 where productId={0};".format(_order.productId);
                        })
                        .query('Set all order bid invalid!', function (sql, data){
                            _bid = {
                                status: 1,
                                price: _price,
                                increasePrice: _increasePrice,
                                productId: _order.productId,
                                userId: _order.userId,
                                orderCode: _order.orderCode,
                                bidCode: _order.bidCode,
                                bidWaterCode: _order.bidCode + (new Date()).getTime()
                            };
                            var _sql = zn.sql.insert({ table: 'zn_auction_order_bid', values: _bid });
                            _sql += zn.sql.update({
                                table: 'zn_auction_product',
                                updates: 'priceCount=priceCount+1, currentPrice={0}'.format(_price),
                                where: {
                                   id: _order.productId
                                }
                            });
                            return _sql;

                        }, function (error, data){
                            if(error){
                                response.error(error);
                            }else {
                                response.success(_bid.bidWaterCode);
                            }
                        })
                        .commit();
                }
            },
            getOrderDetail: {
                method: 'GET/POST',
                argv: {
                    orderId: null
                },
                value: function (request, response, chain){
                    var _orderId = request.getValue("orderId");

                    //var _sql = "select *, zn_plugin_admin_convert_var(status) as status_convert from zn_auction_order where id={0};".format(_orderId);
                    var _sql = 'select {0} from {1} where zn_auction_order.id={2};'.format([
                        'zn_auction_order.*',
                        'zn_auction_product.title as product_title',
                        'zn_auction_product.earnestMoney as product_earnestMoney',
                        'zn_auction_product.logo as product_logo',
                        'zn_auction_product.currentPrice as product_currentPrice',
                        'zn_auction_product.beginTime as product_beginTime',
                        'zn_auction_product.endTime as product_endTime'
                    ].join(','), 'zn_auction_order left join zn_auction_product on zn_auction_order.productId=zn_auction_product.id', _orderId);
                    _sql += "select *, zn_plugin_admin_convert_var(status) as status_convert from zn_auction_order_bid where orderId={0};".format(_orderId);
                    this.query(_sql)
                        .then(function (data){
                            response.success(data);
                        }, function (error){
                            response.error(error);
                        });
                }
            },
            getBidOrders: {
                method: 'GET/POST',
                argv: {
                    productId: null
                },
                value: function (request, response, chain){
                    var _sql = "select *, zn_plugin_admin_convert_var(status) as status_convert from zn_auction_order_bid where productId={0} and price<>0 order by zn_create_time desc;".format(request.getValue("productId"))
                    this.query(_sql)
                        .then(function (data){
                            response.success(data);
                        }, function (error){
                            response.error(error);
                        });
                }
            }
        }
    });
});
