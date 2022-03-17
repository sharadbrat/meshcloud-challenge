import { Theme } from '@/core/entity/theme';
import { CustomerEntity } from '@/core/entity/customer';
import { LimitedPaymentMethodEntity } from '@/core/entity/limited-payment-method';


export interface CustomersStoreModuleState {
  customers: CustomerEntity[];
}

export interface LimitedPaymentMethodsStoreModuleState {
  limitedPaymentMethods: LimitedPaymentMethodEntity[];
}

export interface ThemesStoreModuleState {
  theme: Theme;
}

export interface StoreState {
  customers: CustomersStoreModuleState;
  limitedPaymentMethods: LimitedPaymentMethodsStoreModuleState;
  themes: ThemesStoreModuleState;
}
