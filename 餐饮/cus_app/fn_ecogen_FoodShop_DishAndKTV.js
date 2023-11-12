/*未来之窗生态环*/

	/*日期格式化*/
	//$(".cwpd_hotel_room_sign_2").css("background-color","#fba53e");

/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.cyberwinformat = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//时间操作增加小时
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}




function Appendzero(obj)
{
			if(obj<10) return "0" +""+ obj;
			else return obj;
}



//时差计算
/**
 * 两个时间相减
 * @param starttime
 * @param endtime
 * @returns
 */
function GetDateDiff(starttime_in,endtime_in,type)
{
  if( starttime_in == null || endtime_in == null){
    return "";
   }
 /*
 var ed = endtime;
 var sd = starttime ;
 if(type==1){
    ed = ed+":00";
 }else if(type ==2){
  sd = sd +":00";
 }
 //此处是解决浏览器兼容性问题，Firefox只能认识2015/06/05格式
    var sd2 = sd.replace(/-/g,"/");
    var ed2 = ed.replace(/-/g,"/");
	*/
 var startTime =starttime_in;// new Date(sd2);
 var endTime =endtime_in;// new Date(ed2); 
 var result = "";
 var date3=endTime.getTime()-startTime.getTime(); //时间差的毫秒数
 if(date3 < 0){
	  date3=startTime.getTime()-endTime.getTime(); //时间差的毫秒数
	   result +="-";
 }
 //计算出相差天数
 var days=Math.floor(date3/(24*3600*1000));
// result += days > 0 ? days + "天" : "0天"; 
  result += days > 0 ? days + "天" : ""; //删除0 
 //计算出小时数
 var leave1=date3%(24*3600*1000);     //计算天数后剩余的毫秒数
 var hours=Math.floor(leave1/(3600*1000));
 result += hours > 0 ? hours + "时" : "0时";
 //计算相差分钟数
 var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
 var minutes=Math.floor(leave2/(60*1000));
 result += minutes > 0 ? minutes + "分" : "0分";
 //计算相差秒数
// var leave3=leave2%(60*1000);          //计算分钟数后剩余的毫秒数
// var seconds=Math.round(leave3/1000);
// 
// result += seconds > 0 ? seconds + "秒" : ""; 
 return result == "" ? "" : result;
}

 



// CyberWin_Dialog.layer(tpl_酒店系统常用_PC,{type:"frame",title:"功能",move:true,width:"109px",height:"350px",id:"cyberwin_floatright",mask:false,align:7,hideclose:true});
 // cyberwin_loacalapp_before_start_pc();
 //cyberwin_helper_merchant_login();//系统登录

 //CyberWin_Dialog.layer(tpl_KTV餐饮展示_PC,{type:"frame",title:"功能",move:true,width:"109px",height:"350px",id:"cyberwin_floatright",mask:false,align:2,hideclose:true,fold:"Y"});

function cyberwin_setLanguageAndReload(语言){
	未来之窗_基建_语言 = 语言;
	//cyberwin_loacalapp_start();
	 cyberwin_loacalapp_start_pc();
}

 function cyberwin_loacalapp_start(){
	// alert("11");
	//加载 api 未来之窗_设备_apiroot
	//2023-8-10 首次
	未来之窗apiroot  = 未来之窗_设备_apiroot();

	  未来之窗_clientsn = 未来之窗_设备_SN();
	  未来之窗_session = 未来之窗_设备_session_id();

	   var 餐饮版本 = 未来之窗_设备_本地配置_读取WEB("soft_version_CyberTrade_ecogen_FoodShop_DishAndKTV");
	   if(餐饮版本 ){
		   if(餐饮版本!="cyberwinphp-error"){
		      soft_version_CyberTrade_ecogen_FoodShop_DishAndKTV=餐饮版本;
		   }
	   }
	   var wlzc_o2o_merchant_id = 未来之窗_设备_本地配置_读取WEB("wlzc_o2o_merchant_id");
	   var wlzc_o2o_store_id = 未来之窗_设备_本地配置_读取WEB("wlzc_o2o_store_id");
	    var wlzc_o2o_store_name = 未来之窗_设备_本地配置_读取WEB("wlzc_o2o_store_name");
	   //
	    if(wlzc_o2o_merchant_id  ){
			if(wlzc_o2o_merchant_id!="cyberwinphp-error"){
			    c_mer_id = wlzc_o2o_merchant_id;
			}
		}
		 if(wlzc_o2o_store_id ){
			 if(wlzc_o2o_store_id!="cyberwinphp-error"){
				 c_store_id = wlzc_o2o_store_id;
				 current_store_id = wlzc_o2o_store_id;
				  store_id  = wlzc_o2o_store_id;
			 }
		}

		 if(wlzc_o2o_store_name ){
			 if(wlzc_o2o_store_name!="cyberwinphp-error"){
				 c_store_name = wlzc_o2o_store_name;
				 
			 }
		}
		//alert(餐饮版本);

		//alert(soft_version_CyberTrade_ecogen_FoodShop_DishAndKTV);
		//alert(wlzc_o2o_merchant_id);
		 

	未来之窗_设备_语言_读取();//读取语言
	未来之窗_设备_本地化diy_读取();//读取打印份数

	//加载店铺信息
	cyberwin_loacalapp_loadconfig店铺();



	//return;
	

	// cyberwin_loacalapp_start_pc();
	if(soft_version_CyberTrade_ecogen_FoodShop_DishAndKTV=="dish_tableexhibit"){
		gov_cyberwin_loacalapp_start_pc领导2023();
	}
	if(soft_version_CyberTrade_ecogen_FoodShop_DishAndKTV=="cashier"){
		 cyberwin_loacalapp_start_pc();
	}

	 
 }

 



 //未来之窗登录加载
 function cyberwin_loacalapp_login_loadconfig(){
	   未来之窗_bridge_user = 未来之窗_设备_bridge_user();
	   未来之窗_bridge_staffinfo = 未来之窗_设备_bridge_staffinfo();
	   current_staff_id= 未来之窗_bridge_staffinfo.staff_id;
	   current_staff_name = 未来之窗_bridge_staffinfo.staff_name;

 }

 /////////2023-8-7
 function cyberwin_loacalapp_loadconfig店铺(){
	 //2023-8-12
	  try{
	 	 var 身份证_str = 未来之窗_数据库_配置_getData("cyberwin_global_intent_app_DeviceConfig_idreader");
	     var 门锁_str = 未来之窗_数据库_配置_getData("cyberwin_global_intent_app_DeviceConfig_DoorLock");
		 var 店铺配置diy_str =未来之窗_数据库_配置_getData("cyberwin_global_intent_app_CyberWin_Store_Config");
		 var 店铺信息_str = 未来之窗_数据库_配置_getData("cyberwin_global_intent_app_CyberWin_Store_info");

		 

	 

	
 


	   var 店铺配置diy_未来之窗解密_un1 =  CryptoJS.TripleDES.decrypt(店铺配置diy_str, wlzc_pwdkey);
	   var 店铺配置diy_未来之窗解密 = 店铺配置diy_未来之窗解密_un1.toString(CryptoJS.enc.Utf8);


	   var 店铺信息_未来之窗解密_un1 =  CryptoJS.TripleDES.decrypt(店铺信息_str, wlzc_pwdkey);
	   var 店铺信息_未来之窗解密 = 店铺信息_未来之窗解密_un1.toString(CryptoJS.enc.Utf8);


	   // var 身份证_obj = eval('(' + 身份证_未来之窗解密 + ')');
	//	var 门锁_obj = eval('(' + 门锁_未来之窗解密 + ')');
		var 店铺配置diy_obj = eval('(' + 店铺配置diy_未来之窗解密 + ')');
		var 店铺信息_obj = eval('(' + 店铺信息_未来之窗解密 + ')');

		//console.log(身份证_obj);
		//console.log(门锁_obj);
		//console.log(店铺配置diy_obj);
		//console.log(店铺信息_obj);
		//DeviceConfig_DoorLock = 门锁_obj;
		CyberWin_Store_Config = 店铺配置diy_obj;
		//DeviceConfig_idreader = 身份证_obj;
		CyberWin_Store_info = 店铺信息_obj;

			console.log("店铺配置");
       }
	   catch(err){		
		}

		//console.log(CyberWin_Store_Config);

		 try{

			未来之窗_设备_本地配置_写入('cyberwin_service_link_store_id',CyberWin_Store_info.store_id);
		    store_id = CyberWin_Store_info.store_id;
			//$('.cl_handle_data_CyberWin_Store_info_name').html(CyberWin_Store_info.name);
		} catch(err){		
		}

		

		
		 try{
			var 新零售语音朗读 = 未来之窗_设备_本地配置_读取("ShopNew_Cashier_open_speechhleper");
			open_speechhleper = 新零售语音朗读;
		} catch(err){
		}




		//2023-8-22
        try{
			current_idreadervendor = DeviceConfig_idreader.vendor_code;//加载身份证厂家
		} catch(err){
			//console.log("预留解析失败");
			current_idreadervendor="";//身份证读卡器失败
					
		}




		




 }

