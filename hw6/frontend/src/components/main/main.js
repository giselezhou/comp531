import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Info from './headline'
import Following from './following/following'
import Publish from './article/publish'
import NavItem from '../utils/navItem'
import FilterArticle from './article/filterArticle'
import FeedList from './article/feedList'
export const Main=({username})=>(
    <div id="main" className="container">
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <NavItem value="Ricebook" dest ="NAV_TO_LANDING" />
                    <NavItem active="true" value="Main Page" dest ="NAV_TO_MAIN"/>
                    <NavItem value="Profile Page" dest="NAV_TO_PROFILE"/>
                    <NavItem value="Logout" dest ="NAV_TO_LANDING"/>
                </ul>
            </div>
        </nav>
        <div className="page-sidebar col-md-3">
            <div className="row">
                <Info/>
            </div>
            <div className="row">
                <Following/>
            </div>
        </div>
        <div className="page-head col-md-9">
            <div className="row">
                <Publish author={username}/>
            </div>
        </div>
        <div className="page-body col-md-9">
            <div className="row">
                <FilterArticle />
            </div>
            <FeedList  user={username}/>
        </div>
    </div>
)

export default connect((state)=>{
    return{
        username: state.UserReducer.username
    }
})(Main)