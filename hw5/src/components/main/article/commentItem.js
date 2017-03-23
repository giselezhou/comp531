import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// this renders a card of article
export const CommentItem=({ text, author, date})=>(
    <div className="row">
        <div className="col-md-12">

                <div className="card-block">
                    <h4 className="card-title">{author}</h4>
                    <h5 className="card-text">{date}</h5>
                    <p className="card-text">{text}</p>
                </div>

        </div>
    </div>
)
CommentItem.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    author: PropTypes.string.isRequired
}
export default connect()(CommentItem)