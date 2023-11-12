
	 //虚空 
	 	
	var tpl_系统设置_密码 = `<table>


		
			<tr>
				<td   colspan="1">密码</td>
				<td width="100px" colspan="1"><input type="number" class="eco_system_input" id="sys_password" name="sys_password" size="10"   tips=""   style="-webkit-text-security:disc;" /></td>
			
				
			</tr>

			 
		</table>
		<div class="btn">
			<button type="button" onClick="javascript:cwpd_system_set();"  class="btn_card">确定</button>
			 
		</div>`;

		 



			var tpl_系统设置 = `<table>

			<tr>
				<th   colspan="2"><button type="button" onClick="javascript:未来之窗_运行时_加载();"  class="btn_set">升级系统参数</button></th>
				 
				 

				<th   colspan="2"><button type="button" onClick="javascript:未来之窗_酒店硬件设备信息();"  class="btn_set">下传硬件设备信息</button></th>
				 
				 
			
				
			</tr>

			<tr>
				 
				 
				<th   colspan="2"><button type="button" onClick="javascript:未来之窗_运行时_DA114();"  class="btn_set">DA-青州写入HS</button></th>
				<th   colspan="3"><button type="button" onClick="javascript:未来之窗_运行时_DA114_新零售();"  class="btn_set">DA-青州写入RS</button>

				<button type="button" onClick="javascript:未来之窗_运行时_DA114_餐饮娱乐();"  class="btn_set">DA-青州写入DKS</button></th>
 	 
				 
			
				
			</tr>

<!--
			
			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:downloadlocalapp_thiswlzcdata();"  class="btn_set">同步酒店信息</button></th>
				 
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_loacalapp_start_pc();"  class="btn_set">重新加载</button></th>
				 
				 
			
				
			</tr>
			-->

			<tr>
			   <th   colspan="1">屏幕</th>
				<th   colspan="2"><button type="button" onClick="javascript:cyberwin_control_device_setdevice_screenmode('10寸');"  class="btn_set">10寸模式</button>
				 
				 <button type="button" onClick="javascript:cyberwin_control_device_setdevice_screenmode('7寸');"  class="btn_set">7寸模式</button></th>
				 
				 
			
				
			 
				<th   colspan="1">语言</th>
				<th   colspan="2"><button type="button" onClick="javascript:未来之窗_设备_语言_保存('中文');"  class="btn_set">中文</button>

				<button type="button" onClick="javascript:未来之窗_设备_语言_保存('english');"  class="btn_set">english</button></th>
				 
			</tr>


		<tr>
				<th   colspan="1">销售模式</th>
				<th   colspan="2"><button type="button" onClick="javascript:未来之窗_设备_本地配置_写入('ShopNew_Cashier_salemode','normal');"  class="btn_set">通用模式</button>

				<button type="button" onClick="javascript:未来之窗_设备_本地配置_写入('ShopNew_Cashier_salemode','score');"  class="btn_set">积分模式</button></th>
				
				 <th   colspan="1">智能语音</th>
				<th   colspan="2">
				<button type="button" onClick="javascript:未来之窗_设备_本地配置_写入('ShopNew_Cashier_open_speechhleper','Y');"  class="btn_set">播报</button>

				<button type="button" onClick="javascript:未来之窗_设备_本地配置_写入('ShopNew_Cashier_open_speechhleper','N');"  class="btn_set">不播报</button></th>
		
			</tr>

			<tr>
			 
				 <th   colspan="1">播报会员</th>
				<th   colspan="2">
				<button type="button" onClick="javascript:未来之窗_设备_本地配置_写入('ShopNew_Cashier_open_cardinfo_speak','Y');"  class="btn_set">播报</button>

				<button type="button" onClick="javascript:未来之窗_设备_本地配置_写入('ShopNew_Cashier_open_cardinfo_speak','N');"  class="btn_set">不播报</button></th>
		
			</tr>


				<tr>
				<th   colspan="5">打印<input id="sys_temp_hotel_cashierdesk_checkingout_printslip_copies" style="width:40px;" class="eco_system_input">
				 <button type="button" onClick="javascript:未来之窗_设备_结账单份数_保存(sys_temp_hotel_cashierdesk_checkingout_printslip_copies.value);"  class="btn_set">结账单份数</button>
				 
				 收银字体<input id="sys_tempShopNew_Cashier_leftcartfontsize" style="width:40px;" class="eco_system_input">
				 <button type="button" onClick="javascript:未来之窗_设备_本地配置_写入('ShopNew_Cashier_leftcartfontsize',sys_tempShopNew_Cashier_leftcartfontsize.value);"  class="btn_set">设置</button></th>
			

			</tr>


			
			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:downloadlocalapp_thiswlzc();"  class="btn_set">更新系统</button></th>
				 
			 	 
			
				
			</tr>

	


<!--

		
			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:downloadlocalapp_thiswlzc();"  class="btn_set">更新系统</button></th>
				 
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_control_client_sethome_app();"  class="btn_set">设置为默认应用</button></th>
				 
				 
			
				
			</tr>
			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:downloadlocalapp_thiswlzc();"  class="btn_set">更新系统</button></th>
				 
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_control_client_sethome_app2();"  class="btn_set">默认应用2</button></th>
				 
				 
			
				
			</tr>

			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_control_device_screen_Orientation('Horizontal');"  class="btn_set">强制横屏</button></th>
				 
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_control_device_screen_Orientation('Vertical');"  class="btn_set">强制竖屏</button></th>
				 
				 
			
				
			</tr>



			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_control_device_setstart('app');"  class="btn_set">开启客户模式</button></th>
					<th   colspan="1"><button type="button" onClick="javascript:cyberwin_control_device_setstart('system');"  class="btn_set">开启调式模式</button></th>
				 
				 
				 
				 
			
				
			</tr>
			-->


					<!---2023-11-8-->
			<tr>
				<th   colspan="5">集团id<input id="sys_temp_merchant_id" style="width:40px;" class="eco_system_input">
				   <button type="button" onClick="javascript:未来之窗_设备_本地配置_写入WEB('wlzc_o2o_merchant_id',sys_temp_merchant_id.value);"  class="btn_set">设置</button>
			
				 机构ID<input id="sys_temp_store_id" style="width:40px;" class="eco_system_input">
				 <button type="button" onClick="javascript:未来之窗_设备_本地配置_写入WEB('wlzc_o2o_store_id',sys_temp_store_id.value);"  class="btn_set">设置</button>
				 
				   <button type="button" onClick="javascript:未来之窗_设备_本地配置_写入WEB('soft_version_CyberTrade_ecogen_FoodShop_DishAndKTV','cashier');"  class="btn_set">餐饮-终端</button>

			    <button type="button" onClick="javascript:未来之窗_设备_本地配置_写入WEB('soft_version_CyberTrade_ecogen_FoodShop_DishAndKTV','dish_tableexhibit');"  class="btn_set">餐饮-选品</button>
		             </th>
			

			</tr>

			<tr>
				<th   colspan="5" style="text-align: left;">主界面名称<input id="sys_temp_store_name" style="width:180px;" class="eco_system_input">
				   <button type="button" onClick="javascript:未来之窗_设备_本地配置_写入WEB('wlzc_o2o_store_name',sys_temp_store_name.value);"  class="btn_set">设置</button>
			
				    </th>
			

			</tr>

			
		<tr>
			<th   colspan="1">无网络模式</th>
			<th   colspan="4">
			   <button type="button" onClick="javascript:未来之窗_设备_本地配置_写入('ShopNew_Cashier_nonetwork_use','Y');"  class="btn_set">支持无网模式</button>

			    <button type="button" onClick="javascript:未来之窗_设备_本地配置_写入('ShopNew_Cashier_nonetwork_use','N');"  class="btn_set">关闭无网模式</button>
			     
			</th>
				
				 	
			</tr>

				<tr>
		 
			<th   colspan="5" style="font-size:12px">
			       无网模式：一般用于房卡，查看商品金额，但是无法交易
			</th>
				
				 	
			</tr>


			<tr>
				<th   colspan="1"><button type="button" onClick="javascript: CyberWin_JsStandardPlug.cwpdAppExit();"  class="btn_set ">退出</button></th>
					<th   colspan="1"></th>
				 
	
				
			</tr>


			 
		</table>
		 `;


 
  




