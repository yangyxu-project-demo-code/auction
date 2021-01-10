var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			items: [
				{ type: 'Input', name: 'phone', placeholder: '手机号', icon: 'fa-mobile', required: true },
				{ type: 'Input', name: 'email', placeholder: '邮箱', icon: 'fa-envelope-o', required: true },
				{ type: 'Input', attrs: { type: 'password' }, name: 'password', icon: 'fa-unlock-alt', placeholder: '0~10为数字或字母密码', required: true }
			]
		};
  	},
	__onBack: function (){
		var _url = '/main/GoodThing';
		if(this.props.request.search.forward){
			_url = this.props.request.search.forward;
		}
		if(_url=='/main/My'&&!zn.react.session.getKeyValue('WAP_LOGIN_USER_TOKEN')){
			_url = '/main/GoodThing';
		}
		return zn.react.session.jump(_url), false;
	},
	render: function(){
		return (
			<zn.react.Page
				bStyle={{backgroundColor: '#FFF'}}
				title="账号注册" >
				<div className="rt-login-page" style={{padding:10}} >
					<div className="form-login">
						<img className="logo" src="./images/logo/logo_72.png" />
						<zn.react.Form ref="form"
							items={this.state.items}
							btns={[{text:'注册', type: 'submit'}]}
							onSubmitSuccess={()=>{
								zn.toast.success("恭喜您，注册成功!");
								zn.react.session.jump('/login');
							}}
							onSubmitError={(error)=>alert(error.result)}
							action="/auction/user/register" />
						<div className="links">
							<a href="#/login" >{'去登陆'}</a>
							<a href="#/forget" >{'忘记密码'}</a>
						</div>
					</div>
					<div className="copy-right">
						<a>上海沪春互联网有限公司 @2016-2017</a>
					</div>
				</div>
			</zn.react.Page>
		);
	}
});
