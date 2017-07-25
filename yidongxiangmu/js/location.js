/**
 * Created by administrater on 2017/6/11.
 */

function pro() {
    var location = document.querySelector('#location');
    var province = remote_ip_info["province"];
    var city = remote_ip_info["city"];
    location.innerHTML = province;
}

pro();
