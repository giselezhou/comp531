/**
 * Created by zhouji on 2/4/17.
 */
'use strict'

const N_ROW = 4
const N_COL = 5
const time_gap = 20000
const dec = 2000
const pairs = N_COL*N_ROW/2

const ran_int = (num)=>{
    return Math.floor(Math.random()*num)
}


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

let reset_game =()=>{
    let my_timer = {
        interval: undefined,
        remain: time_gap,
        default_gap: time_gap
    }
    let selected =[]
    let boxes = []
    let count = 0
    let try_time = 0

    const colors = ['#FFB6C1', '#C0C0C0', '#40E0D0']
    const shapes = ['round', 'rectangle', 'triangle']
    const draw_shapes =[
        (cell)=>{
            let canvas = cell.canvas.getContext("2d")
            canvas.fillStyle = cell.color
            canvas.beginPath()
            canvas.arc(cell.size/2, cell.size/2, cell.size/2, 0, 2*Math.PI)
            canvas.fill()

        },
        (cell)=>{
            let canvas = cell.canvas.getContext("2d")
            canvas.fillStyle = cell.color
            canvas.beginPath()
            canvas.fillRect(0,0, cell.size, cell.size)

        },
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


    let horizon = (item1, item2)=>{
        if(item1.x == item2.x){
            let min = Math.min(item1.y, item2.y)
            let max = Math.max(item1.y, item2.y)
            let between = boxes.filter((el) => {
                return el.x == item1.x && el.y > min && el.y < max
            })
            let connect = between.reduce((res, el) => {
                return res && el.removed
            }, true)

            return connect
        }
        return false
    }

    let vertical = (item1, item2)=>{
        if(item1.y == item2.y){
            let min = Math.min(item1.x, item2.x)
            let max = Math.max(item1.x, item2.x)
            let between = boxes.filter((el)=>{
                return el.y == item1.y && el.x>min && el.x<max
            })
            let connect = between.reduce((res, el)=>{
                return res && el.removed
            },true)
            return connect
        }
        return false
    }

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
    let two_turn = (item1, item2)=>{
        if(item1.x ==  item2.x){
            if(item1.x == 0 || item1.x == N_ROW-1){
                return true;
            }
            const arr_x= boxes.filter((el)=>{return el.y==item1.y})
            const arr_y = boxes.filter((el)=>{return el.y == item2.y})
            arr_x.reduce((res,cur)=>{
                var item_y = arr_y.filter((el)=>{return el.x == cur.x})[0]
                if(item_y){
                    return res || horizon(cur, item_y)
                }
                return res ;
            },false)
        }
        if(item1.y == item2.y){
            if(item1.y == 0 || item1.y == N_COL-1){
                return true;
            }
            const arr_x= boxes.filter((el)=>{return el.x==item1.x})
            const arr_y = boxes.filter((el)=>{return el.x == item2.x})
            arr_x.reduce((res,cur)=>{
                var item_y = arr_y.filter((el)=>{return el.y == cur.y})[0]
                if(item_y){
                    return res || vertical(cur, item_y)
                }
                return res ;
            },false)
        }
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
                if(el.y == item2.y && (el.y == 0 || el.y == N_COL-1)){
                    return res||two_turn(el,item2)
                }
                return res||one_turn(el, item2)
            }
        },false)
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
                if(el.x == item2.x && (el.x==0|| el.x == N_ROW-1 )){
                    return res||two_turn(el, item2)
                }
                return res||one_turn(el, item2)
            }
        },false)

        return row_res||col_res
    }
    let connected = (item1, item2)=>{

        return horizon(item1,item2) || vertical(item1,item2) || one_turn(item1,item2) || two_turn(item1, item2)
    }
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
    const remove_select = ()=>{
        selected.forEach((item)=>{
            deselected_style(item.canvas)
            item.canvas.removeEventListener('click', deselect_canvas, false)
            item.canvas.addEventListener('click', select_canvas, false)
        })
        selected.splice(0, selected.length)
    }

    const selected_style = (canvas)=>{
        canvas.style.border = "solid 5px"
    }

    const deselected_style = (canvas)=>{
        canvas.style.border = ""
        canvas.disabled = true
    }
    function deselect_canvas(e){
        let canvas = e.currentTarget
        selected.splice(selected.indexOf(boxes.filter((el)=>{ return el.canvas == canvas})[0]),1)
        deselected_style(canvas)
        canvas.removeEventListener('click', deselect_canvas, false)
        canvas.addEventListener('click', select_canvas, false)

    }
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


    const clear = (el)=>{
        const c = el.getContext("2d")
        c.clearRect(0,0,el.width,el.height)
        el.style.border = ""
    }

    const show_info =()=>{
        if(pairs == count){
            document.getElementById('stop_info').innerHTML = "Congratulation! You won!"
        }else{
            document.getElementById('stop_info').innerHTML = "You are great connected "+ count+" pairs!"
        }
    }
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
        button.addEventListener('click', pause, false)
    }

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


    const pause = (e)=>{
        const button =e.currentTarget
        button.innerHTML = "Resume"
        clearInterval(my_timer.interval)
        button.removeEventListener('click', pause, false)
        button.addEventListener('click', resume, false)
    }
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


