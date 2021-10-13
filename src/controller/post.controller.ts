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

  public index = async (_req: Request, res: Response) => {
    try {
      const result = await this.postService.index()
      res.send(result);
    } catch {
      res.status(500).json({ error: 'Something went wrong' })
    }
  }

  public show = async (req: Request, res: Response) => {
    try {
      const { uuid } = req.params;
      const result = await this.postService.show(uuid)
      res.send(result);
    } catch {
      res.status(404).json({ error: 'Entity not found' })
    }
  }

  public post = async (req: Request, res: Response) => {
    const { title, content } = req.body as Post;
    try {
      const result = await this.postService.create({ title, content });
      res.status(201).json(result);
    } catch (err) {
      res.status(422).json(err)
    }
  }

  public put = async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body as Post;
      const { uuid } = req.params;
      const result = await this.postService.update(uuid, { title, content });
      res.json(result);
    } catch (err) {
      res.status(422).json(err)
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const { uuid } = req.params;
      const result = await this.postService.delete(uuid);
      return res.json(result)
    } catch {
      res.status(500).json({ error: 'Something went wrong' })
    }
  }

  public routes() {
    this.router.get('/', this.index);
    this.router.get('/:uuid', this.show);
    this.router.post('/', this.post);
    this.router.put('/:uuid', this.put);
    this.router.delete('/:uuid', this.delete);
  }
}
