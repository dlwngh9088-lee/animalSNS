import express, { Request, Response } from 'express';

export default function createServerErrorHandle(app: express.Application) {
    app.use(function(req: Request, res: Response, next: express.NextFunction) { //404 error
        const result = {
            status: 404,
            message: "404 Not Found",
            error: {},
            data: {}
        }
        return res.status(404).send(result);
    }) 

    app.use(function( //500 server error
        err: express.ErrorRequestHandler,
        req: Request,
        res: Response,
        next: express.NextFunction
    ) {
        const result = {
            status: 500,
            message: "500 Server Error",
            error: err,
            data: {}
        }
        return res.status(500).json(result);
    });
}