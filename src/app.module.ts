import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './Api/Account/account.module';
import { CustomerModule } from './Api/Customer/customer.module';
import { EmployeeModule } from './Api/Employee/employee.module';
import { ProjectModule } from './Api/Project/project.module';
import { StatusModule } from './Api/StatusProject/status.module';
import { TeamModule } from './Api/Team/team.module';
import { TechnologyModule } from './Api/Technology/technology.module';
import { TypeProjectModule } from './Api/TypeProject/typeProject.module';
import { AuthModule } from './Auth/auth.module';
import { configuration } from './Config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: './.env'
    }),
    MongooseModule.forRoot(new ConfigService().get<string>('MONGODB_URL')),
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
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
