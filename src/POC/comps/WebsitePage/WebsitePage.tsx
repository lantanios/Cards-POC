import React from 'react'
import { DroppableContainer } from '../container/DropableContainer';
import { IToolBox } from '../../functions/getStarterItems';
import { SortableContext, SortingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../sortableItem/SortableItem';
import { UniqueIdentifier } from '@dnd-kit/core';

const WebsitePage = ({
  minimal,
  columns = 1,
  items,
  scrollable,
  containerStyle,
  strategy = verticalListSortingStrategy,
  handle = false,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  renderItem
}: {
  minimal: boolean,
  columns?: number,
  items: IToolBox[],
  scrollable?: boolean,
  containerStyle?: React.CSSProperties,
  strategy?: SortingStrategy;
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
  );
}

export default WebsitePage