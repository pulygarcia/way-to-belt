import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FightsService } from './fights.service';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDetailsDto } from './dto/update-fight-details.dto';
import { UpdateFightResultDto } from './dto/update-fight-result.dto';

@Controller('fights')
export class FightsController {
  constructor(private readonly fightsService: FightsService) {}

  @Post()
  create(@Body() createFightDto: CreateFightDto) {
    return this.fightsService.create(createFightDto);
  }

  @Get()
  findAll() {
    return this.fightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fightsService.findOne(+id);
  }

  @Patch(':id')
  updateDetails(@Param('id') id: string, @Body() updateFightDetailsDto: UpdateFightDetailsDto) {
    return this.fightsService.updateDetails(+id, updateFightDetailsDto);
  }

  @Patch(':id/result')
  updateResult(@Param('id') id: string, @Body() updateFightResultDto: UpdateFightResultDto) {
    return this.fightsService.updateResult(+id, updateFightResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fightsService.remove(+id);
  }
}
