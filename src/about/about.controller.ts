import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import express from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AboutService } from './about.service';
import { SocialsService } from '../socials/socials.service';

@Controller('about')
export class AboutController {
  constructor(
    private aboutService: AboutService,
    private socialsService: SocialsService,
  ) {}

  // VIEW ABOUT

  @UseGuards(JwtAuthGuard)
  @Get()
  @Render('about/view')
  async viewAbout() {
    return {
      about: await this.aboutService.getAbout(),

      socials: await this.socialsService.getSocials(),
    };
  }

  // SINGLE EDIT PAGE

  @UseGuards(JwtAuthGuard)
  @Get('edit')
  @Render('about/edit')
  async editAbout() {
    return {
      about: await this.aboutService.getAbout(),

      socials: await this.socialsService.getSocials(),
    };
  }

  // SAVE ABOUT FORM

  @UseGuards(JwtAuthGuard)
  @Post('edit')
  async updateAbout(
    @Body('description')
    description: string,

    @Res()
    res: express.Response,
  ) {
    await this.aboutService.updateAbout(description || '');

    return res.redirect('/about/edit');
  }

  // SAVE SOCIALS FORM

  @UseGuards(JwtAuthGuard)
  @Post('socials')
  async updateSocials(@Body() body, @Res() res: express.Response) {
    const { platform, link } = body;
    const socialsArray: any = [];

    if (Array.isArray(platform)) {
      for (let i = 0; i < platform.length; i++) {
        if (platform[i] && link[i]) {
          socialsArray.push({
            platform: platform[i],
            link: link[i],
          });
        }
      }
    } else if (platform && link) {
      socialsArray.push({ platform, link });
    }

    await this.socialsService.replaceAll(socialsArray);
    return res.redirect('/about/edit');
  }
}
