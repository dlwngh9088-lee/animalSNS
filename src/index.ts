import express, { Request, Response } from 'express';
import path from 'path';

class App {
    constructor(public express: any) {
        this.express = express;
    }
}

const app = new App(express()).express;

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.get("/", function(req: Request, res: Response) {
    res.render('page/main');
})

app.listen(8080, function() {
    console.log("8080 server start");
})