
/*
resize --> 初始化样式
			obj: 顶级父级
fnRoll --> {
	parent : 顶级父级
	children : 图片或展示的对象
	tabs : 图片对应数字标签的对象集合
	class : 图片对应数字标签的激活样式
}

*/


var roll = {
		dH : $(window).height(),
		dW : $(window).width(),
		onOff : true,
		num : 0,
		resize : function(obj){
			roll.dH = $(window).height();
			roll.dW = $(window).width();
			obj.css({'top' : -roll.dH*roll.num});
			obj.find('img').css({'width' : roll.dW, 'height' : roll.dH});
		},
		fnRoll : function(e,json){
			var ev = e || event;
			var direction = ev.wheelDelta || -ev.detail;
			var nowTop = json.parent.offset().top;
			if(direction<0 && roll.onOff){
				if(roll.num>=json.children.length-1){
					return false;
				}
				roll.newTop = nowTop-roll.dH;
				json.tabs.removeClass(json.class);
				json.tabs.eq(roll.num+1).addClass(json.class);
				roll.onOff = false;
				json.parent.animate({top:nowTop-roll.dH},1000,function(){
					roll.onOff = true;
					roll.num++;
				});
			}else if(direction>0 && roll.onOff){
				if(roll.num<=0){
					return false;
				}
				roll.newTop = nowTop+roll.dH;
				json.tabs.removeClass(json.class);
				json.tabs.eq(roll.num-1).addClass(json.class);
				roll.onOff = false;
				json.parent.animate({top:nowTop+roll.dH},1000,function(){
					roll.onOff = true;
					roll.num--;
				});
			}
		}
	};