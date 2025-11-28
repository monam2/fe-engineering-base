import { useCallback, useState } from "react";

export type UseToggleReturn = {
  value: boolean;
  toggle: (nextValue?: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
};

/**
 * boolean 상태를 편리하게 관리하는 커스텀 훅
 *
 * @param initialValue - 초기 boolean 값 (기본값: false)
 * @returns 현재 값과 상태 변경 함수들을 포함한 객체
 *
 * @example
 * ```tsx
 * function Modal() {
 *   const { value: isOpen, toggle, setTrue, setFalse } = useToggle(false);
 *
 *   return (
 *     <>
 *       <button onClick={setTrue}>열기</button>
 *       <button onClick={toggle}>토글</button>
 *       {isOpen && (
 *         <div className="modal">
 *           <button onClick={setFalse}>닫기</button>
 *         </div>
 *       )}
 *     </>
 *   );
 * }
 * ```
 */
export function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((nextValue?: boolean) => {
    setValue((prev) => (typeof nextValue === "boolean" ? nextValue : !prev));
  }, []);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse };
}
