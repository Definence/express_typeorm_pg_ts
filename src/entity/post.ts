import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './base'
import { User } from './user'

export type IPostPermitted = {
  title: string
  content: string
  user: User
}

@Entity('posts')
export class Post extends Base {
  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;
}
