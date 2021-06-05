const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const users = require("./app/users");

const app = express();
const port = 8000;

const run = async () => {
  await mongoose.connect("mongodb://localhost/galleryApp", { useNewUrlParser: true, useUnifiedTopology: true });

  app.use(cors());
  app.use(express.static('public'));
  app.use(express.json());

  app.use("/users", users());

  app.listen(port, () => {
    console.log("Server started at http://localhost:" + port);
  });
};

run().catch(e => console.log(e));
