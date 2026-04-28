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
    const cleanHtml = sanitizeHtml(description, {
    allowedTags: [
      'p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a',
      'h1', 'h2', 'h3', 'blockquote', 'table', 'thead',
      'tbody', 'tr', 'th', 'td', 'div', 'span'
    ],
    allowedAttributes: {
      'a': ['href', 'target', 'rel'],
      '*': ['style', 'class']
    },
  });

  return this.aboutModel.findOneAndUpdate(
    {}, // Find the first document
    { description: cleanHtml },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    },
  ).exec();
}
