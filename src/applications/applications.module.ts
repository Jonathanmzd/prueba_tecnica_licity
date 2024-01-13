import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ApplicationsController } from './controllers/applications.controller';
import { ApplicationsService } from './services/applications.service';
import {
  Applications,
  ApplicationsSchema,
} from './entities/applications.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Applications.name,
        schema: ApplicationsSchema,
      },
    ]),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
