const axios = require('axios');
const settings = require('../settings/settings');

class APIService {

    constructor() {
        this.defaultSettings = `api_key=${settings.API_KEY}`;
        this.baseAPI = 'https://api.themoviedb.org/3/';
        const headers = {
            'content-type': 'application/json'
        };
        this.serverAPI = axios.create({
            headers: headers
        });
    }

    async request(request) {
        const { queryURL, pageNumber, language } = request;
        const responseResult = {
            response: null,
            error: null
        };
        const query = `${this.baseAPI}${queryURL}${queryURL.indexOf('?') > -1 ? '&' : '?'}${this.defaultSettings}${pageNumber ? `&page=${pageNumber}` : ''}${language ? `&language=${language}` : ''}`;
        try {
            responseResult.response = await this.serverAPI.get(query);
        } catch (error) {
            if (error) {
                responseResult.error = error;
            }
        }
        return responseResult;
    }
}

module.exports = new APIService();