//2023-8-7 浏览器基础函数
//2024-7-11 网页表单数据格式化
/*
未来之窗之窗封装
author :未来之窗
//用法
  var param4 =$("#cyberwin_form_card_newadd").WLZC_serializeJson();
   key=JSON.stringify(param4);;

*/

(function($){  
    $.fn.serializeJson=function(){  
        var serializeObj={};  
        var array=this.serializeArray();  
        $(array).each(function(){  
            if(serializeObj[this.name]){  
                if($.isArray(serializeObj[this.name])){  
                    serializeObj[this.name].push(this.value);  
                }else{  
                    serializeObj[this.name]=[serializeObj[this.name],this.value];  
                }  
            }else{  
                serializeObj[this.name]=this.value;   
            }  
        });  
        return serializeObj;  
    }; 

	//WLZC_serializeJson
	//2024-2-29
	 $.fn.WLZC_serializeJson=function(){  
        var wlzc_serializeObj={};  
        var array=this.serializeArray();  
        $(array).each(function(){ 
			var wlzc_ei_name = this.name;
			//ymethod[1][paymethod_id]
			var ie = wlzc_ei_name.indexOf("[");
			if(ie >=0){
				//console.log("未来之窗编码，存在" + wlzc_ei_name);
				var wlzc_ei_name_yh1 =wlzc_ei_name.replace(/]/g,"");
				const wlzc_ei_name_Array = wlzc_ei_name_yh1.split("[");
				//console.log("未来之窗编码，分组");
				const  wlzc_ei_len = wlzc_ei_name_Array.length;
				console.log(wlzc_ei_name_Array);
				if(wlzc_ei_len == 3){
					var array_1 =wlzc_ei_name_Array[0];
					var array_2 =wlzc_ei_name_Array[1];
					var array_3 =wlzc_ei_name_Array[2];
					//错误 wlzc_serializeObj[array_1][array_2][array_3]=this.value;  
					//var jsonobj = array_2[array_3]=this.value;  
					var jsonobj_3=Array();
                    jsonobj_3[array_3]=this.value;  
					//console.log("未来之窗编码，分组jsonobj_3");
					//console.log(jsonobj_3);

					var jsonobj_2=Array();
                    jsonobj_2[array_2] = jsonobj_3;  
					//console.log("未来之窗编码，分组jsonobj_2");
					//console.log(jsonobj_2);
					//wlzc_serializeObj[array_1]=jsonobj_2;
					if(wlzc_serializeObj[array_1]){ 
                       
					}else{
					//	wlzc_serializeObj[array_1]=[];  
						wlzc_serializeObj[array_1]={};  
					}

					if(wlzc_serializeObj[array_1][array_2]){ 
                       
					}else{
						// wlzc_serializeObj[array_1][array_2]=[]; 
						  wlzc_serializeObj[array_1][array_2]={}; 
					}

					if(wlzc_serializeObj[array_1][array_2][array_3]){ 
                       wlzc_serializeObj[array_1][array_2][array_3]=this.value;  
					}else{
						 wlzc_serializeObj[array_1][array_2][array_3]=this.value;  
						 
					}

				}
			}else{
               //未来之窗
				if(wlzc_serializeObj[this.name]){  
					if($.isArray(wlzc_serializeObj[this.name])){  
						wlzc_serializeObj[this.name].push(this.value);  
					}else{  
						wlzc_serializeObj[this.name]=[wlzc_serializeObj[this.name],this.value];  
					}  
				}else{  
					wlzc_serializeObj[this.name]=this.value;   
				}

			}
        });  
        return wlzc_serializeObj;  
    }; 

})(jQuery); 
