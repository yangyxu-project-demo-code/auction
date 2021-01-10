var React = require('react');
module.exports = React.createClass({
	render: function(){
		return (
			<zn.react.Page bStyle={{backgroundColor:'#E7E7E7', textAlign: 'center'}} title={unescape(this.props.request.search.title)} >
				<div style={{textAlign: 'center'}}><img src="./images/auction/qidai.png" style={{marginTop: 100}}  /></div>
			</zn.react.Page>
		);
	}
});
