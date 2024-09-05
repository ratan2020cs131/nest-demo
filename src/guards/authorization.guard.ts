import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES } from "src/decorators/roles.decorators";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizationGuard.name);
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride(ROLES, [
      context.getClass(),
      context.getHandler(),
    ]);

    try {
      const authToken: string = request.headers.authorization?.split(" ")[1];
      const decoedToken = this.jwtService.verify(authToken, {
        algorithms: ["RS256"],
      });

      if (requiredRoles.includes(decoedToken.role)) {
        this.logger.log(
          `Authorizing {user: ${JSON.stringify(decoedToken.name)}}`,
        );
        return true;
      } else {
        this.logger.error(`Authorization denied!`);
        return false;
      }
    } catch (error) {
      this.logger.error(`Message: ${error.message}`);
      throw new UnauthorizedException();
    }
  }
}
