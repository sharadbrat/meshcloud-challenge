import { inject } from 'inversify';

import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';
import { PersistenceService } from '@/core/service/persistence/persistence.service';
import { LimitedPaymentMethodDTO, LimitedPaymentMethodsRepository } from './limited-payment-methods.repository';
import { LimitedPaymentMethodEntity } from '@/core/entity/limited-payment-method';
import { LimitedPaymentMethodsHttpAdapter } from './limited-payment-methods-http-adapter';

export class LimitedPaymentMethodsRepositoryHttpImpl extends LimitedPaymentMethodsRepository {

  public constructor(
    @inject(StoreProviderService) private storeProviderService: StoreProviderService,
    @inject(PersistenceService) private persistenceService: PersistenceService,
    private adapter: LimitedPaymentMethodsHttpAdapter = new LimitedPaymentMethodsHttpAdapter(),
  ) {
    super();
  }

  public async create(model: LimitedPaymentMethodEntity): Promise<LimitedPaymentMethodEntity> {
    const dtos = this.loadMethods();
    const methods = this.adapter.deserializeList(dtos);
    const newMethods = [
      ...methods,
      model,
    ];
    this.storeProviderService.commit<LimitedPaymentMethodEntity[]>('limitedPaymentMethods/setLimitedPaymentMethods', newMethods);
    const newDtos = this.adapter.serializeList(newMethods);
    this.persistenceService.storeValue(PersistenceService.VALUE_NAME.LIMITED_PAYMENT_METHODS, JSON.stringify(newDtos));
    return model;
  }

  public async list(): Promise<LimitedPaymentMethodEntity[]> {
    const dtos = this.loadMethods();
    const methods = this.adapter.deserializeList(dtos);
    this.storeProviderService.commit<LimitedPaymentMethodEntity[]>('limitedPaymentMethods/setLimitedPaymentMethods', methods);
    return methods;
  }

  private loadMethods(): LimitedPaymentMethodDTO[] {
    const persistenceKey = PersistenceService.VALUE_NAME.LIMITED_PAYMENT_METHODS;
    const paymentMethodsStringified = this.persistenceService.loadValue(persistenceKey);
    if (!paymentMethodsStringified) {
      return [];
    }
    try {
      return JSON.parse(paymentMethodsStringified);
    } catch {
      return [];
    }
  }

}
