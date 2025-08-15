import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/decorators/http-exception.filter';
import { JwtAuthGuard } from './common/guards/authguard/authguard.guard';
import { RoleGuard } from './common/guards/roleguard/roleguard.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalGuards(
  //   app.get(JwtAuthGuard),
  //   app.get(RoleGuard)
  // )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
