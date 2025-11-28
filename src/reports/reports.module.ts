import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { FightersModule } from 'src/fighters/fighters.module';

@Module({
  imports:[FightersModule],
  providers: [ReportsService],
  controllers: [ReportsController]
})
export class ReportsModule {}
