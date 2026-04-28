import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SocialSchema } from './social.schema';
import { SocialsService } from './socials.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Social',
        schema: SocialSchema,
      },
    ]),
  ],

  providers: [SocialsService],

  exports: [SocialsService],
})
export class SocialsModule {}
