import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it("기본값으로 false를 사용한다", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.value).toBe(false);
  });

  it("초깃값을 true로 설정할 수 있다", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.value).toBe(true);
  });

  it("toggle을 호출하면 값을 반전한다", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(false);
  });

  it("toggle에 boolean을 넘기면 해당 값으로 고정한다", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.toggle(true);
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle(false);
    });
    expect(result.current.value).toBe(false);
  });

  it("setTrue/setFalse 헬퍼가 값을 설정한다", () => {
    const { result } = renderHook(() => useToggle());

    act(() => result.current.setTrue());
    expect(result.current.value).toBe(true);

    act(() => result.current.setFalse());
    expect(result.current.value).toBe(false);
  });
});
