/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main css={mainContainerStyles}>
      <header>
        <h1>Fe Engineering Playground</h1>
      </header>
      <main>{children}</main>
    </main>
  );
}

const mainContainerStyles = css`
  padding: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
