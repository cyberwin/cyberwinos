 
var cyberwin_alert_style=`<style>
#alert-layer{
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
	text-align: center;
	color: #696969;
	z-index: 99999;
	}
	#alert-container{
		background: #f3f8f7;
		margin: 5%;
		width: 90%;
		max-height: 90%;
		overflow: auto;
		border-radius: 15px;
		padding-top: 1px;
	}
	#alert-text-container{
		font-size: 13px;
		line-height: 25px;
	}
	#cyberwin_alert-title{
		margin: 10px auto;
		font-size: 16px;
		font-size:26px;
		border-bottom:1px solid red;
		padding-bottom: 8px;
		text-align:left;
		padding-left: 80px;
		color:#f9b526;
	}
	#cyberwin_alert-detail{
	   background:#FFFFFF;
	   min-height:50px;
	}
	#cyberwin_alert-detail H1{
	   background:#FFFFFF;
	}
	

	#check-username{
		font-size: 16px;
	}
	#cyberwin_alert-btn{
		height: 60px;
		line-height: 60px;
		border-top: 1px solid #aaa;
	}

	.cyberwin_alert-btn_child{
		display:inline-block;
		line-height:32px;
		background:#FFFFFF;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 15px;
		padding-right: 15px;
		margin-left: 5px;
		border-radius:10px;


 
 
	margin-bottom: 0;
	font-size: 26px;
 
	color: #333;
	text-align: center;
	text-shadow: 0 1px 1px rgba(255,255,255,0.75);
	vertical-align: middle;
	background-color: #f5f5f5;
	background-image: -webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));
	background-image: -webkit-linear-gradient(top,#fff,#e6e6e6);
	background-image: linear-gradient(to bottom,#fff,#e6e6e6);
	background-repeat: repeat-x;
	border: 1px solid #ccc;
	border-color: #e6e6e6 #e6e6e6 #bfbfbf;
	border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);
	border-bottom-color: #b3b3b3;
	-webkit-border-radius: 4px;
	border-radius: 4px;
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff',endColorstr='#ffe6e6e6',GradientType=0);
	filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
	-webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
	box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
}
	}

	.cwpd-btn-block{
      	border-radius: 15px;
       }
		.cwpd-btn-block-info{
			background: #02b099;
			color:#ffffff;
		}
		.cwpd-btn-block-info:hover{
			background: #018372;
		}
		.cwpd-btn-block-warning{
			background: #ff683d;
		}


	#cyberwin_alert-confirm:hover{
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
	}
	#cyberwin_alert-confirm:hover{
		background: #ddd;
	}
	</style>`;

function cyberwin_alert_open(arg1,arg2,btnok,btncancel){
	//alert('11');
	if(arguments.length == 1){
		var content = "<div id='alert-layer'>"+
			"<div id='alert-container'>"+
				"<div id='alert-text-container'>"+
					"<p id='alert-title'>提示信息</p>"+
					"<p id='alert-detail'>"+arg1+"</p>"+
				"</div>"+
				"<div id='alert-btn'>"+
					"<div id='alert-confirm' class='alert-btn_child cwpd-btn-block-info'>确定</div>"+
						"<div id='alert-confirm' class='alert-btn_child'>取消</div>"+
				"</div>"+
			"</div>"+
		"</div>";
	}else if(arguments.length == 2){
		var content = "<div id='alert-layer'>"+
			"<div id='alert-container'>"+
				"<div id='alert-text-container'>"+
					"<p id='alert-title'>"+arg1+"</p>"+
					"<p id='alert-detail'>"+arg2+"</p>"+
				"</div>"+
				"<div id='alert-btn'>"+
						"<div id='alert-confirm' class='alert-btn_child cwpd-btn-block-info'>确定</div>"+
						"<div id='alert-confirm' class='alert-btn_child'>取消</div>"+
				"</div>"+
			"</div>"+
		"</div>";
	}


	var content = "<div id='alert-layer'>"+
			"<div id='alert-container'>"+
				"<div id='alert-text-container'>"+
					"<p id='cyberwin_alert-title'>"+arg1+"——————未来之窗架构新思想</p>"+
					"<p id='cyberwin_alert-detail'>"+arg2+"</p>"+
				"</div>"+
				"<div id='alert-btn'>"+
						"<div id='cyberwin_alert-confirm' class='cyberwin_alert-btn_child cwpd-btn-block-info'>"+btnok+"</div>"+
						"<div id='cyberwin_alert-cancel' class='cyberwin_alert-btn_child'>"+btncancel+"</div>"+
				"</div>"+
			"</div>"+
		"</div>";



	$(content).appendTo($('body'));
	$('#alert-layer').fadeIn();
	alert_confirm();
}
function alert_confirm(){
	$("#cyberwin_alert-confirm").click(function(){
		$('#alert-layer').fadeOut();
		setTimeout(function(){$('#alert-layer').remove();},500);
	})
	$("#cyberwin_alert-cancel").click(function(){
		//$('#alert-layer').fadeOut();
		//setTimeout(function(){$('#alert-layer').remove();},500);
	})
}
	document.write(cyberwin_alert_style);
//cyberwin_alert_open('修改成功','786868<img src="http://f.ynwlzc.net/wlzc_res/images/logo.png">',"同意","不同意");
 