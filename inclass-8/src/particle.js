const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
} = {}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta, canvas) => {
	// IMPLEMENT ME
    position[0] = position[0] + (velocity[0] * delta) + 0.5 * acceleration[0] * delta * delta
    position[1] = position[1] + (velocity[1] * delta) + 0.5 * acceleration[1] * delta * delta

    position = position.map((p)=>{
        if( p > 800){
            return p = 0
        }
        else if( p < 0 ){
            return p = 800
        }
        return p
    })

    velocity[0] = velocity[0] + acceleration[0]*delta
    velocity[1] = velocity[1] + acceleration[1]*delta
    return { mass, acceleration, velocity, position }
}

export default particle

export { update }
