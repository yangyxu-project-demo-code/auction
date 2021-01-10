var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		var _uid = this.props.request.search.uid || 0;
    	return {
			currIndex: 0,
			tabItems: [
				{ text: '拍品提醒', url: '/auction/my/pagingProductNotify' },
				{ text: '专场提醒', url: '/auction/my/pagingSessionNotify' }
			],
			userId: _uid,
			data: null
		};
  	},
	componentDidMount: function (){
		this.fireClick(0);
	},
	fireClick: function (index){
		var _data = this.state.tabItems[index];
		if(_data){
			this.setState({
				currIndex: index,
				data: Store.post(_data.url, { userId: this.state.userId })
			});
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
					if(_self.state.data){
						_self.state.data.refresh();
					}
				});
			}
		});
	},
	__renderProduct: function (item, index){
		return <div key={index} className="product">
			<div className="info" onClick={()=>zn.react.session.jump('/product/info', { productId: item.id })}>
				<img className="icon" src={zn.http.fixURL(item.logo)} />
				<div className="fields">
					<div>{item.title}</div>
					<div>当前价 <span className="price">￥{Math.max(item.currentPrice, item.beginPrice)}</span></div>
				</div>
			</div>
			<div className="order">
				<span className="time">将于 {item.endTime} 结束</span>
				<span className="delete" onClick={()=>this.__deleteProduct(item)}>删除</span>
			</div>
		</div>;
	},
	__renderSession: function (){

	},
	__onData: function (){

	},
	__itemRender: function (item, index){
		if(this.state.currIndex){
			return this.__renderSession(item, index);
		}else {
			return this.__renderProduct(item, index);
		}
	},
	__renderContent: function (){
		if (!this.state.data||!this.state.data) {
			return <zn.react.DataLoader loader="timer" content="加载数据中..." />;
		}
		return <zn.react.PullRefreshList className="data-list" onData={this.__onData} data={this.state.data} itemRender={this.__itemRender} />;
	},
	render:function(){
		return (
			<zn.react.Page
				title="我的提醒"
				className="rt-remind"
				bStyle={{ backgroundColor: '#f6f6f6' }}
				height={this.props.request.search.height} >
				<div className="container">
					<div className="header">
						{
							this.state.tabItems.map(function (item, index){
								return <div key={index} className={(this.state.currIndex==index?'curr':'')} onClick={()=>this.fireClick(index)}>{item.text}</div>;
							}.bind(this))
						}
					</div>
					<div className="body">
						{this.__renderContent()}
					</div>
				</div>
			</zn.react.Page>
		);
	}
});
