import { Router, Response, Request } from 'express'
import { PostService } from '../services/post.service';
import { Post } from "../entity/post";

export class PostController {
  public router: Router;
  private postService: PostService;

  constructor() {
    this.router = Router();
    this.postService = new PostService();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    try {
      const result = await this.postService.index()
      res.send(result);
    } catch {
      res.status(500).json({ error: 'Something went wrong' })
    }
  }

  public post = async (req: Request, res: Response) => {
    const post = req.body as Post;
    try {
      const result = await this.postService.create(post);
      res.status(201).json(result);
    } catch (err) {
      res.status(422).json(err)
    }
  }

  public put = async (req: Request, res: Response) => {
    try {
      const post = req.body as Post;
      const id = req.params.id;
      const result = await this.postService.update(Number(id), post);
      res.json(result);
    } catch (err) {
      res.status(422).json(err)
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const result = await this.postService.delete(Number(id));
      res.status(204).json(result);
    } catch {
      res.status(500).json({ error: 'Something went wrong' })
    }
  }

  public routes() {
    this.router.get('/', this.index);
    this.router.post('/', this.post);
    this.router.put('/:id', this.put);
    this.router.delete('/:id', this.delete);
  }
}
