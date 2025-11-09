"use client";

import { ImpressionArea } from "@fe-base/react";

const HALF_SCORE_THRESHOLD = 0.5;

export default function ImpressionAreaContainer() {
  return (
    <>
      <DummyListSection />
      <ImpressionArea
        threshold={HALF_SCORE_THRESHOLD}
        onImpressionStart={() => alert("보임!")}
      >
        <div
          style={{ width: "100%", height: "200px", backgroundColor: "blue" }}
        >
          이 영역의 절반이 보이면 onImpressionStart가 실행됩니다
        </div>
      </ImpressionArea>
    </>
  );
}

const DummyListSection = () => {
  return (
    <div>
      {Array.from({ length: 50 }, (_, index) => (
        <div key={index}>DummyListSection {index + 1}</div>
      ))}
    </div>
  );
};
