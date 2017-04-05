import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FollowingItem from './followingItem'
import { addFollow } from './followingActions'
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
            <input id="newFollowing" type="text" className="form-control" ref={(node)=>newFollowing = node} placeholder="user"/>
            </div>
            <button id="addNewFollowing" type="submit" className="btn btn-primary" onClick={_addFollowing}>Update</button>
        </span>
    )
}

export const Following=({followingItems, addFollowing})=>(
    <div className="sidebar-module">
        <div className="panel-body">
            {followingItems.map(({id, avatar, username, headline})=>(
                <FollowingItem key={id} id={id} avatar={avatar} username={username} status={headline}/>
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
            addFollowing: (newFollowing) =>addFollow(newFollowing)(dispatch)
        }
    }
)(Following)