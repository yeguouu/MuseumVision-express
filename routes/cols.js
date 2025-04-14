// var express = require('express');
// var router = express.Router();

// router.get('/', function(req, res, next) {
//   res.send('cols1111');
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// 定义 cols 模型
const ColSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uid: { type: String, required: true },
});

const Col = mongoose.model("Col", ColSchema, "cols"); // 第三个参数指定集合名称

// 获取所有数据
router.get("/", async (req, res) => {
  try {
    const cols = await Col.find(); // 从数据库中获取所有数据
    res.json(cols);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取单条数据
router.get("/:id", async (req, res) => {
  try {
    const col = await Col.findById(req.params.id); // 根据 ID 获取数据
    if (!col) return res.status(404).json({ message: "数据未找到" });
    res.json(col);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
