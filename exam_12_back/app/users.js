const express = require("express");
const router = express.Router();
const User = require("../models/User");

const createRouter = () => {
    router.post("/", async (req, res) => {
        if (!req.body.username)
            return res.status(400).send({ error: 'Username parameter not found' });
        if (!req.body.password)
            return res.status(400).send({ error: 'Password parameter not found' });

        let result = await User.findOne({ username: req.body.username })
        if (result) {
            return res.status(400).send({ error: 'Username already exists' });
        }

        result = new User({
            username: req.body.username,
            password: req.body.password,
          });

        result.generateToken();
        try {
            await result.save();
            res.send(result);
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });

    router.post("/sessions", async (req, res) => {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send({ error: 'Username not found' });
        }

        const passwordCorrect = await user.checkPassword(req.body.password, user.password);

        if (!passwordCorrect) {
            return res.status(400).send({ error: 'Password is wrong' });
        }

        user.generateToken();

        try {
            await user.save();
            return res.send(user);

        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });

    router.delete("/sessions", async (req, res) => {
        const token = req.get("Authentication");
        const success = { message: "Success" };

        if (!token) return res.send(success);

        const user = await User.findOne({ token });

        if (!user) return res.send(success);

        user.generateToken();
        try {
            await user.save({ validateBeforeSave: false });
            return res.send(success);
        } catch (e) {
            res.status(500).send(e);
        }
    });

    return router;
};

module.exports = createRouter;