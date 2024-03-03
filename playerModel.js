const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    team: String,
    position: String
});

module.exports = mongoose.model('Player', playerSchema);
