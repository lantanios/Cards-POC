import React, { forwardRef } from "react";
import styled from "@emotion/styled";

export interface Props {
  children: React.ReactNode;
  columns?: number;
  style?: React.CSSProperties;
  horizontal?: boolean;
}

export const List = forwardRef<HTMLUListElement, Props>(
  ({ children, horizontal }: Props, ref) => {
    const List = styled.ul`
      display: grid;
      grid-auto-rows: max-content;
      box-sizing: border-box;
      min-width: 350px;
      grid-gap: 10px;
      padding: 20px;
      padding-bottom: 0;
      margin: 10px;
      border-radius: 5px;
      min-height: 200px;
      transition: background-color 350ms ease;
      grid-template-columns: repeat(var(--columns, 1), 1fr);

      &:after {
        content: "";
        height: 10px;
        grid-column-start: span var(--columns, 1);
      }

      ${() =>
        horizontal
          ? `width: 100%; 
        grid-auto-flow: column`
          : ""}
    `;
    return <List ref={ref}>{children}</List>;
  }
);
