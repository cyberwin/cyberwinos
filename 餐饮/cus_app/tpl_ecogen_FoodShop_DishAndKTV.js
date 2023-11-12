var tpl_餐饮KTV娱乐_header_PC =`<div class="headerBox" style="background:#c5c07b;color:#000;">
		 
			<!--<div class="txt" style="padding-right: 430px;width:120px;overflow:hidden;">未来之窗-云南分公司</div>-->
			<!--
			<div class="txt" style="position:absolute;top:0px;margin-left: 40px;padding-right: 430px;width:160px;overflow:hidden;line-height:47px;"><img src="client\application\dish\images/cashier_yygn.jpg" style="width:47px;vertical-align: middle;">营业功能</div>
			-->

			<style>
			   img{
			        vertical-align: middle;
			   }
			   
			   </style>

			<div class="txt" style="position:absolute;top:0px;margin-left: 20px;padding-right: 430px;width:150px;overflow:hidden;" onclick="open_fastdish();"><img src="./cus_res/dish/images/cashier_kc.svg" style="width:27px;line-height:27px;">快餐营业</div>

			<script>
			   function open_fastdish(){
				   /*
				     var areaWH = ['98%', '95%'];
					 var url="/o2o/store.php?g=Merchant&c=Store&a=cyberwin_dish_fastfoodmode";
					  layer_index = layer.open({
						id:  '',
						type: 2,
						title: '快餐营业',
						shadeClose: true,
						shade: 0.6,
						area: areaWH,
						content: url
					});
					*/
					var 未来之窗中间件_2024 = "http://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=cyberwin_dish_fastfoodmode&cyberwin_client_session_userandstaff_data="+未来之窗_bridge_user;
					var title="快餐营业";
					console.log(未来之窗中间件_2024);
					 CyberWin_Dialog.layer(未来之窗中间件_2024,{type:"url",title:title,move:true,width:"1200px",height:"530px",id:未来之窗app_通用ID,mask:true,align:59,hideclose:false});
     

			  }
			  </script>

			  
			 
	<!--		
     <div class="back urlLink" data-url="/o2o/store.php?g=Merchant&amp;c=Store&amp;a=index" title="返回首页"></div>			
-->
<!--
 		 <div class="reload " onclick="cwpd_openWnd('https://51.onelink.ynwlzc.cn/o2o/pos.php?g=Pos&amp;c=Card_new&amp;a=add_user','添加会员')" title="刷新页面" style="right:500px;background:url('ak');width: 105px;border:1px solid;">添加会员</div>						
			<div class="reload urlLink" data-url="/o2o/store.php?g=Merchant&amp;c=Store&amp;a=cyberwin_dish_fastfoodmode" title="刷新页面" style="right:130px;background:url();width: 100px;">快餐模式</div>
			-->
			 <!--
			 			<div class="reload " onclick="cwpd_openWnd('https://51.onelink.ynwlzc.cn//o2o/cyberwin_offline_store.php?g=MerchantV6&amp;c=CyberWin_Store&amp;a=jc_Renewal_jcxf','计次消费')" title="刷新页面" style="right:440px;background:url('ak');width: 50px;border:1px solid;">计次消费</div>|
			 -->
<!--
			 			<div class="reload " onclick="cwpd_openWnd('https://51.onelink.ynwlzc.cn/o2o/pos.php?g=Pos&amp;c=Card_new','会员管理')" title="刷新页面" style="right:380px;background:url('ak');width: 50px;border:1px solid;">会员</div>|
			 			<div class="reload " onclick="cwpd_openWnd('https://51.onelink.ynwlzc.cn/o2o/pos.php?g=Pos&amp;c=Foodshop&amp;a=goods_sort&amp;store_id=72','菜品管理');" title="刷新页面" style="right:310px;;background:url('ak');width: 50px;border:1px solid;">菜品</div>|



           			<div class="reload" onclick="cwpd_openWnd('http://51.onelink.ynwlzc.cn/o2o/pos.php?g=Pos&amp;c=POSClien_API&amp;a=transClent&amp;red=Pos/Report_DishSystem/Schedule_desktop','报表');" title="刷新页面" style="right:250px;background:url();width: 50px;border:1px solid;">报表</div>

-->
<!--
			<div class="reload" onclick="cwpdexit();" title="刷新页面" style="right:50px;background:url()">退出系统</div>
			-->
			<script>
			 


				function cwpd_openWnd(url,title){
				CyberWin_JsStandardPlug.cwpdOpenNewWind(url,title);
			}
			</script>
			<div class="reload urlLink" data-url="reload" title="刷新页面"></div>
		</div>`;

