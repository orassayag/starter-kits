module.exports = ((request, response, next) => {
    if (request) { }
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Credentials', 'true');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin, access-control-allow-headers');
    response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
    response.removeHeader('X-Frame-Options');
    if (next) {
        next();
    }
});