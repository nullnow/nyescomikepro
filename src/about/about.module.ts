import { Module } from '@nestjs/common';
import { HomeController } from './about.controller';

@Module({
  controllers: [HomeController],
})
export class AboutModule {}
