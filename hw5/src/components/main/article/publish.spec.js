import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'
import { Publish } from './publish'
import { shallow } from 'enzyme';

import { FeedList } from './feedList'
const findByName = (children, name) => {
    const result = Array.prototype.filter.call(children, it => it.name === name)
    return result.length ? result[0] : null
}


describe('Validate Article View', () => {


    it('should render articles', () => {
        const articleItems = [
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
            }
        ]
        const node = shallow(<FeedList articleItems={articleItems} />)
        expect(node.find('div').children()).to.have.length(2)
    })


    it('should dispatch actions to create a new article', () => {

        let added = false
        const item = TestUtils.renderIntoDocument(
            <div>
                <Publish author="test" post={() => { added = true }}/>
            </div>).children[0]

        const textarea = findByName(item.children[0].children[1].children[0].children,'text')
        expect(textarea.value).to.equal('')
        textarea.value = "new article"
        TestUtils.Simulate.change(textarea)

        const btn = findByName(item.children[1].children[2].children, 'post_btn')
        expect(added).to.be.false
        TestUtils.Simulate.click(btn)
        expect(added).to.be.true
    })


})
