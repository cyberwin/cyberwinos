<?php

require_once dirname ( __FILE__ ).DIRECTORY_SEPARATOR.'/AlipayDangminafu/'.'service/AlipayTradeService.php';
require_once dirname ( __FILE__ ).DIRECTORY_SEPARATOR.'/AlipayDangminafu/'.'model/builder/AlipayTradePayContentBuilder.php';
 require dirname ( __FILE__ ).DIRECTORY_SEPARATOR.'/AlipayDangminafu/'.'config/config.php';

 require_once dirname ( __FILE__ ).DIRECTORY_SEPARATOR.'/AlipayDangminafu/'.'model/builder/AlipayTradePrecreateContentBuilder.php';

 require_once dirname ( __FILE__ ).DIRECTORY_SEPARATOR.'/AlipayDangminafu/'. 'model/builder/AlipayTradeRefundContentBuilder.php';
 //退款订单
 require_once dirname ( __FILE__ ).DIRECTORY_SEPARATOR.'/AlipayDangminafu/'. 'model/builder/AlipayTradeRefundContentBuilder.php';

class CyberWin_ISVPay_alipayDangmianfu{

	protected $appAuthToken;

	protected $pay_money;

	protected $pay_type;

	protected $is_mobile;

	protected $pay_config;

	protected $user_info;

	 
	public function __construct($appAuthToken,$pay_money,$pay_type,$pay_config,$user_info,$is_mobile=0){

		$this->appAuthToken = $appAuthToken;

		$this->providerId="2088311407949840";// "2088311407949840";
	}

		 

	public function initByMerchant($mer_id,$store_id){
		$db_token=M("cyberwin_merchant_alipay_apptoappauth");
		$db_merchant=M("merchant");
		//2022-4-6
		 $db_customer_merchant_store=M("merchant_store");

		$where_common['mer_id']=$mer_id;
		$data_token=$db_token->where($where_common)->find();
		if(!$data_token){

			$data_merchant=$db_merchant->where($where_common)->find();
			if(!$data_merchant){
				return false;
			}
			//var_dump($data_merchant);
			$current_fwc_app_id=$data_merchant['fwc_app_id'];//先读取总部集团
			



			

		}else{
			$current_fwc_app_id=$data_token['auth_app_id'];//先读取总部集团
		}


		if(intval($store_id)>0){
				//禁止传空门店
		     	$where_merchant_store['store_id']=$store_id;//$_REQUEST['cyber_store_id'];
				$data_customer_merchant_store=$db_customer_merchant_store->where($where_merchant_store)->find();
				if($data_customer_merchant_store['fwc_app_id']){
					 //优先读取子公司
				    $current_fwc_app_id=$data_customer_merchant_store['fwc_app_id'];
				}
		}


		$where_authen['auth_app_id']=$current_fwc_app_id;//$data_merchant['fwc_app_id'];

		$data_token=$db_token->where($where_authen)->find();


		if(!$data_token){
				return false;
		}
		//var_dump($data_token);


		$this->appAuthToken = $data_token['app_auth_token'];
		$this->providerId="2088311407949840";// "2088311407949840";
		return true;
	}


