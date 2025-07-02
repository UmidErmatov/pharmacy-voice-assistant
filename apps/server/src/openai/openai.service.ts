import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAiService {
  private openai = new OpenAIApi(
    new Configuration({ apiKey: process.env.OPENAI_API_KEY })
  );

  async extractIntent(text: string) {
    const res = await this.openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Siz dorixona assistantisiz.' },
        { role: 'user', content: text }
      ],
      functions: [
        {
          name: 'find_medicine',
          parameters: {
            type: 'object',
            properties: {
              symptom: { type: 'string' },
              drugName: { type: 'string' }
            }
          }
        }
      ],
      function_call: 'auto'
    });

    const call = res.data.choices[0].message.function_call;
    const args = JSON.parse(call?.arguments || '{}');
    return args;
  }
}
