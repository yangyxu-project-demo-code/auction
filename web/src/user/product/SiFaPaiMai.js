var React = require('react');
var SearchList = require('./SearchList');

module.exports = React.createClass({
	getInitialState: function() {
    	return {

		};
  	},
	__onTypeClick: function (item){
		zn.react.session.jump('/product/list', {vars: item.id});
    },
	render:function(){
		return (
			<zn.react.Page
				className="rt-sifapaimai"
				bStyle={{backgroundColor: '#f6f6f6'}}
				title={'司法拍卖'}
				begin={30}>
				<div className="body">
					<div className="search">

					</div>
					<div className="types">
						<ul className="item-list" style={{borderBottom: '1px solid #f7f7f7'}}>
							{
								[
									{ title: '机动车', id: 30, img: './images/auction/jidongche.png'},
									{ title: '房产', id: 29, img: './images/auction/fangchan.png'},
									{ title: '资产', id: 31, img: './images/auction/zichan.png'},
									{ title: '土地', id: 32, img: './images/auction/tudi.png'},
									{ title: '工程', id: 38, img: './images/auction/gongcheng.png'}
								].map(function (item, index){
									return <li key={index} onClick={()=>this.__onTypeClick(item)}>
										<img className="logo" src={item.img} />
										<span className="title">{item.title}</span>
									</li>;
								}.bind(this))
							}
						</ul>
						<ul className="item-list">
							{
								[
									{title:'矿权', id: 37, img: './images/auction/kuangquan.png'},
									{title:'无形资产', id: 34, img: './images/auction/zixingzichan.png'},
									{title:'林权', id: 35, img: './images/auction/linquan.png'},
									{title:'其他', id: 39, img: './images/auction/other.png'},
									{title:'全部', id: 29, img: './images/auction/all.png'}
								].map(function (item, index){
									return <li key={index} onClick={()=>this.__onTypeClick(item)}>
										<img className="logo" src={item.img} />
										<span className="title">{item.title}</span>
									</li>;
								}.bind(this))
							}
						</ul>
					</div>
					<div className="tags">
						<div onClick={()=>zn.react.session.jump('/waiting', {title: escape('法院查询')})}>
							<img src="./images/auction/01-1.png" />
						</div>
						<div>
							<div onClick={()=>zn.react.session.jump('/waiting', {title:escape('拍卖贷款')})}>
								<img src="./images/auction/01-2.png" />
							</div>
							<div onClick={()=>zn.react.session.jump('/waiting', {title:escape('降价处置')})}>
								<img src="./images/auction/01-3.png" />
							</div>
						</div>
					</div>
					<SearchList search={this.props.request.search} />
				</div>
			</zn.react.Page>
		);
	}
});
