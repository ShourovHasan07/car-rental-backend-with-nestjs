
import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seedAdmin } from './seeders/admin.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


   await seedAdmin(); //  run seed



   //  Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  //  DTO তে define  properties allow 
    forbidNonWhitelisted: true,  // extra field  error 
    transform: true, // automatic type conversion
  }));



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
