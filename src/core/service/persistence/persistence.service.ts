import { injectable } from 'inversify';


export enum PersistenceServiceValueName {
  LIMITED_PAYMENT_METHODS = '',
  THEME = 'theme',
}


/**
 * @class PersistenceService
 * @abstract
 * @public
 */
@injectable()
export abstract class PersistenceService {

  public static readonly VALUE_NAME = PersistenceServiceValueName;

  public abstract storeValue(valueName: PersistenceServiceValueName, value: string): boolean;

  public abstract loadValue(valueName: PersistenceServiceValueName): string;

  public abstract clearValue(valueName: PersistenceServiceValueName): boolean;

}
