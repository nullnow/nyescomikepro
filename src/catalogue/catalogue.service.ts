import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CatalogueService {
  constructor(
    @InjectModel('Catalogue')
    private catalogueModel: Model<any>,
  ) {}

  async findAll() {
    return this.catalogueModel.find().sort({ _id: -1 }).exec();
  }

  async create(data: any) {
    const newItem = new this.catalogueModel(data);
    return newItem.save();
  }

  async findOne(id: string) {
    return this.catalogueModel.findById(id).exec();
  }

  async update(id: string, data: any) {
    return this.catalogueModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async delete(id) {
    return this.catalogueModel.findByIdAndDelete(id).exec();
  }
}
