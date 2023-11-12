
//2023-2-1 分离菜单
//alert(123);
/*未来之窗核心变量*/
var dish_print_kitchen_no=0 ;
/*未来之窗核心调整*/
var dish_menu_body_offset_height=50;
/*未来之窗雪莲计划*/

/*显示副屏幕*/
var dish_deputy_screen_show=0;
var cwpd_checkCart_Bury_fastfoodmode_pressed=false;

var cwpd_cwpd_amendspec_mul_addprice=0;

var local_dish_menu = 'local_dish_normode_menu_' + store_id; //本地菜单
var local_dish_foodmenu = 'local_dish_food_menu_' + store_id; //本地菜单

var tipIndex; //提升层级

var cwpd_debug=0;//调试模式

var cwpd_hascwpd_desktop_middle_handle=0;

var kitch_printer_type_text="厨打单";

var dishmenu_width=270;//菜品展示宽度

var dish_handle_add_goods_package=false;//套餐添加中

//2023-7-23 未来之窗传输模式
var wlzc_data_transmode ="signal";



function cwpd_snow_getelectscale(){
	  layer.msg('直接在数量位置输入，重量');
	/*
	layer.prompt(function(val, index){
	  layer.msg('重量'+val);
	  layer.close(index);
	});
	*/
}

var food_package_num_cache = {};//未来之窗套餐缓存

