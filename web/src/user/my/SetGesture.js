var React = require('react');

module.exports = React.createClass({
	getDefaultProps: function (){
		return {

		};
	},
	getInitialState: function() {
    	return {
			status: -1
		};
  	},
	__onReset: function (){
		this.refs.linelock.reset();
		this.setState({
			status: -1
		});
	},
	__getStatus: function (){
		switch (this.state.status) {
			case -1:
				return '';
			case 0:
				return 'error';
			case 1:
				return 'ok';
		}
	},
	__getStatusText: function (){
		switch (this.state.status) {
			case -1:
				return '绘制设置手势';
			case -2:
				return '再绘制一次';
			case 0:
				return '手势错误';
			case 1:
				return '设置成功';
		}
	},
	__onLockChange: function (value){
		if(value.boolValue){
			if(value.value){
				zn.http.post('/zn.plugin.admin/model/update', {
					model: 'zn_auction_user',
					updates: { gesturePassword: value.value },
					where: { id: this.props.request.search.uid }
				}).then(function (data){
					this.setState({
						status: 1
					});
					zn.react.session.back();
				}.bind(this));
			}
		}else {
			if(value.value){
				this.setState({
					status: -2
				});
			}else {
				this.setState({
					status: 0
				});
			}
		}
	},
	render:function(){
		return (
			<zn.react.Page title="设置手势">
				<div className="lock-login">
					<div className={"tips " + this.__getStatus()}>
						{this.__getStatusText()}
					</div>
					<a className="reset" onClick={()=>this.__onReset()} >重置密码</a>
					<zn.react.LineLock ref="linelock" onChange={this.__onLockChange} />
				</div>
				<div className="copy-right">
					<a>上海沪春互联网有限公司 @2016-2017</a>
				</div>
			</zn.react.Page>
		);
	}
});
