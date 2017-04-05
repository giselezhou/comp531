import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { removeFollow } from './followingActions'
// this is used to render a following user part
export const FollowingItem=({id, avatar, username, status, remove})=>(
    <div className="form-group" name="following">
        <div className="form-group">
            <img src={avatar} height="100" width="100" className="img-round"/>
        </div>
        <h4>{username}</h4>
        <p>{status}</p>
        <button name="unFollow" type="submit" className="btn btn-primary" onClick={(e)=>{
            e.preventDefault()
            remove()
        }}>remove</button>

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