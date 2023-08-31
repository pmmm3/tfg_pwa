import {autoserializeAs} from 'dcerialize';

export class Patient {
  @autoserializeAs(() => String) email: string;
  @autoserializeAs(() => String) name?: string;
  @autoserializeAs(() => String, 'last_name') lastName?: string;
  @autoserializeAs(() => String) status?: string;
  @autoserializeAs(() => Boolean) consent?: boolean;
  @autoserializeAs(() => String) dni?: string;
  @autoserializeAs(() => Number, 'telephone_number') phone?: number;
  @autoserializeAs(() => Number) gender?: number;
  @autoserializeAs(() => Date, 'birth_date') birthdate?: Date;
  @autoserializeAs(() => String, 'civil_status') civilStatus?: string;
  @autoserializeAs(() => String, 'employment_status') employmentStatus?: string;
  @autoserializeAs(() => Number) region?: number;
  @autoserializeAs(() => Number) zone?: number;
  @autoserializeAs(() => Number, 'education_level') educationLevel?: number;
  @autoserializeAs(() => String) nationality?: string;
  @autoserializeAs(() => String, 'native_language') nativeLanguage?: string;

  @autoserializeAs(() => Boolean, 'has_ci_barona') hasCiBarona?: boolean;
  @autoserializeAs(() => Number, 'ci_barona') ciBarona?: number;


  constructor(email: string, name: string, lastName?: string, status?: string, consent?: boolean,
    dni?: string, phone?: number, gender?: number, birthdate?: Date, civilStatus?: string,
    employmentStatus?: string, region?: number, zone?: number, educationLevel?: number,
    nationality?: string, nativeLanguage?: string, hasCiBarona?: boolean, ciBarona?: number) {
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
    this.hasCiBarona = hasCiBarona;
    this.ciBarona = ciBarona;
  }
}
