import { Router, Response, Request } from 'express'
import { UserService } from '../services/user.service';

export class UserController {
  public router: Router;
  private userService: UserService;

  constructor() {
    this.router = Router();
    this.userService = new UserService();
    this.routes();
  }

  public index = async (_req: Request, res: Response) => {
    try {
      const result = await this.userService.index()
      res.send(result);
    } catch {
      res.status(500).json({ error: 'Something went wrong' })
    }
  }

  public show = async (req: Request, res: Response) => {
    try {
      const { uuid } = req.params;
      const result = await this.userService.show(uuid)
      res.send(result);
    } catch {
      res.status(404).json({ error: 'Entity not found' })
    }
  }

  public post = async (req: Request, res: Response) => {
    try {
      const { name, email, role } = req.body;
      const result = await this.userService.create({ name, email, role });
      res.status(201).json(result);
    } catch (err) {
      res.status(422).json(err)
    }
  }

  public put = async (req: Request, res: Response) => {
    try {
      const { name, email, role } = req.body;
      const { uuid } = req.params;
      const result = await this.userService.update(uuid, { name, email, role });
      res.json(result);
    } catch (err) {
      res.status(422).json(err)
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const { uuid } = req.params;
      const result = await this.userService.delete(uuid);
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
