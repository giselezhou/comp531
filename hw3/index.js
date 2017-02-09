/**
 * Created by zhouji on 2/4/17.
 */
'use strict'

// the number of rows
const N_ROW = 4
// the number of columns
const N_COL = 5
// the beginning time gap
const time_gap = 18000
// time gap decrement after each connection
const dec = 2000
// total number of pairs
const pairs = N_COL*N_ROW/2

// generate random in from 0 to num-1
const ran_int = (num)=>{
    return Math.floor(Math.random()*num)
}

// dynamically generate html
let make_row = (content) => [
    '<div class="col">',
    ...content,
    '</div>'
].join('')

let make_cell= ()=> [
   '<div class="canvas-div">',
    '<canvas class="cell" height="100" width="100"></canvas>',
    '</div>'
].join('')

// function for update cookie with new score, remain time and times of try
const updateCookie = (score, time, try_time) => {
    const key_try = 'try_count'
    const key_time = 'left_time'
    const key_score = 'best_score'
    const try_cookie = document.cookie.split(';').filter(kv => kv.indexOf(key_try) >= 0)[0]
    const time_cookie = document.cookie.split(';').filter(kv => kv.indexOf(key_time) >= 0)[0]
    const score_cookie = document.cookie.split(';').filter(kv => kv.indexOf(key_score) >= 0)[0]
    const newScore = Math.max(score, (score_cookie ? parseInt(score_cookie.split('=')[1]) : 0))
    const oldTime = time_cookie ? parseInt(time_cookie.split('=')[1]) : 0
    const oldTry =  try_cookie ? parseInt(try_cookie.split('=')[1]) : 0
    if(newScore == score){
        const newTry = Math.min(oldTry, try_time)
        document.cookie = `${key_score}=${newScore}`
        document.cookie = `${key_time}=${time}`
        document.cookie = `${key_try}=${newTry}`
    }else{

        document.cookie = `${key_score}=${newScore}`
        document.cookie = `${key_time}=${oldTime}`
        document.cookie = `${key_try}=${oldTry}`
    }


}
// function for showing history at first entering page
const showCookie = ()=>{
    const key_try = 'try_count'
    const key_time = 'left_time'
    const key_score = 'best_score'
    const try_cookie = document.cookie.split(';').filter(kv => kv.indexOf(key_try) >= 0)[0]
    const time_cookie = document.cookie.split(';').filter(kv => kv.indexOf(key_time) >= 0)[0]
    const score_cookie = document.cookie.split(';').filter(kv => kv.indexOf(key_score) >= 0)[0]
    const score = score_cookie ? parseInt(score_cookie.split('=')[1]) : 0
    const oldTime = time_cookie ? parseInt(time_cookie.split('=')[1]) : 0
    const oldTry =  try_cookie ? parseInt(try_cookie.split('=')[1]) : 0
    document.getElementById('stop_info').innerHTML = "You best result: score "+ score + ", "
                                                    + oldTime+ " seconds left with "+ oldTry + " tries."
}