var foodData = {},nowSpecFood = {},nowGroupId = 0;
$(function(){
//  未来之窗_新架构_init();
//2023-7-26 分离
});
 function 未来之窗_新架构_init(){

	//取消动画20230131  var tipIndex = layer.load(0, {shade: [1,'#fff']});
	//alert(123);
	$('.food_cart').height($(window).height());

	//2019-8-29自动宽度 菜单
	//$('.food_menu').width($(window).width()-350);

	
	if(cwpd_hascwpd_desktop_middle_handle==1){
	  //扣除中间按钮
	   $('.food_menu').width($(window).width()-$('.food_cart').width()-83);
	    $('.food_body').height($(window).height()-110-105+dish_menu_body_offset_height);
		 $('.food_cart_list,.food_buy_list').height($(window).height()-80-120);
	}else{
	   $('.food_menu').width($(window).width()-$('.food_cart').width());
	    $('.food_body').height($(window).height()-110-140+dish_menu_body_offset_height);
	  
	
	   $('.food_cart_list,.food_buy_list').height($(window).height()-80-140);

	}
	
	//$('.food_body').height($(window).height()-110-140 增加偏移量);

	//2023-分离式加载
	未来之窗_API_加载菜品();
	未来之窗_API_加载桌台菜单(current_order_idV2023);


	/*
	
	
	$.getJSON(getFoodMenuUrl,{order_id:$('#order_id').val()},function(result){
	//alert(123);
		
		foodData = result;
		//console.log(result);
		
		laytpl($('#foodSortTpl').html()).render(foodData.lists, function(html){
			$('.swiper-wrapper').html(html);
			$('.swiper-wrapper li:first').addClass('cur');
		});
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 'auto',
			spaceBetween: 10,
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next',
		});  
		
		$('.foodshop_order .food_menu .food_cat li').click(function(){
			$(this).addClass('cur').siblings('li').removeClass('cur');
			$('.sort_ul_'+$(this).data('sort_id')).addClass('cur').show().siblings('ul').removeClass('cur').hide();
			changeBody();
		});
		
		laytpl($('#foodTpl').html()).render(foodData.lists, function(html){
			$('.food_body').html(html);
			$('.food_body ul:first').addClass('cur').show();
			changeBody();
		});
		
		$('.food_body li').click(function(){
			if($(this).hasClass('hasSpec')){
				var tip_index = layer.load(0, {shade: [0.5,'#fff']});
				var that = $(this);
				//for(var i in foodData.lists[that.data('sort_id')].goods_list){
				//if(foodData.lists[that.data('sort_id')].goods_list[i].goods_id == that.data('id')){
					//	nowSpecFood = foodData.lists[that.data('sort_id')].goods_list[i];

				//突然bug
				var current_sort_i=0;
				for(var i_s in foodData.lists){
					if(foodData.lists[i_s]['sort_id']==that.data('sort_id')){
						current_sort_i=i_s;
					}
				}

				for(var i in foodData.lists[current_sort_i].goods_list){
					if(foodData.lists[current_sort_i].goods_list[i].goods_id == that.data('id')){
						nowSpecFood = foodData.lists[current_sort_i].goods_list[i];

					
						laytpl($('#foodSpecTpl').html()).render(nowSpecFood, function(html){
							$('.food_spec_box').html(html);
						});
						changeSpec();
						layer.close(tip_index);
						layer.open({
							type: 1,
							title: false,
							shadeClose: true,
							shade: 0.6,
							area: ['400px','510px'],
							closeBtn:0,
							content: $('.food_spec_box')
						});
						return false;
						break;
					}
				}
			}else{
				//2020-1-27 打印机
				//cartFunction({productKey:$(this).data('id'),productId:$(this).data('id'),productName:$(this).data('name'),productUnit:$(this).data('unit'),productPrice:$(this).data('price'),productStock:$(this).data('stock_num'),productParam:[]},'plus');
				//2020-1-27 套餐操作知道吗
				//cartFunction({productKey:$(this).data('id'),productId:$(this).data('id'),productName:$(this).data('name'),productUnit:$(this).data('unit'),productPrice:$(this).data('price'),productStock:$(this).data('stock_num'),productPrintId:$(this).data('print_id'),productParam:[]},'plus');

				if(dish_handle_add_goods_package==true){
				    console.log("套餐选中2022 -"+$(this).data('id'));
				    console.log(food_package_num_cache);

					//var good_id_for_num_cache_one = $(this).data('id');
					 

					var food_package_num_cache_one_name="packagenum_"+$(this).data('id');
					 for(var item_package in food_package_num_cache){ 
					         console.log("子："+item_package); 
					 }


					var food_package_num_cache_one=food_package_num_cache[food_package_num_cache_one_name];
					 console.log(food_package_num_cache_one_name+"one="+food_package_num_cache_one+"gid="+$(this).data('id'));

					food_package_num_cache_one= Number(food_package_num_cache_one);
					if(food_package_num_cache_one<1){
					  food_package_num_cache_one=1;
					}
					if(food_package_num_cache_one>999){
					   food_package_num_cache_one=1;
					}

					console.log("套餐选中2022-"+$(this).data('id')+"数量："+food_package_num_cache_one);


				   cartFunction({productKey:$(this).data('id'),productId:$(this).data('id'),productName:'[套]'+$(this).data('name'),productUnit:$(this).data('unit'),productPrice:0,productStock:$(this).data('stock_num'),productPrintId:$(this).data('print_id'),productParam:[],count:food_package_num_cache_one},'plusvpackage');

				  

				}else{

				      cartFunction({productKey:$(this).data('id'),productId:$(this).data('id'),productName:$(this).data('name'),productUnit:$(this).data('unit'),productPrice:$(this).data('price'),productStock:$(this).data('stock_num'),productPrintId:$(this).data('print_id'),productParam:[]},'plus');
				}

			}
		});
		 
		 
		laytpl($('#cyberwinfoodGroupTpl').html()).render(foodData.package, function(html){
		    console.log("套餐加载");
		     //console.log(foodData.package);
			$('.food_group_box ul').html(html);
		});
		 
		 
		 
		if(foodData.tmp_order){
			for(var i in foodData.tmp_order){
				if(foodData.tmp_order[i].spec){
					foodData.tmp_order[i].spec = foodData.tmp_order[i].spec.replace(/,/g,' ');
					foodData.tmp_order[i].spec = foodData.tmp_order[i].spec.replace(/;/g,' ');
				}
				cartFunction({productKey:foodData.tmp_order[i].goods_id+'_'+foodData.tmp_order[i].spec_id+'_tmp_order'
				    ,productId:foodData.tmp_order[i].goods_id,productName:foodData.tmp_order[i].name
					,productUnit:foodData.tmp_order[i].unit
					,productPrice:foodData.tmp_order[i].price
					,productStock:'-1',productParam:[]
					,productPrintId:foodData.tmp_order[i].print_id
					,productLabel:foodData.tmp_order[i].spec
					,isTmpOrder:true,tmpOrderId:foodData.tmp_order[i].id,count:parseInt(foodData.tmp_order[i].num)},'plus');
			}
		}
		 
		
		if(foodData.order_detail){
		//console.log(foodData.order_detail);
			for(var i in foodData.order_detail){
				if(foodData.order_detail[i].spec){
					foodData.order_detail[i].spec = foodData.order_detail[i].spec.replace(/,/g,' ');
					foodData.order_detail[i].spec = foodData.order_detail[i].spec.replace(/;/g,' ');
				}
			 

					 
					//2022-8-30

					cartBuyFunction({productKey:foodData.order_detail[i].goods_id+'_'+foodData.order_detail[i].spec_id+'_'+foodData.order_detail[i].id+'_order_detail',productId:foodData.order_detail[i].goods_id,productName:foodData.order_detail[i].name,productUnit:foodData.order_detail[i].unit,productPrice:foodData.order_detail[i].price,productStock:'-1',productParam:[],productLabel:foodData.order_detail[i].spec,detail_id:foodData.order_detail[i].id,count:foodData.order_detail[i].num,is_must:foodData.order_detail[i].is_must
					,cwp_editnumflag:foodData.order_detail[i].cwp_editnumflag
					,print_id:foodData.order_detail[i].print_id
					,id:foodData.order_detail[i].id},'show');//增加打印机id,购物车id
					 
			}

			  console.log("餐饮点菜单-加载完毕");
			  var dish_deputy_screen_show_html= $(".food_buy_list").html();
			  //dish_deputy_screen_show
			  var dish_deputy_screen_show_a=parseInt(dish_deputy_screen_show);
			if(dish_deputy_screen_show_a==1){
			      console.log(dish_deputy_screen_show_html);

			  	if (typeof (CyberWin_JsStandardPlug) == "undefined") {
				   //不支持插件
				}else{
			    
				 CyberWin_JsStandardPlug.locStorage_setScreenData("cyberwin_application_union","deputy_screen","cyber_id = 1 ",dish_deputy_screen_show_html,"1");
				}
			 
			}

			  default_alone_dish_screen=default_alone_dish_screen+"";
			  dish_deputy_screen_show_html=default_alone_dish_screen;//"餐饮点菜单-加载完毕";
			 // alert("餐饮点菜单-加载完毕");
			 if (typeof (CyberWin_JsStandardPlug) == "undefined") {
				      //不支持插件
				}else{
			          CyberWin_JsStandardPlug.locStorage_setScreenData("cyberwin_application_union","deputy_screen","cyber_id = 1 ",dish_deputy_screen_show_html,"1");
               }


			$('#buyBox').show();
			$('#cartBox').hide();
		}
		
		
		//取消动画 2023-1-31 layer.close(tipIndex);
	});
	*/
	
	$('.food_buy_list li .plus').live('click',function(){
		cartBuyFunction(productBuyCart[$(this).closest('li').data('key')],'plus');
	});
	$('.food_buy_list li .min').live('click',function(){
		cartBuyFunction(productBuyCart[$(this).closest('li').data('key')],'min');
	});
	//直接修改数量修改
	$('.food_buy_list li .number input').live('blur',function(){
		cartBuyFunction(productBuyCart[$(this).closest('li').data('key')],'change');
	});
	
	$('.food_cart_list li .plus').live('click',function(){
		//cartFunction(productCart[$(this).closest('li').data('key')],'plus');
		//2020-11-22 购物车
		cartFunction(productCart[$(this).closest('li').data('key')],'plusvcart');
	});
	$('.food_cart_list li .min').live('click',function(){
		cartFunction(productCart[$(this).closest('li').data('key')],'min');
	});
	$('.food_cart_list li .number input').live('blur',function(){
		cartFunction(productCart[$(this).closest('li').data('key')],'change');
	});
	$('.food_spec_box .spec_content li').live('click',function(){
		$(this).addClass('active').siblings('li').removeClass('active');
		changeSpec();
	});

	/*

	$('.food_spec_box .spec_content li').live('click',function(){
		$(this).addClass('active').siblings('li').removeClass('active');
		changeSpec();
	});
	*/


	$('.food_cart_list li .cwpd_amendname').live('blur',function(){
		cartFunction(productCart[$(this).closest('li').data('key')],'cwpd_amendname');
	});




	$('.food_spec_box .properties_content li').live('click',function(){
		var maxSize = $(this).closest('.row').data('num');
		if(maxSize == 1){
			$(this).addClass('active').siblings('li').removeClass('active');
		}else if(!$(this).hasClass('active')){
			var tmpActiveSize = $(this).closest('ul').find('.active').size();
			if(tmpActiveSize >= maxSize){
				alert($(this).closest('.row').data('label_name')+' 您最多能选择 '+maxSize+' 个');
			}else{
				$(this).addClass('active');
			}
		}else{
			$(this).removeClass('active');
		}
	});
	
	$('.food_spec_box .spec_btn').live('click',function(){
		var tmpKey = [];
		tmpKey.push(nowSpecFood.goods_id);
		var tmpParam = [];
		if(nowSpecFood.spec_list){
			$.each($('.food_spec_box .spec_content ul'),function(i,item){
				tmpKey.push($(item).find('li.active').data('spec_list_id'));
				tmpParam.push({'type':'spec','spec_id':$(item).find('li.active').data('spec_id'),'id':$(item).find('li.active').data('spec_list_id'),'name':$(item).find('li.active').html()});
			});
		}
		if(nowSpecFood.properties_list){
			$.each($('.food_spec_box .properties_content ul'),function(i,item){
				var tmpProductProperties = [];
				$.each($(item).find('.active'),function(j,jtem){	
					tmpKey.push($(jtem).data('label_id'));
					tmpProductProperties.push({'id':$(jtem).data('label_id'),'list_id':$(jtem).data('label_list_id'),'name':$(jtem).html()});
				});
				tmpParam.push({'type':'properties','data':tmpProductProperties});
			});
		}
		// console.log(tmpKey);
		//cartFunction({productKey:tmpKey.join('_'),productId:nowSpecFood.goods_id,productName:nowSpecFood.name,productUnit:nowSpecFood.unit,productPrice:$('#specPrice').html(),productStock:$('#specStock').html(),productParam:tmpParam},'plus');
        //2020-1-27 加入打印机
		console.log("打印机:"+nowSpecFood.print_id);
		cartFunction({productKey:tmpKey.join('_'),productId:nowSpecFood.goods_id
			,productName:nowSpecFood.name
			,productUnit:nowSpecFood.unit
			,productPrintId:nowSpecFood.print_id

			,productPrice:$('#specPrice').html()
			,productStock:$('#specStock').html()
			,productParam:tmpParam},'plus');


			//关闭 菜品规格
			//2020-2-6 修订版
			layer.closeAll();

	});
	
	$('.food_spec_box .spec_title .close_spec').live('click',function(){
		layer.closeAll();
	});
	
	$('#use_group').click(function(){
		if($.trim($('.food_cart_list ul').html()) != ''){
			alert('请先清空购物车才能使用套餐功能');
			return false;
		}
		$('.food_group_box .checkRadio').removeClass('checked');
		$('.food_group_box .checkRadio').eq(0).addClass('checked');
		
		layer.open({
			type: 1,
			title: '选择套餐',
			shadeClose: true,
			shade: 0.6,
			area: ['400px','380px'],
			content: $('.food_group_box'),
			btn: ['确定'],
			yes:function(){
				//console.log 选中ID
				var group_id = $('.food_group_box .checkRadio.checked').data('group_id');
				var group_goods_id = $('.food_group_box .checkRadio.checked').data('group_goods_id');
				var closestLi = $('.food_group_box .checkRadio.checked').closest('li');
				var tipGroupDetailIndex = layer.load(0, {shade: [0.6,'#fff']});

				console.log("选择套餐:"+group_id+"关啦in菜品"+group_goods_id);

				$.getJSON(getFoodGroupDetailUrl,{group_id:group_id},function(result){
					layer.close(tipGroupDetailIndex);

					//console.log(result);

					var groupDetail = {};
					groupDetail.group_id = group_id;
					groupDetail.detail = result;
					laytpl($('#foodGroupDetailTpl').html()).render(groupDetail.detail, function(html){
						closestLi.find('.group_info_box').html(html);
					});
					console.log(result);
					console.log("选择套餐成功");
					console.log(groupDetail);
					console.log("选择套餐成功明细");
					console.log(groupDetail.detail);
					layer.open({
						type: 1,
						title: closestLi.find('.textInfo .name').html(),
						shadeClose: true,
						shade: 0.6,
						area: ['480px','380px'],
						content: '<div class="layer_group_info_box">'+closestLi.find('.group_info_box').html()+'</div>',
						btn: ['确定'],
						success:function(){
							$.each($('.layer_group_info_box .group_info'),function(i,item){
								if($(item).data('selectnum') == 1){
									$(item).find('.right').eq(0).addClass('checked');
								}
							});
						},
						yes:function(){
							var noSelect = false;
							$('.layer_group_info_box .left').css('color','black');
							$.each($('.layer_group_info_box .group_info'),function(i,item){
								if($(item).data('selectnum') > 1){
									if($('.group_info_row_'+$(this).data('group_id')+'.checked').size() != $(this).data('selectnum')){
										$(item).find('.left').css('color','red');
										layer.msg('您有菜品未进行选择',{icon:2});
										noSelect = true;
										return false;
									}
								}
							});
							if(noSelect == true){
								return false;
							}
							//先把套餐加入购物车呀，其他价格变成0
							//console.log($('.food_'+$(item).data('row_id')));
							$('.food_'+group_goods_id).trigger('click');//完美
							dish_handle_add_goods_package=true;//套餐开始



							$.each($('.layer_group_info_box .right.checked'),function(i,item){
								//顺序$('.food_'+$(item).data('row_id')).trigger('click');
								//
								console.log("添加套餐明细");
								var food_package_num_cache_one_name="packagenum_"+$(item).data('row_id');
								food_package_num_cache[food_package_num_cache_one_name]=$(item).data('goods_package_num');
								console.log($('.food_'+$(item).data('row_id')));
								$('.food_'+$(item).data('row_id')).trigger('click');
							});
							dish_handle_add_goods_package=false;//套餐结束
							food_package_num_cache ={};//套餐结束还原套餐缓存
							nowGroupId = group_id;
							$('.checkCart').trigger('click');
							// layer.closeAll();
							layer.closeAll();//关闭套餐选择
						}
					});
				});
				
				return false;
			}
		});
	});
	$('.food_group_box li').live('click',function(){
		$('.food_group_box .checkRadio').removeClass('checked');
		$(this).find('.checkRadio').addClass('checked');
	});
	
	$('.layer_group_info_box .right').live('click',function(){
		var tmp_group_row = $('.group_info_'+($(this).data('group_row_id')));
		if(!$(this).hasClass('checked')){
			if(tmp_group_row.data('selectnum') == '1'){
				$('.group_info_row_'+$(this).data('group_row_id')+'.checked').removeClass('checked');		
			}else{
				if($('.group_info_row_'+$(this).data('group_row_id')+'.checked').size() == tmp_group_row.data('selectnum')){
					layer.msg('您只能选择'+tmp_group_row.data('selectnum')+'项',{icon:0});
					return false;
				}
			}
			$(this).addClass('checked');
		}else{
			if(tmp_group_row.data('maxnum') == '1'){
				layer.msg('此为必选，不可取消',{icon:2});
			}else if(tmp_group_row.data('selectnum') == '1'){
				return false;
			}else{
				$(this).removeClass('checked');
			}
		}
	});
	
	$('.checkCart').live('click',function(){
		var checkCartTip = layer.confirm('您确认要提交吗？', {
			title:'确认提醒：',
			btn: ['确认','取消']
		}, function(){
			var tip_index = layer.load(0, {shade: [0.5,'#fff']});
			var tmpCart = [];
			for(var i in productCart){
				tmpCart.push(productCart[i]);
			}
			$.post(foodshopSaveOrder,{cart:tmpCart,order_id:$('#order_id').val(),package_id:nowGroupId},function(result){
				if(result.status == 1){
					//取消提醒
					//2019-8-7
					//alert(result.info);
					//
					//打印厨房单子
						$.post(cyberwin_foodshopPrintOrder_pssmenu,function(result){
								//layer.close(index);
								//layer.close(tip_index);

								var cyber_printer='<?xml version="1.0"?><root><print_type>厨打单</print_type>';
								cyber_printer=cyber_printer+'<shopname>'+result.shopname+'</shopname><order_no>单号：P17021500003</order_no>';
								cyber_printer=cyber_printer+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
								cyber_printer=cyber_printer+'<today_orderid_store>'+result.today_orderid_store+'</today_orderid_store>';
								cyber_printer=cyber_printer+'<order_detail>'+result.info+'</order_detail></root>';

								//console.log(result);

								//console.log(cyber_printer);

								//alert(cyber_printer);

								CyberWin_JsStandardPlug.printWithPrinter("后厨","cyber_wlzc_o2o_kitchen",cyber_printer);

								//console.log(result);
								//alert(result.info);
						});
					location.reload();
				}else{
					layer.close(tip_index);
					layer.close(checkCartTip);
					alert(result.info);
				}
			});
		},function(){
			nowGroupId = 0;
		});
	});


	//桌面版餐饮
	$('.cwpd_checkCart_dishDesktop').live('click',function(){

		/*
		var checkCartTip = layer.confirm('您确认要提交吗？', {
			title:'确认提醒：',
			btn: ['确认','取消']
		}, function(){

				*/

			var tip_index = layer.load(0, {shade: [0.5,'#fff']});
			var tmpCart = [];
			for(var i in productCart){
				tmpCart.push(productCart[i]);
			}
			console.log("提交订单2");
			console.log(productCart);
			console.log("提交订单ok2");

			console.log("提交订单");
			console.log(tmpCart);
			console.log("提交订单ok");
			$.post(foodshopSaveOrder,{cart:tmpCart,order_id:$('#order_id').val(),package_id:nowGroupId},function(result){
				if(result.status == 1){
					//取消提醒
					//2019-8-7
					//alert(result.info);
					//
					//打印厨房单子
					//alert("11");
					//本地买单打印对账单
					//cwpd_cuscheckbill_printer();

					 if(dish_print_kitchen_no==1){

						 //禁止厨打

						 location.reload();
						 return;

					 }
					 //alert("订单等待打印");
						$.post(cyberwin_foodshopPrintOrder_pssmenu,function(result){
								//layer.close(index);
								//layer.close(tip_index);

								//alert("取消打印了，下次再见");

								if(result.status==4){
								   location.reload();
								   return;

								}

								if(result.dish_printer_version=="v4"){
								  // location.reload();
								 // alert("取消打印了，下次再见");
								//   return;

								}




								var cyber_printer='<?xml version="1.0"?><root><print_type>厨打单</print_type>';
								cyber_printer=cyber_printer+'<shopname>'+result.shopname+'</shopname><order_no>单号：P17021500003</order_no>';
								cyber_printer=cyber_printer+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
								cyber_printer=cyber_printer+'<today_orderid_store>'+result.today_orderid_store+'</today_orderid_store>';
								cyber_printer=cyber_printer+'<order_detail>'+result.info+'</order_detail></root>';

								//console.log(result);

								//console.log(cyber_printer);

								//alert(cyber_printer);

							

								if(printversion==="sortprint"){

									//console.log("厨打V2sortprint");
									var printsort_group=result.printsort_group;
									printsort_group_str=JSON.stringify(printsort_group);
									//console.log(printsort_group);
								  // var printsort_group_obj=eval("("+printsort_group_str+")");//转换为json对象 
								//$.parseJSON(printsort_group);

								console.log("厨打V2sortprint--2021-");

								console.log(printsort_group);

								if(current_store_id=="72"){
								    console.log("未来之窗一菜一单转换专用测试，现场测试");
									console.log(printsort_group);
									//alert("11");

								   // return;
								}


								
								


								
								//	console.log(printsort_group_obj);
										//console.log("厨打V2sortprint---");
									//	var i_printer=0;

										for(var ever in printsort_group) {
                                         // length++;
										  console.log("厨打V2sortprint-分单");
										  console.log("打印参数="+ever);
										 // console.log( printsort_group[ever]);
										  var  sort_print_page=printsort_group[ever];
										  // CyberWin_JsStandardPlug.printWithPrinter("后厨打印","cyber_wlzc_o2o_kitchen",cyber_printer);

										  //匹配打印机
										  var kitchenprinter_config_page=findOrderPrinterByPrinterID(sort_print_page.print_id);

										  var cyber_printer_page='<?xml version="1.0"?><root><print_type>厨打单</print_type>';
											cyber_printer_page=cyber_printer_page+'<shopname>'+result.shopname+'</shopname><order_no>单号：P17021500003</order_no>';
											cyber_printer_page=cyber_printer_page+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
											cyber_printer_page=cyber_printer_page+'<today_orderid_store>'+result.today_orderid_store+'</today_orderid_store>';
											cyber_printer_page=cyber_printer_page+'<order_detail>'+sort_print_page.printerdata+'</order_detail></root>';

											
											if (typeof (kitchenprinter_config_page) == "undefined") {
											  kitchenprinter_config_page = new PrinterConfig("后厨打印","后厨打印","driver");
											}

											
											if ('address' in kitchenprinter_config_page) {
                                               
											}else{
										      	console.log("如果查询不到采用后厨打印：");
											 //2021-1-16 如果查询不到采用后厨打印
												//驱动打印
												kitchenprinter_config_page = new PrinterConfig("后厨打印","后厨打印","driver");
											}

											console.log("地址："+ kitchenprinter_config_page.address+",类型："+kitchenprinter_config_page.device_type);
											// console.log("打印内容="+cyber_printer_page);

											 if(current_store_id=="72"){
												console.log("未来之窗一菜一单转换专用测试，现场测试2");
												console.log(sort_print_page);
												//alert("11");
												var dishmenuall=sort_print_page.dishmenuall;
												for(var i_dishmenuall in dishmenuall){
												
												console.log("一桌一单:"+sort_print_page.printerdata);
												   var order_detail_ycyd=" 名称   数量 \n***************";
												   order_detail_ycyd=order_detail_ycyd+"\n"+dishmenuall[i_dishmenuall];
												   order_detail_ycyd=order_detail_ycyd+"\n***************";

												   console.log("一菜一单:"+order_detail_ycyd);
												}

													console.log("未来之窗一菜一单转换专用测试，现场测试2222222222222222222");

											   // return;
											}
											var dish_Kitchen_printmod="ycyd";
											if(dish_Kitchen_printmod=="ycyd"){
											  //一菜一单

											    var dishmenuall=sort_print_page.dishmenuall;
												for(var i_dishmenuall in dishmenuall){
												   var order_detail_ycyd=" 名称   数量 \n***************";
												   order_detail_ycyd=order_detail_ycyd+"\n"+dishmenuall[i_dishmenuall];
												   order_detail_ycyd=order_detail_ycyd+"\n***************";

												   console.log("一菜一单2:"+order_detail_ycyd);
												    
													 var cyber_printer_page_ycyd='<?xml version="1.0"?><root><print_type>厨打单</print_type>';
													cyber_printer_page_ycyd=cyber_printer_page_ycyd+'<shopname>'+result.shopname+'</shopname><order_no>单号：P17021500003</order_no>';
													cyber_printer_page_ycyd=cyber_printer_page_ycyd+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
													cyber_printer_page_ycyd=cyber_printer_page_ycyd+'<today_orderid_store>'+result.today_orderid_store+'</today_orderid_store>';
													cyber_printer_page_ycyd=cyber_printer_page_ycyd+'<order_detail>'+order_detail_ycyd+'</order_detail></root>';
													 
													 
													 //(printername,orderid,tablename,printdata)
													 CyberWinDishPrintLog(kitchenprinter_config_page.address,i_dishmenuall+"_"+result.order_no,result.table_name,cyber_printer_page_ycyd);

													 CyberWin_JsStandardPlug.cyber_print("kitchen",cyber_printer_page_ycyd,kitchenprinter_config_page.address,kitchenprinter_config_page.device_type);

												}
												//厨打总氮
												var cyber_printer_page='<?xml version="1.0"?><root><print_type>厨打单总单</print_type>';
											cyber_printer_page=cyber_printer_page+'<shopname>'+result.shopname+'</shopname><order_no>'+kitchenprinter_config_page.address+'</order_no>';
											cyber_printer_page=cyber_printer_page+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
											cyber_printer_page=cyber_printer_page+'<today_orderid_store>'+result.today_orderid_store+'</today_orderid_store>';
											cyber_printer_page=cyber_printer_page+'<order_detail>'+sort_print_page.printerdata+'</order_detail></root>';

												CyberWin_JsStandardPlug.cyber_print("kitchen_list58",cyber_printer_page,kitchenprinter_config_page.address,kitchenprinter_config_page.device_type);

											}else{
										    	//一桌子一单
												//2021-1=18 临时加代码
											    CyberWin_JsStandardPlug.cyber_print("kitchen",cyber_printer_page,kitchenprinter_config_page.address,kitchenprinter_config_page.device_type);

											}



									  	   // CyberWin_JsStandardPlug.cyber_print("kitchen",cyber_printer_page,kitchenprinter_config_page.address,kitchenprinter_config_page.device_type);

										}
										//return;

										if(current_store_id=="72"){
								           console.log("未来之窗一菜一单转换专用测试，现场测试3");
									     
									       // alert("11ok");

								            // return;
								         }

									 


								}else{

								   CyberWin_JsStandardPlug.printWithPrinter("后厨打印","cyber_wlzc_o2o_kitchen",cyber_printer);
								}



								  location.reload();

								//console.log(result);
								//alert(result.info);
						},'json');
					
				}else{
					layer.close(tip_index);
					//2019-10-16 
					//layer.close(checkCartTip);
					alert(result.info);
				}
			});

			/*
		},function(){
			nowGroupId = 0;
		});

		*/
	});


	$('#cwpd_dishdesktop_pay_order').click(function(){
		/*
		var pay_order_tip = layer.confirm('<font color="red">确认进行结算？</span>', {
			title:'确认提醒：',
			btn: ['确认','取消']
		}, function(index){
				*/
			layer.open({
				type: 2,
				title: '创建到店付订单',
				shadeClose: true,
				shade: 0.6,
				area: ['800px','580px'],
				content: foodshopPayOrder
			});
			layer.close(pay_order_tip);
		//});
	});
 

$('#cwpd_dishdesktop_pay_order_2020').click(function(){
 // alert("cwpd_dishdesktop_pay_order_2020");
/* 2023-2-18
		 
			layer.open({
				type: 2,
				title: '结算',
				shadeClose: true,
				shade: 0.6,
				area: ['94%','500px'],
				content: foodshopPayOrder_v2020
			});
			layer.close(pay_order_tip);
			*/
			//file:///D:/cyberwein/CyberWinBrowser/CyberWinPHP/CyberPHP_Application/CyberWin_AppLocal/CyberTrade_ecogen_FoodShop_DishAndKTV/wlzc_runtime/dialog/cyberwin_middle_5pyq5p2l5LmL56qX5piv5Liq5aWH6JGp.html?param_name=intent_ktv_dish_foodorder&tpl_name=store_arrival_order_2021_dac


			 var intentp ={store_id:current_store_id,current_order_idV2023:current_order_idV2023
			   ,printversion:printversion,dish_print_kitchen_no_l:0,current_table_name:current_table_name
			   ,current_table_id:current_table_id,current_today_orderid_store:"0"
			   ,current_store_name:current_store_name,current_store_id:current_store_id
				,cyberwin_server_root:"https://51.onelink.ynwlzc.cn"
				 ,API_foodshopPayOrder_v2023:"/o2o/store.php?g=Merchant&c=Store&a=ajax_dish_store_arrival_order_2021AndAutoCreateOrder&business_type=foodshop&business_id="
			    ,cyberwin_device_screen_height:cyberwin_device_screen_height
				,current_order_id:"未来之窗"
				//2023-9-15
				,current_APIROOT:current_APIROOT
				,未来之窗_session:未来之窗_session
				,未来之窗_clientsn:未来之窗_clientsn
				   };

			   window.localStorage.setItem("intent_dish_store_arrival_order", JSON.stringify(intentp));


		//	var 未来之窗中间件 = "https://51.onelink.ynwlzc.cn/o2o/client/cashier_local/cyberwin_middle_5pyq5p2l5LmL56qX5piv5Liq5aWH6JGp.html?param_name=intent_dish_store_arrival_order&tpl_name=store_arrival_order_2021";
         //2023-9-15
		   var 未来之窗中间件 = parent.未来之窗_中间件_Package_CreateURL("intent_dish_store_arrival_order",intentp,"store_arrival_order_2021_dac");
             未来之窗中间件 = 未来之窗中间件.replace("./wlzc_runtime/dialog/", "");
             //window.prompt('你觉得很幸运吗？',未来之窗中间件); 
			   window.location.href=未来之窗中间件;

		  
		  /*
			layer.open({
				type: 2,
				title: '结算',
				shadeClose: true,
				shade: 0.6,
				offset: '20px',
				area: ['94%','500px'],
				content: 未来之窗中间件
			});
				*/

		 
	});
	 


	//快餐
		$('.cwpd_checkCart_Bury_fastfoodmode').live('click',function(){

/*
		var checkCartTip = layer.confirm('您确认要提交吗？', {
			title:'确认提醒：',
			btn: ['确认','取消']
		}, function(){

				*/


			var tip_index = layer.load(0, {shade: [0.5,'#fff']});
			var tmpCart = [];
			for(var i in productCart){
				tmpCart.push(productCart[i]);
			}
			$.post(foodshopSaveOrder,{cart:tmpCart,order_id:$('#order_id').val(),package_id:nowGroupId},function(result){
				if(result.status == 1){
					//取消提醒
					//2019-8-7
					//alert(result.info);
					//
					//打印厨房单子

					/*
						$.post(cyberwin_foodshopPrintOrder_pssmenu,function(result){
								//layer.close(index);
								//layer.close(tip_index);

								var cyber_printer='<?xml version="1.0"?><root><print_type>厨打单</print_type>';
								cyber_printer=cyber_printer+'<shopname>'+result.shopname+'</shopname><order_no>单号：P17021500003</order_no>';
								cyber_printer=cyber_printer+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
								cyber_printer=cyber_printer+'<order_detail>'+result.info+'</order_detail></root>';

								//console.log(result);

								//console.log(cyber_printer);

								//alert(cyber_printer);

								CyberWin_JsStandardPlug.printWithPrinter("Foxit Reader PDF Printer","cyber_wlzc_o2o_kitchen",cyber_printer);

								 
						});

						*/ 
                       //2019-11-29 厨打判定
            
						if(is_kitchenprint==1){

								$.post(cyberwin_foodshopPrintOrder_pssmenu,function(result){
									//layer.close(index);
									//layer.close(tip_index);

									var cyber_printer='<?xml version="1.0"?><root><print_type>厨打单</print_type>';
									cyber_printer=cyber_printer+'<shopname>'+result.shopname+'</shopname><order_id>'+result.order_id+'</order_id><orderid>'+result.order_no+'</orderid><order_no>单号：P17021500003</order_no>';
									cyber_printer=cyber_printer+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
									cyber_printer=cyber_printer+'<order_detail>'+result.info+'</order_detail>';
									cyber_printer=cyber_printer+'<today_orderid_store>'+result.today_orderid_store+'</today_orderid_store>';
									cyber_printer=cyber_printer+'<order_detail_android>'+result.order_detail_android+'</order_detail_android></root>';

									//console.log(result);

									//console.log(cyber_printer);

								//	alert(cyber_printer);
									//kitchenprinter_config
								//	alert(kitchenprinter_config.address);
								

									// CyberWin_JsStandardPlug.cyber_print("","test",kitchenprinter_config.address,kitchenprinter_config.device_type);
									// 	alert(kitchenprinter_config.device_type);

									CyberWin_JsStandardPlug.cyber_print("kitchen",cyber_printer,kitchenprinter_config.address,kitchenprinter_config.device_type);

									//CyberWin_JsStandardPlug.printWithPrinter("Foxit Reader PDF Printer","cyber_wlzc_o2o_kitchen",cyber_printer);

									 
							});

						}


//alert("厨打");
						//alert(is_kitchenprint);
						//return;

						//结算
							$.post(cyberwin_fastfoodmodePayOrder,function(result_fp){
									if(result_fp.status == 1){
										parent.layer.open({
										  type: 2,
										  title: '支付订单',
										  shadeClose: false,
										  shade: 0.6,
										  area: ['820px', '610px'],
										  content: "/o2o/store.php?g=Merchant&c=Store&a=store_arrival_order&order_id="+result_fp.info
										});
									}else{
										alert(result_fp.info);
									}
								});

					//location.reload();
				}else{
					layer.close(tip_index);
					//layer.close(checkCartTip);
					alert(result.info);
				}
			});
			/*
		},function(){
			nowGroupId = 0;
		});

		*/
	});

	//2019-12-08 快餐加人脸
		//快餐
		$('.cwpd_checkCart_Bury_fastfoodmode_facepay').live('click',function(){

/*
		var checkCartTip = layer.confirm('您确认要提交吗？', {
			title:'确认提醒：',
			btn: ['确认','取消']
		}, function(){

				*/


			var tip_index = layer.load(0, {shade: [0.5,'#fff']});
			var tmpCart = [];
			for(var i in productCart){
				tmpCart.push(productCart[i]);
			}
			$.post(foodshopSaveOrder,{cart:tmpCart,order_id:$('#order_id').val(),package_id:nowGroupId},function(result){
				if(result.status == 1){
					//取消提醒
					//2019-8-7
					//alert(result.info);
					//
					//打印厨房单子

						 
									 // var data_ss =  "<?xml version=\"1.0\"?><root><print_type>厨打</print_type><shopname>未来之窗店</shopname><order_id>来自服务器</order_id><orderid>rrrrrrrr</orderid><order_no>单号：P17021500003</order_no><bill_time>2016-04-26 02:30:49</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><order_detail>"+"中碗米线    5    8.0     40.0 \n花生   6\n南瓜饼</order_detail></root>";
//
//										   Cyber_JsPrinterStandard.print_byprintername("",data_ss,"");
//										   alert(kitchenprinter_config.device_type);
//										   	CyberWin_JsStandardPlug.cyber_print("kitchen",data_ss,kitchenprinter_config.address,kitchenprinter_config.device_type);


				 
                       //2019-11-29 厨打判定
					   //alert(is_kitchenprint);

					  // is_kitchenprint=1;
            
						if(is_kitchenprint==1){

								$.post(cyberwin_foodshopPrintOrder_pssmenu,function(result){
									//layer.close(index);
									//layer.close(tip_index);

									var cyber_printer='<?xml version="1.0"?><root><print_type>厨打单</print_type>';
									cyber_printer=cyber_printer+'<shopname>'+result.shopname+'</shopname><order_id>'+result.order_id+'</order_id><orderid>'+result.order_no+'</orderid><order_no>单号：P17021500003</order_no>';
									cyber_printer=cyber_printer+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
									cyber_printer=cyber_printer+'<today_orderid_store>'+result.info+'</today_orderid_store>';
									cyber_printer=cyber_printer+'<order_detail>'+result.info+'</order_detail><order_detail_android>'+result.order_detail_android+'</order_detail_android></root>';

								 

									// CyberWin_JsStandardPlug.cyber_print("","test",kitchenprinter_config.address,kitchenprinter_config.device_type);
									// 	alert(kitchenprinter_config.device_type);

									CyberWin_JsStandardPlug.cyber_print("kitchen",cyber_printer,kitchenprinter_config.address,kitchenprinter_config.device_type);

									//CyberWin_JsStandardPlug.printWithPrinter("Foxit Reader PDF Printer","cyber_wlzc_o2o_kitchen",cyber_printer);
									  var data_ss =  "<?xml version=\"1.0\"?><root><print_type>厨打</print_type><shopname>"+result.shopname+"</shopname><order_id>"+result.order_id+"</order_id><orderid>rrrrrrrr</orderid><order_no>单号：P17021500003</order_no><bill_time>2016-04-26 02:30:49</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><order_detail>"+result.order_detail_android+"</order_detail></root>";

										//   Cyber_JsPrinterStandard.print_byprintername("",data_ss,"");
										   //alert(kitchenprinter_config.device_type);
										   	//CyberWin_JsStandardPlug.cyber_print("kitchen",data_ss,kitchenprinter_config.address,kitchenprinter_config.device_type);


									 
							});

						}


//alert("厨打");
						//alert(is_kitchenprint);
						//return;

						//结算
						//人脸
							$.post(cyberwin_fastfoodmodePayOrder_face,function(result_fp){
									if(result_fp.status == 1){
										 
										   var current_order_id="store_"+result_fp.cwpd_order_sn;

							  var staff_name="{pigcms{$staff_session.name}";

							 var    cwpd_price_wxface=result_fp.cwpd_order_price;
									 cwpd_price_wxface=cwpd_price_wxface*100;

									// console.log(current_order_id);
									//  console.log(cwpd_price_wxface);


									//刷新 
							check_pay_time = setInterval(function(){
								

								console.log("019-12-11支付");

								var cwpd_order_sn_q=result_fp.cwpd_order_sn;

								$.post(face_arrival_check_snowlotus, {cwpd_order_sn:cwpd_order_sn_q , cwpd_ordertype:'store'}, function(result){
									if(result.status == 1){
										layer.msg('支付成功！');

 
								//$.post(cyberwin_foodshopPrintOrder_pssmenu,function(result){
									 
									var cyber_printer='<?xml version="1.0"?><root><print_type>厨打单</print_type>';
									cyber_printer=cyber_printer+'<shopname>'+result.shopname+'</shopname><order_id>'+result.order_id+'</order_id><orderid>'+result.order_no+'</orderid><order_no>单号：P17021500003</order_no>';
									cyber_printer=cyber_printer+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
									cyber_printer=cyber_printer+'<order_detail>'+result.face_printinfo+'</order_detail><order_detail_android>'+result.order_detail_android+'</order_detail_android>';
                                    cyber_printer=cyber_printer+'<print_header>'+result.print_header+'</print_header>';
									 cyber_printer=cyber_printer+'<print_body>'+result.print_body+'</print_body>';
									 cyber_printer=cyber_printer+'<today_orderid_store>'+result.today_orderid_store+'</today_orderid_store>';
									  cyber_printer=cyber_printer+'<print_footer>'+result.print_footer+'</print_footer>';
                                    cyber_printer=cyber_printer+'</root>';
//
//print_header print_body print_footer
								       Cyber_JsPrinterStandard.print_byprintername("dishfastfacepayorder",cyber_printer,"");

									 

									//CyberWin_JsStandardPlug.cyber_print("kitchen",cyber_printer,"1112>1212","usb");

									  var data_s=$("#printdata").val();
										  var data_ss =  "<?xml version=\"1.0\"?><root><print_type>结账单</print_type><shopname>未来之窗店</shopname><order_id>来自服务器</order_id><orderid>rrrrrrrr</orderid><order_no>单号：P17021500003</order_no><bill_time>2016-04-26 02:30:49</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><order_detail>"+data_s+"中碗米线    5    8.0     40.0 \n花生   6\n南瓜饼</order_detail></root>";

										 //  Cyber_JsPrinterStandard.print_byprintername("",data_ss,"");
							 

									 
							 //  });
							   


										//cyberwin_print_marketstatement(order_id,"pos","收银");

										clearInterval(check_pay_time);
										//shop_mall.pay_success_back();
										//$(".payment, .shadow_two, .shadow, .settlement").hide(); 
										//window.location.reload();
										window.location.href=cyber_reload_url;//
										//修改返回界面，保证多个页面，支付信息一致
										//'https://51.onelink.ynwlzc.cn/o2o/store.php?g=Merchant&c=Store&a=cyberwin_dish_fastfoodmode_frogs7';
									}else{
										//layer.msg('支付成功！');
										layer.msg(result.info);
									}
								},'json');
							},3000);
								   

									var p_new='<?xml version="1.0"?><cyberwinpay><paymethod>weixin_facepay</paymethod><config_platform>wlzc_o2o_merchant</config_platform><config_service>127.0.0.1</config_service><wlzc_client_merchant_platform>wlzc_o2o_merchant</wlzc_client_merchant_platform><wlzc_client_merchant_id>'+merchant_id+'</wlzc_client_merchant_id><wlzc_client_store_id>'+store_id+'</wlzc_client_store_id><wlzc_client_store_name>'+store_name+'</wlzc_client_store_name><wlzc_client_order_price>'+cwpd_price_wxface+'</wlzc_client_order_price><wlzc_client_out_trade_no>'+current_order_id+'</wlzc_client_out_trade_no><param1>1507462791|1510181421|'+cwpd_price_wxface+'|'+staff_name+'|wx6e4a5cef9bdab82c|wx1eb85e107e36a21d|'+current_order_id+'</param1></cyberwinpay>';
                                   layer.close(tip_index);




								  var r2=Cyber_JsPrinterStandard.payClient_Union(p_new);
								  layer.close(tip_index);
								  layer.close(checkCartTip);

								  //window.top.location.reload();



									}else{
										alert(result_fp.info);
									}
								});

					//location.reload();
				}else{
					layer.close(tip_index);
					//layer.close(checkCartTip);
					alert(result.info);
				}
			});
			/*
		},function(){
			nowGroupId = 0;
		});

		*/
	});


	//2019-12-21 不支付只打印
		$('.cwpd_checkCart_Bury_fastfoodmode_printonly').live('click',function(){




			//var tip_index = layer.load(0, {shade: [0.5,'#fff']});
			var tmpCart = [];
			for(var i in productCart){
				tmpCart.push(productCart[i]);
			}

			$.post(foodshopSaveOrder,{cart:tmpCart,order_id:$('#order_id').val(),package_id:nowGroupId},function(result){
				if(result.status == 1){
					//取消提醒
					//2019-8-7
					//alert(result.info);
					//
					//打印厨房单子

						 
			

						


						//结算
						//人脸
							$.post(cyberwin_fastfoodmodePayOrder_face,function(result_fp){
									if(result_fp.status == 1){
										 
										   var current_order_id="store_"+result_fp.cwpd_order_sn;

							  var staff_name="11";

							 var    cwpd_price_wxface=result_fp.cwpd_order_price;
									 cwpd_price_wxface=cwpd_price_wxface*100;



								//	  layer.close(tip_index);
								  //layer.close(checkCartTip);





									//刷新 
							//check_pay_time = setInterval(function(){
								

								console.log("019-12-11支付");

								var cwpd_order_sn_q=result_fp.cwpd_order_sn;

							//	$.post(face_arrival_check_snowlotus, {cwpd_order_sn:cwpd_order_sn_q , cwpd_ordertype:'store'}, function(result){
							//		if(result.status == 1){
								//		layer.msg('支付成功！');

 
								
	 
									var cyber_printer='<?xml version="1.0"?><root><print_type>厨打单</print_type>';
									cyber_printer=cyber_printer+'<shopname>'+result_fp.shopname+'</shopname><order_id>'+result_fp.order_id+'</order_id><orderid>'+result_fp.order_no+'</orderid><order_no>单号：P17021500003</order_no>';
									cyber_printer=cyber_printer+'<bill_time>'+result_fp.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result_fp.table_name+'</table_name>';
									cyber_printer=cyber_printer+'<order_detail>'+result_fp.face_printinfo+'</order_detail><order_detail_android>'+result_fp.order_detail_android+'</order_detail_android>';
                                    cyber_printer=cyber_printer+'<print_header>'+result_fp.print_header+'</print_header>';
									 cyber_printer=cyber_printer+'<print_body>'+result_fp.print_body+'</print_body>';
									  cyber_printer=cyber_printer+'<print_footer>'+result_fp.print_footer+'</print_footer>';
                                    cyber_printer=cyber_printer+'</root>';
//
//print_header print_body print_footer
								       Cyber_JsPrinterStandard.print_byprintername("dishfastfacepayorder",cyber_printer,"");

									 

								



										//clearInterval(check_pay_time);

										window.location.href=cyber_reload_url;//

								//	}else{
										//layer.msg('支付成功！');
								//		layer.msg(result.info);
								//	}
								//},'json');
							//},3000);
								   
								   /*

									var p_new='<?xml version="1.0"?><cyberwinpay><paymethod>weixin_facepay</paymethod><config_platform>wlzc_o2o_merchant</config_platform><config_service>127.0.0.1</config_service><wlzc_client_merchant_platform>wlzc_o2o_merchant</wlzc_client_merchant_platform><wlzc_client_merchant_id>'+merchant_id+'</wlzc_client_merchant_id><wlzc_client_store_id>'+store_id+'</wlzc_client_store_id><wlzc_client_store_name>'+store_name+'</wlzc_client_store_name><wlzc_client_order_price>'+cwpd_price_wxface+'</wlzc_client_order_price><wlzc_client_out_trade_no>'+current_order_id+'</wlzc_client_out_trade_no><param1>1507462791|1510181421|'+cwpd_price_wxface+'|'+staff_name+'|wx6e4a5cef9bdab82c|wx1eb85e107e36a21d|'+current_order_id+'</param1></cyberwinpay>';
                                   layer.close(tip_index);




								  var r2=Cyber_JsPrinterStandard.payClient_Union(p_new);
								  */
								 // layer.close(tip_index);
								  //layer.close(checkCartTip);

								  //window.top.location.reload();



									}else{
										//alert(result_fp.info);
									}
								});

					//location.reload();
				}else{
					layer.close(tip_index);

					alert(result.info);
				}
			});

	});




	$('#edit_order').click(function(){
		layer.open({
			type: 2,
			title: '编辑订单',
			shadeClose: true,
			shade: 0.6,
			area: ['420px','450px'],
			content: foodshopEditOrder
		});
	});
	$('.changeCart').click(function(){
		$('#buyBox').show();
		$('#cartBox').hide();
	});
	$('.changeBuy').click(function(){
		$('#cartBox').show();
		$('#buyBox').hide();
	});
	$('#print_order').click(function(){
		layer.confirm('打印订单，只会打印订单中的已点菜品！而且只会使用主打印机进行打印，一般适用于用户买单确定。<br/><font color="red">确认打印？</span>', {
			title:'确认提醒：',
			btn: ['确认','取消']
		}, function(index){
			var tip_index = layer.load(0, {shade: [0.5,'#fff']});
			var tmpCart = [];
			for(var i in productCart){
				tmpCart.push(productCart[i]);
			}
			$.post(foodshopPrintOrder,function(result){
				layer.close(index);
				layer.close(tip_index);
				alert(result.info);
			});
		});
	});

	//2017-9-9
	$('#cyberwin_print_order').click(function(){

		/*
		layer.confirm('打印订单<br/><font color="red">确认打印？</span>', {
			title:'确认提醒：',
			btn: ['确认','取消']
		}, function(index){

				*/
			var tip_index = layer.load(0, {shade: [0.5,'#fff']});
			var tmpCart = [];
			for(var i in productCart){
				tmpCart.push(productCart[i]);
			}

			//layer.close(index);
			//	layer.close(tip_index);

			//alert("11111111111111111");
			 
			var isSupport=true;//CyberWin_JsStandardPlug.isSupport();
			if(isSupport==false){
				alert("浏览器不支持未来之窗打印");
				//return;
			}else{
				//alert("OK");
			}
			 
			// alert(cyberwin_foodshopPrintOrder);

			/**/


			/*
			$.post(cyberwin_foodshopPrintOrder,function(result){
				//layer.close(index);
				layer.close(tip_index);

				var cyber_printer='<?xml version="1.0"?><root><print_type>结账单</print_type>';
				cyber_printer=cyber_printer+'<shopname>'+result.shopname+'</shopname><order_no>单号：P17021500003</order_no>';
				cyber_printer=cyber_printer+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id>';
				cyber_printer=cyber_printer+'<order_detail>'+result.info+'</order_detail></root>';

				//console.log(result);

				//console.log(cyber_printer);

				//alert(cyber_printer);

	            CyberWin_JsStandardPlug.print("cyber_wlzc_o2o_pos",cyber_printer);

				//console.log(result);
				//alert(result.info);
			});
			*/


			

			cyberwin_print_snowlotusv818(cyberwin_foodshopPrintOrder,{cwpd_tmp:111},'cyber_wlzc_o2o_pos',"收银");

			//*/
		/*});*/
	});

	//传菜单
	//2019-8-6
	$('#cyberwin_print_order_pssmenu').click(function(){

		/*取消确认
		layer.confirm('打印订单<br/><font color="red">确认打印？</span>', {
			title:'确认提醒：',
			btn: ['确认','取消']
		}, function(index){
				*/
			var tip_index = layer.load(0, {shade: [0.5,'#fff']});
			var tmpCart = [];
			for(var i in productCart){
				tmpCart.push(productCart[i]);
			}

			//layer.close(index);
			//	layer.close(tip_index);

			//alert("11111111111111111");
			 
			var isSupport=CyberWin_JsStandardPlug.isSupport();
			if(isSupport==false){
				alert("浏览器不支持未来之窗打印");
				return;
			}else{
				//alert("OK");
			}

			
			 
			 
			$.post(cyberwin_foodshopPrintOrder_pssmenu,function(result){
				//layer.close(index);
				layer.close(tip_index);

				var cyber_printer='<?xml version="1.0"?><root><print_type>厨打单</print_type>';
				cyber_printer=cyber_printer+'<shopname>'+result.shopname+'</shopname><order_no>单号：P17021500003</order_no>';
				cyber_printer=cyber_printer+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
				cyber_printer=cyber_printer+'<today_orderid_store>'+result.today_orderid_store+'</today_orderid_store>';
				cyber_printer=cyber_printer+'<order_detail>'+result.info+'</order_detail></root>';

				//console.log(result);

				//console.log(cyber_printer);

				//alert(cyber_printer);

	            CyberWin_JsStandardPlug.print("cyber_wlzc_o2o_kitchen",cyber_printer);

				//console.log(result);
				//alert(result.info);
			});
			//*/
		//取消确认});
	});








	$('#pay_order').click(function(){
		var pay_order_tip = layer.confirm('<font color="red">确认进行结算？</span>', {
			title:'确认提醒：',
			btn: ['确认','取消']
		}, function(index){
			layer.open({
				type: 2,
				title: '创建到店付订单',
				shadeClose: true,
				shade: 0.6,
				area: ['800px','580px'],
				content: foodshopPayOrder
			});
			layer.close(pay_order_tip);
		});
	});
}
//2023-7-26 分离});






