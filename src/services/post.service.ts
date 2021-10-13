import { Post } from "../entity/post";

type IPostPermitted = {
  title: string
  content: string
}

export class PostService {
  public index = async () => {
    const posts = await Post.find();
    return posts;
  }

  public show = async (uuid: string) => {
    const post = await Post.findOneOrFail({ uuid });
    return post;
  }

  public create = async (post: IPostPermitted) => {
    const newPost = await Post.create(post);
    return newPost.save();
  }

  public update = async (uuid: string, post: IPostPermitted) => {
    const record = await Post.findOneOrFail({ uuid })
    record.content = post.content || record.content
    record.title = post.title || record.title
    const updatedPost = await record.save();
    return updatedPost;
  }

  public delete = async (uuid: string) => {
    const postToDelete = await Post.findOneOrFail({ uuid })
    await postToDelete.remove()
    return postToDelete;
  }
}
