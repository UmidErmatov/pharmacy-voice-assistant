import { Injectable } from '@nestjs/common';

@Injectable()
export class DrugService {
  private dummyDrugs = [
    { id: '1', name: 'Paratsetamol', quantity: 20, price: 5000, symptoms: ['isitma', 'bosh og‘riq'] },
    { id: '2', name: 'Gedelix', quantity: 10, price: 22000, symptoms: ['yo‘tal'] },
  ];

  async search({ symptom, drugName }: { symptom?: string; drugName?: string }) {
    if (drugName) {
      return this.dummyDrugs.filter((d) => d.name.toLowerCase().includes(drugName.toLowerCase()));
    }
    if (symptom) {
      return this.dummyDrugs.filter((d) => d.symptoms.includes(symptom));
    }
    return [];
  }
}
