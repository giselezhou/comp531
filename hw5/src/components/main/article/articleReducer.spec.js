import { expect } from 'chai'
import ArticleReducer from './articleReducer'

describe('Article Reducer', () => {

    const _articles = [
        {
            "_id": 0,
            "text": "Vivamus laoreet. Nullam tincidunt adipiscing enim. Phasellus tempus. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Fusce neque. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Vivamus aliquet elit ac nisl. Fusce fermentum odio nec arcu. Vivamus euismod mauris. In ut quam vitae odio lacinia tincidunt. Praesent ut ligula non mi varius sagittis. Cras sagittis. Praesent ac sem eget est egestas volutpat. Vivamus consectetuer hendrerit lacus. Cras non dolor. Vivamus in erat ut urna cursus vestibulum. Fusce commodo aliquam arcu. Nam commodo suscipit quam. Quisque id odio. Praesent venenatis metus at tortor pulvinar varius.",
            "date": "2015-08-23T14:34:05.793Z",
            "img": "http://lorempixel.com/378/211/",
            "comments": [

            ],
            "author": "gc29"
        },
        {
            "_id": 1,
            "text": "Pellentesque dapibus hendrerit tortor. Praesent egestas tristique nibh. Sed a libero. Cras varius. Donec vitae orci sed dolor rutrum auctor. Fusce egestas elit eget lorem. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Nam at tortor in tellus interdum sagittis. Aliquam lobortis. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Curabitur blandit mollis lacus. Nam adipiscing. Vestibulum eu odio.\r",
            "date": "2015-06-30T19:20:45.442Z",
            "img": null,
            "comments": [

            ],
            "author": "cjb6test"
        }]
    const initState = {
        articles: [],
        filter: ''
    }
    it('should initialize state', () => {

        expect(ArticleReducer(initState, {})).to.eql(initState)
    })

    it('should set filter keyword', () => {

        expect(
            ArticleReducer(undefined, {type: 'FILTER', keyword: 'test keyword'})
        ).to.eql({
            ...initState,
            filter: 'test keyword'
        })
    })

    it('should set the articles', () => {

        expect(
            ArticleReducer(undefined, {type: 'LOGIN', articles: _articles})
        ).to.eql({
            articles: _articles,
            filter: ''
        })
    })



})

