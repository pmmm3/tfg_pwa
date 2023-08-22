import {autoserializeAs} from 'dcerialize';

export class Patient {
  @autoserializeAs(() => String) email: string;
  @autoserializeAs(() => String) name?: string;
  @autoserializeAs(() => String, 'last_name') lastName?: string;
  @autoserializeAs(() => String) status?: string;
  @autoserializeAs(() => Boolean) consent?: boolean;
  @autoserializeAs(() => String) dni?: string;
  @autoserializeAs(() => Number, 'telephone_number') phone?: number;
  @autoserializeAs(() => String) gender?: string;
  @autoserializeAs(() => Date, 'birth_date') birthdate?: Date;
  @autoserializeAs(() => String, 'civil_status') civilStatus?: string;
  @autoserializeAs(() => String, 'employment_status') employmentStatus?: string;
  @autoserializeAs(() => String) region?: string;
  @autoserializeAs(() => String) zone?: string;
  @autoserializeAs(() => String, 'education_level') educationLevel?: string;
  @autoserializeAs(() => String) nationality?: string;
  @autoserializeAs(() => String, 'native_language') nativeLanguage?: string;

  constructor(email: string, name: string, lastName?: string, status?: string, consent?: boolean,
              dni?: string, phone?: number, gender?: string, birthdate?: Date, civilStatus?: string,
              employmentStatus?: string, region?: string, zone?: string, educationLevel?: string,
              nationality?: string, nativeLanguage?: string) {
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.status = status;
    this.consent = consent;
    this.dni = dni;
    this.phone = phone;
    this.gender = gender;
    this.birthdate = birthdate;
    this.civilStatus = civilStatus;
    this.employmentStatus = employmentStatus;
    this.region = region;
    this.zone = zone;
    this.educationLevel = educationLevel;
    this.nationality = nationality;
    this.nativeLanguage = nativeLanguage;
  }
}
