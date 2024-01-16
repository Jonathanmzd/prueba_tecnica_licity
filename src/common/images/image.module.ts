import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ImageController } from './controllers/image.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ImageController],
})
export class ImageModule {}
