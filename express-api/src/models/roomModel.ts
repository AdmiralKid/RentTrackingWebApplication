interface Room {
	className: string;
	isRentable: boolean;
	price?: number;
}

interface Bedroom extends Room {
	className: "Bedroom";
	price: number;
}

interface Hall extends Room {
	className: "Hall";
	isRentable: false;
    
}

interface Facility {
	className: string;
}

interface Electricity extends Facility {
	className: "Electricity";
}

class House {
	rooms: Room[];

	/**
	 *
	 */
	constructor() {
		this.rooms = [];
	}

	addRoom(room: Room) {
		this.rooms.push(room);
	}
}

class HouseBuilder {
	private _house: House;

	/**
	 *
	 */
	constructor(house?: House) {
		this._house = house ?? new House();
	}

	addRoom(room: Room) {
		this._house.addRoom(room);
	}
}
