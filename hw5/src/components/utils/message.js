import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


export const Message = ({msg, type})=>(
    <div className={type == false ? "alert alert-danger" :"alert alert-success" } role="alert"><p>{msg}</p></div>
)


Message.propTypes ={
    msg: PropTypes.string.isRequired,
    type: PropTypes.bool
}
export default connect()(Message)