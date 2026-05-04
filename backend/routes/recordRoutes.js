const express = require("express");
const router = express.Router();
const Record = require("../models/Record");
const Version = require("../models/Version");


// CREATE
router.post("/create", async (req, res) => {
  try {
    const { title, content } = req.body;

    const record = await Record.create({
      title,
      createdBy: "user"
    });

    await Version.create({
      recordId: record._id,
      versionNumber: 1,
      content
    });

    res.json({ message: "Created" });

  } catch (err) {
    res.status(500).json(err.message);
  }
});


// UPDATE (NEW VERSION)
router.put("/update/:id", async (req, res) => {
  try {
    const { content } = req.body;
    const recordId = req.params.id;

    const latest = await Version.findOne({ recordId })
      .sort({ versionNumber: -1 });

    const newVersion = latest ? latest.versionNumber + 1 : 1;

    await Version.create({
      recordId,
      versionNumber: newVersion,
      content
    });

    res.json({ message: "Updated" });

  } catch (err) {
    res.status(500).json(err.message);
  }
});


// GET (ONLY LATEST VERSION)
router.get("/", async (req, res) => {
  try {

    const records = await Record.find();

    const result = [];

    for (let r of records) {

      const latest = await Version.findOne({ recordId: r._id })
        .sort({ versionNumber: -1 });

      result.push({
        _id: r._id,
        title: r.title,
        version: latest?.versionNumber || 1,
        content: latest?.content || ""
      });
    }

    res.json(result);

  } catch (err) {
    res.status(500).json(err.message);
  }
});


// HISTORY
router.get("/history/:id", async (req, res) => {
  try {

    const versions = await Version.find({ recordId: req.params.id })
      .sort({ versionNumber: 1 });

    res.json(versions);

  } catch (err) {
    res.status(500).json(err.message);
  }
});


// DELETE
router.delete("/delete/:id", async (req, res) => {
  try {

    const id = req.params.id;

    await Record.findByIdAndDelete(id);
    await Version.deleteMany({ recordId: id });

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;