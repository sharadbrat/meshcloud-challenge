import { inject, injectable } from 'inversify';
import { LimitedPaymentMethodEntity } from '@/core/entity/limited-payment-method';
import { LimitedPaymentMethodsRepository } from '@/core/repository/limited-payment-methods/limited-payment-methods.repository';

import { UseCase } from '@/core/use-case/base-use-case';


@injectable()
export class CreateLimitedPaymentMethodUseCase implements UseCase {

  public constructor(
    @inject(LimitedPaymentMethodsRepository) private limitedPaymentMethodsRepository: LimitedPaymentMethodsRepository,
  ) {
  }


  public perform(model: LimitedPaymentMethodEntity): Promise<LimitedPaymentMethodEntity> {
    return this.limitedPaymentMethodsRepository.create(model);
  }

}