// body of game
let reset_game =()=>{
    // timer of game
    let my_timer = {
        interval: undefined,
        remain: time_gap,
        default_gap: time_gap
    }
    // record of selected in page
    let selected =[]
    // array of canvas related info
    let boxes = []
    // the number of already connected pairs in one round
    let count = 0
    // the number of tried time
    let try_time = 0

    // colors for choice
    const colors = ['#FFB6C1', '#C0C0C0', '#40E0D0']
    // shapes for choice
    const shapes = ['round', 'rectangle', 'triangle']
    // function for drawing different shapes
    const draw_shapes =[
        // draw a circle
        (cell)=>{
            let canvas = cell.canvas.getContext("2d")
            canvas.fillStyle = cell.color
            canvas.beginPath()
            canvas.arc(cell.size/2, cell.size/2, cell.size/2, 0, 2*Math.PI)
            canvas.fill()

        },
        // draw a rectangle
        (cell)=>{
            let canvas = cell.canvas.getContext("2d")
            canvas.fillStyle = cell.color
            canvas.beginPath()
            canvas.fillRect(0,0, cell.size, cell.size)

        },
        // draw a triangle
        (cell)=>{
            let canvas = cell.canvas.getContext("2d")
            canvas.fillStyle = cell.color
            canvas.beginPath()
            canvas.moveTo(0, cell.size)
            canvas.lineTo(cell.size, cell.size)
            canvas.lineTo(cell.size/2, 0)
            canvas.fill()

        }
    ]

    // allocate shape and color of each canvas box and draw it after start is clicked
    const arrange_shape = (arr) =>{
        for(let i=0; i<arr.length;i++){
            if(!arr[i].filled){
                arr[i].filled = true
                let choices = arr.filter((el)=>{return el.filled == false})
                let j = arr.indexOf(choices[ran_int(choices.length)])
                let color = colors[ran_int(colors.length)]
                let shape = shapes[ran_int(shapes.length)]
                arr[i].color = color
                arr[j].color = color
                arr[i].shape = shape
                arr[j].shape = shape
                arr[j].filled = true
            }
        }
    }

    // check connection on horizontal level
    let horizon = (item1, item2)=>{
        if(item1.x == item2.x){
            let min = Math.min(item1.y, item2.y)
            let max = Math.max(item1.y, item2.y)
            let between = boxes.filter((el) => {
                return el.x == item1.x && el.y > min && el.y < max
            })
            let connect = (between.length == 0)

            return connect
        }
        return false
    }

    // check connection on vertical level
    let vertical = (item1, item2)=>{
        if(item1.y == item2.y){
            let min = Math.min(item1.x, item2.x)
            let max = Math.max(item1.x, item2.x)
            let between = boxes.filter((el)=>{
                return el.y == item1.y && el.x>min && el.x<max
            })
            let connect = (between.length == 0)
            return connect
        }
        return false
    }

    // check if two points could be connected with one turn
    let one_turn = (item1, item2)=>{
        const loc1 = { x : item1.x, y : item2.y}
        const loc2 = { x : item2.x, y : item1.y}
        let cell1 = boxes.filter((el)=>{return loc1.x == el.x && loc1.y == el.y && el.removed == false})
        let cell2 = boxes.filter((el)=>{return loc2.x == el.x && loc2.y == el.y && el.removed == false})
        if(cell1.length>0 && cell2.length>0){
            return false
        }else if ( cell1 ){
            return vertical(item1,loc2) && horizon(item2, loc2)
        }else if ( cell2 ){
            return horizon(item1,loc1)&& vertical(item2,loc1)
        }
        return (horizon(item1,loc1)&& vertical(item2,loc1)) || (vertical(item1,loc2) && horizon(item2, loc2))

    }

    // check if two points could be connected with two turns
    let two_turn = (item1, item2)=>{
        // if the are in the same line
        if(item1.x ==  item2.x){
            // if on the border
            if(item1.x == 0 || item1.x == N_ROW-1){
                return true;
            }
            // if not check if there is a connection
            const arr_x= boxes.filter((el)=>{return el.y==item1.y})
            const arr_y = boxes.filter((el)=>{return el.y == item2.y})
            arr_x.reduce((res,cur)=>{
                var item_y = arr_y.filter((el)=>{return el.x == cur.x})[0]
                if(item_y){
                    if(item_y.x == 0 || item_y.x == N_ROW-1) return true
                    return res || horizon(cur, item_y)
                }
                return res ;
            },false)
        }

        // same situation for same column
        if(item1.y == item2.y){
            if(item1.y == 0 || item1.y == N_COL-1){
                return true;
            }
            const arr_x= boxes.filter((el)=>{return el.x==item1.x})
            const arr_y = boxes.filter((el)=>{return el.x == item2.x})
            arr_x.reduce((res,cur)=>{
                var item_y = arr_y.filter((el)=>{return el.y == cur.y})[0]
                if(item_y){
                    if(item_y.y == 0 || item_y.y == N_COL-1) return true
                    return res || vertical(cur, item_y)
                }
                return res ;
            },false)
        }
        // if not same line nor same column
        // use item1 as a hooker to find empty cells in the same line as item1
        // check if these cells are connected with item2 with one turn
        const x_row = [...Array(N_COL)].map((cur, id)=>{
            return {x: item1.x, y: id}
        }).filter((el)=>{return boxes.indexOf(el)<0 && horizon(el, item1)})
        const row_res = x_row.reduce((res, el)=>{
            if(el.y==item1.y) return res
            var item = boxes.filter((elem)=>{return elem.x==el.x&&elem.y==el.y})[0]
            if(item){
                return res
            }
            else{
                if(el.y == 0 || el.y == N_COL-1){
                    return res||horizon({x: item2.x, y: el.y}, item2)
                }
                return res||one_turn(el, item2)
            }
        },false)

        // if not work
        // use item1 as a hooker to find empty cells in the same column as item1
        // check if these cells are connected with item2 with one turn
        const x_col = [...Array(N_ROW)].map((cur, id)=>{
            return {x: id, y: item1.y}
        }).filter((el)=>{return boxes.indexOf(el)<0 && vertical(el, item1)})
        const col_res = x_col.reduce((res, el)=>{
            if(el.x == item1.x) return res
            var item = boxes.filter((elem)=>{return elem.x==el.x&&elem.y==el.y})[0]
            if(item){
                return res
            }
            else{
                if( el.x==0|| el.x == N_ROW-1 ){
                    return res||vertical({x: el.x, y: item2.y}, item2)
                }
                return res||one_turn(el, item2)
            }
        },false)

        return row_res||col_res
    }

    // check connection of two items return if connected
    let connected = (item1, item2)=>{

        return horizon(item1,item2) || vertical(item1,item2) || one_turn(item1,item2) || two_turn(item1, item2)
    }

    // fulfill the work during checking and after checking
    const checkConnect =()=>{
        const item1 = selected[0]
        const item2 = selected[1]
        if(item1.color==item2.color && item1.shape==item2.shape){
           if(connected(item1, item2)){
               clear(item1.canvas)
               clear(item2.canvas)
               boxes.splice(boxes.indexOf(item1),1)
               boxes.splice(boxes.indexOf(item2),1)
               selected.splice(0,2)
               item1.canvas.removeEventListener('click',deselect_canvas, false)
               item2.canvas.removeEventListener('click',deselect_canvas, false)
               count++
               document.getElementById('connect_count').innerHTML = count
               if(boxes.length==0){
                   stop()
               }else{
                   reset_interval()
               }
           }else{
               remove_select()
           }
        }else{
            remove_select()
        }
    }
    // remove items in selected and remove their current event listener of 'click'
    const remove_select = ()=>{
        selected.forEach((item)=>{
            deselected_style(item.canvas)
            item.canvas.removeEventListener('click', deselect_canvas, false)
            item.canvas.addEventListener('click', select_canvas, false)
        })
        selected.splice(0, selected.length)
    }

    // change the style of canvas to selected
    const selected_style = (canvas)=>{
        canvas.style.border = "solid 5px"
    }
    // change the style of canvas to unselected
    const deselected_style = (canvas)=>{
        canvas.style.border = ""
        canvas.disabled = true
    }

    // event handler for a canvas who is selected when clicked
    function deselect_canvas(e){
        let canvas = e.currentTarget
        selected.splice(selected.indexOf(boxes.filter((el)=>{ return el.canvas == canvas})[0]),1)
        deselected_style(canvas)
        canvas.removeEventListener('click', deselect_canvas, false)
        canvas.addEventListener('click', select_canvas, false)

    }
    // event handler for a canvas who is not selected when clicked
    function select_canvas(e){
        'use strict'
        let canvas = e.currentTarget
        selected.push((boxes.filter((el)=>{ return el.canvas == canvas}))[0])
        selected_style(canvas)
        canvas.removeEventListener('click', select_canvas, false)
        canvas.addEventListener('click', deselect_canvas, false)
        switch (selected.length){
            case 1: break
            case 2:
                try_time++
                document.querySelector('#try_count').innerHTML = try_time
                checkConnect()
                break
            default:
                remove_select()
                return
        }

    }

    // draw shapes according to info in boxes
    const draw_canvas = ()=>{
        boxes = ($('.cell').map((id, el)=>{
            return {
                filled: false,
                shape: undefined,
                color: undefined,
                canvas: el,
                x: (id)%N_ROW,
                y: Math.floor(id/N_ROW),
                size: el.width,
                removed: false
            }
        })).toArray()

        arrange_shape(boxes)

        boxes.forEach((el)=>{
            draw_shapes[shapes.indexOf(el.shape)](el)
        })


        boxes.forEach((el)=>{
            if(!el.removed){
                el.canvas.addEventListener('click', select_canvas, false)
            }
        })
    }


    // clear a canvas and set to default
    const clear = (el)=>{
        const c = el.getContext("2d")
        c.clearRect(0,0,el.width,el.height)
        el.style.border = ""
    }

    // show the after game info
    const show_info =()=>{
        if(pairs == count){
            document.getElementById('stop_info').innerHTML = "Congratulation! You won!"
        }else{
            document.getElementById('stop_info').innerHTML = "You are great connected "+ count+" pairs!"
        }
    }

    // is called when game is over that is all pairs are connected or time is up
    const stop = ()=>{
        clearInterval(my_timer.interval)
        my_timer.default_gap = time_gap
        my_timer.remain = my_timer.default_gap
        const button = document.getElementById('start')
        button.innerHTML = "Start"
        const pause_btn = document.getElementById('pause')

        if(pause_btn.innerHTML == 'Resume'){
            pause_btn.innerHTML = "Pause"
            pause_btn.removeEventListener('click', resume, false)
        }else{
            pause_btn.removeEventListener('click', pause, false)
        }
        pause_btn.disabled = true;
        boxes.forEach((el)=>{
            clear(el.canvas)
        })
        $('.cell').css('cursor', 'none')
        button.removeEventListener('click', stop, false)
        button.addEventListener('click', start, false)
        show_info()
        updateCookie(count,my_timer.remain/1000, try_time)
        count = 0
        try_time = 0
    }

    // event handler for resume button
    const resume = (e)=>{
        const button =e.currentTarget
        my_timer.interval = setInterval(()=>{
            const timer_div = document.getElementById('timer')

            timer_div.innerHTML = ((my_timer.remain/1000))
            if(my_timer.remain == 0){
                clearInterval(my_timer.interval)
                stop()
            }
            my_timer.remain -= 1000

        }, 1000)
        button.innerHTML = "Pause"
        button.removeEventListener('click', resume, false)
        button.addEventListener('click', pause, false);
        ($('.cell').toArray()).filter((canvas)=>{
            return canvas.style.border == "solid 5px"
        }).forEach((canvas)=>{
            canvas.addEventListener('click', deselect_canvas, false)
        });
        ($('.cell').toArray()).filter((canvas)=>{
            return canvas.style.border == ""
        }).forEach((canvas)=>{
            canvas.addEventListener('click', select_canvas, false)
        })
    }

    // reset timer of game with new time gap
    // if user connecting is fast enough than the time would be like not running away
    const reset_interval = () =>{
        my_timer.remain = Math.max(my_timer.default_gap,my_timer.remain)
        my_timer.default_gap = my_timer.default_gap>=my_timer.remain? my_timer.default_gap - dec: my_timer.default_gap
        if(my_timer.interval){
            clearInterval(my_timer.interval)
        }
        my_timer.interval = setInterval(()=>{
            const timer_div = document.getElementById('timer')

            timer_div.innerHTML = ((my_timer.remain/1000))
            if(my_timer.remain == 0){
                clearInterval(my_timer.interval)
                stop()
            }
            my_timer.remain -= 1000

        }, 1000)
    }


    // event handler for pause button
    const pause = (e)=>{
        const button =e.currentTarget
        button.innerHTML = "Resume"
        clearInterval(my_timer.interval)
        button.removeEventListener('click', pause, false)
        button.addEventListener('click', resume, false);
        ($('.cell').toArray()).forEach((canvas)=>{
            canvas.removeEventListener('click', select_canvas, false)
            canvas.removeEventListener('click', deselect_canvas, false)
        })
    }

    // start the game and reset all
    const start = ()=>{
        document.getElementById('stop_info').innerHTML = ""
        const button = document.getElementById('start')
        button.innerHTML = "Reset"
        button.removeEventListener('click', start, false)
        button.addEventListener('click', stop, false)
        document.getElementById('pause').disabled = false
        document.getElementById('pause').addEventListener('click', pause, false)
        draw_canvas()
        $('.cell').css('cursor', 'pointer')
        document.getElementById('connect_count').innerHTML = count
        reset_interval()
    }
    return{
        start: start
    }


}


window.onload = ()=>{

    let BOX = $('.box')
    BOX.append([...Array(N_COL)].map(()=>{
        return make_row([...Array(N_ROW)].map(() => {
            return make_cell()
        }))
    }))
    showCookie()
    const game = reset_game()
    document.getElementById('pause').disabled = true
    document.getElementById('start').addEventListener('click', game.start, false)

}


