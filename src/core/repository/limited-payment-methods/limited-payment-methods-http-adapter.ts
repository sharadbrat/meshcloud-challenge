import { LimitedPaymentMethodEntity } from '@/core/entity/limited-payment-method';
import { RepositoryAdapter } from '@/core/repository/adapter';
import { LimitedPaymentMethodDTO } from './limited-payment-methods.repository';


export class LimitedPaymentMethodsHttpAdapter extends RepositoryAdapter<
  LimitedPaymentMethodEntity,
  LimitedPaymentMethodDTO
> {

  public deserialize(dto: LimitedPaymentMethodDTO): LimitedPaymentMethodEntity {
    return new LimitedPaymentMethodEntity({
      customerIdentifier: dto.customerIdentifier,
      paymentIdentifier: dto.paymentIdentifier,
      name: dto.name,
      amount: dto.amount,
      userId: dto.userId,
      expirationDate: dto.expirationDate,
      customAttributes: dto.customAttributes,
    });
  }

  public serialize(model: LimitedPaymentMethodEntity): LimitedPaymentMethodDTO {
    return {
      customerIdentifier: model.customerIdentifier,
      paymentIdentifier: model.paymentIdentifier,
      name: model.name,
      amount: model.amount,
      userId: model.userId,
      expirationDate: model.expirationDate,
      customAttributes: model.customAttributes,
    };
  }

}
