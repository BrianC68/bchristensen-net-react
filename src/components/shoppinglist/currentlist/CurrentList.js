import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import CurrentListItem from './CurrentListItem';
import AddItemCollapse from './items/AddItemCollapse';
import { clearCurrent, deleteList, sortList, setSortOrder } from '../../../actions/listActions';

const CurrentList = ({ currentList, clearCurrent, deleteList, sortList, sort_order, setSortOrder }) => {
  useEffect(() => {
    M.AutoInit();
  })

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
      <div>
        <Link to="/shopping-list-api/" onClick={clearCurrentList} className="btn indigo">Back to Lists</Link>
        <a href="#!" onClick={onDeleteList} className="btn red darken-4 right">Delete List <i className="fal fa-trash-alt"></i></a>
      </div>
      <ul className="collection with-header">
        <li className="collection-header">
          <h4>{currentList.name}</h4>
        </li>
        <li className="collection-item">
          <div className="row">
            <div className="col s3 m4">
              <strong>Item</strong> <a href="#!" className="indigo-text" onClick={() => onSortList('item')}><i className="fal fa-sort fa-lg"></i></a>
            </div>
            <div className="col s2">
              <strong>Qty</strong>
            </div>
            <div className="col s5 m4">
              <strong>Dept.</strong> <a href="#!" className="indigo-text" onClick={() => onSortList('dept')}><i className="fal fa-object-group fa-lg"></i></a>
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
  // setSortBy: PropTypes.func.isRequired,
  setSortOrder: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  sort_order: state.list.sort_order
})

export default connect(mapStateToProps, { clearCurrent, deleteList, sortList, setSortOrder })(CurrentList);
