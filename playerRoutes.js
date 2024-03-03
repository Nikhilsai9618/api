const express = require('express');
const router = express.Router();
const Player = require('./playerModel');

const express = require('express');
const router = express.Router();
const Player = require('./playerModel');

// Add a player
router.post('/players', async (req, res) => {
    const player = new Player(req.body);
    try {
        await player.save();
        res.status(201).send(player);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Update a player
router.put('/players/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!player) {
            return res.status(404).send();
        }
        res.send(player);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Delete a player
router.delete('/players/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (!player) {
            return res.status(404).send();
        }
        res.send(player);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Query 1: Find Players by Team
router.get('/players/team/:team', async (req, res) => {
    try {
        const players = await Player.find({ team: req.params.team });
        res.send(players);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Query 2: Find Players by Age Range
router.get('/players/age/:min/:max', async (req, res) => {
    try {
        const players = await Player.find({ age: { $gte: req.params.min, $lte: req.params.max } });
        res.send(players);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Query 3: Find Players by Position
router.get('/players/position/:position', async (req, res) => {
    try {
        const players = await Player.find({ position: req.params.position });
        res.send(players);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Query 4: Get a List of Players Sorted by Name
router.get('/players/sortedByName', async (req, res) => {
    try {
        const players = await Player.find({}).sort('name');
        res.send(players);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Query 5: Find Players with Specific Attributes
router.get('/players/specific/:age/:team', async (req, res) => {
    try {
        const players = await Player.find({ age: { $gte: req.params.age }, team: req.params.team });
        res.send(players);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