var tpl_餐饮KTV娱乐_body_PC =`
		
	<div class="mainBox">
	 
			<div class="rightMain tableMain" >

			 
			


			
				<div class="tabele_cat_2024 swiper-container cyberwin_data_dish_table_type" >

					<ul class="swiper-wrapper">
					 	
						
						
					</ul>
				</div>
				



				 

				<div class="table_tab_box">
					<div class="table_tab">
						<div class="tab_all cur" style="
    padding-left: 20px;
    padding-right: 20px;
">所有</div>
					

						
 

	<div class=""  onClick="cwpd_openWnd('http://51.onelink.ynwlzc.cn/o2o/pos.php?g=Pos&c=Store_StaffPrinterPrintLog');" style="float: left;
    padding:10px 20px;
    border: 1px solid #4ECAAD;
    cursor: pointer;
    margin-left: 10px;
    font-size: 16px;
	background:#4ECAAD;
	border-radius:5px;"><img src="./cus_res/dish/images/changetable.svg" style="width:28px;">补打出品单</div>

						
	<div class=""  onClick="cyberwin_chnage_table();" style="float: left;
    padding:10px 20px;
    border: 1px solid #4ECAAD;
    cursor: pointer;
    margin-left: 15px;
    font-size: 16px;
	background:#4ECAAD;
	border-radius:5px;"><img src="./cus_res/dish/images/changetable.svg" style="width:28px;">换房</div>


	<div class=""  onClick="cyberwin_clear_table();" style="float: left;
    padding:10px 20px;
    border: 1px solid #4ECAAD;
    cursor: pointer;
    margin-left: 15px;
    font-size: 16px;
	background:#4ECAAD;
	border-radius:5px;"><img src="./cus_res/dish/images/cleartable.svg" style="width:28px;">清台</div>



						<div class=""  onClick="trans_openCashierDrawer();" style="float: left;
    padding:10px 20px;
    border: 1px solid #4ECAAD;
    cursor: pointer;
    margin-left: 15px;
    font-size: 16px;
	background:#4ECAAD;
	border-radius:5px;"><img src="./cus_res/dish/images/cashierbox.svg" style="width:28px;border:0px;">钱箱</div>



					

				<!--	
				<div class=""  onClick="cwpd_clearLocalDishMenu();" style="float: left;
			padding:10px 20px;
			border: 1px solid #4ECAAD;
			cursor: pointer;
			margin-left: 15px;
			font-size: 16px;
			background:#4ECAAD;
			border-radius:5px;"><img src="./cus_res/dish/images/cleartable.svg" style="width:28px;border:0px;">清除本地项目
			</div>

		  <div class=""  onClick="cwpd_loadTemplate();" style="float: left;
		padding:10px 20px;
		border: 1px solid #4ECAAD;
		cursor: pointer;
		margin-left: 15px;
		font-size: 16px;
		background:#4ECAAD;
		border-radius:5px;"><img src="./cus_res/dish/images/cleartable.svg" style="width:28px;border:0px;">加载环境
		</div>
	

				<div class=""  onClick="cwpd_clearLocalDishMenuAndSyncDish();" style="float: left;
			padding:10px 20px;
			border: 1px solid #4ECAAD;
			cursor: pointer;
			margin-left: 15px;
			font-size: 16px;
			background:#4ECAAD;
			border-radius:5px;"><img src="./cus_res/dish/images/cleartable.svg" style="width:28px;border:0px;">同步服务商品
			</div>
	-->

 




					 
</div>



					<div class="table_search">
						<input type="text" placeholder="输入包房名称" style="width:95px;" />
					</div>
				</div>
				<div class="table_body">
					<ul>
						
					</ul>
				</div>
			</div>
		</div>
`;



	var tpl_未来之窗_KTV_包间类别 =`
	<ul class="swiper-wrapper">
					 	
			 {cwpdapp{# for(var i in d){ }}
				  
					  <li class="swiper-slide cyberwin_data_dish_table_type_child" id="cyberwin_data_dish_table_type_child_{cwpdapp{ d[i].id }}" data-href="{cwpdapp{ d[i].id }}" onClick="加载桌台桌台by类别('{cwpdapp{ d[i].id }}');"   style="line-height:52px;height:52px;">{cwpdapp{ d[i].name }}</li>
			{cwpdapp{# } }}
							
					 
	</ul>`;



	var tpl_未来之窗_KTV_包间 =`
	<ul >
					 	
			 {cwpdapp{# for(var i in d){ }}
				  
			 
			    <li id="cwpd_table_sign_{cwpdapp{d[i].id}}" class="cyberwin_calc_rk_end_time" data-id="{cwpdapp{d[i].id}}" data-table_id="{cwpdapp{d[i].id}}"  data-table-status="{cwpdapp{d[i].current_status_text}}"  data-open_time="{cwpdapp{d[i].current_order_create_time}}"
															 data-current_order_id="{cwpdapp{d[i].current_order_id}}" data-table_type_id="{cwpdapp{d[i].tid}}"  data-table_type_name="{cwpdapp{d[i].table_type_name}}"   data-table_name="{cwpdapp{d[i].name}}"  style=""
							onClick="cyberwin_selectthistable('{cwpdapp{i}}','{cwpdapp{d[i].id}}');">

							<div id="cwpd_table_select_{cwpdapp{i}}" class="cwpd_tablesel" data-id="{cwpdapp{d[i].id}" data-tablename="{cwpdapp{d[i].name}}"> ✔</div>

								<div class="cat_name"><cybera title="包房：{cwpdapp{d[i].name}}"  data-title="包房：{cwpdapp{d[i].name}}" data-table_id="{cwpdapp{d[i].id}}"   class="handle_btn_ktvtable2024" data-layer_id="edit_order" data-title="包房：{cwpdapp{d[i].name}}" data-box_width="95%" data-box_height="95%"  href=""><font color='#000000;'>{cwpdapp{ d[i].name }}({cwpdapp{d[i].table_type_name}})
								</font></cybera></div>
								<div class="cat_status" style="display:none;" >状态：</div>

								 

									合计:<cyberdiv id="cwpd_table_sign_{cwpdapp{d[i].id}}_total_price"></cyberdiv> 状态:<cyberdiv id="cwpd_table_sign_{cwpdapp{d[i].id}}_status"></cyberdiv>
									
								<div class=""   >开单：<cyberdiv id="cwpd_table_sign_{cwpdapp{d[i].id}}_open_tabletime"></cyberdiv></div>
								<div class=""   >倒计时：<cyberdiv id="cwpd_table_sign_{cwpdapp{d[i].id}}_romm_remain_time"></cyberdiv></div>
								<div class="" >时长：<cyberdiv id="cwpd_table_sign_{cwpdapp{d[i].id}}_romm_escape_time"  style="color: blue;font-size: 18px;" ></cyberdiv></div>

								<div class="cat_btn">
								   
 

								</div>
							</li>
					  
					  
					  
					  {cwpdapp{# } }}
							
					 
	</ul>`;


