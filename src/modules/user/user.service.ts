import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { User } from "./user.interface";
import { from, Observable } from "rxjs";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  createUser(userData: User): Observable<User> {
    return from(this.userRepo.save(userData));
  }

  getAllUser(): Observable<User[]> {
    return from(this.userRepo.find());
  }

  getUserById(id: number): Observable<User> {
    return from(this.userRepo.findOneBy({ id }));
  }

  updateUser(id: number, userData: User): Observable<UpdateResult> {
    return from(this.userRepo.update(id, userData));
  }

  deleteUser(id: number): Observable<DeleteResult> {
    return from(this.userRepo.delete(id));
  }
}
