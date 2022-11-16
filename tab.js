function Tab(id) {
    this.box = document.getElementById(id);
    this.span = this.box.getElementsByTagName('span');
    this.div = this.box.getElementsByTagName('div');
}

Tab.prototype.init = function () {
    var _this = this; // 这个this是对象
    for (var i = 0; i < this.span.length; i++) {
        this.span[i].index = i; // 自定义下标
        this.span[i].onmouseover = function () {
            _this.change(this);
        };
    }
}

Tab.prototype.change = function (obj) {
    // 1、所有的span去掉样式，所有的div隐藏
    for (var i = 0; i < this.span.length; i++) {
        this.span[i].className = '';
        this.div[i].className = '';
    }

    // 2、对应的span添加样式，对应的div显示
    obj.className = 'active';
    this.div[obj.index].className = 'show';
}

