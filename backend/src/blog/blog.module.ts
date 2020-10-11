import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import {LoggerMiddleware} from './middleware/middleware';
// import { AuthenticationMiddleware } from '../authmiddleware/authentication.middleware';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }]),
    ],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
      consumer.apply(LoggerMiddleware).forRoutes(
        { method: RequestMethod.GET, path: '/blog/posts'},
        { method: RequestMethod.POST, path: '/blog/post' },
        { method: RequestMethod.PUT, path: '/blog/edit' },
        { method: RequestMethod.DELETE, path: '/blog/delete' }
      )
    }  
}
