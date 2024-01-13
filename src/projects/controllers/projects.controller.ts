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

import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/project.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({
    summary: 'Listado Proyectos',
  })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProjectDto) {
    return this.projectsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProjectDto) {
    return this.projectsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
