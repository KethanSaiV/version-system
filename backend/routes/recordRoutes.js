const express = require("express");
const router = express.Router();
const Record = require("../models/Record");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// CREATE
router.post("/", auth, role("EDITOR"), async (req, res) => {
  console.log("BODY:", req.body);   // 👈 ADD THIS

  const recordId = Date.now().toString();

  const record = await Record.create({
    recordId,
    title: req.body.title,
    content: req.body.content,
    version: 1,
    isLatest: true
  });

  console.log("SAVED:", record);   // 👈 ADD THIS

  res.send(record);
});

// UPDATE
router.put("/:id", auth, role("EDITOR"), async (req, res) => {
  const old = await Record.findOne({
    recordId: req.params.id,
    isLatest: true
  });

  if (!old) return res.status(404).send("Record not found");

  old.isLatest = false;
  await old.save();

  const newRecord = await Record.create({
    recordId: req.params.id,
    title: req.body.title,
    content: req.body.content,
    version: old.version + 1,
    isLatest: true
  });

  res.send(newRecord);
});

// GET LATEST
router.get("/", auth, async (req, res) => {
  const records = await Record.find({ isLatest: true });
  res.send(records);
});

// HISTORY
router.get("/:id/history", auth, async (req, res) => {
  const history = await Record.find({
    recordId: req.params.id
  }).sort({ version: 1 });

  res.send(history);
});

module.exports = router;