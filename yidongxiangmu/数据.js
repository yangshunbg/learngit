/**
 * Created by administrater on 2017/6/9.
 */
//以下代码仅为演示用,具体传入参数请参看接口描述详情页.
//需要引用jquery库 ,比如<script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>

function formatterDateTime() {
    var date=new Date()
    var month=date.getMonth() + 1
    var datetime = date.getFullYear()
        + ""// "年"
        + (month >= 10 ? month : "0"+ month)
        + ""// "月"
        + (date.getDate() < 10 ? "0" + date.getDate() : date
            .getDate())
        + ""
        + (date.getHours() < 10 ? "0" + date.getHours() : date
            .getHours())
        + ""
        + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
            .getMinutes())
        + ""
        + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
            .getSeconds());
    return datetime;
}

$.ajax({
    type: 'post',
    url: 'https://route.showapi.com/181-1',
    dataType: 'jsonp',
    data: {
        "showapi_timestamp": formatterDateTime(),
        "showapi_appid": 'just_test_app', //这里需要改成自己的appid
        "showapi_sign": 'just_test_sign'  //这里需要改成自己的应用的密钥secret，

    },
    jsonp: 'jsonpcallback', //这个方法名很重要,不能改变
    error: function(XmlHttpRequest, textStatus, errorThrown) {
        alert("操作失败!");
    },
    success: function(result) {
        console.log(result) //console变量在ie低版本下不能用
        alert(result.showapi_res_code)
    }
});