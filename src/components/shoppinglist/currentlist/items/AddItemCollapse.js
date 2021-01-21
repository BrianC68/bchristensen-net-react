import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import DepartmentOption from '../departments/DepartmentOption';
import { addItem } from '../../../../actions/listActions';
import SavedItemsList from './SavedItemsList';
import AddDepartmentModal from '../departments/AddDepartmentModal';
import DepartmentsList from '../departments/DepartmentsList'

const AddItemCollapse = ({ departments, currentListID, currentListUser, currentListShares, addItem, savedItems }) => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [department, setDepartment] = useState('');
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    M.AutoInit();
  });

  const onSetNotifications = (value) => {
    setNotifications(value);
  };

  const onAddItem = () => {
    if (item === '') {
      M.toast({ html: '<strong>Please enter an item!</strong>', displayLength: 6000, classes: "red lighten-3 black-text" });
    } else if (quantity === '') {
      M.toast({ html: '<strong>Please enter quantity!</strong>', displayLength: 6000, classes: "red lighten-3 black-text" });
    } else {
      const newItem = {
        user: currentListUser,
        shopping_list: currentListID,
        item: item,
        quantity: quantity,
        department: department,
        notifications: notifications,
      }
      addItem(newItem);
      setItem('');
      setQuantity('');
      setDepartment('');
    }
  }

  return (
    <div>
      {currentListShares.length > 0 ?
        <div class="switch" style={{ paddingLeft: 20 }}>
          <label>
            Send Notifications
                <input type="checkbox" onChange={() => onSetNotifications(!notifications)}></input>
            <span class="lever"></span>
          </label>
        </div>
        : ''
      }
      <ul className="collapsible">
        {/* Saved Items */}
        <li>
          <div className="collapsible-header"><i className="far fa-plus-square fa-2x indigo-text"></i> Saved Items</div>
          <div className="collapsible-body saved-items-collapse">
            <ul className="collection">
              {savedItems.length === 0 ?
                <li className="collection-item">
                  Click &quot;Add New Item&quot; to add an item to your list, it will automatically be saved. Saved items that are
                  currently on your list will not appear here until they are removed from your list.
                </li> : ''}
              {savedItems.map(item => (<SavedItemsList item={item} key={item.id} notifications={notifications} />))}
            </ul>
          </div>
        </li>
        {/* Add New Item Collapse */}
        <li>
          <div className="collapsible-header"><i className="far fa-plus-square fa-2x indigo-text"></i> Add New Item</div>
          <div className="collapsible-body">
            <div className="input-field">
              <input
                type="text"
                placeholder="Item Name"
                name="item"
                value={item}
                onChange={e => setItem(e.target.value)}
              />
            </div>
            <div className="input-field">
              <input
                type="number"
                placeholder="Quantity"
                name="quantity"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </div>
            <div className="input-field col s12">
              <select
                name="department"
                value={department}
                className="browser-default"
                onChange={e => setDepartment(e.target.value)}
              >
                <option value="" disabled>Assign Department (optional)</option>
                {departments.map(dept => <DepartmentOption department={dept} key={dept.id} />)}
              </select>
            </div>
            {/* Add new department modal */}
            <div>
              <a className="waves-effect waves-light indigo btn modal-trigger" href="#add-dept-modal">Add New Department</a>
            </div>
            <div className="input-field col s12 right-align">
              <a href="#!" onClick={onAddItem} className="btn-large indigo waves-effect">Add Item</a>
            </div>
          </div>
        </li>
        {/* Departments collapse */}
        <li>
          <div className="collapsible-header">
            <i className="far fa-plus-square fa-2x indigo-text"></i> Departments
          </div>
          <div className="collapsible-body departments-collapse">
            <ul className="collection">
              <li className="collection-item">
                <a className="waves-effect waves-light indigo btn modal-trigger" href="#add-dept-modal">Add New Department</a>
              </li>
              {departments.length === 0 ?
                <li className="collection-item">
                  There are no departments associated with this list. You may add departments when you add a new item to the list.
                </li>
                : ''}
              {departments.map(dept => <DepartmentsList dept={dept} key={dept.id} />)}
            </ul>
          </div>
        </li>
      </ul>
      <AddDepartmentModal currentListID={currentListID} />
    </div>
  )
}

const mapStateToProps = state => ({
  currentListID: state.list.currentList.id,
  currentListUser: state.list.currentList.user,
  currentListShares: state.list.currentList.shares,
  // error: state.list.error
})

export default connect(mapStateToProps, { addItem })(AddItemCollapse);
