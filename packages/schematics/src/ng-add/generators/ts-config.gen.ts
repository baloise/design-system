import { Tree } from '@angular-devkit/schematics';
import { JsonObject } from '@angular-devkit/core';

export const TS_CONFIG_APP = 'tsconfig.app.json';

export function updateTsConfig(host: Tree) {
  if (host.exists(TS_CONFIG_APP)) {
    const json = host.readJson(TS_CONFIG_APP) as JsonObject;
    if (json && json.files) {
      const files = json.files as string[];
      if (!files.includes('src/polyfills.ts')) {
        json.files = ['src/polyfills.ts', ...files];
      }

      const newTsConfig = JSON.stringify(json, undefined, 2);
      return host.overwrite(TS_CONFIG_APP, newTsConfig);
    }
  }
}
