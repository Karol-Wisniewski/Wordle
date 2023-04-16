const words = require('./Words.js');

const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('API for Wordle app');
});

app.get('/words', (req, res) => {
    res.send(words.words);
});

const port = process.env.API_PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});