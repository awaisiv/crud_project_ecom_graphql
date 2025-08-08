import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getConfig} from './config/database.config';


@Module({
  imports: [
    TypeOrmModule.forRoot(getConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }