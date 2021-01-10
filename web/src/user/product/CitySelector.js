var React = require('react');

module.exports = React.createClass({
	getInitialState: function (){
		return {
			value: null,
			data: Store.post('/zn.plugin.admin/var/getByPid', { pid: 19 }),
			citys: []
		};
	},
	componentDidMount: function (){

	},
	renderContent: function(){
		if(!this.state.value){
			return <zn.react.DataLoader loader="timer" content="加载中..." />;
		}
		return (
			<div style={{ padding: 15 }} dangerouslySetInnerHTML={{ __html: this.state.value }}></div>
		);
	},
	__onListItemClick: function (value, index){
		zn.http.post('/zn.plugin.admin/var/getByPid', {
			pid: value
		}).then(function (data){
			this.setState({
				citys: data.result
			});
		}.bind(this));
	},
	__onCityClick: function (item, index){
		this.props.onChange && this.props.onChange(item, index);
	},
	render: function(){
		return <zn.react.ActivityLayout
			style={{height: '280px', backgroundColor: '#FFF'}}
			begin={80}
			hStyle={{backgroundColor:'#e6e6e6'}}
			bStyle={{borderColor: '#FFF'}}
			className="rt-city-selector"
			direction="left-right">
			<zn.react.ListView onItemClick={this.__onListItemClick} data={this.state.data} />
			<zn.react.ListView onItemClick={this.__onCityClick} data={this.state.citys} />
		</zn.react.ActivityLayout>;
	}
});
