// 仿jquery$函数
function $(str) {
    var s = str.charAt(0);   //  存放#或者.
    var ss = str.substr(1);  // 去除.或者#后的部分
    switch(s)
    {
        case "#":
            return document.getElementById(ss);
        break;
        case ".":
            return getClass(ss);
        break;
        default :
            return document.getElementsByTagName(str);
    }
}
// 求数组平均值
function avg(array){
	var len = array.length;
	var sum = 0;
	for(var i = 0 ;i < len ; i++){
		sum += array[i];
	}
	return sum / len;}
// Tab栏切换
function tab(obj){
	var target = $(obj);
	var spans = target.getElementsByTagName("span");
	var lis = target.getElementsByTagName("li");
	for(var i = 0 ;i < spans.length ; i++){
		spans[i].index = i;//获取tab栏对应的索引号
		spans[i].onmouseover = function(){
			for(var j = 0 ; j < spans.length ; j++){
				//清除所有tab以及对应模块样式
				this.className = "";
				lis[this.index].className = "";
			}
			//添加当前鼠标滑过的tab以及对应模块的样式
			this.className = "current";
			lis[this.index].className = "show";
		}
	}}
// getElementsByClassName
function getClass(classname){
	//浏览器兼容时
    if(document.getElementsByClassName){
    	return document.getElementsByClassName(classname);
    }
    //浏览器不兼容时
    var arr = [];//存放符合的class
    var dom = document.getElementsByTagName("*");
    for(var i = 0 ; i < dom.length ; i++){
    	//分割当前dom所有的类名
    	var classArr = dom[i].className.split(" ");
    	for(var j = 0 ; j < classArr.length ; j++){
    		if(classArr[j] == classname){
    			arr.push(dom[i]);
    		}
    	}
    }
    return arr;}
// 隐藏函数
function hide(id){
	$(id).style.display = "none";
}
// 显示函数
function show(id){
	$(id).style.display = "block";
}
// 封装自己的scroll函数 scroll().top = scrollTop,scroll().left = scrollLeft
function scroll() {
    if(window.pageYOffset != null)  //  ie9+其他浏览器
    {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode == "CSS1Compat")  // 声明了 DTD
      // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
    {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return { //  剩下的肯定是怪异模式的
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}
// 封装自己的client函数 client().width = clientWisth,client().height = clientHeight
function client() {
    if(window.innerWidth != null)  //  ie9+其他浏览器
    {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    else if(document.compatMode === "CSS1Compat")  // 声明了 DTD 标准浏览器
      // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
    {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    return { //  剩下的肯定是怪异模式的
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}
//封装匀速运动函数
/*function animate(obj,target,step) {
    //步长可能为负值，负值往后退
    var speed = obj.offsetLeft < target ? step : -step;
    obj.timer = setInterval(function(){
        //当前位置与目标位置的差值
        var result = target - obj.offsetLeft;
        obj.style.left = obj.offsetLeft + speed +"px";
        //当差值小于步长时清除定时器，并且把没走完的一点距离补上 直接走到目标位置
        if(Math.abs(result) <= Math.abs(speed)){
            clearInterval(obj.timer);
            obj.style.left = target +"px";
        }
    },30);
}*/

//封装动画函数
function animate(obj,json,fn) {  
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;  // 用来判断是否停止定时器
        for(var attr in json){
            //开始遍历 json
           // console.log(attr);
            var current = 0;
            if(attr == "opacity")
            {
                current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
                //console.log(current);
            }
            else
            {
                current = parseInt(getStyle(obj,attr));
            }
           // console.log(current);
            var step = ( json[attr] - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //判断透明度
            if(attr == "opacity")  // 判断json是否存在opacity
            {
                 if("opacity" in obj.style)  // 判断浏览器是否支持opacity
                 {
                     obj.style.opacity = (current + step) /100;
                 }
                else
                 {  
                     obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";

                 }
            }
            else if(attr == "zIndex")
            {
                obj.style.zIndex = json[attr];
            }
            else
            {
                obj.style[attr] = current  + step + "px" ;
            }

            if(current != json[attr])
            {
                flag =  false;
            }
        }
        if(flag)  // 用于判断定时器的条件
        {
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },30)
}
function getStyle(obj,attr) {
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];  // 返回传递过来的某个属性
    }
    else
    {
        return window.getComputedStyle(obj,null)[attr];  // w3c 浏览器
    }
}