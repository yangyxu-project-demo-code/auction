var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			data: null,
			price: null
		};
  	},
	componentDidMount: function(){
		this.__loadInfo();
	},
	__loadInfo: function () {
		zn.http.post('/auction/order/getOrderByCode', {
			orderCode: this.props.request.search.orderCode
		}).then(function (data){
			if(data.status==200){
				var _product = data.result.product;
				var _min = Math.max(_product.currentPrice, _product.beginPrice) + _product.increaseStep;
				this.state.price = this.state.min = _min;
				this.setState({
					data: data.result
				});
			}else {
				zn.alert('请求报错：' + data.result);
			}
		}.bind(this));
	},
	__onMinus: function (){
		if(this.state.min==this.state.price){
			return;
		}else {
			this.setState({
				price: (this.state.price - this.state.data.product.increaseStep)
			});
		}
	},
	__onPlus: function (){
		this.setState({
			price: (this.state.price + this.state.data.product.increaseStep)
		});
	},
	__onSubmit: function (){
		zn.confirm('确定出价：' + this.state.price + '?', '友情提示', function (){
			zn.http.post('/auction/order/bid', {
				orderCode: this.state.data.orderCode,
				price: this.state.price,
				increasePrice: (this.state.price - this.state.data.product.currentPrice)
			}).then(function (data){
				zn.toast.success('恭喜, 出价成功');
				this.__loadInfo();
			}.bind(this), function (err){
				zn.toast.error(err);
			});
		}.bind(this));
	},
	__renderView: function (){
		return (
			<div>
				<div className="action">
					<span onClick={this.__onMinus} className={"icon " + (this.state.min==this.state.price?'disabled':'')}><i className="fa fa-minus" /></span>
					<span className="value">{(this.state.price).price()}</span>
					<span onClick={this.__onPlus} className="icon"><i className="fa fa-plus" /></span>
				</div>
				<zn.react.Button onClick={this.__onSubmit} text="立即出价" style={{margin: 15}} />
			</div>
		);

		if(this.state.data.status==16){
			return (
				<div>
					<div className="action">
						<span onClick={this.__onMinus} className={"icon " + (this.state.min==this.state.price?'disabled':'')}><i className="fa fa-minus" /></span>
						<span className="value">{this.state.price}</span>
						<span onClick={this.__onPlus} className="icon"><i className="fa fa-plus" /></span>
					</div>
					<zn.react.Button onClick={this.__onSubmit} text="立即出价" style={{margin: 15}} />
				</div>
			);
		}else {
			return (
				<div className="rt-bid-done">
					<i className="fa fa-check" />
					<span>出价成功, 请耐心等待</span>
				</div>
			);
		}
	},
	__renderBids: function (){
		console.log(this.state.data.bids);
		return (
			<div className="bids rt-auction-records">
				<ul className="header item" style={{backgroundColor:'#800010'}}>
					<li>状态</li>
					<li>竞买号</li>
					<li>价格</li>
					<li>时间</li>
				</ul>
				<div className="body">
					{
						this.state.data.bids.map(function (item, index){
							return <ul key={index} className="item">
								<li>{item.status==1?'领先':'出局'}</li>
								<li>{item.bidCode}</li>
								<li>￥{item.price}</li>
								<li>{item.zn_create_time}</li>
							</ul>;
						})
					}
				</div>
			</div>
		);
	},
	render:function(){
		if(!this.state.data){
			return <zn.react.DataLoader loader="timer" content="加载数据中..." />;
		}

		var _product = this.state.data.product;
		return (
			<zn.react.Page title="出价" >
				<zn.react.ActivityLayout
					direction="top-bottom"
					className="auction-order-bid"
					hStyle={{backgroundColor: '#800010'}}
					fStyle={{backgroundColor: '#F1F2F4'}}
					begin={40}>
					<div className="header">
						<span><i className="fa fa-clock-o"/>正在进行中</span>
						<span>将于{_product.endTime}结束</span>
					</div>
					<div className="body">
						<div className="tips">
							提醒：出局后，一般保证金会原路退回，具体明细请进入我的保证金详情查看。
						</div>
						<div className="product">
							<img className="logo" src={zn.http.fixURL(_product.logo)} />
							<div className="fields">
								<div className="title">{_product.title}</div>
								<div className="price">
									<div>起拍价：￥{(_product.beginPrice||0).format()}</div>
									<div>加价幅度：￥{(_product.increaseStep||0).format()}</div>
									<div>当前价：￥{(Math.max(_product.currentPrice, _product.beginPrice)).format()}</div>
								</div>
							</div>
						</div>
						{this.__renderView()}
						{this.__renderBids()}
					</div>
				</zn.react.ActivityLayout>
			</zn.react.Page>
		);
	}
});
