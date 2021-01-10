var React = require('react');

var MENU = [
	{
		title: '基本信息',
		icon: 'fa-id-card-o',
		uri: './UserInfo.js'
	},
	{
		title: '订单',
		icon: 'fa-list-ul',
		uri: './UserOrder.js'
	},
	{
		title: '提醒',
		icon: 'fa-bell-o',
		uri: './UserRemind.js'
	},
	{
		title: '收藏',
		icon: 'fa-star-o',
		uri: './UserCollection.js'
	},
	{
		title: '保证金',
		icon: 'fa-money',
		uri: './UserDeposit.js'
	}
];

module.exports = React.createClass({
	getInitialState: function (){
		return {
			view: './UserInfo.js'
		}
	},
	render: function(){
		var View = this.state.view?require(this.state.view):null;
		return (
			<zn.react.Page title='用户中心' className="auction-user-center" icon="fa-newspaper-o" >
				<zn.react.ActivityLayout
					begin={140}
					direction="left-right">
					<div className="center-left">
						<ul className="nav-menu">
							{
								MENU.map(function (item, index){
									return <li onClick={()=>this.setState({view: item.uri})} key={index} className={ this.state.view === item.uri ? 'curr' : ''}>
										<i className={'fa ' + item.icon} />
										<span>{item.title}</span>
									</li>;
								}.bind(this))
							}
						</ul>
					</div>
					<div className="center-right">
						{View && <View userId={this.props.id} />}
					</div>
				</zn.react.ActivityLayout>
			</zn.react.Page>
		);
	}
});
