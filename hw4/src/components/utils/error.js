import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


export const ErrorDiv = ({errorMsg, Reset_Err})=>(
    <div className="alert alert-danger" role="alert"><p>{errorMsg}</p></div>
)


ErrorDiv.propTypes ={
    errorMsg: PropTypes.string.isRequired
}
export default connect()(ErrorDiv)