import express from 'express';
import createServer from './config/express'; 
import errorHanlder from './config/errorHandler'; 
import routes from './routes/routes';
import controller from './routes/controller';
import conrollerFile from './routes/controllerFile';

class App {
    constructor(public express: express.Application) {
        this.express = express;
    }
}

export function start() {
    const app = new App(express()).express;
    //서버 생성 및 세팅
    createServer(app);

    //routes
    app.use('/', routes);
    app.use('/controller', controller);
    app.use('/conrollerFile', conrollerFile);

    //error middleware
    errorHanlder(app);
}

if (require.main === module) { // Node를 통해 바로 실행된 파일이라면 require.main은 module과 동일 
    start();
}


