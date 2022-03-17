import { Theme } from '@/core/entity/theme';
import { UserEntity } from '@/core/entity/user';


/**
 * @interface UsersStoreModuleState
 * @public
 */
export interface UsersStoreModuleState {
  user: UserEntity;
}


/**
 * @interface ThemesStoreModuleState
 * @public
 */
export interface ThemesStoreModuleState {
  theme: Theme;
}

/**
 * @interface StoreState
 * @public
 */
export interface StoreState {
  users: UsersStoreModuleState;
  themes: ThemesStoreModuleState;
}
