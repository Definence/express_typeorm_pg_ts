import { Length } from 'class-validator';
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
  @Length(1, 255)
  title: string;

  @Column()
  @Length(1, 255)
  content: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;
}
