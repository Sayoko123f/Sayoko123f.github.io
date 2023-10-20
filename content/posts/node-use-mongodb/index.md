---
title: "Node.js 與 MongoDB 學習筆記"
date: 2022-03-15T18:20:26+08:00
description: "Node.js 與 MongoDB 學習筆記"
tags: ["Node.js","MongoDB"]
---
# Node.js 與 MongoDB 學習筆記
本筆記主要會記錄在 Node.js 應用中連接 MongoDB Atlas 的操作方法，如果讀者發現任何錯誤或值得討論的地方，請不吝指教。

環境為 `Node.js v14.17.4`，`MongoDB` 是在 [MongoDB Atlas](https://www.mongodb.com/) 申請 `shared` 的免費方案。

## 文件
- [MongoDB 手冊](https://docs.mongodb.com/manual/)
- [MongoDB Node.js driver](https://docs.mongodb.com/drivers/node/current/)
- [MongoDB NoDe.js driver API](https://mongodb.github.io/node-mongodb-native/4.2/)

## 準備
### 安裝驅動
[npm](https://www.npmjs.com/package/mongodb)
```
npm i mongodb
```

### 建立測試資料
**MongoDB Atlas** 有提供一組資料集可以用來測試練習，在控制台按 `Load Sample Dataset` 就可以載入了，可參考這裡有一篇鐵人賽關於[建立 Atlas 的教學](https://ithelp.ithome.com.tw/articles/10268405)寫得很詳細，。另外本文也在 `sample_airbnb` 資料庫底下建立了一個空的資料集名為 `practiceData`。

## 連接
連接需要一組 **uri** ，在 MongoDB 的控制台可以複製，本文會使用帳號密碼的方式連接，至於使用證書連接的方式，則待日後再研究了。

假設密碼放在父目錄的 `.env json` 檔案，注意帳號密碼如果有特殊字元要使用 `encodeURIComponent`進行編碼。

下方程式碼為進行連接，以及關閉。
```js
const fs = require('fs');
const path = require('path');
const env = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.env')));

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://ressha:${encodeURIComponent(env.password)}@ressha.exbn3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
    await client.connect();
    // write CRUD Here
    await client.close();
})();
```

## 操作
### 列出可連接的資料庫
```js
(async () => {
    await client.connect();
    const databasesList = await client.db().admin().listDatabases();
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

    await client.close();
})();
```
輸出：
```
 - sample_airbnb
 - sample_analytics
 - sample_geospatial
 - sample_mflix
 - sample_restaurants
 - sample_supplies
 - sample_training
 - sample_weatherdata
 - admin
 - local
```

### 連接指定資料庫
連接之後，列出資料庫內 `Collection(下稱資料集)` 的名稱。
```js
(async () => {
    await client.connect();
    const db = client.db('sample_airbnb');
    const lists = await db.listCollections().toArray();
    console.log(lists);

    await client.close();
})();
```
輸出：
```js
[
  {
    name: 'listingsAndReviews',
    type: 'collection',
    options: {},
    info: {
      readOnly: false,
      uuid: new Binary(Buffer.from("6cf29ecf5114445fb8afed2b08929bca", "hex"), 4)
    },
    idIndex: { v: 2, key: [Object], name: '_id_' }
  },
  {
    name: 'practiceData',
    type: 'collection',
    options: {},
    info: {
      readOnly: false,
      uuid: new Binary(Buffer.from("c9521cc8fe504a53b5ec4e530b3c18af", "hex"), 4)
    },
    idIndex: { v: 2, key: [Object], name: '_id_' }
  }
]
```
連接指定資料集
```js
(async () => {
    await client.connect();
    const collection = client.db('sample_airbnb').collection('practiceData');
    await client.close();
})();
```
可寫成一個函式：
```js
async function connect() {
    const { mongo } = env;
    const uri = mongo.URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();
    const collection = client.db(mongo.database).collection('lab');
    return { client, collection };
}

```
使用：
```js
const { client, collection } = await connect();
```

### 新增資料
以下將在 `sample_airbnb.practiceData` 新增資料。
#### db.collection.insertOne
第一個參數要傳入由 **document** 組成的陣列，如果不用 Promise 而用回調函數，則在第二個參數傳入回調函數(本文示例皆使用 Promise)。
```js
    await client.connect();
    const collection = client.db('sample_airbnb').collection('practiceData');
    const result = await collection.insertOne({ foo: 'bar' });
    console.log(result.insertedId);
    await client.close();

    // output
    // new ObjectId("61d6b88ce903d92d7b8fe181")
```
`result.insertedId` 返回成功插入後的 `ObjectId`。 
#### db.collection.insertMany
第一個參數要傳入由 **document** 組成的陣列。

第二個參數可傳入選項物件，`ordered` 默認為 `true`，表示文件將按照順序插入，如果過程出錯了會馬上停止；否則會無序插入且錯誤發生時將繼續執行不停止，`mongod` 可能會重新排序以提升性能。
```js
(async () => {
    await client.connect();
    const collection = client.db('sample_airbnb').collection('practiceData');

    const docs = [
        { name: 'hi' },
        { name: 'hello' },
        { name: 'hey' },
    ];

    const result = await collection.insertMany(docs);
    console.log(result.insertedIds);
    await client.close();

    // output
    // {
    // '0': new ObjectId("61d6ba3c3d3bea7ca1f2842b"),
    // '1': new ObjectId("61d6ba3c3d3bea7ca1f2842c"),
    // '2': new ObjectId("61d6ba3c3d3bea7ca1f2842d")
    // }
})();
```

### 查詢資料
MongoDB 很貼心幫我們準備了 **Sample Dataset**，就用它來練習吧！進到控制台內看看有哪些值得查詢的資料。
#### findOne 查詢一筆
返回第一個符合匹配條件的文件，找不到是返回 `null`。
```js
(async () => {
    await client.connect();
    const collection = client.db('sample_mflix').collection('movies');
    const res = await collection.findOne({ title: 'Blacksmith Scene' });
    console.log(res);
    await client.close();

    // output
    // _id: new ObjectId("573a1390f29313caabcd4135"),
    // plot: 'Three men hammer on an anvil and pass a bottle of beer around.',
    // etc...
})();   
```

##### 根據 ObjectId
```js
import { MongoClient, ObjectId } from "mongodb";

export async function show(_id) {
    const { client, collection } = await connect();

    const docs = { _id: new ObjectId(_id), type: 'album' };

    const data = await collection.findOne(docs);

    await client.close();
    return data;
}

```

#### find 查詢多筆
查詢所有符合條件的文件，因為可能會有超大量的結果，所以返回的是 **文件指針**，附上[詳細文件參考](https://docs.mongodb.com/drivers/node/current/usage-examples/find/) ，如果找不到符合條件的文件則返回空指針。

文件指針有幾個實用的方法：
- count()
- toArray()
- forEach()
- next()
  - tryNext()
  - hasNext()
- limit()
- map()
- sort()

##### count()
查詢 1916 年的電影數量。
```js
(async () => {
    await client.connect();
    const collection = client.db('sample_mflix').collection('movies');
    const cursor = collection.find({ year: 1916 });
    const count = await cursor.count();
    console.log(count); // 4
    await client.close();
})();
```

##### toArray()
`※小心使用`將結果轉換為陣列。如果資料量太多，記憶體可能會爆掉，最好加上 limit 限制筆數，或是確定資料不會太多才使用。

如果指針不是初始狀態，已經有移動過，那麼只會返回尚未訪問的文件。如果需要重置指針使用 `cursor.rewind()`
```js
(async () => {
    await client.connect();
    const collection = client.db('sample_mflix').collection('movies');
    const cursor = collection.find({ year: 1916 });
    const result = await cursor.toArray();
    console.log(result);
    await client.close();
})();
```
輸出
```
[
  {
    _id: new ObjectId("573a1390f29313caabcd5a93"),
    ...
  },
  {
    _id: new ObjectId("573a1390f29313caabcd5b9a"),
    ...
  },
  etc...
]
```

##### forEach()
查詢 1916 年的電影標題並輸出。

這裡用到選項物件屬性 `projection` ，如果有設定這個屬性，則只會返回需要的欄位。`_id` 欄位默認是返回，如果不想返回就設為 `0`。
```js
(async () => {
    await client.connect();
    const collection = client.db('sample_mflix').collection('movies');

    const options = { projection: { title: 1 } };

    const cursor = collection.find({ year: 1916 }, options);
    await cursor.forEach(item => console.log(item.title));
    await client.close();

    // output
    // Civilization
    // Hell's Hinges
    // Intolerance: Love's Struggle Throughout the Ages
    // Where Are My Children?    
})();
```

##### next()
一筆一筆取結果，如果不想用 `forEach`，可以用這個。
```js
(async () => {
    await client.connect();
    const collection = client.db('sample_mflix').collection('movies');

    const options = { projection: { title: 1, _id: 0 } };

    const cursor = collection.find({ year: 1950 }, options);
    
    console.log(await cursor.count());
    while (await cursor.hasNext()) {
        const item = await cursor.next();
        console.log(item.title);
    }
    await client.close();

    // output
    // 69
    // Mi adorado Juan
    // Orpheus
    // ......
})();
```

##### limit()
限制傳回最大筆數，常和好朋友 `skip` 搭配使用，`skip` 可以略過前幾筆(相當於 SQL 的 limit/offset)。
```js
    const cursor = collection.find({ year: 1950 }, options).limit(12).skip(2);
```
也可以寫在選項裡
```js
    const options = { projection: { title: 1, _id: 0 }, limit: 12, skip: 2 };
```

##### map()
類似於原生陣列的 `Array.map`，輸入變換函式將查詢結果進行變換。

查詢 1916 年所有電影標題並將英文字母轉換為大寫。
```js
(async () => {
    await client.connect();
    const collection = client.db('sample_mflix').collection('movies');

    const options = { projection: { title: 1, _id: 0 } };

    const cursor = collection.find({ year: 1950 }, options)
        .map(doc => ({ title: doc.title.toUpperCase(), ...doc }));
    console.log(await cursor.count());

    let item = null;
    while (item = await cursor.next()) {
        console.log(item);
    }

    await client.close();

    // output
    // 69
    // { title: 'MI ADORADO JUAN' }
    // { title: 'ORPHEUS' }
    // ......
})();
```

##### sort()
傳入一個物件指定要排序的屬性，設定 1 為升序， -1 為降序。

查詢 1950 年的電影並依照標題進行排序，限制最大 15 筆。
```js
(async () => {
    await client.connect();
    const collection = client.db('sample_mflix').collection('movies');

    const options = { projection: { title: 1, _id: 0 }, limit: 15 };

    const cursor = collection.find({ year: 1950 }, options).sort({ title: 1 });
    console.log(await cursor.toArray());

    await client.close();
})();
```
輸出
```
// 升序
[
  { title: 'All About Eve' },
  { title: 'Annie Get Your Gun' },
  { title: 'Bajaja' },
  { title: 'Born Yesterday' },
  { title: 'Brigada criminal' },
  { title: 'Broken Arrow' },
  { title: 'Caged' },
  { title: 'Cinderella' },
  { title: 'Cyrano de Bergerac' },
  { title: 'D.O.A.' },
  { title: 'Das doppelte Lottchen' },
  { title: 'Destination Moon' },
  { title: "Devil's Doorway" },
  { title: 'Edge of Doom' },
  { title: 'El hombre sin rostro' }
]

// 降序
[
  { title: "Winchester '73" },
  { title: 'When Willie Comes Marching Home' },
  { title: 'Variety Lights' },
  { title: 'Trio' },
  { title: 'Trio' },
  { title: 'Trio' },
  { title: 'Trio' },
  { title: 'Treasure Island' },
  { title: 'Three Little Words' },
  { title: 'The West Point Story' },
  { title: 'The Sound of Fury' },
  { title: 'The Munekata Sisters' },
  { title: 'The Men' },
  { title: 'The Magnificent Yankee' },
  { title: 'The Lawless' }
]
```

#### 條件查詢
[文件](https://docs.mongodb.com/manual/tutorial/query-documents/)、[運算符](https://docs.mongodb.com/manual/reference/operator/query/#std-label-query-selectors)

以下示例省略連接和關閉過程。
##### 文字搜尋
\$text 運算符有限制只能在文字索引的欄位上搜尋，其它還有一些限制請參考文件。

查詢 `fullplot` 欄位內含有 `New York` 文字的電影標題，限制 5 筆。
```js
const options = {
    limit: 5,
    projection: { title: 1 }
};

const cursor = collection.find({ $text: { $search: "\"New York\"" } }, options);

console.log(await cursor.toArray());
```

##### 數字範圍 
查詢年份在 1940-1950 之間的電影數量。
```js
const cursor = collection.find({ year: { $gte: 1940, $lte: 1950 } });
// const cursor = collection.find({ year: { $gt: 1939, $lt: 1951 } });
console.log(await cursor.count());
```

##### AND
查詢 `fullplot` 欄位內含有 `New York` 文字且 `imdb.rating` 大於 8 且 `tomatoes.viewer.numReviews` 大於 1000 的電影數量。
```js
const cursor = collection.find({ $text: { $search: "\"New York\"" }, 'imdb.rating': { $gt: 8 }, 'tomatoes.viewer.numReviews': { $gt: 1000 } });
console.log(await cursor.count());
```

##### OR
查詢年份等於 1945 年或等於 1955 年的電影並返回標題和年份，限制 15 筆，依標題升序排序。
```js
const options = {
    projection: { title: 1, year: 1 },
    sort: { title: 1 },
    limit: 15
};

const cursor = collection.find({ $or: [{ year: 1945 }, { year: 1955 }] }, options);

console.log(await cursor.toArray());
```

##### 查詢陣列
查詢 `cast` 內擁有名字以 `James` 開頭的演員的電影數量。
```js
const cursor = collection.find({ cast: { $regex: /^James.+?/ } });

console.log(await cursor.count());
```