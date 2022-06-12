---
title: "JavaScript Intersection Observer API 筆記"
date: 2022-05-28T10:08:48+08:00
description: "JavaScript Intersection Observer API 筆記"
tags: ['JavaScript']
---
# JavaScript Intersection Observer API 筆記
Intersection Observer(以下稱交集觀察者或觀察者) 筆記。

## 常用屬性跟方法
### IntersectionObserverEntry.intersectionRatio
描述元素可見的比例，為範圍 `1.0` 至 `0.0` 之間的數字。

### IntersectionObserverEntry.target
指向被觀察的目標元素。

### IntersectionObserverEntry.isIntersecting
一個 `Boolean` 值，如果目標元素處於相交狀態則為 `true`，反之為 `false`。

### IntersectionObserver.observe()
傳入 `Element` 開始觀察。
```js
observe(targetElement)
```
該元素必須是 `IntersectionObserver.root` 元素的後代。

### IntersectionObserver.unobserve()
停止觀察該元素。
```js
unobserve(target)
```
就算該元素不是正在被觀察也不會拋出任何錯誤。

### IntersectionObserver.disconnect()
停止觀察所有元素。

### IntersectionObserver()
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)

建立觀察者實例的建構函式。
```js
new IntersectionObserver(callback)
new IntersectionObserver(callback, options)
```
有兩個引數會被傳入 callback ：

第一引數是 `IntersectionObserverEntry[]`；

第二引數是 `IntersectionObserver` 觀察者的實例；

callback 起手式如下：
```js
function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    const { target } = entry;
    if (entry.isIntersecting) {
      console.log(`${target.id} 正在視野內`);
    } else {
      console.log(`${target.id} 不在視野內`);
    }
  });
}
```

options 有一些選項可以調整，詳情請見 MDN 。

## 淡入效果
以下來實現淡入的效果，概念是利用 CSS 的 `opacity`，一開始是 0，當進入觀察者視野後改變成 1 ，配合 `transition` 實現效果。
```html
<body>
    <style>
        .area {
            height: 200px;
            background-color: #36aa00;
            margin-bottom: 60px;
            transition-property: opacity;
            transition-duration: 500ms;
            transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
        }

        .opacity-0 {
            opacity: 0;
        }
    </style>
    <div id="div1" class="area opacity-0">Div 1</div>
    <div id="div2" class="area opacity-0">Div 2</div>
    <div id="div3" class="area opacity-0">Div 3</div>
    <div id="div4" class="area opacity-0">Div 4</div>
    <div id="div5" class="area opacity-0">Div 5</div>
    <div id="div6" class="area opacity-0">Div 6</div>
    <div id="div7" class="area opacity-0">Div 7</div>
    <div id="div8" class="area opacity-0">Div 8</div>
    <div id="div9" class="area opacity-0">Div 9</div>
</body>
```
先準備 `handleIntersect` 函式，在函式內判斷交集比例 `intersectionRatio` 或 `isIntersecting`，藉以決定要做什麼事。

這裡我判斷 `isIntersecting` 當進入視野時，將目標元素的 class `opacity-0` 移除，並且解除觀察。
```js
function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    const { target } = entry;
    if (entry.isIntersecting) {
      target.classList.remove('opacity-0')
      observer.unobserve(target);
    }
  });
}
```
建立觀察者實例，並開始觀察目標 `<div>`。
```js
const observer = new IntersectionObserver(handleIntersect);
for (let i = 0; i < 9; i++) {
  observer.observe(document.querySelector(`#div${i + 1}`));
}
```

## 參考
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)