import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AddUserArgs } from "./user.args";
import { User } from "./user.schema";
import { UserService } from "./user.service";

@UseGuards(AuthenticationGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: "users" })
  getAllUsers() {
    return this.userService.getAllUser();
  }

  @Query(() => User, { name: "userById", nullable: true })
  getUserById(@Args({ name: "id", type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User, { name: "createUser" })
  createUser(@Args("userArgs") userArgs: AddUserArgs) {
    return this.userService.createUser(userArgs);
  }

  @Mutation(() => String, { name: "deleteUser" })
  deleteUser(@Args({ name: "id", type: () => Int }) id: number) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => String, { name: "updateUser" })
  updateUser(
    @Args({ name: "id", type: () => Int }) id: number,
    @Args("userArgs") userArgs: AddUserArgs,
  ) {
    return this.userService.updateUser(id, userArgs);
  }
}
