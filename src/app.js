const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const moviesRoutes = require("./routes/moviesRoutes");

app.use(express.json());

//definir rota principal da aplicação
app.use("/movies", moviesRoutes);

module.exports = app
