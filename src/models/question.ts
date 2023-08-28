import {autoserializeAs} from "dcerialize";

export class Question {
  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => Number, 'id_module') idModule?: string;
  @autoserializeAs(() => String) content?: string;
  @autoserializeAs(() => Number, 'parent_question_id_question') parentQuestionIdQuestion?: number;
  @autoserializeAs(() => Number, 'parent_question_id_module') parentQuestionIdModule?: number;

  constructor(id: number, idModule?: string, content?: string, parentQuestionIdQuestion?: number, parentQuestionIdModule?: number) {
    this.id = id;
    this.idModule = idModule;
    this.content = content;
    this.parentQuestionIdQuestion = parentQuestionIdQuestion;
    this.parentQuestionIdModule = parentQuestionIdModule;
  }

}
