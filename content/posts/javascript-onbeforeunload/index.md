---
title: "JavaScript 在離開頁面之前詢問使用者是否要離開"
date: 2021-05-21T09:34:20+08:00
description: "JavaScript 在離開頁面之前詢問使用者是否要離開"
tags: ['JavaScript']
---
# 在離開頁面之前詢問使用者是否要離開
[WindowEventHandlers.onbeforeunload MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Window/beforeunload_event)
## window.onbeforeunload
這樣寫即可。
```js
window.onbeforeunload = function () {
    return "";
}
```
## 為防止詐騙，各大瀏覽器已不支援自訂訊息
```js
// Deprecated
window.onbeforeunload = function()
{
    if(!confirm('您確定要離開網頁嗎？'))
    {
        return false;
    }
}
```
在以前可能會這樣寫，雖然這樣寫功能仍可以正常運作，但為了防止詐騙，現在瀏覽器已經不支援自訂訊息了，所以只會看到瀏覽器預設的訊息。