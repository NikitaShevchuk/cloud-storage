import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';

import { AuthDto, SignInDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthResponse } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  public async signup(authDto: AuthDto): Promise<AuthResponse> {
    const hash = await argon.hash(authDto.password);

    const user = await this.prisma.user.create({
      data: { email: authDto.email, hash },
    });

    delete user.hash;

    return this.signToken(user.id, user.email);
  }

  public async signin(signInDto: SignInDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials are incorrect');
    }

    const passwordMatches = await argon.verify(user.hash, signInDto.password);

    if (!passwordMatches) {
      throw new ForbiddenException('Credentials are incorrect');
    }

    delete user.hash;

    return this.signToken(user.id, user.email);
  }

  private signToken(userId: number, email: string): AuthResponse {
    const payload = {
      sub: userId,
      email,
    };

    const access_token = this.jwtService.sign(payload, {
      expiresIn: '2d',
      secret: this.config.get('JWT_SECRET'),
    });

    return { access_token };
  }
}
