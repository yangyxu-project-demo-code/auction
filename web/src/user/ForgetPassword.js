var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			items: [
				{ type: 'Input', name: 'phone', placeholder: '注册手机号', icon: 'fa-mobile', required: true }
			]
		};
  	},
	render:function(){
		return (
			<zn.react.Page
				onBack={()=>zn.react.session.jump('/main')}
				bStyle={{backgroundColor: '#FFF'}}
				title="找回密码" >
				<div className="rt-login-page" style={{padding:10}} >
					<div className="form-login">
						<img className="logo" src="./images/logo/logo_72.png" />
						<zn.react.Form ref="form"
							items={this.state.items}
							btns={[{text:'找回密码', type: 'submit'}]}
							onSubmitSuccess={()=>n.react.session.jump('/login')}
							onSubmitError={(error)=>zn.toast.error(error.result)}
							action="/klproject/kylinuser/login" />
							<div className="links">
								<a href="#/login" >{'登陆'}</a>
								<a href="#/register" >{'注册'}</a>
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
