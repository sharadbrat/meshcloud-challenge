import { CustomerEntity } from '@/core/entity/customer';
import { RepositoryAdapter } from '@/core/repository/adapter';
import { CustomerEntityDTO } from './customer.repository';


export class CustomerHttpAdapter extends RepositoryAdapter<CustomerEntity, CustomerEntityDTO> {

  public deserialize(dto: CustomerEntityDTO): CustomerEntity {
    return new CustomerEntity({
      id: dto.identifier,
      displayName: dto.displayName,
      financialAdmins: dto.financialAdmins || [],
      contactPerson: dto.contactPerson
        && { username: dto.contactPerson.username, fullName: dto.contactPerson.fullName },
    });
  }

  public serialize(model: CustomerEntity): CustomerEntityDTO {
    return {
      identifier: model.id,
      displayName: model.displayName,
      financialAdmins: model.financialAdmins,
      contactPerson: model.contactPerson,
    };
  }

}
