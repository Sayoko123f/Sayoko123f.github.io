---
title: "Vue2 Vetur 如何為全域註冊組件增加 IntelliSense"
date: 2022-10-23T07:14:04+08:00
description: "說明在 Vue2 中如何為全域註冊組件增加 IntelliSense"
tags: ["Vue"]
---

# Vue2 Vetur 如何為全域註冊組件增加 IntelliSense
[官方文件](https://vuejs.github.io/vetur/guide/component-data.html#workspace-component-data)

## 步驟一
在 `package.json` 告訴 Vetur 要去哪裡讀標籤定義檔，下面範例的路徑定義在 `src/vetur` 底下：
```json
{
  ...,

  "vetur": { "tags": "src/vetur/tags.json", "attributes": "src/vetur/attributes.json" }
}
```

## 步驟二
建立 `src/vetur/tags.json` ：
```json
{ "foo-bar": { "description": "A foo tag", "attributes": ["foo-attr"] } }
```
建立 `src/vetur/attributes.json` ：
```json
{ "foo-bar/foo-attr": { "description": "description of foo-attr" } }
```
## 步驟三
重新啟動 VS Code

大功告成✨