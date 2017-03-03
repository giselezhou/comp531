import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// this renders a card of article
export const ArticleItem=({ img, text, author, date})=>(
    <div className="row">
        <div className="col-md-12">
            <div className="card">
                {img?<img className="card-img-top" src={img} alt="Card image cap"/>:null}
                <div className="card-block">
                    <h3 className="card-title">{author}</h3>
                    <h4 className="card-text">{date}</h4>
                    <p className="card-text">{text}</p>
                    <button className="btn btn-primary col-md-4">Edit</button>
                    <button className="btn btn-primary col-md-4">Add comment</button>
                </div>
            </div>
        </div>
    </div>
)
ArticleItem.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    img: PropTypes.string,
    author: PropTypes.string.isRequired
}
export default connect()(ArticleItem)