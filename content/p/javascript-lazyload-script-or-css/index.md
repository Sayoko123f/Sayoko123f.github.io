---
title: "JavaScript 視需要動態地載入 Script 和 CSS"
date: 2021-05-18T20:49:52+08:00
description: "JavaScript 視需要動態地載入 Script 和 CSS"
tags: ['JavaScript']
---
# 視需要動態地載入 Script 和 CSS
## Script
有的時候，某些 Script 檔案的功能不需要馬上用到或是根本不太常用，如果放在 Head 裡面，就浪費了一點載入的時間，這種時候就適合使用動態載入的方式。底下包成一個回傳 Promise 的函式：
```js
function importScript(url) {
    return new Promise((resolve, reject) => {
        let s = document.createElement('script');
        s.onload = () => { resolve(); };
        s.onerror = (e) => { reject(e); };
        s.src = url;
        document.head.appendChild(s);
    })
}
```
## CSS
```js
function importCSS(url) {
    return new Promise((resolve, reject) => {
        let l = document.createElement('link');
        l.onload = () => { resolve(); };
        l.onerror = (e) => { reject(e); };
        l.rel = 'stylesheet';
        l.href = url;
        document.head.appendChild(l);
    })
}
```