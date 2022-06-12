---
title: "如何將多個 ts 檔案合併為一個 mp4 檔案"
date: 2022-06-05T09:18:43+08:00
description: "如何將多個 ts 檔案合併為一個 mp4 檔案"
tags: ['ffmpeg','tool']
draft: false
---
# 如何將多個 ts 檔案合併為一個 mp4 檔案

## 下載 ffmpeg
[How to install ffmpeg](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg)

[ffmpeg build](https://www.gyan.dev/ffmpeg/builds/)

選 **release builds**，`ffmpeg-release-full-shared.7z` 版本，功能齊全但檔案稍微大一點。

下載好後解壓縮，將 `ffmpeg/bin` 加入環境變數。

打開 **cmd** 輸入 ffmpeg 看看是否有成功。 

## 合併 ts 並轉換
### For Windows

先將多個 ts 合併成一個：
```bat
copy /b 0.ts+1.ts+2.ts+3.ts all.ts
```
然後使用 **ffmpeg** 轉換：
```bat
ffmpeg -i all.ts -acodec copy -vcodec copy all.mp4
```
大功告成。

## 參考
[Use ffmpeg copy codec to combine *.ts files into a single mp4](https://superuser.com/questions/692990/use-ffmpeg-copy-codec-to-combine-ts-files-into-a-single-mp4)

### 附錄- Node 下載 ts 檔案
```
npm install axios
```
```js
import axios from "axios";
import * as fs from "fs";
import { promisify } from "util";
import stream from "stream";
const finished = promisify(stream.finished);

async function downloadFile(outputPath, url, headers = {}) {
  const writer = fs.createWriteStream(outputPath);

  return axios({
    method: "GET",
    url,
    responseType: "stream",
    headers,
  }).then(async (res) => {
    res.data.pipe(writer);
    return finished(writer);
  });
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
}
```