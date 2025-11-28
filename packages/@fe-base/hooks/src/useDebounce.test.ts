import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("초기값을 즉시 반환한다", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("delay 시간이 지나기 전에는 값이 업데이트되지 않는다", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // 값 변경
    rerender({ value: "updated", delay: 500 });

    // 400ms만 경과
    act(() => {
      vi.advanceTimersByTime(400);
    });

    // 아직 시간이 지나지 않았으므로 이전 값 유지
    expect(result.current).toBe("initial");
  });

  it("delay 시간이 지나면 값이 업데이트된다", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // 값 변경
    rerender({ value: "updated", delay: 500 });

    // 500ms 경과
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });

  it("연속으로 값이 변경되면 마지막 값만 반영된다 (debounce)", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "first", delay: 500 },
      }
    );

    // 연속으로 값 변경
    rerender({ value: "second", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(200); // 200ms만 경과
    });

    rerender({ value: "third", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(200); // 추가 200ms 경과 (총 400ms)
    });

    rerender({ value: "fourth", delay: 500 });

    // 아직 500ms가 지나지 않았으므로 초기값 유지
    expect(result.current).toBe("first");

    // 마지막 변경으로부터 500ms 경과
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("fourth");
  });

  it("delay 값이 변경되면 새로운 delay가 적용된다", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // 값과 delay 동시 변경
    rerender({ value: "updated", delay: 1000 });

    // 500ms 경과 (이전 delay)
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("initial"); // 아직 업데이트 안됨

    // 추가 500ms 경과 (총 1000ms)
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });

  it("다양한 타입의 값을 debounce할 수 있다", () => {
    // 숫자
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 0 } }
    );

    numberRerender({ value: 42 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(numberResult.current).toBe(42);

    // 객체
    const { result: objectResult, rerender: objectRerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: { name: "initial" } } }
    );

    const newObj = { name: "updated" };
    objectRerender({ value: newObj });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(objectResult.current).toEqual(newObj);
  });

  it("컴포넌트가 unmount되면 타이머가 정리된다", () => {
    const { unmount } = renderHook(() => useDebounce("test", 500));

    // spy를 사용하여 clearTimeout이 호출되는지 확인
    const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
