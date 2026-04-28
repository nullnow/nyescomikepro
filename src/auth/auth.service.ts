import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModel,

    private jwtService: JwtService,
  ) {}

  // ------------------
  // REGISTER
  // ------------------

  async register(username: string, password: string) {
    const exists = await this.userModel.findOne({
      username,
    });

    if (exists) {
      throw new BadRequestException('Username exists');
    }

    const hashed = await bcrypt.hash(password, 12);

    return this.userModel.create({
      username,
      password: hashed,
    });
  }

  // ------------------
  // LOGIN
  // ------------------

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({
      username,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new UnauthorizedException();
    }

    return this.jwtService.sign({
      sub: user.username,
    });
  }

  // ------------------
  // RESET PASSWORD
  // ------------------

  async resetPassword(username: string, newPassword: string) {
    const hashed = await bcrypt.hash(newPassword, 12);

    return this.userModel.findOneAndUpdate(
      { username },
      {
        password: hashed,
      },
    );
  }
}
