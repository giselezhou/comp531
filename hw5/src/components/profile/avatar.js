
import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'

export const Avatar = ({avatar})=>(
    <div className="panel panel-default">

        <div className="panel-body">
            <div className="form-group">
                <img src={avatar} className="img-responsive col-md-12"/>
            </div>
            <div className="form-group">
                <input type="file" accept="image/*"/>
            </div>
            <button className="btn btn-primary col-md-12">upload</button>
        </div>
    </div>
)
Avatar.propTypes = {
    avatar: PropTypes.string
}
export default connect((state)=>{
    return {
        avatar: state.UserReducer.avatar
    }
})(Avatar)
