import { validate } from "class-validator";
import { IPostPermitted, Post } from "../entity/post";
import { User } from "../entity/user";

export class PostService {
  public index = async (user: User) => {
    const posts = await Post.find({ where: { user }, relations: ['user'] });
    return posts;
  }

  public show = async (uuid: string) => {
    const post = await Post.findOneOrFail({ uuid });
    return post;
  }

  public create = async (post: IPostPermitted) => {
    const newData = await Post.create(post);
    const errors = await validate(newData);
    if (errors.length > 0) throw errors;
    return newData.save();
  }

  public update = async (uuid: string, post: IPostPermitted) => {
    const record = await Post.findOneOrFail({ uuid })
    record.content = post.content || record.content
    record.title = post.title || record.title
    const errors = await validate(record)
    if (errors.length > 0) throw errors
    const updatedPost = await record.save();
    return updatedPost;
  }

  public delete = async (uuid: string) => {
    const postToDelete = await Post.findOneOrFail({ uuid })
    await postToDelete.remove()
    return postToDelete;
  }
}
