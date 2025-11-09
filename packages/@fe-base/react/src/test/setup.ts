import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

type MockEntryInit = {
  isIntersecting: boolean;
  target?: Element;
} & Partial<IntersectionObserverEntry>;

class IntersectionObserverMock {
  public static instances: IntersectionObserverMock[] = [];

  public observe = vi.fn();
  public unobserve = vi.fn();
  public disconnect = vi.fn();

  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit
  ) {
    IntersectionObserverMock.instances.push(this);
  }

  trigger(entries: MockEntryInit[]) {
    this.callback(
      entries.map((entry) => ({
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio:
          entry.intersectionRatio ?? (entry.isIntersecting ? 1 : 0),
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        target: entry.target ?? ({} as Element),
        time: 0,
        ...entry,
      })),
      this as unknown as IntersectionObserver
    );
  }
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

// 테스트에서 쉽게 쓰도록 헬퍼 노출
Object.defineProperty(globalThis, "__triggerIntersection__", {
  writable: true,
  value: (entries: MockEntryInit[], index = 0) => {
    const instance = IntersectionObserverMock.instances[index];
    if (!instance) {
      throw new Error(
        "IntersectionObserver 인스턴스가 아직 생성되지 않았습니다."
      );
    }
    instance.trigger(entries);
  },
});

afterEach(() => {
  cleanup();
  IntersectionObserverMock.instances = [];
  vi.clearAllMocks();
});
