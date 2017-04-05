
import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { update } from  '../userActions'
import Message from '../utils/message'

export const UpdateForm = ({updateValidate, updateError})=>{
    let newEmail, newZipcode, newPsw, newPswConfirm
    return (
        <div>
            <div className="panel-body">
                {updateError.msg? <Message msg={updateError.msg} type={updateError.type}/>:null}
                <form method="GET" action="index.html">

                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" id="newEmail" className="form-control" ref={(node)=>newEmail=node} placeholder="Email" />
                    </div>

                    <div className="form-group">
                        <label>Zip</label>
                        <input type="text" id="newZipcode" className="form-control" ref={(node)=>newZipcode=node} placeholder="77005" pattern="\d\d\d\d\d" />
                    </div>
                    <div className="form-group">
                        <label>password</label>
                        <input type="password" id="newPSW" className="form-control" ref={(node)=>newPsw=node} />
                    </div>
                    <div className="form-group">
                        <label>password confirmation</label>
                        <input type="password" id="newPSWConfirm" className="form-control" ref={(node)=>newPswConfirm=node} />
                    </div>
                    <button type="submit" id="updateProfile" className="btn btn-primary col-md-12" onClick={(e)=>{
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