//软件加载完成-封装
function cyberwin_loacalapp_loadconfig_finish(){
	//console.log(CyberWin_Store_info);
	//alert("打印版本="+ CyberWin_Store_info.dish_printversion);
	//var 未来之窗中间件 = 未来之窗_中间件_Package_CreateURL("intent_hotel_deposit_consume","sdsdsd","test");

	//console.log("未来之窗中间件="+未来之窗中间件);

	//alert(HyperHybridClient_middleware_Page_version);

	if(CyberWin_Store_info.dish_printversion){
		printversion = CyberWin_Store_info.dish_printversion;
	}

	current_store_name = CyberWin_Store_info.name;
	current_mer_id  = CyberWin_Store_info.mer_id;

	dish_print_kitchen_no_l = CyberWin_Store_Config.dish_print_kitchen_no;//厨打开关
}

 function cyberwin_loacalapp_loadconfig_新零售(){
	// console.log(CyberWin_Store_Config);


	 //支付方式

	 //$('.cl_handle_data_ecogen_ShopNew_Cashier_member_infoscore').show();
	 if(CyberWin_Store_Config.cashier_hide_btn_pay_offline_grzfb == 1){
		 $('.cl_handle_data_cashier_hide_btn_pay_offline_grzfb').hide();
	 }

	 //cashier_hide_btn_pay_offline_ylsk
	// $('.cl_handle_data_cashier_hide_btn_pay_offline_ylsk').hide();
	 //cashier_hide_btn_pay_offline_grwx
	 

	  if(CyberWin_Store_Config.cashier_hide_btn_pay_offline_grwx == 1){
		 $('.cl_handle_data_cashier_hide_btn_pay_offline_grwx').hide();
	 }

	 //cashier_hide_btn_pay_offline_ylsk
	  if(CyberWin_Store_Config.cashier_hide_btn_pay_offline_ylsk == 1){
		 $('.cl_handle_data_cashier_hide_btn_pay_offline_ylsk').hide();
	 }

	 //cashier_hide_btn_pay_offline_gz
	  if(CyberWin_Store_Config.cashier_hide_btn_pay_offline_gz == 1){
		 $('.cl_handle_data_cashier_hide_btn_pay_offline_gzk').hide();
	 }

	 //cashier_hide_btn_pay_offline_jfzf
	  if(CyberWin_Store_Config.cashier_hide_btn_pay_offline_jfzf == 1){
		 $('.cl_handle_data_cashier_hide_btn_pay_offline_jfzf').hide();
	 }
	 //cashier_hide_btn_pay_offline_hdfk
	  if(CyberWin_Store_Config.cashier_hide_btn_pay_offline_hdfk == 1){
		 $('.cl_handle_data_cashier_hide_btn_pay_offline_hdfk').hide();
	 }

	 //云支付 cashier_hide_btn_pay_cyberwincloudpay
	  if(CyberWin_Store_Config.cashier_hide_btn_pay_cyberwincloudpay == 1){
		 $('.cl_handle_data_cashier_hide_btn_pay_cyberwincloudpay').hide();
	 }

	 //现金 cashier_big_btn_pay_offline_xj
	  if(CyberWin_Store_Config.cashier_big_btn_pay_offline_xj == 1){
		 $('.cl_handle_data_cashier_big_btn_pay_offline_xj').hide();
	 }
	 


	 //中间控制
	 //cashier_hide_btn_diygoods
	   if(CyberWin_Store_Config.cashier_hide_btn_diygoods == 1){
		 $('.cl_handle_data_cashier_hide_btn_diygoods').hide();
	 }
	 //
	  if(CyberWin_Store_Config.cashier_hide_btn_huiyuan == 1){
		 $('.cl_handle_data_cashier_hide_btn_huiyuan').hide();
	 }
	 //cashier_hide_btn_guadan
	  if(CyberWin_Store_Config.cashier_hide_btn_guadan == 1){
		 $('.cl_handle_data_cashier_hide_btn_guadan').hide();
	 }
	 //cashier_hide_btn_buyyj
	   if(CyberWin_Store_Config.cashier_hide_btn_buyyj == 1){
		 $('.cl_handle_data_cashier_hide_btn_buyyj').hide();
	 }

	 //cashier_hide_btn_f5jiesuan
	   if(CyberWin_Store_Config.cashier_hide_btn_f5jiesuan == 1){
		 $('.cl_handle_data_cashier_hide_btn_f5jiesuan').hide();
	 }


	 //底部中枢控制

	 
	if(CyberWin_Store_Config.cashier_hide_btn_card_jcxf == 1){
		 $('.cl_handle_data_cashier_hide_btn_card_jcxf').hide();
	 }
	 //打折 cashier_hide_btn_bill_zddz
	 if(CyberWin_Store_Config.cashier_hide_btn_bill_zddz == 1){
		 $('.cl_handle_data_cashier_hide_btn_bill_zddz').hide();
	 }
	 //整单议价 cashier_hide_btn_bill_zdyj
	 if(CyberWin_Store_Config.cashier_hide_btn_bill_zdyj == 1){
		 $('.cl_handle_data_cashier_hide_btn_bill_zdyj').hide();
	 }
	 //切换打印 cashier_hide_btn_changeprinter
	  if(CyberWin_Store_Config.cashier_hide_btn_changeprinter == 1){
		 $('.cl_handle_data_cashier_hide_btn_changeprinter').hide();
	 }

	 //退货 cashier_hide_btn_tuihuo
	  if(CyberWin_Store_Config.cashier_hide_btn_tuihuo == 1){
		 $('.cl_handle_data_cashier_hide_btn_tuihuo').hide();
	 }


	 //2023-9-9中部控制
	 //cashier_hide_btn_all_middle 中间所有
	  if(CyberWin_Store_Config.cashier_hide_btn_all_middle == 1){
		 $('#cl_handle_ShopNew_Cashier_toolbar_middle').hide();
	 }
	 //cl_handle_ShopNew_Cashier_toolbar_bottom


	 //加载服务器配置
	 //cashier_client_letcart_width
	 //$("p").css("color","red");
	 $(".left").css("width",CyberWin_Store_Config.cashier_client_letcart_width+"px");
	  $(".left").css("min-width",CyberWin_Store_Config.cashier_client_letcart_width+"px");

	  //左侧购物篮高度
	  //cashier_client_letcart_height
	  //$(".roll_table").height(CyberWin_Store_Config.cashier_client_letcart_height);
	  //2023-3-9 z
	  ShopNew_cashier_client_letcart_height = CyberWin_Store_Config.cashier_client_letcart_height;

	  /*

	  var s_size = $(".left").css("font-size");
	  s_number = parseFloat(s_size);
		//if(s_number<30)
		//{
		var newSize = s_number +6;
		$(".left").css("font-size", newSize);
		//}

		//
//.left .tabx_list td.tl h2 {
	 //ShopNew_Cashier_leftcartfontsize
	 */
	// $(".left .tabx_list td.tl h2").css("font-size", ShopNew_Cashier_leftcartfontsize);
	// $(".roll_table td").css("font-size", ShopNew_Cashier_leftcartfontsize);

	// $(".left roll_table").css("font-size", 300);
	  $(" .tabcon").css("font-size", ShopNew_Cashier_leftcartfontsize);
	  $(" .tabcon h2").css("font-size", ShopNew_Cashier_leftcartfontsize);

	 //   $("#cl_handle_ShopNew_Cashier_right_goodslist").css("width","200px");

	//  $('#cl_handle_ShopNew_Cashier_toolbar_middle_2').append($("#cl_handle_ShopNew_Cashier_toolbar_bottom").html());
	 
 //cl_handle_ShopNew_Cashier_toolbar_bottom

  // $("#cl_handle_ShopNew_Cashier_right_goodslist").hide();

 // alert(ShopNew_cashier_client_letcart_height);


	$(".roll_table").height(ShopNew_cashier_client_letcart_height);


 }


   function Renewal_SaleGoodsListForPrizeChange_2024(){
                        // alert("此版本");
	 var title="兑奖";
	 var 未来之窗中间件="https://51.onelink.ynwlzc.cn//o2o/cyberwin_offline_store.php?g=MerchantV6&c=CyberWin_Store&a=Renewal_SaleGoodsListForPrizeChange&cyberwin_client_session_userandstaff_data="+未来之窗_bridge_user;
	 CyberWin_Dialog.layer(未来之窗中间件,{type:"url",title:title,move:true,width:"950px",height:"500px",id:"Renewal_SaleGoodsListForPrizeChange_2024",mask:true,align:5});

 }

  function Renewal_新零售_计次消费(){
                        // alert("此版本");
	 var title="计次消费";
	 var 未来之窗中间件="https://51.onelink.ynwlzc.cn//o2o/cyberwin_offline_store.php?g=MerchantV6&c=CyberWin_Store&a=jc_Renewal_jcxf&cyberwin_client_session_userandstaff_data="+未来之窗_bridge_user;
	 CyberWin_Dialog.layer(未来之窗中间件,{type:"url",title:title,move:true,width:"950px",height:"500px",id:"jcxfRenewal_shop",mask:true,align:5});

 }



 ///////////////////////////
   function cyberwin_loacalapp_before_start_pc(){
	   // return;
	   //
		//   $('.cl_handle_data_commonheader').html(tpl_餐饮KTV娱乐_header_PC);

	   //  $('.cl_handle_data_common_body').html(tpl_新零售系统_gas_PC);

	   //  $('.cl_handle_data_ecogen_ShopNew_Cashier_gasStation_bookheader').html(tpl_新零售系统_订单表头_PC);
	 
	 //  未来之窗加载加油站();
  }
	 
 /////////2023-8-7
 function cyberwin_loacalapp_start_pc(){
	// return;
	// alert("1111");
	/* */
	/*
	  $('.cl_handle_data_common_body').html(tpl_新零售系统_gas_PC);

	  $('.cl_handle_data_ecogen_ShopNew_Cashier_gasStation_bookheader').html(tpl_新零售系统_订单表头_PC);

	  var 销售模式 = 未来之窗_设备_本地配置_读取("ShopNew_Cashier_salemode");
	 // alert("语言设置成功");
	 if(销售模式=="score"){
	 
			未来之窗加载加油站();
	 }
	 */
	// alert('99');

	   $('.cl_handle_data_commonheader').html(tpl_餐饮KTV娱乐_header_PC);
	   $('.cl_handle_data_common_body').html(tpl_餐饮KTV娱乐_body_PC);
	
	//tpl_餐饮KTV娱乐_body_PC
	 $(".cl_handle_data_wlzc_store_name").html(c_store_name);
	 //cashier_client_letcart_width 服务配置宽度
	
/**/
	  //ecogen_ShopNew_Cashier_gasStation_bookheader
	  //cl_handle_data_ecogen_ShopNew_Cashier_gasStation_bookheader

	//  cyberwin_loacalapp_document_ready();
	  cyberwin_loacalapp_loadconfig_新零售();

	  
	/*

	 var 楼层_str = window.localStorage.getItem("hotel_local_hotel_room_floor");
	 var 类型_str = window.localStorage.getItem("hotel_local_hotel_room_type");

	

	//alert(楼层_str);

	 //var 楼层_未来之窗解密 = cyberwin_Algorithm_hardware.wlzc_dec_nc(楼层_str);
	// var 楼层_未来之窗解密 = cyberwin_Algorithm_hardware.wlzc_dec_64(楼层_str);
	  var 楼层_未来之窗解密_un1 =  CryptoJS.TripleDES.decrypt(楼层_str, wlzc_pwdkey);
	  var 楼层_未来之窗解密 = 楼层_未来之窗解密_un1.toString(CryptoJS.enc.Utf8);
	 //wlzc_pwdkey

	// alert(楼层_未来之窗解密);

	

	 


  var 楼层_obj = eval('(' + 楼层_未来之窗解密 + ')');
 console.log("酒店信息");
  // console.log(楼层_obj);

   var 酒店房态模板 =cyber_cyberwinapp_酒店通用布局_tpl_english;
  
    if(未来之窗_基建_语言 == "english"){
		 酒店房态模板 =cyber_cyberwinapp_酒店通用布局_tpl_english;
	}

	if(未来之窗_基建_语言 == "中文"){
		 酒店房态模板 =cyber_cyberwinapp_酒店通用布局_tpl_中文;
	}

   //cl_handle_data_common_body  cyber_cyberwinapp_酒店通用布局_tpl_english
   CyberWin_ClientRender(酒店房态模板).render(楼层_obj, function(html){
		$('.cl_handle_data_common_body').html(html);
								//console.log(html);
	});

	var 类型_未来之窗解密_un1 =  CryptoJS.TripleDES.decrypt(类型_str, wlzc_pwdkey);
	var 类型_未来之窗解密 = 类型_未来之窗解密_un1.toString(CryptoJS.enc.Utf8);
	 var 类型_obj = eval('(' + 类型_未来之窗解密 + ')');
	 CyberWin_ClientRender(cyber_cyberwinapp_酒店mini房价_tpl_english).render(类型_obj, function(html){
		$('.cl_handle_data_hotelScreen_room_typeprice_min_body').html(html);
						
	});

	*/

	 加载桌台类别和桌台();
	 加载桌台桌台by类别("-999");
	 cyberwin_loacalapp_document_ready();//加载事件 2023-9-13
	 cyberwin_loacalapp_loadconfig_finish();
	 cyberwin_loacalapp_login_loadconfig();


 



 }


 /////////2023-8-7

 ///系统助手