	public function dangmianfupay($mer_id,$store_id,$outTradeNo,$subject,$price,$authcode,$body,$undiscountableAmount="0.01"){

		$pay_ret['status']=4;
	    $pay_ret['message']="支付失败";

		//var_dump($pay_ret);

		if(strlen($this->appAuthToken)<5){
		 $ret_a=$this->initByMerchant($mer_id,$store_id);
		 if($ret_a==false){
			  return $pay_ret;
		 }

	    }
	 // (必填) 商户网站订单系统中唯一订单号，64个字符以内，只能包含字母、数字、下划线，
    // 需保证商户系统端不能重复，建议通过数据库sequence生成，
    //$outTradeNo = "barpay" . date('Ymdhis') . mt_rand(100, 1000);
      $outTradeNo =$outTradeNo;// $_POST['out_trade_no'];

    // (必填) 订单标题，粗略描述用户的支付目的。如“XX品牌XXX门店消费”
     $subject =$subject;// $_POST['subject'];

    // (必填) 订单总金额，单位为元，不能超过1亿元
    // 如果同时传入了【打折金额】,【不可打折金额】,【订单总金额】三者,则必须满足如下条件:【订单总金额】=【打折金额】+【不可打折金额】
     $totalAmount = $price;//$_POST['total_amount'];

    // (必填) 付款条码，用户支付宝钱包手机app点击“付款”产生的付款条码
     $authCode =$authcode;// $_POST['auth_code']; //28开头18位数字

    // (可选,根据需要使用) 订单可打折金额，可以配合商家平台配置折扣活动，如果订单部分商品参与打折，可以将部分商品总价填写至此字段，默认全部商品可打折
    // 如果该值未传入,但传入了【订单总金额】,【不可打折金额】 则该值默认为【订单总金额】- 【不可打折金额】
    //String discountableAmount = "1.00"; //

    // (可选) 订单不可打折金额，可以配合商家平台配置折扣活动，如果酒水不参与打折，则将对应金额填写至此字段
    // 如果该值未传入,但传入了【订单总金额】,【打折金额】,则该值默认为【订单总金额】-【打折金额】
    $undiscountableAmount =$undiscountableAmount;// "0.01";

    // 卖家支付宝账号ID，用于支持一个签约账号下支持打款到不同的收款账号，(打款到sellerId对应的支付宝账号)
    // 如果该字段为空，则默认为与支付宝签约的商户的PID，也就是appid对应的PID
    $sellerId = "";

    // 订单描述，可以对交易或商品进行一个详细地描述，比如填写"购买商品2件共15.00元"
    $body =$body;// "购买商品2件共15.00元";

    //商户操作员编号，添加此参数可以为商户操作员做销售统计
    $operatorId = "";

    // (可选) 商户门店编号，通过门店号和商家后台可以配置精准到门店的折扣信息，详询支付宝技术支持
    $storeId = "";

    // 支付宝的店铺编号
    $alipayStoreId = "";

    // 业务扩展参数，目前可添加由支付宝分配的系统商编号(通过setSysServiceProviderId方法)，详情请咨询支付宝技术支持
    $providerId =$this->providerId;// "2088311407949840"; //系统商pid,作为系统商返佣数据提取的依据
    $extendParams = new ExtendParams();
    $extendParams->setSysServiceProviderId($providerId);
    $extendParamsArr = $extendParams->getExtendParams();

    // 支付超时，线下扫码交易定义为5分钟
    $timeExpress = "5m";

    // 商品明细列表，需填写购买商品详细信息，
    $goodsDetailList = array();

    // 创建一个商品信息，参数含义分别为商品id（使用国标）、名称、单价（单位为分）、数量，如果需要添加商品类别，详见GoodsDetail
    $goods1 = new GoodsDetail();
    $goods1->setGoodsId("wlzcsacnmerchanto");
    $goods1->setGoodsName("商户订单");
    $goods1->setPrice($totalAmount);
    $goods1->setQuantity(1);
    //得到商品1明细数组
    $goods1Arr = $goods1->getGoodsDetail();

    // 继续创建并添加第一条商品信息，用户购买的产品为“xx牙刷”，单价为5.05元，购买了两件
    $goods2 = new GoodsDetail();
    $goods2->setGoodsId("wlzcsacn01");
    $goods2->setGoodsName("未来之窗支技术服务费");
    $goods2->setPrice(0);
    $goods2->setQuantity(1);
    //得到商品1明细数组
    $goods2Arr = $goods2->getGoodsDetail();


	 // 继续创建并添加第一条商品信息，用户购买的产品为“xx牙刷”，单价为5.05元，购买了两件
    $goods3 = new GoodsDetail();
    $goods3->setGoodsId("wlzcsacn02");
    $goods3->setGoodsName("未来之窗系统服务费");
    $goods3->setPrice(0);
    $goods3->setQuantity(1);
    //得到商品1明细数组
    $goods3Arr = $goods3->getGoodsDetail();

    $goodsDetailList = array($goods1Arr, $goods2Arr,$goods3Arr);

    //第三方应用授权令牌,商户授权系统商开发模式下使用
    $appAuthToken =$this->appAuthToken;// "202010BB58ad4047fa374cfa9a07f79b7d06aX99";//201905BB45ce2dfa474c4b929e6f87a9cc7ffX14";//根据真实值填写 201905BB45ce2dfa474c4b929e6f87a9cc7ffX14

    // 创建请求builder，设置请求参数
    $barPayRequestBuilder = new AlipayTradePayContentBuilder();
    $barPayRequestBuilder->setOutTradeNo($outTradeNo);
    $barPayRequestBuilder->setTotalAmount($totalAmount);
    $barPayRequestBuilder->setAuthCode($authCode);
    $barPayRequestBuilder->setTimeExpress($timeExpress);
    $barPayRequestBuilder->setSubject($subject);
    $barPayRequestBuilder->setBody($body);
    $barPayRequestBuilder->setUndiscountableAmount($undiscountableAmount);
    $barPayRequestBuilder->setExtendParams($extendParamsArr);
    $barPayRequestBuilder->setGoodsDetailList($goodsDetailList);
    $barPayRequestBuilder->setStoreId($storeId);
    $barPayRequestBuilder->setOperatorId($operatorId);
    $barPayRequestBuilder->setAlipayStoreId($alipayStoreId);

    $barPayRequestBuilder->setAppAuthToken($appAuthToken);

	$config=$this->getISVConfig();


	//var_dump($config);
	//exit;

    // 调用barPay方法获取当面付应答
    $barPay = new AlipayTradeService($config);
    $barPayResult = $barPay->barPay($barPayRequestBuilder);

	//var_dump($barPayResult);
	//exit;

	$pay_resp=$barPayResult->getResponse();
	$pay_code=$pay_resp->code;

	$pay_ret['code']=$pay_code;



    switch ($barPayResult->getTradeStatus()) {
        case "SUCCESS":
          //  echo "支付宝支付成功:" . "<br>--------------------------<br>";
          //  print_r($barPayResult->getResponse());
			/*
			stdClass Object ( [code] => 10000 [msg] => Success [buyer_logon_id] => adm***@ynwlzc.cn [buyer_pay_amount] => 0.01 [buyer_user_id] => 
			2088002077409418 [fund_bill_list] => Array ( [0] => stdClass Object ( [amount] => 0.01 [fund_channel] => PCREDIT ) ) 
			[gmt_payment] => 2020-11-03 15:19:33 [invoice_amount] => 0.01 [out_trade_no] => 1604387971 [point_amount] => 0.00 [receipt_amount] => 0.01 [total_amount] => 0.01 [trade_no] => 2020110322001409415750364673 ) array(2) { ["status"]=> int(4)
			*/

			$pay_orderinfo['buyer_logon_id']=$pay_resp->buyer_logon_id;
			$pay_orderinfo['price']=$pay_resp->buyer_pay_amount;
			$pay_orderinfo['buyer_user_id']=$pay_resp->buyer_user_id;
			$pay_orderinfo['trade_no']=$pay_resp->trade_no;
			$pay_orderinfo['out_trade_no']=$pay_resp->out_trade_no;
			$pay_ret['status']=10000;
			$pay_ret['detail']=$pay_orderinfo;
			 //2021-10-31 交易关闭增加
			$pay_ret['raw_trade_status']=$pay_resp->trade_status;
			$pay_ret['raw']=$pay_resp;

	        $pay_ret['message']="支付宝支付成功";
			//sub_msg
			return $pay_ret;
            break;
        case "FAILED":
           // echo "支付宝支付失败!!!" . "<br>--------------------------<br>";
            if (!empty($barPayResult->getResponse())) {
               // print_r($barPayResult->getResponse());
            }
			if($pay_code=="10003"){
				$pay_orderinfo['buyer_logon_id']=$pay_resp->buyer_logon_id;
				$pay_orderinfo['price']=$pay_resp->total_amount;
				$pay_orderinfo['buyer_user_id']=$pay_resp->buyer_user_id;
				$pay_orderinfo['trade_no']=$pay_resp->trade_no;
				$pay_orderinfo['out_trade_no']=$pay_resp->out_trade_no;
				$pay_ret['status']=10000;
				$pay_ret['detail']=$pay_orderinfo;
				 //2021-10-31 交易关闭增加
				$pay_ret['raw_trade_status']=$pay_resp->trade_status;
				$pay_ret['raw']=$pay_resp;

				$pay_ret['message']="支付宝支付成功-失败".$pay_resp->msg;
				//sub_msg
				return $pay_ret;
			}

			$pay_ret['status']=4;
	        $pay_ret['message']=$pay_resp->sub_msg;
			//sub_msg
			return $pay_ret;
            break;
        case "UNKNOWN":
          //  echo "系统异常，订单状态未知!!!" . "<br>--------------------------<br>";
            if (!empty($barPayResult->getResponse())) {
             //   print_r($barPayResult->getResponse());
            }
            break;
        default:
          //  echo "不支持的交易状态，交易返回异常!!!";
		   $pay_ret['status']=4;
	        $pay_ret['message']="不支持的交易状态，交易返回异常";
			//sub_msg
			return $pay_ret;
            break;
    }


	return $pay_ret;
		 
	}



