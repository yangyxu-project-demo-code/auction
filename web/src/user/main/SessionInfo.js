var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			list: null,
			info: null
		};
  	},
	componentDidMount: function(){
		this.__loadData();
	},
    __loadData: function (){
		zn.http.post('/auction/session/watchSession', {
            sessionId: this.props.request.search.sessionId
        }).then(function (data){
			if(this.isMounted()){
				var _data = data.result,
					_info = _data[2][0];
				this.setState({
					list: _data[0],
					info: _info
	            });
			}
        }.bind(this));
    },
	__onClick: function (item){
        console.log(item);
    },
	__fixStatus: function (item){
		var _begin = (new Date(item.beginTime.replace(/-/g, '/'))).getTime(),
			_end = (new Date(item.endTime.replace(/-/g, '/'))).getTime(),
			_now = (new Date()).getTime();
		if(_begin<_now && _end>_now){
			return 1;
		}
		if(_begin>_now){
			return 2;
		}else {
			return 3;
		}
	},
	__renderItemFooter: function (item){
		var _status = this.__fixStatus(item);
		switch (_status) {
			case 1:
				return (
					<div className="item-footer biding">
						<div className="left">
							<div className="price">当前价 ￥{item.currentPrice}</div>
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
							<div className="price">起拍价 ￥{item.beginPrice}</div>
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
						<div>已结束</div>
					</div>
				);
		}
	},
	__renderList: function (data){
		return <ul className="product-list">
			{
				data.map(function (item, index){
					return <li key={index} onClick={()=>zn.react.session.jump('/product/info', { productId: item.id })}>
						<img className="icon" src={zn.http.fixURL(item.logo)} />
						<div className="fields">
							<div className="title">{item.title}</div>
							{this.__renderItemFooter(item, index)}
						</div>
					</li>;
				}.bind(this))
			}
		</ul>;
	},
	__renderTipsTime: function (){
		var _times = [];
		var _begin = (new Date(this.state.info.beginTime.replace(/-/g, '/'))).getTime(),
			_end = (new Date(this.state.info.endTime.replace(/-/g, '/'))).getTime(),
			_now = (new Date()).getTime();

		switch (this.__fixStatus(this.state.info)) {
			case 1:
				var _diff1 = Math.floor((_end - _now)/(24*3600*1000));
				_times = this.state.info.endTime.split(' ');
				if(_diff1==0){
					_times[0] = '今天';
				}else if(_diff1==1) {
					_times[0] = '明天';
				}

				return <div className="tips">
					<div className="time">
						<div>
							<div>{_times[0]}</div>
							<div>{_times[1].substring(0, 5)} 结束</div>
						</div>
						<span>{this.state.info.applyCount} 人报名</span>
					</div>
					<div className="notify">
						<i className="fa fa-clock-o" />
						<span>结束前提醒</span>
					</div>
				</div>;
			case 2:
				var _diff1 = Math.floor((_begin - _now)/(24*3600*1000));
				_times = this.state.info.beginTime.split(' ');
				if(_diff1==0){
					_times[0] = '今天';
				}else if(_diff1==1) {
					_times[0] = '明天';
				}
				return <div className="tips ">
					<div className="time">
						<div>
							<div>{_times[0]}</div>
							<div>{_times[1].substring(0, 5)} 开始</div>
						</div>
						<span>{this.state.info.applyCount} 人报名</span>
					</div>
					<div className="notify">
						<i className="fa fa-clock-o" />
						<span>开始前提醒</span>
					</div>
				</div>;
		}
	},
	__renderData: function (){
		var _imgs = this.state.info.imgs.split(',');
		return <div className="body">
			<div className="info">
				<img className="img" src={Store.fixURL(this.state.info.img)} />
				<div className="title">{this.state.info.title}</div>
			</div>
			{this.__renderTipsTime()}
			{this.state.list.length>0?this.__renderList(this.state.list):<img src="" />}
		</div>;
	},
	render:function(){
		return (
			<zn.react.Page
				className="auction-session-info"
				bStyle={{backgroundColor: '#f6f6f6'}}
				title={'拍卖专场'}
				begin={30}>
				{
					this.state.list?this.__renderData():<zn.react.DataLoader loader="timer" content="加载中..." />
				}
			</zn.react.Page>
		);
	}
});
