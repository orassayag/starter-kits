const errorService = require('../services/error.service');

module.exports = ((error, request, response, next) => {
    if (request || next) { }
    let errorMessage = 'Something went wrong';
    if (error) {
        errorMessage = errorService.getErrorBasicDetails(error);
    }
    return response.status(500).send(errorMessage);
});