		//2020-12-16 qr支付
	public function dangmianfuqrPay($mer_id,$store_id,$outTradeNo,$subject,$price,$authcode,$body,$undiscountableAmount="0.01"){
		$pay_ret['status']=4;
	    $pay_ret['message']="支付失败";

		//var_dump($pay_ret);

		if(strlen($this->appAuthToken)<5){
		 $ret_a=$this->initByMerchant($mer_id , $store_id);
		 if($ret_a==false){
			  return $pay_ret;
		 }

	    }
	 // (必填) 商户网站订单系统中唯一订单号，64个字符以内，只能包含字母、数字、下划线，
    // 需保证商户系统端不能重复，建议通过数据库sequence生成，
    //$outTradeNo = "barpay" . date('Ymdhis') . mt_rand(100, 1000);
      $outTradeNo =$outTradeNo;// $_POST['out_trade_no'];

    // (必填) 订单标题，粗略描述用户的支付目的。如“XX品牌XXX门店消费”
     $subject =$subject;// $_POST['subject'];

    // (必填) 订单总金额，单位为元，不能超过1亿元
    // 如果同时传入了【打折金额】,【不可打折金额】,【订单总金额】三者,则必须满足如下条件:【订单总金额】=【打折金额】+【不可打折金额】
     $totalAmount = $price;//$_POST['total_amount'];

    // (必填) 付款条码，用户支付宝钱包手机app点击“付款”产生的付款条码
     $authCode =$authcode;// $_POST['auth_code']; //28开头18位数字

    // (可选,根据需要使用) 订单可打折金额，可以配合商家平台配置折扣活动，如果订单部分商品参与打折，可以将部分商品总价填写至此字段，默认全部商品可打折
    // 如果该值未传入,但传入了【订单总金额】,【不可打折金额】 则该值默认为【订单总金额】- 【不可打折金额】
    //String discountableAmount = "1.00"; //

    // (可选) 订单不可打折金额，可以配合商家平台配置折扣活动，如果酒水不参与打折，则将对应金额填写至此字段
    // 如果该值未传入,但传入了【订单总金额】,【打折金额】,则该值默认为【订单总金额】-【打折金额】
    $undiscountableAmount =$undiscountableAmount;// "0.01";

    // 卖家支付宝账号ID，用于支持一个签约账号下支持打款到不同的收款账号，(打款到sellerId对应的支付宝账号)
    // 如果该字段为空，则默认为与支付宝签约的商户的PID，也就是appid对应的PID
    $sellerId = "";

    // 订单描述，可以对交易或商品进行一个详细地描述，比如填写"购买商品2件共15.00元"
    $body =$body;// "购买商品2件共15.00元";

    //商户操作员编号，添加此参数可以为商户操作员做销售统计
    $operatorId = "";

    // (可选) 商户门店编号，通过门店号和商家后台可以配置精准到门店的折扣信息，详询支付宝技术支持
    $storeId = "";

    // 支付宝的店铺编号
    $alipayStoreId = "";

    // 业务扩展参数，目前可添加由支付宝分配的系统商编号(通过setSysServiceProviderId方法)，详情请咨询支付宝技术支持
    $providerId =$this->providerId;// "2088311407949840"; //系统商pid,作为系统商返佣数据提取的依据
    $extendParams = new ExtendParams();
    $extendParams->setSysServiceProviderId($providerId);
    $extendParamsArr = $extendParams->getExtendParams();

    // 支付超时，线下扫码交易定义为5分钟
    $timeExpress = "5m";

    // 商品明细列表，需填写购买商品详细信息，
    $goodsDetailList = array();

    // 创建一个商品信息，参数含义分别为商品id（使用国标）、名称、单价（单位为分）、数量，如果需要添加商品类别，详见GoodsDetail
    $goods1 = new GoodsDetail();
    $goods1->setGoodsId("wlzcsacnmerchanto");
    $goods1->setGoodsName("商户订单");
    $goods1->setPrice($totalAmount);
    $goods1->setQuantity(1);
    //得到商品1明细数组
    $goods1Arr = $goods1->getGoodsDetail();

    // 继续创建并添加第一条商品信息，用户购买的产品为“xx牙刷”，单价为5.05元，购买了两件
    $goods2 = new GoodsDetail();
    $goods2->setGoodsId("wlzcsacn01");
    $goods2->setGoodsName("未来之窗支技术服务费");
    $goods2->setPrice(0);
    $goods2->setQuantity(1);
    //得到商品1明细数组
    $goods2Arr = $goods2->getGoodsDetail();


	 // 继续创建并添加第一条商品信息，用户购买的产品为“xx牙刷”，单价为5.05元，购买了两件
    $goods3 = new GoodsDetail();
    $goods3->setGoodsId("wlzcsacn02");
    $goods3->setGoodsName("未来之窗系统服务费");
    $goods3->setPrice(0);
    $goods3->setQuantity(1);
    //得到商品1明细数组
    $goods3Arr = $goods3->getGoodsDetail();

    $goodsDetailList = array($goods1Arr, $goods2Arr,$goods3Arr);

    //第三方应用授权令牌,商户授权系统商开发模式下使用
    $appAuthToken =$this->appAuthToken;// "202010BB58ad4047fa374cfa9a07f79b7d06aX99";//201905BB45ce2dfa474c4b929e6f87a9cc7ffX14";//根据真实值填写 201905BB45ce2dfa474c4b929e6f87a9cc7ffX14
//AlipayTradePrecreateContentBuilder
    // 创建请求builder，设置请求参数
	/*
    $barPayRequestBuilder = new AlipayTradePayContentBuilder();
    $barPayRequestBuilder->setOutTradeNo($outTradeNo);
    $barPayRequestBuilder->setTotalAmount($totalAmount);
    $barPayRequestBuilder->setAuthCode($authCode);
    $barPayRequestBuilder->setTimeExpress($timeExpress);
    $barPayRequestBuilder->setSubject($subject);
    $barPayRequestBuilder->setBody($body);
    $barPayRequestBuilder->setUndiscountableAmount($undiscountableAmount);
    $barPayRequestBuilder->setExtendParams($extendParamsArr);
    $barPayRequestBuilder->setGoodsDetailList($goodsDetailList);
    $barPayRequestBuilder->setStoreId($storeId);
    $barPayRequestBuilder->setOperatorId($operatorId);
    $barPayRequestBuilder->setAlipayStoreId($alipayStoreId);

    $barPayRequestBuilder->setAppAuthToken($appAuthToken);

	*/

	$qrPayRequestBuilder = new AlipayTradePrecreateContentBuilder();
	$qrPayRequestBuilder->setOutTradeNo($outTradeNo);
	$qrPayRequestBuilder->setTotalAmount($totalAmount);
	$qrPayRequestBuilder->setTimeExpress($timeExpress);
	$qrPayRequestBuilder->setSubject($subject);
	$qrPayRequestBuilder->setBody($body);
	$qrPayRequestBuilder->setUndiscountableAmount($undiscountableAmount);
	$qrPayRequestBuilder->setExtendParams($extendParamsArr);
	$qrPayRequestBuilder->setGoodsDetailList($goodsDetailList);
	$qrPayRequestBuilder->setStoreId($storeId);
	$qrPayRequestBuilder->setOperatorId($operatorId);
	$qrPayRequestBuilder->setAlipayStoreId($alipayStoreId);

	$qrPayRequestBuilder->setAppAuthToken($appAuthToken);


	$config=$this->getISVConfig();


	//var_dump($config);
	//exit;

    // 调用barPay方法获取当面付应答
    $qrPay = new AlipayTradeService($config);
   // $barPayResult = $barPay->barPay($barPayRequestBuilder);
	 
	$qrPayResult = $qrPay->qrPay($qrPayRequestBuilder);

	//var_dump($barPayResult);
	//exit;

	$pay_resp=$qrPayResult->getResponse();
	$pay_code=$pay_resp->code;

	$pay_ret['code']=$pay_code;
    //var_dump($qrPayResult);
	//exit;



    switch ($qrPayResult->getTradeStatus()) {
        case "SUCCESS":
          //  echo "支付宝支付成功:" . "<br>--------------------------<br>";
          //  print_r($barPayResult->getResponse());
			/*
			stdClass Object ( [code] => 10000 [msg] => Success [buyer_logon_id] => adm***@ynwlzc.cn [buyer_pay_amount] => 0.01 [buyer_user_id] => 
			2088002077409418 [fund_bill_list] => Array ( [0] => stdClass Object ( [amount] => 0.01 [fund_channel] => PCREDIT ) ) 
			[gmt_payment] => 2020-11-03 15:19:33 [invoice_amount] => 0.01 [out_trade_no] => 1604387971 [point_amount] => 0.00 [receipt_amount] => 0.01 [total_amount] => 0.01 [trade_no] => 2020110322001409415750364673 ) array(2) { ["status"]=> int(4)
			*/

			$response = $qrPayResult->getResponse();
			$qrcode = $response->qr_code;

	        $pay_ret['message']="支付宝创建订单二维码成功";
			$pay_ret['qr_code']=$qrcode;
			$pay_ret['status']=10000;
			//sub_msg
			return $pay_ret;
            break;
        case "FAILED":
           // echo "支付宝支付失败!!!" . "<br>--------------------------<br>";
            if (!empty($barPayResult->getResponse())) {
               // print_r($barPayResult->getResponse());
            }
			if($pay_code=="10003"){
				$pay_orderinfo['buyer_logon_id']=$pay_resp->buyer_logon_id;
				$pay_orderinfo['price']=$pay_resp->total_amount;
				$pay_orderinfo['buyer_user_id']=$pay_resp->buyer_user_id;
				$pay_orderinfo['trade_no']=$pay_resp->trade_no;
				$pay_orderinfo['out_trade_no']=$pay_resp->out_trade_no;
				$pay_ret['status']=10000;
				$pay_ret['detail']=$pay_orderinfo;

				$pay_ret['message']="支付宝支付成功".$pay_resp->msg;
				//sub_msg
				return $pay_ret;
			}

			$pay_ret['status']=4;
	        $pay_ret['message']=$pay_resp->sub_msg;
			//sub_msg
			return $pay_ret;
            break;
        case "UNKNOWN":
          //  echo "系统异常，订单状态未知!!!" . "<br>--------------------------<br>";
            if (!empty($barPayResult->getResponse())) {
             //   print_r($barPayResult->getResponse());
            }
            break;
        default:
          //  echo "不支持的交易状态，交易返回异常!!!";
		   $pay_ret['status']=4;
	        $pay_ret['message']="不支持的交易状态，交易返回异常";
			//sub_msg
			return $pay_ret;
            break;
    }


	return $pay_ret;
		 
	}

