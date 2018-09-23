import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const ItemList = (props) => {
    const itemNode = props.items.map(item => (
        <Item item={item.itemId} name={item.name} due={item.dueBy}/>
    ));
    return (
        <div>
            {itemNode}
        </div>
    );
};

ItemList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        item: PropTypes.number,
        name: PropTypes.string,
        due: PropTypes.string,
    })),
};

export default ItemList;