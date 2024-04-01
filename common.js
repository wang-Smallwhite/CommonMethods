'use strict'

// utils 是一个工具库，包含了一些通用辅助函数
var toString = Object.prototype.toString

/**
 * 判断一个值是否为数组
 *
 * @param {Object} val 需要测试的值
 * @returns {boolean} 如果值是数组，则返回true，否则返回false
 */
export function isArray (val) {
  return toString.call(val) === '[object Array]'
}

/**
 * 判断一个值是否为对象
 *
 * @param {Object} val 需要测试的值
 * @returns {boolean} 如果值不是null且是对象类型，则返回true，否则返回false
 */
export function isObject (val) {
  return val !== null && typeof val === 'object'
}

/**
 * 判断一个值是否为日期对象
 *
 * @param {Object} val 需要测试的值
 * @returns {boolean} 如果值是日期对象，则返回true，否则返回false
 */
export function isDate (val) {
  return toString.call(val) === '[object Date]'
}

/**
 * 判断一个值是否为URLSearchParams对象
 *
 * @param {Object} val 需要测试的值
 * @returns {boolean} 如果值是URLSearchParams对象，则返回true，否则返回false
 */
export function isURLSearchParams (val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

/**
 * 遍历一个数组或对象，对每个元素或属性调用一个函数
 *
 * 如果`obj`是数组，回调函数将依次传入每个元素的值、索引和整个数组。
 * 如果`obj`是对象，回调函数将传入每个属性的值、键和整个对象。
 *
 * @param {Object|Array} obj 需要遍历的对象或数组
 * @param {Function} fn 对每个元素或属性调用的回调函数
 */
export function forEach (obj, fn) {
  // 如果没有提供值，就不执行遍历
  if (obj === null || typeof obj === 'undefined') {
    return
  }

  // 如果不是可迭代的对象，就强制转换为数组
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj]
  }

  if (isArray(obj)) {
    // 遍历数组
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj)
    }
  } else {
    // 遍历对象的属性
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj)
      }
    }
  }
}

/**
 * 判断一个值是否为布尔值
 * 
 * @param {any} val 需要判断的值
 * @returns {boolean} 如果是布尔值则返回true，否则返回false
 */
export function isBoolean(val) {
  return typeof val === 'boolean'
}

/**
 * 判断是否为真正的对象{}或new Object
 * 
 * @param {any} obj - 需要检测的对象
 * @returns {boolean} 如果是对象则返回true，否则返回false
 */
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 深度合并对象，与merge函数相似，但不保留原始对象的引用。
 *
 * @param {...Object} obj1... - 需要合并的对象，可以接收多个对象参数
 * @returns {Object} 合并后所有属性的结果对象
 */
export function deepMerge(/* obj1, obj2, obj3, ... */) {
  let result = {}
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val)
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val)
    } else {
      result[key] = val
    }
  }
  for (let i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue)
  }
  return result
}

/**
 * 各种正则表达式
 * mobile   手机号
 * email    电子邮箱
 * password 密码【6-20位】
 * integer  正整数【不包含0】
 * money    金钱
 * TINumber 纳税识别号
 * IDCard   身份证
 * userName 账户名称【汉字、字母、数字、“-”、“_”的组合】
 * URL      URL
 * TEL      固定电话
 */

// 手机号
export const mobile = /^0?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/

// 电子邮箱
export const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

// 密码【6-20位】
export const password = /^[@A-Za-z0-9!#$%^&*.~,]{6,20}$/

// 正整数【不包含0】
export const integer = /^[1-9]\d*$/

// 正整数【包含0】
export const Integer = /^[0-9]\d*$/

// 金钱
export const money = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/

// 纳税识别号
export const TINumber = /^((\d{6}[0-9A-Z]{9})|([0-9A-Za-z]{2}\d{6}[0-9A-Za-z]{10,12}))$/

// 身份证
export const IDCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

// 账户名称【汉字、字母、数字、“-”、“_”的组合】
export const userName = /[A-Za-z0-9_\-\u4e00-\u9fa5]$/

// URL
export const URL =
	/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/

// 固话
export const TEL = /0\d{2,3}-\d{7,8}/


// 营业执照号
export const licenseNum = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;


/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse(url) {
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  if (arr) {
    arr.forEach(item => {
      let tempArr = item.substring(1).split("=");
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr.splice(1).join("="));
      obj[key] = val;
    });
  }
  return obj;
}

/**
 * 13888888888 -> 138****8888   手机号脱敏
 * @param mobile
 * @returns {*}
 */
export function secrecyMobile (mobile) {
  mobile = String(mobile);
  if (!/\d{11}/.test(mobile)) {
    return mobile;
  }
  return mobile.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
}

/**
 * 金钱单位置换  2999 --> 2,999.00
 * @param val
 * @param unit
 * @param location
 * @returns {*}
 */
export function unitPrice (val, unit, location) {
  if (!val) val = 0;
  let price = Foundation.formatPrice(val);
  if (location === "before") {
    return price.substr(0, price.length - 3);
  }
  if (location === "after") {
    return price.substr(-2);
  }
  return (unit || "") + price;
}