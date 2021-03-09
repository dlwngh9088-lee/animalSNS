import express, { Request, Response } from 'express';

export class ServerError {
    result: Object = {};

    constructor(private app: express.Application) {
        this.app = app;
    }

    errorMiddleware() {
        this.app.use((req: Request, res: Response, next: express.NextFunction) => {
            this.result = {
                status: 404, 
                message: "404 Not Found",
                error: {},
                data: {}
            }
            res.status(404).send(this.result);
        });

        this.app.use((
            err: express.ErrorRequestHandler,
            req: Request,
            res: Response,
            next: express.NextFunction
        ) => { 
            this.result = {
                status: 500, 
                message: "500 Server Error",
                error: {},
                data: {}
            }
            res.status(500).json(this.result);
        });
    }
}