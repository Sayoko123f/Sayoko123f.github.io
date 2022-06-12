---
title: "在 Vue 中 data, method, computed 的使用時機"
date: 2021-09-22T13:59:40+08:00
description: "在 Vue 中 data, method, computed 的使用時機"
tags: ["Vue"]
---
# 在 Vue 中 data, method, computed 的使用時機

`資料(Data)`和`方法(Method)`以及`計算屬性(computed)`是 Vue 物件中常常用來存放資料的地方，然而什麼時候該用哪一種，是在剛開始學的時候會疑惑的一個問題，以下對這三者做整理分析：

## 比較
```js
// Example in component
export default {
    data: () => ({
        nums: [1, 2, 3, 4]
    }),
    computed: {
        sumNums() {
            return this.nums.reduce((acc, cur)=> acc + cur);
        }
    },
    methods: {
        multNums(n) {
            return this.nums.map(e=> e * n);
        }
    }
};
```

### Data 資料
Data 物件很單純，適合用來放資料，以供後續其他地方使用。

### Computed 計算屬性
Computed 計算屬性比較特別，它的性質介於 Data 和 Method 之間，在宣告的時候它長得像函式，但使用的時候不用加小括號。

計算屬性的結果會被**快取**下來，直到它相依的資料有變動時，Vue 會幫我們重新計算。

計算屬性也可以寫成有一對取值器和設值器的物件：
```js
export default{
    computed: {
        sumNums: {
            get() {
                return this.nums.reduce((acc, cur)=> acc + cur);
            },
            set(newVal) {
                // do something...
            }
        }
    },
}
```
因為計算屬性的結果會被快取，如果計算式比較複雜或是不想一直編寫重複的算式，又不需要傳參數，這種時候使用計算屬性最有效率。

### Method 方法
如果**要接收參數**，那只有方法做得到，上面的例子中 multNums(n) 會回傳包含 nums 所有元素 n 倍的陣列，而 n 倍是動態的，所以沒辦法靠計算屬性預先計算，這種情況就是方法出場的最佳時機。

### 整理
用誰|可寫|可接受參數|快取
-|-|-|-
Data|可|否|否
Computed|可|否|有
Method|否|可|否

## 結語
這三者每一種都有各自適合的用法，彼此互相搭配、妥當的運用，才能發揮最大的效益。