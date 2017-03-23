import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { publish } from './articleActions'

export const Publish = ({post})=>{
    let article
    const _reset = ()=>{
        // cancel button to clear the text area
        article.value = ''
    }
    const _post = () => {
        // post button to publish an article
        post(article.value)
        _reset()
    }
    return(
        <div className="col-md-8 panel panel-default">
            <div className="row">
                <div className=" col-md-5">
                    <div className="form-group">
                        <img src="./avatar/smile.png" className="img-responsive col-md-12"/>
                    </div>
                    <div className="form-group">
                        <input type="file" accept="image/*"/>
                    </div>
                </div>
                <div className="col-md-6 col-md-offset-1">
                    <div className="row">
                       <textarea name="text" className="col-md-12" rows="7" ref={(node)=> article = node}></textarea>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <button className="btn btn-primary col-md-12">upload</button>
                </div>
                <div className="col-md-3">
                    <button type="reset" className="btn btn-primary col-md-12" onClick={_reset}>Cancel</button>
                </div>
                <div className="col-md-3">
                    <button name= "post_btn" type="submit" className="btn btn-primary col-md-12" onClick={_post}>Post</button>
                </div>

            </div>

        </div>
    )
}

export default connect(null, (dispatch, ownProps)=>{
    return{
        post: (article)=> publish(ownProps.author,article)(dispatch)
    }
})(Publish)