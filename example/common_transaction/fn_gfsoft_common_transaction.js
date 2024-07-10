/*
未来之窗之窗封装
author :未来之窗
//用法
 广发专用传输，通用传输通道
依赖于 
ajax_root
改编于 apiaction
返回映射于
未来之窗_DAC_数据_远程交互_高级_response
*/


  //2024-4-16 
  //function 未来之窗_DAC_数据_远程交互_高级_ajax(apiaction,行为,指令,param1="",param2=""){
function 未来之窗_DAC_数据_远程交互_高级_ajax(apiaction,行为,指令,param1="",param2="",funcallback){
        
		var 未来之窗api=ajax_root+apiaction;
	    var key = 指令;//$('#number_or_name').val();
		console.log("未来之窗api="+未来之窗api);
			console.log("key="+key);
		if (key.length < 1) {
			layer.msg('查询失败,没有关键字');
			return false;
		}
		var 消费模式 = 广发_健身_会员_get消费模式();
		消费模式= ''+ 消费模式 ;
		if (消费模式.length < 2) {
			layer.msg('不可操作，没有设置消费模式');
			return false;
		}
		var 登录用户 =未来之窗_设备_session_id();

		console.log("指令："+apiaction+";行为="+行为);

		console.log("未来之窗api="+未来之窗api);


		//var index_loading = layer.load(0, {shade: [0.1,'#000000']});
		$.post(未来之窗api, {'key':key
			,consume_type:消费模式
			,client_uuid:'777777777777777777777'
		    ,cwpd_session_staff:登录用户
			,param1:param1
            ,param2:param2
			}, function(response){
			console.log(response);
			// window.top.
			if (response.status ==9) {
				//layer.msg('查询成功：'+response.message);
				 //2024-4-16 
				 //未来之窗_DAC_数据_远程交互_高级_response(行为,response);
               未来之窗_DAC_数据_远程交互_高级_response(行为,response,funcallback);

			} else {
			   //layer.msg('失败：'+response.message);
			    //2024-4-16 
				 //未来之窗_DAC_数据_远程交互_高级_response(行为,response);
               未来之窗_DAC_数据_远程交互_高级_response(行为,response,funcallback);

			}
			//layer.close(index_loading);
		}, 'json');
  }
