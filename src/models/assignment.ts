import {autoserializeAs} from "dcerialize";
import {Questionnaire} from "./questionnaire";

export class Assignment {
  @autoserializeAs(() => Number) id?: number;
  @autoserializeAs(() => String, 'id_doctor') idDoctor?: string;
  @autoserializeAs(() => String, 'id_patient') idPatient?: string;
  @autoserializeAs(() => Number, 'id_questionnaire') idQuestionnaire?: number;
  @autoserializeAs(() => Date) date?: Date;
  @autoserializeAs(() => String) status?: string;

  questionnaire : Questionnaire | undefined;

  constructor(id: number, idDoctor: string, idPatient: string, idQuestionnaire: number, date: Date, status: string) {
    this.id = id;
    this.idDoctor = idDoctor;
    this.idPatient = idPatient;
    this.idQuestionnaire = idQuestionnaire;
    this.date = date;
    this.status = status || 'default';
  }


}
