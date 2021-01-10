INSERT INTO `zn_plugin_admin_menu` (`zn_title`, `zn_tree_pid`, `zn_tree_depth`, `zn_tree_order`, `zn_tree_son_count`, `zn_tree_parent_path`, `icon`, `url`)
VALUES
	('拍卖',2,2,2,4,',2,','fa-legal',''),
	('拍品管理',9,3,1,0,',2,9,','fa-product-hunt','/product.manager'),
	('专场管理',9,3,2,0,',2,9,','fa-bell','/product.session'),
	('用户管理',9,3,3,0,',2,9,','fa-user','/user.list');
