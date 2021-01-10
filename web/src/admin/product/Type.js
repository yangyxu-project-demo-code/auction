var React = require('react');
var InfoPanel = React.createClass({
	getInitialState: function (){
		return {
			formItems: [
				{ title: 'Logo', name: 'logo', type: 'ImageUploader', action: '/auction/uploadFiles' },
				{ title: '名称', name: 'zn_title', type: 'Input' },
				{ title: '别名', name: 'alias', type: 'Input' },
				{ title: '状态', name: 'status', type: 'Select', data: [{ text: '上架', value: 1 }, { text: '下架', value: 0 }] },
				{ title: '当前价', name: 'currentPrice', type: 'Input' },
				{ title: '原价', name: 'price', type: 'Input' },
				{ title: '单位', name: 'unit', type: 'Input' },
				{ title: '省', name: 'province', type: 'Input' },
				{ title: '城市', name: 'city', type: 'Input' },
				{ title: '图片', name: 'imgs', type: 'FileUploader', action: '/auction/uploadFiles' },
				{ title: '视频', name: 'videos', type: 'FileUploader', action: '/auction/uploadFiles' },
				{ title: '描述', name: 'zn_note', type: 'Textarea' }
			]
		}
	},
	render: function (){
		return (
			<zn.react.Form
				action='/znadmin/model/update'
				exts={{ model: 'AuctionProductType', where: { id: this.props.id } }}
				merge="updates"
				value={this.state.info}
				items={this.state.formItems} />
		);
	}
});


module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			model: 'AuctionProductType',
			title: '商品分类管理',
			leftWidth: 16,
			pid: 0,
			fields: [
				{ title: 'Logo', name: 'img', type: 'ImageUploader', action: '/auction/uploadFiles' },
				{ title: '名称', type: 'Input', name: 'zn_title' },
				{ title: '别名', type: 'Input', name: 'alias' },
				{ title: '图标', type: 'Input', name: 'icon' },
				{ title: '图片', name: 'imgs', type: 'FileUploader', action: '/auction/uploadFiles' },
				{ title: '扩展', type: 'Textarea', name: 'zn_extend' },
				{ title: '描述', type: 'Textarea', name: 'zn_note' }
			]
		};
	},
	__rightRender: function (treeModel){
		return <InfoPanel treeModel={treeModel} />;
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
