import { Controller, Get, Param, Res, UseGuards, ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { FightersService } from '../fighters/fighters.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly fightersService: FightersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('fighter/:id')
  async getFighterPdf(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const fighter = await this.fightersService.findOne(id);
    const pdfBuffer = await this.reportsService.generateFighterPdf(fighter);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${fighter.nickname}.pdf`,
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }
}