function cyberwin_helper_merchant_login(){
	//width:1250,height:550,
	var 登录地址 = './wlzc_runtime/dialog/merchant_store_login.html';
	 CyberWin_Dialog.layer(登录地址,{type:"url",title:"系统登录",move:true,width:"1050px",height:"490px",id:未来之窗app_通用ID,mask:true,align:59,hideclose:true,hidetitle:true,alpha:0.3});
	// CyberWin_Dialog.layer(tpl_模板,{type:"frame",title:"天气预报",move:true,width:"1250px",height:"550px",id:未来之窗app_通用ID,mask:true,align:5});

}

//加载
//load
function cyberwin_helper_merchant_加载(){
	//width:1250,height:550,
	var 登录地址 = '';
	 CyberWin_Dialog.layer(登录地址,{type:"load",title:"加载中.....",move:false,width:"260px",height:"260px",id:"wlzc_arg_load",mask:true,align:5,hideclose:true,hidetitle:false,alpha:0.1});

}

//cyberwin_helper_merchant_提示
function cyberwin_helper_merchant_提示(){
	//width:1250,height:550,
	var 登录地址 = '';
	 CyberWin_Dialog.layer("提示",{type:"notice",title:"8998u",id:"wlzc_arg_notice"});

}

 
 /////////2023-5-21
 function cyberwin_loacalapp_start_刷脸自助(){
	 // CyberWin_JsStandardPlug.locStorage_setVal("未来之窗","hotel_local", "hotel_room_floor" , 楼层_str);
	  //CyberWin_JsStandardPlug.locStorage_setVal("未来之窗","hotel_local", "hotel_room_type" , 类型_str);
	 // alert("---");
	  
	//var 楼层_str = CyberWin_JsStandardPlug.locStorage_getVal("未来之窗","hotel_local","hotel_room_floor");
	//var 类型_str = CyberWin_JsStandardPlug.locStorage_getVal("未来之窗","hotel_local","hotel_room_type");

	 var 楼层_str = window.localStorage.getItem("hotel_local_hotel_room_floor");
	 var 类型_str = window.localStorage.getItem("hotel_local_hotel_room_type");

	

	//alert(楼层_str);

	 //var 楼层_未来之窗解密 = cyberwin_Algorithm_hardware.wlzc_dec_nc(楼层_str);
	// var 楼层_未来之窗解密 = cyberwin_Algorithm_hardware.wlzc_dec_64(楼层_str);
	  var 楼层_未来之窗解密_un1 =  CryptoJS.TripleDES.decrypt(楼层_str, wlzc_pwdkey);
	  var 楼层_未来之窗解密 = 楼层_未来之窗解密_un1.toString(CryptoJS.enc.Utf8)
	 //wlzc_pwdkey

	// alert(楼层_未来之窗解密);

	var 楼层_obj = eval('(' + 楼层_未来之窗解密 + ')');
	
	CyberWin_ClientRender(cyber_cyberwinapp_酒店楼层_tpl).render(楼层_obj, function(html){
		$('.cl_handle_data_wlzc_hotel_floor').html(html);
								//console.log(html);
	});

	 CyberWin_ClientRender(cyber_cyberwinapp_酒店房间_tpl).render(楼层_obj, function(html){
			$('.cl_handle_data_wlzc_hotel_rooms').html(html);
								//console.log(html);
	 });

	 $('.cl_handle_data_commonfooter').html(tpl_cyberwin_footer);

 

   device_screenmode = cyberwin_control_device_getdevice_screenmode();

 }
 /////////2023-5-21


 /////2023-9-4
 function 未来之窗加载加油站(){

	    cashier_client_play_goodsprice=0;

		loading_cart_html_goods_score_show=1;//加油站参数
		shop_cashierdesk_member_showphysical_id = 1 ; //显示实体卡
		shop_cashierdesk_member_showpcard_id = 0;
		shop_cashierdesk_memberinput_queryanduse = 1;
		shop_cashierdesk_member_showpcard_phone = 1;//显示手机号
		shop_cashierdesk_member_showpcard_name = 1;//显示姓名

		checkout_bill_havecard_hide_cash=1;//有会员卡隐藏现金2021-12-29
		checkout_bill_nocard_hide_scorepay=1;//加油站不积分，没有会员卡不显示积分支付

		//size_pos_offset_left_height = 360;



		//loading_cart_html_goodsbarcode_singly =1;

		$('.cl_handle_data_ecogen_ShopNew_Cashier_scoretotal').show();

		$('.cl_handle_data_ecogen_ShopNew_Cashier_member_infoscore').show();
		//cl_handle_data_localapp_search_goods
		//tpl_新零售系统_搜索表头_PC
		$('.cl_handle_data_localapp_search_goods').html(tpl_新零售系统_搜索表头_PC);


		//结账 积分 cl_handle_data_ecogen_ShopNew_Cashier_settlement_total_score
		$('.cl_handle_data_ecogen_ShopNew_Cashier_settlement_total_score').show();
 }


 function cyberwin_control_sysset(system_action){
	 
		   current_fn="sysset";
		   //299=>399
		   if("cyberwin_control_sysamendpassword"==system_action){
			   current_fn = "cyberwin_control_sysamendpassword";
		   }

		      CyberWin_Dialog.layer(tpl_系统设置_密码,{type:"frame",title:"管理员密码",move:false,width:"299px",height:"150px",id:"cyberwin_add_id_store",mask:true,align:5});
         
		   $(".cyberwin_dialog_localapp_fix .set_top .return").html("");

	   $(".cyberwin_dialog_localapp_fix .set_top .return").addClass("cyberwin_dialog_close_x");
 }

 function cwpd_system_set(){
	var sys_password = $("#sys_password").val();
	if(sys_password == "" || sys_password == "0"){
		 layer.msg("系统密码错误", {
					time: 2000, //20s后自动关闭
					btn: ['失败', '知道了']
				  });
                CyberWin_JsStandardPlug.speakText("系统密码错误");
				return false;
	}
	// 
	//if(sys_password == "888888"){
    if(sys_password == system_password){
	}else{
		 CyberWin_JsStandardPlug.speakText("系统密码错误");
		 return false;
	}
	$("#cyberwin_add_id_store").remove();
	//200=>399

	 
	 if("cyberwin_control_sysamendpassword" == current_fn){
		  CyberWin_Dialog.layer(tpl_系统设置_修改密码,{type:"frame",title:"系统设置",move:false,width:"399px",height:"288px",id:"cyberwin_add_id_store",mask:true,align:5});

	 }else{

		 CyberWin_Dialog.layer(tpl_系统设置,{type:"frame",title:"系统设置",move:false,width:"599px",height:"388px",id:"cyberwin_add_id_store",mask:true,align:5});

		 //hotel_cashierdesk_checkingout_printslip_copies
		 $("#sys_temp_hotel_cashierdesk_checkingout_printslip_copies").val(hotel_cashierdesk_checkingout_printslip_copies);
		 $("#sys_tempShopNew_Cashier_leftcartfontsize").val(ShopNew_Cashier_leftcartfontsize);
		 //未来之窗_设备_本地配置_读取  ShopNew_Cashier_leftcartfontsize
		   $("#sys_temp_merchant_id").val(c_mer_id);
		   $("#sys_temp_store_id").val(c_store_id);
		   $("#sys_temp_store_name").val(c_store_name);
		   
	 }

	   $(".cyberwin_dialog_localapp_fix .set_top .return").html("");

	   $(".cyberwin_dialog_localapp_fix .set_top .return").addClass("cyberwin_dialog_close_x");
		
}

