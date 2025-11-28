/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { RowSection } from "@fe-base/react";

export default function RowSectionContainer() {
  return (
    <div css={containerStyles}>
      <h2>RowSection 컴포넌트 테스트</h2>

      {/* 예제 1: 70:30 비율 */}
      <section css={sectionStyles}>
        <h3>70:30 비율 (2개)</h3>
        <RowSection ratio={[70, 30]}>
          <div css={boxStyles("#3b82f6")}>
            <p>Left (70%)</p>
            <p>사이드바 영역</p>
          </div>
          <div css={boxStyles("#10b981")}>
            <p>Right (30%)</p>
            <p>메인 컨텐츠 영역</p>
          </div>
        </RowSection>
      </section>

      {/* 예제 2: 50:50 비율 */}
      <section css={sectionStyles}>
        <h3>50:50 비율 (균등 분할)</h3>
        <RowSection ratio={[50, 50]}>
          <div css={boxStyles("#8b5cf6")}>
            <p>Left (50%)</p>
          </div>
          <div css={boxStyles("#ec4899")}>
            <p>Right (50%)</p>
          </div>
        </RowSection>
      </section>

      {/* 예제 3: 3개 컬럼 */}
      <section css={sectionStyles}>
        <h3>25:50:25 비율 (3개)</h3>
        <RowSection ratio={[25, 50, 25]}>
          <div css={boxStyles("#f59e0b")}>
            <p>Left (25%)</p>
          </div>
          <div css={boxStyles("#06b6d4")}>
            <p>Center (50%)</p>
          </div>
          <div css={boxStyles("#f43f5e")}>
            <p>Right (25%)</p>
          </div>
        </RowSection>
      </section>

      {/* 예제 4: 4개 컬럼 */}
      <section css={sectionStyles}>
        <h3>25:25:25:25 비율 (4개 균등)</h3>
        <RowSection ratio={[25, 25, 25, 25]}>
          <div css={boxStyles("#84cc16")}>1</div>
          <div css={boxStyles("#0ea5e9")}>2</div>
          <div css={boxStyles("#f97316")}>3</div>
          <div css={boxStyles("#a855f7")}>4</div>
        </RowSection>
      </section>

      {/* 예제 5: 실제 사용 예시 */}
      <section css={sectionStyles}>
        <h3>실제 사용 예시: 대시보드 레이아웃 (30:40:30)</h3>
        <RowSection ratio={[30, 40, 30]}>
          <div css={cardStyles}>
            <h4>통계</h4>
            <ul>
              <li>방문자: 1,234</li>
              <li>클릭: 567</li>
              <li>전환: 89</li>
            </ul>
          </div>
          <div css={cardStyles}>
            <h4>메인 차트</h4>
            <div
              css={css`
                height: 200px;
                background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
              `}
            >
              차트 영역
            </div>
          </div>
          <div css={cardStyles}>
            <h4>최근 활동</h4>
            <ul>
              <li>사용자 A 로그인</li>
              <li>사용자 B 구매</li>
              <li>사용자 C 가입</li>
            </ul>
          </div>
        </RowSection>
      </section>
    </div>
  );
}

const containerStyles = css`
  width: 100%;
  max-width: 1200px;
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
  }
`;

const boxStyles = (bgColor: string) => css`
  background-color: ${bgColor};
  color: white;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  text-align: center;
  font-weight: 600;

  p {
    margin: 0.25rem 0;
  }
`;

const cardStyles = css`
  background-color: white;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h4 {
    margin: 0 0 1rem 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #f3f4f6;
      color: #6b7280;

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;
