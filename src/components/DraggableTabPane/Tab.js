import React, { useRef } from 'react';

import IconButton from 'components/IconButton.js';
import { Text } from 'components/Text.js';
import { ItemTypes } from 'constant/ItemTypes';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';

const Tab = (props) => {
  const {
    id,
    key,
    text = '',
    className = '',
    textClassName = '',
    index,
    moveTab = () => {},
    onClick = () => {},
    onClose = () => {},
  } = props;
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.TAB,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get HORIZONTAL middle
      const hoverMiddleX =
        (hoverBoundingRect.left - hoverBoundingRect.right) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the RIGHT
      const hoverClientX = clientOffset.x - hoverBoundingRect.right;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging LEFT, only move when the cursor is below 50%
      // When dragging RIGHT, only move when the cursor is above 50%
      // Dragging LEFT
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      // Dragging RIGHT
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      // Time to actually perform the action
      moveTab(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TAB,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div key={key} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <div
        aria-hidden
        key={`tab-${id}`}
        onClick={onClick}
        className={`${className}`}
      >
        <Text
          weight="semibold"
          className={`p-2 h-full cursor-pointer w-full text-center ${textClassName}`}
        >
          {text}
        </Text>
        <IconButton
          icon={<i className="fa-solid fa-circle-xmark"></i>}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

Tab.propTypes = {
  id: PropTypes.number,
  key: PropTypes.number,
  text: PropTypes.string,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  index: PropTypes.number,
  moveTab: PropTypes.func,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
};

export default Tab;
