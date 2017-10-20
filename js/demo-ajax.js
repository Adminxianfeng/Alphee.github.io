function getWeather(data){
        var d = data.weather;
        var info = $('#info');
        info.text('');
        
        for(var i=0;i<d.length;i++){
            var date = d[i].date;
            var day = d[i].info.day;
            var night = d[i].info.night;
            var tag = '';
            tag += '<span>日期：'+date+'</sapn><ul>';
            tag += '<li>白天天气：'+day[1]+'</li>'
            tag += '<li>白天温度：'+day[2]+'</li>'
            tag += '<li>白天风向：'+day[3]+'</li>'
            tag += '<li>白天风速：'+day[4]+'</li>'
            tag += '</ul>';

            tag += '<ul>';
            tag += '<li>夜间天气：'+night[1]+'</li>'
            tag += '<li>夜间温度：'+night[2]+'</li>'
            tag += '<li>夜间风向：'+night[3]+'</li>'
            tag += '<li>夜间风速：'+night[4]+'</li>'
            tag += '</ul>';
            var div = $('<div></div>');
            div.html(tag);
            info.append(div);
            
        }
    }
    function loadCity2(data){
        var townCode = data[0][1];
        var weatherUrl = 'http://cdn.weather.hao.360.cn/api_weather_info.php?app=hao360&_jsonp=getWeather&code='+townCode;
        var weatherScript = $('<script><\/script>');
        weatherScript.attr('src',weatherUrl);
        $('body').append(weatherScript);
    }
    window.onload = function(){
        //天气查询
        var citys = ['南京','无锡','镇江','苏州','南通','扬州','盐城','徐州','淮安','连云港','常州','泰州','宿迁'];
        var citySel = $('#city');
        var btn = $('#btn');
        citySel.change(function(){
            $('#info').text('');
        });
        btn.on('click',function(){
            var index = $('option:selected', citySel).index()+1;
            index < 10 ? index = '0' + index : index;
            var codeurl = 'http://cdn.weather.hao.360.cn/sed_api_area_query.php?grade=town&_jsonp=loadCity2&code=19'+index;
            var codescript = $("<script><\/script>");
            codescript.attr('src',codeurl);
            $('body').append(codescript);
        });
        for(var i = 0 ; i < citys.length; i++){
            var option = $('<option></option>');
            option.text(citys[i]);
            citySel.append(option);
        }
        //智能提示
        var keyWord = $('#keyWord');
        function search(){
            var kw = $(this).val();
            var searchUrl = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+kw;
            querySearch(searchUrl);
        }
        keyWord.on({'keyup':search,
        'focus':search,
        });
            $('body').mousedown(function(e) {
                if(e.target.id != 'list'&& e.target.parentNode.parentNode.id != 'list'){
                    $('#list').css('display','none');
                }
            });
        function querySearch(url){
            $('#list').text('');
            $.ajax({
                type: 'get',
                async: true,
                url: url,
                dataType: 'jsonp',
                jsonp:'cb',
                success: function(data){
                    var tag = '<ul>';
                    for(var i=0;i<data.s.length;i++){
                        tag += '<li>'+data.s[i]+'</li>';
                    }
                    tag += '</ul>';
                    $('#list').html(tag).show();
                    $('#list').find('li').hover(function(){
                        $(this).css('background','lightGreen');
                    },function(){
                        $(this).css('background','lightGray');
                    });
                }
            })
        }
        $(document).on('click','#list li',function(e){
            keyWord.val($(this).text());
            $(this).data('key','0');
            $("#list").css('display','none');
        });
    
    }