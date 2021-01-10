var React = require('react');
module.exports = React.createClass({
	getInitialState: function () {
		return {
			data: zn.store.post('/auction/my/pagingDeposit', {
				userId: this.props.userId
			})
		}
	},
	__listItemRender: function (data, index){
		return <div key={index} className="order-item" >
			<div className="product" onClick={()=>{
					if(data.productId){
						zn.react.session.jump('/main/Product/ProductInfo', { id: data.productId });
					}
				}}>
				<img className="logo" src={zn.http.fixURL(data.productLogo)} />
				<div className="info">
					<div className="title">
						{
							data.productId?<span>{data.productTitle}</span>:<span style={{color: 'red', fontWeight: 'bold'}}>{'系统已经不存在该商品详情'}</span>
						}
						<span className="create-time">{data.zn_create_time}</span>
					</div>
					<div className="price"><span>保证金</span><span>￥{data.productEarnestMoney}</span></div>
				</div>
			</div>
			<div className="action">
				<div className="price"></div>
				<zn.react.ButtonGroup items={[{text:'查看明细'}]} />
			</div>
		</div>;
	},
	render:function(){
		return (
			<zn.react.Page className="rt-user-order" title='保证金' icon="fa-money" bStyle={{backgroundColor:'#f1f1f1'}} >
				<zn.react.PagerView
					view="ListView"
					className="order-list"
					data={this.state.data}
					itemRender={this.__listItemRender} />
			</zn.react.Page>
		);
	}
});
