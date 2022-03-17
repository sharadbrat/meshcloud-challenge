import { IocContainerConfig } from '@/core/ioc/ioc-container';
import { IOC_CONTAINER_CONFIG_SHARED } from '@/core/ioc/shared.config';


export const IOC_CONTAINER_CONFIG_PROD: IocContainerConfig = {
  units: [
    ...IOC_CONTAINER_CONFIG_SHARED.units,
  ],
};
