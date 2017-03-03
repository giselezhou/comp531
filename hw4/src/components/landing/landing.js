import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Register from './register'
import Login from './login'

export const Landing=()=>(
    <div className="container">
        <div className="page-header">
            <h1> Ricebook</h1>
        </div>
        <div className="row panelContainer page-body">
            <div className="col-md-5 col-md-offset-1">
                <Register/>
            </div>

            <div className="col-md-3 col-md-offset-1">
                <Login/>
            </div>
        </div>
    </div>
)

export default connect()(Landing)
