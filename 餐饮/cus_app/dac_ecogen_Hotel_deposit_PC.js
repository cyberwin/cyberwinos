//DAC
//存放 远程服务多服务器，和加载数据聚源
//2023-8-8数据源下载
 function 未来之窗_运行时_加载_无进度(){
	// alert(000);
		  console.log("未来之窗_运行时_加载");
		  cwpd_Play_systemload();

		  //
		  未来之窗_下载_render_dataV2023("hotel_deposit_consumev2023","hotel_deposit_consume");
		  未来之窗_下载_render_dataV2023("hotel_changeromeV20230203","hotel_changerome");

		  //2023-2-22 未支付预留
		  未来之窗_下载_render_dataV2023("hotel_appoint_money_today_romeV20230222","hotel_appoint_nomoney_today_room");

		   未来之窗_下载_render_dataV2023("hotel_depositbyroom_middleware_V20230223","hotel_depositbyroomv2023");

		   //未来之窗加载英文
		   //english
		   //hotel_depositbyroom_middleware_V202300804_english
		   //hotel_depositbyroom_middleware_V20230223_english
		    未来之窗_下载_render_dataV2023("hotel_depositbyroom_middleware_V202300804_english","hotel_depositbyroomv2023_english");
			//退房
			//render_tpl_hotel_deposit_consumev20230727_english
			 未来之窗_下载_render_dataV2023("hotel_deposit_consumev20230727_english","hotel_deposit_consume_english");

			 //换房
			  未来之窗_下载_render_dataV2023("hotel_changeromeV20230728_english","hotel_changerome_english");

			   


			  //下载未来之窗基建
			  //render_tpl_hotel_depositbyroom_middleware_V202300804_dac_english.php
			   未来之窗_下载_render_dataV2023("hotel_depositbyroom_middleware_V202300804_dac_english","hotel_depositbyroomv2023_dac_english");
			   //退房
			   未来之窗_下载_render_dataV2023("hotel_deposit_consumev20230727_dac_english","hotel_deposit_consume_dac_english");
				//换房
			 未来之窗_下载_render_dataV2023("hotel_changeromeV20230203","hotel_changerome");
			 //预留
			 未来之窗_下载_render_dataV2023("hotel_appoint_money_today_romeV20230222","hotel_appoint_nomoney_today_room");



		  //2023-2-22 未支付预留
		  //下载取消检测
		//  未来之窗_中间件_运行环境监测("hotel_appoint_nomoney_today_room","hotel_appoint_money_today_romeV20230222");
		  //酒店入住
		  // 未来之窗_中间件_运行环境监测("hotel_depositbyroomv2023","hotel_depositbyroom_middleware_V20230223");

		   //return;

        return;

		//local_dish_menu
		//请空本地菜单
		//console.log("请空本地菜单缓存");
		//window.localStorage.removeItem(local_dish_foodmenu );
		//window.localStorage.removeItem(local_dish_menu);
		//window.top.location.href=cwpd_topurl_reload;
		//未来之窗_下载_render_dataV2023("foodshop_orderV20230202","local_tpl_dish_tableorder");
		//未来之窗_下载_render_dataV2023("foodshop_order_beforeV20230203","foodshop_order_before");
		//加载打印机配置
		//cwpd_loadPrinter();
		//未来之窗_缓存_加载_dataV2023("https://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=ajax_dish_memo_fororder","local_tpl_dish_menumemo");
		//var 未来之窗酒店房间信息 = "https://51.onelink.ynwlzc.cn/o2o/pos.php?c=CyberTrade_hotel&a=Ajax_getRoomInfoClientAllV2023";
		//2023-8-5 运营商故障
		var 未来之窗酒店房间信息 = "http://51.onelink.ynwlzc.cn/o2o/pos.php?c=CyberTrade_hotel&a=Ajax_getRoomInfoClientAllV2023";
		$.get(未来之窗酒店房间信息,{action:"wlzc",client_key:"9080890"},function(result){
				//console.log(result);
					if(result.err_code == 0){
						var 所有房间=result.data;
						//2023-3-11 基础建设所有
						// var 存储名称_酒店房间ALL = "cyberrender_local_cache_hotel_roominfoAll";
						// var 存储数据_酒店房间ALL = JSON.stringify(所有房间);
						// window.localStorage.setItem(存储名称_酒店房间ALL, 存储数据_酒店房间ALL);

						for(var 房间i in 所有房间){
						 console.log("参数包"+房间i);
						 var 房间信息 = 所有房间[房间i];
						 console.log(房间信息);

						 
						 var 存储名称 = "cyberrender_local_cache_hotel_roominfo_"+房间信息.cyber_id;
						 var 存储数据 = JSON.stringify(房间信息);
							 console.log("存储数据="+存储数据);
						window.localStorage.setItem(存储名称, "["+存储数据+"]");

						 
					  }


					}
		},'json');


		未来之窗_智慧3D_读取地图数据();


	}


