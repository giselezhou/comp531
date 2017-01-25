/**
 * author: ji zhou
 * net id: jz65
 * student id : S01255993
 */
window.onload = function () {
    var images = [
        ['./images/1.1.jpg', './images/1.2.jpg', './images/1.3.jpg', './images/1.4.jpg'],
        ['./images/2.1.jpg', './images/2.2.jpg', './images/2.3.jpg', './images/2.4.jpg'],
        ['./images/3.1.jpg', './images/3.2.jpg', './images/3.3.jpg', './images/3.4.jpg'],
        ['./images/4.1.jpg', './images/4.2.jpg', './images/4.3.jpg', './images/4.4.jpg'],
        ['./images/5.1.jpg', './images/5.2.jpg', './images/5.3.jpg', './images/5.4.jpg']
    ]

    var img_items = new Array()
    imgArr = document.getElementsByTagName('img')
    var btns = document.getElementsByClassName('card-btn')

    function newRandRate() {
        return (Math.random()*0.8+0.2)* 5000
    }
    for( i=0 ; i<imgArr.length;i++){
        img_items[i]=new Object()
        img_items[i].id = i;
        img_items[i].interval = newRandRate()
        img_items[i].is_stopped = false
        img_items[i].element = imgArr[i]
        img_items[i].images = images[i]
        img_items[i].btnDiv = btns[i]
        img_items[i].count = 0;
    }

    img_items.forEach(function (item) {
        setIndividualInterval(item)
    })

   function setIndividualInterval(item){
        var timer = setInterval(function () {  if(!item.is_stopped){
                console.log('image pos '+item.id+' showing pic#' + (item.count % item.images.length))
                item.element.setAttribute('src', item.images[item.count % item.images.length])
                item.count = item.count + 1
            }
        }, item.interval);
        item.timer = timer
    }

    function stopIndividualInterval(item) {
       clearInterval(item.timer)
    }


    img_items.forEach(function (item) {
        item.btnDiv.onclick = function () {
            if(item.is_stopped){
                setIndividualInterval(item)
                item.is_stopped = false
                item.interval = newRandRate()
                item.btnDiv.innerHTML = "Stop"
            }else{
                item.is_stopped = true
                item.btnDiv.innerHTML = "Start"
                stopIndividualInterval(item)
            }
        }
    })

}