---
title: "【學Docker】名詞解釋與筆記"
date: 2023-01-21T17:41:42+08:00
description: ""
tags: ['Docker']
---
# 【學Docker】名詞解釋與筆記
## 名詞解釋
### image
image 是 docker 的基本，一個 image 就是一個應用程式或一個服務，比如 nginx 可以做成一個 image， MySQL 可以做成一個 image 。

image 有兩種來源：
1. docker build
2. docker pull

#### docker build
要客製化製作自己的 `image` ，首先要撰寫 `Dockerfile` ，然後使用 `docker build` 指令將寫好的 `Dockerfile` 製作成 `image`。

image 製作完以後就不能再修改，要修改只能編輯 `Dockerfile` 後重新 build。

#### docker pull
[docker hub](https://hub.docker.com/) 是 image 的公共倉庫，在上面可以找到常用的開源軟體的 image ，只需要 `docker pull` 下來即可使用。

> 認準有星星標誌的 DOCKER OFFICIAL IMAGE。 

### container
讓 `image` 實體化開始執行就稱為 `container` ，`container`可以被啟動、開始與暫停、刪除。

就像平常寫程式，定義好一個 class 以後，使用 new Class()得到實體化的物件，`docker run image` 產生出的 contianer 就是 image 的實例。