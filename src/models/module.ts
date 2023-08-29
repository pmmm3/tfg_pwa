import {autoserializeAs} from "dcerialize";

export class Module {
  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => String) title?: string;
  @autoserializeAs(() => String) description?: string;

  constructor(id: number, title?: string, description?: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

}
