const express = require('express');
const app = express();
const taskRoute = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config(); //dotenvの読み込み

app.use(express.json()); //Json形式でデータを扱う宣言。忘れやすいので注意。
app.use(express.static('./public')); //staticは静的なという意味。publicフォルダの中にあるHTMLを読み込んでいる。

const PORT = 5000;

// ルーティング設計
app.use('/api/v1/tasks', taskRoute);

// 非同期処理でDBと接続
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URL);
            app.listen(PORT, console.log('サーバーが起動しました'));
    } catch (error){
        console.log(error);
    }
}

start();//上記を呼んでる
