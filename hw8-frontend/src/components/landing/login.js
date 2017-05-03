
import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {login, fbLogin} from './authActions'
import Message from '../utils/message'
export const Login = ({loginEvent, loginError, fb_login}) => {
    let username, password

    return(
        <div>
            <div className="panel panel-default ">
                <div className="panel-heading"><h2 className="panel-title">Login</h2></div>
                <div className="panel-body">
                    {loginError.msg? <Message id="message" msg={loginError.msg} type={loginError.type}/>:null}
                    <form method="GET" action="index.html">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Username" ref={(node)=> username=node}  id="loginUserName" pattern="[a-zA-Z0-9 ]*$"/>
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input type="password" className="form-control" id="loginPassword" ref={(node)=> password=node} placeholder="Password" required/>
                        </div>

                        <button id="login" type="submit" className="btn btn-primary col-md-6" onClick={(e)=>{
                            e.preventDefault()
                            loginEvent(username.value, password.value)
                        }}>Login</button>
                        <button type="submit" className="btn btn-primary col-md-6" onClick={(e)=>{
                            e.preventDefault()
                            fb_login()
                        }}>Facebook</button>
                    </form>
                </div>
            </div>
        </div>
    )

}




export default connect(
    (state)=>{
        return{
            loginError: state.MessageReducer.logMsg
        }
    },
    (dispatch)=>{
        return{
            loginEvent: (username, password)=> login(username, password)(dispatch),
            fb_login: () => fbLogin()(dispatch)
        }
    }
)(Login)
