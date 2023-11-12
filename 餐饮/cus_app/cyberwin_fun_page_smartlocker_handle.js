//2023-8-11

function cwpd_lockcheckingin(roomid){
	//art.dialog.data('width', 400);
	//art.dialog.data('height', 200);
	//art.dialog.data('domid', domid);
	//art.dialog.data('lastpic', $('#'+domid).val());
	 
	 
	art.dialog.open("//51.onelink.ynwlzc.cn/o2o/pos.php?g=Pos&c=CyberTrade_hotel&a=handlelockAutobyroom&roomid="+roomid,{lock:true,title:'房卡操作',width:400,height:200,top:10,yesText:'关闭',background: '#000',opacity: 0.65});
}

//房卡注销
function lock_checkingout(){
	//art.dialog.open('?g=Pos&c=CyberTrade_hotel&a=lock_checkingout',{lock:true,title:'房卡注销',width:900,height:500,top:100,yesText:'关闭',background: '#000',opacity: 0.65});
	//前台直接消房卡
	lock_checkingout_offline();
}


//房卡注销前台
function lock_checkingout_offline(){

	lock_checkingout_offlineDAC();
	return;

	
	 
	var param='CyberPHP->Param:hotelsignCyberPHP->Value:{cwpdcms{$DeviceConfig_DoorLock.mcode}';
	param='CyberPHP->Param:hotelsignCyberPHP->Value:{cwpdcms{$DeviceConfig_DoorLock.mcode}CyberPHP->Param:devaddressCyberPHP->Value:{cwpdcms{$DeviceConfig_DoorLock.communication_address}CyberPHP->Param:locknoCyberPHP->Value:ynwlzcCyberPHP->Param:checkingouttimeCyberPHP->Value:ynwlzc';


	var r= CyberWin_APP.run('{cwpdcms{$DeviceConfig_DoorLock.communication_app}','checkingout',param,'');
	alert(r);

//	var tomorrow = new Date().addHours(24).cyberwinformat("yyMMddhhmm");// ==> 2006-07-02 08:09:04.423
	//alert(tomorrow);
}

//房卡注销前台
function lock_checkingin_offline(lockno){
	lock_checkingin_offlineDAC(lockno);
	return;
	//alert(lockno);
	var checkingouttime = new Date().addHours(24).cyberwinformat("yyMMddhhmm");// ==> 2006-07-02 08:09:04.423
	 
	var param='CyberPHP->Param:locknoCyberPHP->Value:'+lockno+'CyberPHP->Param:hotelsignCyberPHP->Value:{cwpdcms{$DeviceConfig_DoorLock.mcode}CyberPHP->Param:checkingouttimeCyberPHP->Value:'+checkingouttime+"CyberPHP->Param:devaddressCyberPHP->Value:{cwpdcms{$DeviceConfig_DoorLock.communication_address}";

	var r= CyberWin_APP.run('{cwpdcms{$DeviceConfig_DoorLock.communication_app}','checkingin',param,''); 
	alert(r);
}


//房卡注销前台
function lock_checkingout_offlineDAC(){

	
	 
	var param='CyberPHP->Param:hotelsignCyberPHP->Value:{cwpdcms{$DeviceConfig_DoorLock.mcode}';
	param='CyberPHP->Param:hotelsignCyberPHP->Value:'+DeviceConfig_DoorLock.mcode+'CyberPHP->Param:devaddressCyberPHP->Value:'+DeviceConfig_DoorLock.communication_address+'CyberPHP->Param:locknoCyberPHP->Value:ynwlzcCyberPHP->Param:checkingouttimeCyberPHP->Value:ynwlzc';


	var r= CyberWin_APP.run(DeviceConfig_DoorLock.communication_app,'checkingout',param,'');
	alert(r);

//	var tomorrow = new Date().addHours(24).cyberwinformat("yyMMddhhmm");// ==> 2006-07-02 08:09:04.423
	//alert(tomorrow);
}

//房卡注销前台
function lock_checkingin_offlineDAC(lockno){
	//alert(lockno);
	var checkingouttime = new Date().addHours(24).cyberwinformat("yyMMddhhmm");// ==> 2006-07-02 08:09:04.423
	 
	var param='CyberPHP->Param:locknoCyberPHP->Value:'+lockno+'CyberPHP->Param:hotelsignCyberPHP->Value:'+DeviceConfig_DoorLock.mcode+'CyberPHP->Param:checkingouttimeCyberPHP->Value:'+checkingouttime+"CyberPHP->Param:devaddressCyberPHP->Value:"+DeviceConfig_DoorLock.communication_address+"";

	var r= CyberWin_APP.run(DeviceConfig_DoorLock.communication_app,'checkingin',param,''); 
	alert(r);
}