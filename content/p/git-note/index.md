---
title: "我的 Git 小抄"
date: 2021-01-16T17:02:09+08:00
description: "我的 Git 小抄"
tags: ['git']
---

# 我的 Git 小抄

## clone
使用 git clone <repo URL> 下載專案
```
git clone https://github.com/Sayoko123f/cmx.git
```
指定分支
```
git clone <repo URL> -b <branch name>
```
## 放棄本地更改並復原
查詢版本歷史記錄
```
git log --oneline -n
```
保留現在檔案內容更改，僅還原 HEAD
```
git reset HEAD
git reset <SHA-1編號>
```
不保留現在的內容更改，復原檔案內容(小心使用)
```
git reset --hard HEAD
                        復原到最近的 commit
git reset --hard HEAD~
                        等於 ~1 回復到上一個提交版本
git reset --hard HEAD~n
                        n 等於往上第幾個提交版本 回復之前指定的提交版本
```
指定特定分支
```
git reset --hard origin/<branch name>
```

## checkout 切換分支
```
git checkout <branch name>
```
在 checkout 命令給定 -b 參數執行，可以同時建立分支和切換。
```
git checkout -b <branch>
```

## 更多
[zlargon.gitbooks.io](https://zlargon.gitbooks.io/git-tutorial/content/)