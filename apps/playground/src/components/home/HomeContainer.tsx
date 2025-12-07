/** @jsxImportSource @emotion/react */
"use client";

import Link from "next/link";
import { css } from "@emotion/react";

import { isEmpty } from "@fe-base/utils";

export default function HomeContainer() {
  return (
    <PatternsList
      patterns={[
        { name: "Impression Area", href: "/react/impression-area" },
        { name: "Row Section", href: "/react/row-section" },
        { name: "useDebounce Hook", href: "/react/use-debounce" },
        { name: "useClickOutside Hook", href: "/react/use-click-outside" },
        { name: "useStorage Hook", href: "/react/use-storage" },
      ]}
    />
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
    <ul css={patternsListStyles}>
      {patterns.map((pattern) => (
        <LinkButton
          key={pattern.name}
          name={pattern.name}
          href={pattern.href}
        />
      ))}
    </ul>
  );
}

const LinkButton = ({ name, href }: { name: string; href: string }) => {
  return (
    <Link href={href}>
      <button>{name}</button>
    </Link>
  );
};

const patternsListStyles = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
