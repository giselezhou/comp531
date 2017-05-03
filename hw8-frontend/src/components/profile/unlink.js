import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { unlinkAccount } from '../userActions'
import Message from '../utils/message'
export const Unlink = ({unlinkError, unlink})=>(
        <div className="sidebar-module">
            <div className="panel-body">
                {unlinkError.msg? <Message msg={unlinkError.msg} type={unlinkError.type}/>:null}
                <form method="GET" action="index.html">

                    <button type="submit" className="btn btn-primary col-md-12" onClick={(e)=>{
                        e.preventDefault()
                        unlink()
                    }}>Unlink Facebook</button>
                </form>
            </div>
        </div>
    )


export default connect((state)=>{
        return {
            unlinkError: state.MessageReducer.unlinkMsg
        }}, (dispatch)=>{
        return{
            unlink: (username, password)=> unlinkAccount()(dispatch)
        }
    }
)(Unlink)