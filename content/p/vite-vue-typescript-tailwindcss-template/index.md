---
title: "Vite + Vue + TypeScript + Tailwindcss 起手式"
date: 2022-04-30T16:32:38+08:00
description: "Vite + Vue + TypeScript + Tailwindcss 起手式"
tags: ["TypeScript","Vite","Vue"]
---
# Vite + Vue + TypeScript + Tailwindcss 起手式
## 文件
> 本筆記提到的 Vue 與 Vue 插件都為 Vue 3!

[create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite#readme)

[Tailwindcss install guide](https://tailwindcss.com/docs/guides/vite)

[tsconfig](https://www.typescriptlang.org/tsconfig)

## 指令
使用 **create-vite** 安裝 **vue-ts** 模板
```
npm create vite@latest my-vue-app -- --template vue-ts
```
```
cd my-vue-app
npm install
```
安裝 **Tailwind**
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Tailwindcss 設定檔案 `tailwind.config.js`
```js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
建立 `./src/index.css` 
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
在 `./src/main.ts` 引入 `index.css`
```js
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')
```
## 選用
### vue-router
[vue-router@4 docs](https://router.vuejs.org/installation.html)
```
npm install vue-router@4
```
建立 `./src/router.js` 檔案，底下是範例內容，自行修改。
```js
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';

const routes = [
    { path: '/', component: HelloWorld, name: 'home' },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
```
在 `./src/main.ts` 中引入 **router**
```js
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { router } from './router';

createApp(App).use(router).mount('#app');
```
### Pinia
[docs](https://pinia.vuejs.org/getting-started.html)
### vuex
> 官方推薦改用 Pinia 取代 vuex

[vuex docs](https://vuex.vuejs.org/installation.html)
### prettier
[prettier config docs](https://prettier.io/docs/en/configuration.html)

建立 `prettier.config.js`，底下是常用設定
```js
module.exports = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
};
```
### prettier-plugin-tailwindcss
[github](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
```
npm install -D prettier prettier-plugin-tailwindcss
```
### tailwind-plugin-forms
[github](https://github.com/tailwindlabs/tailwindcss-forms)
```
npm install -D @tailwindcss/forms
```
在 `tailwind.config.js` 的 `plugins` 中引入
```
require('@tailwindcss/forms'),
```
或者不使用全域 CSS
```
require('@tailwindcss/forms')({strategy: 'class'}),
```
### tailwind-plugin-line-clamp
[github](https://github.com/tailwindlabs/tailwindcss-line-clamp)
```
npm install -D @tailwindcss/line-clamp
```
在 `tailwind.config.js` 的 `plugins` 中引入
```
require('@tailwindcss/line-clamp'),
```
### tailwind-plugin-aspect-ratio
[github](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)
```
npm install -D @tailwindcss/aspect-ratio
```
在 `tailwind.config.js` 的 `plugins` 中引入
```
require('@tailwindcss/aspect-ratio'),
```
### tailwind-plugin-typography
[docs](https://tailwindcss.com/docs/typography-plugin)
```
npm install -D @tailwindcss/typography
```
在 `tailwind.config.js` 的 `plugins` 中引入
```
require('@tailwindcss/typography'),
```

## 其它
### VS Code
[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) 使用 Tailwind 必裝的擴充功能。