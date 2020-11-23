import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateDepartment } from '../../../../actions/listActions';

const EditDepartmentModal = ({ updateDepartment, dept }) => {
  const [name, setDeptName] = useState('');

  useEffect(() => {
    setDeptName(dept.name)
  }, [dept.name])

  const onUpdateDept = () => {
    const data = {
      id: dept.id,
      name: name,
      user: dept.user,
      shopping_list: dept.shopping_list
    }
    // console.log(data);
    updateDepartment(data);
  }

  return (
    <div id={`edit-dept-modal-${dept.id}`} className="modal edit-dept-modal">
      <div className="modal-content">
        <h4 className="center-align">Edit Dept Name</h4>
        <div className="input-field">
          <input
            type="text"
            placeholder="Dept Name"
            name="name"
            value={name}
            onChange={e => setDeptName(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-footer">
        <a href="#!" onClick={onUpdateDept} className="modal-close btn indigo">Update Dept</a>
      </div>
    </div>
  )
}

EditDepartmentModal.propTypes = {
  updateDepartment: PropTypes.func.isRequired,
}

export default connect(null, { updateDepartment })(EditDepartmentModal);
