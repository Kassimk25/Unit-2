const express = require("express");
const path = require("path");
require("dotenv").config();

const {
    createMovie,
    getMovies,
    updateMovie,
    deleteMovie 
} = require("movieModel.js");

const app = express();

app.use(expressurlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/movies-page", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "movies.html"));
});

app.get("/add", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "add.html"));
});

app.get("/edit", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "edit.html"));
});


app.get("/movies", async (req, res) => {
    const movies = await getMovies();
    res.json(movies);
});

app.post("/add-movie", async (req, res) => {
    await createMovie({
        title: req.body.title,
        genre: req.body.genre
    });

    res.redirect("/movies-page");
});

app.post("/delete-movie", async (req, res) => {
    await deleteMovie(req.body.id);
    res.redirect("/movies-page");
});



app.listen(() => {
    console.log("Server running at http://localhost:3000");
});