import mongoClient from "../../utils/mongoClient.js";

class WordsService {

    constructor(mongoClient) {
        this.mongoClient = mongoClient;
    }

    async getAll() {
        const client = this.mongoClient.client;
        try {
            await client.connect();
            const words = await client.db("main").collection("words").find().toArray();
            return words;
        } catch(e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
}

const wordsService = new WordsService(mongoClient);

export default wordsService;