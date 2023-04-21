import words from "../Words.js";
import mongoClient from "./mongoClient.js";


// (async () => {
//     const collection = await mongoClient.getCollection("words");
//     const wordsObjects = words.map(word => ({ word }));
//     const result = await collection.insertMany(wordsObjects);
//     console.log(result);
// })();