	//未来之窗isv退款操作
		public function dangmianfurefund($mer_id,$store_id,$outTradeNo,$subject,$price,$authcode,$out_request_no,$undiscountableAmount="0.01"){
		$pay_ret['status']=4;
	    $pay_ret['message']="支付失败";

		//return $pay_ret;

		//var_dump($pay_ret);

		if(strlen($this->appAuthToken)<5){
		 $ret_a=$this->initByMerchant($mer_id , $store_id);
		 if($ret_a==false){
			  return $pay_ret;
		 }

	    }
	 

    // (必填) 订单标题，粗略描述用户的支付目的。如“XX品牌XXX门店消费”
     $subject =$subject;// $_POST['subject'];

   

    // (可选,根据需要使用) 订单可打折金额，可以配合商家平台配置折扣活动，如果订单部分商品参与打折，可以将部分商品总价填写至此字段，默认全部商品可打折
    // 如果该值未传入,但传入了【订单总金额】,【不可打折金额】 则该值默认为【订单总金额】- 【不可打折金额】
    //String discountableAmount = "1.00"; //
  
    //商户操作员编号，添加此参数可以为商户操作员做销售统计
    $operatorId = "";

    // (可选) 商户门店编号，通过门店号和商家后台可以配置精准到门店的折扣信息，详询支付宝技术支持
    $storeId = "";

    // 支付宝的店铺编号
    $alipayStoreId = "";

    // 业务扩展参数，目前可添加由支付宝分配的系统商编号(通过setSysServiceProviderId方法)，详情请咨询支付宝技术支持
    $providerId =$this->providerId;// "2088311407949840"; //系统商pid,作为系统商返佣数据提取的依据
    $extendParams = new ExtendParams();
    $extendParams->setSysServiceProviderId($providerId);
    $extendParamsArr = $extendParams->getExtendParams();

 
 


 
 

    //第三方应用授权令牌,商户授权系统商开发模式下使用
    $appAuthToken =$this->appAuthToken;// "202010BB58ad4047fa374cfa9a07f79b7d06aX99";//201905BB45ce2dfa474c4b929e6f87a9cc7ffX14";//根据真实值填写 201905BB45ce2dfa474c4b929e6f87a9cc7ffX14



	    $refundRequestBuilder = new AlipayTradeRefundContentBuilder();
		  
		$refundRequestBuilder->setOutTradeNo($outTradeNo);
		$refundRequestBuilder->setRefundAmount($price);
		$refundRequestBuilder->setOutRequestNo($out_request_no);
		//$refundRequestBuilder->setExtendParams($extendParamsArr);


        $refundRequestBuilder->setAppAuthToken($appAuthToken);

	   $config=$this->getISVConfig();

	  


	//var_dump($config);
	//exit;
	// return $pay_ret;

    // 调用barPay方法获取当面付应答  AlipayTradeService
    $refundResponse = new AlipayTradeService($config);
    //$barPayResult = $refundResponse->barPay($barPayRequestBuilder);
	$refundResult =	$refundResponse->refund($refundRequestBuilder);

	//var_dump($barPayResult);
	//exit;

	$pay_resp=$refundResult->getResponse();
	$pay_code=$pay_resp->code;

	$pay_ret['code']=$pay_code;



    switch ($refundResult->getTradeStatus()) {
        case "SUCCESS":
          //  echo "支付宝支付成功:" . "<br>--------------------------<br>";
          //  print_r($barPayResult->getResponse());
			/*
			stdClass Object ( [code] => 10000 [msg] => Success [buyer_logon_id] => adm***@ynwlzc.cn [buyer_pay_amount] => 0.01 [buyer_user_id] => 
			2088002077409418 [fund_bill_list] => Array ( [0] => stdClass Object ( [amount] => 0.01 [fund_channel] => PCREDIT ) ) 
			[gmt_payment] => 2020-11-03 15:19:33 [invoice_amount] => 0.01 [out_trade_no] => 1604387971 [point_amount] => 0.00 [receipt_amount] => 0.01 [total_amount] => 0.01 [trade_no] => 2020110322001409415750364673 ) array(2) { ["status"]=> int(4)
			*/

			//$pay_orderinfo['buyer_logon_id']=$pay_resp->buyer_logon_id;
			//$pay_orderinfo['price']=$pay_resp->buyer_pay_amount;
			//$pay_orderinfo['buyer_user_id']=$pay_resp->buyer_user_id;
			//$pay_orderinfo['trade_no']=$pay_resp->trade_no;
			//$pay_orderinfo['out_trade_no']=$pay_resp->out_trade_no;
			$pay_ret['status']=10000;
			$pay_ret['detail']=$pay_orderinfo;

	        $pay_ret['message']="支付宝支付成功";
			//sub_msg
			return $pay_ret;
            break;
        case "FAILED":
           // echo "支付宝支付失败!!!" . "<br>--------------------------<br>";
            if (!empty($refundResult->getResponse())) {
               // print_r($refundResult->getResponse());
            }
			if($pay_code=="10003"){
				//$pay_orderinfo['buyer_logon_id']=$pay_resp->buyer_logon_id;
				//$pay_orderinfo['price']=$pay_resp->total_amount;
				//$pay_orderinfo['buyer_user_id']=$pay_resp->buyer_user_id;
				//$pay_orderinfo['trade_no']=$pay_resp->trade_no;
				//$pay_orderinfo['out_trade_no']=$pay_resp->out_trade_no;
				$pay_ret['status']=10000;
				$pay_ret['detail']=$pay_orderinfo;

				$pay_ret['message']="支付宝支付成功".$pay_resp->msg;
				//sub_msg
				return $pay_ret;
			}

			$pay_ret['status']=4;
	        $pay_ret['message']=$pay_resp->sub_msg;
			//sub_msg
			return $pay_ret;
            break;
        case "UNKNOWN":
          //  echo "系统异常，订单状态未知!!!" . "<br>--------------------------<br>";
            if (!empty($refundResult->getResponse())) {
             //   print_r($refundResult->getResponse());
            }
            break;
        default:
          //  echo "不支持的交易状态，交易返回异常!!!";
		   $pay_ret['status']=4;
	        $pay_ret['message']="不支持的交易状态，交易返回异常";
			//sub_msg
			return $pay_ret;
            break;
    }


	return $pay_ret;
		 
	}




