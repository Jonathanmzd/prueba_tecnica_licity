import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Project } from '../entities/Project.entity';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  findAll() {
    return this.projectModel.find().exec();
  }

  async findOne(id: string) {
    return this.projectModel.findById(id);
  }

  create(data: CreateProjectDto) {
    const newModel = new this.projectModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateProjectDto) {
    return this.projectModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.projectModel.findByIdAndDelete(id);
  }
}