function cwpd_system_set_amendpassword(){
	var sys_password_new = $("#sys_password_new").val();
	var sys_password_new_re = $("#sys_password_new_re").val();
	if(sys_password_new == "" || sys_password_new == "0"){
		 layer.msg("新密码不能为空", {
					time: 2000, //20s后自动关闭
					btn: ['失败', '知道了']
				  });
             // CyberWin_JsStandardPlug.speakText("系统密码错误");
			return false;
	}

	if(sys_password_new_re == "" || sys_password_new_re == "0"){
		 layer.msg("重复新密码不能为空", {
					time: 2000, //20s后自动关闭
					btn: ['失败', '知道了']
				  });
             // CyberWin_JsStandardPlug.speakText("系统密码错误");
			return false;
	}

	if(sys_password_new == sys_password_new_re){
		 未来之窗_设备_本地配置_写入('cyberwin_control_sysset_password',sys_password_new);
		  layer.msg("设置密码成功", {
					time: 2000, //20s后自动关闭
					btn: ['失败', '知道了']
				  });
	}else{
		 layer.msg("设置密码错误", {
					time: 2000, //20s后自动关闭
					btn: ['失败', '知道了']
				  });
	}



}



///系统助手
function cyberwin_helper_weather(){
	var tpl_模板 = '<iframe width="280" height="300" frameborder="0" scrolling="no" hspace="0" src="https://i.tianqi.com/?c=code&a=getcode&id=55&icon=1"></iframe>';
	 CyberWin_Dialog.layer(tpl_模板,{type:"frame",title:"天气预报",move:false,width:"339px",height:"388px",id:"cyberwin_add_id_store",mask:true,align:5});
}

