import { Test, TestingModule } from "@nestjs/testing";
import { of } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";
import { UserController } from "./user.controller";
import { User } from "./user.interface";
import { UserService } from "./user.service";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAllUser: jest.fn().mockReturnValue(of([])),
            getUserById: jest.fn().mockReturnValue(of({} as User)),
            createUser: jest.fn().mockReturnValue(of({} as User)),
            updateUser: jest.fn().mockReturnValue(of({} as UpdateResult)),
            deleteUser: jest.fn().mockReturnValue(of({} as DeleteResult)),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(userController).toBeDefined();
  });

  describe("getUser", () => {
    it("should return an observable of an array of users", () => {
      const result = of([{ id: 1, name: "Test User" }] as User[]);
      jest.spyOn(userService, "getAllUser").mockReturnValue(result);

      userController.getUser().subscribe((users) => {
        expect(users).toEqual([{ id: 1, name: "Test User" }]);
      });
    });
  });

  describe("getUserById", () => {
    it("should return an observable of a single user", () => {
      const result = of({ id: 1, name: "Test User" } as User);
      jest.spyOn(userService, "getUserById").mockReturnValue(result);

      userController.getUserById(1).subscribe((user) => {
        expect(user).toEqual({ id: 1, name: "Test User" });
      });
    });
  });

  describe("createUser", () => {
    it("should create and return the created user", () => {
      const userDto = { id: 1, name: "New User" } as User;
      const result = of(userDto);
      jest.spyOn(userService, "createUser").mockReturnValue(result);

      userController.createUser(userDto).subscribe((user) => {
        expect(user).toEqual(userDto);
      });
    });
  });

  describe("updateUser", () => {
    it("should update and return the update result", () => {
      const updateResult = {} as UpdateResult;
      jest.spyOn(userService, "updateUser").mockReturnValue(of(updateResult));

      userController
        .updateUser(1, { name: "Updated User" } as User)
        .subscribe((result) => {
          expect(result).toEqual(updateResult);
        });
    });
  });

  describe("deleteUser", () => {
    it("should delete and return the delete result", () => {
      const deleteResult = {} as DeleteResult;
      jest.spyOn(userService, "deleteUser").mockReturnValue(of(deleteResult));

      userController.deleteUser(1).subscribe((result) => {
        expect(result).toEqual(deleteResult);
      });
    });
  });
});
