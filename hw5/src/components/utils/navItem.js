import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const NavItem =({value, active,nav, dest})=>(
    <li className={active? "active":null}><a onClick={(e)=>{
        e.preventDefault()
        nav()
    }}>{value}</a></li>
)

NavItem.propTypes = {
    value: PropTypes.string.isRequired,
    dest: PropTypes.oneOf(['NAV_TO_LANDING', 'NAV_TO_MAIN', 'NAV_TO_PROFILE']).isRequired,
}
export default connect(
    null, (dispatch, ownProps)=>{
        return {
            nav: () => dispatch({type: ownProps.dest})
        }
    }
)(NavItem)