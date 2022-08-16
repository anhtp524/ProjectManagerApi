import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeProjectModule } from './Api/TypeProject/typeProject.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/projectmanager'),TypeProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
