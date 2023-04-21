import config from './config/config.js';
import express from 'express';
import wordsRouter from './features/words/wordsRouter.js';
import cors from 'cors';

const app = express();

app.use(cors({
	origin: "http://localhost:3000",
	credentials: true
}));

app.use("/words", wordsRouter);

app.get('/', (req, res) => {
    res.send('API for Wordle app');
});

app.listen(config.apiServer.port, () => {
	console.log(`Wordle API server is running on http://localhost:${config.apiServer.port}!`)
});