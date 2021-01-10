zn.define({
    host: '0.0.0.0',
    port: 8989,
    catalog: '/',
    node_paths: ['../../zn/'],
    node_modules: ['zn-plugin-admin','zn-plugin-alipay'],
    databases: {
        'youyangit': {
            default: true,
            type: 'mysql',
            user: 'root',
            port: 3306,
            host: '0.0.0.0',
            password: '',
            database:''
        },
        'huchun': {
            type: 'mysql',
            user: 'root',
            port: 3306,
            host: '0.0.0.0',
            password: '',
            database:''
        }
    },
    alipay: {
        partner: '', // 合作身份者ID，以2088开头由16位纯数字组成的字符串
        app_id: "2017062907601660",
        sign_type: 'RSA2',
        charset: 'utf8',
        alipay_public_key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2nFasV25jaHAAU0WKENxxD7M+Qa7VITCVGY4zEshfPODLtabMxEUMQxnqaWtiuZt77tveBPl5tRLaoE3rEPI+IY7i+sfvnXUysaxpJoCK+QBUAnEZ5Mv2cnLjB66PoNyZRR1mkdkL8zo2bdGRroj4EYIbCtfjEHQqtfwX83CV0eDTGns+v0tbnUcY05aeBO8BBI96tRfs0tRnwWEKgFh/9hFvaU1nGZv2qqKL9zmWTWNMr0f0YJl5SLXVGTZr2H6LrYFtdcHtcPhDha+gWlcZSk+c0JMNVPUEFZMEw+sbqGT4Mt/YHyJEbtRN4wMNbjVaMl5TqzcJW1KlswKub36SwIDAQAB',
        merchant_private_key: './alipay_key/rsa_private_key.pem'
    }
});
