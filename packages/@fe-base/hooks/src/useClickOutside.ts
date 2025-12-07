"use client";

import { useEffect } from "react";

/**
 * 클릭이 컴포넌트 외부에서 발생하면 핸들러를 실행하는 훅
 *
 * @param ref - 참조할 요소
 * @param handler - 클릭이 컴포넌트 외부에서 발생하면 실행할 핸들러
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useClickOutside(ref, () => console.log("클릭이 컴포넌트 외부에서 발생했습니다"));
 * ```
 */
export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
