import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as path from 'path';
import { Response } from 'express';

@Controller('images')
export class ImageController {
  @Get(':filename')
  serveImage(@Param('filename') filename: string, @Res() res: Response): void {
    const imagePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      'uploads',
      filename,
    );
    res.sendFile(imagePath);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    return { filename: file.filename };
  }
}
