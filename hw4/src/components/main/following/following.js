import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FollowingItem from './followingItem'

// used to add new following
export const AddFollowing = ({addFollowing})=>{
    let newFollowing
    const _addFollowing=()=>{
        if(newFollowing&&newFollowing.value){
            addFollowing(newFollowing.value)
            newFollowing.value = ''
        }
    }
    return(
        <span>
            <div className="form-group">
            <input type="text" className="form-control" ref={(node)=>newFollowing = node} placeholder="user"/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={_addFollowing}>Update</button>
        </span>
    )
}

export const Following=({followingItems, addFollowing})=>(
    <div className="sidebar-module panel panel-default">
        <div className="panel-body">
            {followingItems.map(({id, avatar, username, status})=>(
                <FollowingItem key={id} id={id} avatar={avatar} username={username} status={status}/>
            ))}
            <AddFollowing addFollowing = {addFollowing}/>
        </div>
    </div>
)

Following.propTypes={
    followingItems: PropTypes.arrayOf(PropTypes.shape({
        ...FollowingItem.propTypes
    }).isRequired).isRequired,
    addFollowing: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        return {
            followingItems: state.FollowReducer.followingItems
        }
    },
    (dispatch) => {
        return {
            addFollowing: (newFollowing) => dispatch({type: 'ADD_FOLLOW', name: newFollowing})
        }
    }
)(Following)