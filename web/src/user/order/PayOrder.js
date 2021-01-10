var React = require('react');

module.exports = React.createClass({
	getInitialState: function (){
		return {
			url: null
		}
	},
	componentDidMount: function (){
		zn.http.post('/auction/order/getOrderPayLink', {
			orderCode: this.props.request.search.orderCode
		}).then(function (data){
			if(data.status==200){
				this.setState({
					url: data.result
				});
			}
		}.bind(this));
	},
	render:function(){
		return (
			<zn.react.Page
				title="支付订单" >
				{this.state.url?<iframe src={this.state.url} style={{width: '100%', height: '100%'}} type="text/html" frameborder="0" allowfullscreen />:<zn.react.DataLoader loader="timer" content="正在加载中..." />}
			</zn.react.Page>
		);
	}
});
