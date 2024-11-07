// Класс узла для многопутевых деревьев
class NodeMultipathTree {
	constructor(maxAmountDataForNode) {
		this.arrData = new Array(maxAmountDataForNode);
		this.arrChildren = new Array(maxAmountDataForNode + 1);
		this.parent = null;
		this.length = 0;
	};

	isEmpty() {
		return this.length === 0;
	};

	isFull() {
		return this.length === this.arrData.length;
	};

	display() {
		let value = '/ ';

		for (let v = 0; v < this.arrData.length; v++) {
			const item = this.arrData[v];

			value = value + item + ' /';
		}

		console.log(value);
	};

	addData(newValue) {
		let m = this.length;

		for (; m > 0; m--) {
			const value = this.arrData[m - 1];

			if (newValue >= value) {
				break;
			}

			this.addData[m] = this.arrData[m - 1];
		}

		this.addData[m] = newValue;

		this.length = this.length + 1;

		return m;
	};

	isComplete() {
		return this.isFull();
	};

	isLeaf() {
		return (this.arrChildren[0] === undefined) || (this.arrChildren[0] === null);
	};

	split() {
		const rightBrother = new NodeMultipathTree(this.arrData.length);
		const saveMidValue = this.arrData[1];
		const saveRightValue = this.arrData[2];

		let parent = this.parent;

		// Если ссылки на родительский узел нет, то мы пытаемся разбить корень дерева - это частный случай
		if (parent === null) {
			const newParent = new NodeMultipathTree(this.arrData.length);

			parent = newParent;
		}

		
	};
};

class TreeTwoThreeFour {
	constructor() {
		this.root = null;
	};

	isEmpty() {
		return this.root === null;
	};

	insert(newValue) {
		// Если дерево пустое, то мы добавляем в узел элемент и делаем этот узел корнем
		if (this.isEmpty()) {
			const newNode = new NodeMultipathTree(3);

			newNode.addData(newValue);

			this.root = newNode;

			return true;
		}

		// Подготовили ссылку для передвижения по дереву
		let current = this.root;

		while(true) {
			// Если узел полон, то его требуется разбить перед тем, как что-то делать дальше
			if (current.isComplete()) {
				current = current.split();

			} else {

			}
		}
	};
};
