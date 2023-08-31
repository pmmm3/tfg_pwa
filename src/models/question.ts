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
  @autoserializeAsArray(() => Option) options: Option[];

  constructor(type: QuestionType, options: Option[]) {
    this.type = type;
    this.options = options;
  }
}

export class Option {
  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => String) content: string;
  @autoserializeAs(() => Number, 'id_question_question_id') idQuestion: number;
  @autoserializeAs(() => Number, 'id_question_module_id') idModule: number;
  @autoserializeAs(() => Number,) score: number;

  constructor(id: number, content: string, idQuestion: number, idModule: number, score: number) {
    this.id = id;
    this.content = content;
    this.idQuestion = idQuestion;
    this.idModule = idModule;
    this.score = score;
  }
}
