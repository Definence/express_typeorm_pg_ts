import "reflect-metadata";
import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';

import { PostController } from './controller/post.controller';

class Server {
    private postController: PostController;
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configuration();
    }

    public configuration() {
        this.app.set('port', process.env.PORT || 3001);
        this.app.use(express.json())
    }

    public initRoutes() {
        this.postController = new PostController();

        this.app.use('/api/posts/', this.postController.router);
        this.app.get('/', (_req: Request, res: Response) => {
            res.send('Hello world. This is sample application based on ExpressJS, TypeORM, PG and TS')
        });
    }

    public async start() {
        this.initRoutes();
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening ${this.app.get('port')} port.`);
        })
    }
}

const server = new Server();

createConnection()
    .then(() => {
        server.start();
    }).catch((error) => {
        console.log(error);
    })
