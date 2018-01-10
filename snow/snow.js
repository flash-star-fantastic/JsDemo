var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var H = canvas.height = window.innerHeight;
var W = canvas.width = window.innerWidth;
ctx.fillStyle = "#53B7F6";
var clearBg = function () {
    ctx.fillRect(0, 0, W, H);
};
clearBg();
var renderImg = function (x, y) {
    if (x === void 0) { x = 10; }
    if (y === void 0) { y = 10; }
    ctx.drawImage(snowImg, x, y, 42, 30);
};
var readStatus = false;
var snowImg = new Image();
snowImg.onload = function () {
    readStatus = true;
    renderImg(10, -25);
};
snowImg.src = 'snow.jpg';
var snowNum = 10;
var store = []; //存储雪花数据
var add = function () {
    var num = snowNum * Math.random() | 0;
    while (num--) {
        store.push({
            x: Math.random() * W | 0,
            y: 0,
            stepX: (Math.random() * 5 - 2) | 0,
            stepY: ((Math.random() * 8) | 0) + 2
        });
    }
}; //添加数据
var check = function (data) {
    return data.y >= H;
};
var render = function () {
    clearBg();
    var length = store.length;
    while (length--) {
        var _a = store[length], x = _a.x, y = _a.y, stepX = _a.stepX, stepY = _a.stepY;
        renderImg(x, y);
        store[length].x += stepX;
        store[length].y += stepY;
        if (check(store[length])) {
            store.splice(length, 1);
        }
    }
};
setInterval(function () {
    render();
}, 100);
setInterval(function () {
    add();
}, 1000);
//# sourceMappingURL=snow.js.map