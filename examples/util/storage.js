import { compareDate } from './util.js';

const defaultTime = 30 * 12 * 60 * 60 * 1000; // 默认保存三十天

//获取
const get = (key) => {
    //数据格式 {value: value, time: time}
    let str = localStorage.getItem(key);

    try {
        let obj = JSON.parse(str);

        let isOverdue = compareDate(new Date(), obj.time);

        if (isOverdue) {
            clear(key);
            return null;
        } else {
            return obj.value;
        }
    }
    catch{
        return str;
    }
}

//设置
const set = ({ key, value, time }) => {
    var exp = new Date();
    exp.setTime(exp.getTime() + time || defaultTime);

    var obj = { value: value, time: exp.toGMTString() }

    localStorage.setItem(key, JSON.stringify(obj));
}

//清除
const clear = (key) => {
    localStorage.removeItem(key);
}

export default {
    get,
    set,
    clear
}