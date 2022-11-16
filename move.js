// 封装一个方法，用于获取元素的样式
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        // 标准浏览器
        return getComputedStyle(obj)[attr];
    } else {
        // IE8及以下
        return obj.currentStyle[attr];
    }
}

// 封装运动框架
// 参数：元素 属性 目标 回调
function move(obj, attr, target, callback) {
    clearInterval(obj.timer); // 先清后开

    obj.timer = setInterval(function () {
        var speed = parseInt(getStyle(obj, attr)); // 取得当前的位置
        var dir = speed < target ? 10 : -10; // 我们在程序内部判断
        speed += dir; // 这次定时器box应该运动到的位置

        if ((speed >= target && dir > 0) || (speed <= target && dir < 0)) {
            speed = target;
        }

        obj.style[attr] = speed + 'px'; // 把这个值再赋回去

        // 如果speed === target，则运动完成了
        if (speed === target) {
            clearInterval(obj.timer);
            callback && callback(); // 如果函数存在 就执行函数    函数名()
        }
    }, 30);
}