function cyberwin_helper_localdish(){
	var tpl_模板 = '酒店没关联餐饮';
	 CyberWin_Dialog.layer(tpl_模板,{type:"frame",title:"天气预报",move:false,width:"339px",height:"388px",id:"cyberwin_add_id_store",mask:true,align:5});
}

function cyberwin_helper_localtraffic(){
	var tpl_模板 = '酒店方没有关联路线';
	 CyberWin_Dialog.layer(tpl_模板,{type:"frame",title:"天气预报",move:false,width:"339px",height:"388px",id:"cyberwin_add_id_store",mask:true,align:5});
}

function cyberwin_helper_localscenic(){
	var tpl_模板 = '酒店方没有关联景区';
	 CyberWin_Dialog.layer(tpl_模板,{type:"frame",title:"天气预报",move:false,width:"339px",height:"388px",id:"cyberwin_add_id_store",mask:true,align:5});
}




//未来之窗 下载数据
function downloadlocalapp_thiswlzcdata(){
	 
				 

}

//2023-8-10 保存线路
function 未来之窗_运行时_DA114(){
	//未来之窗apiroot+
	   var 未来之窗apiroot = "https://apioauth.ynwlzc.net/cyberwin/CyberWinAPI.php/CWPD_ClientTradeCenterAPI/CWPD_ClientTradeCenterDA>DA_CyberTrade_hotel>";
		window.localStorage.setItem("cyberwin_hotel_apiroot",未来之窗apiroot);
		CyberWin_Dialog.layer("服务器切换到青州",{type:"notice",title:"服务切换成功",id:"wlzc_arg_notice"});


}

function 未来之窗_运行时_DA114_新零售(){
	//未来之窗apiroot+
	   var 未来之窗apiroot = "https://apioauth.ynwlzc.net/cyberwin/CyberWinAPI.php/CWPD_ClientTradeCenterAPI/CWPD_ClientTradeCenterDA>DA_CyberWin_Store>";
		window.localStorage.setItem("cyberwin_hotel_apiroot",未来之窗apiroot);
		CyberWin_Dialog.layer("服务器切换到青州",{type:"notice",title:"服务切换成功",id:"wlzc_arg_notice"});


}

function 未来之窗_运行时_DA114_餐饮娱乐(){
		   var 未来之窗apiroot = "https://apioauth.ynwlzc.net/cyberwin/CyberWinAPI.php/CWPD_ClientTradeCenterAPI/CWPD_ClientTradeCenterDA>DA_CyberWin_Treade_KTV>";
		window.localStorage.setItem("cyberwin_hotel_apiroot",未来之窗apiroot);
		CyberWin_Dialog.layer("服务器切换到青州DKS",{type:"notice",title:"服务切换成功",id:"wlzc_arg_notice"});
}

 
  function 未来之窗_硬件设备_同步菜品图片(){
	  layer.msg('下载中请勿操作，等待完成');
	 
	  var url="https://cdn.ynwlzc.net/cloudsvr.php/rpk/gov_pck?type=dishgov&mid="+c_mer_id+"&sid="+c_store_id+"&rootfolder=dishpic";
            
		 var cyberwinapp_du= Cyber_JsPrinterStandard.cyber_download_microapppackage("cyberwin_trader_dishpic","123456",url);
				alert("下载完成");
						 cyberwin_loacalapp_start();

  }

//未来之窗 通用
function 未来之窗_硬件设备_更新基础数据(){
	  layer.msg('下载中请勿操作，等待完成');
	//alert("1122ss");

	//	未来之窗_缓存_加载_dataV2023("https://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=ajax_dish_memo_fororder","local_tpl_dish_menumemo");
	//	未来之窗_缓存_加载_dataV2023("https://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=ajax_get_dish_offline_pay&location=mul","local_data_dish_offline_pay_mul");
	//	未来之窗_缓存_加载_dataV2023("https://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=ajax_get_dish_offline_pay&location=signal","local_data_dish_offline_pay_signal");
		
	//	未来之窗_缓存_加载_dataV2023("https://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=ajax_get_dish_offline_table&location=signal","local_data_dish_offline_table");
        //加载桌子类别
		//ajax_get_dish_offline_table_type
	//	未来之窗_缓存_加载_dataV2023("https://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=ajax_get_dish_offline_table_type&location=signal","local_data_dish_offline_table_type");
   

	var action="ecogen_FoodShop_DishAndKTV_PC_getBaseData";
	var ajax_ServerContent_url=ajax_root+action+"/?mer_id="+c_mer_id+"&store_id="+c_store_id+"&client_sn="+client_sn;

	// console.log("设备信息="+ajax_ServerContent_url);

			var 未来之窗上传数据 ={};
 
	       
		 
			 $.ajax({  
					type: "POST",  
					url:ajax_ServerContent_url,  
					data:未来之窗上传数据,  
					async: false,  
					error: function(request) {  
						//alert("Connection error");  
						 return false;
					},  
					success: function(response) {  

						//接收后台返回的结果  
						console.log("设备信息");
						console.log(response);
						if(response.status==9){
							 

							// var 门锁_obj = data.data.DeviceConfig_DoorLock;

							// console.log("数据加载完成，名称："+数据ID);
						      window.localStorage.setItem("local_tpl_dish_menumemo", response.data.local_tpl_dish_menumemo);
							  window.localStorage.setItem("local_data_dish_offline_pay_signal", response.data.local_data_dish_offline_pay_signal);
							  window.localStorage.setItem("local_data_dish_offline_pay_mul", response.data.local_data_dish_offline_pay_signal);
							  window.localStorage.setItem("local_data_dish_offline_table", response.data.local_data_dish_offline_table);
							  window.localStorage.setItem("local_data_dish_offline_table_type", response.data.local_data_dish_offline_table_type);

							  //菜品信息
							  var local_dish_menu = 'local_dish_normode_menu_' + c_store_id; //本地菜单
                              var local_dish_foodmenu = 'local_dish_food_menu_' + c_store_id; //本地菜单
							  window.localStorage.setItem(local_dish_menu, response.data.local_dish_food_menu_list);
							  window.localStorage.setItem(local_dish_foodmenu, response.data.local_dish_food_menu_list);
					 
                           /*

							 window.localStorage.setItem("cyberwin_global_intent_app_DeviceConfig_DoorLock",门锁_未来之窗加密);
							 window.localStorage.setItem("cyberwin_global_intent_app_DeviceConfig_idreader",身份证_未来之窗加密);
							 window.localStorage.setItem("cyberwin_global_intent_app_CyberWin_Store_Config",店铺配置diy_未来之窗加密);
							 window.localStorage.setItem("cyberwin_global_intent_app_CyberWin_Store_info",店铺信息_未来之窗加密);
							 */



						
                           CyberWin_Dialog.layer("餐饮娱乐基础数据下传成功",{type:"notice",title:"设备硬件信息",id:"wlzc_arg_notice"});

                           cyberwin_loacalapp_start();



							 
							

							  
							  // return true;
							//  cyberwin_closedlg('wlzc_arg_load');//关闭
							  return false;
 
						}
						else{
						 
							// cyberwin_closedlg('wlzc_arg_load');//关闭
								 CyberWin_JsStandardPlug.speakText(data.message);
						  
						}
					}  
					,dataType:'JSON'
				  });

//return;

				  	  console.log("未来之窗_运行时_加载");
					  /*

					  未来之窗_下载_render_dataV2023("foodshop_orderV20230202","local_tpl_dish_tableorder");
		未来之窗_下载_render_dataV2023("foodshop_order_beforeV20230203","foodshop_order_before");
		未来之窗_下载_render_dataV2023("store_arrival_order_2021V20230217","store_arrival_order_2021");

		//加载KTV 开单
		//render_tpl_ktv_foodshop_order_beforeV2020721
		未来之窗_下载_render_dataV2023("ktv_foodshop_order_beforeV2020721","ktv_foodshop_order_before");
		//ktv_foodshop_orderV20230722
		未来之窗_下载_render_dataV2023("ktv_foodshop_orderV20230722","local_tpl_ktv_dish_tableorder");
		*/
		/*

		  var 未来之窗_系统模板_酒店 =[];

		  未来之窗_系统模板_酒店.push('菜单账单=>>未来之窗_下载_render_dataV2023("foodshop_orderV20230202","local_tpl_dish_tableorder");');
		  未来之窗_系统模板_酒店.push('开单=>>未来之窗_下载_render_dataV2023("foodshop_order_beforeV20230203","foodshop_order_before");');
		  //未支付预留
		  未来之窗_系统模板_酒店.push('结算=>>未来之窗_下载_render_dataV2023("store_arrival_order_2021V20230217","store_arrival_order_2021");');
          未来之窗_系统模板_酒店.push('KTV开单=>>未来之窗_下载_render_dataV2023("ktv_foodshop_order_beforeV2020721","ktv_foodshop_order_before");');

          
 
			未来之窗_系统模板_酒店.push('K菜单-通用=>>未来之窗_下载_render_dataV2023("ktv_foodshop_orderV20230722","local_tpl_ktv_dish_tableorder");');
            

          //render_tpl_ktv_foodshop_order_beforeV2020721_dac
		  未来之窗_系统模板_酒店.push('KTV开单-DAC=>>未来之窗_下载_render_dataV2023("ktv_foodshop_order_beforeV2020721_dac","ktv_foodshop_order_before_dac");');
		  //dac 本地化数据

		  未来之窗_系统模板_酒店.push('K菜单-DAC=>>未来之窗_下载_render_dataV2023("ktv_foodshop_orderV20230722_dac","local_tpl_ktv_dish_tableorder_dac");');
          未来之窗_系统模板_酒店.push('结算-DAC=>>未来之窗_下载_render_dataV2023("store_arrival_order_2021V20230217_dac","store_arrival_order_2021_dac");');

		  //2023-11-3 菜品展示
		    未来之窗_系统模板_酒店.push('K领导点菜-DAC=>>未来之窗_下载_render_dataV2023("ktv_foodshop_exhibitV20231103_dac","local_tpl_ktv_dish_tableexhibit_dac");');
              未来之窗_系统模板_酒店.push('K领导点菜-DAC=>>未来之窗_下载_render_dataV2023("and_ktv_foodshop_exhibitV20231103_dac","and_local_tpl_ktv_dish_tableexhibit_dac");');

			 
//cyberwinmicrores://cyberwin_trader_dishpic/dishpic/9301681.jpg
		   CyberWin_Dialog.layer(未来之窗_系统模板_酒店,{type:"progress",title:"系统参数",move:true,width:"500px",height:"450px",id:"system_load_param",mask:true,align:59,hideclose:false,hidetitle:false,alpha:0.3});
*/
		  cwpd_Play_systemload();
}

