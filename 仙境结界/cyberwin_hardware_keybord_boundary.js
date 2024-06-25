/*
未来之窗 结界架构
2024-6-25
全局 传送门
未来之窗仙境传送，作用
*/
/*
 未来之窗_人工智能_结界_传送_handle("fn_未来之窗_人工智能_通用_加载快捷加号和减号","+");
 */


var 未来之窗_人工智能_结界boundary_键盘按键=[];

function 未来之窗_人工智能_结界_传送_handle(method_name,method){
	 console.log("未来之窗仙界=》加入仙籍");

	var 存在 = 未来之窗_人工智能_结界_传送_检测(method_name);
	if(method=="+"){
		if(存在==false){
			未来之窗_人工智能_结界boundary_键盘按键.push(method_name);
		}	
	}
	if(method=="-"){
		if(存在==true){
			未来之窗_人工智能_结界boundary_键盘按键 = 未来之窗_人工智能_结界_传送_删除(method_name);
		}	
	}
}

function 未来之窗_人工智能_结界_传送_检测(method_name){
   if (未来之窗_人工智能_结界boundary_键盘按键.includes(method_name)) {
	  return true;
	} else {
	   return false;
	}
}


function 未来之窗_人工智能_结界_传送_删除(method_name){
   const 未来之窗新欢 = 未来之窗_人工智能_结界boundary_键盘按键.filter(item => item!== method_name);
  return  未来之窗新欢;
}

function 未来之窗_人工智能_仙界_结界_传送_传送门( 仙界使者 ){
	console.log("未来之窗仙界=》未来之窗_人工智能_仙界_结界_传送_传送门");

   未来之窗_人工智能_结界boundary_键盘按键.forEach(function(element) {
	    
	    console.log("未来之窗仙界=》仙界阵法入口");
	     eval(element+'('+仙界使者+')');
	});
}

function 未来之窗_人工智能_仙界_结界_传送_demo( 仙界使者 ){
	    console.log("未来之窗仙界=》仙界阵法世界");
        	 
		console.log("仙界使者="+仙界使者);
		 
		switch (仙界使者)
		{
			case 107:// +加
				  
				break;
			case 109:// -减
				  
			break;
		}
	 
 }


