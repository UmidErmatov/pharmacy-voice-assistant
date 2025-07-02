import { Controller, Post, Body } from '@nestjs/common';
import { DrugService } from './drug.service';

@Controller('drug')
export class DrugController {
  constructor(private readonly service: DrugService) {}

  @Post('search')
  search(@Body() body: any) {
    return this.service.search(body);
  }
}
