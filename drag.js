function drag(obj) {
    // 按下
    obj.onmousedown = function (ev) {
        var ev = ev || event;

        // 兼容IE8及以下，设置全局捕获
        if (obj.setCapture) {
            obj.setCapture();
        }

        // 可视区的宽高
        var clientW = document.documentElement.clientWidth;
        var clientH = document.documentElement.clientHeight;

        // 盒子的宽高
        var boxW = obj.clientWidth;
        var boxH = obj.clientHeight;

        var disX = ev.clientX - obj.offsetLeft; // 鼠标到盒子的距离
        var disY = ev.clientY - obj.offsetTop;

        // 拖动
        document.onmousemove = function (ev) {
            var ev = ev || event;
            var x = ev.clientX - disX; // left值和top值
            var y = ev.clientY - disY;

            if (x < 0) {
                x = 0;
            } else if (x > clientW - boxW) {
                x = clientW - boxW
            }
            if (y < 0) {
                y = 0;
            } else if (y > clientH - boxH) {
                y = clientH - boxH;
            }

            obj.style.left = x + 'px';
            obj.style.top = y + 'px';
        }

        // 抬起
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            // 兼容IE8及以下，释放全局捕获
            if (obj.releaseCapture) {
                obj.releaseCapture();
            }
        }

        return false;
    }
}