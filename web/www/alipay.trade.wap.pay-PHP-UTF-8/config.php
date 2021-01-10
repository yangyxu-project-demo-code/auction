<?php

$pk = "MIIEpAIBAAKCAQEAvEHUDTqnWua5tFlvTV1b8MxTJ7oQ1Tvhggzsdxb8eHklSubso0q79M/smIMd0huTw2Xt8thXp6QQZjD6tS3M+wdrpzn0gMxwfVsY0Q8N2H+7muuyGfXiEmpmk9oFl9oegYruEkfJ4WsXS/7P1yEGD5uOtLMz75/azO3DSaQtW5N4USmb9Vornnao/ggAy4iLfMQlv5+fl4bpLCDQfWJr8FNLegZaHOze5Sim9CkRyHt/btShAWHCSeef9Mn3+P5/5KNd7GNlqqSLDgdbP4jYv208oK1BUwSb7HMUhzmTC+FWQawjn38rWEkor8BCj19hDXdsa5ShNhvS0d7+BGKEHQIDAQABAoIBAQC49aAmgzsL12Ya6EevZgs/0S/d9zQ0nEmaYaIt+zqADt5x8eILKRDznRliWmgBFzEdKFcZYi70uP+Xt4WKXn5nIEpHmWw84x+eOdNvCvBahlzG/80TLn44A6vWlb0rDZUtR1dSRI/3ViUkeCyxu3NeAEK8DNj5FEB/WRamkpQxxEkdu1RigzsmRJcYtXrNPkQp3W41+k8W5xrhmzdSSzsvxWWDE3urx0jom/c+5S0l13wNvN35HdLLz4Yjp5jOeO4UU/ZH367XtEH/7qrVP23ghcoMc0L9KC703HAGHX4GIECvG3CMxDGyNYhrAXA9lwd6bgwGL3C0gTkUQOwbqfBhAoGBAOQtx/6txqf8C8aFijEUTZlChQ8FKbcoOWeOye/SNIIBxFuatnc4xQfY+dmujnp+zBDkRDvrA33tOYrhJxhTmzqeMgtyyZG5G1G7SvYbUHY4bPs0bM0s64jjhHChKuH9fIoGvp7F1fYY85kM9Z1jyOhgZVlRIQVk0eV846rMZYQFAoGBANM19WdUAZcqbYj7PQsDLzAjgZuwyQnUuLctnjdfI6qJhKV7idvjhQjqugc3XFpj0OB+6UONIJEAbW1xYSa3wNHeGswyIaXDPK6tWLS43R14pUUx6cJGuhheyvERQbqWe0INd7ZdTUbj+wZdNgkVNvWrpSmsV85byo4PpawXmNM5AoGAdc15AnBfLpz+y1hoVxxfT6+7GF0XA1t9/4wFj44b077rzEtcxsKFXp7Tp2HqZy2NV28yFyknHV1bJutFDtcjPiksNyLlFBnYE+M5OUQyz0YkZbDUNz1owLyNxMRAano/UNdYlIoZA7wwD6VULRS2Rdp2mJ09ChbaErveonByPK0CgYEAyYKeq0HT7qS1Ms75M4uLNvN5UdB+TlndDi+A1zV3MtrXaocORXOyVoqUiBQCkd7Px5Bt/1wjaRSuUo+s8CK63cB5cr6VqbA3MjUDABGsLNURYY44h3mxTVULbKpZOqsd2Cw/PgeQlgUnV7AQwOOztvpXrwXWFHUxMQ6usx0kWskCgYAVZZ0m/VL2rtQP7oVGEIXWAYWTeD8rG14yFJ2BGj/3I5/BG0F4LJ2VkgpAgoKDzgMXt51etQm5JrAc6VeZ7r6mbADvv8+Evk9EHZF+aXbWZlRSI/IF8QNOswQzGk04Tq6OBXjLPftzJ8oXP9dFhdmKhEdoKVHiBADky5Lw1LrNWw==";

$config = array (
		//应用ID,您的APPID。
		'app_id' => "2017062907601660",

		//商户私钥，您的原始格式RSA私钥
		'merchant_private_key' => $pk,

		//异步通知地址
		'notify_url' => "http://app.99zjpm.com/alipay.trade.wap.pay-PHP-UTF-8/notify_url.php",

		//同步跳转
		'return_url' => "http://app.99zjpm.com/alipay.trade.wap.pay-PHP-UTF-8/return_url.php",

		//编码格式
		'charset' => "UTF-8",

		//签名方式
		'sign_type'=>"RSA2",

		//支付宝网关
		'gatewayUrl' => "https://openapi.alipay.com/gateway.do",

		//支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
		'alipay_public_key' => "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2nFasV25jaHAAU0WKENxxD7M+Qa7VITCVGY4zEshfPODLtabMxEUMQxnqaWtiuZt77tveBPl5tRLaoE3rEPI+IY7i+sfvnXUysaxpJoCK+QBUAnEZ5Mv2cnLjB66PoNyZRR1mkdkL8zo2bdGRroj4EYIbCtfjEHQqtfwX83CV0eDTGns+v0tbnUcY05aeBO8BBI96tRfs0tRnwWEKgFh/9hFvaU1nGZv2qqKL9zmWTWNMr0f0YJl5SLXVGTZr2H6LrYFtdcHtcPhDha+gWlcZSk+c0JMNVPUEFZMEw+sbqGT4Mt/YHyJEbtRN4wMNbjVaMl5TqzcJW1KlswKub36SwIDAQAB",


);
