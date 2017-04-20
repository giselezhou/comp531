import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {updateStatus} from '../userActions'
export const Info=({avatar, username, status, update})=>{
    let newStatus
    return(
        <div className="sidebar-module">
            <div className="panel-body">
                <div className="row">
                    <div className="media">
                        <div className="media-left">
                            <img src={avatar} className="avatar img-round media-object"/>
                        </div>
                        <div className="media-body">
                            <h3 className="media-heading">{username}</h3>
                            <p id="currentHeadline">{status}</p>
                        </div>
                    </div>
                </div>

                <span>
                    <div className="row">
                        <input id="headline" type="text" className="form-control" ref={(node)=> newStatus=node} placeholder="new status"/>
                    </div>
                    <div className="row">
                        <button id="postHeadline" type="submit" className="btn btn-primary" onClick={(e)=>{
                            e.preventDefault()
                            update(newStatus.value)
                            newStatus.value = ''
                        }}>Update</button>
                    </div>
                </span>


            </div>
        </div>
    )
}

export default connect((state)=>{
    return {
        avatar: state.UserReducer.avatar,
        username: state.UserReducer.username,
        status: state.UserReducer.headline
    }
},(dispatch)=>{
    return{
        update: (newStatus)=>updateStatus(newStatus)(dispatch)
    }
})(Info)