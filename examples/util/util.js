
//比较时间大小
export function compareDate(date1, date2) {
    var oDate1 = new Date(date1);
    var oDate2 = new Date(date2);
    if (oDate1.getTime() > oDate2.getTime()) {
        return true; //第一个大
    } else {
        return false; //第二个大
    }
}

//获取guid
export function getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}