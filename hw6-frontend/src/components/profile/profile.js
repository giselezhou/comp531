import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Avatar from './avatar'
import ProfileForm from './profileForm'
import UpdateForm from './updateForm'
import NavItem from '../utils/navItem'

export const Profile=()=>(

    <div className="container">
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <NavItem value="Ricebook" dest ="NAV_TO_LANDING" />
                    <NavItem value="Main Page" dest ="NAV_TO_MAIN"/>
                    <NavItem active="true" value="Profile Page" dest="NAV_TO_PROFILE"/>
                    <NavItem value="Logout" dest ="NAV_TO_LANDING"/>
                </ul>
            </div>
        </nav>
        <div className="page-sidebar col-md-3">
            <div className="row">
                <Avatar/>
            </div>
            <div className="row">
                <ProfileForm/>
            </div>
        </div>
        <div className="page-body col-md-9">
            <div className="row">
                <UpdateForm/>
            </div>
        </div>
    </div>
)

export default connect()(Profile)