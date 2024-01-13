import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Applications } from '../entities/applications.entity';
import {
  ApplicationsDto,
  UpdateApplicationsDto,
} from '../dtos/applications.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Applications.name) private AModel: Model<Applications>,
  ) {}

  findAll() {
    return this.AModel.find().exec();
  }

  async findOne(id: string) {
    return this.AModel.findById(id);
  }

  create(data: ApplicationsDto) {
    const newModel = new this.AModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateApplicationsDto) {
    return this.AModel.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true },
    ).exec();
  }

  remove(id: string) {
    return this.AModel.findByIdAndDelete(id);
  }
}
