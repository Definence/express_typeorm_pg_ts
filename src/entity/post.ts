import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('posts')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid' })
    uuid: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    uuidSequence() {
        this.uuid = uuid()
    }

    toJSON() {
        return { ...this, id: undefined }
    }
}
