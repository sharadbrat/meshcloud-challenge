export interface LimitedPaymentMethodEntityConstructorParams {
  customerIdentifier: string;
  paymentIdentifier: string;
  name: string;
  amount: number;
  userId: string;
  expirationDate: string;
  customAttributes: { [key in string]: string };
}


export class LimitedPaymentMethodEntity {

  public name: string;

  public amount: number;

  public userId: string;

  public expirationDate: string;

  public customAttributes: { [key in string]: string };

  public customerIdentifier: string;

  public paymentIdentifier: string;

  public constructor(params: LimitedPaymentMethodEntityConstructorParams) {
    this.name = params.name;
    this.amount = params.amount;
    this.userId = params.userId;
    this.expirationDate = params.expirationDate;
    this.customAttributes = params.customAttributes;
    this.customerIdentifier = params.customerIdentifier;
    this.paymentIdentifier = params.paymentIdentifier;
  }

}
