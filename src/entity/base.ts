import { Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'
import { v4 as uuid } from 'uuid'

export abstract class Base extends BaseEntity {
  constructor(attributes: Partial<any>) {
    super()
    Object.assign(this, attributes)
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  uuid: string;

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
