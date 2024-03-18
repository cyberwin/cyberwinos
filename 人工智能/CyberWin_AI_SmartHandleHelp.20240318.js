//AI_SmartHandleHelp
//未来之窗 人工智能
//2024-2-13
var CyberWin_AI_SmartHandleHelp = function(){
	this.未来之窗_AI_Package_Parse =function(未来之窗command){
			var 未来之窗ret ={param1:''};

			if(未来之窗command.length <30){
				未来之窗ret ={param1:'',command:'cyberwinvosnone'};
				return 未来之窗ret;
			}
		 
			var 未来之窗command_mix_o = 未来之窗command.split("CyberPHP->Param:");
			console.log(未来之窗command_mix_o);
			var 指令数量=未来之窗command_mix_o.length;
			for(var i_指令 = 0 ; i_指令 < 指令数量 ;i_指令 ++){
				var 指令one = 未来之窗command_mix_o[i_指令];
				//console.log("指令one");
				
				if(指令one == ''){
					console.log(i_指令+"=指令无效");
					continue;
				}
				if(指令one.length <16 ){
					console.log(i_指令+"=指令无效，不符合未来之窗》"+指令one);
					continue;
				}
				console.log(指令one);
				var 来之窗command_one_array = 指令one.split("CyberPHP->Value:");
				console.log("来之窗command_one_array");
				console.log(来之窗command_one_array);
				未来之窗ret[来之窗command_one_array[0]]=来之窗command_one_array[1];
			}
			return 未来之窗ret;
	}
	,
	this.start = function(mer_id,store_id,client_sn,loc_action,loc_function,callback){
		//loc_action=getHotelHandle getDatapot
		//loc_function = hotel commerce_order
		 //酒店
	 //  var 未来之窗apiroot = "https://apioauth.ynwlzc.net/cyberwin/CyberWinAPI.php/CWPD_ClientTradeCenterAPI/CWPD_ClientTradeCenterDA>DA_CyberTrade_hotel>";
	var 未来之窗cpu =this;

	//"http://127.0.0.1:19877/cyberwinvos/?app=AI_SmartHandleHelp&a=getDatapot&f="+action+"&woutputweb=yes&mer_id=666&client_sn="+client_sn+"&mer_id="+c_mer_id+"&store_id="+c_store_id;

	  
	//var ajax_ServerContent_url="http://127.0.0.1:19877/cyberwinvos/?app=AI_SmartHandleHelp&a=getHotelHandle&f=hotel&woutputweb=yes&mer_id="+mer_id+"&store_id="+store_id+"&client_sn="+client_sn;
	//+action+"/?mer_id="+c_mer_id+"&store_id="+c_store_id+"&client_sn="+client_sn;
     var ajax_ServerContent_url="http://127.0.0.1:19877/cyberwinvos/?app=AI_SmartHandleHelp&a="+loc_action+"&f="+loc_function+"&woutputweb=yes&mer_id="+mer_id+"&store_id="+store_id+"&client_sn="+client_sn;
	
	 

			var 未来之窗上传数据 ={};
 
	       console.log("未来之窗_AI：下载未来之窗ai"+ajax_ServerContent_url);
		 
			 $.ajax({  
					type: "GET",  
					url:ajax_ServerContent_url,  
					data:未来之窗上传数据,  
					async: false,  
					error: function(request) {  
						//alert("Connection error");  
						console.log("未来之窗_AI：下载未来之窗ai-失败i");
						 return false;
					},  
					success: function(data) {  
						//接收后台返回的结果  
						//alert(data);
						console.log("下载未来之窗ai");
						console.log(data);
						var 未来之窗_AIret =未来之窗cpu.未来之窗_AI_Package_Parse(data);
						callback(未来之窗_AIret,data);
					 
						 
					}  
					//,dataType:'JSON'
				  });
	}
};




 