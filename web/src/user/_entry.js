require('../../../../../zn/zeanium-react-web/debug.wap.js');
//require('zeanium-react-web');
zn.react.Application.create({
	host: 'http://auction.99zjpm.com',
	home: '/main',
	routers: {
		'/login': './Login.js',
		'/forget': './ForgetPassword.js',
		'/register': './Register.js',
		'/search': './Search.js',
		'/waiting': './Waiting.js',
		'/test': './Test.js',
		'/main': './main/Main.js',
		'/my': './my/My.js',
		'/my/order': './my/Order.js',
		'/my/infoedit': './my/InfoEdit.js',
		'/my/address': './my/Address.js',
		'/my/earnest': './my/Earnest.js',
		'/my/earnestdetail': './my/EarnestDetail.js',
		'/my/remind': './my/Remind.js',
		'/my/gesture': './my/SetGesture.js',
		'/my/collection': './my/Collection.js',
		'/order/protocol': './order/Protocol.js',
		'/order/create': './order/Create.js',
		'/order/info': './order/Info.js',
		'/order/bid': './order/Bid.js',
		'/order/payorder': './order/PayOrder.js',
		'/order/paybid': './order/PayBid.js',
		'/session/info': './main/SessionInfo.js',
		'/product/list': './product/List.js',
		'/product/list/sifa': './product/SiFaPaiMai.js',
		'/product/list/zichan': './product/ZiChanChuZhi.js',
		'/product/list/zhenping': './product/ZhenPingPaiMai.js',
		'/product/info': './product/Info.js',
		'/product/gonggao': './product/GongGao.js',
		'/product/xuzhi': './product/XuZhi.js',
		'/product/help': './product/Help.js',
		'/product/detail': './product/Detail.js',
		'/product/auctionrecords': './product/AuctionRecords.js',
		'/setting/version': './setting/Version.js',
		'/setting/protocol': './setting/Protocol.js'
	},
	onLoading: function (value){
		if(zn.is(value, 'string')){
			return require(value);
		}

		return value;
	}
});
