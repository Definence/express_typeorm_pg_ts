import { EntityRepository, Repository } from "typeorm";
import { PostEntity } from "../entity/post";

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {}
