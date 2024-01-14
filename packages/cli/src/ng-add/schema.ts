export enum Region {
  CH = 'CH',
  BE = 'BE',
  DE = 'DE',
  LU = 'LU',
}

export interface SchemaOptions {
  /**
   * The root project name.
   */
  project: string
  /**
   * Transloco is available
   */
  i18n: boolean
  /**
   * The region of i18n
   */
  region: Region
}
