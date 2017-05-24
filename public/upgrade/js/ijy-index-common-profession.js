function alertOpen(e) {
    $(".ijy-model-alert-msg").html(e), $("#modalAlert").modal({
        keyboard: !1,
        hide: !1,
        show: !0,
        backdrop: "static"
    })
}
function alertClose() {
    $("#modalAlert").modal("hide")
}
function confirmOpen(e, t) {
    $(".ijy-model-confirm-msg").html(e), Options.windowLock = !0, tempValue.confirmMethod = t, $("#modalConfirm").modal({
        keyboard: !1,
        hide: !1,
        show: !0,
        backdrop: "static"
    })
}
function confirmClose(e) {
    $("#modalConfirm").modal("hide"), e ? ("eventBuyOpenMarket" == tempValue.confirmMethod ? eventBuyOpenMarket() : "eventCreateDiscretionaryOrder" == tempValue.confirmMethod ? eventCreateDiscretionaryOrder() : "eventUpdateDiscretionaryOrder" == tempValue.confirmMethod ? eventUpdateDiscretionaryOrder() : "eventCloseOrder" == tempValue.confirmMethod ? eventCloseOrder() : "eventUpdateTakeProfitAndStopLoss" == tempValue.confirmMethod ? eventUpdateTakeProfitAndStopLoss() : "eventSellOpenMarket" == tempValue.confirmMethod ? eventSellOpenMarket() : "eventDeleteDiscretionaryOrder" == tempValue.confirmMethod ? eventDeleteDiscretionaryOrder() : "closeWindow" == tempValue.confirmMethod ? wx.closeWindow() : "eventUpdatePassword" == tempValue.confirmMethod && eventUpdatePassword(), tempValue.confirmMethod = "") : "closeWindow" == tempValue.confirmMethod && historyPushState("3"), Options.windowLock = !1
}

function confirmPutOrder(e, t) {
    $(".ijy-model-confirm-msg").html(e), Options.windowLock = !0, tempValue.confirmMethod = t, $("#modalputOrder").modal({
        keyboard: !1,
        hide: !1,
        show: !0,
        backdrop: "static"
    })
}
function confirmPutOrderClose(e) {
    $("#modalputOrder").modal("hide"), e ? ("eventBuyOpenMarket" == tempValue.confirmMethod ? eventBuyOpenMarket() : "eventCreateDiscretionaryOrder" == tempValue.confirmMethod ? eventCreateDiscretionaryOrder() : "eventUpdateDiscretionaryOrder" == tempValue.confirmMethod ? eventUpdateDiscretionaryOrder() : "eventCloseOrder" == tempValue.confirmMethod ? eventCloseOrder() : "eventUpdateTakeProfitAndStopLoss" == tempValue.confirmMethod ? eventUpdateTakeProfitAndStopLoss() : "eventSellOpenMarket" == tempValue.confirmMethod ? eventSellOpenMarket() : "eventDeleteDiscretionaryOrder" == tempValue.confirmMethod ? eventDeleteDiscretionaryOrder() : "closeWindow" == tempValue.confirmMethod ? wx.closeWindow() : "eventUpdatePassword" == tempValue.confirmMethod && eventUpdatePassword(), tempValue.confirmMethod = "") : "closeWindow" == tempValue.confirmMethod && historyPushState("3"), Options.windowLock = !1
}

function confirmOptionOpen(e, t) {
    $(".ijy-model-confirm-msg").html(e), Options.windowLock = !0, tempValue.confirmMethod = t, $("#modalOption").modal({
        keyboard: !1,
        hide: !1,
        show: !0,
        backdrop: "static"
    })
}
function confirmOptionClose(e) {
    $("#modalOption").modal("hide"), e ? ("eventBuyOpenMarket" == tempValue.confirmMethod ? eventBuyOpenMarket() : "eventCreateDiscretionaryOrder" == tempValue.confirmMethod ? eventCreateDiscretionaryOrder() : "eventUpdateDiscretionaryOrder" == tempValue.confirmMethod ? eventUpdateDiscretionaryOrder() : "eventCloseOrder" == tempValue.confirmMethod ? eventCloseOrder() : "eventUpdateTakeProfitAndStopLoss" == tempValue.confirmMethod ? eventUpdateTakeProfitAndStopLoss() : "eventSellOpenMarket" == tempValue.confirmMethod ? eventSellOpenMarket() : "eventDeleteDiscretionaryOrder" == tempValue.confirmMethod ? eventDeleteDiscretionaryOrder() : "closeWindow" == tempValue.confirmMethod ? wx.closeWindow() : "eventUpdatePassword" == tempValue.confirmMethod && eventUpdatePassword(), tempValue.confirmMethod = "") : "closeWindow" == tempValue.confirmMethod && historyPushState("3"), Options.windowLock = !1
}

