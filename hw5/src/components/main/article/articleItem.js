import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {changeShow} from './articleActions'
import CommentItem from './commentItem'
// this renders a card of article
export const ArticleItem=({article, showComment})=> (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    {article.img ? <img className="card-img-top" src={article.img} alt="Card image cap"/> : null}
                    <div className="card-block">
                        <h3 className="card-title">{article.author}</h3>
                        <h4 className="card-text">{article.date}</h4>
                        <p className="card-text">{article.text}</p>
                        <button className="btn btn-primary col-md-4" onClick={ (e) => {
                            e.preventDefault()
                            showComment()
                        } }>Show Comments</button>
                        <button className="btn btn-primary col-md-4">Add comment</button>
                    </div>
                    <span id="box" className="card-block" hidden={!article.commentShow}>
                     {article.comments?article.comments.map(({commentId, author, date, text}) => (
                             <CommentItem key={commentId} id={commentId} text={text} author={author} date={date}/>
                         )): null}
                    </span>
                </div>
            </div>
        </div>
    )

ArticleItem.propTypes = {
    article: PropTypes.object.isRequired
}
export default connect((state,ownProps)=>{
    return {
        ...ownProps
    }
}, (dispatch, ownProps)=>{
    return{
        showComment: (article) => changeShow(ownProps.article)(dispatch)
    }

})(ArticleItem)