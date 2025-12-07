/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { useRef, useState } from "react";
import { useClickOutside } from "@fe-base/hooks";

export default function UseClickOutsideContainer() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [closeCount, setCloseCount] = useState(0);

  useClickOutside(boxRef as React.RefObject<HTMLDivElement>, () => {
    if (isOpen) {
      setIsOpen(false);
      setCloseCount((prev) => prev + 1);
    }
  });

  return (
    <div css={pageStyles}>
      <header>
        <h2>useClickOutside 훅 데모</h2>
        <p>
          지정한 영역 밖을 클릭하면 자동으로 닫히는 박스를 만들어 훅의 동작을
          확인할 수 있습니다.
        </p>
      </header>

      <section css={cardStyles}>
        <div css={controlRowStyles}>
          <button css={primaryButtonStyles} onClick={() => setIsOpen(true)}>
            박스 열기
          </button>
          <button
            css={secondaryButtonStyles}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? "접기" : "토글"}
          </button>
          <span css={pillStyles}>외부 클릭으로 닫힌 횟수: {closeCount}회</span>
        </div>

        <div css={playgroundStyles}>
          {isOpen ? (
            <div ref={boxRef} css={floatingBoxStyles}>
              <h4>Outside 클릭으로 닫힘</h4>
              <p>이 영역 밖을 클릭하면 useClickOutside가 닫아줍니다.</p>
              <div css={chipRowStyles}>
                <span css={chipStyles}>focus trap 없음</span>
                <span css={chipStyles}>리스너 자동 정리</span>
                <span css={chipStyles}>모달 · 드롭다운에 활용</span>
              </div>
            </div>
          ) : (
            <div css={placeholderStyles}>박스를 열어보세요</div>
          )}
        </div>
      </section>
    </div>
  );
}

const pageStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  max-width: 960px;
  width: 100%;

  header h2 {
    margin: 0 0 0.25rem 0;
    font-size: 1.75rem;
    color: #111827;
  }

  header p {
    margin: 0;
    color: #6b7280;
  }
`;

const cardStyles = css`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const controlRowStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
`;

const primaryButtonStyles = css`
  padding: 0.75rem 1.1rem;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(37, 99, 235, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const secondaryButtonStyles = css`
  padding: 0.75rem 1rem;
  background: #111827;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;

  &:hover {
    background: #0b1221;
    transform: translateY(-1px);
  }
`;

const pillStyles = css`
  background: #f3f4f6;
  color: #374151;
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid #e5e7eb;
`;

const playgroundStyles = css`
  position: relative;
  min-height: 260px;
  border: 1px dashed #d1d5db;
  border-radius: 12px;
  background: repeating-linear-gradient(
      45deg,
      rgba(59, 130, 246, 0.05),
      rgba(59, 130, 246, 0.05) 12px,
      transparent 12px,
      transparent 24px
    ),
    white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
`;

const floatingBoxStyles = css`
  background: #0f172a;
  color: #e5e7eb;
  padding: 1.2rem 1.4rem;
  border-radius: 12px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.35);
  max-width: 520px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);

  h4 {
    margin: 0 0 0.3rem 0;
    font-size: 1.1rem;
    color: #cbd5e1;
  }

  p {
    margin: 0 0 0.9rem 0;
    color: #94a3b8;
  }
`;

const chipRowStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const chipStyles = css`
  background: rgba(59, 130, 246, 0.12);
  color: #bfdbfe;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  font-size: 0.85rem;
  border: 1px solid rgba(59, 130, 246, 0.25);
`;

const placeholderStyles = css`
  color: #6b7280;
  font-weight: 600;
  background: #f8fafc;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
`;
