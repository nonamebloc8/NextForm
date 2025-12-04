import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from 'src/users/dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private jwt: JwtService,) {}

  @Post('/login')
  async login(@Body() dto: loginDTO) {
    return this.authService.login(dto);
  }

  @Post("refresh-token")
async refresh(@Body("refreshToken") refreshToken: string) {
  try {
    const payload = await this.jwt.verifyAsync(refreshToken);

    const newAccess = await this.jwt.signAsync(
      { sub: payload.sub, email: payload.email },
      { expiresIn: "15m" }
    );

    const newRefresh = await this.jwt.signAsync(
      { sub: payload.sub, email: payload.email },
      { expiresIn: "7d" }
    );

    return {
      accessToken: newAccess,
      refreshToken: newRefresh,
    };

  } catch (e) {
    throw new UnauthorizedException("Token expiré ou invalide");
  }
}

}
