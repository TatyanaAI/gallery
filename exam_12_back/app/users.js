const express = require("express");
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");
const { nanoid } = require("nanoid");
const config = require("../config");

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

    router.post('/facebookLogin', async (req, res) => {
        const inputToken = req.body.accessToken;
        const accessToken = config.fb.appId + "|" + config.fb.appSecret;
        const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

        try {
            const response = await axios.get(debugTokenUrl);

            if (response.data.data.error) {
                return res.status(401).send({ message: 'Facebook token incorrect' });
            }

            if (req.body.id !== response.data.data.user_id) {
                return res.status(401).send({ message: 'Wrong user ID' });
            }

            let user = await User.findOne({ facebookId: req.body.id });

            if (!user) {
                user = new User({
                    username: req.body.name,
                    password: nanoid(),
                    facebookId: req.body.id,
                });
            }

            user.generateToken();
            await user.save();

            return res.send({ message: 'Login or register successful', user });
        } catch (error) {
            console.log("error", error)

            return res.status(401).send({ message: 'Facebook token incorrect' });
        }
    });

    return router;
};

module.exports = createRouter;