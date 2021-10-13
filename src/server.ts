import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { PostController } from './controller/post.controller';
import "reflect-metadata";

class Server {
  private postController: PostController;
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configuration();
    this.initAsync();
  }

  public configuration() {
    this.app.set('port', process.env.PORT || 3001);
    this.app.use(express.json())
  }

  public async initAsync() {
    await this.initDB()
    this.initRoutes()
  }

  public async initDB() {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      name: 'blog',
      username: 'blog',
      password: 'blog',
      database: 'blog',
      entities: ['build/entity/**/*.js'],
      // synchronize: true, // rails schema:load analogue
    })
  }

  public initRoutes() {
    this.postController = new PostController();

    this.app.use('/api/posts/', this.postController.router);
    this.app.get('/', (_req: Request, res: Response) => {
      res.send('Hello world. This is sample application based on ExpressJS, TypeORM, PG and TS')
    });
  }

  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    })
  }
}

const server = new Server();
server.start();
