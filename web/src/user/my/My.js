var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			info: null,
			items: [
				{ title: '我的订单', icon: 'fa-reorder', uri: '/my/order' },
				{ title: '我的提醒', icon: 'fa-clock-o', uri: '/my/remind' },
				{ title: '我的收藏', icon: 'fa-star', uri: '/my/collection' },
				{ title: '我的保证金', icon: 'fa-money', uri: '/my/earnest' }
			]
		};
  	},
	componentDidMount: function (){
		this.__loadUserInfo();
	},
	componentWillReceiveProps: function () {
		//this.__loadUserInfo();
	},
	__loadUserInfo: function (){
		var _token = zn.react.session.jsonKeyValue('WAP_LOGIN_USER_TOKEN');
		console.log(_token);
		if(!_token){
			return zn.react.session.jump('/login', { forward: this.props.path});
		}else {
			zn.http.post('/auction/user/getUser', {
				userId: _token.id
			}).then(function (data){
				if(data.status==200){
					zn.react.session.setKeyValue('WAP_LOGIN_USER_TOKEN', data.result);
					this.setState({ info: data.result });
				}else {
					return zn.react.session.jump('/login', { forward: this.props.path});
				}
			}.bind(this));
		}
	},
	__logout: function (){
		zn.http.get('/auction/user/logout').then(function (data){
			localStorage.removeItem('ZN_GESTURE_PASSWORD');
			zn.react.session.reset().jump('/login');
		});
	},
	__onItemClick: function (item, index){
		if(item.uri){
			zn.react.session.jump(item.uri, { uid: this.state.info.id });
		}
	},
	__itemRender: function(item, index){
		if(item.phone){
			return <a href={'tel:' + item.phone} style={{color: '#3d3d3d'}}>
				<i style={{margin:5, width: 16}} className={'fa ' +item.icon} />
				{item.title}
				<i style={{float:'right',margin:3, marginTop: 12, width: 16}} className='fa fa-angle-right' />
			</a>;
		} else {
			return <div onClick={()=>this.__onItemClick(item, index)}>
				<i style={{margin:5, width: 16}} className={'fa ' +item.icon} />
				{item.title}
				<i style={{float:'right',margin:3, marginTop: 12, width: 16}} className='fa fa-angle-right' />
			</div>;
		}
	},
	render:function(){
		if(!this.state.info){
			return <zn.react.DataLoader loader="timer" content="加载中..." />;
		}
		var _img = this.state.info.avatarImage;
		if(_img){
			_img = zn.http.fixURL(_img);
		}else {
			_img = './images/logo/logo_04.png';
		}
		return (
			<div className="rt-my" >
				<div className="my">
					<a className="edit" onClick={()=>zn.react.session.jump('/my/infoedit')}><i className="fa fa-edit" /></a>
					<div className="info">
						<img className="avatar" src={_img} />
						<span className="title">{this.state.info.name||this.state.info.email||this.state.info.phone}</span>
					</div>
				</div>
				<ul className="rt-ul rt-list">
					{
						this.state.items.map(function (item, index){
							return <li key={index}>
								{this.__itemRender(item, index)}
							</li>;
						}.bind(this))
					}
				</ul>
				<ul className="rt-ul rt-list">
					{
						[
							{ title: '我的地址', icon: 'fa-address-card-o', uri: '/my/address' },
							{ title: '我的手势', icon: 'fa-braille', uri: '/my/gesture' }
						].map(function (item, index){
							return <li key={index}>
								{this.__itemRender(item, index)}
							</li>;
						}.bind(this))
					}
				</ul>
				<ul className="rt-ul rt-list">
					{
						[
							{ title: '版本信息', icon: 'fa-info-circle', uri: '/setting/version' },
							{ title: '拍卖规则及协议', icon: 'fa-anchor', uri: '/setting/protocol' }
						].map(function (item, index){
							return <li key={index}>
								{this.__itemRender(item, index)}
							</li>;
						}.bind(this))
					}
				</ul>
				<div style={{margin:8}}>
					<div className="rt-button danger" onClick={this.__logout}>注销</div>
				</div>
			</div>
		);
	}
});
