import { configure as serverlessExpress } from "@codegenie/serverless-express";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Context, APIGatewayEvent } from "aws-lambda";

let cachedServer;

export const handler = async (event: APIGatewayEvent, context: Context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    nestApp.setGlobalPrefix("api");
    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
