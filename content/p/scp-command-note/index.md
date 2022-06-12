---
title: "scp - 使用 ssh 在主機間複製傳送檔案"
date: 2021-05-09T16:06:09+08:00
description: "使用 ssh 在主機間複製傳送檔案，scp 指令操作筆記"
tags: ['ssh']
---
# scp 指令
> scp 是在 ssh 的基礎上運作的，所以必須先安裝 ssh 。

## 將檔案由本地複製到遠端主機
```
scp [filename] [account]@[remote]:[path]
```
- filename: 欲複製的檔案名稱
- account: 遠端主機使用者名稱
- remote: IP 位址或 Domain
- path: 檔案存放於遠端主機的路徑

範例：底下指令會將現有目錄內的 `foo.txt` 複製至`主機 example.com` 的 `hello 使用者`家目錄底下的 `data 資料夾`
```
scp foo.txt hello@example.com:~/data/foo.txt
```

## 將檔案由遠端主機複製至本地
```
scp [account]@[remote]:[path] [localPath]
```
範例：底下指令會將`遠端主機 example.com`內的 `hello 使用者`家目錄底下的 `data 資料夾`的 `foo.txt` 複製至現在工作目錄。 
```
scp hello@example.com:~/data/foo.txt .
```

## 修改 port
ssh 預設 port 為 22，如果要修改就加上 -P
```
scp -P 2222
```

## 複製資料夾及底下所有檔案
```
scp -r /path/folder hello@example.com:/path/folder2
```

## 參考
https://man.archlinux.org/man/scp.1