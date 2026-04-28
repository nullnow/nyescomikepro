import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import sanitizeHtml from 'sanitize-html';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel('About')
    private aboutModel: Model<any>,
  ) {}

  async getAbout() {
    let about = await this.aboutModel.findOne();

    if (!about) {
      about = await this.aboutModel.create({
        description: '',
      });
    }

    return about;
  }

  async updateAbout(description: string) {
    const cleanHtml = sanitizeHtml(description);

    return this.aboutModel.findOneAndUpdate(
      {},
      {
        description: cleanHtml,
      },
      {
        upsert: true,
        new: true,
      },
    );
  }
}
