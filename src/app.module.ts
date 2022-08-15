import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeProjectModule } from './src/api/type-project/type-project/type-project.module';
import { TypeProjecModule } from './type-project/api/type-projec/type-projec.module';

@Module({
  imports: [TypeProjectModule, TypeProjecModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
