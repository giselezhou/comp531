// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
// Note that during the validation of the tests the browser will be
// directed to download invalid URLs which will result in error messages
// in the console:
//     GET https://webdev-dummy.herokuapp.com/badURL 404 (Not Found)
// this is expected and is not an error with your code.
//
(function(exports) {

    'use strict'

    function count(result, cur){
        result[cur._id] = cur ['text'].length;
        return result;
    }

    function countWords(url) {
        // IMPLEMENT ME
        return fetch(url)
                .then(res => res.json())
                .then(res => res['articles'].reduce(count,{}));
    }

    function countWordsSafe(url) {
        // IMPLEMENT ME
        return fetch(url)
                .then(res => res.json())
                .then(res => res['articles'].reduce(count,{}))
                .catch(err => {
                    console.error(`Error inside countWordsSafe: ${err.message}`);
                    return {};
                });
    }

    function getLargest(url) {
        // IMPLEMENT ME
        return fetch(url)
                .then(res => res.json())
                .then(res =>{
                    var max = 0;
                    return res['articles'].reduce(function(result, cur){
                        if(cur['text'].length > max){
                            max = cur['text'].length;
                            return cur['_id'].toString();
                        }else{
                            return result.toString();
                        }
                    },0)
                });
    }

    exports.inclass = {
        author: "Ji Zhou",
        countWords, countWordsSafe, getLargest
    }

})(this);
