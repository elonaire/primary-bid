import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    UrlModule,
    MongooseModule.forRoot(
      'mongodb+srv://elonaire:8uLz4qLRlGWQBMbR@cluster0-fcl9s.mongodb.net/primary-bid?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
