import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


export const Message = ({msg, type})=>(
    <div id="message" className={type == false ? "alert alert-danger" :"alert alert-success" } role="alert">{msg}</div>
)


Message.propTypes ={
    msg: PropTypes.string.isRequired,
    type: PropTypes.bool
}
export default connect()(Message)