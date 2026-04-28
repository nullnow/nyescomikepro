import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import express from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Render('admin/catalogue/index')
  async getCatalogue() {
    const items = await this.catalogueService.findAll();
    return {
      catalogueItems: items,
      title: 'Nyesco | Archive',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('new')
  @Render('admin/catalogue/new')
  async renderCreatePage() {
    return { title: 'Nyesco | New Release' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createItem(
    @Body() body: { title: string; type: string; link: string },
    @Res() res: express.Response,
  ) {
    await this.catalogueService.create(body);

    return res.redirect('/catalogue');
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async deleteItem(@Param('id') id: string, @Res() res: express.Response) {
    await this.catalogueService.delete(id);
    return res.redirect('/catalogue');
  }
  @UseGuards(JwtAuthGuard)
  @Get('edit/:id')
  @Render('admin/catalogue/edit')
  async editPage(@Param('id') id: string) {
    const item = await this.catalogueService.findOne(id);
    return { item };
  }

  @UseGuards(JwtAuthGuard)
  @Post('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateData: { title: string; type: string; link: string },
    @Res() res: express.Response,
  ) {
    // If you implemented a delete button in the same form:
    if (updateData['_method'] === 'DELETE') {
      await this.catalogueService.delete(id);
      return res.redirect('/catalogue');
    }

    await this.catalogueService.update(id, updateData);
    return res.redirect('/catalogue');
  }
}
