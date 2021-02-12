import express from 'express';

class App {
    constructor(public express: any) {
        this.express = express;
    }
}

const app = new App(express()).express;

app.listen(8080, function() {
    console.log("8080 server start");
})