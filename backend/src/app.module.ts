import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      AuthModule,
      BlogModule,
      MongooseModule.forRoot('mongodb+srv://alizah:cluster123@cluster0.jt5xe.mongodb.net/ablog?retryWrites=true&w=majority')],
  controllers: [
        AuthController, 
        AppController,
      ],
  providers: [AppService],
})
export class AppModule {}
  





