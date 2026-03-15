import { Test, TestingModule } from '@nestjs/testing';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';

describe('ParkingController', () => {
  let parkingController: ParkingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ParkingController],
      providers: [ParkingService],
    }).compile();

    parkingController = app.get<ParkingController>(ParkingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(parkingController.getHello()).toBe('Hello World!');
    });
  });
});
