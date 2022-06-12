---
title: "JavaScript 網頁無限下拉滾動效果 - Intersection Observer"
date: 2022-05-30T20:42:23+08:00
description: "JavaScript 網頁無限下拉滾動效果 - Intersection Observer"
tags: ["JavaScript"]
---
# JavaScript 網頁無限下拉滾動效果 - Intersection Observer
本文將會使用 Intersection Observer (以下稱觀察者) 來實現具有無限下拉滾動效果的網頁。

本文全土法炮製，未引用任何函式庫。

## Dog API
介接 [Dog API](https://dog.ceo/dog-api/) ，這個 API 會傳回隨機的狗狗圖片網址。

```js
/**
 * Get dog image url.
 * @param {number} num 
 * @returns {Promise<string[]>}
 */
async function getDogImages(num = 1) {
  const url = `https://dog.ceo/api/breeds/image/random/${num}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.message;
}
```

## 前置作業
先準備一段 HTML 跟 CSS ：
```html
<main class="main-container" id="main"></main>
```
```css
        .item-container {
            padding: 1rem;
        }

        .item-title {
            font-weight: 700;
            font-size: 1.25rem;
            line-height: 1.5rem;
            text-align: center;
        }

        .item-img {
            display: block;
            max-width: 100%;
            max-height: 100%;
        }

        .item-img-container {
            display: flex;
            height: 260px;
            justify-content: center;
            align-items: center;
        }

        .main-container {
            display: flex;
            flex-direction: column;
            gap: .25rem;
        }
```
在頂層宣告一個變數 `itemCount`，用來紀錄每個狗狗圖片區塊的 id 。
```js
let itemCount = 0;
```
寫一個 `renderItem` 函式，這個函式接受一個狗狗圖片網址，產生一個狗狗圖片區塊 `<div>` 插入至 DOM。

`<div>` 裡面有一個 `<p>` 元素，我把 `itemCount` 寫進它的 `dataset` ，靠這個變數來識別不同的區塊。
```js
function renderItem(src) {
  const img = document.createElement("img");
  img.src = src;
  img.classList.add("item-img");
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("item-img-container");
  imgDiv.appendChild(img);
  const p = document.createElement("p");
  p.textContent = ++itemCount;
  p.classList.add("item-title");
  p.dataset.dog = itemCount;
  const div = document.createElement("div");
  div.classList.add("item-container");
  div.appendChild(p);
  div.appendChild(imgDiv);
  document.querySelector("#main").appendChild(div);
}
```
`fetchPage` 請求狗狗圖片網址，每次請求 4 個網址，請求後將圖片網址交給 `renderItem` 處理。
```js
async function fetchPage() {
  const page = await getDogImages(4);
  for (let i = 0; i < page.length; i++) {
    renderItem(page[i]);
  }
}
```

## 建立觀察者
寫一個 `init` 初始化函式，在函式裡我建立一個觀察者，並第一次請求狗狗圖片，讓觀察者觀察最後一個狗狗圖片區塊。
```js
async function init() {
  const observer = new IntersectionObserver(handleIntersect);
  await fetchPage();
  const el = document.querySelector(`p[data-dog="${itemCount}"]`);
  observer.observe(el);
  console.log("開始觀察", el);
}
```
當觀察者觀察到目標元素時，執行 `handleIntersect` 。

當目標元素進入視野的時候，先停止觀察之前觀察的元素，然後請求新的狗狗圖片，接著渲染新的區塊，然後開始觀察最後一個區塊。

也就是說每次只讓觀察者觀察最後一個區塊，是先停止觀察而不是先請求是為了**防抖(debounce)** ，防止使用者在等待請求的時候，又重新觸發觀察者函式以致重複發送請求。
```js
async function handleIntersect(entries, observer) {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      const stopEl = document.querySelector(`p[data-dog="${itemCount}"]`);
      observer.unobserve(stopEl);
      console.log("停止觀察", stopEl);
      await fetchPage();
      const el = document.querySelector(`p[data-dog="${itemCount}"]`);
      observer.observe(el);
      console.log("開始觀察", el);
    }
  });
}
```
最後在進入網頁時執行 `init` 初始化函式就大功告成啦！
```js
init();
```