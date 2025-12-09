
import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seedAdmin } from './seeders/admin.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


   await seedAdmin(); // ✅ run seed



   // ✅ Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // শুধুমাত্র DTO তে define করা properties allow করবে
    forbidNonWhitelisted: true,  // extra field থাকলে error দিবে
    transform: true, // automatic type conversion
  }));



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
