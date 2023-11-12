//未来之窗语音库

function cwpd_Play_systemload(){
	  if(check_Support_CwpdClient()==false){
		  //不支持未来之窗客户端技术
		  return ;
	  }
	  //2020-2-22 播放合计金额
		if(CyberWin_JsStandardPlug.bsPlaySoundV2){
			CyberWin_JsStandardPlug.bsPlaySoundV2("wlzc_handle_ssytem_init.wav",1700);//,"合计.wav");
		}else{
		}
}

function 未来之窗_终端_语音_朗读( 朗读文字 ){
	 if(check_Support_CwpdClient()==false){
		  //不支持未来之窗客户端技术
		  return ;
	  }
	  try{
	     CyberWin_JsStandardPlug.speakText(朗读文字);
	  } catch (f) {

	  }
}



 