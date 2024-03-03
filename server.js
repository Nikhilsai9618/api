const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const playerRoutes = require('./playerRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/Database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use('/api', playerRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
