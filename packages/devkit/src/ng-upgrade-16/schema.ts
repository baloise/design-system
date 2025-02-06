export enum AngularType {
  Standalone = 'Standalone (ESBuild)',
  Module = 'Module-Based (ESBuild)',
}

export interface SchemaOptions {
  /**
   * Defines how the angular lib is used
   */
  angularType: AngularType
}
