import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { removeFollow } from './followingActions'
// this is used to render a following user part
export const FollowingItem=({id, avatar, username, status, remove})=>(
    <div className="form-group" name="following">
        <div className="row">
            <button name="unFollow" type="submit" className="close" onClick={(e)=>{
                e.preventDefault()
                remove()
            }}>x</button>
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

    </div>
)
FollowingItem.propTypes = {
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
}
export default connect(null, (dispatch, ownProps)=>{
    return{
        // remove from the following list
        remove: () =>removeFollow(ownProps.id, ownProps.username)(dispatch)
    }
})(FollowingItem)