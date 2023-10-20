---
title: "PHP PDO 連接資料庫筆記"
date: 2021-01-16T17:02:09+08:00
description: "PHP 使用 PDO 連接資料庫的筆記"
tags: ['PHP']
---
# PHP PDO 連接資料庫筆記
[PHP PDO Manual](https://www.php.net/manual/en/book.pdo.php)

```php
try {
    $host = "localhost";
    $db_name = "test";
    $db_user = "test";
    $db_password = "123";
    $con = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $db_user, $db_password);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (\PDOException $e) {
    die("Failed to connect database: " . $e->getMessage());
}
```
其中 `$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);` 這行是指設置錯誤模式。