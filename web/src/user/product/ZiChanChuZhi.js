var React = require('react');
var SearchList = require('./SearchList');

module.exports = React.createClass({
	getInitialState: function() {
    	return {

		};
  	},
	__onTypeClick: function (item){
        console.log(item);
    },
	render:function(){
		return (
			<zn.react.Page
				className="rt-sifapaimai"
				bStyle={{backgroundColor: '#f6f6f6'}}
				title={'资产处置'}
				begin={30}>
				<div className="search">

				</div>
				<div className="tags">
					<div onClick={()=>zn.react.session.jump('/waiting', {title:escape('优质债股权')})}>
						<img src="./images/auction/02-1.png" />
					</div>
					<div onClick={()=>zn.react.session.jump('/waiting', {title:escape('公车拍卖')})}>
						<img src="./images/auction/02-2.png" />
					</div>
				</div>
				<SearchList search={this.props.request.search} />
			</zn.react.Page>
		);
	}
});
