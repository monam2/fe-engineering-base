"use client";

export interface IfProps {
  condition: boolean | unknown;
  trueRender?: React.ReactNode;
  falseRender?: React.ReactNode;
}

/**
 *
 * @param condition - 조건
 * @param trueRender - 조건이 true일 때 렌더링할 컴포넌트
 * @param falseRender - 조건이 false일 때 렌더링할 컴포넌트
 * @returns 렌더링할 컴포넌트(trueRender or falseRender)
 */
export function If({ condition, trueRender, falseRender }: IfProps) {
  const conditionFlag = !!condition;

  return conditionFlag ? trueRender : falseRender;
}
