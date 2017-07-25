/**
 * Created by administrater on 2017/6/2.
 */
/**
 * Created by yangyang on 2017/4/30.
 */
/**
 * Created by yangyang on 2017/5/8.
 */
window.onload = function () {

    /*轮播图*/
    var oSlide = document.querySelector('.slide');
    var oUl = oSlide.querySelector('ul');
    oUl.innerHTML += oUl.innerHTML;
    var aLi = oUl.querySelectorAll('li');
    var aTab = oSlide.querySelectorAll('.tab span');

    oUl.style.width = aLi.length+'00%';
    aTab[0].className = 'on';

    var timer = 0;/*定时器开关*/
    var startPoint = 0;/*手指滑动的开始x坐标*/
    var startX = 0;/*手指滑动的X结束坐标*/
    var translateX = 0;/*滑动距离*/
    oSlide.addEventListener('touchstart',function (e) {
        clearInterval(timer);
        tab();
        oUl.style.transition = '';/*过度*/
        var l = translateX;
        var num = Math.round(-l/oSlide.offsetWidth);
        if(num == 0){
            num = aTab.length +1;
        }
        if(num == aLi.length -1){
            num = aTab.length;
        }
        console.log(num);
        translateX = -num*oSlide.offsetWidth;
        oUl.style.WebkitTransform = oUl.style.transform = cssTransform(oUl,'translateX',translateX );
        startPoint = e.changedTouches[0].pageX;
        startX = translateX;
    });
    oSlide.addEventListener('touchmove',function (e) {
        var nowPoint = e.changedTouches[0].pageX;
        var disX = nowPoint - startPoint;
        translateX = startX + disX;
        var l = translateX;
        var num= Math.round(-l/oSlide.offsetWidth);
        oUl.style.WebkitTransform = oUl.style.transform = cssTransform(oUl,'translateX',translateX );
    });
    oSlide.addEventListener('touchend',function (e) {
        var l = translateX;
        var num= Math.round(-l/oSlide.offsetWidth);
        translateX = -num*oSlide.offsetWidth;
        oUl.style.transition = '0.5s';
        oUl.style.WebkitTransform = oUl.style.transform = 'translateX('+translateX+'px)'

        tab();
        autoPlay();
    });


    autoPlay();
    function tab(){
        var l = translateX;
        var num = Math.round(-l/oSlide.offsetWidth);
        for(var i=0;i<aTab.length;i++){
            aTab[i].className = '';
        }
        aTab[num%aTab.length].className = 'on';
    }

    function autoPlay(){
        timer = setInterval(function(){
            var l = translateX;
            var num = Math.round(-l/oSlide.offsetWidth);
            num++;
            if(num == 0){
                num = aTab.length;
            }
            if(num == aLi.length -1){
                num = aTab.length -1;
            }
            translateX = -num*oSlide.offsetWidth;
            tab();
            oUl.style.WebkitTransform = oUl.style.transform = cssTransform(oUl,'translateX',translateX );
        },2000);
    }

        /*滑动导航*/
    (function () {
        var nav = document.querySelector('.header .hd-move');
        var oUl = nav.querySelector('ul');

        var startPoint = 0;
        var startX = 0;

        var step = 1;

        var maxX = nav.clientWidth - oUl.offsetWidth;/*值为负*/
        //console.log( maxX );

        var lastX = 0;       // 上次的距离
        var lastTime = 0;    // 上次的时间戳
        var lastDis = 0;
        var lastTimeDis = 0;

       // cssTransform(oUl,'translateX',0);
        nav.addEventListener('touchstart',function (e) {
            startPoint = e.changedTouches[0].pageX;
            startX = cssTransform(oUl,'translateX');

            step = 1;


            lastX = startX;

            lastTime = new Date().getTime();
            lastDis = 0;
            lastTimeDis = 0;
        });

        nav.addEventListener('touchmove',function (e) {
            var nowPoint = e.changedTouches[0].pageX;
            var disX = nowPoint - startPoint;/*值正负不定*/
            var l = disX+startX;/*l 是ul应该移动后的左边的x坐标*/
            var nowTime = new Date().getTime();
            if( l>0 ){
                step =1- l/nav.clientWidth;

                l = parseInt(l*step);
                //l=0;
                //console.log(l)
            }
            if( l < maxX ){/**/
                var L = maxX -l;
                step = 1 - L/nav.clientWidth;
                L = parseInt( L*step );
                l = maxX - L;
                //console.log(l)
                //l = maxX;
            }

            lastDis = l - lastX;
            lastTimeDis = nowTime - lastTime;


            lastX = l;
            lastTime = nowTime;


            cssTransform(oUl,'translateX',l);
        });

        nav.addEventListener('touchend',function (e) {

            var speed = ( lastDis / lastTimeDis )*200;
            var l = cssTransform(oUl,'translateX');
            var target = l+speed;

            if( target>0 ){
                target = 0;
            }
            if ( target< maxX ){
                target = maxX;
            }
            oUl.style.WebkitTransition = oUl.style.transition = 'transform 600ms cubic-bezier(0.1, 0.57, 0.1, 1)';
            cssTransform(oUl,'translateX',target);
            //console.log( speed );
            /*
             *  缓冲原理
             *   有移动的最后一次速度有关系
             *   速度快 走的距离就多
             *   速度慢 走的距离就少
             *
             *   速度 = 距离 / 时间
             *
             *   距离 = 上次位置 和 移动后位置的差值
             *   时间 = 上次时间 和 移动后时间的差值
             * */
        });
    })();

};