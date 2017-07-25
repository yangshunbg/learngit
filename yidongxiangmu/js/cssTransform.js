/**
 * Created by aflyi on 2017/5/8.
 */
window.onload = function() {
    function cssTransform(obj, attr, val) {
        if (!obj.transition) {
            obj.transform = {};
        }

        //console.log( obj.transform )
        if (arguments.length === 3) { // 设置
            obj.transform[attr] = val;
            var strVal = '';
            for (var key in obj.transform) {
                switch (key) {
                    case 'rotate':
                    case 'rotateX':
                    case 'rotateY':
                    case 'skewX':
                    case 'skewY':
                        strVal += key + '(' + obj.transform[key] + 'deg) ';
                        break;
                    case 'translate':
                    case 'translateX':
                    case 'translateY':
                        strVal += key + '(' + obj.transform[key] + 'px) ';
                        break;
                    case 'scale':
                    case 'scaleX':
                    case 'scaleY':
                        strVal += key + '(' + obj.transform[key] + ') ';
                        break;
                }
                obj.style.WebkitTransform = obj.style.transform = strVal;
            }
        } else {  //获取
            val = obj.transform[attr];
            if (attr === 'scale' || attr === 'scaleX' || attr === 'scaleY') {
                val = 1;
            } else {
                val = 0;
            }
            return val;
        }
    }
}

















