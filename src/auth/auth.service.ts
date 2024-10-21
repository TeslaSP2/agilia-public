import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'src/env/env';
import { MongoClient } from 'mongodb';
import { User } from 'src/users/entities/user.entity';
import { createHmac } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    let conn = await MongoClient.connect(env.MONGO_STRING);
    const user = await conn
      .db(env.DATABASE_NAME)
      .collection<User>('Users')
      .findOne(
        {
          username,
          password: createHmac('sha256', env.JWT_SECRET)
            .update(pass)
            .digest('hex'),
        },
        { projection: { passWord: 0 } },
      );

    if (user == null || user == undefined) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id.toString(), username: user.username, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
