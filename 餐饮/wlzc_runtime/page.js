Page({
    data: {
        userInfo: null,
        cyber_var_openid: "no",
        cyber_shopnew_yye: "0000.00",
        cyber_shopnew_yye_cashier: "0.00",
        cyber_login_modalHidden: !0,
        cyber_login_tip: "请输入未来之窗收银商户账号密码",
        cyberwin_cashier_url: ""
    },
    onLoad: function(e) {
		console.log("页面加载完成未来之窗2023");
	 
 
		
	},
    onReady: function() {
	},
    onShow: function() {
		console.log("读取数据");
		//cwpd_getdeviceconfig();

			cyberwin_loacalapp_start();//加载未来之窗数据
		

		 

		 
		  var client_uuid='ffffffff-2023-516';//'00000000-6bf9-6d03-6bf9-6d0300000000-00';//'00000000-3fa1-4f28-3fa1-4f2800000000';//未来之窗 '00000000-6bf9-6d03-6bf9-6d0300000000';
		  try{
		        client_uuid=CyberWin_JsStandardPlug.getDeviceUUid();
		  }catch(err) {
			   console.log("读取设备id失败2023-10-32");
				 
			}

		console.log("读取数据uuid="+client_uuid);
		 // client_uuid='ffffffff-2023-516';
		 $.post("https://51.onelink.ynwlzc.cn/o2o/index.php/ApplicationclientAPI/clientScreenDataAPI",{client_uuid:client_uuid,datatradetype:""},function(response){
			   //$("span").html(result);
			   console.log("服务器-数据");
			   	console.log(response);
				if(response.status ==75 ){
					//弹出
					var acturl="https://51.onelink.ynwlzc.cn/o2o/cyberwin_xcxqr/index.php/ApplicationclientAPI/o2owlzcactive?client_uuid="+client_uuid;

    	               var qrimgurl="https://51.onelink.ynwlzc.cn//cyber_lib/qr/cyber_qrg.php?url="+encodeURIComponent(acturl);
					//cyberwin_alert_open('设备未授权','<img src="'+qrimgurl+'" style="width:340px;"><br>请微信扫码绑定',"同意","不同意");
					CyberWin_Dialog.open('设备未授权','<img src="'+qrimgurl+'" style="width:250px;"><br>请微信扫码绑定'+client_uuid,"同意","不同意");
					return;
				}

			


			   	console.log(response.data);
			 

					$(".cl_handle_data_wlzc_store_name").html(response.data.storeinfo.store_name);
					c_store_name = response.data.storeinfo.store_name;
					c_mer_id =  response.data.storeinfo.mer_id;
					c_store_id = response.data.storeinfo.store_id;
					

				//	CyberWin_Dialog.layer(tpl_酒店系统常用,{type:"frame",title:"功能",move:true,width:"109px",height:"350px",id:"cyberwin_floatright",mask:false,align:7,hideclose:true});


				//	cyberwin_loacalapp_start();//加载未来之窗数据

				return;
				//	$(".hotel_screen_title_div_hoteldesc").html(response.data.storeinfo.store_feature);
					

					// console.log($('#cyber_cyberwinapp_tpl').html());
				var jsonstring =	JSON.stringify(response.data);
				
				//不保存CyberWin_JsStandardPlug.cwpd_system_set("smargscreen","gcxx_body",jsonstring,"20225578-2019");

				//2023-1-27 加载房价
				/*
				
				CyberWin_ClientRender($('#cyber_cyberwinapp_hotelprice_tpl').html()).render(response.data.hotel_type, function(html){
					$('#roomtypebody').html(html);
				 });

				//2020-11-6 加载
				//2023-3-28 图片单独加载
				  CyberWin_ClientRender($('#cyber_cyberwinapp_tpl').html()).render(response.data.hotel_room_images, function(html){
					  //2020-8-14修改下单模板
					  console.log("渲染");
					  //2022-11-18
					   setTimeout(function(){ cybber_load_splash_img(); }, 3000);
						$('#cyber_cyberwinapp_body').html(html);
						
			      });


				  //加载背景音乐
				  if(response.data.hotel_bgsound.status==9){
					  //
					  document.getElementById("cyberwin_bgsound").src=response.data.hotel_bgsound.audio;
				  }
                        */

		  }, 'json');
	}
});