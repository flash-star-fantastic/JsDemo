var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var H = window.innerHeight;
var W = window.innerWidth;
ctx.fillStyle = "#000";
var pixelRatio = window.devicePixelRatio || 1;
var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;
var ratio = pixelRatio / backingStoreRatio;
canvas.width = W * ratio;
canvas.height = H * ratio;
canvas.style.width = W + 'px';
canvas.style.height = H + 'px';
ctx.scale(ratio, ratio);
var clearBg = function () {
    ctx.fillRect(0, 0, W, H);
};
clearBg();
var getSize = function () {
    var w = (Math.random() * 21 + 21) | 0;
    var h = (w * 5 / 7) | 0;
    return { w: w, h: h };
};
var renderImg = function (x, y, w, h) {
    if (x === void 0) { x = 10; }
    if (y === void 0) { y = 10; }
    if (w === void 0) { w = 42; }
    if (h === void 0) { h = 30; }
    ctx.drawImage(snowImg, x, y, w, h);
};
var readStatus = false;
var snowImg = new Image();
snowImg.onload = function () {
    readStatus = true;
};
snowImg.src = 'snow.jpg';
var snowNum = 8;
var store = []; //存储雪花数据
var add = function () {
    var num = snowNum * Math.random() | 0;
    while (num--) {
        var _a = getSize(), w = _a.w, h = _a.h;
        store.push({
            x: Math.random() * W | 0,
            y: 0,
            stepX: (Math.random() * 5 - 2) | 0,
            stepY: ((Math.random() * 8) | 0) + 2,
            w: w,
            h: h
        });
    }
}; //添加数据
var check = function (data) {
    return data.y >= H;
};
var render = function () {
    if (!readStatus)
        return;
    clearBg();
    var length = store.length;
    while (length--) {
        var _a = store[length], x = _a.x, y = _a.y, stepX = _a.stepX, stepY = _a.stepY, w = _a.w, h = _a.h;
        renderImg(x, y, w, h);
        store[length].x += stepX;
        store[length].y += stepY;
        if (check(store[length])) {
            store.splice(length, 1);
        }
    }
};
var addTime = 0;
var lastTime = 0;
var animotion = function (timestamp) {
    if (timestamp === void 0) { timestamp = 0; }
    if (timestamp - lastTime > 50) {
        render();
        lastTime = timestamp;
    }
    if (timestamp - addTime > 1000) {
        add();
        addTime = timestamp;
    }
    try {
        window.requestAnimationFrame(animotion);
    }
    catch (_a) {
        alert('你的浏览器不支持rAF,请更新或更换浏览器');
    }
};
animotion();
