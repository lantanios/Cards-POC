import { useEffect, useState } from "react";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { MultipleContainers } from "./comps/MultipleContainers";
import { PlayingCard } from "./comps/Card/PlayingCard";
import { toolItems } from "./functions/getStarterItems";


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
