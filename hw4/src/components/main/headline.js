import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {updateStatus} from '../userActions'
export const Info=({avatar, username, status, update})=>{
    let newStatus
    return(
        <div className="sidebar-module panel panel-default">
            <div className="panel-body">

                <div className="form-group">
                    <img src={avatar} className="img-round col-md-12"/>
                </div>
                <h3>{username}</h3>
                <p>{status}</p>
                <div className="form-group">
                    <input type="text" className="form-control" ref={(node)=> newStatus=node} placeholder="new status"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e)=>{
                    e.preventDefault()
                    update(newStatus.value)
                    newStatus.value = ''
                }}>Update</button>
            </div>
        </div>
    )
}

export default connect((state)=>{
    return {
        avatar: state.UserReducer.avatar,
        username: state.UserReducer.username,
        status: state.UserReducer.status
    }
},(dispatch)=>{
    return{
        update: (newStatus)=>updateStatus(newStatus)(dispatch)
    }
})(Info)