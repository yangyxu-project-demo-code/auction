require('../../../../../zn/zeanium-react-web/debug.web.js');
zn.react.Application.create({
	host: 'http://auction.99zjpm.com',
	plugins: [
		require('../../../../../zn/zn-plugin-admin/debug.js')
	],
	home: '/zn.plugin.admin/login',
	main: '/zn.plugin.admin/main/znpluginadmin.my.info',
	path: '/zn.plugin.admin/main',
	routers: {
		'/auction.setting': './product/Setting.js',
		'/user.list': './user/List.js',
		'/user.info': './user/UserInfo.js',
		'/user.center': './user/Center.js',
		'/product.info': './product/Info.js',
		'/product.manager': './product/Manager.js',
		'/product.type': './product/Type.js',
		'/product.session': './product/Session.js',
		'/product.session.info': './product/SessionInfo.js'
	},
	onLoading: function (value){
		if(zn.is(value, 'string')){
			return require(value);
		}

		return value;
	}
});
