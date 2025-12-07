"use client";

import { useEffect, useState } from "react";

interface UseStorageProps<T> {
  key: string;
  initialValue: T;
  storage?: Storage;
}

/**
 *
 * @param key - 저장할 키
 * @param initialValue - 초기값
 * @param storage - 저장소
 * @returns [value, setValue]
 *
 * @example
 * ```tsx
 * function Profile() {
 *   const [nickname, setNickname] = useStorage({
 *     key: "nickname",
 *     initialValue: "Guest",
 *   });
 *
 *   return (
 *     <div>
 *       <p>닉네임: {nickname}</p>
 *       <input
 *         value={nickname}
 *         onChange={(e) => setNickname(e.target.value)}
 *         placeholder="닉네임 입력"
 *       />
 *     </div>
 *   );
 * }
 */

export function useStorage<T>({
  key,
  initialValue,
  storage = localStorage,
}: UseStorageProps<T>) {
  const [value, setValue] = useState(() =>
    JSON.parse(storage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
