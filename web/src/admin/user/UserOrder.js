var React = require('react');
module.exports = React.createClass({
	getInitialState: function () {
		return {
			data: Store.post('/auction/my/pagingOrder', {
				userId: this.props.userId
			})
		}
	},
	__listItemRender: function (data, index){
		return <div key={index} className="order-item" >
			<div className="product" onClick={()=>{
					if(data.productId){
						Session.jump('/main/Product/ProductInfo', { id: data.productId });
					}
				}}>
				<img className="logo" src={zn.http.fixURL(data.productLogo)} />
				<div className="info">
					<div className="title">
						{
							data.productId?<span>{data.productTitle}</span>:<span style={{color: 'red', fontWeight: 'bold'}}>{'系统已经不存在该商品详情'}</span>
						}
						<span className="create-time">{data.createTime}</span>
					</div>
					<div className="price"><span>加价金额</span><span>￥{data.increasePrice}</span></div>
					<div className="price"><span>保证金</span><span>￥{data.productEarnestMoney}</span></div>
				</div>
			</div>
			<div className="action">
				<div className="price"><span>成交价:  </span><span>￥{data.price}</span></div>
				<zn.react.ButtonGroup items={[{text:'查看详情'}]} />
			</div>
		</div>;
	},
	render:function(){
		return (
			<zn.react.Page className="rt-user-order" title={'订单'} icon="fa-list-ul" bStyle={{backgroundColor:'#f1f1f1'}} >
				<zn.react.PagerView
					view="ListView"
					className="order-list"
					data={this.state.data}
					itemRender={this.__listItemRender} />
			</zn.react.Page>
		);
	}
});