function confirmOptionDeal(e, t) {
    $(".ijy-model-confirm-msg").html(e), Options.windowLock = !0, tempValue.confirmMethod = t, $("#modalOptionDeal").modal({
        keyboard: !1,
        hide: !1,
        show: !0,
        backdrop: "static"
    })
    $("#modalOption").modal("hide")
}
function confirmOptionDealClose(e) {
    $("#modalOptionDeal").modal("hide"), e ? ("eventBuyOpenMarket" == tempValue.confirmMethod ? eventBuyOpenMarket() : "eventCreateDiscretionaryOrder" == tempValue.confirmMethod ? eventCreateDiscretionaryOrder() : "eventUpdateDiscretionaryOrder" == tempValue.confirmMethod ? eventUpdateDiscretionaryOrder() : "eventCloseOrder" == tempValue.confirmMethod ? eventCloseOrder() : "eventUpdateTakeProfitAndStopLoss" == tempValue.confirmMethod ? eventUpdateTakeProfitAndStopLoss() : "eventSellOpenMarket" == tempValue.confirmMethod ? eventSellOpenMarket() : "eventDeleteDiscretionaryOrder" == tempValue.confirmMethod ? eventDeleteDiscretionaryOrder() : "closeWindow" == tempValue.confirmMethod ? wx.closeWindow() : "eventUpdatePassword" == tempValue.confirmMethod && eventUpdatePassword(), tempValue.confirmMethod = "") : "closeWindow" == tempValue.confirmMethod && historyPushState("3"), Options.windowLock = !1
}

