"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class App {
    constructor(express) {
        this.express = express;
        this.express = express;
    }
}
const app = new App(express_1.default()).express;
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.get("/", function (req, res) {
    res.render('page/main');
});
app.listen(8080, function () {
    console.log("8080 server start");
});