//
//progress
 function 未来之窗_运行时_加载(){
	// alert(000);
		  console.log("未来之窗_运行时_加载");
		

		  var 未来之窗_系统模板_酒店 =[];

		  未来之窗_系统模板_酒店.push('下载消费=>>未来之窗_下载_render_dataV2023("hotel_deposit_consumev2023","hotel_deposit_consume");');
		  未来之窗_系统模板_酒店.push('换房=>>未来之窗_下载_render_dataV2023("hotel_changeromeV20230203","hotel_changerome");');
		  //未支付预留
		  未来之窗_系统模板_酒店.push('预约=>>未来之窗_下载_render_dataV2023("hotel_appoint_money_today_romeV20230222","hotel_appoint_nomoney_today_room");');
          未来之窗_系统模板_酒店.push('通用押金=>>未来之窗_下载_render_dataV2023("hotel_depositbyroom_middleware_V20230223","hotel_depositbyroomv2023");');

          
		   //未来之窗加载英文
		   //english
		   //hotel_depositbyroom_middleware_V202300804_english
		   //hotel_depositbyroom_middleware_V20230223_english
		 //   未来之窗_下载_render_dataV2023("hotel_depositbyroom_middleware_V202300804_english","hotel_depositbyroomv2023_english");
			//退房
			//render_tpl_hotel_deposit_consumev20230727_english
		//	 未来之窗_下载_render_dataV2023("hotel_deposit_consumev20230727_english","hotel_deposit_consume_english");

			 //换房
		//	  未来之窗_下载_render_dataV2023("hotel_changeromeV20230728_english","hotel_changerome_english");

			未来之窗_系统模板_酒店.push('英文-通用押金=>>未来之窗_下载_render_dataV2023("hotel_depositbyroom_middleware_V202300804_english","hotel_depositbyroomv2023_english");');
            未来之窗_系统模板_酒店.push('英文消费=>>未来之窗_下载_render_dataV2023("hotel_deposit_consumev20230727_english","hotel_deposit_consume_english");');
            未来之窗_系统模板_酒店.push('英文-换房=>>未来之窗_下载_render_dataV2023("hotel_changeromeV20230728_english","hotel_changerome_english");');


			未来之窗_系统模板_酒店.push('DA基建-英文-通用押金=>>未来之窗_下载_render_dataV2023("hotel_depositbyroom_middleware_V202300804_dac_english","hotel_depositbyroomv2023_dac_english");');
            未来之窗_系统模板_酒店.push('DA基建-英文消费=>>未来之窗_下载_render_dataV2023("hotel_deposit_consumev20230727_dac_english","hotel_deposit_consume_dac_english");');
            未来之窗_系统模板_酒店.push('DA基建-英文-换房=>>未来之窗_下载_render_dataV2023("hotel_changeromeV20230728_dac_english","hotel_changerome_dac_english");');

            //DA 中文
			未来之窗_系统模板_酒店.push('DA基建-中文-换房=>>未来之窗_下载_render_dataV2023("hotel_changeromeV20230728_dac","hotel_changerome_dac");');
			未来之窗_系统模板_酒店.push('DA基建-中文-通用押金=>>未来之窗_下载_render_dataV2023("hotel_depositbyroom_middleware_V20230223_dac","hotel_depositbyroomv2023_dac");');
            未来之窗_系统模板_酒店.push('DA基建-中文消费=>>未来之窗_下载_render_dataV2023("hotel_deposit_consumev2023_dac","hotel_deposit_consume_dac");');//
           



			  //下载未来之窗基建
			  //render_tpl_hotel_depositbyroom_middleware_V202300804_dac_english.php
			  
			   //退房
			//   未来之窗_下载_render_dataV2023("hotel_deposit_consumev20230727_dac_english","hotel_deposit_consume_dac_english");
				//换房
			// 未来之窗_下载_render_dataV2023("hotel_changeromeV20230203","hotel_changerome");
			 

		   CyberWin_Dialog.layer(未来之窗_系统模板_酒店,{type:"progress",title:"系统参数",move:true,width:"500px",height:"450px",id:"system_load_param",mask:true,align:59,hideclose:false,hidetitle:false,alpha:0.3});
          cwpd_Play_systemload();
 }
