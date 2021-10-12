import { Router, Response, Request } from 'express'
import { PostService } from '../services/post.service';

export class PostController {
  public router: Router;
  private postService: PostService;

  constructor() {
    this.router = Router();
    this.postService = new PostService();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    res.send(this.postService.index());
  }

  public post = async (req: Request, res: Response) => {
    res.send(this.postService.create());
  }

  public put = async (req: Request, res: Response) => {
    res.send(this.postService.update());
  }

  public delete = async (req: Request, res: Response) => {
    res.send(this.postService.delete());
  }

  public routes() {
    this.router.get('/', this.index);
    this.router.post('/', this.post);
    this.router.put('/:id', this.put);
    this.router.delete('/:id', this.delete);
  }
}
