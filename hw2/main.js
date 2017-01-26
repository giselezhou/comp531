/**
 * author: ji zhou
 * net id: jz65
 * student id : S01255993
 */

// array of location of image files for each image position
var images = [
    ['./images/1.1.jpg', './images/1.2.jpg', './images/1.3.jpg', './images/1.4.jpg'],
    ['./images/2.1.jpg', './images/2.2.jpg', './images/2.3.jpg', './images/2.4.jpg'],
    ['./images/3.1.jpg', './images/3.2.jpg', './images/3.3.jpg', './images/3.4.jpg'],
    ['./images/4.1.jpg', './images/4.2.jpg', './images/4.3.jpg', './images/4.4.jpg'],
    ['./images/5.1.jpg', './images/5.2.jpg', './images/5.3.jpg', './images/5.4.jpg']
]

/* array of image item object with fields of related values:
 * index, interval time, flag: if is stopped, element, image files,
 * control button, number of current showing picture
 */
var img_items = new Array()
var imgArr = document.getElementsByTagName('img')
var btns = document.getElementsByClassName('card-btn')


// a function return random between 1000 and 5000
function newRandRate() {
    return (Math.random()*0.8+0.2)* 5000
}

window.onload = function () {

    // initialize img_item object
    for( i=0 ; i<imgArr.length;i++){
        img_items[i]=new Object()
        img_items[i].id = i;
        img_items[i].interval = newRandRate()
        img_items[i].element = imgArr[i]
        img_items[i].images = images[i]
        img_items[i].btnDiv = btns[i]
        img_items[i].count = 0;
    }

    // set interval for each image item
    img_items.forEach(function (item) {
        setIndividualInterval(item)
    })


   function setIndividualInterval(item){
        var timer = setInterval(function () {
                console.log('image pos '+item.id+' showing pic#' + (item.count % item.images.length))
                item.element.setAttribute('src', item.images[item.count % item.images.length])
                item.count = item.count + 1
        }, item.interval);
        item.timer = timer
    }

    function stopIndividualInterval(item) {
       clearInterval(item.timer)
        item.timer = null
    }


    // set the onclick function for each image related button
    img_items.forEach(function (item) {
        item.btnDiv.onclick = function () {
            if(!item.timer){
                item.interval = newRandRate()
                setIndividualInterval(item)
                item.btnDiv.innerHTML = "Stop"
            }else{
                item.btnDiv.innerHTML = "Start"
                stopIndividualInterval(item)
            }
        }
    })

}