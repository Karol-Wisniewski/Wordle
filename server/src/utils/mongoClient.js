import { MongoClient, ServerApiVersion } from 'mongodb';
import config from '../config/config.js';

const client = new MongoClient(config.mongodb.url , {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    monitorCommands: true,
});

export default {
    client
};