//2023-9-13
///专属变量
 var printversion="sortprint";
 var  current_store_name="";
 var current_staff_id="6";
 var current_mer_id = "";
 var current_staff_name ="unkstaff";

 var dish_print_kitchen_no_l = 0;//赋值厨打

//默认数据
function 加载桌台类别和桌台(){
	console.log("加载桌台类别和桌台");

	//local_data_dish_offline_table_type
	var 本地桌台类别 = window.localStorage.getItem("local_data_dish_offline_table_type");
	//console.log(本地桌台类别);

	var 数据 =   eval('(' + 本地桌台类别 + ')'); 

	    CyberWin_ClientRender(tpl_未来之窗_KTV_包间类别).render(数据, function(html){//2020-8-14修改下单模板
						$('.cyberwin_data_dish_table_type').html(html);
		});

	
}

function 加载桌台桌台by类别(类别id){
	console.log("桌台");



	//$("#cyberwin_data_dish_table_type_child_"+类别id).addClass("cur");
	$(".cyberwin_data_dish_table_type_child").css("border","1px solid #ECECEC");
	$("#cyberwin_data_dish_table_type_child_"+类别id).css("border","2px solid red");

	//local_data_dish_offline_table_type
	var 本地桌台 = window.localStorage.getItem("local_data_dish_offline_table");
	//console.log(本地桌台类别);
	var 桌台数据 =   eval('(' + 本地桌台 + ')'); 

	    //2023-9-13 赋能桌台数量
	  current_sel_all=桌台数据.length;


	if(类别id == "-999"){//加载所有
		 CyberWin_ClientRender(tpl_未来之窗_KTV_包间).render(桌台数据, function(html){//2020-8-14修改下单模板
			//console.log(html);
						$('.table_body').html(html);

						cyberwin_calc_rk_end_time_fun();//

						getTableStatus_fun("切换类别"+类别id);
						
		});
		return;//
	}

	var 桌台数据当前=[];

	 for (var i = 0; i < 桌台数据.length; i++) {
            //页面元素[i].innerHTML = 本地数据;
			var 桌台 = 桌台数据[i];

			if(类别id == 桌台.tid){
				桌台数据当前.push(桌台);
			}
			

			//console.log("卓类="+桌台.tid);
      }
     //2023-9-13 赋能桌台数量
	  current_sel_all=桌台数据当前.length;

	//return;

//console.log(桌台数据当前);
	 

	    CyberWin_ClientRender(tpl_未来之窗_KTV_包间).render(桌台数据当前, function(html){//2020-8-14修改下单模板
			//console.log(html);
						$('.table_body').html(html);
						cyberwin_calc_rk_end_time_fun();//

						getTableStatus_fun("切换类别"+类别id);

		});
}


//

///