  public function getISVConfig(){
	  $config = array (
		//签名方式,默认为RSA2(RSA2048)
		'sign_type' => "RSA2",//RSA2

		//支付宝公钥
		'alipay_public_key' => "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqP0bBGtyuYhMyOxQMhUmh/NN1BPlYsZAKRw294saf8/EqpAt6HB7ofctINI5/x1+gAoPI6hvfIJenBLoSq2OlgfGCEIwhCADzdhrtj1vas48fKuqDNNOK6YTX09t0XgiT61b5QJkJNUvxm1jayxSpa+wbIl83wk10kZ14sp+bUEr2ZGhXj1WZj9g8qvG73GSTy6PLAalrh2GDU7KxvlWeWyw9Asl2FyATsd2T4+ONK71Fdalo7sYmBcS+ite1xJrTfRMyhzTzCq+6EFuADF5t+R/RgfX1+BZL+bEJNXlGZQGz+Hg4eZfYjJntsDMenbEJotKdZFg5CLNlV9llw7HlQIDAQAB",

		//商户私钥
		'merchant_private_key' => "MIIEogIBAAKCAQEAqP0bBGtyuYhMyOxQMhUmh/NN1BPlYsZAKRw294saf8/EqpAt6HB7ofctINI5/x1+gAoPI6hvfIJenBLoSq2OlgfGCEIwhCADzdhrtj1vas48fKuqDNNOK6YTX09t0XgiT61b5QJkJNUvxm1jayxSpa+wbIl83wk10kZ14sp+bUEr2ZGhXj1WZj9g8qvG73GSTy6PLAalrh2GDU7KxvlWeWyw9Asl2FyATsd2T4+ONK71Fdalo7sYmBcS+ite1xJrTfRMyhzTzCq+6EFuADF5t+R/RgfX1+BZL+bEJNXlGZQGz+Hg4eZfYjJntsDMenbEJotKdZFg5CLNlV9llw7HlQIDAQABAoIBADKGsuxIYB3/Fc5Bcdz3m/SsF4oghMZatlZUXE75ZWvvqELDJybHcv/DUtfsY3DW1brcxxgHRYY5yKXrtU6Ww/oxytEvUShAFkMWwWXUypppnYY9IXQCPe4pEsO9kP0/aSrfj4lShLTKlSVEEaS6tN9bP2nEVfSt4UzEynyLxO9PP1jaXfKkVAAACAtrvB93g+CGyXKTWylH2zixsHbex0it6QbgpJCT1rMX3Udk6hDyYFiuIaBAYc3IBOn7vGkZw5RSQWRu6Edcd4OwiKA6qXM2j4wfWULaSFhMYj7dOehXVH8nENO0DnlBPhRnxaLFLesKR51XTQobqFpuDMoZk4ECgYEA4KVZMm/5Qu0T6UH7jXmQJZs0IwOv128ciq0b0w7mfH5N/7cz+pimnfJ3w1jK30sQa9inFH/fg3Ik1a5yHvb4tUSYJNtLWpQFFzJILQIrv9qOp8RyHRFJZNt3OFKBq64d3H92MnE05ThHPTquxUhnJ1/6aP9ehibPOwsOEqhm1yECgYEAwJMcr9KACLQuluHny0Ifntgh2gaYjMjLpVamasVy1bPtt5b9gfSY2eVJLMz1jT89FW8cv/9k+1mhx2AEeFew7KiKa9wNuyO7AsF07pIyYoeXrWCLxPalpkLyIeQT27NGO8nIc/4NpTUXr4M3+uhkcdRfYjRuyifBGYJUeDrHRfUCgYAMeGFJMXoOwwZV7nm+Ur8ztzffsbazKNHWyOFAiBU3V/OQfGUARjUJk4oeZ/FrD8mrku1DcA3CSDXPPs3K9j68IUCo2xuFva3CqeHjzbkL/1/n5DnJb0o5tQ0bLUlRdGrn8JNpHWuoRcV+mqFVBj3jq6pE5dgjbkgWqPhxBLQgwQKBgBrSYqR6hSqxLewF+ursgsr0/4IGeSjirrqQnw0wAxaQwQNZHGYFU2TF8rMyuOC7dh6OI0r6n24Cxe2nCfhY/mN39g+fzqnKCDoSB99SrYHbsNyNHeqJD/lgSak+wyVOivG44RqGwA/KnUns1Nc1lwfjtIVRGD0/3D1ZUbqNNUQhAoGAMdkHWcMXAC+tbuhasJRjDf1b9ygWuPlL9tSi7WBPiO+JQe87FnXULaO7FhUD9PVMDWZi7R7U3+1Y1tEjhFNy70boYwXmLyUDQvgQi6y9yhYhyylWYGwxY4UhPB2zBFyLR6HN6FqCpdmifMrEX8PdMFAg7GOxNhpxCcKOp+uszKQ=",

		//编码格式
		'charset' => "UTF-8",

		//支付宝网关
		'gatewayUrl' => "https://openapi.alipay.com/gateway.do",

		//应用ID
		'app_id' => "2017091508736985",//服务商操作 //"2018081661033688",

		//异步通知地址,只有扫码支付预下单可用
		'notify_url' => "http://51.onelink.ynwlzc.cn/o2o/WAP.php/CWPDOrderViewPreView/alipay_notif",//"http://51.onelink.ynwlzc.cn/o2o/cybertest/dmf/log/index.php",

		//最大查询重试次数
		'MaxQueryRetry' => "10",

		//查询间隔
		'QueryDuration' => "3"
);
          return $config;
  }
  public function dangmianfuquery($mer_id,$store_id,$outTradeNo,$subject,$price,$authcode,$body,$undiscountableAmount="0.01"){
		$pay_ret['status']=4;
	    $pay_ret['message']="支付失败";

		//var_dump($pay_ret);

		if(strlen($this->appAuthToken)<5){
		 $ret_a=$this->initByMerchant($mer_id , $store_id);
		 if($ret_a==false){
			  return $pay_ret;
		 }

	    }


		  $out_trade_no = trim($outTradeNo);

    //第三方应用授权令牌,商户授权系统商开发模式下使用
    $appAuthToken = "";//根据真实值填写
	 //  $appAuthToken = "202010BB64c2b60502d6458eb44993f155066X54";//根据真实值填写 201905BB45ce2dfa474c4b929e6f87a9cc7ffX14

  $appAuthToken =$this->appAuthToken;//
    //构造查询业务请求参数对象
    $queryContentBuilder = new AlipayTradeQueryContentBuilder();
    $queryContentBuilder->setOutTradeNo($out_trade_no);

    $queryContentBuilder->setAppAuthToken($appAuthToken);

	$config=$this->getISVConfig();


    //初始化类对象，调用queryTradeResult方法获取查询应答
    $queryResponse = new AlipayTradeService($config);
    $queryResult = $queryResponse->queryTradeResult($queryContentBuilder);

	$pay_resp=$queryResult->getResponse();
	$pay_code=$pay_resp->code;

	$pay_ret['code']=$pay_code;

    //根据查询返回结果状态进行业务处理
    switch ($queryResult->getTradeStatus()){
        case "SUCCESS":
           // echo "支付宝查询交易成功:"."<br>--------------------------<br>";
            //print_r($queryResult->getResponse());
           
			$pay_orderinfo['buyer_logon_id']=$pay_resp->buyer_logon_id;
			$pay_orderinfo['price']=$pay_resp->buyer_pay_amount;
			$pay_orderinfo['buyer_user_id']=$pay_resp->buyer_user_id;
			$pay_orderinfo['trade_no']=$pay_resp->trade_no;
			$pay_orderinfo['out_trade_no']=$pay_resp->out_trade_no;
			$pay_ret['status']=10000;
			$pay_ret['detail']=$pay_orderinfo;
			 //2021-10-31 交易关闭增加
			$pay_ret['raw']=$pay_resp;
			$pay_ret['raw_trade_status']=$pay_resp->trade_status;

	        $pay_ret['message']="支付宝支付成功";
			//sub_msg
			return $pay_ret;
            break;
        case "FAILED":
           // echo "支付宝支付失败!!!" . "<br>--------------------------<br>";
            if (!empty($queryResult->getResponse())) {
               // print_r($barPayResult->getResponse());
            }
			if($pay_code=="10000"){
				$pay_orderinfo['buyer_logon_id']=$pay_resp->buyer_logon_id;
				$pay_orderinfo['price']=$pay_resp->total_amount;
				$pay_orderinfo['buyer_user_id']=$pay_resp->buyer_user_id;
				$pay_orderinfo['trade_no']=$pay_resp->trade_no;
				$pay_orderinfo['out_trade_no']=$pay_resp->out_trade_no;
				$pay_ret['status']=10000;
				$pay_ret['detail']=$pay_orderinfo;
				 //2021-10-31 交易关闭增加
				$pay_ret['raw']=$pay_resp;
				$pay_ret['raw_trade_status']=$pay_resp->trade_status;

				$pay_ret['message']="支付宝支付成功-失败".$pay_resp->msg;
				//sub_msg
				return $pay_ret;
			}

			$pay_ret['status']=4;
	        $pay_ret['message']=$pay_resp->sub_msg;
			//sub_msg
			return $pay_ret;
            break;
        case "UNKNOWN":
           // echo "系统异常，订单状态未知!!!"."<br>--------------------------<br>";
            if(!empty($queryResult->getResponse())){
             //   print_r($queryResult->getResponse());
            }
            break;
        default:
           // echo "不支持的查询状态，交易返回异常!!!";
            break;
    }
    return $pay_ret;

  }

