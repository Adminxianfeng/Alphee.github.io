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
//封装动画函数
function animate(obj,json,fn) {  
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;  // 用来判断是否停止定时器
        for(var attr in json){
            //开始遍历 json
            var current = 0;
            if(attr == "opacity")
            {
                current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
            }
            else
            {
                current = parseInt(getStyle(obj,attr));
            }
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