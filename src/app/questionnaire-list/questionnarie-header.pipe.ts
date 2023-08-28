import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionnaireHeader',
})
export class QuestionnaireHeaderPipe implements PipeTransform {
  private translations: Record<string, string> = {
    title: 'Título',
    description: 'Descripción',
    createdBy: 'Creado por',
    createdAt: 'Fecha de creación'
  };

  transform(value: string): string {
    return this.translations[value] || value; // Return the original value if translation is not found
  }
}
