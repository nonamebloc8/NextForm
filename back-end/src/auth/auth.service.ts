import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "node_modules/bcryptjs";
import { PrismaService } from "src/prisma.service";
import { loginDTO } from "src/users/dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(data: loginDTO) {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException("Identifiant invalide");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Identifiant invalide !");
    }

    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: "15m",
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: "7d",
    });

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }
}
