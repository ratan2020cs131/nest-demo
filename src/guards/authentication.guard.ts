import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly logger = new Logger(AuthenticationGuard.name);
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authToken: string = request.headers.authorization?.split(" ")[1];
      const decoedToken = this.jwtService.verify(authToken);
      this.logger.log(
        `Authenticating {user: ${JSON.stringify(decoedToken.name)}}`,
      );
    } catch (error) {
      this.logger.error(`Message: ${error.message}`);
      throw new UnauthorizedException();
    }
    return true;
  }
}