///////////////////
//2021-1-20
//落单二合一
	//桌面版餐饮
	var click_one_alone_dish=false;
	$('.cwpd_checkCart_dishDesktop_andpassmenuv2021').live('click',function(){
	    if(click_one_alone_dish==true){
		       alert("落单中，请勿操作");
		        return ;
		}
		click_one_alone_dish=true;

		 

			var tip_index = layer.load(0, {shade: [0.5,'#fff']});
			var tmpCart = [];
			for(var i in productCart){
				tmpCart.push(productCart[i]);
			}
			console.clear();

			if(cwpd_debug==1){
					console.log("提交订单2");
					console.log(productCart);
					console.log("提交订单ok2");

					console.log("提交订单");
					console.log(tmpCart);
					console.log("提交订单ok");
			}

			var 未来之窗传输包={cart:tmpCart,order_id:$('#order_id').val(),package_id:nowGroupId};
			if( wlzc_data_transmode == "hybird"){
			     var 未来之窗_session = 未来之窗_设备_session_id();
				var 未来之窗_clientsn = 未来之窗_设备_SN();

				console.log("---2023-7-23 DA落单="+ 未来之窗_session);

				//cwpd_session_staff:未来之窗_session,client_uuid:未来之窗_clientsn
				未来之窗传输包={cart:tmpCart,order_id:$('#order_id').val(),package_id:nowGroupId,cwpd_session_staff:未来之窗_session,client_uuid:未来之窗_clientsn,printversion:printversion};

			}

			$.post(foodshopSaveOrderAndPrintPssmenu,未来之窗传输包,function(resultv2021){
		   	console.log("厨打返回==");
			  console.log(resultv2021);
			  console.log("厨打返回");
			//  return;

				//if(resultv2021.status == 1){
				if(resultv2021.status == 9){
					  window.top.getTableStatus_fun("我是你儿子，桌台点菜，关闭");

				    click_one_alone_dish=false;
					//取消提醒
					//2019-8-7
					//alert(resultv2021.info);
					//
					//打印厨房单子
					//alert("11");
					//本地买单打印对账单
					//cwpd_cuscheckbill_printer();
					

					 if(dish_print_kitchen_no==1){

						 //禁止厨打
						 layer.close(tip_index);
						  window.top.cyberwin_closedlg('cyberwin_hotel_id_store');

						// location.reload();
						 return;

					 }
                      //桌面餐饮打印
					 if(resultv2021.dish_printer_version=="v4"){

						        layer.close(tip_index);
								  // location.reload();
								// alert("取消打印了，下次再见"+resultv2021.print_sn);
								// alert("取消打印了，下次再见"+resultv2021.print_sn);
								 var urlprinter='//51.onelink.ynwlzc.cn/o2o/pos.php?g=Pos&c=Store_StaffPrinterPrintLog&a=print_one_order_v4&store_id='+current_store_id+'&printsn='+resultv2021.print_sn+'&print_type='+kitch_printer_type_text;

								 urlprinter='https://51.onelink.ynwlzc.cn/o2o/pos.php?g=Pos&c=Store_StaffPrinterPrintLog&a=print_one_order_v4&store_id='+current_store_id+'&printsn='+resultv2021.print_sn+'&print_type='+kitch_printer_type_text;

								// alert("取消打印了，下次再见"+urlprinter);

								// window.location.href=urlprinter;
								   var 未来之窗中间件='http://51.onelink.ynwlzc.cn/o2o/pos.php?g=Pos&c=Store_StaffPrinterPrintLog&a=print_one_order_v4&store_id='+current_store_id+'&printsn='+resultv2021.print_sn+'&print_type='+kitch_printer_type_text+"&cyberwin_client_session_userandstaff_data="+未来之窗_bridge_user;
       
									  window.top.CyberWin_Dialog.layer(未来之窗中间件,{type:"url",title:"未来之窗打印",move:true,width:"800px",height:"230px",id:"cyberwin_dlg_priner",mask:true,align:59,hideclose:false});
                                      window.top.cyberwin_closedlg('cyberwin_hotel_id_store');
								
								 /*
								 parent.layer.open({
										  type: 2,
										  title: '支付订单',
										  shadeClose: false,
										  shade: 0.6,
										  area: ['820px', '610px'],
										  content: urlprinter
										});
										*/

								// alert("取消打印了，下次再见"+resultv2021.print_sn);
								  return;

					}

					 //alert("订单等待打印");
					//	$.post(cyberwin_foodshopPrintOrder_pssmenu,function(result){

					result=resultv2021.order_pssmenu;
                   console.log("订单等待打印-----------------");
					//console.log(result);

					//alert("111");
					// return;

								//layer.close(index);
								//layer.close(tip_index);

						if(result.status==4){
								   location.reload();
								   return;

						}

								var cyber_printer='<?xml version="1.0"?><root><print_type>'+kitch_printer_type_text+'</print_type>';
								cyber_printer=cyber_printer+'<shopname>'+result.shopname+'</shopname><order_no>单号：'+result.today_orderid_store+'</order_no>';
								cyber_printer=cyber_printer+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
								cyber_printer=cyber_printer+'<today_orderid_store>'+result.today_orderid_store+'</today_orderid_store>';
								cyber_printer=cyber_printer+'<order_detail>'+result.info+'</order_detail></root>';

								//console.log(result);

								//console.log(cyber_printer);

								//alert(cyber_printer);

							

								if(printversion==="sortprint"){

									//console.log("厨打V2sortprint");
									var printsort_group=result.printsort_group;
									printsort_group_str=JSON.stringify(printsort_group);
									//console.log(printsort_group);
								  // var printsort_group_obj=eval("("+printsort_group_str+")");//转换为json对象 
								//$.parseJSON(printsort_group);

							    //	console.log("厨打V2sortprint--2021-");

								console.log(printsort_group);

								if(current_store_id=="72"){
								    console.log("未来之窗一菜一单转换专用测试，现场测试");
									console.log(printsort_group);
									//alert("11");

								   // return;
								}


								
								


								
								//	console.log(printsort_group_obj);
										//console.log("厨打V2sortprint---");
									//	var i_printer=0;

										for(var ever in printsort_group) {
                                         // length++;
										  console.log("厨打V2sortprint-分单");
										  console.log("打印参数="+ever);
										 // console.log( printsort_group[ever]);
										  var  sort_print_page=printsort_group[ever];
										  // CyberWin_JsStandardPlug.printWithPrinter("后厨打印","cyber_wlzc_o2o_kitchen",cyber_printer);

										  //匹配打印机
										  var kitchenprinter_config_page=findOrderPrinterByPrinterID(sort_print_page.print_id);

										  var cyber_printer_page='<?xml version="1.0"?><root><print_type>'+kitch_printer_type_text+'</print_type>';
											cyber_printer_page=cyber_printer_page+'<shopname>'+result.shopname+'</shopname><order_no>单号：'+result.today_orderid_store+'</order_no>';
											cyber_printer_page=cyber_printer_page+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
											cyber_printer_page=cyber_printer_page+'<today_orderid_store>'+result.today_orderid_store+'</today_orderid_store>';
											cyber_printer_page=cyber_printer_page+'<order_detail>'+sort_print_page.printerdata+'</order_detail></root>';

											
											if (typeof (kitchenprinter_config_page) == "undefined") {
											  kitchenprinter_config_page = new PrinterConfig("后厨打印","后厨打印","driver");
											}

											
											if ('address' in kitchenprinter_config_page) {
                                               
											}else{
										      	console.log("如果查询不到采用后厨打印：");
											 //2021-1-16 如果查询不到采用后厨打印
												//驱动打印
												kitchenprinter_config_page = new PrinterConfig("后厨打印","后厨打印","driver");
											}

											//console.log("地址："+ kitchenprinter_config_page.address+",类型："+kitchenprinter_config_page.device_type);
											// console.log("打印内容="+cyber_printer_page);

											 if(current_store_id=="72"){
												//console.log("未来之窗一菜一单转换专用测试，现场测试2");
												//console.log(sort_print_page);
												//alert("11");
												var dishmenuall=sort_print_page.dishmenuall;
												for(var i_dishmenuall in dishmenuall){
												
												console.log("一桌一单:"+sort_print_page.printerdata);
												   var order_detail_ycyd=" 名称   数量 \n***************";
												   order_detail_ycyd=order_detail_ycyd+"\n"+dishmenuall[i_dishmenuall];
												   order_detail_ycyd=order_detail_ycyd+"\n***************";

												 //  console.log("一菜一单:"+order_detail_ycyd);
												}

													//console.log("未来之窗一菜一单转换专用测试，现场测试2222222222222222222");

											   // return;
											}
											var dish_Kitchen_printmod="ycyd";
											if(dish_Kitchen_printmod=="ycyd"){
											  //一菜一单

											    var dishmenuall=sort_print_page.dishmenuall;
												for(var i_dishmenuall in dishmenuall){
												   var order_detail_ycyd=" 名称   数量 \n***************";
												   order_detail_ycyd=order_detail_ycyd+"\n"+dishmenuall[i_dishmenuall];
												   order_detail_ycyd=order_detail_ycyd+"\n***************";

												   console.log("一菜一单2:"+order_detail_ycyd);
												    
													 var cyber_printer_page_ycyd='<?xml version="1.0"?><root><print_type>'+kitch_printer_type_text+'</print_type>';
													cyber_printer_page_ycyd=cyber_printer_page_ycyd+'<shopname>'+result.shopname+'</shopname><order_no>单号：'+result.today_orderid_store+'</order_no>';
													cyber_printer_page_ycyd=cyber_printer_page_ycyd+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
													cyber_printer_page_ycyd=cyber_printer_page_ycyd+'<today_orderid_store>'+result.today_orderid_store+'</today_orderid_store>';
													cyber_printer_page_ycyd=cyber_printer_page_ycyd+'<order_detail>'+order_detail_ycyd+'</order_detail></root>';
													 
													 
													 //(printername,orderid,tablename,printdata)
													 CyberWinDishPrintLog(kitchenprinter_config_page.address,i_dishmenuall+"_"+result.order_no,result.table_name,cyber_printer_page_ycyd);

													 CyberWin_JsStandardPlug.cyber_print("kitchen",cyber_printer_page_ycyd,kitchenprinter_config_page.address,kitchenprinter_config_page.device_type);

												}
												//厨打总氮
												var cyber_printer_page='<?xml version="1.0"?><root><print_type>厨打单总单</print_type>';
											cyber_printer_page=cyber_printer_page+'<shopname>'+result.shopname+'</shopname><order_no>'+kitchenprinter_config_page.address+'</order_no>';
											cyber_printer_page=cyber_printer_page+'<bill_time>'+result.bill_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+result.table_name+'</table_name>';
											cyber_printer_page=cyber_printer_page+'<today_orderid_store>'+result.today_orderid_store+'</today_orderid_store>';
											cyber_printer_page=cyber_printer_page+'<order_detail>'+sort_print_page.printerdata+'</order_detail></root>';

												CyberWin_JsStandardPlug.cyber_print("kitchen_list58",cyber_printer_page,kitchenprinter_config_page.address,kitchenprinter_config_page.device_type);

											}else{
										    	//一桌子一单
												//2021-1=18 临时加代码
											    CyberWin_JsStandardPlug.cyber_print("kitchen",cyber_printer_page,kitchenprinter_config_page.address,kitchenprinter_config_page.device_type);

											}



									  	   // CyberWin_JsStandardPlug.cyber_print("kitchen",cyber_printer_page,kitchenprinter_config_page.address,kitchenprinter_config_page.device_type);

										}
										//return;

										if(current_store_id=="72"){
								           console.log("未来之窗一菜一单转换专用测试，现场测试3");
									     
									       // alert("11ok");

								            // return;
								         }

									 


								}else{

								   CyberWin_JsStandardPlug.printWithPrinter("后厨打印","cyber_wlzc_o2o_kitchen",cyber_printer);
								}



								 //2023-5-26 location.reload();

								//console.log(result);
								//alert(resultv2021.info);
						//},'json');
					
				}else{
				    click_one_alone_dish=false;
					layer.close(tip_index);
					//2019-10-16 
					//layer.close(checkCartTip);
					alert(resultv2021.info);
				}
			},'json');//,'json'

			/*
		},function(){
			nowGroupId = 0;
		});

		*/
	});

