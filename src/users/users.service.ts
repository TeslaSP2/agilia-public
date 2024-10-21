import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoClient, ObjectId } from 'mongodb';
import { User } from './entities/user.entity';
import { env } from 'src/env/env';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    let conn = await MongoClient.connect(env.MONGO_STRING);
    let result = await conn
      .db(env.DATABASE_NAME)
      .collection<User>('Users').insertOne(createUserDto)

    return result.acknowledged;
  }

  async findAll() {
    let conn = await MongoClient.connect(env.MONGO_STRING);
    const users = await (await conn
      .db(env.DATABASE_NAME)
      .collection<User>('Users')
      .find(
        {},
        {},
      )).toArray();

    return users;
  }

  async findOne(id: ObjectId) {
    let conn = await MongoClient.connect(env.MONGO_STRING);
    const user = await conn
      .db(env.DATABASE_NAME)
      .collection<User>('Users')
      .findOne(
        {
          _id: id
        },
        {},
      );

    return user;
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    let conn = await MongoClient.connect(env.MONGO_STRING);
    let result = await conn
      .db(env.DATABASE_NAME)
      .collection<User>('Users')
      .updateOne({ _id: id },
        { $set: updateUserDto }
      )

    return result.acknowledged;
  }

  async remove(id: ObjectId) {
    let conn = await MongoClient.connect(env.MONGO_STRING);
    let result = await conn
      .db(env.DATABASE_NAME)
      .collection<User>('Users').deleteOne({ _id: id })

    return result.acknowledged;
  }
}
