var React = require('react');
var SearchList = require('./SearchList');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			types: []
		};
  	},
	componentDidMount: function (){
		this.__loadType();
	},
	__loadType: function (){
		zn.http.post('/zn.plugin.admin/model/select', {
			model: 'zn_auction_product_type',
			fields: 'id, title, img',
			where: { zn_tree_pid: 3 }
		}).then(function (data){
			this.setState({
				types: data.result
			});
		}.bind(this));
	},
	__onTypeClick: function (item){
		zn.react.session.jump('/product/list', {category:item.id});
    },
	render:function(){
		return (
			<zn.react.Page
				className="rt-zhenpingpaimai"
				bStyle={{backgroundColor: '#f6f6f6'}}
				title={'珍品拍卖'}
				begin={30}>
				<div className="search">

				</div>
				<div className="tags">
					{
						this.state.types.map(function (type, index){
							return <div key={index} onClick={()=>this.__onTypeClick(type)}>
								<img src={Store.fixURL(type.img)} />
								<span>{type.title}</span>
							</div>
						}.bind(this))
					}
				</div>
				<SearchList search={this.props.request.search} />
			</zn.react.Page>
		);
	}
});
