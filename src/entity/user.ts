import { IsEmail, IsEnum, Length } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from './base'
import { Post } from './post';

export type IUserPermitted = {
  name: string
  email: string
  role: 'user' | 'admin'
}

@Entity('users')
export class User extends Base {
  @Column()
  @Length(1, 255)
  name: string;

  @Column()
  @Length(1, 255)
  @IsEmail()
  email: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
    default: 'user'
  })
  @IsEnum(['user', 'admin', undefined])
  role: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}
