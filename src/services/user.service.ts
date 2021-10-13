import { validate } from "class-validator";
import { IUserPermitted, User } from "../entity/user";

export class UserService {
  public index = async () => {
    const data = await User.find({ relations: ['posts'] });
    return data;
  }

  public show = async (uuid: string) => {
    const data = await User.findOneOrFail({ uuid });
    return data;
  }

  public create = async (data: IUserPermitted) => {
    const newdata = await User.create(data);
    const errors = await validate(newdata)
    if (errors.length > 0) throw errors
    return newdata.save();
  }

  public update = async (uuid: string, data: IUserPermitted) => {
    const record = await User.findOneOrFail({ uuid })
    record.name = data.name || record.name
    record.email = data.email || record.email
    record.role = data.role || record.role
    const errors = await validate(record)
    if (errors.length > 0) throw errors
    const updateddata = await record.save();
    return updateddata;
  }

  public delete = async (uuid: string) => {
    const dataToDelete = await User.findOneOrFail({ uuid })
    await dataToDelete.remove()
    return dataToDelete;
  }
}
