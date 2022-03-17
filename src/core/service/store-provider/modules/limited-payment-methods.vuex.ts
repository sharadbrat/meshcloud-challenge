import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

import { LimitedPaymentMethodsStoreModuleState } from '@/core/service/store-provider/store-state';
import { LimitedPaymentMethodEntity } from '@/core/entity/limited-payment-method';


@Module({ namespaced: true })
export class LimitedPaymentMethodsStoreModule extends VuexModule implements LimitedPaymentMethodsStoreModuleState {

  public limitedPaymentMethods: LimitedPaymentMethodEntity[];

  @Mutation
  public setLimitedPaymentMethods(methods: LimitedPaymentMethodEntity[]) {
    this.limitedPaymentMethods = methods;
  }

}
