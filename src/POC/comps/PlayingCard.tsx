import React, { forwardRef } from "react";
import styled from "@emotion/styled";

export interface Props {
  value: string;
  index: number;
  transform: {
    x: number;
    y: number;
  } | null;
  transition: string;
  fadeIn: boolean;
  style?: React.CSSProperties;
  isPickedUp?: boolean;
  isDragging: boolean;
  isSorting: boolean;
  mountAnimation?: boolean;
}

// just the playing card nothing to refactior, it just checks if it moves and give it the proper transforms and if is picked up just scales it

export const PlayingCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      value,
      isDragging,
      isSorting,
      mountAnimation,
      fadeIn,
      isPickedUp,
      style,
      index,
      transform,
      transition,
      ...props
    },
    ref
  ) => {
    const Card = styled.div`
      position: relative;
      width: 140px;
      height: 180px;
    `;

    const PlayingCard = styled.div`
      display: flex;
      width: 140px;
      height: 180px;
      background-color: #fff;
      box-shadow: 1px 1px 0 1px #f9f9fb, -1px 0 28px 0 rgba(34, 33, 81, 0.01),
        54px 54px 28px -10px rgba(34, 33, 81, 0.15);
      border-radius: 24px;
      font-size: 25px;
      font-family: "Roboto Slab", Helvetica, sans-serif;
      user-select: none;

      &:hover:not(.pickedUp) {
        --translate-x: 5px;
      }

      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px #4c9ffe, 1px 1px 0 1px #f9f9fb,
          -1px 0 28px 0 rgba(34, 33, 81, 0.01);
      }

      & > sup,
      sub {
        position: absolute;
        font-size: 17px;
      }

      & > strong {
        position: relative;
        left: -5px;
        margin: 0 auto;
        align-self: center;
        font-size: 50px;
      }

      & > sup {
        left: 20px;
        top: 20px;
      }

      & > sub {
        right: 20px;
        bottom: 20px;
      }
    `;

    console.log(style);
    return (
      <Card ref={ref}>
        <PlayingCard tabIndex={0} {...props}>
          <sup>{value}</sup>
          <strong>{value[value.length - 1]}</strong>
          <sub>{value}</sub>
        </PlayingCard>
      </Card>
    );
  }
);
