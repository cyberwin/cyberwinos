//var ajax_card_url="https://apioauth.ynwlzc.net/cyberwin/CyberWinMiniPro.php/CyberWin_Pos_gasStationAPI/ajax_card_snowlotus/";
//http://apihardware.ynwlzc.net/cyberwin/CyberWinAPI.php/TSHOTEL/77?action=getHotelRoomInfoesByCondition&device_sn=ffffffff-ef89-9d41-ef89-9d4100000000
var ajax_root="http://apihardware.ynwlzc.net/cyberwin/CyberWinAPI.php/TSHOTEL/";//"https://apioauth.ynwlzc.net/cyberwin/CyberWinMiniPro.php/CyberWin_Pos_gasStationAPI/";
//TSDACStore
 ajax_root="http://apihardware.ynwlzc.net/cyberwin/CyberWinAPI.php/TSDACStore/";//"https://apioauth.ynwlzc.net/cyberwin/CyberWinMiniPro.php/CyberWin_Pos_gasStationAPI/";

var c_mer_id="77";
var c_store_id="72";
var c_store_name="未来之窗软件";

var is_admin_device = 0;//管理
var wlzc_pwdkey = "wlzc_hotel_pk2023";
var hotel_deposit_rk_time_end_default="12:00";
//2023-7-19 10寸 7寸
var hotel_room_showmode="7寸";
var device_screenmode = "10寸";//7寸

var 未来之窗_基建_语言 = "english";//英文
var 未来之窗_基建_DAC = "_dac";//英文
var 未来之窗加密算法 = "";//多种算法交叉，注意 场景试用
var 未来之窗apiroot = "";

var 未来之窗_基建过度_版本 = false;
 var idreadervendor="";//身份证读卡器
 var hotel_cashierdesk_deposit_must_phone='1';//入住必须手机号
  var hotel_cashierdesk_checkingin_writecard="N"; //入住写房卡
var lock_no="";
		   //打印押金单
var hotel_cashierdesk_checkingin_printdepositslip = "N";
//酒店

var hotel_cashierdesk_checkingout_writecard = "N";//退房写房卡
var hotel_cashierdesk_checkingout_printslip  = "N";//退房开单
var hotel_cashierdesk_checkingout_printslip_copies  = 1;//退房开单份数

var c_current_staff_name="";

var middleware_Page_version = "online";// wlzcinnernet online
var HyperHybridClient_middleware_Page_version = "online";// wlzcinnernet online
var current_store_id=72;

var 未来之窗app_通用ID="cyberwin_hotel_id_store";//cyberwin_shopnew_id_store";
//接口 api cyberwin_client_session_userandstaff_data

//未来之窗 dac
//login_check
var 未来之窗cyberwin_client_sessionapi="https://apioauth.ynwlzc.net/cyberwin/CyberWinAuthen.php?c=Merchant_Manager_Oauth&a=Pc_ClientOauthV3_QR&a=Cashier_Staff_LoginV2024";
//https://apioauth.ynwlzc.net/cyberwin/CyberWinAuthen.php?c=Merchant_Manager_Oauth&a=Pc_ClientOauthV3_QR&a=Pc_ClientOauthV3_QR_ajax";
	//			$.get(未来之窗检测2023年,{qrcode_id:未来之窗登录_qrcode_id,ticket:未来之窗登录_qrcode_ticket},function(result){
var 未来之窗_bridge_user = "";
//2023-9-16
var 未来之窗_bridge_staffinfo = "";

//店铺
//门锁信息
var DeviceConfig_DoorLock = {};
var CyberWin_Store_Config = {};
var DeviceConfig_idreader = {};
var CyberWin_Store_info = {};
//$DeviceConfig


 var 未来之窗_clientsn ="";
 var 未来之窗_session ="";
 var store_id="72"; 
 var open_speechhleper="N";//智能语音 Y
 var ShopNew_Cashier_open_cardinfo_speak  ="Y";//会员播报智能语音 Y
 var ShopNew_Cashier_leftcartfontsize  = 16;//收银字体
 var ShopNew_cashier_client_letcart_height="150";;
 var system_password ="888888";
 var soft_version_CyberTrade_ecogen_FoodShop_DishAndKTV="cashier";//餐饮终端


function 未来之窗_数据库_配置_getData(数据KEY){
	return window.localStorage.getItem(数据KEY);
}

