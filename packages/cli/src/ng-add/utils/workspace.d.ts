import { Tree } from '@angular-devkit/schematics'
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models'
export declare function isNxWorkspace(host: Tree): boolean
export declare function getNXWorkspace(host: Tree): any
export declare function getAngularWorkspace(host: Tree): WorkspaceSchema
export declare function getWorkspace(host: Tree, path: string): WorkspaceSchema
