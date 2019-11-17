import {balToastController} from "./components/bal-toast/bal-toast.controller";

/**
 * Global Script
 * -------------------
 * The global script runs once before your library/app loads, so you can do things like setting up a connection
 * to an external service or configuring a library you are using.
 *
 * https://stenciljs.com/docs/config#globalscript
 */

export default function main() {
  /**
   * Place your controllers here ...
   */
  (window as any).balToastController = balToastController;
}
