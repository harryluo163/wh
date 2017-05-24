function eventCreateDiscretionaryOrder() {
    var e = $("#modalProduct .ijy-product-item-productid").html(), t = tempProductRC.get(e),
        r = $(".ijy-modal-product-discretionary-category-checked").html(), o = TypeUtil.valueOfOrderType(r),
        a = TypeUtil.OrderTypeToString(o), i = $(".ijy-modal-product-discretionary-openlots-input").val();
    if (i = Number(i), isNaN(i) || i < PriceUtil.getOpenlotsMin(o, t) || i > PriceUtil.getOpenlotsMax(o, t))return void alertOpen("输入的数量有误!");
    var d = PriceUtil.getMoneyByString($(".ijy-modal-product-discretionary-price").html()),
        n = $(".ijy-modal-product-discretionary-price-input").val();
    if (n = Number(n), isNaN(n) || !CheckUtil.checkDiscretionaryPrice(o, n, d, t))return void alertOpen(r + " 委托价格设置有误!");
    var l = 0;
    if ($(".ijy-modal-product-discretionary-takeprofit-checkbox:checked").length > 0) {
        l = $(".ijy-modal-product-discretionary-takeprofit-input").val();
        var c = $(".ijy-modal-product-discretionary-takeprofit").html(), s = CheckUtil.checkTakeProfitPrice(o, l, c);
        if (1 != s)return void alertOpen(s)
    }
    var p = 0;
    if ($(".ijy-modal-product-discretionary-stoploss-checkbox:checked").length > 0) {
        p = $(".ijy-modal-product-discretionary-stoploss-input").val();
        var u = $(".ijy-modal-product-discretionary-stoploss").html(), s = CheckUtil.checkStopLossPrice(o, p, u);
        if (1 != s)return void alertOpen(s)
    }
    var m = $(".ijy-modal-product-discretionary-dateexpire").val();
    $.getJSON("eventCreateDiscretionaryOrder.do", {
        userName: userName,
        auth: auth,
        discretionaryType: a,
        productId: e,
        openLots: i,
        discretionaryPrice: n,
        dateExpire: m,
        takeProfitPrice: l,
        stopLossPrice: p,
        requestDate: (new Date).getTime()
    }, function (e) {
        authError(e.code), "0" == e.code ? (alertOpen("委托订单建立成功!"), $("#modalProduct").modal("hide"), readDiscretionaryOrder()) : alertOpen("出错了：" + e.message)
    })
}
function eventUpdateDiscretionaryOrder() {
    var e = $("#modalOrderDiscretionary .ijy-order-discretionary-item-productid").html(), t = tempProductRC.get(e),
        r = $("#modalOrderDiscretionary .ijy-order-discretionary-item-ordertype").html();
    r = Number(r);
    var o = $("#modalOrderDiscretionary .ijy-order-discretionary-item-orderid").html(),
        a = $(".ijy-modal-order-discretionary-openlots-input").val();
    if (a = Number(a), isNaN(a) || a < PriceUtil.getOpenlotsMin(r, t) || a > PriceUtil.getOpenlotsMax(r, t))return void alertOpen("输入的数量有误!");
    var i = PriceUtil.getMoneyByString($(".ijy-modal-order-discretionary-price").html()),
        d = $(".ijy-modal-order-discretionary-price-input").val();
    if (d = Number(d), isNaN(d) || !CheckUtil.checkDiscretionaryPrice(r, d, i, t))return void alertOpen(" 委托价格设置有误!");
    var n = 0;
    if ($(".ijy-modal-order-discretionary-takeprofit-checkbox:checked").length > 0) {
        n = $(".ijy-modal-order-discretionary-takeprofit-input").val();
        var l = $(".ijy-modal-order-discretionary-takeprofit").html(), c = CheckUtil.checkTakeProfitPrice(r, n, l);
        if (1 != c)return void alertOpen(c)
    }
    var s = 0;
    if ($(".ijy-modal-order-discretionary-stoploss-checkbox:checked").length > 0) {
        s = $(".ijy-modal-order-discretionary-stoploss-input").val();
        var p = $(".ijy-modal-order-discretionary-stoploss").html(), c = CheckUtil.checkStopLossPrice(r, s, p);
        if (1 != c)return void alertOpen(c)
    }
    $.getJSON("eventUpdateDiscretionaryOrder.do", {
        userName: userName,
        auth: auth,
        orderId: o,
        openLots: a,
        discretionaryPrice: d,
        takeProfitPrice: n,
        stopLossPrice: s,
        requestDate: (new Date).getTime()
    }, function (e) {
        authError(e.code), "0" == e.code ? (alertOpen("委托订单更新成功!"), $("#modalProduct").modal("hide"), readDiscretionaryOrder()) : alertOpen("出错了：" + e.message)
    })
}
function eventCloseOrder() {
    var e = $("#modalOrderOpen .ijy-order-open-item-orderid").html(),
        t = $("#modalOrderOpen  .ijy-order-open-item-openlots").html(),
        r = $(".ijy-modal-order-open-close-input").val();
    "" == r && (r = t), isNaN(Number(r)) ? alertOpen("输入的不是正确的数字!") : 1 > r || r > t || r != Math.floor(r) ? alertOpen("输入的数量不对!") : $.getJSON("eventCloseOrder.do", {
        userName: userName,
        auth: auth,
        orderId: e,
        closeLots: r,
        requestDate: (new Date).getTime()
    }, function (t) {
        authError(t.code), "0" == t.code ? (alertOpen("单号：" + e + "平仓成功!"), $("#modalOrderOpen").modal("hide"), readOwn(), readOrder(), readHistoryOrder()) : alertOpen("出错了：" + t.message)
    })
}
function eventUpdateTakeProfitAndStopLoss() {
    var e = $("#modalOrderOpen .ijy-order-open-item-isbuy").html(),
        t = "true" == e ? TypeUtil.OrderType.BuyMarket : TypeUtil.OrderType.SellMarket,
        r = $("#modalOrderOpen .ijy-order-open-item-orderid").html(), o = 0;
    if ($(".ijy-modal-order-open-takeprofit-checkbox:checked").length > 0) {
        o = $(".ijy-modal-order-open-takeprofit-input").val();
        var a = $(".ijy-modal-order-open-takeprofit").html(), i = CheckUtil.checkTakeProfitPrice(t, o, a);
        if (1 != i)return void alertOpen(i)
    }
    var d = 0;
    if ($(".ijy-modal-order-open-stoploss-checkbox:checked").length > 0) {
        d = $(".ijy-modal-order-open-stoploss-input").val();
        var n = $(".ijy-modal-order-open-stoploss").html(), i = CheckUtil.checkStopLossPrice(t, d, n);
        if (1 != i)return void alertOpen(i)
    }
    $.getJSON("eventUpdateTakeProfitAndStopLoss.do", {
        userName: userName,
        auth: auth,
        orderId: r,
        takeProfitPrice: o,
        stopLossPrice: d,
        requestDate: (new Date).getTime()
    }, function (e) {
        authError(e.code), "0" == e.code ? (alertOpen("修改止盈止损成功!"), $("#modalOrderOpen").modal("hide"), readOrder()) : alertOpen("出错了：" + e.message)
    })
}
function eventBuyOpenMarket() {
    var e = $("#modalProduct .ijy-product-item .ijy-product-item-productid").html(),
        t = $(".ijy-modal-product-buy-openlots-input").val();
    t = parseInt(t);
    var r = $(".ijy-modal-product-buy-buyopenmin").html(), o = $(".ijy-modal-product-buy-buyopenmax").html();
    if (isNaN(t) || r > t || t > o)return void alertOpen("输入的数量有误!");
    var a = 0;
    if ($(".ijy-modal-product-buy-takeprofit-checkbox:checked").length > 0) {
        a = $(".ijy-modal-product-buy-takeprofit-input").val();
        var i = $(".ijy-modal-product-buy-takeprofit").html(),
            d = CheckUtil.checkTakeProfitPrice(TypeUtil.OrderType.BuyMarket, a, i);
        if (1 != d)return void alertOpen(d)
    }
    var n = 0;
    if ($(".ijy-modal-product-buy-stoploss-checkbox:checked").length > 0) {
        n = $(".ijy-modal-product-buy-stoploss-input").val();
        var l = $(".ijy-modal-product-buy-stoploss").html(),
            d = CheckUtil.checkStopLossPrice(TypeUtil.OrderType.BuyMarket, n, l);
        if (1 != d)return void alertOpen(d)
    }
    $.getJSON("eventBuyOpenMarket.do", {
        userName: userName,
        auth: auth,
        productId: e,
        openLots: t,
        takeProfitPrice: a,
        stopLossPrice: n,
        requestDate: (new Date).getTime()
    }, function (e) {
        authError(e.code), "0" == e.code ? (alertOpen("订单建立成功!"), $("#modalProduct").modal("hide"), readOwn(), readOrder()) : alertOpen("出错了：" + e.message)
    })
}
function eventSellOpenMarket() {
    var e = $("#modalProduct .ijy-product-item .ijy-product-item-productid").html(),
        t = $(".ijy-modal-product-sell-openlots-input").val();
    t = parseInt(t);
    var r = $(".ijy-modal-product-sell-sellopenmin").html(), o = $(".ijy-modal-product-sell-sellopenmax").html();
    if (isNaN(t) || r > t || t > o)return void alertOpen("输入的数量有误!");
    var a = 0;
    if ($(".ijy-modal-product-sell-takeprofit-checkbox:checked").length > 0) {
        a = $(".ijy-modal-product-sell-takeprofit-input").val();
        var i = $(".ijy-modal-product-sell-takeprofit").html(),
            d = CheckUtil.checkTakeProfitPrice(TypeUtil.OrderType.SellMarket, a, i);
        if (1 != d)return void alertOpen(d)
    }
    var n = 0;
    if ($(".ijy-modal-product-sell-stoploss-checkbox:checked").length > 0) {
        n = $(".ijy-modal-product-sell-stoploss-input").val();
        var l = $(".ijy-modal-product-sell-stoploss").html(),
            d = CheckUtil.checkStopLossPrice(TypeUtil.OrderType.SellMarket, n, l);
        if (1 != d)return void alertOpen(d)
    }
    $.getJSON("eventSellOpenMarket.do", {
        userName: userName,
        auth: auth,
        productId: e,
        openLots: t,
        takeProfitPrice: a,
        stopLossPrice: n,
        requestDate: (new Date).getTime()
    }, function (e) {
        authError(e.code), "0" == e.code ? (alertOpen("订单建立成功!"), $("#modalProduct").modal("hide"), readOwn(), readOrder()) : alertOpen("出错了：" + e.message)
    })
}
function eventDeleteDiscretionaryOrder() {
    var e = $("#modalOrderDiscretionary .ijy-order-discretionary-item-orderid").html();
    $.getJSON("eventDeleteDiscretionaryOrder.do", {
        userName: userName,
        auth: auth,
        orderId: e,
        requestDate: (new Date).getTime()
    }, function (e) {
        authError(e.code), "0" == e.code ? (alertOpen("删除委托订单成功!"), $("#modalOrderDiscretionary").modal("hide"), readOwn(), readDiscretionaryOrder()) : alertOpen("出错了：" + e.message)
    })
}
function eventUpdateWechatBindStatus() {
    $.getJSON("eventUpdateWechatBindStatus.do", {
        userName: userName,
        openid: openid,
        auth: auth,
        requestDate: (new Date).getTime()
    }, function (e) {
        $.each(e.data, function (e, t) {
            $("#wechatBindStatusContent").html(t.wechatBindStatusContent), $("#wechatBindStatusButton").html(t.wechatBindStatusButton)
        })
    })
}
function eventUpdateFastSigninStatus() {
    $.getJSON("eventUpdateFastSigninStatus.do", {
        userName: userName,
        openid: openid,
        auth: auth,
        requestDate: (new Date).getTime()
    }, function (e) {
        $.each(e.data, function (e, t) {
            $("#fastSigninStatusContent").html(t.fastSigninStatusContent), $("#fastSigninStatusButton").html(t.fastSigninStatusButton)
        })
    })
}
function eventUpdateTheme(e) {
    $.getJSON("eventUpdateTheme.do", {
        userName: userName,
        openid: openid,
        theme: e,
        auth: auth,
        requestDate: (new Date).getTime()
    }, function (e) {
        0 == e.code && window.location.reload()
    })
}
function eventUpdatePassword() {
    var e = $(".ijy-modal-changepassword-text-oldpassword").val();
    if (e.length < 6)return void alertOpen("原密码太短!");
    var t = $(".ijy-modal-changepassword-text-newpassword").val();
    if (t.length < 6)return void alertOpen("新密码太短!");
    var r = $(".ijy-modal-changepassword-fastsignin-checkbox:checked").length > 0;
    $.getJSON("eventUpdatePassword.do", {
        userName: userName,
        auth: auth,
        userId: tempUser.userId,
        oldPassword: e,
        newPassword: t,
        fastSignin: r,
        requestDate: (new Date).getTime()
    }, function (e) {
        "0" == e.code ? window.location.replace("signin.jspa?openid=" + openid) : alertOpen(e.message)
    })
}