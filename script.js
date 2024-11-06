class NodeMultipathTree {
	constructor() {
		this.arrData = new Array(3);
		this.arrChildren = new Array(4);
		this.parent = null;
	};

	display() {
		let value = '/ ';

		for (let v = 0; v < this.arrData.length; v++) {
			const item = this.arrData[v];

			value = value + item + ' /';
		}

		console.log(value);
	};
};

class TreeTwoThreeFour {
	constructor() {
		
	};
};
