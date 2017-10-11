//获取父盒子
var scroll = $("#scroll");
//创建节点
var circle = document.createElement("div");
//获取子节点
var lis = $("#ul").children;
//添加属性值（类名）
circle.setAttribute("class","circle");
scroll.appendChild(circle);
//根据图片张数即li个数添加小圆点即span个数
for(var i = 0 ; i < lis.length ; i++){
	var sp = document.createElement("span");
	sp.innerHTML = i + 1;
	circle.appendChild(sp);
}
var cirCild = circle.children;
cirCild[0].setAttribute("class","current-sp");
//鼠标滑动小圆点图片随着变化
var that;
for(var j = 0 ; j < cirCild.length ; j++){
	cirCild[j].index = j;
	cirCild[j].onmouseover = function(){
		that = this; //存放this 定时器中要用
		//定时器，滑动0.5秒后才会作用
		setTimeout(fn,500);
	
	function fn(){
		for(var k = 0 ; k < lis.length ; k++){
			lis[k].style.display = "none";
			lis[k].className = "";
			cirCild[k].className = "";
		}
		that.className = "current-sp";
		lis[that.index].className = "current";
		lis[that.index].style.display = "block";
	}}
	
}

//点击小三角切换图片与小圆点
var spans = $("span");
$("#arrowr").onclick = function(){
	for(var i = 0 ; i < lis.length - 1 ; i++){
		var x = lis[i].getAttribute('class');
		lis[i].style.display = "none";
		lis[i].className = "";
		spans[i].className = "";
		if(x == 'current'){
			lis[i+1].style.display = "block";
			lis[i+1].className = "current";
			spans[i+1].className = "current-sp";
			return false;
		}
	}
}
$("#arrowl").onclick = function(){
	for(var i = lis.length - 1 ; i > 0 ; i--){
		var x = lis[i].getAttribute('class');
		//alert(x);
		lis[i].style.display = "none";
		lis[i].className = "";
		spans[i].className = "";
		if(x == 'current'){
			lis[i-1].style.display = "block";
			lis[i-1].className = "current";
			spans[i-1].className = "current-sp";
			return false;
		}
	}
}
//定时器自动轮播图片
var timer = null;
timer = setInterval(fn,1000);

function fn(){
	//clearInterval(timer);
	for(var i = 0 ; i < lis.length; i++){
		var x = lis[i].getAttribute('class');
		lis[i].style.display = "none";
		lis[i].className = "";
		spans[i].className = "";
		if(x == 'current'){
			lis[i+1].style.display = "block";
			lis[i+1].className = "current";
			spans[i+1].className = "current-sp";
			return; //返回页面 return false终止处理后面的程序
		}
		if(i == lis.length-2){
			fnn();
			return;
		}
	}
	clearInterval(timer);
}

function fnn(){
	for(var k = 0 ; k < lis.length; k++){
		lis[k].style.display = "none";
		lis[k].className = "";
		spans[k].className = "";
	}
		lis[0].style.display = "block";
		lis[0].className = "current";
		spans[0].className = "current-sp";
}
scroll.onmouseover = function(){
	clearInterval(timer);
	$("#arrow").style.display = "block";
}
scroll.onmouseout = function(){
	clearInterval(timer);
	timer = setInterval(fn,1000);
	$("#arrow").style.display = "none";
}

//sfq
var sfqlis = $("#sfqBox").children[0].children;
for(var i=0;i<sfqlis.length;i++)
{
    sfqlis[i].style.backgroundImage = "url(images/"+(i+1)+".jpg)";
    sfqlis[i].onmouseover = function() {
        for(var i=0;i<sfqlis.length;i++)
        {
            animate(sfqlis[i],{width:100});
        }
        animate(this,{width:800});
    }
    sfqlis[i].onmouseout = function(){
        for(var i=0;i<sfqlis.length;i++)
        {
            animate(sfqlis[i],{width:240});
        }
     }
}
//无缝滚动轮播
function wfgd(){
	var yuul = document.getElementById("yuul");
	var yudiv = document.getElementById("outerdiv");
		yuul.appendChild(yuul.children[0].cloneNode(true));
	var timer = null;
	var num = 0;
	timer = setInterval(play,20);
	function play(){
		num--;
		num = num <= -1500 ? 0 : num ;
		yuul.style.left = num + "px";
	}
	yuul.onmouseover = function(){
		clearInterval(timer);
	}
	yuul.onmouseout = function(){
		timer = setInterval(play,20);
	}
}
//旋转木马部分
function xzdemo(){
	var lis = $("#xzslide").getElementsByTagName("li");  // 所有要操作的盒子
	$("#xzwrap").onmouseover = function() {  // 鼠标经过显示和隐藏 左右两个箭头
	     animate($("#xzarrow"),{'opacity':100});
	}
	$("#xzwrap").onmouseout = function() {
	    animate($("#xzarrow"),{'opacity':0});
	}
	// 存储图片的信息
	var json = [
	    {   //  1
	        width:400,
	        top:20,
	        left:50,
	        opacity:20,
	        z:2
	    },
	    {  // 2
	        width:500,
	        top:90,
	        left:0,
	        opacity:80,
	        z:3
	    },
	    {   // 3
	        width:600,
	        top:150,
	        left:200,
	        opacity:100,
	        z:4
	    },
	    {  // 4
	        width:500,
	        top:90,
	        left:500,
	        opacity:80,
	        z:3
	    },
	    {   //5
	        width:400,
	        top:20,
	        left:550,
	        opacity:20,
	        z:2
	    }
	];
	var jieliu = true; //  用来控制函数节流的 变量
	var as = $("#xzarrow").children;
	change();
	for(var k in as)
	{
	    as[k].onclick = function() {
	        if(this.className == "prev")
	        {
	            if(jieliu == true)
	            {
	                change(false);
	                jieliu = false;  // 点击完毕取反
	            }

	        }
	        else
	        {
	            if(jieliu == true)
	            {
	                change(true);
	                jieliu = false;  // 点击完毕取反
	            }
	        }
	    }
	}

	function change(flag) {
	    if(flag)
	    {
	        // 删除最后一个json同时添加到json 第一个位置
	         json.unshift(json.pop());
	    }
	    else
	    {
	        //移除第一个同时放到json最后一个
	        json.push(json.shift());
	    }
	  		//遍历json
	    for(var i=0;i<json.length; i++)
	    {
	        animate(lis[i],{
	            width: json[i].width,
	            top: json[i].top,
	            left: json[i].left,
	            opacity:json[i].opacity,
	            zIndex:json[i].z
	        },function(){ jieliu = true;})  // 回调函数控制函数节流
	    }
	}
}


