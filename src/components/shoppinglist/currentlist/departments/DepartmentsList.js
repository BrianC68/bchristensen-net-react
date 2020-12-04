import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import EditDepartmentModal from './EditDepartmentModal';
import { deleteDepartment } from '../../../../actions/listActions';

const DepartmentsList = ({ dept, deleteDepartment }) => {

  useEffect(() => {
    M.AutoInit();
  })

  const onDeleteDepartment = () => {
    const confirmDelete = window.confirm(`Department "${dept.name}" will be permanently removed! Any saved items assigned to this department will no longer be assigned a department. Would you like to proceed?`);
    if (confirmDelete) {
      deleteDepartment(dept.id);
    }
  }

  const showAddedByToast = () => {
    M.toast({ html: `<strong>${dept.name} was added by ${dept.added_by}</strong>`, classes: 'amber black-text' })
  }

  return (
    <li className="collection-item">
      <div className="row">
        <div className="col s6 m9">
          {dept.name}
        </div>
        <div className="col s2 m1">
          <a href="#!" onClick={showAddedByToast}><i className="far fa-user fa-lg indigo-text"></i></a>
        </div>
        <div className="col s2 m1">
          <a href={`#edit-dept-modal-${dept.id}`} className="modal-trigger">
            <i className="far fa-edit fa-lg indigo-text"></i></a>
        </div>
        <div className="col s2 m1">
          <a href="#!" onClick={onDeleteDepartment}>
            <i className="fas fa-trash-alt fa-lg indigo-text"></i></a>
          <EditDepartmentModal dept={dept} key={dept.id} />
        </div>
      </div>
    </li>
  )
}

DepartmentsList.propTypes = {
  deleteDepartment: PropTypes.func.isRequired,
}

export default connect(null, { deleteDepartment })(DepartmentsList);
