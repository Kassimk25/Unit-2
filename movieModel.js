const {MongoClient, ObjectId} = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = "movieDB";

async function getCollection() {
    await client.connect();
    return client.db(dbName).collection("movies");

}

async function createMovie(movie) {
    const col = await getCollection();
    return await col.insertOne(movie);

}

async function getMovies() {
    const col = await getCollection();
    return await col.find({}).toArray();

}


async function updateMovie() {
    const col = await getCollection();
    return await col.updateOne(
        {_id: new ObjectId(id) },
        {$set: data}
    );

}

async function deleteMovie() {
    const col = await getCollection();
    return await col.deleteOne({_id: new ObjectId(id) });

}

module.exports = {
    createMovie,
    getMovies,
    updateMovie,
    deleteMovie
}