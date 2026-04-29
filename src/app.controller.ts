import { Controller, Get, Render } from '@nestjs/common';
import { AboutService } from './about/about.service';
import { SocialsService } from './socials/socials.service';
import { CatalogueService } from './catalogue/catalogue.service';

@Controller()
export class AppController {
  constructor(
    private readonly aboutService: AboutService,
    private readonly socialsService: SocialsService,
    private readonly catalogueService: CatalogueService,
  ) {}

  @Get()
  @Render('home')
  async getHome() {
    // Fetch all data in parallel for better performance
    const [about, socials, catalogueItems] = await Promise.all([
      this.aboutService.getAbout(),
      this.socialsService.getSocials(),
      this.catalogueService.findAll(),
    ]);

    return {
      title: 'NyescoMikePro | Home',
      about,
      socials,
      catalogueItems, // Named to match the variable used in your template
    };
  }
}
