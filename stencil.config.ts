import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import { postcss } from "@stencil/postcss";
import autoprefixer from "autoprefixer";

export const config: Config = {
  namespace: "bal-ui-library",
  globalStyle: "src/scss/bal-ui-library.scss",
  copy: [
    {
      src: "**/*.md",
    },
    {
      src: "docs/*.css",
    },
  ],
  plugins: [
    sass(),
    postcss({
      plugins: [autoprefixer()],
    }),
  ],
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      dir: "public",
      serviceWorker: null, // disable service workers
    },
  ],
};
