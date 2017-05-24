request = { QueryString: function (val)
{
    var uri = window.location.search;
    var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
    return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
},
    QueryStrings: function ()
    {
        var uri = window.location.search;
        var re = /\w*\=([^\&\?]*)/ig;
        var retval = [];
        while ((arr = re.exec(uri)) != null)
            retval.push(arr[0]);
        return retval;
    },
    setQuery: function (val1, val2)
    {
        var a = this.QueryStrings();
        var retval = "";
        var seted = false;
        var re = new RegExp("^" + val1 + "\=([^\&\?]*)$", "ig");
        for (var i = 0; i < a.length; i++)
        {
            if (re.test(a[i]))
            {
                seted = true;
                a[i] = val1 + "=" + val2;
            }
        }
        retval = a.join("&");
        return "?" + retval + (seted ? "" : (retval ? "&" : "") + val1 + "=" + val2);
    }
}

//动态改变URL中参数值
function setUrlParam(para_name, para_value, url)
{
    var strNewUrl = new String();
    var strUrl = url;
    if (strUrl.indexOf("?") != -1)
    {
        strUrl = strUrl.substr(strUrl.indexOf("?") + 1);
        if (strUrl.toLowerCase().indexOf(para_name.toLowerCase()) == -1)
        {
            strNewUrl = url + "&" + para_name + "=" + para_value;
            return strNewUrl;
        } else
        {
            var aParam = strUrl.split("&");
            for (var i = 0; i < aParam.length; i++)
            {
                if (aParam[i].substr(0, aParam[i].indexOf("=")).toLowerCase() == para_name.toLowerCase())
                {
                    aParam[i] = aParam[i].substr(0, aParam[i].indexOf("=")) + "=" + para_value;
                }
            }

            strNewUrl = url.substr(0, url.indexOf("?") + 1) + aParam.join("&");
            return strNewUrl;
        }

    }
    else
    {
        strUrl += "?" + para_name + "=" + para_value;
        return strUrl;
    }
}

function isWechat() {
    var ua = navigator.userAgent.toLowerCase();
    return /micromessenger/i.test(ua) || /windows phone/i.test(ua);
}
