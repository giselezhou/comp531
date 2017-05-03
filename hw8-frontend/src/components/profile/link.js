import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { linkAccount } from '../userActions'
import Message from '../utils/message'
export const LinkForm = ({linkError, link})=>{
    let _username, _psw;
    return (
        <div className="sidebar-module">
            <div className="panel-body">
                {linkError.msg? <Message msg={linkError.msg} type={linkError.type}/>:null}
                <form method="GET" action="index.html">

                    <div className="form-group">
                        <label>username</label>
                        <input type="text"  className="form-control" ref={(node)=>_username=node} placeholder="username" />
                    </div>

                    <div className="form-group">
                        <label>password</label>
                        <input type="password" className="form-control" ref={(node)=>_psw=node}  placeholder="password"/>
                    </div>

                    <button type="submit" className="btn btn-primary col-md-12" onClick={(e)=>{
                        e.preventDefault()
                        link(_username.value, _psw.value)
                        _username.value=''
                        _psw.value =''
                    }}>Link</button>
                </form>
            </div>
        </div>
    )
}

export default connect((state)=>{
    return {
        linkError: state.MessageReducer.linkMsg
    }}, (dispatch)=>{
        return{
            link: (username, password)=> linkAccount(username, password)(dispatch)
        }
    }
)(LinkForm)