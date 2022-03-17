import { inject, injectable } from 'inversify';

import { UseCase } from '@/core/use-case/base-use-case';
import { CustomerEntity } from '@/core/entity/customer';
import { CustomerRepository } from '@/core/repository/customer/customer.repository';


@injectable()
export class ListCustomersUseCase implements UseCase {

  public constructor(@inject(CustomerRepository) private customerRepository: CustomerRepository) {
  }


  public perform(): Promise<CustomerEntity[]> {
    return this.customerRepository.list();
  }

}
