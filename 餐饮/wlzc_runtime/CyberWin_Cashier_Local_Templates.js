//2023-2-3 未来之窗 中间件下载模板
//下载模板
function 未来之窗_下载_render_dataV2023(tpl_name , 本地模板){
					//alert("查询");
					//ajax_card
					console.log("渲染系统2024");
					var cwpd_membber_key='';
					//$.get("https://51.onelink.ynwlzc.cn/o2o/pos.php?c=CyberWin_ClientRender_Center&a=start",{tpl:tpl_name},function(result){
					//2023-8-55 运营商故障
					var 未来之窗服务="http://51.onelink.ynwlzc.cn/o2o/pos.php?c=CyberWin_ClientRender_Center&a=start";
					console.log("渲染系统2024="+未来之窗服务);
					$.get(未来之窗服务,{tpl:tpl_name},function(result){
						console.log(result);
					if(result.err_code == 0){
					//	clearInterval(checkPayStatus);
						//g_sale_way
						//alert('支付成功');
						//JSON.stringify(
						console.log("模板加载完成，名称："+本地模板);
						  window.localStorage.setItem(本地模板, result.data);
						 $("#cyberwin_progress_status_text").html("模板加载完成，名称："+本地模板);
					}
						

					 

					 
					 
				//	$('#userQrcodeBtn,#userAlipayQrcodeBtn').html('确认支付');
					//postNow = false;
				},'json');
}

function 未来之窗_下载_render_dataV20230805(tpl_name , 本地模板){
					//alert("查询");
					//ajax_card
					console.log("渲染系统");
					var cwpd_membber_key='';
					//$.get("https://51.onelink.ynwlzc.cn/o2o/pos.php?c=CyberWin_ClientRender_Center&a=start",{tpl:tpl_name},function(result){
					//2023-8-55 运营商故障
					$.get("http://51.onelink.ynwlzc.cn/o2o/pos.php?c=CyberWin_ClientRender_Center&a=start",{tpl:tpl_name},function(result){
						console.log(result);
					if(result.err_code == 0){
					//	clearInterval(checkPayStatus);
						//g_sale_way
						//alert('支付成功');
						//JSON.stringify(
						console.log("模板加载完成，名称："+本地模板);
						  window.localStorage.setItem(本地模板, result.data);
					}
						

					 

					 
					 
				//	$('#userQrcodeBtn,#userAlipayQrcodeBtn').html('确认支付');
					//postNow = false;
				},'json');
}


//2023-2-4 未来之窗缓存机制

function 未来之窗_缓存_加载_dataV2023(服务器api , 数据ID){
					//alert("查询");
					//ajax_card
					console.log("数据加载系统");
					var cwpd_membber_key='';
					$.get(服务器api,{action:""},function(result){
						console.log(result);
					if(result.err_code == 0){
					//	clearInterval(checkPayStatus);
						//g_sale_way
						//alert('支付成功');
						//JSON.stringify(
						console.log("数据加载完成，名称："+数据ID);
						  window.localStorage.setItem(数据ID, result.data);
					}
						


				},'json');
}

//2023-2-5 
function 未来之窗_中间件_Package_CreateURL(intent_名称 , intent_数据 , 模板名称 ){
	  
          
	   
		  

	    window.localStorage.setItem(intent_名称, JSON.stringify(intent_数据));

		var 未来之窗基础架构="";

		if( HyperHybridClient_middleware_Page_version == "wlzcinnernet"){
			未来之窗基础架构 = "./wlzc_runtime/dialog/cyberwin_middle_5pyq5p2l5LmL56qX5piv5Liq5aWH6JGp.html";
		}
		if( HyperHybridClient_middleware_Page_version == "online"){
			未来之窗基础架构 = "http://51.onelink.ynwlzc.cn/o2o/client/cashier_local/cyberwin_middle_5pyq5p2l5LmL56qX5piv5Liq5aWH6JGp.html";
		}

		//var 未来之窗中间件="https://51.onelink.ynwlzc.cn/o2o/client/cashier_local/cyberwin_middle_5pyq5p2l5LmL56qX5piv5Liq5aWH6JGp.html?param_name="+intent_名称+"&tpl_name="+模板名称;
		var 未来之窗中间件=未来之窗基础架构+"?param_name="+intent_名称+"&tpl_name="+模板名称;

        return 未来之窗中间件;
			 

}

//2023-2-5 
function 未来之窗_中间件_运行环境监测(模板名称,默认模板 ){
	console.log("未来之窗环境监测");
	var 本地模板 = window.localStorage.getItem(模板名称);
	//alert(本地模板);
	//未来之窗_下载_render_dataV2023

	if(本地模板==null){
		//alert("错误");
		console.log("未来之窗环境监测-失败，开始加载");
		未来之窗_下载_render_dataV2023(默认模板,模板名称);
		return;
	}

	if(本地模板.length < 100){
		console.log("未来之窗环境监测-失败：不是模板，开始加载");
		未来之窗_下载_render_dataV2023(默认模板,模板名称);
		return;
	}
	console.log("未来之窗环境监测合规="+模板名称);

}

var 未来之窗等待;
var 未来之窗等待窗口 = ['200px', '200px'];


//2023-2-18,讲缓存加载到界面
function 未来之窗_缓存_渲染html( 数据ID){
				 
	 console.log("数据加载系统-》渲染html");
     var 本地数据 = window.localStorage.getItem(数据ID);
	 

	 var 页面元素 = document.getElementsByClassName("intent_data_"+数据ID);
      for (var i = 0; i < 页面元素.length; i++) {
            页面元素[i].innerHTML = 本地数据;
       }


}

//未来之窗 加载动画

function 未来之窗_等待中(){
	 var areaWH = ['100px', '100px'];
	  未来之窗等待  = layer.open({
						id:  '',
						type: 1,
						title: '',
						shadeClose: true,
						shade: 0.6,
						area: areaWH,
						closeBtn: 0, //不显示关闭按钮
						skin: 'layer_bg', //layer_bg是自定义的css样式
						content: '<img src="./wlzc_res/img/app_load.gif" style="width:100px;height:100%;">'
	});

}




