import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/decorators/http-exception.filter';
import { JwtAuthGuard } from './common/guards/authguard/authguard.guard';
import { RoleGuard } from './common/guards/roleguard/roleguard.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalGuards(
    app.get(JwtAuthGuard),
    app.get(RoleGuard)

  )
  // Enable cookie parsing
  app.use(cookieParser());

  // Allow cookies in CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
