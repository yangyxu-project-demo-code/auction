var React = require('react');
module.exports = React.createClass({
	__onClick: function (value){
		//console.log(value);
		//zn.popup.open(<div>12344</div>, true);
		/*
		zn.modal.middle(<div style={{backgroundColor: '#fff', height: 200, overflow: 'auto'}}>
			<div style={{height:100}}>12344</div>
			<div style={{height:100}}>12344</div>
			<div style={{height:100}}>12344</div>
			<div style={{height:100}}>12344</div>
		</div>);*/

		zn.dialog({
			title: 'xx',
			className: 'fixed',
			content: <div style={{}}>
				<div style={{height:100}}>12344</div>
				<div style={{height:100}}>12344</div>
				<div style={{height:100}}>12344</div>
				<div style={{height:100}}>12344</div>
				<div style={{height:100}}>12344</div>
				<div style={{height:100}}>12344</div>
				<div style={{height:100}}>12344</div>
				<div style={{height:100}}>12344</div>
				<div style={{height:100}}>12344</div>
				<div style={{height:100}}>12344</div>
				<div style={{height:100}}>12344</div>
				<div style={{height:100}}>12344</div>
			</div>
		});
		//zn.modal.full(<div>12344</div>, false);
		//zn.prompt('xxxxx');
		//zn.toast.error('xxx');
		//zn.preloader.open({title:"Loading..."});
	},
	render: function(){
		return (
			<div>
				<zn.react.Button onClick={this.__onClick} text="pop" />
				<zn.react.ListView className="rt-tab-android" selectMode="radio" textKey='text' data={[{text:'待支付'},{text:'已支付'},{text:'已关闭'}]} />
				<zn.react.ListView className="rt-tab-ios" selectMode="radio" textKey='text' data={[{text:'待支付'},{text:'已支付'},{text:'已关闭'}]} />
				<zn.react.ListView className="rt-list-block" selectMode="none" textKey='text' data={[{text:'待支付', className: "right-arrow", icon: 'fa-remove'},{text:'已支付'},{text:'已关闭'}]} />
			</div>
		);
	}
});
