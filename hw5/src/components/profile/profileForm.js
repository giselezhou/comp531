
import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'

export const ProfileForm = ({username, email, zipcode, birthday})=>(
    <div className="panel panel-default ">
        <div className="panel-heading"><h2 className="panel-title">Current Info</h2></div>
        <div className="panel-body">
            <p id="displayInfoName">{username}</p>
            <p id="displayInfoEmail">{email}</p>
            <p id="displayPhoneNum">{birthday}</p>
            <p id="displayZip">{zipcode}</p>
        </div>
    </div>
)
export default connect(
    (state)=>{
        return{
            username: state.UserReducer.username,
            email: state.UserReducer.email,
            zipcode: state.UserReducer.zipcode,
            birthday: state.UserReducer.birthday
        }
    }
)(ProfileForm)