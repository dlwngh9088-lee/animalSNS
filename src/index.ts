import express, { Request, Response } from 'express';
import { Server } from './config/express';

const State = {
    INITAL: 1, 
    START: 2, 
    RUNNING: 3,
    STOPPED: 4,
    EXITING: 5,
    ETC: 6
}

let expressState = 1;

class App {
    constructor(public express: express.Application) {
        this.express = express;
    }
}

export function start() {
    switch (expressState) {
        case State.INITAL:
            break;
        case State.START:
        case State.RUNNING:
        case State.STOPPED:
        case State.EXITING:
            stop();
            break;
        case State.ETC:
    }

    expressState = State.START;

    const app = new App(express()).express;
    const server = new Server(app);
    server.settings();
    server.createServer();

    expressState = State.RUNNING;
}

export function stop() {

}

export function exit() {

}

// app.get("/", function(req: Request, res: Response) {
//     res.render('page/main');
// });

if (require.main === module) {
    exports.start();
}


