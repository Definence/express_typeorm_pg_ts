import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from './base'
import { Post } from './post';

export type IUserPermitted = {
  name: string
}

@Entity('users')
export class User extends Base {
  @Column()
  name: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}
