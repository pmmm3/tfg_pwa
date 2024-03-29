import {autoserializeAs, autoserializeAsArray} from 'dcerialize';
import {Module} from './module';


export class Questionnaire {
  @autoserializeAs(() => Number) id?: number;
  @autoserializeAs(() => String) title?: string;
  @autoserializeAs(() => Date, 'created_at') createdAt?: Date;
  @autoserializeAs(() => String) description?: string;
  @autoserializeAs(() => String, 'created_by') createdBy?: string;

  constructor(title?: string, createdAt?: Date, description?: string, createdBy?: string) {
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}

export class QuestionnaireWithModule extends Questionnaire{
  @autoserializeAsArray(() => Module) modules?: Module[];
  constructor(title: string, createdAt?: Date, description?: string, createdBy?: string, modules?: Module[]) {
    super(title, createdAt, description, createdBy);
    this.modules = modules;
  }
}