function authError(e) {
    ("998" == e || "997" == e) && window.location.replace("signin.jspa?openid=" + openid + "&code=997")
}
function showEventTip(e) {
    clearTimeout(tempTimer.eventTipTimer), $(".ijy-menu-top-event-tip").html(e), $(".ijy-menu-top-event-tip").fadeIn(500), tempTimer.eventTipTimer = setTimeout(function() {
        $(".ijy-menu-top-event-tip").fadeOut(1e3)
    }, 4e3)
}
function getTimeString(e) {
    var t = new Date(e);
    return moment(t).format("HH:mm:ss")
}
function getDateTimeString(e) {
    var t = new Date(e);
    return moment(t).format("YYYY-MM-DD HH:mm")
}
function getDateTimeFormatString(e, t) {
    var r = new Date(t);
    return moment(r).format(e)
}
function historyPushState(e) {
    tempValue.currentModalId = e, Options.windowLock || tempValue.openModalStack.push(e), history.pushState({
        modalId: e
    }, null, "/index.jspa?userName=" + userName + "&auth=" + auth + "&openid=" + openid)
}
function historyBack() {
    window.history.back()
}
$(".ijy-menu-top-user").bind("touchstart", function(e) {
    tempValue.stratY = e.originalEvent.changedTouches[0].clientY
}), $(".ijy-menu-top-user").bind("touchmove", function(e) {
    e.preventDefault()
}), $(".ijy-menu-top-user").bind("touchend", function(e) {
    var t = e.originalEvent.changedTouches[0].clientY,
        r = (tempValue.stratY - t) / $(window).height();
    if (-.3 > r) {
        var i = $(".tab-content > .active"),
            n = i.index(); - .55 > r ? 0 == n ? (readProduct(), readProductRC()) : 1 == n ? readOrder() : 2 == n ? readDiscretionaryOrder() : 3 == n ? readHistoryOrder() : 4 == n ? readNotice() : 5 == n && readNews() : -.3 > r && showEventTip("用力下拉可以刷新哦!")
    }
}), $(".tab-content").bind("touchstart", function(e) {
    tempValue.stratX = e.originalEvent.changedTouches[0].clientX, tempValue.stratY = e.originalEvent.changedTouches[0].clientY
}), $(".tab-content").bind("touchend", function(e) {
    var t = e.originalEvent.changedTouches[0].clientX,
        r = e.originalEvent.changedTouches[0].clientY,
        i = (tempValue.stratX - t) / $(window).width(),
        n = (tempValue.stratY - r) / $(window).height();
    if (Math.abs(i) > .5 || -.3 > n) {
        var a = $(".tab-content > .active"),
            o = a.index();
        i > .5 ? 6 > o && (a.removeClass("active"), $(".tab-content .tab-pane").eq(o + 1).addClass("active"), $(".nav-tabs .ijy-menu-bottom-item").eq(o).removeClass("active"), $(".nav-tabs .ijy-menu-bottom-item").eq(o + 1).addClass("active")) : -.5 > i ? o > 0 && (a.removeClass("active"), $(".tab-content .tab-pane").eq(o - 1).addClass("active"), $(".nav-tabs .ijy-menu-bottom-item").eq(o).removeClass("active"), $(".nav-tabs .ijy-menu-bottom-item").eq(o - 1).addClass("active")) : -.55 > n ? 0 == o ? (readProduct(), readProductRC()) : 1 == o ? readOrder() : 2 == o ? readDiscretionaryOrder() : 3 == o ? readHistoryOrder() : 4 == o ? readNotice() : 5 == o && readNews() : -.3 > n && showEventTip("用力下拉可以刷新哦!")
    }
}), window.addEventListener("popstate", function(e) {
    if (Options.windowLock) historyPushState(tempValue.currentModalId);
    else {
        var t = history.state;
        null != t && ("1" == t.modalId ? (historyPushState("2"), historyPushState("3")) : "2" == t.modalId ? confirmOpen("你确定退出？", "closeWindow") : $("#" + tempValue.openModalStack.pop()).modal("hide"))
    }
}, !1), window.TypeUtil = {
    OrderType: {
        BuyMarket: 1,
        SellMarket: 2,
        BuyLimit: 3,
        SellLimit: 4,
        BuyStop: 5,
        SellStop: 6
    },
    valueOfOrderType: function(e) {
        return "高位挂多" == e ? TypeUtil.OrderType.BuyLimit : "低位挂多" == e ? TypeUtil.OrderType.BuyStop : "低位挂空" == e ? TypeUtil.OrderType.SellLimit : "高位挂空" == e ? TypeUtil.OrderType.SellStop : 0
    },
    getOrderTypeByMinorStatus: function(e, t) {
        if (1 == e) {
            if (2 == t) return TypeUtil.OrderType.BuyLimit;
            if (3 == t) return TypeUtil.OrderType.BuyStop
        } else {
            if (2 == t) return TypeUtil.OrderType.SellLimit;
            if (3 == t) return TypeUtil.OrderType.SellStop
        }
    },
    OrderTypeToString: function(e) {
        return 3 == e ? "BuyLimit" : 5 == e ? "BuyStop" : 4 == e ? "SellLimit" : 6 == e ? "SellStop" : ""
    },
    getOrderTypeToHtml: function(e, t) {
        var r = "";
        return 1 == e ? (r += "<span class='ijy-color-down'>(", 2 == t ? r += "高位" : 3 == t && (r += "低位"), r += "多单)</span>") : (r += "<span class='ijy-color-up'>(", 2 == t ? r += "低位" : 3 == t && (r += "高位"), r += "空单)</span>"), r
    }
}, window.PriceUtil = {
    getMoneyToString: function(e) {
        var t = "0";
        if (isNaN(e) || 0 == e) return t;
        e = parseFloat(e).toFixed(2);
        var r = Math.round(100 * e % 100);
        r = Math.abs(r), 10 > r && (r = "0" + r), e = parseInt(e), sign = e >= 0, e = Math.abs(e), e = e.toString();
        for (var i = "", n = 1, a = e.length - 1; a >= 0 && (i = e[a] + i, 0 != a); n++, a--) n % 3 == 0 && (i = "," + i);
        return (sign ? "" : "-") + i + "." + r
    },
    getMoneyByString: function(e) {
        for (var t = "", r = 0; r < e.length; r++)"," != e[r] && (t += e[r]);
        return parseFloat(t)
    },
    getTakeProfitPrice: function(e, t, r) {
        var i = t;
        switch (e) {
            case 1:
                i = t + r.marketPLDistance;
                break;
            case 2:
                i = t - r.marketPLDistance;
                break;
            case 3:
                i = t + r.buyLimitPLDistance;
                break;
            case 4:
                i = t - r.sellLimitPLDistance;
                break;
            case 5:
                i = t + r.buyStopPLDistance;
                break;
            case 6:
                i = t - r.sellStopPLDistance
        }
        return i.toFixed(2)
    },
    getStopLossPrice: function(e, t, r) {
        var i = t;
        switch (e) {
            case 1:
                i = t - r.marketPLDistance;
                break;
            case 2:
                i = t + r.marketPLDistance;
                break;
            case 3:
                i = t - r.buyLimitPLDistance;
                break;
            case 4:
                i = t + r.sellLimitPLDistance;
                break;
            case 5:
                i = t - r.buyStopPLDistance;
                break;
            case 6:
                i = t + r.sellStopPLDistance
        }
        return i.toFixed(2)
    },
    getTakeProfitSymbol: function(e) {
        switch (e) {
            case 1:
            case 3:
            case 5:
                return ">";
            case 2:
            case 4:
            case 6:
                return "<"
        }
    },
    getStopLossSymbol: function(e) {
        switch (e) {
            case 1:
            case 3:
            case 5:
                return "<";
            case 2:
            case 4:
            case 6:
                return ">"
        }
    },
    getDiscretionaryPriceSymbol: function(e) {
        switch (e) {
            case 3:
            case 6:
                return ">";
            case 5:
            case 4:
                return "<"
        }
    },
    getOpenlotsMax: function(e, t) {
        switch (e) {
            case 1:
                return t.buyOpenMax;
            case 2:
                return t.sellOpenMax;
            case 3:
                return t.buyLimitMax;
            case 4:
                return t.sellLimitMax;
            case 5:
                return t.buyStopMax;
            case 6:
                return t.sellStopMax
        }
    },
    getOpenlotsMin: function(e, t) {
        switch (e) {
            case 1:
                return t.buyOpenMin;
            case 2:
                return t.sellOpenMin;
            case 3:
                return t.buyLimitMin;
            case 4:
                return t.sellLimitMin;
            case 5:
                return t.buyStopMin;
            case 6:
                return t.sellStopMin
        }
    },
    getIncrementPrice: function(e) {
        var t = e.toString(),
            r = t.length - t.lastIndexOf("."),
            i = 0;
        switch (r) {
            case 1:
            case t.length + 1:
                i = 10;
                break;
            case 2:
                i = 1;
                break;
            case 3:
                i = .1;
                break;
            default:
                i = .01
        }
        return i
    },
    getTakeProfitRecommendPrice: function(e, t, r) {
        var i = this.getIncrementPrice(e);
        switch (r) {
            case 1:
            case 3:
            case 5:
                return e + i + t;
            case 2:
            case 4:
            case 6:
                return e - i - t
        }
    },
    getStopLossRecommendPrice: function(e, t, r) {
        var i = this.getIncrementPrice(e);
        switch (r) {
            case 1:
            case 3:
            case 5:
                return e - i;
            case 2:
            case 4:
            case 6:
                return e + i
        }
    },
    getDiscretionaryRecommendPrice: function(e, t) {
        var r = this.getIncrementPrice(e);
        switch (t) {
            case 3:
            case 6:
                return e + r;
            case 4:
            case 5:
                return e - r
        }
    },
    getDiscretionaryPrice: function(e, t, r) {
        switch (t) {
            case 3:
                return e + r.buyLimitDiscretionaryDistance;
            case 4:
                return e + r.sellLimitDiscretionaryDistance;
            case 5:
                return e - r.buyStopDiscretionaryDistance;
            case 6:
                return e - r.sellStopDiscretionaryDistance
        }
    }
}, window.CheckUtil = {
    checkDiscretionaryPrice: function(e, t, r, i) {
        var n = PriceUtil.getDiscretionaryPrice(r, e, i);
        switch (e) {
            case TypeUtil.OrderType.BuyLimit:
            case TypeUtil.OrderType.SellLimit:
                return t > n;
            case TypeUtil.OrderType.BuyStop:
            case TypeUtil.OrderType.SellStop:
                return n > t
        }
    },
    checkTakeProfitPrice: function(e, t, r) {
        if (r = Number(PriceUtil.getMoneyByString(r)), t = Number(t), isNaN(t)) return "请输入正确的止盈数值!";
        switch (e) {
            case TypeUtil.OrderType.BuyMarket:
            case TypeUtil.OrderType.BuyLimit:
            case TypeUtil.OrderType.BuyStop:
                if (r >= t) return "止盈设置有误!";
                break;
            case TypeUtil.OrderType.SellMarket:
            case TypeUtil.OrderType.SellLimit:
            case TypeUtil.OrderType.SellStop:
                if (t >= r) return "止盈设置有误!"
        }
        return !0
    },
    checkStopLossPrice: function(e, t, r) {
        if (r = Number(PriceUtil.getMoneyByString(r)), t = Number(t), isNaN(t)) return "请输入正确的止损数值!";
        switch (e) {
            case TypeUtil.OrderType.BuyMarket:
            case TypeUtil.OrderType.BuyLimit:
            case TypeUtil.OrderType.BuyStop:
                if (t >= r) return "止损设置有误!";
                break;
            case TypeUtil.OrderType.SellMarket:
            case TypeUtil.OrderType.SellLimit:
            case TypeUtil.OrderType.SellStop:
                if (r >= t) return "止损设置有误!"
        }
        return !0
    }
};