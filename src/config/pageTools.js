const pageParam = "string from pageTools"
var pageTools = {
    //日期时间格式化，fmt可选格式：'yyyy-MM-dd hh:mm:ss.S')
    timeFmt: function(value, fmt) {
        let val = new Date(value);
        let o = {
            "M+": val.getMonth() + 1, //月份
            "d+": val.getDate(), //日
            "h+": val.getHours(), //小时
            "m+": val.getMinutes(), //分
            "s+": val.getSeconds(), //秒
            "q+": Math.floor((val.getMonth() + 3) / 3), //季度
            "S": val.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (val.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    //时间日期格式
    numberList: function(n) {
        return n < 10 ? "0" + n : "" + n;
    },
    //数字转货币类型
    toMoney: function(number) {
        if (parseInt(number) == number) {
            return number + ".00";
        } else if (parseInt(number * 10) == number * 10) {
            return number + "0";
        } else if (parseInt(number * 100) == number * 100) {
            return number;
        } else {
            return parseFloat(number).toFixed(2);
        }
    }
}
export default pageTools