var tpl_未来之窗_KTV_包间222 =`
	<ul >
					 	
			 {cwpdapp{# for(var i in d){ }}
				  
			 
			    <li id="cwpd_table_sign_{cwpdapp{$vo.id}}" class="<if condition="$vo['status'] eq 0">unlocked<else/>locked</if>" data-id="{cwpdapp{$vo.id}"   data-table-status="{cwpdapp{$vo_room.current_status_text}"  data-open_time="{cwpdapp{$vo.current_order_create_time}"
															 data-current_order_id="{cwpdapp{$vo.current_order_id}" data-table_type_id="{cwpdapp{$vo.tid}"  data-table_type_name="{cwpdapp{$vo.table_type_name}"  data-table_name="{cwpdapp{$vo.name}"  style="<if condition="$vo['status'] eq 0">background: white;<else/>background:#c3b50e;</if>"
							onClick="cyberwin_selectthistable('{cwpdapp{$key}','{cwpdapp{$vo.id}');">

							<div id="cwpd_table_select_{cwpdapp{$key}" class="cwpd_tablesel" data-id="{cwpdapp{$vo.id}" data-tablename="{cwpdapp{$vo.name}"> ✔</div>

								<div class="cat_name"><a title="包房：{cwpdapp{$vo.name}"  data-title="包房：{cwpdapp{$vo.name}" data-table_id="{cwpdapp{$vo.id}"   class="handle_btn_ktvtable2024" data-layer_id="edit_order" data-title="包房：{cwpdapp{$vo.name}" data-box_width="95%" data-box_height="95%"  href="{cwpdapp{:U('cyberwin_foodshop_order_view',array('table_id' => $vo['id'],'table_type_id'=>$vo['tid']))}"><font color='#000000;'>{cwpdapp{ d[i].name }}
								</font></a></div>
								<div class="cat_status" style="display:none;" >状态：<if condition="$vo['status'] eq 0">正常<else/>锁定</if></div>

								 

									合计:<cyberdiv id="cwpd_table_sign_{cwpdapp{$vo.id}_total_price">{cwpdapp{$vo.id|getTablePriceByTableID}</cyberdiv> 状态:<cyberdiv id="cwpd_table_sign_{cwpdapp{$vo.id}_status">{cwpdapp{$vo.status_text}</cyberdiv>
									
								

								<div class="cat_btn">
								   
 

								</div>
							</li>
					  
					  
					  
					  {cwpdapp{# } }}
							
					 
	</ul>`;


