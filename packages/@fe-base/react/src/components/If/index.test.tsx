import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { If } from "./index";

describe("If", () => {
  it("조건이 true이면 trueRender를 렌더링한다", () => {
    render(<If condition={true} trueRender={<div>true</div>} />);
    expect(screen.getByText("true")).toBeDefined();
    expect(screen.queryByText("false")).toBeNull();
  });

  it("조건이 false이면 falseRender를 렌더링한다", () => {
    render(<If condition={false} falseRender={<div>false</div>} />);
    expect(screen.getByText("false")).toBeDefined();
    expect(screen.queryByText("true")).toBeNull();
  });

  it("조건이 0이 아닌 숫자이면 trueRender를 렌더링한다", () => {
    render(<If condition={1} trueRender={<div>true</div>} />);
    expect(screen.getByText("true")).toBeDefined();
    expect(screen.queryByText("false")).toBeNull();
  });

  it("조건이 0이면 falseRender를 렌더링한다", () => {
    render(
      <If
        condition={0}
        trueRender={<div>true</div>}
        falseRender={<div>false</div>}
      />
    );
    expect(screen.getByText("false")).toBeDefined();
    expect(screen.queryByText("true")).toBeNull();
  });

  it("조건이 빈 문자열이 아닌 문자열이면 trueRender를 렌더링한다", () => {
    render(<If condition={"test"} trueRender={<div>true</div>} />);
    expect(screen.getByText("true")).toBeDefined();
    expect(screen.queryByText("false")).toBeNull();
  });

  it("조건이 빈 문자열이면 falseRender를 렌더링한다", () => {
    render(<If condition={""} falseRender={<div>false</div>} />);
    expect(screen.getByText("false")).toBeDefined();
    expect(screen.queryByText("true")).toBeNull();
  });

  it("조건이 null이면 falseRender를 렌더링한다", () => {
    render(
      <If
        condition={null}
        trueRender={<div>true</div>}
        falseRender={<div>false</div>}
      />
    );
    expect(screen.getByText("false")).toBeDefined();
    expect(screen.queryByText("true")).toBeNull();
  });

  it("조건이 undefined이면 falseRender를 렌더링한다", () => {
    render(
      <If
        condition={undefined}
        trueRender={<div>true</div>}
        falseRender={<div>false</div>}
      />
    );
    expect(screen.getByText("false")).toBeDefined();
    expect(screen.queryByText("true")).toBeNull();
  });

  it("조건이 NaN이면 falseRender를 렌더링한다", () => {
    render(
      <If
        condition={NaN}
        trueRender={<div>true</div>}
        falseRender={<div>false</div>}
      />
    );
    expect(screen.getByText("false")).toBeDefined();
    expect(screen.queryByText("true")).toBeNull();
  });

  it("조건이 Infinity이면 trueRender를 렌더링한다", () => {
    render(
      <If
        condition={Infinity}
        trueRender={<div>true</div>}
        falseRender={<div>false</div>}
      />
    );
    expect(screen.getByText("true")).toBeDefined();
    expect(screen.queryByText("false")).toBeNull();
  });

  it("조건이 -Infinity이면 trueRender를 렌더링한다", () => {
    render(
      <If
        condition={-Infinity}
        trueRender={<div>true</div>}
        falseRender={<div>false</div>}
      />
    );
    expect(screen.getByText("true")).toBeDefined();
    expect(screen.queryByText("false")).toBeNull();
  });

  it("조건이 객체이면 trueRender를 렌더링한다", () => {
    render(
      <If
        condition={{}}
        trueRender={<div>true</div>}
        falseRender={<div>false</div>}
      />
    );
    expect(screen.getByText("true")).toBeDefined();
    expect(screen.queryByText("false")).toBeNull();
  });
});
