var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		var _sid = this.props.request.search.sid || 0;
    	return {
			sid: _sid,
			info: null,
			bids: []
		};
  	},
	__loadData: function (){
		zn.http.post('/auction/order/getOrderDetail', {
			orderId: this.state.sid
		}).then(function (data){
			data = data.result;
			this.setState({
				info: data[0][0],
				bids: data[1]
			});
		}.bind(this));
	},
	componentDidMount: function (){
		this.__loadData();
	},
	__onRemove: function (data){
		var _self = this;
		zn.confirm('确定删除该数据吗？', '提示', function (){
			zn.http.post('/zn.plugin.admin/model/delete', {
				model: _self.props.model,
				where: { id: data.id }
			}).then(function (data){
				zn.toast.success('删除成功！');
				_self.state.data.refresh();
			});
		});
	},
	render: function(){
		var item = this.state.info;
		if(!item){
			return (
				<zn.react.Page title="保证金详情" className="rt-earnest-detail" >
					<zn.react.DataLoader loader="timer" content="加载数据中..." />
				</zn.react.Page>
			);
		}
		return (
			<zn.react.Page
				title="保证金详情"
				bStyle={{backgroundColor:'#f3f3f3'}}
				className="auction-earnest-detail" >
				<div className="info" onClick={()=>zn.react.session.jump('/product/info', { productId: item.productId })}>
					<img className="icon" src={zn.http.fixURL(item.product_logo)} />
					<div className="fields">
						<div className="title">{item.product_title}</div>
						<div className="field">订单编号 <span>{item.orderCode}</span></div>
						<div className="field">拍卖编号 <span>{item.bidCode}</span></div>
					</div>
				</div>
				<ul className="bids">
					<li>
						<div>在 {item.zn_create_time} 提交保证金 <span className="price">￥{item.product_earnestMoney}</span></div>
					</li>
					{
						this.state.bids.map(function (bid, index){
							return <li key={index}>
								<div>
									<div>加价：{bid.increasePrice}</div>
									<div>出价：<span className="price">{bid.price}</span></div>
									<div>时间：{bid.createTime}</div>
								</div>
								<div className="status"><span>{bid.status_convert}</span></div>
							</li>;
						})
					}
				</ul>
			</zn.react.Page>
		);
	}
});
