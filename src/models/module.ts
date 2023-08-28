import {autoserializeAs, autoserializeAsArray} from "dcerialize";
import {Question} from "./question";

export class Module {
  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => String) title?: string;
  @autoserializeAs(() => String) description?: string;
  @autoserializeAsArray(() => Question) questions?: Question[];

  constructor(id: number, title?: string, description?: string, questions?: Question[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.questions = questions;
  }

}
