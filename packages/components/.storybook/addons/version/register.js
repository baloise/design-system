import React from "react";

import { addons, types } from '@storybook/addons';
import { version } from '../../../package.json'

addons.register("my/toolbar", () => {
  addons.add("my-toolbar-addon/toolbar", {
    title: "Version badge",
    type: types.TOOL,
    type: types.TOOLEXTRA,
    //👇 Shows the Toolbar UI element if either the Canvas or Docs tab is active
    // match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ({ active }) => {
      return (
        <div className="my-version-tag">{version}</div>
      )
    },
  });
});
