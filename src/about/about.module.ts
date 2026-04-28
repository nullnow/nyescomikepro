import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AboutSchema } from './about.schema';
import { SocialSchema } from '../socials/social.schema';

import { AboutController } from './about.controller';

import { AboutService } from './about.service';
import { SocialsService } from '../socials/socials.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'About', schema: AboutSchema },
      { name: 'Social', schema: SocialSchema },
    ]),
  ],

  controllers: [AboutController],

  providers: [AboutService, SocialsService],
})
export class AboutModule {}
