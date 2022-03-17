import { injectable } from 'inversify';

import { Repository, RepositoryRequestParams } from '@/core/repository/repository';
import { LimitedPaymentMethodEntity } from '@/core/entity/limited-payment-method';


export interface LimitedPaymentMethodDTO {
  customerIdentifier?: string;
  paymentIdentifier?: string;
  name?: string;
  amount?: number;
  userId?: string;
  expirationDate?: string;
  customAttributes?: { [key in string]: string };
}


@injectable()
export abstract class LimitedPaymentMethodsRepository implements Repository<LimitedPaymentMethodEntity, string> {

  public abstract list(params?: RepositoryRequestParams): Promise<LimitedPaymentMethodEntity[]>;

  public abstract create(model: LimitedPaymentMethodEntity): Promise<LimitedPaymentMethodEntity>;

}