//cwpd_dishdesktop_pay_order

function changeSpec(){
	console.log(nowSpecFood);
	if(nowSpecFood.spec_list){
		var specId = [];
		$.each($('.food_spec_box .spec_content ul'),function(i,item){
			specId.push($(item).find('li.active').data('spec_list_id'));
		});
		var nowProductSpect = nowSpecFood.list[specId.join('_')];
		// console.log(nowProductSpect);
		//if (nowProductSpect.price != undefined) {
		    // $('#specPrice').html(nowProductSpect.price);
		//}else{
			//$('#specPrice').html(nowSpecFood.price);
		//}

		try{
			$('#specPrice').html(nowProductSpect.price);
			$('#specStock').html(nowProductSpect.stock_num);
		 }
		 catch(err)
		   {
		   }
		
		if(nowSpecFood.properties_list){
			$('.properties_content li').removeClass('active');
			for(var i in nowProductSpect.properties){
				console.log(nowProductSpect.properties[i]);
				$('.productProperties_'+nowProductSpect.properties[i].id).data('num',nowProductSpect.properties[i].num);
			}
		}
	}
}

var productCart = [];
function cartFunction(obj,type){
	console.log(obj);
	if(type == 'plus'){
		if($('.productCartKey_'+obj.productKey).size() > 0){
		/*
			productCart[obj.productKey].count++;
			$('.productCartKey_'+obj.productKey+' .number input').val(parseFloat($('.productCartKey_'+obj.productKey+' .number input').val())+1);
			$('#cartCount').html(parseFloat($('#cartCount').html())+1);
			*/
				if((productCart[obj.productKey].spec != "")&&(typeof(productCart[obj.productKey].spec) != "undefined")){
				//alert("no"+productCart[obj.productKey].spec);
				/*
				if (typeof(productCart[obj.productKey].spec) != "undefined") { 
				}
				*/
				//2020-9-30 凡是有规格的，都新加行
					if(!obj.count){
					  obj.count = 1;
					}
					var timestamp1 =Date.parse(new Date());
					var productCart_productKey_newbyspec=obj.productKey+"_"+timestamp1;
					obj.productKey=productCart_productKey_newbyspec;//增加一个key
					productCart[productCart_productKey_newbyspec] = obj;
					//laytpl($('#foodCartTpl').html()).render(obj, function(html){
					laytpl($('#cwpd_diyfoodCartTpl_changeBuy_20200702').html()).render(obj, function(html){//2020-8-14修改下单模板
						$('.food_cart_list ul').append(html);
					});
					$('#cartCount').html(parseFloat($('#cartCount').html())+obj.count);
			}else{
				productCart[obj.productKey].count++;
				$('.productCartKey_'+obj.productKey+' .number input').val(parseFloat($('.productCartKey_'+obj.productKey+' .number input').val())+1);
				$('#cartCount').html(parseFloat($('#cartCount').html())+1);
			}
		//规格

		}else{
			if(!obj.count){
				obj.count = 1;
			}
			productCart[obj.productKey] = obj;
			laytpl($('#cwpd_diyfoodCartTpl_changeBuy_20200702').html()).render(obj, function(html){
				$('.food_cart_list ul').append(html);
			});
			$('#cartCount').html(parseFloat($('#cartCount').html())+obj.count);
		}
		
	}
	//2021-1-27 套餐操作
	//plusvpackage
	else if(type == 'plusvpackage'){
	      console.log("套餐咋啦"+obj.productKey);
		   console.log(obj);
		if($('.productCartKey_'+obj.productKey).size() > 0){

		
		 
				if((productCart[obj.productKey].spec != "")&&(typeof(productCart[obj.productKey].spec) != "undefined")){
				 
			 
				 
					if(!obj.count){
					  obj.count = 1;
					}
					var timestamp1 =Date.parse(new Date());
					var productCart_productKey_newbyspec=obj.productKey+"_"+timestamp1;

					console.log("已经有一个了"+productCart_productKey_newbyspec);

					obj.productKey=productCart_productKey_newbyspec;//增加一个key
					productCart[productCart_productKey_newbyspec] = obj;
					//laytpl($('#foodCartTpl').html()).render(obj, function(html){
					laytpl($('#cwpd_diyfoodCartTpl_changeBuy_20200702').html()).render(obj, function(html){//2020-8-14修改下单模板
						$('.food_cart_list ul').append(html);
					});
					$('#cartCount').html(parseFloat($('#cartCount').html())+obj.count);
			}else{
				productCart[obj.productKey].count=1;//套餐只要一份
				$('.productCartKey_'+obj.productKey+' .number input').val(parseFloat($('.productCartKey_'+obj.productKey+' .number input').val()));
				$('#cartCount').html(parseFloat($('#cartCount').html())+1);
			}
		//规格

		}else{
			if(!obj.count){
				obj.count = 1;
			}
			productCart[obj.productKey] = obj;
			laytpl($('#cwpd_diyfoodCartTpl_changeBuy_20200702').html()).render(obj, function(html){
				$('.food_cart_list ul').append(html);
			});
			$('#cartCount').html(parseFloat($('#cartCount').html())+obj.count);
		}
		
	}
	
	else if(type == 'plusvcart'){
		//2020-11-22,购物车制作加法
		if($('.productCartKey_'+obj.productKey).size() > 0){
			

		//productCart[obj.productKey]
			if((productCart[obj.productKey].spec != "")&&(typeof(productCart[obj.productKey].spec) != "undefined")){
			 /*
				//2020-9-30 凡是有规格的，都新加行
					if(!obj.count){
					  obj.count = 1;
					}
					var timestamp1 =Date.parse(new Date());
					var productCart_productKey_newbyspec=obj.productKey+"_"+timestamp1;
					obj.productKey=productCart_productKey_newbyspec;//增加一个key
					productCart[productCart_productKey_newbyspec] = obj;
					//laytpl($('#foodCartTpl').html()).render(obj, function(html){
					laytpl($('#cwpd_diyfoodCartTpl_changeBuy_20200702').html()).render(obj, function(html){//2020-8-14修改下单模板
						$('.food_cart_list ul').append(html);
					});
					$('#cartCount').html(parseFloat($('#cartCount').html())+obj.count);
					*/
					productCart[obj.productKey].count++;
				$('.productCartKey_'+obj.productKey+' .number input').val(parseFloat($('.productCartKey_'+obj.productKey+' .number input').val())+1);
				$('#cartCount').html(parseFloat($('#cartCount').html())+1);
			}else{
				productCart[obj.productKey].count++;
				$('.productCartKey_'+obj.productKey+' .number input').val(parseFloat($('.productCartKey_'+obj.productKey+' .number input').val())+1);
				$('#cartCount').html(parseFloat($('#cartCount').html())+1);
			}
		//规格

		}else{
			if(!obj.count){
				obj.count = 1;
			}
			productCart[obj.productKey] = obj;
			//laytpl($('#foodCartTpl').html()).render(obj, function(html){
			laytpl($('#cwpd_diyfoodCartTpl_changeBuy_20200702').html()).render(obj, function(html){//2020-8-14修改下单模板
				$('.food_cart_list ul').append(html);
			});
			$('#cartCount').html(parseFloat($('#cartCount').html())+obj.count);
		}
		
	}else if(type == 'min'){
		if($('.productCartKey_'+obj.productKey+' .number input').val().split('.').length > 1){
			$('.productCartKey_'+obj.productKey+' .number input').val(parseInt($('.productCartKey_'+obj.productKey+' .number input').val()));
			productCart[obj.productKey].count = parseInt(productCart[obj.productKey].count);
			$('#cartCount').html(parseInt($('#cartCount').html()));
		}else{
			$('.productCartKey_'+obj.productKey+' .number input').val(parseFloat($('.productCartKey_'+obj.productKey+' .number input').val())-1);
			productCart[obj.productKey].count--;
			$('#cartCount').html(parseFloat($('#cartCount').html())-1);
		}
		if(productCart[obj.productKey].count == 0){
			$('.productCartKey_'+obj.productKey).remove();
		}
	}else if(type == 'change'){
		var tmpNum = parseFloat($('.productCartKey_'+obj.productKey+' .number input').val());
		if(isNaN(tmpNum) || tmpNum <= 0){
			$('.productCartKey_'+obj.productKey+' .number input').val(productCart[obj.productKey].count);
			alert('请输入正确的数值');
			return false;
		}else if(tmpNum != productCart[obj.productKey].count){
		    var cyberwin_cartcount_old=$('#cartCount').html();
			if(tmpNum > productCart[obj.productKey].count){
			    var cyberwin_cartcount_new=cyberwin_math_handle(tmpNum,productCart[obj.productKey].count,"-");
			    var cyberwin_cartcount=cyberwin_math_handle(cyberwin_cartcount_old,cyberwin_cartcount_new,"+");
				$('#cartCount').html(cyberwin_cartcount);
				//$('#cartCount').html(parseFloat($('#cartCount').html()) + parseFloat(tmpNum-productCart[obj.productKey].count));
			}else{

			 var cyberwin_cartcount_new=cyberwin_math_handle(productCart[obj.productKey].count,tmpNum,"-");

			 var cyberwin_cartcount=cyberwin_math_handle(cyberwin_cartcount_old,cyberwin_cartcount_new,"-");
				$('#cartCount').html(cyberwin_cartcount);
				//$('#cartCount').html(parseFloat($('#cartCount').html()) - parseFloat(productCart[obj.productKey].count-tmpNum));
			}
			productCart[obj.productKey].count = tmpNum;
		}
	}else if(type == 'cwpd_amendname'){
		

                $('.productCartKey_'+obj.productKey+' .name').text("00000000000000");
	}
	$('#cartBox').show();
	$('#buyBox').hide();
	console.log(productCart);
	//2020-2-4计算总价

	//2020-7-2 
	var cwpd_amendprice_dish_one_price=$('.productCartKey_'+obj.productKey+' .cwpd_amendprice_dish').text();
	var cwpd_amendprice_dish_one_num=$('.productCartKey_'+obj.productKey+' .number input').val();
	var cwpd_amendprice_dish_total=cyberwin_math_handle(cwpd_amendprice_dish_one_price,cwpd_amendprice_dish_one_num,"*");//parseFloat(cwpd_amendprice_dish_one_price)*parseFloat(cwpd_amendprice_dish_one_num);
	$('.productCartKey_'+obj.productKey+' .cwpd_amendprice_dish_total').text(cwpd_amendprice_dish_total);

	cwpd_calc_cart(productCart);

	//2020-1-16计算总价
	//cwpd_calc_cart(productCart);
	cwpd_ScreenDeputy(productCart);
}

