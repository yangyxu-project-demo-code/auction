var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			order: null
		};
  	},
	componentDidMount: function(){
		this.__loadInfo();
	},
	__loadInfo: function () {
		zn.http.post('/auction/order/getOrderByCode', {
			orderCode: this.props.request.search.orderCode
		}).then(function (data){
			if(data.status==200){
				this.setState({
					order: data.result
				});
			}else {
				zn.alert('亲，不好意思，请求出错：' + data.result);
			}
		}.bind(this));
	},
	__renderBids: function (_order){
		var _bids = _order.bids || [];
		return (
			<div className={"bids warp status-" + _order.status}>
				<div className="header">
					<span>出价记录</span>
					<span className="times">{_bids.length}次</span>
				</div>
				<div className="bid-list">
					{
						_bids.map(function (){

						})
					}
				</div>
				{_order.status>0?<a className="bid" href={"#/order/bid?orderCode="+_order.orderCode}>去出价</a>:null}
			</div>
		);
	},
	__renderEarnest: function (_order){
		return (
			<div className={"earnest warp status-" + _order.status}>
				<div className="header">
					<span>保证金 (￥{(_order.earnest).price()})</span>
					<span className="status">{_order.status?'已支付':'未支付'}</span>
				</div>
				<a className="pay" href={_order.payEarnestLink}>去支付</a>
				<div className="pay-info">
					<div>创建时间：{_order.zn_create_time}</div>
				</div>
			</div>
		);
	},
	__renderContent: function(){
		if(!this.state.order){
			return <zn.react.DataLoader loader="timer" content="正在加载中..." />;
		}
		var _order = this.state.order,
			_product = _order.product,
			_address = _order.address;
		return (
			<div className="">
				<div className="info warp">
					<div>订单编号：{_order.orderCode}</div>
					<div>创建时间：{_order.zn_create_time}</div>
					<div>拍卖号：{_order.bidCode}</div>
				</div>
				<div className="product warp">
					<div className="p1">
						<img className="logo" src={zn.http.fixURL(_product.logo)} />
						<div className="details">
							<div className="header">{_product.zn_title}</div>
							<div>起拍价：￥{(_product.beginPrice||0).price()}</div>
							<div>加价幅度：￥{(_product.increaseStep||0).price()}</div>
						</div>
					</div>
					<div className="p2">
						<div>当前价：￥{(Math.max(_product.currentPrice, _product.beginPrice)||0).price()}</div>
						<div>预估结束时间：{_product.endTime}</div>
					</div>
				</div>
				<div className="address warp">
					<div className="header">地址</div>
					<div>
						<span>{_address.name}</span> <span>{_address.phone}</span>
					</div>
					<div>
						<span>{_address.province_convert}</span> <span>{_address.city_convert}</span> <span>{_address.area_convert}</span>
					</div>
				</div>
				{this.__renderEarnest(_order)}
				{this.__renderBids(_order)}
			</div>
		);
	},
	render: function (){
		return (
			<zn.react.Page onBack="/main" title="订单详情" className="auction-order-info" >
				{this.__renderContent()}
			</zn.react.Page>
		);
	}
});
