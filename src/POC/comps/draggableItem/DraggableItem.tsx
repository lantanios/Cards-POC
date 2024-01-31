import { useDraggable } from "@dnd-kit/core";
import {
  SortableItemProps,
  useMountStatus,
} from "../sortableItem/SortableItem";
import { Item } from "../Item";
import { getColor } from "../../functions/itemsHelpers";

export function DraggableItem({
  disabled,
  id,
  index,
  handle,
  renderItem,
  style,
  containerId,
  wrapperStyle,
}: SortableItemProps) {
  const { setNodeRef, setActivatorNodeRef, listeners, isDragging, transform } =
    useDraggable({
      id,
    });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={id}
      dragging={false}
      handle={handle}
      handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={style({
        index,
        value: id,
        isDragging: false,
        containerId,
      })}
      color={getColor(id)}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      renderItem={renderItem}
    />
  );
}
