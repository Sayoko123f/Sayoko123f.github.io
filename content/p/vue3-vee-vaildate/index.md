---
title: "Vue 3 表單驗證 Vee Vaildate 4 (使用組合式API)"
date: 2023-02-19T21:43:55+08:00
description: ""
tags: ["Vue", "TypeScript"]
---
# Vue 3 表單驗證 Vee Vaildate 4 (使用組合式API)
[VeeValidDate Docs](https://vee-validate.logaretm.com/v4/guide/overview/)

本文寫作時使用
- Vue 3.2.45
- Vite 4.0.0
- TypeScript 4.9.3
- vee-validate 4.7.4

## useField

### value
```ts
import { useField } from 'vee-validate';

const { value } = useField('username');
```

`useField` 的第一個參數是必填，VeeValidDate 用來辨識欄位的 `key`。

`value` 是一個 `Ref` ，用 `v-model` 接到 `input` 上面，`value` 會跟著使用者輸入改變。

```html
<input type="text" v-model="value"/>
```

### errorMessage
`useField` 的第二個參數可以傳入一個函式，每次 `value` 改變的時候這個函式都會被呼叫，用來驗證 `value` 符不符合規則，如果符合規則就回傳 `true`；反之回傳 `string` 作為 `errorMessage`。

以下我自訂一個規則函式，驗證 `value` 的值必須是 `foo`：
```ts
function isFoo(value: string | undefined) {
  if (value === 'foo') {
    return true;
  }
  return 'username must be "foo"!';
}

const { value, errorMessage } = useField('username', isFoo);
```
```html
<input type="text" v-model="value" />
<p>{{ errorMessage }}</p>
```
每次當 `value` 改變時就會觸發驗證函式 `isFoo`。

## useForm
`useForm` 可以跟 `useField` 搭配使用，**必須先呼叫 useForm 再呼叫 useField**。

先寫一個 `validationSchema` ，它是一個物件，`key` 是 `useField` 第一個參數註冊的欄位 `key`，屬性則是用來驗證的規則函式。

以下我寫一個有 `username, password` 兩個欄位的 Schema ，規則是 `username` 必須是 `foo`，`password` 必須大於 3。
```ts
import { useField, useForm } from 'vee-validate';

const validationSchema = {
  username(value: string) {
    if (value === 'foo') {
      return true;
    }
    return 'Username must be "foo".';
  },
  password(value: string) {
    if (value.length >= 3) {
      return true;
    }
    return 'Password length must be greater than 3.';
  },
};

const form = useForm({
  validationSchema,
});
```
接下來用 `useField` 連接 `<template>`：
```ts
const { value: usernameValue, errorMessage: usernameError } = useField('username');
const { value: passwordValue, errorMessage: passwordError } = useField('password');
```
```html
<input type="text" v-model="usernameValue" />
<p>{{ usernameError }}</p>
<input type="text" v-model="passwordValue" />
<p>{{ passwordError }}</p>
```
這樣就有自動驗證的效果了。

接下來我們要加上一顆提交表單的按鈕與函式，要用到 `useForm` 的 `handleSubmit`，假設我們提交表單給後端的 API function 叫做 `createUser`：

```ts
interface createUserParams {
  username: string;
  password: string;
}

async function createUser(params: createUserParams) {
  console.log(params);
  // call api...
}

const onSubmit = form.handleSubmit(async (values) => {
  await createUser(values);
});
```
這裡有一步要回頭傳入泛型定義給 `useForm`：
```ts
const form = useForm<createUserParams>({
  validationSchema,
});
```

最後，再幫按鈕加上 `disabled` 功能，表單驗證通過前應該是禁用狀態，我們可以判斷 form.meta 裡面的 valid 與 dirty 屬性：
```ts
import { computed } from 'vue';

const shouldDisabled = computed(() => {
  return !(form.meta.value.dirty && form.meta.value.valid);
});
```
以下附上完整組件：
```html
<template>
  <div class="p-4">
    <input type="text" v-model="usernameValue" />
    <p>{{ usernameError }}</p>
    <input type="text" v-model="passwordValue" />
    <p>{{ passwordError }}</p>
    <button :disabled="shouldDisabled" @click="onSubmit">Submit</button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useField, useForm } from 'vee-validate';

const validationSchema = {
  username(value: string | undefined) {
    if (value === 'foo') {
      return true;
    }
    return 'Username must be "foo".';
  },
  password(value: string | undefined) {
    if (value && value.length > 3) {
      return true;
    }
    return 'Password length must be greater than 3.';
  },
};

const form = useForm<createUserParams>({
  validationSchema,
});
const { value: usernameValue, errorMessage: usernameError } = useField('username');
const { value: passwordValue, errorMessage: passwordError } = useField('password');

interface createUserParams {
  username: string;
  password: string;
}

async function createUser(params: createUserParams) {
  console.log(params);
  // call api...
}

const onSubmit = form.handleSubmit(async (values) => {
  await createUser(values);
});

const shouldDisabled = computed(() => {
  return !(form.meta.value.dirty && form.meta.value.valid);
});
</script>
```
## useFieldModel
多次呼叫 Field 的語法糖，可以把上面 useForm 的例子改寫成：
```html
<template>
  <div class="p-4">
    <input type="text" v-model="username" />
    <p>{{ form.errors.value.username }}</p>
    <input type="text" v-model="password" />
    <p>{{ form.errors.value.password }}</p>
    <button :disabled="shouldDisabled" @click="onSubmit">Submit</button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useForm } from 'vee-validate';

const validationSchema = {
  username(value: string | undefined) {
    if (value === 'foo') {
      return true;
    }
    return 'Username must be "foo".';
  },
  password(value: string | undefined) {
    if (value && value.length > 3) {
      return true;
    }
    return 'Password length must be greater than 3.';
  },
};

const form = useForm<createUserParams>({
  validationSchema,
});

const [username, password] = form.useFieldModel(['username', 'password']);

interface createUserParams {
  username: string;
  password: string;
  some:string
}

async function createUser(params: createUserParams) {
  console.log(params);
  // call api...
}

const onSubmit = form.handleSubmit(async (values) => {
  await createUser(values);
});

const shouldDisabled = computed(() => {
  return !(form.meta.value.dirty && form.meta.value.valid);
});
</script>
```