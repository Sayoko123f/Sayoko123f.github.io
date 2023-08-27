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