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
			if(data.result && data.result.gongGao){
				this.setState({
					value: data.result.gongGao
				});
			}else {
				this.setState({
					value: '<div style="text-align:center;">暂无竞拍公告</div>'
				});
			}
		}.bind(this));
	},
	renderContent: function(){
		if(!this.state.value){
			return <zn.react.DataLoader loader="timer" content="加载中..." />;
		}
		return (
			<div style={{ padding: 15 }} dangerouslySetInnerHTML={{ __html: this.state.value }}></div>
		);
	},
	render: function(){
		if(this.props.request.search.page){
			return <zn.react.Page
				bStyle={{backgroundColor: '#f6f6f6'}}
				title="竞拍公告" >
				{this.renderContent()}
			</zn.react.Page>
		}else {
			return this.renderContent();
		}
	}
});
