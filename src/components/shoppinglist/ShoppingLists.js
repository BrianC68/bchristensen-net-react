import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { getLists } from '../../actions/listActions';
import ShoppingListsItem from './ShoppingListsItem';
import NewListModal from './NewListModal';
import CurrentList from './currentlist/CurrentList';
import Preloader from '../layout/Preloader';

const ShoppingLists = ({ list: { lists, currentList, loading }, getLists }) => {
  useEffect(() => {
    M.AutoInit();
    getLists();
  }, [getLists]);

  if (loading) {
    return <Preloader />
  }

  return (
    <div>
      {currentList !== null ? <CurrentList currentList={currentList} /> :
        <div className="my-shopping-lists">
          <h3>My Shopping Lists</h3>
          <div className="shopping-list-btn-div">
            <a href="#new-list-modal" className="amber darken-3 black-text btn-large waves-effect waves-light modal-trigger"><strong>New List</strong></a>
          </div>
          <NewListModal />
          {lists === null || lists.length === 0 ? <p>No lists to show....</p> :
            lists.map(list => <ShoppingListsItem list={list} key={list.id} />)}
        </div>
      }
    </div>
  )
}

ShoppingLists.propTypes = {
  getLists: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  error: PropTypes.object,
  message: PropTypes.string,
  // clearListsError: PropTypes.func.isRequired,
  // clearListsMessage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  list: state.list,
  loading: state.loading,
});

export default connect(mapStateToProps, { getLists })(ShoppingLists);
