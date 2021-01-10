var React = require('react');

module.exports = React.createClass({
	componentDidMount: function(){
		this.__loadInfo();
	},
	__loadInfo: function () {
		if(this.state.userId&&this.state.productId){
			zn.http.post('/auction/order/getBidInfo', {
				userId: this.state.userId,
				productId: this.state.productId
			}).then(function (data){
				data = data.result;
				this.setState({
					addressList: data[0],
					data: data[1]
				});
			}.bind(this));
		}else {
			zn.toast.error('亲，不好意思，您请求页面出错了~~');
		}
	},
	getInitialState: function() {
		var _search = this.props.request.search;
    	return {
			userId: _search.userId,
			productId: _search.productId,
			data: null
		};
  	},
	render:function(){
		if(!this.state.data){
			return <zn.react.DataLoader loader="timer" content="正在努力加载数据中..." />;
		}
		return (
			<zn.react.ActivityLayout
				direction="top-bottom"
				className="rt-order-create"
				hStyle={{backgroundColor: '#e9e9e9'}}
				end={40}>
				<div className="container">
					<div className="part part-1">
						<div className="p11">
							<span>保证金</span>
							<div>￥<span>{this.state.data.earnestMoney}</span></div>
						</div>
						<div className="p12"><i className="fa fa-info-circle" />竞拍不成功时, 缴纳的保证金将退回到原支付渠道</div>
					</div>
					<div className="part part-2">
						<div>
							<div>改拍品需缴纳保证金{this.state.data.earnestMoney}。</div>
							<div>建议您使用支付宝支付。</div>
						</div>
					</div>
					<div className="part part-3">
						<div>支付方式：竞拍成功后，尾款至线下门店支付；生成的订单在已经购买到的拍品中展示。</div>
					</div>

					<div className="part part-4">
						<div>收货人</div>
					</div>
					<div className="part part-4">
						<div>为保证竞拍成功后拍品顺利送达，请确认您的收货地址</div>
					</div>
				</div>
				<zn.react.Button onClick={this.__onAdd} text="报名，提交保证金" style={{margin: 5}} />
			</zn.react.ActivityLayout>
		);
	}
});
