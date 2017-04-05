import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateArticle } from './articleActions'

// this renders a card of article
export const CommentItem=({ id, text, author, date, user, newArt, articleID})=> {
    let newComment

    return (

            <div className="col-md-12">

                <h4>{author} said on {date}</h4>
                { user == author ? <p ref={(node)=> newComment = node} contentEditable="true" className="card-text">{text}</p>:
                    <p className="card-text">{text}</p>
                }
                {user == author?<button className="btn btn-primary col-md-4" onClick={(e)=>{
                        e.preventDefault()
                        newArt(articleID, newComment.innerHTML, id)
                    }}>Edit</button>:null}

            </div>
    )
}
CommentItem.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    author: PropTypes.string.isRequired
}
export default connect(null, (dispatch) => {
    return {
        newArt: (articleID, newComment, id) => updateArticle(articleID, newComment, id)(dispatch)
    }
})(CommentItem)