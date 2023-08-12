import {autoserializeAs, autoserializeAsArray} from 'dcerialize';

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

export enum UserStatus {
    disabled = 'disabled',
    pending = 'pending',
    active = 'active',
}

export class User {
    @autoserializeAs(() => String) email: string;
    @autoserializeAs(() => String) name?: string;
    @autoserializeAs(() => String, 'last_name') lastName?: string;
    @autoserializeAs(() => String) status?: UserStatus;
    @autoserializeAs(() => String ) rol?: string;

    constructor(email: string, name?: string, lastName?: string, status?: UserStatus, rol?: string) {
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.status = status;
        this.rol = rol;
    }
}

export class UserList {
    @autoserializeAsArray(() => User) users: User[];
    @autoserializeAs(() => Number) total: number;

    constructor(users: User[], total: number) {
        this.users = users;
        this.total = total;
    }
}
