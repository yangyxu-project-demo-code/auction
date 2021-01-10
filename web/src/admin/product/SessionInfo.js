var React = require('react');
module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			model: 'zn_auction_product',
			info: null
		};
	},
	getInitialState: function () {
		return {
			data: zn.store.post('/zn.plugin.admin/model/paging', {
				model: this.props.model,
				where: { sessionId: this.props.id }
			}),
			info: null,
			items: [
				{ title: '操作', width: 60, textAlign: 'center' },
				{ title: '商品名称', name: 'zn_title', width: 280, filter: { type: 'Input', opts: ['like'] } },
				{ title: '状态', name: 'status', width: 100, filter: { type: 'Menu', data: [{ text:'上线中', value: 1 }, { text: '已下线', value: 0 }], opts: ['='] } },
				{ title: '别名', name: 'alias', width: 120 },
				{ title: '类型', name: 'typeId_convert', width: 70 },
				{ title: '当前价', name: 'currentPrice', width: 100 },
				{ title: '保留价', name: 'reservePrice', width: 100 },
				{ title: '起拍价', name: 'beginPrice', width: 100 },
				{ title: '成交价', name: 'endPrice', width: 100 },
				{ title: '佣金', name: 'brokerage', width: 100 },
				{ title: '预估价', name: 'evaluatePrice', width: 100 },
				{ title: '加价幅度', name: 'increaseStep', width: 100 },
				{ title: '保证金', name: 'earnestMoney', width: 100 },
				{ title: '单位', name: 'unit', width: 100 },
				{ title: '围观/次', name: 'watchCount', width: 100 },
				{ title: '报名/人', name: 'applyCount', width: 100 },
				{ title: '设置提醒/人', name: 'notifyCount', width: 100 },
				{ title: '开始时间', name: 'beginTime', width: 130 },
				{ title: '结束时间', name: 'endTime', width: 130 },
				{ title: '修改时间', name: 'modifyTime', width: 130 },
				{ title: '创建时间', name: 'createTime', width: 130 },
				{ title: '描述', name: 'note' }
			],
			formItems: [
				{ title: 'Logo', name: 'logo', type: 'ImageUploader', action: '/auction/uploadFiles' },
				{ title: '名称', name: 'zn_title', type: 'Textarea' },
				{ title: '别名', name: 'alias', type: 'Input' },
				{ title: '状态', name: 'status', type: 'Select', data: [{ text: '上架', value: 1 }, { text: '下架', value: 0 }] },
				//{ title: '开始时间', name: 'beginTime', type: 'Timer' },
				//{ title: '结束时间', name: 'endTime', type: 'Timer' },
				{ title: '起拍价', name: 'beginPrice', type: 'Input', attrs: { type:'number' }, suffix: '￥' },
				{ title: '保留价', name: 'reservePrice', type: 'Input', attrs: { type:'number' }, suffix: '￥' },
				{ title: '预估价', name: 'evaluatePrice', type: 'Input', attrs: { type:'number' }, suffix: '￥' },
				{ title: '加价幅度', name: 'increaseStep', type: 'Input', attrs: { type:'number' }, suffix: '￥' },
				{ title: '保证金', name: 'earnestMoney', type: 'Input', attrs: { type:'number' }, suffix: '￥' },
				{ title: '佣金', name: 'brokerage', type: 'Input' },
				{ title: '延时周期', name: 'delayPeriod', type: 'Input', attrs: { type:'number' }, suffix: '秒' },
				{ title: '单位', name: 'unit', type: 'Input', placeholder: '个/套/件/品' },
				{ title: '图片', name: 'imgs', type: 'FileUploader', action: '/auction/uploadFiles' },
				{ title: '视频', name: 'videos', type: 'FileUploader', action: '/auction/uploadFiles' },
				{ title: '拍品参数', name: 'argv', type: 'RichEditor' },
				{ title: '竞买公告', name: 'gongGao', type: 'RichEditor' },
				{ title: '竞买须知', name: 'xuZhi', type: 'RichEditor' },
				{ title: '竞买帮助', name: 'bangZhu', type: 'RichEditor' },
				{ title: '描述', name: 'note', type: 'RichEditor' }
			],
			sessionFormItems: [
				{ title: '宣传图片', name: 'img', type: 'ImageUploader', action: '/auction/uploadFiles' },
				{ title: '名称', name: 'zn_title', type: 'Input' },
				{ title: '别名', name: 'alias', type: 'Input' },
				{ title: '状态', name: 'status', type: 'Select', data: [{ text: '上架', value: 1 }, { text: '下架', value: 0 }] },
				{ title: '开始时间', name: 'beginTime', type: 'Timer' },
				{ title: '结束时间', name: 'endTime', type: 'Timer' },
				{ title: '图片', name: 'imgs', type: 'FileUploader', action: '/auction/uploadFiles' },
				{ title: '视频', name: 'videos', type: 'FileUploader', action: '/auction/uploadFiles' },
				{ title: '描述', name: 'description', type: 'RichEditor' },
				{ title: '说明', name: 'note', type: 'Textarea' }
			],
			toolbarItems: [
				{ text: '添加商品', name: 'add', icon: 'fa-plus' },
				{ text: '修改专场信息', name: 'updateSession', icon: 'fa-edit' }
			]
		}
	},
	componentDidMount: function (){
		this.__loadSessionInfo();
	},
	__loadSessionInfo: function (){
		zn.http.post('/zn.plugin.admin/model/selectOne', {
			model: 'AuctionSession',
			where: { id: this.props.id }
		}).then(function (data){
			this.setState({
				info: data.result
			});
		}.bind(this));
	},
	__doSuccess: function (){
		this.state.data.refresh();
	},
	__addItem: function (pid){
		zn.dialog({
			title: '添加商品',
			content: <zn.react.Form
				action='/zn.plugin.admin/model/insert'
				exts={{model: this.props.model}}
				merge="values"
				hiddens={{
					sessionId: this.props.id,
					beginTime: this.state.info.beginTime,
					endTime: this.state.info.endTime,
					typeId: this.state.info.typeId
				}}
				onSubmitSuccess={this.__doSuccess}
				items={this.state.formItems} />
		});
	},
	__updateItem: function (data){
		zn.dialog({
			title: '更新专场信息',
			content: <zn.react.Form
				action='/zn.plugin.admin/model/update'
				exts={{model: 'AuctionSession', where: { id: data.id }}}
				merge="updates"
				value={data}
				onSubmitSuccess={()=>this.__loadSessionInfo()}
				items={this.state.sessionFormItems} />
		});
	},
	__onToolbarClick: function (item){
		switch (item.name) {
			case 'add':
				this.__addItem();
				break;
			case 'updateSession':
				this.__updateItem(this.state.info);
				break;
		}
	},
	__listItemRender: function (item, index){
		return <div key={index} className="product-info">
			<img className="logo" src={zn.http.fixURL(item.logo)} />
			<div className="info">
				<div className="title">{item.title}</div>
				<div className="alias">{item.alias}</div>
			</div>
		</div>
	},
	__onRowActions: function (value, data){
		var _data = this.state.data;
		switch (value.item.icon) {
			case 'fa-remove':
				zn.confirm('确定删除该数据吗？','提示', function (){
					zn.http.post('/zn.plugin.admin/model/delete', {
						model: 'AuctionProduct',
						where: { id: data.id }
					}).then(function (data){
						zn.toast.success('删除成功！');
						_data.refresh();
					});
				});
				break;
			case 'fa-edit':
				this.__updateItem(data);
				break;
		}
	},
	__onTableColumnRender: function (rowIndex, columnIndex, data, item, value){
		switch (columnIndex) {
			case 0:
				return <zn.react.ListView
							className="rt-flex"
							data={[
								{ text:'删除商品', icon: 'fa-remove' },
								{ text:'修改商品', icon: 'fa-edit' }
							]}
							itemRender={(item, index)=>{return <i title={item.text} className={'fa '+item.icon} style={item.style} />}}
							onClick={(value)=>this.__onRowActions(value, data)}
							/>;
			case 1:
				return <a style={{textDecoration:'underline'}} href={zn.react.session.relativeURL('/product.info', { id: data.id })} >
					<img style={{width: 24, height: 24, borderRadius: '50%', position: 'relative', top: 8, marginRight: 3}} src={zn.http.fixURL(data.logo)} />
					{value}
				</a>;
			case 2:
				return +value==1?<span style={{color:'green'}}>上架中</span>:<span style={{color:'red'}}>已下架</span>;
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
				return (value||'0')+'￥';
		}
	},
	render: function(){
		if(!this.state.info){
			return <zn.react.DataLoader loader="timer" content="正在努力加载数据中..." />;
		}
		var _imgs = this.state.info.imgs.split(',');
		var _videos = this.state.info.videos.split(',');
		return (
			<zn.react.Page className="auction-session-info" title={this.state.info.zn_title + (this.state.info.alias ? '  (' + this.state.info.alias + ')' : '') }
					toolbarItems={this.state.toolbarItems}
					onToolbarClick={this.__onToolbarClick} >
					<zn.react.ActivityLayout
						begin={380}
						fStyle={{left: 390}}
						direction="left-right" >
						<div className="session-info">
							<div className="logo">
								<img src={this.state.info.img} />
							</div>
							<div className="info">
								<div className="info-item">
									<span>当前状态</span>
									<span>{this.state.info.status==1?'上线中':'已下线'}</span>
								</div>
								<div className="info-item">
									<span>拍品类型</span>
									<span>{this.state.info.typeId_convert}</span>
								</div>
								<div className="info-item">
									<span>出价次数</span>
									<span>{this.state.info.applyCount}次</span>
								</div>
								<div className="info-item">
									<span>提醒次数</span>
									<span>{this.state.info.notifyCount}次</span>
								</div>
								<div className="info-item">
									<span>围观次数</span>
									<span>{this.state.info.watchCount}次</span>
								</div>
								<div className="info-item">
									<span>开拍时间</span>
									<span>{this.state.info.beginTime}</span>
								</div>
								<div className="info-item">
									<span>结束时间</span>
									<span>{this.state.info.endTime}</span>
								</div>
								<div className="info-item" style={{padding: 8}}>
									<div dangerouslySetInnerHTML={{ __html: this.state.info.description }}></div>
								</div>
								<div className="imgs">
									{
										_imgs.map(function (img, index){
											if(img){
												return <img key={index} src={img} />
											}else {
												return null;
											}
										})
									}
								</div>
								<div className="imgs">
									{
										_videos.map(function (video, index){
											if(video){
												return <video key={index} style={{ width: '100%', height: '320px' }} controls>
												  	<source src={video} type="video/mp4" />
												  	<source src={video} type="video/ogg" />
												</video>;
											}else {
												return null;
											}
										})
									}
								</div>
							</div>
						</div>
						<zn.react.PagerView
							view="Table"
							checkbox={0}
							enableFilter={true}
							showHeader={true}
							data={this.state.data}
							columnRender={this.__onTableColumnRender}
							onTableRowClick={this.__onTableRowClick}
							items={this.state.items}/>
					</zn.react.ActivityLayout>
			</zn.react.Page>
		);
	}
});
