var React = require('react');
module.exports = React.createClass({
	getDefaultProps: function (){
		return {
			height: 30
		};
	},
	getInitialState: function (){
		return {
			value: null
		};
	},
	componentDidMount: function (){
		zn.http.post('/auction/order/getBidOrders', {
			productId: this.props.request.search.pid
		}).then(function (data){
			//alert(JSON.stringify(data));
			this.setState({
				value: data.result
			});
		}.bind(this));
	},
	__renderContent: function(){
		if(!this.state.value){
			return <zn.react.DataLoader loader="timer" content="加载中..." />;
		}
		return (
			<zn.react.FixedLayout
				direction="top-bottom"
				className="rt-auction-records"
				begin={this.props.height}
				hStyle={{ height: this.props.height }}
				bStyle={{ borderTop: '1px solid #eee', width: 'auto' }} >
				<ul className="header item">
					<li>状态</li>
					<li>竞买号</li>
					<li>价格</li>
					<li>时间</li>
				</ul>
				<div className="body">
					{
						this.state.value.map(function (item, index){
							return <ul key={index} className="item">
								<li>{item.status==1?'领先':'出局'}</li>
								<li>{item.bidCode}</li>
								<li>￥{item.price}</li>
								<li>{item.zn_create_time}</li>
							</ul>;
						})
					}
				</div>
			</zn.react.FixedLayout>
		);
	},
	render: function (){
		return (
			<zn.react.Page title="出价记录">
				{this.__renderContent()}
			</zn.react.Page>
		);
	}
});
