import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AboutService } from './about.service';
import { SocialsService } from '../socials/socials.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('about')
export class AboutController {
  constructor(
    private aboutService: AboutService,
    private socialsService: SocialsService,
  ) {}

  // ----------------
  // VIEW ABOUT
  // ----------------

  @UseGuards(JwtAuthGuard)
  @Get()
  @Render('about/view')
  async viewAbout() {
    const about = await this.aboutService.getAbout();

    const socials = await this.socialsService.getSocials();

    return {
      title: 'About',
      about,
      socials,
    };
  }

  // ----------------
  // EDIT FORM
  // ----------------

  @UseGuards(JwtAuthGuard)
  @Get('edit')
  @Render('about/edit')
  async editAbout() {
    const about = await this.aboutService.getAbout();

    const socials = await this.socialsService.getSocials();

    return {
      title: 'Edit About',
      about,
      socials,
    };
  }

  // ----------------
  // UPDATE ABOUT
  // ----------------

  @UseGuards(JwtAuthGuard)
  @Post('edit')
  async updateAbout(
    @Body('description')
    description: string,

    @Res()
    res: Response,
  ) {
    await this.aboutService.updateAbout(description);

    return res.redirect('/about');
  }
}
