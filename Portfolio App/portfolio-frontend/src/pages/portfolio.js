import React, { useState, useEffect } from "react";

const Portfilio = () => {



  return(
    <div className='container'>
      <div className='row'>
        <div className='col-12 mt-5'>
          <form id='create-page' onsubmit='return validatForm(event)' novalidate>
            <div className='modal-header'>
              <h5 className='modal-title' id='addPageModalLabel'>Create Page</h5>
            </div>
            <div className='modal-body'>
              <div className='col-auto'>
                <label for='name' className='form-label'>Name</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  id='name'
                  name='name'
                  placeholder='Name of Page'
                  required
                />
                <div className='invalid-feedback'>
                  Please provide a valid name.
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary btn-sm'
                data-bs-dismiss='modal'
                onclick='clearForm()'
              >
                Clear
              </button>
              <button type='submit' className='btn btn-primary btn-sm'>
                Save
              </button>
            </div>
          </form>
        </div>
        <div className='col-12 my-2'>
          <table className='table table-bordered table-hover'>
            <thead>

              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Slug</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>

              {{#each pages}}
                <tr>
                  <td>{{this._id}}</td>
                  <td>{{this.name}}</td>
                  <td>{{this.slug}}</td>
                  <td>
                    <a href='/api/editor/{{this._id}}'>Edit</a>
                  </td>
                </tr>
              {{/each}}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
};

export default Portfilio;
