import { inject } from 'inversify';

import { NetworkService } from '@/core/service/network/network.service';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';
import { CustomerEntity } from '@/core/entity/customer';
import { CustomerEntityDTO, CustomerRepository } from './customer.repository';
import { CustomerHttpAdapter } from './customer-http-adapter';


export class CustomerRepositoryHttpImpl extends CustomerRepository {

  public constructor(
    @inject(NetworkService) private network: NetworkService,
    @inject(StoreProviderService) private storeProviderService: StoreProviderService,
    private adapter: CustomerHttpAdapter = new CustomerHttpAdapter(),
  ) {
    super();
  }

  public async list(): Promise<CustomerEntity[]> {
    const url = this.network.environment.customers.list;
    const response = await this.network.get<{ customers: CustomerEntityDTO[] }>(url);
    const customers = this.adapter.deserializeList(response.data.customers);
    this.storeProviderService.commit<CustomerEntity[]>('customers/setCustomers', customers);
    return customers;
  }

}
