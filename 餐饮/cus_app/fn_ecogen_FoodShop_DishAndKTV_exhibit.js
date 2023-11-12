//fn_ecogen_FoodShop_DishAndKTV_exhibit
function gov_cyberwin_loacalapp_start_pc领导(){
	
	  var intentp ={store_id:current_store_id,current_order_idV2023:桌台订单号
			   ,printversion:printversion,dish_print_kitchen_no_l:dish_print_kitchen_no_l
				  ,current_table_name:桌台_名称
			   ,current_table_id:桌台id
			   ,table_type_name:桌台_类别_名称
				,current_table_type_name:桌台_类别_名称
			   ,current_today_orderid_store:"0"
			   ,current_store_name:current_store_name,current_store_id:current_store_id
				,cyberwin_server_root:"https://51.onelink.ynwlzc.cn"
			    ,cyberwin_device_screen_height:未来之窗_硬件_可见高度
					//2023-7-25
				,current_staff_id:current_staff_id
				,current_mer_id:current_mer_id
				,current_staff_name:current_staff_name
				,current_APIROOT:未来之窗apiroot
				,未来之窗_session:未来之窗_session
				,未来之窗_clientsn:未来之窗_clientsn
				,未来之窗_bridge_user:未来之窗_bridge_user
				   };

			   window.localStorage.setItem("intent_ktv_dish_foodorder", JSON.stringify(intentp));


			未来之窗中间件 = "https://51.onelink.ynwlzc.cn/o2o/client/cashier_local/cyberwin_middle_5pyq5p2l5LmL56qX5piv5Liq5aWH6JGp.html?param_name=intent_ktv_dish_foodorder&tpl_name=local_tpl_ktv_dish_tableorder";
            未来之窗中间件_2024 = 未来之窗_中间件_Package_CreateURL("intent_ktv_dish_foodorder",intentp,"local_tpl_ktv_dish_tableorder_dac");
	
}


function gov_cyberwin_loacalapp_start_pc领导2023(){
	var 桌台订单号="nnnjjj";
	var 桌台_名称 ="展示";
	var 桌台id  = "5555";
	var 桌台_类别_名称 ="zhanshi ";
	var 未来之窗_硬件_可见高度 =500;
	var title="";
	  var intentp ={store_id:current_store_id,current_order_idV2023:桌台订单号
			   ,printversion:printversion,dish_print_kitchen_no_l:dish_print_kitchen_no_l
				  ,current_table_name:桌台_名称
			   ,current_table_id:桌台id
			   ,table_type_name:桌台_类别_名称
				,current_table_type_name:桌台_类别_名称
			   ,current_today_orderid_store:"0"
			   ,current_store_name:current_store_name,current_store_id:current_store_id
				,cyberwin_server_root:"https://51.onelink.ynwlzc.cn"
			    ,cyberwin_device_screen_height:未来之窗_硬件_可见高度
					//2023-7-25
				,current_staff_id:current_staff_id
				,current_mer_id:current_mer_id
				,current_staff_name:current_staff_name
				,current_APIROOT:未来之窗apiroot
				,未来之窗_session:未来之窗_session
				,未来之窗_clientsn:未来之窗_clientsn
				,未来之窗_bridge_user:未来之窗_bridge_user
                ,current_store_name:c_store_name
				   };

			 


		 
            未来之窗中间件_2024 = 未来之窗_中间件_Package_CreateURL("intent_ktv_dish_foodorder",intentp,"and_local_tpl_ktv_dish_tableexhibit_dac");
		// CyberWin_Dialog.layer(未来之窗中间件_2024,{type:"url",title:title,move:true,width:"1300px",height:"450px",id:未来之窗app_通用ID,mask:true,align:59
		//	 ,hideclose:true
		//	 ,hidetitle:true});


		var ifram="<iframe src='"+未来之窗中间件_2024+"' style='width:100vw;height:100vh;' width1='100vw' height1='100vh' frameborder=0 ></iframe>";

		 $(".cl_handle_data_common_body").html(ifram);

}