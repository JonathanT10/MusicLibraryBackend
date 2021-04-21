const express = require("express");
const { updateProduct } = require("./repository/products-repository");
const { updateMusic } = require("./repository/music-repository");
const repoContext = require("./repository/repository-wrapper");
// const cors = require("cors");
const { validateProduct } = require("./middleware/products-validation");
const { validateMusic } = require("./middleware/music-validation");

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.listen(3000, function(){
    console.log("Server started. Listening on port 3000.");
});

app.get("/api/products", (req, res) => {
    const products = repoContext.songs.findAllProducts();
    return res.send(products);
});

app.get("/api/products/:id", (req, res) => {
    const id = req.params.id;
    const porduct = repoContext.products.findProductById(id);
    return res.send(product);
});

app.post("/api/products", (req, res) => {
    const newProduct = req.body;
    const addedProduct = repoContext.products.createProduct(newProduct);
    return res.send(addedProduct);
});

app.put("/api/products/:id", [validateProduct], (req, res) => {
    const id = req.params.id;
    const productPropertiesToUpdate = req.body;
    const updtatedProduct = repoContext.products.updateProduct(id, productPropertiesToUpdate);
    return res.send(updateProduct);
});

app.delete("api/products/:id", (req, res) => {
    const id = req.params.id;
    const updatedDataSet = repoContext.products.deleteProduct(id);
    return res.send(updatedDataSet);
});

app.get("/api/music", (req, res) => {
    const music = repoContext.songs.findAllSongs();
    return res.send(music);
});

app.get("/api/music/:id", (req, res) => {
    const id = req.params.id;
    const music = repoContext.songs.findSongById(id);
    return res.send(music);
});

app.post("/api/music", [validateMusic], (req, res) => {
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);
    return res.send(addedSong);
});

app.put("/api/music/:id", [validateMusic],  (req, res) => {
    const id = req.params.id;
    const songPropertiesToUpdate = req.body;
    const updtatedSong = repoContext.songs.updateSong(id, songPropertiesToUpdate);
    return res.send(updateMusic);
});

app.delete("api/music/:id", (req, res) => {
    const id = req.params.id;
    const updatedDataSet = repoContext.songs.deleteSong(id);
    return res.send(updatedDataSet);
});

