// jest-dom adds custom matchers for asserting on DOM nodes, wired for Vitest.
import '@testing-library/jest-dom/vitest';

// GSAP ScrollTrigger requires matchMedia and ResizeObserver in jsdom.
window.matchMedia =
  window.matchMedia ||
  ((query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList);

window.ResizeObserver =
  window.ResizeObserver ||
  class {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  };
