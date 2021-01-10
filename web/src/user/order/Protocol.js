var React = require('react');

module.exports = React.createClass({
	getInitialState: function (){
		return {
			value: null
		}
	},
	componentDidMount: function(){
		this.__loadData();
	},
    __loadData: function (){
		zn.http.post('/zn.plugin.admin/model/selectOne', {
			model: 'zn_auction_setting',
			where: { isDefault: 1 }
		}).then(function (data){
			if(data.result && data.result.protocol){
				this.setState({
					value: data.result.protocol
				});
			}else {
				this.setState({
					value: '<div style="text-align:center;">暂无竞拍服务协议</div>'
				});
			}
		}.bind(this));
    },
	__onNext: function (){
		var _token = zn.react.session.jsonKeyValue('WAP_LOGIN_USER_TOKEN');
		if(!_token){
			return zn.react.session.jump('/login', { forward: this.props.path});
		}else {
			zn.react.session.jump('/order/create', { productId: this.props.request.search.pid });
		}
	},
	__renderFooter: function (){
		if(this.state.value){
			return <div className="action">
				<div className="apply" onClick={this.__onNext}>
					<span>我同意以上协议，下一步</span>
				</div>
			</div>;
		}
	},
	__renderData: function () {
		return <div style={{padding: 5}} dangerouslySetInnerHTML={{ __html: this.state.value }}></div>;
	},
	render:function(){
		return (
			<zn.react.Page
				className="rt-product-info"
				bStyle={{backgroundColor: '#f6f6f6'}}
				footerView={this.__renderFooter()}
				end={(this.state.value?45:0)}
				title="竞拍服务协议" >
				{
					!!this.state.value?this.__renderData():<UI.DataLoader loader="timer" content="加载中..." />
				}
			</zn.react.Page>
		);
	}
});
