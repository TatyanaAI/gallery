const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const multer = require('multer');
const path = require('path');
const config = require('../config');
const auth = require("../middleware/auth");
const Photo = require("../models/Photo");
const User = require("../models/User");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const createRouter = () => {
  router.get("/", async (req, res) => {
    try {
      let photos = await Photo.find().populate("user", '-token');
      res.send(photos);
    } catch (e) {
      console.error(e.message)
      res.sendStatus(500).send(e);;
    }
  });

  router.get("/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(400).send({ error: 'User not found' });
      }

      let photos = await Photo.find({ "user": user }).populate("user", '-token');
      const result = {
        photos: photos,
        user: {
          id: user._id,
          username: user.username
        }
      }
      res.send(result);
    } catch (e) {
      console.error(e.message)
      res.sendStatus(500).send(e);
    }
  });

  router.post("/", auth, upload.single('image'), async (req, res) => {
    const photo = { ...req.body };
    photo.user = req.user.id

    if (req.file) {
      photo.image = req.file.filename;
    }

    const result = new Photo(photo);

    try {
      await result.save();
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  router.delete("/:photoId", auth, async (req, res) => {
    let photo = await Photo.findById(req.params.photoId).populate("user");
    if (!photo) {
      return res.status(400).send({ error: 'Incorrect photo id' });
    }

    if (String(photo.user._id) !== String(req.user.id)) {
      return res.status(400).send({ error: 'User does not have permissions to delete photo' });
    }

    try {
      await photo.delete();
      return res.send({ message: "Photo deleted successfully" });
    } catch (e) {
      res.status(500).send(e);
    }
  });

  return router;
};

module.exports = createRouter;