var productBuyCart = [];
var productBuyCart_alone = [];
var default_alone_dish_screen = "";
var default_alone_dish_screen_i =0;

//已经落单退菜
function cartBuyFunction(obj,type){
  return cartBuyFunctionV2021(obj,type,1);

}
function cartBuyFunctionV2021(obj,type,param1){
	if(type == 'plus'){
		if($('.productBuyKey_'+obj.productKey).size() > 0){
			var tip_index = layer.load(0, {shade: [0.5,'#fff']});
			$.post(foodshopChangeOrder,{detail_id:obj.detail_id,number:obj.count+1},function(result){
				layer.close(tip_index);
				if(result.status == 1){
					productBuyCart[obj.productKey].count++;
					$('.productBuyKey_'+obj.productKey+' .number input').val(parseFloat($('.productBuyKey_'+obj.productKey+' .number input').val())+1);
					$('#buyCount').html(parseFloat($('#buyCount').html())+1);
					now_order_price(result.total_price, result.book_price, result.unpaid_price);
				}else{
					alert(result.info);
				}
			});
		}else{
			productBuyCart[obj.productKey] = obj;
			laytpl($('#foodBuyTpl').html()).render(obj, function(html){
				$('.food_buy_list ul').append(html);
			});
			$('#buyCount').html(parseFloat($('#buyCount').html())+obj.count);
		}
	}else if(type == 'show'){
		productBuyCart[obj.productKey] = obj;
		//console.log(obj);
		productBuyCart_alone[obj.productKey] = obj;
		default_alone_dish_screen_i=default_alone_dish_screen_i+1;
		//prod_returnone.productName+"   "+return_num+"  "+prod_returnone.productUnit+"\n";
		if(default_alone_dish_screen_i % 2 ==1){
		   default_alone_dish_screen=default_alone_dish_screen+"<br><hr>";
		}

		if(default_alone_dish_screen_i % 2 ==0){
		   default_alone_dish_screen=default_alone_dish_screen+" || ";
		}

		default_alone_dish_screen=default_alone_dish_screen+""+obj.productName+"   "+obj.count+"   "+obj.productPrice+"   "+obj.productUnit+"   ";

		laytpl($('#foodBuyTpl_cartalone').html()).render(obj, function(html){
			$('.food_buy_list ul').append(html);
		});
		//
		// console.log("菜单初始化---");

		$('#buyCount').html(parseFloat($('#buyCount').html())+obj.count);
	}else if(type == 'min'){
		var tip_index = layer.load(0, {shade: [0.5,'#fff']});
		
		if($('.productBuyKey_'+obj.productKey+' .number input').val().split('.').length > 1){
			var tmpPostNum = parseInt($('.productBuyKey_'+obj.productKey+' .number input').val());
		}else{
			//var tmpPostNum = parseFloat($('.productBuyKey_'+obj.productKey+' .number input').val())-1;
			param1==Number(param1);
			//增加数量控制
			//alert(param1);
			var tmpPostNum = parseFloat($('.productBuyKey_'+obj.productKey+' .number input').val())-1;
			//
			//alert(tmpPostNum);
		}

		//console.log("退菜：要进数据了"+obj.detail_id);
		//return;
		
		$.post(foodshopChangeOrder,{detail_id:obj.detail_id,number:tmpPostNum},function(result){
			layer.close(tip_index);
			if(result.status == 1){
				if($('.productBuyKey_'+obj.productKey+' .number input').val().split('.').length > 1){
					$('.productBuyKey_'+obj.productKey+' .number input').val(parseInt($('.productBuyKey_'+obj.productKey+' .number input').val()));
					productBuyCart[obj.productKey].count = parseInt(productBuyCart[obj.productKey].count);
					$('#buyCount').html(parseInt($('#buyCount').html()));
				}else{
					$('.productBuyKey_'+obj.productKey+' .number input').val(parseFloat($('.productBuyKey_'+obj.productKey+' .number input').val())-1);
					productBuyCart[obj.productKey].count--;
					$('#buyCount').html(parseFloat($('#buyCount').html())-1);
				}
				if(productBuyCart[obj.productKey].count == 0){
					$('.productBuyKey_'+obj.productKey).remove();
				}
				//tmpPostNum
				//退菜
				if(tmpPostNum == 0){
					$('.productBuyKey_'+obj.productKey).remove();
				}

				now_order_price(result.total_price, result.book_price, result.unpaid_price);
			}else{
				alert(result.info);
			}
		});
	}else if(type == 'change'){
		var tmpNum = parseFloat($('.productBuyKey_'+obj.productKey+' .number input').val());
		if(isNaN(tmpNum) || tmpNum <= 0){
			$('.productBuyKey_'+obj.productKey+' .number input').val(productBuyCart[obj.productKey].count);
			alert('请输入正确的数值');
			return false;
		}else if(tmpNum != productBuyCart[obj.productKey].count){
			var tip_index = layer.load(0, {shade: [0.5,'#fff']});
			$.post(foodshopChangeOrder,{detail_id:obj.detail_id,number:tmpNum},function(result){
				layer.close(tip_index);
				if(result.status == 1){
					if(tmpNum > productBuyCart[obj.productKey].count){
						$('#buyCount').html(parseFloat($('#buyCount').html()) + parseFloat(tmpNum-productBuyCart[obj.productKey].count));
					}else{
						$('#buyCount').html(parseFloat($('#buyCount').html()) - parseFloat(productBuyCart[obj.productKey].count-tmpNum));
					}
					productBuyCart[obj.productKey].count = tmpNum;
					now_order_price(result.total_price, result.book_price, result.unpaid_price);
				}else{
					alert(result.info);
				}
			});
		}
	}
	//console.log(productBuyCart);
}

function changeBody(){
	var bodyUlWidth = $('.food_body').width()-10;
	var rowNumber = parseInt(bodyUlWidth/270);
	var rowNumber = parseInt(bodyUlWidth/dishmenu_width);

	var cwpd_screen_width=window.screen.width;

	if(  cwpd_screen_width <900){
		     rowNumber = parseInt(bodyUlWidth/120);
	   		$('.food_body ul.cur').css('padding-left',(bodyUlWidth - ((rowNumber*360) + (rowNumber-1)*15))/2);
		    $('.food_body ul.cur').css('padding-right',(bodyUlWidth - ((rowNumber*360) + (rowNumber-1)*15))/2);

    }else{

		$('.food_body ul.cur').css('padding-left',(bodyUlWidth - ((rowNumber*270) + (rowNumber-1)*15))/2);
		$('.food_body ul.cur').css('padding-right',(bodyUlWidth - ((rowNumber*270) + (rowNumber-1)*15))/2);
	}
	
	// $('.food_body ul.cur li').css('margin-right',parseInt((bodyUlWidth - (rowNumber*270))/(rowNumber-1)));
	
	$.each($('.food_body ul.cur li'),function(i,item){		
		//if((i+1)%rowNumber == 0){
		if((i+1)%rowNumber == 0){
			$(item).css('margin-right','0');
		}
	});
}

