  import {Body,Controller,Get,Post,Request,UseGuards,ValidationPipe} from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { AuthCredentialsDto } from './dto/authenticate';
  import { JwtAuthGuard } from './guards/jwt-auth.guards';
  import { LocalAuthGuard } from './guards/local-auth.guards';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('/signup')
    async signUp(
      @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
      return await this.authService.signUp(authCredentialsDto);
    }
  
    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async signIn(@Request() req) {
      return this.authService.signIn(req.user);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req) {
      return req.user;
    }
  }