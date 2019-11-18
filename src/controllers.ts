import {toastController as balToastController} from "./components/bal-toast/bal-toast.controller";

/**
 * Global Script
 * -------------------
 * The global script runs once before your library/app loads, so you can do things like setting up a connection
 * to an external service or configuring a library you are using.
 *
 * https://stenciljs.com/docs/config#globalscript
 */

export default () => {
  const win = window;
  const BalUILibrary = (win as any).BalUILibrary = (win as any).BalUILibrary || {};
  /**
   * Place your controllers here ...
   */
  BalUILibrary.toastController = balToastController;
};
