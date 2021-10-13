import { Router, Response, Request } from 'express'
import { PostService } from '../services/post.service';
import { Post } from "../entity/post";
import { User } from '../entity/user';

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
      const { userUuid } = req.query as { userUuid: string };
      if (!userUuid) throw 'User missing'
      const user = await User.findOneOrFail({ uuid: userUuid })
      const result = await this.postService.index(user)
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
    const { title, content, userUuid } = req.body;
    const user = await User.findOneOrFail({ uuid: userUuid })

    try {
      const result = await this.postService.create({ title, content, user });
      res.status(201).json(result);
    } catch (err) {
      res.status(422).json(err)
    }
  }

  public put = async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body;
      const { uuid, userUuid } = req.params;
      const user = await User.findOneOrFail({ uuid: userUuid })

      const result = await this.postService.update(uuid, { title, content, user });
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
