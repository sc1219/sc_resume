/**
 * Created by 76419 on 2017/5/7.
 */
function main(){
    (function(){
        'use strict';
        //首页面响应式高度
        function responsiveHeight(){
            var windowHeight=$(window).height();
            $("#top-intro").css("height",windowHeight);
            $("#contact").css("height",windowHeight);
        }
        responsiveHeight();
        $(window).resize(responsiveHeight)

        //滚动条滚动动作
        $(window).scroll(
            function () {
                //导航栏固定
                var top=parseInt($("#top-intro").css("height"));
                var $scrollC=$(window).scrollTop();
                var $nav=$("#nav");
                var $about=$("#about");
                var navHeight=parseInt($nav.css("height"));
                if($scrollC>=top){
                    $about.css("marginTop",navHeight);
                    $nav.addClass("navbar-fixed-top");
                }else{
                    $nav.removeClass("navbar-fixed-top");
                    $about.css("marginTop",0);
                }
                //圆形进度条动画
                var scrollHeight=top+parseInt($about.css("height"))+parseInt($("#skills").css("height"));
                var $skillR=$(".skill-right .skill-circle");
                var $skillL=$(".skill-left .skill-circle");
                if($scrollC>=(top+100)&&$scrollC<=scrollHeight){
                    $skillR.addClass("skill-circle-right");
                    $skillL.each(
                        function(i,dom){
                            var html=$(dom).parent().next().next().html();
                            html="skill-"+html;
                            $(dom).addClass(html)
                        }
                    )
                }else{
                    $skillR.removeClass("skill-circle-right");
                    $skillL.each(
                        function(i,dom){
                            var html=$(dom).parent().next().next().html();
                            html="skill-"+html;
                            $(dom).removeClass(html)
                        }
                    )
                }
            }
        );

        //平滑跳转函数
        function jumpSmooth($obj){
            $obj.each(function(i,dom){
                $(dom).click(function(e){
                    e.preventDefault();
                    $('body,html').animate({
                        scrollTop: $($(this).attr('href')).offset().top
                    },1000);
                })
            });
        }
        jumpSmooth($("body a.jump"));

        //图片轮播
        function carousel($obj,n,interval){
            var index=0;
            n=n||2;
            interval=interval||2000;
            function task(){
                var xwidth=$obj.find(".myCarousel-item").width();
                var $moveObj=$obj.find(".myCarousel-category");
                var pointer=$obj.find(".myCarousel-pointer a");
                index++;
                if(index==0){
                    $moveObj.css({
                        "transform":"translate("+(-xwidth*index)+"px)"
                    });
                    $(pointer[index]).addClass("active").siblings().removeClass("active");
                }else{
                    index=index>(n-1)?0:index;
                    $moveObj.css({
                        "transform":"translate("+(-xwidth*index)+"px)",
                        "transition":"all 0.5s linear"
                    });
                    $(pointer[index]).addClass("active").siblings().removeClass("active");
                }
            }
            setInterval(
                task,interval
            )
        }
        carousel($(".myCarousel"),3,3000);
        //处理响应式轮播宽度
        function responseCarouselWidth(){
            var w=$(".myCarousel-outer").css("width");
            $(".myCarousel-item").css("width",w);
            $(".myCarousel-category").css("left",w);
        }
        responseCarouselWidth();
    }())
}
$(main());
