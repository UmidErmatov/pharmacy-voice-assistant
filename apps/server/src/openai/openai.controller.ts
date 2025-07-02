import { Controller, Post, Body } from '@nestjs/common';
import { OpenAiService } from './openai.service';

@Controller('ai')
export class OpenAiController {
  constructor(private readonly service: OpenAiService) {}

  @Post('analyze')
  analyze(@Body('text') text: string) {
    return this.service.extractIntent(text);
  }
}
