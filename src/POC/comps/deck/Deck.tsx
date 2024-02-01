import { useState } from "react";
import { getDeckOfCards } from "../../functions/getDeckOfCards";
import { Sortable } from "../Sortable";
import { PlayingCard } from "../PlayingCard";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";

export const SingleDeck = () => {
  const [deck] = useState(getDeckOfCards);

  return (
    <div style={{ position: "relative", marginTop: 50, paddingBottom: 250 }}>
      <Sortable
        strategy={verticalListSortingStrategy}
        items={deck.map(({ suit, value }) => `${value}${suit}`)}
        renderItem={({
          dragging,
          value,
          dragOverlay,
          listeners,
          ref,
          style,
          index,
          sorting,
          transform,
          transition,
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
            {...listeners}
          />
        )}
        getItemStyles={({ isDragging, isDragOverlay }) => ({
          opacity: isDragging && !isDragOverlay ? 0.3 : undefined,
        })}
      />
    </div>
  );
};
