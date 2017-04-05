import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { publish } from './articleActions'

export const Publish = ({post})=>{
    let article, file
    const changePic = (e) => {
        file =  e.target.files[0]
    }
    const _reset = ()=>{
        // cancel button to clear the text area
        article.value = ''
        document.querySelector('#imgFile').value = ''
    }
    const _post = () => {
        // post button to publish an article
        post(article.value, file)
        _reset()
    }
    return(
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                       <textarea id="newArticleText" name="text" className="col-md-12" rows="6" ref={(node)=> article = node}></textarea>
                    </div>
                    <div className="form-group">
                        <input id="imgFile" type="file" accept="image/*" onChange={(e) => {
                            e.preventDefault()
                            changePic(e)
                        }}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <button type="reset" className="btn btn-primary col-md-12" onClick={_reset}>Cancel</button>
                </div>
                <div className="col-md-6">
                    <button name= "post_btn" id="post" type="submit" className="btn btn-primary col-md-12" onClick={_post}>Post</button>
                </div>

            </div>

        </div>
    )
}

export default connect(null, (dispatch, ownProps)=>{
    return{
        post: (article, file)=> publish(ownProps.author, article, file)(dispatch)
    }
})(Publish)