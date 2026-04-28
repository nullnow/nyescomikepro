import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  getHome() {
    return {
      title: 'Nyesco | Home',
      message: 'Welcome to the official portal.',
    };
  }
}
