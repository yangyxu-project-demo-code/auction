var React = require('react');
module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			data: null,
			model: 'AuctionProduct'
		};
	},
	componentWillReceiveProps: function (nextProps){
		if(nextProps.data!==this.props.data){
			this.state.data._data.where = {
				typeId: nextProps.data.id
			};
			this.state.data.exec();
		}
	},
	getInitialState: function () {
		var _where = {};
		if(this.props.data){
			_where.typeId = this.props.data.id;
		}
		this._cityData = zn.store.post('/zn.plugin.admin/var/getByPid', { pid: -1 });

		return {
			data: zn.store.post('/zn.plugin.admin/model/paging', {
				model: this.props.model,
				where: _where
			}),
			items: [
				{ title: '操作', width: 60, textAlign: 'center' },
				{ title: '商品名称', name: 'zn_title', width: 280, filter: { type: 'Input', opts: ['like'] } },
				{ title: '状态', name: 'status', width: 100, filter: { type: 'Menu', data: [{ text:'上线中', value: 1 }, { text: '已下线', value: 0 }], opts: ['='] } },
				{ title: '别名', name: 'alias', width: 120 },
				{ title: '类型', name: 'typeId_convert', width: 70 },
				{ title: '当前价', name: 'currentPrice', width: 100 },
				{ title: '保留价', name: 'reservePrice', width: 100 },
				{ title: '起拍价', name: 'beginPrice', width: 100 },
				{ title: '成交价', name: 'endPrice', width: 100 },
				{ title: '佣金', name: 'brokerage', width: 100 },
				{ title: '预估价', name: 'evaluatePrice', width: 100 },
				{ title: '加价幅度', name: 'increaseStep', width: 100 },
				{ title: '保证金', name: 'earnestMoney', width: 100 },
				{ title: '单位', name: 'unit', width: 100 },
				{ title: '围观/次', name: 'watchCount', width: 100 },
				{ title: '报名/人', name: 'applyCount', width: 100 },
				{ title: '设置提醒/人', name: 'notifyCount', width: 100 },
				{ title: '开始时间', name: 'beginTime', width: 130 },
				{ title: '结束时间', name: 'endTime', width: 130 },
				{ title: '修改时间', name: 'zn_modify_time', width: 130 },
				{ title: '创建时间', name: 'zn_create_time', width: 130 },
				{ title: '描述', name: 'zn_note' }
			],
			formItems: [
				{ title: 'Logo', name: 'logo', type: 'ImageUploader', action: '/auction/uploadFiles' },
				{ title: '名称', name: 'zn_title', type: 'Textarea' },
				{ title: '别名', name: 'alias', type: 'Input' },
				{
					title: '省',
					name: 'province',
					type: 'Select',
					data: zn.store.post('/zn.plugin.admin/var/getByPid', { pid: 19 }),
					onChange: function (data){
						if(data){
							this._cityData.extend({
								pid: data.value
							}).exec();
						}
					}.bind(this)
				},
				{ title: '城市', name: 'city', type: 'Select', data: this._cityData },
				{ title: '地址', name: 'address', type: 'Textarea' },
				{ title: '状态', name: 'status', type: 'Select', data: [{ text: '上架', value: 1 }, { text: '下架', value: 0 }] },
				{ title: '拍卖/变卖', name: 'auctionType', type: 'Select', data: zn.store.post('/zn.plugin.admin/var/getByPid', { pid: 20 }) },
				{ title: '购买方式', name: 'buyMethod', type: 'Select', data: zn.store.post('/zn.plugin.admin/var/getByPid', { pid: 21 }) },
				{ title: '类型', name: 'vars', type: 'CheckboxGroup', data: zn.store.post('/zn.plugin.admin/var/getByPid', { pid: 18 }) },
				{ title: '开始时间', name: 'beginTime', type: 'Timer' },
				{ title: '结束时间', name: 'endTime', type: 'Timer' },
				{ title: '起拍价', name: 'beginPrice', type: 'Input', attrs: { type:'number' }, suffix: '￥' },
				{ title: '保留价', name: 'reservePrice', type: 'Input', attrs: { type:'number' }, suffix: '￥' },
				{ title: '预估价', name: 'evaluatePrice', type: 'Input', attrs: { type:'number' }, suffix: '￥' },
				{ title: '加价幅度', name: 'increaseStep', type: 'Input', attrs: { type:'number' }, suffix: '￥' },
				{ title: '保证金', name: 'earnestMoney', type: 'Input', attrs: { type:'number' }, suffix: '￥' },
				{ title: '佣金', name: 'brokerage', type: 'Input' },
				{ title: '延时周期', name: 'delayPeriod', type: 'Input', attrs: { type:'number' }, suffix: '秒' },
				{ title: '单位', name: 'unit', type: 'Input', placeholder: '个/套/件/品' },
				{ title: '图片', name: 'imgs', type: 'FileUploader', action: '/auction/uploadFiles' },
				{ title: '视频', name: 'videos', type: 'FileUploader', action: '/auction/uploadFiles' },
				{ title: '拍品参数', name: 'argv', type: 'RichEditor' },
				{ title: '竞买公告', name: 'gongGao', type: 'RichEditor' },
				{ title: '竞买须知', name: 'xuZhi', type: 'RichEditor' },
				{ title: '竞买帮助', name: 'bangZhu', type: 'RichEditor' },
				{ title: '描述', name: 'zn_note', type: 'RichEditor' }
			],
			toolbarItems: [
				{ text: '添加', icon: 'fa-plus' }
			]
		}
	},
	__onRowActions: function (value, data){
		var _data = this.state.data;
		switch (value.item.icon) {
			case 'fa-remove':
				zn.confirm('确定删除该数据吗？', '提示', function (){
					zn.http.post('/zn.plugin.admin/model/delete', {
						model: 'AuctionProduct',
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
								{ text:'删除商品', icon: 'fa-remove' },
								{ text:'修改商品', icon: 'fa-edit' }
							]}
							itemRender={(item, index)=>{return <i title={item.text} className={'fa '+item.icon} style={item.style} />}}
							onClick={(value)=>this.__onRowActions(value, data)} />;
			case 1:
				return <a style={{textDecoration:'underline'}} href={zn.react.session.relativeURL('/product.info', { id: data.id })} >
					<img style={{width: 24, height: 24, borderRadius: '50%', position: 'relative', top: 8, marginRight: 3}} src={zn.http.fixURL(data.logo)} />
					{value}
				</a>;
			case 2:
				return +value==1?<span style={{color:'green'}}>上架中</span>:<span style={{color:'red'}}>已下架</span>;
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
				return (value||'0')+'￥';
		}
	},
	__updateItem: function (data){
		zn.dialog({
			title: '修改商品信息',
			content: <zn.react.Form
				action='/zn.plugin.admin/model/update'
				exts={{ model: 'zn_auction_product', where: { id: data.id } }}
				merge="updates"
				value={zn.store.post('/zn.plugin.admin/model/selectOne', { model: 'AuctionProduct', where: { id: data.id }})}
				onSubmitSuccess={this.__doSuccess}
				items={this.state.formItems} />
		});
	},
	__doSuccess: function (){
		this.state.data.refresh();
	},
	__addItem: function (pid){
		if(!this.props.data){
			zn.toast.warning('请先选择左边商品类型项');
			return false;
		}
		zn.dialog({
			title: '添加商品',
			content: <zn.react.Form
				action='/zn.plugin.admin/model/insert'
				exts={{model: this.props.model}}
				hiddens={{ typeId: this.props.data.id }}
				merge="values"
				onSubmitSuccess={this.__doSuccess}
				items={this.state.formItems} />
		});
	},
	__onToolbarClick: function (rtitem){
		switch (rtitem.icon) {
			case 'fa-plus':
				this.__addItem();
				break;
		}
	},
	render: function(){
		return (
			<zn.react.Page title='商品列表' icon="fa-list-ul"
				onToolbarClick={this.__onToolbarClick}
				toolbarItems={this.state.toolbarItems} >
				<zn.react.PagerView
					view="Table"
					checkbox={0}
					enableFilter={true}
					showHeader={true}
					data={this.state.data}
					columnRender={this.__onTableColumnRender}
					onTableRowClick={this.__onTableRowClick}
					items={this.state.items}/>
			</zn.react.Page>
		);
	}
});
