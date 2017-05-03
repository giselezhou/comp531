import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {nav} from './navActions'

export const NavItem =({value, active, navTo, dest})=>(
    <li className={active? "active":null}><a id={value} onClick={(e)=>{
        e.preventDefault()
        navTo(dest)
    }}>{value}</a></li>
)

NavItem.propTypes = {
    value: PropTypes.string.isRequired,
    dest: PropTypes.oneOf(['NAV_TO_LANDING', 'NAV_TO_MAIN', 'NAV_TO_PROFILE']).isRequired,
}
export default connect(
    null, (dispatch, ownProps)=>{
        return {
            navTo: (dest) => nav(ownProps.dest)(dispatch)
        }
    }
)(NavItem)