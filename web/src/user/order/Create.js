var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		var _search = this.props.request.search;
		var _token = zn.react.session.jsonKeyValue('WAP_LOGIN_USER_TOKEN');
    	return {
			userId: _token.id,
			productId: _search.productId,
			addressId: null,
			addressList: [],
			data: null
		};
  	},
	componentDidMount: function(){
		this.__loadInfo();
	},
	__loadInfo: function () {
		if(this.state.userId&&this.state.productId){
			zn.http.post('/auction/order/getBidInfo', {
				userId: this.state.userId,
				productId: this.state.productId
			}).then(function (data){
				if(data.status==200){
					data = data.result;
					if(data[2]){
						if(data[2].status){
							console.log('xxxx');
							zn.react.session.jump('/order/bid', { orderCode: data[2].orderCode });
						}else {
							zn.react.session.jump('/order/info', { orderCode: data[2].orderCode });
						}
					}else {
						this.setState({
							addressList: data[0],
							data: data[1]
						});
					}
				}else {
					zn.alert('亲，不好意思，请求出错：' + data.result);
				}
			}.bind(this));
		}else {
			zn.alert('亲，不好意思，您请求页面出错了~~');
			window.history.back();
		}
	},
	__isCurr: function (item, index){
		if(this.state.addressId === item.id){
			return true;
		}
		return false;
	},
	__onSubmit: function (event, btn){
		if(!this.state.addressId){
			return zn.toast.error('请选择地址');
		}
		btn.loading(true);
		zn.http.post('/auction/order/create', {
			userId: this.state.userId,
			productId: this.state.productId,
			addressId: this.state.addressId
		}).then(function (data){
			if(data.status!=200){
				zn.toast.error(data.result);
				btn.loading(false);
			}else {
				var _order = data.result;
				window.location.href = _order.payEarnestLink;
				//zn.react.session.jump('/order/paybid', { bidCode: data.result });
			}
		}, function (data){
			zn.toast.error(data);
			btn.loading(false);
		});
	},
	__renderContent: function(){
		if(!this.state.data){
			return <zn.react.DataLoader loader="timer" content="正在加载中..." />;
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
							<div>该拍品需缴纳保证金{this.state.data.earnestMoney}。</div>
							<div>建议您使用支付宝支付。</div>
						</div>
					</div>
					<div className="part part-3">
						<div>支付方式：竞拍成功后，尾款至线下门店支付；生成的订单在已经购买到的拍品中展示。</div>
					</div>
					<ul className="part part-4">
						{
							this.state.addressList.map(function (item, index){
								if(!this.state.addressId&&item.isDefault>0){
									this.state.addressId = item.id;
								}
								return <li key={index} onClick={()=>this.setState({ addressId: item.id })} className={this.__isCurr(item, index)?'rt-curr-style':''}>
									<div>
										<span>收货人：{item.name}</span>
										<span>{item.phone}</span>
									</div>
									<div>
										<span>地址：{item.province_convert}</span>
										<span>{item.city_convert}</span>
										<span>{item.area_convert}</span>
										<span>{item.address}</span>
									</div>
								</li>;
							}.bind(this))
						}
					</ul>
					<div className="part part-4">
						<div>为保证竞拍成功后拍品顺利送达，请确认您的收货地址</div>
					</div>
				</div>
				<zn.react.Button onClick={this.__onSubmit} text="报名，提交保证金" style={{margin: 5}} />
			</zn.react.ActivityLayout>
		);
	},
	render: function (){
		return (
			<UI.Page title="提交订单" >
				{this.__renderContent()}
			</UI.Page>
		);
	}
});
