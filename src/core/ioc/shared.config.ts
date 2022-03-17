import { IocContainerConfig } from '@/core/ioc/ioc-container';

import { NetworkService } from '@/core/service/network/network.service';
import { NetworkServiceHttpImpl } from '@/core/service/network/network-http.service';
import { NotificationService } from '@/core/service/notification/notification.service';
import { NotificationServiceMapImpl } from '@/core/service/notification/notification-map.service';
import { PersistenceService } from '@/core/service/persistence/persistence.service';
import { PersistenceServiceLocalStorageImpl } from '@/core/service/persistence/persistence-local-storage.service';
import { ConfigService } from '@/core/service/config/config.service';
import { ConfigServiceEnvImpl } from '@/core/service/config/config-env.service';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';
import { VuexStoreProviderServiceImpl } from '@/core/service/store-provider/vuex-store-provider.service';

import { CustomerRepository } from '../repository/customer/customer.repository';
import { CustomerRepositoryHttpImpl } from '../repository/customer/customer-http.repository';
import { LimitedPaymentMethodsRepositoryHttpImpl } from '../repository/limited-payment-methods/limited-payment-methods-http.repository';
import { LimitedPaymentMethodsRepository } from '../repository/limited-payment-methods/limited-payment-methods.repository';

import { GetThemeUseCase } from '@/core/use-case/theme/get-theme.use-case';
import { SetThemeUseCase } from '@/core/use-case/theme/set-theme.use-case';
import { ListCustomersUseCase } from '../use-case/customer/list.use-case';
import { ListLimitedPaymentMethodsUseCase } from '../use-case/limited-payment-method/list.use-case';
import { CreateLimitedPaymentMethodUseCase } from '../use-case/limited-payment-method/create.use-case';


export const IOC_CONTAINER_CONFIG_SHARED: IocContainerConfig = {
  units: [
    // services
    { identifier: NetworkService, implementer: NetworkServiceHttpImpl },
    { identifier: NotificationService, implementer: NotificationServiceMapImpl },
    { identifier: PersistenceService, implementer: PersistenceServiceLocalStorageImpl },
    { identifier: ConfigService, implementer: ConfigServiceEnvImpl },
    { identifier: StoreProviderService, implementer: VuexStoreProviderServiceImpl },

    // data repositories
    { identifier: CustomerRepository, implementer: CustomerRepositoryHttpImpl },
    { identifier: LimitedPaymentMethodsRepository, implementer: LimitedPaymentMethodsRepositoryHttpImpl },

    // use cases
    { identifier: GetThemeUseCase, implementer: GetThemeUseCase },
    { identifier: SetThemeUseCase, implementer: SetThemeUseCase },
    { identifier: ListCustomersUseCase, implementer: ListCustomersUseCase },
    { identifier: ListLimitedPaymentMethodsUseCase, implementer: ListLimitedPaymentMethodsUseCase },
    { identifier: CreateLimitedPaymentMethodUseCase, implementer: CreateLimitedPaymentMethodUseCase },
  ],
};
