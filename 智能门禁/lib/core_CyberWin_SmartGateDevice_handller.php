<?php
// +----------------------------------------------------------------------
// | CYBERWINPHPDONET [ WE CAN DO IT JUST CYBER WIN IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2004-2016 http://www.ynwlzc.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: cybersnow<admin@ynwlzc.cn>
// +----------------------------------------------------------------------

/**
 * CYBERWINPHPDONET core_CyberWin_SmartGateDevice_handller 刷脸门禁函数库
 * @category   
 * @package  Common
 * @author   cybersnow<admin@ynwlzc.cn>
 */


/*
*通用函数迁移
*/

class CyberWin_SmartGateDevice_handller{

	public function sync_to_DeviceByWlzcData($picsave_path,$svrurl ,$wlzc_card_data){

		$未来之窗转换['status']=4;
		$未来之窗转换['message']="未知";
		 
		$未来之窗转换['data']="";

		//$svrurl=$_REQUEST['svrurl'];
	//	$imgurl=$_REQUEST['imgurl'];
	$头像 = $wlzc_card_data['cyber_ext_member_portrait'];

    $facecache=$picsave_path.date("Y_m")."/";
	if(is_dir($facecache)==false){
		mkdir($facecache);
	}
	$facecache_fullpath =$facecache.$wlzc_card_data['cyber_id']."_ori.bmp";
	$content互联网 = file_get_contents($头像);
	file_put_contents($facecache_fullpath,$content互联网);


	$post_data="";
	$idno=$wlzc_card_data['identityno'];
	$name=$wlzc_card_data['cyber_ext_member_truename'];
	$sex=$wlzc_card_data['cyber_ext_member_sex'];
	$peoplestartdate=$wlzc_card_data['guard_startdate'];
	$peopleenddate=$wlzc_card_data['guard_enddate'];
	$imgurl="";



	 $未来之窗_门禁_图像 = new CyberWin_SmartGateImage_handller();
	 $门禁_图像 = $未来之窗_门禁_图像->cyberwin_getImgBase64($facecache_fullpath);
			//var_dump($门禁_图像);

	 if($门禁_图像['status']==9){
				//echo $门禁_图像['data']
		$picData1= $门禁_图像['data'];
		$imgurl= $门禁_图像['des'];
	  }else{
				//echo $门禁_图像['message'];
				$this->add_api_log("wlzc2029",$门禁_图像['message'],$url,$post_data,$imgurl,$picData1,$idno,$name,$ret);
				return $未来之窗转换;

	}

	 
	 
		$url="http://".$svrurl.":9090/addDeviceWhiteList";
		$data['pass']="888888";
		$data['totalnum']="1";
		$data['currentnum']="1";

		$data_info['usertype']="white";
		$data_info['name']=$name;
		$data_info['sex']=$sex;
		$data_info['idno']=$idno;
		
		
		$data_info['peoplestartdate']=$peoplestartdate;
		$data_info['peopleenddate']=$peopleenddate;
		$data_info['icno']="";
		//$data_info['idissue']="00000";//$_REQUEST['idissue'];
		$data_info['passAlgo']=false;
		//$picData1=$imagebase;//imgToBase64FaceDev($imgurl,$data_info['idno']);
		$data_info['picData1']=$picData1;

		

		$data['data']=$data_info;

		// json_encode($data, JSON_UNESCAPED_UNICODE); //必须PHP5.4+

		//$post_data=json_encode($data,JSON_UNESCAPED_UNICODE);
		$post_data='{"totalnum":1,"pass":"888888","currentnum":1,"data":{"usertype":"white","name":"'.$data_info['name'].'","sex":"'.$data_info['sex'].'","idno":"'.$data_info['idno'].'","peoplestartdate":"'.$data_info['peoplestartdate'].'","peopleenddate":"'.$data_info['peopleenddate'].'","icno":"","picData1":"'.$data_info['picData1'].'","passAlgo":false}}';

		//if("文件不存在"==$picData1){
		//}else{
			$ret=$this->cyber_api_notice_increment($url,$post_data);
		//}



		

		$rete['result']=$ret;
		$rete['post_data']=$post_data;
		//$rete['data']=$data;

		$this->add_api_log("wlzc2029","操作成功",$url,$post_data,$imgurl,$picData1,$idno,$name,$ret);

		 
		

	//	echo json_encode($rete);
		//exit;
			$未来之窗转换['status']=9;
		$未来之窗转换['message']="同步操作完成";
		$未来之窗转换['data']= $ret;
		 
		 return $未来之窗转换;

	 }

	 public function add_api_log($platform,$message,$url,$post_data,$imgurl,$picData1,$idno,$name,$result){
		 $db_api=M("trade_guard_apilog","");
			$add['api']=$url;
			$add['data']=$post_data;
			$add['imgpath']=$imgurl;
			$add['req_time']=date("Y-m-d H:i:s");
			$add['create_time']=time();
			$add['image']=$picData1;
			$add['idno']=$idno;
			$add['platform']=$platform;
			$add['message']=$message;
			$add['name']=$name;
			$add['result']=addslashes($result);
			$db_api->add($add);
	 }

	 function cyber_api_notice_increment($url, $data){
		$ch = curl_init();
		$header = "Accept-Charset: utf-8";
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
		curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$tmpInfo = curl_exec($ch);
		if (curl_errno($ch)) {
			//echo curl_errno($ch);
			 // echo "<br/>"," cUrl Error:".curl_error($ch);
			return curl_error($ch);
		  // return false;
		}else{

			//return true;
			return $tmpInfo;
		}
		return $tmpInfo;
	}


}
 
 
 

?>