  //退款查询
    public function dangmianfuRefundquery($mer_id,$store_id,$outTradeNo,$subject,$price,$authcode,$body,$undiscountableAmount="0.01"){
		$pay_ret['status']=4;
	    $pay_ret['message']="支付失败";

		//var_dump($pay_ret);

		if(strlen($this->appAuthToken)<5){
		 $ret_a=$this->initByMerchant($mer_id , $store_id);
		 if($ret_a==false){
			  return $pay_ret;
		 }

	    }


		  $out_trade_no = trim($outTradeNo);

    //第三方应用授权令牌,商户授权系统商开发模式下使用
    $appAuthToken = "";//根据真实值填写
	 //  $appAuthToken = "202010BB64c2b60502d6458eb44993f155066X54";//根据真实值填写 201905BB45ce2dfa474c4b929e6f87a9cc7ffX14

  $appAuthToken =$this->appAuthToken;//
    //构造查询业务请求参数对象
    $queryContentBuilder = new AlipayTradeRefundContentBuilder();
    $queryContentBuilder->setOutTradeNo($out_trade_no);
	//out_request_no

    $queryContentBuilder->setAppAuthToken($appAuthToken);

	$config=$this->getISVConfig();


    //初始化类对象，调用queryTradeResult方法获取查询应答
    $queryResponse = new AlipayTradeService($config);
    $queryResult = $queryResponse->queryTradeResult($queryContentBuilder);

	$pay_resp=$queryResult->getResponse();
	$pay_code=$pay_resp->code;

	$pay_ret['code']=$pay_code;

    //根据查询返回结果状态进行业务处理
    switch ($queryResult->getTradeStatus()){
        case "SUCCESS":
           // echo "支付宝查询交易成功:"."<br>--------------------------<br>";
            //print_r($queryResult->getResponse());
           
			$pay_orderinfo['buyer_logon_id']=$pay_resp->buyer_logon_id;
			$pay_orderinfo['price']=$pay_resp->buyer_pay_amount;
			$pay_orderinfo['buyer_user_id']=$pay_resp->buyer_user_id;
			$pay_orderinfo['trade_no']=$pay_resp->trade_no;
			$pay_orderinfo['out_trade_no']=$pay_resp->out_trade_no;
			$pay_ret['status']=10000;
			$pay_ret['detail']=$pay_orderinfo;
			$pay_ret['raw']=$pay_resp;

	        $pay_ret['message']="支付宝支付成功";
			//sub_msg
			return $pay_ret;
            break;
        case "FAILED":
           // echo "支付宝支付失败!!!" . "<br>--------------------------<br>";
            if (!empty($queryResult->getResponse())) {
               // print_r($barPayResult->getResponse());
            }
			if($pay_code=="10000"){
				$pay_orderinfo['buyer_logon_id']=$pay_resp->buyer_logon_id;
				$pay_orderinfo['price']=$pay_resp->total_amount;
				$pay_orderinfo['buyer_user_id']=$pay_resp->buyer_user_id;
				$pay_orderinfo['trade_no']=$pay_resp->trade_no;
				$pay_orderinfo['out_trade_no']=$pay_resp->out_trade_no;
				$pay_ret['status']=10000;
				$pay_ret['detail']=$pay_orderinfo;

				$pay_ret['message']="支付宝支付成功".$pay_resp->msg;
				//sub_msg
				return $pay_ret;
			}

			$pay_ret['status']=4;
	        $pay_ret['message']=$pay_resp->sub_msg;
			//sub_msg
			return $pay_ret;
            break;
        case "UNKNOWN":
           // echo "系统异常，订单状态未知!!!"."<br>--------------------------<br>";
            if(!empty($queryResult->getResponse())){
             //   print_r($queryResult->getResponse());
            }
            break;
        default:
           // echo "不支持的查询状态，交易返回异常!!!";
            break;
    }
    return $pay_ret;

  }
	 

	 


}

?>