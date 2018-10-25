import React from 'react';
import PropTypes from 'prop-types';


const ItemForm = props => (
    <form onSubmit={props.submitTodo}>
        <input
            type="text"
            name="itemName"
            placeholder="Item Todo"
            value={props.itemName}
            onChange={props.txtChange}
        /><br/>
        <input
            type="text"
            name="dueBy"
            placeholder="Due By"
            value={props.dueBy}
            onChange={props.txtChange}
        /><br/>
        <button type="submit">Submit</button>
    </form>
);

ItemForm.propTypes = {
    submitItem: PropTypes.func.isRequired,
    txtChange: PropTypes.func.isRequired,
    itemName: PropTypes.string,
    dueBy: PropTypes.string,
};

ItemForm.defaultProps = {
    itemName: '',
    dueBy: '',
};

export default ItemForm;