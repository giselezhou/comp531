import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FollowingItem from './followingItem'
import { addFollow, clearMsgAction } from './followingActions'
import Message from '../../utils/message'

// used to add new following
export const AddFollowing = ({addFollowing, followingItems, clearMsg, user})=>{
    let newFollowing
    const _addFollowing=()=>{
        if(newFollowing&&newFollowing.value){
            addFollowing(newFollowing.value, followingItems, user)
            newFollowing.value = ''
        }
    }

    return(
        <span>
            <div className="row">
                <div className="form-group">
                    <input id="newFollowing" type="text" className="form-control" ref={(node)=>newFollowing = node} onFocus={(e)=>{
                        e.preventDefault()
                        clearMsg()
                    } }placeholder="user"/>
                </div>
            </div>
            <div className="row">
                <button id="addNewFollowing" type="submit" className="btn btn-primary" onClick={_addFollowing}>Update</button>
            </div>

        </span>
    )
}

export const Following=({followingItems, addFollowing, followingMsg, clearMsg, user})=>(
    <div className="sidebar-module">
        <div className="panel-body">
            {followingItems.map(({id, avatar, username, headline})=>(
                <FollowingItem key={id} id={id} avatar={avatar} username={username} status={headline}/>
            ))}
            {followingMsg.msg? <Message id="message" msg={followingMsg.msg} type={followingMsg.type}/>:null}
            <AddFollowing addFollowing = {addFollowing} followingItems={followingItems} clearMsg={clearMsg} user={user}/>
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
            followingItems: state.FollowReducer.followingItems,
            followingMsg: state.MessageReducer.followingMsg
        }
    },
    (dispatch) => {
        return {
            addFollowing: (newFollowing, followingItems, user) =>addFollow(newFollowing, followingItems, user)(dispatch),
            clearMsg: () => clearMsgAction()(dispatch)
        }
    }
)(Following)