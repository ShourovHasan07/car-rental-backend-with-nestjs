import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seedAdmin } from './seeders/admin.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   await seedAdmin(); // ✅ run seed


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
