import {autoserializeAs, autoserializeAsArray} from "dcerialize";

export class Question {
  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => Number, 'id_module') idModule: number;
  @autoserializeAs(() => String) content?: string;
  @autoserializeAs(() => Number, 'parent_question_id_question') parentQuestionIdQuestion?: number;
  @autoserializeAs(() => Number, 'parent_question_id_module') parentQuestionIdModule?: number;

  constructor(id: number, idModule: number, content?: string, parentQuestionIdQuestion?: number, parentQuestionIdModule?: number) {
    this.id = id;
    this.idModule = idModule;
    this.content = content;
    this.parentQuestionIdQuestion = parentQuestionIdQuestion;
    this.parentQuestionIdModule = parentQuestionIdModule;
  }

}


export enum QuestionType {
  YesNo = 'YesNo',
  Text = 'text',
  Multiple = 'multiple',
}

export class QuestionOption {
  @autoserializeAs(() => String, 'type_opt') type: QuestionType;
  @autoserializeAsArray(() => String) options: string[];

  constructor(type: QuestionType, options: string[]) {
    this.type = type;
    this.options = options;
  }
}
