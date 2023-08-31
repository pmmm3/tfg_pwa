import {autoserializeAs} from "dcerialize";

export class Answer {
    @autoserializeAs(() => Number, 'id_assignment') idAssignment: number;
    @autoserializeAs(() => Number, 'id_question_question_id') idQuestion: number;
    @autoserializeAs(() => Number, 'id_question_module_id') idModule: number;
    @autoserializeAs(() => Number, 'id_option') idOption?: number;
    @autoserializeAs(() => String, 'open_answer') openAnswer?: string;
    @autoserializeAs(() => Date) date?: Date;

    constructor(idAssignment: number, idQuestion: number, idModule: number, idOption?: number, answer?: string, date?: Date) {
        this.idAssignment = idAssignment;
        this.idQuestion = idQuestion;
        this.idModule = idModule;
        this.idOption = idOption;
        this.openAnswer = answer;
        this.date = date;

    }


}
