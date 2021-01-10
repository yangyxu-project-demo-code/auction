var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			data: null,
			currIndex: 0,
			isNotify: false,
			isCollect: false,
			user: null
		};
  	},
	componentDidMount: function(){
		this.__loadData();
	},
    __loadData: function (){
		zn.http.post('/zn.plugin.admin/model/selectOne', {
			model: 'zn_auction_product',
			where: {
				id: this.props.request.search.productId
			}
        }).then(function (data){
			var _user = zn.react.session.jsonKeyValue('WAP_LOGIN_USER_TOKEN'),
				_info = data.result;
			if(_user&&_info){
				if(_info.notifyUsers.indexOf(','+_user.id+',')!=-1){
					this.state.isNotify = true;
				}
				if(_info.collectUsers.indexOf(','+_user.id+',')!=-1){
					this.state.isCollect = true;
				}
			}
            this.setState({
                data: _info,
				user: _user,
				isNotify: this.state.isNotify,
				isCollect: this.state.isCollect
            });
        }.bind(this));
    },
	__onClick: function (item){
        console.log(item);
    },
	__getTime: function (_data){
		var _begin = (new Date(_data.beginTime.replace(/-/g, '/'))).getTime(),
			_end = (new Date(_data.endTime.replace(/-/g, '/'))).getTime(),
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
	__renderTips: function (_data){
		var _style = {};
		if(zn.react.isIOS()){
			_style.top = 50;
		}
		switch (this.__getTime(_data)) {
			case 1:
				return (
					<div className="header" style={_style}>
						<span><i className="fa fa-clock-o"/>正在进行中</span>
						<span>将于{_data.endTime}结束</span>
					</div>
				);
			case 2:
				_style.backgroundColor = '#1A8C8C';
				return (
					<div className="header" style={_style}>
						<span><i className="fa fa-clock-o"/>即将开始</span>
						<span>将于 {_data.beginTime} 开始</span>
					</div>
				);
			case 3:
				_style.backgroundColor = '#B8B8B8';
				return (
					<div className="header" style={_style}>
						<span><i className="fa fa-clock-o"/>已经结束</span>
						<span>请关注其他拍品</span>
					</div>
				);
		}
	},
	__renderData: function (){
		var _data = this.state.data;
		var _ary = [
			{
				title: '拍品描述',
				data: _data.note
			},
			{
				title: '拍品参数',
				data: _data.argv
			}
		];
		var _imgs = _data.imgs.split(',');
		_imgs.pop();
		_imgs.shift();
		_imgs = _imgs.map(function (value){
			return Store.fixURL(value);
		});
		var _callPhone = '4008222870';
		return <div className="container">
			{this.__renderTips(_data)}
			<div className="carousel">
				<zn.react.Slider autoPlayInterval={2e3}>
					{
						_imgs.map(function (value, index){
							return <img key={index} src={value} />;
						})
					}
				</zn.react.Slider>
			</div>
			<div className="part">
				<div className="title">{_data.zn_title}</div>
				<div className="price" style={{color: '#800010'}}>
					<div className="mark">
						<span>当前价</span>
						<span style={{fontSize: 16}}>RMB</span>
					</div>
					<div className="value1">{(Math.max(_data.currentPrice, _data.beginPrice)).format()}</div>
				</div>
				<div className="count">
					<div>围观 {_data.watchCount} 次</div>
					<div>报名 {_data.applyCount} 人</div>
					<div>设置提醒 {_data.notifyCount} 人</div>
				</div>
			</div>

			<div className="part record" onClick={()=>zn.react.session.jump('/product/auctionrecords', { pid: _data.id })}>
				<span>拍卖记录</span>
				<div>
					<span>{_data.priceCount}条</span>
					<i className="fa fa-angle-right" />
				</div>
			</div>
			<ul className="links">
				{
					[
						{ text: '竞拍公告', url: '/product/gonggao' },
                        { text: '竞拍须知', url: '/product/xuzhi'  },
                        { text: '司法竞拍帮助', url: '/product/help'  }
					].map(function (item, index){
						return <li key={index} onClick={()=>zn.react.session.jump(item.url + '?page=1&pid=' + _data.id)}>
							<span>{item.text}</span>
							<i className="fa fa-angle-right" />
						</li>;
					}.bind(this))
				}
			</ul>
			<div className="part prices">
				<div className="item-group">
					<div className="item">
						<span className="item-title">起拍价</span>
						<span className="item-value">￥{(_data.beginPrice).price()}</span>
					</div>
					<div className="item">
						<span className="item-title">保证金</span>
						<span className="item-value">￥{(_data.earnestMoney).price()}</span>
					</div>
				</div>

				<div className="item-group">
					<div className="item">
						<span className="item-title">加价幅度</span>
						<span className="item-value">￥{(_data.increaseStep).price()}</span>
					</div>
					<div className="item">
						<span className="item-title">预估价</span>
						<span className="item-value">￥{(_data.evaluatePrice).price()}</span>
					</div>
				</div>

				<div className="item-group">
					<div className="item">
						<span className="item-title">保留价</span>
						<span className="item-value">￥{(_data.reservePrice).price()}</span>
					</div>
					<div className="item">
						<span className="item-title">延时周期</span>
						<span className="item-value">{_data.delayPeriod}</span>
					</div>
				</div>
			</div>

			<div className="info">
				<div className="part tab">
					{
						_ary.map(function (item, index){
							return <div key={index} className={(this.state.currIndex==index?'curr':'')} onClick={()=>this.setState({ currIndex: index })}>{item.title}</div>;
						}.bind(this))
					}
				</div>
				<div className="data">
					{
						_ary.map(function (item, index){
							if(index==0){
								return <div key={index} className={(this.state.currIndex==index?'curr':'')}>
									<div className="imgs">
										{
											_data.imgs.split(',').map(function (img, index){
												if(img){
													return <img className="img" key={index} src={Store.fixURL(img)} />;
												}
											})
										}
									</div>
									<div dangerouslySetInnerHTML={{ __html: item.data }}></div>
								</div>;
							}else {
								return <div key={index} className={(this.state.currIndex==index?'curr':'')} dangerouslySetInnerHTML={{ __html: item.data }}></div>;
							}
						}.bind(this))
					}
				</div>
			</div>

			<div className="call">
				<a href={"tel:" + _callPhone}><i className="fa fa-volume-control-phone" /><span>{_callPhone}</span></a>
			</div>
		</div>;
	},
	__onNotify: function (){
		if(this.state.user){
			zn.http.post('/auction/product/notify', {
				cancle: (this.state.isNotify?1:0),
				userId: this.state.user.id,
				productId: this.props.request.search.productId
			}).then(function(data){
				if(data.status==200){
					this.setState({
						isNotify: !this.state.isNotify
					});
				}else {
					zn.toast.error('服务器忙碌, 设置失败！');
				}
			}.bind(this));
		}else {
			zn.react.session.jump('/login?forward='+(this.props.request.path + '?' + this.props.request.searchString));
		}
	},
	__onCollect: function (){
		if(this.state.user){
			zn.http.post('/auction/product/collect', {
				cancle: (this.state.isCollect?1:0),
				userId: this.state.user.id,
				productId: this.props.request.search.productId
			}).then(function(data){
				if(data.status==200){
					this.setState({
						isCollect: !this.state.isCollect
					});
				}else {
					zn.toast.error('服务器忙碌, 设置失败！');
				}
			}.bind(this));
		}else {
			zn.react.session.jump('/login?forward='+(this.props.request.path + '?' + this.props.request.searchString));
		}
	},
	__renderFooter: function (){
		if(this.state.data){
			return <div className="action">
				<a className={"btn "+(this.state.isNotify?'curr':'')} onClick={()=>this.__onNotify()} >
					<i className="fa fa-clock-o" />
					<span>提醒</span>
				</a>
				<a className={"btn "+(this.state.isCollect?'curr':'')} onClick={()=>this.__onCollect()} >
					<i className="fa fa-star" />
					<span>收藏</span>
				</a>
				<a className="apply" onClick={()=>zn.react.session.jump('/order/protocol', { pid: this.state.data.id })}>
					<span>去报名</span>
					<span>(保证金金额 ￥{this.state.data.earnestMoney})</span>
				</a>
			</div>;
		}
	},
	render: function(){
		console.log()
		return (
			<zn.react.Page
				className="rt-product-info"
				bStyle={{backgroundColor: '#f6f6f6'}}
				footerView={this.__renderFooter()}
				end={((this.state.data&&this.__getTime(this.state.data)<3)?45:0)}
				title="拍品详情" >
				{
					this.state.data?this.__renderData():<zn.react.DataLoader loader="timer" content="加载中..." />
				}
			</zn.react.Page>
		);
	}
});
