import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useClickOutside } from "./useClickOutside";

describe("useClickOutside", () => {
  it("외부 클릭 시 핸들러를 호출한다", () => {
    const ref = { current: document.createElement("div") };
    document.body.appendChild(ref.current);
    const handler = vi.fn();
    const outsideElement = document.createElement("button");
    document.body.appendChild(outsideElement);

    renderHook(() => useClickOutside(ref, handler));

    act(() => {
      outsideElement.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true })
      );
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("내부 클릭 시 핸들러를 호출하지 않는다", () => {
    const ref = { current: document.createElement("div") };
    document.body.appendChild(ref.current);
    const handler = vi.fn();

    renderHook(() => useClickOutside(ref, handler));

    act(() => {
      ref.current?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it("언마운트 후에는 이벤트 리스너가 제거된다", () => {
    const ref = { current: document.createElement("div") };
    document.body.appendChild(ref.current);
    const handler = vi.fn();

    const { unmount } = renderHook(() => useClickOutside(ref, handler));

    unmount();

    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(handler).not.toHaveBeenCalled();
  });
});
