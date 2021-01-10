var React = require('react');
module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			model: 'AuctionSession'
		};
	},
	getInitialState: function () {
		return {
			data: zn.store.post('/zn.plugin.admin/model/paging', {
				model: this.props.model
			}),
			items: [
				{ title: '操作', width: 60, textAlign: 'center' },
				{ title: '标题', name: 'zn_title', width: 250, filter: { type: 'Input', opts: ['like'] } },
				{ title: '小标题', name: 'alias', width: 260 },
				{ title: '状态', name: 'status', width: 100, filter: { type: 'Menu', data: [{ text:'上线中', value: 1 }, { text: '已下线', value: 0 }], opts: ['='] } },
				{ title: '首页展示', name: 'isAdv', width: 100, filter: { type: 'Menu', data: [{ text:'是', value: 1 }, { text: '否', value: 0 }], opts: ['='] } },
				{ title: '类型', name: 'typeId_convert', width: 100, filter: { type: 'Menu', popoverWidth: 100, textKey: 'title', valueKey: 'id', data: Store.post('/auction/product/getAllTypes', {}), opts: ['='] } },
				{ title: '围观量', name: 'watchCount', width: 80 },
				{ title: '开始时间', name: 'beginTime', width: 130 },
				{ title: '结束时间', name: 'endTime', width: 130 },
				{ title: '创建时间', name: 'zn_create_time', width: 130 },
				{ title: '描述', name: 'zn_note' }
			],
			formItems: [
				{ title: '宣传图片', name: 'img', type: 'ImageUploader', action: '/auction/uploadFiles' },
				{ title: '名称', name: 'zn_title', type: 'Input' },
				{ title: '别名', name: 'alias', type: 'Input' },
				{ title: '状态', name: 'status', type: 'Select', data: [{ text: '上架', value: 1 }, { text: '下架', value: 0 }] },
				{ title: '首页展示', name: 'isAdv', type: 'Select', data: [{ text: '是', value: 1 }, { text: '否', value: 0 }] },
				{ title: '类型', type: 'Radio', data: Store.post('/zn.plugin.admin/model/select', { model: 'zn_auction_product_type', fields: 'id as value, zn_title as text' }), name: 'typeId' },
				{ title: '开始时间', name: 'beginTime', type: 'Timer' },
				{ title: '结束时间', name: 'endTime', type: 'Timer' },
				{ title: '图片', name: 'imgs', type: 'FileUploader', action: '/auction/uploadFiles' },
				{ title: '视频', name: 'videos', type: 'FileUploader', action: '/auction/uploadFiles' },
				{ title: '描述', name: 'description', type: 'RichEditor' },
				{ title: '说明', name: 'zn_note', type: 'Textarea' }
			],
			toolbarItems: [
				{ text: '添加', name: 'add', icon: 'fa-plus' }
			]
		}
	},
	__doSuccess: function (){
		this.state.data.refresh();
	},
	__addItem: function (pid){
		zn.dialog({
			title: '添加专场',
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
			title: '更新专场信息',
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
		var _self = this;
		switch (value.item.icon) {
			case 'fa-remove':
				zn.confirm('确定删除该数据吗？','提示', function (){
					zn.http.post('/zn.plugin.admin/model/delete', {
						model: _self.props.model,
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
								{ text:'删除', icon: 'fa-remove' },
								{ text:'编辑', icon: 'fa-edit' },
							]}
							itemRender={(item, index)=>{return <i title={item.text} className={'fa '+item.icon} style={item.style} />}}
							onClick={(value)=>this.__onRowActions(value, data)} />;
			case 1:
				return <a style={{textDecoration:'underline'}} href={zn.react.session.relativeURL('/product.session.info', { id: data.id })} >{value}</a>;
			case 3:
				return data.status==0?<span style={{color: 'red'}}>已下架</span>:<span style={{color: 'green'}}>上架中</span>;
			case 4:
				return data.isAdv==0?<span style={{color: 'red'}}>否</span>:<span style={{color: 'green'}}>是</span>;
		}
	},
	__onTableRowClick: function (event, data, row, table){
		this._currItem = data;
	},
	render:function(){
		return (
			<zn.react.Page title='拍卖专场管理' icon="fa-calendar-minus-o" toolbarItems={this.state.toolbarItems} onToolbarClick={this.__onToolbarClick} >
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
