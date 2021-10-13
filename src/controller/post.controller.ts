import { Router, Response, Request } from 'express'
import { PostService } from '../services/post.service';
import { PostEntity } from "../entity/post";

export class PostController {
  public router: Router;
  private postService: PostService;

  constructor() {
    this.router = Router();
    this.postService = new PostService();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const result = await this.postService.index()

    res.send(result);
  }

  public post = async (req: Request, res: Response) => {
    const post = req.body as PostEntity;
    const result = await this.postService.create(post);

    res.send(result);
  }

  public put = async (req: Request, res: Response) => {
    const post = req.body as PostEntity;
    const id = req.params.id;
    const result = await this.postService.update(Number(id), post);

    res.send(result);
  }

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await this.postService.delete(Number(id));

    res.send(result);
  }

  public routes() {
    this.router.get('/', this.index);
    this.router.post('/', this.post);
    this.router.put('/:id', this.put);
    this.router.delete('/:id', this.delete);
  }
}