function now_order_price(total_price, book_price, unpaid_price)
{
	$('#unpaid_price').html('<b>还应支付：</b>' + unpaid_price);
	$('#book_price').html('<b>已付订金：</b>' + book_price);
	$('#total_price').html('<b>订单总价：</b>' + total_price);
}


function cwpd_Scan_Search(search_key){
	//alert(12);
     //console.log(foodData.lists);
	//foodData
	if(foodData.lists){
			for(var cwpd_good_sort in foodData.lists){
				// console.log(cwpd_good_sort);

				 var cwpd_good_sort_one=foodData.lists[cwpd_good_sort];
				// console.log(cwpd_good_sort_one.goods_list);//['goods_lists']
				// console.log("类别："+cwpd_good_sort_one.sort_name);


				  for(var cwpd_dishgood in cwpd_good_sort_one.goods_list){

					//  console.log(cwpd_good_sort_one.goods_list[cwpd_dishgood]);

					   var cwpd_dishgood_one=cwpd_good_sort_one.goods_list[cwpd_dishgood];

					  // console.log("wwwww：");

					   // console.log(cwpd_dishgood_one);

						//console.log("wwwww："+cwpd_dishgood_one.name);
						//console.log("wwwww："+cwpd_dishgood_one.number);

						if(cwpd_dishgood_one.number==search_key){

							/*
							cartBuyFunction({productKey:cwpd_dishgood_one.goods_id+'_'+cwpd_dishgood_one.spec_id+'_order_detail'
							,productId:cwpd_dishgood_one.goods_id,productName:cwpd_dishgood_one.name
								,productUnit:cwpd_dishgood_one.unit,productPrice:cwpd_dishgood_one.price,productStock:'-1'
							,productParam:[],productLabel:cwpd_dishgood_one.spec
								,detail_id:cwpd_dishgood_one.id,count:cwpd_dishgood_one.num,is_must:cwpd_dishgood_one.is_must
							,cwp_editnumflag:cwpd_dishgood_one.cwp_editnumflag},'show');

							*/
							//console.log("wwwww："+cwpd_dishgood_one.goods_id);
							/*


							cartFunction({productKey:cwpd_dishgood_one.goods_id,productId:cwpd_dishgood_one.goods_id
								,productName:cwpd_dishgood_one.name,productUnit:cwpd_dishgood_one.unit
								,productPrice:cwpd_dishgood_one.price,productStock:cwpd_dishgood_one.stock_num,productParam:[]},'plus');
							*/
							//2020-1-27 增加打印

							cartFunction({productKey:cwpd_dishgood_one.goods_id,productId:cwpd_dishgood_one.goods_id
								,productName:cwpd_dishgood_one.name,productUnit:cwpd_dishgood_one.unit
								,productPrice:cwpd_dishgood_one.price
								,productStock:cwpd_dishgood_one.stock_num
								,productPrintId:cwpd_dishgood_one.print_id
								,productParam:[]},'plus');

							return;
						}

						/*

						if(foodData.order_detail[i].spec){
							foodData.order_detail[i].spec = foodData.order_detail[i].spec.replace(/,/g,' ');
							foodData.order_detail[i].spec = foodData.order_detail[i].spec.replace(/;/g,' ');
						}
						*/


						/*

						cartBuyFunction({productKey:foodData.order_detail[i].goods_id+'_'+foodData.order_detail[i].spec_id+'_order_detail',productId:foodData.order_detail[i].goods_id,productName:foodData.order_detail[i].name,productUnit:foodData.order_detail[i].unit,productPrice:foodData.order_detail[i].price,productStock:'-1',productParam:[],productLabel:foodData.order_detail[i].spec,detail_id:foodData.order_detail[i].id,count:foodData.order_detail[i].num,is_must:foodData.order_detail[i].is_must
							,cwp_editnumflag:foodData.order_detail[i].cwp_editnumflag},'show');

						*/
				}


			}
			//$('#buyBox').show();
			//$('#cartBox').hide();
		}
		
}


function cwpd_searchkeyCode(event) {
    var x = event.keyCode;
    if (x == 27) {
       // alert ("你按下了 Esc 键!");
	   $("#cwpd_search").val('');
    }
	 if (x == 13) {
       // alert ($("#cwpd_search").val());
		var search_key=$("#cwpd_search").val();
		cwpd_Scan_Search(search_key);
		$("#cwpd_search").val('');
    }
}



//订单总结2020-2-4
var  cwpd_total_price=0;
var  cwpd_submitting=false;


function cwpd_calc_cart(obj_productCart){
	var total_price=0;
	cwpd_total_price=0;
	for(var i in  obj_productCart){
		console.log("计算订单");
		//console.log(obj_productCart[i]);
		var obj_productCart_one=obj_productCart[i];
		var obj_productCart_one_count=obj_productCart_one.count;
		var obj_productCart_one_price=obj_productCart_one.productPrice;

		total_price=total_price+cyberwin_math_handle(obj_productCart_one_count,obj_productCart_one_price,"*");//(obj_productCart_one_count*obj_productCart_one_price);

	}
	console.log("计算订单="+total_price);
	cwpd_total_price=total_price;
	$("#buytotalPrice").html(cwpd_total_price);
}

//副屏幕
function cwpd_ScreenDeputy(obj_productCart){
	if (typeof (CyberWin_JsStandardPlug) == "undefined") {
	//不支持
	return ;
	}

	var total_price=0;
	var sr='<div class="tabx_list">';
					 sr=sr+'<table cellpadding="0" cellspacing="0" border="0">';
						 sr=sr+'<tbody><tr class="top">';
							 sr=sr+'<th width="42">项</th>';
							 sr=sr+'<th width="235">名称</th>';
							 sr=sr+'<th width="55">数量</th>';
							 sr=sr+'<th width="115">金额（元）</th>';
						 sr=sr+'</tr>';
				 sr=sr+'	</tbody></table>';
					 sr=sr+'<div class="roll_table" style="height: 429px;">';
					 sr=sr+'	<div class="tabcon" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">';
						
						 sr=sr+'	<table cellpadding="0" cellspacing="0" border="0" class="slide"><tbody>';

         var src_lastfoodimg='';
						  
	for(var i in  obj_productCart){
		console.log("计算福屏幕");
		//console.log(obj_productCart[i]);
		var obj_productCart_one=obj_productCart[i];
		var obj_productCart_one_count=obj_productCart_one.count;
		var obj_productCart_one_price=obj_productCart_one.productPrice;

		obj_productCart_one_count=parseFloat(obj_productCart_one_count);
		obj_productCart_one_price=parseFloat(obj_productCart_one_price);

		if(obj_productCart_one_count <= 0){
			//没有数量不要了2020-8-27
			//console.log("没有数量不要了2020");
			continue; 
		}

		total_price=total_price+(obj_productCart_one_count*obj_productCart_one_price);

		//total_price=total_price+(obj_productCart_one_count*obj_productCart_one_price);
							  sr=sr+'<tr class="goods_'+obj_productCart_one.productId+'" data-id="'+obj_productCart_one.productId+'" data-num="'+obj_productCart_one.count+'"';
							   sr=sr+'data-price="'+obj_productCart_one.productPrice+'">';
							    sr=sr+'<td width="42">'+obj_productCart_one_count+'</td><td class="tl" width="235">';
								 sr=sr+'<h2>'+obj_productCart_one.productName+'</h2><p></p></td><td width="55">1</td>';
								  sr=sr+'<td class="tl" width="115">￥<span class="price">'+obj_productCart_one_price+'</span></td>';
								    sr=sr+'</tr>';


			src_lastfoodimg='<div id="lastfoodimg" style="width: 500px;height: 550px;margin-top: 0px;position: fixed;left: 350px;top: 30px;background-color:#fe6d15;text-align:center;  ">';
			src_lastfoodimg= src_lastfoodimg+'<center><h3 style="background: #fe6d15;color: white;line-height: 30px;margin-top: 0px;margin-bottom: 0px;">';
			src_lastfoodimg= src_lastfoodimg+"名称：【"+obj_productCart_one.productName+'】</h3></center>';
			src_lastfoodimg= src_lastfoodimg+'<img style="width:450px;" src="'+obj_productCart_one.food_img+'">';

			src_lastfoodimg= src_lastfoodimg+'</div>';



	}
	 sr=sr+'</tbody></table>';

							
						 sr=sr+'</div>';
					 sr=sr+'</div>';
				 sr=sr+'</div>';


				 

				 var total_html='';

				 total_html=total_html+' <div class="number clr">';

				
								
				 total_html=total_html+' <span class="cwpd_discount_yfje"></span>&nbsp;&nbsp;&nbsp;';
				 total_html=total_html+' <span class="cwpd_discount_je"></span>';
				 total_html=total_html+'	<div class="fr">';
				 total_html=total_html+'	合计: <span class="ef2" style="color: #ef2e05; font-weight: bold;font-size: 60pt;">'+total_price+'</span>';
				 total_html=total_html+'	</div>';	

				  sr=total_html+sr+src_lastfoodimg;

	//console.log("广告牌="+sr);
	//cwpd_total_price=total_price;
	//$("#buytotalPrice").html(cwpd_total_price);
	//CyberWin_JsStandardPlug.locStorage_setScreenData("cyberwin_application_union","deputy_screen","cyber_id = 1 ",sr,"1");
	var dish_deputy_screen_show_a=parseInt(dish_deputy_screen_show);
	if(dish_deputy_screen_show_a==1){
		if(total_price <= 0){
			CyberWin_JsStandardPlug.locStorage_setScreenData("cyberwin_application_union","deputy_screen"," cyber_id = 1 ","--","3");
		}else{
		   CyberWin_JsStandardPlug.locStorage_setScreenData("cyberwin_application_union","deputy_screen","cyber_id = 1 ",sr,"1");
		}

		//CyberWin_JsStandardPlug.locStorage_setScreenData("cyberwin_application_union","deputy_screen"," cyber_id = 1 ","--","3");
	}
}

function cwpd_Scan_Search(search_key){
	//alert(12);
     //console.log(foodData.lists);
	//foodData
	if(foodData.lists){
			for(var cwpd_good_sort in foodData.lists){
				// console.log(cwpd_good_sort);

				 var cwpd_good_sort_one=foodData.lists[cwpd_good_sort];
				// console.log(cwpd_good_sort_one.goods_list);//['goods_lists']
				// console.log("类别："+cwpd_good_sort_one.sort_name);


				  for(var cwpd_dishgood in cwpd_good_sort_one.goods_list){

					//  console.log(cwpd_good_sort_one.goods_list[cwpd_dishgood]);

					   var cwpd_dishgood_one=cwpd_good_sort_one.goods_list[cwpd_dishgood];

					  // console.log("wwwww：");

					   // console.log(cwpd_dishgood_one);

						//console.log("wwwww："+cwpd_dishgood_one.name);
						//console.log("wwwww："+cwpd_dishgood_one.number);

						if(cwpd_dishgood_one.number==search_key){

							/*
							cartBuyFunction({productKey:cwpd_dishgood_one.goods_id+'_'+cwpd_dishgood_one.spec_id+'_order_detail'
							,productId:cwpd_dishgood_one.goods_id,productName:cwpd_dishgood_one.name
								,productUnit:cwpd_dishgood_one.unit,productPrice:cwpd_dishgood_one.price,productStock:'-1'
							,productParam:[],productLabel:cwpd_dishgood_one.spec
								,detail_id:cwpd_dishgood_one.id,count:cwpd_dishgood_one.num,is_must:cwpd_dishgood_one.is_must
							,cwp_editnumflag:cwpd_dishgood_one.cwp_editnumflag},'show');

							*/
							//console.log("wwwww："+cwpd_dishgood_one.goods_id);
							/*


							cartFunction({productKey:cwpd_dishgood_one.goods_id,productId:cwpd_dishgood_one.goods_id
								,productName:cwpd_dishgood_one.name,productUnit:cwpd_dishgood_one.unit
								,productPrice:cwpd_dishgood_one.price,productStock:cwpd_dishgood_one.stock_num,productParam:[]},'plus');
							*/
							//2020-1-27 增加打印

							cartFunction({productKey:cwpd_dishgood_one.goods_id,productId:cwpd_dishgood_one.goods_id
								,productName:cwpd_dishgood_one.name,productUnit:cwpd_dishgood_one.unit
								,productPrice:cwpd_dishgood_one.price
								,productStock:cwpd_dishgood_one.stock_num
								,productPrintId:cwpd_dishgood_one.print_id
								,productParam:[]},'plus');

							return;
						}

						/*

						if(foodData.order_detail[i].spec){
							foodData.order_detail[i].spec = foodData.order_detail[i].spec.replace(/,/g,' ');
							foodData.order_detail[i].spec = foodData.order_detail[i].spec.replace(/;/g,' ');
						}
						*/


						/*

						cartBuyFunction({productKey:foodData.order_detail[i].goods_id+'_'+foodData.order_detail[i].spec_id+'_order_detail',productId:foodData.order_detail[i].goods_id,productName:foodData.order_detail[i].name,productUnit:foodData.order_detail[i].unit,productPrice:foodData.order_detail[i].price,productStock:'-1',productParam:[],productLabel:foodData.order_detail[i].spec,detail_id:foodData.order_detail[i].id,count:foodData.order_detail[i].num,is_must:foodData.order_detail[i].is_must
							,cwp_editnumflag:foodData.order_detail[i].cwp_editnumflag},'show');

						*/
				}


			}
			//$('#buyBox').show();
			//$('#cartBox').hide();
		}
		
}


function cwpd_searchkeyCode(event) {
    var x = event.keyCode;
    if (x == 27) {
       // alert ("你按下了 Esc 键!");
	   $("#cwpd_search").val('');
    }
	 if (x == 13) {
       // alert ($("#cwpd_search").val());
		var search_key=$("#cwpd_search").val();
		cwpd_Scan_Search(search_key);
		$("#cwpd_search").val('');
    }
}

var SearchExMix_total=0;
var SearchExMix_Cart_data = [];
var SearchExMix_Cart_data_i=0;
var SearchExMix_Cart_findcount=0;
//点击选中
function cwpd_Scan_SearchExMix_clickselby(click_index){
//alert(click_index);
         var current_i=click_index-1;
		// console.log(SearchExMix_Cart_data[current_i]);
		 var cwpd_dishgood_one =SearchExMix_Cart_data[current_i] ;
		   cartFunction({productKey:cwpd_dishgood_one.goods_id,productId:cwpd_dishgood_one.goods_id
								,productName:cwpd_dishgood_one.name,productUnit:cwpd_dishgood_one.unit
								,productPrice:cwpd_dishgood_one.price
								,productStock:cwpd_dishgood_one.stock_num
								,productPrintId:cwpd_dishgood_one.print_id
								,productParam:[]},'plus');

		   	$("#SearchExMixMul").hide(100);
			$("#cwpd_search").val('');

}

