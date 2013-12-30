var base = {
	position: {
		x: 0,
		y: 400,
		z: 0
	}
}
var offset = 40
var counter = 0
var drone = { flying: false, y: 'steady', x: 'steady', z: 'steady' }


function doFrame(latestFrame){
	var $log = $("#log")
	$log.html("")
	counter++
	//$('#log').append(counter + '<br />')

	if(latestFrame.hands.length > 0){
		if(!drone.flying) {
			$.getJSON('/drone/takeoff', function(data) {
				console.log('takeoff: ' + data.success)
			})
			drone.flying = true
		}
		var hand = latestFrame.hands[0]

		//console.clear()
		//console.log(hand.direction)

		// move up/down
		if(hand.palmPosition[1] > base.position.y  + offset) {
			$log.append('up' + '<br />')
			if(drone.y != 'up') {
				drone.y = 'up'
				$.getJSON('/drone/y/up')
			}
		} else if(hand.palmPosition[1] < base.position.y  - offset) {
			$log.append('down' + '<br />')
			if(drone.y != 'down') {
				drone.y = 'down'
				$.getJSON('/drone/y/down')
			}
		}
		else {
			if(drone.y != 'steady') {
				drone.y = 'steady'
				$.getJSON('/drone/y/steady')
			}
		}

		// move right/left
		if(hand.palmPosition[0] > base.position.x  + offset) {
			$log.append('right' + '<br />')
			if(drone.x != 'right') {
				drone.x = 'right'
				$.getJSON('/drone/x/right')
			}
		} else if(hand.palmPosition[0] < base.position.x  - offset) {
			$log.append('left' + '<br />')
			if(drone.x != 'left') {
				drone.x = 'left'
				$.getJSON('/drone/x/left')
			}
		} else {
			if(drone.x != 'steady') {
				drone.x = 'steady'
				$.getJSON('/drone/x/steady')
			}
		}

		// move right/left
		if(hand.palmPosition[2] > base.position.z  + offset) {
			$log.append('backward' + '<br />')
			if(drone.z != 'back') {
				drone.z = 'back'
				$.getJSON('/drone/z/back')
			}
		} else if(hand.palmPosition[2] < base.position.z  - offset) {
			$log.append('forward' + '<br />')
			if(drone.z != 'front') {
				drone.z = 'front'
				$.getJSON('/drone/z/front')
			}
		} else {
			if(drone.z != 'steady') {
				drone.z = 'steady'
				$.getJSON('/drone/z/steady')
			}
		}
		
		if(latestFrame.gestures > 0) {
			console.log(latestFrame.gestures)
		}
		
	} else {
		if(drone.flying) {
			$.getJSON('/drone/land', function(data) {
				console.log('land: ' + data.success)
			})
			drone.flying = false
		}
		$log.append('landing' + '<br />')
	}

	if($log.html() == '') {
		$log.append('steady' + '<br />')
	}
}