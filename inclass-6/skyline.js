'use strict'




var createApp = function(canvas) { 
	var c = canvas.getContext("2d");
    var car_image = new Image
    car_image.src = './car.png'

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange']
	var windowColors = [ 'yellow', 'black']
	var buildingList = []
	var car_x = 0;
	var sun_loc = { x: 15, y: 100}

	var drawSun = function () {
		c.beginPath()
		c.arc(sun_loc.x, sun_loc.y, 15, 0, 2 * Math.PI, false)
		c.fillStyle = 'red'
		c.fill()
		c.stroke()
    }
    
    var drawCar = function () {

		c.drawImage(car_image,car_x,floor - 50, 50, 50)

    }

    drawSun()
	drawCar()

	//build a building
	var draw = function() {


		c.clearRect(0, 0, canvas.width, floor)
		buildingList.forEach(function (building) {
			c.fillStyle = building.color
			c.fillRect(building.x0, floor - building.height, building.width, building.height)
            for (var y = floor - floorSpacing; y > floor - building.height; y -= floorSpacing + windowHeight) {
                for (var x = windowSpacing; x < building.width - windowWidth; x += windowSpacing + windowWidth) {
                	c.fillStyle = windowColors[Math.floor(windowColors.length * Math.random())]
                    c.fillRect(building.x0 + x, y - windowHeight, windowWidth, windowHeight)
                }
            }
        })
		
		drawSun()
		drawCar()
	}

	var addNew = function(){
		buildingList.push({
			x0: Math.random()*canvas.width,
            width: Math.ceil((windowWidth+windowSpacing) * Math.floor(Math.random()*10)),
            height: Math.ceil(Math.random()*canvas.height/2),
			color: blgColors[ Math.floor(Math.random()*blgColors.length)]
		})
		draw()
	}

	var sun_direct = 1
	setInterval(function () {
		car_x = (car_x + 20) % canvas.width
		sun_loc.x = (sun_loc.x + 20)%canvas.width
		sun_loc.y += sun_direct * 10
		if( (sun_loc.y + sun_direct * 10 + 15)>floor ){
			sun_direct = -1
            sun_loc.y = floor - 15
		}else if(sun_loc.y + sun_direct * 10 - 15 <0){
			sun_direct = 1
			sun_loc.y = 15
		}else {
            sun_loc.y += sun_direct * 10
        }

		draw()

    },500)
	var changeHeight = function (event) {
		var rect = canvas.getBoundingClientRect()
		var pos_x = event.clientX - rect.left
		var pos_y = event.clientY - rect.top
		var loop = true
		buildingList.forEach(function (building) {
			if(loop){
				if(pos_x < building.x0 + building.width && pos_x > building.x0){
					if(pos_y < floor && pos_y > floor - building.height){
						building.height += 20
						draw()
						loop = false
					}
				}
			}
        })
    }
	return {
		addNew: addNew,
		changeHeight: changeHeight
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.addNew
    document.querySelector("canvas").onclick = app.changeHeight
}


