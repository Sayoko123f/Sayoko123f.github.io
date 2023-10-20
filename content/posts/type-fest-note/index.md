---
title: "type-fest 筆記"
date: 2023-08-25T17:41:42+08:00
description: "筆記 type-fest 的用法"
tags: ['TypeScript']
---
# type-fest 筆記

[type-fest](https://github.com/sindresorhus/type-fest) 是包含 TypeScript 實用助手類型的庫。

本處所有例子可複製至 [TypeScript Playground](https://www.typescriptlang.org/play) 查看練習。

`// @ts-expect-error` 代表預期下一行 TS 程式碼是有錯誤的。

> 本文撰寫時使用的 TypeScript 版本為 5.2.2

## Opaque 不透明類型

> 不透明類型也被稱為品牌類型(brand)

有時候我們會想要創建更安全、更容易被區分的類型。

```ts
interface User {
    username: string;
    password: string;
}
```

使用者名稱與密碼都是字串類型，但很顯然這兩個東西不應該被混淆使用，TypeScript 沒辦法區分這兩者有何不同。

靠不透明類型，可以協助標記某些特別重要、需要明顯區分的類型。

如果我們覺得 `User` 的 `password` 需要明顯區分，可以這樣寫：

```ts
import { Opaque } from 'type-fest'

interface User {
    username: string;
    password: Opaque<string, 'Password'>;
}

declare function confirmPassword(password: User['password']): void
declare const user: User

// @ts-expect-error
confirmPassword(user.username);

// ok
confirmPassword(user.password);
```

## RequireOneOrNone 必填一個或不填

```ts
import { RequireOneOrNone } from 'type-fest'

interface Options {
    opt1?: number
    opt2?: number
}

// @ts-expect-error
const example1: RequireOneOrNone<Options> = {
    opt1: 0,
    opt2: 0,
}

// ok
const example2: RequireOneOrNone<Options> = {
    opt1: 0,
}

// ok
const example3: RequireOneOrNone<Options> = {
    opt2: 0,
}

// ok
const example4: RequireOneOrNone<Options> = {}
```

第二個泛型參數可以填入有哪些 `key` 要納入判斷，預設是所有 `key`，未被納入判斷的 `key` 保持原樣。

底下是一個只判斷 opt1 跟 opt2 的例子， opt3 未納入判斷所以保持原樣(若必填就必填，可選就可選)：

```ts
import { RequireOneOrNone } from 'type-fest'

interface Options {
    opt1?: number
    opt2?: number
    opt3?: number
}

// ok
const example5: RequireOneOrNone<Options, 'opt1' | 'opt2'> = {
    opt1: 0,
    opt3: 1,
}
```

## RequireExactlyOne 必填一個，不可超過

```ts
import { RequireExactlyOne } from 'type-fest'

interface Options {
    opt1: number;
    opt2: number;
}

// ok
const example1: RequireExactlyOne<Options> = {
    opt1: 0,
}

// ok
const example2: RequireExactlyOne<Options> = {
    opt2: 0,
}

// @ts-expect-error
const example3: RequireExactlyOne<Options> = {
    opt1: 0,
    opt2: 0,
}

// @ts-expect-error
const example4: RequireExactlyOne<Options> = {}
```

第二個泛型參數可以填入有哪些 `key` 要納入判斷，預設是所有 `key`，未被納入判斷的 `key` 保持原樣。

## RequireAtLeastOne 至少填一個

```ts
import { RequireAtLeastOne } from 'type-fest'

interface Options {
    opt1: number;
    opt2: number;
}

// ok
const example1: RequireAtLeastOne<Options> = {
    opt1: 0,
}

// ok
const example2: RequireAtLeastOne<Options> = {
    opt2: 0,
}

// ok
const example3: RequireAtLeastOne<Options> = {
    opt1: 0,
    opt2: 0,
}

// @ts-expect-error
const example4: RequireAtLeastOne<Options> = {}
```

第二個泛型參數可以填入有哪些 `key` 要納入判斷，預設是所有 `key`，未被納入判斷的 `key` 保持原樣。

## RequireAllOrNone 全填或全不填

```ts
import { RequireAllOrNone } from 'type-fest'

interface Options {
    opt1: number;
    opt2: number;
}

// @ts-expect-error
const example1: RequireAllOrNone<Options> = {
    opt1: 0,
}

// @ts-expect-error
const example2: RequireAllOrNone<Options> = {
    opt2: 0,
}

// ok
const example3: RequireAllOrNone<Options> = {
    opt1: 0,
    opt2: 0,
}

// @ts-expect-error
const example4: RequireAllOrNone<Options> = {}
```

第二個泛型參數可以填入有哪些 `key` 要納入判斷，預設是所有 `key`，未被納入判斷的 `key` 保持原樣。

## Merge 合併

Merge 有兩個泛型參數，第二個類型會覆蓋第一個類型。

> 此類型僅進行淺層合併，請看示例三，如果需要深度合併請見 MergeDeep

### 示例一

用 `Bar1` 覆蓋了 `Foo1`，最終 `id` 為 `number`

```ts
import type { Merge } from 'type-fest';

interface Foo1 {
    id: string;
}

interface Bar1 {
    id: number;
}

const example1: Merge<Foo1, Bar1> = {
    id: 1
}
```

### 示例二

`name` 可選被覆蓋成必填的例子。

```ts
interface Foo2 {
    id: string;
    name?: string;
}

interface Bar2 {
    id: number;
    name: string;
}

const example2: Merge<Foo2, Bar2> = {
    id: 1,
    name: 'John'
}
```

### 示例三

`data` 從 `{ foo: string; }` 被覆蓋成 `{ bar: string; }`

```ts
interface Foo3 {
    id: string;
    data: {
        foo: string;
    }
}

interface Bar3 {
    id: number;
    data: {
        bar: string;
    }
}

const example3: Merge<Foo3, Bar3> = {
    id: 1,
    data: {
        // @ts-expect-error
        foo: 'foo',
        bar: 'bar'
    }
}
```

## OverrideProperties 覆蓋

和 Merge 類似，不同之處在於第二個類型只能有第一個類型存在的 `key`。

在想要修改原始類型而不增加額外的屬性時，使用此類型比 Merge 更安全。

下例因為第二個類型 `Bar` 有第一個類型沒有的 `bar` 屬性，所以報錯。

```ts
import type { OverrideProperties } from 'type-fest';

interface Foo {
    id: string;
}

interface Bar {
    id: number;
    bar: string;
}

// @ts-expect-error
const example: OverrideProperties<Foo, Bar> = {
    id: 1,
    bar: '1'
}
```

## MergeDeep 深度合併

Merge 的深度合併版本。

```ts
interface Foo {
    id: string;
    data: {
        foo: string;
    }
}

interface Bar {
    id: number;
    data: {
        bar: string;
    }
}

const example: MergeDeep<Foo, Bar> = {
    id: 1,
    data: {
        foo: 'foo',
        bar: 'bar'
    }
}
```

## LiteralUnion 字面量聯合類型

這是為了應對 TypeScript 的已知限制而誕生的類型(詳情請見 [issue](https://github.com/Microsoft/TypeScript/issues/29729))

當我們在撰寫一個 `Color` 字串聯合類型時，我們希望允許 `#ffffff` 這樣的任意字串，但也希望提供 `'black'` 的預定義顏色。

```ts
type Color = 'black' | string;

const mycolor: Color = ''
```

但是這會產生在編輯器中失去自動完成功能的問題。為了應對這個問題，利用 `LiteralUnion` 改寫即可保留自動完成功能。

```ts
import type { LiteralUnion } from 'type-fest'

type Color = LiteralUnion<'black', string>

const mycolor: Color = ''
```

## ValueOf 取物件屬性值的聯合類型

和 `T[keyof T]` 一樣。

```ts
import type { ValueOf } from 'type-fest';

interface Person {
    name: string;
    age: number;
    location: [lat: number, lng: number]
}

type A = ValueOf<Person>
// type A = string | number | [lat: number, lng: number]
```

第二個泛型參數可以指定要哪幾個 key 的類型，預設是全部。

## ConditionalKeys 取符合條件的 Key

用來取得物件中符合條件的 key。

```ts
import type { ConditionalKeys } from 'type-fest';

interface Person {
    name: string;
    age: number;
    location: [lat: number, lng: number]
    address: string;
}

type A = ConditionalKeys<Person, string>
// type A = "name" | "address"

type B = ConditionalKeys<Person, string | number>
// type B = "name" | "age" | "address"
```