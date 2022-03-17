import { IocContainerConfig } from '@/core/ioc/ioc-container';

import { ErrorTrackerService } from '@/core/service/error-tracker/error-tracker.service';
import { ErrorTrackerServiceProvidedImpl } from '@/core/service/error-tracker/error-tracker-provided.service';
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

import { UserRepository } from '@/core/repository/user/user.repository';
import { UserRepositoryHttpImpl } from '@/core/repository/user/user-http.repository';

import { GetThemeUseCase } from '@/core/use-case/theme/get-theme.use-case';
import { SetThemeUseCase } from '@/core/use-case/theme/set-theme.use-case';


export const IOC_CONTAINER_CONFIG_SHARED: IocContainerConfig = {
  units: [
    // services
    { identifier: NetworkService, implementer: NetworkServiceHttpImpl },
    { identifier: NotificationService, implementer: NotificationServiceMapImpl },
    { identifier: PersistenceService, implementer: PersistenceServiceLocalStorageImpl },
    { identifier: ErrorTrackerService, implementer: ErrorTrackerServiceProvidedImpl },
    { identifier: ConfigService, implementer: ConfigServiceEnvImpl },
    { identifier: StoreProviderService, implementer: VuexStoreProviderServiceImpl },

    // data repositories
    { identifier: UserRepository, implementer: UserRepositoryHttpImpl },

    // use cases
    { identifier: GetThemeUseCase, implementer: GetThemeUseCase },
    { identifier: SetThemeUseCase, implementer: SetThemeUseCase },
  ],
};
