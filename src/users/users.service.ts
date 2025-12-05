import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  createUser(data: any) {
    return this.userModel.create(data);
  }

  updateUser (  id:number, data: any) {
    return this.userModel.update(data,{ where: { id }, returning: true });
  }


  deleteUser(id: number) {
  return this.userModel.destroy({
    where: { id }
  });
}




  findAll() {
    return this.userModel.findAll();
  }
}
