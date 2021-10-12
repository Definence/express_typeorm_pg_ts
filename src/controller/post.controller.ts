import { Router, Response, Request } from 'express'

export class PostController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    res.send('Index');
  }

  public post = async (req: Request, res: Response) => {
    res.send('Create');
  }

  public put = async (req: Request, res: Response) => {
    res.send('Update');
  }

  public delete = async (req: Request, res: Response) => {
    res.send('Delete');
  }

  public routes() {
    this.router.get('/', this.index);
    this.router.post('/', this.post);
    this.router.put('/:id', this.put);
    this.router.delete('/:id', this.delete);
  }
}
