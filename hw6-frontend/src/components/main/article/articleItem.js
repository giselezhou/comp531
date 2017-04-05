import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {changeShow, updateArticle} from './articleActions'
import CommentItem from './commentItem'

// this renders a card of article
export const ArticleItem=({article, showComment, user, newArt, addComment})=>{
    let newArticle, myButton, newComment


    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    {article.img ? <img className="card-img-top" src={article.img} alt="Card image cap"/> : null}
                    <div className="card-block">
                        <h3 className="card-title">{article.author}</h3>
                        <h4>{article.date}</h4>
                        { user == article.author ?
                            <p ref={(node)=> newArticle = node} name="articleText" contentEditable="true" className="card-text">{article.text}</p>:
                            <p name="articleText" className="card-text">{article.text}</p>
                        }

                        <button className="btn btn-primary col-md-4" onClick={ (e) => {
                            e.preventDefault()
                            showComment("commentList")
                        } }>Show Comments</button>
                        <button className="btn btn-primary col-md-4" onClick={ (e) => {
                            e.preventDefault()
                            showComment("newComment")
                        }}>Add comment</button>
                        {user == article.author?
                            <button name="edit" ref={(node) => myButton = node}
                                    className="btn btn-primary col-md-4" onClick={(e) => {
                                        e.preventDefault()
                                        newArt(article._id, newArticle.innerHTML)
                                    }
                            }>Edit</button>:null}
                    </div>
                    <span className="card card-block" hidden={!article.addCommentArea}>

                        <textarea name="text" className="col-md-12" ref={(node)=> newComment = node}></textarea>

                        <button className="btn btn-primary col-md-4" onClick={(e) => {
                            e.preventDefault()
                            addComment(article._id, newComment.value)
                            newComment.value = ''
                        }}>Submit</button>
                    </span>
                    <span id="box" className="panel panel-default" hidden={!article.commentShow}>
                     {article.comments?article.comments.map(({commentId, author, date, text}) => (
                             <CommentItem key={commentId} id={commentId} articleID={article._id} text={text} user={user} author={author} date={date}/>
                         )): null}
                    </span>
                </div>
            </div>
        </div>
    )
}




ArticleItem.propTypes = {
    article: PropTypes.object.isRequired
}
export default connect((state,ownProps)=>{
    return {
        ...ownProps
    }
}, (dispatch, ownProps)=>{
    return{
        showComment: (type, article) => changeShow(type, ownProps.article)(dispatch),
        newArt: (articleID, newArticle) => updateArticle(articleID, newArticle)(dispatch),
        addComment: (articleID, newComment) => updateArticle(articleID, newComment, -1)(dispatch)
    }

})(ArticleItem)