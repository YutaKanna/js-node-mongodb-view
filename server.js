const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// EJS ビューエンジンの設定
app.set('view engine', 'ejs');

// bodyParser ミドルウェア
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDBのアイテムスキーマとモデル
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});
const Item = mongoose.model('Item', itemSchema);

// MongoDB への接続
mongoose.connect('');

// アイテムのルート
// アイテム一覧
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.render('index', { items });
});

// アイテム詳細
app.get('/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render('details', { item });
});

// アイテム作成
app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.redirect('/items');
});

// アイテム更新
app.post('/items/:id', async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/items');
});

// アイテム削除
app.post('/items/delete/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/items');
});

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
