---
title: "JavaScript 如何動態地插入元素至 DOM"
date: 2021-05-20T09:52:56+08:00
description: "JavaScript 如何動態地插入元素至 DOM"
tags: ['JavaScript']
---
# 如何動態地插入元素至 DOM
## 先備知識
建議已經對 [HTML DOM](https://www.w3schools.com/whatis/whatis_htmldom.asp) 有基本了解的讀者再閱讀底下內容。

## 節點關係
考慮以下 HTML：```<body>``` 底下有 ```id="box"``` 的 ```<div>```，底下又有 4 顆 button。 button 在 div 底下，所以 button 是 div 的**子節點**， div 是 button 的**父節點**，稱為**父子關係**。而 4顆 button 之間彼此是**兄弟關係**。
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <div id="box">
        <button id="btn1">btn1</button>
        <button id="btn2">btn2</button>
        <button id="btn3">btn3</button>
        <button id="btn4">btn4</button>
    </div>
</body>

</html>
```

## 透過父子關係或兄弟關係選擇元素
繼續用上面的 HTML：
```js
let box = document.getElementById('box');
box.children; // array: HTMLCollection(4) [button#btn1, button#btn2, button#btn3, button#btn4]
box.firstChild // #btn1
box.lastChild // #btn4

let btn2 = document.getElementById('btn2');
btn2.parentNode;     // div#box
btn2.previousSibling // button#btn1
btn2.nextSibling     // button#btn3
```

## 插入和移除元素
只要記得一個觀念：「一個新元素必須從父節點插入，從父節點移除」也就是說父節點有底下子代的控制權。
### appendChild(newnode)：從父節點插入子節點於最後
```js
// create a new element <button>btn5</button>
let btn5 = document.createElement('button');
btn5.textContent = 'btn5';
// insert
document.getElementById('box').appendChild(btn5);
```
### insertBefore(newnode, refnode)：在 refnode 之前插入 newnode
```js
let newnode = document.createElement('button');
newnode.textContent = 'btn6';
// insert
let refnode = document.getElementById('btn2');
refnode.parentNode.insertBefore(newnode, refnode)
```
以上程式碼會在 #btn2 之前插入一個 btn6。
### insertAfter(newnode, refnode)：在 refnode 之後插入 newnode
由於瀏覽器沒有內建這個方法，於是自己實作吧。
```js
function insertAfter(newnode, refnode) {
    refnode.parentNode.insertBefore(newnode, refnode.nextSibling);
}

let btn7 = document.createElement('button');
btn7.textContent = 'btn7';
insertAfter(btn7, document.getElementById('btn4'));
```
這樣就成功在 #btn4 之後插入一個 btn7 囉。

### removeChild(node)：刪除子節點
如果想要刪除 #btn3，那麼得先找到 #btn3 的父節點，在父節點上調用 ```removeChild(node)```。
```js
let btn3 = document.getElementById('btn3');
btn3.parentNode.removeChild(btn3);
```
也有一種方法是 ```element.remove()``` 直接在要刪除的元素上調用即可，但這種方法 IE 不支援。