import { expect } from 'chai'
import { filterArticles } from './filterArticle'

describe('Filter Articles', () => {
    const articles = [
        {
            "_id": 0,
            "text": "difference",
            "date": "2015-08-23T14:34:05.793Z",
            "img": "http://lorempixel.com/378/211/",
            "comments": [

            ],
            "author": "gc29"
        },
        {
            "_id": 1,
            "text": "different",
            "date": "2015-06-30T19:20:45.442Z",
            "img": null,
            "comments": [

            ],
            "author": "cjb6test"
        },
        {
            "_id": 2,
            "text": "notebook",
            "date": "2015-06-30T19:20:45.442Z",
            "img": null,
            "comments": [

            ],
            "author": "cjb6test"
        }]

    it('should filter displayed articles by the search keyword', () => {
        const result1 = filterArticles(articles, "notebook")
        const result2 = filterArticles(articles, "differen")
        const result3 = filterArticles(articles, "cjb6test")
        expect(result1).to.eql([ {
            "_id": 2,
            "text": "notebook",
            "date": "2015-06-30T19:20:45.442Z",
            "img": null,
            "comments": [

            ],
            "author": "cjb6test"
        }])
        expect(result2).to.eql([{
            "_id": 0,
            "text": "difference",
            "date": "2015-08-23T14:34:05.793Z",
            "img": "http://lorempixel.com/378/211/",
            "comments": [

            ],
            "author": "gc29"
        },
            {
                "_id": 1,
                "text": "different",
                "date": "2015-06-30T19:20:45.442Z",
                "img": null,
                "comments": [

                ],
                "author": "cjb6test"
            }])
        expect(result3).to.eql([{
            "_id": 1,
            "text": "different",
            "date": "2015-06-30T19:20:45.442Z",
            "img": null,
            "comments": [

            ],
            "author": "cjb6test"
        },
            {
                "_id": 2,
                "text": "notebook",
                "date": "2015-06-30T19:20:45.442Z",
                "img": null,
                "comments": [

                ],
                "author": "cjb6test"
            }])
    })


})