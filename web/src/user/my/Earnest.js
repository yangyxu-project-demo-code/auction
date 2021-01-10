var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		var _uid = this.props.request.search.uid || 0;
    	return {
			userId: _uid,
			data: zn.store.post('/auction/my/getMyBooking', {
				userId: _uid
			})
		};
  	},
	__itemRender: function (item, index){
		return (
			<div className="product">
				<div className="title">
					<span>订单编号 {item.orderCode}</span>
					<span>{item.zn_create_time}</span>
				</div>
				<div className="info" onClick={()=>zn.react.session.jump('/product/info', { productId: item.productId })}>
					<img className="icon" src={zn.http.fixURL(item.product_logo)} />
					<div className="fields">
						<div>{item.product_title}</div>
						<div>
							<div>拍卖编号 {item.bidCode}</div>
							<div>保证金 <span className="price">￥{item.product_earnestMoney}</span></div>
						</div>
					</div>
				</div>
				<div className="order">
					<span className="time">将于 {item.endTime} 结束</span>
					<span className="delete" onClick={()=>zn.react.session.jump('/my/earnestdetail', { sid: item.id })}>查看明细</span>
				</div>
			</div>
		);
	},
	render: function(){
		return (
			<zn.react.Page title="我的保证金" className="rt-remind" height={this.props.request.search.height} >
				<zn.react.PagingList className="data-list" onData={this.__onData} data={this.state.data} itemRender={this.__itemRender} />
			</zn.react.Page>
		);
	}
});
