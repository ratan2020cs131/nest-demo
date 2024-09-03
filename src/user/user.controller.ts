import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.interface";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): Observable<User[]> {
    return this.userService.getAllUser();
  }

  @Get(":id")
  getUserById(@Param("id") id): Observable<User> {
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
