/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useDebounce } from "@fe-base/hooks";

export default function UseDebounceContainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [callCount, setCallCount] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [numberInput, setNumberInput] = useState(0);
  const debouncedNumber = useDebounce(numberInput, 800);

  const [delayValue, setDelayValue] = useState(500);
  const [customInput, setCustomInput] = useState("");
  const debouncedCustom = useDebounce(customInput, delayValue);

  // 검색어가 debounce되면 API 호출 시뮬레이션
  useEffect(() => {
    if (debouncedSearchTerm) {
      setCallCount((prev) => prev + 1);
      setSearchHistory((prev) => [
        `${new Date().toLocaleTimeString()}: "${debouncedSearchTerm}"`,
        ...prev.slice(0, 9),
      ]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div css={containerStyles}>
      <h2>useDebounce 훅 테스트</h2>

      {/* 예제 1: 검색 입력 */}
      <section css={sectionStyles}>
        <h3>예제 1: 검색 입력 (500ms delay)</h3>
        <p css={descriptionStyles}>
          입력을 멈춘 후 500ms가 지나면 API 호출이 실행됩니다.
        </p>

        <div css={cardStyles}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력하세요..."
            css={inputStyles}
          />

          <div css={statusGridStyles}>
            <div>
              <strong>현재 입력값:</strong>
              <span css={valueStyles()}>{searchTerm || "(비어있음)"}</span>
            </div>
            <div>
              <strong>Debounced 값:</strong>
              <span css={valueStyles("primary")}>
                {debouncedSearchTerm || "(비어있음)"}
              </span>
            </div>
            <div>
              <strong>API 호출 횟수:</strong>
              <span css={valueStyles("success")}>{callCount}회</span>
            </div>
          </div>

          {searchHistory.length > 0 && (
            <div css={historyStyles}>
              <strong>검색 히스토리:</strong>
              <ul>
                {searchHistory.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 예제 2: 숫자 입력 */}
      <section css={sectionStyles}>
        <h3>예제 2: 숫자 카운터 (800ms delay)</h3>
        <p css={descriptionStyles}>
          버튼 클릭을 멈춘 후 800ms가 지나면 값이 업데이트됩니다.
        </p>

        <div css={cardStyles}>
          <div css={counterContainerStyles}>
            <button
              onClick={() => setNumberInput((prev) => Math.max(0, prev - 1))}
              css={buttonStyles}
            >
              -
            </button>
            <div css={counterDisplayStyles}>
              <div>입력: {numberInput}</div>
              <div css={debouncedDisplayStyles}>
                Debounced: {debouncedNumber}
              </div>
            </div>
            <button
              onClick={() => setNumberInput((prev) => prev + 1)}
              css={buttonStyles}
            >
              +
            </button>
          </div>

          <div css={statusGridStyles}>
            <div>
              <strong>즉시 반영:</strong>
              <span css={valueStyles()}>{numberInput}</span>
            </div>
            <div>
              <strong>800ms 후 반영:</strong>
              <span css={valueStyles("primary")}>{debouncedNumber}</span>
            </div>
            <div>
              <strong>차이:</strong>
              <span css={valueStyles("warning")}>
                {numberInput - debouncedNumber}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 예제 3: 커스텀 delay */}
      <section css={sectionStyles}>
        <h3>예제 3: 커스텀 Delay 시간</h3>
        <p css={descriptionStyles}>
          delay 값을 변경하여 다른 시간으로 테스트할 수 있습니다.
        </p>

        <div css={cardStyles}>
          <div css={delayControlStyles}>
            <label>
              <strong>Delay 시간:</strong>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={delayValue}
                onChange={(e) => setDelayValue(Number(e.target.value))}
                css={rangeStyles}
              />
              <span css={valueStyles("primary")}>{delayValue}ms</span>
            </label>
          </div>

          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="입력해보세요..."
            css={inputStyles}
          />

          <div css={statusGridStyles}>
            <div>
              <strong>현재 입력:</strong>
              <span css={valueStyles()}>{customInput || "(비어있음)"}</span>
            </div>
            <div>
              <strong>Debounced ({delayValue}ms):</strong>
              <span css={valueStyles("primary")}>
                {debouncedCustom || "(비어있음)"}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const containerStyles = css`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;
`;

const sectionStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin: 0;
  }
`;

const descriptionStyles = css`
  color: #6b7280;
  margin: 0;
  font-size: 0.875rem;
`;

const cardStyles = css`
  background-color: white;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const inputStyles = css`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const statusGridStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 6px;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  strong {
    font-size: 0.875rem;
    color: #6b7280;
  }
`;

const valueStyles = (variant?: "primary" | "success" | "warning") => css`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${variant === "primary"
    ? "#3b82f6"
    : variant === "success"
    ? "#10b981"
    : variant === "warning"
    ? "#f59e0b"
    : "#111827"};
`;

const historyStyles = css`
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 6px;

  strong {
    display: block;
    margin-bottom: 0.5rem;
    color: #374151;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 200px;
    overflow-y: auto;

    li {
      padding: 0.5rem;
      border-bottom: 1px solid #e5e7eb;
      font-size: 0.875rem;
      color: #6b7280;

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const counterContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const buttonStyles = css`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #2563eb;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const counterDisplayStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 150px;

  div {
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const debouncedDisplayStyles = css`
  color: #3b82f6;
  font-size: 1.5rem !important;
`;

const delayControlStyles = css`
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 6px;

  label {
    display: flex;
    align-items: center;
    gap: 1rem;

    strong {
      min-width: 100px;
    }
  }
`;

const rangeStyles = css`
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      background: #2563eb;
      transform: scale(1.2);
    }
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border: none;

    &:hover {
      background: #2563eb;
      transform: scale(1.2);
    }
  }
`;
