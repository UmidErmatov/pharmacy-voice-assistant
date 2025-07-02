import { Module } from '@nestjs/common';
import { OpenAiModule } from './openai/openai.module';
import { DrugModule } from './drug/drug.module';

@Module({
  imports: [OpenAiModule, DrugModule],
})
export class AppModule {}
