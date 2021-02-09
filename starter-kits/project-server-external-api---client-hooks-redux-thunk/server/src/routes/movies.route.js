const express = require('express');
const movieService = require('../services/movie.service');

class MoviesRoute {

    constructor() {

        this.router = express.Router();

        this.router.get('/getMovies', async (request, response) => {
            const { searchText, pageNumber } = request.query;
            if (!pageNumber) {
                return response.status(500).send('Invalid pageNumber');
            }
            const movies = await movieService.getMovies({
                searchText: searchText,
                pageNumber: pageNumber
            });
            return response.status(200).send(movies);
        });

        this.router.get('/getMovie', async (request, response) => {
            const { movieId } = request.query;
            if (!movieId) {
                return response.status(500).send('Invalid movieId');
            }
            const movie = await movieService.getMovie(movieId);
            return response.status(200).send(movie);
        });

        this.router.get('/getVideos', async (request, response) => {
            const { movieId } = request.query;
            if (!movieId) {
                return response.status(500).send('Invalid movieId');
            }
            const videos = await movieService.getVideos(movieId);
            return response.status(200).send(videos);
        });

        this.router.get('/getCredits', async (request, response) => {
            const { movieId } = request.query;
            if (!movieId) {
                return response.status(500).send('Invalid movieId');
            }
            const credits = await movieService.getCredits(movieId);
            return response.status(200).send(credits);
        });
    }
}

const moviesRoute = new MoviesRoute();
module.exports = moviesRoute;