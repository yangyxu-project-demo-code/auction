var React = require('react');

var GoodThing = require('./GoodThing.js');
var ProductType = require('./ProductType.js');
var My = require('../my/My.js');
module.exports = React.createClass({
	getInitialState: function() {
    	return {
			view: GoodThing,
			tabs: [
				{ title: '精品', icon: 'fa-gift', view: GoodThing },
				{ title: '寻宝', icon: 'fa-bandcamp', view: ProductType },
				{ title: '我的', icon: 'fa-user',	view: My }
			]
		};
  	},
	componentDidMount: function(){
		zn.react.main = this;
	},
	reset: function (){
		this.setState({
			view: GoodThing
		});
	},
	__renderPage: function (){
		var _view = <div>Empty Page</div>;
		if(this.state.view){
			_view = <this.state.view path={this.props.request.path} {...this.props.request.search} />;
		}

		return _view;
	},
	__onTabChange: function (item){
		this.setState({
			view: item.view
		});
	},
	render:function(){
		return (
			<zn.react.ActivityLayout
				className="auction-main"
				direction="top-bottom"
				barWidth={0}
				end={48} >
				{this.__renderPage()}
				<ul className="nav-menu">
					{
						this.state.tabs.map(function (item, index){
							return <li onClick={()=>this.__onTabChange(item, index)} key={index} className={ this.state.view === item.view ? 'curr' : ''}>
								<i className={'fa ' + item.icon} />
								<span className='title'>{item.title}</span>
							</li>;
						}.bind(this))
					}
				</ul>
			</zn.react.ActivityLayout>
		);
	}
});
