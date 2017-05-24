function buttonOffline() {
    window.location.replace("signin.jspa?openid=" + openid + "&code=997")
}
function buttonExit() {
    wx.closeWindow()
}
function buttonApp() {
    var t = $(".ijy-app-download-url").html();
    "" == t ? alertOpen("即将上线，敬请期待") : window.location.href = t
}
function buttonProductBuy() {
    $(".ijy-modal-product-quote").addClass("hide"), $(".ijy-modal-product-quote-menu").addClass("hide"), $(".ijy-modal-product-quote-menu-more").addClass("hide"), $(".ijy-modal-product-menu").addClass("hide"), $(".ijy-modal-product-buy").removeClass("hide"), Options.eventStatus.eventProductBuy = !0;
    var t = ($("#modalProduct .ijy-product-item-symbol").html(), $("#modalProduct .ijy-product-item-productid").html());
    t = Number(t);
    var o = tempProductRC.get(t);
    $(".ijy-modal-product-buy-openlots-input").val(o.buyOpenMin), $(".ijy-modal-product-buy-buyopenmin").html(o.buyOpenMin), $(".ijy-modal-product-buy-buyopenmax").html(o.buyOpenMax)
}
function buttonProductSell() {
    $(".ijy-modal-product-quote").addClass("hide"), $(".ijy-modal-product-quote-menu").addClass("hide"), $(".ijy-modal-product-quote-menu-more").addClass("hide"), $(".ijy-modal-product-menu").addClass("hide"), $(".ijy-modal-product-sell").removeClass("hide"), Options.eventStatus.eventProductSell = !0;
    var t = ($("#modalProduct .ijy-product-item-symbol").html(), $("#modalProduct .ijy-product-item-productid").html());
    t = Number(t);
    var o = tempProductRC.get(t);
    $(".ijy-modal-product-sell-openlots-input").val(o.sellOpenMin), $(".ijy-modal-product-sell-sellopenmin").html(o.sellOpenMin), $(".ijy-modal-product-sell-sellopenmax").html(o.sellOpenMax)
}
function buttonProductDiscretionaryConfig() {
    var t = TypeUtil.valueOfOrderType($(".ijy-modal-product-discretionary-category-checked").html());
    $(".ijy-modal-product-discretionary-takeprofit-status").html(PriceUtil.getTakeProfitSymbol(t)), $(".ijy-modal-product-discretionary-stoploss-status").html(PriceUtil.getStopLossSymbol(t)), $(".ijy-modal-product-discretionary-price-status").html(PriceUtil.getDiscretionaryPriceSymbol(t));
    var o = $("#modalProduct .ijy-product-item-productid").html(),
        e = tempProductRC.get(o);
    $(".ijy-modal-product-discretionary-openlots-input").val(PriceUtil.getOpenlotsMin(t, e)), $(".ijy-modal-product-discretionary-openlotsmax").html(PriceUtil.getOpenlotsMax(t, e)), $(".ijy-modal-product-discretionary-openlotsmin").html(PriceUtil.getOpenlotsMin(t, e))
}
function buttonProductDiscretionary() {
    $(".ijy-modal-product-quote").addClass("hide"), $(".ijy-modal-product-quote-menu").addClass("hide"), $(".ijy-modal-product-quote-menu-more").addClass("hide"), $(".ijy-modal-product-menu").addClass("hide"), $(".ijy-modal-product-discretionary").removeClass("hide"), Options.eventStatus.eventProductDiscretionary = !0, buttonProductDiscretionaryConfig(), $(".ijy-modal-product-discretionary-dateexpire").val(moment().add("days", 1).format("YYYY/MM/DD HH:mm")), $(".ijy-modal-product-discretionary-dateexpire").datetimepicker({
        lang: "ch"
    })
}
function buttonProductDiscretionaryCategory() {
    $(".ijy-modal-product-discretionary-category-more").slideToggle(200)
}
function buttonProductDiscretionaryCategoryOptionL() {
    $(".ijy-modal-product-discretionary-category-more-optionL").slideToggle(200)
}
function buttonProductDiscretionaryCategoryOptionT() {
    $(".ijy-modal-product-discretionary-category-more-optionT").slideToggle(200)
}
function buttonProductOptionOpen() {
    $(".ijy-modal-product-option-open").slideToggle(200)
}
function buttonProductDiscretionaryCategoryItem(t) {
    $(".ijy-modal-product-discretionary-category-checked").html($(t).html()), buttonProductDiscretionaryConfig(), $(".ijy-modal-product-discretionary-category-more").slideUp(200)
}
function buttonProductDiscretionaryCategoryItemOptionL(t) {
    //$(".ijy-modal-product-discretionary-category-checked-optionL").html($(t).html());
    $("#volume").val($(t).text());
    $(".ijy-modal-product-discretionary-category-more-optionL").slideUp(200);
}
function buttonProductDiscretionaryCategoryItemOptionT(t) {
    $(".ijy-modal-product-discretionary-category-checked-optionT").html($(t).html()), $(".ijy-modal-product-discretionary-category-more-optionT").slideUp(200)
}
function focusProductBuy() {
    Options.focusStatus.focusProductBuy = !0
}
function focusProductSell() {
    Options.focusStatus.focusProductSell = !0
}
function focusProductDiscretionary() {
    Options.focusStatus.focusProductDiscretionary = !0
}
function checkboxProductBuyTakeProfit() {
    $(".ijy-modal-product-buy-takeprofit-checkbox:checked").length > 0 ? $(".ijy-modal-product-buy-takeprofit-input").removeClass("ijy-text-inactive") : $(".ijy-modal-product-buy-takeprofit-input").addClass("ijy-text-inactive")
}
function checkboxProductSellTakeProfit() {
    $(".ijy-modal-product-sell-takeprofit-checkbox:checked").length > 0 ? $(".ijy-modal-product-sell-takeprofit-input").removeClass("ijy-text-inactive") : $(".ijy-modal-product-sell-takeprofit-input").addClass("ijy-text-inactive")
}
function checkboxProductDiscretionaryTakeProfit() {
    $(".ijy-modal-product-discretionary-takeprofit-checkbox:checked").length > 0 ? $(".ijy-modal-product-discretionary-takeprofit-input").removeClass("ijy-text-inactive") : $(".ijy-modal-product-discretionary-takeprofit-input").addClass("ijy-text-inactive")
}
function checkboxProductBuyStopLoss() {
    $(".ijy-modal-product-buy-stoploss-checkbox:checked").length > 0 ? $(".ijy-modal-product-buy-stoploss-input").removeClass("ijy-text-inactive") : $(".ijy-modal-product-buy-stoploss-input").addClass("ijy-text-inactive")
}
function checkboxProductSellStopLoss() {
    $(".ijy-modal-product-sell-stoploss-checkbox:checked").length > 0 ? $(".ijy-modal-product-sell-stoploss-input").removeClass("ijy-text-inactive") : $(".ijy-modal-product-sell-stoploss-input").addClass("ijy-text-inactive")
}
function checkboxProductDiscretionaryStopLoss() {
    $(".ijy-modal-product-discretionary-stoploss-checkbox:checked").length > 0 ? $(".ijy-modal-product-discretionary-stoploss-input").removeClass("ijy-text-inactive") : $(".ijy-modal-product-discretionary-stoploss-input").addClass("ijy-text-inactive")
}
function checkboxOrderOpenTakeProfit() {
    $(".ijy-modal-order-open-takeprofit-checkbox:checked").length > 0 ? $(".ijy-modal-order-open-takeprofit-input").removeClass("ijy-text-inactive") : $(".ijy-modal-order-open-takeprofit-input").addClass("ijy-text-inactive")
}
function checkboxOrderOpenStopLoss() {
    $(".ijy-modal-order-open-stoploss-checkbox:checked").length > 0 ? $(".ijy-modal-order-open-stoploss-input").removeClass("ijy-text-inactive") : $(".ijy-modal-order-open-stoploss-input").addClass("ijy-text-inactive")
}
function checkboxOrderDiscretionaryTakeProfit() {
    $(".ijy-modal-order-discretionary-takeprofit-checkbox:checked").length > 0 ? $(".ijy-modal-order-discretionary-takeprofit-input").removeClass("ijy-text-inactive") : $(".ijy-modal-order-discretionary-takeprofit-input").addClass("ijy-text-inactive")
}
function checkboxOrderDiscretionaryStopLoss() {
    $(".ijy-modal-order-discretionary-stoploss-checkbox:checked").length > 0 ? $(".ijy-modal-order-discretionary-stoploss").removeClass("ijy-text-inactive") : $(".ijy-modal-order-discretionary-stoploss").addClass("ijy-text-inactive")
}
function textProductBuyTakeProfit() {
    Options.textStatus.textProductBuyTakeProfit = !0
}
function textProductBuyStopLoss() {
    Options.textStatus.textProductBuyStopLoss = !0
}
function textProductSellTakeProfit() {
    Options.textStatus.textProductSellTakeProfit = !0
}
function textProductSellStopLoss() {
    Options.textStatus.textProductSellStopLoss = !0
}
function textProductDiscretionaryTakeProfit() {
    Options.textStatus.textProductDiscretionaryTakeProfit = !0
}
function textProductDiscretionaryStopLoss() {
    Options.textStatus.textProductDiscretionaryStopLoss = !0
}
function textOrderOpenTakeProfit() {
    Options.textStatus.textOrderOpenTakeProfit = !0
}
function textOrderOpenStopLoss() {
    Options.textStatus.textOrderOpenStopLoss = !0
}
function textOrderDiscretionaryTakeProfit() {
    Options.textStatus.textOrderDiscretionaryTakeProfit = !0
}
function textOrderDiscretionaryStopLoss() {
    Options.textStatus.textOrderDiscretionaryStopLoss = !0
}
function buttonProductCancel() {
    $(".ijy-modal-product-buy").addClass("hide"), $(".ijy-modal-product-sell").addClass("hide"), $(".ijy-modal-product-discretionary").addClass("hide"), $(".ijy-modal-product-menu").removeClass("hide"), $(".ijy-modal-product-quote").removeClass("hide"), $(".ijy-modal-product-quote-menu").removeClass("hide"), $(".ijy-modal-product-quote-menu-more").removeClass("hide"), $(".ijy-modal-product-discretionary-dateexpire").datetimepicker("destroy"), Options.eventStatus.eventProductBuy = !1, Options.eventStatus.eventProductSell = !1, Options.eventStatus.eventProductDiscretionary = !1, Options.focusStatus.focusProductDiscretionary = !1, Options.focusStatus.focusProductBuy = !1, Options.focusStatus.focusProductSell = !1
}
function buttonQuote(t, o) {
    if (-1 != o && ($(".ijy-modal-product-quote-button").removeClass("ijy-modal-product-quote-button-active"), $(t).addClass("ijy-modal-product-quote-button-active")), -1 == o) $(".ijy-modal-product-quote-menu-more").slideToggle(100);
    else if (0 == o) {
        var e = readHistoryQuote(1),
            i = new VKChart("vkContent");
        i.paint(e, VKChart.Type.mins)
    } else {
        var i = new VKChart("vkContent");
        o > 6 && (i.options.dateTimeType = "date");
        var e = readHistoryQuote(o);
        i.paint(e, VKChart.Type.kline)
    }
}
function buttonWechatBindStatus() {
    $("#wechatBindStatusButton").attr("disabled", !0), setTimeout(function() {
        $("#wechatBindStatusButton").removeAttr("disabled")
    }, 3e3), eventUpdateWechatBindStatus()
}
function buttonFastSigninStatus() {
    $("#fastSigninStatusButton").attr("disabled", !0), setTimeout(function() {
        $("#fastSigninStatusButton").removeAttr("disabled")
    }, 3e3), eventUpdateFastSigninStatus()
}
function buttonUpdateTheme() {
    $(".ijy-modal-userinfo-themearea").removeClass("hide")
}