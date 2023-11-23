var tpl_未来之窗_支付_扫码_合体=`
<style>
.pay_dialog_cyberwincloudpay{
   
 
    background: #f3f5f7;
    display:block;
    min-height:200px;
}
.chat_end {
    padding: 80px 0;
    text-align: center;
}
 .chat_n {
    display: inline-block;
    text-align: left;
    min-width: 550px;
    max-width: 600px;
}
.pay_dialog_cyberwincloudpay .chat_n .input{
margin: 25px 0 20px 0;
height:68px !important;
}
 .chat_n .input .port {
    line-height: 25px;
    padding: 20px 0;
    background: #fff;
    width: 65%;
    font-size: 24px;
    color: #000000;
    border: #00aaee 2px solid;
    border-radius: 5px;
    text-indent: 15px;
    box-shadow: 0px 0px 15px 5px #f2f4f8 inset;
}
 .chat_n h2 {
    font-size: 25px;
    line-height: 1;
    color: #00aaee;
}
 .chat_n p {
    line-height: 26px;
    font-size: 14px;
    color: #888888;
    padding-left: 20px;
    background: url(../images/txt_07.png) 0px 5px no-repeat;
}
 .pay_dialog_cyberwincloudpay .chat_n .input .firm {
    line-height: 25px;
    padding: 20px 0;
    width: 26%;
    margin-left: 2%;
    text-align: center;
    background: #00aaee;
    font-size: 24px;
    color: #f3f5f7;
    margin-top: 3px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 25px;
    display: inline;
}
.clr {
    zoom: 1;
}
</style>
<cyberdiv class="pay_dialog_cyberwincloudpay">
<div class="chat_end" style=" padding-top: 10px;padding-bottom: 0px;">
			<div class="chat_n">
				<h2>请扫用户 （微信/支付宝） 付款码</h2>
				<div class="input clr" style="margin-top:10px;margin-bottom: 5px;border: 1px;background-color: #f3f5f7;">
					<input type="text" class="port fl" value="" id="cyberwincloudpay_txt"  onkeydown="未来之窗_支付_扫码_合体_确定(event)">
					<div class="firm fr" data-paymethod="cyberwin_payment_cyberwincloudpay" onClick="未来之窗_支付_扫码_合体_按钮();">确认支付</div>
				</div>
				 
				<p style="margin-top:10px;padding-left: 0px;">建议使用扫码盒子直接扫码！</p>
			</div>
		</div>
		</cyberdiv>`;
		
 function 未来之窗_支付_扫码_合体_弹窗(){
     	  CyberWin_Dialog.layer(tpl_未来之窗_支付_扫码_合体,{type:"frame",title:"云支付V4.0",move:false,width:"700px",height:"250px",id:"cyberwin_fix_sys_pay_dialog",mask:true,align:9,hideclose:false});
     	  
     	  $("#cyberwincloudpay_txt").focus();
     
 }
 
 function 未来之窗_支付_扫码_合体_确定(event){
      var x = event.keyCode;
    if (x == 13) {
       // alert($("#cyberwincloudpay_txt").val());
       未来之窗_支付_扫码_合体_扫码完成($("#cyberwincloudpay_txt").val());
       cyberwin_closedlg('cyberwin_fix_sys_pay_dialog');
    }
     
 }
  function 未来之窗_支付_扫码_合体_按钮(){
      未来之窗_支付_扫码_合体_扫码完成($("#cyberwincloudpay_txt").val());
      cyberwin_closedlg('cyberwin_fix_sys_pay_dialog');
  }
 