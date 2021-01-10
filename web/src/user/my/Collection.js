var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		var _uid = this.props.request.search.uid || 0;
    	return {
			userId: _uid,
			data: zn.store.post('/auction/my/pagingCollection', {
				userId: _uid
			}),
			count: 0
		};
  	},
	__deleteProduct: function (data){
		var _self = this;
		zn.confirm('确定取消收藏吗？', '提示', function (){
			zn.http.post('/auction/product/collect', {
				cancle: 1,
				userId: _self.state.userId,
				productId: data.id
			}).then(function (data){
				zn.toast.success('取消成功！');
				_self.state.data.refresh();
			});
		});
	},
	__itemRender: function (item, index){
		return (
			<div className="product">
				<div className="info" onClick={()=>zn.react.session.jump('/product/info', { productId: item.id })}>
					<img className="icon" src={zn.http.fixURL(item.logo)} />
					<div className="fields">
						<div>{item.zn_title}</div>
						<div>当前价 <span className="price">￥{Math.max(item.currentPrice, item.beginPrice)}</span></div>
					</div>
				</div>
				<div className="order">
					<span className="time">将于 {item.endTime} 结束</span>
					<span className="delete" onClick={()=>this.__deleteProduct(item)}>取消</span>
				</div>
			</div>
		);
	},
	__onData: function (data){
		this.setState({
			count: data.result[1][0].count
		});
	},
	render: function(){
		return (
			<zn.react.Page title={"我的收藏 ("+this.state.count+")"} className="rt-remind" height={this.props.request.search.height} >
				<zn.react.PagingList className="data-list" onData={this.__onData} data={this.state.data} itemRender={this.__itemRender} />
			</zn.react.Page>
		);s
	}
});
