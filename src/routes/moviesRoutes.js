const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const controllers = require("../controllers/moviesController");

router.get("/", controllers.home);

router.get("/all", controllers.getAll);

router.get("/ghibli", controllers.getGhibliFilms);

router.post("/create", controllers.createMovie);

router.delete("/delete/:id", controllers.deleteMovie);

module.exports = router