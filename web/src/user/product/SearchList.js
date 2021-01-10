var React = require('react');

var CitySelector = require('./CitySelector.js');
var OtherSelector = require('./OtherSelector.js');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			order: null,
			type: null,
			city: null,
			data: zn.store.post('/auction/product/searchProduct', this.props.search)
		};
  	},
	componentWillReceiveProps: function(nextProps){
		if(nextProps.search!==this.props.search){
			this.state.data._data = nextProps.search;
			this.state.data.exec();
		}
	},
	__onClick: function (item){
        console.log(item);
    },
	__formatTime: function (item){
		var _begin = (new Date(item.beginTime.replace(/-/g, '/'))).getTime(),
			_end = (new Date(item.endTime.replace(/-/g, '/'))).getTime(),
			_now = (new Date()).getTime();
		//alert(item.beginTime + ', ' + item.endTime);
		//alert(_begin + ',' + _now + ',' + _end);

		if(_begin<_now && _end>_now){
			return 1;
		}

		if(_begin>_now){
			return 2;
		}else {
			return 3;
		}
	},
	__renderItemFooter: function (item, index){
		var _value = this.__formatTime(item);
		switch (_value) {
			case 1:
				return (
					<div className="item-footer biding">
						<div className="left">
							<div className="time">预计于 {item.endTime} 结束</div>
							<div className="price">当前价 ￥{Math.max(item.currentPrice, item.beginPrice)}</div>
							<div className="count">出价 {item.applyCount}次</div>
						</div>
						<div className="right">
							<i className="fa fa-gavel" />
							<span>立即拍</span>
						</div>
					</div>
				);
			case 2:
				return (
					<div className="item-footer pre-bid">
						<div className="left">
							<div className="time">{item.beginTime} ~ {item.endTime}</div>
							<div className="price">起拍价 ￥{Math.max(item.beginPrice, item.currentPrice)}</div>
							<div className="count">围观 {item.watchCount}次</div>
						</div>
						<div className="right">
							<i className="fa fa-clock-o" />
							<span>提醒我</span>
						</div>
					</div>
				);
			case 3:
				return (
					<div className="item-footer bided">
						<span></span>
						<span className="tip">拍卖已经结束</span>
					</div>
				);
		}
	},
	__renderStatus: function (value){
		switch (value) {
			case 1:
				return <span className="status s-1">拍卖中</span>;
			case 2:
				return <span className="status s-2">即将开拍</span>;
			case 3:
				return <span className="status s-3">已结束</span>;
		}
	},
	__itemRender: function (item, index){
		var _style = {},
			_value = this.__formatTime(item);
		if(_value==3){
			return false;
			_style.opacity = 0.5;
		}
		return <div
				style={_style}
				key={index}
				onClick={()=>zn.react.session.jump('/product/info', {
					productId: item.id
				})} >
			<img className="icon" src={zn.http.fixURL(item.logo)} />
			<div className="fields">
				<div className="title">
					{this.__renderStatus(_value)}
					<span>{item.zn_title}</span>
				</div>
				{this.__renderItemFooter(item, index)}
			</div>
		</div>;
	},
	__onCityChange: function (value, item){
		this.state.data.extend(this.props.search, {
			city: value,
			pageIndex: 1
		});
		this.state.data.exec();
		this.refs.listfilter.close();
		this.setState({
			city: value,
			order: null,
			type: null
		});
	},
	__onTypeChange: function (value) {
		this.state.data.extend(this.props.search, {
			vars: value,
			pageIndex: 1
		});
		this.state.data.exec();
		this.refs.listfilter.close();
		this.setState({
			type: value,
			city: null,
			order: null
		});
	},
	__onOrderChange: function (value) {
		var _value = '';
		switch (value) {
			case 6:
				_value = 'currentPrice desc';
				break;
			case 7:
				_value = 'currentPrice asc';
				break;
			case 8:
				_value = 'applyCount desc';
				break;
			case 9:
				_value = 'createTime desc';
				break;
		}
		this.state.data.extend(this.props.search, {
			order: value,
			pageIndex: 1
		});
		this.state.data.exec();
		this.refs.listfilter.close();
		this.setState({
			order: value,
			type: null,
			city: null
		});
	},
	render:function(){
		return (
			<div className="rt-search-list">
				<zn.react.ListFilter
					ref="listfilter"
					items={[
						{
							title: '默认排序',
							view: <zn.react.ListView value={this.state.order} onItemClick={this.__onOrderChange} data={Store.post('/zn.plugin.admin/var/getByPid', { pid: 17 })} />
						},
						{
							title: '类型',
							view: <zn.react.ListView value={this.state.type} onItemClick={this.__onTypeChange} className="type-list" data={Store.post('/zn.plugin.admin/var/getByPid', { pid: 18 })} />
						},
						{ title: '所在地', view: <CitySelector value={this.state.city} onChange={this.__onCityChange} /> },
						//{ title: '更多', view: <OtherSelector /> }
					]} />
				<zn.react.PagingList className="refresh-list" onData={this.__onData} data={this.state.data} itemRender={this.__itemRender} />
			</div>
		);
	}
});
