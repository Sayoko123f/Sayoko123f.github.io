---
title: "T[number] 是什麼"
date: 2023-08-25T17:41:42+08:00
description: "解釋在 TypeScript 中什麼是 T[number]"
tags: ['TypeScript']
---
# T[number] 是什麼

為了想跟同事解釋什麼是 `T[number]` 所以有這篇筆記。

## 為什麼可以使用 T[number] 來表示陣列元素的類型

要瞭解這個問題，可以先從 TypeScript 定義 Array 的原始碼開始

[Source Code](https://github.com/microsoft/TypeScript/blob/main/src/lib/es5.d.ts#L1476)

點進去可以看到，Array 其實就是一個 interface

```ts
interface Array<T> {
    length: number;

    // 若干陣列方法...

    [n: number]: T;
}
```

注意在最後一行的 `[n: number]: T;` ，這是索引類型語法。

代表這個 interface 的任何 number 索引類型是 T，也就是 array[0] 是 T ，array[1] 也是 T，這就是我們熟悉的陣列了。

關於索引類型更詳細的說明請看 [TypeScript 中文教程](https://wangdoc.com/typescript/object#%E5%B1%9E%E6%80%A7%E5%90%8D%E7%9A%84%E7%B4%A2%E5%BC%95%E7%B1%BB%E5%9E%8B)

## PropertyKey

TypeScript 有一個內建類型 `PropertyKey` ，它代表可成為物件索引的三種類型 `string | number | symbol`。

```ts
type PropertyKey = string | number | symbol
```

也就是說物件的索引可能有這三種類型，然而 number 索引在物件內部會被轉換成 string，所以 number 索引的類型只能是 string 索引的子類型。

瞭解這些之後，底下是一個同時使用三種索引簽名的例子。

```ts
interface Example {
    [key: string]: boolean;
    [key: number]: false;
    [key: symbol]: 'Hello World'
}

type A = Example[string]; // boolean
type B = Example[number]; // false
type C = Example[symbol]; // "Hello World"

const mySymbol = Symbol()

const example: Example = {
    foo: true,
    bar: false,
    1: false,
    [mySymbol]: 'Hello World'
}
```