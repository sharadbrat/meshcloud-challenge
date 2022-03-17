export type CustomerEntityId = string;


interface ContactPerson {
  username: string;
  fullName: string;
}

export interface CustomerEntityConstructorParams {
  id: CustomerEntityId;
  displayName: string;
  contactPerson?: ContactPerson;
  financialAdmins: string[];
}


export class CustomerEntity {

  public id: CustomerEntityId;

  public displayName: string;

  public contactPerson?: ContactPerson;

  public financialAdmins: string[];

  public constructor(params: CustomerEntityConstructorParams) {
    this.id = params.id;
    this.displayName = params.displayName;
    this.contactPerson = params.contactPerson;
    this.financialAdmins = params.financialAdmins;
  }

}
