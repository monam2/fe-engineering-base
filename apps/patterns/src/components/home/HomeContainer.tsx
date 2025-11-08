/** @jsxImportSource @emotion/react */
"use client";

import Link from "next/link";
import { css } from "@emotion/react";
import { isEmpty } from "@fe-base/utils";

export default function HomeContainer() {
  return (
    <main css={mainContainerStyles}>
      <h1>Fe Engineering Patterns</h1>
      <PatternsList
        patterns={[
          { name: "Presentation Container", href: "/presentation-container" },
        ]}
      />
    </main>
  );
}

interface PatternListProps {
  patterns: { name: string; href: string }[];
}

function PatternsList({ patterns }: PatternListProps) {
  if (isEmpty(patterns)) {
    return <div>No patterns found</div>;
  }

  return (
    <ul>
      {patterns.map((pattern) => (
        <button key={pattern.name}>
          <Link href={pattern.href}>{pattern.name}</Link>
        </button>
      ))}
    </ul>
  );
}

const mainContainerStyles = css`
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`;
