import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './Api/Account/account.module';
import { CustomerModule } from './Api/Customer/customer.module';
import { EmployeeModule } from './Api/Employee/employee.module';
import { ProjectModule } from './Api/Project/project.module';
import { StatusModule } from './Api/StatusProject/status.module';
import { TeamModule } from './Api/Team/team.module';
import { TechnologyModule } from './Api/Technology/technology.module';
import { TypeProjectModule } from './Api/TypeProject/typeProject.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { configuration } from './Config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/projectmanager'),
    TypeProjectModule, 
    StatusModule, 
    TechnologyModule,
    EmployeeModule,
    CustomerModule,
    ProjectModule,
    AccountModule,
    TeamModule,
    AuthModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