//2023-11-10
function 未来之窗_运行时_加载(){
 
 
 

		  var 未来之窗_系统模板_酒店 =[];

		  未来之窗_系统模板_酒店.push('菜单账单=>>未来之窗_下载_render_dataV2023("foodshop_orderV20230202","local_tpl_dish_tableorder");');
		  未来之窗_系统模板_酒店.push('开单=>>未来之窗_下载_render_dataV2023("foodshop_order_beforeV20230203","foodshop_order_before");');
		  //未支付预留
		  未来之窗_系统模板_酒店.push('结算=>>未来之窗_下载_render_dataV2023("store_arrival_order_2021V20230217","store_arrival_order_2021");');
          未来之窗_系统模板_酒店.push('KTV开单=>>未来之窗_下载_render_dataV2023("ktv_foodshop_order_beforeV2020721","ktv_foodshop_order_before");');

          
 
			未来之窗_系统模板_酒店.push('K菜单-通用=>>未来之窗_下载_render_dataV2023("ktv_foodshop_orderV20230722","local_tpl_ktv_dish_tableorder");');
            

          //render_tpl_ktv_foodshop_order_beforeV2020721_dac
		  未来之窗_系统模板_酒店.push('KTV开单-DAC=>>未来之窗_下载_render_dataV2023("ktv_foodshop_order_beforeV2020721_dac","ktv_foodshop_order_before_dac");');
		  //dac 本地化数据

		  未来之窗_系统模板_酒店.push('K菜单-DAC=>>未来之窗_下载_render_dataV2023("ktv_foodshop_orderV20230722_dac","local_tpl_ktv_dish_tableorder_dac");');
          未来之窗_系统模板_酒店.push('结算-DAC=>>未来之窗_下载_render_dataV2023("store_arrival_order_2021V20230217_dac","store_arrival_order_2021_dac");');

		  //2023-11-3 菜品展示
		    未来之窗_系统模板_酒店.push('K领导点菜-DAC=>>未来之窗_下载_render_dataV2023("ktv_foodshop_exhibitV20231103_dac","local_tpl_ktv_dish_tableexhibit_dac");');
              未来之窗_系统模板_酒店.push('K领导点菜-DAC=>>未来之窗_下载_render_dataV2023("and_ktv_foodshop_exhibitV20231103_dac","and_local_tpl_ktv_dish_tableexhibit_dac");');

			 
//cyberwinmicrores://cyberwin_trader_dishpic/dishpic/9301681.jpg
		   CyberWin_Dialog.layer(未来之窗_系统模板_酒店,{type:"progress",title:"系统参数",move:true,width:"500px",height:"450px",id:"system_load_param",mask:true,align:59,hideclose:false,hidetitle:false,alpha:0.3});
         $(".cyberwin_dialog_localapp_fix .set_top .return").html("");

	   $(".cyberwin_dialog_localapp_fix .set_top .return").addClass("cyberwin_dialog_close_x");
		  cwpd_Play_systemload();
}

