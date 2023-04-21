import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={()=>{ onClickHandler(index);}}//6. Created a arrow function to manage the onClickHandler
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items=[]  //7.Added a default value empty array to items
}) => {
    //3. changed position of selectedIndex with setSelectedIndex
  const [selectedIndex, setSelectedIndex] = useState();
   
  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
{/*2. Added a null check here using && */}
      {items && items.map((item, index) => (
        <SingleListItem
        key={index}  //5. Added a key value of index to list item
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}  
          isSelected={selectedIndex===index}  //4.Provided boolean value to isSelected if selected index matches index value
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
                 //1.changed array to arrayOf ,changed shapeOf to shape
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;