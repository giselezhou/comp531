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

        <div className="row panelContainer">
            <div className="col-md-3">
                <Avatar/>
            </div>
            <div className="col-md-3 col-md-offset-1">
                <ProfileForm/>
            </div>
            <div className="col-md-4 col-md-offset-1">
                <UpdateForm/>
            </div>
        </div>
    </div>
)

export default connect()(Profile)