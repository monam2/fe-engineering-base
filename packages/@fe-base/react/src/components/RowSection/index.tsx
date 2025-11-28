"use client";

import React from "react";

export interface RowSectionProps {
  children: React.ReactNode;
  ratio: number[]; // 가변 길이
}

/**
 * 여러 자식 요소를 지정된 비율로 가로 배치하는 컴포넌트
 *
 * @example
 * ```tsx
 * // 2개
 * <RowSection ratio={[70, 30]}>
 *   <Sidebar />
 *   <MainContent />
 * </RowSection>
 *
 * // 3개
 * <RowSection ratio={[25, 50, 25]}>
 *   <LeftSidebar />
 *   <MainContent />
 *   <RightSidebar />
 * </RowSection>
 * ```
 */
export function RowSection({ children, ratio }: RowSectionProps) {
  const childArray = React.Children.toArray(children);

  // 개수 불일치 검증
  if (process.env.NODE_ENV === "development") {
    if (childArray.length !== ratio.length) {
      console.error(
        `RowSection: children 개수(${childArray.length})와 ` +
          `ratio 길이(${ratio.length})가 일치하지 않습니다.`
      );
    }

    const sum = ratio.reduce((acc, val) => acc + val, 0);
    if (Math.abs(sum - 100) > 0.01) {
      console.warn(`RowSection: ratio의 합이 100이 아닙니다 (현재: ${sum}).`);
    }
  }

  return (
    <div style={RowSectionContainerStyle}>
      {childArray.map((child, index) => (
        <div key={index} style={RowSectionItemStyle(ratio[index] ?? 0)}>
          {child}
        </div>
      ))}
    </div>
  );
}

const RowSectionContainerStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
} as React.CSSProperties;

const RowSectionItemStyle = (widthPercent: number) =>
  ({
    flex: `0 0 ${widthPercent}%`,
    width: `${widthPercent}%`,
  } as React.CSSProperties);
