var React = require('react');

module.exports = React.createClass({
	getInitialState: function (){
		return {
			value: null
		};
	},
	componentDidMount: function (){
		zn.http.post('/zn.plugin.admin/model/selectOne', {
			model: 'zn_auction_setting', where: { isDefault: 1 }
		}).then(function (data){
			if(data.result && data.result.version){
				this.setState({
					value: data.result.version
				});
			}else {
				this.setState({
					value: '<div style="text-align:center;">暂无版本信息</div>'
				});
			}
		}.bind(this));
	},
	render:function(){
		return (
			<zn.react.Page title="版本信息" >
				{
					this.state.value ? <div style={{ padding: 15 }} dangerouslySetInnerHTML={{ __html: this.state.value }}></div> : <zn.react.DataLoader loader="timer" content="加载中..." />
				}
			</zn.react.Page>
		);
	}
});
