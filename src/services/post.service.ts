import { Post } from "../entity/post";

export class PostService {
  public index = async () => {
    const posts = await Post.find();
    return posts;
  }

  public create = async (post: Post) => {
    const newPost = await Post.create(post);
    return newPost.save();
  }

  public update = async (id: number, post: Post) => {
    // const updatedPost = await Post.save({ ...post, id });
    const updatedPost = await Post.update(id, post);
    return updatedPost;
  }

  public delete = async (id: number) => {
    const deletedPost = await Post.delete(id);
    return deletedPost;
  }
}
