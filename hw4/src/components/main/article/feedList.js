
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleItem from './articleItem'
import {filterArticles} from './filterArticle'

// this represents a feed in the main page

//this method is used for sorting articles from most up-to-date to oldest
const compareDate=(article1, article2)=>{
    return Date.parse(article2.date) - Date.parse(article1.date)
}


export const FeedList=({articleItems})=>(
    <div className="row">
        {(articleItems.sort(compareDate)).map(({_id, img, text, author, date})=>(
            <ArticleItem key={_id} id={_id} img={img} text={text} author={author} date={date}/>
        ))}
    </div>

)

FeedList.propTypes={
    articleItems: PropTypes.arrayOf(PropTypes.shape({
        ...ArticleItem.propTypes
    }).isRequired).isRequired
}

export default connect(
    (state) => {
        return {
            // used to filter if filter word is not ''
            articleItems: filterArticles(state.ArticleReducer.articles, state.ArticleReducer.filter)
        }
    }
)(FeedList)