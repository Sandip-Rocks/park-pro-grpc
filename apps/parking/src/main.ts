import { NestFactory } from '@nestjs/core';
import { ParkingModule } from './parking.module';

async function bootstrap() {
  const app = await NestFactory.create(ParkingModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
