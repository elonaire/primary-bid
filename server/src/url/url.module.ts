import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlSchema } from './url.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'URL', schema: UrlSchema}])],
  controllers: [UrlController],
  providers: [UrlService],
})

export class UrlModule {}
