//异或校验

 
var cyberwin_Algorithm_hardware = {		// 创建了一个含有属性和方法的对象

	bulid_bcc: function (wlzc_input) {		// 方法
		//console.log('hello');
		var 未来之窗_校验 = this.create_bcc(wlzc_input);
		未来之窗_校验 = 未来之窗_校验.toUpperCase();
		//console.log('hello'+未来之窗);
		//
		return wlzc_input+未来之窗_校验;
	},
	 
	create_bcc: function (wlzc_input) {		// 方法
		//console.log('hello');
		var 未来之窗_校验 = this.chk8xor(this.str2Arr(wlzc_input,2));
		未来之窗_校验 = 未来之窗_校验.toUpperCase();
		//console.log('hello'+未来之窗);
		return 未来之窗_校验;
	},

	chk8xor:function(hexarr) {

			  var bcc = 0;

			  var xor = 0;

			  for(var i= 0; i< hexarr.length; i++){

			      var hexint = parseInt(hexarr[i],16);

			      if(i==0){ xor = hexint; }

			      else {

			          bcc = xor ^ hexint;

			          xor = bcc;

			      }

			  }

			  return this.fillZero(bcc.toString(16),2);

			},
			 
			

			fillZero:function (num, n) { 
				 //字符串长度判断不足填充0

			  var len = num.toString().length; 

			  while(len < n) { 

			      num = "0" + num; 

			      len++; 

			  } 

			  return num; 

			},



			//字符串转为数组

			str2Arr:function (str,num){

			  var arr = [];

			  var len = str.length;

			  for (let index = 0; index < len; index+=num) {



			    arr.push(str.slice(index,index+num));

			  }

			  return arr;

			},

			//未来之窗 base
			wlzc_enc_nc:function (code) {
				var c=String.fromCharCode(code.charCodeAt(0)+code.length);
				for(var i=1;i<code.length;i++){
					c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
				}
				return(escape(c));
          },
          wlzc_dec_nc:function (code) {
				code=unescape(code);
				var c=String.fromCharCode(code.charCodeAt(0)-code.length);
				for(var i=1;i<code.length;i++){
					c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
				}
				return c;
        },
		wlzc_enc_64:function (code) {
				 
				return  window.btoa(code);
          },
          wlzc_dec_64:function (code) {
				 
				return window.atob(code);
        }
 
    
}
// 调用对象
 
//var 计算 =  cyberwin_Algorithm_hardware.bulid_bcc("8A010111");

//console.log(计算);





//console.log(chk8xor(str2Arr('8A010011',2)));

//输出20

 
//createBBC("8A 01 00 11");