import "reflect-metadata";
import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';

import { PostController } from './controller/post.controller';
import { UserController } from './controller/user.controller';

class Server {
    private postController: PostController;
    private userController: UserController;
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configuration();
    }

    public configuration() {
        this.app.set('port', process.env.PORT || 3001);
        this.app.use(express.json())
        this.initRoutes();
    }

    public initRoutes() {
        this.postController = new PostController();
        this.userController = new UserController();

        this.app.use('/api/posts/', this.postController.router);
        this.app.use('/api/users/', this.userController.router);
        this.app.get('/', (_req: Request, res: Response) => {
            res.send('Hello world. This is sample application based on ExpressJS, TypeORM, PG and TS')
        });
    }

    public async start() {
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
