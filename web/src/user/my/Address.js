var React = require('react');

module.exports = React.createClass({
	getDefaultProps: function (){
		return {
			model: 'AuctionUserAddress'
		};
	},
	getInitialState: function() {
		var _uid = this.props.request.search.uid || 0;
		this._cityDS = zn.store.post('/zn.plugin.admin/var/getByPid', { pid: -1 });
		this._areaDS = zn.store.post('/zn.plugin.admin/var/getByPid', { pid: -1 });
    	return {
			userId: _uid,
			data: zn.store.post('/zn.plugin.admin/model/paging', {
				model: this.props.model,
				where: { userId: _uid }
			}),
			formItems: [
				{ title:
					'是否默认',
					name: 'isDefault',
					type: 'Radio',
					data: [{text:'是', value: 1}, {text:'否', value: 0}]
				},
				{ title: '收货人姓名', name: 'name', type: 'Input', required: true },
				{ title: '手机号码', name: 'phone', type: 'Input', required: true },
				{
					title:'省份',
					name: 'province',
					type: 'Select',
					data: zn.store.post('/zn.plugin.admin/var/getByPid', { pid: 3 }),
					onChange: function (data){
						if(data){
							this._cityDS.extend({
								pid: data.value
							}).exec();
						}
					}.bind(this)
				},
				{
					title: '城市',
					name: 'city',
					type: 'Select',
					data: this._cityDS,
					onChange: function (data){
						if(data){
							this._areaDS.extend({
								pid: data.value
							}).exec();
						}
					}.bind(this)
				},
				{ title: '地区', name: 'area', type: 'Select', data: this._areaDS, },
				{ title: '邮政编码', name: 'postcode', type: 'Input' },
				{ title: '详细地址', name: 'address', type: 'Textarea', required: true }
			]
		};
  	},
	__onRemove: function (data){
		var _self = this;
		zn.confirm('确定删除该数据吗？', '提示', function (){
			zn.http.post('/zn.plugin.admin/model/delete', {
				model: _self.props.model,
				where: {
					id: data.id
				}
			}).then(function (data){
				zn.toast.success('删除成功！');
				_self.state.data.refresh();
			});
		});
	},
	__itemRender: function (item, index){
		return (
			<div className={"address-item " + (+item.isDefault?'rt-curr-style':'')} >
				<div className="info">
					<span>{item.name}</span>
					<span>{item.phone}</span>
				</div>
				<div className="address">
					<span>{item.province_convert}</span>
					<span>{item.city_convert}</span>
					<span>{item.area_convert}</span>
					<span>{item.address}</span>
				</div>
				<div className="action">
					<span onClick={()=>this.__onEdit(item)}><i className="fa fa-edit" /></span>
					<span onClick={()=>this.__onRemove(item)}><i className="fa fa-remove" /></span>
				</div>
			</div>
		);
	},
	__onEdit: function (data){
		zn.dialog({
			title: '更新地址',
			content: <zn.react.Form
				action='/zn.plugin.admin/model/update'
				merge="updates"
				exts={{model: this.props.model, where: { id: data.id }}}
				value={data}
				onSubmitSuccess={this.__doSuccess}
				btns={[{text: '更新', icon: 'fa-edit', type: 'submit', float: 'right', style: { marginRight:0 }},{text:'取消', type:'cancle', status: 'danger', float: 'right'}]}
				items={this.state.formItems} />
		});
	},
	__doSuccess: function (){
		zn.modal.close();
		zn.toast.success('操作成功');
		this.state.data.refresh();
		return false;
	},
	__onAdd: function (){
		zn.dialog({
			title: '添加地址',
			content: <zn.react.Form
				action='/zn.plugin.admin/model/insert'
				exts={{model: this.props.model}}
				merge="values"
				hiddens={{ userId: this.state.userId }}
				onSubmitSuccess={this.__doSuccess}
				items={this.state.formItems} />
		});
	},
	__onData: function (){

	},
	render:function(){
		return (
			<zn.react.Page title="我的地址" height={this.props.request.search.height} >
				<zn.react.ActivityLayout
					direction="top-bottom"
					className="auction-address"
					hStyle={{backgroundColor: '#FAFAFA'}}
					end={40}>
					<zn.react.PagingList onData={this.__onData} data={this.state.data} itemRender={this.__itemRender} />
					<zn.react.Button onClick={this.__onAdd} text="添加新地址" style={{margin: 5}} />
				</zn.react.ActivityLayout>
			</zn.react.Page>
		);
	}
});
