import { Controller, Post,Put, Body, Get, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() body) {
    return this.usersService.createUser(body);
  }

  @Put(':id')
  update(@Param('id') id:string,   @Body() body) {
    return this.usersService.updateUser(+id ,body);
  }

 @Delete(':id')
delete(@Param('id') id: number) {
  return this.usersService.deleteUser(id);
}



  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
