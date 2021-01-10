var React = require('react');
var SearchList = require('./SearchList');

module.exports = React.createClass({
	render:function(){
		return (
			<zn.react.Page
				bStyle={{backgroundColor: '#f6f6f6'}}
				title={'拍品列表'}
				begin={30}>
				<SearchList search={this.props.request.search} />
			</zn.react.Page>
		);
	}
});
