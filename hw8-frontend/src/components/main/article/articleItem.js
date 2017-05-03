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
                <div className="media">
                    <div className="media-body">
                        <h3 className="media-heading">{article.author}</h3>
                        <h4>{article.date}</h4>
                        { user == article.author ?
                            <p ref={(node)=> newArticle = node} name="articleText" contentEditable="true">{article.text}</p>:
                            <p name="articleText">{article.text}</p>
                        }
                    </div>
                    {article.img ? <div className="media-right mr-3"><img className="media-object" src={article.img}/></div> : null}
                    <span className="card card-block">

                        <textarea name="text" className="col-md-12" ref={(node)=> newComment = node}></textarea>

                    </span>

                    <div className="row">
                         <button className="btn btn-primary col-md-4" onClick={ (e) => {
                            e.preventDefault()
                            showComment("commentList")
                        } }>Show Comments</button>
                        <button className="btn btn-primary col-md-4" onClick={(e) => {
                            e.preventDefault()
                            addComment(article._id, newComment.value)
                            newComment.value = ''
                        }}>Submit</button>
                        {user == article.author?
                            <button name="edit" ref={(node) => myButton = node}
                                    className="btn btn-primary col-md-4" onClick={(e) => {
                                        e.preventDefault()
                                        newArt(article._id, newArticle.innerHTML)
                                    }
                            }>Edit</button>:null}
                     </div>

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