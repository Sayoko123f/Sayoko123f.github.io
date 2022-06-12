---
title: "JavaScript 關於錯誤處理與自訂錯誤類別"
date: 2021-10-10T11:49:39+08:00
description: "JavaScript 關於錯誤處理與自訂錯誤類別"
tags: ['JavaScript']
---
# JavaScript 關於錯誤處理與自訂錯誤類別

## 關於錯誤
在 JavaScript 中，內建有 Error 類別，詳細請見 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)。先來看看錯誤長什麼樣子，下方程式碼引發一個 **SyntaxError** 
```js
JSON.parse('foo');
```
在主控台會看到這段訊息
```
VM252:1 Uncaught SyntaxError: Unexpected token o in JSON at position 1
    at JSON.parse (<anonymous>)
    at test.js:1
```

## 捕捉錯誤並檢視訊息
可利用 **try/catch** 語句捕捉錯誤，錯誤物件的 `name` 和 `message` 特性包含錯誤的名字與訊息，`toString()` 方法會回傳一段包含 `name` 跟 `message` 的字串。如果想要檢視呼叫堆疊，可以使用 `console.trace()` 。
```js
try {
    JSON.parse('foo');
} catch (err) {
    console.log(err.name); // SyntaxError
    console.log(err.message); // Unexpected token o in JSON at position 1
    console.log(err.toString()); // SyntaxError: Unexpected token o in JSON at position 1
    console.trace();
}
```

## throw 拋出錯誤
除了 JavaScript 發生錯誤時系統自動拋出錯誤，我們也可以使用 **throw** 手動拋出錯誤，語法如下：
```
throw expression
```
expression 可以拋出任何值，可能是一個數字，或是代表錯誤訊息的一段字串，在實務上，通常會拋出一個 Error 物件：
```js
throw new Error("message");
```

## try/catch/finally 語法
用法在 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) 寫得很清楚不多贅述。


## 常見的錯誤類別
JavaScript 定義了幾個 Error 的子類別，比較常用的包含：
+ EvalError
+ RangeError
+ ReferenceError
+ SyntaxError
+ TypeError
+ URIError

## 自訂錯誤類別
可以透過繼承 Error 類別來定義自己的錯誤類別，例如可以定義一個 HTTPError 類別，除了必須的 `name` 和 `message` 特性以外，也可以加入新的特性例如 `status` 紀錄 HTTP 狀態碼以方便除錯，或 `url` 特性紀錄請求的 URL。
```js
class HTTPError extends Error {
    constructor(status, message, url) {
        super(`${status} ${message} ${url}`);
        this.name = 'HTTPError';
        this.message = message;
        this.status = status;
        this.url = url;
    }
}

try {
    throw new HTTPError(404, 'Not found.', 'http://example.com/');
} catch (err) {
    console.log(err.name); // HTTPError
    console.log(err.message); // Not found.
    console.log(err.status); // 404
    console.log(err.url); // http://example.com/
    console.log(err.toString()) // HTTPError: Not found.
}
```