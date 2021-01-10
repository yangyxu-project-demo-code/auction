var React = require('react');
var SessionList = require('./SessionList.js');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			types: [],
			advs: []
		};
  	},
	componentDidMount: function(){
		this.__loadData();
	},
	__loadData: function (){
        zn.http.post('/auction/product/getTypes', {
			pid: 0
		}).then(function (data){
            this.setState({
                types: data.result[0],
				advs: data.result[1]
            });
			this.refs.owner.reset();
        }.bind(this), function (xhr){

        });
    },
	__onCategoryClick: function (item, index){
		var _href = '/product/list';
		if(item.href){
			_href = item.href;
		}
		zn.react.session.jump(_href, { category: item.id })
	},
	__onDownPullEnd: function (){
		this.__loadData();
	},
	render:function(){
		var _callPhone = '400-811-2829';
		return (
			<zn.react.ActivityLayout
				direction="top-bottom"
				className="auction-good-thing"
				fStyle={{backgroundColor: '#f6f6f6'}}
				begin={zn.react.isIOS()?100:90}>
				<div className="gt-header">
					{zn.react.isIOS()?<div style={{height:10, backgroundColor: '#fff'}}></div>:null}
					<div className="title">中建拍卖 - 精品</div>
					<div className="search" onClick={()=>zn.react.session.jump('/search')}>
						<i className="fa fa-search" />
						<span>请输入拍品</span>
					</div>
					<div className="tips">
						<div><i className="fa fa-gavel" /><span>保真保赔</span></div>
						<div>
							<a href={"tel:" + _callPhone}><i className="fa fa-volume-control-phone" /><span>{_callPhone}</span></a>
						</div>
					</div>
				</div>
				<div className="gt-body">
					<div className="carousel">
						<zn.react.Slider autoPlayInterval={2e3}>
							{
								this.state.advs.map(function (value, index){
									return <img onClick={()=>zn.react.session.jump('/session/info', {sessionId: value.id})} key={index} src={zn.http.fixURL(value.img)} />;
								})
							}
						</zn.react.Slider>
					</div>
					<div className="category-list">
						{
							this.state.types.map(function (item, index) {
								return <div onClick={()=>this.__onCategoryClick(item, index)} key={index} className="category">
									<img src={zn.http.fixURL(item.img)} />
									<span>{item.title}</span>
								</div>;
							}.bind(this))
						}
					</div>
					<SessionList />
				</div>
			</zn.react.ActivityLayout>
		);
	}
});
