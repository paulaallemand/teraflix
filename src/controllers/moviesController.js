const movies = require("../model/movies.json");
// const fetch = require("node-fetch");
const axios = require("axios");
const res = require("express/lib/response");

const home = (request, response) => {
    response.status(200).send("Welcome to Teraflix ;)")
};

const getAll = (request, response) => {
    response.status(200).send(movies);
};

const getGhibliFilms = async (req, res) => {
    try {
        let url = "https://ghibliapi.herokuapp.com/films"

        if(url) {
            let requestedMovies = await axios.get(url)
    
            res.status(200).send(requestedMovies.data)
        }
    } catch(error) {
        console.error(error)
    }
    // UTILIZANDO A PROMISE SEM ASYNC AWAIT
    //    axios.get(url)
    //     .then((response) => {
    //         console.log(response);
    //         res.status(200).send(response.data)
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })
};

const getGhibliFilmsUsingFetch = async (req, res) => {
    try {
        let url = "https://ghibliapi.herokuapp.com/films"
    
        let requestedMovies = await fetch(url)
    
        res.status(200).send(requestedMovies.json())
    } catch(error) {
        console.error(error)
    }
};

const createMovie = (request, response) => {
    // acessar as informações que vão da requisição
    let requestedTitle = request.body.title;
    let requestedGenre = request.body.genre;

    if(requestedTitle && requestedGenre) {
        // construir um novo objeto
        let newMovie = {
            "id": Math.random().toString(32).substr(2, 6),
            "addedAt": new Date(),
            "title": requestedTitle,
            "genre": requestedGenre
        };

        // armazeno essas informações na minha lista
        movies.push(newMovie)

        // envio uma respota
        response.status(200).send({
            "messagem": "Novo filme adicionado com sucesso",
            movies
        })
    } else {
        response.status(404).send({
            "mensagem": "Não foi possível criar o novo filme. Por favor, confira os dados enviados."
        })
    }
};

const deleteMovie = (request, response) => {
    // acessar o id do filme na requisição
   let requestedId = request.params.id;
   console.log("ID REQUERIDO", requestedId);

    // localizar qual filme tem o id respectivo ao id da requisição
    let filteredMovie = movies.find(movie => movie.id == requestedId);
    console.log("FILME FILTRADO", filteredMovie);

    // deleto o filme da lista
    let index = movies.indexOf(filteredMovie);
    console.log("INDEX DO FILME", filteredMovie);

    movies.splice(index, 1);

    // retorno uma resposta à requisição
    res.status(200).send({
        "mensagem": "Filme deletado com sucesso!"
    }, movies)
};


module.exports = {
    home,
    getAll,
    getGhibliFilms,
    getGhibliFilmsUsingFetch,
    createMovie,
    deleteMovie
}