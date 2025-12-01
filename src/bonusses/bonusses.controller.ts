import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BonusesService } from './bonusses.service';
import { CreateBonussDto } from './dto/create-bonuss.dto';
import { UpdateBonussDto } from './dto/update-bonuss.dto';

@Controller('bonusses')
export class BonussesController {
  constructor(private readonly bonussesService: BonusesService) {}

  @Post()
  create(@Body() createBonussDto: CreateBonussDto) {
    return this.bonussesService.create(createBonussDto);
  }

  @Get()
  findAll() {
    return this.bonussesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bonussesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBonussDto: UpdateBonussDto) {
    return this.bonussesService.update(+id, updateBonussDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bonussesService.remove(+id);
  }
}