//下载酒店数据
function 未来之窗_酒店硬件设备信息(){
	// CyberWin_Dialog.layer("",{type:"load",title:"加载硬件信息.....",move:false,width:"260px",height:"260px",id:"wlzc_arg_load",mask:true,align:5,hideclose:true,hidetitle:false,alpha:0.1});
   //  CyberWin_Dialog.layer("提示",{type:"notice",title:"8998u",id:"wlzc_arg_notice"});

	var action="ecogen_Hotel_deposit_PC_getConfig";
	var ajax_ServerContent_url=ajax_root+action+"/?mer_id="+c_mer_id+"&store_id="+c_store_id+"&client_sn="+client_sn;

	 

			var 未来之窗上传数据 ={};
 
	       
		 
			 $.ajax({  
					type: "POST",  
					url:ajax_ServerContent_url,  
					data:未来之窗上传数据,  
					async: false,  
					error: function(request) {  
						//alert("Connection error");  
						 return false;
					},  
					success: function(data) {  

						//接收后台返回的结果  
						console.log("设备信息");
						console.log(data);
						if(data.status==9){
							 // $(".cl_handle_data_material").html(data.showContent);
							 /*

							var 楼层  = data.data.hotel_room_floor;
							var 类型  = data.data.hotel_room_type;

							var 楼层_str=JSON.stringify(楼层);
							var 类型_str=JSON.stringify(类型);

							var 楼层_obj = eval('(' + 楼层_str + ')');

						 
							var 楼层_未来之窗加密 = CryptoJS.TripleDES.encrypt(楼层_str, wlzc_pwdkey);
							var 类型_未来之窗加密 = CryptoJS.TripleDES.encrypt(类型_str, wlzc_pwdkey);

						
							 window.localStorage.setItem("hotel_local_hotel_room_floor",楼层_未来之窗加密);
							 window.localStorage.setItem("hotel_local_hotel_room_type",类型_未来之窗加密);
							 */

							 var 门锁_obj = data.data.DeviceConfig_DoorLock;
							 var 身份证_obj = data.data.DeviceConfig_idreader;
							 var 店铺配置diy_obj = data.data.CyberWin_Store_Config;
							 var 店铺信息_obj = data.data.CyberWin_Store_info;
 
							var 门锁_str = JSON.stringify(门锁_obj);
							var 身份证_str = JSON.stringify(身份证_obj);
							var 店铺配置diy_str = JSON.stringify(店铺配置diy_obj);
							var 店铺信息_str = JSON.stringify(店铺信息_obj);


							var 门锁_未来之窗加密 = CryptoJS.TripleDES.encrypt(门锁_str, wlzc_pwdkey);
							var 身份证_未来之窗加密  = CryptoJS.TripleDES.encrypt(身份证_str, wlzc_pwdkey);
							var 店铺配置diy_未来之窗加密  = CryptoJS.TripleDES.encrypt(店铺配置diy_str, wlzc_pwdkey);
							var 店铺信息_未来之窗加密  = CryptoJS.TripleDES.encrypt(店铺信息_str, wlzc_pwdkey);

							//cyberwin_global_intent_applocal_Progress
							//


							 window.localStorage.setItem("cyberwin_global_intent_app_DeviceConfig_DoorLock",门锁_未来之窗加密);
							 window.localStorage.setItem("cyberwin_global_intent_app_DeviceConfig_idreader",身份证_未来之窗加密);
							 window.localStorage.setItem("cyberwin_global_intent_app_CyberWin_Store_Config",店铺配置diy_未来之窗加密);
							 window.localStorage.setItem("cyberwin_global_intent_app_CyberWin_Store_info",店铺信息_未来之窗加密);



						
                           CyberWin_Dialog.layer("设备硬件信息下传成功",{type:"notice",title:"设备硬件信息",id:"wlzc_arg_notice"});


							 
							

							  
							  // return true;
							//  cyberwin_closedlg('wlzc_arg_load');//关闭
							  return false;
 
						}
						else{
						 
							// cyberwin_closedlg('wlzc_arg_load');//关闭
								 CyberWin_JsStandardPlug.speakText(data.message);
						  
						}
					}  
					,dataType:'JSON'
				  });

}


//jiudian
function showRoomesByFloor(mer_id ,store_id,floor_id,floorname){

	 var 楼层_str = window.localStorage.getItem("hotel_local_hotel_room_floor");
	 

	 
	  var 楼层_未来之窗解密_un1 =  CryptoJS.TripleDES.decrypt(楼层_str, wlzc_pwdkey);
	  var 楼层_未来之窗解密 = 楼层_未来之窗解密_un1.toString(CryptoJS.enc.Utf8)
	 

	var 楼层_所有_obj = eval('(' + 楼层_未来之窗解密 + ')');

	if(mer_id == "88889999" && store_id == "88889999" &&  floor_id == "88889999" ){
		CyberWin_ClientRender(cyber_cyberwinapp_酒店房间_tpl).render(楼层_所有_obj, function(html){
			$('.cl_handle_data_wlzc_hotel_rooms').html(html);
			 
								//console.log(html);
	    });
		
		return;

	}


	var 楼层_obj =[];
	楼层_所有_obj.forEach(function(element) {
		  console.log(element);
		  if(element.cyber_id == floor_id){
			  楼层_obj.push(element);
		  }
	});
	
 
 
	 CyberWin_ClientRender(cyber_cyberwinapp_酒店房间_tpl).render(楼层_obj, function(html){
			$('.cl_handle_data_wlzc_hotel_rooms').html(html);
			 
								//console.log(html);
	 });

	  CyberWin_JsStandardPlug.speakText("当前楼层"+floorname);

	 

}






//支付状态
function cyber_store_query_facepay_order(_order_id){
			console.log("查询中....");

	    var deposit_query_url=ajax_root+"selfcheckingByFace_checking_query_ajax/?mer_id="+c_mer_id+"&store_id="+c_store_id+"&client_sn="+client_sn;
		//"?g=Pos&c=CyberTrade_hotel&a=selfcheckingByFace_checking_query_ajax";
		//var ajax_selfcheckingByFace_checking = ajax_root+"selfcheckingByFace_checking_ajax/?mer_id="+c_mer_id+"&store_id="+c_store_id+"&client_sn="+client_sn;
 

		//alert("等待输入密码"+_order_id);

	  	$.post(deposit_query_url,{order_id:0,cwpd_order_sn:_order_id},function(result_ch){

								console.log("一次");

								console.log(result_ch);

								if(result_ch.status == 1){
									console.log("支付成功");
							        console.log(result_ch);
									layer.msg('支付成功');
								 
									 //关闭
									 getAllHotelRommStatus_fun("支付成功");	
									 cyberwin_closedlg('cyberwin_add_id_store');


									return;
 
								}else{
									//layer.msg(result_ch.info+result_ch.status );

									if(result_ch.status == 9005){

										console.log("一次");
										layer.msg("等待用户输入密码...");
										//cwpd_Play_DDYHCZ();
										cyber_store_query_facepay_order(_order_id);
										return;

									 }else if(result_ch.status == 9417){
										 console.log("交易失败，终止了");
										 // cwpd_Play_errorFail();
										// cyber_store_query_order(_order_id,_auth_code,_paymethod);
										// cyber_store_query_order(_order_id);
										return;
									 }
									 else if(result_ch.status == 8005){//支付宝循环检测
										 console.log("一次");
										   layer.msg("支付宝检测中...");//+result_ch.info+result_ch.status );
										   //cwpd_Play_DDYHCZ();
									    	// cyber_store_query_order(_order_id,_auth_code,_paymethod);
										   cyber_store_query_facepay_order(_order_id);
										return;
									 }
									  else if(result_ch.status == 8015){//微信循环检测
										 console.log("一次");
										   layer.msg("微信刷脸检测中...");//+result_ch.info+result_ch.status );
										   //cwpd_Play_DDYHCZ();
									    	// cyber_store_query_order(_order_id,_auth_code,_paymethod);
										   cyber_store_query_facepay_order(_order_id);
										return;
									 }
									 //
									 else{
									      layer.msg(result_ch.info+result_ch.status+"V2020-" );
									}
								}



							}, 'json');

 
	}

//2023-7-4  扫付款码
function cyberwin_client_sacnpayqr(){
	 //CyberWin_JsStandardPlug.speakText("请将付款码对准扫码盒子");
	  CyberWin_Dialog.layer(tpl_付款码_密码,{type:"frame",title:"付款码",move:false,width:"299px",height:"150px",id:"cyberwin_payqr",mask:true,align:5});
	  $("#scan_auth_code").focus();
	  CyberWin_JsStandardPlug.speakText("请将付款码对准扫码盒子");
}

