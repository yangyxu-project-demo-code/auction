var React = require('react');
module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			model: 'AuctionUser'
		};
	},
	getInitialState: function () {
		return {
			data: zn.store.post('/zn.plugin.admin/model/paging', {
				model: this.props.model
			}),
			items: [
				{ title: '操作', width: 60, textAlign: 'center' },
				{ title: '手机号', name: 'phone', width: 140, filter: { type: 'Input', opts: ['like'] } },
				{ title: '用户名', name: 'name', width: 120, filter: { type: 'Input', opts: ['like'] } },
				{ title: '邮箱', name: 'email', width: 140 },
				{ title: '状态', name: 'status_convert', width: 80 },
				{ title: '性别', name: 'sex', width: 60 },
				{ title: '年龄', name: 'age', width: 60 },
				{ title: '注册时间', name: 'zn_create_time', width: 140 },
				{ title: '介绍', name: 'zn_note' }
			],
			formItems: [
				{ title: '头像', name: 'avatarImage', type: 'ImageUploader', action: '/auction/uploadFiles' },
				{ title: '姓名', name: 'name', type: 'Input', required: true },
				{ title: '手机号', name: 'phone', type: 'Input' },
				{ title: '邮箱', name: 'email', type: 'Input' },
				{ title: '附件', name: 'imgs', type: 'Textarea' }
			],
			toolbarItems: [
				{ text: '添加', name: 'add', icon: 'fa-plus' }
			]
		}
	},
	__doSuccess: function (){
		this.state.data.refresh();
	},
	__addItem: function (){
		zn.dialog({
			title: '添加用户',
			content: <zn.react.Form
				action='/zn.plugin.admin/model/insert'
				exts={{model: this.props.model}}
				merge="values"
				onSubmitSuccess={this.__doSuccess}
				items={this.state.formItems} />
		});
	},
	__updateItem: function (data){
		zn.dialog({
			title: '更新用户信息',
			content: <zn.react.Form
				action='/zn.plugin.admin/model/update'
				exts={{model: this.props.model, where: { id: data.id }}}
				merge="updates"
				value={data}
				onSubmitSuccess={this.__doSuccess}
				items={this.state.formItems} />
		});
	},
	__onToolbarClick: function (item){
		switch (item.name) {
			case 'add':
				this.__addItem();
				break;
		}
	},
	__onRowActions: function (value, data){
		var _data = this.state.data;
		switch (value.item.icon) {
			case 'fa-remove':
				zn.confirm('确定删除该数据吗？', '提示', function (){
					zn.http.post('/zn.plugin.admin/model/delete', {
						model: 'zn_auction_user',
						where: {
							id: data.id
						}
					}).then(function (data){
						zn.toast.success('删除成功！');
						_data.refresh();
					});
				});
				break;
			case 'fa-edit':
				this.__updateItem(data);
				break;
		}
	},
	__onTableColumnRender: function (rowIndex, columnIndex, data, item, value){
		switch (columnIndex) {
			case 0:
				return <zn.react.ListView
						className="rt-flex"
						data={[
							{ text:'删除用户', icon: 'fa-remove' },
							{ text:'编辑用户', icon: 'fa-edit' },
						]}
						itemRender={(item, index)=>{return <i title={item.text} className={'fa '+item.icon} style={item.style} />}}
						onClick={(value)=>this.__onRowActions(value, data)}
						/>;
			case 1:
				return <a style={{textDecoration:'underline'}} href={zn.react.session.relativeURL('/user.center', {id: data.id})} >{value}</a>;
		}
	},
	__onTableRowClick: function (event, data, row, table){
		this._currItem = data;
	},
	render:function(){
		return (
			<zn.react.Page title='注册用户信息管理' icon="fa-newspaper-o" toolbarItems={this.state.toolbarItems} onToolbarClick={this.__onToolbarClick} >
				<zn.react.PagerView
					view="Table"
					enableFilter={true}
					checkbox={0}
					showHeader={true}
					data={this.state.data}
					columnRender={this.__onTableColumnRender}
					onTableRowClick={this.__onTableRowClick}
					items={this.state.items}/>
			</zn.react.Page>
		);
	}
});
