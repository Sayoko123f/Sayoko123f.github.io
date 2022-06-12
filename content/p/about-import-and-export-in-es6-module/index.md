---
title: "ES6 模組 import 和 export 的用法"
date: 2022-03-15T18:20:26+08:00
description: "ES6 模組 import 和 export 的用法"
tags: ['JavaScript']
---
# ES6 模組 import 和 export 的用法
**import/export** 是 ES6 加入的關鍵字，用來匯入和匯出模組，以一個檔案為單位，每個檔案自成一個模組，模組可以匯出值、函式及類別供其它檔案匯入使用。

## 匯出和匯入的用法
匯出/匯入有**兩種形式**：「命名匯出/匯入」和「預設匯出/匯入」。在下方示範程式碼中，所有檔案皆放在同一層資料夾。
### 命名匯出
如果想要匯出東西，在宣告前面加上 **export** 即可命名匯出。
```js
// filename: "test1.js"

export const hello = 'hello world';

export function plus(a, b) { return a + b; }

export class Animal{
    constructor(name) { /*something*/ }
}
```

除了在每個宣告前方加上 **export** ，也可以在檔案的結尾一次性匯出，這兩種匯出的匯入方式相同。
```js
// filename: "test1.js"
const hello = 'hello world';

function plus(a, b) { return a + b; }

class Animal {
    constructor(name) {
        this.name = name;
    }
}

export { hello, plus, Animal };
```

### 命名匯入
使用命名匯入上方那個模組，在大括號內填入匯出時的名稱即可匯入，匯入的東西就像是用 `const` 定義了，可以使用該識別名稱參考，如果企圖修改會發生錯誤：
```js
import { hello, Animal, plus } from "./test1.js";

console.log(hello); // hello world
console.log(plus(1, 2)); // 3
const cat = new Animal('cat');
console.log(cat.name); // cat
```
搭配 **as** 關鍵字可以在匯入時進行更名：
```js
import { hello as hi, plus as add } from "./test1.js";
console.log(hi); // hello world
console.log(add(1, 2)); // 3
```
使用 星號「*」 搭配 **as** 可以一次性匯入所有東西，它會創建一個物件，調用物件的特性即可使用。
```js
import * as mod1 from "./test1.js"
console.log(mod1.hello); // hello world
console.log(mod1.plus(1,2)); // 3
```

### 預設匯出
使用預設匯出的好處是更容易被匯入，一個檔案只能有一個預設匯出，在 **export** 後方加上 **default** 就變成了預設匯出。
```js
// filename: "test1.js"
const PI = 3.14;
export default PI;
```
注意預設輸出 default 的後方不能使用 var, let, const。

### 預設匯入
沒有一對大括號就代表是預設匯入，就自己取想要的識別字。
```js
import myPI from "./test1.js";
console.log(myPI) // 3.14
```

## 補充
一個模組可以同時擁有多個命名匯出和一個預設匯出。
```js
// filename: "test3.js"
export const PI = 3.14;
export default 'Hello, World.';
```
如果想要匯入這樣的模組，可以這樣寫：
```js
import hello, { PI } from "./test3.js";
```
又或者是這樣寫：
```js
import { default as hello, PI } from "./test3.js";
```

### 重新匯出
還有一種 re-exports 重新匯出的用法，程式規模大起來以後會用到，