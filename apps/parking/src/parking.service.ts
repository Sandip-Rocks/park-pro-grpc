import { Injectable } from '@nestjs/common';

@Injectable()
export class ParkingService {
  getHello(): string {
    return 'Hello World!';
  }
}
