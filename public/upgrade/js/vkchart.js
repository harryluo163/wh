function VKChart(t) {
    this.vkContent = $("#" + t), this.ctx, this.data = {items: []}, this.temp = {
        startX: 0,
        startTime: 0,
        dataShowCount: 30,
        dataEndIndex: -1,
        minPrice: 0,
        maxDiff: 0,
        maxVolume: 0,
        maxCloseDiff: 0
    }, this.allData;
    var o = this.vkContent.width(), i = this.vkContent.height();
    this.options = {
        dateTimeType: "time",
        region: {x: 0, y: 65.5, width: o, height: i - 160},
        priceLineColor: "#6568FF",
        middleLineColor: "#473F49",
        otherSplitLineColor: "#473F49",
        borderColor: "#817F82",
        tipColor: "white",
        horizontalLineCount: 3,
        verticalLineCount: 1,
        maxDotsCount: 120,
        timeCount: 5,
        fallColor: "#5ece96",
        riseColor: "#a95263",
        normalColor: "#E67E65",
        yScalerFont: "10px 宋体",
        volumeHeight: 60,
        volumeMarginTop: 7
    }
}
VKChart.Type = {mins: 1, kline: 2}, VKChart.Util = {
    paintLine: function (t, o, i, e, n, a) {
        t.beginPath(), t.strokeStyle = a, t.lineWidth = 1, t.moveTo(o, i), t.lineTo(e, n), t.stroke()
    }, getKlineTimeString: function (t, o) {
        return "time" == t ? moment(o).format("HH:mm") : "date" == t ? moment(o).format("MM-DD") : void 0
    }
}, VKChart.prototype = {
    paint: function (t, o) {
        var i = this;
        i.init(), i.allData = t, i.repaint(t, o), o == VKChart.Type.kline && i.bindEvent()
    }, repaint: function (t, o) {
        var i = this;
        i.ctx.clearRect(0, i.options.region.y, i.options.region.width, i.vkContent.height() - i.options.region.y), o == VKChart.Type.mins ? i.data = t : o == VKChart.Type.kline && (-1 == i.temp.dataEndIndex && (i.temp.dataEndIndex = t.items.length - 1), i.data.items = t.items.slice(i.temp.dataEndIndex + 1 - i.temp.dataShowCount, i.temp.dataEndIndex + 1)), i.paintTopText(), i.paintTime(), o == VKChart.Type.mins ? i.paintMins() : o == VKChart.Type.kline && i.paintKline(), i.paintVolume()
    }, init: function () {
        var t = this;
        t.vkContent.html("");
        var o = "<div id='vkY' style='display:none;z-index:1000;position: absolute;width: 1px;height:" + (this.options.region.height + this.options.volumeHeight) + "px;top:" + this.options.region.y + "px;background:" + this.options.tipColor + ";'></div>";
        o = o + "<div id='vkX' style='display:none;z-index:1000;position: absolute;height: 1px;width:" + this.options.region.width + "px;left:" + this.options.region.x + "px;background:" + this.options.tipColor + ";'></div>", o = o + "<canvas style='z-index: 999; position: absolute;' width='" + t.vkContent.width() + "' height='" + t.vkContent.height() + "'></canvas>", t.vkContent.html(o);
        var i = t.vkContent.find("canvas")[0];
        t.ctx = i.getContext("2d"), t.ctx.backgroundAlpha = 0
    }, paintVolume: function () {
        var t = this;
        $.each(t.data.items, function (o, i) {
            var e = t.options.region.width / t.data.items.length,
                n = i.volume / t.temp.maxVolume * (t.options.volumeHeight - t.options.volumeMarginTop),
                a = e * o + .1 * e, l = .8 * e,
                s = t.options.volumeHeight - n + t.options.region.y + t.options.region.height, r = i.close,
                p = 0 == o ? i.close : t.data.items[o - 1].close, h = r > p, m = p > r,
                d = h ? t.options.riseColor : m ? t.options.fallColor : t.options.normalColor;
            t.ctx.fillStyle = d, t.ctx.fillRect(a, s, l, n)
        })
    }, paintTime: function () {
        for (var t = this.data, o = this.ctx, i = this.options, e = new Array, n = t.items.length, a = Math.round(n / i.timeCount), l = 0; l < i.timeCount; l++)e.push(VKChart.Util.getKlineTimeString(this.options.dateTimeType, new Date(t.items[n - 1 - l * a].date))), l == i.timeCount - 1 && n - 1 - l * a > .6 * a && e.push(VKChart.Util.getKlineTimeString(this.options.dateTimeType, new Date(t.items[0].date)));
        e = e.reverse();
        var s = parseInt(e.length / 2), r = Math.floor(i.region.width / (e.length - 1));
        $.each(e, function (t, e) {
            var n = r * t, a = i.region.y + i.region.height + i.volumeHeight;
            o.font = "12px 宋体", o.fillStyle = "#917295", o.textBaseline = "top", o.textAlign = s > t ? "left" : t == s ? "center" : "right", o.fillText(e, n, a)
        })
    }, paintMins: function () {
        var t = this;
        t.ctx.beginPath(), t.ctx.strokeStyle = t.options.borderColor, t.ctx.rect(t.options.region.x, t.options.region.y, t.options.region.width, t.options.region.height), t.ctx.stroke();
        for (var o = (t.options.horizontalLineCount + t.options.horizontalLineCount % 2) / 2, i = t.options.horizontalLineCount + 1, e = 1; e <= t.options.horizontalLineCount; e++) {
            var n = e == o ? t.options.middleLineColor : t.options.otherSplitLineColor,
                a = t.options.region.y + t.options.region.height * e / i;
            VKChart.Util.paintLine(t.ctx, t.options.region.x, a, t.options.region.width, a, n)
        }
        for (var l = t.options.verticalLineCount + 1, e = 1; e <= t.options.verticalLineCount; e++) {
            var s = t.options.region.x + t.options.region.width * e / l;
            VKChart.Util.paintLine(t.ctx, s, t.options.region.y, s, t.options.region.y + t.options.region.height, t.options.otherSplitLineColor)
        }
        var r = t.data.items[0].close;
        $.each(t.data.items, function (o, i) {
            var e = Math.abs(r - i.close);
            t.temp.maxCloseDiff = Math.max(e, t.temp.maxCloseDiff), t.temp.maxVolume = Math.max(t.temp.maxVolume, i.volume)
        }), t.temp.minPrice = r - t.temp.maxCloseDiff;
        var p = t.options.region.width / t.data.items.length;
        t.ctx.beginPath(), t.ctx.strokeStyle = t.options.priceLineColor, t.ctx.lineWidth = 1, t.ctx.moveTo(t.options.region.x, t.options.region.height / 2 + t.options.region.y), $.each(t.data.items, function (o, i) {
            var e = p * o + .5 * p,
                n = t.options.region.height - (i.close - t.temp.minPrice) / 2 / t.temp.maxCloseDiff * t.options.region.height + t.options.region.y;
            t.ctx.lineTo(e, n)
        }), t.ctx.stroke();
        for (var h = [], m = [], d = 2 * t.temp.maxCloseDiff / (t.options.horizontalLineCount + 1), e = t.options.horizontalLineCount + 1; e >= 0; e--) {
            var g = t.temp.minPrice + e * d;
            h.push(g.toFixed(2));
            var c = 100 * (g - r) / r;
            m.push(c.toFixed(2) + "%")
        }
        for (var e = 0; e < h.length; e++) {
            var a = t.options.region.y + e * t.options.region.height / i,
                n = o > e ? t.options.riseColor : e == o ? t.options.normalColor : t.options.fallColor;
            t.ctx.font = t.options.yScalerFont, t.ctx.fillStyle = n, t.ctx.textBaseline = "top", t.ctx.textAlign = "left", t.ctx.fillText(h[e], 0, a)
        }
        for (var e = 0; e < m.length; e++) {
            var a = t.options.region.y + e * t.options.region.height / i,
                n = o > e ? t.options.riseColor : e == o ? t.options.normalColor : t.options.fallColor;
            t.ctx.font = t.options.yScalerFont, t.ctx.fillStyle = n, t.ctx.textBaseline = "top", t.ctx.textAlign = "right", t.ctx.fillText(m[e], t.options.region.width, a)
        }
        t.vkContent.find("canvas").bind("touchstart", function (t) {
            t.preventDefault()
        }), t.vkContent.find("canvas").bind("mousemove touchmove", function (o) {
            var i = 0;
            i = "mousemove" == o.type ? o.clientX - t.vkContent.offset().left : o.originalEvent.changedTouches[0].clientX - t.vkContent.offset().left;
            var e = Math.floor(i / t.options.region.width * t.data.items.length);
            e = e >= t.data.items.length ? t.data.items.length - 1 : e;
            var n = e * t.options.region.width / t.data.items.length + t.options.region.width / t.data.items.length / 2,
                a = t.options.region.height - (t.data.items[e].close - t.temp.minPrice) / 2 / t.temp.maxCloseDiff * t.options.region.height + t.options.region.y - .5;
            t.paintTopText(e), t.vkContent.find("#vkY").css("display", "block"), t.vkContent.find("#vkX").css("display", "block"), t.vkContent.find("#vkY").css("left", n), t.vkContent.find("#vkX").css("top", a)
        }), t.vkContent.find("canvas").bind("touchend mouseleave", function (o) {
            t.paintTopText(), t.vkContent.find("#vkY").css("display", "none"), t.vkContent.find("#vkX").css("display", "none")
        })
    }, paintKline: function () {
        var t = this;
        t.ctx.beginPath(), t.ctx.strokeStyle = t.options.borderColor, t.ctx.rect(t.options.region.x, t.options.region.y, t.options.region.width, t.options.region.height), t.ctx.stroke();
        for (var o = (t.options.horizontalLineCount + t.options.horizontalLineCount % 2) / 2, i = t.options.horizontalLineCount + 1, e = 1; e <= t.options.horizontalLineCount; e++) {
            var n = e == t.horizontalMiddleIndex ? t.options.middleLineColor : t.options.otherSplitLineColor,
                a = t.options.region.y + t.options.region.height * e / i;
            VKChart.Util.paintLine(t.ctx, t.options.region.x, a, t.options.region.width, a, n)
        }
        for (var l = t.options.verticalLineCount + 1, e = 1; e <= t.options.verticalLineCount; e++) {
            var s = t.options.region.x + t.options.region.width * e / l;
            VKChart.Util.paintLine(t.ctx, s, t.options.region.y, s, t.options.region.y + t.options.region.height, t.options.otherSplitLineColor)
        }
        var r = t.data.items[0].close;
        $.each(t.data.items, function (o, i) {
            var e = Math.abs(r - i.high), n = Math.abs(r - i.low), a = Math.max(e, n);
            t.temp.maxDiff = Math.max(a, t.temp.maxDiff), t.temp.maxVolume = Math.max(t.temp.maxVolume, i.volume)
        }), t.temp.minPrice = r - t.temp.maxDiff;
        var p = t.options.region.width / t.data.items.length;
        t.ctx.beginPath(), t.ctx.strokeStyle = t.options.priceLineColor, t.ctx.lineWidth = 1, t.ctx.moveTo(t.options.region.x, t.options.region.height / 2 + t.options.region.y);
        var h = t.options.region.width / t.data.items.length * .8;
        $.each(t.data.items, function (o, i) {
            var e = p * o,
                n = t.options.region.height - (i.high - t.temp.minPrice) / 2 / t.temp.maxDiff * t.options.region.height + t.options.region.y,
                a = t.options.region.height - (i.low - t.temp.minPrice) / 2 / t.temp.maxDiff * t.options.region.height + t.options.region.y,
                l = t.options.region.height - (i.open - t.temp.minPrice) / 2 / t.temp.maxDiff * t.options.region.height + t.options.region.y,
                s = t.options.region.height - (i.close - t.temp.minPrice) / 2 / t.temp.maxDiff * t.options.region.height + t.options.region.y,
                r = i.close > i.open, m = i.close < i.open,
                d = r ? t.options.riseColor : m ? t.options.fallColor : t.options.normalColor;
            VKChart.Util.paintLine(t.ctx, e + .6 * h, n, e + .6 * h, a, d), t.ctx.fillStyle = d, r ? t.ctx.fillRect(e + .1 * h, s, h, 1 > l - s ? 1 : l - s) : t.ctx.fillRect(e + .1 * h, l, h, 1 > s - l ? 1 : s - l)
        });
        for (var m = [], d = [], g = 2 * t.temp.maxDiff / (t.options.horizontalLineCount + 1), e = t.options.horizontalLineCount + 1; e >= 0; e--) {
            var c = t.temp.minPrice + e * g;
            m.push(c.toFixed(2));
            var f = 100 * (c - r) / r;
            d.push(f.toFixed(2) + "%")
        }
        for (var e = 0; e < m.length; e++) {
            var a = t.options.region.y + e * t.options.region.height / i,
                n = o > e ? t.options.riseColor : e == o ? t.options.normalColor : t.options.fallColor;
            t.ctx.font = t.options.yScalerFont, t.ctx.fillStyle = n, t.ctx.textBaseline = "top", t.ctx.textAlign = "left", t.ctx.fillText(m[e], 0, a)
        }
        for (var e = 0; e < d.length; e++) {
            var a = t.options.region.y + e * t.options.region.height / i,
                n = o > e ? t.options.riseColor : e == o ? t.options.normalColor : t.options.fallColor;
            t.ctx.font = t.options.yScalerFont, t.ctx.fillStyle = n, t.ctx.textBaseline = "top", t.ctx.textAlign = "right", t.ctx.fillText(d[e], t.options.region.width, a)
        }
    }, paintTopText: function (t) {
        var o = this.data, i = this.ctx, e = this.options;
        ("undefined" == typeof t || t >= o.items.length - 1) && (t = o.items.length - 1);
        var n = o.items[t].close, a = o.items[t].open,
            l = VKChart.Util.getKlineTimeString(this.options.dateTimeType, new Date(o.items[t].date)), s = n > a,
            r = a > n, p = (n - a).toFixed(2), h = s ? e.riseColor : r ? e.fallColor : e.normalColor,
            m = Math.floor(e.region.width / 3);
        i.clearRect(0, 0, e.region.width, e.region.y - 1), i.font = "20px 雅黑", i.fillStyle = h, i.textBaseline = "top", i.textAlign = "left", i.fillText((s ? "↑" : r ? "↓" : "") + p, 5, 5), i.fillText("(" + (100 * p / a).toFixed(2) + "%)", 5, 35), i.font = "12px 宋体", i.fillStyle = e.riseColor, i.fillText("最高：" + o.items[t].high.toFixed(2), m, 5), i.fillStyle = e.fallColor, i.fillText("最低：" + o.items[t].low.toFixed(2), m, 25), i.fillStyle = "#917295", i.fillText("成交：" + o.items[t].volume.toFixed(2), m, 45), i.fillText("时间：" + l, 2 * m, 45), i.fillStyle = s ? e.fallColor : r ? e.riseColor : e.normalColor, i.fillText("开盘：" + o.items[t].open.toFixed(2), 2 * m, 5), i.fillStyle = s ? e.riseColor : r ? e.fallColor : e.normalColor, i.fillText("收盘：" + o.items[t].close.toFixed(2), 2 * m, 25)
    }, bindEvent: function () {
        var t = this;
        t.vkContent.find("canvas").bind("touchstart", function (o) {
            o.preventDefault(), t.temp.startX = o.originalEvent.changedTouches[0].clientX - t.vkContent.offset().left, t.temp.startY = o.originalEvent.changedTouches[0].clientY - t.vkContent.offset().top, t.temp.startTime = (new Date).getTime()
        }), t.vkContent.find("canvas").bind("touchend", function (o) {
            var i = o.originalEvent.changedTouches[0].clientX - t.vkContent.offset().left,
                e = o.originalEvent.changedTouches[0].clientY - t.vkContent.offset().top, n = (new Date).getTime();
            canvasWidth = t.vkContent.width(), canvasHeight = t.vkContent.height(), canvasWidth = Number(canvasWidth);
            var a = Math.abs(Math.round((t.temp.startX - i) / canvasWidth * t.temp.dataShowCount));
            if ((t.temp.startX - i) / canvasWidth > .3 && n - t.temp.startTime < 1e3) {
                var l = !1;
                t.temp.dataEndIndex < t.allData.items.length - a - 1 ? (t.temp.dataEndIndex = t.temp.dataEndIndex + a, l = !0) : t.temp.dataEndIndex != t.allData.items.length - 1 && (t.temp.dataEndIndex = t.allData.items.length - 1, l = !0), l && t.repaint(t.allData, VKChart.Type.kline)
            } else(t.temp.startX - i) / canvasWidth < -.3 && n - t.temp.startTime < 1e3 ? (t.temp.dataEndIndex > t.temp.dataShowCount + a ? (t.temp.dataEndIndex = t.temp.dataEndIndex - a, l = !0) : t.temp.dataEndIndex > t.temp.dataShowCount && (t.temp.dataEndIndex = t.temp.dataShowCount, l = !0), l && t.repaint(t.allData, VKChart.Type.kline)) : (t.temp.startY - e) / canvasHeight < -.35 && n - t.temp.startTime < 1e3 ? Math.floor(1.5 * t.temp.dataShowCount - 1) <= t.temp.dataEndIndex && (t.temp.dataShowCount = Math.floor(1.5 * t.temp.dataShowCount), t.repaint(t.allData, VKChart.Type.kline)) : (t.temp.startY - e) / canvasHeight > .35 && n - t.temp.startTime < 1e3 && Math.floor(.7 * t.temp.dataShowCount) > 5 && (t.temp.dataShowCount = Math.floor(.7 * t.temp.dataShowCount), t.repaint(t.allData, VKChart.Type.kline))
        }), t.vkContent.find("canvas").bind("mousemove touchmove", function (o) {
            var i = 0;
            i = "mousemove" == o.type ? o.clientX - t.vkContent.offset().left : o.originalEvent.changedTouches[0].clientX - t.vkContent.offset().left;
            var e = Math.floor(i / t.options.region.width * t.data.items.length);
            e = e >= t.data.items.length ? t.data.items.length - 1 : e;
            var n = e * t.options.region.width / t.data.items.length + t.options.region.width / t.data.items.length / 2,
                a = t.options.region.height - (t.data.items[e].close - t.temp.minPrice) / 2 / t.temp.maxDiff * t.options.region.height + t.options.region.y - 1;
            t.paintTopText(e), t.vkContent.find("#vkY").css("display", "block"), t.vkContent.find("#vkX").css("display", "block"), t.vkContent.find("#vkY").css("left", n), t.vkContent.find("#vkX").css("top", a)
        }), t.vkContent.find("canvas").bind("touchend mouseleave", function (o) {
            t.paintTopText(), t.vkContent.find("#vkY").css("display", "none"), t.vkContent.find("#vkX").css("display", "none")
        })
    }
};