//2023-7-24 KTV 
//2022-3-30 超时
var cyberwin_overtime_count=0;
//倒计时
function cyberwin_calc_rk_end_time_fun(){
	cyberwin_overtime_count=0;
 //console.clear();
	console.log("倒计时2024");

	 $(".cyberwin_calc_rk_end_time").each(function(){
      // alert($(this).text())
	  //data-rk_time_end
	 // console.log("倒计时"+$(this).data("room-id"));
	 // console.log("离店时间"+$(this).data("rk_time_end"));
	   var calc_rk_time_end=$(this).data("rk_time_end");
	   var calc_time_开单=$(this).data("open_tabletime");

	   
	  // var calc_room_id=$(this).data("room-id");

	 // console.log("倒计时2024===");

	  //  var 未来之窗房态=$(this).data("room-status");//2023-2-22 预留

		var 桌台id=$(this).data('table_id');

		var 桌台订单号 = $("#cwpd_table_sign_"+桌台id).data("current_order_id");
		var 桌台_名称 = $("#cwpd_table_sign_"+桌台id).data("table_name");
		var 桌台_类别 = $("#cwpd_table_sign_"+桌台id).data("table_type_id");
		//var 未来之窗_硬件_可见高度 = document.documentElement.clientHeight;

		 var calc_room_id=桌台id;

		// console.log("倒计时2024=桌台_名称=="+桌台_名称+"   倒计时2024=桌台id=="+桌台id);
		// console.log("倒计时2024=桌台订单号=="+桌台订单号);
		//  console.log("倒计时2024===");

		var 未来之窗中间件="";
		//alert(桌台订单号);
		if((桌台订单号 == "0")||(桌台订单号 == 0)){
			//console.log("倒计时2024,空="+桌台_名称);

			 $("#cwpd_table_sign_"+calc_room_id+"_romm_remain_time").html("");
			  $("#cwpd_table_sign_"+calc_room_id+"_romm_escape_time").html("");
			return ;//预留不计算
		}
        
		// console.log("计算 倒计时2024=桌台_名称=="+桌台_名称+"   倒计时2024=桌台id=="+桌台id);

 


	   var cyberwin_current_date = new Date();//当前时间
	   if(calc_rk_time_end=="0" || calc_rk_time_end == "1970-01-01 08:00"){
		  // console.log("不符合");
		  // $("#cwpd_hotel_room_sign_5415_romm_remain_time").html("");
		  //2022-2-16 修复倒计时清空
		    $("#cwpd_table_sign_"+calc_room_id+"_romm_remain_time").html("");
			 $("#cwpd_table_sign_"+calc_room_id+"_romm_escape_time").html("");
	   }else{
		   
		  
		   // console.log(calc_rk_time_end);
			var cyberwin_calc_rk_time_end_date = new Date(calc_rk_time_end);//
			var calc_time_开单_date =  new Date(calc_time_开单);//

			var diffdatehtml = GetDateDiff(cyberwin_current_date , cyberwin_calc_rk_time_end_date , 1);
			//calc_time_开单
			var diffdatehtml_时长 =  GetDateDiff( calc_time_开单_date,cyberwin_current_date , 1);

			if(diffdatehtml.indexOf("-")){
				//超时2022-3-30

			    cyberwin_overtime_count=cyberwin_overtime_count+1;
			}

			//console.log(diffdatehtml);
			//$("#cwpd_hotel_room_sign_"+calc_room_id+"_romm_remain_time").html("剩："+diffdatehtml);
			 $("#cwpd_table_sign_"+calc_room_id+"_romm_remain_time").html(""+diffdatehtml);
			 $("#cwpd_table_sign_"+calc_room_id+"_romm_escape_time").html(""+diffdatehtml_时长);

        //  cyberwin_rk_end_time_default_date.setMinutes(cyberwin_rk_end_time_default_date.getMinutes()+input_rk_hours);

	   }
     });
	// $("#roomsstatistic_overtime").html(cyberwin_overtime_count);


	setTimeout(function(){
					cyberwin_calc_rk_end_time_fun("我是幽灵");
	},1500);//1.5秒刷新

}
//cyberwin_calc_rk_end_time_fun();//


 //这是发令中心
		function getTableStatus_fun(frommsg){
			console.log("数据请求者："+frommsg+"时间"+(new Date()).cyberwinformat("yyyy-MM-dd hh:mm:ss.S")); 
			refresh_table_State_snowlotus();

		}
		//setTimeout('myrefresh()',40000); //指定30秒刷新一次 
		function refresh_table_State_snowlotus(){ 
			//2022-1-9 小儿子同步

			var 桌台状态api="https://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=cyber_get_table_statusByTableTypeIDV2023";

			 桌台状态api=未来之窗apiroot+"cyber_get_table_statusByTableTypeIDV2023";

			 console.log("数据请求者结果：="+桌台状态api);
			 console.log("数据请求者结果：="+未来之窗_clientsn);
			  console.log("数据请求者结果：="+未来之窗_session);
			

		    //window.location.reload(); 
			var cwpd_type_id="0";
			$.ajax({
				url:桌台状态api,
				type:"post",
				data:{"cwpd_type_id":cwpd_type_id,cwpd_session_staff:未来之窗_session,client_uuid:未来之窗_clientsn},
				dataType:"json",
				success:function(cyber_ret){
					//https://51.onelink.ynwlzc.cn/o2o/ak

					console.log("数据请求者结果：");
					 
					console.log(cyber_ret);
					if(cyber_ret.status==9){
						 var tables_data=cyber_ret.data;

					  for (var k = 0, length = tables_data.length; k < length; k++) {

						  /*
						  data-table-status="{cwpdcms{$vo_room.current_status_text}"  data-open_time="0"
															 data-current_order_id="0"
															 */


						// alert(tables_data[k]);
						//console.log(tables_data[k]);
						var table_one=tables_data[k];
						var table_one_status=table_one.status;
						var table_control_id="#cwpd_table_sign_"+table_one.id;
						if(table_one_status==1){
							console.log(k+table_one.name+"满桌");
							 
							 $(table_control_id).css("background","#c3b50e");
                             $(table_control_id).css("locked");
							 //_total_price
							 //_status
							  $("#cwpd_table_sign_"+table_one.id+"_total_price").html(table_one.total_price);
							 $("#cwpd_table_sign_"+table_one.id+"_status").html(table_one.statusinfo);

							 //2023-2-4 增加订单号
							 $("#cwpd_table_sign_"+table_one.id).data("current_order_id",table_one.current_order_id);
							 $("#cwpd_table_sign_"+table_one.id).data("open_time",table_one.current_order_create_time);

							

							  $("#cwpd_table_sign_"+table_one.id+"_open_tabletime").html(table_one.open_tabletime);

							 //_open_tabletime

							// table-status

							//2023-7-24 增加 
							 $("#cwpd_table_sign_"+table_one.id).data("open_tabletime",table_one.open_tabletime);
							 $("#cwpd_table_sign_"+table_one.id).data("package_default_timelong",table_one.current_order_package_default_timelong);
							 $("#cwpd_table_sign_"+table_one.id).data("room_overtime_hour_price",table_one.current_order_room_overtime_hour_price);
							 $("#cwpd_table_sign_"+table_one.id).data("rk_time_end",table_one.rk_time_end);

							
						}else{
							console.log(k+table_one.name+"空桌");
							 $(table_control_id).css("background","white");
                             $(table_control_id).css("unlocked");
							 //_total_price
							 //_status
							 $("#cwpd_table_sign_"+table_one.id+"_total_price").html("");
							 $("#cwpd_table_sign_"+table_one.id+"_status").html(table_one.statusinfo);

							 //2023-2-4 增加订单号
							 $("#cwpd_table_sign_"+table_one.id).data("current_order_id",0);
							 $("#cwpd_table_sign_"+table_one.id).data("open_time",0);

							 $("#cwpd_table_sign_"+table_one.id+"_open_tabletime").html("");

							 //2023-7-24 增加 
							 $("#cwpd_table_sign_"+table_one.id).data("package_default_timelong",0);
							 $("#cwpd_table_sign_"+table_one.id).data("room_overtime_hour_price",0);
							 $("#cwpd_table_sign_"+table_one.id).data("rk_time_end",0);
							  $("#cwpd_table_sign_"+table_one.id).data("open_tabletime",'');
						}


						}
					}else{
						console.log("系统异常");
					}

					//setTimeout('refresh_table_State_snowlotus()',5000); //指定10秒刷新一次 


				}
			});

		} 



