var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		var _token = zn.react.session.jsonKeyValue('WAP_LOGIN_USER_TOKEN'),
			_uid = _token.id;
    	return {
			status: 1,
			userId: _uid,
			tabItems: [
				{ text: '参拍中', status: 1 },
				{ text: '已结束', status: 3 },
				{ text: '已拍下', status: 2 }
			],
			data: Store.post('/auction/my/pagingOrder', {
				userId: _uid,
				status: 1
			})
		};
  	},
	fireClick: function (index){
		var _data = this.state.tabItems[index];
		if(_data){
			this.setState({
				status: _data.status
			});
			this.state.data.extend({
				status: _data.status,
				pageIndex: 1
			}).exec();
		}
	},
	__deleteProduct: function (item){
		var _self = this;
		zn.alert.show({
			title: '提示',
			content: '确定删除该提醒吗？',
			onConfirm: function (){
				var _token = zn.react.session.jsonKeyValue('WAP_LOGIN_USER_TOKEN');
				zn.http.post('/auction/product/notify', {
					cancle: 1,
                    userId: _token.id,
                    productId: item.id
				}).then(function (data){
					zn.toast.success('删除成功！');
					if(_self._data){
						_self._data.refresh();
					}
				});
			}
		});
	},
	__itemRender: function (item, index){
		return <div key={index} className="product">
			<div className="title">
				<span>订单编号 {item.orderCode}</span>
			</div>
			<div className="info" onClick={()=>zn.react.session.jump('/product/info', { productId: item.productId })}>
				<img className="icon" src={zn.http.fixURL(item.product_logo)} />
				<div className="fields">
					<div>{item.productTitle}</div>
					<div>
						<div>拍卖编号 {item.bidCode}</div>
						<div>当前价 <span className="price">￥{item.price}</span></div>
					</div>
				</div>
			</div>
			<div className="order">
				<span className="time">{item.createTime}</span>
				<span className="delete" onClick={()=>this.__deleteProduct(item)}>删除</span>
			</div>
		</div>;
	},
	render: function(){
		return (
			<zn.react.Page
				title="我的订单"
				className="rt-order"
				bStyle={{ backgroundColor: '#f6f6f6' }}
				height={this.props.request.search.height} >
				<zn.react.FixedLayout
					direction="v"
					begin={35}
					unit="px"
					hStyle={{ borderBottom: '1px solid #eee' }} >
					<div className="header">
						{
							this.state.tabItems.map(function (item, index){
								return <div key={index} className={(this.state.status==item.status?'curr':'')} onClick={()=>this.fireClick(index)}>{item.text}</div>;
							}.bind(this))
						}
					</div>
					<div className="body">
						<zn.react.PagingList className="data-list" onData={this.__onData} data={this.state.data} itemRender={this.__itemRender} />
					</div>
				</zn.react.FixedLayout>
			</zn.react.Page>
		);
	}
});
