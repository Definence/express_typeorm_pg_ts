import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity('posts')
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;
}
