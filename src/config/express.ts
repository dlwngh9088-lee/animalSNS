import express from 'express';
import path from 'path';
import { port, ssl } from '../utils/settings';
import https from 'https';
import http from 'http';
import { httpsOptions } from '../interfaces/interface';

class Server {
    http = http;
    https = https;

    constructor() {
        this.http = http;
        this.https = https;
    }
}

export default function createServer(app: express.Application) {
    const server = new Server();
    createServerSettings(app);

    if (ssl) {
        const options: httpsOptions = {
            key: '',
            cert: ''
        }

        server.https.createServer(options, app);
    } else {
        server.http.createServer(app).listen(port);
        console.log(`server start ${port}`)
    }
}

function createServerSettings(app: express.Application) {
    app.set('public', path.join(__dirname, '../public'));
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'ejs');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
}


