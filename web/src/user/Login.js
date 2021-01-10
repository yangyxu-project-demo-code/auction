var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			items: [
				{ type: 'Input', name: 'token', placeholder: '用户名/手机号/邮箱', icon: 'fa-user', required: true, error: '用户名不能为空' },
				{ type: 'Input', attrs: { type: 'password' }, name: 'password', icon: 'fa-unlock-alt', placeholder: '0~10为数字或字母密码', required: true, error: '密码不能为空' }
			],
			status: -1
		};
  	},
	componentDidMount: function (){
		var _url = '/main';
		var _paths = window.location.hash.split('?forward=');
		if(_paths.length>1){
			_url = _paths[1];
		}
		if(zn.react.session.getKeyValue('WAP_LOGIN_USER_TOKEN')){
			zn.react.session.jump(_url);
		}
	},
	__onLoginSuccess: function (data){
		var _user = data;
		var _url = '/main';
		var _paths = window.location.hash.split('?forward=');
		if(_paths.length>1){
			_url = _paths[1];
		}
		localStorage.setItem('ZN_GESTURE_PASSWORD', _user.gesturePassword);
		localStorage.setItem('ZN_TOKEN', _user.id);
		zn.react.session.reset().setKeyValue('WAP_LOGIN_USER_TOKEN', JSON.stringify(_user)).jump(_url);
	},
	__onLoginError: function (error){
		if(error.status){
			zn.toast.error(error.result);
		}else {
			zn.toast.error('服务器正在维护中, 请稍后。');
		}
	},
	__formLogin: function (){
		return (
			<div className="form-login">
				<img className="logo" src="./images/logo/logo_04.png" />
				<zn.react.Form ref="form"
					items={this.state.items}
					buttons={[{text:'登录', type: 'submit'}]}
					buttonsClassName="equal"
					onSubmitSuccess={(data)=>this.__onLoginSuccess(data.result)}
					onSubmitError={(error)=>this.__onLoginError(error)}
					action="/auction/user/login" />
				<div className="links">
					<a href="#/register" >立即注册</a>
					<a href="#/forget" >忘记密码</a>
				</div>
			</div>
		);
	},
	__onReset: function (){
		localStorage.removeItem('ZN_GESTURE_PASSWORD');
		this.forceUpdate();
		//this.refs.linelock.reset();
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
				return '绘制手势解锁';
			case 0:
				return '验证失败';
			case 1:
				return '验证成功';
		}
	},
	__lockLogin: function (value){
		//绘制图案解锁
		return (
			<div className="lock-login">
				<div className={"tips " + this.__getStatus()}>
					{this.__getStatusText()}
				</div>
				<a className="reset" onClick={()=>this.__onReset()} >重置密码</a>
				<zn.react.LineLock ref="linelock" value={value} onChange={this.__onLockChange} />
			</div>
		);
	},
	__onLockChange: function (value){
		var token = localStorage.getItem('ZN_TOKEN');
		this.setState({
			status: value.boolValue?1:0
		});
		if(value.boolValue){
			zn.http.post('/auction/user/gestureValidate', {
				userId: token,
				gesture: value.value
			}).then(function (data){
				this.__onLoginSuccess(data.result);
			}.bind(this));
		}
	},
	__onBack: function (){
		if(zn.react.main){
			zn.react.main.reset()
		}
		if(zn.react.router){
			zn.react.router.back();
		}else {
			zn.react.session.jump('/main');
		}
		return false;
	},
	render: function(){
		var _gesture = localStorage.getItem('ZN_GESTURE_PASSWORD');
		return (
			<zn.react.Page
				icon="fa-remove"
				onBack={this.__onBack}
				bStyle={{backgroundColor: '#FFF'}}
				title="账号登录" >
				<div className="rt-login-page" style={{padding:10}}>
					{(_gesture&&_gesture!='undefined')?this.__lockLogin(_gesture):this.__formLogin()}
					<div className="copy-right">
						<a>上海沪春互联网有限公司 @2016-2017</a>
					</div>
				</div>
			</zn.react.Page>
		);
	}
});
