import {autoserializeAs} from 'dcerialize';

export enum QuestionnaireState {
  default = 'default',
  finished = 'finished',
  draft = 'draft'
}

export class Questionnaire {
  @autoserializeAs(() => String) title: string;
  @autoserializeAs(() => String) description: string;
  @autoserializeAs(() => String) status: QuestionnaireState;
  @autoserializeAs(() => Date, 'created_at') createdAt: Date;

  constructor(title: string, description: string, status: QuestionnaireState, createdAt: Date) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
  }
}
