import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role, Roles } from 'src/roles/roles.decorator';
import { ObjectId } from 'mongodb';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AuthGuard)
  @Post()
  @Roles(Role.Admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @Roles(Role.Admin)
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    let user = await this.usersService.findOne(new ObjectId(id));
    if (user.username != req.user.username && req.user.roles as Role != Role.Admin) {
      throw new UnauthorizedException();
    }
    else {
      return user;
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let user = await this.usersService.findOne(new ObjectId(id));
    if (user.username != req.user.username && req.user.roles as Role != Role.Admin) {
      throw new UnauthorizedException();
    }
    else {
      if (updateUserDto.roles) {
        if (!Object.values(Role).includes(updateUserDto.roles[0])) {
          throw new BadRequestException(`ROLE ${updateUserDto.roles[0]} DOES NOT EXIST`);
        }
      }
      return await this.usersService.update(new ObjectId(id), updateUserDto);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(new ObjectId(id));
  }
}
