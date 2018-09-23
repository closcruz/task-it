import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Item = props => (
    <div className="singleItem">
        <div className="singleItemText">
            {props.name} | {props.dueBy}
        </div>
    </div>
);

Item.propTypes = {
    name: PropTypes.string.isRequired,
    due: PropTypes.string.isRequired,
};

export default Item;