import { useEffect, useState } from "react";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { MultipleContainers } from "./comps/MultipleContainers";
import { PlayingCard } from "./comps/Card/PlayingCard";
import { UniqueIdentifier } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { toolItems } from "./functions/getStarterItems";

function stringifyDeck(
  deck: {
    value: string;
    suit: string;
    id: UniqueIdentifier
  }[],
  prefix: string,
  id: UniqueIdentifier
) {
  return deck.map(({ suit, value, id }) => {
    return {
      value:`${prefix}-${value}${suit}`,
      id: id
    }
  });
}

export const MultipleDecksPOC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <MultipleContainers
      strategy={rectSortingStrategy}
      items={toolItems}
      renderItem={({
        value,
        dragOverlay,
        dragging,
        sorting,
        index,
        listeners,
        ref,
        style,
        transform,
        transition,
        fadeIn,
      }: any) => (
        <PlayingCard
          value={value}
          isDragging={dragging}
          isPickedUp={dragOverlay}
          isSorting={sorting}
          ref={ref}
          style={style}
          index={index}
          transform={transform}
          transition={transition}
          mountAnimation={!dragOverlay && !isMounted}
          fadeIn={fadeIn}
          {...listeners}
        />
      )}
      containerStyle={{
        position: "relative",
        flexShrink: 0,
        width: 330,
        margin: "20px 20px",
      }}
      minimal
    />
  );
};
