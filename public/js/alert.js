(function($) {
	String.prototype.format = function() {
		var args = arguments;
		var reg = /\{(\d+)\}/g;
		return this.replace(reg, function(g0, g1) {
			return args[+g1];
		});
	};
	$.fn.extend({
		"SK_DivContent": function() { //元素居中
			return this.css({
				"position": "fixed",
				"top": "50%",
				"left": "50%",
				"margin-left": -(this.width() / 2),
				"margin-top": -(this.height() / 2)
			});
		},
		"SK_alert": function(msg, callback) {
			msg = msg || "";
			var t = 10000;
			var _timeout = null;
			var html =
				'<div class="MSK" style="display:block">' +
				'     <div class="SK_alert">' +
				'	<div class="SK_alert_text">{0}</div>' +
				'	<div class="SK_alert_submit">确定</div>' +
				'    </div>' +
				'</div>';
			html = html.format(msg);
			$("body").append(html);
			$(".SK_alert_submit").on("click", function() {
				clearTimeout(_timeout);
				$(".MSK").remove();
				callback && callback();
			});
			if (t >= 0) {
				_timeout = setTimeout(function() {
					clearTimeout(_timeout);
					try {
						$(".MSK").remove();
						callback && callback();
					} catch (e) {

					}
				}, t);
			}
			$(".SK_alert").SK_DivContent();
		},
		"SK_confirm": function(msg, confirmclick, cancelclick, confirmBtn, CancelBtn) {
			var html =
				'       <div class="MSK" style="display:block">' +
				'			<div class="SK_confirm">' +
				'				<div class="SK_confirm_text">{0}</div>' +
				'				<div class="SK_confirm_submit">' +
				'					<div class="left_submit">' +
				'						{1}' +
				'					</div>' +
				'					<span class="Division"></span>' +
				'					<div class="right_submit">' +
				'						{2}' +
				'					</div>' +
				'				</div>' +
				'			</div>' +
				'		</div>';
			html = html.format(msg, confirmBtn || "确定", CancelBtn || "取消");
			$("body").append(html);
			$(".left_submit").on("click", function() {
				$(".MSK").remove();
				confirmclick && confirmclick();
			});
			$(".right_submit").on("click", function() {
				$(".MSK").remove();
				cancelclick && cancelclick();
			});
			$(".SK_confirm").SK_DivContent();
		}
	});
})(jQuery);