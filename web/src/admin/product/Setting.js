var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			toolbarItems: [{icon:'fa-edit', text: '修改信息', onClick: this.__onEdit}],
			info: null,
			formItems: [
				{ title: 'host', name: 'host', type: 'Textarea' },
				{ title: 'port', name: 'port', type: 'Input' },
				{ title: '服务热线', name: 'hotPhone', type: 'Input' },
				{ title: '状态', name: 'status', type: 'Select', data: [{ text: '设置默认', value: 1 }, { text: '取消默认', value: 0 }] },
				{ title: '版本信息', name: 'version', type: 'RichEditor' },
				{ title: '拍卖协议', name: 'protocol', type: 'RichEditor' }
			]
		}
	},
	componentDidMount: function (){
		this.__loadUserInfo();
	},
	__doSuccess: function (){
		zn.modal.close();
		zn.toast.success('修改成功');
		this.__loadUserInfo();
	},
	__onEdit: function (data){
		zn.dialog({
			title: '修改',
			content: <zn.react.Form
				action='/zn.plugin.admin/model/update'
				exts={{ model: 'zn_auction_setting', where: { id: this.state.info.id } }}
				merge="updates"
				value={zn.store.post('/zn.plugin.admin/model/selectOne', { model: 'zn_auction_setting', where: { id: this.state.info.id } })}
				onSubmitSuccess={this.__doSuccess}
				btns={[{text: '修改', icon: 'fa-edit', type: 'submit', float: 'right', style: { marginRight:0 }},{text:'取消', type:'cancle', status: 'danger', float: 'right'}]}
				items={this.state.formItems} />
		});
	},
	__loadUserInfo: function (){
		zn.http.post('/zn.plugin.admin/model/selectOne', {
			model: 'zn_auction_setting',
			where: { id: this.props.id }
		}).then(function (data){
			this.setState({
				info: data.result,
			});
		}.bind(this));
	},
	render:function(){
		if(!this.state.info){
			return null;
		}
		return (
			<zn.react.Page title='版本设置' toolbarItems={this.state.toolbarItems} >
				<div className="product-info">
					<div className="rt-card">
						<div className="card-header">版本信息</div>
						<div className="card-body">
							<div dangerouslySetInnerHTML={{ __html: this.state.info.version }}></div>
						</div>
					</div>

					<div className="rt-card">
						<div className="card-header">拍卖规则及协议</div>
						<div className="card-body">
							<div dangerouslySetInnerHTML={{ __html: this.state.info.protocol }}></div>
						</div>
					</div>
				</div>
			</zn.react.Page>
		);
	}
});
