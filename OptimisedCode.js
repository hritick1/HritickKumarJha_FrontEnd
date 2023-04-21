import React, { useState,useCallback, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = memo(({// O5. used memo here without creating a differnt variable and returning it
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
});

WrappedSingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,// O2.Added is required to index,text,isSelected as it is neccesary for the user to send it.
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};



// List Component
const WrappedListComponent = memo(({// O5. used memo here without creating a differnt variable and returning it
  items=[]  //7.Added a default value empty array to items
}) => {
    //3. changed position of selectedIndex with setSelectedIndex
  const [selectedIndex, setSelectedIndex] = useState();
   
  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = useCallback(index =>{// O1.Here I have used useCallBack to use the previous value if their no change in values
   if(selectedIndex!==index) {// O3.Here I used the if check to check if selected index is not equal to index then only change the state 
    setSelectedIndex(index);
   }
  },
  [setSelectedIndex]);

  return (
    <ul style={{ textAlign: 'left' }}>
{/*2. Added a null check here using && */}
      {items?.map((item, index) => (  // O4.Here I added chaining operator in item.map to prevent errors due to null items
        <WrappedSingleListItem
        key={index}  //5. Added a key value of index to list item
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}  
          isSelected={selectedIndex===index}  //4.Provided boolean value to isSelected if selected index matches index value
        />
      ))}
    </ul>
  )
});

WrappedListComponent.propTypes = {
                 //1.changed array to arrayOf ,changed shapeOf to shape
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: null,
};



export default WrappedListComponent;