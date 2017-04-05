
import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { uploadAvatar } from '../userActions'
import Message from '../utils/message'

export const Avatar = ({upload, avatar, message})=> {
    let file, changed = undefined
    const changePic = (e) => {
        changed = true
        file =  e.target.files[0]
        let reader  = new FileReader()

        reader.addEventListener("load", function () {
            document.querySelector('img').src = reader.result
            //this.forceUpdate()
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="sidebar-module">

            <div className="panel-body">
                {message.msg? <Message msg={message.msg} type={message.type}/>:null}
                <div className="form-group">
                    <img src={avatar} className="img-responsive col-md-12"/>
                </div>
                <div className="form-group">
                    <input type="file" accept="image/*" onChange={(e) => {
                        e.preventDefault()
                        changePic(e)
                    }}/>
                </div>
                <button className="btn btn-primary col-md-12" onClick={(e) => {
                    e.preventDefault()
                    upload(file)
                }}>upload</button>
            </div>
        </div>
    )
}
Avatar.propTypes = {
    avatar: PropTypes.string
}
export default connect((state) => {
    return {
        avatar: state.UserReducer.avatar,
        message: state.MessageReducer.avatarMsg
    }
}, (dispatch) => {
    return {
        upload: (newAvatar) => uploadAvatar(newAvatar)(dispatch)
    }
})(Avatar)
