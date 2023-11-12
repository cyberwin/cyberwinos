//语言
//2023-8-13
var 未来之窗_语言库_中文 = {useing:"在用",repairroom:"维修",dirtyroom:"脏房",ziyong:"自用",appointnomoney:"预定",jinfang:"空房",overtime:"超时"
};

var 未来之窗_语言库_english = {useing:"occupied",repairroom:"Repair",dirtyroom:"Dirty",ziyong:"Self-use",appointnomoney:"Booking",jinfang:"vacancy",overtime:"Over"
};

function wlzc_lang(key){
	let 未来之窗语言 =  未来之窗_语言库_中文;
	if(未来之窗_基建_语言 ==  "中文"){
		未来之窗语言 = 未来之窗_语言库_中文;
	}

	if(未来之窗_基建_语言 ==  "english"){
		未来之窗语言 = 未来之窗_语言库_english;
	}
	return 未来之窗语言[key];
}