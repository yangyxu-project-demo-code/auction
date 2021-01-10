var React = require('react');

module.exports = React.createClass({
	getInitialState: function (){
		return {
			values: null
		};
	},
	componentDidMount: function (){
		this.__loadData();
	},
	__parseData: function (values){
		var _root = {};
		values.forEach(function (value, index){
			if(value.pid ==12){
				value.children = [];
				_root[value.id] = value;
			}
			if(_root[value.pid]){
				_root[value.pid].children.push(value);
			}
		});

		return _root;
	},
	__loadData: function (){
		zn.http.post('/zn.plugin.admin/var/getAllByPid', {
			fields: 'id, title, pid',
			pid: 12
		}).then(function (data){
			this.setState({
				values: this.__parseData(data.result)
			});
		}.bind(this));
	},
	__onConfirm: function (){

	},
	onVarChange: function (item, index){
		this.props.onChange && this.props.onChange(item, index);
	},
	__renderValues: function (){
		var _self = this;
		if(this.state.values){
			var _values = Object.values(this.state.values);
			return (
				<ul className="values">
					{
						_values.map(function (value, index){
							return <li key={index}>
								<div className="title">{value.title}</div>
								<div className="vars">
									{
										value.children.map(function (item, item_index){
											return <span onClick={()=>_self.onVarChange(item, item_index)} key={item_index}>{item.title}</span>
										})
									}
								</div>
							</li>;
						})
					}
				</ul>
			);
		}else {
			return <zn.react.DataLoader loader="timer" content="加载数据中..." />;
		}
	},
	render: function(){
		return <zn.react.ActivityLayout
			style={{height: '280px', backgroundColor: '#FFF'}}
			end={40}
			hStyle={{backgroundColor:'#fff'}}
			fStyle={{borderColor: '#e6e6e6'}}
			className="rt-other-selector"
			direction="top-bottom">
			<div className="body">
				{this.__renderValues()}
			</div>
			<div className="footer">
				<zn.react.Button text="取消" onClick={this.__onConfirm} />
				<zn.react.Button text="确认" />
			</div>
		</zn.react.ActivityLayout>;
	}
});
