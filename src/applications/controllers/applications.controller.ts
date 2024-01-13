import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApplicationsService } from '../services/applications.service';
import {
  ApplicationsDto,
  UpdateApplicationsDto,
} from '../dtos/applications.dto';

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private Service: ApplicationsService) {}

  @Get()
  @ApiOperation({
    summary: 'Listado Aplicaciones',
  })
  findAll() {
    return this.Service.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.Service.findOne(id);
  }

  @Post()
  create(@Body() payload: ApplicationsDto) {
    return this.Service.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateApplicationsDto) {
    return this.Service.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.Service.remove(id);
  }
}
