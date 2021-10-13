import { getConnection } from "typeorm";
import { PostEntity } from "../entity/post";
import { PostRepository } from "../repository/post.repository"

export class PostService {
  private postReposiitory: PostRepository;

  constructor() {
    this.postReposiitory = getConnection('blog').getCustomRepository(PostRepository);
  }

  public index = async () => {
    const posts = await this.postReposiitory.find();
    return posts;
  }

  public create = async (post: PostEntity) => {
    const newPost = await this.postReposiitory.save(post);
    return newPost;
  }

  public update = async (id: number, post: PostEntity) => {
    // const updatedPost = await this.postReposiitory.save({ ...post, id });
    const updatedPost = await this.postReposiitory.update(id, post);
    return updatedPost;
  }

  public delete = async (id: number) => {
    const deletedPost = await this.postReposiitory.delete(id);
    return deletedPost;
  }
}
