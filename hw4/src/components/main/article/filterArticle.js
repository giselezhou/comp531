import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const FilterArticle = ({filter}) =>{
    let keyword
    return (
        <input type="text" className="col-md-12"  ref={(node)=> keyword = node} onChange={(e)=>{
            e.preventDefault()
            filter(keyword.value)
        }} placeholder="Search for..."/>
    )
}


// this is used to filter articles, filter is used as a keyword
export const filterArticles = (articles, filter) => {

    if(filter){
        return articles.filter((element)=> { return element.text.includes(filter) || element.author.includes(filter)})
    }else{
        return articles
    }
}

export default connect(null,(dispatch)=>{
    return {
        filter: (keyword) => dispatch({type: 'FILTER', keyword: keyword})
    }
})(FilterArticle)