////2023-9-13
/*
	      var current_staff_name="{cwpdcms{$staff_session.name}";
			  var current_store_id="{cwpdcms{$cyber_merchant_store.store_id}";

			   var current_mer_id="{cwpdcms{$cyber_merchant_store.mer_id}";
			    var current_staff_id="{cwpdcms{$staff_session.id}";
			  
			   var  current_store_name="{cwpdcms{$cyber_merchant_store.name}";
			  var printversion="{cwpdcms{$cyber_merchant_store['dish_printversion']}";
       */

		      var current_sel_index=0;
			  var current_sel_all=5;//"{cwpdcms{:count($table_list)}";
			  var current_sel_table_id=0;

			  current_sel_all=Number(current_sel_all);
			     function trans_openCashierDrawer(){
			//alert("11");
			//cyber_openCashierDrawer
			//CyberWin_JsStandardPlug
					CyberWin_JsStandardPlug.cyber_openCashierDrawer();
				}

				function cyberwin_clear_table(){
					//alert(current_sel_table_id);
					//tablename
					var tablename=$("#cwpd_table_select_"+current_sel_index).data("tablename");


					var 餐桌订单号 = $("#cwpd_table_select_"+current_sel_index).parent().data("current_order_id");
					

					if(parseFloat(餐桌订单号)==0){
						alert("【"+tablename+"】没有开台，不能操作");
						return;
					}

					var areaWH = ['40%', '20%'];
					/*
					var url="";//"{cwpdcms{:U('cyberwin_clear_table')}"+"&table_id="+current_sel_table_id+"&current_order_id="+餐桌订单号;
					layer_index = layer.open({
						id:  '',
						type: 2,
						title: '清台-包房：'+tablename,
						shadeClose: true,
						shade: 0.6,
						area: areaWH,
						content: url
					});
						*/
					var 未来之窗中间件_2024 = "http://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=cyberwin_clear_table&table_id="+current_sel_table_id+"&current_order_id="+餐桌订单号+"&cyberwin_client_session_userandstaff_data="+未来之窗_bridge_user;
						var title="清台";
					console.log(未来之窗中间件_2024);
					 CyberWin_Dialog.layer(未来之窗中间件_2024,{type:"url",title:title,move:true,width:"600px",height:"230px",id:未来之窗app_通用ID,mask:true,align:59,hideclose:false});
     

				}
				function cyberwin_chnage_table(){
					//alert(current_sel_table_id);
					//tablename
					var tablename=$("#cwpd_table_select_"+current_sel_index).data("tablename");
					//data-table_type_id  data-open_time  data-id
					var 餐桌订单号 = $("#cwpd_table_select_"+current_sel_index).parent().data("current_order_id");
					

					if(parseFloat(餐桌订单号)==0){
						alert("【"+tablename+"】没有开台，不能操作");
						return;
					}
					//alert("餐桌订单号"+餐桌订单号);
					/*

					var areaWH = ['60%', '70%'];
					//var url="{cwpdcms{:U('cyberwin_chnage_table')}"+"&table_id="+current_sel_table_id;
					var 未来之窗_新技术_api="";//"{cwpdcms{:U('foodshop_edit_order')}"+"&order_id="+餐桌订单号+"&platform={cwpdcms{$_GET['platform']}";

					layer_index = layer.open({
						id:  '',
						type: 2,
						title: '换台-包房：'+tablename,
						shadeClose: true,
						shade: 0.6,
						area: areaWH,
						content: 未来之窗_新技术_api//url
					});

					*/
						var 未来之窗中间件_2024 = "http://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=foodshop_edit_order&order_id="+餐桌订单号+"&cyberwin_client_session_userandstaff_data="+未来之窗_bridge_user;
						var title="换台";
					console.log(未来之窗中间件_2024);
					 CyberWin_Dialog.layer(未来之窗中间件_2024,{type:"url",title:title,move:true,width:"600px",height:"330px",id:未来之窗app_通用ID,mask:true,align:59,hideclose:false});
     

				}

				function cyberwin_selectthistable(table_id_sign,table_id){
					$(".cwpd_tablesel").hide();
					$("#cwpd_table_select_"+table_id_sign).show();
					current_sel_table_id=table_id;
					current_sel_index=table_id_sign;

				}

				//左右键
				$(document).keydown(function(e){
				var key =  e.which;
				if(key == 27){

					 //alert('按下了ESC键，关闭弹出层');
				}
				if(key == 38){

					// alert('按下了38ESC键，关闭弹出层');
				}
				if(key == 37){

					 //alert('按下了37ESC键，关闭弹出层');
					 current_sel_index=current_sel_index-1;
					 if(current_sel_index<0){
						 current_sel_index=0;
					 }
					 $(".cwpd_tablesel").hide();
					 $("#cwpd_table_select_"+current_sel_index).show();
					 current_sel_table_id=$("#cwpd_table_select_"+current_sel_index).data("id");
				}
				if(key == 39){
					current_sel_index=current_sel_index+1;
					if(current_sel_all < current_sel_index){
						current_sel_index=0;

					}

					// alert('按下了39ESC键，关闭弹出层');
					 $(".cwpd_tablesel").hide();
					 $("#cwpd_table_select_"+current_sel_index).show();
					 current_sel_table_id=$("#cwpd_table_select_"+current_sel_index).data("id");
				}
			});

