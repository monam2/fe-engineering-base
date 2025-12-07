import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { useStorage } from "./useStorage";

describe("useStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("스토리지에 값이 없으면 initialValue로 초기화한다", () => {
    const { result } = renderHook(() =>
      useStorage({ key: "greeting", initialValue: "hello" })
    );

    expect(result.current[0]).toBe("hello");
    expect(localStorage.getItem("greeting")).toBe(JSON.stringify("hello"));
  });

  it("스토리지에 값이 있으면 해당 값으로 초기화한다", () => {
    localStorage.setItem("token", JSON.stringify("stored-token"));

    const { result } = renderHook(() =>
      useStorage({ key: "token", initialValue: "fallback" })
    );

    expect(result.current[0]).toBe("stored-token");
  });

  it("setValue 호출 시 상태와 localStorage를 모두 업데이트한다", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    const { result } = renderHook(() =>
      useStorage<number>({ key: "count", initialValue: 0 })
    );

    act(() => {
      result.current[1](3);
    });

    await waitFor(() => {
      expect(result.current[0]).toBe(3);
      expect(setItemSpy).toHaveBeenLastCalledWith("count", JSON.stringify(3));
      expect(localStorage.getItem("count")).toBe(JSON.stringify(3));
    });
  });
});
