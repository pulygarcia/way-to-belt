import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FightersService } from './fighters.service';
import { CreateFighterDto } from './dto/create-fighter.dto';
import { UpdateFighterDto } from './dto/update-fighter.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('fighters')
export class FightersController {
  constructor(private readonly fightersService: FightersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFighterDto: CreateFighterDto) {
    return this.fightersService.create(createFighterDto);
  }

  @Get()
  findAll() {
    return this.fightersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fightersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFighterDto: UpdateFighterDto) {
    return this.fightersService.update(+id, updateFighterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fightersService.remove(+id);
  }
}
