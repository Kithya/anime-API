import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/get-anime", async (req, res) => {
    const animeId = req.body.animeId;
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/full`);
        const animeData = response.data.data; // Corrected access to the actual data
        res.render("anime.ejs", { anime: animeData });
    } catch (error) {
        console.error(error);
        res.send('An error occurred while fetching the anime information.');
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
