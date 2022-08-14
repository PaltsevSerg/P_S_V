const express = require('express');
const User = require('./models/user');
const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
})

router.post("/users", async (req, res) => {
    const user = new User({
        name: req.body.name,
        age: req.body.age
    });
    await user.save();
    res.send(user);
})

router.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        res.send(user);
    } catch {
        res.status(404);
        res.send({error: "User doesn't exist!"});
    }
})

router.patch("/users/:id", async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});

        if (req.body.name) {
            user.name = req.body.name;
        }

        if (req.body.age) {
            user.age = req.body.age;
        }

        await user.save();
        res.send(user);
    } catch {
        res.status(404);
        res.send({error: "User doesn't exist!"});
    }
})

router.delete("/users/:id", async (req, res) => {
    try {
        await User.deleteOne({_id: req.params.id});
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({error: "User doesn't exist!"});
    }
})

module.exports = router;