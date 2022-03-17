import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

import { CustomersStoreModuleState } from '@/core/service/store-provider/store-state';
import { CustomerEntity } from '@/core/entity/customer';


@Module({ namespaced: true })
export class CustomersStoreModule extends VuexModule implements CustomersStoreModuleState {

  public customers: CustomerEntity[];

  @Mutation
  public setCustomers(customers: CustomerEntity[]) {
    this.customers = customers;
  }

}
