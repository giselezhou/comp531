
import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { update } from  '../userActions'
import ErrorDiv from '../utils/error'

export const UpdateForm = ({updateValidate, updateError})=>{
    let newName, newEmail, newPhone, newZipcode, newPsw, newPswConfirm
    return (
        <div className="panel panel-default ">
            <div className="panel-heading"><h2 className="panel-title">Update</h2></div>
            <div className="panel-body">
                {updateError.errorMsg? <ErrorDiv errorMsg={updateError.errorMsg}/>:null}
                <form method="GET" action="index.html">
                    <div className="form-group col-md-6">
                        <label>Name</label>
                        <input type="text" className="form-control" ref={(node)=>newName=node} placeholder="Name" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input type="text" className="form-control" ref={(node)=>newEmail=node} placeholder="Email" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>PhoneNumber</label>
                        <input type="text" className="form-control" ref={(node)=>newPhone=node} placeholder="100-100-1000" pattern="\d\d\d-\d\d\d-\d\d\d\d" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Zip</label>
                        <input type="text" className="form-control" ref={(node)=>newZipcode=node} placeholder="77005" pattern="\d\d\d\d\d" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>password</label>
                        <input type="password" className="form-control" ref={(node)=>newPsw=node} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>password confirmation</label>
                        <input type="password" className="form-control" ref={(node)=>newPswConfirm=node} />
                    </div>
                    <button type="submit" className="btn btn-primary col-md-12" onClick={(e)=>{
                        e.preventDefault()
                        updateValidate(newName.value, newEmail.value, newPhone.value, newZipcode.value, newPsw.value, newPswConfirm.value)
                        newName.value=''
                        newEmail.value=''
                        newZipcode.value =''
                        newPsw.value = ''
                        newPswConfirm.value = ''
                        newPhone.value = ''
                    }}>Update</button>
                </form>
            </div>
        </div>
    )
}

export default connect((state)=> {
    return {
        updateError: state.ErrorReducer.updateError
    }
},(dispatch)=>{
        return{
            updateValidate: (newName, newEmail, newPhone, newZipcode, newPsw, newPswConfirm)=>update(newName, newEmail, newPhone, newZipcode, newPsw, newPswConfirm)(dispatch)
        }
})(UpdateForm)