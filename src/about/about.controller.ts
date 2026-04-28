import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get('/')
  @Render('home')
  async home() {
    return {
      about: {
        description: 'Artist bio here',
      },
      socials: [
        {
          platform: 'Instagram',
          link: '#',
        },
      ],
    };
  }
}
