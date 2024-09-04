import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService, HelloResponse } from "./app.service";

describe("AppController", () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockReturnValue({} as HelloResponse),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it("should be defined", () => {
    expect(appController).toBeDefined();
  });

  describe("getHello", () => {
    it("should return the hello message result", () => {
      const helloResult: HelloResponse = { message: "Hello, world!" };
      jest.spyOn(appService, "getHello").mockReturnValue(helloResult);

      appController.getHello();
    });
  });
});
