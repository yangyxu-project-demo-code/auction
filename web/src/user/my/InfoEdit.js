var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			data: null,
			items: [
				{ type: 'ImageUploader', action: '/auction/uploadFiles', name: 'avatarImage', placeholder: '选择图片', title: '头像' },
				{ type: 'Input', name: 'name', placeholder: '请输入真实姓名', title: '姓名' },
				{ type: 'Input', name: 'password', attrs: { type: 'password' }, placeholder: '请输入密码', title: '密码' },
				{ type: 'Input', name: 'phone', title: '联系方式' },
				{ type: 'Input', name: 'email', placeholder: '请输入常用邮箱', title: '邮箱' },
				{ type: 'Select', name: 'sex', data: [{text:'男',value:'男'},{text:'女',value:'女'}], placeholder: '请选择性别', title: '性别' },
				{ type: 'Input', name: 'age', attrs: { type: 'number' }, placeholder: '请输入年龄', title: '年龄' },
				{ type: 'Textarea', name: 'address', placeholder: '联系地址', title: '联系地址' }
			]
		};
  	},
	componentDidMount: function(){
		var _user = zn.react.session.jsonKeyValue('WAP_LOGIN_USER_TOKEN');
		zn.http.post('/zn.plugin.admin/model/selectOne', {
			model: 'AuctionUser',
			where: { id: _user.id }
		}).then(function (data){
			this.setState({data: data.result});
		}.bind(this));
	},
	render: function(){
		return (
			<zn.react.Page title="编辑个人信息">
				{
					this.state.data?<zn.react.Form
						items={this.state.items}
						merge="updates"
						exts={{model: 'AuctionUser', where: { id: this.state.data.id }}}
						value={this.state.data}
						btns={[{text:'确认修改', icon: 'fa-edit', type: 'submit'}]}
						onSubmitSuccess={()=>zn.toast.success('修改成功!')}
						onSubmitError={(error)=>zn.toast.error(error.result)}
						action="/zn.plugin.admin/model/update" />: <zn.react.DataLoader loader="timer" content="加载中..." />
				}
			</zn.react.Page>
		);
	}
});