//////////////////////////////////////////////////////////////////////
//2023-9-13
var layer_index = null;
function cyberwin_loacalapp_document_ready(){
	if($('.leftMenu').size() > 0){
		$('.leftMenu').height($(window).height()-50);
		$('.rightMain').height($(window).height()-60);
	}
	$('.urlLink').click(function(){
		var url = $(this).data('url');
		if(url == 'reload'){
			location.reload();
		}else{
			location.href = url;
		}
		
	});
	
	$(window).resize(function(){
		//2023-7-22 取消窗口
		//location.reload();
	});
	
	if($('.fixed_header').size() > 0){
		var fhh = $('.fixed_header').height()+20;
		var fht = $('.fixed_header').offset().top
		$('.rightMain').css('padding-top',fhh);
		$('.fixed_header').css({'position':'fixed','top':fht-10,'width':$('.rightMain').width()});
		
		$('.rightMain').height($(window).height()-60-fhh);
	}
	
	$('.handle_btn').live('click',function(){
		var areaWH = ['80%', '80%'];
		if($(this).data('box_width')){
			areaWH[0] = $(this).data('box_width');
		}
		if($(this).data('box_height')){
			areaWH[1] = $(this).data('box_height');
		}
		layer_index = layer.open({
			id: $(this).data('layer_id') ? $(this).data('layer_id') : '',
			type: 2,
			title: $(this).data('title') ? ($(this).data('title') != 'no' ? $(this).data('title') : false) : '按钮缺少 data-title 参数',
			shadeClose: true,
			shade: 0.6,
			area: areaWH,
			 closeBtn: 0, //不显示关闭按钮
			content: $(this).attr('href')
           


		});
		return false;
	});

	//2023-2-4 未来之窗桌台监听
	$('.handle_btn_dishtable2023').live('click',function(){
		var 桌台id=$(this).data('table_id');

		var 桌台订单号 = $("#cwpd_table_sign_"+桌台id).data("current_order_id");
		var 桌台_名称 = $("#cwpd_table_sign_"+桌台id).data("table_name");
		var 桌台_类别 = $("#cwpd_table_sign_"+桌台id).data("table_type_id");
		var 未来之窗_硬件_可见高度 = document.documentElement.clientHeight;

		var 未来之窗中间件="";
		//alert(桌台订单号);
		if((桌台订单号 == "0")||(桌台订单号 == 0)){
			//alert("空台");
			var intentp ={store_id:current_store_id,table_type_id:桌台_类别
			   ,table_id:桌台id,table_name:桌台_名称,staff_name:current_staff_name
			   ,cyberwin_device_screen_height:未来之窗_硬件_可见高度
				//补全订单开单静态页面
			   ,current_table_name:桌台_名称
			   ,current_table_id:桌台id
			   ,current_store_name:current_store_name
				,printversion:printversion
				,dish_print_kitchen_no_l:dish_print_kitchen_no_l
				,current_today_orderid_store:"0"
			    ,current_store_id:current_store_id
				//2023-7-25
				,current_staff_id:current_staff_id
				,current_mer_id:current_mer_id
				,current_staff_name:current_staff_name
			  };

	            window.localStorage.setItem("intent_dish_foodbefore", JSON.stringify(intentp));

			   未来之窗中间件="https://51.onelink.ynwlzc.cn/o2o/client/cashier_local/cyberwin_middle_5pyq5p2l5LmL56qX5piv5Liq5aWH6JGp.html?param_name=intent_dish_foodbefore&tpl_name=foodshop_order_before";

		}else{

			  var intentp ={store_id:current_store_id,current_order_idV2023:桌台订单号
			   ,printversion:printversion,dish_print_kitchen_no_l:dish_print_kitchen_no_l
				  ,current_table_name:桌台_名称
			   ,current_table_id:桌台id,current_today_orderid_store:"0"
			   ,current_store_name:current_store_name,current_store_id:current_store_id
				,cyberwin_server_root:"https://51.onelink.ynwlzc.cn"
			    ,cyberwin_device_screen_height:未来之窗_硬件_可见高度
					//2023-7-25
				,current_staff_id:current_staff_id
				,current_mer_id:current_mer_id
				,current_staff_name:current_staff_name
				   };

			   window.localStorage.setItem("intent_dish_foodorder", JSON.stringify(intentp));


			未来之窗中间件 = "https://51.onelink.ynwlzc.cn/o2o/client/cashier_local/cyberwin_middle_5pyq5p2l5LmL56qX5piv5Liq5aWH6JGp.html?param_name=intent_dish_foodorder&tpl_name=local_tpl_dish_tableorder";

			//alert("桌台订单号");
		}
		//return false;

		var areaWH = ['80%', '80%'];
		if($(this).data('box_width')){
			areaWH[0] = $(this).data('box_width');
		}
		if($(this).data('box_height')){
			areaWH[1] = $(this).data('box_height');
		}
		layer_index = layer.open({
			id: $(this).data('layer_id') ? $(this).data('layer_id') : '',
			type: 2,
			title: $(this).data('title') ? ($(this).data('title') != 'no' ? $(this).data('title') : false) : '按钮缺少 data-title 参数',
			shadeClose: true,
			shade: 0.6,
			area: areaWH,
			 closeBtn: 0, //不显示关闭按钮
			content: 未来之窗中间件//未来之窗$(this).attr('href')
           


		});
		return false;
	});

	//2023-7-21 
		//2023-7-21 未来之窗KTV桌台监听
	$('.handle_btn_ktvtable2024').live('click',function(){
		var 桌台id=$(this).data('table_id');
		//alert(dish_print_kitchen_no_l);
		//return;

		var 桌台订单号 = $("#cwpd_table_sign_"+桌台id).data("current_order_id");
		var 桌台_名称 = $("#cwpd_table_sign_"+桌台id).data("table_name");
		var 桌台_类别 = $("#cwpd_table_sign_"+桌台id).data("table_type_id");
		var 桌台_类别_名称 = $("#cwpd_table_sign_"+桌台id).data("table_type_name");
		
		var 未来之窗_硬件_可见高度 = document.documentElement.clientHeight;

		var 未来之窗中间件="";
		var 未来之窗中间件_2024 = "";//2023-9-13
		var title = $(this).data('title');

		//alert("桌台订单号="+桌台订单号);

		//alert(桌台订单号);
		if((桌台订单号 == "0")||(桌台订单号 == 0)){
			//alert("空台");
			var intentp ={store_id:current_store_id
				,table_type_id:桌台_类别
				,table_type_name:桌台_类别_名称
				,current_table_type_name:桌台_类别_名称
			   ,table_id:桌台id,table_name:桌台_名称,staff_name:current_staff_name
			   ,cyberwin_device_screen_height:未来之窗_硬件_可见高度
				//补全订单开单静态页面
			   ,current_table_name:桌台_名称
			   ,current_table_id:桌台id
			   ,current_store_name:current_store_name
				,printversion:printversion
				,dish_print_kitchen_no_l:dish_print_kitchen_no_l
				,current_today_orderid_store:"0"
			    ,current_store_id:current_store_id
				//2023-7-21
				,min_consume_money:99
				,room_overtime_hour_price:98
                ,package_default_timelong:120
				//2023-7-25
				,current_staff_id:current_staff_id
				,current_mer_id:current_mer_id
				,current_staff_name:current_staff_name
				,current_APIROOT:未来之窗apiroot
				,未来之窗_session:未来之窗_session
				,未来之窗_clientsn:未来之窗_clientsn
			    ,未来之窗_bridge_user:未来之窗_bridge_user
			  };

	            window.localStorage.setItem("intent_ktv_dish_foodbefore", JSON.stringify(intentp));

			    未来之窗中间件="https://51.onelink.ynwlzc.cn/o2o/client/cashier_local/cyberwin_middle_5pyq5p2l5LmL56qX5piv5Liq5aWH6JGp.html?param_name=intent_ktv_dish_foodbefore&tpl_name=ktv_foodshop_order_before";
               //ktv_foodshop_order_before_dac
				//未来之窗中间件_2024 = 未来之窗_中间件_Package_CreateURL("intent_ktv_dish_foodbefore",intentp,"ktv_foodshop_order_before");
				未来之窗中间件_2024 = 未来之窗_中间件_Package_CreateURL("intent_ktv_dish_foodbefore",intentp,"ktv_foodshop_order_before_dac");
		         
		}else{

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
	
			//alert("桌台订单号");
		}
		//return false;

		var areaWH = ['80%', '80%'];
		if($(this).data('box_width')){
			areaWH[0] = $(this).data('box_width');
		}
		if($(this).data('box_height')){
			areaWH[1] = $(this).data('box_height');
		}


		if( HyperHybridClient_middleware_Page_version == "wlzcinnernet"){
			//alert("采用未来之窗=wlzcinnernet");
			//采用未来之窗
			//var 未来之窗中间件_2024 = 未来之窗_中间件_Package_CreateURL("intent_hotel_deposit_consume","sdsdsd","test");
           // alert(current_staff_name);
			 CyberWin_Dialog.layer(未来之窗中间件_2024,{type:"url",title:title,move:true,width:"1200px",height:"530px",id:未来之窗app_通用ID,mask:true,align:59
				 ,hideclose:true
				 });
           return false;
		}
		if( HyperHybridClient_middleware_Page_version == "online"){
			layer_index = layer.open({
				id: $(this).data('layer_id') ? $(this).data('layer_id') : '',
				type: 2,
				title: $(this).data('title') ? ($(this).data('title') != 'no' ? $(this).data('title') : false) : '按钮缺少 data-title 参数',
				shadeClose: true,
				shade: 0.6,
				area: areaWH,
				 closeBtn: 0, //不显示关闭按钮
				content: 未来之窗中间件//未来之窗$(this).attr('href')
				});
		}


		return false;
		
           


		});

		
	

}