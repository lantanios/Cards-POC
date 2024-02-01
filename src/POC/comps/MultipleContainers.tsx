import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CancelDrop,
  DndContext,
  DragOverlay,
  DropAnimation,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  Modifiers,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  KeyboardCoordinateGetter,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { coordinateGetter as multipleContainersCoordinateGetter } from "./multipleContainersKeyboardCoordinates";
import { Item } from "./Item";
import { DroppableContainer } from "./container/DropableContainer";
import { SortableItem } from "./sortableItem/SortableItem";
import { DraggableItem } from "./draggableItem/DraggableItem";
import { IToolBox, toolItems } from "../functions/getDeckOfCards";
import { nanoid } from "nanoid";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

interface Props {
  adjustScale?: boolean;
  items?: IToolBox[];
  renderItem?: any;
  containerStyle?: React.CSSProperties;
  minimal?: boolean;
  cancelDrop?: CancelDrop;
  columns?: number;
  coordinateGetter?: KeyboardCoordinateGetter;
  onResize?: any;
  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: { index: number }): React.CSSProperties;
  itemCount?: number;
  handle?: boolean;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  scrollable?: boolean;
  vertical?: boolean;
}

export function MultipleContainers({
  adjustScale = false,
  cancelDrop,
  columns,
  handle = false,
  items: initialItems,
  containerStyle,
  coordinateGetter = multipleContainersCoordinateGetter,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  minimal = false,
  modifiers,
  renderItem,
  strategy = verticalListSortingStrategy,
  vertical = false,
  scrollable,
}: Props) {
  const [items, setItems] = useState<IToolBox[]>([]);
  const [active, setActive] = useState<IToolBox | null>(null);
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  );
  const recentlyMovedToNewContainer = useRef(false);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    if (container === "D") {
      return items.findIndex((item) => item.id === id);
    } else {
      return items.findIndex((item) => item.id === id);
    }
  };

  const findContainer = (id: UniqueIdentifier) => {
    return toolItems.find((item) => item.id === id) ? "C" : "D";
  };

  function handleDragEnd(event: any) {
    const activeContainer = findContainer(event.active.id);
    const overContainer = findContainer(event.over.id);

    if (
      event.over.id &&
      event.active.id &&
      overContainer !== "C" &&
      activeContainer === overContainer
    ) {
      const activeIndex = items.findIndex(({ id }) => id === event.active.id);
      const overIndex = items.findIndex(({ id }) => id === event.over.id);

      setItems(arrayMove(items, activeIndex, overIndex));
      return;
    }

    if (event.over) {
      let newElements: any = [
        ...items,
        {
          title: [event.active.data.current.title],
          id: nanoid(10),
          type: [event.active.data.current.type],
        },
      ];
      setItems(newElements);
    }
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  return (
    <DndContext
      sensors={sensors}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({ active }) => {
        setActive(active.data.current as IToolBox);
      }}
      onDragEnd={handleDragEnd}
      cancelDrop={cancelDrop}
      modifiers={modifiers}
    >
      <div
        style={{
          display: "inline-grid",
          boxSizing: "border-box",
          padding: 20,
          gridAutoFlow: vertical ? "row" : "column",
        }}
      >
        <SortableContext
          items={["D"]}
          strategy={
            vertical
              ? verticalListSortingStrategy
              : horizontalListSortingStrategy
          }
        >
          <DroppableContainer
            key={"C"}
            id={"C"}
            label={minimal ? undefined : `Column ${"C"}`}
            columns={columns}
            items={toolItems}
            scrollable={scrollable}
            style={containerStyle}
            unstyled={minimal}
          >
            {toolItems.map((item, index) => {
              return (
                <DraggableItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  type={item.type}
                  index={index}
                  handle={handle}
                  style={getItemStyles}
                  wrapperStyle={wrapperStyle}
                  renderItem={renderItem}
                  containerId="C"
                />
              );
            })}
          </DroppableContainer>
          <DroppableContainer
            key={"D"}
            id={"D"}
            label={minimal ? undefined : `Column ${"D"}`}
            columns={columns}
            items={items}
            scrollable={scrollable}
            style={containerStyle}
            unstyled={minimal}
          >
            <SortableContext items={items} strategy={strategy}>
              {items.map((item, index) => {
                return (
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    index={index}
                    title={item.title}
                    type={item.type}
                    handle={handle}
                    style={getItemStyles}
                    wrapperStyle={wrapperStyle}
                    renderItem={renderItem}
                    containerId={"D"}
                  />
                );
              })}
            </SortableContext>
          </DroppableContainer>
        </SortableContext>
      </div>

      {/* this just makes the effect of the card being over all the others */}
      {createPortal(
        <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
          {active ? renderSortableItemDragOverlay(active) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );

  function renderSortableItemDragOverlay(active: IToolBox) {
    return (
      <Item
        value={active.title}
        handle={handle}
        style={getItemStyles({
          containerId: "D",
          overIndex: -1,
          index: getIndex(active.id),
          value: active.title,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true,
        })}
        wrapperStyle={wrapperStyle({ index: 0 })}
        renderItem={renderItem}
        dragOverlay
      />
    );
  }
}
