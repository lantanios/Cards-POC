import React, { useEffect, useRef, useState } from "react";
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
  arrayMove,
  SortingStrategy,
} from "@dnd-kit/sortable";
import { coordinateGetter as multipleContainersCoordinateGetter } from "./multipleContainersKeyboardCoordinates";
import { Item } from "./Item";
import { IToolBox, toolItems } from "../functions/getStarterItems";
import { nanoid } from "nanoid";
import WebsitePage from "./WebsitePage/WebsitePage";
import ElementsList from "./ElementsList/ElementsList";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export interface IContainersProps {
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
  coordinateGetter = multipleContainersCoordinateGetter,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  minimal = false,
  modifiers,
  renderItem,
  vertical = false,
  scrollable,
}: IContainersProps) {
  const [items, setItems] = useState<IToolBox[]>([]);
  const [active, setActive] = useState<IToolBox | null>(null);
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

    if (overContainer === "C") {
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
          <ElementsList
            minimal={minimal}
            key={"C"}
            columns={columns}
            scrollable={scrollable}
            handle={handle}
            wrapperStyle={wrapperStyle}
            renderItem={renderItem}
          />
          <WebsitePage
            minimal={minimal}
            key={"D"}
            columns={columns}
            items={items}
            scrollable={scrollable}
            handle={handle}
            wrapperStyle={wrapperStyle}
            renderItem={renderItem}
          />
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
