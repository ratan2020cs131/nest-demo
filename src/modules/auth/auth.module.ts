import { Module } from "@nestjs/common";
import { AuthConfig } from "./auth.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthConfig, AuthService],
})
export class AuthModule {}
