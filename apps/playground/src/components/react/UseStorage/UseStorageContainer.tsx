/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { useStorage } from "@fe-base/hooks";

export default function UseStorageContainer() {
  const [nickname, setNickname] = useStorage<string>({
    key: "demo:nickname",
    initialValue: "Guest",
  });

  const [darkMode, setDarkMode] = useStorage<boolean>({
    key: "demo:darkMode",
    initialValue: false,
  });

  const [visitCount, setVisitCount] = useStorage<number>({
    key: "demo:visitCount",
    initialValue: 1,
  });

  return (
    <div css={pageStyles}>
      <header>
        <h2>useStorage 훅 데모</h2>
        <p>값을 입력하거나 토글하면 localStorage에도 바로 반영됩니다.</p>
      </header>

      <section css={cardStyles}>
        <div css={rowStyles}>
          <label css={labelStyles}>닉네임</label>
          <input
            css={inputStyles}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
        </div>

        <div css={rowStyles}>
          <label css={labelStyles}>다크 모드</label>
          <button
            css={toggleButtonStyles(darkMode)}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "ON" : "OFF"}
          </button>
        </div>

        <div css={rowStyles}>
          <label css={labelStyles}>방문 횟수</label>
          <div css={counterStyles}>
            <button onClick={() => setVisitCount(Math.max(0, visitCount - 1))}>
              -
            </button>
            <span>{visitCount}</span>
            <button onClick={() => setVisitCount(visitCount + 1)}>+</button>
          </div>
        </div>
      </section>

      <section css={storageCardStyles}>
        <div>
          <p css={metaLabelStyles}>localStorage</p>
          <code css={codeStyles}>demo:nickname</code>
          <div css={valueBoxStyles}>{nickname}</div>
        </div>
        <div>
          <p css={metaLabelStyles}>localStorage</p>
          <code css={codeStyles}>demo:darkMode</code>
          <div css={valueBoxStyles}>{String(darkMode)}</div>
        </div>
        <div>
          <p css={metaLabelStyles}>localStorage</p>
          <code css={codeStyles}>demo:visitCount</code>
          <div css={valueBoxStyles}>{visitCount}</div>
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
`;

const rowStyles = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
`;

const labelStyles = css`
  font-weight: 600;
  color: #374151;
  min-width: 100px;
`;

const inputStyles = css`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 1rem;
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
`;

const toggleButtonStyles = (active: boolean) => css`
  min-width: 80px;
  padding: 0.65rem 1rem;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  color: white;
  background: ${active
    ? "linear-gradient(135deg, #10b981, #34d399)"
    : "#9ca3af"};
  box-shadow: ${active ? "0 10px 25px rgba(16, 185, 129, 0.25)" : "none"};
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const counterStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: none;
    background: #3b82f6;
    color: white;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.15s ease;

    &:hover {
      transform: translateY(-1px);
    }
  }

  span {
    min-width: 40px;
    text-align: center;
    font-weight: 700;
    font-size: 1.1rem;
  }
`;

const storageCardStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const metaLabelStyles = css`
  margin: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
`;

const codeStyles = css`
  display: inline-block;
  margin: 0.15rem 0 0.35rem;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  background: #111827;
  color: #f3f4f6;
  font-size: 0.85rem;
`;

const valueBoxStyles = css`
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0.75rem;
  font-weight: 700;
  color: #111827;
`;
