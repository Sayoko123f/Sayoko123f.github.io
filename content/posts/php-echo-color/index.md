---
title: "PHP echo 在命令列輸出彩色文字"
date: 2021-09-22T13:59:40+08:00
description: "PHP 使用 echo 在命令列輸出彩色文字的方法"
tags: ['PHP']
---
# PHP echo 在命令列輸出彩色文字
以下是土法炮製，已在我的 Windows 10 上實測可行(PHP 7)。

```php
<?php
echo echocolor("Hello World", 30) . PHP_EOL;
echo echocolor("Hello World", 31) . PHP_EOL;
echo echocolor("Hello World", 32) . PHP_EOL;
echo echocolor("Hello World", 33) . PHP_EOL;
echo echocolor("Hello World", 34) . PHP_EOL;
echo echocolor("Hello World", 35) . PHP_EOL;
echo echocolor("Hello World", 36) . PHP_EOL;
echo echocolor("Hello World", 37) . PHP_EOL;
echo echocolor("Hello World", 90) . PHP_EOL;
echo echocolor("Hello World", 91) . PHP_EOL;
echo echocolor("Hello World", 92) . PHP_EOL;
echo echocolor("Hello World", 93) . PHP_EOL;
echo echocolor("Hello World", 94) . PHP_EOL;
echo echocolor("Hello World", 95) . PHP_EOL;
echo echocolor("Hello World", 96) . PHP_EOL;
echo echocolor("Hello World", 97) . PHP_EOL;
echo echocolor("Hello World", 40, 97) . PHP_EOL;
echo echocolor("Hello World", 41, 97) . PHP_EOL;
echo echocolor("Hello World", 42, 97) . PHP_EOL;
echo echocolor("Hello World", 43, 97) . PHP_EOL;
echo echocolor("Hello World", 44, 97) . PHP_EOL;
echo echocolor("Hello World", 45, 97) . PHP_EOL;
echo echocolor("Hello World", 46, 97) . PHP_EOL;
echo echocolor("Hello World", 47, 97) . PHP_EOL;
echo echocolor("Hello World", 100, 97) . PHP_EOL;
echo echocolor("Hello World", 101, 97) . PHP_EOL;
echo echocolor("Hello World", 102, 97) . PHP_EOL;
echo echocolor("Hello World", 103, 97) . PHP_EOL;
echo echocolor("Hello World", 104, 97) . PHP_EOL;
echo echocolor("Hello World", 105, 97) . PHP_EOL;
echo echocolor("Hello World", 106, 97) . PHP_EOL;
echo echocolor("Hello World", 107, 97) . PHP_EOL;
echo echocolor("Hello World", 'black') . PHP_EOL;
echo echocolor("Hello World", 'red') . PHP_EOL;
echo echocolor("Hello World", 'green') . PHP_EOL;
echo echocolor("Hello World", 'brown') . PHP_EOL;
echo echocolor("Hello World", 'blue') . PHP_EOL;
echo echocolor("Hello World", 'purple') . PHP_EOL;
echo echocolor("Hello World", 'cyan') . PHP_EOL;
echo echocolor("Hello World", 'dark-gray') . PHP_EOL;
echo echocolor("Hello World", 'd-gray') . PHP_EOL;
echo echocolor("Hello World", 'l-blue', 'b-l-yellow') . PHP_EOL;
echo echocolor("Hello World", 'light-blue', 'b-red') . PHP_EOL;

/**
 * @see https://misc.flogisoft.com/bash/tip_colors_and_formatting
 * @see https://www.shellhacks.com/bash-colors/
 */
function echocolor(string $str, ...$color): string
{
    $map = [
        'black' => 30, 'red' => 31, 'green' => 32, 'brown' => 33, 'blue' => 34, 'purple' => 35, 'cyan' => 36, 'l-gray' => 37,
        'd-gray' => 90, 'l-red' => 91, 'l-green' => 92, 'l-yellow' => 93, 'l-blue' => 94, 'l-magenta' => 95, 'l-cyan' => 96, 'white' => 97,
        'b-black' => 40, 'b-red' => 41, 'b-green' => 42, 'b-brown' => 43, 'b-blue' => 44, 'b-purple' => 45, 'b-cyan' => 46, 'b-l-gray' => 47,
        'b-d-gray' => 100, 'b-l-red' => 101, 'b-l-green' => 102, 'b-l-yellow' => 103, 'b-l-blue' => 104, 'b-l-magenta' => 105, 'b-l-cyan' => 106, 'b-white' => 107
    ];
    $codes = [];
    foreach ($color as $item) {
        if (is_int($item)) {
            $codes[] = $item;
            continue;
        }
        if (is_string($item)) {
            $tmp = str_replace(['background-', 'dark-', 'light-'], ['b-', 'd-', 'l-'], strtolower($item));
            if (array_key_exists($tmp, $map)) {
                $codes[] = $map[$tmp];
            }
        }
    }
    $s = implode(';', $codes);
    return "\e[{$s}m{$str}\e[0m";
}
```