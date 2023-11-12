//未来之窗基础库
//未来之窗客户端技术

   function check_Support_CwpdClient(){
	  if( typeof CyberWin_JsStandardPlug == "undefined"){
		   return false;
	  }

	   if(CyberWin_JsStandardPlug){
		   return true;
	   }
	   return false;
   }

 var 未来之窗客户端技术 = check_Support_CwpdClient();

 //cyberwin_closedlg('cyberwin_add_id_store');