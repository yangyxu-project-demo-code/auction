var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {
			data: null
		};
  	},
	componentDidMount: function(){
		this.__loadData();
	},
	parseTreeData: function (data) {
        var _tree = {};
        zn.each(data, function (item, index){
            if(item.zn_tree_pid==0){
                item.data = [];
                _tree[item.id] = item;
            }else {
                if(_tree[item.zn_tree_pid]){
                    _tree[item.zn_tree_pid].data.push(item);
                }

            }
        });

        return _tree;
    },
    __loadData: function (){
        zn.http.post('/zn.plugin.admin/model/select', {
            model: 'zn_auction_product_type',
            fields: 'id, zn_title, alias, img, zn_tree_pid',
            where: { status:  0 }
        }).then(function (data){
			if(this.isMounted()){
				this.setState({
	                data: this.parseTreeData(data.result)
	            });
				this.refs.owner.reset();
			}
        }.bind(this));
    },
	__onClick: function (item){
		zn.react.session.jump('/product/list?category='+item.id);
    },
	__renderData: function (){
		return <ul className="type-list">
			{
				Object.keys(this.state.data).map(function (key){
					var _item = this.state.data[key];
					return <li key={key} >
						<div onClick={()=>this.__onClick(_item)}>
							<div className="title">{_item.zn_title}</div>
							<div className="alias">{_item.alias}</div>
						</div>
						{
							_item.data.length?<ul className="item-list">
								{
									_item.data.map(function (item, index){
										return <li key={index} onClick={()=>this.__onClick(item)}>
											<img src={zn.http.fixURL(item.img)} />
											<div>{item.zn_title}</div>
										</li>;
									}.bind(this))
								}
							</ul>:null
						}
					</li>;
				}.bind(this))
			}
		</ul>;
	},
	__onDownPullEnd: function (){
		this.__loadData();
	},
	render:function(){
		return (
			<zn.react.ActivityLayout
				direction="top-bottom"
				className="auction-product-type"
				barWidth={0}
				fStyle={{backgroundColor: '#f6f6f6'}}
				begin={zn.react.isIOS()?40:30}>
				<div className="header">
					{zn.react.isIOS()?<div style={{height:10, backgroundColor: '#fff'}}></div>:null}
					<div>中建拍卖 - 寻宝</div>
				</div>
				<zn.react.PullRefresh className="body" ref="owner" onDownPullEnd={this.__onDownPullEnd}>
					{
						this.state.data?this.__renderData():<zn.react.DataLoader loader="timer" content="加载中..." />
					}
				</zn.react.PullRefresh>
			</zn.react.ActivityLayout>
		);
	}
});
