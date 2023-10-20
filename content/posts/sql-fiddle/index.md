---
title: "SQL Fiddle - 好用的 SQL 線上測試&練習工具"
date: 2021-05-20T09:52:56+08:00
description: "介紹一個 SQL 練習工具網站。"
tags: ['SQL']
draft: false
---
# SQL Fiddle - 好用的 SQL 線上測試&練習 工具
[SQL Fiddle](http://sqlfiddle.com/) 是一個線上網站，不用註冊隨進隨用，一進去它會產生一個已經建好的資料庫，只需要從 CREATE TABLE 開始就好了，

## 支援資料庫版本
資料庫|版本
---|---
ORACLE|11g R2
SQL Server|2017
MySQL|5.6
PostgreSQL|9.6
PostgreSQL|9.3
SQLite|WebSQL
SQLite|SQL.js

## 功能
- 建立 Schema
- 運行 SQL 指令
- 分享連結

分享連結的功能是在 Build 之後會得到一個連結，可以把 SQL 分享出去。儲存時間似乎是沒有限制，我點網路上 2012 年的連結都還正常。

## 介面介紹
主要有 DDL、DML 及顯示結果區域：
1. 左上角為 DDL 區域，CREATE TABLE 的指令可以寫在這邊(必填)，在指令寫好後必須按下 **Bulid Schema** ，來執行。
2. 右上角為 DML 區域，SELECT 指令寫在這裡，按 **Run SQL** 會在結果區顯示結果。
3. 下面為顯示結果區域。

標題列有一顆 **View Sample Fiddle** 按鈕可以載入預設的範例。


## 限制
似乎不能儲存和查詢過長的字符串(約8000字長度)。