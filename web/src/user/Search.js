var React = require('react');
var SearchList = require('./product/SearchList.js');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			search: ''
		};
  	},
	__onSearch: function (value){
		this.search(value);
	},
	__renderSearch: function (){
		return <SearchList search={{ searchString: this.state.search }} />;
	},
	__renderDefault: function (){
		return <div className="default">
			<div className="title">热门推荐</div>
			<div className="tags">
				{
					[
						'珠宝',
						'房产',
						'特价房',
						'别墅',
						'变卖',
						'全手工'
					].map(function (value, index){
						return <span onClick={()=>this.__onSearch(value)} key={index}>{value}</span>
					}.bind(this))
				}
			</div>
		</div>;
	},
	search: function (value){
		this.setState({
			search: value
		});
		this.refs.input.value = value;
	},
	__onInputChange: function (event){

	},
	__onClear: function (){
		this.search('');
	},
	render: function(){
		return (
			<zn.react.ActivityLayout
				direction="top-bottom"
				barWidth={0}
				className="rt-product-search"
				fStyle={{backgroundColor: '#fafafa'}}
				begin={46}>
				<div className="header">
					<input ref="input" onChange={this.__onInputChange} className="value" type="search" />
					<i className="search fa fa-search" onClick={()=>this.search(this.refs.input.value)} />
					{!!this.state.search?<i onClick={this.__onClear} className="clear fa fa-remove" />:null}
					<a onClick={()=>zn.react.router.back()} className="cancle">取消</a>
				</div>
				<div className="body">
					{!!this.state.search?this.__renderSearch():this.__renderDefault()}
				</div>
			</zn.react.ActivityLayout>
		);
	}
});
