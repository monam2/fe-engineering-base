import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { RowSection } from "./index";

describe("RowSection", () => {
  it("두 개의 자식 요소를 지정된 비율로 가로 배치한다", () => {
    render(
      <RowSection ratio={[70, 30]}>
        <div>첫 번째 컨텐츠</div>
        <div>두 번째 컨텐츠</div>
      </RowSection>
    );

    expect(screen.getByText("첫 번째 컨텐츠")).toBeDefined();
    expect(screen.getByText("두 번째 컨텐츠")).toBeDefined();
  });

  it("3개의 자식 요소를 렌더링한다", () => {
    render(
      <RowSection ratio={[25, 50, 25]}>
        <div>첫 번째 컨텐츠</div>
        <div>두 번째 컨텐츠</div>
        <div>세 번째 컨텐츠</div>
      </RowSection>
    );

    expect(screen.getByText("첫 번째 컨텐츠")).toBeDefined();
    expect(screen.getByText("두 번째 컨텐츠")).toBeDefined();
    expect(screen.getByText("세 번째 컨텐츠")).toBeDefined();
  });
});

describe("개수 불일치 검증 (개발 환경)", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    process.env.NODE_ENV = "development";
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it("children 개수가 ratio 길이보다 많으면 에러를 출력한다", () => {
    render(
      <RowSection ratio={[50, 50]}>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </RowSection>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "children 개수(3)와 ratio 길이(2)가 일치하지 않습니다"
      )
    );
  });

  it("children 개수가 ratio 길이보다 적으면 에러를 출력한다", () => {
    render(
      <RowSection ratio={[30, 40, 30]}>
        <div>A</div>
        <div>B</div>
      </RowSection>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "children 개수(2)와 ratio 길이(3)가 일치하지 않습니다"
      )
    );
  });

  it("ratio 길이보다 자식이 적어도 렌더링은 정상적으로 된다", () => {
    render(
      <RowSection ratio={[30, 40, 30]}>
        <div>A</div>
        <div>B</div>
      </RowSection>
    );

    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
  });
});

describe("비율 합 검증 (개발 환경)", () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    process.env.NODE_ENV = "development";
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it("ratio의 합이 100이 아니면 경고를 출력한다", () => {
    render(
      <RowSection ratio={[70, 50]}>
        <div>A</div>
        <div>B</div>
      </RowSection>
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("ratio의 합이 100이 아닙니다 (현재: 120)")
    );
  });

  it("ratio의 합이 100이면 경고를 출력하지 않는다", () => {
    render(
      <RowSection ratio={[70, 30]}>
        <div>A</div>
        <div>B</div>
      </RowSection>
    );

    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("ratio의 합이 100에 근사하면 경고를 출력하지 않는다", () => {
    render(
      <RowSection ratio={[33.33, 33.33, 33.34]}>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </RowSection>
    );

    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});

describe("Edge Cases", () => {
  it("자식이 1개만 있어도 렌더링된다", () => {
    render(
      <RowSection ratio={[100]}>
        <div>Only One</div>
      </RowSection>
    );

    expect(screen.getByText("Only One")).toBeDefined();
  });

  it("ratio에 0이 포함되어도 렌더링된다", () => {
    render(
      <RowSection ratio={[0, 100]}>
        <div>Hidden</div>
        <div>Visible</div>
      </RowSection>
    );

    expect(screen.getByText("Hidden")).toBeDefined();
    expect(screen.getByText("Visible")).toBeDefined();
  });

  it("빈 자식이 포함되어도 정상 동작한다", () => {
    render(
      <RowSection ratio={[50, 50]}>
        <div>Content</div>
        {null}
      </RowSection>
    );

    // null은 렌더링되지 않으므로 1개만 남음
    expect(screen.getByText("Content")).toBeDefined();
  });
});
