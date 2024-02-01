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
  title,
  type,
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
      data: {
        id,
        type,
        title
      }
    });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={title}
      dragging={false}
      handle={handle}
      handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={style({
        index,
        value: title,
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
