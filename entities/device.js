//? the Device class has two properties
//? device => { device_id: { max_visitors, current_visitors, socket_id } }
//? deviceSocketId => { socket_id: device }

class Device{
	constructor(){
		this.device = {};
		this.deviceSocketId = {};
	}

	log() {
		console.log({
			device: this.device,
			socket: this.deviceSocketId,
		});
	}

	#initDevice({ deviceId, socket_id, max_visitors, current_visitors }){
		this.device[deviceId] = {
			max_visitors,
			current_visitors,
			socket_id: [socket_id]
		};
	}

	setNewDevice(deviceId, deviceProperties) {
		const { socket_id } = deviceProperties;

		if (this.device[deviceId] === undefined){
			this.#initDevice({deviceId, ...deviceProperties })
		} else {
			this.device[deviceId]['socket_id'].push(socket_id);
		}

		this.deviceSocketId[socket_id] = deviceId;
		return this.device[deviceId];;

	}

	updateMaxVisitors(deviceId, max_visitors) {
		if(this.device[deviceId] !== undefined) {
			this.device[deviceId]['max_visitors'] = max_visitors;
		} else {
			throw new Error('Device Does not exist');
		}
	}

	updateCurrentVisitors(deviceId, current_visitors) {
		if(this.device[deviceId] !== undefined){
			this.device[deviceId]['current_visitors'] = current_visitors;
		} else {
			throw new Error('Device Does not exist');
		}
	}

	updateSocketId(deviceId, socket_id) {
		if(this.device[deviceId] !== undefined){
			const oldSocketId = this.device[deviceId]['socket_id'];
			delete this.deviceSocketId[oldSocketId];

			this.device[deviceId]['socket_id'] = socket_id;
			this.deviceSocketId[socket_id] = this.device[deviceId];

			this.log();

		} else {
			throw new Error('Device Does not exist');
		}
			
	}

  getDeviceById(deviceId) {
		const device = this.device[deviceId];
		if(device !== undefined) return device;

		throw new Error('Device Does not exist');
	}

	getDeviceIDBySocketId(socket_id) {
		const deviceID = this.deviceSocketId[socket_id];
		if(deviceID !== undefined) return deviceID;

		throw new Error('Device Does not exist');
	}

	removeSocketId(socket_id) {
		try {
			const deviceId = this.deviceSocketId[socket_id];
			const listOfSocketId = this.device[deviceId]['socket_id'];
			
			const flitredList = listOfSocketId.filter(s => s !== socket_id);
			
			this.device[deviceId]['socket_id'] = flitredList;
			delete this.deviceSocketId[socket_id];
			
		} catch (error) {
			console.log(error);
		}
	}
	
}

module.exports = { Device }
