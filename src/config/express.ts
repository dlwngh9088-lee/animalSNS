import express from 'express';
import path from 'path';
import { port, ip } from '../utils/settings';

export class Server {
    constructor(private app: express.Application) {
        this.app = app;
    }

    settings() {
        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine', 'ejs');
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    createServer() {
        this.app.listen(port, ip, function() {
            console.log(`${port} server start`);
        })
    }
}