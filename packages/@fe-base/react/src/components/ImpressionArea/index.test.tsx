import { describe, it, expect, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { ImpressionArea } from "./index";

/**
 *
 * @param entries
 * @param index
 */
const triggerIntersection = (
  entries: { isIntersecting: boolean; target?: Element }[],
  index = 0
) => {
  const trigger = (globalThis as any).__triggerIntersection__ as (
    intersectionEntries: { isIntersecting: boolean; target?: Element }[],
    instanceIndex?: number
  ) => void;

  act(() => {
    trigger(entries, index);
  });
};

const getObserverInstances = () =>
  (
    globalThis.IntersectionObserver as unknown as {
      instances: Array<{
        observe: ReturnType<typeof vi.fn>;
        unobserve: ReturnType<typeof vi.fn>;
        disconnect: ReturnType<typeof vi.fn>;
      }>;
    }
  ).instances;

describe("ImpressionArea", () => {
  it("요소가 보이면 onImpressionStart를 호출한다", () => {
    const onImpressionStart = vi.fn();

    render(
      <ImpressionArea onImpressionStart={onImpressionStart}>
        <div>컨텐츠</div>
      </ImpressionArea>
    );

    triggerIntersection([{ isIntersecting: true }]);

    expect(onImpressionStart).toHaveBeenCalledTimes(1);
  });

  it("요소가 사라지면 onImpressionEnd를 호출한다", () => {
    const onImpressionEnd = vi.fn();

    render(
      <ImpressionArea onImpressionEnd={onImpressionEnd}>
        <div>컨텐츠</div>
      </ImpressionArea>
    );

    triggerIntersection([{ isIntersecting: false }]);

    expect(onImpressionEnd).toHaveBeenCalledTimes(1);
  });

  it("once=true일 때 한 번만 호출한다", () => {
    const onImpressionStart = vi.fn();

    render(
      <ImpressionArea once onImpressionStart={onImpressionStart}>
        <div>컨텐츠</div>
      </ImpressionArea>
    );

    triggerIntersection([{ isIntersecting: true }]);
    expect(onImpressionStart).toHaveBeenCalledTimes(1);

    triggerIntersection([{ isIntersecting: true }]);
    expect(onImpressionStart).toHaveBeenCalledTimes(1);
  });

  it("언마운트 시 IntersectionObserver를 정리한다", () => {
    const { unmount } = render(
      <ImpressionArea>
        <div>컨텐츠</div>
      </ImpressionArea>
    );

    const [instance] = getObserverInstances();

    expect(instance.observe).toHaveBeenCalledTimes(1);

    unmount();

    expect(instance.disconnect).toHaveBeenCalledTimes(1);
  });
});
