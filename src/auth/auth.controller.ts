import { Controller, Get, Post, Body, Render, Res, Req } from '@nestjs/common';
import express from 'express';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // -------------------
  // LOGIN FORM PAGE
  // -------------------

  @Get('/login')
  @Render('auth/login')
  loginPage() {
    return {
      title: 'Login',
    };
  }

  // -------------------
  // LOGIN FORM SUBMIT
  // -------------------

  @Post('/login')
  async login(
    @Body('username')
    username: string,

    @Body('password')
    password: string,

    @Res()
    res: express.Response,
  ) {
    const token = await this.authService.login(username, password);

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return res.redirect('/dashboard');
  }

  // -------------------
  // REGISTER API
  // POST /api/register
  // -------------------

  @Post('/api/register')
  async register(
    @Body()
    body,
  ) {
    await this.authService.register(body.username, body.password);

    return {
      message: 'User created',
    };
  }

  // -------------------
  // RESET PASSWORD API
  // POST /api/reset-password
  // -------------------

  @Post('/api/reset-password')
  async resetPassword(
    @Body()
    body,
  ) {
    await this.authService.resetPassword(body.username, body.newPassword);

    return {
      message: 'Password updated',
    };
  }

  // -------------------
  // LOGOUT
  // -------------------

  @Get('/logout')
  logout(
    @Res()
    res: express.Response,
  ) {
    res.clearCookie('jwt');

    return res.redirect('/login');
  }
}
