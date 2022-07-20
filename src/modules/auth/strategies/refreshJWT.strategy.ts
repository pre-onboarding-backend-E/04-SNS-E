import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CONSTANT_REFRESH_JWT, CONSTANT_REFRESH } from 'src/constants';
import AuthService from '../auth.service';
import Payload from '../entities/payload.entity';

@Injectable()
export default class RefreshJWTStrategy extends PassportStrategy(Strategy, CONSTANT_REFRESH_JWT) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(CONSTANT_REFRESH),
      // true로 설정하면 Passport에 토큰 검증을 위임하지 않고 직접 검증, false는 Passport에 검증 위임
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, { email }: Payload) {
    try {
      const user = await this.authService.validateEmail(email);
      await this.authService.validateRefreshToken(req.headers.Refresh, user.hashedRefreshToken);

      const accessToken = this.authService.createAccessToken(email);
      const refreshToken = this.authService.createRefreshToken(email);

      return {
        user: user.protectedData,
        tokens: {
          accessToken,
          refreshToken,
        },
      };
    } catch (err) {
      throw err;
    }
  }
}