function cwpd_Scan_SearchExMix(search_key){
  search_key=search_key.toLowerCase();
	//alert(12);
	console.log("关键字："+search_key);
   //  console.log(foodData.lists);
	//foodData
	var find_total=0;
	SearchExMix_total=0;
	SearchExMix_Cart_findcount=0;//清空计数
	SearchExMix_Cart_data = [];

	var find_goods_list_html="";
	if(foodData.lists){
			for(var cwpd_good_sort in foodData.lists){
				// console.log(cwpd_good_sort);

				 var cwpd_good_sort_one=foodData.lists[cwpd_good_sort];
				// console.log(cwpd_good_sort_one.goods_list);//['goods_lists']
				console.log("类别2024=："+cwpd_good_sort_one.sort_name);


				  for(var cwpd_dishgood in cwpd_good_sort_one.goods_list){

					//  console.log(cwpd_good_sort_one.goods_list[cwpd_dishgood]);

					console.log(cwpd_dishgood);

					

					   var cwpd_dishgood_one=cwpd_good_sort_one.goods_list[cwpd_dishgood];

					   console.log(cwpd_dishgood_one);

					   var dish_one_name=cwpd_dishgood_one.name;
					   var dish_one_number=cwpd_dishgood_one.number;

					    var dish_one_name_rem=cwpd_dishgood_one.name_rem;
					   //name_rem

                        // console.log(dish_one_name_rem);
						 if(dish_one_name_rem==null){
						   dish_one_name_rem="";
						 }
						// console.log(dish_one_name_rem);

					   dish_one_name=dish_one_name.toLowerCase();
					   if(dish_one_number){
						   //2023-9-14
					        dish_one_number=dish_one_number.toLowerCase();
					   }

					   dish_one_name_rem=dish_one_name_rem.toLowerCase();

					   var dish_one_name_i=dish_one_name.indexOf(search_key);
					   var dish_one_rem_i=-1;
					   //2022-3-20 增加条码搜索
					   var dish_one_number_i=-1;
					   
					   //2021-1-27 增加产品id
					   if(dish_one_name_rem!=null){
						   dish_one_rem_i=dish_one_name_rem.indexOf(search_key);
					   }

					    if(dish_one_number != null){
						   //2022-3-20 条码搜索
						   dish_one_number_i=dish_one_number.indexOf(search_key);
					   }
					    

					   //if(dish_one_name_i>-1){
					 if((dish_one_name_i>-1)||(dish_one_rem_i>-1)||(dish_one_number_i>-1)){
						   find_total=find_total+1;
						  // console.log("找到："+dish_one_name);

						  /*
						   cartFunction({productKey:cwpd_dishgood_one.goods_id,productId:cwpd_dishgood_one.goods_id
								,productName:cwpd_dishgood_one.name,productUnit:cwpd_dishgood_one.unit
								,productPrice:cwpd_dishgood_one.price
								,productStock:cwpd_dishgood_one.stock_num
								,productPrintId:cwpd_dishgood_one.print_id
								,productParam:[]},'plus');

						   */

						   SearchExMix_Cart_data.push(cwpd_dishgood_one);
						   SearchExMix_Cart_findcount=SearchExMix_Cart_findcount+1;//搜索结果计数

						   find_goods_list_html=find_goods_list_html+'<tr onclick="cwpd_Scan_SearchExMix_clickselby('+SearchExMix_Cart_findcount+');" style="border:1px solid #29c7a2;font-size:18px;" class="searchkershowrow" id="searchkershowrow_'+find_total+'"><td  style="border:1px solid #29c7a2;font-size:18px;">'+find_total+'</td><td  style="border:1px solid #29c7a2;font-size:18px;">'+dish_one_name+"</td>";
						     find_goods_list_html=find_goods_list_html+'<td style="border:1px solid #29c7a2;font-size:18px;">'+cwpd_dishgood_one.price+"</td>";
							 find_goods_list_html=find_goods_list_html+'<td  style="border:1px solid #29c7a2;font-size:18px;">'+cwpd_dishgood_one.unit+"</td>";
						    find_goods_list_html=find_goods_list_html+'</tr>';

							//return;
					   }else{
						  // console.log("不是");

					   }


					  // console.log("wwwww：");

					  // console.log(cwpd_dishgood_one);

						//console.log("wwwww："+cwpd_dishgood_one.name);
						//console.log("wwwww："+cwpd_dishgood_one.number);

						/*
						2022-3-20 菜品搜索到一致需要确认
						//不然会出现两个产品

						if(cwpd_dishgood_one.number==search_key){
							find_total=find_total+1;

							 
							//2020-1-27 增加打印

							cartFunction({productKey:cwpd_dishgood_one.goods_id,productId:cwpd_dishgood_one.goods_id
								,productName:cwpd_dishgood_one.name,productUnit:cwpd_dishgood_one.unit
								,productPrice:cwpd_dishgood_one.price
								,productStock:cwpd_dishgood_one.stock_num
								,productPrintId:cwpd_dishgood_one.print_id
								,productParam:[]},'plus');

							return;
						}
						*/

						/*

						if(foodData.order_detail[i].spec){
							foodData.order_detail[i].spec = foodData.order_detail[i].spec.replace(/,/g,' ');
							foodData.order_detail[i].spec = foodData.order_detail[i].spec.replace(/;/g,' ');
						}
						*/


						/*

						cartBuyFunction({productKey:foodData.order_detail[i].goods_id+'_'+foodData.order_detail[i].spec_id+'_order_detail',productId:foodData.order_detail[i].goods_id,productName:foodData.order_detail[i].name,productUnit:foodData.order_detail[i].unit,productPrice:foodData.order_detail[i].price,productStock:'-1',productParam:[],productLabel:foodData.order_detail[i].spec,detail_id:foodData.order_detail[i].id,count:foodData.order_detail[i].num,is_must:foodData.order_detail[i].is_must
							,cwp_editnumflag:foodData.order_detail[i].cwp_editnumflag},'show');

						*/
				}


			}
			//$('#buyBox').show();
			//$('#cartBox').hide();
		}
		SearchExMix_total=find_total;
	 
		if(find_total>=1){
			$("#SearchExMixMul_body").html(find_goods_list_html);

			SearchExMix_Cart_data_i=1;//默认选中第一个
			$(".searchkershowrow").css("background-color","#FFFFFF");

		   $("#searchkershowrow_"+SearchExMix_Cart_data_i).css("background-color","#29c7a2");

 
			//alert(find_total);
		}else{
			 	//$("#SearchExMixMul").hide(100);
				$("#SearchExMixMul_body").html('');
		}
		
}

function cwpd_searchkeyCodeExMix(event) {
    var x = event.keyCode;
    if (x == 27) {
       // alert ("你按下了 Esc 键!");
	   $("#cwpd_search").val('');
    }

	//$('.cwpd_checkCart_Bury_fastfoodmode')
	if (x == 107) {
		$('.cwpd_checkCart_Bury_fastfoodmode').click();
	}

	var search_key=$("#cwpd_search").val();


	if(search_key.length<1){
		$("#SearchExMixMul").hide(100);
		return;
	}

	if (x == 38) {//Up
       // alert ("你按下了 Esc 键!");
	    console.log("你按下了  键shang");
		SearchExMix_Cart_data_i=SearchExMix_Cart_data_i-1;
		
		$(".searchkershowrow").css("background-color","#FFFFFF");

		 $("#searchkershowrow_"+SearchExMix_Cart_data_i).css("background-color","#29c7a2");
		 if(SearchExMix_Cart_data_i<1){
			 SearchExMix_Cart_data_i=1;
		 }
		//SearchExMix_Cart_data
		return;
    }
	if (x == 40) {//down
       // alert ("你按下了 Esc 键!");
	     console.log("你按下了  xia");

		 SearchExMix_Cart_data_i=SearchExMix_Cart_data_i+1;
		 $(".searchkershowrow").css("background-color","#FFFFFF");
		  $("#searchkershowrow_"+SearchExMix_Cart_data_i).css("background-color","#29c7a2");

		 if(SearchExMix_Cart_data_i>SearchExMix_total){
			 SearchExMix_Cart_data_i=SearchExMix_total;
		 }
		 return;
    }
	 if (x == 13) {
		 console.log("你按下了  确认：序号"+SearchExMix_Cart_data_i);
		// $("#searchkershowrow_"+SearchExMix_Cart_data_i).css("background-color","#29c7a2");
		 var current_i=SearchExMix_Cart_data_i-1;
		 //console.log(SearchExMix_Cart_data[current_i]);
		 var cwpd_dishgood_one =SearchExMix_Cart_data[current_i] ;
		   cartFunction({productKey:cwpd_dishgood_one.goods_id,productId:cwpd_dishgood_one.goods_id
								,productName:cwpd_dishgood_one.name,productUnit:cwpd_dishgood_one.unit
								,productPrice:cwpd_dishgood_one.price
								,productStock:cwpd_dishgood_one.stock_num
								,productPrintId:cwpd_dishgood_one.print_id
								,productParam:[]},'plus');

		   	$("#SearchExMixMul").hide(100);
			$("#cwpd_search").val('');

		 return;
	 }

	$("#SearchExMixMul").show();

	 if (x == 13) {
       // alert ($("#cwpd_search").val());
		
		cwpd_Scan_SearchExMix(search_key);
		//$("#cwpd_search").val('');
    }else{
		//var search_key=$("#cwpd_search").val();
		cwpd_Scan_SearchExMix(search_key);
	}
}

////////////////////////////////////////////////////////////////////////////////
//搜索////////////////////

function cwpd_amendname(productKey){
 //console.log("改名字");
     // console.log( productCart[productKey]);

	  var old_prodname = $('.productCartKey_'+productKey+' .cwpd_amendname_dish').text();
	  old_prodname = old_prodname.replace(/^\s*|\s*$/g,"");

	  var prodname=prompt("请录入新名称",old_prodname)
	   prodname = prodname.replace(/^\s*|\s*$/g,"");
	  if (prodname!=null && prodname!="")
		{

		  
		   //document.write("Hello " + name + "!")
		    $('.productCartKey_'+productKey+' .cwpd_amendname_dish').text(prodname);
			productCart[productKey].productName=prodname;
		}else{
		      layer.msg('修改失败，菜品不能为空');
		}
	 
    // $('.productCartKey_'+productKey+' .name').text("00000000000000");

	  //console.log("改名字2");
    //  console.log( productCart[productKey]);
	 
}

function cwpd_amenddishprice_2021116(productKey){
      console.log("改价格");
       console.log( productCart[productKey]);

	  var old_prodname = $('.productCartKey_'+productKey+' .cwpd_amendprice_dish').text();
	  old_prodname = old_prodname.replace(/^\s*|\s*$/g,"");

	  var prodname=prompt("请录入新价格",old_prodname)
	   prodname = prodname.replace(/^\s*|\s*$/g,"");
	  if (prodname!=null && prodname!="")
		{

		  
		   //document.write("Hello " + name + "!")
		    $('.productCartKey_'+productKey+' .cwpd_amendprice_dish').text(prodname);
			productCart[productKey].productPrice=Math.floor(prodname);
		}else{
		      layer.msg('修改失败，菜品不能为空');
		}
	 
    // $('.productCartKey_'+productKey+' .name').text("00000000000000");

	  console.log("改价格2");
     console.log( productCart[productKey]);
	 
}

function cwpd_amenddishprice(productKey){
      console.log("改价格");
       console.log( productCart[productKey]);

	  var old_prodname = $('.productCartKey_'+productKey+' .cwpd_amendprice_dish').text();
	  old_prodname = old_prodname.replace(/^\s*|\s*$/g,"");

	  var prodname=prompt("请录入新价格",old_prodname)
	   prodname = prodname.replace(/^\s*|\s*$/g,"");
	  if (prodname!=null && prodname!="")
		{

		  
		   //document.write("Hello " + name + "!")
		    $('.productCartKey_'+productKey+' .cwpd_amendprice_dish').text(prodname);
			productCart[productKey].productPrice=prodname;//不计算 Math.floor(prodname);

			//2020-8-28 修正小计
			var currnet_num = $('.productCartKey_'+productKey+' .number input').val();
			var current_totalp=cyberwin_math_handle(prodname,currnet_num,"*");
			 $('.productCartKey_'+productKey+' .cwpd_amendprice_dish_total').text(current_totalp);

			 cwpd_calc_cart(productCart);//计算总价2020-8-28

		}else{
		      layer.msg('修改失败，菜品不能为空');
		}
	 
    // $('.productCartKey_'+productKey+' .name').text("00000000000000");

	  console.log("改价格2");
     console.log( productCart[productKey]);
	 
}


//修改备注 口味 做法
function cwpd_amendspec(productKey){
 //console.log("改名字");
     // console.log( productCart[productKey]);

	  CyberWin_SetTastes_4_DishCashier(productKey);
	 return;
	 //2020-1023 备注多样此行

	  var old_prodname = $('.productCartKey_'+productKey+' .cwpd_amendspec_dish').text();
	  old_prodname = old_prodname.replace(/^\s*|\s*$/g,"");

	  var prodname=prompt("请录入新备注",old_prodname)
	   prodname = prodname.replace(/^\s*|\s*$/g,"");
	  if (prodname!=null && prodname!="")
		{

		  
		   //document.write("Hello " + name + "!")
		    $('.productCartKey_'+productKey+' .cwpd_amendspec_dish').text(prodname);
			productCart[productKey].spec=prodname;
		}else{
		      layer.msg('修改失败，备注不能为空');
		}
	 
    // $('.productCartKey_'+productKey+' .name').text("00000000000000");

	  console.log("改名字2");
     console.log( productCart[productKey]);
	 
}

function cwpd_amendspec_input(productKey,value){
 //console.log("改名字");
     // console.log( productCart[productKey]);
//	 CyberWin_SetTastes_4_DishCashier(productKey);

	//  var old_prodname = $('.productCartKey_'+productKey+' .cwpd_amendspec_dish').text();
	//  old_prodname = old_prodname.replace(/^\s*|\s*$/g,"");

	  
	   prodname = value.replace(/^\s*|\s*$/g,"");
	  if (prodname!=null && prodname!="")
		{

		  
		   //document.write("Hello " + name + "!")
		    $('.productCartKey_'+productKey+' .cwpd_amendspec_dish').text(prodname);
			productCart[productKey].spec=prodname;
		}else{
		      layer.msg('修改失败，备注不能为空');
		}
	 
    // $('.productCartKey_'+productKey+' .name').text("00000000000000");

	//  console.log("改名字2");
    // console.log( productCart[productKey]);
	  layer.closeAll();
	 
}



//2020-1-10 多规格价格
function cwpd_amendspec_inputv3(productKey,value){
 //console.log("改名字");
     // console.log( productCart[productKey]);
//	 CyberWin_SetTastes_4_DishCashier(productKey);

	//  var old_prodname = $('.productCartKey_'+productKey+' .cwpd_amendspec_dish').text();
	//  old_prodname = old_prodname.replace(/^\s*|\s*$/g,"");

	  
	   prodname = value.replace(/^\s*|\s*$/g,"");
	  if (prodname!=null && prodname!="")
		{

		  
		   //document.write("Hello " + name + "!")
		    $('.productCartKey_'+productKey+' .cwpd_amendspec_dish').text(prodname);
			productCart[productKey].spec=prodname;
		}else{
		      layer.msg('修改失败，备注不能为空');
		}

		//2021-1-10 价格修改
		  cwpd_cwpd_amendspec_mul_addprice=Number(cwpd_cwpd_amendspec_mul_addprice);
	      cwpd_cwpd_amendspec_mul_addprice=parseFloat(cwpd_cwpd_amendspec_mul_addprice);

	      var old_price=productCart[productKey].productPrice;
;//不计算 Math.floor(prodname);
		  old_price=Number(old_price);
	      old_price=parseFloat(old_price);
		  if(cwpd_cwpd_amendspec_mul_addprice > 0){
			  //
			   console.log("规格附加值大于0");
			   var newprod_price=cwpd_cwpd_amendspec_mul_addprice+old_price;

			   productCart[productKey].productPrice=newprod_price;//新价格

			   var currnet_num = $('.productCartKey_'+productKey+' .number input').val();
			   var current_totalp=cyberwin_math_handle(newprod_price,currnet_num,"*");
			   //cwpd_amendprice_dish
			   $('.productCartKey_'+productKey+' .cwpd_amendprice_dish').text(newprod_price);//单价

			   $('.productCartKey_'+productKey+' .cwpd_amendprice_dish_total').text(current_totalp);

			   cwpd_cwpd_amendspec_mul_addprice=0;

			 cwpd_calc_cart(productCart);//计算总价2020-8-28


		  }else{
			   console.log("规格附加值不大于0");
		  }
	 
    // $('.productCartKey_'+productKey+' .name').text("00000000000000");

	//  console.log("改名字2");
    // console.log( productCart[productKey]);
	  layer.closeAll();
	 
}


//多选择
//2020-10-23
function cwpd_amendspec_mul(productKey,value){
	//cwpd_amendspec_input
	var old_s=$("#cwpdbeizhidy").val();
	var new_s= old_s+", "+value;
	new_s=new_s.trim(",");
	$("#cwpdbeizhidy").val(new_s);

}

function cwpd_amendspec_mulv3(productKey,value , num_price){
	//cwpd_amendspec_input
	var old_s=$("#cwpdbeizhidy").val();
	var new_s= old_s+", "+value;
	new_s=new_s.trim(",");
	$("#cwpdbeizhidy").val(new_s);
	cwpd_cwpd_amendspec_mul_addprice=Number(cwpd_cwpd_amendspec_mul_addprice);
	cwpd_cwpd_amendspec_mul_addprice=parseFloat(cwpd_cwpd_amendspec_mul_addprice);

	var num_pricenum=Number(num_price);
	num_pricenum=parseFloat(num_pricenum);
	cwpd_cwpd_amendspec_mul_addprice=cwpd_cwpd_amendspec_mul_addprice+num_pricenum;

	

}

