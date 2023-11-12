//2023-8-7 未来之窗增加多段支持
//正式加入 架构模式
var intent_param="";

//2023-8-7
//默认技术互联网 online wlzcinnernet
//var HyperHybridClient_middleware_Page_version="online";


//保留2023-2月技术
function  未来之窗_中间件_运行(){
	var 参数包名称 = CMP_browser_getQueryVariable("param_name");
	var 静态渲染模板 = CMP_browser_getQueryVariable("tpl_name");
    //2023-7-26 调整技术
	未来之窗_中间件_运行_call(参数包名称,静态渲染模板);
}

//2023-7-26 调整技术
function  未来之窗_中间件_运行_clear(){
	//document.write("");
	document.getElementById("middleware_Pag_body").innerHTML = "";
	var 未来之窗脚本 = document.getElementById("middleware_Pag_var");;
	 
     未来之窗脚本.parentNode.removeChild(未来之窗脚本);
	//
}
 
//读取参数
//打印
//2023-7-26 调整技术
function  未来之窗_中间件_运行_call(参数包名称,静态渲染模板){
	 

	if(参数包名称==false){
		return;
	}

	var 参数包str ="";

	if( HyperHybridClient_middleware_Page_version == "online"){
		参数包str = window.localStorage.getItem(参数包名称);
	}

	if( HyperHybridClient_middleware_Page_version == "wlzcinnernet"){

		if(未来之窗客户端技术 ==false){
		  //不支持未来之窗客户端技术
		  //配置错误
		 // return ;
		   参数包str = window.localStorage.getItem(参数包名称);
	     }else{
		
		  // 参数包str = CyberWin_JsStandardPlug.locStorage_getVal("cyberwin_local_cache","local_cache",""+参数包名称);
		  //暂时不采用
		    参数包str = window.localStorage.getItem(参数包名称);
		 }
	}

	
	


	var 参数包=eval("("+参数包str+")");


	var 变量转换="<script id='middleware_Pag_var'>";


	 for(var 参数i in 参数包){
		 console.log("参数包"+参数i);
		 console.log(参数包[参数i]);

		 变量转换 = 变量转换 + "var "+参数i +" = "+ '"'+参数包[参数i] +'"'+";"+' \n ';
		 
	}
	变量转换 = 变量转换 + "</script>";

	document.write(变量转换);

	// document.getElementById("middleware_Pag_body").innerHTML = 变量转换;

	//alert(current_order_idV2023);




	//intent_dish_foodorder

	if(静态渲染模板==false){
		return;
	}

	//var htmlc = decodeURIComponent(escape(window.atob(htmlcb)));

	  console.log("静态渲染模板="+静态渲染模板);

	  var htmlcb = "";//window.localStorage.getItem(静态渲染模板);
		// htmlobj=eval("("+html+")");

	if( HyperHybridClient_middleware_Page_version == "online"){
		htmlcb = window.localStorage.getItem(静态渲染模板);
	}

	if( HyperHybridClient_middleware_Page_version == "wlzcinnernet"){

		if(未来之窗客户端技术   == false){
		  //不支持未来之窗客户端技术
		  //配置错误
		  //return ;
		  htmlcb = window.localStorage.getItem(静态渲染模板);
	     }else{
		
		    // htmlcb = CyberWin_JsStandardPlug.locStorage_getVal("cyberwin_local_cache","local_cache",""+静态渲染模板);
			// 暂时不采用
		     htmlcb = window.localStorage.getItem(静态渲染模板);
		 }
	}


	//	console.log(htmlcb);
						//console.log("原来"+htmlcb);
	 var 未来之窗_代码_html = decodeURIComponent(escape(window.atob(htmlcb)));
	//  var 未来之窗_代码_html = decodeURIComponent(htmlcb);
     console.log("静态渲染模板=》开始渲染");

	//  console.log(未来之窗_代码_html);
	// document.write(未来之窗_代码_html);

	 //middleware_Pag_body
	 //未来之窗 2023-9-14
	// document.getElementById("middleware_Pag_body").innerHTML = 未来之窗_代码_html;
 document.write(未来之窗_代码_html);
	
	//var cwpd_render_data = window.localStorage.getItem(静态渲染模板);//$.parseJSON(window.localStorage.getItem(local_tpl_dish_tableorder));
	//var html = decodeURIComponent(cwpd_render_data);
	//document.write(html);

}




















