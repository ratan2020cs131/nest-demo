import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Roles, RolesEnum } from "src/decorators/roles.decorators";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { DeleteResult, UpdateResult } from "typeorm";
import { User } from "./user.interface";
import { UserService } from "./user.service";

@UseGuards(AuthenticationGuard)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): Observable<User[]> {
    return this.userService.getAllUser();
  }

  @Roles(RolesEnum.User)
  @UseGuards(AuthorizationGuard)
  @Get(":id")
  getUserById(@Param("id") id: number): Observable<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() body: User): Observable<User> {
    return this.userService.createUser(body);
  }

  @Put(":id")
  updateUser(
    @Param("id") id: number,
    @Body() body: User,
  ): Observable<UpdateResult> {
    return this.userService.updateUser(id, body);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: number): Observable<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
