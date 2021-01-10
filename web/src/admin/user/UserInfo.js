var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			info: null,
		}
	},
	componentDidMount: function (){
		this.__loadUserInfo();
	},
	__loadUserInfo: function (){
		zn.http.post('/znadmin/model/selectOne', {
			model: 'AuctionUser',
			where: { id: this.props.userId }
		}).then(function (data){
			this.setState({
				info: data.result
			});
		}.bind(this));
	},
	render:function(){
		if(!this.state.info){
			return null;
		}
		return (
			<div className="user-info">
				<div className="info-form user-item">
					<img className="avatar" src={zn.http.fixURL(this.state.avatarImage)} />
					<div className="details">
						<span className="last-logintime">最近一次登录时间：{this.state.info.lastLoginTime||'还未登陆'}</span>
						<div className="name">{this.state.info.name}</div>
						<div><i className="fa fa-clock-o" />注册时间：{this.state.info.zn_create_time}</div>
						<div><i className="fa fa-envelope" />邮箱：{this.state.info.email}</div>
						<div><i className="fa fa-phone" />手机号：{this.state.info.phone}</div>
						<div>{this.state.info.zn_note}</div>
					</div>
				</div>
			</div>
		);
	}
});
