var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			data: null,
			images: []
		};
  	},
	componentDidMount: function(){
		this.__loadDetail();
	},
	__loadDetail: function () {
		var _orderCode = this.props.request.search.orderCode;
		if(_orderCode){
			zn.http.post('/auction/order/getOrderByCode', {
				orderCode: _orderCode
			}).then(function (data){
				this.setState({
					data: data.result
				});
			}.bind(this));
		}else {
			alert('亲，不好意思，您请求页面出错了~~');
			window.history.back();
		}
	},
	__onButtonClick: function (item){
		switch (item.name) {
			case 'accept':
				zn.http.post('/zn.plugin.admin/model/updateNode', {
					model: 'zn_kylin_project_item',
					data: { status: 24 },
					where: { id: this.state.data.id }
				}).exec().then(function (data){
					this.__loadDetail();
				}.bind(this))
				break;
			case 'reject':
				if (window.confirm("你确认放弃该订单吗?")) {
					Store.post('/zn.plugin.admin/model/updateNode', {
						model: 'zn_kylin_project_item',
						data: { status: 40, workerId: 0 },
						where: { id: this.state.data.id }
					}).exec().then(function (data){
						alert('处理成功');
						zn.react.session.jump('/user/MyOrder');
					}.bind(this));
				}
				break;
			case 'finish':
				if (window.confirm("你确认放弃该订单吗?")) {
					Store.post('/klproject/projectitem/finishTask', {
						id: this.state.data.id,
						projectId: this.state.data.projectId
					}).exec().then(function (data){
						this.__loadDetail();
						alert('确认成功');
					}.bind(this));
				}
				break;
		}
	},
	render:function(){
		if(!this.state.data){
			return <div>正在加载中...</div>;
		}
		return (
			<UI.Page title={(this.state.data.product.title||'')} >
				<div>
					<ul>
						<li>订单编号</li>
					</ul>
				</div>
			</UI.Page>
		);
	}
});
