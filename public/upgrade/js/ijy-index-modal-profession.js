function showProductDetail(t) {
    historyPushState("modalProduct"), Options.modalStatus.modalProduct = !0;
    var t = $(t), o = t.children(".ijy-product-item-symbol").html(), e = $("#modalProduct .ijy-product-item");
    e.attr("class", ""), e.addClass(o), e.addClass("ijy-product-item"), e.html(t.html()), $("#modalProduct").modal({
        keyboard: !1,
        hide: !1,
        show: !0,
        backdrop: "static"
    })
}
function showOrderOpenDetail(t) {
    historyPushState("modalOrderOpen");
    var t = $(t), o = t.children(".ijy-order-open-item-symbol").html(), e = $("#modalOrderOpen .ijy-order-open-item");
    e.attr("class", ""), e.addClass(o), e.addClass("ijy-order-open-item"), e.html(t.html());
    var i = e.find(".ijy-order-open-item-takeprofitprice").html(),
        r = e.find(".ijy-order-open-item-stoplossprice").html(), d = e.find(".ijy-order-open-item-isbuy").html(),
        a = "true" == d ? TypeUtil.OrderType.BuyMarket : TypeUtil.OrderType.SellMarket;
    $(".ijy-modal-order-open-takeprofit-status").html(PriceUtil.getTakeProfitSymbol(a)), $(".ijy-modal-order-open-stoploss-status").html(PriceUtil.getStopLossSymbol(a)), $(".ijy-modal-order-open-close-input").val(e.find(".ijy-order-open-item-openlots").html()), i > 0 && ($(".ijy-modal-order-open-takeprofit-input").val(i), $(".ijy-modal-order-open-takeprofit-checkbox").prop("checked", !0), $(".ijy-modal-order-open-takeprofit-input").removeClass("ijy-text-inactive"), Options.textStatus.textOrderOpenTakeProfit = !0), r > 0 && ($(".ijy-modal-order-open-stoploss-input").val(r), $(".ijy-modal-order-open-stoploss-checkbox").prop("checked", !0), $(".ijy-modal-order-open-stoploss-input").removeClass("ijy-text-inactive"), Options.textStatus.textOrderOpenStopLoss = !0), e.find(".ijy-order-open-item-bottom").removeClass("hide"), $("#modalOrderOpen").modal({
        keyboard: !1,
        hide: !1,
        show: !0,
        backdrop: "static"
    })
}
function showOrderDiscretionaryDetail(t) {
    historyPushState("modalOrderDiscretionary");
    var t = $(t), o = t.children(".ijy-order-discretionary-item-symbol").html(),
        e = $("#modalOrderDiscretionary .ijy-order-discretionary-item");
    e.attr("class", ""), e.addClass(o), e.addClass("ijy-order-discretionary-item"), e.html(t.html());
    var i = e.find(".ijy-order-discretionary-item-ordertype").html();
    i = Number(i), $(".ijy-modal-order-discretionary-takeprofit-status").html(PriceUtil.getTakeProfitSymbol(i)), $(".ijy-modal-order-discretionary-stoploss-status").html(PriceUtil.getStopLossSymbol(i)), $(".ijy-modal-order-discretionary-price-status").html(PriceUtil.getDiscretionaryPriceSymbol(i));
    var r = $("#modalOrderDiscretionary .ijy-order-discretionary-item-productid").html();
    r = Number(r);
    var d = tempProductRC.get(r);
    $(".ijy-modal-order-discretionary-openlotsmax").html(PriceUtil.getOpenlotsMax(i, d)), $(".ijy-modal-order-discretionary-openlotsmin").html(PriceUtil.getOpenlotsMin(i, d)), $(".ijy-modal-order-discretionary-openlots-input").val(e.find(".ijy-order-discretionary-item-openlots").html());
    var a = PriceUtil.getMoneyByString(e.find(".ijy-order-discretionary-item-discretionaryprice").html());
    $(".ijy-modal-order-discretionary-price-input").val(a), $(".ijy-modal-order-discretionary-takeprofit").html(PriceUtil.getTakeProfitPrice(i, a, d)), $(".ijy-modal-order-discretionary-stoploss").html(PriceUtil.getStopLossPrice(i, a, d));
    var s = e.find(".ijy-order-discretionary-item-takeprofitprice").html(),
        l = e.find(".ijy-order-discretionary-item-stoplossprice").html(),
        n = $("." + o + " .ijy-product-item-spread:eq(0)").html();
    n = parseInt(n), s > 0 ? ($(".ijy-modal-order-discretionary-takeprofit-input").val(s), $(".ijy-modal-order-discretionary-takeprofit-checkbox").prop("checked", !0), $(".ijy-modal-order-discretionary-takeprofit-input").removeClass("ijy-text-inactive"), Options.textStatus.textOrderDiscretionaryTakeProfit = !0) : $(".ijy-modal-order-discretionary-takeprofit-input").val(PriceUtil.getTakeProfitRecommendPrice(a, n, i)), l > 0 ? ($(".ijy-modal-order-discretionary-stoploss-input").val(l), $(".ijy-modal-order-discretionary-stoploss-checkbox").prop("checked", !0), $(".ijy-modal-order-discretionary-stoploss").removeClass("ijy-text-inactive"), Options.textStatus.textOrderDiscretionaryStopLoss = !0) : $(".ijy-modal-order-discretionary-stoploss-input").val(PriceUtil.getStopLossRecommendPrice(a, n, i)), e.find(".ijy-order-discretionary-item-bottom").removeClass("hide"), $("#modalOrderDiscretionary").modal({
        keyboard: !1,
        hide: !1,
        show: !0,
        backdrop: "static"
    })
}
function showOrderHistoryDetail(t) {
    historyPushState("modalOrderHistory"), $("#modalOrderHistory .ijy-order-history-item").html($(t).html()), $("#modalOrderHistory .ijy-order-history-item .hide").removeClass("hide"), $("#modalOrderHistory").modal({
        keyboard: !1,
        hide: !1,
        show: !0,
        backdrop: "static"
    })
}
function showNoticeDetail(t) {
    historyPushState("modalNoticeDetail");
    var t = $(t);
    $(".ijy-modal-notice-item-content").html(t.children(".ijy-notice-item-content").html()), $(".ijy-modal-notice-item-title").html(t.find(".ijy-notice-item-title").html()), $(".ijy-modal-notice-item-sign").html(t.find(".ijy-notice-item-sign").html()), $(".ijy-modal-notice-item-datestart").html(t.find(".ijy-notice-item-datestart").html()), $(".ijy-modal-notice-item-no").html(t.find(".ijy-notice-item-no").html()), $(".ijy-modal-notice-item-headsup").html(t.find(".ijy-notice-item-headsup").html()), $("#modalNoticeDetail").modal({
        keyboard: !1,
        hide: !1,
        show: !0,
        backdrop: "static"
    })
}
function showNewsDetail(t) {
    historyPushState("modalNewsDetail");
    var t = $(t);
    $(".ijy-news-detail-content").html(t.children(".ijy-news-item-content").html()), $(".ijy-news-detail-title").html(t.find(".ijy-news-item-title").html()), $(".ijy-news-detail-date").html(t.find(".ijy-news-item-date").html()), $(".ijy-news-detail-category").html(t.find(".ijy-news-item-category").html()), $("#modalNewsDetail").modal({
        keyboard: !1,
        hide: !1,
        show: !0,
        backdrop: "static"
    })
}
function openChangePasswordModal() {
    historyPushState("modalChangePassword"), $("#modalChangePassword").modal({
        keyboard: !1,
        hide: !1,
        show: !0,
        backdrop: "static"
    })
}
$(".ijy-menu-top-user-username").click(function () {
    historyPushState("modalUserInfo"), $("#modalUserInfo").modal({keyboard: !1, show: !0, backdrop: "static"})
}), $(".ijy-menu-top-user-balance").click(function () {
    historyPushState("modalUserMoney"), $("#modalUserMoney").modal({keyboard: !1, show: !0, backdrop: "static"})
}), $("#modalProduct").on("shown.bs.modal", function (t) {
    var o = readHistoryQuote(1), e = new VKChart("vkContent");
    e.paint(o, VKChart.Type.mins)
}), $("#modalProduct").on("hidden.bs.modal", function (t) {
    Options.modalStatus.modalProduct = !1, buttonProductCancel(), $(".ijy-modal-product-buy-openlots-input").val(""), $(".ijy-modal-product-buy-takeprofit-input").val(""), $(".ijy-modal-product-buy-stoploss-input").val(""), $(".ijy-modal-product-buy-takeprofit-checkbox").prop("checked", !1), $(".ijy-modal-product-buy-stoploss-checkbox").prop("checked", !1), $(".ijy-modal-product-sell-openlots-input").val(""), $(".ijy-modal-product-sell-takeprofit-input").val(""), $(".ijy-modal-product-sell-stoploss-input").val(""), $(".ijy-modal-product-sell-takeprofit-checkbox").prop("checked", !1), $(".ijy-modal-product-sell-stoploss-checkbox").prop("checked", !1), $(".ijy-modal-product-quote-button").removeClass("ijy-modal-product-quote-button-active"), $(".ijy-modal-product-quote-button").eq(0).addClass("ijy-modal-product-quote-button-active"), $(".ijy-modal-product-discretionary-dateexpire").datetimepicker("destroy"), $(".ijy-modal-product-buy-takeprofit-input").addClass("ijy-text-inactive"), $(".ijy-modal-product-sell-takeprofit-input").addClass("ijy-text-inactive"), $(".ijy-modal-product-discretionary-takeprofit-input").addClass("ijy-text-inactive"), $(".ijy-modal-product-buy-stoploss-input").addClass("ijy-text-inactive"), $(".ijy-modal-product-sell-stoploss-input").addClass("ijy-text-inactive"), $(".ijy-modal-product-discretionary-stoploss-input").addClass("ijy-text-inactive")
}), $("#modalOrderOpen").on("shown.bs.modal", function (t) {
    Options.eventStatus.eventOrderOpen = !0
}), $("#modalOrderOpen").on("hidden.bs.modal", function (t) {
    Options.eventStatus.eventOrderOpen = !1, $(".ijy-modal-order-open-takeprofit-checkbox").prop("checked", !1), $(".ijy-modal-order-open-stoploss-checkbox").prop("checked", !1), $(".ijy-modal-order-open-takeprofit-input").val(""), $(".ijy-modal-order-open-stoploss-input").val(""), $(".ijy-modal-order-open-close-input").val(""), $(".ijy-modal-order-open-takeprofit-input").addClass("ijy-text-inactive"), $(".ijy-modal-order-open-stoploss-input").addClass("ijy-text-inactive"), Options.textStatus.textOrderOpenTakeProfit = !1, Options.textStatus.textOrderOpenStopLoss = !1
}), $("#modalOrderDiscretionary").on("shown.bs.modal", function (t) {
    Options.eventStatus.eventOrderDiscretionary = !0
}), $("#modalOrderDiscretionary").on("hidden.bs.modal", function (t) {
    Options.eventStatus.eventOrderDiscretionary = !1, $(".ijy-modal-order-discretionary-takeprofit-checkbox").prop("checked", !1), $(".ijy-modal-order-discretionary-stoploss-checkbox").prop("checked", !1), $(".ijy-modal-order-discretionary-takeprofit-input").val(""), $(".ijy-modal-order-discretionary-stoploss-input").val(""), $(".ijy-modal-order-discretionary-takeprofit-input").addClass("ijy-text-inactive"), $(".ijy-modal-order-discretionary-stoploss").addClass("ijy-text-inactive"), Options.textStatus.textOrderDiscretionaryTakeProfit = !1, Options.textStatus.textOrderDiscretionaryStopLoss = !1
}), $("#modalChangePassword").on("shown.bs.modal", function (t) {
    $(".ijy-modal-changepassword-fastsignin-checkbox").prop("checked", !0), $(".ijy-modal-changepassword-text-newpassword").val(""), $(".ijy-modal-changepassword-text-oldpassword").val("")
});