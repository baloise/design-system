export enum AngularType {
  Standalone = 'Standalone (ESBuild)',
  Module = 'Module-Based (ESBuild)',
  Legacy = 'Legacy Module-Based (Webpack)',
}

export interface SchemaOptions {
  /**
   * Defines how the angular lib is used
   */
  angularType: AngularType
}
