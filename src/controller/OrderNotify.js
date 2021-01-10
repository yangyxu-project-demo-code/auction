zn.define(function () {

    return zn.Controller('order_notify', {
        methods: {
            bid: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    var _values = request.getValue();
                    var _temp = {
                        gmt_create: '2017-07-29 00:30:31',
                        charset: 'utf-8',
                        seller_email: 'caoxianzhi96@163.com',
                        subject: '拍品保证金',
                        sign: 'UF3nEiVjx34NNl/WuKGQJ4bS4t/odQal2/ctshi9FXmOPRus5S/3VAqt2HCgk1vfAaPGiLeywnrEwrd6L7wyvNmPdJ7pXLc8i9vpteM/5Hs9CExc5ocvoSQUv30xtV2L50qW0C/Y/MAaEo6MvDF3iPSI4DMrcgeHVSzMUF1CT6o4mrCdF3ZIXlz0aClXLeYX+96XwcvCLcAOlyy4ZeQGTR9c4DrIamOwoA6tpBjDdCUG3HhO66RRMfgjV4ueQWdkw3t6L80tbNUcfD7dLAaqRBlkHKL8bpkBJPhvpMU0Z6hU5tjeEkTsiXb+yC8hAFIqxC3s4hr79HO4wbEXmpn22A==',
                        buyer_id: '2088702372045381',
                        invoice_amount: '0.01',
                        notify_id: '9ca5df4f6c8ab92399257030c77de48ixm',
                        fund_bill_list: '[{"amount":"0.01","fundChannel":"ALIPAYACCOUNT"}]',
                        notify_type: 'trade_status_sync',
                        trade_status: 'TRADE_SUCCESS',
                        receipt_amount: '0.01',
                        app_id: '2017062907601660',
                        buyer_pay_amount: '0.01',
                        sign_type: 'RSA2',
                        seller_id: '2088721402073532',
                        gmt_payment: '2017-07-29 00:30:32',
                        notify_time: '2017-07-29 00:30:33',
                        version: '1.0',
                        out_trade_no: '2501239330378898',
                        total_amount: '0.01',
                        trade_no: '2017072921001004380265517107',
                        auth_app_id: '2017062907601660',
                        buyer_logon_id: '136****8576',
                        point_amount: '0.00'
                    };
                    var _self = this,
                        _order = null;
                    this.beginTransaction()
                        .query(this.collection('zn_auction_order').selectSql({ where: { bidCode: _values.out_trade_no } }))
                        .query('Update Product And Order: ', function (sql, data){
                            _order = data[0];
                            if(!_order){
                                return response.error('订单不存在'), -1;
                            }
                            if(_order.status > 1){
                                return response.error('该订单保证金已经支付过'), -1;
                            }

                            return zn.sql.update({
                                table: 'zn_auction_order',
                                updates: "status=1, payEarnestTime=now(), payBidInfo='"+JSON.stringify(_values)+"'",
                                where: {
                                    orderCode: _order.orderCode
                                }
                            }) + zn.sql.update({
                                table: 'zn_auction_product',
                                updates: 'applyCount=applyCount+1',
                                where: {
                                    id: _order.productId
                                }
                            });
                        }, function (err, data){
                            if(err){
                                response.error(err);
                            }else {
                                response.success(data);
                            }
                        })
                        .commit();
                }
            },
            order: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    var _values = request.getValue(),
                        _order = null;
                    this.beginTransaction()
                        .query(this.collection('zn_auction_order').selectSql({ where: { orderCode: _values.out_trade_no } }))
                        .query('Update Product And Order: ', function (sql, data){
                            _order = data[0];
                            if(!_order){
                                return response.error('订单不存在'), -1;
                            }
                            if(_order.status > 1){
                                return response.error('该订单已经支付过'), -1;
                            }

                            var _sql = "update zn_auction_order set status = 2, payOrderInfo='{0}' where orderCode = '{0}';".format(JSON.stringify(_values), _order.orderCode);
                            /*
                            _sql += zn.sql.update({
                                table: 'zn_auction_order_bid',
                                updates: "status=-1, payTime=now(), payInfo='"+JSON.stringify(_values)+"'",
                                where: {
                                    bidWaterCode: _order.bidWaterCode
                                }
                            });

                             + zn.sql.update({
                                table: 'zn_auction_product',
                                updates: 'priceCount=priceCount+1, currentPrice={0}',
                                where: {
                                    id: _order.productId
                                }
                            });*/

                            return _sql;
                        }, function (err, data){
                            if(err){
                                response.error(err);
                            }else {
                                response.success(data);
                            }
                        })
                        .commit();
                }
            }
        }
    });
});
