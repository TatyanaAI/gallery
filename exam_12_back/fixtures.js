const mongoose = require('mongoose');
const { nanoid } = require("nanoid");
const config = require('./config');

const Photo = require('./models/Photo');
const User = require('./models/User');

mongoose.connect(config.db.url + '/' + config.db.name);

const db = mongoose.connection;

db.once('open', async () => {
    try {
        await db.dropCollection('photos');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [tatUser, simpleUser] = await User.create({
        username: "Tanya",
        password: "ta8na85",
        token: nanoid()
    }, {
        username: "simpleUser",
        password: "qwus7x2",
        token: nanoid()
    });

    await Photo.create(
        {
            title: "City",
            image: "lLDr-mdfOgygXeU_pd0Xd.jpg",
            user: tatUser._id
        },
        {
            title: "Baby tiger",
            image: "RY-NCRTxRrD1Ix6X_b0l6.jpg",
            user: tatUser._id
        },
        {
            title: "Buildings",
            image: "FxFL33VBpk7mpxmBTabjQ.jpg",
            user: tatUser._id
        },
        {
            title: "Waterfall",
            image: "9iWpbahS_uY7xUIN8JcmU.jpg",
            user: tatUser._id
        },
        {
            title: "Squirrel",
            image: "PFVYbIPeajEJhmc0G5_yG.jpg",
            user: tatUser._id
        },
        {
            title: "Stop",
            image: "JjA6jgZURm08rkVSxIE61.jpg",
            user: tatUser._id
        },
        {
            title: "Bird",
            image: "XZe29WJXGq1ss7L7nrMU3.jpg",
            user: tatUser._id
        },
        {
            title: "Cheetah",
            image: "83f04Z9jPusd4PGgpoff0.jpg",
            user: simpleUser._id
        },
        {
            title: "Butterfly",
            image: "Mnmn2vhxr8kKH2gzUtmQG.jpg",
            user: simpleUser._id
        },
        {
            title: "Trees",
            image: "UspAYv2hWTVBiCQJLPKuG.jpg",
            user: simpleUser._id
        });

    db.close();
});