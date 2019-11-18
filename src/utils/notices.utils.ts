const createNoticesUtils = () => {

  const DURATION = 5000;

  let container: HTMLDivElement;
  let timer: NodeJS.Timeout;

  const shouldQueue = () => {
    return container.childElementCount > 0;
  };

  const setupContainer = () => {
    container = document.querySelector(("body") + ">.bal-notices");

    if (container) return;

    if (!container) {
      container = document.createElement("div");
      container.className = "bal-notices";
    }

    document.body.appendChild(container);
  };

  const showNotice = (element: HTMLBalToastElement) => {
    if (shouldQueue()) {
      // Call recursively if should queue
      setTimeout(() => showNotice(element), 250);
      return;
    }
    container.insertAdjacentElement("afterbegin", element);
    timer = setTimeout(() => close(element), DURATION);
  };

  const removeElement = (element: HTMLBalToastElement) => {
    if (typeof element.close !== "undefined") {
      element.close();
    } else if (typeof element.remove !== "undefined") {
      element.remove();
    } else if (typeof element.parentNode !== "undefined") {
      element.parentNode.removeChild(element);
    }
  };

  const close = (element: HTMLBalToastElement) => {
    clearTimeout(timer);
    removeElement(element);
  };

  setupContainer();

  return {
    showNotice,
  };
};

export const noticesUtils = createNoticesUtils();