function cwpd_returndish(productKey,_return_num){
 //console.log("退菜"+productKey);
 //目前只支持后厨打印
      //productKey=productKey.replace("__order_detail", "");
	  console.log("退菜"+productKey);
	  console.log(productBuyCart_alone);
     // console.log( productBuyCart_alone[productKey]);
	 console.log(productBuyCart[productKey]);
	 console.log("退菜=======");



	  

	 // var return_num=prompt("请输入退菜数量",_return_num)
	var  return_num=1;

	  return_num= Number(return_num);

	  if (return_num<1)
		{
		   return;
		}

			var prod_returnone=productBuyCart[productKey];//2021-增加退菜打印机
		var prod_returndish=""+prod_returnone.productName+"   "+return_num+"  "+prod_returnone.productUnit+"\n";

		console.log(prod_returnone);


         var question="确认要退【"+prod_returnone.productName+"】"+return_num+" "+prod_returnone.productUnit+"?";
		 var mymessage=confirm(question);
	   //alert(mymessage);
	    if(mymessage==true)
		{   
        }
		else
		{  
	       return;
		}

		var myDate = new Date();
		/*
myDate.getYear();        //获取当前年份(2位)
myDate.getFullYear();    //获取完整的年份(4位,1970-????)
myDate.getMonth();       //获取当前月份(0-11,0代表1月)
myDate.getDate();        //获取当前日(1-31)
myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
myDate.getHours();       //获取当前小时数(0-23)
myDate.getMinutes();     //获取当前分钟数(0-59)
myDate.getSeconds();     //获取当前秒数(0-59)
myDate.getMilliseconds();    //获取当前毫秒数(0-999)
myDate.toLocaleDateString();     //获取当前日期
var mytime=myDate.toLocaleTimeString();     //获取当前时间
myDate.toLocaleString( );        //获取日期与时间

*/

	
		var current_day=myDate.getDate();
		var current_month=myDate.getMonth();
		current_day=current_day;
		current_month=current_month+1;

		var current_time=""+current_month+"月"+current_day+"日 "+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getMinutes();



		var cyber_printer='<?xml version="1.0"?><root><print_type>退菜单</print_type>';
								cyber_printer=cyber_printer+'<shopname>'+current_store_name+'</shopname><order_no>'+current_today_orderid_store+'</order_no>';
								cyber_printer=cyber_printer+'<bill_time>'+current_time+'</bill_time><beizhu>备注</beizhu><clerk_name>11</clerk_name><clerk_id>11</clerk_id><table_name>'+current_table_name+'</table_name>';
								cyber_printer=cyber_printer+'<today_orderid_store>'+''+'</today_orderid_store>';
								cyber_printer=cyber_printer+'<order_detail>'+prod_returndish+'</order_detail></root>';

								//console.log(result);

								//console.log(cyber_printer);

								//alert(cyber_printer);
								//print_id:
								 var kitchenprinter_config_pager=findOrderPrinterByPrinterID(prod_returnone.print_id);

								if (typeof (kitchenprinter_config_pager) == "undefined") {
											  kitchenprinter_config_pager = new PrinterConfig("后厨打印","后厨打印","driver");
								}

								if("cyberwin-noprinter"==kitchenprinter_config_pager){
								  //没有后厨打印机
								   kitchenprinter_config_pager = new PrinterConfig("后厨打印","后厨打印","driver");
								}


								 CyberWinDishPrintLog("退菜_"+kitchenprinter_config_pager.address,productKey+"_",current_table_name,cyber_printer);

                              try{
								  CyberWin_JsStandardPlug.printWithPrinter(kitchenprinter_config_pager.address,"cyber_wlzc_o2o_kitchen",cyber_printer);
							  }catch(err) {
							     console.log("退菜不在客户端无法打印");
		                       }


								cartBuyFunctionV2021(productBuyCart[productKey],'min',return_num);

		  
      console.log( productCart[productKey]);
	 
}

//下单后改价
//下单后换桌台
function cwpd_aloneamendprice(productKey,_change_price){
 //console.log("退菜"+productKey);
 //目前只支持后厨打印
      //productKey=productKey.replace("__order_detail", "");
	  console.log("退菜"+productKey);
	  console.log(productBuyCart_alone);
     // console.log( productBuyCart_alone[productKey]);
	 console.log(productBuyCart[productKey]);
	 console.log("下单后改价=======");



	  

	  var change_price=prompt("请输入菜品价格",_change_price)
	 

	  change_price= Number(change_price);

	  if (change_price<0)
		{
		   return;
		}

		 console.log("下单后改价======="+productBuyCart[productKey].detail_id);

		//return;

		$.post(foodshopChangeOrder,{detail_id:productBuyCart[productKey].detail_id,param1:change_price,changetype:'amendprice'},function(result){
				//layer.close(tip_index);
				 console.log(result);
				if(result.status == 1){
					//productBuyCart[obj.productKey].count++;
					//$('.productBuyKey_'+obj.productKey+' .number input').val(parseFloat($('.productBuyKey_'+obj.productKey+' .number input').val())+1);
					//$('#buyCount').html(parseFloat($('#buyCount').html())+1);
					now_order_price(result.total_price, result.book_price, result.unpaid_price);
					window.location.reload();
				}else{
					alert(result.info);
				}
			});

		



				

		  
     
	 
}
function cwpd_alonechangetable(productKey,_return_num){
    // alert(productBuyCart[productKey].detail_id);
 
    //ChangeTable 
	layer.open({
			type: 2,
			title: '转菜',
			shadeClose: true,
			shade: 0.6,
			area: ['420px','350px'],
			content: foodshopOrderChangeTable +"&detail_id="+productBuyCart[productKey].detail_id
		});
	 
}


//未来之窗四则运算
function cyberwin_math_handle(a, b , opera) {
	switch(opera) {
		 case "+":
			return cyberwin_math_add(a,b);
			break;
		 case "-":
			return cyberwin_math_sub(a,b);
			break;
		 case "*":
			return cyberwin_math_mul(a,b);
			break;
         case "/":
			return cyberwin_math_div(a,b);
			break;
		 default:
			return 0;
	} 
}
//乘法口洁
function cyberwin_math_mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
////加法
function cyberwin_math_add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (cyberwin_math_mul(a, e) + cyberwin_math_mul(b, e)) / e;
}
//减法
function cyberwin_math_sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (cyberwin_math_mul(a, e) - cyberwin_math_mul(b, e)) / e;
}
//除法
function cyberwin_math_div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), cyberwin_math_mul(c / d, Math.pow(10, f - e));
}

//厨打记录
function CyberWinDishPrintLog(printername,orderid,tablename,printdata){
/*
 var printername="热菜";
 var orderid=12;
 var tablename="A01";
 var printdata="<xml>";
 */
       try {
					//2023-1-31 增加异常检测
			 var param2='CyberPHP->Param:logpathCyberPHP->Value:D:/餐饮打印/';
			   //appname
			   param2=param2+'CyberPHP->Param:printernameCyberPHP->Value:'+printername;
				param2=param2+'CyberPHP->Param:orderidCyberPHP->Value:'+orderid;
				 param2=param2+'CyberPHP->Param:tablenameCyberPHP->Value:'+tablename+"";
				  param2=param2+'CyberPHP->Param:printdataCyberPHP->Value:'+printdata+"";

				  var r= CyberWin_APP.run("CyberWinDishPrintLog","PrintLog",param2,"");
		 //alert(r);
		 } catch(err) {
　　  
                    console.log("退菜日志插件异常");
		             
　　            }
}


//2023-1-23 
function 未来之窗_API_加载菜品(){
	//local_dish_foodmenu
	var cwpd_render_data = $.parseJSON(window.localStorage.getItem(local_dish_foodmenu));
	if (cwpd_render_data == null) {
		$.getJSON(getFoodMenuUrl_OnlyDishgoods ,{order_id:"noneed"},function(result){
		     window.localStorage.setItem(local_dish_foodmenu, JSON.stringify(result));
			 console.log("互联数据-单独菜单");
			  console.log(result);
			 未来之窗_渲染_菜品();
		});
	
					//未来之窗专用存储
					//CyberWin_JsStandardPlug.locStorage_setVal("cyberwinphpdefault","local_cache",local_total_index, JSON.stringify(response.data));
					
	}else{
		console.log("本地数据单独菜单");
		未来之窗_渲染_菜品();//
	}

}

function 未来之窗_渲染_菜品(){
	var cwpd_render_data = $.parseJSON(window.localStorage.getItem(local_dish_foodmenu));
			foodData = cwpd_render_data;
		console.log("产品");
		console.log(foodData);
			laytpl($('#foodSortTpl').html()).render(foodData.lists, function(html){
			$('.swiper-wrapper').html(html);
			$('.swiper-wrapper li:first').addClass('cur');
		});
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 'auto',
			spaceBetween: 10,
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next',
		});  

			$('.foodshop_order .food_menu .food_cat li').click(function(){
			$(this).addClass('cur').siblings('li').removeClass('cur');
			$('.sort_ul_'+$(this).data('sort_id')).addClass('cur').show().siblings('ul').removeClass('cur').hide();
			changeBody();
		});
        //渲染菜皮
		laytpl($('#foodTpl').html()).render(foodData.lists, function(html){
			$('.food_body').html(html);
			$('.food_body ul:first').addClass('cur').show();
			changeBody();
		});
		//加载菜品事件
				$('.food_body li').click(function(){
			if($(this).hasClass('hasSpec')){
				var tip_index = layer.load(0, {shade: [0.5,'#fff']});
				var that = $(this);
				//for(var i in foodData.lists[that.data('sort_id')].goods_list){
				//if(foodData.lists[that.data('sort_id')].goods_list[i].goods_id == that.data('id')){
					//	nowSpecFood = foodData.lists[that.data('sort_id')].goods_list[i];

				//突然bug
				var current_sort_i=0;
				for(var i_s in foodData.lists){
					if(foodData.lists[i_s]['sort_id']==that.data('sort_id')){
						current_sort_i=i_s;
					}
				}

				for(var i in foodData.lists[current_sort_i].goods_list){
					if(foodData.lists[current_sort_i].goods_list[i].goods_id == that.data('id')){
						nowSpecFood = foodData.lists[current_sort_i].goods_list[i];

					
						laytpl($('#foodSpecTpl').html()).render(nowSpecFood, function(html){
							$('.food_spec_box').html(html);
						});
						changeSpec();
						layer.close(tip_index);
						layer.open({
							type: 1,
							title: false,
							shadeClose: true,
							shade: 0.6,
							area: ['400px','510px'],
							closeBtn:0,
							content: $('.food_spec_box')
						});
						return false;
						break;
					}
				}
			}else{
				//2020-1-27 打印机
				//cartFunction({productKey:$(this).data('id'),productId:$(this).data('id'),productName:$(this).data('name'),productUnit:$(this).data('unit'),productPrice:$(this).data('price'),productStock:$(this).data('stock_num'),productParam:[]},'plus');
				//2020-1-27 套餐操作知道吗
				//cartFunction({productKey:$(this).data('id'),productId:$(this).data('id'),productName:$(this).data('name'),productUnit:$(this).data('unit'),productPrice:$(this).data('price'),productStock:$(this).data('stock_num'),productPrintId:$(this).data('print_id'),productParam:[]},'plus');

				if(dish_handle_add_goods_package==true){
				    console.log("套餐选中2022 -"+$(this).data('id'));
				    console.log(food_package_num_cache);

					//var good_id_for_num_cache_one = $(this).data('id');
					 

					var food_package_num_cache_one_name="packagenum_"+$(this).data('id');
					 for(var item_package in food_package_num_cache){ 
					         console.log("子："+item_package); 
					 }


					var food_package_num_cache_one=food_package_num_cache[food_package_num_cache_one_name];
					 console.log(food_package_num_cache_one_name+"one="+food_package_num_cache_one+"gid="+$(this).data('id'));

					food_package_num_cache_one= Number(food_package_num_cache_one);
					if(food_package_num_cache_one<1){
					  food_package_num_cache_one=1;
					}
					if(food_package_num_cache_one>999){
					   food_package_num_cache_one=1;
					}

					console.log("套餐选中2022-"+$(this).data('id')+"数量："+food_package_num_cache_one);


				   cartFunction({productKey:$(this).data('id'),productId:$(this).data('id'),productName:'[套]'+$(this).data('name'),productUnit:$(this).data('unit'),productPrice:0,productStock:$(this).data('stock_num'),productPrintId:$(this).data('print_id'),productParam:[],count:food_package_num_cache_one},'plusvpackage');

				  

				}else{

				      cartFunction({productKey:$(this).data('id'),productId:$(this).data('id'),productName:$(this).data('name'),productUnit:$(this).data('unit'),productPrice:$(this).data('price'),productStock:$(this).data('stock_num'),productPrintId:$(this).data('print_id'),productParam:[]},'plus');
				}

			}
		});
		 
		 
		laytpl($('#cyberwinfoodGroupTpl').html()).render(foodData.package, function(html){
		    console.log("套餐加载");
		     //console.log(foodData.package);
			$('.food_group_box ul').html(html);
		});

}

//加载桌台菜单
function 未来之窗_API_加载桌台菜单(订单号){
	//alert(getFoodMenuUrl_OnlyFoodOrder);
	$.getJSON(getFoodMenuUrl_OnlyFoodOrder,{order_id:订单号
		 ,cwpd_session_staff:未来之窗_session
		, client_uuid:未来之窗_clientsn
		},function(result){

		foodData = result;
		console.log("餐桌菜单");
		console.log(result);

		///////
		if(foodData.tmp_order){
			for(var i in foodData.tmp_order){
				if(foodData.tmp_order[i].spec){
					foodData.tmp_order[i].spec = foodData.tmp_order[i].spec.replace(/,/g,' ');
					foodData.tmp_order[i].spec = foodData.tmp_order[i].spec.replace(/;/g,' ');
				}
				cartFunction({productKey:foodData.tmp_order[i].goods_id+'_'+foodData.tmp_order[i].spec_id+'_tmp_order'
				    ,productId:foodData.tmp_order[i].goods_id,productName:foodData.tmp_order[i].name
					,productUnit:foodData.tmp_order[i].unit
					,productPrice:foodData.tmp_order[i].price
					,productStock:'-1',productParam:[]
					,productPrintId:foodData.tmp_order[i].print_id
					,productLabel:foodData.tmp_order[i].spec
					,isTmpOrder:true,tmpOrderId:foodData.tmp_order[i].id,count:parseInt(foodData.tmp_order[i].num)},'plus');
			}
		}
		 
		
		if(foodData.order_detail){
		//console.log(foodData.order_detail);
			for(var i in foodData.order_detail){
				if(foodData.order_detail[i].spec){
					foodData.order_detail[i].spec = foodData.order_detail[i].spec.replace(/,/g,' ');
					foodData.order_detail[i].spec = foodData.order_detail[i].spec.replace(/;/g,' ');
				}
				/*
				cartBuyFunction({productKey:foodData.order_detail[i].goods_id+'_'+foodData.order_detail[i].spec_id+'_order_detail',productId:foodData.order_detail[i].goods_id,productName:foodData.order_detail[i].name,productUnit:foodData.order_detail[i].unit,productPrice:foodData.order_detail[i].price,productStock:'-1',productParam:[],productLabel:foodData.order_detail[i].spec,detail_id:foodData.order_detail[i].id,count:foodData.order_detail[i].num,is_must:foodData.order_detail[i].is_must
					,cwp_editnumflag:foodData.order_detail[i].cwp_editnumflag
					,print_id:foodData.order_detail[i].print_id},'show');//增加打印机id
					*/

					 
					//2022-8-30

					cartBuyFunction({productKey:foodData.order_detail[i].goods_id+'_'+foodData.order_detail[i].spec_id+'_'+foodData.order_detail[i].id+'_order_detail',productId:foodData.order_detail[i].goods_id,productName:foodData.order_detail[i].name,productUnit:foodData.order_detail[i].unit,productPrice:foodData.order_detail[i].price,productStock:'-1',productParam:[],productLabel:foodData.order_detail[i].spec,detail_id:foodData.order_detail[i].id,count:foodData.order_detail[i].num,is_must:foodData.order_detail[i].is_must
					,cwp_editnumflag:foodData.order_detail[i].cwp_editnumflag
					,print_id:foodData.order_detail[i].print_id
					,id:foodData.order_detail[i].id},'show');//增加打印机id,购物车id
					 
			}

			  console.log("餐饮点菜单-加载完毕");
			  var dish_deputy_screen_show_html= $(".food_buy_list").html();
			  //dish_deputy_screen_show
			  var dish_deputy_screen_show_a=parseInt(dish_deputy_screen_show);
			if(dish_deputy_screen_show_a==1){
			      console.log(dish_deputy_screen_show_html);

			  	if (typeof (CyberWin_JsStandardPlug) == "undefined") {
				   //不支持插件
				}else{
			    
				 CyberWin_JsStandardPlug.locStorage_setScreenData("cyberwin_application_union","deputy_screen","cyber_id = 1 ",dish_deputy_screen_show_html,"1");
				}
			 
			}

			  default_alone_dish_screen=default_alone_dish_screen+"";
			  dish_deputy_screen_show_html=default_alone_dish_screen;//"餐饮点菜单-加载完毕";
			 // alert("餐饮点菜单-加载完毕");
			 if (typeof (CyberWin_JsStandardPlug) == "undefined") {
				      //不支持插件
				}else{
			          CyberWin_JsStandardPlug.locStorage_setScreenData("cyberwin_application_union","deputy_screen","cyber_id = 1 ",dish_deputy_screen_show_html,"1");
               }


			$('#buyBox').show();
			$('#cartBox').hide();
		}
		/////////////////////////////////////////////

	});
}


function cwpd_clearLocalDishMenu(){
	//local_dish_menu
	//请空本地菜单
	console.log("请空本地菜单缓存");
	window.localStorage.removeItem(local_dish_foodmenu );
	window.localStorage.removeItem(local_dish_menu);
	//window.top.location.href=cwpd_topurl_reload;

}


