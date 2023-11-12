var local_tpl_dish_tableorder="local_tpl_dish_tableorder";
function cwpd_showtest(){
	/*
	var d = decodeURIComponent(demoh);
	   window.localStorage.setItem(local_tpl_dish_tableorder, JSON.stringify(demoh));
	   */

	   /*
	   	var printversion="sortprint";
		 var  dish_print_kitchen_no_l=0;
		 var current_table_name="vip888";
		 var current_table_id="960532";
		 var current_today_orderid_store="0";
		 */

		   var beizhuh='<volist name="cyber_foodshop_memo_type" id="vo" ><br>{pigcms{$vo.name}:<br><volist name="vo.memoes" id="vomc" ><input type="button" value="{pigcms{$vomc.name}" onClick="cwpd_amendspec_mul('+"'"+productKey+"',"+"'{pigcms{$vomc.name}'"+');" style="color:#fff;line-height:30px;border-radius:5px;width:120px;background:-webkit-linear-gradient(top, #9ec623 0%,#63b737 100%);"></volist></volist>';


	   var intentp ={store_id:72,current_order_idV2023:"9223065"
	   ,printversion:"sortprint",dish_print_kitchen_no_l:0,current_table_name:"vip888"
	   ,current_table_id:"960532",current_today_orderid_store:"0"
	   ,current_store_name:"未来之窗-云南分公司",current_store_id:72};

	   window.localStorage.setItem("intent_dish_foodorder", JSON.stringify(intentp));

	var areaWH = ['95%', '80%'];
	  layer.open({
						type: 2,
						title: '【叫起】厨打单',
						shadeClose: true,
						shade: 0.6,
						area: areaWH,
						content: 'https://51.onelink.ynwlzc.cn/o2o/client/cashier_local/cyberwin_middle_5pyq5p2l5LmL56qX5piv5Liq5aWH6JGp.html?param_name=intent_dish_foodorder&tpl_name=local_tpl_dish_tableorder'
					});

}

//cwpd_showtestEP
function cwpd_showtestEP(){
	   var intentp ={store_id:72,table_type_id:"7"
	   ,table_id:"960434",table_name:"A4",staff_name:"{pigcms{$staff_session.name}"
	  };

	   window.localStorage.setItem("intent_dish_foodbefore", JSON.stringify(intentp));

	var areaWH = ['95%', '80%'];
	  layer.open({
						type: 2,
						title: '开台',
						shadeClose: true,
						shade: 0.6,
						area: areaWH,
						content: 'https://51.onelink.ynwlzc.cn/o2o/client/cashier_local/cyberwin_middle_5pyq5p2l5LmL56qX5piv5Liq5aWH6JGp.html?param_name=intent_dish_foodbefore&tpl_name=foodshop_order_before'
					});
}

function cwpd_testorderpay(){
	  var intentp ={ store_id:72,table_type_id:"7"
	   ,table_id:"960434",table_name:"A4",staff_name:"{pigcms{$staff_session.name}"
	   ,current_order_id:"77721646248370"
	   ,current_order_idV2023:"9223410"
	   ,cyberwin_server_root:"https://51.onelink.ynwlzc.cn"
	   ,API_foodshopPayOrder_v2023:"/o2o/store.php?g=Merchant&c=Store&a=ajax_dish_store_arrival_order_2021AndAutoCreateOrder&business_type=foodshop&business_id="
	   ,current_store_id:72
	  };

	   window.localStorage.setItem("intent_dish_store_arrival_order", JSON.stringify(intentp));

	var areaWH = ['95%', '80%'];
	  layer.open({
						type: 2,
						title: '开台',
						shadeClose: true,
						shade: 0.6,
						area: areaWH,
						content: 'https://51.onelink.ynwlzc.cn/o2o/client/cashier_local/cyberwin_middle_5pyq5p2l5LmL56qX5piv5Liq5aWH6JGp.html?param_name=intent_dish_store_arrival_order&tpl_name=store_arrival_order_2021'
					});

}


   var cyberwin_server_root="https://51.onelink.ynwlzc.cn";
 var order_printer_storage_name="order_printer_storage_"+current_store_id;
 var cyberwin_getPrinteres =cyberwin_server_root+ "/o2o/store.php?g=Merchant&c=Store&a=cwpd_getPrinteres&order_id="+current_store_id;

