// 在IE里面，只能获取显示声明的属性
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

function move(obj, json, callback) {
    clearInterval(obj.timer); // 先清后开
    obj.timer = setInterval(function () {
        var iBtn = true; // 开关，如果for的里面有一个没有到目标，就让开关为假。都到目标了，则不改变开关的状态，开关就是真的

        for (var attr in json) { // attr就是属性 target就是目标
            var target = json[attr];
            var iNow;

            if (attr === 'opacity') {
                iNow = getStyle(obj, 'opacity') * 100; // 0.3 * 100    当前的位置
            } else {
                iNow = parseInt(getStyle(obj, attr)); // 当前的位置
            }

            var dir = (target - iNow) / 10;
            dir = dir > 0 ? Math.ceil(dir) : Math.floor(dir);
            var speed = iNow + dir; // 下次应该运动到的位置

            if ((speed >= target && dir > 0) || (speed <= target && dir < 0)) {
                speed = target;
            }

            if (attr === 'opacity') {
                obj.style.opacity = speed / 100;
                obj.style.filter = 'alpha(opacity=' + speed + ')';
            } else {
                obj.style[attr] = speed + 'px';
            }

            if (speed !== target) {
                iBtn = false;
            }
        }

        if (iBtn) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 30);
}