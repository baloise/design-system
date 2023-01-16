import '@baloise/design-system-components/dist/design-system-components/design-system-components.css';

import {
  balSnackbarController,
  balToastController,
} from '@baloise/design-system-components';

import { defineCustomElement as defineBalApp } from '@baloise/design-system-components/dist/components/bal-app';
import { defineCustomElement as defineBalHeading } from '@baloise/design-system-components/dist/components/bal-heading';

defineBalApp();
defineBalHeading();

(window as any).balToastController = balToastController;
(window as any).modalController = balSnackbarController;
