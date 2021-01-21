import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import { removeItemFromList, setLoading } from '../../../actions/listActions';
import EditItemModal from './items/EditItemModal';

const CurrentListItem = ({ currentListItem, departments, currentListID, removeItemFromList }) => {
  const getDeptName = (id) => {
    if (id === null) {
      return 'None';
    } else {
      let dept = departments.filter(dept => dept.id === id)
      return dept[0].name;
    }
  }

  const showAddedByToast = () => {
    M.toast({ html: `<strong>${currentListItem.item} was added by ${currentListItem.added_by}</strong>`, classes: 'amber black-text' })
  }

  const onRemoveFromList = () => {
    const data = {
      user: localStorage.getItem('user_id'),
      shopping_list: currentListID,
      item: currentListItem.item,
      on_list: false,
      notifications: false,
    }
    setLoading();
    removeItemFromList(data, currentListItem.id);
    // console.log(data);
  }

  return (
    <li className="collection-item">
      <div className="row">
        <div className="col s3 m4">
          {currentListItem.item}
        </div>
        <div className="col s2 m1">
          {currentListItem.quantity}
        </div>
        <div className="col s3 m4">
          {getDeptName(currentListItem.department)}
        </div>
        <div className="col s2 m1 item-added-by">
          <a href="#!" onClick={showAddedByToast}><i className="far fa-user fa-lg indigo-text"></i></a>
        </div>
        <div className="col s2 m1">
          <a href={`#edit-item-modal-${currentListItem.id}`} className="modal-trigger"><i className="far fa-edit fa-lg indigo-text"></i></a>
          <EditItemModal departments={departments} currentListItem={currentListItem} />
        </div>
        <div className="col s2 m1">
          <a href="#!" onClick={onRemoveFromList}><i className="far fa-check-square fa-lg indigo-text"></i></a>
        </div>
      </div>
    </li>
  )
}

const mapStateToProps = state => ({
  currentListID: state.list.currentList.id,
})

CurrentListItem.propTypes = {
  currentListID: PropTypes.number.isRequired,
  removeItemFromList: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { removeItemFromList })(CurrentListItem);
