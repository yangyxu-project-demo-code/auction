var React = require('react');

module.exports = React.createClass({
	getInitialState: function (){
		return {
			value: null
		};
	},
	componentDidMount: function (){
		zn.http.post('/zn.plugin.admin/model/selectOne', {
			model: 'zn_auction_product',
			where: { id: this.props.request.search.pid }
		}).then(function (data){
			if(data.result && data.result.note){
				this.setState({
					value: data.result.note
				});
			}else {
				this.setState({
					value: '<div style="text-align:center;"></div>'
				});
			}
		}.bind(this));
	},
	render:function(){
		if(!this.state.value){
			return <zn.react.DataLoader loader="timer" content="加载中..." />;
		}
		return (
			<div style={{ padding: 15 }} dangerouslySetInnerHTML={{ __html: this.state.value }}></div>
		);
	}
});
