import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { AuthCredentialsDto } from './dto/authenticate';
import { User } from './interfaces/user.interface';
import * as jwt from 'passport-jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {

    const { email, password } = authCredentialsDto;
    

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({ email, password: hashedPassword });

    // const getToken = jwt.sign({ userID: user._id , 'secret',  expiresIn: '1h',}); generating error, unable to take token. 

    

    try {
      await user.save();
      // return getToken;
    } catch (error) {
        
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      // throw error;
    }
  }

  async signIn(user: User) {
    const payload = await {email: user.email, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        return null;
      }

      const valid = await bcrypt.compare(pass, user.password);
      if (valid) {
        return user;
      }
      return null;
    } catch (e) {
      console.log('sadasdasd', e);
    }
  }
}
