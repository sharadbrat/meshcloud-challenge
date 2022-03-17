export enum Theme {
  DEFAULT = 'default',
  DARK = 'dark',
  LIGHT = 'light',
}


export class ThemeEntity {

  public static get DEFAULT(): Theme { return Theme.DEFAULT; }

  public static get DARK(): Theme { return Theme.DARK; }

  public static get LIGHT(): Theme { return Theme.LIGHT; }

}
