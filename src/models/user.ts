import { autoserializeAs } from 'dcerialize';

export class ActivateUser {
  @autoserializeAs(() => String) token: string;
  @autoserializeAs(() => String) password: string;
  @autoserializeAs(() => String) name?: string;
  @autoserializeAs(() => String, 'last_name') lastName?: string;
  @autoserializeAs(() => String) email?: string;

  constructor(
    token: string,
    password: string,
    name?: string,
    lastName?: string,
    email?: string
  ) {
    this.token = token;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
  }
}

export class User {}
