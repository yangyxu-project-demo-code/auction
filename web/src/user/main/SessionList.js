var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			currIndex: 0,
			tabItems: [
				{ text: '今日拍卖', url: '/auction/session/getCurrentSession' },
				{ text: '拍卖预览', url: '/auction/session/getPreviousSession' }
			],
			data: null
		};
  	},
	componentDidMount: function (){
		this.fireClick(0);
	},
	fireClick: function (index){
		var _data = this.state.tabItems[index];
		if(_data){
			this._data = Store.post(_data.url, {
				userId: this.state.userId
			});
			this._data.exec().then(function (data){
				if(data.status==200){
					this.setState({
						data: data.result,
						currIndex: index
					});
				}
			}.bind(this));
		}
	},
	__renderPreviowSession: function (item, index){
		return <li key={index} onClick={()=>zn.react.session.jump('/session/info', { sessionId: item.id })} className="session">
			<img className="logo" src={zn.http.fixURL(item.img)} />
			<div className="info">
				<div className="fields">
					<div className="title">{item.title}</div>
					<div className="alias">{item.alias}</div>
					<div className="time">将于 {item.beginTime} 开始</div>
				</div>
				<div className="count" style={{backgroundColor: '#1A8C8C'}}>
					<div className="status">预展中</div>
					<div className="value">{item.watchCount}</div>
					<div>次围观</div>
				</div>
			</div>
		</li>;
	},
	__renderCurrentSession: function (item, index){
		return <li key={index} onClick={()=>zn.react.session.jump('/session/info', { sessionId: item.id })} className="session">
			<img className="logo" src={zn.http.fixURL(item.img)} />
			<div className="info">
				<div className="fields">
					<div className="title">{item.title}</div>
					<div className="alias">{item.alias}</div>
					<div className="time">将于 {item.endTime} 结束</div>
				</div>
				<div className="count">
					<div className="status">竞价中</div>
					<div className="value">{item.applyCount}</div>
					<div>次出价</div>
				</div>
			</div>
		</li>;
	},
	__renderData: function (){
		return <ul className="data-list">
			{
				this.state.data.map(function (item, index){
					if(this.state.currIndex){
						return this.__renderPreviowSession(item, index);
					}else {
						return this.__renderCurrentSession(item, index);
					}
				}.bind(this))
			}
		</ul>;
	},
	__renderContent: function (){
		if (!this.state.data) {
			return <zn.react.DataLoader loader="timer" content="加载数据中..." />;
		}
		if(this.state.data.length){
			return this.__renderData();
		}else {
			return <div style={{padding: 10, textAlign:'center'}}>亲，暂无数据了哦~</div>;
		}
	},
	render:function(){
		return (
			<div className="auction-session">
				<div className="header">
					{
						this.state.tabItems.map(function (item, index){
							return <div key={index} className={(this.state.currIndex==index?'curr':'')} onClick={()=>this.fireClick(index)}>{item.text}</div>;
						}.bind(this))
					}
				</div>
				<div className="body">
					{this.__renderContent()}
				</div>
			</div>
		);
	}
});
