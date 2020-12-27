const http = require('http');
const ON_DEATH = require('death')({ SIGHUP: true });
const settings = require('./settings/settings');
const errorService = require('./services/error.service');

class Server {

    constructor() {
        this.httpServer = null;
        this.isProcessExit = false;
        this.setProcess();
        this.initiate();
    }

    initiate() {
        const { NODE_ENV, SERVER_PORT } = settings;
        this.httpServer = http.createServer(this.app);
        this.httpServer.listen(SERVER_PORT);
        this.httpServer.on('error', (error) => {
            if (error.syscall === 'listen') {
                let errorMessage = null;
                switch (error.code) {
                    case 'EACCES': {
                        errorMessage = `port ${SERVER_PORT} requires elevated privileges`;
                        break;
                    }
                    case 'EADDRINUSE': {
                        errorMessage = `port ${SERVER_PORT} is already in use`;
                        break;
                    }
                }
                if (errorMessage) {
                    console.log(errorMessage);
                }
            }
            throw (error);
        });

        this.httpServer.on('listening', () => {
            this.log(`The server is now listening to port ${SERVER_PORT}. The server is now running on ${NODE_ENV} environment.`);
        });
    }

    setProcess() {
        process.on('uncaughtException', (error) => {
            console.log(error);
        });
        process.on('unhandledRejection', (reason, promise) => {
            console.log(reason);
            console.log(promise);
        });
        process.on('message', (message) => {
            if (message === 'shutdown') {
                this.log('Closing all connections.');
                setTimeout(() => {
                    this.log('Finished closing connections.');
                    process.exit(0);
                }, 1500);
            }
        });
        process.on('SIGTERM', () => {
            this.log('SIGTERM');
            if (!this.isProcessExit) {
                this.isProcessExit = true;
                this.close();
            }
        });
        ON_DEATH((signal, error) => {
            this.log('ON_DEATH');
            this.log(signal);
            this.log(error);
            if (signal || error) { }
            if (!this.isProcessExit) {
                this.isProcessExit = true;
                this.close();
            }
        });
    }

    close() {
        this.httpServer.close((error) => {
            this.log('The server is now closed for incoming requests.');
            if (error) {
                console.log(errorService.getErrorBasicDetails(error));
                process.exit(1);
            }
            this.log('The server is now closed.');
            process.exit(0);
        });
    }

    log(text) {
        console.log(`===${text}===`);
    }
}

new Server();