import React from "react";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
  center?: boolean;
  style?: React.CSSProperties;
}

export function Wrapper({ children, center, style }: Props) {
  const Wrapper = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    justify-content: ${() => center ? "center" : "flex-start"};
  `;
  return <Wrapper style={style}>{children}</Wrapper>;
}
