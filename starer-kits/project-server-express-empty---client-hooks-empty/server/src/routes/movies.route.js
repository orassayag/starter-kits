const express = require('express');

class MoviesRoute {

    constructor() {

        this.router = express.Router();

        this.router.post('/create', (request, response) => {
            const { parameter1, parameter2 } = request.query;
            const data = {};
            return response.status(200).send(data);
        });

        this.router.get('/get', (request, response) => {
            const { parameter1, parameter2 } = request.query;
            const data = {};
            return response.status(200).send(data);
        });

        this.router.post('/update', (request, response) => {
            const { parameter1, parameter2 } = request.query;
            const data = {};
            return response.status(200).send(data);
        });

        this.router.post('/delete', (request, response) => {
            const { parameter1, parameter2 } = request.query;
            const data = {};
            return response.status(200).send(data);
        });
    }
}

module.exports = new MoviesRoute();