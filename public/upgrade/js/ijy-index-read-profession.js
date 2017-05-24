/**
 * Created by Harry on 2017/5/22.
 */
function readOwn() {
    showEventTip("加载用户信息····"), $.getJSON("readOwn.do", {
        userName: userName,
        auth: auth,
        requestDate: (new Date).getTime()
    }, function (e) {
        authError(e.code), window.tempUser = {
            balance: e.data[0].balance,
            userId: e.data[0].userId
        }, $("#_user_userName").html(e.data[0].username), $("#_user_balance").html(PriceUtil.getMoneyToString(e.data[0].balance)), $("#_modal_user_userId").html(e.data[0].userId), $("#_modal_user_userName").html(e.data[0].username), $("#_modal_user_phone").html(e.data[0].phone), $("#_modal_user_name").html(e.data[0].name), $("#_modal_user_email").html(e.data[0].email), $("#_modal_user_isAndroidOnline").html(1 == e.data[0].isAndroidOnline ? "在线" : "离线"), $("#_modal_user_isIOSOnline").html(1 == e.data[0].isIOSOnline ? "在线" : "离线"), $("#_modal_user_isPCOnline").html(1 == e.data[0].isPCOnline ? "在线" : "离线"), $("#_modal_user_dateCreate").html(getDateTimeString(e.data[0].dateCreate)), $("#_modal_user_balance").html(PriceUtil.getMoneyToString(e.data[0].balance + e.data[0].frozen + e.data[0].marginUsed)), $("#_modal_user_frozen").html(PriceUtil.getMoneyToString(e.data[0].frozen)), $("#_modal_user_marginUsed").html(PriceUtil.getMoneyToString(e.data[0].marginUsed))
    }), showEventTip("加载用户信息完成!")
}
function readProduct() {
    $.getJSON("readProduct.do", {userName: userName, auth: auth, requestDate: (new Date).getTime()}, function (e) {
        authError(e.code);
        var i = "", t = 0;
        window.tempProduct = new Map, $.each(e.data, function (e, r) {
            t++, tempProduct.put(r.productId, {productId: r.productId, symbol: r.symbol, spread: r.spread});
            var o = "<div onclick='showProductDetail(this)' class='ijy-product-item " + r.symbol;
            o = o + "'><div class='hide ijy-product-item-productid'>" + r.productId, o = o + "</div><div class='ijy-product-item-spread hide'>" + r.spread, o = o + "</div><div class='ijy-product-item-symbol hide'>" + r.symbol, o = o + "</div><div class='ijy-product-item-name'>" + r.productName, o = o + "<div class='ijy-product-item-name-time'>更新时间：00:00:00</div></div><div class='ijy-product-item-buy ijy-product-item-equal'>" + (r.price + r.spread), o = o + "</div><div class='ijy-product-item-sale ijy-product-item-equal'>" + (r.price - r.spread), o += "</div></div>", i += o
        }), $(".ijy-product").html(0 == t ? "<div class='ijy-tip'>没有商品</div>" : i)
    }), showEventTip("刷新商品列表成功!")
}
function readProductRC() {
    $.getJSON("readProductRC.do", {userName: userName, auth: auth, requestDate: (new Date).getTime()}, function (e) {
        authError(e.code), window.tempProductRC = new Map, $.each(e.data, function (e, i) {
            tempProductRC.put(i.productId, {
                sellStopMin: i.sellStopMin,
                productId: i.productId,
                sellLimitMax: i.sellLimitMax,
                buyOpenMin: i.buyOpenMin,
                sellCloseMax: i.sellCloseMax,
                sellOpenMin: i.sellOpenMin,
                buyLimitMin: i.buyLimitMin,
                marketPLDistance: i.marketPLDistance,
                sellLimitMin: i.sellLimitMin,
                sellOpenMax: i.sellOpenMax,
                sellCloseMin: i.sellCloseMin,
                buyOpenMax: i.buyOpenMax,
                buyStopMin: i.buyStopMin,
                buyStopMax: i.buyStopMax,
                buyCloseMax: i.buyCloseMax,
                buyCloseMin: i.buyCloseMin,
                sellStopMax: i.sellStopMax,
                buyLimitMax: i.buyLimitMax,
                buyStopDiscretionaryDistance: i.buyStopDiscretionaryDistance,
                sellLimitDiscretionaryDistance: i.sellLimitDiscretionaryDistance,
                sellStopDiscretionaryDistance: i.sellStopDiscretionaryDistance,
                buyLimitDiscretionaryDistance: i.buyLimitDiscretionaryDistance,
                buyLimitPLDistance: i.buyLimitPLDistance,
                sellLimitPLDistance: i.sellLimitPLDistance,
                buyStopPLDistance: i.buyStopPLDistance,
                sellStopPLDistance: i.sellStopPLDistance
            })
        })
    })
}
function readOrder() {
    $.getJSON("readOrder.do", {userName: userName, auth: auth, requestDate: (new Date).getTime()}, function (e) {
        authError(e.code);
        var i = "", t = 0;
        $.each(e.data, function (e, r) {
            t++;
            var o = "<div onclick='showOrderOpenDetail(this)' class='ijy-order-open-item " + r.symbol;
            o = o + "'><span class='ijy-order-open-item-symbol hide'>" + r.symbol, o = o + "</span><span class='ijy-order-open-item-takeprofitprice hide'>" + r.takeProfitPrice, o = o + "</span><span class='ijy-order-open-item-stoplossprice hide'>" + r.stopLossPrice, o = o + "</span><span class='ijy-order-open-item-productid hide'>" + r.productId, o = o + "</span><span class='ijy-order-open-item-contractsize hide'>" + r.contractSize, o = o + "</span><span class='ijy-order-open-item-isbuy hide'>" + r.isBuy, o = o + "</span><div class='ijy-order-open-item-top'><div class='ijy-order-open-item-productname'>" + r.productName, o = o + "<span class='ijy-order-open-item-isbuy'>" + (1 == r.isBuy ? "<span class='ijy-color-down'>(多单)</span>" : "<span class='ijy-color-up'>(空单)</span>"), o = o + "</span></div><div class='ijy-order-open-item-openlots'>" + r.openLots, o = o + "</div><div class='ijy-order-open-item-profit'>" + r.profit, o = o + "</div></div><div class='ijy-order-open-item-middle'><div class='ijy-order-open-item-dateopen'>时间:" + getDateTimeFormatString("MM-DD HH:mm", r.dateOpen), o = o + "</div>开仓:<div class='ijy-order-open-item-openprice'>" + r.openPrice, o = o + "</div>平仓:<div class='ijy-order-open-item-closeprice'></div></div><div class='ijy-order-open-item-bottom hide'>交易单据：<span class='ijy-order-open-item-orderid'>" + r.orderId, o = o + "</span><span class='ijy-order-open-item-rollover'>过夜利息：" + r.rollover, o += "</span></div></div>", i += o
        }), $(".ijy-order-open").html(0 == t ? "<div class='ijy-tip'>您还没有在手订单</div>" : i)
    }), showEventTip("刷新在手订单列表成功!")
}
function readDiscretionaryOrder() {
    $.getJSON("readDiscretionaryOrder.do", {
        userName: userName,
        auth: auth,
        requestDate: (new Date).getTime()
    }, function (e) {
        authError(e.code);
        var i = "", t = 0;
        $.each(e.data, function (e, r) {
            t++;
            var o = "<div onclick='showOrderDiscretionaryDetail(this)' class='ijy-order-discretionary-item " + r.symbol;
            o = o + "'><span class='ijy-order-discretionary-item-symbol hide'>" + r.symbol, o = o + "</span><span class='ijy-order-discretionary-item-takeprofitprice hide'>" + r.takeProfitPrice, o = o + "</span><span class='ijy-order-discretionary-item-ordertype hide'>" + TypeUtil.getOrderTypeByMinorStatus(r.isBuy, r.minorStatus), o = o + "</span><span class='ijy-order-discretionary-item-stoplossprice hide'>" + r.stopLossPrice, o = o + "</span><span class='ijy-order-discretionary-item-productid hide'>" + r.productId, o = o + "</span><span class='ijy-order-discretionary-item-contractsize hide'>" + r.contractSize, o = o + "</span><span class='ijy-order-discretionary-item-isbuy hide'>" + r.isBuy, o = o + "</span><div class='ijy-order-discretionary-item-top'><div class='ijy-order-discretionary-item-productname'>" + r.productName, o = o + "<span class='ijy-order-discretionary-item-isbuy'>" + TypeUtil.getOrderTypeToHtml(r.isBuy, r.minorStatus), o = o + "</span></div><div class='ijy-order-discretionary-item-openlots'>" + r.openLots, o = o + "</div><div class='ijy-order-discretionary-item-discretionaryprice'>" + PriceUtil.getMoneyToString(r.discretionaryPrice), o = o + "</div></div><div class='ijy-order-discretionary-item-middle'>创建时间:<div class='ijy-order-discretionary-item-datecreate'>" + getDateTimeFormatString("MM-DD HH:mm", r.dateCreate), o = o + "</div>当前价格:<div class='ijy-order-discretionary-item-price'></div></div><div class='ijy-order-discretionary-item-bottom hide'>交易单据:<span class='ijy-order-discretionary-item-orderid'>" + r.orderId, o = o + "</span>过期时间:<div class='ijy-order-discretionary-item-dateexpire'>" + getDateTimeFormatString("MM-DD HH:mm", r.dateExpire), o += "</div></div></div>", i += o
        }), $(".ijy-order-discretionary").html(0 == t ? "<div class='ijy-tip'>您还没有委托订单</div>" : i)
    }), showEventTip("刷新委托订单列表成功!")
}
function readHistoryOrder() {
    $.getJSON("readHistoryOrder.do", {userName: userName, auth: auth, requestDate: (new Date).getTime()}, function (e) {
        authError(e.code);
        var i = "", t = 0;
        $.each(e.data, function (e, r) {
            t++;
            var o = "<div onclick='showOrderHistoryDetail(this)' class='ijy-order-history-item'><div class='ijy-order-history-item-top'><span class='ijy-order-history-item-productname'>" + r.productName;
            o = o + "<span class='ijy-order-history-item-isbuy'>" + (1 == r.isBuy ? "<span class='ijy-color-down'>(多单)</span>" : "<span class='ijy-color-up'>(空单)</span>"), o = o + "</span></span><span class='ijy-order-history-item-closelots'>" + r.closeLots, o = o + "</span><span class='ijy-order-history-item-profit'>" + (r.profit >= 0 ? "<span class='ijy-color-down'>" + PriceUtil.getMoneyToString(r.profit) + "</span>" : "<span class='ijy-color-up'>" + PriceUtil.getMoneyToString(r.profit) + "</span>"), o = o + "</span></div><div class='ijy-order-history-item-orderid'>订单号：" + r.orderId, o = o + "</div><div class='ijy-order-history-item-middle'><div class='ijy-order-history-item-datecreate ijy-order-history-item-align hide'>创建订单时间：" + getDateTimeFormatString("YYYY-MM-DD HH:mm:ss", r.dateCreate), o = o + "</div><div class='ijy-order-history-item-openprice ijy-order-history-item-align hide'>开仓价格：" + PriceUtil.getMoneyToString(r.openPrice), o = o + "</div><div class='ijy-order-history-item-align hide'>开仓时间：" + getDateTimeFormatString("YYYY-MM-DD HH:mm:ss", r.dateOpen), o = o + "</div><div class='ijy-order-history-item-align hide'>止盈价格：" + PriceUtil.getMoneyToString(r.takeProfitPrice), o = o + "</div><div class='ijy-order-history-item-align hide'>止损价格：" + PriceUtil.getMoneyToString(r.stopLossPrice), o = o + "</div><div class='ijy-order-history-item-closeprice ijy-order-history-item-align hide'>平仓价格：" + PriceUtil.getMoneyToString(r.closePrice), o = o + "</div><div class='ijy-order-history-item-align hide'>平仓时间：" + getDateTimeFormatString("YYYY-MM-DD HH:mm:ss", r.dateClose), o = o + "</div><div class='ijy-order-history-item-commission ijy-order-history-item-align hide'>佣金：" + r.commission, o = o + "</div><div class='ijy-order-history-item-align hide'>延期费：" + r.rollover, o += "</div></div></div>", i += o
        }), $(".ijy-order-history").html(0 == t ? "<div class='ijy-tip'>您还没有历史订单</div>" : i)
    }), showEventTip("刷新历史订单列表成功!")
}
function readNews() {
    $.getJSON("readNews.do", {userName: userName, auth: auth, requestDate: (new Date).getTime()}, function (e) {
        authError(e.code);
        var i = "", t = 0;
        $.each(e.data, function (e, r) {
            t++;
            var o = "<div onclick='showNewsDetail(this)' class='ijy-news-item'><div class='ijy-news-item-content'>" + r.content;
            o = o + "</div><div class=' ijy-news-item-left'><span class='icon-point-right'></span><span class='ijy-news-item-category'>" + r.category, o = o + "</span><span class='ijy-news-item-title'>" + r.title, o = o + "</span></div><div class='ijy-news-item-right ijy-news-item-date'>" + getDateTimeFormatString("MM-DD HH:mm", r.date), o += "</div></div>", i += o
        }), $(".ijy-news").html(0 == t ? "<div class='ijy-tip'>暂时没有新闻</div>" : i), showEventTip("刷新新闻列表成功!")
    })
}
function readNotice() {
    $.getJSON("readNotice.do", {userName: userName, auth: auth, requestDate: (new Date).getTime()}, function (e) {
        authError(e.code);
        var i = "", t = 0;
        $.each(e.data, function (e, r) {
            t++;
            var o = "<div onclick='showNoticeDetail(this)' class='ijy-notice-item'><span class='ijy-notice-item-content hide'>" + r.content;
            o = o + "</span><span class='ijy-notice-item-headsup hide'>" + r.headsup, o = o + "</span><span class='ijy-notice-item-sign hide'>" + r.sign, o = o + "</span><span class='ijy-notice-item-no hide'>" + r.No, o = o + "</span><div class='ijy-notice-item-left'><span class='icon-point-right'></span><span class='ijy-notice-item-title'>" + r.title, o = o + "</span></div><div class='ijy-notice-item-right ijy-notice-item-datestart'>" + getDateTimeFormatString("YYYY-MM-DD", r.dateStart), o += "</div></div>", i += o
        }), $(".ijy-notice").html(0 == t ? "<div class='ijy-tip'>暂时没有通知</div>" : i), showEventTip("刷新通知列表成功!")
    })
}
function readQuote() {
    $.ajax({
        url: "readQuote.do?userName=" + userName + "&auth=" + auth + "&requestDate=" + (new Date).getTime(),
        timeout: 1e3,
        cache: !1,
        async: !0,
        dataType: "json",
        error: function (e, i) {
            tempValue.timeOutCount++, tempValue.timeOutCount > 10 && showEventTip("您已断开连接..."), tempValue.timeOutCount > 25 && (clearTimeout(tempTimer.eventTipTimer), clearTimeout(tempTimer.quoteTimer), clearTimeout(tempTimer.asyncMessageTimer), $("#modalOffline").modal({
                keyboard: !1,
                hide: !1,
                show: !0,
                backdrop: "static"
            }))
        },
        success: function (e) {
            authError(e.code), tempValue.timeOutCount = 0, $.each(e.data, function (e, i) {
                var t = i.symbol, r = i.price, o = tempLastQuote.get(t), a = null == o ? 0 : o;
                tempLastQuote.put(t, r);
                var s = $("." + t + " .ijy-product-item-spread:eq(0)").html();
                if (s = parseInt(s), $("." + t + " .ijy-product-item-name-time").html("更新时间:" + getTimeString(i.date)), $("." + t + " .ijy-product-item-sale").html(PriceUtil.getMoneyToString(r - s)), $("." + t + " .ijy-product-item-buy").html(PriceUtil.getMoneyToString(r + s)), Math.abs(a - r) < 1e-4 ? ($("." + t + " .ijy-product-item-sale").removeClass("ijy-product-item-up"), $("." + t + " .ijy-product-item-sale").removeClass("ijy-product-item-down"), $("." + t + " .ijy-product-item-sale").addClass("ijy-product-item-equal"), $("." + t + " .ijy-product-item-buy").removeClass("ijy-product-item-up"), $("." + t + " .ijy-product-item-buy").removeClass("ijy-product-item-down"), $("." + t + " .ijy-product-item-buy").addClass("ijy-product-item-equal")) : r > a ? ($("." + t + " .ijy-product-item-sale").removeClass("ijy-product-item-equal"), $("." + t + " .ijy-product-item-sale").removeClass("ijy-product-item-down"), $("." + t + " .ijy-product-item-sale").addClass("ijy-product-item-up"), $("." + t + " .ijy-product-item-buy").removeClass("ijy-product-item-equal"), $("." + t + " .ijy-product-item-buy").removeClass("ijy-product-item-down"), $("." + t + " .ijy-product-item-buy").addClass("ijy-product-item-up")) : ($("." + t + " .ijy-product-item-sale").removeClass("ijy-product-item-equal"), $("." + t + " .ijy-product-item-sale").removeClass("ijy-product-item-up"), $("." + t + " .ijy-product-item-sale").addClass("ijy-product-item-down"), $("." + t + " .ijy-product-item-buy").removeClass("ijy-product-item-equal"), $("." + t + " .ijy-product-item-buy").removeClass("ijy-product-item-up"), $("." + t + " .ijy-product-item-buy").addClass("ijy-product-item-down")), $("." + t + ".ijy-order-open-item").each(function (e, i) {
                        var o = $("." + t + ".ijy-order-open-item:eq(" + e + ")"),
                            s = o.find(".ijy-order-open-item-isbuy:eq(0)").html(),
                            d = o.find(".ijy-order-open-item-openlots").html(),
                            n = o.find(".ijy-order-open-item-openprice").html(),
                            c = o.find(".ijy-order-open-item-contractsize").html();
                        if (o.find(".ijy-order-open-item-closeprice").html(PriceUtil.getMoneyToString(r)), "true" == s) {
                            r > a ? (o.find(".ijy-order-open-item-closeprice").removeClass("ijy-color-up"), o.find(".ijy-order-open-item-closeprice").addClass("ijy-color-down")) : (o.find(".ijy-order-open-item-closeprice").removeClass("ijy-color-down"), o.find(".ijy-order-open-item-closeprice").addClass("ijy-color-up"));
                            var l = d * c * (r - n);
                            o.find(".ijy-order-open-item-profit").html(PriceUtil.getMoneyToString(l))
                        } else {
                            a > r ? (o.find(".ijy-order-open-item-closeprice").removeClass("ijy-color-up"), o.find(".ijy-order-open-item-closeprice").addClass("ijy-color-down")) : (o.find(".ijy-order-open-item-closeprice").removeClass("ijy-color-down"), o.find(".ijy-order-open-item-closeprice").addClass("ijy-color-up"));
                            var l = d * c * (n - r);
                            o.find(".ijy-order-open-item-profit").html(PriceUtil.getMoneyToString(l))
                        }
                    }), $("." + t + ".ijy-order-discretionary-item").each(function (e, i) {
                        var o = $("." + t + ".ijy-order-discretionary-item:eq(" + e + ")"),
                            s = o.find(".ijy-order-discretionary-item-isbuy:eq(0)").html();
                        o.find(".ijy-order-discretionary-item-price").html(PriceUtil.getMoneyToString(r)), "true" == s ? r > a ? (o.find(".ijy-order-discretionary-item-price").removeClass("ijy-color-up"), o.find(".ijy-order-discretionary-item-price").addClass("ijy-color-down")) : (o.find(".ijy-order-discretionary-item-price").removeClass("ijy-color-down"), o.find(".ijy-order-discretionary-item-price").addClass("ijy-color-up")) : a > r ? (o.find(".ijy-order-discretionary-item-price").removeClass("ijy-color-up"), o.find(".ijy-order-discretionary-item-price").addClass("ijy-color-down")) : (o.find(".ijy-order-discretionary-item-price").removeClass("ijy-color-down"), o.find(".ijy-order-discretionary-item-price").addClass("ijy-color-up"))
                    }), Options.modalStatus.modalProduct) {
                    var d = $("#modalProduct .ijy-product-item-symbol").html();
                    if (d == t)if (Options.eventStatus.eventProductBuy) {
                        var n = $("#modalProduct .ijy-product-item-productid").html(), c = tempProductRC.get(n);
                        $(".ijy-modal-product-buy-takeprofit").html(PriceUtil.getTakeProfitPrice(TypeUtil.OrderType.BuyMarket, r, c)), $(".ijy-modal-product-buy-stoploss").html(PriceUtil.getStopLossPrice(TypeUtil.OrderType.BuyMarket, r, c)), Options.focusStatus.focusProductBuy || ($(".ijy-modal-product-buy-takeprofit-input").val(PriceUtil.getTakeProfitPrice(TypeUtil.OrderType.BuyMarket, PriceUtil.getTakeProfitRecommendPrice(r, s, TypeUtil.OrderType.BuyMarket), c)), $(".ijy-modal-product-buy-stoploss-input").val(PriceUtil.getStopLossPrice(TypeUtil.OrderType.BuyMarket, PriceUtil.getStopLossRecommendPrice(r, s, TypeUtil.OrderType.BuyMarket), c)))
                    } else if (Options.eventStatus.eventProductSell) {
                        var n = $("#modalProduct .ijy-product-item-productid").html(), c = tempProductRC.get(n);
                        $(".ijy-modal-product-sell-takeprofit").html(PriceUtil.getTakeProfitPrice(TypeUtil.OrderType.SellMarket, r, c)), $(".ijy-modal-product-sell-stoploss").html(PriceUtil.getStopLossPrice(TypeUtil.OrderType.SellMarket, r, c)), Options.focusStatus.focusProductSell || ($(".ijy-modal-product-sell-takeprofit-input").val(PriceUtil.getTakeProfitPrice(TypeUtil.OrderType.SellMarket, PriceUtil.getTakeProfitRecommendPrice(r, s, TypeUtil.OrderType.SellMarket), c)), $(".ijy-modal-product-sell-stoploss-input").val(PriceUtil.getStopLossPrice(TypeUtil.OrderType.SellMarket, PriceUtil.getStopLossRecommendPrice(r, s, TypeUtil.OrderType.SellMarket), c)))
                    } else if (Options.eventStatus.eventProductDiscretionary) {
                        if (!Options.focusStatus.focusProductDiscretionary) {
                            var n = $("#modalProduct .ijy-product-item-productid").html(), c = tempProductRC.get(n),
                                l = TypeUtil.valueOfOrderType($(".ijy-modal-product-discretionary-category-checked").html()),
                                m = PriceUtil.getDiscretionaryRecommendPrice(r, l);
                            $(".ijy-modal-product-discretionary-takeprofit").html(PriceUtil.getTakeProfitPrice(l, m, c)), $(".ijy-modal-product-discretionary-stoploss").html(PriceUtil.getStopLossPrice(l, m, c)), $(".ijy-modal-product-discretionary-price-input").val(m.toFixed(2)), $(".ijy-modal-product-discretionary-takeprofit-input").val(PriceUtil.getTakeProfitPrice(l, PriceUtil.getTakeProfitRecommendPrice(m, s, l), c)), $(".ijy-modal-product-discretionary-stoploss-input").val(PriceUtil.getStopLossPrice(l, PriceUtil.getStopLossRecommendPrice(m, s, l), c))
                        }
                        $(".ijy-modal-product-discretionary-price").html(PriceUtil.getMoneyToString(r))
                    }
                }
                if (Options.eventStatus.eventOrderOpen) {
                    var d = $("#modalOrderOpen .ijy-order-open-item-symbol").html(),
                        n = $("#modalOrderOpen .ijy-order-open-item-productid").html(),
                        p = $("#modalOrderOpen .ijy-order-open-item-isbuy").html();
                    if (d == t) {
                        var c = tempProductRC.get(n),
                            l = "true" == p ? TypeUtil.OrderType.BuyMarket : TypeUtil.OrderType.SellMarket;
                        $(".ijy-modal-order-open-takeprofit").html(PriceUtil.getTakeProfitPrice(l, r, c)), $(".ijy-modal-order-open-stoploss").html(PriceUtil.getStopLossPrice(l, r, c)), Options.textStatus.textOrderOpenTakeProfit || $(".ijy-modal-order-open-takeprofit-input").val(PriceUtil.getTakeProfitRecommendPrice(r, s, l).toFixed(2)), Options.textStatus.textOrderOpenStopLoss || $(".ijy-modal-order-open-stoploss-input").val(PriceUtil.getStopLossRecommendPrice(r, s, l).toFixed(2))
                    }
                }
                if (Options.eventStatus.eventOrderDiscretionary) {
                    var d = $("#modalOrderDiscretionary .ijy-order-discretionary-item-symbol").html();
                    if (d == t) {
                        var l = $("#modalOrderDiscretionary .ijy-order-discretionary-item-ordertype").html();
                        l = Number(l);
                        var n = $("#modalOrderDiscretionary .ijy-order-discretionary-item-productid").html();
                        n = Number(n);
                        var c = tempProductRC.get(n);
                        $(".ijy-modal-order-discretionary-price").html(PriceUtil.getDiscretionaryPrice(r, l, c))
                    }
                }
            });
            var i = 0;
            $(".ijy-order-open .ijy-order-open-item").each(function (e, t) {
                var r = $(".ijy-order-open-item:eq(" + e + ")").find(".ijy-order-open-item-profit").html();
                i += PriceUtil.getMoneyByString(r)
            }), $("#_user_gap").html(PriceUtil.getMoneyToString(i)), $("#_modal_user_marginFree").html(PriceUtil.getMoneyToString(tempUser.balance + i))
        }
    })
}
function readAsyncMessage() {
    $.ajax({
        url: "readAsyncMessage.do?userName=" + userName + "&auth=" + auth + "&requestDate=" + (new Date).getTime(),
        timeout: 1e3,
        async: !0,
        cache: !1,
        dataType: "json",
        error: function (e, i) {
            tempValue.timeOutCount++
        },
        success: function (e) {
            tempValue.timeOutCount = 0, authError(e.code), $.each(e.data, function (e, i) {
                showEventTip(i.message), 101 == i.responseType || 141 == i.responseType ? (readOrder(), readOwn()) : 102 == i.responseType ? (readOrder(), readOwn(), readDiscretionaryOrder()) : i.responseType > 110 && i.responseType < 115 ? (readOrder(), readOwn(), readHistoryOrder()) : 121 == i.responseType || 122 == i.responseType || 151 == i.responseType || 152 == i.responseType || 153 == i.responseType ? readDiscretionaryOrder() : 143 == i.responseType || 142 == i.responseType ? readOwn() : 301 == i.responseType ? readNotice() : 221 == i.responseType && ($.getJSON("userLogout.do", {
                        userName: userName,
                        auth: auth
                    }, function (e) {
                    }), wx.closeWindow())
            })
        }
    })
}
function readHistoryQuote(e) {
    var i = $("#modalProduct .ijy-product-item-symbol").html(), t = tempHistoryQuote.get(i + e);
    if (null != t) {
        var r = (new Date).getTime();
        if (1 == t.periodType) {
            if (r - t.date < 5e4)return t.data
        } else if (2 == t.periodType) {
            if (r - t.date < 3e5)return t.data
        } else if (3 == t.periodType) {
            if (r - t.date < 9e5)return t.data
        } else if (4 == t.periodType) {
            if (r - t.date < 18e5)return t.data
        } else if (2 == t.periodType && r - t.date < 36e5)return t.data
    }
    var o = {items: []};
    return $.getJSON("readHistoryQuote.do", {
        userName: userName,
        auth: auth,
        symbol: i,
        periodType: e,
        number: 120,
        requestDate: (new Date).getTime()
    }, function (e) {
        $.each(e.data, function (e, i) {
            o.items.push({date: i.date, open: i.open, close: i.close, low: i.low, high: i.high, volume: i.volume})
        })
    }), o.items = o.items.reverse(), tempHistoryQuote.put(i + e, {
        periodType: e,
        date: (new Date).getTime(),
        data: o
    }), o
}
function readWechatBindStatus() {
    $.getJSON("readWechatBindStatus.do", {
        userName: userName,
        auth: auth,
        requestDate: (new Date).getTime()
    }, function (e) {
        $.each(e.data, function (e, i) {
            $("#wechatBindStatusContent").html(i.wechatBindStatusContent), $("#wechatBindStatusButton").html(i.wechatBindStatusButton)
        })
    })
}
function readFastSigninStatus() {
    $.getJSON("readFastSigninStatus.do", {
        userName: userName,
        auth: auth,
        requestDate: (new Date).getTime()
    }, function (e) {
        $.each(e.data, function (e, i) {
            $("#fastSigninStatusContent").html(i.fastSigninStatusContent), $("#fastSigninStatusButton").html(i.fastSigninStatusButton)
        })
    })
}
function readThemeList() {
    $.getJSON("readThemeList.do", {userName: userName, auth: auth, requestDate: (new Date).getTime()}, function (e) {
        authError(e.code);
        var i = "";
        $.each(e.data, function (e, t) {
            i = i + "<div class='ijy-modal-userinfo-theme' onclick='eventUpdateTheme(\"" + t.themeName + "\")'>" + t.themeChineseName + "</div>"
        }), $("#updateThemeButton").html(e.message), $(".ijy-modal-userinfo-themearea").html(i)
    })
}