function cyberwin_client_sacnpayqr_submit(){
	 // CyberWin_Dialog.layer(tpl_系统设置_密码,{type:"frame",title:"付款码",move:false,width:"299px",height:"150px",id:"cyberwin_payqr",mask:true,align:5});
	var auth_code =  $cq("#scan_auth_code").val();
	 console.log(auth_code);
	  $cq("#auth_code").val(auth_code);

	var ajax_selfcheckingByFace_checking = ajax_root+"selfcheckingByFace_checking_ajax/?mer_id="+c_mer_id+"&store_id="+c_store_id+"&client_sn="+client_sn;

	 

	      var 未来之窗上传数据 = $('#cyberwin_client_form_face_hotel_self').serialize();

		    console.log(ajax_selfcheckingByFace_checking);

		   console.log(未来之窗上传数据);

		 // return;

		  var request = true;

	       if(request == true){
					request = false;
					$.ajax({
						type : "post",
						url : ajax_selfcheckingByFace_checking,
						dataType : "json",
						data:未来之窗上传数据,
						success : function(result){
								console.log(result);
							var rideList	=	result;
							if(result.status == 9){
							 
								//  layer.msg('正在进入刷脸....');
								  // cyber_store_query_facepay_order(result.cwpd_order_sn);
								 // cyberwin_face_hotel_pay(result.cwpd_order_sn , result.price );
								//  cyber_store_query_facepay_order(result.cwpd_order_sn);
								 

							}else if(result.status == 91){
								cyberwin_closedlg('cyberwin_payqr');
								cyberwin_closedlg('cyberwin_add_id_store');
								CyberWin_JsStandardPlug.speakText(result.message);
								getAllHotelRommStatus_fun("付款成功");
							}
							else if(result.status == 4){
								cyberwin_closedlg('cyberwin_payqr');
								//cyberwin_closedlg('cyberwin_add_id_store');
								CyberWin_JsStandardPlug.speakText(result.message);
							}
							    
							else{
								//request = true;
								//alert(result.message);
								 layer.msg(result.message, {
									time: 2000, //20s后自动关闭
									btn: ['确定', '知道了']
									 });
									cyberwin_closedlg('cyberwin_payqr');
									CyberWin_JsStandardPlug.speakText(result.message);
					now_posting=false;
							}
						},
						error:function(){
							request = true;
							//alert('接口出错');
							 layer.msg(result.message, {
									time: 2000, //20s后自动关闭
									btn: ['确定', '知道了']
									 });
						}
					});
					}
		 
			


				  
				   now_posting=false;
				  return false;
}



 
 

		// alert('6');
			//layer.alert("加载账户回传", {icon: 6});
			 
			
   
 





// 
function 未来之窗_设备_语言_保存(语言){
	 未来之窗_设备_本地配置_写入("system_language",语言);
	  alert("语言设置成功");
}
//系统更新
function 未来之窗_设备_语言_读取(){
	 var 语言 = 未来之窗_设备_本地配置_读取("system_language");
	 // alert("语言设置成功");
	 if(语言 == "cyberwinphp-error"){
	 }else{
	    未来之窗_基建_语言 =语言;
	 }
}

/*
function 未来之窗_设备_本地化_保存(key ,value){
	 未来之窗_设备_本地配置_写入(key,value);
	  alert("设置成功");
}
//系统更新
function 未来之窗_设备_本地化_读取(key){
	 var value = 未来之窗_设备_本地配置_读取("system_language");
	 // alert("语言设置成功");
	 if(value == "cyberwinphp-error"){
	 }else{
	    未来之窗_基建_语言 =value;
	 }
}
*/


function 未来之窗_设备_结账单份数_保存(份数){
	 未来之窗_设备_本地配置_写入("hotel_cashierdesk_checkingout_printslip_copies",份数);
	  alert("结账单份数="+份数);
}
//系统更新
function 未来之窗_设备_本地化diy_读取(){
	 var 份数 = 未来之窗_设备_本地配置_读取("hotel_cashierdesk_checkingout_printslip_copies");
	 if(份数 == "cyberwinphp-error"){
	 }else{
	    hotel_cashierdesk_checkingout_printslip_copies =份数;
	 }
	 // alert("语言设置成功");

	 var 收银字体 = 未来之窗_设备_本地配置_读取("ShopNew_Cashier_leftcartfontsize");
	 if(收银字体 == "cyberwinphp-error" || 收银字体==""){
	 }else{

	    ShopNew_Cashier_leftcartfontsize =收银字体;
	 }

	  
	 var 系统密码 = 未来之窗_设备_本地配置_读取("cyberwin_control_sysset_password");
	 if(系统密码 == "cyberwinphp-error" || 系统密码==""){
	 }else{

	    system_password =系统密码;
	 }

	 var 播报会员信息 = 未来之窗_设备_本地配置_读取("ShopNew_Cashier_open_cardinfo_speak");
	 if(播报会员信息 == "cyberwinphp-error" || 播报会员信息==""){
	 }else{

	    ShopNew_Cashier_open_cardinfo_speak = 播报会员信息;
	 }

	 

}








//获得屏幕尺寸
 function cyberwin_control_device_getdevice_screenmode(){
		   

	 
		   
			var d= CyberWin_JsStandardPlug.cwpd_system_get("device_info","device_screenmode","20225578-2019");
	        return d;
}

//设置屏幕尺寸
 function cyberwin_control_device_setdevice_screenmode(_mode){
		   

	 
		    CyberWin_JsStandardPlug.cwpd_system_set("device_info","device_screenmode",_mode,"20225578-2019");
			var d= CyberWin_JsStandardPlug.cwpd_system_get("device_info","device_screenmode","20225578-2019");
	                alert("屏幕模式：:"+d);
}

//系统更新
//2023-11-10 
function downloadlocalapp_thiswlzc(){
	 var url="http://51.onelink.ynwlzc.cn/o2o/client/device_local_app_download/microapp_andnop/CyberTrade_ecogen_FoodShop_DishAndKTV_update.zip";
     // var cyberwinapp_du= Cyber_JsPrinterStandard.cyber_download_apppackage("CyberTrade_ecogen_hotelSelfcheckingByFace","wlzc2023",url);
	 // alert(cyberwinapp_du);
	  var cyberwinapp_du= Cyber_JsPrinterStandard.cyber_download_microapppackage("CTE_DishAndKTV","123456",url);
				alert(cyberwinapp_du);
}

//调式模式
	 function cyberwin_control_device_setstart(start_mode){
		   

	 
		    CyberWin_JsStandardPlug.cwpd_system_set("APP","start_mode",start_mode,"20225578-2019");
			var d= CyberWin_JsStandardPlug.cwpd_system_get("APP","start_mode","20225578-2019");
	                alert("启动模式：:"+d);
	}

 //设置启动
    function cyberwin_control_client_sethome_app(){
		    alert("设置2");
			//CyberTrade_ecogen_hotelSelfcheckingByFace
         
		 var start_mode ='cyberwin_app://CyberTrade_ecogen_hotelSelfcheckingByFace';
		  CyberWin_JsStandardPlug.cwpd_system_set("APP","DefaultHome",start_mode,"20225578-2019");
			var d= CyberWin_JsStandardPlug.cwpd_system_get("APP","DefaultHome","20225578-2019");
	}

	   function cyberwin_control_client_sethome_app2(){
		    alert("设置2");
         
		 var start_mode ='http://51.onelink.ynwlzc.cn/o2o/client/device_local_app/CyberTrade_ecogen_hotelSelfcheckingByFace/cybewinapp.html';
		  CyberWin_JsStandardPlug.cwpd_system_set("APP","DefaultHome",start_mode,"20225578-2019");
			var d= CyberWin_JsStandardPlug.cwpd_system_get("APP","DefaultHome","20225578-2019");
	}

	//竖屏
	//  CyberWin_JsStandardPlug.cwpd_system_set("Device","ScreenOrientation",cwpddevices_Orientation,"20225578-2019");
	 function cyberwin_control_device_screen_Orientation(cwpddevices_Orientation){
		   

	 
		 CyberWin_JsStandardPlug.cwpd_system_set("Device","ScreenOrientation",cwpddevices_Orientation,"20225578-2019");
		  alert("设置成功");
	}


