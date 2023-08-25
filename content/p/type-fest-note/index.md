---
title: "type-fest 筆記"
date: 2023-08-25T17:41:42+08:00
description: "筆記 type-fest 的用法"
tags: ['TypeScript']
---
# type-fest 筆記

[type-fest](https://github.com/sindresorhus/type-fest) 是包含 TypeScript 實用助手類型的庫。

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