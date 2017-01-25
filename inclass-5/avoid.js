/**
 * Created by zhouji on 1/24/17.
 */

window.onload = function () {

    var btn = document.getElementById('box')

    btn.addEventListener('mouseenter', moveAway, false)
    btn.addEventListener('click', changeText, false)
    document.getElementsByClassName('cong')[0].style.visibility = 'hidden'
    var game_start = true
    var box = document.getElementById('box')

    var win_width = document.documentElement.clientWidth
    var win_height = document.documentElement.clientHeight
    var x_diff = win_width / 20
    var y_diff = win_height / 10

    var direction_x = 1
    var direction_y = 1

    function moveAway() {

        if(game_start && !event.shiftKey){
            var original_x = event.clientX
            var original_y = event.clientY
            var changed_x = original_x + direction_x * randINT(x_diff, 2 * x_diff)
            var changed_y = original_y+ direction_y * randINT(y_diff, 2 * y_diff)

            if(changed_x > win_width || changed_x < 0){
                direction_x = -direction_x
                changed_x = original_x + direction_x * randINT(x_diff, 2 * x_diff)
            }

            if(changed_y > win_height || changed_y < 0){
                direction_y = -direction_y
                changed_y = original_y + direction_y * randINT(y_diff, 2 * y_diff)
            }

            box.style.left = changed_x + "px"
            box.style.top = changed_y + "px"

        }

    }

    function changeText() {

        if(game_start){
            btn.innerHTML = "Play Again"
            game_start = !game_start
            document.getElementsByClassName('cong')[0].style.visibility = 'visible'
        }else {
            btn.innerHTML = "Click Me"
            game_start = !game_start
            document.getElementsByClassName('cong')[0].style.visibility = 'hidden'
            moveAway()
        }

    }

}





function randINT(from, to) {
    return parseInt(to/10 + 9 / 10 * Math.random() * (to - from) + from)
}