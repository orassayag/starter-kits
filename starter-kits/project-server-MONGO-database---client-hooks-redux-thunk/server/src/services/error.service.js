class ErrorService {

    constructor() { }

    getErrorBasicDetails(error) {
        if (!error) {
            return null;
        }
        let errorData = '';
        const keys = ['name', 'message', 'description', 'number', 'fileName', 'lineNumber', 'stack'];
        for (let i = 0, length = keys.length; i < length; i++) {
            const data = error[keys[i]];
            if (data) {
                errorData += ` ${data}`;
            }
        }
        return errorData;
    }
}

module.exports = new ErrorService();