var tpl_cyberwin_header =``;

 
 
 

 

var tpl_酒店系统常用_PC = `<table class="table_hotel_float_fn">


		
			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_helper_weather();"  class="btn_set">天气预报</button></th>
				 </tr>
				 
				 <!--

			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_helper_localdish();"  class="btn_set">附近美食</button></th>
				 
				 
				</tr>

			<tr>
			-->
				
			<!--
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_helper_merchant_login('');"  class="btn_set">登录</button></th>
				 </tr>
				 -->
				 <!--

			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_helper_merchant_加载('');"  class="btn_set">房态</button></th>
				 
				 
			
				
			</tr>


			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_helper_merchant_提示('');"  class="btn_set">提示</button></th>
				 
				 
			
				
			</tr>
			-->

			<tr>
					<th   colspan="1"><button type="button" onClick="javascript:未来之窗_硬件设备_更新基础数据();"  class="btn_set">下载数据</button></th>
			
				 
				 
			
				
			</tr>

			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_control_sysset();"  class="btn_set">系统设置</button></th>
				 
				 
			
				
			</tr>

			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_control_sysset('cyberwin_control_sysamendpassword');"  class="btn_set">修改系统密码</button></th>
				 
				 
			
				
			</tr>


		 

			 
		</table>
		 `;


	//2023-9-8
		var tpl_系统设置_修改密码 = `<table>


		
			<tr>
				<td   colspan="1">新密码</td>
				<td width="100px" colspan="1"><input type="number" class="eco_system_input" id="sys_password_new" name="sys_password_new" size="10"   tips=""   style="-webkit-text-security:disc;" /></td>
			
				
			</tr>
			<tr>
				<td   colspan="1">重复密码</td>
				<td width="100px" colspan="1"><input type="number" class="eco_system_input" id="sys_password_new_re" name="sys_password_new_re" size="10"   tips=""   style="-webkit-text-security:disc;" /></td>
			
				
			</tr>

			 
		</table>
		<div class="btn">
			<button type="button" onClick="javascript:cwpd_system_set_amendpassword();"  class="btn_card">确定</button>
			 
		</div>`;

var tpl_KTV餐饮展示_PC = `<table class="table_hotel_float_fn">


		
		  
		 
 

			<tr>
					<th   colspan="1"><button type="button" onClick="javascript:未来之窗_硬件设备_更新基础数据();"  class="btn_set">下载数据</button></th>
			
				 
				 
			
				
			</tr>

			
			<tr>
					<th   colspan="1"><button type="button" onClick="javascript:未来之窗_硬件设备_同步菜品图片();"  class="btn_set">同步图片</button></th>
			
				 
				 
			
				
			</tr>

			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_control_sysset();"  class="btn_set">系统设置</button></th>
				 
				 
			
				
			</tr>

			<tr>
				<th   colspan="1"><button type="button" onClick="javascript:cyberwin_control_sysset('cyberwin_control_sysamendpassword');"  class="btn_set">修改系统密码</button></th>
				 
				 
			
				
			</tr>


		 

			 
		</table>
		 `;
