zn.define(function () {

    return zn.Controller('session',{
        methods: {
            getCurrentSession: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    this.collection('AuctionSession')
                        .select({
                            fields: '*',
                            where: 'status=1 and UNIX_TIMESTAMP(beginTime)<UNIX_TIMESTAMP(now()) and UNIX_TIMESTAMP(endTime)>UNIX_TIMESTAMP(now())'
                        })
                        .then(function (data){
                            response.success(data);
                        }, function (error){
                            response.error(error.message);
                        });
                }
            },
            watchSession: {
                method: 'GET/POST',
                argv: {
                    sessionId: null
                },
                value: function (request, response, chain){
                    var _sql = "select * from zn_auction_product where sessionId={0};";
                    _sql += "update zn_auction_session set watchCount=watchCount+1 where id={0} and status=1;";
                    _sql += "select * from zn_auction_session where id={0};";
                    this.query(_sql.format(request.getValue('sessionId')))
                        .then(function (data){
                            response.success(data);
                        }, function (error){
                            response.error(error.message);
                        });
                }
            },
            getPreviousSession: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    this.collection('AuctionSession')
                        .select({
                            where: 'status=1 and UNIX_TIMESTAMP(beginTime)>UNIX_TIMESTAMP(now())'
                        })
                        .then(function (data){
                            response.success(data);
                        }, function (error){
                            response.error(error.message);
                        });
                }
            }
        }
    });
});
