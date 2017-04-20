import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Landing from './components/landing/landing'
import Main from './components/main/main'
import Profile from './components/profile/profile'

export const App =({location})=>{
    if (location == 'MAIN_PAGE') {
        return <Main />
    } else if (location == 'PROFILE_PAGE') {
        return <Profile />
    } else {
        return <Landing />
    }
}

App.propTypes = {
    location: PropTypes.oneOf(['MAIN_PAGE', 'PROFILE_PAGE', 'LANDING_PAGE']).isRequired
}

export default connect((state)=>{
    return{
        location: state.NavReducer.location
    }
})(App)