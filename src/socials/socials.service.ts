import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SocialsService {
  constructor(
    @InjectModel('Social')
    private socialModel,
  ) {}

  async getSocials() {
    return this.socialModel.find();
  }
}
