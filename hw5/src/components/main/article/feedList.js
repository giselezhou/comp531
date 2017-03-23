
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
        {(articleItems.sort(compareDate)).map((e)=>(
            <ArticleItem key={e._id} article={e}/>
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
            articleItems: filterArticles(state.ArticleReducer.articles, state.ArticleReducer.filter)
        }
    }
)(FeedList)