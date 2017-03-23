
import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { update } from  '../userActions'
import Message from '../utils/message'

export const UpdateForm = ({updateValidate, updateError})=>{
    let newEmail, newZipcode, newPsw, newPswConfirm
    return (
        <div className="panel panel-default ">
            <div className="panel-heading"><h2 className="panel-title">Update</h2></div>
            <div className="panel-body">
                {updateError.msg? <Message msg={updateError.msg} type={updateError.type}/>:null}
                <form method="GET" action="index.html">

                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input type="text" className="form-control" ref={(node)=>newEmail=node} placeholder="Email" />
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
                        updateValidate(newEmail.value, newZipcode.value, newPsw.value, newPswConfirm.value)
                        newEmail.value=''
                        newZipcode.value =''
                        newPsw.value = ''
                        newPswConfirm.value = ''
                    }}>Update</button>
                </form>
            </div>
        </div>
    )
}

export default connect((state)=> {
    return {
        updateError: state.MessageReducer.updateMsg
    }
},(dispatch)=>{
        return{
            updateValidate: (newEmail, newZipcode, newPsw, newPswConfirm)=> update(newEmail, newZipcode, newPsw, newPswConfirm)(dispatch)
        }
})(UpdateForm)