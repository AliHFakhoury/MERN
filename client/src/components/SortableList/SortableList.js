import React, { useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import AccordionItem from '../Accordion/AccordionItem';
import './SortableList.scss';

const DragHandle = SortableHandle(() => <span className="handle">::</span>);

const SortableItem = SortableElement(({ value }) => (
  <li className='sortableListItem'>
    <div>
      <DragHandle />
      <AccordionItem key={value} id={value}>
        <h1>{value}</h1>
        <h2>Value for {value}</h2>
      </AccordionItem>
    </div>
  </li>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

const MySortableList = () => {
  const [items, setItems] = useState(['one', 'two', 'three']);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <SortableList
      items={items}
      onSortEnd={onSortEnd}
      useDragHandle={true}
      helperClass="sortable-helper"
    />
  );
};

export default MySortableList;
