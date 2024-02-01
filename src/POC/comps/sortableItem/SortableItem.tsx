import { UniqueIdentifier } from "@dnd-kit/core";
import { Item } from "../Item";
import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { getColor } from "../../functions/itemsHelpers";
import { IToolBox } from "../../functions/getStarterItems";

export interface SortableItemProps {
  containerId: UniqueIdentifier;
  id: UniqueIdentifier;
  title: string,
  type: string
  index: number;
  handle: boolean;
  disabled?: boolean;
  style(args: any): React.CSSProperties;
  renderItem(): React.ReactElement;
  wrapperStyle({ index }: { index: number }): React.CSSProperties;
}

export function SortableItem({
  disabled,
  id,
  title,
  type,
  index,
  handle,
  renderItem,
  style,
  containerId,
  wrapperStyle,
}: SortableItemProps) {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    isDragging,
    isSorting,
    transform,
    transition,
  } = useSortable({
    id,
    data: {
      id,
      title,
      type
    }
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={title}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={style({
        index,
        value: title,
        isDragging,
        isSorting,
        containerId,
      })}
      color={getColor(id)}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      renderItem={renderItem}
    />
  );
}

export function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  return isMounted;
}
