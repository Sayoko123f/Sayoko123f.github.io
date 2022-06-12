---
title: "如何使用 JavaScript 切換元素的 class"
date: 2021-05-13T10:16:52+08:00
description: "如何使用 JavaScript 切換元素的 class"
tags: ['JavaScript']
---
# 如何使用 JavaScript 切換元素的 class
利用 ```element.classList```即可，底下來看看如何使用：
```html
<!-- html -->
<p id="p1">Hello World!</p>
```
```css
/* css */
.blue{
    color: blue;
}
.red{
    color: red;
}
.green{
    color: green;
}
```
## element.classList
### element.classList
包含了這個元素所有的類別名稱的物件。
```js
let p1 = document.getElementById('p1'); // 後面的範例都省略這行
p1.classList; // { length: 0, value: ""}
p1.classList.length === 0; // true
p1.classList.add('red');
p1.classList; // {0: "red", length: 1, value: "red"}
p1.classList[0]; // "red"
```
### classList.add(classname)
傳入類別名稱就會添加類別至元素上，如果已經有了則什麼事都不會發生。
```js
p1.classList.add('blue');
```
### classList.contains(classname)
傳入類別名稱，傳回 ```boolean```，如果存在該類名就是 ```true```，反之 ```false```。
```js
p1.classList.contains('blue'); // true or false
```
### classList.replace(old, new)
將一個類別取代為另一個類別，如果不存在就什麼事都不會發生。
```js
p1.classList.replace('red', 'green');
```
### classList.remove(classname)
傳入類別名稱就會在元素上刪除該類名，如果不存在則什麼事都不會發生。
```js
p1.classList.remove('red');
```
### classList.toggle(classname, force?: boolean)
用開關的方式操作，如果 ```classList``` 內不存在類別就添加，反之則移除。第二個可選參數指示是否為單向開關，如果是 ```true``` 則效果和 ```classList.add``` 一樣；如果是 ```false``` 則效果和 ```classList.remove``` 一樣。這個函式會傳回 ```boolean``` ，和 ```classList.contains``` 一樣。
```js
p1.classList; // { length: 0, value: ""}
p1.classList.toggle('red');
p1.classList.contains('red'); // true
p1.classList.toggle('red');
p1.classList.contains('red'); // false
```
### 應用 - 三種類別的輪流切換
配合 ```setInterval``` 就可以寫出定時切換類別的效果。以下例子會在 ```red, blue, green``` 三個類別之間做切換。
```js
let timer = setInterval(() => {
    let p1 = document.getElementById('p1');
    let arr = [p1.classList.contains('red'), p1.classList.contains('blue'), p1.classList.contains('green')];
    p1.classList.toggle('blue', arr[0]);
    p1.classList.toggle('green', arr[1]);
    p1.classList.toggle('red', arr[2]);
}, 500);
```
## References
[MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/classList)