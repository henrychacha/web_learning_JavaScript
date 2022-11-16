// 参数：请求的方式 地址 数据 成功的回调
function ajax(method, url, data, callback) {
    var xhr = new XMLHttpRequest();

    if (method === 'get') {
        // get请求
        if (data) {
            url += '?' + data;
        }
        xhr.open(method, url, true);
        xhr.send();
    } else {
        // post请求
        xhr.open(method, url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        if (data) {
            xhr.send(data);
        } else {
            xhr.send();
        }
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // 成功
                callback && callback(xhr.responseText);
            } else {
                // 失败 throw抛出一个错误对象
                throw new Error('请求失败，失败原因是：' + xhr.status);
            }
        }
    }
}