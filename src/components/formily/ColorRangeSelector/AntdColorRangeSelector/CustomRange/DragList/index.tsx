import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './index.less';

interface DragListProps<P> {
  itemStyle?: React.CSSProperties | ((dataset: P) => React.CSSProperties);
  dragIcon?: JSX.Element;
  items: Record<string, any>[];
  onDrag: (newItems: any[]) => void;
  children: (item: P, icon: JSX.Element) => JSX.Element;
}

function DragList<P extends Record<string, any>>({ children, itemStyle, items, onDrag, dragIcon }: DragListProps<P>) {
  const prefixCls = usePrefixCls('formily-drag-list');

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (result.destination) {
        const newItems = [...items];
        const sourceIndex = result.source.index;
        const targetIndex = result.destination.index;
        const [item] = newItems.splice(sourceIndex, 1);
        newItems.splice(targetIndex, 0, item);
        onDrag(newItems);
      }
    },
    [items, onDrag],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="dropable" direction="vertical">
        {(provided: any) => (
          <div className={`${prefixCls}`} ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item: any, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(itemProvided: any, itemSnapshot: any) => {
                  return (
                    <div
                      {...itemProvided.draggableProps}
                      ref={itemProvided.innerRef}
                      className={classNames(`${prefixCls}__item`, {
                        [`${prefixCls}__item`]: itemSnapshot.isDragging,
                      })}
                      style={{
                        ...(itemStyle instanceof Function ? itemStyle?.(item) : {}),
                        ...(itemProvided.draggableProps.style ?? {}),
                      }}
                      key={item.id}
                    >
                      {children(
                        item,
                        <i {...itemProvided.dragHandleProps} className={`${prefixCls}__item-icon`}>
                          {dragIcon}
                        </i>,
                      )}
                    </div>
                  );
                }}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragList;
