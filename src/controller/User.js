zn.define(function () {

    return zn.Controller('user',{
        methods: {
            logout: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    request.session.clear();
                    response.success('注销成功');
                }
            },
            gestureValidate: {
                method: 'GET/POST',
                argv: {
                    userId: null,
                    gesture: null
                },
                value: function (request, response, chain){
                    this.query("select * from zn_auction_user where id={0} and gesturePassword='{1}'".format(request.getValue('userId'),request.getValue('gesture')))
                        .then(function (data){
                            var user = data[0];
                            if(user){
                                if(+user.status==32){
                                    response.error('您账户已经被锁定, 请联系售后人员！');
                                }else {
                                    user.password = null;
                                    delete user.password;
                                    request.session.setItem('@AuctionUser', user);
                                    response.success(user);
                                }
                            } else {
                                response.error('用户名或手势密码不对');
                            }
                        }, function (error){
                            response.error(error.message);
                        });
                }
            },
            login: {
                method: 'GET/POST',
                argv: {
                    token: null,
                    password: null
                },
                value: function (request, response, chain){
                    this.query("select * from zn_auction_user where (phone='{0}' or name='{0}' or email='{0}') and password='{1}'".format(request.getValue('token'),request.getValue('password')))
                        .then(function (data){
                            var user = data[0];
                            if(user){
                                if(+user.status==32){
                                    response.error('您账户已经被锁定, 请联系售后人员！');
                                }else {
                                    user.password = null;
                                    delete user.password;
                                    request.session.setItem('@AuctionUser', user);
                                    response.success(user);
                                }
                            } else {
                                response.error('用户名或密码不对');
                            }
                        }, function (error){
                            response.error(error.message);
                        });
                }
            },
            register: {
                method: 'GET/POST',
                argv: {
                    phone: null,
                    password: null
                },
                value: function (request, response, chain){
                    this.beginTransaction()
                        .query(zn.sql.select({
                            table: 'zn_auction_user',
                            fields: '*',
                            where: {
                                phone: request.getValue('phone')
                            }
                        }))
                        .query('Register User', function (sql, data){
                            if(data[0]){
                                return response.error('该手机号已经注册过，请重新输入！'); -1;
                            }else {
                                return zn.sql.insert({
                                    table: 'zn_auction_user',
                                    values: zn.extend(request.getValue(), { status: 31 })
                                });
                            }
                        }, function (error, data){
                            response.success('恭喜您, 成为我们大家庭的一员哦！');
                        }).commit();
                }
            },
            getUser: {
                method: 'GET/POST',
                argv: {
                    userId: null
                },
                value: function (request, response, chain){
                    this.collection('AuctionUser')
                        .selectOne({
                            id: request.getValue("userId")
                        })
                        .then(function (user){
                            if(user){
                                response.success(user);
                            } else {
                                response.error('未查到该用户信息');
                            }
                        }, function (error){
                            response.error(error.message);
                        });
                }
            },
            getSession: {
                validate: true,
                method: 'GET/POST',
                value: function (request, response, chain){
                    response.success(request.session);
                }
            },
            update: {
                method: 'GET/POST',
                argv: {
                    data: null,
                    userId: null
                },
                value: function (request, response, chain){
                    this.collection('User')
                        .update({
                            updates: request.getValue('data'),
                            where: {
                                id: request.getValue('userId')
                            }
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
