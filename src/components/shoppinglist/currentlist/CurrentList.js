import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import CurrentListItem from './CurrentListItem';
import AddItemCollapse from './items/AddItemCollapse';
import ShareModal from './ShareModal';
import { clearCurrent, deleteList, sortList, setSortOrder, clearListsError, clearListsMessage } from '../../../actions/listActions';

const CurrentList = ({ currentList, clearCurrent, deleteList, sortList, sort_order, setSortOrder, error, clearListsError, message, clearListsMessage }) => {
  useEffect(() => {
    if (error !== '') {
      M.toast({ html: `<strong>${error}</strong>`, displayLength: 6000, classes: "red lighten-3 black-text" });
      clearListsError();
    }

    if (message !== '') {
      M.toast({ html: `<strong>${message}</strong>`, displayLength: 6000, classes: "amber black-text" });
      clearListsMessage();
    }
  }, [error, clearListsError, message, clearListsMessage])

  // Filter out items that are already on the list
  const savedItems = currentList.list_items.filter(item => !item.on_list);

  const clearCurrentList = () => {
    clearCurrent();
  }

  const onDeleteList = () => {
    var confirmDelete = window.confirm("Warning! This will PERMANENTLY delete the current list and all saved items! Are you sure?");

    if (confirmDelete) {
      deleteList(currentList.id);
      clearCurrent();
    }
  }

  const onSortList = (sortBy) => {
    if (sortBy === 'item' && sort_order === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('asc');
    }
    sortList(sortBy);
  }

  return (
    <div>
      <div className="row">
        <div className="col s4">
          <Link to="/shopping-list-api/" onClick={clearCurrentList} className="btn btn-back indigo">Back</Link>
        </div>
        <div className="col s4 center-align">
          {currentList.user === parseInt(localStorage.getItem('user_id')) ? <a href="#share-modal" className="btn btn-share amber darken-4 modal-trigger">Share</a> : ''}
          <ShareModal currentList={currentList} />
        </div>
        <div className="col s4">
          {currentList.user === parseInt(localStorage.getItem('user_id')) ? <a href="#!" onClick={onDeleteList} className="btn btn-delete red darken-4 right">Delete</a> : ''}
        </div>
      </div>
      <ul className="collection with-header">
        <li className="collection-header">
          <h4>{currentList.name}</h4>
        </li>
        <li className="collection-item">
          <div className="row">
            <div className="col s3 m4">
              <strong>Item</strong> <a href="#!" className="indigo-text" onClick={() => onSortList('item')}>
                <i className="fal fa-sort fa-lg"></i>
              </a>
            </div>
            <div className="col s2 m1">
              <strong>Qty</strong>
            </div>
            <div className="col s5 m4">
              <strong>Dept.</strong> <a href="#!" className="indigo-text" onClick={() => onSortList('dept')}>
                <i className="fal fa-object-group fa-lg"></i>
              </a>
            </div>
          </div>
        </li>
        {currentList.list_items.filter(item => item.on_list).length === 0 ?
          <li className="collection-item">Your list is currently empty. Add saved items to your list or add a new item.</li> :
          // Only pass items that are on_list===true
          currentList.list_items.filter(item => item.on_list).map(item => <CurrentListItem currentListItem={item} departments={currentList.departments} key={item.id} />)
        }
      </ul>
      <AddItemCollapse departments={currentList.departments} savedItems={savedItems} />
    </div>
  )
}

CurrentList.propTypes = {
  currentList: PropTypes.object.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  sortList: PropTypes.func.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  error: PropTypes.string,
  message: PropTypes.string,
  clearListsMessage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  sort_order: state.list.sort_order,
  error: state.list.error,
  message: state.list.message,
});

export default connect(mapStateToProps, { clearCurrent, deleteList, sortList, setSortOrder, clearListsError, clearListsMessage })(CurrentList);
