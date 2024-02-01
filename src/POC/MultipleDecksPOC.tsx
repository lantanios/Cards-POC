import { useEffect, useState } from "react";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { MultipleContainers } from "./comps/MultipleContainers";
import { PlayingCard } from "./comps/PlayingCard";
import { getDeckOfCards } from "./functions/getDeckOfCards";

function stringifyDeck(
  deck: {
    value: string;
    suit: string;
  }[],
  prefix: string
) {
  return deck.map(({ suit, value }) => `${prefix}-${value}${suit}`);
}

export const MultipleDecksPOC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [decks] = useState(() => {
    // here we put the deck in a state but its just a try so we don't want the 52 cards so we only get 13 of the same colors
    const deck = getDeckOfCards();
    // const deckA = deck.slice(0, 13);
    // const deckB = deck.slice(13, 26);
    const deckC = deck.slice(26, 39);
    // const deckD = deck.slice(39, 52);

    return {
      // A: stringifyDeck(deckA, "A"),
      // B: stringifyDeck(deckB, "B"),
      C: stringifyDeck(deckC, "C"),
      D: [], // stringifyDeck(deckD, 'D'),
    };
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <MultipleContainers
      strategy={rectSortingStrategy}
      items={decks}
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
          value={value.substring(2, value.length)}
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
