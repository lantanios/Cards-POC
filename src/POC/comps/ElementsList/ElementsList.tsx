import React from 'react'
import { DroppableContainer } from '../container/DropableContainer';
import { toolItems } from '../../functions/getStarterItems';
import { UniqueIdentifier } from '@dnd-kit/core';
import { DraggableItem } from '../draggableItem/DraggableItem';

const ElementsList = ({
  minimal,
  columns = 1,
  scrollable,
  containerStyle,
  handle = false,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  renderItem
}: {
  minimal: boolean,
  columns?: number,
  scrollable?: boolean,
  containerStyle?: React.CSSProperties,
  handle?: boolean;
  renderItem?: any;
  wrapperStyle?(args: { index: number }): React.CSSProperties;
  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
}) => {
  return (
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
  );
}

export default ElementsList