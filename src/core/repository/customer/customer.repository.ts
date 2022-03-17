import { injectable } from 'inversify';

import { Repository, RepositoryRequestParams } from '@/core/repository/repository';
import { CustomerEntity } from '@/core/entity/customer';


export interface CustomerEntityDTO {
  identifier?: string;
  displayName?: string;
  contactPerson?: any;
  financialAdmins?: string[];
}


@injectable()
export abstract class CustomerRepository implements Repository<CustomerEntity, string> {

  public abstract list(params?: RepositoryRequestParams): Promise<CustomerEntity[]>;

}
