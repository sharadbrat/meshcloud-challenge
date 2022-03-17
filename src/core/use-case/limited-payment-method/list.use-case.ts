import { inject, injectable } from 'inversify';

import { UseCase } from '@/core/use-case/base-use-case';
import { LimitedPaymentMethodEntity } from '@/core/entity/limited-payment-method';
import { LimitedPaymentMethodsRepository } from '@/core/repository/limited-payment-methods/limited-payment-methods.repository';


@injectable()
export class ListLimitedPaymentMethodsUseCase implements UseCase {

  public constructor(
    @inject(LimitedPaymentMethodsRepository) private limitedPaymentMethodsRepository: LimitedPaymentMethodsRepository,
  ) {
  }


  public perform(): Promise<LimitedPaymentMethodEntity[]> {
    return this.limitedPaymentMethodsRepository.list();
  }

}
