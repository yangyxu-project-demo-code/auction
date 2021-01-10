var React = require('react');
var ProductList = require('./List.js');
module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			model: 'AuctionProductType',
			title: '商品管理',
			leftWidth: 16,
			pid: 0,
			fields: [
				{ title: 'Logo', name: 'img', type: 'ImageUploader', action: '/auction/uploadFiles' },
				{ title: '名称', type: 'Input', name: 'zn_title', required: true },
				{ title: '别名', type: 'Input', name: 'alias' },
				{ title: '图标', type: 'Input', name: 'icon' },
				{ title: '链接', type: 'Input', name: 'href' },
				{ title: '属性集', type: 'TreeListView',  disabled: false, cascade: false, enableCheckbox: true, activeAll: false, data: zn.store.post('/zn.plugin.admin/model/select', { model: 'ZNPluginAdminVar', where: { zn_tree_pid: 16 } }), name: 'vars' },
				{ title: '图片', name: 'imgs', type: 'FileUploader', action: '/auction/uploadFiles' },
				{ title: '扩展', type: 'Textarea', name: 'zn_tree_extend' },
				{ title: '描述', type: 'Textarea', name: 'zn_note' }
			]
		};
	},
	__rightRender: function (tree){
		var _currItem = tree.state.currItem;
		return <ProductList data={_currItem?_currItem.props.data:null} />;
	},
	__itemContentRender: function (item){
		//console.log(item);
		return <div style={{ display: 'inline-flex', lineHeight: '40px', position: 'relative', top: 8 }}>
			<img style={{width: 32, height: 32, margin: 5}} src={zn.http.fixURL(item.data.img)} />
			<span>{item.data.zn_title}</span>
		</div>
	},
	render:function(){
		return (
			<zn.plugin.admin.TreeModelView itemContentRender={this.__itemContentRender} {...this.props} rightRender={this.__rightRender} />
		);
	}
});
