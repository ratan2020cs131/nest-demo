import { Injectable } from "@nestjs/common";

interface HelloResponse {
  message: string;
}

@Injectable()
export class AppService {
  getHello(): HelloResponse {
    return {
      message:
        "Hello! This project is build with Serverless, Nest.js, GraphQL, PostgreSQL",
    };
  }
}
