import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { shareList } from '../../../actions/listActions';

const ShareModal = ({ shareList, currentList }) => {
  const [shareusername, setShareUserName] = useState('');

  const onShareList = () => {
    if (shareusername === '') {
      M.toast({ html: 'Please enter a username!' });
    } else {
      const listToShare = {
        id: currentList.id,
        user: localStorage.getItem('user_id'),
        name: currentList.name,
        username: shareusername,
        action: ''
      }
      const message = `Your list has been shared with ${shareusername}`
      // listToShare['username'] = shareusername;
      shareList(listToShare, message);
      setShareUserName('');
    }
  }

  const onUnShareList = (username) => {
    const listToUnShare = {
      id: currentList.id,
      user: localStorage.getItem('user_id'),
      name: currentList.name,
      username: username,
      action: 'remove'
    }
    const message = `You are no longer sharing this list with ${username}`
    shareList(listToUnShare, message);
    setShareUserName('');
  }

  return (
    <div id="share-modal" className="modal">
      <div className="modal-content">
        <h4>Share your Shopping List</h4>
        <p>Enter the username of the person you want to share your list with.</p>
        <div className="input-field">
          <input
            type="text"
            placeholder="UserName"
            name="shareusername"
            value={shareusername}
            onChange={e => setShareUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-footer">
        <a href="#!" onClick={onShareList} className="modal-close waves-effect indigo btn-large">Share</a>
      </div>
      <div>
        <h5>Shared With...</h5>
        <div className="center-align">
          {currentList.shares.length === 0 ? '' :
            currentList.shares.map(share => <span className="share-user" key={share.id}>{share.username}
              <a href="#!" onClick={() => onUnShareList(share.username)}>
                &nbsp;<i className="fas fa-trash-alt red-text"></i>
              </a></span>)
          }
        </div>
      </div>
    </div>
  )
}

ShareModal.propTypes = {
  shareList: PropTypes.func.isRequired,
}

export default connect(null, { shareList })(ShareModal);