function cwpd_loadTemplate(){

		 // 未来之窗_下载_render_dataV2023("ktv_foodshop_orderV20230722","local_tpl_ktv_dish_tableorder");
		//  return;
		//local_dish_menu
		//请空本地菜单
		//console.log("请空本地菜单缓存");
		//window.localStorage.removeItem(local_dish_foodmenu );
		//window.localStorage.removeItem(local_dish_menu);
		//window.top.location.href=cwpd_topurl_reload;
		未来之窗_下载_render_dataV2023("foodshop_orderV20230202","local_tpl_dish_tableorder");
		未来之窗_下载_render_dataV2023("foodshop_order_beforeV20230203","foodshop_order_before");
		未来之窗_下载_render_dataV2023("store_arrival_order_2021V20230217","store_arrival_order_2021");

		//加载KTV 开单
		//render_tpl_ktv_foodshop_order_beforeV2020721
		未来之窗_下载_render_dataV2023("ktv_foodshop_order_beforeV2020721","ktv_foodshop_order_before");
		//ktv_foodshop_orderV20230722
		未来之窗_下载_render_dataV2023("ktv_foodshop_orderV20230722","local_tpl_ktv_dish_tableorder");


		//加载打印机配置
		cwpd_loadPrinter();
		//2023-9-13
		/*
		未来之窗_缓存_加载_dataV2023("https://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=ajax_dish_memo_fororder","local_tpl_dish_menumemo");
		未来之窗_缓存_加载_dataV2023("https://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=ajax_get_dish_offline_pay&location=mul","local_data_dish_offline_pay_mul");
		未来之窗_缓存_加载_dataV2023("https://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=ajax_get_dish_offline_pay&location=signal","local_data_dish_offline_pay_signal");
		
		未来之窗_缓存_加载_dataV2023("https://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=ajax_get_dish_offline_table&location=signal","local_data_dish_offline_table");
        //加载桌子类别
		//ajax_get_dish_offline_table_type
		未来之窗_缓存_加载_dataV2023("https://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=ajax_get_dish_offline_table_type&location=signal","local_data_dish_offline_table_type");
		*/
		alert("数据同步");
        
//ajax_get_dish_offline_table

	}

       function 加载环境监测(){
		   未来之窗_中间件_运行环境监测("local_tpl_dish_tableorder","foodshop_orderV20230202");
		   未来之窗_中间件_运行环境监测("foodshop_order_before","foodshop_order_beforeV20230203");

		   未来之窗_中间件_运行环境监测("store_arrival_order_2021","store_arrival_order_2021V20230217");
	   }

// 加载环境监测();


  var store_id="{cwpdcms{$cyber_storeinfo_config.store_id}";
		var local_dish_menu = 'local_dish_normode_menu_' + store_id; //本地菜单
        var local_dish_foodmenu = 'local_dish_food_menu_' + store_id; //本地菜单

	  function cwpd_clearLocalDishMenu(){
		//local_dish_menu
		//请空本地菜单
		console.log("请空本地菜单缓存");
		
	 
		window.localStorage.removeItem(local_dish_foodmenu );
		window.localStorage.removeItem(local_dish_menu);
		//window.top.location.href=cwpd_topurl_reload;

	}

	function cwpd_clearLocalDishMenuAndSyncDish(){
		cwpd_clearLocalDishMenu();
		var getFoodMenuUrl_OnlyDishgoods =cyberwin_server_root+ "/o2o/store.php?g=Merchant&c=Store&a=foodshop_getmenuOnlyDishgoodsV2023";

		var cwpd_render_data = $.parseJSON(window.localStorage.getItem(local_dish_foodmenu));
		if (cwpd_render_data == null) {
			$.getJSON(getFoodMenuUrl_OnlyDishgoods ,{order_id:"noneed"},function(result){
				 window.localStorage.setItem(local_dish_foodmenu, JSON.stringify(result));
				 console.log("互联数据-单独菜单");
				  console.log(result);
				 //未来之窗_渲染_菜品();
			});
		
						//未来之窗专用存储
						//CyberWin_JsStandardPlug.locStorage_setVal("cyberwinphpdefault","local_cache",local_total_index, JSON.stringify(response.data));
						
		}else{
			console.log("本地数据单独菜单");
			//未来之窗_渲染_菜品();//
	}

	}