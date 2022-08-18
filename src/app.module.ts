import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './Api/Customer/customer.module';
import { EmployeeModule } from './Api/Employee/employee.module';
import { StatusModule } from './Api/StatusProject/status.module';
import { TechnologyModule } from './Api/Technology/technology.module';
import { TypeProjectModule } from './Api/TypeProject/typeProject.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/projectmanager'),
    TypeProjectModule, 
    StatusModule, 
    TechnologyModule,
    EmployeeModule,
    CustomerModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
